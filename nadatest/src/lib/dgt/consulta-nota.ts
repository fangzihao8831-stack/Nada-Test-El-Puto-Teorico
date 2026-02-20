import type { ConsultaNotaInput, ConsultaNotaResult } from "@/types/dgt";

const DGT_URL =
  "https://sedeclave.dgt.gob.es/WEB_NOTP_CONSULTA/consultaNota.faces";

const FORM_ID = "formularioBusquedaNotas";

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "es-ES,es;q=0.9",
};

export async function consultarNotaDGT(
  input: ConsultaNotaInput
): Promise<ConsultaNotaResult> {
  try {
    // Step 1: GET form page to extract ViewState and session cookie
    const getResponse = await fetch(DGT_URL, { headers: BROWSER_HEADERS });

    if (!getResponse.ok) {
      return {
        success: false,
        error: `Error al conectar con la DGT (${getResponse.status})`,
      };
    }

    const html = await getResponse.text();
    const viewState = extractViewState(html);

    if (!viewState) {
      return {
        success: false,
        error: "No se pudo obtener el formulario de la DGT",
      };
    }

    const cookie = extractSessionCookie(getResponse.headers);

    // Step 2: POST form data with ViewState + session cookie
    const formData = buildFormData(input, viewState);

    const postResponse = await fetch(DGT_URL, {
      method: "POST",
      headers: {
        ...BROWSER_HEADERS,
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: DGT_URL,
        ...(cookie ? { Cookie: cookie } : {}),
      },
      body: formData,
    });

    if (!postResponse.ok) {
      return {
        success: false,
        error: `Error en la consulta a la DGT (${postResponse.status})`,
      };
    }

    const resultHtml = await postResponse.text();
    return parseResult(resultHtml);
  } catch (error) {
    console.error("DGT consultation failed:", error);
    return {
      success: false,
      error: "No se pudo conectar con el servidor de la DGT. Intentalo de nuevo mas tarde.",
    };
  }
}

function extractViewState(html: string): string | null {
  const match = html.match(
    /name="javax\.faces\.ViewState"[^>]*value="([^"]*)"/
  );
  return match ? match[1] : null;
}

function extractSessionCookie(headers: Headers): string | null {
  const setCookie = headers.get("set-cookie");
  if (!setCookie) return null;
  // Extract JSESSIONID cookie
  const match = setCookie.match(/(JSESSIONID=[^;]+)/);
  return match ? match[1] : setCookie.split(";")[0].trim();
}

function buildFormData(input: ConsultaNotaInput, viewState: string): string {
  const fechaExamen = formatDateForDGT(input.fechaExamen);
  const fechaNacimiento = formatDateForDGT(input.fechaNacimiento);

  const params = new URLSearchParams();
  params.set(FORM_ID, FORM_ID);
  params.set(`${FORM_ID}:nifnie`, input.nif.toUpperCase().trim());
  params.set(`${FORM_ID}:fechaExamen`, fechaExamen);
  params.set(`${FORM_ID}:clasepermiso`, input.clasePermiso);
  params.set(`${FORM_ID}:fechaNacimiento`, fechaNacimiento);
  params.set(`${FORM_ID}:honeypot`, "");
  params.set(`${FORM_ID}:j_id51`, "Buscar");
  params.set("javax.faces.ViewState", viewState);

  return params.toString();
}

function formatDateForDGT(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&aacute;/gi, "\u00e1")
    .replace(/&eacute;/gi, "\u00e9")
    .replace(/&iacute;/gi, "\u00ed")
    .replace(/&oacute;/gi, "\u00f3")
    .replace(/&uacute;/gi, "\u00fa")
    .replace(/&ntilde;/gi, "\u00f1")
    .replace(/&Aacute;/gi, "\u00c1")
    .replace(/&Eacute;/gi, "\u00c9")
    .replace(/&Iacute;/gi, "\u00cd")
    .replace(/&Oacute;/gi, "\u00d3")
    .replace(/&Uacute;/gi, "\u00da")
    .replace(/&Ntilde;/gi, "\u00d1")
    .replace(/&amp;/gi, "&")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#\d+;/g, "");
}

function parseResult(html: string): ConsultaNotaResult {
  // Strip HTML tags and decode entities for text analysis
  const text = decodeHtmlEntities(
    html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")
  );

  // Check for "no results" responses
  if (
    text.includes("No se han encontrado resultados") ||
    text.includes("no se encontraron datos")
  ) {
    return {
      success: true,
      error:
        "No se encontraron resultados. Verifica que los datos son correctos y que el resultado aun esta disponible (15 dias).",
    };
  }

  // Parse result: NO APTO must be checked before APTO
  const noAptoMatch = /NO\s+APTO/i.test(text);
  const noPresentadoMatch = /NO\s+PRESENTADO/i.test(text);
  const aptoMatch = /\bAPTO\b/i.test(text);

  let resultado: ConsultaNotaResult["resultado"];
  if (noPresentadoMatch) {
    resultado = "NO PRESENTADO";
  } else if (noAptoMatch) {
    resultado = "NO APTO";
  } else if (aptoMatch) {
    resultado = "APTO";
  }

  if (!resultado) {
    return {
      success: false,
      error: "No se pudo interpretar la respuesta de la DGT",
    };
  }

  // Extract exam type
  let tipoExamen: ConsultaNotaResult["tipoExamen"];
  if (/TE.RICO/i.test(text)) {
    tipoExamen = "TEORICO";
  } else if (/PR.CTICO/i.test(text)) {
    tipoExamen = "PRACTICO";
  }

  // Extract number of errors
  let errores: number | undefined;
  const erroresMatch = text.match(
    /N.MERO\s+DE\s+ERRORES:\s*(\d+)/i
  );
  if (erroresMatch) {
    errores = parseInt(erroresMatch[1], 10);
  }

  // Extract name — DGT returns "APELLIDOS, NOMBRE", reverse to "Nombre Apellidos"
  let nombre: string | undefined;
  const nombreMatch = text.match(
    /APELLIDOS,?\s*NOMBRE:\s*(.+?)\s*NIF/i
  );
  if (nombreMatch) {
    const raw = nombreMatch[1].trim();
    const parts = raw.split(/\s*,\s*/);
    if (parts.length === 2) {
      nombre = titleCase(parts[1]) + " " + titleCase(parts[0]);
    } else {
      nombre = titleCase(raw);
    }
  }

  return {
    success: true,
    resultado,
    tipoExamen,
    errores,
    nombre,
  };
}
