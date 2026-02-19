"use client";

import { useState } from "react";
import { ConsultaNotaForm } from "@/components/dgt/consulta-nota-form";
import type { ConsultaFormInput } from "@/components/dgt/consulta-nota-form";
import { ResultadoNota } from "@/components/dgt/resultado-nota";
import { HistorialNotas } from "@/components/dgt/historial-notas";
import type { ConsultaNotaResult } from "@/types/dgt";

export default function NotasDGTPage() {
  const [result, setResult] = useState<ConsultaNotaResult | null>(null);
  const [formInput, setFormInput] = useState<ConsultaFormInput | null>(null);

  function handleResult(res: ConsultaNotaResult, input: ConsultaFormInput) {
    setResult(res);
    setFormInput(input);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Consulta de notas</h1>
        <p className="text-muted-foreground">
          Resultados oficiales de la DGT
        </p>
      </div>

      <ConsultaNotaForm onResult={handleResult} />

      {result && formInput && (
        <ResultadoNota
          result={result}
          clasePermiso={formInput.clasePermiso}
          fechaExamen={formInput.fechaExamen}
        />
      )}

      <HistorialNotas />
    </div>
  );
}
