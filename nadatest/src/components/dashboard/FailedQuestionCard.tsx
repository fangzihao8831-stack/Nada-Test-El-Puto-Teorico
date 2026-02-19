import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FailedQuestionItem } from "@/types/user";

interface FailedQuestionCardProps {
  question: FailedQuestionItem;
}

export function FailedQuestionCard({ question }: FailedQuestionCardProps) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="space-y-2">
          <p className="text-sm text-foreground">{question.enunciado}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{question.tema}</Badge>
            <span className="text-xs text-destructive">
              {question.failCount} {question.failCount === 1 ? "vez fallada" : "veces fallada"}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3" />
              {question.lastFailed}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
