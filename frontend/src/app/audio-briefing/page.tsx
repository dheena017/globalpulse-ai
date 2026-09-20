"use client";

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api_client';
import { PodcastScript } from '@/lib/types';
import { MultiAnchorVoicePlayer } from '@/components/ai/MultiAnchorVoicePlayer';

export default function AudioBriefingPage() {
  const [script, setScript] = useState<PodcastScript | null>(null);

  useEffect(() => {
    apiClient.getPodcastScript().then(setScript);
  }, []);

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-black text-white font-heading">Audio News Podcast & Voice Studio</h1>
        <p className="text-xs text-slate-400 mt-1">Multi-anchor synthesized voice broadcast with real-time speech generation</p>
      </div>

      {script ? (
        <MultiAnchorVoicePlayer script={script} />
      ) : (
        <div className="py-12 text-center text-xs text-indigo-300 animate-pulse">
          Synthesizing daily multi-anchor audio broadcast...
        </div>
      )}
    </div>
  );
}
