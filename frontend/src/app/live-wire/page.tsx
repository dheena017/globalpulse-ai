"use client";

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api_client';
import { Article } from '@/lib/types';
import { LiveWireStream } from '@/components/news/LiveWireStream';

export default function LiveWirePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFeed = async () => {
    setLoading(true);
    const data = await apiClient.getLiveWire(40);
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">Live Wire Stream Terminal</h1>
          <p className="text-xs text-slate-400 mt-1">Raw, chronological dispatches directly from global news wires</p>
        </div>
      </div>

      <LiveWireStream articles={articles} onRefresh={loadFeed} />
    </div>
  );
}
