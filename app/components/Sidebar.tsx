"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Calendar, Menu } from "lucide-react";
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
      case "/attendance":
        return "Attendance";
      default:
        return "HRMS Lite";
    }
  };

  return (
    <>
      {/* Mobile Menu Button / Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-50 flex items-center px-4">
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="ml-3 text-lg font-semibold text-foreground">
          {getPageTitle()}
        </h1>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border z-50",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-0",
          "w-64 flex flex-col"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 relative">
              <Image
                src="/favicon.ico"
                alt="HRMS Lite Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">
              HRMS Lite
            </span>
          </div>
        </div>

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
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                className={clsx(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg",
                  "transition-colors duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">
                AD
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground">
                Admin
              </p>
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
