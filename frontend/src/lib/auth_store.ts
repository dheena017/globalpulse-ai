"use client";

import { UserProfile } from './types';

const AUTH_KEY = 'globalpulse_user_session';

const DEFAULT_GUEST: UserProfile = {
  id: 'guest_default',
  email: 'explorer@globalpulse.ai',
  name: 'Global Explorer (Guest)',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  is_guest: true,
  preferred_categories: ['world', 'technology', 'business', 'science'],
  saved_articles_count: 0,
  reading_streak_days: 1,
  created_at: '2026-09-01'
};

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const user = JSON.parse(raw);
    return Boolean(user && user.id && user.id !== 'guest_default');
  } catch {
    return false;
  }
}

export function getStoredUser(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_GUEST;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return DEFAULT_GUEST;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_GUEST;
  }
}

export function setStoredUser(user: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('auth-state-change'));
}

export function clearStoredUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
  window.dispatchEvent(new Event('auth-state-change'));
}
