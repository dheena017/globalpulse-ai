import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/navigation/AppShell';

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
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
