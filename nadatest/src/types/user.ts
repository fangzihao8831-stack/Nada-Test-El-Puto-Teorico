// User-related types for progress tracking and stats

export interface UserProgress {
  temaId: string;
  temaNombre: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  percentage: number;
}

export interface UserStats {
  totalTests: number;
  averageScore: number;
  bestScore: number;
  currentStreak: number;
  totalQuestions: number;
  totalCorrect: number;
}

export interface FailedQuestion {
  preguntaId: string;
  enunciado: string;
  failCount: number;
  lastFailed: string; // timestamp
}
