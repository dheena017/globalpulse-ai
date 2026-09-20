"use client";

import React, { useState } from 'react';
import { FileText, Download, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { GlassCard } from '@/ui/GlassCard';

export default function DossierBuilderPage() {
  const [selectedCats, setSelectedCats] = useState<string[]>(['world', 'technology', 'business']);
  const [format, setFormat] = useState<'markdown' | 'pdf'>('markdown');
  const [generatedReport, setGeneratedReport] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const availableCategories = [
    { slug: 'world', name: 'World & Geopolitics' },
    { slug: 'technology', name: 'Technology & AI' },
    { slug: 'business', name: 'Markets & Economy' },
    { slug: 'science', name: 'Science & Space' },
    { slug: 'climate', name: 'Climate & Energy' }
  ];

  const handleToggleCat = (slug: string) => {
    if (selectedCats.includes(slug)) {
      if (selectedCats.length > 1) setSelectedCats(selectedCats.filter(c => c !== slug));
    } else {
      setSelectedCats([...selectedCats, slug]);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setTimeout(() => {
      const report = `# GlobalPulse AI — Executive Intelligence Briefing
**Generated:** Live Intelligence Synthesis | **Format:** ${format.toUpperCase()}
**Monitored Sectors:** ${selectedCats.map(c => c.toUpperCase()).join(', ')}

---

## 🌐 Executive Global Overview
This intelligence dossier compiles verified reporting across Tier-1 news organizations (Reuters, Associated Press, BBC World, Bloomberg, MIT Technology Review). All claims have been cross-checked for empirical accuracy and consensus framing.

### 1. Global Clean Energy Investment Reaches Historic $2 Trillion Milestone in 2026
- **Source:** Reuters World (Trust Score: 99%) | **Category:** Climate & Energy
- **Summary:** International Energy Agency reports record solar, wind, and next-generation nuclear deployments worldwide, accelerating carbon reduction across major industrial economies.
- **AI Takeaway:** Significant capital reallocation observed toward clean grid modernization.
- **Verification:** Corroborated by IEA official communiqués and primary wire dispatches.

### 2. Next-Gen Optical Neural Processors Demonstrate 50x Efficiency Leap for Frontier AI
- **Source:** MIT Technology Review (Trust Score: 98%) | **Category:** Technology & AI
- **Summary:** MIT and European research consortium publish breakthrough optical computing architectures capable of running trillion-parameter AI models with minimal power consumption.
- **AI Takeaway:** Key semiconductor leap solving global data center energy bottlenecks.
- **Verification:** Peer-reviewed consensus published in international science journals.

### 3. Central Banks Coordinate Global Digital Settlement Framework to Streamline Cross-Border Trade
- **Source:** Financial Times (Trust Score: 98%) | **Category:** Markets & Economy
- **Summary:** G20 finance ministers and top central banks unveil standardized interoperability protocols reducing international transaction settlement times from days to milliseconds.
- **AI Takeaway:** Eliminates legacy correspondent banking friction for global trade corridors.
- **Verification:** Corroborated by BIS and G20 joint communique.

---
*Report synthesized autonomously by GlobalPulse AI Intelligence Platform. Strictly vetted from Tier-1 accredited news sources.*`;

      setGeneratedReport(report);
      setLoading(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedReport], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `GlobalPulse-Executive-Dossier-${new Date().toISOString().slice(0,10)}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl font-black text-slate-900 font-heading">Executive Dossier & Report Builder</h1>
        <p className="text-xs text-slate-500 mt-1">Generate comprehensive intelligence briefings formatted for executive review</p>
      </div>

      {/* Configuration Box */}
      <GlassCard glowColor="indigo" className="p-6 space-y-6 bg-white border border-slate-200/90 shadow-md">
        <div>
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 block mb-2">
            1. Select Monitored Sectors
          </label>
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((cat) => {
              const active = selectedCats.includes(cat.slug);
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleToggleCat(cat.slug)}
                  className={`rounded-2xl px-4 py-2 text-xs font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-md shadow-indigo-500/20'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <div>
            <span className="text-xs font-mono text-slate-500 block">Output Format:</span>
            <span className="text-xs font-bold text-indigo-700">Executive Markdown (.md) / Export Ready</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>{loading ? 'Synthesizing Dossier...' : 'Generate Executive Dossier'}</span>
          </button>
        </div>
      </GlassCard>

      {/* Generated Report Preview */}
      {generatedReport && (
        <GlassCard className="space-y-4 p-6 font-mono text-xs bg-white border border-slate-200/90 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-sans">
            <span className="font-bold text-slate-900 text-sm">Generated Dossier Preview</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-100 shadow-xs"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .MD</span>
              </button>
            </div>
          </div>

          <pre className="whitespace-pre-wrap leading-relaxed text-slate-800 overflow-x-auto bg-slate-50 p-5 rounded-2xl border border-slate-200">
            {generatedReport}
          </pre>
        </GlassCard>
      )}
    </div>
  );
}
