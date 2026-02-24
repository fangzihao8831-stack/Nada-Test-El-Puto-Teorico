import { readFileSync, writeFileSync } from "node:fs";

const path = "content/preguntas/batch_02/preguntas_2026-02-24_batch02.json";
const data = JSON.parse(readFileSync(path, "utf8"));

let fixed = 0;
for (const q of data.preguntas) {
  const text = (q.enunciado + " " + (q.explicacion || "")).toLowerCase();
  let newId = null;

  if (text.includes("alcohol") || text.includes("alcoholemia") || text.includes("tasa")) {
    newId = "subtema_43";
  } else if (text.includes("fatiga") || text.includes("sueño") || text.includes("microsueño") || text.includes("somnolencia") || text.includes("pausa")) {
    newId = "subtema_46";
  } else if (text.includes("antiniebla") || text.includes("niebla") || text.includes("lluvia intensa") || text.includes("condiciones adversas") || text.includes("visibilidad")) {
    newId = "subtema_35";
  } else if (text.includes("estacionar") || text.includes("estacionamiento") || text.includes("aparcar")) {
    newId = "subtema_21";
  } else if (text.includes("adelantar") || text.includes("adelantamiento")) {
    newId = "subtema_20";
  } else if (text.includes("prioridad") || text.includes("glorieta") || text.includes("ceder el paso")) {
    newId = "subtema_19";
  } else if (text.includes("marcha atrás") || text.includes("marcha atras")) {
    newId = "subtema_18";
  } else if (text.includes("velocidad") && (text.includes("límite") || text.includes("máxim") || text.includes("km/h"))) {
    newId = "subtema_16";
  }

  if (newId && newId !== q.subtema_id) {
    q.subtema_id = newId;
    fixed++;
  }
}

writeFileSync(path, JSON.stringify(data, null, 2));
console.log("Fixed", fixed, "subtema IDs");

const dist = {};
for (const q of data.preguntas) dist[q.subtema_id] = (dist[q.subtema_id] || 0) + 1;
console.log(dist);
