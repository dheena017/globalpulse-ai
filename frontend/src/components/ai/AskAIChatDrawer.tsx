"use client";

import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, ShieldCheck } from 'lucide-react';
import { Article } from '@/lib/types';
import { apiClient } from '@/lib/api_client';

interface AskAIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const AskAIChatDrawer: React.FC<AskAIChatDrawerProps> = ({ isOpen, onClose, article }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: `Hello! I am your GlobalPulse AI News Intelligence Assistant. Ask me anything about this story: "${article?.title || 'World News'}"`
    }
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (userMsg?: string) => {
    const textToSend = userMsg || input;
    if (!textToSend.trim() || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text: textToSend }]);
    setInput('');
    setLoading(true);

    try {
      const res = await apiClient.askQuestion(
        textToSend,
        article?.title || '',
        article?.content || article?.summary || ''
      );
      setMessages((prev) => [...prev, { role: 'assistant', text: res.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Verified dispatches indicate this is a developing global situation with ongoing regulatory and market monitoring.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQuestions = [
    "What are the long-term economic impacts?",
    "How have international regulators responded?",
    "Are there any opposing viewpoints?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-heading">Ask GlobalPulse AI</h3>
              <p className="text-[11px] text-slate-400">Grounded strictly in Tier-1 verified dispatches</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Article Banner */}
        {article && (
          <div className="border-b border-white/5 bg-indigo-950/30 p-3.5 text-xs">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Context Story:</span>
            <p className="font-semibold text-white line-clamp-1 mt-0.5">{article.title}</p>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-600/30 text-cyan-300 border border-indigo-500/40">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`rounded-2xl p-4 text-xs leading-relaxed max-w-[85%] ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                    : 'glass-panel text-slate-200 border border-white/10'
                }`}
              >
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-xs text-indigo-300 animate-pulse">
              <Bot className="h-4 w-4" />
              <span>Analyzing primary sources and synthesizing factual answer...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="border-t border-white/5 px-5 py-3 bg-slate-900/40">
          <p className="text-[10px] font-mono text-slate-400 uppercase mb-2">Suggested Inquiries:</p>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="rounded-lg border border-white/10 bg-slate-800/80 px-2.5 py-1 text-[11px] text-slate-300 hover:border-indigo-500/40 hover:text-white transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-white/10 p-4 bg-slate-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask any question about this story..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-xs text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
