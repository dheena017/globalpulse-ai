"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileSearch, Sparkles } from 'lucide-react';
import { apiClient } from '@/lib/api_client';
import { FactCheckReport } from '@/lib/types';
import { FactCheckInspector } from '@/components/ai/FactCheckInspector';
import { GlassCard } from '@/ui/GlassCard';

export default function FactCheckerPage() {
  const [report, setReport] = useState<FactCheckReport | null>(null);
  const [customClaim, setCustomClaim] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiClient.getFactCheckScore(
      undefined,
      "Global Clean Energy Investment Reaches Historic $2 Trillion Milestone in 2026",
      "International Energy Agency reports record solar, wind, and next-generation nuclear deployments worldwide, accelerating carbon reduction across major industrial economies.",
      "Reuters"
    ).then(setReport);
  }, []);

  const handleVerifyCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customClaim.trim()) return;
    setLoading(true);
    const res = await apiClient.getFactCheckScore(undefined, customClaim, customClaim, "Reuters & AP");
    setReport(res);
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl font-black text-slate-900 font-heading">Fact-Check & Verification Portal</h1>
        <p className="text-xs text-slate-500 mt-1">Cross-reference discrete claims against international wire standards (Reuters, AP, BBC)</p>
      </div>

      {/* Claim Verifier Search Bar */}
      <GlassCard glowColor="cyan" className="p-6 bg-white border border-slate-200/90 shadow-md">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 block mb-2">Instant Claim Cross-Verifier</span>
        <form onSubmit={handleVerifyCustom} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Paste a headline or claim to verify against Tier-1 news wire standards..."
            value={customClaim}
            onChange={(e) => setCustomClaim(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !customClaim.trim()}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 px-6 py-3 text-xs font-bold text-white shadow-md disabled:opacity-50"
          >
            <FileSearch className="h-4 w-4" />
            <span>{loading ? 'Cross-Checking...' : 'Run Fact-Check'}</span>
          </button>
        </form>
      </GlassCard>

      {/* Fact Check Report Inspector */}
      {report && <FactCheckInspector report={report} />}
    </div>
  );
}
