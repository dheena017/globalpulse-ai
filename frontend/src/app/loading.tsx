import { AILoadingSphere } from '@/components/loader/AILoadingSphere';

export default function Loading() {
  return (
    <div className="py-20 flex items-center justify-center">
      <AILoadingSphere statusMessage="Synthesizing live world intelligence from 25+ trusted wire bureaus..." />
    </div>
  );
}
