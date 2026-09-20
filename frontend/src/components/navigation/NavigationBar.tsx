"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Search, Radio, Sparkles, BookOpen, ShieldCheck, Compass, Layers, Menu, Moon, Sun, Headphones, PanelLeft } from 'lucide-react';
import { UserMenuDropdown } from '@/components/auth/UserMenuDropdown';
import { CommandPalette } from './CommandPalette';
import { MobileMenu } from './MobileMenu';

interface NavigationBarProps {
  onToggleSidebar?: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ onToggleSidebar }) => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Globe },
    { name: 'Dashboard', href: '/dashboard', icon: Sparkles },
    { name: 'Live Wire', href: '/live-wire', icon: Radio },
    { name: 'Story Timeline', href: '/story-timeline', icon: Layers },
    { name: 'AI Insights', href: '/ai-insights', icon: Compass },
    { name: 'Audio News', href: '/audio-briefing', icon: Headphones },
    { name: 'Fact-Check', href: '/fact-checker', icon: ShieldCheck },
    { name: 'Sources', href: '/news-sources', icon: BookOpen },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/90 backdrop-blur-2xl shadow-xs">
        <div className="w-full flex items-center justify-between px-3 py-1.5 sm:px-5">
          {/* Logo & Sidebar Toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors shadow-xs"
                title="Toggle Sidebar (⌘B)"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            )}

            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 via-cyan-500 to-purple-600 shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Globe className="h-4 w-4 text-white" />
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                </span>
              </div>
              <div>
                <span className="text-base font-black tracking-tight font-heading text-slate-900">GlobalPulse<span className="text-indigo-600">.AI</span></span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-0.5 ml-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <link.icon className={`h-3 w-3 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Tools & User Profile */}
          <div className="flex items-center gap-2">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-100/90 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-indigo-400 hover:bg-white transition-all shadow-xs"
            >
              <Search className="h-3 w-3 text-indigo-600" />
              <span className="hidden sm:inline text-xs">Search / Ask AI...</span>
              <kbd className="hidden md:inline-block rounded bg-white px-1 py-0.5 font-mono text-[9px] text-slate-500 border border-slate-200 shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* User Profile Avatar / Sign In */}
            <UserMenuDropdown />

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden rounded-lg border border-slate-200 bg-slate-100 p-1.5 text-slate-700 hover:bg-slate-200"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Global Modals */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navLinks={navLinks} />
    </>
  );
};
