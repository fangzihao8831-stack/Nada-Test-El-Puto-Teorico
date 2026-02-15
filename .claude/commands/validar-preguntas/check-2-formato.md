# CHECK 2: Formato e Idioma

Verifica la calidad del texto en español.

## Reglas
1. **Acentos**: Las palabras comunes deben tener acentos correctos (vehículo, circulación, señalización, límite, esta, podra, debera, etc.)
2. **Signos de interrogacion**: Las preguntas deben abrir con `¿` (enunciado que termina en `?` debe empezar con `¿`)
3. **Sin ingles**: No debe haber palabras en ingles ni artefactos de codigo en campos de texto (enunciado, opciones, explicación, pista)
4. **Mayusculas en opciones**: Las opciones no deben empezar con minuscula, EXCEPTO en preguntas tipo `completar` donde la opción continua la frase
5. **Espacios**: Sin espacios al inicio o final de campos de texto (trim)
6. **Puntos suspensivos**: Las preguntas tipo `completar` deben tener `...` en el enunciado

## Veredicto
- REJECT si los acentos faltan de forma sistematica (>50% de las palabras que los necesitan)
- WARN si hay problemas menores (1-2 acentos faltantes, espacios extra)
- PASS si todo esta correcto
