import { sampleTestQuestions, type TestQuestion } from "./mock-test-data";
import { questionBank } from "./question-bank";

/**
 * DGT exam distribution: how many questions per tema in a 30-question test.
 * Matches the real DGT exam proportions.
 */
const DISTRIBUTION: Record<string, number> = {
  tema_07: 6,
  tema_06: 4,
  tema_05: 3,
  tema_10: 3,
  tema_02: 2,
  tema_08: 2,
  tema_04: 2,
  tema_01: 2,
  tema_03: 2,
  tema_09: 1,
  tema_11: 2,
  tema_12: 1,
};

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Build a 30-question test with proper DGT distribution.
 * Shuffles within each tema, picks the required count, then shuffles the final set.
 * Numbers questions 1-30.
 */
export function buildTest(): TestQuestion[] {
  // Fall back to mock data when question bank is empty
  if (questionBank.length === 0) {
    return shuffle(sampleTestQuestions).map((q, i) => ({ ...q, number: i + 1 }));
  }

  const byTema: Record<string, typeof questionBank> = {};
  for (const q of questionBank) {
    if (!byTema[q.temaId]) byTema[q.temaId] = [];
    byTema[q.temaId].push(q);
  }

  const selected: TestQuestion[] = [];

  for (const [temaId, count] of Object.entries(DISTRIBUTION)) {
    const pool = byTema[temaId] || [];
    const shuffled = shuffle(pool);
    const picked = shuffled.slice(0, count);
    selected.push(...picked);
  }

  const final = shuffle(selected);

  return final.map((q, i) => ({
    ...q,
    number: i + 1,
  }));
}
