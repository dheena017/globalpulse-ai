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
    <GlassCard glowColor="indigo" className="relative overflow-hidden p-4 sm:p-5 bg-white border border-slate-200/90 shadow-xs rounded-xl">
      {/* Ambient background glow */}
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-50/70 blur-2xl" />
      <div className="absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-sky-50/70 blur-2xl" />

      <div className="relative z-10">
        {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-600 text-white shadow-sm shadow-indigo-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">{briefing.title}</h2>
                <span className="rounded-full bg-sky-50 border border-sky-200 px-2 py-0.5 text-[9px] font-bold text-sky-700">
                  60-SEC DIGEST
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Autonomous synthesis across 25+ accredited news agencies</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/audio-briefing"
              className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-all shadow-xs"
            >
              <Headphones className="h-3.5 w-3.5 text-indigo-600" />
              <span>Voice Podcast</span>
            </Link>
          </div>
        </div>

        {/* Global Mood & Quote */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Geopolitical Mood</span>
            <p className="text-xs font-bold text-emerald-700 mt-0.5">{briefing.global_mood}</p>
          </div>
          <div className="md:col-span-2 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Executive Intelligence Takeaway</span>
            <p className="text-xs text-slate-700 mt-0.5 italic leading-relaxed">
              &ldquo;{briefing.executive_quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Key Developments Grid */}
        <div className="space-y-3">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">Top World Signals</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {briefing.top_developments.map((item, idx) => (
              <Link
                key={item.id || idx}
                href={`/article/${item.id}`}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 hover:border-indigo-300 hover:bg-slate-50/60 transition-all group shadow-xs"
              >
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-xs font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                    <span className="capitalize text-indigo-600 font-semibold">{item.category}</span>
                    <span>•</span>
                    <span>{item.source}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
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
