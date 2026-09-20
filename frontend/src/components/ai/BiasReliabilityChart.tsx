"use client";

import React from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { ShieldCheck, Info } from 'lucide-react';

interface MediaPlot {
  name: string;
  x: number; // -100 (Left) to +100 (Right), 0 (Center)
  y: number; // 0 (Low) to 100 (Highest Factual)
  category: string;
}

const MEDIA_PLOTS: MediaPlot[] = [
  { name: 'Reuters', x: 0, y: 99, category: 'Wire' },
  { name: 'AP News', x: 0, y: 99, category: 'Wire' },
  { name: 'BBC World', x: -10, y: 98, category: 'Broadcaster' },
  { name: 'DW News', x: 0, y: 97, category: 'Broadcaster' },
  { name: 'Nature Journal', x: 0, y: 100, category: 'Science' },
  { name: 'MIT Tech Review', x: 0, y: 98, category: 'Tech' },
  { name: 'Financial Times', x: 5, y: 98, category: 'Business' },
  { name: 'Bloomberg', x: 5, y: 97, category: 'Business' },
  { name: 'NPR', x: -15, y: 96, category: 'Broadcaster' },
  { name: 'The Guardian', x: -25, y: 94, category: 'News' },
  { name: 'Al Jazeera', x: -5, y: 94, category: 'International' },
  { name: 'The Verge', x: -10, y: 93, category: 'Tech' },
  { name: 'TechCrunch', x: 0, y: 95, category: 'Tech' }
];

export const BiasReliabilityChart: React.FC = () => {
  return (
    <GlassCard glowColor="indigo" className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-heading">Global Media Bias & Reliability 2D Index</h3>
            <p className="text-xs text-slate-400">Mapping accredited publishers on Factual Rigor vs Editorial Stance</p>
          </div>
        </div>
      </div>

      {/* 2D Coordinate Scatter Plot Visualizer */}
      <div className="relative h-80 w-full rounded-2xl border border-white/10 bg-slate-950 p-6 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-px bg-white/10" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-px bg-white/10" />
        </div>

        {/* Quadrant Labels */}
        <div className="absolute top-3 left-4 text-[10px] font-mono text-indigo-400 uppercase font-bold">
          High Factual / Center-Left
        </div>
        <div className="absolute top-3 right-4 text-[10px] font-mono text-cyan-400 uppercase font-bold">
          High Factual / Center-Right
        </div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-400 uppercase font-bold bg-slate-900/80 px-2 py-0.5 rounded border border-emerald-500/30">
          Gold Standard (Reuters / AP / Nature)
        </div>

        {/* Media Nodes */}
        {MEDIA_PLOTS.map((plot) => {
          // Normalize X (-100 to 100) -> 10% to 90%
          const leftPct = 50 + (plot.x * 0.4);
          // Normalize Y (50 to 100) -> 80% to 15% (inverted)
          const topPct = 85 - ((plot.y - 85) * 4.5);

          return (
            <div
              key={plot.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${leftPct}%`, top: `${topPct}%` }}
            >
              <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 border border-white shadow-lg group-hover:scale-150 transition-transform" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-5 hidden group-hover:flex flex-col items-center bg-slate-900 border border-white/20 px-2.5 py-1 rounded-lg text-[10px] font-bold text-white whitespace-nowrap shadow-xl z-20">
                <span>{plot.name}</span>
                <span className="text-emerald-400 font-mono text-[9px]">Factual: {plot.y}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Info className="h-4 w-4 text-cyan-400 flex-shrink-0" />
        <span>GlobalPulse AI exclusively ingests from publications scoring &gt; 90% on empirical fact-checking benchmarks.</span>
      </div>
    </GlassCard>
  );
};
