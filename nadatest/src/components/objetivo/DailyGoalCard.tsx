"use client";

import { useState, useEffect } from "react";
import { ListChecks } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "nadatest_daily_goal";

export function DailyGoalCard({ todayCount }: { todayCount: number }) {
  const [goal, setGoal] = useState(2);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setGoal(Number(stored));
  }, []);

  function updateGoal(value: number) {
    const clamped = Math.max(1, Math.min(10, value));
    setGoal(clamped);
    localStorage.setItem(STORAGE_KEY, String(clamped));
  }

  return (
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
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Tests por dia:</span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => updateGoal(goal - 1)}
              disabled={goal <= 1}
            >
              -
            </Button>
            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted text-lg font-bold text-foreground">
              {goal}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => updateGoal(goal + 1)}
              disabled={goal >= 10}
            >
              +
            </Button>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Hoy llevas <span className="font-medium text-primary">{todayCount} de {goal}</span> tests completados.
        </p>
      </CardContent>
    </Card>
  );
}
