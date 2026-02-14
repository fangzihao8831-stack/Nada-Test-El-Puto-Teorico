import { Target, Calendar, ListChecks } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "@/components/dashboard/ProgressBar";

export default function ObjetivoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Mi objetivo
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Define tu meta y controla tu avance hacia el examen.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            <CardTitle className="text-base">Fecha del examen</CardTitle>
          </div>
          <CardDescription>
            Indica cuando tienes previsto presentarte al examen teorico.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="examDate">Fecha del examen</Label>
            <Input
              id="examDate"
              type="date"
              defaultValue="2026-04-15"
              className="max-w-xs"
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Faltan <span className="font-medium text-foreground">62 dias</span> para tu examen.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ListChecks className="size-5 text-primary" />
            <CardTitle className="text-base">Objetivo diario</CardTitle>
          </div>
          <CardDescription>
            Cuantos tests quieres hacer al dia?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Tests por dia:</span>
            <div className="flex size-12 items-center justify-center rounded-lg border border-border bg-muted text-lg font-bold text-foreground">
              2
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Hoy llevas <span className="font-medium text-primary">1 de 2</span> tests completados.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="size-5 text-primary" />
            <CardTitle className="text-base">Progreso hacia tu objetivo</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProgressBar label="Tests completados" value={12} max={60} />
          <ProgressBar label="Temas estudiados" value={8} max={12} variant="success" />
          <ProgressBar label="Nota media" value={87} max={100} />
        </CardContent>
      </Card>
    </div>
  );
}
