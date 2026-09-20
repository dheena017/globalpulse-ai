"use client";

import React, { useState, useEffect } from 'react';
import { Cpu, Globe, Sparkles, CheckCircle } from 'lucide-react';

interface AILoadingSphereProps {
  statusMessage?: string;
  fullscreen?: boolean;
}

export const AILoadingSphere: React.FC<AILoadingSphereProps> = ({
  statusMessage = "Synthesizing live world intelligence...",
  fullscreen = false
}) => {
  const [telemetryIndex, setTelemetryIndex] = useState(0);

  const telemetrySteps = [
    "Establishing encrypted stream to Reuters & AP satellites...",
    "Ingesting 25+ Tier-1 accredited global wire feeds...",
    "Running neural claim extraction & cross-wire fact verifier...",
    "Computing regional geopolitical sentiment & bias radar...",
    "Synthesizing 60-second executive global digest..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % telemetrySteps.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [telemetrySteps.length]);

  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Holographic Glowing AI Orb */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute h-36 w-36 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin-slow" />
        {/* Middle Ring */}
        <div className="absolute h-28 w-28 rounded-full border-2 border-cyan-500/30 border-b-cyan-400 animate-spin" />
        {/* Inner Glowing Core */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 via-cyan-500 to-purple-600 shadow-[0_0_50px_rgba(99,102,241,0.6)] animate-pulse">
          <Globe className="h-9 w-9 text-white animate-pulse" />
        </div>
      </div>

      <h3 className="mb-2 text-xl font-bold font-heading text-white flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-cyan-400" />
        GlobalPulse AI Neural Engine
      </h3>

      <p className="text-sm font-medium text-indigo-300 mb-6">{statusMessage}</p>

      {/* Live Telemetry Stream */}
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl shadow-inner">
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/10 pb-2 mb-2">
          <span className="flex items-center gap-1.5 font-mono text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            LIVE PIPELINE
          </span>
          <span className="font-mono">PORT: 8000 (FASTAPI)</span>
        </div>
        <p className="font-mono text-xs text-slate-300 text-left transition-all duration-300 min-h-[32px] flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
          <span>{telemetrySteps[telemetryIndex]}</span>
        </p>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl">
        {content}
      </div>
    );
  }

  return content;
};
