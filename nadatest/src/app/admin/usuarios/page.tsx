import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { createClient } from "@/lib/supabase/server";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function AdminUsuariosPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, nombre, email, ultimo_acceso, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  // Get test counts per user
  const userIds = (profiles ?? []).map((p) => p.id);
  let testCounts = new Map<string, number>();

  if (userIds.length > 0) {
    const { data: counts } = await supabase
      .from("tests_realizados")
      .select("usuario_id")
      .in("usuario_id", userIds);

    if (counts) {
      for (const row of counts) {
        testCounts.set(row.usuario_id, (testCounts.get(row.usuario_id) ?? 0) + 1);
      }
    }
  }

  const users = (profiles ?? []).map((p) => ({
    id: p.id,
    nombre: p.nombre ?? "Sin nombre",
    email: p.email,
    testsRealizados: testCounts.get(p.id) ?? 0,
    ultimoAcceso: formatDate(p.ultimo_acceso),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de usuarios"
        description="Administra las cuentas de usuario de la plataforma."
      />

      {users.length > 0 ? (
        <div className="space-y-2">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {user.nombre.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {user.nombre}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{user.testsRealizados} tests</span>
                  <span>{user.ultimoAcceso}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="Sin usuarios"
          description="No hay usuarios registrados en la plataforma."
        />
      )}
    </div>
  );
}
