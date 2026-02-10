# Nadatest - Requisitos del Producto

## Descripcion General

**Nadatest** es una plataforma web inspirada en Todotest, disenada para ayudar a las personas a prepararse y aprobar el examen de conducir del DGT (Direccion General de Trafico) en Espana.

### Vision
Crear una plataforma moderna, intuitiva y completa que combine tests de practica con materiales de estudio organizados, permitiendo a los usuarios prepararse de manera efectiva para obtener su permiso de conducir.

### Contexto del Proyecto
- **Desarrollador**: Individual (solo)
- **Experiencia tecnica**: Conocimientos basicos de HTML/CSS/JS
- **Timeline**: Sin fecha fija, cuando este listo
- **Idioma**: Espanol peninsular
- **Publico objetivo**: Jovenes preparando el carnet de conducir

---

## Alcance del MVP

### Incluido en MVP
- Permiso B (coches) unicamente
- Tests pre-creados (100 tests con 30 preguntas cada uno)
- Sistema de tests con dos modos (examen y estudio)
- Materiales de estudio (PPTs, videos)
- Sistema de usuarios con registro/login
- Dashboard con historial completo
- Panel de administracion completo
- 100-300 preguntas iniciales

### Fuera del MVP
Ver archivo `future-features.md` para funcionalidades futuras.

---

## Sistema de Usuarios

### Autenticacion
- Registro tradicional con email + contrasena
- Login social (Google)
- Verificacion de email

### Dashboard del Usuario
El perfil mostrara:
- **Estadisticas generales**: Tests realizados, % de aciertos global, tests aprobados/suspendidos
- **Progreso por temas**: Rendimiento desglosado por cada tema
- **Historial completo**: Registro de cada test realizado

---

## Estructura de Navegacion

### Menu Principal
```
[Logo NADATEST]  [Mi Objetivo]  [Progreso]  [Mis Fallos]  [Usuario]
```

### Paginas del Sistema

#### 1. Pagina Principal (Home)
- Saludo personalizado + racha de dias
- Permiso que esta preparando
- Boton grande "REALIZAR TEST"
- Seccion con 3 tarjetas:
  - Resumen rapido (tests realizados, media, tema debil)
  - Ultimos tests (historial reciente)
  - Fallos totales (numero + enlace)

#### 2. Mi Objetivo
- Seleccion del permiso a preparar (B, A1, A2, C, D...)
- MVP: Solo Permiso B disponible

#### 3. Progreso
- Lista de temas ordenados por fallos (mas fallos primero)
- Barra de progreso por tema
- Boton "Practicar este tema"

#### 4. Mis Fallos
- Lista de todas las preguntas falladas
- Filtro por tema
- Boton "Repasar todos"

---

## Sistema de Tests

### Tests Pre-creados
- **100 tests** preparados con 30 preguntas cada uno
- Proporcion de temas similar al examen DGT oficial
- Se guardan cuales ha completado el usuario

### Modal de Seleccion
- Switch Examen/Estudio
- Proximos tests pendientes
- Opcion practicar por tema
- Opcion repasar fallos

### Modo Examen
| Caracteristica | Detalle |
|----------------|---------|
| Preguntas | 30 |
| Tiempo | 30 minutos |
| Pistas | No |
| Feedback | Solo al finalizar |

### Modo Estudio
| Caracteristica | Detalle |
|----------------|---------|
| Preguntas | 30 |
| Tiempo | Sin limite |
| Pistas | Si |
| Feedback | Inmediato |

---

## Layout del Panel de Test

### Desktop
```
+------------------------------------------------------------------+
| [LOGO]  Test Permiso B  |  Usuario  |  [progreso] 25:30         |
+------------------------------------------------------------------+
|  10.  +----------+   Pregunta aqui...?                     (?)  |
|       |  IMAGEN  |   Tema: Senales                              |
|       +----------+   ( ) A) Opcion A                            |
|                      ( ) B) Opcion B                            |
|                      ( ) C) Opcion C                            |
|       +--------------------------------------------------+      |
|       | [Feedback + Ver explicacion]                     |      |
|       +--------------------------------------------------+      |
|       [<- Anterior]    [SIGUIENTE ->]    [FINALIZAR]            |
+------------------------------------------------------------------+
|  01  02  03  04  05  ...  [10]  ...  26  27  28  29  30        |
+------------------------------------------------------------------+
```

### Movil
```
+---------------------------+
| [Menu]  NADATEST   25:30  |
+---------------------------+
| Pregunta 10/30 [=====   ] |
+---------------------------+
|  +---------------------+  |
|  |       IMAGEN        |  |
|  +---------------------+  |
|  Pregunta aqui...?   (?)  |
|  Tema: Senales | **       |
|  +---------------------+  |
|  | A) Opcion A         |  |
|  +---------------------+  |
|  | B) Opcion B         |  |
|  +---------------------+  |
|  | C) Opcion C         |  |
|  +---------------------+  |
|  +---------------------+  |
|  | FEEDBACK            |  |
|  +---------------------+  |
|  [<-]    [SIGUIENTE ->]   |
|  [Ver todas (10/30)]      |
+---------------------------+
```

---

## Diseno y UX

### Responsive Design
- **Mobile-first**: Prioridad en experiencia movil
- UI adaptativa

### Especificaciones Confirmadas
- **Colores**: Base azul (#3B82F6) + blancos + grises
- **Esquinas**: Redondeadas (8-12px)
- **Sombras**: Suaves, sutiles
- **Feedback**: Verde/Rojo clasico
- **Animaciones**: Minimas
- **Tipografia**: Inter o Geist
- **Iconos**: Lucide o Heroicons

---

## Archivos Relacionados

- `technical.md` - Stack, estructura, API, SQL, componentes
- `content-pipeline.md` - Pipeline de contenido, skills, formato JSON
- `tasks.md` - Tareas por fase (checklist)
- `future-features.md` - Funcionalidades futuras
- `content/content-structure.json` - Estructura de temas/subtemas
- `temario_permiso_b_v3.md` - Temario completo

---

## Recursos Utiles

- [DGT - Direccion General de Trafico](https://www.dgt.es)
- [Senales DGT - Wikimedia](https://commons.wikimedia.org/wiki/Road_signs_of_Spain)
- [Todotest](https://www.todotest.com) - Inspiracion
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)

---

*Ultima actualizacion: Febrero 2026*
