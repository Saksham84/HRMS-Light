"use client";

import { useState } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { HRMSProvider } from "@/app/context/HRMSContext";
import { Toaster } from "@/app/components/ui/sonner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <HRMSProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="pt-16 lg:pt-0">
            <div className="mx-auto max-w-7xl p-6 lg:p-8">
              {children}
            </div>
          </div>
        </main>

        {/* Global Toasts */}
        <Toaster />
      </div>
    </HRMSProvider>
  );
}
