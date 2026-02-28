# Análisis de 2700 preguntas reales DGT (todotest.com)

**Fecha**: Febrero 2026
**Fuente**: `todotest_2700.json` (90 tests x 30 preguntas = 2700 total, 2133 únicas por todotest_id)
**Propósito**: Datos precisos para limitar la generación de preguntas AI a lo que DGT realmente pregunta.

---

## 1. Estadísticas generales

| Métrica | Valor |
|---------|-------|
| Tests | 90 |
| Preguntas totales | 2700 |
| Preguntas únicas (por todotest_id) | 2133 |
| Con imagen | 1365 (64.0%) |
| Sin imagen | 768 (36.0%) |
| Respuesta A | 695 (32.6%) |
| Respuesta B | 771 (36.1%) |
| Respuesta C | 667 (31.3%) |

**Longitud del enunciado** (caracteres):
- Media: 75 | Mediana: 73
- P10: 34 | P90: 120
- Min: 12 | Max: 224

**Tipos de enunciado** (sobre 2133 únicas):
| Tipo | Conteo | % |
|------|--------|---|
| Interrogativa directa (empieza con ¿) | 528 | 24.8% |
| Completar frase (termina en ...) | 621 | 29.1% |
| Afirmativa/contextual (sin ¿ ni ...) | 984 | 46.1% |

**NOTA CRÍTICA**: El 64% de las preguntas únicas requieren imagen. Nuestra generación AI solo puede producir preguntas sin imagen, por lo que operamos sobre un pool efectivo de ~768 preguntas como referencia de estilo.

---

## 2. Distribución por tema (ordenado por frecuencia)

Todos los conteos son sobre las 2133 preguntas únicas. "sinImg" indica cuantas no requieren imagen (relevante para nuestra generación).

| # | Tema | Total | % | sinImg | %img |
|---|------|-------|---|--------|------|
| 1 | Señales y semáforos | 405 | 19.0% | 145 | 64% |
| 2 | Velocidad y límites | 167 | 7.8% | 55 | 67% |
| 3 | Accidentes y primeros auxilios | 146 | 6.8% | 48 | 67% |
| 4 | Carril (aceleración, bus, VAO, etc.) | 135 | 6.3% | 49 | 64% |
| 5 | Alumbrado y luces | 120 | 5.6% | 42 | 65% |
| 6 | Adelantamiento | 109 | 5.1% | 35 | 68% |
| 7 | Calzada y arcen | 106 | 5.0% | 36 | 66% |
| 8 | Estacionamiento y parada | 102 | 4.8% | 32 | 69% |
| 9 | Motos y motocicletas | 100 | 4.7% | 37 | 63% |
| 10 | Alcohol y drogas | 91 | 4.3% | 27 | 70% |
| 11 | Prioridad y preferencia | 88 | 4.1% | 33 | 63% |
| 12 | Autopista y autovía | 70 | 3.3% | 26 | 63% |
| 13 | Condiciones adversas (niebla, lluvia, hielo) | 67 | 3.1% | 25 | 63% |
| 14 | Carga y mercancías | 61 | 2.9% | 23 | 62% |
| 15 | Cinturón y retención infantil | 60 | 2.8% | 21 | 65% |
| 16 | Intersección y rotonda | 57 | 2.7% | 26 | 54% |
| 17 | Peatones | 51 | 2.4% | 16 | 69% |
| 18 | Fatiga, sueño y descanso | 47 | 2.2% | 13 | 72% |
| 19 | Permiso, licencia y puntos | 39 | 1.8% | 18 | 54% |
| 20 | Vehículo averíado / inmovilizado | 39 | 1.8% | 17 | 56% |
| 21 | Ciclistas y bicicletas | 35 | 1.6% | 9 | 74% |
| 22 | Ciclomotor | 35 | 1.6% | 10 | 71% |
| 23 | Túnel | 35 | 1.6% | 13 | 63% |
| 24 | Teléfono móvil | 35 | 1.6% | 10 | 71% |
| 25 | Remolque | 33 | 1.5% | 8 | 76% |
| 26 | Frenos y frenado | 33 | 1.5% | 7 | 79% |
| 27 | Marcas viales | 32 | 1.5% | 10 | 69% |
| 28 | Vehículo pesado / camión / autobús | 29 | 1.4% | 17 | 41% |
| 29 | Marcha atrás | 29 | 1.4% | 8 | 72% |
| 30 | Distancia de seguridad / frenado | 28 | 1.3% | 14 | 50% |
| 31 | Incorporación a circulación | 28 | 1.3% | 7 | 75% |
| 32 | Campo de visión / retrovisor | 25 | 1.2% | 8 | 68% |
| 33 | Cambio de sentido | 20 | 0.9% | 12 | 40% |
| 34 | Avería (señalización, actuación) | 19 | 0.9% | 7 | 63% |
| 35 | Neumáticos | 17 | 0.8% | 2 | 88% |
| 36 | Menores y niños | 16 | 0.8% | 10 | 38% |
| 37 | Curva | 15 | 0.7% | 8 | 47% |
| 38 | Animales | 15 | 0.7% | 5 | 67% |
| 39 | Pendiente / cuesta | 13 | 0.6% | 5 | 62% |
| 40 | Obras | 13 | 0.6% | 9 | 31% |
| 41 | ITV | 12 | 0.6% | 5 | 58% |
| 42 | Paso a nivel | 11 | 0.5% | 4 | 64% |
| 43 | Tracción / adherencia | 11 | 0.5% | 2 | 82% |
| 44 | Vehículos prioritarios | 9 | 0.4% | 3 | 67% |
| 45 | Seguro obligatorio | 8 | 0.4% | 1 | 88% |
| 46 | Medio ambiente y contaminación | 7 | 0.3% | 3 | 57% |
| 47 | Conducción eficiente | 6 | 0.3% | 1 | 83% |
| 48 | Embarazadas | 1 | <0.1% | 1 | 0% |
| 49 | Autoescuela | 1 | <0.1% | 1 | 0% |
| 50 | Calzado / vestimenta conductor | 1 | <0.1% | 0 | 100% |

NOTA: Las categorías no son mutuamente excluyentes (una pregunta sobre "velocidad en autopista" cuenta en ambas).

---

## 3. Análisis detallado por tema principal

### 3.1 SEÑALES Y SEMÁFOROS (405 preguntas, 19.0%)

**Escenarios concretos que DGT pregunta**:
- Qué indica una señal concreta (con imagen): "Esta señal indica...", "Esta señal prohibe..."
- Contradicción entre señales: semáforo vs señal vs agente
- Señales de peligro, prohibición, obligación, información
- Semáforos: verde, ámbar, rojo, intermitente, para peatones
- Señales de agentes de tráfico (brazo vertical, horizontal)
- Señalización de obras temporales
- Señal V-16 para vehículos averiados

**Enunciados reales sin imagen**:
- "Esta señal indica peligro por la proximidad de..."
- "En caso de contradicción entre señales del mismo tipo, cuál prevalecerá?"
- "En un estrechamiento sin señales de prioridad se encuentran un turismo que arrastra un remolque y un autobús, sin que se sepa cuál entró primero, qué vehículo tiene preferencia?"

**Lo que DGT NO pregunta sobre señales**:
- Códigos de señal (R-303, S-200, P-1 etc.) -- NUNCA aparecen códigos alfanuméricos
- Historia de las señales o quién las diseña
- Señales de otros países
- Detalles técnicos de fabricación (retroreflectancia, materiales)

**ADVERTENCIA GENERACIÓN**: El 64% de las preguntas de señales requieren imagen. Para generación sin imagen, solo sirven las de "contradicción entre señales", "prevalencia" y conceptos generales.

### 3.2 VELOCIDAD Y LÍMITES (167 preguntas, 7.8%)

**Escenarios concretos**:
- Velocidad máxima genérica por tipo de vía: autopista (120), autovía (120), convencional (90), poblado (50/30/20)
- Velocidad en carril de aceleración para entrar en autopista
- Velocidad anormalmente reducida y consecuencias (por dónde circular)
- Relación velocidad-atropello: probabilidad de muerte a 30/50/65 km/h
- Velocidad y distancia de frenado (se duplica al duplicar velocidad)
- Límites específicos: vehículos pesados, remolques, conductores noveles
- Velocidad en túnel, en obras, con condiciones adversas

**Enunciados reales sin imagen**:
- "Para entrar en una autopista, a qué velocidad debe circular?"
- "Un turismo por una autovía, a qué velocidad máxima puede circular?"
- "En ciudad, es importante no circular a más de 50 kilómetros por hora?"
- "Cuando debido a una avería un turismo circula por una autopista a velocidad anormalmente reducida, por dónde lo hará?"

**Lo que DGT NO pregunta sobre velocidad**:
- Velocidad mínima exacta en autopista (nunca "cual es la velocidad mínima en autopista" como dato numérico)
- Velocidad en carreteras "2+1" (concepto inexistente en preguntas DGT)
- Velocidad en zona 30 como concepto explícito (solo aparece como señal con imagen)
- Fórmulas matemáticas de distancia de frenado

### 3.3 ACCIDENTES Y PRIMEROS AUXILIOS (146 preguntas, 6.8%)

**Escenarios concretos**:
- Protocolo PAS (Proteger-Avisar-Socorrer)
- Qué hacer con un herido inconsciente (posición lateral de seguridad)
- Respiración boca a boca: cómo se hace
- Herido con casco de moto: no quitarlo
- Herido que puede tener lesión cervical: no mover
- Llamar al 112: cuándo y qué datos dar
- Causas principales de accidentes (velocidad, alcohol, distracción)
- Accidentes de jóvenes vs mayores
- Efecto submarino (cinturón mal colocado)
- Chaleco reflectante: cuando es obligatorio fuera del vehículo

**Enunciados reales sin imagen**:
- "Si tras un accidente de tráfico, un herido no responde y aparentemente ha perdido la conciencia, qué es lo primero que debemos hacer?"
- "Para hacer la respiración boca-boca a un herido, qué debe hacer primero?"
- "En un accidente de circulación, es obligatorio avisar a la Autoridad si no hay heridos y la seguridad de la circulación está restablecida?"
- "Los conductores jóvenes suelen tener más accidentes..."

**Lo que DGT NO pregunta sobre accidentes**:
- Técnicas médicas avanzadas (torniquete, RCP detallado con compresiones por minuto)
- Contenido exacto del botiquín
- Números de teléfono distintos al 112
- Estadísticas concretas de siniestralidad (cifras, años)

### 3.4 ALUMBRADO Y LUCES (120 preguntas, 5.6%)

**Escenarios concretos**:
- Cuando usar luz de cruce/corto alcance (de día: túnel, carril contraflujo, condiciones reducidas)
- Luces antiniebla: delantera (cuando niebla densa), trasera (lluvia intensa o niebla)
- Deslumbramiento: qué hacer si te deslumbran, a dónde mirar
- Luces LED y adaptativas
- Luces de estacionamiento nocturno en arcen
- Luces de emergencia (4 intermitentes)
- Luces de motocicleta obligatorias

**Enunciados reales sin imagen**:
- "Circulando con lluvia muy intensa, es correcto encender la luz antiniebla trasera?"
- "Qué alumbrado deberá mantener encendido un vehículo estacionado durante la noche en el arcen de una travesía insuficientemente iluminada?"
- "Pueden llevar las motocicletas la luz antiniebla delantera?"
- "Las luces adaptativas..."

### 3.5 ADELANTAMIENTO (109 preguntas, 5.1%)

**Escenarios concretos**:
- Adelantar por la izquierda (regla general) vs por la derecha (excepciones)
- Separación lateral: 1.5m a peatones y ciclistas
- Prohibición de adelantar: línea continua, señal, paso de peatones, intersección
- Obligaciones del adelantado (no acelerar, facilitar)
- Adelantamiento frustrado: qué hacer si no puedes completarlo
- Distancia de visibilidad necesaria para adelantar
- Adelantar en autopista con múltiples carriles
- Adelantar a vehículos lentos, ciclistas, motocicletas

**Enunciados reales sin imagen**:
- "Tiene alguna obligación cuando su vehículo va a ser adelantado?"
- "Fuera de poblado, qué separación lateral debe dejar una motocicleta al adelantar un camión?"
- "El adelantamiento se efectuará por la derecha y adoptando las máximas precauciones..."
- "Una vez iniciado el adelantamiento se producen circunstancias que pueden hacer difícil su finalización sin provocar riesgos, qué está obligado a hacer el conductor?"

### 3.6 ALCOHOL Y DROGAS (91 preguntas, 4.3%)

**Escenarios concretos**:
- Tasas máximas: general (0.5 g/l sangre = 0.25 mg/l aire), novel (0.3 g/l = 0.15 mg/l), profesional (0.3)
- Efectos del alcohol: visión túnel, falsa seguridad, mayor tiempo de reacción
- Alcoholemia como delito penal (>0.60 mg/l aire exhalado)
- Pruebas de alcoholemia: obligatorias, quién puede ser sometido (incluso peatones)
- Inmovilización del vehículo tras positivo
- Drogas/estupefacientes: pruebas de detección, efectos
- Interacción alcohol + medicamentos
- Alcohol y conductores jóvenes/noveles

**Enunciados reales sin imagen**:
- "Los efectos del alcohol, son mayores en los conductores con poca experiencia al volante?"
- "En un control preventivo, pueden los agentes someter a un conductor a una prueba de detección de estupefacientes?"
- "Bajo los efectos del alcohol, la distancia de detención..."
- "Un peatón, está obligado a someterse a una prueba de control de alcoholemia?"

**Lo que DGT NO pregunta sobre alcohol**:
- Cifras exactas de 0.60 mg/l como umbral de delito (se pregunta conceptualmente pero no la cifra exacta con frecuencia)
- Metabolismo del alcohol, tiempos de eliminación exactos
- Tipos de alcoholímetro o cómo funcionan técnicamente

### 3.7 ESTACIONAMIENTO Y PARADA (102 preguntas, 4.8%)

**Escenarios concretos**:
- Diferencia entre parada, detención y estacionamiento
- Prohibiciones de estacionar: paso de peatones, intersección, doble fila
- Estacionar motocicleta en acera (generalmente prohibido)
- Estacionar en lado izquierdo en vía interurbana de doble sentido (prohibido)
- Estacionar en pendiente: qué hacer con las ruedas
- Estacionar en arcen
- Parada en zona de carga y descarga
- Distancias a respetar: del bordillo, de esquinas

**Enunciados reales sin imagen**:
- "Con carácter general, está permitido estacionar una motocicleta en la acera?"
- "En una vía interurbana de doble sentido de la circulación, está permitido realizar una parada o estacionamiento en el lado izquierdo?"
- "Ante un paso a nivel cuyas barreras están en movimiento, es obligatorio detenerse?"

### 3.8 FATIGA, SUEÑO Y DESCANSO (47 preguntas, 2.2%)

**Escenarios concretos**:
- Descansar cada 2 horas o 200 km
- Síntomas de fatiga: pestañeos, movimientos lentos, pérdida de concentración
- Fatiga + alcohol como factor de riesgo combinado
- Conducir con mal tiempo aumenta fatiga
- Qué hacer si aparece fatiga: parar, dormir 20-30 min
- Somnolencia como causa de accidente
- Conducción nocturna y fatiga
- Efecto de comidas copiosas

**Enunciados reales sin imagen**:
- "Para prevenir la fatiga debe parar a descansar 20 o 30 minutos..."
- "Conducir con mal tiempo, puede favorecer la fatiga?"
- "La principal causa de fatiga al volante es conducir..."
- "Conducir con sueño, hace que..."

### 3.9 TÚNEL (35 preguntas, 1.6%)

**Escenarios concretos**:
- Alumbrado en túnel (luz de cruce siempre, incluso si está iluminado)
- Avería dentro de túnel (qué hacer)
- Incendio en túnel (apagar motor, dejar llave puesta, salir por galerías)
- Adelantar en túnel (permitido si hay más de un carril por sentido)
- Cambio de sentido en túnel (prohibido)
- Distancia de seguridad en túnel
- Quedarse detenido en túnel

**Enunciados reales sin imagen**:
- "Si queda detenido en un túnel por necesidades de la circulación, qué debe hacer?"
- "Al averiarse el vehículo que conduce dentro de un túnel debe..."
- "En un túnel con más de un carril en el sentido de la marcha, está permitido adelantar?"
- "Si circula por un túnel suficientemente iluminado, qué alumbrado debe utilizar?"

### 3.10 PASO A NIVEL (11 preguntas, 0.5%)

**Escenarios concretos**:
- Barreras en movimiento: obligatorio detenerse
- Luces rojas fijas alternas: detenerse
- Prioridad absoluta del tren
- Quedarse inmovilizado en paso a nivel: qué hacer

**Enunciados reales**:
- "Ante un paso a nivel cuyas barreras están en movimiento, es obligatorio detenerse?"
- "En un paso a nivel con las luces rojas encendidas..."

**NOTA**: Solo 11 preguntas. Tema poco frecuente pero existente.

---

## 4. Patrones de formulación de preguntas

### 4.1 Categorías de apertura (sobre 2133 únicas)

| Patrón de apertura | Conteo | % |
|---------------------|--------|---|
| El/La/Los/Las... (artículo + contexto) | 418 | 19.6% |
| (otro: contexto variado sin patrón fijo) | 424 | 19.9% |
| En... (contexto de lugar/situación) | 291 | 13.6% |
| Si... (condicional) | 159 | 7.5% |
| Un/Una... (artículo indefinido) | 139 | 6.5% |
| ¿Qué...? | 178 | 8.3% |
| Cuando... | 63 | 3.0% |
| Para... | 52 | 2.4% |
| ¿(otra interrogativa) | 49 | 2.3% |
| ¿Está...? (permitido/prohibido) | 49 | 2.3% |
| ¿Cuál...? | 44 | 2.1% |
| ¿Puede...? | 42 | 2.0% |
| Al... | 42 | 2.0% |
| ¿Es...? | 35 | 1.6% |
| ¿Cómo...? | 24 | 1.1% |
| ¿Cuándo...? | 22 | 1.0% |
| Con... | 17 | 0.8% |
| ¿En qué...? | 16 | 0.7% |
| ¿A qué...? | 14 | 0.7% |
| ¿Se...? | 12 | 0.6% |
| ¿Quién...? | 9 | 0.4% |
| ¿Dónde...? | 7 | 0.3% |
| ¿Cuánto...? | 7 | 0.3% |
| ¿Tiene...? | 7 | 0.3% |
| ¿Por...? | 7 | 0.3% |
| ¿De...? | 3 | 0.1% |
| ¿Debe...? | 3 | 0.1% |

### 4.2 Comienzos de frase más frecuentes (3 primeras palabras)

| Comienzo | Conteo |
|----------|--------|
| Esta señal indica | 37 |
| Qué indica esta | 33 |
| En caso de | 26 |
| Cuál es la | 23 |
| En esta vía | 21 |
| A la vista | 17 |
| En una vía | 16 |
| En una intersección | 16 |
| El conductor de | 16 |
| Como norma general | 15 |
| Qué indica la | 14 |
| El consumo de | 14 |
| Qué debe hacer | 14 |
| Los accidentes de | 11 |
| En esta situación | 10 |
| Qué significa esta | 10 |
| En una autopista | 10 |
| En un paso | 9 |
| En un tramo | 9 |
| En esta intersección | 9 |
| En una carretera | 9 |
| Está permitido que | 8 |
| Esta señal prohibe | 8 |
| Un conductor que | 8 |
| En un turismo | 8 |
| En un túnel | 8 |
| Los conductores de | 8 |
| A qué velocidad | 8 |
| La distancia de | 7 |
| Está permitido circular | 7 |
| Al aproximarse a | 6 |
| La tasa máxima | 6 |

### 4.3 Patrones clave de formulación DGT

**Patrón 1 -- Pregunta de si/no con matiz** (muy frecuente):
- "¿Es obligatorio...?" -> Respuesta suele ser "Sí, excepto..." o "No, salvo que..."
- "¿Está permitido...?" -> Respuesta con condiciones
- "¿Puede...?" -> Similar

**Patrón 2 -- Completar frase con "..."** (29% de preguntas):
- "La distancia de seguridad..." -> 3 opciones que completan
- "El consumo de alcohol..." -> 3 opciones
- "Los conductores noveles..." -> 3 opciones

**Patrón 3 -- Situación concreta** (46% de preguntas):
- "En una autopista, circulando a 120 km/h,..."
- "Si tras un accidente un herido..."
- "Al entrar en una glorieta..."

**Patrón 4 -- Dato concreto** (menos frecuente):
- "Cuál es la velocidad máxima genérica para un turismo en autovía?"
- "Cuál es la tasa de alcohol máxima..."

---

## 5. LISTA "NUNCA PREGUNTADO" -- Conceptos con 0 apariciones en 2133 preguntas

Estos conceptos existen en libros de teoría pero DGT NUNCA los pregunta en los 2700 items analizados:

### 5.1 Tecnología vehicular moderna
| Concepto | Apariciones |
|----------|-------------|
| ESP / control de estabilidad | 0 |
| Sistema Start-Stop | 0 |
| ADAS (como término) | 0 (nota: aparece 1 vez en contexto de examen práctico, no como pregunta de conocimiento) |
| Radar (fijo o móvil) | 0 |
| GPS / navegador | 0 |
| Vehículo eléctrico / híbrido | 0 |
| Recarga de vehículo eléctrico | 0 |
| Cambio automático (caja) | 0 |
| Conducción autónoma | 0 |
| App miDGT | 0 |

### 5.2 Regulaciones modernas
| Concepto | Apariciones |
|----------|-------------|
| Pegatina / etiqueta ambiental DGT | 0 |
| Zona 30 (como concepto explícito) | 0 |
| Patinete eléctrico / VMP | 0 |
| Carsharing / coche compartido | 0 |
| Permiso internacional | 0 |

### 5.3 Mecánica del vehículo
| Concepto | Apariciones |
|----------|-------------|
| Turbo / sobrealimentación | 0 |
| Bujías | 0 |
| Embrague | 0 |
| Suspensión / amortiguador | 0 |
| Limpiaparabrisas | 0 |
| Motor diesel vs gasolina | 0 |
| Biodiesel / bioetanol | 0 |

### 5.4 Administrativo/legal
| Concepto | Apariciones |
|----------|-------------|
| Transferencia de vehículo | 0 |
| Taller mecánico | 0 |
| Seguro a terceros vs todo riesgo | 0 |
| Aparcamiento regulado / ORA | 0 |
| Tacógrafo | 0 |
| Grúa municipal | 0 |
| Coche de alquiler | 0 |
| ISOFIX (como término) | 0 |
| Carnet por puntos: cifras exactas (8/12/15 puntos) | 0 |

### 5.5 Casi nunca preguntado (1 aparición en 2133)
| Concepto | Apariciones | Enunciado |
|----------|-------------|-----------|
| Dirección asistida | 1 | "Un vehículo con dirección asistida, requiere algún mantenimiento especial?" |
| Aire acondicionado | 1 | "Si durante la conducción conecta el sistema de aire acondicionado, el consumo de carburante..." |
| Matrícula/placa | 1 | (en contexto de motocicleta A1) |
| Revisión periódica | 1 | "Como mantenimiento preventivo, es conveniente realizar una revisión periódica del sistema de alumbr..." |

### 5.6 Conceptos inventados que la IA podría generar
Estos NO existen en el corpus DGT y la generación debe evitarlos:
- "Carretera 2+1" (0 apariciones, concepto inexistente en DGT España)
- "Peaje" (0 apariciones)
- "Aparcamiento subterráneo" como escenario
- Cualquier referencia a códigos de señal (R-303, S-200, P-1, etc.)
- Cifras específicas del carnet por puntos (8 puntos inicial, 12, 15)

---

## 6. Temas con alta dependencia de imagen (>70% requieren imagen)

Estos temas son DIFÍCILES de generar sin imagen porque la mayoría de preguntas reales DGT dependen de una foto/señal:

| Tema | %img | sinImg |
|------|------|--------|
| Neumáticos | 88% | solo 2 sin imagen |
| Seguro obligatorio | 88% | solo 1 sin imagen |
| Conducción eficiente | 83% | solo 1 sin imagen |
| Tracción / adherencia | 82% | solo 2 sin imagen |
| Frenos y frenado | 79% | solo 7 sin imagen |
| Remolque | 76% | solo 8 sin imagen |
| Incorporación | 75% | solo 7 sin imagen |
| Ciclistas | 74% | solo 9 sin imagen |
| Fatiga | 72% | solo 13 sin imagen |
| Marcha atrás | 72% | solo 8 sin imagen |
| Ciclomotor | 71% | solo 10 sin imagen |
| Teléfono móvil | 71% | solo 10 sin imagen |
| Alcohol y drogas | 70% | solo 27 sin imagen |

**RECOMENDACIÓN**: Para generación sin imagen, priorizar temas con buen pool de preguntas sin imagen:
- Señales (145 sin imagen) -- pero solo las conceptuales, no "qué indica esta señal"
- Velocidad (55 sin imagen)
- Accidentes/auxilios (48 sin imagen)
- Carril (49 sin imagen)
- Alumbrado (42 sin imagen)
- Adelantamiento (35 sin imagen)
- Calzada/arcen (36 sin imagen)
- Prioridad (33 sin imagen)
- Moto (37 sin imagen)
- Estacionamiento (32 sin imagen)

---

## 7. Distribución de respuestas correctas

| Respuesta | Conteo | % |
|-----------|--------|---|
| A | 695 | 32.6% |
| B | 771 | 36.1% |
| C | 667 | 31.3% |

La distribución es relativamente equilibrada con ligera preferencia por B. NO existe sesgo extremo hacia ninguna posición (a diferencia de nuestra generación batch_06 que tenía 90% en posición 1).

---

## 8. Repetición de preguntas entre tests

| Apariciones en 90 tests | Núm. preguntas únicas |
|--------------------------|----------------------|
| 1 vez | 1660 |
| 2 veces | 380 |
| 3 veces | 78 |
| 4 veces | 12 |
| 5 veces | 3 |

El 78% de las preguntas aparecen solo 1 vez en 90 tests. Las más repetidas (3+ veces) son probablemente las que DGT considera más importantes.

---

## 9. Reglas para la generación de preguntas AI

Basado en este análisis, la generación debe:

### HACER:
1. **Formular como DGT formula**: 46% afirmativas contextuales, 29% completar frase, 25% interrogativa directa
2. **Usar los comienzos reales**: "En una...", "Si...", "El/La...", "Un/Una...", "Cuando...", "Para...", "Al..."
3. **Longitud 34-120 caracteres** (P10-P90), media de 75
4. **Distribuir respuestas** ~33% por posición (A/B/C)
5. **Centrarse en los temas top**: señales (conceptual), velocidad, accidentes, alumbrado, adelantamiento, alcohol, estacionamiento, prioridad
6. **Preguntar sobre situaciones concretas**: "En una autopista...", "Si tras un accidente...", no sobre teoría abstracta

### NO HACER:
1. **No inventar escenarios que DGT no pregunta**: carretera 2+1, zona 30 explícita, vehículos eléctricos, patinetes, ADAS, ESP
2. **No usar códigos de señal**: R-303, S-200, P-1 etc.
3. **No preguntar sobre mecánica**: embrague, bujías, suspensión, turbo
4. **No preguntar datos administrativos exactos**: cifras del carnet por puntos, transferencias, ORA
5. **No generar preguntas que naturalmente requieren imagen**: "qué indica esta señal" sin imagen, señales de tráfico concretas
6. **No usar "radar"**: 0 apariciones en DGT
7. **No preguntar sobre tecnología moderna**: GPS, Start-Stop, híbridos, recarga eléctrica, cambio automático
8. **Evitar temas con <5 preguntas sin imagen**: neumáticos, seguro, conducción eficiente, tracción, embarazadas, autoescuela, calzado

---

## 10. Notas metodológicas

- Las búsquedas son por keyword/regex sobre el campo `enunciado` de las 2133 preguntas únicas
- Las categorías se solapan (una pregunta sobre "velocidad en autopista" aparece en ambas categorías)
- Los conteos de "sin imagen" son el pool real de referencia para nuestra generación
- "Nunca preguntado" significa 0 coincidencias en el enunciado; es posible que alguna opción mencione el concepto pero DGT no lo formula como pregunta
- El dataset es de todotest.com que recopila preguntas reales de exámenes DGT, pero puede no cubrir el 100% del banco oficial
