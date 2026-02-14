import { BookOpen } from "lucide-react";
import { ThemeAccordion } from "@/components/dashboard/ThemeAccordion";
import { TEMAS } from "@/lib/constants";

const mockTemas = TEMAS.map((tema) => ({
  id: tema.id,
  nombre: tema.nombre,
  progress: 0,
  subtemas: [
    { id: `${tema.id}_sub_01`, nombre: "Conceptos generales" },
    { id: `${tema.id}_sub_02`, nombre: "Normativa vigente" },
    { id: `${tema.id}_sub_03`, nombre: "Situaciones practicas" },
  ],
}));

export default function MaterialesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Materiales de estudio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Consulta el temario organizado por los 12 temas del permiso B.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-4">
        <BookOpen className="size-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Contenido basado en el temario oficial de la DGT.
          Selecciona un tema para ver sus subtemas.
        </p>
      </div>

      <ThemeAccordion temas={mockTemas} />
    </div>
  );
}
