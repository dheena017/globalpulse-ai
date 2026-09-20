"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Bookmark, Settings, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { getStoredUser, clearStoredUser } from '@/lib/auth_store';
import { UserProfile } from '@/lib/types';

export const UserMenuDropdown: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUser(getStoredUser());
    const handleAuthChange = () => setUser(getStoredUser());
    window.addEventListener('auth-state-change', handleAuthChange);
    return () => window.removeEventListener('auth-state-change', handleAuthChange);
  }, []);

  if (!user) return null;

  const handleSignOut = () => {
    clearStoredUser();
    setIsOpen(false);
    router.push('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-800/80 p-1.5 pr-3 transition-all hover:border-indigo-500/40 hover:bg-slate-800"
      >
        <div className="relative h-7 w-7 overflow-hidden rounded-full border border-indigo-400/40">
          <Image
            src={user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="max-w-[100px] truncate text-xs font-medium text-slate-200">{user.name.split(' ')[0]}</span>
        {user.is_guest && (
          <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">Guest</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-white/10 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 z-50">
          <div className="border-b border-white/10 pb-3 px-2">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-indigo-300 bg-indigo-500/10 rounded-lg p-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
              <span>Verified AI Observer Tier</span>
            </div>
          </div>

          <div className="py-2 space-y-1">
            <Link
              href="/saved-articles"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Bookmark className="h-4 w-4 text-indigo-400" />
              <span>Saved Bookmarks</span>
            </Link>

            <Link
              href="/topic-radar"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Custom Topic Radar</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              <Settings className="h-4 w-4 text-slate-400" />
              <span>Settings & API Keys</span>
            </Link>
          </div>

          <div className="border-t border-white/10 pt-2">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>{user.is_guest ? 'Exit Guest Mode' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
