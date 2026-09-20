"use client";

import React from 'react';
import { Globe, Cpu, TrendingUp, Atom, Leaf, Landmark, HeartPulse, Film, Sparkles } from 'lucide-react';
import { CategoryInfo } from '@/lib/types';

interface CategoryTabsProps {
  categories: CategoryInfo[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  wiresOnly: boolean;
  onToggleWiresOnly: () => void;
}

const iconMap: Record<string, any> = {
  Globe,
  Cpu,
  TrendingUp,
  Atom,
  Leaf,
  Landmark,
  HeartPulse,
  Film
};

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  wiresOnly,
  onToggleWiresOnly
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-1.5 rounded-2xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-500/20'
              : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>All Feeds</span>
        </button>

        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Globe;
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-300 shadow-xs'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
              }`}
            >
              <Icon className="h-3.5 w-3.5 text-indigo-600" />
              <span>{cat.name.split(' ')[0]}</span>
              {cat.article_count > 0 && (
                <span className="text-[10px] opacity-70 font-mono">({cat.article_count})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Top Wires Only Toggle */}
      <button
        onClick={onToggleWiresOnly}
        className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all border ${
          wiresOnly
            ? 'border-emerald-300 bg-emerald-50 text-emerald-800 shadow-xs'
            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${wiresOnly ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
        <span>Top Wires Only (Reuters & AP)</span>
      </button>
    </div>
  );
};
