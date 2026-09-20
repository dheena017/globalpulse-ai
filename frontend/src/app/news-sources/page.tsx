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
      <div className="border-b border-slate-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-heading">Global News Sources & Transparency Index</h1>
          <p className="text-xs text-slate-500 mt-1">Directory of 25+ accredited Tier-1 news organizations with real-time feed latencies</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter sources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none shadow-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <GlassCard key={s.id} className="p-6 space-y-4 flex flex-col justify-between bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-indigo-300">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                  Trust Score: {s.trust_score}%
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-indigo-600 font-bold">
                  <Activity className="h-3 w-3" />
                  <span>{s.latency_ms}ms</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-heading">{s.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{s.country} • {s.bias}</p>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] uppercase font-mono font-medium">{s.category}</span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] font-mono text-slate-500">{s.article_count} active feeds</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-mono text-[11px] flex items-center gap-1 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Active</span>
              </span>

              <a
                href={s.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
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
