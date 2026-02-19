import {
  FileText,
  Users,
  BookOpen,
  ClipboardList,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

const quickLinks = [
  {
    href: "/admin/preguntas",
    title: "Preguntas",
    description: "Gestionar el banco de preguntas",
    icon: FileText,
  },
  {
    href: "/admin/tests",
    title: "Tests",
    description: "Gestionar tests predefinidos",
    icon: ClipboardList,
  },
  {
    href: "/admin/materiales",
    title: "Materiales",
    description: "Gestionar materiales de estudio",
    icon: BookOpen,
  },
  {
    href: "/admin/usuarios",
    title: "Usuarios",
    description: "Gestionar cuentas de usuario",
    icon: Users,
  },
];

export default async function AdminPage() {
  const supabase = await createClient();

  const [
    { count: totalPreguntas },
    { count: totalTests },
    { count: totalUsuarios },
    { count: preguntasValidadas },
  ] = await Promise.all([
    supabase.from("preguntas").select("*", { count: "exact", head: true }),
    supabase.from("tests").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("preguntas").select("*", { count: "exact", head: true }).eq("validada", true),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Panel de administracion"
        description="Resumen general de la plataforma."
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatsCard title="Total preguntas" value={totalPreguntas ?? 0} icon={FileText} />
        <StatsCard title="Total tests" value={totalTests ?? 0} icon={ClipboardList} />
        <StatsCard title="Total usuarios" value={totalUsuarios ?? 0} icon={Users} />
        <StatsCard title="Preguntas validadas" value={preguntasValidadas ?? 0} icon={CheckCircle2} />
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">
          Accesos rapidos
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <link.icon className="size-4 text-primary" />
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-sm">{link.title}</CardTitle>
                  <CardDescription className="mt-1 text-xs">
                    {link.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
