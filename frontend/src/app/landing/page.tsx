"use client";

import React from 'react';
import Link from 'next/link';
import { Globe, Sparkles, ShieldCheck, Radio, Layers, Headphones, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { GlassCard } from '@/ui/GlassCard';

export default function LandingPage() {
  const features = [
    {
      icon: ShieldCheck,
      color: 'text-emerald-400',
      title: 'Tier-1 Accredited Feeds Only',
      desc: 'Strictly filtered from Reuters, AP, BBC, Bloomberg, and Nature. Zero clickbait, zero unverified blogs.'
    },
    {
      icon: Sparkles,
      color: 'text-cyan-400',
      title: 'Autonomous AI Synthesis & TL;DR',
      desc: 'Instant 3-bullet takeaways, executive impact summaries, and key claim fact-check verifications.'
    },
    {
      icon: Layers,
      color: 'text-indigo-400',
      title: 'Perspective & Blindspot Radar',
      desc: 'Side-by-side comparison of how different international bureaus frame the same world event.'
    },
    {
      icon: Headphones,
      color: 'text-purple-400',
      title: 'Multi-Anchor Voice Studio',
      desc: 'Daily synthesized voice news podcast with selectable anchor personas (Geopolitics, Tech, Markets).'
    },
    {
      icon: Radio,
      color: 'text-rose-400',
      title: 'Live Bloomberg-Style Wire',
      desc: 'Real-time terminal stream with sub-second alert indicators and urgency tagging.'
    },
    {
      icon: Globe,
      color: 'text-amber-400',
      title: 'Global Geopolitical Mood Heatmap',
      desc: 'Interactive continent-by-continent sentiment tracking reflecting world market optimism.'
    }
  ];

  const metrics = [
    { number: '25+', label: 'Accredited Global Sources' },
    { number: '100%', label: 'AI Corroborated' },
    { number: '< 1s', label: 'Real-Time Wire Latency' },
    { number: '0%', label: 'Hallucination Strict Wires' }
  ];

  return (
    <div className="space-y-20 py-10">
      {/* Hero Section */}
      <section className="relative text-center space-y-8 max-w-4xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-cyan-300 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>NEXT-GENERATION WORLD NEWS INTELLIGENCE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black font-heading text-white tracking-tight leading-tight">
          The World&apos;s News. <br />
          <span className="text-gradient">Synthesized by AI in Real-Time.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Aggregating strictly from Tier-1 trusted wire services and accredited global institutions. Powered by multi-layer fact verification, blindspot detection, and synthesized voice podcasts.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-cyan-500 to-purple-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-500/30 hover:opacity-95 transition-all"
          >
            <span>Launch Live Intelligence Feed</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="w-full sm:w-auto">
            <GoogleSignInButton className="w-full sm:w-64" />
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="glass-panel rounded-2xl p-6 text-center">
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 font-heading">
              {m.number}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono uppercase">{m.label}</p>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 font-heading">Built for High-Velocity Global Observers</h2>
          <p className="text-xs text-slate-500 mt-2">Every component is engineered to eliminate media echo chambers and deliver verified factual truth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <GlassCard key={idx} className="space-y-3 p-6 bg-white border border-slate-200/90 shadow-sm hover:shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">{f.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Trusted Sources Carousel Banner */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6 font-bold">
          Strictly Ingesting Accredited Gold-Standard Outlets
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-bold text-slate-700 font-heading">
          <span className="hover:text-indigo-600 transition-colors">Reuters Wire</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">Associated Press</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">BBC World</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">Nature Journal</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">Bloomberg</span>
          <span className="text-slate-300">•</span>
          <span className="hover:text-indigo-600 transition-colors">MIT Tech Review</span>
        </div>
      </section>
    </div>
  );
}
