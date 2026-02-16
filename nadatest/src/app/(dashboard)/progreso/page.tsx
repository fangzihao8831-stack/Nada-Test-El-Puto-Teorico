"use client";

import { BarChart3, Trophy, FileText } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ThemeAccordion } from "@/components/dashboard/ThemeAccordion";
import { PageHeader } from "@/components/shared/PageHeader";
import { TEMAS } from "@/lib/constants";

const mockTemas = TEMAS.map((tema, index) => ({
  id: tema.id,
  nombre: tema.nombre,
  progress: [75, 60, 45, 90, 55, 30, 80, 65, 40, 70, 50, 85][index],
  subtemas: [
    {
      id: `${tema.id}_sub_01`,
      nombre: `Conceptos basicos de ${tema.nombre.toLowerCase()}`,
    },
    {
      id: `${tema.id}_sub_02`,
      nombre: `Normativa sobre ${tema.nombre.toLowerCase()}`,
    },
    {
      id: `${tema.id}_sub_03`,
      nombre: `Casos practicos de ${tema.nombre.toLowerCase()}`,
    },
  ],
}));

export default function ProgresoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Mi progreso"
        description="Resumen de tu rendimiento y avance por temas."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatsCard
          title="Tests totales"
          value="34"
          icon={FileText}
          description="desde el inicio"
        />
        <StatsCard
          title="Nota media"
          value="87%"
          icon={BarChart3}
          trend={{ value: 5, positive: true }}
        />
        <StatsCard
          title="Mejor nota"
          value="97%"
          icon={Trophy}
          description="29/30 correctas"
        />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Progreso por temas
        </h2>
        <ThemeAccordion temas={mockTemas} />
      </div>
    </div>
  );
}
