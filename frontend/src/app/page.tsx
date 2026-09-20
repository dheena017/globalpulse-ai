"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Radio, ShieldCheck, TrendingUp, Layers, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { apiClient } from '@/lib/api_client';
import { Article, CategoryInfo, DailyBriefing } from '@/lib/types';
import { FeaturedHeadline } from '@/components/news/FeaturedHeadline';
import { NewsGrid } from '@/components/news/NewsGrid';
import { CategoryTabs } from '@/components/news/CategoryTabs';
import { DailyExecutiveDigest } from '@/components/ai/DailyExecutiveDigest';
import { AskAIChatDrawer } from '@/components/ai/AskAIChatDrawer';
import { ShimmerSkeleton } from '@/components/ui/ShimmerSkeleton';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [briefing, setBriefing] = useState<DailyBriefing | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wiresOnly, setWiresOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeChatArticle, setActiveChatArticle] = useState<Article | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [newsData, catsData, briefData] = await Promise.all([
        apiClient.getNews({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          wires_only: wiresOnly,
          limit: 25
        }),
        apiClient.getCategories(),
        apiClient.getDailyBriefing()
      ]);
      setArticles(newsData.articles);
      setCategories(catsData);
      setBriefing(briefData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory, wiresOnly]);

  const featuredArticle = articles.find(a => a.is_featured) || articles[0];
  const gridArticles = articles.filter(a => a.id !== featuredArticle?.id);

  return (
    <div className="space-y-10">
      {/* 60-Second Daily Executive Briefing */}
      {briefing && <DailyExecutiveDigest briefing={briefing} />}

      {/* Hero Spotlight Headline */}
      {featuredArticle && !loading && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>World Hero Headline</span>
            </span>
          </div>
          <FeaturedHeadline article={featuredArticle} />
        </section>
      )}

      {/* Category Tabs & Wire Filter */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white font-heading">Live Global Intelligence Stream</h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time dispatches from accredited world publishers</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
              <span className="hidden sm:inline">Refresh Feeds</span>
            </button>
          </div>
        </div>

        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          wiresOnly={wiresOnly}
          onToggleWiresOnly={() => setWiresOnly(!wiresOnly)}
        />

        {/* News Grid */}
        <NewsGrid
          articles={gridArticles}
          loading={loading}
          onOpenAskAI={(art) => setActiveChatArticle(art)}
        />
      </section>

      {/* Quick Jump Intelligence Banner */}
      <section className="rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-cyan-950/60 p-8 text-center backdrop-blur-2xl">
        <h3 className="text-2xl font-bold text-white font-heading mb-2">Explore Next-Generation AI Intelligence Tools</h3>
        <p className="text-xs text-slate-300 max-w-xl mx-auto mb-6">
          Compare multi-source editorial perspectives, examine media blindspots, or listen to the daily AI synthesized multi-anchor podcast.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/ai-insights"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-indigo-500 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI Perspective Radar</span>
          </Link>
          <Link
            href="/live-wire"
            className="flex items-center gap-2 rounded-xl bg-slate-800 border border-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-all"
          >
            <Radio className="h-4 w-4 text-rose-400" />
            <span>Live Wire Terminal</span>
          </Link>
          <Link
            href="/audio-briefing"
            className="flex items-center gap-2 rounded-xl bg-slate-800 border border-white/10 px-4 py-2.5 text-xs font-bold text-cyan-300 hover:bg-slate-700 transition-all"
          >
            <Zap className="h-4 w-4 text-cyan-400" />
            <span>Audio Podcast Studio</span>
          </Link>
        </div>
      </section>

      {/* Contextual Ask AI Side Drawer */}
      <AskAIChatDrawer
        isOpen={Boolean(activeChatArticle)}
        onClose={() => setActiveChatArticle(null)}
        article={activeChatArticle}
      />
    </div>
  );
}
