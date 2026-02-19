"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle, MinusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@supabase/supabase-js";
import type { ConsultaDGTRecord } from "@/types/dgt";

function resultIcon(resultado: string | null) {
  switch (resultado) {
    case "APTO":
      return <CheckCircle className="size-4 text-success" />;
    case "NO APTO":
      return <XCircle className="size-4 text-destructive" />;
    case "NO PRESENTADO":
      return <MinusCircle className="size-4 text-muted-foreground" />;
    default:
      return <Clock className="size-4 text-muted-foreground" />;
  }
}

function resultBadge(resultado: string | null) {
  switch (resultado) {
    case "APTO":
      return (
        <Badge className="bg-success text-white hover:bg-success/90">
          APTO
        </Badge>
      );
    case "NO APTO":
      return <Badge variant="destructive">NO APTO</Badge>;
    case "NO PRESENTADO":
      return <Badge variant="secondary">NO PRESENTADO</Badge>;
    default:
      return <Badge variant="outline">Sin resultado</Badge>;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function HistorialNotas() {
  const [records, setRecords] = useState<ConsultaDGTRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) {
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient(url, key);
        const { data } = await supabase
          .from("consultas_dgt")
          .select("*")
          .order("consulted_at", { ascending: false })
          .limit(10);

        if (data) {
          setRecords(data as ConsultaDGTRecord[]);
        }
      } catch {
        // Supabase not available
      }
      setLoading(false);
    }

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historial de consultas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (records.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Historial de consultas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Aún no has realizado ninguna consulta.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de consultas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {records.map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div className="flex items-center gap-3">
              {resultIcon(record.resultado)}
              <div>
                <p className="text-sm font-medium">
                  Permiso {record.clase_permiso}
                </p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  Examen: {formatDate(record.fecha_examen)}
                </p>
              </div>
            </div>
            {resultBadge(record.resultado)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
