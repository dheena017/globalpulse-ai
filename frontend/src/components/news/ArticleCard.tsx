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
    <GlassCard className="flex flex-col justify-between overflow-hidden p-0 group border border-slate-200/90 bg-white shadow-xs hover:shadow-lg hover:border-indigo-300 rounded-xl">
      {/* Thumbnail */}
      <Link href={`/article/${article.id}`} className="relative h-36 w-full overflow-hidden block bg-slate-100">
        <Image
          src={article.image_url || 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80'}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <SourceTag source={article.source} />
          <button
            onClick={handleBookmark}
            className={`rounded-full p-1.5 backdrop-blur-md transition-all shadow-xs ${
              saved ? 'bg-indigo-600 text-white' : 'bg-white/90 text-slate-700 hover:bg-white hover:text-indigo-600'
            }`}
            title={saved ? 'Remove Bookmark' : 'Save Article'}
          >
            <Bookmark className="h-3 w-3 fill-current" />
          </button>
        </div>

        {/* Impact Level Pill */}
        {article.impact_level === 'Critical' && (
          <div className="absolute bottom-2 left-2">
            <span className="rounded-full bg-rose-600/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-xs">
              CRITICAL IMPACT
            </span>
          </div>
        )}
      </Link>

      {/* Body Content */}
      <div className="flex flex-1 flex-col justify-between p-3.5 bg-white">
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="capitalize text-indigo-600 font-semibold">{article.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
              <Clock className="h-2.5 w-2.5" />
              {article.published_at}
            </span>
          </div>

          <Link href={`/article/${article.id}`} className="block group-hover:text-indigo-600 transition-colors">
            <h3 className="text-sm font-bold leading-snug text-slate-900 line-clamp-2 font-heading mb-1.5">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2.5">
            {article.summary}
          </p>

          {/* Quick AI Takeaways Expandable Drawer */}
          {showQuickSummary && (
            <div className="mb-2.5 rounded-lg border border-indigo-100 bg-indigo-50/70 p-2.5 text-xs text-indigo-900 animate-in fade-in duration-200">
              <div className="flex items-center gap-1 font-bold text-indigo-700 mb-1 text-[11px]">
                <Sparkles className="h-3 w-3" />
                <span>Instant AI Takeaway:</span>
              </div>
              <ul className="space-y-0.5 list-disc list-inside text-[10px] text-slate-700">
                <li>Primary verified milestone from {article.source.name}.</li>
                <li>Consensus confirmed across Tier-1 wire reporting network.</li>
                <li>Macro policy and industry compliance reviews underway.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuickSummary(!showQuickSummary)}
              className="flex items-center gap-1 text-[10px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Sparkles className="h-3 w-3" />
              <span>{showQuickSummary ? 'Hide TL;DR' : 'AI TL;DR'}</span>
            </button>

            {onOpenAskAI && (
              <button
                onClick={handleAskAI}
                className="flex items-center gap-1 text-[10px] font-semibold text-sky-600 hover:text-sky-800 transition-colors ml-1"
              >
                <MessageSquare className="h-3 w-3" />
                <span>Ask AI</span>
              </button>
            )}
          </div>

          <Link
            href={`/article/${article.id}`}
            className="flex items-center gap-1 font-semibold text-[11px] text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <span>Read</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </GlassCard>
  );
};
