# 📚 Complete Guide: Creating DGT Study Materials & Questions

## Overview: The Spanish Driving Theory Exam

### Exam Structure (Permiso B)
| Aspect | Value |
|--------|-------|
| **Total Questions** | 30 |
| **Maximum Errors** | 3 (to pass) |
| **Time Limit** | 30 minutes |
| **Options per Question** | 3 (A, B, C) |
| **Correct Answers** | 1 per question |
| **Validity if Passed** | 2 years to complete practical |
| **Exam Type** | Computer-based, touch screen |

### Question Distribution by Topic

Based on DGT patterns and the temario, here's the typical distribution:

| Module | Weight | ~Questions | Priority |
|--------|--------|------------|----------|
| **Señalización** (Signs & Signals) | 25-30% | 8-9 | 🔴 CRITICAL |
| **Normas de Circulación** (Traffic Rules) | 25-30% | 8-9 | 🔴 CRITICAL |
| **Maniobras** (Maneuvers) | 15% | 4-5 | 🟡 IMPORTANT |
| **Factores de Riesgo** (Risk Factors) | 10-15% | 3-4 | 🟡 IMPORTANT |
| **Fundamentos** (Basics) | 5% | 1-2 | 🟢 NECESSARY |
| **Seguridad del Vehículo** | 5-8% | 2-3 | 🟢 NECESSARY |
| **Emergencias** | 3-5% | 1-2 | 🟢 NECESSARY |
| **Medio Ambiente** | 3-5% | 1-2 | 🟢 NECESSARY |

---

## Part 1: Creating Effective Study Materials

### 1.1 Content Organization Strategy

Structure your materials in **3 layers**:

```
Layer 1: Quick Reference Cards (memorization)
└── Key numbers, limits, penalties
└── Signal recognition
└── Priority rules

Layer 2: Concept Explanations (understanding)
└── Why rules exist
└── Real-world applications
└── Common scenarios

Layer 3: Practice Questions (application)
└── Varied difficulty
└── Trap questions
└── Exam simulations
```

### 1.2 Essential Topics to Cover

#### 🚗 TIER 1: Must Master (70% of exam)

**1. Speed Limits (Velocidades)**
```
MEMORIZE THIS TABLE:

Autopista/Autovía:     120 km/h
Carretera (+1 carril): 100 km/h
Carretera (1 carril):   90 km/h
Vía urbana (+1 carril): 50 km/h
Vía urbana (1 carril):  30 km/h  ← NEW since 2021!
Travesía:               50 km/h
Zona residencial:       20 km/h
```

**2. Signs (Señales)**
- Vertical signs: prohibition (red circle), obligation (blue circle), warning (triangle)
- Road markings: continuous vs discontinuous lines
- Traffic lights: all combinations including arrows
- Agent signals: arm positions

**3. Priority Rules (Prioridad)**
- Hierarchy: Agents > Temporary signs > Traffic lights > Vertical signs > Road markings
- Roundabouts: Yield when ENTERING, priority once inside
- Right-hand rule at unmarked intersections

**4. Alcohol Limits (Alcoholemia)**
```
General:           0.5 g/l blood (0.25 mg/l air)
Novel/Professional: 0.3 g/l blood (0.15 mg/l air)
Criminal offense:   >1.2 g/l blood
```

#### 🚗 TIER 2: Important (20% of exam)

**5. Overtaking Rules**
- When allowed/prohibited
- Right-side overtaking exceptions
- Distance to cyclists: 1.5 meters minimum

**6. Safety Systems**
- ABS, ESP functions
- Child seats (SRI): required until 135cm HEIGHT
- Airbag: complements seatbelt, doesn't replace

**7. Emergencies**
- PAS protocol: Protect → Alert → Help
- Emergency number: 112
- Warning triangles: 50m minimum distance

#### 🚗 TIER 3: Supplementary (10% of exam)

**8. Vehicle Technical**
- ITV schedule: 0-4 years (none), 4-10 years (every 2), 10+ (annual)
- Tire depth: minimum 1.6mm

**9. Environmental**
- DGT labels: CERO, ECO, C, B
- Low Emission Zones (ZBE)

**10. Points System**
- Initial: 8 (novel), 12 (experienced), max 15
- Mobile phone use: 6 points
- No seatbelt: 4 points

---

## Part 2: Creating Questions

### 2.1 Question Types

**Type A: Direct Knowledge** (Difficulty 1-2)
```json
{
  "pregunta": "¿Cuál es el teléfono de emergencias en España?",
  "opciones": [
    {"texto": "112", "correcta": true},
    {"texto": "911", "correcta": false},
    {"texto": "091", "correcta": false}
  ]
}
```

**Type B: Comprehension** (Difficulty 2-3)
```json
{
  "pregunta": "¿Qué significa la luz amarilla fija del semáforo?",
  "opciones": [
    {"texto": "Detenerse si es posible hacerlo con seguridad", "correcta": true},
    {"texto": "Acelerar para pasar antes del rojo", "correcta": false},
    {"texto": "Pasar sin precaución", "correcta": false}
  ]
}
```

**Type C: Application** (Difficulty 3-4)
```json
{
  "pregunta": "Circula por una carretera convencional de un solo carril. ¿Cuál es la velocidad máxima permitida?",
  "opciones": [
    {"texto": "90 km/h", "correcta": true},
    {"texto": "100 km/h", "correcta": false},
    {"texto": "120 km/h", "correcta": false}
  ]
}
```

**Type D: Trap Questions** (Difficulty 4-5)
```json
{
  "pregunta": "Si a su derecha hay una línea discontinua y a su izquierda una línea continua, ¿puede adelantar?",
  "opciones": [
    {"texto": "Sí, porque la línea más próxima a mí es discontinua", "correcta": true},
    {"texto": "No, porque hay una línea continua", "correcta": false},
    {"texto": "Solo si el vehículo delante circula muy lento", "correcta": false}
  ]
}
```

### 2.2 Question Schema

```json
{
  "id": "string (format: module.topic.number)",
  "modulo": "number (1-10)",
  "tema": "string",
  "concepto": "string",
  "dificultad": "number (1-5)",
  "frecuencia": "baja | media | alta | muy_alta",
  "pregunta": "string",
  "imagen": "string | null (path to image if visual question)",
  "opciones": [
    {"letra": "A", "texto": "string", "correcta": "boolean"},
    {"letra": "B", "texto": "string", "correcta": "boolean"},
    {"letra": "C", "texto": "string", "correcta": "boolean"}
  ],
  "respuesta_correcta": "A | B | C",
  "explicacion": "string (why this answer is correct)",
  "es_trampa": "boolean",
  "actualizado": "boolean (true if recent law change)",
  "tags": ["string array for filtering"]
}
```

### 2.3 Top 15 Trap Questions to Include

These are the most commonly failed questions:

| # | Topic | The Trap | Correct Answer |
|---|-------|----------|----------------|
| 1 | Parada vs Estacionamiento | Confusing time/presence | Parada: ≤2 min without leaving |
| 2 | Velocidad excesiva vs inadecuada | Thinking they're the same | Excesiva = over limit; Inadecuada = not adapted to conditions |
| 3 | Prioridad en glorietas | Thinking you yield when exiting | You yield when ENTERING |
| 4 | Doble línea | Looking at the wrong line | Look at YOUR line (right side) |
| 5 | Adelantar por derecha | Thinking it's never allowed | Allowed if: other turns left, or city lanes |
| 6 | Tasas alcohol | Mixing general and novel limits | General 0.5; Novel 0.3 |
| 7 | Antiniebla trasera | Using it when raining | ONLY for dense fog/snow |
| 8 | Paneles mensaje variable | Thinking they're just informational | They're MANDATORY |
| 9 | Velocidad ciudad 1 carril | Remembering old 50 km/h | 30 km/h (since 2021) |
| 10 | V-16 vs triángulos | Thinking V-16 replaces triangles now | Transitional period - complements |
| 11 | Motos 125cc con B | Thinking it works in all EU | ONLY valid in Spain |
| 12 | Prohibido adelantar | Thinking it applies to bicycles | Can still overtake bicycles |
| 13 | SRI menores | Using age instead of height | Required until 135cm HEIGHT |
| 14 | Cinturón responsabilidad | Thinking adults are responsible for themselves | Driver responsible for ALL minors |
| 15 | Pisar línea continua ciclistas | Thinking you can never cross | CAN cross briefly for 1.5m distance |

---

## Part 3: Study Materials Structure

### 3.1 Recommended File Structure

```
Nada-Test-El-Puto-Teorico/
├── README.md
├── STUDY_GUIDE.md (this file)
├── temario_nadatest_v4.md (your comprehensive syllabus)
│
├── content/
│   ├── 01-fundamentos/
│   │   ├── teoria.md
│   │   └── resumen.md
│   ├── 02-senalizacion/
│   │   ├── teoria.md
│   │   ├── resumen.md
│   │   └── imagenes/
│   ├── 03-normas-circulacion/
│   ├── 04-maniobras/
│   ├── 05-usuarios-vulnerables/
│   ├── 06-seguridad-vehiculo/
│   ├── 07-factores-riesgo/
│   ├── 08-accidentes-emergencias/
│   ├── 09-medio-ambiente/
│   └── 10-normativa-puntos/
│
├── questions/
│   ├── banco-preguntas.json (main question bank)
│   ├── por-tema/
│   │   ├── senalizacion.json
│   │   ├── normas.json
│   │   └── ...
│   └── examenes-simulacro/
│       ├── examen-001.json
│       └── ...
│
├── flashcards/
│   ├── numeros-clave.json
│   ├── senales.json
│   └── prioridades.json
│
├── assets/
│   ├── senales/
│   │   ├── prohibicion/
│   │   ├── obligacion/
│   │   ├── peligro/
│   │   └── indicacion/
│   └── situaciones/
│
└── app/ (if building an app)
    └── ...
```

### 3.2 Flashcard Format

```json
{
  "id": "fc-vel-001",
  "categoria": "velocidades",
  "frente": "Velocidad máxima en vía urbana de UN solo carril",
  "reverso": "30 km/h",
  "nota": "Nuevo desde 2021 - antes era 50 km/h",
  "importancia": "alta"
}
```

### 3.3 Summary Card Format

```markdown
## 🚦 Semáforos - Resumen Rápido

### Luz Roja
- ❌ STOP obligatorio
- ⚠️ Con flecha verde: avanzar en dirección de flecha CEDIENDO paso

### Luz Amarilla Fija
- Detenerse si es seguro
- Si no puedes parar con seguridad: pasar con precaución
- ❌ NO significa "acelera para pasar"

### Luz Amarilla Intermitente
- Precaución, NO obliga a detenerse
- Aplicar normas de prioridad normales

### Luz Verde
- ✅ Pasar
- ⚠️ Pero ceder paso a peatones que estén cruzando
```

---

## Part 4: Question Generation Guidelines

### 4.1 Question Writing Rules

1. **Be precise**: Avoid ambiguous wording
2. **One concept per question**: Don't test multiple things at once
3. **Realistic distractors**: Wrong answers should be plausible
4. **Avoid "all of the above"**: DGT doesn't use this format
5. **Include images when relevant**: Especially for signs and situations
6. **Vary difficulty**: Mix easy (confidence builders) with hard (learning moments)

### 4.2 Difficulty Distribution for Practice Tests

| Difficulty | % of Test | Purpose |
|------------|-----------|---------|
| 1-2 (Basic) | 20% | Build confidence |
| 3 (Medium) | 50% | Core learning |
| 4-5 (Hard/Trap) | 30% | Exam preparation |

### 4.3 Question Generation Prompts

When generating questions from the temario, use these patterns:

**For numbers/limits:**
```
"¿Cuál es [límite/dato] para [contexto]?"
"¿A qué distancia [acción]?"
"¿Cuántos [unidad] [concepto]?"
```

**For rules/procedures:**
```
"¿Qué debe hacer si [situación]?"
"¿Cuándo está permitido [acción]?"
"¿Quién tiene prioridad cuando [situación]?"
```

**For signs:**
```
"Esta señal indica que..."
"¿Qué significa [señal]?"
"Ante esta señal, debe..."
```

**For situations (with image):**
```
"En esta situación, ¿qué debe hacer?"
"¿Quién tiene preferencia de paso?"
"¿Puede realizar [maniobra] en este caso?"
```

---

## Part 5: Implementation Recommendations

### 5.1 For a Web/Mobile App

**Core Features:**
1. **Study Mode**: Read through theory by topic
2. **Flashcard Mode**: Quick review of key facts
3. **Practice Mode**: Answer questions with immediate feedback
4. **Exam Simulation**: 30 questions, 30 minutes, real conditions
5. **Progress Tracking**: Track weak areas

**Gamification Ideas:**
- Streak counter for daily practice
- Achievement badges
- Leaderboard (if multiplayer)
- Unlock harder questions as you improve

### 5.2 Spaced Repetition

Implement SRS (Spaced Repetition System) for flashcards:
- Questions answered wrong: Show again soon
- Questions answered correctly: Increase interval
- Focus on weak areas automatically

### 5.3 Analytics to Track

- Overall accuracy %
- Accuracy by topic
- Most missed questions
- Time per question
- Progress over time

---

## Part 6: Quick Reference Numbers

### Speeds
| Context | Limit |
|---------|-------|
| Autopista/Autovía | 120 km/h |
| Carretera +1 carril | 100 km/h |
| Carretera 1 carril | 90 km/h |
| Vía urbana +1 carril | 50 km/h |
| Vía urbana 1 carril | **30 km/h** |
| Travesía | 50 km/h |
| Zona residencial | 20 km/h |
| VMP máxima | 25 km/h |
| Velocidad mínima autopista | 60 km/h |

### Alcohol
| Context | Blood | Air |
|---------|-------|-----|
| General | 0.5 g/l | 0.25 mg/l |
| Novel/Professional | 0.3 g/l | 0.15 mg/l |
| Criminal | >1.2 g/l | - |

### Distances
| What | Distance |
|------|----------|
| Lateral to cyclists | 1.5 m |
| Reverse maximum | 15 m |
| Warning triangle | 50 m (visible at 100m) |
| Tire depth minimum | 1.6 mm |

### Points
| Situation | Points |
|-----------|--------|
| Novel driver | 8 |
| After 2 years clean | 12 |
| Maximum | 15 |
| Mobile phone | -6 |
| No seatbelt/helmet | -4 |

### Times
| What | Duration |
|------|----------|
| L plate (novel) | 1 year |
| Novel period (alcohol) | 2 years |
| B license for 125cc | 3 years experience |
| Break every | 2 hours or 200 km |
| Max daily driving | 8 hours |
| Reaction time average | 0.75 seconds |

### ITV (Turismos)
| Age | Frequency |
|-----|-----------|
| 0-4 years | None |
| 4-10 years | Every 2 years |
| 10+ years | Annual |

### Emergency Numbers
| Service | Number |
|---------|--------|
| Emergencies | 112 |
| Guardia Civil | 062 |
| Policía Nacional | 091 |

---

## Part 7: Resources

### Official Sources
- DGT (Dirección General de Tráfico): https://www.dgt.es
- BOE (for official regulations): https://www.boe.es
- Check results: https://sedeapl.dgt.gob.es/WEB_NOTP_CONSULTA/consultaNota.faces

### Practice Test Sites (for reference)
- PracticaTest.com
- TodoTest.com
- TestDGT.es

### Updates to Watch For
- Speed limit changes
- Point system modifications
- New vehicle categories (VMP, electric)
- Environmental regulations (ZBE)
- V-16 device requirements (mandatory from 2026)

---

## Next Steps

1. **Extract visual content** from the PDF (signs, diagrams)
2. **Create question bank** following the JSON schema
3. **Build/use a study app** (web, mobile, or CLI)
4. **Add exam simulations** with realistic conditions
5. **Include progress tracking** for weak area identification

---

*Last updated: 2024*
*Based on: Reglamento General de Circulación, Ley de Tráfico y Seguridad Vial*
