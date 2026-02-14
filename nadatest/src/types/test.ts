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
