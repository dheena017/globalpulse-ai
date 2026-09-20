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
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden font-mono">
      {/* Terminal Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-50/90 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
            <Radio className="h-4 w-4" />
            <span>GLOBAL LIVE WIRE TERMINAL</span>
          </div>
          <span className="hidden sm:inline text-xs text-slate-300">|</span>
          <span className="text-xs text-slate-500 font-sans hidden sm:inline">Real-time unedited dispatches</span>
        </div>

        <div className="flex items-center gap-3 mt-2 sm:mt-0">
          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-slate-200 text-[11px]">
            {['all', 'critical', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterImpact(level)}
                className={`rounded-lg px-2.5 py-1 uppercase font-bold transition-all ${
                  filterImpact === level ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:text-indigo-600 shadow-xs"
            title={soundEnabled ? 'Mute Alert Sound' : 'Enable Alert Audio'}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-indigo-600" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
          </button>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs text-indigo-700 hover:bg-indigo-100 font-sans font-semibold"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Sync Feeds</span>
            </button>
          )}
        </div>
      </div>

      {/* Terminal Feed Stream List */}
      <div className="divide-y divide-slate-100 max-h-[700px] overflow-y-auto bg-white">
        {filtered.map((art) => (
          <div key={art.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-indigo-600 font-bold">[{art.published_at}]</span>
                <SourceTag source={art.source} />
                <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] uppercase text-slate-700 font-medium">
                  {art.category}
                </span>
                {art.impact_level === 'Critical' && (
                  <span className="rounded bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                    CRITICAL
                  </span>
                )}
              </div>

              <Link
                href={`/article/${art.id}`}
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-sans font-medium"
              >
                <span>Examine</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <Link href={`/article/${art.id}`}>
              <h4 className="text-sm font-bold text-slate-900 font-sans hover:text-indigo-600 transition-colors mb-1">
                {art.title}
              </h4>
            </Link>

            <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-2">
              {art.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
