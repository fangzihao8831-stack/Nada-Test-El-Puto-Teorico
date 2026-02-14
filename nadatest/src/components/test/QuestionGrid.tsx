"use client";

import { cn } from "@/lib/utils";

interface QuestionGridProps {
  total: number;
  currentIndex: number;
  answers: Record<string, string>;
  questions: Array<{ id: string }>;
  onSelect: (index: number) => void;
  /** Map of question id → true if correct, false if incorrect. Only used in estudio mode. */
  results?: Record<string, boolean>;
}

export function QuestionGrid({
  total,
  currentIndex,
  answers,
  questions,
  onSelect,
  results,
}: QuestionGridProps) {
  return (
    <div className="grid grid-cols-10 gap-1.5 sm:grid-cols-[repeat(15,1fr)] lg:grid-cols-[repeat(20,1fr)]">
      {Array.from({ length: total }, (_, i) => {
        const question = questions[i];
        const isAnswered = question ? answers[question.id] !== undefined : false;
        const isCurrent = i === currentIndex;
        const result = question && results ? results[question.id] : undefined;

        let cellStyle = "border-border bg-card text-foreground hover:bg-muted/50";

        if (isCurrent) {
          cellStyle = "border-primary bg-primary/10 text-primary";
        } else if (isAnswered && result === true) {
          cellStyle = "border-success/50 bg-success/15 text-success";
        } else if (isAnswered && result === false) {
          cellStyle = "border-destructive/50 bg-destructive/15 text-destructive";
        } else if (isAnswered) {
          cellStyle = "border-border bg-muted text-muted-foreground";
        }

        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            className={cn(
              "flex aspect-square items-center justify-center border text-xs font-semibold transition-colors sm:text-sm",
              cellStyle
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        );
      })}
    </div>
  );
}
