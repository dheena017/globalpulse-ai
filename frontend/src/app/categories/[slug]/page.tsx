"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/lib/api_client';
import { Article } from '@/lib/types';
import { NewsGrid } from '@/components/news/NewsGrid';
import { AskAIChatDrawer } from '@/components/ai/AskAIChatDrawer';

export default function CategorySlugPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'technology';
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeChatArticle, setActiveChatArticle] = useState<Article | null>(null);

  useEffect(() => {
    setLoading(true);
    apiClient.getNews({ category: slug, limit: 20 }).then((res) => {
      setArticles(res.articles);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl font-black text-slate-900 font-heading capitalize">{slug} Intelligence Feed</h1>
        <p className="text-xs text-slate-500 mt-1">Verified primary reporting and neural analysis in {slug}</p>
      </div>

      <NewsGrid
        articles={articles}
        loading={loading}
        onOpenAskAI={(art) => setActiveChatArticle(art)}
      />

      <AskAIChatDrawer
        isOpen={Boolean(activeChatArticle)}
        onClose={() => setActiveChatArticle(null)}
        article={activeChatArticle}
      />
    </div>
  );
}
