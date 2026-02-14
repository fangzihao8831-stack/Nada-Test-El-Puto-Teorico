"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertTriangle className="size-8 text-destructive" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-foreground">
        Algo salio mal
      </h1>
      <p className="mt-2 text-center text-muted-foreground">
        Ha ocurrido un error inesperado. Intenta de nuevo.
      </p>
      <Button className="mt-6" onClick={reset}>
        Intentar de nuevo
      </Button>
    </div>
  );
}
