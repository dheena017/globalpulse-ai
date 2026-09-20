"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, History, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '@/lib/types';
import { getBookmarks, getReadingHistory } from '@/lib/bookmark_store';
import { ArticleCard } from '@/components/news/ArticleCard';

export default function SavedArticlesPage() {
  const [tab, setTab] = useState<'bookmarks' | 'history'>('bookmarks');
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [history, setHistory] = useState<Article[]>([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
    setHistory(getReadingHistory());

    const handleUpdate = () => {
      setBookmarks(getBookmarks());
      setHistory(getReadingHistory());
    };

    window.addEventListener('bookmarks-updated', handleUpdate);
    return () => window.removeEventListener('bookmarks-updated', handleUpdate);
  }, []);

  const currentList = tab === 'bookmarks' ? bookmarks : history;

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white font-heading">Saved Intelligence & Reading History</h1>
          <p className="text-xs text-slate-400 mt-1">Personal bookmarks and tracked world intelligence library</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 rounded-2xl bg-slate-900/80 p-1 border border-white/10">
          <button
            onClick={() => setTab('bookmarks')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              tab === 'bookmarks' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="h-3.5 w-3.5 fill-current" />
            <span>Bookmarks ({bookmarks.length})</span>
          </button>
          <button
            onClick={() => setTab('history')}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              tab === 'history' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="h-3.5 w-3.5" />
            <span>History ({history.length})</span>
          </button>
        </div>
      </div>

      {/* List / Grid */}
      {currentList.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center backdrop-blur-xl space-y-3">
          <p className="text-base font-bold text-white">
            {tab === 'bookmarks' ? 'No saved articles yet.' : 'No reading history recorded yet.'}
          </p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the bookmark icon on any news card or read articles to automatically build your intelligence dossier.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition-all"
          >
            <span>Explore Live World Feed</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentList.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      )}
    </div>
  );
}
