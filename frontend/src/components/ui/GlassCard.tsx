import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: 'indigo' | 'cyan' | 'purple' | 'none';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowColor = 'none',
  ...props
}) => {
  const glowClasses = {
    indigo: 'border-indigo-200 hover:border-indigo-500/50 hover:shadow-[0_10px_25px_rgba(79,70,229,0.1)]',
    cyan: 'border-sky-200 hover:border-sky-500/50 hover:shadow-[0_10px_25px_rgba(2,132,199,0.1)]',
    purple: 'border-purple-200 hover:border-purple-500/50 hover:shadow-[0_10px_25px_rgba(168,85,247,0.1)]',
    none: 'border-slate-200/80 hover:border-indigo-500/40'
  };

  return (
    <div
      className={twMerge(
        clsx(
          'glass-panel rounded-2xl p-5 transition-all duration-300 bg-white/90 border border-slate-200/80 shadow-sm',
          hoverEffect && 'glass-panel-hover',
          glowClasses[glowColor],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
