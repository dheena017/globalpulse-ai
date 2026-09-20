import React from 'react';
import { ShieldCheck, BookOpen, Cpu, CheckCircle2, Lock } from 'lucide-react';
import { GlassCard } from '@/ui/GlassCard';

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-3xl font-black text-slate-900 font-heading">AI Methodology, Fact-Checking & Trust Ethics</h1>
        <p className="text-xs text-slate-500 mt-1">Full architectural disclosure on how GlobalPulse AI ingests, corroborates, and synthesizes world news</p>
      </div>

      <div className="space-y-6">
        <GlassCard className="p-6 sm:p-8 space-y-4 bg-white border border-slate-200/90 shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">1. Strict Tier-1 Trusted Ingestion Whitelist</h2>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            GlobalPulse AI does not crawl unverified social blogs or partisan commentary. Ingestion is strictly restricted to accredited international institutions and gold-standard wire services (Reuters, Associated Press, BBC World, Deutsche Welle, Bloomberg, Nature Journal, MIT Technology Review).
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8 space-y-4 bg-white border border-slate-200/90 shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-sky-600">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">2. Multi-Layer Cross-Wire Corroboration Engine</h2>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Our neural pipeline extracts key factual assertions (numbers, names, dates, quotes) and computes an empirical Truth & Reliability score based on multi-source consensus. If a story is only reported by a single outlet, it is automatically flagged with a &ldquo;Developing&rdquo; badge until secondary wire confirmation occurs.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8 space-y-4 bg-white border border-slate-200/90 shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 border border-purple-200 text-purple-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">3. Blindspot & Echo-Chamber Elimination</h2>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            To prevent regional media bias, the platform tracks story coverage density across North America, Europe, Asia-Pacific, Latin America, and Africa. When major geopolitical shifts are underreported in Western mainstream channels, our Blindspot Radar surfaces regional primary reporting to deliver a 360-degree global perspective.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
