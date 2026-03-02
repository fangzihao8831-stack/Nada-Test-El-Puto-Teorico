#!/usr/bin/env node

/**
 * Extracts specific TEMA sections from temario_permiso_b_v3.md by number.
 * Usage: node scripts/extract-temario.mjs 1 5 7 8 11 17 22 27
 * Output: Preamble + selected TEMA sections to stdout.
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..", "..");
const temarioPath = resolve(projectRoot, "temario_permiso_b_v3.md");

const requested = new Set(process.argv.slice(2).map(Number));
if (requested.size === 0) {
  console.error("Usage: node extract-temario.mjs <TEMA numbers...>");
  console.error("Example: node extract-temario.mjs 1 5 7 8 11 17 22 27");
  process.exit(1);
}

const lines = readFileSync(temarioPath, "utf-8").split("\n");
const headerRe = /^# TEMA (\d+):/;

// Find all TEMA header positions
const headers = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(headerRe);
  if (m) headers.push({ line: i, num: parseInt(m[1]) });
}

// Always include preamble (exam info before first TEMA)
const preamble = lines.slice(0, headers[0]?.line ?? 0).join("\n").trimEnd();
if (preamble) process.stdout.write(preamble + "\n\n");

// Extract requested sections
let count = 0;
for (let i = 0; i < headers.length; i++) {
  if (!requested.has(headers[i].num)) continue;
  const start = headers[i].line;
  const end = i + 1 < headers.length ? headers[i + 1].line : lines.length;
  process.stdout.write(lines.slice(start, end).join("\n").trimEnd() + "\n\n");
  count++;
}

process.stderr.write(`Extracted ${count}/${requested.size} TEMA sections\n`);
