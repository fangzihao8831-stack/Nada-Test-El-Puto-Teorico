import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  label: string;
  value: number;
  max?: number;
  showPercentage?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "",
  success: "[&>[data-slot=progress-indicator]]:bg-success",
  warning: "[&>[data-slot=progress-indicator]]:bg-warning",
  danger: "[&>[data-slot=progress-indicator]]:bg-destructive",
};

export function ProgressBar({
  label,
  value,
  max = 100,
  showPercentage = true,
  variant = "default",
  className,
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">{label}</span>
        {showPercentage && (
          <span className="text-sm text-muted-foreground">{percentage}%</span>
        )}
      </div>
      <Progress
        value={percentage}
        className={cn(variantStyles[variant])}
      />
    </div>
  );
}
