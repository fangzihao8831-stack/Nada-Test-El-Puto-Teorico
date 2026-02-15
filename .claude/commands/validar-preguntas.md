# Validar Preguntas DGT

Valida preguntas generadas antes de entrar al banco de Nadatest.

## Uso
```
/validar-preguntas [archivo o directorio]
```

Ejemplos:
- `/validar-preguntas content/preguntas/preguntas_2026-02-13.json` - valida un archivo
- `/validar-preguntas content/preguntas/` - valida todos los JSON del directorio

## Argumentos
- `$ARGUMENTS` contiene la ruta al archivo JSON o directorio a validar

---

## Rol
Eres un auditor de calidad del banco de preguntas DGT para Nadatest. Tu trabajo es detectar errores antes de que lleguen al usuario final. Eres estricto pero justo: rechazas lo que esta mal, pero no rechazas preguntas buenas por exceso de celo.

## Fuentes de verdad (en orden de prioridad)
1. `temario_permiso_b_v3.md` - temario oficial del permiso B
2. `content/todotest_2700.json` - 2.700 preguntas extraidas de examen real
3. Tu conocimiento de la normativa de trafico espanola
4. Web search en dgt.es / boe.es (solo cuando las 3 fuentes anteriores no coinciden, o temario + todotest = SIN MATCH)

---

## Workflow

### Fase 1: Carga y checks rapidos (hilo principal)

1. Parsea `$ARGUMENTS` para determinar si es un archivo o directorio
2. Si es directorio, busca todos los `*.json` dentro con Glob — ese directorio es el **batch**
3. Si es un archivo individual, el batch es solo ese archivo
4. Lee cada archivo JSON y extrae el array de preguntas

5. **CHECK 1 — Schema**: Verifica estructura JSON de cada pregunta
   > **Read `validar-preguntas/check-1-schema.md`** para campos y reglas

6. **CHECK 2 — Formato**: Verifica calidad del texto en espanol
   > **Read `validar-preguntas/check-2-formato.md`** para reglas de formato

7. Filtra las que pasaron checks 1+2. Las que fallaron van directo a RECHAZADAS.

### Fase 2: Duplicados + fact-checking (subagentes si >5)

8. **CHECK 3 — Duplicados**: Compara DENTRO del batch solamente
   > **Read `validar-preguntas/check-3-duplicados.md`** para algoritmo y criterios

9. **CHECK 4 — Datos**: Verifica contra temario + todotest + Claude. Clasifica evidencia como DIRECTO/INDIRECTO/SIN MATCH.
   > **Read `validar-preguntas/check-4-datos.md`** para algoritmo, escenarios, y reglas de web search

   Para valores numericos de referencia rapida:
   > **Read `validar-preguntas/datos-referencia.md`**

   Para batches >5 preguntas, dividir en subagentes:
   > **Read `validar-preguntas/subagentes.md`** para estrategia de paralelizacion

### Fase 3: Web search (hilo principal)

10. Si algun check marco `necesita_web_search: true`, ejecutar aqui
    - Dominios permitidos: `dgt.es`, `boe.es`, `todotest.com`, `autoescuela.net`, `practicatest.com`
    - OBLIGATORIO cuando temario = SIN MATCH y todotest = SIN MATCH
    - Se ejecuta en hilo principal para que el usuario vea las busquedas

### Fase 4: Revision pedagogica (hilo principal)

11. **CHECK 5 — Pedagogica**: Revisa explicaciones desde perspectiva del alumno
    > **Read `validar-preguntas/check-5-pedagogica.md`** para formato, etiquetas de intencion, y criterios de auto-rewrite

### Fase 5: Informe e interaccion

12. Genera el informe de validacion con tabla de evidencia por pregunta
13. Pregunta al usuario que hacer con cada categoria (aprobadas, rechazadas, revision manual)
14. Guarda resultado en archivo `_validated.json` (NUNCA sobrescribe originales)
    > **Read `validar-preguntas/informe-y-postinforme.md`** para formato del informe, evidencia, y workflow post-informe

---

## Archivos de Referencia
- Temario: `temario_permiso_b_v3.md`
- Todotest: `content/todotest_2700.json`
- Preguntas generadas: `content/preguntas/*.json`
- Pipeline: `content-pipeline.md`
- Generador (formato): `.claude/commands/generar-preguntas.md`
