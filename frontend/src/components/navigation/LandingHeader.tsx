"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, ArrowRight, ShieldCheck, Sparkles, Radio, Menu, X, Compass } from 'lucide-react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

export const LandingHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-2xl shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-purple-600 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Globe className="h-4.5 w-4.5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight font-heading text-slate-900">
              GlobalPulse<span className="text-indigo-600">.AI</span>
            </span>
            <span className="hidden sm:block text-[8.5px] font-mono tracking-wider text-slate-400 uppercase -mt-0.5">
              Tier-1 Verified World Intelligence
            </span>
          </div>
        </Link>

        {/* Marketing Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/live-wire"
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
          >
            <Radio className="h-3.5 w-3.5 text-rose-500" />
            <span>Live Wire</span>
          </Link>

          <Link
            href="/fact-checker"
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Fact-Check Engine</span>
          </Link>

          <Link
            href="/news-sources"
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
          >
            <span>Accredited Bureaus</span>
          </Link>

          <Link
            href="/methodology"
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
          >
            <span>Methodology</span>
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="hidden sm:inline-flex text-xs font-bold text-slate-700 hover:text-indigo-600 px-3 py-1.5 transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:opacity-95 hover:scale-[1.02] transition-all"
          >
            <span>Launch Platform</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 text-xs font-semibold">
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-700 hover:text-indigo-600"
          >
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>Launch Dashboard</span>
          </Link>

          <Link
            href="/live-wire"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-700 hover:text-indigo-600"
          >
            <Radio className="h-4 w-4 text-rose-500" />
            <span>Live Wire Terminal</span>
          </Link>

          <Link
            href="/fact-checker"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-700 hover:text-indigo-600"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Fact-Check Engine</span>
          </Link>

          <Link
            href="/news-sources"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-700 hover:text-indigo-600"
          >
            <span>Accredited Bureaus</span>
          </Link>

          <Link
            href="/methodology"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-slate-700 hover:text-indigo-600"
          >
            <span>Methodology</span>
          </Link>
        </div>
      )}
    </header>
  );
};
