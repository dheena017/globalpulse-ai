"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, FastForward, Radio, Headphones, Sparkles, Check } from 'lucide-react';
import { PodcastScript } from '@/lib/types';
import { GlassCard } from '@/ui/GlassCard';

interface MultiAnchorVoicePlayerProps {
  script: PodcastScript;
}

export const MultiAnchorVoicePlayer: React.FC<MultiAnchorVoicePlayerProps> = ({ script }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [selectedAnchor, setSelectedAnchor] = useState('Elena Vance');
  const [showFullScript, setShowFullScript] = useState(false);

  const anchors = [
    { name: 'Elena Vance', specialty: 'Geopolitics & World Affairs', color: 'indigo' },
    { name: 'Alex Chen', specialty: 'Technology & Space Science', color: 'cyan' },
    { name: 'Marcus Sterling', specialty: 'Markets & Global Economy', color: 'emerald' }
  ];

  const togglePlayback = () => {
    if (typeof window === 'undefined') return;

    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support speech synthesis.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const currentChapter = script.chapters[currentChapterIdx] || script.chapters[0];
      const textToSpeak = `${script.host_intro}. ${currentChapter.script_segment}`;
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = speed;
      utterance.onend = () => {
        setIsPlaying(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
      };
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = () => {
    const nextSpeed = speed === 1.0 ? 1.25 : (speed === 1.25 ? 1.5 : 1.0);
    setSpeed(nextSpeed);
    if (isPlaying) {
      togglePlayback();
    }
  };

  const handleSelectChapter = (idx: number) => {
    setCurrentChapterIdx(idx);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <GlassCard glowColor="cyan" className="space-y-6 bg-white border border-slate-200/90 shadow-md">
      {/* Player Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-500/20">
            <Radio className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">{script.title}</h3>
            <p className="text-xs text-slate-500">Multi-Anchor Synthesized Voice Broadcast ({script.duration_estimated_minutes} Min Daily Briefing)</p>
          </div>
        </div>

        <button
          onClick={() => setShowFullScript(!showFullScript)}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
        >
          {showFullScript ? 'Hide Script' : 'View Full Script'}
        </button>
      </div>

      {/* Anchor Persona Switcher */}
      <div className="space-y-2">
        <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Lead Anchor Voice Persona</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {anchors.map((anc) => (
            <button
              key={anc.name}
              onClick={() => setSelectedAnchor(anc.name)}
              className={`flex items-center justify-between rounded-xl border p-3 text-left transition-all ${
                selectedAnchor === anc.name
                  ? 'border-sky-300 bg-sky-50 text-sky-900 shadow-xs font-semibold'
                  : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-slate-900">{anc.name}</p>
                <p className="text-[10px] text-slate-500">{anc.specialty}</p>
              </div>
              {selectedAnchor === anc.name && <Check className="h-4 w-4 text-sky-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Waveform Animation */}
      <div className="flex items-center justify-center gap-1.5 py-4 bg-slate-50 rounded-2xl border border-slate-200 h-20">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full bg-gradient-to-t from-indigo-500 to-sky-500 transition-all duration-300 ${
              isPlaying
                ? 'animate-pulse'
                : 'h-2 opacity-30'
            }`}
            style={{
              height: isPlaying ? `${Math.max(10, Math.sin(i * 0.5) * 45 + 25)}px` : '8px',
              animationDelay: `${i * 60}ms`
            }}
          />
        ))}
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeedChange}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-xs"
          >
            {speed}x
          </button>
        </div>

        <button
          onClick={togglePlayback}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-sky-600 text-white shadow-lg shadow-indigo-500/25 hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current ml-1" />}
        </button>

        <div className="text-right">
          <span className="text-xs font-mono text-indigo-600 font-bold">
            Chapter {currentChapterIdx + 1}/{script.chapters.length}
          </span>
        </div>
      </div>

      {/* Chapters Navigation */}
      <div className="space-y-2">
        <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Chapters & Topic Timeline</p>
        <div className="space-y-1.5">
          {script.chapters.map((chap, idx) => (
            <button
              key={chap.id}
              onClick={() => handleSelectChapter(idx)}
              className={`flex w-full items-center justify-between rounded-xl p-2.5 text-xs text-left transition-all ${
                currentChapterIdx === idx
                  ? 'border border-indigo-200 bg-indigo-50 text-indigo-900 font-bold shadow-xs'
                  : 'border border-transparent bg-slate-50/60 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="font-mono text-indigo-600 font-bold text-[11px]">{chap.timestamp_display}</span>
                <span className="truncate">{chap.title}</span>
              </div>
              <span className="rounded bg-slate-200/80 px-2 py-0.5 text-[9px] font-mono text-slate-700 uppercase font-semibold">
                {chap.anchor_name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Full Script Drawer */}
      {showFullScript && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-800 font-mono space-y-2 animate-in fade-in">
          <p className="text-indigo-600 font-bold">--- RADIO BROADCAST TRANSCRIPT ---</p>
          <p>{script.full_audio_script}</p>
        </div>
      )}
    </GlassCard>
  );
};
