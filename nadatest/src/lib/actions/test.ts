"use server";

import { createClient } from "@/lib/supabase/server";
import type { ApiResponse } from "@/types/api";
import type { QuestionResult } from "@/types/test";

interface SubmitTestData {
  testId: string | null;
  tipo: "test" | "tema" | "fallos";
  modo: "examen" | "estudio";
  puntuacion: number;
  totalPreguntas: number;
  tiempoUsado: number;
  results: QuestionResult[];
}

export async function submitTestResults(
  data: SubmitTestData
): Promise<ApiResponse<{ testRealizadoId: string }>> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "No autenticado" };
  }

  // 1. Insert tests_realizados
  const { data: testRealizado, error: testError } = await supabase
    .from("tests_realizados")
    .insert({
      usuario_id: user.id,
      test_id: data.testId,
      tipo: data.tipo,
      modo: data.modo,
      puntuacion: data.puntuacion,
      total_preguntas: data.totalPreguntas,
      tiempo_usado: data.tiempoUsado,
    })
    .select("id")
    .single();

  if (testError || !testRealizado) {
    console.error("Failed to insert test_realizado:", testError);
    return { success: false, error: "Error al guardar el test" };
  }

  // 2. Batch insert respuestas_test
  const respuestas = data.results.map((r) => ({
    test_realizado_id: testRealizado.id,
    pregunta_id: r.preguntaId,
    respuesta_usuario: r.selectedOption,
    es_correcta: r.isCorrect,
    tiempo_respuesta: r.timeSpent,
  }));

  const { error: respuestasError } = await supabase
    .from("respuestas_test")
    .insert(respuestas);

  if (respuestasError) {
    console.error("Failed to insert respuestas:", respuestasError);
    return { success: false, error: "Error al guardar las respuestas" };
  }

  // 3. Update failed questions
  const wrongAnswers = data.results.filter((r) => !r.isCorrect);
  const correctAnswers = data.results.filter((r) => r.isCorrect);

  // Upsert wrong answers via RPC
  for (const wrong of wrongAnswers) {
    await supabase.rpc("upsert_failed_question", {
      p_usuario_id: user.id,
      p_pregunta_id: wrong.preguntaId,
    });
  }

  // Remove correct answers from failed questions (if they exist)
  if (correctAnswers.length > 0) {
    const correctIds = correctAnswers.map((r) => r.preguntaId);
    await supabase
      .from("preguntas_falladas")
      .delete()
      .eq("usuario_id", user.id)
      .in("pregunta_id", correctIds);
  }

  return { success: true, data: { testRealizadoId: testRealizado.id } };
}
