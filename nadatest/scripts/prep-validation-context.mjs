#!/usr/bin/env node

/**
 * Pre-builds per-tema validation context bundles for LLM agents.
 * Groups questions by tema, extracts keywords, and pre-greps todotest
 * for matching questions — so the LLM agent receives pre-computed context
 * instead of grepping 44k lines itself.
 *
 * Usage:
 *   node scripts/prep-validation-context.mjs <batch-dir-or-file>
 *   node scripts/prep-validation-context.mjs ../content/preguntas/batch_01
 *
 * Output: JSON to stdout with per-tema bundles.
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(__dirname, "..");
const projectRoot = resolve(appRoot, "..");

// ── Load structure for subtema -> tema mapping ──

const structurePath = join(projectRoot, "content", "content-structure.json");
const structure = JSON.parse(readFileSync(structurePath, "utf-8"));

const subtemaToTema = {};
const temaNames = {};
for (const tema of structure.temas) {
  temaNames[tema.id] = tema.nombre;
  for (const subtema of tema.subtemas) {
    subtemaToTema[subtema.id] = tema.id;
  }
}

// ── Load todotest ──

const todotestPath = join(projectRoot, "content", "todotest_2700.json");
const todotest = JSON.parse(readFileSync(todotestPath, "utf-8"));

// Flatten all todotest questions into a searchable array
const todotestQuestions = [];
for (const test of todotest.tests) {
  for (const q of test.preguntas) {
    todotestQuestions.push({
      todotest_id: q.todotest_id,
      test_num: test.test_num,
      enunciado: q.enunciado,
      opciones: q.opciones,
      respuesta_correcta: q.respuesta_correcta,
    });
  }
}

// ── Spanish stop words for keyword extraction ──

const STOP_WORDS = new Set([
  "el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "en",
  "con", "por", "para", "al", "lo", "le", "se", "su", "que", "es", "no",
  "si", "como", "mas", "pero", "este", "esta", "ese", "esa", "ser", "estar",
  "haber", "tener", "hacer", "poder", "debe", "puede", "hay", "son", "tiene",
  "cuando", "donde", "cual", "quien", "usted", "una", "otro", "otra", "todo",
  "toda", "todos", "todas", "muy", "bien", "mal", "solo", "sobre", "entre",
  "sin", "desde", "hasta", "tambien", "siempre", "nunca", "cada", "mismo",
  "misma", "aqui", "alli", "asi", "sus", "nos", "les", "estos", "estas",
  "esos", "esas", "aquel", "aquella", "han", "sido", "sera", "puede",
  "dos", "tres", "cuatro", "cinco", "seis", "siendo", "sea",
]);

/**
 * Extracts meaningful keywords from a question enunciado.
 * Returns 3-6 keywords sorted by relevance (length as proxy).
 */
function extractKeywords(enunciado) {
  const words = enunciado
    .toLowerCase()
    .replace(/[¿?¡!.,;:()\"']/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  // Deduplicate and sort by length (longer words are more specific)
  const unique = [...new Set(words)].sort((a, b) => b.length - a.length);
  return unique.slice(0, 6);
}

/**
 * Finds todotest questions matching at least 2 keywords from a set.
 * Returns top matches sorted by relevance (number of keyword hits).
 */
function findTodotestMatches(keywords, maxResults = 8) {
  const scored = [];

  for (const tq of todotestQuestions) {
    const text = [tq.enunciado, ...tq.opciones].join(" ").toLowerCase();
    let hits = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) hits++;
    }
    if (hits >= 2) {
      scored.push({ ...tq, relevance: hits });
    }
  }

  scored.sort((a, b) => b.relevance - a.relevance);
  return scored.slice(0, maxResults).map(({ relevance, ...rest }) => rest);
}

// ── Main ──

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/prep-validation-context.mjs <batch-dir-or-file>");
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

// Load all questions
const allQuestions = [];
for (const file of files) {
  const data = JSON.parse(readFileSync(file, "utf-8"));
  if (data.preguntas && Array.isArray(data.preguntas)) {
    allQuestions.push(...data.preguntas);
  }
}

// Group by tema
const byTema = {};
for (const q of allQuestions) {
  const temaId = subtemaToTema[q.subtema_id] || "unknown";
  if (!byTema[temaId]) {
    byTema[temaId] = [];
  }
  byTema[temaId].push(q);
}

// Build per-tema bundles
const bundles = [];
for (const [temaId, questions] of Object.entries(byTema).sort()) {
  // Collect keywords from all questions in this tema
  const allKeywords = new Set();
  for (const q of questions) {
    for (const kw of extractKeywords(q.enunciado)) {
      allKeywords.add(kw);
    }
  }

  // Find todotest matches using combined tema keywords
  const todotestMatches = findTodotestMatches([...allKeywords]);

  const temarioFile = `content/temario/${temaId}.md`;
  const temarioExists = existsSync(join(projectRoot, temarioFile));

  bundles.push({
    tema_id: temaId,
    tema_name: temaNames[temaId] || "Desconocido",
    temario_file: temarioExists ? temarioFile : null,
    question_count: questions.length,
    questions: questions,
    keywords_extracted: [...allKeywords].slice(0, 20),
    todotest_matches: todotestMatches,
    todotest_match_count: todotestMatches.length,
  });
}

// Output summary to stderr, JSON to stdout
const totalTodotest = bundles.reduce((s, b) => s + b.todotest_match_count, 0);
console.error(`\nPrepared ${bundles.length} tema bundles from ${allQuestions.length} questions`);
console.error("Distribution:");
for (const b of bundles) {
  console.error(`  ${b.tema_id} (${b.tema_name}): ${b.question_count} questions, ${b.todotest_match_count} todotest matches`);
}
console.error(`\nTotal todotest matches pre-grepped: ${totalTodotest}`);
console.error(`Output: JSON to stdout\n`);

// Write JSON to stdout
console.log(JSON.stringify({ bundles }, null, 2));
