import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SubtemaItem {
  id: string;
  nombre: string;
}

interface TemaItem {
  id: string;
  nombre: string;
  progress: number;
  subtemas?: SubtemaItem[];
}

interface ThemeAccordionProps {
  temas: TemaItem[];
  className?: string;
  renderContent?: (subtema: SubtemaItem) => ReactNode;
}

function getProgressBadgeVariant(
  progress: number
): "destructive" | "outline" | "default" {
  if (progress < 30) return "destructive";
  if (progress < 70) return "outline";
  return "default";
}

export function ThemeAccordion({ temas, className, renderContent }: ThemeAccordionProps) {
  return (
    <Accordion type="multiple" className={cn(className)}>
      {temas.map((tema) => (
        <AccordionItem key={tema.id} value={tema.id}>
          <AccordionTrigger>
            <span className="text-sm font-medium">{tema.nombre}</span>
            <Badge
              variant={getProgressBadgeVariant(tema.progress)}
              className="ml-auto mr-2"
            >
              {tema.progress}%
            </Badge>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <Progress value={tema.progress} className="h-1.5" />
              {tema.subtemas && tema.subtemas.length > 0 ? (
                <ul className="space-y-1">
                  {tema.subtemas.map((subtema) => (
                    <li
                      key={subtema.id}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      {renderContent ? (
                        renderContent(subtema)
                      ) : (
                        <>
                          <span className="text-muted-foreground/60">&#8226;</span>
                          {subtema.nombre}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sin subtemas disponibles
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
