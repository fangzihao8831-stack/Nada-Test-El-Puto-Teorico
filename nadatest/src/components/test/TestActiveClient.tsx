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
      const saved = await saveTestResult(result);
      if ("error" in saved && saved.error) {
        console.error("Error al guardar el test:", saved.error);
      }
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
