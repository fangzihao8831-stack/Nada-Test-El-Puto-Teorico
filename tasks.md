# Nadatest - Tareas por Fase

## PROXIMA SESION (prioridad)

### A. Analizar formato real de preguntas DGT
- [ ] Usar Playwright para revisar 30 tests de Todotest (seccion examen DGT: /tests/examendin.asp)
- [ ] Cada test tiene 30 preguntas (URL: test.asp?tip=1&t=XXX, donde t=116 es test 001)
- [ ] Contar por cada test: preguntas con imagen, preguntas de senales, situacionales, directas, completar, trampa
- [ ] Calcular la proporcion real sobre 900 preguntas (30 tests x 30 preguntas)
- [ ] Analizar formato: longitud enunciados, longitud opciones, estilo de redaccion
- [ ] Actualizar generar-preguntas.md con las proporciones y formato corregidos

### B. Descargar imagenes de senales
- [ ] Descargar SVGs de senales de trafico de Wikimedia (https://commons.wikimedia.org/wiki/Road_signs_of_Spain)
- [ ] Guardar en `content/imagenes/senales/`
- [ ] Organizar por tipo (P-peligro, R-reglamentacion, S-indicacion)
- [ ] Nombrar archivos con codigo de senal (ej: R-301.svg, P-1.svg)

---

## Fase 0: Preparacion de Contenido
- [x] 0.1 Crear content-structure.json con 12 temas y 58 subtemas
- [ ] 0.2 Crear Skill 1: Generador de preguntas (`/generar-preguntas`) — pendiente ajustar formato tras analisis
- [ ] 0.3 Crear Skill 2: Extractor de webs
- [ ] 0.4 Crear Skill 3: Validador
- [ ] 0.5 Crear Skill 4: Generador de imagenes
- [ ] 0.6 Descargar batch de senales SVG de Wikimedia
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
