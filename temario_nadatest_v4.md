# TEMARIO NADATEST - PERMISO B v4.0
## Guía Estructurada para Generación de Preguntas de Test

---

# METADATOS DEL SISTEMA

## Información del Examen DGT

```yaml
examen:
  total_preguntas: 30
  fallos_permitidos: 3
  tiempo_minutos: 30
  opciones_por_pregunta: 3
  respuestas_correctas: 1
  validez_aprobado_años: 2
```

## Escala de Dificultad

| Nivel | Nombre | Criterio | Ejemplo |
|-------|--------|----------|---------|
| 1 | Básico | Memorización directa | "¿Teléfono emergencias?" → 112 |
| 2 | Fácil | Comprensión simple | "¿Luz roja?" → Detenerse |
| 3 | Medio | Relacionar 2+ conceptos | "¿Velocidad carretera 1 carril?" → 90 |
| 4 | Difícil | Excepciones, casos especiales | "¿Adelantar por derecha?" |
| 5 | Trampa | Confusiones comunes | "¿Parada vs estacionamiento?" |

## Distribución de Preguntas

| Módulo | Peso | Preguntas | Prioridad |
|--------|------|-----------|-----------|
| 2. Señalización | 25-30% | 8-9 | CRÍTICO |
| 3. Normas circulación | 25-30% | 8-9 | CRÍTICO |
| 4. Maniobras | 15% | 4-5 | IMPORTANTE |
| 7. Factores riesgo | 10-15% | 3-4 | IMPORTANTE |
| Resto | 15-20% | 5-6 | NECESARIO |

---

# ESTRUCTURA DE CONCEPTOS

Cada concepto sigue este formato para facilitar la generación de preguntas:

```yaml
concepto:
  id: "X.Y.Z"
  titulo: "Nombre del concepto"
  dificultad: 1-5
  frecuencia: "Baja|Media|Alta|MuyAlta"
  dato_clave: "Información principal a evaluar"
  ejemplo_pregunta: "Formulación típica"
  trampa: "Error común que hace buena respuesta incorrecta"
  actualizado: true|false  # Si es normativa reciente
```

---

# MÓDULO 1: FUNDAMENTOS
**Peso: Bajo (1-2 preguntas)**

## 1.1 Tipos de Vías

### 1.1.1 Autopista/Autovía
- **Dificultad**: 2 | **Frecuencia**: Baja
- **Dato clave**: Velocidad máxima 120 km/h. Autopista=peaje, Autovía=sin peaje
- **Trampa**: Pensar que tienen límites de velocidad diferentes

### 1.1.2 Carretera Convencional
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: 1 carril/sentido → 90 km/h | 2+ carriles/sentido → 100 km/h
- **Trampa**: Confundir según número de carriles

### 1.1.3 Vía Urbana [ACTUALIZADO 2021]
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: 1 carril/sentido → **30 km/h** | 2+ carriles/sentido → 50 km/h
- **Trampa**: El límite de 30 km/h es nuevo (2021). Muchos recuerdan 50

### 1.1.4 Zona Residencial
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: 20 km/h máximo. Peatón tiene PRIORIDAD ABSOLUTA
- **Trampa**: Pensar que vehículos conservan alguna prioridad

### 1.1.5 Travesía
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: 50 km/h. Tramo de carretera que atraviesa población
- **Trampa**: Confundir con vía urbana normal

## 1.2 Partes de la Vía

### 1.2.1 Arcén
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: NO destinado a circulación salvo excepciones (ciclistas, emergencias)
- **Trampa**: Pensar que siempre se puede circular por él

### 1.2.2 Paso de Peatones
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: Sin semáforo: peatón tiene PRIORIDAD
- **Trampa**: El peatón debe mirar, pero el vehículo DEBE cederle paso

## 1.3 El Vehículo y Permiso B

### 1.3.1 Vehículos Autorizados
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Turismos hasta 3.500 kg MMA y máximo 9 plazas (incluido conductor)
- **Trampa**: Confundir 9 plazas totales con 9 pasajeros + conductor

### 1.3.2 Motos 125cc con Permiso B
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: **3 años** de antigüedad del permiso B. SOLO válido en España
- **Trampa**: Pensar que es válido en toda Europa

### 1.3.3 Placa L Novel
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Obligatoria durante **1 año** desde obtención del permiso
- **Trampa**: Confundir 1 año (L) con 2 años (novel para alcohol)

## 1.4 El Conductor

### 1.4.1 Cinturón de Seguridad
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: Obligatorio todos. Conductor responsable de menores
- **Trampa**: Adultos son responsables de sí mismos, pero de menores responde el conductor

### 1.4.2 Prohibición Móvil [ENDURECIDO 2022]
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: Prohibido manipular. Manos libres permite HABLAR pero NO manipular. **6 puntos**
- **Trampa**: Manos libres SÍ permite conversar, pero NO manipular el dispositivo

---

# MÓDULO 2: SEÑALIZACIÓN
**Peso: MUY ALTO (8-9 preguntas) - CRÍTICO**

## 2.1 Jerarquía de Señales

### 2.1.1 Orden de Prioridad
- **Dificultad**: 4 | **Frecuencia**: Alta
- **Dato clave**: 1.Agentes > 2.Circunstanciales(obras) > 3.Semáforos > 4.Verticales > 5.Marcas viales
- **Ejemplo**: "Si agente indica pasar pero semáforo en rojo, ¿qué hacer?" → Obedecer al agente
- **Trampa**: Olvidar que señales de obras van ANTES que semáforos

## 2.2 Señales de los Agentes

### 2.2.1 Brazos Extendidos Horizontalmente
- **Dificultad**: 4 | **Frecuencia**: Media
- **Dato clave**: Se detienen los que ven pecho o espalda. Pasan los paralelos a brazos
- **Trampa**: Regla: "si te corta con el brazo, no pases"

### 2.2.2 Silbato
- **Dificultad**: 3 | **Frecuencia**: Baja
- **Dato clave**: Toque LARGO = ALTO. Toques CORTOS = Pasar

## 2.3 Semáforos

### 2.3.1 Luz Amarilla Fija
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: Detenerse si es posible con seguridad. Si no, pasar con precaución
- **Trampa**: NO significa "acelerar para pasar"

### 2.3.2 Luz Verde Fija
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Permite pasar, pero debe ceder a peatones que estén cruzando
- **Trampa**: El verde no da paso absoluto si hay peatones cruzando

### 2.3.3 Roja + Flecha Verde
- **Dificultad**: 4 | **Frecuencia**: Media
- **Dato clave**: Permite avanzar SOLO en dirección de flecha, CEDIENDO paso
- **Trampa**: No es paso libre, hay que ceder

### 2.3.4 Amarillo Intermitente
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: Precaución, no obliga detenerse. Aplicar normas de prioridad normales
- **Trampa**: NO significa "paso libre", hay que mirar otras señales

## 2.4 Señales Verticales de Reglamentación

### 2.4.1 STOP (R-2)
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: Detenerse COMPLETAMENTE y ceder paso
- **Trampa**: No basta con reducir velocidad, hay que PARAR

### 2.4.2 Prohibido Adelantar (R-305)
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: Prohibido adelantar vehículos de motor. SÍ se puede adelantar bicicletas
- **Ejemplo**: "¿Puedo adelantar bicicleta con señal prohibido adelantar?" → SÍ
- **Trampa**: Muchos piensan que prohíbe adelantar a todo

### 2.4.3 Prohibido Estacionar (R-308)
- **Dificultad**: 4 | **Frecuencia**: Alta
- **Dato clave**: Prohibido ESTACIONAR, pero SÍ se puede PARAR (<2 min sin alejarse)
- **Ejemplo**: "¿Puedo parar a recoger alguien donde hay R-308?" → SÍ
- **Trampa**: Confundir parada con estacionamiento

### 2.4.4 Velocidad Máxima vs Mínima
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: ROJO = máxima obligatoria. AZUL = mínima obligatoria
- **Trampa**: AZUL = mínima; ROJO = máxima

### 2.4.5 Fin Prohibición Adelantamiento (R-502)
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: Levanta prohibición, pero NO significa que se pueda adelantar siempre
- **Trampa**: Levantar prohibición ≠ autorización automática

## 2.5 Señales de Peligro

### 2.5.1 Intersección Prioridad Derecha (P-1)
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: ADVIERTE de intersección. La señal NO da prioridad, solo avisa
- **Trampa**: Esta señal NO da prioridad, solo ADVIERTE

### 2.5.2 Glorieta (P-4)
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: Advierte glorieta próxima. Hay que ceder al ENTRAR

## 2.6 Señales de Indicación

### 2.6.1 Velocidad Recomendada (S-7)
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: RECOMIENDA, NO obligatorio. Cuadrado azul
- **Trampa**: Recomendada (cuadrado azul) vs Máxima (círculo rojo)

### 2.6.2 Carril VAO
- **Dificultad**: 3 | **Frecuencia**: Baja
- **Dato clave**: Solo vehículos con ocupación mínima indicada. Motos SÍ pueden usarlo
- **Trampa**: Las motos sí pueden usar el VAO aunque vaya solo el conductor

## 2.7 Marcas Viales [CRÍTICO]

### 2.7.1 Línea Continua
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: PROHIBIDO atravesarla o circular sobre ella

### 2.7.2 Doble Línea (Continua junto a Discontinua) ⚠️
- **Dificultad**: 5 | **Frecuencia**: MUY ALTA
- **Dato clave**: Solo puedes cruzar si la línea MÁS PRÓXIMA A TI (tu derecha) es DISCONTINUA
- **Ejemplo**: "Si a su derecha hay discontinua y a izquierda continua, ¿puede adelantar?" → SÍ
- **Trampa**: Hay que mirar la línea de TU LADO, no la del otro

### 2.7.3 Cebreado
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: PROHIBIDO circular, parar y estacionar sobre zona cebreada
- **Trampa**: Nunca se puede pisar, ni siquiera brevemente

### 2.7.4 Cuadrícula Amarilla
- **Dificultad**: 4 | **Frecuencia**: Alta
- **Dato clave**: PROHIBIDO quedarse detenido. Solo entrar si hay espacio para salir
- **Ejemplo**: "¿Puede detenerse si semáforo verde pero hay retención?" → NO
- **Trampa**: El verde no autoriza a bloquear la intersección

## 2.8 Señalización Circunstancial

### 2.8.1 Señales de Obra (Fondo Amarillo)
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Fondo AMARILLO = temporal. Prevalecen sobre permanentes

### 2.8.2 Paneles de Mensaje Variable
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: Sus indicaciones son OBLIGATORIAS, no solo informativas
- **Trampa**: Muchos piensan que es solo informativo, pero es OBLIGATORIO

## 2.9 Señales en Vehículos

### 2.9.1 Triángulos de Emergencia
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: A **50 m** mínimo, visible a 100 m. En doble sentido: delante y detrás

### 2.9.2 Dispositivo V-16 [NUEVO]
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: Luz ámbar en techo. Conectada a DGT 3.0. Obligatoria desde 2026. Ventaja: no bajar del coche
- **Trampa**: Actualmente complementa a triángulos (período transitorio)

### 2.9.3 Luz Antiniebla Trasera ⚠️
- **Dificultad**: 4 | **Frecuencia**: Alta
- **Dato clave**: SOLO niebla densa, nieve o nube polvo. NUNCA lluvia normal
- **Ejemplo**: "¿Se puede usar antiniebla trasera cuando llueve?" → NO
- **Trampa**: Muy preguntado. La lluvia NO justifica su uso

---

# MÓDULO 3: NORMAS DE CIRCULACIÓN
**Peso: MUY ALTO (8-9 preguntas) - CRÍTICO**

## 3.1 Velocidad [CRÍTICO]

### 3.1.1 Tabla de Velocidades Máximas (Turismos)

| Vía | Límite | Notas |
|-----|--------|-------|
| Autopista/Autovía | 120 km/h | |
| Carretera conv. (+1 carril) | 100 km/h | |
| Carretera conv. (1 carril) | 90 km/h | |
| Vía urbana (+1 carril) | 50 km/h | |
| Vía urbana (1 carril) | **30 km/h** | NUEVO 2021 |
| Travesía | 50 km/h | |
| Zona residencial | 20 km/h | |

### 3.1.2 Velocidad Mínima Vías Rápidas
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: No circular a menos de la MITAD de la máxima. Autopista/autovía: mín **60 km/h**

### 3.1.3 Velocidad Excesiva vs Inadecuada ⚠️
- **Dificultad**: 5 | **Frecuencia**: Alta
- **Dato clave**: Excesiva = superar límite legal. Inadecuada = no adaptada a circunstancias (aunque sea legal)
- **Ejemplo**: "¿Diferencia entre excesiva e inadecuada?"
- **Trampa**: Puedes ir a 120 (no excesiva) pero inadecuada si hay niebla

## 3.2 Distancia de Seguridad

### 3.2.1 Regla de los 2 Segundos
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: Mínimo 2 segundos en condiciones normales. Más si lluvia/niebla

### 3.2.2 Distancia Lateral a Ciclistas
- **Dificultad**: 2 | **Frecuencia**: MUY ALTA
- **Dato clave**: Mínimo **1,5 METROS**. Se puede invadir contrario (incluso línea continua) si necesario
- **Trampa**: SÍ se puede pisar línea continua brevemente para mantener 1,5 m

## 3.3 Prioridad de Paso [CRÍTICO]

### 3.3.1 Prioridad por la Derecha
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: En intersección sin señalización, prioridad al que viene por la DERECHA

### 3.3.2 Salida de Propiedad Privada
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: El que sale de propiedad privada SIEMPRE cede el paso

### 3.3.3 Tranvía
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: El tranvía tiene prioridad SIEMPRE (salvo semáforo o agente)
- **Trampa**: Aunque venga por la izquierda

### 3.3.4 Prioridad en Glorietas ⚠️
- **Dificultad**: 4 | **Frecuencia**: MUY ALTA
- **Dato clave**: Ceder al ENTRAR. Una vez dentro, TIENES prioridad
- **Ejemplo**: "¿Quién tiene prioridad en glorieta?" → Los que ya están dentro
- **Trampa**: Se cede al entrar, NO al salir

### 3.3.5 Prioridad en Pendientes
- **Dificultad**: 4 | **Frecuencia**: Media
- **Dato clave**: Prioridad al que SUBE (le es más difícil arrancar en cuesta)

### 3.3.6 Vehículos Emergencia vs Luz Ámbar
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: Luz AZUL = prioridad absoluta. Luz ÁMBAR = advertencia, NO prioridad de paso
- **Trampa**: Luz azul = prioridad; Luz ámbar = advertencia, no prioridad

## 3.4 Posición en Calzada

### 3.4.1 Uso del Carril Derecho
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Circular por el carril más a la DERECHA. Izquierda solo para adelantar
- **Trampa**: Circular siempre por el carril central es infracción

## 3.5 Alumbrado

### 3.5.1 Luces Obligatorias de Día
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: Obligatorio luz de cruce DE DÍA en: túneles, carriles reversibles, baja visibilidad

### 3.5.2 Qué Hacer si te Deslumbran
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Mirar al borde DERECHO de la calzada, reducir velocidad, NO responder con largas

## 3.6 Señales Acústicas (Claxon)

### 3.6.1 Uso del Claxon
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Solo para evitar accidentes o advertir presencia. En poblado de noche: preferir luces

---

# MÓDULO 4: MANIOBRAS
**Peso: Medio (4-5 preguntas)**

## 4.1 Incorporación

### 4.1.1 Carril de Aceleración
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: Usar para alcanzar velocidad. Incorporarse CEDIENDO paso a los que ya circulan
- **Trampa**: NO tienes prioridad; debes incorporarte sin obstaculizar

## 4.2 Adelantamiento [CRÍTICO]

### 4.2.1 Requisitos para Adelantar
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: Visibilidad suficiente + espacio suficiente + sin crear peligro

### 4.2.2 Adelantar por la Derecha (Excepciones) ⚠️
- **Dificultad**: 4 | **Frecuencia**: MUY ALTA
- **Dato clave**: SÍ se puede cuando: el otro gira a izquierda, o en carriles poblado ≤50 km/h
- **Trampa**: Muy preguntado; hay que saber las excepciones

### 4.2.3 Zonas Prohibidas
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: Curvas sin visibilidad, cambios rasante, intersecciones, pasos peatones, túneles 1 carril

### 4.2.4 Comportamiento del Adelantado
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: NO acelerar, NO obstaculizar. Ceñirse a la derecha
- **Trampa**: Acelerar mientras te adelantan es INFRACCIÓN

## 4.3 Otras Maniobras

### 4.3.1 Marcha Atrás
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: Máximo **15 metros**. Solo como maniobra complementaria. Prohibida en autopistas

### 4.3.2 Parada vs Estacionamiento ⚠️
- **Dificultad**: 5 | **Frecuencia**: MUY ALTA
- **Dato clave**: Parada = ≤2 min sin alejarse. Estacionamiento = >2 min O alejarse
- **Trampa**: Si te alejas, aunque sea 1 minuto, es estacionamiento

---

# MÓDULO 5: USUARIOS VULNERABLES Y VMP
**Peso: Bajo-medio (1-2 preguntas)**

## 5.1 Peatones

### 5.1.1 Circulación sin Acera
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Sin acera: arcén IZQUIERDO (de frente al tráfico)
- **Trampa**: IZQUIERDO, no derecho

## 5.2 Ciclistas

### 5.2.1 Adelantar a Ciclistas
- **Dificultad**: 2 | **Frecuencia**: MUY ALTA
- **Dato clave**: Mínimo **1,5 m**. Se puede invadir contrario (incluso línea continua) si necesario

## 5.3 VMP (Patinetes) [NUEVO]

### 5.3.1 Velocidad Máxima VMP
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: **25 km/h** máximo

### 5.3.2 Dónde Pueden Circular
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: Calzada (vías ≤30 km/h) y carriles bici. PROHIBIDO aceras y vías interurbanas
- **Trampa**: Prohibido acera; prohibido autopistas/autovías/carreteras

---

# MÓDULO 6: SEGURIDAD DEL VEHÍCULO
**Peso: Bajo-medio (2-3 preguntas)**

## 6.1 Seguridad Pasiva

### 6.1.1 Sistema Retención Infantil (SRI)
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: Obligatorio para menores de **135 cm de ALTURA**
- **Trampa**: Por ALTURA (135 cm), no por edad

### 6.1.2 Airbag
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: COMPLEMENTA al cinturón, no lo sustituye. Sin cinturón puede ser peligroso

## 6.2 Seguridad Activa

### 6.2.1 ABS
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: Evita bloqueo de ruedas. Permite seguir dirigiendo mientras se frena

### 6.2.2 ESP
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Corrige trayectoria frenando ruedas individualmente si detecta pérdida de control

## 6.3 Neumáticos

### 6.3.1 Profundidad Mínima Dibujo
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Mínimo legal **1,6 mm**

## 6.4 ITV

### 6.4.1 Periodicidad ITV Turismos
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: 0-4 años: sin ITV | 4-10 años: cada 2 años | >10 años: anual
- **Trampa**: Recordar secuencia: 4 → cada 2 → anual tras 10

### 6.4.2 Resultados ITV
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Favorable=OK | Desfavorable=2 meses para reparar | Negativa=no circular

---

# MÓDULO 7: FACTORES DE RIESGO
**Peso: Medio (3-4 preguntas)**

## 7.1 Proceso de Conducción

### 7.1.1 Tiempo de Reacción
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Tiempo medio: **0,75 segundos**. Aumenta con alcohol, fatiga, distracciones

### 7.1.2 Distancia de Detención
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: Distancia de detención = Distancia de reacción + Distancia de frenado

## 7.2 Alcohol [CRÍTICO]

### 7.2.1 Efectos del Alcohol
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: Aumenta tiempo reacción, reduce campo visual (efecto túnel), genera falsa seguridad

### 7.2.2 Tasas de Alcoholemia ⚠️
- **Dificultad**: 3 | **Frecuencia**: MUY ALTA
- **Dato clave**: 
  - GENERAL: **0,5 g/l** sangre (0,25 mg/l aire)
  - NOVEL/PROFESIONAL: **0,3 g/l** sangre (0,15 mg/l aire)
- **Trampa**: Confundir tasas general vs novel/profesional

### 7.2.3 Delito Penal
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: >**1,2 g/l** en sangre = DELITO penal

### 7.2.4 Negarse a la Prueba
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: Negarse es DELITO, con mismas consecuencias que dar positivo alto

## 7.3 Drogas y Medicamentos

### 7.3.1 Pictograma Medicamentos
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Triángulo rojo con coche en envase = puede afectar a la conducción

## 7.4 Fatiga

### 7.4.1 Prevención de Fatiga
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: Pausas cada **2 HORAS** o **200 KM**. No conducir más de 8 horas

### 7.4.2 Microsueños
- **Dificultad**: 3 | **Frecuencia**: Baja
- **Dato clave**: Pérdidas consciencia de 2-3 segundos. A 120 km/h = ~100 metros sin control

## 7.5 Distracciones [CRÍTICO]

### 7.5.1 Tipos de Distracción
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Visual + Manual + Cognitiva. El móvil combina las tres = máximo peligro

### 7.5.2 Sanción por Móvil [ENDURECIDO]
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: **6 puntos** + multa (antes eran 3 puntos)

---

# MÓDULO 8: ACCIDENTES Y EMERGENCIAS
**Peso: Bajo (1-2 preguntas)**

## 8.1 Conducta PAS

### 8.1.1 Proteger
- **Dificultad**: 2 | **Frecuencia**: Alta
- **Dato clave**: PRIMERO garantizar que no haya más accidentes. Chaleco, triángulos/V-16

### 8.1.2 Colocación Triángulos
- **Dificultad**: 3 | **Frecuencia**: Alta
- **Dato clave**: A **50 m** mínimo, visible a 100 m. En doble sentido/autopista: delante y detrás

### 8.1.3 Avisar
- **Dificultad**: 1 | **Frecuencia**: Media
- **Dato clave**: Teléfono **112**. Informar: qué, dónde, cuántas víctimas, estado

### 8.1.4 Socorrer - Cuándo Mover Víctimas
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: NO mover víctimas salvo peligro inminente (fuego, derrumbamiento)

## 8.2 Primeros Auxilios

### 8.2.1 RCP Básica
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: Si NO respira: **30 compresiones + 2 ventilaciones**

### 8.2.2 Casco del Motorista
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: NO quitar el casco salvo que NO respire y sea imprescindible para RCP

## 8.3 Averías Especiales

### 8.3.1 Avería en Paso a Nivel
- **Dificultad**: 3 | **Frecuencia**: Baja
- **Dato clave**: Sacar vehículo como sea. Si hay barrera bajada, empujar contra ella para romperla
- **Trampa**: SÍ se puede/debe romper la barrera si es necesario

---

# MÓDULO 9: MEDIO AMBIENTE Y EFICIENCIA
**Peso: Bajo pero creciente (1-2 preguntas)**

## 9.1 Conducción Eficiente

### 9.1.1 Uso de Marchas
- **Dificultad**: 2 | **Frecuencia**: Baja
- **Dato clave**: Usar marchas LARGAS a bajas revoluciones ahorra combustible

## 9.2 Etiquetas Medioambientales DGT [NUEVO]

| Etiqueta | Color | Vehículos |
|----------|-------|-----------|
| CERO | Azul | Eléctricos, híbridos enchufables, hidrógeno |
| ECO | Verde-azul | Híbridos NO enchufables, gas (GNC, GLP) |
| C | Verde | Gasolina desde 2006, diésel desde 2014 |
| B | Amarilla | Gasolina desde 2000, diésel desde 2006 |
| Sin etiqueta | - | Anteriores |

**Trampa**: Confundir fechas de gasolina vs diésel

## 9.3 Zonas de Bajas Emisiones (ZBE) [NUEVO]

### 9.3.1 Qué son las ZBE
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Áreas urbanas con restricción vehículos contaminantes. Obligatorias en ciudades >50.000 hab

---

# MÓDULO 10: NORMATIVA Y PERMISO POR PUNTOS
**Peso: Bajo (1 pregunta)**

## 10.1 Sistema de Puntos

### 10.1.1 Puntos Iniciales

| Situación | Puntos |
|-----------|--------|
| Novel (<2 años) | 8 |
| >2 años sin infracciones | 12 |
| Máximo acumulable | 15 |

### 10.1.2 Infracciones de 6 Puntos
- **Dificultad**: 3 | **Frecuencia**: Media
- **Dato clave**: Uso móvil, exceso velocidad muy grave, alcohol/drogas alto, negarse prueba

### 10.1.3 Recuperación de Puntos
- **Dificultad**: 2 | **Frecuencia**: Baja
- **Dato clave**: Sin infracciones: +2 cada 2 años. Cursos: hasta +6 puntos

## 10.2 Responsabilidad y Seguros

### 10.2.1 Tipos de Responsabilidad
- **Dificultad**: 3 | **Frecuencia**: Baja
- **Dato clave**: Civil = indemnizar daños. Penal = delitos (cárcel). Administrativa = multas y puntos

### 10.2.2 Seguro Obligatorio
- **Dificultad**: 2 | **Frecuencia**: Media
- **Dato clave**: Obligatorio para todos los vehículos. Cubre daños a TERCEROS

---

# ANEXO A: DATOS NUMÉRICOS CLAVE

## Velocidades Máximas (Turismos)
- Autopista/Autovía: **120 km/h**
- Carretera conv. (+1 carril): **100 km/h**
- Carretera conv. (1 carril): **90 km/h**
- Vía urbana (+1 carril): **50 km/h**
- Vía urbana (1 carril): **30 km/h** [NUEVO]
- Travesía: **50 km/h**
- Zona residencial: **20 km/h**

## Tasas de Alcoholemia
- General: **0,5 g/l** sangre | **0,25 mg/l** aire
- Novel/Profesional: **0,3 g/l** sangre | **0,15 mg/l** aire
- Delito penal: **>1,2 g/l** sangre

## Distancias
- Lateral a ciclistas: **1,5 m**
- Marcha atrás máxima: **15 m**
- Profundidad mínima neumático: **1,6 mm**
- Triángulo emergencia: **50 m** (visible a 100 m)
- SRI obligatorio: hasta **135 cm** altura

## Puntos del Permiso
- Novel (<2 años): **8 puntos**
- >2 años sin infracciones: **12 puntos**
- Máximo: **15 puntos**
- Pérdida máxima por infracción: **6 puntos**

## Pérdida de Puntos
- Uso de móvil: **6 puntos** [ENDURECIDO]
- Exceso velocidad muy grave: **6 puntos**
- Alcohol/drogas muy alto: **6 puntos**
- Negarse a prueba: **6 puntos**
- No cinturón/casco/SRI: **4 puntos**

## Periodicidad ITV Turismos
- 0-4 años: Sin ITV
- 4-10 años: Cada 2 años
- >10 años: Anual

## Teléfonos de Emergencia
- Emergencias: **112**
- Guardia Civil: **062**
- Policía Nacional: **091**

## Otros Datos
- Tiempo de reacción medio: **0,75 s**
- Velocidad máxima VMP: **25 km/h**
- Pausas recomendadas: Cada **2h o 200 km**
- Conducción máxima diaria: **8 horas**
- Duración L novel: **1 año**
- Período novel (alcohol): **2 años**
- Permiso B motos 125cc: **3 años** experiencia

---

# ANEXO B: TOP 10 PREGUNTAS TRAMPA

| # | Tema | Trampa | Respuesta Correcta |
|---|------|--------|-------------------|
| 1 | Parada vs Estacionamiento | Confundir tiempo/presencia | Parada: ≤2 min sin alejarse |
| 2 | Velocidad excesiva vs inadecuada | Pensar que son lo mismo | Excesiva supera límite; inadecuada no se adapta |
| 3 | Prioridad en glorietas | Pensar que se cede al salir | Se cede al ENTRAR |
| 4 | Doble línea | Mirar línea del otro lado | Mirar TU línea (derecha) |
| 5 | Adelantar por derecha | Pensar que nunca se puede | Sí: si otro gira izquierda, carriles poblado |
| 6 | Tasas alcohol | Confundir general y novel | General 0,5; Novel 0,3 |
| 7 | Antiniebla trasera | Usarla cuando llueve | Solo niebla densa/nieve |
| 8 | Paneles mensaje variable | Pensar que son informativos | Son OBLIGATORIOS |
| 9 | Velocidad ciudad 1 carril | Recordar 50 km/h antiguo | 30 km/h (desde 2021) |
| 10 | V-16 vs triángulos | Pensar que sustituye ya | Período transitorio, complementa |

---

# ANEXO C: FORMATO JSON PARA PREGUNTAS

```json
{
  "id": "2.7.2-001",
  "modulo": 2,
  "tema": "2.7",
  "concepto": "Doble línea",
  "dificultad": 5,
  "frecuencia": "muy_alta",
  "pregunta": "Si circula por un carril y a su derecha tiene línea discontinua y a su izquierda línea continua, ¿puede adelantar?",
  "opciones": [
    {"letra": "A", "texto": "Sí, porque la línea más próxima a mí es la discontinua", "correcta": true},
    {"letra": "B", "texto": "No, porque hay una línea continua", "correcta": false},
    {"letra": "C", "texto": "Solo si hay buena visibilidad", "correcta": false}
  ],
  "respuesta_correcta": "A",
  "explicacion": "Se puede atravesar cuando la línea más próxima a ti (a tu derecha) es discontinua.",
  "es_trampa": true,
  "actualizado": false
}
```

---

**Versión**: 4.0  
**Última actualización**: 2024  
**Base normativa**: Reglamento General de Circulación, Ley de Tráfico y Seguridad Vial
