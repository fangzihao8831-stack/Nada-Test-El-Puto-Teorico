#!/usr/bin/env node

/**
 * Validates DGT question JSON files — Checks 1-3 (Schema, Format, Duplicates).
 * These are mechanical checks that don't need an LLM. Zero tokens.
 *
 * Checks 4-5 (fact-checking, pedagogical review) still need an LLM agent
 * but only for questions that PASS checks 1-3.
 *
 * Usage:
 *   node scripts/validate-questions.mjs <batch-dir-or-file>
 *   node scripts/validate-questions.mjs ../content/preguntas/batch_01
 *   node scripts/validate-questions.mjs ../content/preguntas/batch_01/preguntas_2026-02-18_mixed_batch01.json
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";

// ── Schema rules (Check 1) ──

const VALID_TIPOS = ["directa", "situacional", "completar", "dato"];
const VALID_TIPO_IMAGEN = ["señal", "senal", "situación", "situacion", "vehículo", "vehiculo", "ninguna"];
const VALID_ORIGEN = ["generada", "extraida_dgt", "extraida_todotest"];

const REQUIRED_FIELDS = [
  ["id", "string"],
  ["subtema_id", "string"],
  ["tipo_pregunta", "string"],
  ["enunciado", "string"],
  ["opciones", "array"],
  ["correcta", "number"],
  ["pista", "string"],
  ["requiere_imagen", "boolean"],
  ["tipo_imagen", "string"],
  ["origen", "string"],
  ["validada", "boolean"],
];

function checkSchema(q) {
  const errors = [];

  for (const [field, type] of REQUIRED_FIELDS) {
    const val = q[field];
    if (val === undefined || val === null) {
      errors.push(`missing field: ${field}`);
      continue;
    }
    if (type === "array" && !Array.isArray(val)) {
      errors.push(`${field} should be array`);
    } else if (type !== "array" && typeof val !== type) {
      errors.push(`${field} should be ${type}, got ${typeof val}`);
    }
  }

  // explicación — accept with or without accent
  if (!q["explicación"] && !q["explicacion"]) {
    errors.push("missing field: explicación");
  }

  if (Array.isArray(q.opciones) && q.opciones.length !== 3) {
    errors.push(`opciones must have 3 elements, got ${q.opciones.length}`);
  }

  if (typeof q.correcta === "number" && ![0, 1, 2].includes(q.correcta)) {
    errors.push(`correcta must be 0/1/2, got ${q.correcta}`);
  }

  if (q.tipo_pregunta && !VALID_TIPOS.includes(q.tipo_pregunta)) {
    errors.push(`tipo_pregunta invalid: ${q.tipo_pregunta}`);
  }

  if (q.tipo_imagen && !VALID_TIPO_IMAGEN.includes(q.tipo_imagen)) {
    errors.push(`tipo_imagen invalid: ${q.tipo_imagen}`);
  }

  if (q.origen && !VALID_ORIGEN.includes(q.origen)) {
    errors.push(`origen invalid: ${q.origen}`);
  }

  if (q.requiere_imagen !== true) {
    errors.push("requiere_imagen must be true");
  }

  if (q.subtema_id && !/^subtema_\d+$/.test(q.subtema_id)) {
    errors.push(`subtema_id bad format: ${q.subtema_id}`);
  }

  return errors;
}

// ── Format rules (Check 2) ──

// Words that ALWAYS need accents/tildes (no ambiguity in DGT context)
// Includes ñ words (senal->señal) and accent words (vehiculo->vehículo)
const ACCENT_WORDS = {
  // ñ words
  senal: "señal", senales: "señales", senalizacion: "señalización",
  espana: "España", espanol: "español", ensenanza: "enseñanza",
  companero: "compañero", dano: "daño", danos: "daños",
  muneca: "muñeca", nino: "niño", ninos: "niños",
  // Common nouns with accent
  vehiculo: "vehículo", vehiculos: "vehículos",
  circulacion: "circulación", conduccion: "conducción",
  direccion: "dirección", posicion: "posición",
  atencion: "atención", reaccion: "reacción",
  detencion: "detención", informacion: "información",
  infraccion: "infracción",
  sancion: "sanción",
  obligacion: "obligación", situacion: "situación",
  prohibicion: "prohibición", proteccion: "protección",
  precaucion: "precaución", indicacion: "indicación",
  iluminacion: "iluminación", senalizacion: "señalización",
  inmovilizacion: "inmovilización", recuperacion: "recuperación",
  // Vehicles and parts
  neumatico: "neumático", neumaticos: "neumáticos",
  automovil: "automóvil", autovia: "autovía", autovias: "autovías",
  averia: "avería", averias: "averías",
  cinturon: "cinturón", camion: "camión",
  peaton: "peatón",
  semaforo: "semáforo", semaforos: "semáforos",
  trafico: "tráfico",
  telefono: "teléfono",
  // Adjectives and adverbs
  minimo: "mínimo", minima: "mínima",
  maximo: "máximo", maxima: "máxima",
  rapido: "rápido", rapida: "rápida",
  unico: "único", unica: "única",
  unicamente: "únicamente",
  limite: "límite", limites: "límites",
  numero: "número", numeros: "números",
  kilometro: "kilómetro", kilometros: "kilómetros",
  tambien: "también", aqui: "aquí", asi: "así",
  // Verbs (future tense, common in DGT)
  podra: "podrá", debera: "deberá", sera: "será",
  tendra: "tendrá", habra: "habrá", estara: "estará",
  // Nouns
  perdida: "pérdida", perdidas: "pérdidas",
  valido: "válido", valida: "válida",
  automatico: "automático", automatica: "automática",
  electronico: "electrónico", electrica: "eléctrica", electrico: "eléctrico",
  alcoholimetro: "alcoholímetro",
};

function checkFormat(q) {
  const warnings = [];
  const enunciado = q.enunciado || "";
  const explicacion = q["explicación"] || q.explicacion || "";

  // ¿ marks
  if (enunciado.includes("?") && !enunciado.includes("¿")) {
    warnings.push("enunciado missing ¿");
  }

  // completar must have ...
  if (q.tipo_pregunta === "completar" && !enunciado.includes("...")) {
    warnings.push("completar type missing ... in enunciado");
  }

  // Whitespace trim
  for (const [field, val] of Object.entries(q)) {
    if (typeof val === "string" && val !== val.trim()) {
      warnings.push(`${field} has extra whitespace`);
    }
  }

  // Option capitalization (except completar)
  if (q.tipo_pregunta !== "completar" && Array.isArray(q.opciones)) {
    q.opciones.forEach((opt, i) => {
      if (typeof opt === "string" && opt.length > 0) {
        const first = opt[0];
        if (first !== first.toUpperCase() && first.match(/[a-záéíóú]/i)) {
          warnings.push(`opciones[${i}] starts lowercase`);
        }
      }
    });
  }

  // Accent check on all text
  const allText = [enunciado, ...(q.opciones || []), explicacion, q.pista || ""].join(" ");
  const words = allText.toLowerCase().split(/[\s.,;:¿?¡!()"]+/);
  const missing = [];
  for (const w of words) {
    if (ACCENT_WORDS[w]) {
      missing.push(`${w} -> ${ACCENT_WORDS[w]}`);
    }
  }
  if (missing.length > 0) {
    const unique = [...new Set(missing)];
    warnings.push(`missing accents (${unique.length}): ${unique.slice(0, 5).join(", ")}`);
  }

  // Explanation format: should have tagged bullets
  const hasOpcInc = explicacion.includes("Opciones incorrectas");
  const hasConexion = explicacion.includes("Conexión") || explicacion.includes("Conexion");
  if (!hasOpcInc) warnings.push("explicación missing 'Opciones incorrectas' bullet");
  if (!hasConexion) warnings.push("explicación missing 'Conexión' bullet");

  return warnings;
}

// ── Duplicate detection (Check 3) ──

const STOP_WORDS = new Set([
  "el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "en",
  "con", "por", "para", "al", "lo", "le", "se", "su", "que", "es", "no",
  "si", "como", "mas", "pero", "este", "esta", "ese", "esa", "ser", "estar",
  "haber", "tener", "hacer", "poder", "debe", "puede", "hay", "son", "tiene",
  "cuando", "donde", "cual", "quien", "usted", "una", "otro", "otra", "todo",
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[¿?¡!.,;:()"]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function jaccard(a, b) {
  const sa = new Set(a);
  const sb = new Set(b);
  let inter = 0;
  for (const x of sa) if (sb.has(x)) inter++;
  const union = sa.size + sb.size - inter;
  return union === 0 ? 0 : inter / union;
}

function checkDuplicates(questions) {
  const results = [];
  const tokens = questions.map((q) => tokenize(q.enunciado || ""));

  for (let i = 0; i < questions.length; i++) {
    for (let j = i + 1; j < questions.length; j++) {
      const sim = jaccard(tokens[i], tokens[j]);
      if (sim > 0.8) {
        results.push({ type: "REJECT", ids: [questions[i].id, questions[j].id], sim });
      } else if (sim > 0.6) {
        results.push({ type: "FLAG", ids: [questions[i].id, questions[j].id], sim });
      }
    }
  }
  return results;
}

// ── Autofix: accent correction ──

function fixAccents(text) {
  if (typeof text !== "string") return text;
  // Sort by length descending to fix longer words first (avoid partial matches)
  const sorted = Object.entries(ACCENT_WORDS).sort((a, b) => b[0].length - a[0].length);
  for (const [wrong, correct] of sorted) {
    // Word-boundary aware replacement using split/join on word boundaries
    // Match the word only when surrounded by non-letter chars
    const re = new RegExp(`(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])${wrong}(?![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])`, "g");
    text = text.replace(re, correct);
    // Also handle capitalized version (start of sentence)
    const capWrong = wrong.charAt(0).toUpperCase() + wrong.slice(1);
    const capCorrect = correct.charAt(0).toUpperCase() + correct.slice(1);
    const reCap = new RegExp(`(?<![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])${capWrong}(?![a-záéíóúñüA-ZÁÉÍÓÚÑÜ])`, "g");
    text = text.replace(reCap, capCorrect);
  }
  return text;
}

function autofixQuestion(q) {
  let fixed = 0;
  for (const key of ["enunciado", "explicación", "explicacion", "pista"]) {
    if (q[key]) {
      const before = q[key];
      q[key] = fixAccents(q[key]);
      if (q[key] !== before) fixed++;
    }
  }
  if (Array.isArray(q.opciones)) {
    q.opciones = q.opciones.map((o) => {
      const before = o;
      const result = fixAccents(o);
      if (result !== before) fixed++;
      return result;
    });
  }
  // Fix tipo_imagen if it has unaccented values
  if (q.tipo_imagen === "senal") q.tipo_imagen = "señal";
  if (q.tipo_imagen === "situacion") q.tipo_imagen = "situación";
  if (q.tipo_imagen === "vehiculo") q.tipo_imagen = "vehículo";
  return fixed;
}

// ── Main ──

const args = process.argv.slice(2);
const autofix = args.includes("--autofix");
const input = args.find((a) => !a.startsWith("--"));
if (!input) {
  console.error("Usage: node scripts/validate-questions.mjs <batch-dir-or-file> [--autofix]");
  process.exit(1);
}

const inputPath = resolve(input);
if (!existsSync(inputPath)) {
  console.error(`Not found: ${inputPath}`);
  process.exit(1);
}

// Collect JSON files
let files;
const isDir = statSync(inputPath).isDirectory();
if (isDir) {
  files = readdirSync(inputPath)
    .filter((f) => f.endsWith(".json") && !f.includes("_validated"))
    .map((f) => join(inputPath, f));
} else {
  files = [inputPath];
}

if (files.length === 0) {
  console.error("No JSON files found");
  process.exit(1);
}

// Load questions
const allQuestions = [];
for (const file of files) {
  const data = JSON.parse(readFileSync(file, "utf-8"));
  if (data.preguntas && Array.isArray(data.preguntas)) {
    allQuestions.push(...data.preguntas);
  }
}

console.log(`\nValidating ${allQuestions.length} questions from ${files.length} file(s)\n`);

// Autofix accents if requested
if (autofix) {
  console.log("--- AUTOFIX: Accents ---");
  let totalFixed = 0;
  for (const q of allQuestions) {
    totalFixed += autofixQuestion(q);
  }
  if (totalFixed > 0) {
    // Write back to source files
    for (const file of files) {
      const data = JSON.parse(readFileSync(file, "utf-8"));
      if (data.preguntas) {
        for (const q of data.preguntas) {
          const fixed = allQuestions.find((aq) => aq.id === q.id);
          if (fixed) Object.assign(q, fixed);
        }
        writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
      }
    }
    console.log(`  Fixed accents in ${totalFixed} fields across ${allQuestions.length} questions`);
  } else {
    console.log("  No accent issues found");
  }
  console.log("");
}

// Run checks 1-3
const rejected = new Set();
const warned = new Set();

// Check 1: Schema
console.log("--- CHECK 1: Schema ---");
let schemaFails = 0;
for (const q of allQuestions) {
  const errs = checkSchema(q);
  if (errs.length > 0) {
    console.log(`  REJECT ${q.id}: ${errs.join("; ")}`);
    rejected.add(q.id);
    schemaFails++;
  }
}
if (schemaFails === 0) console.log("  All PASS");

// Check 2: Format
console.log("\n--- CHECK 2: Format ---");
let formatIssues = 0;
for (const q of allQuestions) {
  const warns = checkFormat(q);
  if (warns.length > 0) {
    console.log(`  WARN ${q.id}: ${warns.join("; ")}`);
    warned.add(q.id);
    formatIssues++;
  }
}
if (formatIssues === 0) console.log("  All PASS");

// Check 3: Duplicates
console.log("\n--- CHECK 3: Duplicates ---");
const dups = checkDuplicates(allQuestions);
if (dups.length === 0) {
  console.log("  No duplicates detected");
} else {
  for (const d of dups) {
    const pct = (d.sim * 100).toFixed(0);
    console.log(`  ${d.type} ${d.ids[0]} <-> ${d.ids[1]} (${pct}% similar)`);
    if (d.type === "REJECT") rejected.add(d.ids[1]);
  }
}

// Summary
const passCount = allQuestions.length - rejected.size;
const warnCount = [...warned].filter((id) => !rejected.has(id)).length;

console.log(`\n=== SUMMARY ===`);
console.log(`  Total:   ${allQuestions.length}`);
console.log(`  PASS:    ${passCount - warnCount}`);
console.log(`  WARN:    ${warnCount} (passed with warnings — review recommended)`);
console.log(`  REJECT:  ${rejected.size}`);

if (rejected.size > 0) {
  console.log(`  Rejected IDs: ${[...rejected].join(", ")}`);
}

// Report-only — no file output. The LLM validator (checks 4-5) writes *_validated.json files.

console.log("");
process.exit(rejected.size > 0 ? 1 : 0);
