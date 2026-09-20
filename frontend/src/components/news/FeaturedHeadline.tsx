"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';
import { Article } from '@/lib/types';
import { SourceTag } from './SourceTag';

interface FeaturedHeadlineProps {
  article: Article;
}

export const FeaturedHeadline: React.FC<FeaturedHeadlineProps> = ({ article }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-slate-900/90 shadow-2xl backdrop-blur-2xl group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Visual */}
        <div className="relative h-64 sm:h-80 lg:h-full lg:col-span-7 overflow-hidden">
          <Image
            src={article.image_url || 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&auto=format&fit=crop&q=80'}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-indigo-600/90 px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
              <Zap className="h-3.5 w-3.5 fill-current text-amber-300" />
              <span>GLOBAL SPOTLIGHT</span>
            </span>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 bg-gradient-to-br from-slate-900/95 to-slate-950/95">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <SourceTag source={article.source} />
              <span className="text-xs text-slate-400 capitalize">{article.category}</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400 font-mono">{article.published_at}</span>
            </div>

            <Link href={`/article/${article.id}`}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight hover:text-cyan-300 transition-colors mb-4">
                {article.title}
              </h2>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {article.summary}
            </p>

            {/* AI Synthesized Key Insight Box */}
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/40 p-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-2">
                <Sparkles className="h-4 w-4" />
                <span>AI Executive Synthesis</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Corroborated across primary wire bureaus. Indicates significant structural alignment in international policy and markets.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Fact-Check Score: <strong className="text-emerald-300">{article.fact_check_score}%</strong></span>
            </div>

            <Link
              href={`/article/${article.id}`}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
            >
              <span>Full Intelligence Reader</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
