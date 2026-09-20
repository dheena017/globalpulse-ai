"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Globe, Sparkles, ShieldCheck, Radio, Layers, Headphones, 
  CheckCircle, ArrowRight, Zap, Play, Compass, FileText, Cpu, Check, Activity 
} from 'lucide-react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { GlassCard } from '@/ui/GlassCard';

export default function LandingPage() {
  const pillars = [
    {
      icon: ShieldCheck,
      color: 'text-emerald-400',
      badge: 'Tier-1 Standards',
      title: 'Accredited Wire Ingestion Only',
      desc: 'Filtered strictly from Reuters, Associated Press, BBC World, Financial Times, Bloomberg, and Nature. Zero clickbait, zero unverified blogs.'
    },
    {
      icon: Sparkles,
      color: 'text-cyan-400',
      badge: '5-Tier Taxonomy',
      title: 'Defensible Fact-Checking Engine',
      desc: 'Discrete claim extraction cross-corroborated against primary wire consensus with transparent credibility ratings.'
    },
    {
      icon: Headphones,
      color: 'text-purple-400',
      badge: 'Synthesized Voice',
      title: 'Multi-Anchor Podcast Studio',
      desc: 'Listen to 3-minute executive briefings with selectable anchor personas for Geopolitics, AI & Tech, and Global Markets.'
    },
    {
      icon: Layers,
      color: 'text-indigo-400',
      badge: '360° Vision',
      title: 'Perspective Matrix & Blindspot Radar',
      desc: 'Compare side-by-side how international bureaus frame the same event and detect underreported regional blindspots.'
    },
    {
      icon: Radio,
      color: 'text-rose-400',
      badge: 'Sub-Second',
      title: 'Bloomberg-Style Live Wire',
      desc: 'High-speed terminal stream prioritizing urgent wire flashes, geopolitical alerts, and market-moving developments.'
    },
    {
      icon: FileText,
      color: 'text-amber-400',
      badge: 'One-Click Export',
      title: 'Executive Intelligence Dossiers',
      desc: 'Compile comprehensive intelligence briefs on any developing world crisis into downloadable PDF and Markdown reports.'
    }
  ];

  const metrics = [
    { number: '25+', label: 'Accredited Wire Sources' },
    { number: '5-Tier', label: 'Defensible Fact Taxonomy' },
    { number: '< 1s', label: 'Real-Time Wire Latency' },
    { number: '100%', label: 'Primary Corroborated' }
  ];

  return (
    <div className="space-y-10 sm:space-y-14 py-2 md:py-6">
      {/* 1. Hero Section */}
      <section className="relative text-center space-y-4 max-w-3xl mx-auto pt-2">
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-700 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
          <span>ENTERPRISE WORLD NEWS INTELLIGENCE PLATFORM</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-slate-900 tracking-tight leading-tight">
          The World&apos;s News. <br />
          <span className="text-gradient">Synthesized & Fact-Checked.</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
          Aggregating 25+ accredited Tier-1 wire bureaus with multi-dimensional AI verification, multi-anchor voice audio, and regional blindspot radar.
        </p>

        {/* Main Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/login"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/20 hover:opacity-95 hover:scale-[1.01] transition-all"
          >
            <span>Sign In & Launch Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/live-wire"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-indigo-600 hover:border-indigo-400 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Radio className="h-3.5 w-3.5 text-rose-500" />
            <span>Open Live Wire Terminal</span>
          </Link>
        </div>
      </section>

      {/* 2. Interactive Live Preview Card */}
      <section className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-md overflow-hidden glow-border-indigo">
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-50 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-sky-50 blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-200 pb-3.5 mb-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-ping" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600">Live AI Synthesis Preview</span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">Global Clean Energy Historic $2 Trillion Milestone</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                ✓ VERIFIED (99% Consensus)
              </span>
              <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700">
                Reuters Wire
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* AI 3-Bullet Summary */}
            <div className="md:col-span-2 space-y-2 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-600 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-indigo-600" />
                <span>Autonomous AI TL;DR Takeaways</span>
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Historic Deployment:</strong> IEA confirms record solar, wind, and modular nuclear installations surpassing $2T globally.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Industrial Impact:</strong> G20 manufacturing corridors report a 14% drop in fossil reliance over 12 months.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span><strong>Multi-Bureau Consensus:</strong> Corroborated unanimously by Reuters, AP, and Financial Times dispatches.</span>
                </li>
              </ul>
            </div>

            {/* Quick Action Preview */}
            <div className="space-y-3 flex flex-col justify-between bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3.5 border border-indigo-100">
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold uppercase text-purple-700 flex items-center gap-1.5">
                  <Headphones className="h-3 w-3 text-purple-600" />
                  <span>3-Anchor Audio Radio</span>
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">Elena Vance & Marcus Sterling break down the economic ramifications in 45 seconds.</p>
              </div>

              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 text-white py-2 px-3 text-xs font-bold hover:bg-indigo-700 transition-all text-center shadow-sm"
              >
                <span>Explore in Dashboard</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Metrics Banner */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
        {metrics.map((m, idx) => (
          <div key={idx} className="glass-panel rounded-xl p-3.5 sm:p-4 text-center bg-white border border-slate-200/80 shadow-sm">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 font-heading">
              {m.number}
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 font-mono uppercase font-bold">{m.label}</p>
          </div>
        ))}
      </section>

      {/* 4. Core Pillars Grid */}
      <section className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">Engineered for Factual Precision</h2>
          <p className="text-xs text-slate-600">Eliminating media echo chambers, sensationalism, and unverified rumors through algorithmic rigor.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, idx) => (
            <GlassCard key={idx} className="space-y-3 p-4 flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm hover:border-indigo-400 transition-all rounded-xl">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 border border-slate-200">
                    <p.icon className={`h-4 w-4 ${p.color}`} />
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link href="/dashboard" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                  <span>Open in Dashboard</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 5. Accredited Sources Bar */}
      <section className="rounded-2xl border border-slate-200/90 bg-white p-5 text-center max-w-4xl mx-auto shadow-sm">
        <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-3 font-bold">
          Accredited Wire Feeds Ingested in Real-Time
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-slate-700 font-heading">
          <span className="hover:text-indigo-600 transition-colors">Reuters Wire</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">Associated Press</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">BBC World</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">Financial Times</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">Nature Journal</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">CNA Asia-Pacific</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">MIT Tech Review</span>
        </div>
      </section>

      {/* 6. Bottom Call to Action */}
      <section className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 via-white to-purple-50 p-6 sm:p-8 text-center max-w-4xl mx-auto space-y-4 shadow-md">
        <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
          Experience 360° Verified World Intelligence
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Step inside the command center. Explore live breaking wires, 60s AI digests, and multi-anchor radio broadcasts.
        </p>
        <div className="pt-1">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/20 hover:opacity-95 hover:scale-105 transition-all"
          >
            <span>Launch Intelligence Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
