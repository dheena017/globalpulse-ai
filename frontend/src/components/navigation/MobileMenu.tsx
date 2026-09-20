"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Sparkles, Bookmark, Settings, HelpCircle, FileText, CheckSquare } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string; icon: any }[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  const extraLinks = [
    { name: 'Topic Watchlist & Radar', href: '/topic-radar', icon: Sparkles },
    { name: 'Executive Dossier Builder', href: '/dossier-builder', icon: FileText },
    { name: 'Media Bias 2D Index', href: '/media-index', icon: CheckSquare },
    { name: 'Weekly Current Events Quiz', href: '/news-quiz', icon: HelpCircle },
    { name: 'Saved Articles & Bookmarks', href: '/saved-articles', icon: Bookmark },
    { name: 'Settings & Preferences', href: '/settings', icon: Settings },
    { name: 'Methodology & Transparency', href: '/methodology', icon: HelpCircle },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm border-l border-slate-200 bg-white p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-4">
          <span className="font-heading font-bold text-slate-900 text-lg">Menu Navigation</span>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">Core Feeds</p>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                  isActive ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <link.icon className="h-4 w-4 text-indigo-600" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="space-y-1 border-t border-slate-200/80 pt-4 mt-4">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">Intelligence Tools</p>
          {extraLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all"
            >
              <link.icon className="h-4 w-4 text-indigo-600" />
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
