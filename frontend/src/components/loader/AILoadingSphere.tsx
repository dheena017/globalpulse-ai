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
    "Connecting to Reuters, Associated Press & BBC live feeds...",
    "Fetching latest breaking stories from 25+ global newsrooms...",
    "Fact-checking news claims across multiple sources...",
    "Analyzing world perspectives and regional news trends...",
    "Preparing your 60-second daily executive briefing..."
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

      <h3 className="mb-2 text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-indigo-600" />
        GlobalPulse AI News Engine
      </h3>

      <p className="text-sm font-medium text-indigo-600 mb-6">{statusMessage}</p>

      {/* Live Telemetry Stream */}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
        <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-100 pb-2 mb-2 font-medium">
          <span className="flex items-center gap-1.5 text-indigo-600 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            LIVE NEWS STREAM
          </span>
          <span className="text-emerald-700 font-semibold font-mono">ONLINE</span>
        </div>
        <p className="text-xs text-slate-700 text-left transition-all duration-300 min-h-[32px] flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-indigo-600 flex-shrink-0" />
          <span>{telemetrySteps[telemetryIndex]}</span>
        </p>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-xl">
        {content}
      </div>
    );
  }

  return content;
};
