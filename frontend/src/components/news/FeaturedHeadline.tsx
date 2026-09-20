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
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Visual */}
        <div className="relative h-48 sm:h-60 lg:h-full lg:col-span-7 overflow-hidden bg-slate-100 min-h-[220px]">
          <Image
            src={article.image_url || 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&auto=format&fit=crop&q=80'}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent lg:hidden" />
          
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-md">
              <Zap className="h-3 w-3 fill-current text-amber-300" />
              <span>GLOBAL SPOTLIGHT</span>
            </span>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-between p-4 sm:p-5 lg:col-span-5 bg-white border-t lg:border-t-0 lg:border-l border-slate-100">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <SourceTag source={article.source} />
              <span className="text-[11px] text-slate-500 font-medium capitalize">{article.category}</span>
              <span className="text-[11px] text-slate-300">•</span>
              <span className="text-[11px] text-slate-400 font-mono">{article.published_at}</span>
            </div>

            <Link href={`/article/${article.id}`}>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading leading-tight hover:text-indigo-600 transition-colors mb-2">
                {article.title}
              </h2>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">
              {article.summary}
            </p>

            {/* AI Synthesized Key Insight Box */}
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 mb-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Executive Synthesis</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                Corroborated across primary wire bureaus. Indicates significant structural alignment in international policy and markets.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Fact Score: <strong className="text-emerald-700">{article.fact_check_score}%</strong></span>
            </div>

            <Link
              href={`/article/${article.id}`}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-sky-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm shadow-indigo-500/20 hover:opacity-95 transition-all"
            >
              <span>Full Reader</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
