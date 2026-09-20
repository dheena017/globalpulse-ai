"use client";

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api_client';
import { SourceInfo } from '@/lib/types';
import { ShieldCheck, ExternalLink, Activity, Search } from 'lucide-react';
import { GlassCard } from '@/ui/GlassCard';

export default function NewsSourcesPage() {
  const [sources, setSources] = useState<SourceInfo[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    apiClient.getSources().then(setSources);
  }, []);

  const filtered = sources.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase()) ||
    s.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">Global News Sources & Transparency Index</h1>
          <p className="text-xs text-slate-400 mt-1">Directory of 25+ accredited Tier-1 news organizations with real-time feed latencies</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter sources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-900/80 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <GlassCard key={s.id} className="p-6 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  Trust Score: {s.trust_score}%
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-400">
                  <Activity className="h-3 w-3" />
                  <span>{s.latency_ms}ms</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-heading">{s.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{s.country} • {s.bias}</p>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] uppercase font-mono">{s.category}</span>
                <span className="text-slate-500">•</span>
                <span className="text-[11px] font-mono text-slate-400">{s.article_count} active feeds</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Active</span>
              </span>

              <a
                href={s.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>Visit Outlet</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
