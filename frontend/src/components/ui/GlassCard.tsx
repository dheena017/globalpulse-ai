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
    indigo: 'border-indigo-500/30 hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]',
    cyan: 'border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]',
    purple: 'border-purple-500/30 hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]',
    none: 'border-white/10 dark:border-white/10 hover:border-indigo-500/30'
  };

  return (
    <div
      className={twMerge(
        clsx(
          'glass-panel rounded-2xl p-5 backdrop-blur-xl transition-all duration-300',
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
