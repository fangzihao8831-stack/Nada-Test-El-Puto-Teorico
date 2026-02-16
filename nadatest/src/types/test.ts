// Test-related types for the exam simulation

export type QuestionType =
  | "directa"
  | "situacional"
  | "completar"
  | "imagen"
  | "dato"
  | "trampa";

export type ImageType = "senal" | "situacion" | "ninguna";

export type TestMode = "examen" | "estudio";

export type QuestionOrigin = "generada" | "extraida_dgt" | "extraida_todotest";

export interface TestQuestion {
  id: string;
  number: number;
  enunciado: string;
  opciones: { key: string; texto: string }[];
  correcta: string;
  explicacion: string;
  pista?: string;
  hasImage: boolean;
  imageSrc: string | null;
  tema: string;
}

export interface TestSessionResult {
  questions: Array<{
    id: string;
    number: number;
    enunciado: string;
    opciones: { key: string; texto: string }[];
    correcta: string;
    explicacion: string;
    tema: string;
  }>;
  answers: Record<string, string>;
  mode: "examen" | "estudio";
  timeUsedSeconds: number;
  score: number;
  total: number;
}

export interface TestState {
  currentQuestionIndex: number;
  answers: Record<number, number>; // questionIndex -> selectedOption
  mode: TestMode;
  timerSeconds: number;
  isTimerRunning: boolean;
  isFinished: boolean;
}

export interface QuestionResult {
  questionIndex: number;
  preguntaId: string;
  selectedOption: number;
  correctOption: number;
  isCorrect: boolean;
  timeSpent: number | null; // seconds
}

export interface TestResult {
  score: number;
  total: number;
  timeUsed: number; // seconds
  passed: boolean;
  questions: QuestionResult[];
}

export interface RecentTest {
  id: string;
  name: string;
  date: string;
  score: number;
  total: number;
  passed: boolean;
}
