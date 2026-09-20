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
    <div className="relative border-b border-slate-200/90 bg-slate-100/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center px-3 py-1 text-xs">
        {/* Urgent Live Badge */}
        <div className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-rose-300 bg-rose-50 px-2 py-0.5 font-bold text-rose-700 shadow-xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
          </span>
          <span className="tracking-wider uppercase font-mono text-[9px]">BREAKING WIRE</span>
        </div>

        {/* Scrolling Headlines */}
        <div className="relative ml-4 flex-1 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap gap-12 text-slate-700">
            {breaking.concat(breaking).map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                href={`/article/${item.id}`}
                className="inline-flex items-center gap-2 hover:text-indigo-600 transition-colors"
              >
                <span className="font-bold text-slate-900">{item.source.name}:</span>
                <span>{item.title}</span>
                <span className="text-slate-500 font-mono text-[10px]">[{item.impact_level}]</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Fast Terminal Link */}
        <Link
          href="/live-wire"
          className="ml-3 hidden md:flex flex-shrink-0 items-center gap-1 font-mono text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
        >
          <span>TERMINAL</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};
