"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, Headphones, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { DailyBriefing } from '@/lib/types';
import { GlassCard } from '@/ui/GlassCard';

interface DailyExecutiveDigestProps {
  briefing: DailyBriefing;
}

export const DailyExecutiveDigest: React.FC<DailyExecutiveDigestProps> = ({ briefing }) => {
  return (
    <GlassCard glowColor="indigo" className="relative overflow-hidden p-6 sm:p-8">
      {/* Ambient background glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-cyan-600/15 blur-3xl" />

      <div className="relative z-10">
        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white font-heading">{briefing.title}</h2>
                <span className="rounded-full bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                  60-SEC DIGEST
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Autonomous synthesis across 25+ accredited news agencies</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/audio-briefing"
              className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-600/20 px-4 py-2 text-xs font-bold text-cyan-300 hover:bg-indigo-600/30 transition-all shadow-sm"
            >
              <Headphones className="h-4 w-4 text-cyan-400" />
              <span>Listen to Voice Podcast</span>
            </Link>
          </div>
        </div>

        {/* Global Mood & Quote */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Geopolitical Mood</span>
            <p className="text-sm font-bold text-emerald-400 mt-1">{briefing.global_mood}</p>
          </div>
          <div className="md:col-span-2 rounded-2xl border border-white/5 bg-slate-900/60 p-4">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Executive Intelligence Takeaway</span>
            <p className="text-xs text-slate-300 mt-1 italic leading-relaxed">
              &ldquo;{briefing.executive_quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Key Developments Grid */}
        <div className="space-y-3">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Top World Signals</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {briefing.top_developments.map((item, idx) => (
              <Link
                key={item.id || idx}
                href={`/article/${item.id}`}
                className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-900/40 p-3.5 hover:border-indigo-500/30 hover:bg-slate-900/80 transition-all group"
              >
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 text-xs font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                    <span className="capitalize text-indigo-300 font-semibold">{item.category}</span>
                    <span>•</span>
                    <span>{item.source}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                    {item.takeaway}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
