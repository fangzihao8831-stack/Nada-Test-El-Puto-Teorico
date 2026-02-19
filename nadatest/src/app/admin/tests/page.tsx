import { Plus, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { createClient } from "@/lib/supabase/server";

export default async function AdminTestsPage() {
  const supabase = await createClient();

  const { data: tests } = await supabase
    .from("tests")
    .select("id, nombre, preguntas, activo")
    .order("created_at", { ascending: false });

  const testItems = (tests ?? []).map((t) => ({
    id: t.id,
    nombre: t.nombre,
    numPreguntas: (t.preguntas as string[])?.length ?? 0,
    activo: t.activo,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de tests"
        description="Administra los tests predefinidos de la plataforma."
        action={
          <Button>
            <Plus className="mr-2 size-4" />
            Crear test
          </Button>
        }
      />

      {testItems.length > 0 ? (
        <div className="space-y-2">
          {testItems.map((test) => (
            <Card key={test.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {test.nombre}
                    </p>
                    <Badge
                      variant={test.activo ? "default" : "outline"}
                      className={test.activo ? "bg-success text-success-foreground hover:bg-success/80" : ""}
                    >
                      {test.activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {test.numPreguntas} preguntas
                  </p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {test.id}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ClipboardList}
          title="Sin tests"
          description="No hay tests creados. Crea el primero."
        />
      )}
    </div>
  );
}
