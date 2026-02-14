"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sampleTestQuestions } from "@/lib/mock-test-data";
import { TestSession } from "@/components/test/TestSession";
import type { TestMode } from "@/types/test";

function TestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as TestMode) || "estudio";

  return (
    <TestSession
      questions={sampleTestQuestions}
      mode={mode}
      onFinish={() => router.push("/test/resultado")}
    />
  );
}

export default function TestActivePage() {
  return (
    <Suspense>
      <TestContent />
    </Suspense>
  );
}
