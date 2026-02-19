import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockTests = [
  { id: "test_001", nombre: "Test general #1", numPreguntas: 30, activo: true },
  { id: "test_002", nombre: "Test general #2", numPreguntas: 30, activo: true },
  { id: "test_003", nombre: "Test general #3", numPreguntas: 30, activo: true },
  { id: "test_004", nombre: "Test temático - Señalización", numPreguntas: 30, activo: false },
  { id: "test_005", nombre: "Test temático - Prioridad", numPreguntas: 30, activo: true },
];

export default function AdminTestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Gestión de tests
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Administra los tests predefinidos de la plataforma.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          Crear test
        </Button>
      </div>

      <div className="space-y-2">
        {mockTests.map((test) => (
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
    </div>
  );
}
