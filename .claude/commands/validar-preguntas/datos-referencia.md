# Datos de Referencia Rapida

Valores que el fact-checker debe conocer para comparar rapidamente.

## Velocidades (km/h)

### Vehiculos ligeros y conjuntos
| Via | Turismo / Moto | Con remolque ligero (≤ 750 kg) | Con remolque pesado (> 750 kg) |
|-----|----------------|-------------------------------|-------------------------------|
| Autopista/Autovia | 120 | **90** | 80 |
| Carretera convencional | 90 | **80** | 70 |
| Travesia / Via urbana | 50 | 50 | 50 |

**Trampa**: remolque ligero en autopista = **90** (NO 80). El 80 es solo para remolque pesado.

### Vehiculos pesados
| Via | Camion | Autobus (normal) | Autobus con pasajeros DE PIE | Autobus escolar |
|-----|--------|------------------|------------------------------|-----------------|
| Autopista/Autovia | 90 | **100** | **100** | 90 |
| Carretera convencional | 80 | **90** | **80** | 80 |
| Via urbana | 50 | 50 | 50 | 50 |

**Trampa**: autobus normal en autopista = **100** (NO 90). Autobus con pasajeros de pie en carretera = **80** (NO 90).

### Zonas especiales
| Zona | Limite |
|------|--------|
| Zona 30 | 30 km/h |
| Zona 20 / residencial | 20 km/h |
| Cuatriciclo ligero | 45 km/h max |

## Alcohol
| Conductor | Aire espirado | Sangre |
|-----------|---------------|--------|
| General | 0,25 mg/l | 0,5 g/l |
| Novel (< 2 anos) | 0,15 mg/l | 0,3 g/l |
| Profesional | 0,15 mg/l | 0,3 g/l |

- Superar el **doble** (0,60 mg/l aire / 1,0 g/l sangre) = delito penal
- Segunda prueba: minimo **10 minutos** de espera
- Negarse a la prueba = delito

## Senalizacion de emergencia

| Dispositivo | Detalle |
|-------------|---------|
| Triangulos | A 50 m minimo, visibles a 100 m. Uno delante y otro detras en doble sentido. |
| V-16 (baliza luminosa) | En el techo del vehiculo. Obligatoria desde enero 2026 en vias interurbanas como sustituto de triangulos. |

**No usar 150 m** — esa distancia fue eliminada como valor sin fuente. La distancia correcta del triangulo es 50 m (visible a 100 m).

## Distancias (metros)
| Distancia | Contexto |
|-----------|----------|
| 1,5 m | Separacion lateral minima al adelantar ciclistas |
| 5 m | Estacionamiento desde interseccion o paso de peatones |
| 15 m | Estacionamiento desde parada de autobus o taxi senalizada |
| 50 m | Distancia minima de colocacion del triangulo de averia |
| 100 m | Visibilidad minima del triangulo de averia |

**Intermitente**: el RGC no fija distancia ni tiempo concretos — exige "suficiente antelacion". No usar "15 segundos" ni "50 m" como dato de intermitente.

## Tiempos
| Tiempo | Contexto |
|--------|----------|
| 2 minutos | Limite parada vs estacionamiento (NO es sobre motor al ralenti) |
| 10 minutos | Espera minima entre pruebas alcoholemia |

**Descanso**: 2 horas / 200 km = **recomendacion** DGT para conductores particulares, no obligacion legal.

## Pesos
| Peso | Contexto |
|------|----------|
| 3.500 kg | MMA maxima permiso B / turismo |
| 750 kg | MMA maxima remolque ligero (sin permiso adicional) |

## Estatura ninos (SRI)
| Estatura | Regla |
|----------|-------|
| < 135 cm | Obligatorio SRI homologado, preferentemente asiento trasero |
| >= 135 cm | Puede usar cinturon de adulto |

## ITV
| Vehiculo | Exento hasta | Periodicidad |
|----------|-------------|--------------|
| Turismo | 4 anos | Cada 2 anos hasta 10 anos, luego anual |
| Motocicleta | 4 anos | Cada 2 anos hasta 10 anos, luego anual |
| Ciclomotor | 3 anos | Cada 2 anos |

## Puntos del permiso
| Situacion | Puntos |
|-----------|--------|
| Permiso nuevo (conductor novel) | 8 |
| Tras 2 anos sin infracciones graves | 12 |
| Maximo acumulable (bonus) | 15 |
| Perdida por alcohol (tasa 0,25–0,50 mg/l aire) | 4 |
| Perdida por alcohol (tasa > 0,50 mg/l aire) | 6 |

## Archivos de referencia
- Temario por tema: `content/temario/tema_XX.md` (tema_01 a tema_12)
- Preguntas generadas: `content/preguntas/*.json`
- Pipeline: `content-pipeline.md`
- Generador (formato): `.claude/commands/generar-preguntas.md`
