/**
 * World 1 (Sheryians Editorial Obsidian Style): Public Marketing Landing Page (/)
 * Pitch-black void (#000000), Hairline Warm-Gray Micro-Borders (#302C2A),
 * Neue Machina display typography, and High-Contrast Warm Cream Tonal Break (#FFF3EC).
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  FileCheck2,
  Lock,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  BentoCard,
  CreamSection,
  MetricDisplay,
  CitationBadge,
} from '../components/ui/Primitives';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void text-white flex flex-col">
      {/* Floating Glass Pill Navbar */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl bg-[#00000080] backdrop-blur-[12px] border border-[#ffffff1a] rounded-[50px] px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-vermilion-500 animate-pulse" />
          <span className="font-machina text-lg tracking-tight font-bold">
            Fiducia <span className="text-zinc-500 font-normal text-xs">/ SEBI RIA OS</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-xs text-zinc-300">
          <a href="#pillars" className="hover:text-white transition">
            Fiduciary Architecture
          </a>
          <a href="#impact" className="hover:text-white transition">
            4.5 Hrs vs 12 Mins
          </a>
          <Link to="/intake" className="hover:text-white transition">
            Client 2-Min Intake
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 transition"
          >
            Sign In
          </Link>
          <Link
            to="/workbench"
            className="px-4 py-1.5 rounded-full bg-vermilion-500 hover:bg-vermilion-600 text-white text-xs font-semibold transition flex items-center gap-1.5"
          >
            <span>Open Workbench</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-6 pt-36 pb-24">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-bentoBorder bg-bento text-xs text-vermilion-300 mb-6">
          <ShieldCheck className="w-3.5 h-3.5 text-vermilion-500" />
          <span>Built for SEBI Registered Investment Advisers (Reg 16, 17 & 19)</span>
        </div>

        <h1 className="font-machina text-4xl md:text-6xl leading-[1.06] tracking-tight mb-6 max-w-4xl">
          Help 1,000 Indian Families Invest Safely—In{' '}
          <span className="text-vermilion-500">12 Minutes</span> Per Plan.
        </h1>

        <p className="text-zinc-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          India has 160 million active mutual fund folios, but fewer than 1,000 licensed SEBI
          RIAs. Replace 4.5 hours of manual Excel math, factsheet reading, and compliance audit
          notes with one deterministic, zero-hallucination fiduciary workspace.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link
            to="/workbench"
            className="px-7 py-3.5 rounded-full bg-vermilion-500 hover:bg-vermilion-600 text-white text-sm font-semibold transition flex items-center gap-2"
          >
            <span>Launch Adviser Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/intake"
            className="px-6 py-3.5 rounded-full bg-bento hover:bg-[#121212] border border-bentoBorder text-zinc-200 text-sm font-medium transition"
          >
            Try Client 2-Minute Fast Intake
          </Link>
          <Link
            to="/auth"
            className="px-5 py-3.5 text-xs text-zinc-400 hover:text-white transition"
          >
            Adviser Authentication →
          </Link>
        </div>

        {/* 3-Column Bento Grid */}
        <div id="pillars" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <BentoCard>
            <div className="w-9 h-9 rounded-xl bg-[#e8602e1a] border border-[#e8602e33] flex items-center justify-center mb-4">
              <Zap className="w-4 h-4 text-vermilion-400" />
            </div>
            <MetricDisplay
              value="< 18 ms"
              label="Deterministic TypeScript Quant Core"
              annotation="Zero LLM math hallucinations"
              accentColor="text-vermilion-400"
            />
            <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
              Decouples Financial Safety Cushion (RC) from Market Crash Comfort (RT).
              Automatically triggers the Capacity Clamp when EMIs exceed 35% of income.
            </p>
          </BentoCard>

          <BentoCard>
            <div className="w-9 h-9 rounded-xl bg-[#10b9811a] border border-[#10b98133] flex items-center justify-center mb-4">
              <TrendingUp className="w-4 h-4 text-fiduciarySafe" />
            </div>
            <MetricDisplay
              value="₹42.08 Lakhs"
              label="Broker Commission Saved Per Family"
              annotation="100% AMFI Direct-Plan Growth"
              accentColor="text-fiduciarySafe"
            />
            <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
              Eliminates the 1.20% annual distributor trail fee bleed on a standard ₹25k/mo
              SIP while screening out pairwise top-10 stock overlap across funds.
            </p>
          </BentoCard>

          <BentoCard>
            <div className="w-9 h-9 rounded-xl bg-[#f59e0b1a] border border-[#f59e0b33] flex items-center justify-center mb-4">
              <FileCheck2 className="w-4 h-4 text-fiduciaryWarning" />
            </div>
            <MetricDisplay
              value="100% Cited"
              label="Official AMFI SID & KIM Page Attribution"
              annotation="SHA-256 SEBI Reg 19 Audit Seal"
              accentColor="text-white"
            />
            <p className="text-xs text-zinc-400 mt-3 leading-relaxed mb-3">
              Every exit load, TER, and Section 112A / 50AA tax claim is verified against
              statutory PDFs with exact page numbers.
            </p>
            <CitationBadge
              docId="DOC-PPFAS-FLEXI-2026"
              pageNumber={14}
              schemeName="Parag Parikh Flexi Cap SID"
            />
          </BentoCard>
        </div>

        {/* High-Contrast Warm Cream Tonal Break Section (#FFF3EC) */}
        <CreamSection id="impact" className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-vermilion-500 text-white text-[11px] font-semibold uppercase tracking-wider mb-3">
                The Indian Fiduciary Bottleneck
              </span>
              <h2 className="font-machina text-2xl md:text-4xl font-bold text-inkOnCream tracking-tight">
                Why Middle-Class India Was Priced Out of SEBI RIAs—Until Now.
              </h2>
            </div>
            <p className="font-caveat text-xl text-vermilion-600">
              Scale from 150 to 1,000 families safely!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Old Manual Workflow */}
            <div className="bg-creamCard/70 border border-[#e5c7b5] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Legacy Manual RIA Practice
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-xs font-semibold">
                  4.5 Hours / Client
                </span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-800">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Naive 6% Flat Inflation Excel Sheets:</strong> Underfunds child
                    college education (8.5% actual inflation) by ₹25.08 Lakhs over 15 years.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Subjective Risk Questionnaires:</strong> Averages risk capacity and
                    willingness, putting indebted techies (48% EMI) into 90% volatile equities.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Hard Capacity Ceiling at 150 Clients:</strong> Forces advisers to
                    charge ₹25,000+/yr fees, excluding 98% of middle-class households.
                  </span>
                </li>
              </ul>
            </div>

            {/* Right: Fiducia 12-Minute Workflow */}
            <div className="bg-white border-2 border-vermilion-500 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-vermilion-600">
                  Fiducia Automated RIA Workbench
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  12 Minutes / Client
                </span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Segmented Inflation & Auto Safety Shift:</strong> Models 8.5%
                    education & 9.5% medical inflation with a 4-phase glide path to 0% equity
                    in the final year.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pre-Gen SEBI Firewall & HTTP 403 Quarantine:</strong> Blocks return
                    guarantees and locks every draft until reviewed and SHA-256 signed by the
                    RIA.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Serve 1,000 Families on ₹0 Cloud Cost:</strong> Sub-18ms local
                    quant math + multi-key AI failover pool running on 100% free tiers.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CreamSection>

        {/* Bottom CTA Banner */}
        <div className="bento-surface rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-fiduciarySafe font-medium mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>SEBI IA Regulation 19 Tamper-Evident Audit Ledger Ready</span>
            </div>
            <h3 className="font-machina text-xl md:text-2xl font-bold">
              Experience the Antigravity-Grade Adviser Workspace
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/workbench"
              className="px-6 py-3 rounded-full bg-vermilion-500 hover:bg-vermilion-600 text-white text-xs font-semibold transition flex items-center gap-2"
            >
              <span>Open Adviser Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
