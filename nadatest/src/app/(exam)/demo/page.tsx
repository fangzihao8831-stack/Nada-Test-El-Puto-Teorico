"use client";

import { questionBank } from "@/lib/question-bank";
import { TestActiveClient } from "@/components/test/TestActiveClient";

const questions = questionBank.map((q, i) => ({ ...q, number: i + 1 }));

export default function DemoPage() {
  return (
    <TestActiveClient
      questions={questions}
      mode="estudio"
      isDemo
    />
  );
}
