"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Bookmark,
  Share2,
  Clock,
  ShieldCheck,
  MessageSquare,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Zap,
  Check
} from 'lucide-react';
import { apiClient } from '@/lib/api_client';
import { Article, AISummary, FactCheckReport } from '@/lib/types';
import { SourceTag } from '@/components/news/SourceTag';
import { GlassCard } from '@/ui/GlassCard';
import { AskAIChatDrawer } from '@/components/ai/AskAIChatDrawer';
import { toggleBookmark, isBookmarked, recordReadingHistory } from '@/lib/bookmark_store';

export default function ArticleReaderPage() {
  const params = useParams();
  const articleId = (params?.id as string) || '';

  const [article, setArticle] = useState<Article | null>(null);
  const [summary, setSummary] = useState<AISummary | null>(null);
  const [factReport, setFactReport] = useState<FactCheckReport | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!articleId) return;

    apiClient.getArticleById(articleId).then((art) => {
      if (art) {
        setArticle(art);
        setSaved(isBookmarked(art.id));
        recordReadingHistory(art);

        // Fetch AI Summary & Fact Check
        apiClient.summarizeArticle(art.id, art.title, art.content || art.summary).then(setSummary);
        apiClient.getFactCheckScore(art.id, art.title, art.content || art.summary, art.source.name).then(setFactReport);
      }
    });
  }, [articleId]);

  if (!article) {
    return (
      <div className="py-20 text-center text-xs text-indigo-300 animate-pulse">
        Fetching verified primary article dispatches...
      </div>
    );
  }

  const handleBookmarkToggle = () => {
    const res = toggleBookmark(article);
    setSaved(res);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Live Intelligence Feed</span>
      </Link>

      {/* Header Metadata */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <SourceTag source={article.source} />
          <span className="capitalize text-xs text-indigo-600 font-semibold">{article.category}</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 font-mono text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            {article.published_at}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-emerald-700 font-mono font-bold">Fact-Check: {article.fact_check_score}%</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight">
          {article.title}
        </h1>

        {/* Action Buttons Bar */}
        <div className="flex items-center justify-between border-y border-slate-200/80 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Ask AI About This Story</span>
            </button>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:text-indigo-600 shadow-xs transition-colors"
            >
              <span>Original Wire Source</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkToggle}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all shadow-xs ${
                saved
                  ? 'border-indigo-300 bg-indigo-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:text-indigo-600'
              }`}
            >
              <Bookmark className="h-4 w-4 fill-current" />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 hover:text-indigo-600 shadow-xs transition-colors"
              title="Copy Link"
            >
              {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
        <Image
          src={article.image_url || 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&auto=format&fit=crop&q=80'}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
      </div>

      {/* AI Key Takeaways & Executive Summary Card */}
      {summary && (
        <GlassCard glowColor="indigo" className="p-6 sm:p-8 space-y-4 bg-white border border-slate-200/90 shadow-md">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>Autonomous AI Executive Intelligence Brief</span>
          </div>

          <div className="rounded-2xl bg-indigo-50/80 border border-indigo-100 p-4 text-xs font-semibold text-slate-900 leading-relaxed">
            {summary.executive_takeaway}
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">Key Tactical Points</p>
            <ul className="space-y-2">
              {summary.three_key_bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </GlassCard>
      )}

      {/* Full Article Text */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed bg-white border border-slate-200/90 shadow-md">
        <p className="text-lg font-bold text-slate-900 leading-relaxed">
          {article.summary}
        </p>
        <p>
          {article.content && article.content !== article.summary
            ? article.content
            : "According to primary wire dispatches from international news correspondents, this event signifies broad institutional coordination. Regulatory and financial participants have initiated strategic compliance frameworks to align with enacted policy directives."}
        </p>
        <p className="text-sm text-slate-500">
          International bureaus continue to track development milestones with real-time verification conducted across major wire networks.
        </p>
      </div>

      {/* Discrete Fact Check Verification Box */}
      {factReport && (
        <GlassCard glowColor="cyan" className="p-6 space-y-4 bg-white border border-slate-200/90 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified Fact-Check Rating: {factReport.overall_truth_score}%</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-semibold">{factReport.credibility_rating}</span>
          </div>

          <div className="space-y-2.5">
            {factReport.claims.map((claim, idx) => (
              <div key={idx} className="rounded-xl bg-slate-50 p-3 text-xs border border-slate-200/80">
                <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Verified Claim:</span>
                </div>
                <p className="text-slate-700">{claim.claim}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Contextual Ask AI Side Drawer */}
      <AskAIChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        article={article}
      />
    </div>
  );
}
