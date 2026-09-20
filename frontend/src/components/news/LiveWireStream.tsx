"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Radio, RefreshCw, Volume2, VolumeX, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { Article } from '@/lib/types';
import { SourceTag } from './SourceTag';

interface LiveWireStreamProps {
  articles: Article[];
  onRefresh?: () => void;
}

export const LiveWireStream: React.FC<LiveWireStreamProps> = ({ articles, onRefresh }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [filterImpact, setFilterImpact] = useState<string>('all');

  const filtered = filterImpact === 'all'
    ? articles
    : articles.filter(a => a.impact_level.toLowerCase() === filterImpact.toLowerCase());

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-2xl overflow-hidden font-mono">
      {/* Terminal Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-slate-900/90 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
            <Radio className="h-4 w-4" />
            <span>GLOBAL LIVE WIRE TERMINAL</span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-500">|</span>
          <span className="text-xs text-slate-400 font-sans hidden sm:inline">Real-time unedited dispatches</span>
        </div>

        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-950 rounded-xl p-1 border border-white/10 text-[11px]">
            {['all', 'critical', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterImpact(level)}
                className={`rounded-lg px-2.5 py-1 uppercase font-bold transition-all ${
                  filterImpact === level ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="rounded-xl border border-white/10 bg-slate-800/80 p-2 text-slate-300 hover:text-white"
            title={soundEnabled ? 'Mute Alert Sound' : 'Enable Alert Audio'}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
          </button>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-600/20 px-3 py-1.5 text-xs text-cyan-300 hover:bg-indigo-600/30"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Sync Feeds</span>
            </button>
          )}
        </div>
      </div>

      {/* Terminal Feed Stream List */}
      <div className="divide-y divide-white/5 max-h-[700px] overflow-y-auto">
        {filtered.map((art) => (
          <div key={art.id} className="p-4 sm:p-5 hover:bg-slate-900/60 transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-cyan-400 font-bold">[{art.published_at}]</span>
                <SourceTag source={art.source} />
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] uppercase text-slate-300">
                  {art.category}
                </span>
                {art.impact_level === 'Critical' && (
                  <span className="rounded bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 text-[10px] font-bold text-rose-400">
                    CRITICAL
                  </span>
                )}
              </div>

              <Link
                href={`/article/${art.id}`}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-sans"
              >
                <span>Examine</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <Link href={`/article/${art.id}`}>
              <h4 className="text-sm font-bold text-white font-sans hover:text-cyan-300 transition-colors mb-1">
                {art.title}
              </h4>
            </Link>

            <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2">
              {art.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
