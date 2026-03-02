"use client";

import { questionBank } from "@/lib/question-bank";
import { TestActiveClient } from "@/components/test/TestActiveClient";

// Show only batch_11 questions (IDs 0822-0851)
const batch11 = questionBank.filter((q) =>
  q.id >= "pregunta_0822" && q.id <= "pregunta_0851"
);
const questions = batch11.map((q, i) => ({ ...q, number: i + 1 }));

export default function DemoPage() {
  return (
    <TestActiveClient
      questions={questions}
      mode="estudio"
      isDemo
    />
  );
}
