"use client";

import { CheckCircle, XCircle, MinusCircle } from "lucide-react";
import type { ConsultaNotaResult } from "@/types/dgt";

interface ResultadoNotaProps {
  result: ConsultaNotaResult;
  clasePermiso: string;
  fechaExamen: string;
}

const resultStyles = {
  APTO: {
    icon: CheckCircle,
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    labelBg: "bg-emerald-100 text-emerald-800",
    iconColor: "text-emerald-500",
  },
  "NO APTO": {
    icon: XCircle,
    border: "border-red-200",
    bg: "bg-red-50",
    labelBg: "bg-red-100 text-red-800",
    iconColor: "text-red-500",
  },
  "NO PRESENTADO": {
    icon: MinusCircle,
    border: "border-slate-200",
    bg: "bg-slate-50",
    labelBg: "bg-slate-100 text-slate-700",
    iconColor: "text-slate-400",
  },
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-base font-semibold text-foreground">{value}</span>
    </div>
  );
}

export function ResultadoNota({ result, clasePermiso, fechaExamen }: ResultadoNotaProps) {
  if (!result.success && result.error) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5">
        <XCircle className="mt-0.5 size-6 shrink-0 text-red-500" />
        <p className="text-red-700">{result.error}</p>
      </div>
    );
  }

  if (!result.resultado) return null;

  const styles = resultStyles[result.resultado];
  const Icon = styles.icon;

  return (
    <div className={`overflow-hidden rounded-xl border ${styles.border}`}>
      <div className={`flex items-center gap-3 px-5 py-4 ${styles.bg}`}>
        <Icon className={`size-6 ${styles.iconColor}`} />
        <span className={`rounded-md px-3 py-1 text-base font-bold ${styles.labelBg}`}>
          {result.resultado}
        </span>
        {result.nombre && (
          <span className="ml-auto text-sm text-muted-foreground">
            {result.nombre}
          </span>
        )}
      </div>
      <div className="divide-y bg-card px-5">
        <Row label="Clase de permiso" value={clasePermiso} />
        {result.tipoExamen && (
          <Row
            label="Tipo de prueba"
            value={result.tipoExamen === "TEORICO" ? "Teorico comun" : "Practico"}
          />
        )}
        <Row label="Fecha de examen" value={fechaExamen} />
        <Row label="Calificacion" value={result.resultado} />
        {result.errores !== undefined && (
          <Row label="Numero de errores" value={String(result.errores)} />
        )}
      </div>
    </div>
  );
}
