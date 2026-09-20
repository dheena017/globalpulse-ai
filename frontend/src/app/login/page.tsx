"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Globe, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { setStoredUser } from '@/lib/auth_store';
import { GlassCard } from '@/ui/GlassCard';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      const user = {
        id: 'user_custom',
        email,
        name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        is_guest: false,
        preferred_categories: ['world', 'technology', 'business'],
        saved_articles_count: 2,
        reading_streak_days: 1,
        created_at: '2026-09-01'
      };
      setStoredUser(user);
      setLoading(false);
      router.push('/');
    }, 500);
  };

  const handleGuestLogin = () => {
    const guestUser = {
      id: 'guest_observer',
      email: 'guest@globalpulse.ai',
      name: 'Global Observer (Guest)',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      is_guest: true,
      preferred_categories: ['world', 'technology', 'business', 'science'],
      saved_articles_count: 0,
      reading_streak_days: 1,
      created_at: '2026-09-01'
    };
    setStoredUser(guestUser);
    router.push('/');
  };

  return (
    <div className="py-12 flex items-center justify-center">
      <GlassCard glowColor="indigo" className="w-full max-w-md p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
            <Globe className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-black text-white font-heading">Access Intelligence Portal</h2>
          <p className="text-xs text-slate-400">Sign in to unlock personalized radars, bookmarks & AI briefings</p>
        </div>

        {/* Google Sign In */}
        <div className="space-y-4">
          <GoogleSignInButton onSuccess={() => router.push('/')} />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] font-mono text-slate-500 uppercase">Or Continue With</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-3.5">
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                placeholder="Institutional or personal email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 py-3 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
            >
              {loading ? 'Authenticating...' : 'Sign In with Email'}
            </button>
          </form>

          {/* Instant Guest Mode */}
          <div className="border-t border-white/10 pt-4 text-center">
            <button
              onClick={handleGuestLogin}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 py-3 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <UserCheck className="h-4 w-4 text-emerald-400" />
              <span>Explore Instantly as Guest</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
          <span>Strict end-to-end encryption & privacy standards</span>
        </div>
      </GlassCard>
    </div>
  );
}
