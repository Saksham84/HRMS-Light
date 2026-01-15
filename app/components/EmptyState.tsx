import { LucideIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import clsx from "clsx";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center text-center",
        "py-14 px-6",
        "rounded-2xl border border-dashed border-border",
        "bg-gradient-to-b from-muted/30 to-background",
        "animate-in fade-in slide-in-from-bottom-3 duration-500"
      )}
    >
      {/* Icon */}
      <div
        className={clsx(
          "mb-5 flex items-center justify-center",
          "w-20 h-20 rounded-full",
          "bg-muted/60",
          "transition-transform duration-300",
          "hover:scale-110"
        )}
      >
        <Icon className="h-9 w-9 text-muted-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="max-w-md text-sm text-muted-foreground mb-6">
        {description}
      </p>

      {/* Action */}
      {action && (
        <Button
          onClick={action.onClick}
          className="px-6 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
