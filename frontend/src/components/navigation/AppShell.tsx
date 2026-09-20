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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Close mobile drawer on route change
  React.useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  // Global Keyboard Shortcut: Cmd+B / Ctrl+B to toggle sidebar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleToggle = () => {
    // If on small screen, toggle mobile drawer, else toggle desktop collapse
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileDrawerOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <NavigationBar onToggleSidebar={handleToggle} />
      <BreakingTicker />

      <div className="flex w-full flex-1 relative">
        {/* Desktop Sticky Sidebar */}
        <div className="hidden md:block sticky top-[45px] h-[calc(100vh-45px)] z-30">
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Mobile Slide-over Drawer & Overlay */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileDrawerOpen(false)}
            />

            {/* Slide-over Drawer */}
            <div className="relative z-10 h-full w-64 bg-white shadow-2xl animate-in slide-in-from-left duration-200">
              <Sidebar
                collapsed={false}
                onToggle={() => setMobileDrawerOpen(false)}
                onClose={() => setMobileDrawerOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 px-3 py-4 sm:px-5 lg:px-6 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

