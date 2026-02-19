"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STORAGE_KEY = "nadatest_exam_date";

function getDaysUntil(dateStr: string): number | null {
  const target = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diff = target.getTime() - now.getTime();
  if (diff < 0) return null;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function ExamDateCard() {
  const [examDate, setExamDate] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setExamDate(stored);
  }, []);

  function handleChange(value: string) {
    setExamDate(value);
    localStorage.setItem(STORAGE_KEY, value);
  }

  const daysLeft = examDate ? getDaysUntil(examDate) : null;

  return (
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
            value={examDate}
            onChange={(e) => handleChange(e.target.value)}
            className="max-w-xs"
          />
        </div>
        {daysLeft !== null && (
          <p className="mt-3 text-sm text-muted-foreground">
            Faltan <span className="font-medium text-foreground">{daysLeft} dias</span> para tu examen.
          </p>
        )}
        {examDate && daysLeft === null && (
          <p className="mt-3 text-sm text-destructive">
            La fecha del examen ya ha pasado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
