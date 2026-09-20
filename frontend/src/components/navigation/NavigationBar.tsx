"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Search, Radio, Sparkles, BookOpen, ShieldCheck, Compass, Layers, Menu, Moon, Sun, Headphones } from 'lucide-react';
import { UserMenuDropdown } from '@/components/auth/UserMenuDropdown';
import { CommandPalette } from './CommandPalette';
import { MobileMenu } from './MobileMenu';

export const NavigationBar: React.FC = () => {
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
    { name: 'Live Feed', href: '/', icon: Globe },
    { name: 'Live Wire', href: '/live-wire', icon: Radio },
    { name: 'Story Timeline', href: '/story-timeline', icon: Layers },
    { name: 'AI Insights', href: '/ai-insights', icon: Sparkles },
    { name: 'Audio News', href: '/audio-briefing', icon: Headphones },
    { name: 'Fact-Check', href: '/fact-checker', icon: ShieldCheck },
    { name: 'World', href: '/world-regions', icon: Compass },
    { name: 'Sources', href: '/news-sources', icon: BookOpen },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-purple-600 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Globe className="h-5 w-5 text-white" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                </span>
              </div>
              <div>
                <span className="text-lg font-black tracking-tight font-heading text-white">GlobalPulse<span className="text-cyan-400">.AI</span></span>
                <span className="hidden sm:block text-[9px] font-mono tracking-wider text-slate-400 uppercase">Tier-1 Verified World Intelligence</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600/20 text-cyan-300 border border-indigo-500/30'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <link.icon className={`h-3.5 w-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Tools & User Profile */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all shadow-inner"
            >
              <Search className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Search / Ask AI...</span>
              <kbd className="hidden md:inline-block rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400 border border-white/5">
                ⌘K
              </kbd>
            </button>

            {/* User Profile Avatar / Sign In */}
            <UserMenuDropdown />

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden rounded-xl border border-white/10 bg-slate-900/80 p-2 text-slate-300 hover:text-white"
            >
              <Menu className="h-5 w-5" />
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
