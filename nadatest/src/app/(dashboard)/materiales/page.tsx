import { BookOpen } from "lucide-react";
import { ThemeAccordion } from "@/components/dashboard/ThemeAccordion";
import { MaterialItem } from "@/components/dashboard/MaterialItem";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { createClient } from "@/lib/supabase/server";

export default async function MaterialesPage() {
  const supabase = await createClient();

  // Fetch temas with subtemas and materials
  const { data: temas } = await supabase
    .from("temas")
    .select("id, nombre, orden, subtemas(id, nombre, materiales(id, titulo, tipo, url))")
    .order("orden");

  type SubtemaRow = {
    id: string;
    nombre: string;
    materiales: { id: string; titulo: string; tipo: string; url: string }[];
  };

  const temaItems = (temas ?? []).map((tema) => {
    const subtemas = (tema.subtemas as unknown as SubtemaRow[]) ?? [];
    const totalMaterials = subtemas.reduce((sum, s) => sum + (s.materiales?.length ?? 0), 0);
    return {
      id: tema.id,
      nombre: tema.nombre,
      progress: totalMaterials > 0 ? 100 : 0,
      subtemas: subtemas.map((s) => ({
        id: s.id,
        nombre: s.nombre,
        materials: s.materiales ?? [],
      })),
    };
  });

  const hasMaterials = temaItems.some((t) =>
    t.subtemas.some((s) => s.materials.length > 0)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Materiales de estudio"
        description="Consulta el temario organizado por los 12 temas del permiso B."
      />

      <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-4">
        <BookOpen className="size-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Contenido basado en el temario oficial de la DGT.
          Selecciona un tema para ver sus subtemas y materiales.
        </p>
      </div>

      {temaItems.length > 0 ? (
        <ThemeAccordion
          temas={temaItems}
          renderContent={(subtema) => {
            const sub = temaItems
              .flatMap((t) => t.subtemas)
              .find((s) => s.id === subtema.id);
            const materials = sub?.materials ?? [];

            if (materials.length === 0) {
              return (
                <>
                  <span className="text-muted-foreground/60">&#8226;</span>
                  {subtema.nombre}
                </>
              );
            }

            return (
              <div className="w-full space-y-1">
                <span className="font-medium text-foreground">{subtema.nombre}</span>
                {materials.map((m) => (
                  <MaterialItem key={m.id} material={m} />
                ))}
              </div>
            );
          }}
        />
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Sin materiales disponibles"
          description="Los materiales de estudio se agregarán próximamente."
        />
      )}
    </div>
  );
}
