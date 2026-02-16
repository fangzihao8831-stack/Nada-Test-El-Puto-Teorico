-- Seed data: 12 temas and 58 subtemas from content-structure.json

INSERT INTO temas (id, nombre, descripcion, orden, peso_examen) VALUES
  ('tema_01', 'El Conductor y el Permiso', 'Permisos, documentacion y sistema de puntos', 1, 5),
  ('tema_02', 'El Vehiculo', 'Caracteristicas, ITV, seguro y vehiculos electricos', 2, 8),
  ('tema_03', 'Carga, Pasajeros y Remolques', 'Transporte de carga, personas, animales y remolques', 3, 5),
  ('tema_04', 'La Via y sus Usuarios', 'Tipos de vias, usuarios vulnerables y visibilidad', 4, 7),
  ('tema_05', 'Circulacion y Velocidad', 'Normas generales, velocidad, distancia y marcha atras', 5, 10),
  ('tema_06', 'Prioridad y Maniobras', 'Prioridad, incorporacion, adelantamientos, intersecciones y estacionamiento', 6, 12),
  ('tema_07', 'Senalizacion', 'Alumbrado, senales acusticas, agentes, semaforos, senales y marcas viales', 7, 20),
  ('tema_08', 'Situaciones Especiales', 'Autopistas, tuneles, pasos a nivel, condiciones adversas y viajes', 8, 8),
  ('tema_09', 'Seguridad y Tecnologia', 'Seguridad activa, pasiva, ADAS y conduccion autonoma', 9, 5),
  ('tema_10', 'Factores de Riesgo', 'Alcohol, drogas, fatiga, distracciones y emociones', 10, 10),
  ('tema_11', 'Accidentes, Emergencias y Medio Ambiente', 'Conducta PAS, primeros auxilios, equipamiento y conduccion eficiente', 11, 5),
  ('tema_12', 'Infracciones y Sanciones', 'Infracciones, sanciones, procedimiento sancionador e inmovilizacion', 12, 5);

INSERT INTO subtemas (id, tema_id, nombre, orden) VALUES
  -- Tema 01
  ('subtema_01', 'tema_01', 'El permiso de conducir', 1),
  ('subtema_02', 'tema_01', 'Documentacion', 2),
  ('subtema_03', 'tema_01', 'Permiso por puntos', 3),
  -- Tema 02
  ('subtema_04', 'tema_02', 'El vehiculo', 1),
  ('subtema_05', 'tema_02', 'ITV', 2),
  ('subtema_06', 'tema_02', 'El seguro', 3),
  ('subtema_07', 'tema_02', 'Vehiculos electricos e hibridos', 4),
  -- Tema 03
  ('subtema_08', 'tema_03', 'La carga', 1),
  ('subtema_09', 'tema_03', 'Transporte de personas y animales', 2),
  ('subtema_10', 'tema_03', 'Remolques', 3),
  -- Tema 04
  ('subtema_11', 'tema_04', 'La via publica', 1),
  ('subtema_12', 'tema_04', 'Usuarios vulnerables', 2),
  ('subtema_13', 'tema_04', 'Nuevas senales y tipologias de via', 3),
  ('subtema_14', 'tema_04', 'Angulos muertos y visibilidad', 4),
  -- Tema 05
  ('subtema_15', 'tema_05', 'Normas generales de circulacion', 1),
  ('subtema_16', 'tema_05', 'Velocidad', 2),
  ('subtema_17', 'tema_05', 'Distancia de seguridad', 3),
  ('subtema_18', 'tema_05', 'Marcha atras', 4),
  -- Tema 06
  ('subtema_19', 'tema_06', 'Prioridad de paso', 1),
  ('subtema_20', 'tema_06', 'Incorporacion a la circulacion', 2),
  ('subtema_21', 'tema_06', 'Adelantamientos', 3),
  ('subtema_22', 'tema_06', 'Intersecciones', 4),
  ('subtema_23', 'tema_06', 'Parada y estacionamiento', 5),
  -- Tema 07
  ('subtema_24', 'tema_07', 'Alumbrado', 1),
  ('subtema_25', 'tema_07', 'Senales acusticas', 2),
  ('subtema_26', 'tema_07', 'Jerarquia de senales', 3),
  ('subtema_27', 'tema_07', 'Senales de los agentes', 4),
  ('subtema_28', 'tema_07', 'Semaforos', 5),
  ('subtema_29', 'tema_07', 'Senales verticales', 6),
  ('subtema_30', 'tema_07', 'Marcas viales', 7),
  ('subtema_31', 'tema_07', 'Senalizacion circunstancial', 8),
  -- Tema 08
  ('subtema_32', 'tema_08', 'Autopistas y autovias', 1),
  ('subtema_33', 'tema_08', 'Tuneles', 2),
  ('subtema_34', 'tema_08', 'Pasos a nivel', 3),
  ('subtema_35', 'tema_08', 'Condiciones adversas', 4),
  ('subtema_36', 'tema_08', 'Preparacion y desarrollo del viaje', 5),
  ('subtema_37', 'tema_08', 'Conduccion en grupo y situaciones especiales', 6),
  -- Tema 09
  ('subtema_38', 'tema_09', 'Seguridad activa', 1),
  ('subtema_39', 'tema_09', 'Seguridad pasiva', 2),
  ('subtema_40', 'tema_09', 'Sistemas ADAS', 3),
  ('subtema_41', 'tema_09', 'Comprobaciones y mantenimiento', 4),
  ('subtema_42', 'tema_09', 'Conduccion autonoma y automatizada', 5),
  -- Tema 10
  ('subtema_43', 'tema_10', 'Alcohol', 1),
  ('subtema_44', 'tema_10', 'Drogas', 2),
  ('subtema_45', 'tema_10', 'Medicamentos', 3),
  ('subtema_46', 'tema_10', 'Fatiga y sueno', 4),
  ('subtema_47', 'tema_10', 'Distracciones', 5),
  ('subtema_48', 'tema_10', 'Velocidad como factor de riesgo', 6),
  ('subtema_49', 'tema_10', 'Estados emocionales', 7),
  -- Tema 11
  ('subtema_50', 'tema_11', 'Conducta PAS', 1),
  ('subtema_51', 'tema_11', 'Primeros auxilios', 2),
  ('subtema_52', 'tema_11', 'Equipamiento de emergencia', 3),
  ('subtema_53', 'tema_11', 'Conduccion eficiente', 4),
  ('subtema_54', 'tema_11', 'Medio ambiente', 5),
  -- Tema 12
  ('subtema_55', 'tema_12', 'Infracciones y sanciones', 1),
  ('subtema_56', 'tema_12', 'Responsabilidad del conductor', 2),
  ('subtema_57', 'tema_12', 'Inmovilizacion y retirada de vehiculos', 3),
  ('subtema_58', 'tema_12', 'Procedimiento sancionador', 4);
