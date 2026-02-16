import Link from "next/link";
import { FileText, Timer, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageHeader";
import { TEST_CONFIG } from "@/lib/constants";

export default function TestPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Realizar test"
        description="Elige un modo y comienza a practicar."
      />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle>Test de {TEST_CONFIG.questionsPerTest} preguntas</CardTitle>
              <CardDescription>
                Formato oficial del examen teorico del permiso B de la DGT.
                Necesitas {TEST_CONFIG.passingScore} respuestas correctas para aprobar.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="examen" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="examen">Examen</TabsTrigger>
          <TabsTrigger value="estudio">Estudio</TabsTrigger>
        </TabsList>

        <TabsContent value="examen">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Timer className="size-5 text-primary" />
                <CardTitle className="text-base">Modo examen</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Preguntas</span>
                  <span className="text-foreground">{TEST_CONFIG.questionsPerTest}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tiempo limite</span>
                  <span className="text-foreground">{TEST_CONFIG.timeLimitMinutes} minutos</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Para aprobar</span>
                  <span className="text-foreground">{TEST_CONFIG.passingScore} correctas</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Feedback</span>
                  <Badge variant="outline">Al finalizar</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Simula las condiciones reales del examen. No podras ver las respuestas
                correctas hasta que finalices el test.
              </p>
              <Button className="w-full" asChild>
                <Link href="/test/1?mode=examen">Comenzar examen</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estudio">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="size-5 text-primary" />
                <CardTitle className="text-base">Modo estudio</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Preguntas</span>
                  <span className="text-foreground">{TEST_CONFIG.questionsPerTest}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Tiempo limite</span>
                  <Badge variant="outline">Sin limite</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Feedback</span>
                  <Badge variant="outline">Despues de cada pregunta</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Practica a tu ritmo. Despues de cada pregunta veras si has acertado
                y una explicacion de la respuesta correcta.
              </p>
              <Button className="w-full" asChild>
                <Link href="/test/1?mode=estudio">Comenzar estudio</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
