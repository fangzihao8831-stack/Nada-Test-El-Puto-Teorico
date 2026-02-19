import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockUsers = [
  { id: "1", nombre: "María García", email: "maria@email.com", testsRealizados: 24, ultimoAcceso: "12/02/2026", activo: true },
  { id: "2", nombre: "Carlos López", email: "carlos@email.com", testsRealizados: 18, ultimoAcceso: "11/02/2026", activo: true },
  { id: "3", nombre: "Ana Martínez", email: "ana@email.com", testsRealizados: 42, ultimoAcceso: "10/02/2026", activo: true },
  { id: "4", nombre: "Pedro Sánchez", email: "pedro@email.com", testsRealizados: 5, ultimoAcceso: "01/01/2026", activo: false },
  { id: "5", nombre: "Laura Fernández", email: "laura@email.com", testsRealizados: 31, ultimoAcceso: "12/02/2026", activo: true },
];

export default function AdminUsuariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Gestión de usuarios
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Administra las cuentas de usuario de la plataforma.
        </p>
      </div>

      <div className="space-y-2">
        {mockUsers.map((user) => (
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
                <Badge
                  variant={user.activo ? "default" : "outline"}
                  className={user.activo ? "bg-success text-success-foreground hover:bg-success/80" : ""}
                >
                  {user.activo ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
