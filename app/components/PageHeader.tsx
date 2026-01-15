import clsx from "clsx";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div
      className={clsx(
        "relative mb-8",
        "rounded-xl border",
        "bg-gradient-to-br from-background via-muted/40 to-background",
        "shadow-sm transition-all duration-300",
        "hover:shadow-md"
      )}
    >
      {/* Decorative accent bar */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />

      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Title + Description */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Action */}
        {action && (
          <div className="flex items-center gap-2">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
