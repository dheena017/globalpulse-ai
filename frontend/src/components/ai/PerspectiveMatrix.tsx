"use client";

import React from 'react';
import { Layers, CheckCircle2, SplitSquareVertical, Quote } from 'lucide-react';
import { PerspectiveComparison } from '@/lib/types';
import { GlassCard } from '@/ui/GlassCard';

interface PerspectiveMatrixProps {
  comparison: PerspectiveComparison;
}

export const PerspectiveMatrix: React.FC<PerspectiveMatrixProps> = ({ comparison }) => {
  return (
    <GlassCard glowColor="purple" className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
            <SplitSquareVertical className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-heading">Cross-Source Perspective Comparator</h3>
            <p className="text-xs text-slate-400">Comparing editorial framing across international bureaus</p>
          </div>
        </div>
      </div>

      {/* Consensus Facts vs Divergence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold">Unanimous Consensus Facts</span>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
            {comparison.consensus_facts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/30 p-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold">Divergent Editorial Angles</span>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
            {comparison.divergent_points.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Side by Side Perspectives */}
      <div className="space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">Outlet Framing Analysis</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comparison.perspectives.map((p, idx) => (
            <div key={idx} className="rounded-2xl border border-white/5 bg-slate-900/60 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-white">{p.source_name}</span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-indigo-300">{p.source_bias}</span>
                </div>

                <div className="mb-3">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Core Framing Angle</span>
                  <p className="text-xs text-slate-300 leading-relaxed mt-0.5">{p.framing_angle}</p>
                </div>
              </div>

              {p.quote_highlight && (
                <div className="rounded-xl border border-white/5 bg-slate-950/60 p-2.5 text-[11px] text-slate-400 italic">
                  <Quote className="h-3 w-3 text-cyan-400 mb-1 inline mr-1" />
                  &ldquo;{p.quote_highlight}&rdquo;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
