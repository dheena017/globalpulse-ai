"use client";

import React from 'react';
import { Globe, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { RegionInfo } from '@/lib/types';
import { GlassCard } from '@/ui/GlassCard';

interface GlobalSentimentMapProps {
  regions: RegionInfo[];
}

export const GlobalSentimentMap: React.FC<GlobalSentimentMapProps> = ({ regions }) => {
  return (
    <GlassCard glowColor="cyan" className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-heading">Global Geopolitical Mood & Sentiment Radar</h3>
            <p className="text-xs text-slate-400">Real-time tone & optimism barometer across world continents</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {regions.map((reg) => (
          <div
            key={reg.code}
            className="rounded-2xl border border-white/5 bg-slate-900/50 p-4 transition-all hover:border-cyan-500/30 hover:bg-slate-900/80"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{reg.flag}</span>
                <span className="text-sm font-bold text-white">{reg.name}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">({reg.article_count} feeds)</span>
            </div>

            <p className="text-xs font-semibold text-emerald-400 mb-1">{reg.sentiment_summary}</p>
            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{reg.description}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
