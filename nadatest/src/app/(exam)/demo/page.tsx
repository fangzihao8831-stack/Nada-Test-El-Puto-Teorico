"use client";

import { questionBank } from "@/lib/question-bank";
import { TestActiveClient } from "@/components/test/TestActiveClient";

// Show only batch_05 questions (IDs 0501-0530)
const batch05 = questionBank.filter((q) =>
  q.id >= "pregunta_0501" && q.id <= "pregunta_0530"
);
const questions = batch05.map((q, i) => ({ ...q, number: i + 1 }));

export default function DemoPage() {
  return (
    <TestActiveClient
      questions={questions}
      mode="estudio"
      isDemo
    />
  );
}
