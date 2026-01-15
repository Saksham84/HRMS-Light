"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Menu,
  Building2,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import clsx from "clsx";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    id: "employees",
    label: "Employees",
    href: "/employees",
    icon: Users,
  },
  {
    id: "departments",
    label: "Departments",
    href: "/departments",
    icon: Building2,
  },
  {
    id: "attendance",
    label: "Attendance",
    href: "/attendance",
    icon: Calendar,
  },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/employees":
        return "Employees";
      case "/departments":
        return "Departments";
      case "/attendance":
        return "Attendance";
      default:
        return "HRMS Lite";
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center px-4">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="ml-3 text-lg font-semibold">{getPageTitle()}</h1>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full w-64 flex flex-col",
          "bg-sidebar border-r border-sidebar-border z-50",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-0"
        )}
      >
        {/* Logo (clickable → dashboard) */}
        <Link
          href="/"
          className="h-16 flex items-center px-6 border-b border-sidebar-border group"
        >
          <div className="flex items-center space-x-3">
            <div className="relative w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image
                src="/favicon.ico"
                alt="HRMS Lite Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
              HRMS Lite
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={clsx(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg",
                  "transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-primary" />
                )}

                <Icon
                  className={clsx(
                    "h-5 w-5 transition-transform duration-200",
                    "group-hover:scale-110 group-hover:-translate-x-0.5"
                  )}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">Admin</p>
              <p className="text-xs text-muted-foreground truncate">
                admin@company.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
