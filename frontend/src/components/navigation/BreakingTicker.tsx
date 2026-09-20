"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Radio, ChevronRight, Zap } from 'lucide-react';
import { apiClient } from '@/lib/api_client';
import { Article } from '@/lib/types';

export const BreakingTicker: React.FC = () => {
  const [breaking, setBreaking] = useState<Article[]>([]);

  useEffect(() => {
    apiClient.getBreakingNews(6).then(setBreaking);
  }, []);

  if (breaking.length === 0) return null;

  return (
    <div className="relative border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-2 text-xs">
        {/* Urgent Live Badge */}
        <div className="flex flex-shrink-0 items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 font-bold text-rose-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <span className="tracking-wider uppercase font-mono text-[10px]">BREAKING WIRE</span>
        </div>

        {/* Scrolling Headlines */}
        <div className="relative ml-4 flex-1 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap gap-12 text-slate-300">
            {breaking.concat(breaking).map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                href={`/article/${item.id}`}
                className="inline-flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <span className="font-semibold text-white/90">{item.source.name}:</span>
                <span>{item.title}</span>
                <span className="text-slate-500 font-mono text-[10px]">[{item.impact_level}]</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Fast Terminal Link */}
        <Link
          href="/live-wire"
          className="ml-3 hidden md:flex flex-shrink-0 items-center gap-1 font-mono text-[11px] text-cyan-400 hover:text-cyan-300"
        >
          <span>TERMINAL</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};
