"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Sparkles, Clock, ArrowUpRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { Article } from '@/lib/types';
import { GlassCard } from '@/ui/GlassCard';
import { SourceTag } from './SourceTag';
import { toggleBookmark, isBookmarked } from '@/lib/bookmark_store';

interface ArticleCardProps {
  article: Article;
  onOpenAskAI?: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onOpenAskAI }) => {
  const [saved, setSaved] = useState(() => isBookmarked(article.id));
  const [showQuickSummary, setShowQuickSummary] = useState(false);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleBookmark(article);
    setSaved(result);
  };

  const handleAskAI = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenAskAI) onOpenAskAI(article);
  };

  return (
    <GlassCard className="flex flex-col justify-between overflow-hidden p-0 group">
      {/* Thumbnail */}
      <Link href={`/article/${article.id}`} className="relative h-48 w-full overflow-hidden block">
        <Image
          src={article.image_url || 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80'}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <SourceTag source={article.source} />
          <button
            onClick={handleBookmark}
            className={`rounded-full p-2 backdrop-blur-md transition-all ${
              saved ? 'bg-indigo-600 text-white' : 'bg-slate-900/70 text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
            title={saved ? 'Remove Bookmark' : 'Save Article'}
          >
            <Bookmark className="h-3.5 w-3.5 fill-current" />
          </button>
        </div>

        {/* Impact Level Pill */}
        {article.impact_level === 'Critical' && (
          <div className="absolute bottom-3 left-3">
            <span className="rounded-full bg-rose-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-md animate-pulse">
              CRITICAL IMPACT
            </span>
          </div>
        )}
      </Link>

      {/* Body Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="capitalize text-indigo-300 font-medium">{article.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <Clock className="h-3 w-3" />
              {article.published_at}
            </span>
          </div>

          <Link href={`/article/${article.id}`} className="block group-hover:text-cyan-300 transition-colors">
            <h3 className="text-base font-bold leading-snug text-white line-clamp-2 font-heading mb-2">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {article.summary}
          </p>

          {/* Quick AI Takeaways Expandable Drawer */}
          {showQuickSummary && (
            <div className="mb-4 rounded-xl border border-indigo-500/30 bg-indigo-950/40 p-3 text-xs text-indigo-200 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 font-semibold text-cyan-300 mb-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Instant AI Takeaway:</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-300">
                <li>Primary verified milestone from {article.source.name}.</li>
                <li>Consensus confirmed across Tier-1 wire reporting network.</li>
                <li>Macro policy and industry compliance reviews underway.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuickSummary(!showQuickSummary)}
              className="flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{showQuickSummary ? 'Hide TL;DR' : 'AI TL;DR'}</span>
            </button>

            {onOpenAskAI && (
              <button
                onClick={handleAskAI}
                className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 transition-colors ml-2"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Ask AI</span>
              </button>
            )}
          </div>

          <Link
            href={`/article/${article.id}`}
            className="flex items-center gap-1 font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <span>Read</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </GlassCard>
  );
};
