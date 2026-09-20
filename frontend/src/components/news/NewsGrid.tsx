"use client";

import React from 'react';
import { Article } from '@/lib/types';
import { ArticleCard } from './ArticleCard';
import { ArticleCardSkeleton } from '@/ui/ShimmerSkeleton';

interface NewsGridProps {
  articles: Article[];
  loading?: boolean;
  onOpenAskAI?: (article: Article) => void;
}

export const NewsGrid: React.FC<NewsGridProps> = ({ articles, loading = false, onOpenAskAI }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <p className="text-base font-semibold text-slate-800">No articles matched your criteria.</p>
        <p className="text-xs text-slate-500 mt-1">Try resetting filters or expanding your search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((art) => (
        <ArticleCard key={art.id} article={art} onOpenAskAI={onOpenAskAI} />
      ))}
    </div>
  );
};
