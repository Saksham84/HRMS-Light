import { Card, CardContent } from "@/app/components/ui/card";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "primary" | "success" | "destructive";
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  color,
}: StatsCardProps) {
  const colorMap = {
    primary: {
      border: "border-indigo-200/60",
      bg: "bg-indigo-50/60",
      text: "text-indigo-600",
      ring: "hover:ring-indigo-300/60",
      gradient:
        "from-indigo-500/15 via-indigo-400/5 to-transparent",
    },
    success: {
      border: "border-green-200/60",
      bg: "bg-green-50/60",
      text: "text-green-600",
      ring: "hover:ring-green-300/60",
      gradient:
        "from-green-500/15 via-green-400/5 to-transparent",
    },
    destructive: {
      border: "border-red-200/60",
      bg: "bg-red-50/60",
      text: "text-red-600",
      ring: "hover:ring-red-300/60",
      gradient:
        "from-red-500/15 via-red-400/5 to-transparent",
    },
  };

  const c = colorMap[color];

  return (
    <Card
      className={clsx(
        "group relative overflow-hidden",
        "border transition-all duration-300",
        "shadow-sm hover:shadow-2xl",
        "hover:-translate-y-1",
        "ring-1 ring-transparent hover:ring-2",
        c.border,
        c.ring
      )}
    >
      {/* Always-visible subtle gradient */}
      <div
        className={clsx(
          "pointer-events-none absolute inset-0",
          "bg-gradient-to-br opacity-60",
          "transition-opacity duration-300",
          "group-hover:opacity-100",
          c.gradient
        )}
      />

      <CardContent className="relative p-6">
        <div className="flex items-center justify-between">
          {/* Text */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-3xl font-semibold text-foreground transition-transform duration-300 group-hover:scale-[1.04]">
              {value}
            </h3>
          </div>

          {/* Icon */}
          <div
            className={clsx(
              "p-3 rounded-2xl",
              "shadow-inner transition-all duration-300",
              "group-hover:scale-110 group-hover:rotate-6",
              c.bg,
              c.text
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
