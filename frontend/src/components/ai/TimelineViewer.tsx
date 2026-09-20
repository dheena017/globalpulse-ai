"use client";

import React from 'react';
import { Layers, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { StoryTimeline } from '@/lib/types';
import { GlassCard } from '@/ui/GlassCard';

interface TimelineViewerProps {
  timeline: StoryTimeline;
}

export const TimelineViewer: React.FC<TimelineViewerProps> = ({ timeline }) => {
  return (
    <GlassCard glowColor="purple" className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-heading">{timeline.story_title}</h3>
            <p className="text-xs text-slate-400">Chronological Evolution ({timeline.timeframe})</p>
          </div>
        </div>
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-400 before:to-purple-500">
        {timeline.milestones.map((milestone, idx) => (
          <div key={idx} className="relative group">
            {/* Pulsing Node */}
            <div className={`absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 border-slate-950 ${
              milestone.importance === 'Critical' ? 'bg-rose-400 animate-ping' : 'bg-cyan-400'
            }`} />
            <div className={`absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 border-slate-950 ${
              milestone.importance === 'Critical' ? 'bg-rose-500' : 'bg-cyan-400'
            }`} />

            {/* Milestone Card */}
            <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4 transition-all group-hover:border-indigo-500/30 group-hover:bg-slate-900/90">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold text-cyan-400">{milestone.date} {milestone.time && `• ${milestone.time}`}</span>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">{milestone.source_name}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{milestone.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{milestone.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
