"use client";

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api_client';
import { RegionInfo, Article } from '@/lib/types';
import { GlobalSentimentMap } from '@/components/ai/GlobalSentimentMap';
import { NewsGrid } from '@/components/news/NewsGrid';
import { Compass, Globe } from 'lucide-react';

export default function WorldRegionsPage() {
  const [regions, setRegions] = useState<RegionInfo[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('americas');
  const [regionArticles, setRegionArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.getWorldRegions().then((data) => {
      setRegions(data);
      if (data.length > 0) setSelectedRegion(data[0].code);
    });
  }, []);

  useEffect(() => {
    if (!selectedRegion) return;
    setLoading(true);
    apiClient.getNews({ region: selectedRegion, limit: 12 }).then((res) => {
      setRegionArticles(res.articles);
      setLoading(false);
    });
  }, [selectedRegion]);

  const activeRegionMeta = regions.find((r) => r.code === selectedRegion);

  return (
    <div className="space-y-10">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-black text-white font-heading">World Regions & Continental Intelligence</h1>
        <p className="text-xs text-slate-400 mt-1">Geopolitical sentiment, policy developments, and regional wire dispatches</p>
      </div>

      {/* Global Sentiment Radar Overview */}
      {regions.length > 0 && <GlobalSentimentMap regions={regions} />}

      {/* Continent Tabs */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {regions.map((reg) => (
            <button
              key={reg.code}
              onClick={() => setSelectedRegion(reg.code)}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs font-bold transition-all ${
                selectedRegion === reg.code
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg'
                  : 'border border-white/10 bg-slate-900/60 text-slate-300 hover:text-white'
              }`}
            >
              <span>{reg.flag}</span>
              <span>{reg.name}</span>
            </button>
          ))}
        </div>

        {activeRegionMeta && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
            <p className="text-xs font-bold text-white mb-0.5">{activeRegionMeta.name} Region Overview</p>
            <p className="text-xs text-slate-400">{activeRegionMeta.description} • Sentiment: <strong className="text-emerald-400">{activeRegionMeta.sentiment_summary}</strong></p>
          </div>
        )}

        <NewsGrid articles={regionArticles} loading={loading} />
      </div>
    </div>
  );
}
