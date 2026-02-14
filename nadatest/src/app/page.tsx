import Link from "next/link";
import {
  FileText,
  Timer,
  BarChart3,
  ArrowRight,
  UserPlus,
  ClipboardList,
  BookOpen,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const features = [
  {
    icon: FileText,
    title: "Tests reales",
    description:
      "30 preguntas con el mismo formato que el examen oficial de la DGT. Practica como si fuera el día del examen.",
  },
  {
    icon: Timer,
    title: "Modo examen y estudio",
    description:
      "Simula el examen real con 30 minutos de tiempo, o practica sin límite con pistas y explicaciones.",
  },
  {
    icon: BarChart3,
    title: "Progreso y fallos",
    description:
      "Sigue tu avance por cada uno de los 12 temas. Repasa las preguntas que más fallas para mejorar.",
  },
];

const steps = [
  {
    icon: UserPlus,
    label: "Regístrate gratis",
  },
  {
    icon: ClipboardList,
    label: "Elige un test (100 disponibles)",
  },
  {
    icon: BookOpen,
    label: "Practica en modo examen o estudio",
  },
  {
    icon: Search,
    label: "Revisa tus fallos y mejora",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <span className="animate-fade-in text-xl font-bold text-primary">Nadatest</span>
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Iniciar sesión</Link>
          </Button>
        </div>
      </header>

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 -top-16 mx-auto max-w-lg rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
          <div className="mx-auto max-w-5xl px-4 text-center">
            <h1
              className="animate-fade-up relative text-3xl font-bold tracking-tight text-foreground md:text-5xl"
              style={{ animationDelay: "0.1s" }}
            >
              Prepara tu examen teórico
              <br />
              <span className="text-primary">del permiso B</span>
            </h1>
            <p
              className="animate-fade-up relative mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl"
              style={{ animationDelay: "0.3s" }}
            >
              No pierdas horas con el temario. Practica, detecta tus fallos y aprueba a la primera.
            </p>
            <div
              className="animate-fade-up relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              style={{ animationDelay: "0.5s" }}
            >
              <Button variant="outline" size="lg" asChild>
                <Link href="/demo">
                  Examen de prueba
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button size="lg" className="shadow-md" asChild>
                <Link href="/register">
                  Regístrate
                  <UserPlus className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border bg-muted/30 py-12">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid gap-4 sm:grid-cols-3">
              {features.map((feature, i) => (
                <AnimateOnScroll key={feature.title} delay={i * 0.12}>
                  <Card className="bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                          <feature.icon className="size-5 text-primary" />
                        </div>
                        <CardTitle className="text-base">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4">
            <AnimateOnScroll>
              <h2 className="text-center text-2xl font-bold text-foreground">
                Cómo funciona
              </h2>
            </AnimateOnScroll>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <AnimateOnScroll key={step.label} delay={index * 0.1}>
                  <div className="relative flex flex-col items-center text-center">
                    {index < steps.length - 1 && (
                      <div className="absolute left-[calc(50%+32px)] top-6 hidden h-px w-[calc(100%-64px)] border-t-2 border-dashed border-primary/20 lg:block" aria-hidden="true" />
                    )}
                    <div className="relative flex size-12 items-center justify-center rounded-full bg-primary/10">
                      <step.icon className="size-5 text-primary" />
                    </div>
                    <span className="mt-1 text-xs font-medium text-primary">
                      Paso {index + 1}
                    </span>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {step.label}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <AnimateOnScroll>
          <section className="border-t border-border bg-muted/30 py-12">
            <div className="mx-auto max-w-5xl px-4 text-center">
              <h2 className="text-2xl font-bold text-foreground">
                ¿Listo para empezar?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                Crea tu cuenta gratis y empieza a practicar con tests que simulan el examen real.
              </p>
              <Button size="lg" className="mt-6 shadow-md" asChild>
                <Link href="/register">
                  Crear cuenta gratis
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </section>
        </AnimateOnScroll>

        {/* Footer */}
        <AnimateOnScroll>
          <footer className="border-t border-border py-8">
            <div className="mx-auto max-w-5xl px-4 text-center">
              <p className="text-sm text-muted-foreground">
                Basado en el temario oficial de la DGT para el permiso de conducir B.
              </p>
            </div>
          </footer>
        </AnimateOnScroll>
      </main>
    </div>
  );
}
