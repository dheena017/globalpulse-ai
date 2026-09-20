"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Radio, ShieldCheck, TrendingUp, Layers, ArrowRight, 
  RefreshCw, Zap, Headphones, Globe, HelpCircle, Eye, Compass, BookOpen 
} from 'lucide-react';
import { apiClient } from '@/lib/api_client';
import { Article, CategoryInfo, DailyBriefing, RegionInfo, PodcastScript, FactCheckReport } from '@/lib/types';
import { FeaturedHeadline } from '@/components/news/FeaturedHeadline';
import { NewsGrid } from '@/components/news/NewsGrid';
import { CategoryTabs } from '@/components/news/CategoryTabs';
import { DailyExecutiveDigest } from '@/components/ai/DailyExecutiveDigest';
import { AskAIChatDrawer } from '@/components/ai/AskAIChatDrawer';
import { MultiAnchorVoicePlayer } from '@/components/ai/MultiAnchorVoicePlayer';
import { FactCheckInspector } from '@/components/ai/FactCheckInspector';
import { GlobalSentimentMap } from '@/components/ai/GlobalSentimentMap';
import { NewsQuizWidget } from '@/components/ai/NewsQuizWidget';
import { GlassCard } from '@/ui/GlassCard';

export default function MasterDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [regions, setRegions] = useState<RegionInfo[]>([]);
  const [briefing, setBriefing] = useState<DailyBriefing | null>(null);
  const [podcast, setPodcast] = useState<PodcastScript | null>(null);
  const [factReport, setFactReport] = useState<FactCheckReport | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [wiresOnly, setWiresOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeChatArticle, setActiveChatArticle] = useState<Article | null>(null);

  const loadData = async (isInitial = false) => {
    if (isInitial && articles.length === 0) {
      setLoading(true);
    }
    try {
      // 1. Fetch primary news immediately
      const newsPromise = apiClient.getNews({
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        wires_only: wiresOnly,
        limit: 25
      });
      
      const catsPromise = apiClient.getCategories();
      const briefPromise = apiClient.getDailyBriefing();
      const regionsPromise = apiClient.getWorldRegions();
      const podcastPromise = apiClient.getPodcastScript();

      // Resolve news and categories first for fast paint
      const [newsData, catsData] = await Promise.all([newsPromise, catsPromise]);
      setArticles(newsData.articles);
      setCategories(catsData);
      setLoading(false);

      // Resolve secondary intelligence widgets progressively
      const [briefData, regionsData, podcastData] = await Promise.all([
        briefPromise,
        regionsPromise,
        podcastPromise
      ]);

      setBriefing(briefData);
      setRegions(regionsData);
      setPodcast(podcastData);

      // Load sample fact check on featured article in background
      if (newsData.articles.length > 0) {
        const topArt = newsData.articles[0];
        apiClient.getFactCheckScore(topArt.id, topArt.title, topArt.summary, topArt.source.name).then(setFactReport);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, [selectedCategory, wiresOnly]);

  const featuredArticle = articles.find(a => a.is_featured) || articles[0];
  const gridArticles = articles.filter(a => a.id !== featuredArticle?.id);

  return (
    <div className="space-y-7 pb-10">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200/80 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-700 uppercase">Live Intelligence Command Center</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">Global Intelligence Dashboard</h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Synthesizing 25+ Tier-1 wire feeds, multi-anchor voice scripts, and defensible claim verifications.</p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/live-wire"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-xs"
          >
            <Radio className="h-3 w-3 text-rose-600" />
            <span>Live Wire Terminal</span>
          </Link>

          <Link
            href="/audio-briefing"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-xs"
          >
            <Headphones className="h-3 w-3 text-purple-600" />
            <span>Audio Studio</span>
          </Link>

          <Link
            href="/ai-insights"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition-all shadow-xs"
          >
            <Sparkles className="h-3 w-3 text-indigo-600" />
            <span>Perspective Matrix</span>
          </Link>

          <button
            onClick={() => loadData()}
            className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-all shadow-xs"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
            <span>Sync Feeds</span>
          </button>
        </div>
      </div>

      {/* 1. 60-Second Daily Executive AI Briefing */}
      {briefing && (
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              <span>Section 1: Daily Executive Synthesis</span>
            </span>
          </div>
          <DailyExecutiveDigest briefing={briefing} />
        </section>
      )}

      {/* 2. Hero Headline Spotlight & Podcast Mini Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Hero Spotlight (2 Cols) */}
        <div className="lg:col-span-2 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <Zap className="h-3 w-3" />
              <span>World Hero Headline</span>
            </span>
          </div>
          {featuredArticle && !loading ? (
            <FeaturedHeadline article={featuredArticle} />
          ) : (
            <div className="h-56 rounded-2xl skeleton-shimmer border border-slate-200" />
          )}
        </div>

        {/* Podcast Audio Player (1 Col) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
              <Headphones className="h-3 w-3" />
              <span>Multi-Anchor Radio Studio</span>
            </span>
            <Link href="/audio-briefing" className="text-[10px] text-purple-600 font-semibold hover:underline">Full Studio &rarr;</Link>
          </div>
          {podcast ? (
            <MultiAnchorVoicePlayer script={podcast} />
          ) : (
            <div className="h-56 rounded-2xl skeleton-shimmer border border-slate-200" />
          )}
        </div>
      </div>

      {/* 3. Live Categorized News Intelligence Stream */}
      <section className="space-y-4 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
              <Globe className="h-4 w-4 text-indigo-600" />
              <span>Accredited Global News Feed</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Filter by category or isolate raw Tier-1 wire dispatches (Reuters, AP, BBC, FT, CNA)</p>
          </div>
        </div>

        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          wiresOnly={wiresOnly}
          onToggleWiresOnly={() => setWiresOnly(!wiresOnly)}
        />

        <NewsGrid
          articles={gridArticles}
          loading={loading}
          onOpenAskAI={(art) => setActiveChatArticle(art)}
        />
      </section>

      {/* 4. Deep Intelligence Modules: Fact-Checking & Continental Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
        {/* 5-Tier Fact Checking Inspector */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" />
              <span>Claim Verifier (5-Tier Taxonomy)</span>
            </span>
            <Link href="/fact-checker" className="text-[10px] text-emerald-600 font-semibold hover:underline">View Hub &rarr;</Link>
          </div>
          {factReport ? (
            <FactCheckInspector report={factReport} />
          ) : (
            <div className="h-56 rounded-2xl skeleton-shimmer border border-slate-200" />
          )}
        </div>

        {/* Continental Mood Map */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <Compass className="h-3 w-3" />
              <span>Continental Geopolitical Mood Map</span>
            </span>
            <Link href="/world-regions" className="text-[10px] text-indigo-600 font-semibold hover:underline">Explore Regions &rarr;</Link>
          </div>
          <GlobalSentimentMap regions={regions} />
        </div>
      </div>

      {/* 5. Weekly IQ Quiz Challenge */}
      <section className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
            <HelpCircle className="h-3 w-3" />
            <span>Weekly Current Events IQ Challenge</span>
          </span>
          <Link href="/news-quiz" className="text-[10px] text-amber-600 font-semibold hover:underline">Full Quiz Arena &rarr;</Link>
        </div>
        <NewsQuizWidget />
      </section>

      {/* Grounded Ask-AI Drawer */}
      <AskAIChatDrawer
        isOpen={Boolean(activeChatArticle)}
        onClose={() => setActiveChatArticle(null)}
        article={activeChatArticle}
      />
    </div>
  );
}
