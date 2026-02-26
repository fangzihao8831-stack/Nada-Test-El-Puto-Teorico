"use client";

import { questionBank } from "@/lib/question-bank";
import { TestActiveClient } from "@/components/test/TestActiveClient";

// Show only batch_06 questions (IDs 0601-0630)
const batch06 = questionBank.filter((q) =>
  q.id >= "pregunta_0601" && q.id <= "pregunta_0630"
);
const questions = batch06.map((q, i) => ({ ...q, number: i + 1 }));

export default function DemoPage() {
  return (
    <TestActiveClient
      questions={questions}
      mode="estudio"
      isDemo
    />
  );
}
