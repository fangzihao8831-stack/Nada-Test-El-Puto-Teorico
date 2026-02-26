# CHECK 1: Validación de Schema

Verifica la estructura JSON de cada pregunta. Estos son errores duros que causan REJECT inmediato.

## Campos obligatorios
| Campo | Tipo | Valores válidos |
|-------|------|-----------------|
| `id` | string | Cualquier string no vacío |
| `subtema_id` | string | Formato `subtema_XX` |
| `tipo_pregunta` | string | `directa`, `situacional`, `completar`, `dato` |
| `dificultad` | object | Objeto con 6 dimensiones + total + nivel (ver abajo) |
| `enunciado` | string | No vacío |
| `opciones` | array | Exactamente 3 strings |
| `correcta` | int | 0, 1 o 2 |
| `explicación` | string | No vacío |
| `pista` | string | No vacío |
| `codigo_señal` | string o null | Código de señal del catálogo, o `null` |
| `origen` | string | `generada`, `extraida_dgt`, `extraida_todotest` |
| `validada` | bool | Cualquier valor (se cambiará a `true` si aprobada) |

## Estructura de `dificultad`

```json
{
  "d_reglas": 0-2,
  "d_excepcion": 0-2,
  "d_densidad": 0-1,
  "d_implicito": 0-1,
  "d_distractores": 0-2,
  "d_contraintuitivo": 0-1,
  "total": 0-9,
  "nivel": 1-4
}
```

## Reglas de schema
- Si falta CUALQUIER campo obligatorio -> REJECT
- Si `opciones` no tiene exactamente 3 elementos -> REJECT
- Si `correcta` no es 0, 1 o 2 -> REJECT
- Si `tipo_pregunta` no es uno de los 4 valores válidos -> REJECT
- Si `dificultad` no es un objeto con las 8 claves (d_reglas, d_excepcion, d_densidad, d_implicito, d_distractores, d_contraintuitivo, total, nivel) -> REJECT
- Si `dificultad.nivel` no es 1, 2, 3 o 4 -> REJECT
- Si `dificultad.total` no coincide con la suma de las 6 dimensiones -> REJECT
- Si `dificultad.nivel` no coincide con el total segun la tabla (0-2=L1, 3-5=L2, 6-7=L3, 8-9=L4) -> REJECT
- Si tipo_pregunta no es `situacional` y `dificultad.nivel` es 4 -> REJECT (nivel 4 solo para situacional)

**Veredicto**: REJECT si cualquier regla falla. Indicar exactamente qué campo y qué error.
