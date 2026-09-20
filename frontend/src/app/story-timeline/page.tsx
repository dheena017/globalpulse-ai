"use client";

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api_client';
import { StoryTimeline } from '@/lib/types';
import { TimelineViewer } from '@/components/ai/TimelineViewer';
import { Layers, Sparkles } from 'lucide-react';

export default function StoryTimelinePage() {
  const [timeline, setTimeline] = useState<StoryTimeline | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('Global Clean Energy & Decarbonization Milestones');

  const topics = [
    'Global Clean Energy & Decarbonization Milestones',
    'Next-Gen Optical Neural Computing Breakthrough',
    'Cross-Border Central Bank Digital Settlement Protocols',
    'James Webb Space Telescope Exoplanet Biomarkers'
  ];

  useEffect(() => {
    apiClient.getStoryTimeline(selectedTopic).then(setTimeline);
  }, [selectedTopic]);

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl font-black text-slate-900 font-heading">Story Timeline & Chronological Evolution</h1>
        <p className="text-xs text-slate-500 mt-1">Autonomous event sequencing and milestone tracking across time</p>
      </div>

      {/* Topic Switcher Pills */}
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            className={`rounded-2xl px-4 py-2 text-xs font-semibold transition-all ${
              selectedTopic === t
                ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-500/20'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {timeline ? (
        <TimelineViewer timeline={timeline} />
      ) : (
        <div className="py-12 text-center text-xs text-indigo-600 font-medium animate-pulse">
          Generating neural chronological timeline...
        </div>
      )}
    </div>
  );
}
