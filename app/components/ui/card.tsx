import * as React from "react";
import { cn } from "./utils";

/* ---------------- CARD ROOT ---------------- */

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "group relative flex flex-col gap-6 rounded-xl border",
        "bg-gradient-to-br from-background via-muted/30 to-background",
        "text-card-foreground",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "hover:border-primary/30",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- CARD HEADER ---------------- */

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min",
        "grid-rows-[auto_auto] items-start gap-1.5",
        "px-6 pt-6",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "border-b border-border/60",
        "bg-muted/20",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- CARD TITLE ---------------- */

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h4
      data-slot="card-title"
      className={cn(
        "text-base font-semibold tracking-tight",
        "text-foreground",
        "transition-colors duration-200",
        "group-hover:text-primary",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- CARD DESCRIPTION ---------------- */

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-sm leading-relaxed",
        "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- CARD ACTION ---------------- */

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1",
        "self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- CARD CONTENT ---------------- */

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-6 text-sm",
        "text-foreground/90",
        "[&:last-child]:pb-6",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- CARD FOOTER ---------------- */

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2",
        "px-6 pb-6",
        "border-t border-border/60",
        "bg-muted/10",
        className
      )}
      {...props}
    />
  );
}

/* ---------------- EXPORTS ---------------- */

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
