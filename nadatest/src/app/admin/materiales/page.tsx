import { Plus, FileText, Video, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { createClient } from "@/lib/supabase/server";

function getTypeIcon(tipo: string) {
  return tipo === "video" ? Video : FileText;
}

export default async function AdminMaterialesPage() {
  const supabase = await createClient();

  const { data: materials } = await supabase
    .from("materiales")
    .select("id, titulo, tipo, url, subtemas(temas(nombre))")
    .order("created_at", { ascending: false });

  const materialItems = (materials ?? []).map((m) => {
    const subtema = m.subtemas as unknown as { temas: { nombre: string } } | null;
    return {
      id: m.id,
      titulo: m.titulo,
      tipo: m.tipo,
      tema: subtema?.temas?.nombre ?? "Sin tema",
    };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion de materiales"
        description="Administra los materiales de estudio de la plataforma."
        action={
          <Button>
            <Plus className="mr-2 size-4" />
            Agregar material
          </Button>
        }
      />

      {materialItems.length > 0 ? (
        <div className="space-y-2">
          {materialItems.map((material) => {
            const TypeIcon = getTypeIcon(material.tipo);
            return (
              <Card key={material.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <TypeIcon className="size-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {material.titulo}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{material.tipo.toUpperCase()}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {material.tema}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="Sin materiales"
          description="No hay materiales de estudio. Agrega el primero."
        />
      )}
    </div>
  );
}
