# Nadatest - Tareas por Fase

## PROXIMA SESION (prioridad)

### A. Analizar formato real de preguntas DGT
- [x] Extraer 2.700 preguntas de 90 tests Todotest (content/todotest_3000.json)
- [x] Extraer 30 preguntas del examen oficial DGT (content/dgt_oficial_exam.json)
- [x] Analizar distribucion de tipos: directa 40%, situacional 27%, completar 23%, dato 10%
- [x] Analizar palabras trampa con frecuencias (siempre 254, solamente 117, nunca 37, etc.)
- [x] Analizar patrones de inicio de pregunta (75% afirmacion, 25% pregunta)
- [x] Analizar datos numericos testados (velocidades, alcohol, distancias, tiempos)
- [x] Actualizar generar-preguntas.md con proporciones y formato corregidos
- [x] Actualizar temario con datos faltantes (Hill Holder, RCTA 15 km/h, 15m parada bus, reglas ADAS)

### B. Descargar imagenes de senales
- [x] Descargar SVGs de senales de trafico de Wikimedia
- [x] Guardar en `content/imagenes/senales/`
- [x] Organizar por tipo (P-peligro, R-reglamentacion, S-indicacion)
- [x] Nombrar archivos con codigo de senal (ej: R-301.svg, P-1.svg)

---

## Fase 0: Preparacion de Contenido
- [x] 0.1 Crear content-structure.json con 12 temas y 58 subtemas
- [ ] 0.2 Crear Skill 1: Generador de preguntas (`/generar-preguntas`) — prompt actualizado con datos reales, pendiente de completar
- [ ] 0.3 Skill 2: Extractor de webs (pausado — datos ya extraidos manualmente)
- [ ] 0.4 Crear Skill 3: Validador (deduplicacion + verificacion contra temario)
- [ ] 0.5 Crear Skill 4: Generador de imagenes (DALL-E 3 + revision por Claude)
- [x] 0.6 Descargar batch de senales SVG de Wikimedia
- [ ] 0.7 Generar 100-300 preguntas iniciales
- [ ] 0.8 Crear los 100 tests pre-definidos

## Fase 1: Fundacion
- [ ] 1.1 npx create-next-app@latest nadatest --typescript --tailwind --app
- [ ] 1.2 Instalar dependencias: shadcn/ui, @supabase/supabase-js
- [ ] 1.3 Configurar estructura de carpetas
- [ ] 1.4 Crear proyecto en Supabase
- [ ] 1.5 Ejecutar schema SQL en Supabase
- [ ] 1.6 Configurar variables de entorno
- [ ] 1.7 Implementar auth con Supabase (email + Google)
- [ ] 1.8 Crear componentes UI base con shadcn
- [ ] 1.9 Definir paleta de colores y tipografia

## Fase 2: Core - Tests
- [ ] 2.1 Crear TestPanel component
- [ ] 2.2 Crear QuestionCard component
- [ ] 2.3 Crear AnswerOptions component
- [ ] 2.4 Crear Timer component
- [ ] 2.5 Crear TestNavigation (grid 1-30)
- [ ] 2.6 Implementar logica modo examen
- [ ] 2.7 Crear FeedbackPanel component
- [ ] 2.8 Implementar logica modo estudio
- [ ] 2.9 Crear TestModal para seleccion
- [ ] 2.10 Crear pantalla de resultados
- [ ] 2.11 Implementar guardado de resultados en Supabase

## Fase 3: Paginas Principales
- [ ] 3.1 Crear pagina Home/Dashboard
- [ ] 3.2 Crear pagina Mi Objetivo
- [ ] 3.3 Crear pagina Progreso
- [ ] 3.4 Crear pagina Mis Fallos
- [ ] 3.5 Crear seccion Materiales de estudio
- [ ] 3.6 Implementar navegacion responsive

## Fase 4: Admin y UX
- [ ] 4.1 Crear layout admin
- [ ] 4.2 CRUD preguntas
- [ ] 4.3 CRUD tests
- [ ] 4.4 Importacion JSON masiva
- [ ] 4.5 Dashboard admin con estadisticas
- [ ] 4.6 Gestion de usuarios
- [ ] 4.7 Pulir experiencia movil
- [ ] 4.8 Optimizar rendimiento

## Fase 5: Testing y Launch
- [ ] 5.1 Testing funcional completo
- [ ] 5.2 Testing responsive
- [ ] 5.3 Correccion de bugs
- [ ] 5.4 Importar contenido final
- [ ] 5.5 Deploy a Vercel
- [ ] 5.6 Configurar dominio (futuro)

---

*Ultima actualizacion: Febrero 2026*
