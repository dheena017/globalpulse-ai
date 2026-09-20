"use client";

import React, { useState } from 'react';
import { Settings, Key, Sparkles, Moon, Sun, ShieldCheck, Check } from 'lucide-react';
import { GlassCard } from '@/ui/GlassCard';

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [aiMode, setAiMode] = useState('semantic'); // semantic, gemini, openai
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('globalpulse_gemini_key', geminiKey);
      localStorage.setItem('globalpulse_openai_key', openaiKey);
      localStorage.setItem('globalpulse_ai_mode', aiMode);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl font-black text-slate-900 font-heading">Settings & AI Configuration</h1>
        <p className="text-xs text-slate-500 mt-1">Configure neural models, direct LLM keys, and content preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* AI Engine Selection */}
        <GlassCard glowColor="indigo" className="p-6 space-y-4 bg-white border border-slate-200/90 shadow-md">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-heading">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>AI Summarization Engine</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'semantic', name: 'Built-in Semantic NLP', desc: 'Zero config, lightning fast, offline capable' },
              { id: 'gemini', name: 'Google Gemini 1.5', desc: 'Deep synthesis via Gemini API' },
              { id: 'openai', name: 'OpenAI GPT-4o', desc: 'Advanced LLM reasoning' }
            ].map((engine) => (
              <button
                type="button"
                key={engine.id}
                onClick={() => setAiMode(engine.id)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  aiMode === engine.id
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-900 shadow-xs font-medium'
                    : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <p className="text-xs font-bold text-slate-900 mb-1">{engine.name}</p>
                <p className="text-[10px] text-slate-500 leading-relaxed">{engine.desc}</p>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Custom API Keys */}
        <GlassCard className="p-6 space-y-4 bg-white border border-slate-200/90 shadow-md">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-heading">
            <Key className="h-4 w-4 text-indigo-600" />
            <span>Custom AI API Keys (Optional)</span>
          </div>
          <p className="text-xs text-slate-500">
            Keys are stored securely in your local browser session and never sent to third-party databases.
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] font-mono text-slate-700 block mb-1 font-medium">Google Gemini API Key</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-700 block mb-1 font-medium">OpenAI API Key</label>
              <input
                type="password"
                placeholder="sk-proj-..."
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </GlassCard>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 animate-in fade-in">
              <Check className="h-4 w-4" />
              <span>Settings saved successfully!</span>
            </span>
          )}

          <button
            type="submit"
            className="ml-auto rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
