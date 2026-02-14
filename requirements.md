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

#### 0. Landing Page (No autenticado)
Pagina de aterrizaje para visitantes no registrados. Objetivo: conversion (registro o prueba).

```
+---------------------------------------------+
| NADATEST                [Iniciar sesion]     |
+---------------------------------------------+
|                                              |
|   Prepara tu examen teorico                  |
|       del permiso B                          |
|                                              |
|   Practica con tests que simulan el formato  |
|   real de la DGT. 30 preguntas, 30 minutos.  |
|                                              |
|   [EXAMEN DE PRUEBA]   [REGISTRATE]          |
|    (outline/secondary)   (primary/azul)      |
|                                              |
+---------------------------------------------+
|                                              |
|  +----------+ +----------+ +----------+      |
|  |  Tests   | |  Modo    | | Progreso |      |
|  |  reales  | | examen y | |    y     |      |
|  |          | | estudio  | |  fallos  |      |
|  | 30 preg. | | Con o sin| | Sigue tu |      |
|  | formato  | | tiempo,  | | avance   |      |
|  | oficial  | | con pist.| | por tema |      |
|  +----------+ +----------+ +----------+      |
|                                              |
+---------------------------------------------+
|                                              |
|   "Como funciona"                            |
|                                              |
|   1. Registrate gratis                       |
|   2. Elige un test (100 disponibles)         |
|   3. Practica en modo examen o estudio       |
|   4. Revisa tus fallos y mejora              |
|                                              |
+---------------------------------------------+
|                                              |
|   Listo para empezar?                        |
|   [CREAR CUENTA GRATIS]                      |
|                                              |
|   Basado en el temario oficial de la DGT.    |
|                                              |
+---------------------------------------------+
```

Movil:
```
+---------------------------+
| NADATEST   [Iniciar ses.] |
+---------------------------+
|                           |
|  Prepara tu examen        |
|  teorico del permiso B    |
|                           |
|  30 preguntas, 30 min.    |
|  Formato real de la DGT.  |
|                           |
|  [EXAMEN DE PRUEBA]       |
|  [REGISTRATE]             |
|                           |
+---------------------------+
|  +---------------------+  |
|  | Tests reales        |  |
|  | 30 preg. formato..  |  |
|  +---------------------+  |
|  +---------------------+  |
|  | Modo examen/estudio |  |
|  | Con o sin tiempo..  |  |
|  +---------------------+  |
|  +---------------------+  |
|  | Progreso y fallos   |  |
|  | Sigue tu avance..   |  |
|  +---------------------+  |
+---------------------------+
|  Como funciona             |
|  1. Registrate gratis     |
|  2. Elige un test         |
|  3. Practica              |
|  4. Revisa fallos         |
+---------------------------+
|  Listo para empezar?      |
|  [CREAR CUENTA GRATIS]    |
|  Temario oficial DGT.     |
+---------------------------+
```

Especificaciones:
- **CTA principal**: "Registrate" (primary/azul, lleva a `/register`)
- **CTA secundaria**: "Examen de prueba" (outline, inicia test demo sin cuenta)
- **Seccion features**: 3 tarjetas con iconos (FileText, Timer, BarChart3)
- **Seccion "Como funciona"**: 4 pasos numerados, fondo sutil
- **CTA final**: "Crear cuenta gratis" al pie, refuerza conversion
- **Sin autenticacion requerida**: El test de prueba funciona sin registro
- **Ruta**: `/` (raiz, redirige a `/dashboard` si ya esta autenticado)

#### 1. Dashboard (Home autenticado)
Ruta: `/dashboard`. Requiere autenticacion.

```
+----------------------------------------------------------+
| [=] NADATEST                                    [Avatar] |
+----------------------------------------------------------+
| Inicio     |                                             |
| Tests      |  Bienvenido a Nadatest                      |
| Objetivo   |  Tu progreso de hoy y resumen reciente.     |
| Progreso   |                                             |
| Fallos     |  +----------+ +----------+ +----------+     |
| Materiales |  | Tests    | | Nota     | | Racha    |     |
|            |  | realizad.| | media    | | actual   |     |
|            |  |    12    | |   87%    | |  7 dias  |     |
|            |  | este mes | |  +5% ^   | |          |     |
|            |  +----------+ +----------+ +----------+     |
|            |                                             |
|            |  +---------------------------------------+  |
|            |  | Listo para practicar?                 |  |
|            |  | Realiza un test de 30 preguntas.      |  |
|            |  |                    [Comenzar test ->]  |  |
|            |  +---------------------------------------+  |
|            |  (fondo azul degradado)                     |
|            |                                             |
|            |  Tests recientes                            |
|            |  +---------------------------------------+  |
|            |  | Test #15  12/02  28/30  [Aprobado]    |  |
|            |  +---------------------------------------+  |
|            |  | Test #14  11/02  25/30  [Suspendido]  |  |
|            |  +---------------------------------------+  |
|            |  | Test #13  10/02  29/30  [Aprobado]    |  |
|            |  +---------------------------------------+  |
+----------------------------------------------------------+
```

Movil:
```
+---------------------------+
| [=] NADATEST     [Avatar] |
+---------------------------+
| Bienvenido a Nadatest     |
|                           |
| +--------+ +--------+    |
| |Tests 12| |Media 87|    |
| +--------+ +--------+    |
| +--------+ +--------+    |
| |Racha 7 | |Fallos23|    |
| +--------+ +--------+    |
|                           |
| +---------------------+  |
| | Listo para practicar|  |
| | [Comenzar test ->]  |  |
| +---------------------+  |
|                           |
| Tests recientes           |
| +---------------------+  |
| | #15 28/30 Aprobado  |  |
| +---------------------+  |
| | #14 25/30 Suspendido|  |
| +---------------------+  |
+---------------------------+
```

#### 2. Login
Ruta: `/login`. Sin autenticacion.

```
+---------------------------+
| NADATEST                  |
|  (fondo degradado azul)   |
|                           |
| +---------------------+  |
| |  Iniciar sesion     |  |
| |  Accede a tu cuenta |  |
| |                     |  |
| |  [Correo          ]|  |
| |  [Contrasena      ]|  |
| |  [INICIAR SESION]  |  |
| |  ------o------     |  |
| |  [Continuar Google]|  |
| |                     |  |
| |  No tienes cuenta?  |  |
| |  Registrate         |  |
| +---------------------+  |
+---------------------------+
```

#### 3. Register
Ruta: `/register`. Sin autenticacion.

```
+---------------------------+
| NADATEST                  |
|  (fondo degradado azul)   |
|                           |
| +---------------------+  |
| |  Crear cuenta       |  |
| |  Registrate gratis  |  |
| |                     |  |
| |  [Nombre           ]|  |
| |  [Correo           ]|  |
| |  [Contrasena       ]|  |
| |  [Confirmar        ]|  |
| |  [CREAR CUENTA]     |  |
| |  ------o------      |  |
| |  [Continuar Google] |  |
| |                     |  |
| |  Ya tienes cuenta?  |  |
| |  Inicia sesion      |  |
| +---------------------+  |
+---------------------------+
```

#### 4. Mi Objetivo
Ruta: `/objetivo`. Requiere autenticacion.

```
+----------------------------------------------------------+
| [=] NADATEST                                    [Avatar] |
+----------------------------------------------------------+
| Inicio     |                                             |
| Tests      |  Mi objetivo                                |
| Objetivo*  |  Define tu meta hacia el examen.            |
| Progreso   |                                             |
| Fallos     |  +---------------------------------------+  |
| Materiales |  | [Calendario] Fecha del examen         |  |
|            |  | Indica cuando te presentas.           |  |
|            |  | [____15/04/2026____]                  |  |
|            |  | Faltan 62 dias.                       |  |
|            |  +---------------------------------------+  |
|            |                                             |
|            |  +---------------------------------------+  |
|            |  | [Lista] Objetivo diario               |  |
|            |  | Tests por dia: [2]                    |  |
|            |  | Hoy llevas 1 de 2 completados.        |  |
|            |  +---------------------------------------+  |
|            |                                             |
|            |  +---------------------------------------+  |
|            |  | [Diana] Progreso hacia tu objetivo    |  |
|            |  | Tests completados   [====     ] 20%   |  |
|            |  | Temas estudiados    [======   ] 67%   |  |
|            |  | Nota media          [========= ] 87%  |  |
|            |  +---------------------------------------+  |
+----------------------------------------------------------+
```

#### 5. Progreso
Ruta: `/progreso`. Requiere autenticacion.

```
+----------------------------------------------------------+
| [=] NADATEST                                    [Avatar] |
+----------------------------------------------------------+
| Inicio     |                                             |
| Tests      |  Mi progreso                                |
| Objetivo   |  Rendimiento y avance por temas.            |
| Progreso*  |                                             |
| Fallos     |  +----------+ +----------+ +----------+     |
| Materiales |  | Tests    | | Nota     | | Mejor    |     |
|            |  | totales  | | media    | | nota     |     |
|            |  |    34    | |   87%    | |   97%    |     |
|            |  +----------+ +----------+ +----------+     |
|            |                                             |
|            |  Progreso por temas                         |
|            |  +---------------------------------------+  |
|            |  | > El Conductor y el Permiso    [75%]  |  |
|            |  +---------------------------------------+  |
|            |  | > El Vehiculo                  [60%]  |  |
|            |  +---------------------------------------+  |
|            |  | > Carga, Pasajeros...          [45%]  |  |
|            |  +---------------------------------------+  |
|            |  | v Circulacion y Velocidad      [90%]  |  |
|            |  |   [=========                 ]        |  |
|            |  |   - Conceptos basicos                 |  |
|            |  |   - Normativa                         |  |
|            |  |   - Casos practicos                   |  |
|            |  +---------------------------------------+  |
|            |  ...12 temas total                          |
+----------------------------------------------------------+
```

#### 6. Mis Fallos
Ruta: `/fallos`. Requiere autenticacion.

```
+----------------------------------------------------------+
| [=] NADATEST                                    [Avatar] |
+----------------------------------------------------------+
| Inicio     |                                             |
| Tests      |  Preguntas falladas   [Practicar fallos]    |
| Objetivo   |  Repasa lo que mas te cuesta.               |
| Progreso   |                                             |
| Fallos*    |  +----------+                               |
| Materiales |  | Total    |                               |
|            |  | fallos   |                               |
|            |  |    4     |                               |
|            |  +----------+                               |
|            |                                             |
|            |  +---------------------------------------+  |
|            |  | Cual es la tasa maxima de alcohol...  |  |
|            |  | [Factores de Riesgo] 4x  12/02       |  |
|            |  +---------------------------------------+  |
|            |  | En una interseccion sin senalizar...  |  |
|            |  | [Prioridad y Maniobras] 3x  11/02    |  |
|            |  +---------------------------------------+  |
|            |  | Cual es la distancia minima...        |  |
|            |  | [Circulacion y Velocidad] 2x  10/02  |  |
|            |  +---------------------------------------+  |
+----------------------------------------------------------+
```

Estado vacio:
```
+---------------------------------------+
|          [icono]                       |
|       Perfecto!                        |
|  No tienes preguntas falladas.         |
+---------------------------------------+
```

#### 7. Seleccion de Test
Ruta: `/test`. Requiere autenticacion.

```
+---------------------------+
| Realizar test             |
| Elige un modo.            |
|                           |
| +---------------------+  |
| | [Doc] Test de 30    |  |
| | preguntas. Formato  |  |
| | oficial DGT. 27     |  |
| | correctas p/ aprobar|  |
| +---------------------+  |
|                           |
| [  Examen  |  Estudio  ] |
|                           |
| +---------------------+  |
| | [Reloj] Modo examen |  |
| | Preguntas: 30       |  |
| | Tiempo: 30 min      |  |
| | Aprobar: 27         |  |
| | Feedback: Al final  |  |
| |                     |  |
| | [COMENZAR EXAMEN]   |  |
| +---------------------+  |
+---------------------------+
```

#### 8. Resultado del Test
Ruta: `/test/resultado`. Requiere autenticacion.

```
+---------------------------+
| +---------------------+  |
| |    [Suspendido]     |  |
| |      25/30          |  |
| | Necesitabas 27.     |  |
| +---------------------+  |
|                           |
| +------+ +------+ +----+ |
| |25:30 | |  25  | |  5 | |
| |Tiempo| |Correc| |Inco| |
| +------+ +------+ +----+ |
|                           |
| Revision de preguntas     |
| +---------------------+  |
| | 1. Velocidad max... |  |
| | [v] 120 km/h        |  |
| +---------------------+  |
| | 2. Senal de STOP... |  |
| | [x] Reducir veloc.  |  |
| | [v] Detenerse       |  |
| +---------------------+  |
| ________________________  |
| [Revisar] [Siguiente ->] |
| [Volver al inicio]       |
+---------------------------+
```

#### 9. Materiales de Estudio
Ruta: `/materiales`. Requiere autenticacion.

```
+----------------------------------------------------------+
| Materiales de estudio                                    |
| Temario organizado por los 12 temas.                     |
|                                                          |
| [i] Contenido basado en el temario oficial de la DGT.    |
|                                                          |
| +-----------------------------------------------------+ |
| | > El Conductor y el Permiso                         | |
| +-----------------------------------------------------+ |
| | > El Vehiculo                                       | |
| +-----------------------------------------------------+ |
| | v Circulacion y Velocidad                           | |
| |   - Conceptos generales                             | |
| |   - Normativa vigente                               | |
| |   - Situaciones practicas                           | |
| +-----------------------------------------------------+ |
| ...12 temas total                                        |
+----------------------------------------------------------+
```

#### 10. Panel de Administracion
Ruta: `/admin`. Requiere admin.

```
+----------------------------------------------------------+
| NADATEST  Admin                            [<- Volver]   |
+----------------------------------------------------------+
| Panel      |                                             |
| Preguntas  |  Panel de administracion                    |
| Tests      |  Resumen general de la plataforma.          |
| Materiales |                                             |
| Usuarios   |  +--------+ +--------+ +--------+ +------+ |
|            |  |Preg.450| |Tests 15| |Users128| |Val380| |
|            |  +--------+ +--------+ +--------+ +------+ |
|            |                                             |
|            |  Accesos rapidos                            |
|            |  +--------+ +--------+ +--------+ +------+ |
|            |  |Preguntas| | Tests  | |Materi.| |Users | |
|            |  |Gestionar| |Gestio. | |Gestio.| |Gest. | |
|            |  |   ->    | |  ->    | |  ->   | |  ->  | |
|            |  +---------+ +--------+ +--------+ +-----+ |
+----------------------------------------------------------+
```

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
