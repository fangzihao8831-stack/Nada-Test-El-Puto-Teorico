"use server";

import { createClient } from "@/lib/supabase/server";
import type { TestSessionResult } from "@/types/test";

export async function saveTestResult(result: TestSessionResult) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autenticado" };
  }

  const passed = result.score >= 27;

  // Insert the test result
  const { data: testRealizado, error: testError } = await supabase
    .from("tests_realizados")
    .insert({
      usuario_id: user.id,
      modo: result.mode,
      puntuacion: result.score,
      total_preguntas: result.total,
      tiempo_usado: result.timeUsedSeconds,
    })
    .select("id")
    .single();

  if (testError) {
    return { error: testError.message };
  }

  // Insert individual answers and track failed questions
  const answers = result.questions.map((q) => {
    const userAnswer = result.answers[q.id];
    const isCorrect = userAnswer === q.correcta;
    return {
      test_realizado_id: testRealizado.id,
      pregunta_id: q.id,
      respuesta_usuario: q.opciones.findIndex((o) => o.key === userAnswer),
      es_correcta: isCorrect,
    };
  });

  const { error: answersError } = await supabase
    .from("respuestas_test")
    .insert(answers);

  if (answersError) {
    return { error: answersError.message };
  }

  // Upsert failed questions
  const failedQuestions = result.questions.filter(
    (q) => result.answers[q.id] && result.answers[q.id] !== q.correcta
  );

  for (const q of failedQuestions) {
    const { data: existing } = await supabase
      .from("preguntas_falladas")
      .select("id, veces_fallada")
      .eq("usuario_id", user.id)
      .eq("pregunta_id", q.id)
      .single();

    if (existing) {
      await supabase
        .from("preguntas_falladas")
        .update({ veces_fallada: existing.veces_fallada + 1, ultima_vez: new Date().toISOString() })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("preguntas_falladas")
        .insert({ usuario_id: user.id, pregunta_id: q.id });
    }
  }

  return { success: true, testId: testRealizado.id, passed };
}
