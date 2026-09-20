import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { ArticleSource } from '@/lib/types';

interface SourceTagProps {
  source: ArticleSource;
  showScore?: boolean;
}

export const SourceTag: React.FC<SourceTagProps> = ({ source, showScore = true }) => {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
      <ShieldCheck className="h-3 w-3 text-emerald-400" />
      <span>{source.name}</span>
      {showScore && (
        <span className="text-[10px] font-mono text-emerald-300/80">({source.trust_score}%)</span>
      )}
    </div>
  );
};
