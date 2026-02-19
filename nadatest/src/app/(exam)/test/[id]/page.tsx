"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buildTest } from "@/lib/build-test";
import { TestSession } from "@/components/test/TestSession";
import type { TestMode } from "@/types/test";

function TestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = (searchParams.get("mode") as TestMode) || "estudio";
  const questions = useMemo(() => buildTest(), []);

  return (
    <TestSession
      questions={questions}
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
