import type { QuestionType } from "@/types/test";

export const QUESTION_TYPES: QuestionType[] = [
  "directa",
  "situacional",
  "completar",
  "imagen",
  "dato",
  "trampa",
];

export const TEST_CONFIG = {
  questionsPerTest: 30,
  timeLimitMinutes: 30,
  passingScore: 27,
} as const;

export const TEMAS = [
  { id: "tema_01", nombre: "El Conductor y el Permiso", orden: 1 },
  { id: "tema_02", nombre: "El Vehículo", orden: 2 },
  { id: "tema_03", nombre: "Carga, Pasajeros y Remolques", orden: 3 },
  { id: "tema_04", nombre: "La Vía y sus Usuarios", orden: 4 },
  { id: "tema_05", nombre: "Circulación y Velocidad", orden: 5 },
  { id: "tema_06", nombre: "Prioridad y Maniobras", orden: 6 },
  { id: "tema_07", nombre: "Señalización", orden: 7 },
  { id: "tema_08", nombre: "Situaciones Especiales", orden: 8 },
  { id: "tema_09", nombre: "Seguridad y Tecnología", orden: 9 },
  { id: "tema_10", nombre: "Factores de Riesgo", orden: 10 },
  { id: "tema_11", nombre: "Accidentes, Emergencias y Medio Ambiente", orden: 11 },
  { id: "tema_12", nombre: "Infracciones y Sanciones", orden: 12 },
] as const;
