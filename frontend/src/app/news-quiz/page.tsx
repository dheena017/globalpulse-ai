import { NewsQuizWidget } from '@/components/ai/NewsQuizWidget';

export default function NewsQuizPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-black text-white font-heading">Weekly World News IQ Challenge</h1>
        <p className="text-xs text-slate-400 mt-1">Test and expand your knowledge of major current international developments</p>
      </div>

      <NewsQuizWidget />
    </div>
  );
}
