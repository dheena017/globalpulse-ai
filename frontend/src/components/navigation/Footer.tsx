import React from 'react';
import Link from 'next/link';
import { Globe, ShieldCheck, Cpu, Radio, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/90 bg-white backdrop-blur-xl mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white font-bold shadow-sm">
                <Globe className="h-4 w-4" />
              </div>
              <span className="font-heading font-extrabold text-slate-900 text-base">GlobalPulse.AI</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Delivering real-time world news from the world&apos;s most trusted sources including Reuters, Associated Press, BBC, Bloomberg, and Nature. Summarized and fact-checked by AI for accuracy.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live News Stream • Updated 24/7</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Live Coverage</p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/" className="hover:text-indigo-600 transition-colors">Home Overview</Link></li>
              <li><Link href="/dashboard" className="hover:text-indigo-600 transition-colors font-semibold text-indigo-600">News Dashboard</Link></li>
              <li><Link href="/live-wire" className="hover:text-indigo-600 transition-colors">Live Breaking News</Link></li>
              <li><Link href="/story-timeline" className="hover:text-indigo-600 transition-colors">How Stories Develop</Link></li>
              <li><Link href="/world-regions" className="hover:text-indigo-600 transition-colors">World News Map</Link></li>
              <li><Link href="/audio-briefing" className="hover:text-indigo-600 transition-colors">Daily Audio Briefing</Link></li>
            </ul>
          </div>

          {/* AI Intelligence Hub */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">AI Features</p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/ai-insights" className="hover:text-indigo-600 transition-colors">Different News Perspectives</Link></li>
              <li><Link href="/fact-checker" className="hover:text-indigo-600 transition-colors">Fact-Check Verifier</Link></li>
              <li><Link href="/topic-radar" className="hover:text-indigo-600 transition-colors">Trending Topics Tracker</Link></li>
              <li><Link href="/dossier-builder" className="hover:text-indigo-600 transition-colors">Download News Reports</Link></li>
              <li><Link href="/media-index" className="hover:text-indigo-600 transition-colors">Media Coverage Comparison</Link></li>
              <li><Link href="/news-quiz" className="hover:text-indigo-600 transition-colors">Weekly News Quiz</Link></li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Trust & Transparency</p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><Link href="/news-sources" className="hover:text-indigo-600 transition-colors">25+ Trusted News Sources</Link></li>
              <li><Link href="/methodology" className="hover:text-indigo-600 transition-colors">How We Verify Facts</Link></li>
              <li><Link href="/saved-articles" className="hover:text-indigo-600 transition-colors">Saved Articles</Link></li>
              <li><Link href="/settings" className="hover:text-indigo-600 transition-colors">Account Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 GlobalPulse AI. All Rights Reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span>Aggregating Reuters, AP, BBC, Bloomberg & MIT Tech</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">100% Fact-Checked News</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
