"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { NavigationBar } from '@/components/navigation/NavigationBar';
import { LandingHeader } from '@/components/navigation/LandingHeader';
import { BreakingTicker } from '@/components/navigation/BreakingTicker';
import { Footer } from '@/components/navigation/Footer';
import { Sidebar } from '@/components/navigation/Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isLandingPage = pathname === '/' || pathname === '/landing';

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
        <div>
          <LandingHeader />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <div>
        <NavigationBar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <BreakingTicker />

        <div className="flex w-full">
          {/* Collapsible Left Sidebar (Hidden on small mobile screens) */}
          <div className="hidden md:block">
            <Sidebar
              collapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 px-3 py-4 sm:px-5 lg:px-6 max-w-[1600px] mx-auto">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

