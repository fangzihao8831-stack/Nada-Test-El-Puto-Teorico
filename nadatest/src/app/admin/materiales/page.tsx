import { Plus, FileText, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";

const mockMaterials = [
  { id: "mat_001", titulo: "Presentacion - El Conductor y el Permiso", tipo: "ppt", tema: "Tema 1" },
  { id: "mat_002", titulo: "Video - El Vehiculo: componentes y mantenimiento", tipo: "video", tema: "Tema 2" },
  { id: "mat_003", titulo: "Presentacion - Circulacion y Velocidad", tipo: "ppt", tema: "Tema 5" },
  { id: "mat_004", titulo: "Video - Senalizacion: tipos de senales", tipo: "video", tema: "Tema 7" },
  { id: "mat_005", titulo: "Presentacion - Factores de Riesgo", tipo: "ppt", tema: "Tema 10" },
];

function getTypeIcon(tipo: string) {
  return tipo === "video" ? Video : FileText;
}

export default function AdminMaterialesPage() {
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

      <div className="space-y-2">
        {mockMaterials.map((material) => {
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
    </div>
  );
}
