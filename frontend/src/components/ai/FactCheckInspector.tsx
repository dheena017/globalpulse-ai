"use client";

import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, FileText, Check, ExternalLink } from 'lucide-react';
import { FactCheckReport } from '@/lib/types';
import { GlassCard } from '@/ui/GlassCard';

interface FactCheckInspectorProps {
  report: FactCheckReport;
}

export const FactCheckInspector: React.FC<FactCheckInspectorProps> = ({ report }) => {
  return (
    <GlassCard glowColor="cyan" className="space-y-6 bg-white border border-slate-200/90 shadow-md">
      {/* Header Score Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">AI Deep Fact-Check Inspector</h3>
            <p className="text-xs text-slate-500">Cross-verified against primary wire standards (Reuters, AP, BBC)</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-black text-emerald-600 font-heading">{report.overall_truth_score}%</div>
            <div className="text-[10px] font-mono uppercase text-emerald-700 font-bold">{report.credibility_rating}</div>
          </div>
        </div>
      </div>

      {/* Primary Sources Cited */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Primary Corroborating Wires</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {report.primary_sources_cited.map((src, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs text-slate-700 font-medium shadow-xs">
              <Check className="h-3 w-3 text-emerald-600" />
              <span>{src}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Discrete Claim Breakdown */}
      <div className="space-y-3">
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600">Verified Discrete Claims</p>
        <div className="space-y-3">
          {report.claims.map((claim, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 hover:border-emerald-300 transition-all shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{claim.verdict} ({claim.confidence}%)</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">Claim #{idx + 1}</span>
              </div>

              <p className="text-xs font-semibold text-slate-900 mb-2 leading-relaxed">&ldquo;{claim.claim}&rdquo;</p>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{claim.notes}</p>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 border-t border-slate-100 pt-2">
                <span className="text-slate-500 font-mono font-medium">Matched Wires:</span>
                <span className="text-slate-700 font-medium">{claim.corroborating_sources.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
