"use client";

import { Article } from './types';

const BOOKMARKS_KEY = 'globalpulse_saved_bookmarks';
const HISTORY_KEY = 'globalpulse_reading_history';

export function getBookmarks(): Article[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isBookmarked(articleId: string): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.id === articleId);
}

export function toggleBookmark(article: Article): boolean {
  const bookmarks = getBookmarks();
  const index = bookmarks.findIndex(b => b.id === article.id);
  let isSaved = false;

  if (index >= 0) {
    bookmarks.splice(index, 1);
    isSaved = false;
  } else {
    bookmarks.unshift(article);
    isSaved = true;
  }

  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  window.dispatchEvent(new Event('bookmarks-updated'));
  return isSaved;
}

export function recordReadingHistory(article: Article): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    let history: Article[] = raw ? JSON.parse(raw) : [];
    history = history.filter(h => h.id !== article.id);
    history.unshift(article);
    if (history.length > 50) history = history.slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {}
}

export function getReadingHistory(): Article[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
