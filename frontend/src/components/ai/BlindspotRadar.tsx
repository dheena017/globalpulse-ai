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
    <GlassCard glowColor="indigo" className="space-y-6 bg-white border border-slate-200/90 shadow-md">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
          <EyeOff className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 font-heading">Media Blindspot & Echo-Chamber Detector</h3>
          <p className="text-xs text-slate-500">Balancing coverage imbalances across regional publishers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* High Coverage */}
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4">
          <span className="text-[11px] font-mono text-indigo-800 uppercase tracking-wider font-bold">Heavily Covered By</span>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
            {blindspot.heavily_covered_by.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Underreported */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4">
          <span className="text-[11px] font-mono text-rose-800 uppercase tracking-wider font-bold">Underreported By</span>
          <ul className="mt-2 space-y-1.5 text-xs text-slate-700">
            {blindspot.underreported_by.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Missing Context & Recommendation */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
          <Info className="h-4 w-4" />
          <span>Critical Unrepresented Context:</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">{blindspot.missing_context}</p>
        <div className="border-t border-slate-200 pt-2 text-[11px] text-slate-500">
          <strong className="text-slate-700">AI Recommendation:</strong> {blindspot.recommendation}
        </div>
      </div>
    </GlassCard>
  );
};
