import { BiasReliabilityChart } from '@/components/ai/BiasReliabilityChart';

export default function MediaIndexPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-black text-white font-heading">Global Media Bias & Reliability Index</h1>
        <p className="text-xs text-slate-400 mt-1">Independent 2D matrix mapping empirical fact-checking accuracy against political framing</p>
      </div>

      <BiasReliabilityChart />
    </div>
  );
}
