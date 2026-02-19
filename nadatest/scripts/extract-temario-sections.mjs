#!/usr/bin/env node

/**
 * Splits temario_permiso_b_v3.md into per-tema files.
 * Groups TEMA sections by their parent tema (using content-structure.json mapping).
 *
 * Output: content/temario/tema_01.md through tema_12.md
 *         content/temario/resumen.md (lines after last TEMA, if any)
 *
 * Usage: node scripts/extract-temario-sections.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(__dirname, "..");
const projectRoot = resolve(appRoot, "..");

const temarioPath = join(projectRoot, "temario_permiso_b_v3.md");
const structurePath = join(projectRoot, "content", "content-structure.json");
const outDir = join(projectRoot, "content", "temario");

// Read inputs
const temarioLines = readFileSync(temarioPath, "utf-8").split("\n");
const structure = JSON.parse(readFileSync(structurePath, "utf-8"));

// Build TEMA number -> tema_id mapping from content-structure.json
// e.g., "TEMA 1" -> "tema_01", "TEMA 48" -> "tema_01"
const temaNumToId = {};
const temaIdToName = {};
for (const tema of structure.temas) {
  temaIdToName[tema.id] = tema.nombre;
  for (const subtema of tema.subtemas) {
    // temario_ref is like "TEMA 1", "TEMA 48", etc.
    const match = subtema.temario_ref.match(/TEMA (\d+)/);
    if (match) {
      temaNumToId[parseInt(match[1])] = tema.id;
    }
  }
}

// Find all TEMA header positions
const temaHeaders = [];
const headerRegex = /^# TEMA (\d+):/;
for (let i = 0; i < temarioLines.length; i++) {
  const m = temarioLines[i].match(headerRegex);
  if (m) {
    temaHeaders.push({ line: i, num: parseInt(m[1]), title: temarioLines[i] });
  }
}

// Extract content for each TEMA section
const temaSections = {};
for (let i = 0; i < temaHeaders.length; i++) {
  const start = temaHeaders[i].line;
  const end = i + 1 < temaHeaders.length ? temaHeaders[i + 1].line : temarioLines.length;
  const num = temaHeaders[i].num;
  const temaId = temaNumToId[num];

  if (!temaId) {
    // TEMA not mapped in content-structure (shouldn't happen but handle gracefully)
    console.warn(`  TEMA ${num} not mapped to any tema_id, skipping`);
    continue;
  }

  const content = temarioLines.slice(start, end).join("\n").trimEnd();

  if (!temaSections[temaId]) {
    temaSections[temaId] = [];
  }
  temaSections[temaId].push({ num, content });
}

// Check for content before first TEMA and after last TEMA
const beforeFirst = temarioLines.slice(0, temaHeaders[0]?.line || 0).join("\n").trim();
const lastEnd = temaHeaders.length > 0
  ? temaHeaders[temaHeaders.length - 1].line
  : 0;

// Find resumenes/appendix after last TEMA section
// Actually, last TEMA section extends to end of file, so check for special sections
// Look for lines after the last TEMA's content that might be summaries
const summaryRegex = /^# (RESUMEN|ANEXO|APÉNDICE)/i;
let summaryStart = -1;
for (let i = lastEnd; i < temarioLines.length; i++) {
  if (summaryRegex.test(temarioLines[i])) {
    summaryStart = i;
    break;
  }
}

// Write output files
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

let totalLines = 0;
for (const [temaId, sections] of Object.entries(temaSections).sort()) {
  const name = temaIdToName[temaId] || "Desconocido";
  const header = `# ${temaId}: ${name}\n\n`;
  const body = sections
    .sort((a, b) => a.num - b.num)
    .map((s) => s.content)
    .join("\n\n---\n\n");

  const fullContent = header + body + "\n";
  const outFile = join(outDir, `${temaId}.md`);
  writeFileSync(outFile, fullContent);

  const lineCount = fullContent.split("\n").length;
  totalLines += lineCount;
  const temaNums = sections.map((s) => `TEMA ${s.num}`).join(", ");
  console.log(`  ${temaId}.md — ${lineCount} lines (${temaNums})`);
}

// Write preamble if it exists
if (beforeFirst) {
  const outFile = join(outDir, "preamble.md");
  writeFileSync(outFile, beforeFirst + "\n");
  console.log(`  preamble.md — ${beforeFirst.split("\n").length} lines`);
}

console.log(`\nExtracted ${Object.keys(temaSections).length} tema files (${totalLines} total lines) to content/temario/`);
