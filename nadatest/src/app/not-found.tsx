import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="size-8 text-primary" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-foreground">
        Pagina no encontrada
      </h1>
      <p className="mt-2 text-center text-muted-foreground">
        La pagina que buscas no existe o ha sido movida.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
