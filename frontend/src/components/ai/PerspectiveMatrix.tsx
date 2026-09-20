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
    <GlassCard glowColor="purple" className="space-y-6 bg-white border border-slate-200/90 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 border border-purple-200 text-purple-600">
            <SplitSquareVertical className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Cross-Source Perspective Comparator</h3>
            <p className="text-xs text-slate-500">Comparing editorial framing across international bureaus</p>
          </div>
        </div>
      </div>

      {/* Consensus Facts vs Divergence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold">Unanimous Consensus Facts</span>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
            {comparison.consensus_facts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-800 font-bold">Divergent Editorial Angles</span>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
            {comparison.divergent_points.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Side by Side Perspectives */}
      <div className="space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">Outlet Framing Analysis</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comparison.perspectives.map((p, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 flex flex-col justify-between hover:bg-white hover:border-slate-300 transition-all shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-900">{p.source_name}</span>
                  <span className="rounded bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-mono text-indigo-700 font-semibold">{p.source_bias}</span>
                </div>

                <div className="mb-3">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Core Framing Angle</span>
                  <p className="text-xs text-slate-700 leading-relaxed mt-0.5">{p.framing_angle}</p>
                </div>
              </div>

              {p.quote_highlight && (
                <div className="rounded-xl border border-slate-200 bg-white p-2.5 text-[11px] text-slate-600 italic">
                  <Quote className="h-3 w-3 text-indigo-600 mb-1 inline mr-1" />
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
