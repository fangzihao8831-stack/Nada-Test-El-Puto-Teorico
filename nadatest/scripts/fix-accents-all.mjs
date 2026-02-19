#!/usr/bin/env node

/**
 * Comprehensive Spanish accent/tilde fixer for all skill and content markdown files.
 * Covers: esdrújulas, -ción words, interrogatives, estar verb, por qué, ñ words, más.
 *
 * Usage: node scripts/fix-accents-all.mjs [--dry-run]
 */

import fs from 'fs';
import path from 'path';

const ROOT = path.resolve('..'); // Nadatest project root
const DRY_RUN = process.argv.includes('--dry-run');

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
  'content/validation-prompt.md',
  'content-pipeline.md',
  'requirements.md',
  'tasks.md',
];

// All replacements: [regex, replacement] — order matters (specific before general)
const replacements = [
  // === Fix WRONG accents ===
  [/\brazónar\b/g, 'razonar'],
  [/\bespecíficad/g, 'especificad'],

  // === Interrogatives (specific compound forms first) ===
  [/¿Desde cuando/g, '¿Desde cuándo'],
  [/¿Cada cuanto/g, '¿Cada cuánto'],
  [/¿A que /g, '¿A qué '],
  [/¿a que /g, '¿a qué '],
  [/¿En que /g, '¿En qué '],
  [/¿en que /g, '¿en qué '],
  [/¿Que /g, '¿Qué '],
  [/¿que /g, '¿qué '],
  [/¿Cual /g, '¿Cuál '],
  [/¿Cuando /g, '¿Cuándo '],
  [/¿Donde /g, '¿Dónde '],
  [/¿Como /g, '¿Cómo '],
  [/¿Cuanto /g, '¿Cuánto '],
  [/¿Cuantos /g, '¿Cuántos '],

  // === "está" verb patterns (very specific contexts only) ===
  [/\bEsta (permitido|prohibido|obligado|congestionado|detenido|correcto)\b/g, 'Está $1'],
  [/\besta (permitido|prohibido|obligado|congestionado|detenido|correcto|mal)\b/g, 'está $1'],
  [/\bestan (mal|bien)\b/g, 'están $1'],
  [/que esta aprendiendo\b/g, 'que está aprendiendo'],
  [/\besta evaluando\b/g, 'está evaluando'],
  [/no esta seguro\b/g, 'no está seguro'],

  // === "por qué" (why) patterns ===
  [/\bExplicar POR QUE\b/g, 'Explicar POR QUÉ'],
  [/\bPOR QUE\b/g, 'POR QUÉ'],
  [/\bExplicar por que\b/g, 'Explicar por qué'],
  [/\bpor que las otras/g, 'por qué las otras'],
  [/\bpor que estan/g, 'por qué están'],
  [/\bpor que es correcta/g, 'por qué es correcta'],
  [/\bpor que sorprende/g, 'por qué sorprende'],
  [/\bpor que A y C/g, 'por qué A y C'],

  // === ñ words ===
  [/\bsenalizar/g, 'señalizar'], [/\bSenalizar/g, 'Señalizar'],
  [/\bENSENAR\b/g, 'ENSEÑAR'],
  [/\bensena\b/g, 'enseña'], [/\bEnsena\b/g, 'Enseña'],
  [/\bAnadir\b/g, 'Añadir'], [/\banadir\b/g, 'añadir'],
  [/\bAnade\b/g, 'Añade'], [/\banade\b/g, 'añade'],
  [/\banos\b/g, 'años'],

  // === Esdrújulas (always accented) ===
  [/\bTeorico\b/g, 'Teórico'], [/\bteorico\b/g, 'teórico'],
  [/\bTeorica\b/g, 'Teórica'], [/\bteorica\b/g, 'teórica'],
  [/\bParrafo\b/g, 'Párrafo'], [/\bparrafo\b/g, 'párrafo'],
  [/\bPreambulo\b/g, 'Preámbulo'], [/\bpreambulo\b/g, 'preámbulo'],
  [/\bNumerico\b/g, 'Numérico'], [/\bnumerico\b/g, 'numérico'],
  [/\bNumericos\b/g, 'Numéricos'], [/\bnumericos\b/g, 'numéricos'],
  [/\bNumero\b/g, 'Número'], [/\bnumero\b/g, 'número'],
  [/\bTecnica\b/g, 'Técnica'], [/\btecnica\b/g, 'técnica'],
  [/\bTecnicas\b/g, 'Técnicas'], [/\btecnicas\b/g, 'técnicas'],
  [/\bTecnico\b/g, 'Técnico'], [/\btecnico\b/g, 'técnico'],
  [/\bEstadistica\b/g, 'Estadística'], [/\bestadistica\b/g, 'estadística'],
  [/\bEstadisticos\b/g, 'Estadísticos'], [/\bestadisticos\b/g, 'estadísticos'],
  [/\bSistematica\b/g, 'Sistemática'], [/\bsistematica\b/g, 'sistemática'],
  [/\bMeteorologicas\b/g, 'Meteorológicas'], [/\bmeteorologicas\b/g, 'meteorológicas'],
  [/\bMeteorologica\b/g, 'Meteorológica'], [/\bmeteorologica\b/g, 'meteorológica'],
  [/\bBasicas\b/g, 'Básicas'], [/\bbasicas\b/g, 'básicas'],
  [/\bBasica\b/g, 'Básica'], [/\bbasica\b/g, 'básica'],
  [/\bHistorico\b/g, 'Histórico'], [/\bhistorico\b/g, 'histórico'],
  [/\bTipico\b/g, 'Típico'], [/\btipico\b/g, 'típico'],
  [/\bExplicitos\b/g, 'Explícitos'], [/\bexplicitos\b/g, 'explícitos'],
  [/\bExplicito\b/g, 'Explícito'], [/\bexplicito\b/g, 'explícito'],
  [/\bExplicitamente\b/g, 'Explícitamente'], [/\bexplicitamente\b/g, 'explícitamente'],
  [/\bTriangulos\b/g, 'Triángulos'], [/\btriangulos\b/g, 'triángulos'],
  [/\bValidos\b/g, 'Válidos'], [/\bvalidos\b/g, 'válidos'],
  [/\bINVALIDO\b/g, 'INVÁLIDO'],
  [/\bInvalido\b/g, 'Inválido'], [/\binvalido\b/g, 'inválido'],
  [/\bInutiles\b/g, 'Inútiles'], [/\binutiles\b/g, 'inútiles'],
  [/\bUtil\b/g, 'Útil'], [/\butil\b/g, 'útil'],
  [/\bPatron\b/g, 'Patrón'], [/\bpatron\b/g, 'patrón'],
  [/\bCRITICA\b/g, 'CRÍTICA'], [/\bCRITICO\b/g, 'CRÍTICO'],
  [/\bCritica\b/g, 'Crítica'], [/\bcritica\b/g, 'crítica'],
  [/\bCritico\b/g, 'Crítico'], [/\bcritico\b/g, 'crítico'],

  // === -ción/-sión words ===
  [/\bAfirmacion\b/g, 'Afirmación'], [/\bafirmacion\b/g, 'afirmación'],
  [/\bTransformacion\b/g, 'Transformación'], [/\btransformacion\b/g, 'transformación'],
  [/\bPercepcion\b/g, 'Percepción'], [/\bpercepcion\b/g, 'percepción'],
  [/\bGeneracion\b/g, 'Generación'], [/\bgeneracion\b/g, 'generación'],
  [/\bDistribucion\b/g, 'Distribución'], [/\bdistribucion\b/g, 'distribución'],
  [/\bCombinacion\b/g, 'Combinación'], [/\bcombinacion\b/g, 'combinación'],
  [/\bClasificacion\b/g, 'Clasificación'], [/\bclasificacion\b/g, 'clasificación'],
  [/\bImplementacion\b/g, 'Implementación'], [/\bimplementacion\b/g, 'implementación'],
  [/\bDeteccion\b/g, 'Detección'], [/\bdeteccion\b/g, 'detección'],
  [/\bInvestigacion\b/g, 'Investigación'], [/\binvestigacion\b/g, 'investigación'],
  [/\bComparacion\b/g, 'Comparación'], [/\bcomparacion\b/g, 'comparación'],
  [/\bVALIDACION\b/g, 'VALIDACIÓN'],
  [/\bValidacion\b/g, 'Validación'], [/\bvalidacion\b/g, 'validación'],
  [/\bREVISION\b/g, 'REVISIÓN'],
  [/\bRevision\b/g, 'Revisión'], [/\brevision\b/g, 'revisión'],
  [/\bDecision\b/g, 'Decisión'], [/\bdecision\b/g, 'decisión'],
  [/\bACCION\b/g, 'ACCIÓN'],
  [/\bAccion\b/g, 'Acción'], [/\baccion\b/g, 'acción'],
  [/\bIntencion\b/g, 'Intención'], [/\bintencion\b/g, 'intención'],
  [/\bSeparacion\b/g, 'Separación'], [/\bseparacion\b/g, 'separación'],
  [/\bExencion\b/g, 'Exención'], [/\bexencion\b/g, 'exención'],
  [/\bSujecion\b/g, 'Sujeción'], [/\bsujecion\b/g, 'sujeción'],
  [/\bDefinicion\b/g, 'Definición'], [/\bdefinicion\b/g, 'definición'],
  [/\bDescripcion\b/g, 'Descripción'], [/\bdescripcion\b/g, 'descripción'],
  [/\bInterrogacion\b/g, 'Interrogación'], [/\binterrogacion\b/g, 'interrogación'],
  [/\bCondicion\b/g, 'Condición'], [/\bcondicion\b/g, 'condición'],
  [/\bConfiguracion\b/g, 'Configuración'], [/\bconfiguracion\b/g, 'configuración'],
  [/\bInterseccion\b/g, 'Intersección'], [/\binterseccion\b/g, 'intersección'],
  [/\bAutovalidacion\b/g, 'Autovalidación'], [/\bautovalidacion\b/g, 'autovalidación'],
  [/\bDuracion\b/g, 'Duración'], [/\bduracion\b/g, 'duración'],
  [/\bAntelacion\b/g, 'Antelación'], [/\bantelacion\b/g, 'antelación'],

  // === -ía words ===
  [/\bTravesia\b/g, 'Travesía'], [/\btravesia\b/g, 'travesía'],
  [/\bIngenieria\b/g, 'Ingeniería'], [/\bingenieria\b/g, 'ingeniería'],
  [/\bmercancias\b/g, 'mercancías'], [/\bMercancias\b/g, 'Mercancías'],
  [/\bdaria\b/g, 'daría'], [/\bDaria\b/g, 'Daría'],
  [/\bdeberia\b/g, 'debería'], [/\bDeberia\b/g, 'Debería'],

  // === Common accented words ===
  [/\bSegun\b/g, 'Según'], [/\bsegun\b/g, 'según'],
  [/\bAutobus\b/g, 'Autobús'], [/\bautobus\b/g, 'autobús'],
  [/\bDetras\b/g, 'Detrás'], [/\bdetras\b/g, 'detrás'],
  [/\bAtras\b/g, 'Atrás'], [/\batras\b/g, 'atrás'],
  [/\bDespues\b/g, 'Después'], [/\bdespues\b/g, 'después'],
  [/\bCodigo\b/g, 'Código'], [/\bcodigo\b/g, 'código'],
  [/\bIngles\b/g, 'Inglés'], [/\bingles\b/g, 'inglés'],
  [/\bralenti\b/g, 'ralentí'],
  [/\bantiguedad\b/g, 'antigüedad'], [/\bAntiguedad\b/g, 'Antigüedad'],
  [/\bextraidas\b/g, 'extraídas'], [/\bExtraidas\b/g, 'Extraídas'],
  [/\bBusqueda\b/g, 'Búsqueda'], [/\bbusqueda\b/g, 'búsqueda'],
  [/\bVacias\b/g, 'Vacías'], [/\bvacias\b/g, 'vacías'],
  [/\bCronica\b/g, 'Crónica'], [/\bcronica\b/g, 'crónica'],
  [/\bArticulos\b/g, 'Artículos'], [/\barticulos\b/g, 'artículos'],
  [/\bReune\b/g, 'Reúne'], [/\breune\b/g, 'reúne'],
  [/\bocurrio\b/g, 'ocurrió'], [/\bOcurrio\b/g, 'Ocurrió'],
  [/\blinea\b/g, 'línea'], [/\bLinea\b/g, 'Línea'],

  // === "más" (more) — surrounded by whitespace ===
  [/(?<=\s)mas(?=\s)/g, 'más'],
  [/\bMas /g, 'Más '],
];

let totalFixed = 0;

for (const relPath of files) {
  const fullPath = path.join(ROOT, relPath);
  let content;
  try {
    content = fs.readFileSync(fullPath, 'utf8');
  } catch (e) {
    console.log(`SKIP: ${relPath} (${e.message})`);
    continue;
  }

  const original = content;

  // Apply replacements line by line, skipping JSON field lines inside code blocks
  let inCodeBlock = false;
  const lines = content.split('\n');
  const fixedLines = [];

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      fixedLines.push(line);
      continue;
    }

    // Skip JSON field definition lines inside code blocks
    if (inCodeBlock && /^\s*"(id|subtema_id|tipo_|correcta|validada|origen|usa_trampa|palabras_trampa)"/.test(line)) {
      fixedLines.push(line);
      continue;
    }

    let fixed = line;
    for (const [find, replace] of replacements) {
      fixed = fixed.replace(find, replace);
    }
    fixedLines.push(fixed);
  }

  const newContent = fixedLines.join('\n');

  if (newContent !== original) {
    const origLines = original.split('\n');
    const newLines = newContent.split('\n');
    let changes = 0;
    for (let i = 0; i < origLines.length; i++) {
      if (origLines[i] !== newLines[i]) changes++;
    }
    totalFixed += changes;
    if (!DRY_RUN) {
      fs.writeFileSync(fullPath, newContent, 'utf8');
    }
    console.log(`${DRY_RUN ? 'WOULD FIX' : 'FIXED'}: ${relPath} (${changes} lines)`);
  } else {
    console.log(`OK: ${relPath} (no changes)`);
  }
}

console.log(`\nTotal: ${totalFixed} lines ${DRY_RUN ? 'would be ' : ''}fixed across ${files.length} files`);
