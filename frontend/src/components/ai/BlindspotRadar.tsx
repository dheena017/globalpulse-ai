"use client";

import React from 'react';
import { Compass, AlertTriangle, EyeOff, CheckCircle, Info } from 'lucide-react';
import { BlindspotData } from '@/lib/types';
import { GlassCard } from '@/ui/GlassCard';

interface BlindspotRadarProps {
  blindspot: BlindspotData;
}

export const BlindspotRadar: React.FC<BlindspotRadarProps> = ({ blindspot }) => {
  return (
    <GlassCard glowColor="indigo" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
          <EyeOff className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white font-heading">Media Blindspot & Echo-Chamber Detector</h3>
          <p className="text-xs text-slate-400">Balancing coverage imbalances across regional publishers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* High Coverage */}
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/30 p-4">
          <span className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider font-bold">Heavily Covered By</span>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
            {blindspot.heavily_covered_by.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Underreported */}
        <div className="rounded-2xl border border-rose-500/20 bg-rose-950/30 p-4">
          <span className="text-[11px] font-mono text-rose-300 uppercase tracking-wider font-bold">Underreported By</span>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
            {blindspot.underreported_by.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Missing Context & Recommendation */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
          <Info className="h-4 w-4" />
          <span>Critical Unrepresented Context:</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{blindspot.missing_context}</p>
        <div className="border-t border-white/5 pt-2 text-[11px] text-slate-400">
          <strong className="text-slate-300">AI Recommendation:</strong> {blindspot.recommendation}
        </div>
      </div>
    </GlassCard>
  );
};
