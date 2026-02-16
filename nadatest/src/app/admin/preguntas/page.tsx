import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";

const mockQuestions = [
  {
    id: "pregunta_001",
    enunciado: "Cual es la velocidad maxima permitida en autopista para un turismo?",
    tipo: "directa",
    tema: "Circulacion y Velocidad",
    validada: true,
  },
  {
    id: "pregunta_002",
    enunciado: "Si circula por una via urbana y ve a un peaton cruzando por un paso de peatones...",
    tipo: "situacional",
    tema: "Prioridad y Maniobras",
    validada: true,
  },
  {
    id: "pregunta_003",
    enunciado: "La tasa maxima de alcohol en sangre para conductores profesionales es de...",
    tipo: "completar",
    tema: "Factores de Riesgo",
    validada: false,
  },
  {
    id: "pregunta_004",
    enunciado: "Cada cuantos anos debe pasar la ITV un turismo nuevo por primera vez?",
    tipo: "dato",
    tema: "El Vehiculo",
    validada: true,
  },
  {
    id: "pregunta_005",
    enunciado: "En todas las vias urbanas, la velocidad maxima es siempre de 30 km/h.",
    tipo: "trampa",
    tema: "Circulacion y Velocidad",
    validada: false,
  },
];

function getTipoBadgeVariant(tipo: string): "default" | "outline" {
  switch (tipo) {
    case "directa":
    case "dato":
      return "default";
    default:
      return "outline";
  }
}

export default function AdminPreguntasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion de preguntas"
        description="Administra el banco de preguntas de la plataforma."
        action={
          <Button>
            <Plus className="mr-2 size-4" />
            Agregar pregunta
          </Button>
        }
      />

      <div className="space-y-2">
        {mockQuestions.map((question) => (
          <Card key={question.id}>
            <CardContent className="py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {question.id}
                    </span>
                    {question.validada ? (
                      <Badge className="bg-success text-success-foreground hover:bg-success/80">Validada</Badge>
                    ) : (
                      <Badge variant="outline">Pendiente</Badge>
                    )}
                  </div>
                  <p className="line-clamp-2 text-sm text-foreground">
                    {question.enunciado}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getTipoBadgeVariant(question.tipo)}>
                    {question.tipo}
                  </Badge>
                  <Badge variant="outline">{question.tema}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
