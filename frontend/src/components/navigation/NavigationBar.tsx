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
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 22) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

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

  // Format breadcrumb title from pathname
  const getPageTitle = (path: string) => {
    if (path === '/' || path === '/landing') return 'Overview';
    if (path.startsWith('/dashboard')) return 'Command Center';
    if (path.startsWith('/live-wire')) return 'Live Wire Terminal';
    if (path.startsWith('/story-timeline')) return 'Story Evolution';
    if (path.startsWith('/ai-insights')) return 'Perspective Matrix';
    if (path.startsWith('/audio-briefing')) return 'Audio Podcast Studio';
    if (path.startsWith('/fact-checker')) return 'Claim Verifier Hub';
    if (path.startsWith('/world-regions')) return 'Geopolitical Map';
    if (path.startsWith('/topic-radar')) return 'Topic Entity Radar';
    if (path.startsWith('/dossier-builder')) return 'Executive Dossier';
    if (path.startsWith('/media-index')) return 'Media Reliability Index';
    if (path.startsWith('/news-sources')) return 'Accredited Bureaus';
    if (path.startsWith('/saved-articles')) return 'Saved Bookmarks';
    if (path.startsWith('/settings')) return 'Preferences';
    if (path.startsWith('/article/')) return 'Intelligence Reader';
    return 'World Intelligence';
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-xs">
        <div className="w-full flex items-center justify-between px-3 py-1.5 sm:px-5">
          {/* Left: Sidebar Toggle + Brand + Current View Breadcrumb */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors shadow-xs"
                title="Toggle Workspace Sidebar (⌘B)"
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
              <span className="text-sm font-black tracking-tight font-heading text-slate-900 hidden sm:inline">
                GlobalPulse<span className="text-indigo-600">.AI</span>
              </span>
            </Link>

            {/* Breadcrumb Separator */}
            <span className="text-slate-300 hidden sm:inline">/</span>

            {/* Current Active Workspace Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 text-[11px] font-bold text-indigo-700">
                {getPageTitle(pathname)}
              </span>
            </div>
          </div>

          {/* Center / Right: Global Search, Live Wire Ticker & Telemetry, User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Wire Telemetry Pill */}
            <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-700 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>25+ WIRES LIVE</span>
            </div>

            {/* UTC Clock */}
            {utcTime && (
              <div className="hidden md:flex items-center gap-1 font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                <Clock className="h-3 w-3 text-slate-400" />
                <span>{utcTime}</span>
              </div>
            )}

            {/* Global Search / Ask AI Input Bar */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-100/90 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-indigo-400 hover:bg-white transition-all shadow-xs"
            >
              <Search className="h-3.5 w-3.5 text-indigo-600" />
              <span className="hidden sm:inline text-xs text-slate-500">Ask AI / Search News...</span>
              <kbd className="hidden md:inline-block rounded bg-white px-1 py-0.2 font-mono text-[9px] text-slate-400 border border-slate-200 shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* User Profile Avatar / Sign In */}
            <UserMenuDropdown />
          </div>
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
