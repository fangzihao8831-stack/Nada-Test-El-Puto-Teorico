-- Atomic upsert for failed questions: insert or increment veces_fallada
CREATE OR REPLACE FUNCTION upsert_failed_question(
  p_usuario_id UUID,
  p_pregunta_id TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO preguntas_falladas (usuario_id, pregunta_id, veces_fallada, ultima_vez)
  VALUES (p_usuario_id, p_pregunta_id, 1, NOW())
  ON CONFLICT (usuario_id, pregunta_id)
  DO UPDATE SET
    veces_fallada = preguntas_falladas.veces_fallada + 1,
    ultima_vez = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
