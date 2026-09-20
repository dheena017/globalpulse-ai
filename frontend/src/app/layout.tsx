import type { Metadata } from 'next';
import './globals.css';
import { NavigationBar } from '@/components/navigation/NavigationBar';
import { BreakingTicker } from '@/components/navigation/BreakingTicker';
import { Footer } from '@/components/navigation/Footer';

export const metadata: Metadata = {
  title: 'GlobalPulse AI — Real-Time World News Synthesized by Artificial Intelligence',
  description: 'Next-generation AI news intelligence platform aggregating real-time reporting from 25+ accredited Tier-1 global news institutions (Reuters, AP, BBC, Bloomberg, Nature).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
        <div>
          <NavigationBar />
          <BreakingTicker />
          <main className="mx-auto max-w-7xl px-3 py-5 sm:px-5 lg:px-6">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
