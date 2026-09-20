"use client";

import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Trophy, Sparkles, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/ui/GlassCard';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  source: string;
}

const SAMPLE_QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    question: "What historic milestone was achieved in global clean energy financing according to recent international energy reports?",
    options: [
      "Clean energy investment reached $2 Trillion annually",
      "Global coal usage increased by 50%",
      "Solar panel production ceased in Asia",
      "Offshore wind subsidies were universally cancelled"
    ],
    correct_index: 0,
    explanation: "International energy data confirmed global clean energy investment crossed the landmark $2 Trillion threshold, driven by solar, wind, and battery storage.",
    source: "Reuters & IEA Annual Dispatch"
  },
  {
    id: "q2",
    question: "Which astronomical observatory reported groundbreaking spectrographic biomarker data on exoplanet K2-18b?",
    options: [
      "Hubble Space Telescope",
      "James Webb Space Telescope (JWST)",
      "Arecibo Observatory",
      "Very Large Telescope (VLT)"
    ],
    correct_index: 1,
    explanation: "JWST detected carbon-bearing compounds including methane and carbon dioxide in the atmosphere of K2-18b.",
    source: "NASA & Nature Astrophysics"
  },
  {
    id: "q3",
    question: "What primary advantage do optical neural processors have over traditional silicon GPUs for frontier AI?",
    options: [
      "They use mechanical gears",
      "50x energy efficiency improvement via photonics",
      "They do not require electricity",
      "They only work in zero gravity"
    ],
    correct_index: 1,
    explanation: "Photonic/optical computing uses light waves to perform matrix multiplications, dramatically reducing electrical heat and energy consumption.",
    source: "MIT Technology Review"
  }
];

export const NewsQuizWidget: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const q = SAMPLE_QUIZ[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);
    if (idx === q.correct_index) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < SAMPLE_QUIZ.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <GlassCard glowColor="purple" className="space-y-6 bg-white border border-slate-200/90 shadow-md">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 border border-purple-200 text-purple-600">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Weekly World News IQ Challenge</h3>
            <p className="text-xs text-slate-500">Test your grasp of this week&apos;s verified global milestones</p>
          </div>
        </div>
        <span className="font-mono text-xs text-indigo-600 font-bold">
          {quizFinished ? 'COMPLETE' : `QUESTION ${currentIdx + 1}/${SAMPLE_QUIZ.length}`}
        </span>
      </div>

      {!quizFinished ? (
        <div className="space-y-4">
          <p className="text-sm font-bold text-slate-900 leading-relaxed">{q.question}</p>

          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              let optStyle = 'border-slate-200 bg-slate-50/60 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/40';
              if (isAnswered) {
                if (i === q.correct_index) {
                  optStyle = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold';
                } else if (i === selectedOpt) {
                  optStyle = 'border-rose-300 bg-rose-50 text-rose-900';
                } else {
                  optStyle = 'opacity-50 border-slate-100 bg-slate-50/30 text-slate-400';
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  disabled={isAnswered}
                  className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-xs text-left transition-all ${optStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && i === q.correct_index && <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 ml-2" />}
                  {isAnswered && i === selectedOpt && i !== q.correct_index && <XCircle className="h-4 w-4 text-rose-600 flex-shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Explanation reveal */}
          {isAnswered && (
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Verified Fact & Context:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{q.explanation}</p>
              <p className="text-[10px] font-mono text-slate-500">Source: {q.source}</p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95"
                >
                  {currentIdx + 1 < SAMPLE_QUIZ.length ? 'Next Question' : 'View Results'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="py-6 text-center space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-indigo-600 to-sky-600 text-white shadow-xl">
            <Trophy className="h-8 w-8" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 font-heading">
            You Scored {score} / {SAMPLE_QUIZ.length}!
          </h4>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            {score === SAMPLE_QUIZ.length
              ? 'Outstanding! You possess an elite command of global intelligence.'
              : 'Great effort! Stay tuned to GlobalPulse AI daily for sharp intelligence updates.'}
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5 text-indigo-600" />
            <span>Retake Challenge</span>
          </button>
        </div>
      )}
    </GlassCard>
  );
};
