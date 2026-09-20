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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Load saved sidebar state on mount
  React.useEffect(() => {
    try {
      const savedOpen = localStorage.getItem('globalpulse_sidebar_open');
      if (savedOpen !== null) setSidebarOpen(savedOpen === 'true');
      const savedCollapsed = localStorage.getItem('globalpulse_sidebar_collapsed');
      if (savedCollapsed !== null) setSidebarCollapsed(savedCollapsed === 'true');
    } catch {}
  }, []);

  // Close mobile drawer on route change
  React.useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  // Global Keyboard Shortcut: Cmd+B / Ctrl+B to toggle sidebar open/close
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMobileDrawerOpen((prev) => !prev);
    } else {
      setSidebarOpen((prev) => {
        const next = !prev;
        try { localStorage.setItem('globalpulse_sidebar_open', String(next)); } catch {}
        return next;
      });
    }
  };

  const toggleCollapse = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try { localStorage.setItem('globalpulse_sidebar_collapsed', String(next)); } catch {}
      return next;
    });
  };

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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <NavigationBar onToggleSidebar={toggleSidebar} />
      <BreakingTicker />

      <div className="flex w-full flex-1 relative overflow-hidden">
        {/* Desktop Sticky Animated Sidebar */}
        <div
          className={`hidden md:block sticky top-[45px] h-[calc(100vh-45px)] z-30 transition-all duration-300 ease-in-out ${
            !sidebarOpen
              ? 'w-0 opacity-0 -translate-x-full overflow-hidden border-none pointer-events-none'
              : sidebarCollapsed
              ? 'w-16 opacity-100 translate-x-0'
              : 'w-60 opacity-100 translate-x-0'
          }`}
        >
          {sidebarOpen && (
            <Sidebar
              collapsed={sidebarCollapsed}
              onToggle={toggleCollapse}
              onClose={() => {
                setSidebarOpen(false);
                try { localStorage.setItem('globalpulse_sidebar_open', 'false'); } catch {}
              }}
            />
          )}
        </div>

        {/* Mobile Slide-over Drawer & Overlay */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
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
        <main className="flex-1 min-w-0 px-3 py-4 sm:px-5 lg:px-6 max-w-[1600px] mx-auto transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

