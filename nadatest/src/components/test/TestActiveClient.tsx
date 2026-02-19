"use client";

import { useRouter } from "next/navigation";
import { TestSession } from "@/components/test/TestSession";
import { saveTestResult } from "@/lib/auth/test-actions";
import type { TestQuestion, TestSessionResult } from "@/types/test";

interface TestActiveClientProps {
  questions: TestQuestion[];
  mode: "examen" | "estudio";
  isDemo?: boolean;
}

export function TestActiveClient({
  questions,
  mode,
  isDemo = false,
}: TestActiveClientProps) {
  const router = useRouter();

  async function handleFinish(result: TestSessionResult) {
    if (!isDemo) {
      await saveTestResult(result);
    }
    router.push(isDemo ? "/demo/resultado" : "/test/resultado");
  }

  return (
    <TestSession
      questions={questions}
      mode={mode}
      onFinish={handleFinish}
      logoHref={isDemo ? "/" : "/test"}
      testTitle={isDemo ? "Examen de prueba" : undefined}
    />
  );
}
