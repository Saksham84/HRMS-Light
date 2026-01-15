"use client";

import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { HRMSProvider } from "@/app/context/HRMSContext";
import { Toaster } from "@/app/components/ui/sonner";
import clsx from "clsx";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <HRMSProvider>
      <div className="relative flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* Main Content */}
        <main
          className={clsx(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
            "lg:ml-0",
            isSidebarOpen && "lg:blur-0 blur-sm"
          )}
        >
          {/* Top spacing for mobile header */}
          <div className="pt-16 lg:pt-0 min-h-full">
            <div
              className={clsx(
                "mx-auto max-w-7xl p-6 lg:p-8",
                "animate-in fade-in slide-in-from-bottom-2 duration-500"
              )}
            >
              {children}
            </div>
          </div>
        </main>

        {/* Overlay (extra polish for mobile) */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Global Toasts */}
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              "rounded-xl shadow-lg border border-border bg-background",
          }}
        />
      </div>
    </HRMSProvider>
  );
}
