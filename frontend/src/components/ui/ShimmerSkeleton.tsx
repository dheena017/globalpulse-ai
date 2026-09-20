import React from 'react';

export const ShimmerSkeleton: React.FC<{ className?: string }> = ({ className = 'h-4 w-full' }) => {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-800/60 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent ${className}`}
    />
  );
};

export const ArticleCardSkeleton: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-5 space-y-4">
      <ShimmerSkeleton className="h-48 w-full rounded-xl" />
      <div className="flex gap-2">
        <ShimmerSkeleton className="h-5 w-20 rounded-full" />
        <ShimmerSkeleton className="h-5 w-24 rounded-full" />
      </div>
      <ShimmerSkeleton className="h-6 w-5/6" />
      <ShimmerSkeleton className="h-4 w-full" />
      <ShimmerSkeleton className="h-4 w-3/4" />
      <div className="flex justify-between items-center pt-2">
        <ShimmerSkeleton className="h-4 w-28" />
        <ShimmerSkeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
};
