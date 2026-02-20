import Link from "next/link";
import { FileText, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import type { RecentTest } from "@/types/test";

interface RecentTestsListProps {
  tests: RecentTest[];
}

export function RecentTestsList({ tests }: RecentTestsListProps) {
  if (tests.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Sin tests realizados"
        description="Realiza tu primer test para ver tus resultados aquí."
      />
    );
  }

  return (
    <div className="space-y-2">
      {tests.map((test) => (
        <Link key={test.id} href={`/test/resultado?id=${test.id}`}>
          <Card className="transition-colors hover:bg-muted/50">
            <CardContent className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {test.name}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    {test.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">
                  {test.score}/{test.total}
                </span>
                <Badge
                  variant={test.passed ? "default" : "destructive"}
                  className={test.passed ? "bg-success text-success-foreground hover:bg-success/80" : ""}
                >
                  {test.passed ? "Aprobado" : "Suspendido"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
