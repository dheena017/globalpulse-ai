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
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl font-black text-slate-900 font-heading">Audio News Podcast & Voice Studio</h1>
        <p className="text-xs text-slate-500 mt-1">Multi-anchor synthesized voice broadcast with real-time speech generation</p>
      </div>

      {script ? (
        <MultiAnchorVoicePlayer script={script} />
      ) : (
        <div className="py-12 text-center text-xs text-indigo-600 font-medium animate-pulse">
          Synthesizing daily multi-anchor audio broadcast...
        </div>
      )}
    </div>
  );
}
