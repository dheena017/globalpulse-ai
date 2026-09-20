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
      router.push('/dashboard');
    }, 400);
  };

  const handleExecutiveLogin = () => {
    const execUser = {
      id: 'exec_analyst_01',
      email: 'alex.chen@globalpulse.ai',
      name: 'Alex Chen (Senior Intelligence Analyst)',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      is_guest: false,
      preferred_categories: ['world', 'technology', 'business', 'science'],
      saved_articles_count: 4,
      reading_streak_days: 7,
      created_at: '2026-09-01'
    };
    setStoredUser(execUser);
    router.push('/dashboard');
  };

  return (
    <div className="py-8 sm:py-12 flex items-center justify-center">
      <GlassCard glowColor="indigo" className="w-full max-w-md p-6 sm:p-8 space-y-5 bg-white border border-slate-200/90 shadow-xl rounded-2xl">
        {/* Brand Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
            <Globe className="h-5 w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">Access Intelligence Portal</h2>
          <p className="text-xs text-slate-500">Sign in to unlock live wire streams, AI dossiers, and voice broadcasts</p>
        </div>

        {/* Google Sign In */}
        <div className="space-y-3.5">
          <GoogleSignInButton onSuccess={() => router.push('/dashboard')} />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Or Continue With</span>
            <div className="h-px flex-1 bg-slate-200" />
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all"
            >
              {loading ? 'Authenticating...' : 'Sign In with Email'}
            </button>
          </form>

          {/* 1-Click Instant Executive Demo Access */}
          <div className="border-t border-slate-100 pt-3.5 text-center">
            <button
              onClick={handleExecutiveLogin}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 py-2.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 transition-all shadow-xs"
            >
              <UserCheck className="h-4 w-4 text-indigo-600" />
              <span>1-Click Executive Access (Instant Entry)</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
          <span>Strict end-to-end encryption & privacy standards</span>
        </div>
      </GlassCard>
    </div>
  );
}
