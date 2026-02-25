#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..", "..");
const dir = join(projectRoot, "content", "preguntas");

for (const batch of readdirSync(dir).filter(d => d.startsWith("batch_"))) {
  const batchDir = join(dir, batch);
  const jsonFile = readdirSync(batchDir).find(f => f.endsWith(".json"));
  if (!jsonFile) continue;
  const data = JSON.parse(readFileSync(join(batchDir, jsonFile), "utf-8"));
  const lines = data.preguntas.map(q => {
    const short = q.enunciado.length > 80 ? q.enunciado.slice(0, 80) + "..." : q.enunciado;
    return q.subtema_id + " | " + short;
  });
  writeFileSync(join(batchDir, "scenarios.txt"), lines.join("\n") + "\n");
  console.log(batch + ": " + lines.length + " scenarios");
}
