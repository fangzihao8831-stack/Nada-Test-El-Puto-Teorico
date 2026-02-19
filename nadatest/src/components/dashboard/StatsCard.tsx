import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("bg-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="text-muted-foreground" size={20} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-xs",
              trend.positive ? "text-success" : "text-destructive"
            )}
          >
            {trend.positive ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
