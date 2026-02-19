"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { questionBank } from "@/lib/question-bank";

const TEMAS: Record<string, string> = {
  tema_01: "El Conductor y el Permiso",
  tema_02: "El Vehículo",
  tema_03: "Carga, Pasajeros y Remolques",
  tema_04: "La Vía y sus Usuarios",
  tema_05: "Circulación y Velocidad",
  tema_06: "Prioridad y Maniobras",
  tema_07: "Señalización",
  tema_08: "Situaciones Especiales",
  tema_09: "Seguridad y Tecnología",
  tema_10: "Factores de Riesgo",
  tema_11: "Accidentes y Emergencias",
  tema_12: "Infracciones y Sanciones",
};

function getTipoBadgeVariant(tipo: string): "default" | "outline" | "destructive" {
  switch (tipo) {
    case "directa":
      return "default";
    case "situacional":
      return "outline";
    case "dato":
      return "destructive";
    default:
      return "outline";
  }
}

function CorrectaBadge({ correcta }: { correcta: string }) {
  const colors: Record<string, string> = {
    A: "bg-emerald-100 text-emerald-800",
    B: "bg-blue-100 text-blue-800",
    C: "bg-amber-100 text-amber-800",
  };
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-bold ${colors[correcta] ?? "bg-gray-100 text-gray-800"}`}>
      Correcta: {correcta}
    </span>
  );
}

export default function AdminPreguntasPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterTema, setFilterTema] = useState<string>("all");
  const [filterTipo, setFilterTipo] = useState<string>("all");

  const filtered = questionBank.filter((q) => {
    if (filterTema !== "all" && q.temaId !== filterTema) return false;
    if (filterTipo !== "all" && q.tipoPregunta !== filterTipo) return false;
    return true;
  });

  const tipos = [...new Set(questionBank.map((q) => q.tipoPregunta).filter(Boolean))];
  const temaIds = [...new Set(questionBank.map((q) => q.temaId))].sort();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Banco de preguntas
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {questionBank.length} preguntas en total &middot; {filtered.length} mostrando
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterTema}
          onChange={(e) => setFilterTema(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
        >
          <option value="all">Todos los temas</option>
          {temaIds.map((t) => (
            <option key={t} value={t}>
              {t} — {TEMAS[t] ?? t}
            </option>
          ))}
        </select>
        <select
          value={filterTipo}
          onChange={(e) => setFilterTipo(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
        >
          <option value="all">Todos los tipos</option>
          {tipos.map((t) => (
            <option key={t} value={t!}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Question list */}
      <div className="space-y-2">
        {filtered.map((q) => {
          const isExpanded = expandedId === q.id;
          return (
            <Card key={q.id}>
              <CardContent className="py-3">
                {/* Header row -- clickable */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="flex w-full items-start gap-2 text-left"
                >
                  <span className="mt-0.5 shrink-0 text-muted-foreground">
                    {isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{q.id}</span>
                      {q.tipoPregunta && (
                        <Badge variant={getTipoBadgeVariant(q.tipoPregunta)} className="text-[10px]">
                          {q.tipoPregunta}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-[10px]">{q.temaId}</Badge>
                      <CorrectaBadge correcta={q.correcta} />
                    </div>
                    <p className={`text-sm text-foreground ${isExpanded ? "" : "line-clamp-1"}`}>
                      {q.enunciado}
                    </p>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="mt-4 space-y-4 border-t pt-4 pl-6">
                    {/* Options */}
                    <div className="space-y-1.5">
                      {q.opciones.map((opt) => (
                        <div
                          key={opt.key}
                          className={`rounded-md border px-3 py-2 text-sm ${
                            opt.key === q.correcta
                              ? "border-emerald-400 bg-emerald-50 font-medium text-emerald-900"
                              : "border-border bg-muted/30"
                          }`}
                        >
                          <span className="font-bold">{opt.key}.</span> {opt.texto}
                        </div>
                      ))}
                    </div>

                    {/* Explanation */}
                    {q.explicacion && (
                      <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-700">Explicación</p>
                        <p className="whitespace-pre-line text-sm text-blue-900">{q.explicacion}</p>
                      </div>
                    )}

                    {/* Hint */}
                    {q.pista && (
                      <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700">Pista</p>
                        <p className="text-sm text-amber-900">{q.pista}</p>
                      </div>
                    )}

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Tema: {q.tema}</span>
                      {q.hasImage && <span>Requiere imagen</span>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
