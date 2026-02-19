import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TestActiveClient } from "@/components/test/TestActiveClient";
import type { TestMode, TestQuestion } from "@/types/test";

const KEY_MAP = ["A", "B", "C"] as const;

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode?: string }>;
}

export default async function TestActivePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { mode: modeParam } = await searchParams;
  const mode: TestMode = modeParam === "examen" ? "examen" : "estudio";

  const supabase = await createClient();

  // Fetch the test
  const { data: test } = await supabase
    .from("tests")
    .select("id, preguntas")
    .eq("id", id)
    .eq("activo", true)
    .single();

  if (!test) notFound();

  const preguntaIds = test.preguntas as string[];

  // Fetch all questions for this test with tema info
  const { data: preguntas } = await supabase
    .from("preguntas")
    .select("id, enunciado, opciones, correcta, explicacion, pista, requiere_imagen, imagen_url, subtemas(temas(nombre))")
    .in("id", preguntaIds);

  if (!preguntas || preguntas.length === 0) notFound();

  // Maintain the order defined in the test
  const preguntaMap = new Map(preguntas.map((p) => [p.id, p]));
  const ordered = preguntaIds
    .map((id) => preguntaMap.get(id))
    .filter(Boolean) as typeof preguntas;

  // Transform DB Pregunta to TestQuestion
  const questions: TestQuestion[] = ordered.map((p, i) => {
    const opciones = (p.opciones as string[]).map((texto, idx) => ({
      key: KEY_MAP[idx],
      texto,
    }));
    const subtema = p.subtemas as unknown as { temas: { nombre: string } } | null;

    return {
      id: p.id,
      number: i + 1,
      enunciado: p.enunciado,
      opciones,
      correcta: KEY_MAP[p.correcta as number],
      explicacion: p.explicacion,
      pista: p.pista ?? undefined,
      hasImage: p.requiere_imagen,
      imageSrc: p.imagen_url,
      tema: subtema?.temas?.nombre ?? "General",
    };
  });

  return <TestActiveClient questions={questions} mode={mode} />;
}
