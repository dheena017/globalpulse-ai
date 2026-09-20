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
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, onClose }) => {
  const pathname = usePathname();

  const navGroups = [
    {
      title: "News & Wires",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: Sparkles, badge: "Live" },
        { name: "Live Wire", href: "/live-wire", icon: Radio, badge: "Breaking", badgeColor: "bg-rose-50 text-rose-700 border-rose-200" },
        { name: "Story Timeline", href: "/story-timeline", icon: Layers },
        { name: "AI Perspectives", href: "/ai-insights", icon: Compass },
      ]
    },
    {
      title: "Audio & Regions",
      items: [
        { name: "Audio News", href: "/audio-briefing", icon: Headphones, badge: "Listen" },
        { name: "World Map", href: "/world-regions", icon: Globe },
        { name: "Trending Topics", href: "/topic-radar", icon: Activity },
        { name: "Media Comparison", href: "/media-index", icon: PieChart },
      ]
    },
    {
      title: "Fact Check & Tools",
      items: [
        { name: "Fact Checker", href: "/fact-checker", icon: ShieldCheck, badge: "Verified" },
        { name: "Create Report", href: "/dossier-builder", icon: FileText },
        { name: "Weekly Quiz", href: "/news-quiz", icon: HelpCircle },
        { name: "Trusted Sources", href: "/news-sources", icon: BookOpen },
      ]
    },
    {
      title: "My Workspace",
      items: [
        { name: "Saved Articles", href: "/saved-articles", icon: Bookmark },
        { name: "Settings", href: "/settings", icon: Settings },
      ]
    }
  ];

  return (
    <aside
      className={`h-full flex flex-col justify-between border-r border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-[2px_0_12px_rgba(15,23,42,0.02)] transition-all duration-300 z-30 flex-shrink-0 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Mobile Top Header (only when onClose provided) */}
      {onClose && (
        <div className="flex md:hidden items-center justify-between px-3 py-2 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-900 font-heading">Menu</span>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Top Navigation Content */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-3.5">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!collapsed && (
              <p className="px-2.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
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
                        ? "bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-500/25"
                        : "text-slate-600 hover:bg-indigo-50/60 hover:text-indigo-700"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 flex-shrink-0 transition-colors ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-600"
                      }`}
                    />

                    {!collapsed && (
                      <span className="flex-1 truncate">{item.name}</span>
                    )}

                    {!collapsed && item.badge && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold border ${
                          isActive
                            ? "bg-indigo-700 text-white border-indigo-500"
                            : (item.badgeColor || "bg-indigo-50 text-indigo-700 border-indigo-200")
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
            <div className="flex items-center justify-between text-slate-500 font-mono mb-0.5">
              <span className="flex items-center gap-1 font-bold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE NEWS VERIFIER
              </span>
              <span className="text-slate-400">ACTIVE</span>
            </div>
            <p className="text-slate-500 text-[9px] leading-tight">25+ Global Bureaus Connected</p>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggle}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-all shadow-xs"
            title={collapsed ? "Expand Sidebar" : "Collapse to Icons"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="text-[11px]">Compact</span>
              </>
            )}
          </button>

          {!collapsed && onClose && (
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all shadow-xs"
              title="Close Sidebar Completely"
            >
              <span className="text-[11px]">Hide</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
