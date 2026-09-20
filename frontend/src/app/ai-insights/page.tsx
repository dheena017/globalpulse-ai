"use client";

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api_client';
import { PerspectiveComparison, BlindspotData } from '@/lib/types';
import { PerspectiveMatrix } from '@/components/ai/PerspectiveMatrix';
import { BlindspotRadar } from '@/components/ai/BlindspotRadar';
import { BiasReliabilityChart } from '@/components/ai/BiasReliabilityChart';
import { Sparkles, SplitSquareVertical, EyeOff } from 'lucide-react';

export default function AIInsightsPage() {
  const [comparison, setComparison] = useState<PerspectiveComparison | null>(null);
  const [blindspot, setBlindspot] = useState<BlindspotData | null>(null);
  const [topic, setTopic] = useState('Global Clean Energy & Nuclear Power Integration');

  const topics = [
    'Global Clean Energy & Nuclear Power Integration',
    'Optical Computing & AI Semiconductor Sovereignty',
    'Cross-Border Digital Settlement Interoperability'
  ];

  useEffect(() => {
    Promise.all([
      apiClient.compareSources(topic),
      apiClient.getBlindspots(topic)
    ]).then(([comp, blind]) => {
      setComparison(comp);
      setBlindspot(blind);
    });
  }, [topic]);

  return (
    <div className="space-y-10">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl font-black text-slate-900 font-heading">AI Intelligence & Perspective Radar</h1>
        <p className="text-xs text-slate-500 mt-1">Multi-perspective cross-source comparative framing and media blindspot diagnostics</p>
      </div>

      {/* Topic Selection */}
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={`rounded-2xl px-4 py-2 text-xs font-semibold transition-all ${
              topic === t
                ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-500/20'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Comparative Matrix & Blindspot Detector */}
      {comparison && <PerspectiveMatrix comparison={comparison} />}
      {blindspot && <BlindspotRadar blindspot={blindspot} />}

      {/* 2D Media Reliability Index Scatter Plot */}
      <BiasReliabilityChart />
    </div>
  );
}
