"use client";

import { useRouter } from "next/navigation";
import { sampleTestQuestions } from "@/lib/mock-test-data";
import { TestSession } from "@/components/test/TestSession";

export default function DemoPage() {
  const router = useRouter();

  return (
    <TestSession
      questions={sampleTestQuestions}
      mode="estudio"
      logoHref="/"
      testTitle="Examen de prueba"
      onFinish={() => router.push("/demo/resultado")}
    />
  );
}
