import { createClient } from "@/lib/supabase/server";
import type { Test } from "@/types/database";
import type { TestQuestion } from "@/lib/mock-test-data";

const KEY_MAP = ["A", "B", "C"] as const;

function transformPreguntaToTestQuestion(
  pregunta: {
    id: string;
    enunciado: string;
    opciones: string[];
    correcta: number;
    explicacion: string;
    pista: string | null;
    requiere_imagen: boolean;
    imagen_url: string | null;
    subtemas: { temas: { nombre: string } };
  },
  index: number
): TestQuestion {
  return {
    id: pregunta.id,
    number: index + 1,
    enunciado: pregunta.enunciado,
    opciones: pregunta.opciones.map((texto, i) => ({
      key: KEY_MAP[i],
      texto,
    })),
    correcta: KEY_MAP[pregunta.correcta],
    explicacion: pregunta.explicacion,
    pista: pregunta.pista ?? undefined,
    hasImage: pregunta.requiere_imagen,
    imageSrc: pregunta.imagen_url,
    tema: pregunta.subtemas.temas.nombre,
  };
}

export async function getTestById(id: string): Promise<Test | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export async function getTestQuestions(
  testId: string
): Promise<TestQuestion[]> {
  const supabase = await createClient();

  const { data: test } = await supabase
    .from("tests")
    .select("preguntas")
    .eq("id", testId)
    .single();

  if (!test) return [];

  const preguntaIds = test.preguntas as string[];

  const { data: preguntas, error } = await supabase
    .from("preguntas")
    .select("*, subtemas!inner(temas!inner(nombre))")
    .in("id", preguntaIds);

  if (error || !preguntas) return [];

  // Reorder to match the test's pregunta order
  const preguntaMap = new Map(preguntas.map((p) => [p.id, p]));
  const ordered = preguntaIds
    .map((id) => preguntaMap.get(id))
    .filter(Boolean);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ordered.map((p: any, i: number) =>
    transformPreguntaToTestQuestion(p, i)
  );
}

export async function getNextPendingTest(
  userId: string
): Promise<Test | null> {
  const supabase = await createClient();

  // Get IDs of tests the user has already taken
  const { data: taken } = await supabase
    .from("tests_realizados")
    .select("test_id")
    .eq("usuario_id", userId)
    .not("test_id", "is", null);

  const takenIds = (taken ?? []).map((t) => t.test_id).filter(Boolean);

  let query = supabase
    .from("tests")
    .select("*")
    .eq("activo", true)
    .order("created_at", { ascending: true })
    .limit(1);

  if (takenIds.length > 0) {
    query = query.not("id", "in", `(${takenIds.join(",")})`);
  }

  const { data } = await query.single();
  return data ?? null;
}
