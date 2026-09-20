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
        className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white p-1.5 pr-3 transition-all hover:border-indigo-400 hover:shadow-sm"
      >
        <div className="relative h-7 w-7 overflow-hidden rounded-full border border-indigo-300">
          <Image
            src={user.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
        <span className="max-w-[100px] truncate text-xs font-semibold text-slate-800">{user.name.split(' ')[0]}</span>
        {user.is_guest && (
          <span className="rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">Guest</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl animate-in fade-in zoom-in-95 z-50">
          <div className="border-b border-slate-200/80 pb-3 px-2">
            <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-lg p-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
              <span className="font-medium">Verified AI Observer Tier</span>
            </div>
          </div>

          <div className="py-2 space-y-1">
            <Link
              href="/saved-articles"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Bookmark className="h-4 w-4 text-indigo-600" />
              <span>Saved Bookmarks</span>
            </Link>

            <Link
              href="/topic-radar"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Custom Topic Radar</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              <Settings className="h-4 w-4 text-slate-500" />
              <span>Settings & API Keys</span>
            </Link>
          </div>

          <div className="border-t border-slate-200/80 pt-2">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
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
