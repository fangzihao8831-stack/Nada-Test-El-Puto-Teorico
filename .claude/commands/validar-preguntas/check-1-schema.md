# CHECK 1: Validación de Schema

Verifica la estructura JSON de cada pregunta. Estos son errores duros que causan REJECT inmediato.

## Campos obligatorios
| Campo | Tipo | Valores válidos |
|-------|------|-----------------|
| `id` | string | Cualquier string no vacío |
| `subtema_id` | string | Formato `subtema_XX` |
| `tipo_pregunta` | string | `directa`, `situacional`, `completar`, `dato` |
| `nivel` | int | 1, 2, 3 o 4 (según tipo — ver tipos-preguntas.md) |
| `enunciado` | string | No vacío |
| `opciones` | array | Exactamente 3 strings |
| `correcta` | int | 0, 1 o 2 |
| `explicación` | string | No vacío |
| `pista` | string | No vacío |
| `codigo_señal` | string o null | Código de señal del catálogo, o `null` |
| `origen` | string | `generada`, `extraida_dgt`, `extraida_todotest` |
| `validada` | bool | Cualquier valor (se cambiará a `true` si aprobada) |

## Reglas de schema
- Si falta CUALQUIER campo obligatorio -> REJECT
- Si `opciones` no tiene exactamente 3 elementos -> REJECT
- Si `correcta` no es 0, 1 o 2 -> REJECT
- Si `tipo_pregunta` no es uno de los 4 valores válidos -> REJECT
- Si `nivel` no es 1, 2, 3 o 4 -> REJECT

**Veredicto**: REJECT si cualquier regla falla. Indicar exactamente qué campo y qué error.
