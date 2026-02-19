"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { buildTest } from "@/lib/build-test";
import { TestSession } from "@/components/test/TestSession";

export default function DemoPage() {
  const router = useRouter();
  const questions = useMemo(() => buildTest(), []);

  return (
    <TestSession
      questions={questions}
      mode="estudio"
      logoHref="/"
      testTitle="Examen de prueba"
      onFinish={() => router.push("/demo/resultado")}
    />
  );
}
