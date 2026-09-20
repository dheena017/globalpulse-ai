"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Globe, Cpu, TrendingUp, Sparkles, BookOpen, Radio, ShieldCheck } from 'lucide-react';
import { Modal } from '@/ui/Modal';
import { apiClient } from '@/lib/api_client';
import { Article } from '@/lib/types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const handler = setTimeout(async () => {
      setLoading(true);
      const res = await apiClient.getNews({ search: query, limit: 6 });
      setResults(res.articles);
      setLoading(false);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const quickNav = [
    { name: 'Live Wire Terminal', href: '/live-wire', icon: Radio, color: 'text-cyan-400' },
    { name: 'Story Timeline & Evolution', href: '/story-timeline', icon: Globe, color: 'text-indigo-400' },
    { name: 'AI Insights & Radar', href: '/ai-insights', icon: Sparkles, color: 'text-purple-400' },
    { name: 'Fact-Check & Verification Hub', href: '/fact-checker', icon: ShieldCheck, color: 'text-emerald-400' },
    { name: 'Audio News Studio', href: '/audio-briefing', icon: Radio, color: 'text-amber-400' },
  ];

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="space-y-4">
        {/* Search Bar Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-indigo-600" />
          <input
            type="text"
            placeholder="Search verified world news or ask a question (e.g. clean fusion energy, interest rates)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3.5 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            autoFocus
          />
        </div>

        {/* Search Results */}
        {loading && (
          <div className="py-6 text-center text-xs text-indigo-600 font-medium animate-pulse">
            Neural semantic search across 25+ trusted sources...
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Verified Dispatches</p>
            {results.map((art) => (
              <button
                key={art.id}
                onClick={() => handleSelect(`/article/${art.id}`)}
                className="flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-slate-50 border border-transparent hover:border-slate-200"
              >
                <div className="mt-0.5 rounded-lg bg-indigo-50 p-2 text-indigo-600 border border-indigo-100">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold text-slate-900 truncate">{art.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{art.summary}</p>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="text-indigo-600 font-semibold">{art.source.name}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-medium">Trust: {art.source.trust_score}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Quick Nav Suggestions */}
        {!query && (
          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">Intelligence Modules</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickNav.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleSelect(item.href)}
                  className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3 text-left transition-all hover:border-indigo-300 hover:bg-white hover:shadow-sm"
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span className="text-xs font-semibold text-slate-800">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
