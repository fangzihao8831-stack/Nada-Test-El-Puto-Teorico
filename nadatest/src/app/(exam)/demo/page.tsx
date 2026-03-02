"use client";

import { questionBank } from "@/lib/question-bank";
import { TestActiveClient } from "@/components/test/TestActiveClient";

// Show only batch_10 questions (IDs 0792-0821)
const batch10 = questionBank.filter((q) =>
  q.id >= "pregunta_0792" && q.id <= "pregunta_0821"
);
const questions = batch10.map((q, i) => ({ ...q, number: i + 1 }));

export default function DemoPage() {
  return (
    <TestActiveClient
      questions={questions}
      mode="estudio"
      isDemo
    />
  );
}
