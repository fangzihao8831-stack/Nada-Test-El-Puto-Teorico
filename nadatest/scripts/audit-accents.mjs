import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('..'); // Nadatest root

const files = [
  '.claude/commands/generar-preguntas.md',
  '.claude/commands/generar-preguntas/tipos-preguntas.md',
  '.claude/commands/generar-preguntas/patrones-y-trampas.md',
  '.claude/commands/generar-preguntas/datos-numericos.md',
  '.claude/commands/generar-preguntas/explicaciones.md',
  '.claude/commands/generar-preguntas/verificacion.md',
  '.claude/commands/validar-preguntas.md',
  '.claude/commands/validar-preguntas/check-1-schema.md',
  '.claude/commands/validar-preguntas/check-2-formato.md',
  '.claude/commands/validar-preguntas/check-4-datos.md',
  '.claude/commands/validar-preguntas/check-5-pedagogica.md',
  '.claude/commands/validar-preguntas/datos-referencia.md',
  '.claude/commands/validar-preguntas/subagentes.md',
  '.claude/commands/validar-preguntas/informe-y-postinforme.md',
  'content/generation-prompt.md',
];

// Simple word-boundary accent replacements: [regex, replacement, description]
const rules = [
  // === Esdrújulas (ALWAYS accented) ===
  [/\bteorico\b/gi, m => m[0] === 'T' ? 'Teórico' : 'teórico', 'teórico'],
  [/\bteorica\b/gi, m => m[0] === 'T' ? 'Teórica' : 'teórica', 'teórica'],
  [/\bparrafo\b/gi, m => m[0] === 'P' ? 'Párrafo' : 'párrafo', 'párrafo'],
  [/\bpreambulo\b/gi, m => m[0] === 'P' ? 'Preámbulo' : 'preámbulo', 'preámbulo'],
  [/\bnumerico\b/gi, m => m[0] === 'N' ? 'Numérico' : 'numérico', 'numérico'],
  [/\bnumericos\b/gi, m => m[0] === 'N' ? 'Numéricos' : 'numéricos', 'numéricos'],
  [/\bnumero(?!s)\b/gi, m => m[0] === 'N' ? 'Número' : 'número', 'número'],
  [/\btecnica\b/gi, m => m[0] === 'T' ? 'Técnica' : 'técnica', 'técnica'],
  [/\btecnicas\b/gi, m => m[0] === 'T' ? 'Técnicas' : 'técnicas', 'técnicas'],
  [/\btecnico\b/gi, m => m[0] === 'T' ? 'Técnico' : 'técnico', 'técnico'],
  [/\bestadistica\b/gi, m => m[0] === 'E' ? 'Estadística' : 'estadística', 'estadística'],
  [/\bestadisticos\b/gi, m => m[0] === 'E' ? 'Estadísticos' : 'estadísticos', 'estadísticos'],
  [/\bsistematica\b/gi, m => m[0] === 'S' ? 'Sistemática' : 'sistemática', 'sistemática'],
  [/\bmeteorologicas?\b/gi, m => m.replace(/meteorologic/, 'meteorológic'), 'meteorológica(s)'],
  [/\bbasicas?\b/gi, m => m.replace(/basic/, 'básic'), 'básica(s)'],
  [/\bhistorico\b/gi, m => m[0] === 'H' ? 'Histórico' : 'histórico', 'histórico'],
  [/\btipico\b/gi, m => m[0] === 'T' ? 'Típico' : 'típico', 'típico'],
  [/\bexplicitos?\b/gi, m => m.replace(/explicito/, 'explícito').replace(/Explicito/, 'Explícito'), 'explícito(s)'],
  [/\bexplicitamente\b/gi, m => m[0] === 'E' ? 'Explícitamente' : 'explícitamente', 'explícitamente'],
  [/\btriangulos\b/gi, m => m[0] === 'T' ? 'Triángulos' : 'triángulos', 'triángulos'],
  [/\bvalidos\b/gi, m => m[0] === 'V' ? 'Válidos' : 'válidos', 'válidos'],
  [/\binvalido\b/gi, m => m[0] === 'I' ? 'Inválido' : 'inválido', 'inválido'],
  [/\binutiles\b/gi, m => m[0] === 'I' ? 'Inútiles' : 'inútiles', 'inútiles'],
  [/\butil\b/gi, m => m[0] === 'U' ? 'Útil' : 'útil', 'útil'],
  [/\bpatron\b/gi, m => m[0] === 'P' ? 'Patrón' : 'patrón', 'patrón'],
  [/\bcritica\b/gi, m => m[0] === 'C' ? 'Crítica' : 'crítica', 'crítica'],
  [/\bcritico\b/gi, m => m[0] === 'C' ? 'Crítico' : 'crítico', 'crítico'],

  // === -ción words ===
  [/\bafirmacion\b/gi, m => m.replace(/acion/, 'ación'), 'afirmación'],
  [/\btransformacion\b/gi, m => m.replace(/acion/, 'ación'), 'transformación'],
  [/\bpercepcion\b/gi, m => m.replace(/cion/, 'ción'), 'percepción'],
  [/\bgeneracion\b/gi, m => m.replace(/acion/, 'ación'), 'generación'],
  [/\bdistribucion\b/gi, m => m.replace(/cion/, 'ción'), 'distribución'],
  [/\bcombinacion\b/gi, m => m.replace(/acion/, 'ación'), 'combinación'],
  [/\bclasificacion\b/gi, m => m.replace(/acion/, 'ación'), 'clasificación'],
  [/\bimplementacion\b/gi, m => m.replace(/acion/, 'ación'), 'implementación'],
  [/\bdeteccion\b/gi, m => m.replace(/cion/, 'ción'), 'detección'],
  [/\binvestigacion\b/gi, m => m.replace(/acion/, 'ación'), 'investigación'],
  [/\bcomparacion\b/gi, m => m.replace(/acion/, 'ación'), 'comparación'],
  [/\bvalidacion\b/gi, m => m.replace(/acion/, 'ación'), 'validación'],
  [/\brevision\b/gi, m => m.replace(/sion/, 'sión'), 'revisión'],
  [/\bdecision\b/gi, m => m.replace(/sion/, 'sión'), 'decisión'],
  [/\baccion\b/gi, m => m.replace(/cion/, 'ción'), 'acción'],
  [/\bintencion\b/gi, m => m.replace(/cion/, 'ción'), 'intención'],
  [/\bseparacion\b/gi, m => m.replace(/acion/, 'ación'), 'separación'],
  [/\bexencion\b/gi, m => m.replace(/cion/, 'ción'), 'exención'],
  [/\bsujecion\b/gi, m => m.replace(/cion/, 'ción'), 'sujeción'],
  [/\bdefinicion\b/gi, m => m.replace(/cion/, 'ción'), 'definición'],
  [/\bdescripcion\b/gi, m => m.replace(/cion/, 'ción'), 'descripción'],
  [/\binterrogacion\b/gi, m => m.replace(/acion/, 'ación'), 'interrogación'],
  [/\bcondicion\b/gi, m => m.replace(/cion/, 'ción'), 'condición'],
  [/\bconfiguracion\b/gi, m => m.replace(/acion/, 'ación'), 'configuración'],
  [/\binterseccion\b/gi, m => m.replace(/cion/, 'ción'), 'intersección'],
  [/\bautovalidacion\b/gi, m => m.replace(/acion/, 'ación'), 'autovalidación'],
  [/\bduracion\b/gi, m => m.replace(/acion/, 'ación'), 'duración'],
  [/\bantelacion\b/gi, m => m.replace(/acion/, 'ación'), 'antelación'],

  // === -ía words ===
  [/\btravesia\b/gi, m => m.replace(/esia/, 'esía'), 'travesía'],
  [/\bingenieria\b/gi, m => m.replace(/eria/, 'ería'), 'ingeniería'],
  [/\bmercancias\b/gi, m => m.replace(/ancias/, 'ancías'), 'mercancías'],
  [/\bdaria\b/gi, m => m[0] === 'D' ? 'Daría' : 'daría', 'daría'],
  [/\bdeberia\b/gi, m => m[0] === 'D' ? 'Debería' : 'debería', 'debería'],

  // === ñ words ===
  [/\bsenalizar\b/gi, m => m.replace(/señ|sen/, 'señ'), 'señalizar'],
  [/\bsenalizar,/gi, m => m.replace(/sen/, 'señ'), 'señalizar'],
  [/\bENSENAR\b/, () => 'ENSEÑAR', 'ENSEÑAR'],
  [/\bensena\b/gi, m => m[0] === 'E' ? 'Enseña' : 'enseña', 'enseña'],
  [/\banadir\b/gi, m => m[0] === 'A' ? 'Añadir' : 'añadir', 'añadir'],
  [/\banade\b/gi, m => m[0] === 'A' ? 'Añade' : 'añade', 'añade'],

  // === Common accented words ===
  [/\banos\b/g, () => 'años', 'años'],
  [/\bsegun\b/gi, m => m[0] === 'S' ? 'Según' : 'según', 'según'],
  [/\bautobus\b/gi, m => m[0] === 'A' ? 'Autobús' : 'autobús', 'autobús'],
  [/\bdetras\b/gi, m => m[0] === 'D' ? 'Detrás' : 'detrás', 'detrás'],
  [/\batras\b/gi, m => m[0] === 'A' ? 'Atrás' : 'atrás', 'atrás'],
  [/\bdespues\b/gi, m => m[0] === 'D' ? 'Después' : 'después', 'después'],
  [/\bcodigo\b/gi, m => m[0] === 'C' ? 'Código' : 'código', 'código'],
  [/\bingles\b/gi, m => m[0] === 'I' ? 'Inglés' : 'inglés', 'inglés'],
  [/\bralenti\b/gi, () => 'ralentí', 'ralentí'],
  [/\bantiguedad\b/gi, m => m.replace(/guedad/, 'güedad'), 'antigüedad'],
  [/\bextraidas\b/gi, m => m.replace(/aidas/, 'aídas'), 'extraídas'],
  [/\bbusqueda\b/gi, m => m[0] === 'B' ? 'Búsqueda' : 'búsqueda', 'búsqueda'],
  [/\bvacias\b/gi, m => m[0] === 'V' ? 'Vacías' : 'vacías', 'vacías'],
  [/\bcronica\b/gi, m => m[0] === 'C' ? 'Crónica' : 'crónica', 'crónica'],
  [/\barticulos\b/gi, m => m[0] === 'A' ? 'Artículos' : 'artículos', 'artículos'],
  [/\breune\b/gi, m => m[0] === 'R' ? 'Reúne' : 'reúne', 'reúne'],
  [/\bocurrio\b/gi, m => m.replace(/rrio/, 'rrió'), 'ocurrió'],

  // === "más" (when it means "more", not "but") ===
  // Only match " mas " (with spaces) to avoid partial matches
  [/(?<=\s)mas(?=\s)/g, () => 'más', 'más'],

  // === Wrong accent: razónar → razonar ===
  [/\brazónar\b/g, () => 'razonar', 'razonar (remove wrong accent)'],
  // === Wrong accent: específicada → especificada ===
  [/\bespecíficada?\b/gi, m => m.replace(/ecífic/, 'ecific'), 'especificado/a (remove wrong accent)'],
];

// Interrogative accent rules (context-dependent)
const interrogativeRules = [
  [/¿Que\s/g, '¿Qué ', '¿Qué'],
  [/¿que\s/g, '¿qué ', '¿qué'],
  [/¿Cual\s/g, '¿Cuál ', '¿Cuál'],
  [/¿Cuando\s/g, '¿Cuándo ', '¿Cuándo'],
  [/¿Donde\s/g, '¿Dónde ', '¿Dónde'],
  [/¿Como\s/g, '¿Cómo ', '¿Cómo'],
  [/¿Cuanto\s/g, '¿Cuánto ', '¿Cuánto'],
  [/¿Cuantos\s/g, '¿Cuántos ', '¿Cuántos'],
  [/¿A que\s/g, '¿A qué ', '¿A qué'],
  [/¿En que\s/g, '¿En qué ', '¿En qué'],
  [/¿Cada cuanto\b/g, '¿Cada cuánto', '¿Cada cuánto'],
  [/¿Desde cuando\b/g, '¿Desde cuándo', '¿Desde cuándo'],
];

// "está" vs "esta" — only fix clear verb-estar patterns
const estarRules = [
  [/\besta\s+(permitido|prohibido|obligado|congestionado|detenido|correcto|mal)\b/gi,
   m => 'está' + m.slice(4), 'está (verb estar)'],
  [/\bestan\s+(mal|bien)\b/gi, m => 'están' + m.slice(5), 'están'],
  [/que\s+esta\s+aprendiendo\b/g, 'que está aprendiendo', 'está aprendiendo'],
  [/\besta\s+evaluando\b/g, 'está evaluando', 'está evaluando'],
  [/no\s+esta\s+seguro\b/g, 'no está seguro', 'no está seguro'],
];

// "por qué" (why) patterns
const porQueRules = [
  [/\bpor que las otras/g, 'por qué las otras', 'por qué (why)'],
  [/\bpor que estan/g, 'por qué están', 'por qué están'],
  [/\bPOR QUE\b/g, 'POR QUÉ', 'POR QUÉ'],
  [/\bpor que es correcta/g, 'por qué es correcta', 'por qué (why)'],
  [/\bpor que sorprende/g, 'por qué sorprende', 'por qué (why)'],
  [/\bpor que A y C/g, 'por qué A y C', 'por qué (why)'],
  [/\bExplicar por que/g, 'Explicar por qué', 'por qué (why)'],
  [/\bExplicar POR QUE/g, 'Explicar POR QUÉ', 'POR QUÉ'],
];

let totalIssues = 0;

for (const relPath of files) {
  const fullPath = path.join(ROOT, relPath);
  let content;
  try {
    content = fs.readFileSync(fullPath, 'utf8');
  } catch (e) {
    console.log(`SKIP: ${relPath} (${e.message})`);
    continue;
  }

  const lines = content.split('\n');
  const issues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip code block delimiters and JSON field references
    if (line.trim().startsWith('```')) continue;

    const allRules = [...rules, ...interrogativeRules, ...estarRules, ...porQueRules];

    for (const [regex, replacement, desc] of allRules) {
      const re = new RegExp(regex.source, regex.flags);
      let match;
      while ((match = re.exec(line)) !== null) {
        // Check if the correct form already exists at this position
        const matchedStr = match[0];
        const replStr = typeof replacement === 'function' ? replacement(matchedStr) : replacement;
        if (matchedStr !== replStr) {
          issues.push({
            line: i + 1,
            wrong: matchedStr,
            right: replStr,
            desc,
            context: line.trim().substring(0, 100)
          });
        }
        if (!regex.global) break;
      }
    }
  }

  if (issues.length > 0) {
    console.log(`\n=== ${relPath} (${issues.length} issues) ===`);
    for (const iss of issues) {
      console.log(`  L${iss.line}: "${iss.wrong}" → "${iss.right}" [${iss.desc}]`);
    }
    totalIssues += issues.length;
  }
}

console.log(`\n=== TOTAL: ${totalIssues} issues across ${files.length} files ===`);
