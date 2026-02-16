"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  ImageIcon,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { QuestionGrid } from "@/components/test/QuestionGrid";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/utils";
import { useTimer } from "@/hooks/useTimer";
import { TEST_CONFIG } from "@/lib/constants";
import type { TestQuestion, TestSessionResult } from "@/types/test";

export type { TestSessionResult };

const STORAGE_KEY = "nadatest_last_result";

/* ── Module-level sub-components (stable types, no remounting) ── */

function AnswerOption({
  opcion,
  isMobile,
  isSelected,
  isCorrectOption,
  showFeedback,
  isCorrect,
  onSelect,
}: {
  opcion: { key: string; texto: string };
  isMobile?: boolean;
  isSelected: boolean;
  isCorrectOption: boolean;
  showFeedback: boolean;
  isCorrect: boolean;
  onSelect: () => void;
}) {
  let circleClass = "bg-muted text-muted-foreground";
  let textClass = "text-foreground/80";

  if (showFeedback) {
    if (isCorrectOption) {
      circleClass = "bg-success text-white";
      textClass = "text-foreground font-medium";
    } else if (isSelected && !isCorrect) {
      circleClass = "bg-destructive text-white";
      textClass = "text-foreground/50 line-through";
    } else {
      textClass = "text-foreground/40";
    }
  } else if (isSelected) {
    circleClass = "bg-primary text-white";
    textClass = "text-foreground";
  }

  const circleSize = isMobile ? "size-6" : "size-7";
  const iconSize = isMobile ? "size-3.5" : "size-4";
  const textSize = isMobile ? "text-sm" : "text-base";
  const gap = isMobile ? "gap-3" : "gap-4";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn("flex w-full items-start text-left", gap)}
      disabled={showFeedback}
    >
      <span
        className={cn(
          "mt-0.5 flex shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
          circleSize,
          circleClass
        )}
      >
        {showFeedback && isCorrectOption ? (
          <CheckCircle2 className={iconSize} />
        ) : showFeedback && isSelected && !isCorrect ? (
          <XCircle className={iconSize} />
        ) : (
          opcion.key
        )}
      </span>
      <span
        className={cn(
          "leading-relaxed transition-colors",
          textSize,
          textClass
        )}
      >
        {opcion.texto}
      </span>
    </button>
  );
}

function FeedbackBox({
  show,
  isCorrect,
  explicacion,
}: {
  show: boolean;
  isCorrect: boolean;
  explicacion: string;
}) {
  if (!show) return null;
  return (
    <div
      className={cn(
        "mt-4 rounded-lg border px-4 py-3 text-sm leading-relaxed",
        isCorrect
          ? "border-success/30 bg-success/5 text-foreground"
          : "border-destructive/30 bg-destructive/5 text-foreground"
      )}
    >
      <p className="mb-1 font-semibold">
        {isCorrect ? "Correcto" : "Incorrecto"}
      </p>
      <p>{explicacion}</p>
    </div>
  );
}

function HintBox({
  pista,
  mode,
  answered,
  revealed,
  onReveal,
  isMobile,
}: {
  pista?: string;
  mode: "examen" | "estudio";
  answered: boolean;
  revealed: boolean;
  onReveal: () => void;
  isMobile?: boolean;
}) {
  if (mode !== "estudio" || !pista || answered) return null;

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={onReveal}
        className={cn(
          "flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors",
          isMobile ? "mt-3 text-xs" : "mt-4 text-sm"
        )}
      >
        <Lightbulb className={isMobile ? "size-3.5" : "size-4"} />
        <span>Ver pista</span>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 leading-relaxed text-foreground",
        isMobile ? "mt-3 text-xs" : "mt-4 text-sm"
      )}
    >
      <p className="mb-1 flex items-center gap-1.5 font-semibold text-amber-700">
        <Lightbulb className="size-3.5" />
        Pista
      </p>
      <p>{pista}</p>
    </div>
  );
}

function QuestionImage({
  imageSrc,
  className,
}: {
  imageSrc: string | null;
  className?: string;
}) {
  if (imageSrc) {
    return (
      <div
        className={cn(
          "overflow-hidden border border-border bg-muted/30",
          className
        )}
      >
        <Image
          src={imageSrc}
          alt="Imagen de la pregunta"
          width={400}
          height={300}
          className="h-full w-full object-contain"
          unoptimized
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center border border-border bg-muted/30",
        className
      )}
    >
      <div className="flex flex-col items-center gap-1 text-muted-foreground/40">
        <ImageIcon className="size-10" />
        <span className="text-xs">Sin imagen</span>
      </div>
    </div>
  );
}

/* ── Main TestSession component ── */

interface TestSessionProps {
  questions: TestQuestion[];
  mode: "examen" | "estudio";
  onFinish: (result: TestSessionResult) => void;
  logoHref?: string;
  testTitle?: string;
}

export function TestSession({
  questions,
  mode,
  onFinish,
  logoHref = "/test",
  testTitle = "Prueba de control de conocimientos - B",
}: TestSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealedHints, setRevealedHints] = useState<Set<string>>(new Set());
  const isFinishedRef = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const total = questions.length;
  const question = questions[currentIndex];
  const selectedAnswer = answers[question.id] ?? null;
  const answeredCount = Object.keys(answers).length;
  const isCorrect = selectedAnswer === question.correcta;
  const showFeedback = mode === "estudio" && selectedAnswer !== null;
  const hintRevealed = revealedHints.has(question.id);

  const timeLimitSeconds = TEST_CONFIG.timeLimitMinutes * 60;

  // handleFinish is hoisted — safe to reference before useTimer call
  function handleFinish() {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    stopTimer();

    const currentAnswers = answersRef.current;
    const currentSeconds = secondsRef.current;

    let score = 0;
    for (const q of questions) {
      if (currentAnswers[q.id] === q.correcta) score++;
    }

    const timeUsed =
      mode === "examen"
        ? timeLimitSeconds - currentSeconds
        : currentSeconds;

    const result: TestSessionResult = {
      questions: questions.map((q) => ({
        id: q.id,
        number: q.number,
        enunciado: q.enunciado,
        opciones: q.opciones,
        correcta: q.correcta,
        explicacion: q.explicacion,
        tema: q.tema,
      })),
      answers: { ...currentAnswers },
      mode,
      timeUsedSeconds: timeUsed,
      score,
      total,
    };

    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } catch {
      // sessionStorage might be unavailable
    }

    onFinish(result);
  }

  const {
    secondsRef,
    displayRef: timerDisplayRef,
    stop: stopTimer,
  } = useTimer({
    initialSeconds: mode === "examen" ? timeLimitSeconds : 0,
    direction: mode === "examen" ? "down" : "up",
    onTimeUp: mode === "examen" ? handleFinish : undefined,
  });

  // Build results map for grid colors (estudio mode)
  const results = useMemo(() => {
    if (mode !== "estudio") return undefined;
    const map: Record<string, boolean> = {};
    for (const q of questions) {
      if (answers[q.id] !== undefined) {
        map[q.id] = answers[q.id] === q.correcta;
      }
    }
    return map;
  }, [answers, mode, questions]);

  function handleSelectAnswer(key: string) {
    if (mode === "estudio" && selectedAnswer !== null) return;
    setAnswers((prev) => ({ ...prev, [question.id]: key }));
  }

  function goTo(index: number) {
    if (index >= 0 && index < total) {
      setCurrentIndex(index);
    }
  }

  function revealHint() {
    setRevealedHints((prev) => new Set(prev).add(question.id));
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* ── Header ── */}
      <header className="shrink-0 border-b border-border bg-card">
        <div className="flex h-11 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Link href={logoHref} className="text-sm font-bold text-primary">
              Nadatest
            </Link>
            <span className="hidden text-sm text-muted-foreground md:inline">
              {testTitle}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-xs">
              {mode === "estudio" ? "Modo estudio" : "Modo examen"}
            </Badge>
            <div className="hidden items-center gap-2 sm:flex">
              <Progress
                value={(answeredCount / total) * 100}
                className="h-1.5 w-24"
              />
              <span className="text-xs text-muted-foreground">
                {answeredCount}/{total}
              </span>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              <Clock className="mr-1 size-3" />
              <span ref={timerDisplayRef}>
                {formatTime(
                  mode === "examen" ? timeLimitSeconds : 0
                )}
              </span>
            </Badge>
            <Avatar size="sm">
              <AvatarFallback>
                <User className="size-3" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* Mobile progress */}
        <div className="flex items-center gap-2 border-t border-border px-4 py-1 sm:hidden">
          <span className="text-xs text-muted-foreground">
            {currentIndex + 1}/{total}
          </span>
          <Progress
            value={(answeredCount / total) * 100}
            className="h-1 flex-1"
          />
        </div>
      </header>

      {/* ── Scrollable content ── */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-5xl px-4 py-4 md:px-6 md:py-6 lg:px-8">
          {/* Desktop layout */}
          <div className="hidden md:flex md:gap-8">
            <div className="w-[300px] shrink-0 lg:w-[340px]">
              <QuestionImage
                imageSrc={question.imageSrc}
                className="aspect-[4/3] w-full"
              />
            </div>

            <div className="flex flex-1 flex-col">
              <div className="mb-2">
                <Badge variant="outline" className="text-xs">
                  {question.tema}
                </Badge>
              </div>
              <p className="text-lg font-bold leading-relaxed text-foreground lg:text-xl">
                <span className="mr-2 text-primary">
                  {question.number}.
                </span>
                {question.enunciado}
              </p>

              <HintBox
                pista={question.pista}
                mode={mode}
                answered={selectedAnswer !== null}
                revealed={hintRevealed}
                onReveal={revealHint}
              />

              <div className="mt-5 space-y-4">
                {question.opciones.map((opcion) => (
                  <AnswerOption
                    key={opcion.key}
                    opcion={opcion}
                    isSelected={selectedAnswer === opcion.key}
                    isCorrectOption={opcion.key === question.correcta}
                    showFeedback={showFeedback}
                    isCorrect={isCorrect}
                    onSelect={() => handleSelectAnswer(opcion.key)}
                  />
                ))}
              </div>

              <FeedbackBox
                show={showFeedback}
                isCorrect={isCorrect}
                explicacion={question.explicacion}
              />
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col md:hidden">
            <QuestionImage
              imageSrc={question.imageSrc}
              className="mb-3 h-52"
            />

            <Badge variant="outline" className="mb-2 w-fit text-xs">
              {question.tema}
            </Badge>
            <p className="text-base font-bold leading-relaxed text-foreground">
              <span className="mr-2 text-primary">
                {question.number}.
              </span>
              {question.enunciado}
            </p>

            <HintBox
              pista={question.pista}
              mode={mode}
              answered={selectedAnswer !== null}
              revealed={hintRevealed}
              onReveal={revealHint}
              isMobile
            />

            <div className="mt-4 space-y-3">
              {question.opciones.map((opcion) => (
                <AnswerOption
                  key={opcion.key}
                  opcion={opcion}
                  isMobile
                  isSelected={selectedAnswer === opcion.key}
                  isCorrectOption={opcion.key === question.correcta}
                  showFeedback={showFeedback}
                  isCorrect={isCorrect}
                  onSelect={() => handleSelectAnswer(opcion.key)}
                />
              ))}
            </div>

            <FeedbackBox
              show={showFeedback}
              isCorrect={isCorrect}
              explicacion={question.explicacion}
            />
          </div>

        </div>
      </main>

      {/* ── Fixed footer: nav buttons + grid ── */}
      <div className="shrink-0 border-t border-border bg-card px-4 py-2.5 lg:px-6">
        <div className="mx-auto max-w-5xl space-y-2.5">
          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              disabled={currentIndex === 0}
              onClick={() => goTo(currentIndex - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                if (currentIndex < total - 1) {
                  goTo(currentIndex + 1);
                }
              }}
              disabled={currentIndex === total - 1}
            >
              SIGUIENTE <ChevronRight className="ml-1 size-4" />
            </Button>
            <Button variant="outline" onClick={handleFinish}>
              Finalizar test
            </Button>
          </div>

          {/* Question grid */}
          <QuestionGrid
            total={total}
            currentIndex={currentIndex}
            answers={answers}
            questions={questions}
            onSelect={goTo}
            results={results}
          />
        </div>
      </div>
    </div>
  );
}
