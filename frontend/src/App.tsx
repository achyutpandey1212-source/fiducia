import React from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="min-h-screen bg-void text-white flex flex-col">
      {/* Floating Glass Pill Navbar (Domain 09 Spec) */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl bg-[#00000066] backdrop-blur-[10px] border border-[#ffffff1a] rounded-[50px] px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-vermilion-500 animate-pulse" />
          <span className="font-machina text-lg tracking-tight font-bold">
            Fiducia <span className="text-zinc-500 font-normal text-sm">/ SEBI RIA OS</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-300">
          <span>100% Direct Plans</span>
          <span>SEBI Reg 17 & 19</span>
          <span>18ms Quant Core</span>
        </nav>
        <Link
          to="/workbench"
          className="px-4 py-1.5 rounded-full bg-vermilion-500 hover:bg-vermilion-600 text-white text-xs font-semibold transition"
        >
          Adviser Workbench →
        </Link>
      </header>

      {/* Main Hero & Phase 1 Status */}
      <main className="flex-1 max-w-5xl mx-auto px-6 pt-36 pb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-bentoBorder bg-bento text-xs text-vermilion-300 mb-6">
          <span>Phase 1 Architecture & Quant Core Initialized</span>
        </div>

        <h1 className="font-machina text-4xl md:text-6xl leading-[1.08] tracking-tight mb-6">
          Help 1,000 Indian Families Invest Safely—In{' '}
          <span className="text-vermilion-500">12 Minutes</span> Per Plan.
        </h1>

        <p className="text-zinc-400 text-lg max-w-2xl mb-12">
          Deterministic TypeScript Risk Capacity vs. Crash Comfort math, Segmented Indian
          Inflation Glide Paths, 15 Curated AMFI Direct-Plan Funds, and Cryptographic SHA-256
          SEBI Audit Seals.
        </p>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bento-surface rounded-2xl p-6">
            <div className="font-machina text-3xl text-vermilion-400 mb-2">&lt; 18 ms</div>
            <div className="text-sm font-medium text-white mb-1">
              Deterministic Quant Engine
            </div>
            <p className="text-xs text-zinc-400">
              Zero LLM math hallucinations. RC, RT, Capacity Clamp, and Inflation Shield Bridge
              compiled in pure TypeScript.
            </p>
          </div>

          <div className="bento-surface rounded-2xl p-6">
            <div className="font-machina text-3xl text-fiduciarySafe mb-2">₹42.08 Lakhs</div>
            <div className="text-sm font-medium text-white mb-1">
              Hidden Broker Commission Saved
            </div>
            <p className="text-xs text-zinc-400">
              100% AMFI Direct-Plan Growth screening with pairwise top-10 stock overlap shield.
            </p>
          </div>

          <div className="bento-surface rounded-2xl p-6">
            <div className="font-machina text-3xl text-fiduciaryWarning mb-2">HTTP 403</div>
            <div className="text-sm font-medium text-white mb-1">
              Cryptographic HITL Quarantine
            </div>
            <p className="text-xs text-zinc-400">
              Plans remain locked until reviewed and digitally stamped (SHA-256) by a licensed
              SEBI RIA.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
