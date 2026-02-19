"use client";

import { sampleTestQuestions } from "@/lib/mock-test-data";
import { TestActiveClient } from "@/components/test/TestActiveClient";

export default function DemoPage() {
  return (
    <TestActiveClient
      questions={sampleTestQuestions}
      mode="estudio"
      isDemo
    />
  );
}
