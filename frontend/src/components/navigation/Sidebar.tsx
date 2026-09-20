"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Globe, Sparkles, Radio, Layers, Compass, Headphones, ShieldCheck,
  BookOpen, Bookmark, Settings, FileText, HelpCircle, Activity,
  ChevronLeft, ChevronRight, BarChart3, PieChart, ShieldAlert, Cpu
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const pathname = usePathname();

  const navGroups = [
    {
      title: "Core Intelligence",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: Sparkles, badge: "Live" },
        { name: "Live Wire", href: "/live-wire", icon: Radio, badge: "Urgent", badgeColor: "bg-rose-50 text-rose-700 border-rose-200" },
        { name: "Story Timeline", href: "/story-timeline", icon: Layers },
        { name: "AI Insights", href: "/ai-insights", icon: Compass },
      ]
    },
    {
      title: "Analysis & Audio",
      items: [
        { name: "Audio Radio", href: "/audio-briefing", icon: Headphones, badge: "Voice" },
        { name: "World Regions", href: "/world-regions", icon: Globe },
        { name: "Topic Radar", href: "/topic-radar", icon: Activity },
        { name: "Media Index", href: "/media-index", icon: PieChart },
      ]
    },
    {
      title: "Verification & Tools",
      items: [
        { name: "Fact Checker", href: "/fact-checker", icon: ShieldCheck, badge: "99%" },
        { name: "Dossier Builder", href: "/dossier-builder", icon: FileText },
        { name: "News IQ Quiz", href: "/news-quiz", icon: HelpCircle },
        { name: "News Sources", href: "/news-sources", icon: BookOpen },
      ]
    },
    {
      title: "Personal Workspace",
      items: [
        { name: "Saved Articles", href: "/saved-articles", icon: Bookmark },
        { name: "Settings", href: "/settings", icon: Settings },
      ]
    }
  ];

  return (
    <aside
      className={`sticky top-[49px] h-[calc(100vh-49px)] flex flex-col justify-between border-r border-slate-200/90 bg-white/95 backdrop-blur-xl transition-all duration-300 z-30 flex-shrink-0 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Top Navigation Content */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!collapsed && (
              <p className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                {group.title}
              </p>
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.name : undefined}
                    className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/80 shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 flex-shrink-0 transition-colors ${
                        isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-700"
                      }`}
                    />

                    {!collapsed && (
                      <span className="flex-1 truncate">{item.name}</span>
                    )}

                    {!collapsed && item.badge && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold border ${
                          item.badgeColor || "bg-indigo-50 text-indigo-700 border-indigo-200"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Status & Toggle */}
      <div className="border-t border-slate-200/80 p-2.5 bg-slate-50/70">
        {!collapsed && (
          <div className="mb-2 rounded-lg border border-slate-200 bg-white p-2 text-[10px] shadow-xs">
            <div className="flex items-center justify-between text-slate-500 font-mono mb-1">
              <span className="flex items-center gap-1 font-bold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                NEURAL ENGINE
              </span>
              <span>v2.0</span>
            </div>
            <p className="text-slate-400 text-[9px] leading-tight">25+ Tier-1 Wire Feeds active</p>
          </div>
        )}

        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-all shadow-xs"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-3.5 w-3.5" />
              <span className="text-[11px]">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
