# CHECK 1: Validacion de Schema

Verifica la estructura JSON de cada pregunta. Estos son errores duros que causan REJECT inmediato.

## Campos obligatorios
| Campo | Tipo | Valores validos |
|-------|------|-----------------|
| `id` | string | Cualquier string no vacio |
| `subtema_id` | string | Formato `subtema_XX` |
| `tipo_pregunta` | string | `directa`, `situacional`, `completar`, `dato` |
| `enunciado` | string | No vacio |
| `opciones` | array | Exactamente 3 strings |
| `correcta` | int | 0, 1 o 2 |
| `explicacion` | string | No vacio |
| `pista` | string | No vacio |
| `requiere_imagen` | bool | Debe ser `true` |
| `tipo_imagen` | string | `senal`, `situacion`, `vehiculo`, `ninguna` |
| `origen` | string | `generada`, `extraida_dgt`, `extraida_todotest` |
| `validada` | bool | Cualquier valor (se cambiara a `true` si aprobada) |
| `usa_trampa` | bool | Cualquier valor |
| `palabras_trampa` | array | Array de strings (puede estar vacio) |

## Reglas de schema
- Si falta CUALQUIER campo obligatorio -> REJECT
- Si `opciones` no tiene exactamente 3 elementos -> REJECT
- Si `correcta` no es 0, 1 o 2 -> REJECT
- Si `tipo_pregunta` no es uno de los 4 valores validos -> REJECT
- Si `requiere_imagen` no es `true` -> REJECT

**Veredicto**: REJECT si cualquier regla falla. Indicar exactamente que campo y que error.
