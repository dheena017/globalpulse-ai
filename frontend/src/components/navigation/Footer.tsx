import React from 'react';
import Link from 'next/link';
import { Globe, ShieldCheck, Cpu, Radio, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 backdrop-blur-xl mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white font-bold">
                <Globe className="h-4 w-4" />
              </div>
              <span className="font-heading font-extrabold text-white text-base">GlobalPulse.AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesizing real-time world intelligence exclusively from 25+ accredited Tier-1 global news institutions. Powered by multi-layer AI fact-checking, bias detection, and cross-wire corroboration.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono">FASTAPI BACKEND: ONLINE (PORT 8000)</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">Live Coverage</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors">Live World Feed</Link></li>
              <li><Link href="/live-wire" className="hover:text-cyan-400 transition-colors">Live Wire Terminal</Link></li>
              <li><Link href="/story-timeline" className="hover:text-cyan-400 transition-colors">Story Timeline & Evolution</Link></li>
              <li><Link href="/world-regions" className="hover:text-cyan-400 transition-colors">Regional World Map</Link></li>
              <li><Link href="/audio-briefing" className="hover:text-cyan-400 transition-colors">Audio Podcast Studio</Link></li>
            </ul>
          </div>

          {/* AI Intelligence Hub */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">AI Intelligence</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/ai-insights" className="hover:text-indigo-400 transition-colors">Perspective Radar & Blindspots</Link></li>
              <li><Link href="/fact-checker" className="hover:text-indigo-400 transition-colors">Claim Verifier & Debunk Hub</Link></li>
              <li><Link href="/topic-radar" className="hover:text-indigo-400 transition-colors">Custom Entity Radar</Link></li>
              <li><Link href="/dossier-builder" className="hover:text-indigo-400 transition-colors">Executive Dossier Builder</Link></li>
              <li><Link href="/media-index" className="hover:text-indigo-400 transition-colors">2D Media Bias Scatter Plot</Link></li>
              <li><Link href="/news-quiz" className="hover:text-indigo-400 transition-colors">Current Events IQ Quiz</Link></li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div className="space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">Trust & Systems</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/news-sources" className="hover:text-purple-400 transition-colors">25+ Trusted News Sources</Link></li>
              <li><Link href="/methodology" className="hover:text-purple-400 transition-colors">AI Ethics & Fact-Check Math</Link></li>
              <li><Link href="/saved-articles" className="hover:text-purple-400 transition-colors">Saved Bookmarks</Link></li>
              <li><Link href="/settings" className="hover:text-purple-400 transition-colors">API Keys & Preferences</Link></li>
              <li><Link href="/landing" className="hover:text-purple-400 transition-colors">Product Showcase</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 GlobalPulse AI. All Rights Reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span>Aggregating Reuters, AP, BBC, Bloomberg & MIT Tech</span>
            <span>•</span>
            <span className="text-indigo-400">Zero Hallucination Strict Wires</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
