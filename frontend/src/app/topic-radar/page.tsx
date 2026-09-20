"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, Trash2, Bell, ShieldCheck, ArrowRight } from 'lucide-react';
import { apiClient } from '@/lib/api_client';
import { Article } from '@/lib/types';
import { ArticleCard } from '@/components/news/ArticleCard';
import { GlassCard } from '@/ui/GlassCard';

export default function TopicRadarPage() {
  const [customKeywords, setCustomKeywords] = useState<string[]>([
    'Clean Fusion Energy',
    'Semiconductors',
    'Federal Reserve Rates',
    'James Webb Space'
  ]);
  const [newKeyword, setNewKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('Clean Fusion Energy');
  const [matchedArticles, setMatchedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    if (!customKeywords.includes(newKeyword.trim())) {
      setCustomKeywords([...customKeywords, newKeyword.trim()]);
      setActiveKeyword(newKeyword.trim());
    }
    setNewKeyword('');
  };

  const handleRemove = (kw: string) => {
    const updated = customKeywords.filter(k => k !== kw);
    setCustomKeywords(updated);
    if (activeKeyword === kw && updated.length > 0) {
      setActiveKeyword(updated[0]);
    }
  };

  useEffect(() => {
    if (!activeKeyword) return;
    setLoading(true);
    apiClient.getNews({ search: activeKeyword, limit: 12 }).then((res) => {
      setMatchedArticles(res.articles);
      setLoading(false);
    });
  }, [activeKeyword]);

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl font-black text-slate-900 font-heading">Custom Topic Watchlist & Neural Radar</h1>
        <p className="text-xs text-slate-500 mt-1">Configure automated semantic entity monitors with instant wire alerts</p>
      </div>

      {/* Add Custom Radar Form */}
      <GlassCard glowColor="indigo" className="p-6 bg-white border border-slate-200/90 shadow-md">
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Track a custom keyword or entity (e.g., Quantum Computing, Central Bank Digital Currency)..."
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:opacity-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Neural Monitor</span>
          </button>
        </form>

        {/* Keyword Pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
          {customKeywords.map((kw) => (
            <div
              key={kw}
              className={`flex items-center gap-2 rounded-2xl border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                activeKeyword === kw
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-900 shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <button onClick={() => setActiveKeyword(kw)} className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span>{kw}</span>
              </button>
              {customKeywords.length > 1 && (
                <button
                  onClick={() => handleRemove(kw)}
                  className="rounded-full p-0.5 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Matched Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Live Wire Matched for: <span className="text-indigo-600">&ldquo;{activeKeyword}&rdquo;</span>
          </h3>
          <span className="text-xs font-mono text-slate-500">{matchedArticles.length} articles detected</span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-indigo-600 font-medium animate-pulse">
            Scanning 25+ global wire feeds for matches...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedArticles.map((art) => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
