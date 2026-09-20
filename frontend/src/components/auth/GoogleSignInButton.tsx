"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setStoredUser } from '@/lib/auth_store';

interface GoogleSignInButtonProps {
  onSuccess?: () => void;
  className?: string;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onSuccess, className = '' }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const googleUser = {
        id: 'g_user_verified',
        email: 'alex.chen@globalpulse.ai',
        name: 'Alex Chen',
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        is_guest: false,
        preferred_categories: ['world', 'technology', 'business', 'science', 'climate'],
        saved_articles_count: 5,
        reading_streak_days: 7,
        created_at: '2026-09-01'
      };
      setStoredUser(googleUser);
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/');
      }
    }, 600);
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className={`group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-indigo-400 hover:bg-white/20 active:scale-[0.98] ${className}`}
    >
      {loading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      )}
      <span>{loading ? 'Connecting Google Identity...' : 'Continue with Google'}</span>
    </button>
  );
};
