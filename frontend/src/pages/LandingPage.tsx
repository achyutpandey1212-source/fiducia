/**
 * World 1 + Antigravity Unified Visual Architecture:
 * Reverse-Engineered Sheryians Motion (Lenis Smooth Scroll + GSAP ScrollTrigger Parallax & Sticky Card Reveals)
 * + Alex Hormozi "$100M Grand Slam Offer" Value Equation & Direct-Response Copy
 * + Antigravity Deep Slate Color Hierarchy (#0D0E11 Canvas, #181B21 Elevated Slate Cards, #1A73E8 Electric Blue Intent)
 */

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import {
  ArrowRight,
  Check,
  X,
  ShieldCheck,
  Sliders,
  FileText,
  Lock,
  TrendingUp,
} from 'lucide-react';
import { formatInrCompact } from '../services/localQuantEngine';
import { User } from '../services/firebaseClient';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface LandingPageProps {
  currentUser: User | null;
}

export default function LandingPage({ currentUser }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const primaryDestination = currentUser ? '/workbench' : '/signup';
  const primaryCtaLabel = currentUser
    ? 'Open Adviser Workspace'
    : 'Start Adviser Practice';

  // Interactive Live ROI & Capacity Calculator (Hormozi Value Equation Proof)
  const [clientCount, setClientCount] = useState<number>(450);
  const [annualAdvisoryFeeInr, setAnnualAdvisoryFeeInr] = useState<number>(15000);

  const manualHoursPerYear = Math.round(clientCount * 4.5);
  const fiduciaHoursPerYear = Math.round((clientCount * 12) / 60);
  const hoursSavedPerYear = manualHoursPerYear - fiduciaHoursPerYear;
  const practiceAnnualRevenueInr = clientCount * annualAdvisoryFeeInr;
  const totalClientCommissionSavedInr = clientCount * 4208000;

  useGSAP(
    () => {
      // 1. Initialize Lenis Smooth Inertia Scrolling synced to GSAP Ticker (Sheryians DNA)
      const lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      const updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      // 2. Hero Masked Line Stagger Reveal
      gsap.from('.shery-hero-line', {
        yPercent: 105,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power4.out',
      });

      gsap.from('.shery-hero-preview', {
        y: 48,
        opacity: 0,
        duration: 1.0,
        delay: 0.35,
        ease: 'power3.out',
      });

      // 3. Parallax Drift on Hero Preview Window
      gsap.to('.shery-parallax-window', {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '.shery-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 4. Sheryians Signature Batch Reveal for Value Equation & Offer Stack Cards
      ScrollTrigger.batch('.shery-reveal-card', {
        start: 'top 86%',
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 40, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
              overwrite: true,
            }
          );
        },
      });

      return () => {
        gsap.ticker.remove(updateTicker);
        lenis.destroy();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="ag-workspace-root min-h-screen text-[#ECEEEF] font-manrope selection:bg-[#1A73E8] selection:text-white"
    >
      {/* =====================================================================
          FLOATING GLASS PILL NAVBAR (Sheryians Pill + Antigravity Slate/Blue)
      ===================================================================== */}
      <header
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-full px-6 py-3 flex items-center justify-between"
        style={{
          backgroundColor: 'rgba(19, 21, 25, 0.78)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255, 255, 255, 0.13)',
        }}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#20232B] border border-[#323642] flex items-center justify-center font-machina font-bold text-xs text-white">
            Λ
          </div>
          <span className="font-machina text-base font-bold tracking-tight text-white">
            Fiducia
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-xs text-[#9DA3AE]">
          <a href="#bottleneck" className="hover:text-white transition">
            The 150-Client Ceiling
          </a>
          <a href="#offer-stack" className="hover:text-white transition">
            The Grand Slam Stack
          </a>
          <a href="#roi-calculator" className="hover:text-white transition">
            Practice Revenue Math
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {!currentUser && (
            <Link
              to="/auth"
              className="text-xs text-[#9DA3AE] hover:text-white px-3 py-1.5 transition"
            >
              Adviser Sign In
            </Link>
          )}
          <Link
            to={primaryDestination}
            className="group ag-btn-blue px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 overflow-hidden"
          >
            <span className="relative flex flex-col h-4 overflow-hidden">
              <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full leading-4">
                {currentUser ? 'Open Workspace' : 'Get Started'}
              </span>
              <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full leading-4">
                {currentUser ? 'Open Workspace' : 'Get Started'}
              </span>
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION: CALL OUT THE AVATAR & THE GRAND SLAM PROMISE
      ===================================================================== */}
      <section className="shery-hero-section max-w-5xl mx-auto px-6 pt-36 pb-20">
        {/* Specific Audience Callout Pill */}
        <div className="overflow-hidden mb-5">
          <div className="shery-hero-line inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181B21] border border-[#2D323E] text-xs text-[#8AB4F8]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1A73E8]" />
            <span>
              Exclusively for Licensed SEBI Registered Investment Advisers (RIAs)
            </span>
          </div>
        </div>

        {/* Neue Machina Display Headline with Sheryians Line Masking */}
        <h1 className="font-machina text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.06] tracking-tight text-white max-w-4xl mb-6">
          <span className="block overflow-hidden">
            <span className="shery-hero-line block">
              Cut Client Plan Prep From
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="shery-hero-line block">
              <span className="text-[#636870] line-through">4.5 Hours</span> to{' '}
              <span className="text-[#8AB4F8]">12 Minutes.</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="shery-hero-line block">
              Scale Your Practice to 1,000 Families.
            </span>
          </span>
        </h1>

        <div className="overflow-hidden mb-9">
          <p className="shery-hero-line text-[#9DA3AE] text-base md:text-lg max-w-2xl leading-relaxed">
            India has 160 million mutual fund investors and fewer than 1,000 registered
            fiduciaries. Stop burning your billable hours building fragile Excel sheets,
            manually checking stock overlap, and hunting through 140-page scheme PDFs.
          </p>
        </div>

        {/* Primary CTA Row + Caveat Brush Handwritten Callout */}
        <div className="shery-hero-line flex flex-wrap items-center gap-4 mb-16">
          <Link
            to={primaryDestination}
            className="ag-btn-blue px-7 py-3.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg"
          >
            <span>{primaryCtaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {!currentUser && (
            <Link
              to="/auth"
              className="ag-soft-pill px-6 py-3.5 rounded-full text-sm font-medium"
            >
              Sign In to Adviser Portal
            </Link>
          )}

          <span className="font-caveat text-xl text-[#8AB4F8] ml-1">
            ← Built strictly for licensed fiduciary practices
          </span>
        </div>

        {/* INSTANT VISUAL CLARITY: Embedded Interactive Preview of the 3-Pane Workspace */}
        <div className="shery-hero-preview shery-parallax-window ag-panel-card overflow-hidden shadow-2xl">
          {/* Window Title Bar */}
          <div className="ag-panel-header px-4 py-2.5 flex items-center justify-between text-xs text-[#9DA3AE]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#323642]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#323642]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#323642]" />
              <span className="ml-2 font-mono text-[11px] text-white">
                Fiducia / Client Dossier / Rohit Sharma — Child Higher Education Plan
              </span>
            </div>
            <Link
              to={primaryDestination}
              className="text-[11px] text-[#8AB4F8] hover:underline font-medium"
            >
              {currentUser ? 'Open in Workspace →' : 'Sign in to access Workspace →'}
            </Link>
          </div>

          {/* 3-Column Visual Anatomy proving what the product does at first glance */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5 bg-[#131519]">
            <div className="bg-[#181B21] border border-[#282C37] rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-[#9DA3AE] mb-2">
                <span>Step 1: Two-Dimensional Risk Match</span>
                <Sliders className="w-3.5 h-3.5 text-[#8AB4F8]" />
              </div>
              <div className="font-machina text-2xl font-bold text-white mb-1">
                Capacity 45 vs. Comfort 90
              </div>
              <p className="text-xs text-[#9DA3AE] leading-relaxed">
                Client wants 90% equity, but loan EMIs consume 48% of take-home pay.
                Fiducia automatically clamps equity to{' '}
                <code className="ag-inline-code">25%</code> to prevent insolvency.
              </p>
            </div>

            <div className="bg-[#181B21] border border-[#282C37] rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-[#9DA3AE] mb-2">
                <span>Step 2: 8.5% Education Inflation &amp; Glide</span>
                <TrendingUp className="w-3.5 h-3.5 text-[#8AB4F8]" />
              </div>
              <div className="font-machina text-2xl font-bold text-white mb-1">
                +₹25.08 Lakhs Protected
              </div>
              <p className="text-xs text-[#9DA3AE] leading-relaxed">
                Standard 6% CPI tools underfund college tuition by ₹25L. Fiducia models
                category-specific inflation and shifts to{' '}
                <code className="ag-inline-code">0% Equity</code> in the final 12 months.
              </p>
            </div>

            <div className="bg-[#181B21] border border-[#282C37] rounded-xl p-4">
              <div className="flex items-center justify-between text-xs text-[#9DA3AE] mb-2">
                <span>Step 3: Cited Direct Basket &amp; Seal</span>
                <Lock className="w-3.5 h-3.5 text-[#8AB4F8]" />
              </div>
              <div className="font-machina text-2xl font-bold text-white mb-1">
                ₹42.08 Lakhs Fee Saved
              </div>
              <p className="text-xs text-[#9DA3AE] leading-relaxed">
                100% zero-commission Direct schemes with exact SID page citations{' '}
                <code className="ag-inline-code">[p. 14]</code> and a tamper-evident{' '}
                <code className="ag-inline-code">SHA-256</code> digital signature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: HORMOZI'S VALUE EQUATION & THE BRUTAL INDUSTRY MATH
      ===================================================================== */}
      <section id="bottleneck" className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8AB4F8]">
            The Brutal Unit Economics of Advisory
          </span>
          <h2 className="font-machina text-3xl md:text-4xl font-bold text-white tracking-tight mt-1">
            Why You Are Capped at 150 Families (And Leaving ₹1.2 Crore on the Table).
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: The Old Manual Way */}
          <div className="shery-reveal-card ag-panel-card p-6 md:p-7">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#262A34]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9DA3AE]">
                Manual Excel + PDF Workflow
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#2A1C1E] text-[#F87171] text-xs font-mono">
                4.5 Hours / Plan
              </span>
            </div>

            <ul className="space-y-3.5 text-xs text-[#9DA3AE]">
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-[#F87171] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">90 Mins in Fragmented Spreadsheets:</strong>{' '}
                  Re-typing cash flows, loan EMIs, and flat 6% inflation formulas that leave
                  families ₹25 Lakhs short on college admission day.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-[#F87171] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">120 Mins Hunting Scheme PDFs:</strong>{' '}
                  Manually opening 140-page AMFI SIDs to verify exit loads, expense ratios,
                  and hidden stock overlap across large-cap funds.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-[#F87171] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">60 Mins Writing Audit Rationales:</strong>{' '}
                  Typing manual suitability memos from scratch so you don&apos;t fail a 5-year
                  regulatory inspection.
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#262A34] flex items-center justify-between text-xs">
              <span className="text-[#636870]">Maximum Practice Capacity</span>
              <span className="font-mono font-bold text-[#F87171]">
                Hard-Capped at ~150 Clients
              </span>
            </div>
          </div>

          {/* Card 2: The Fiducia 12-Minute Way */}
          <div
            className="shery-reveal-card ag-panel-card p-6 md:p-7"
            style={{ borderColor: 'rgba(26, 115, 232, 0.45)' }}
          >
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#262A34]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8AB4F8]">
                The Fiducia 3-Pane Workspace
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#1A73E8]/20 text-[#8AB4F8] text-xs font-mono">
                12 Minutes / Plan
              </span>
            </div>

            <ul className="space-y-3.5 text-xs text-[#9DA3AE]">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8AB4F8] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">2-Minute Client Self-Intake Link:</strong>{' '}
                  Clients enter cash flows, EMIs, and drawdown comfort before the call. Balance
                  sheet math and capacity clamps resolve instantaneously.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8AB4F8] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Instant Direct Basket &amp; Page Citations:</strong>{' '}
                  Automatically screens 100% Direct plans, enforces &lt;45% stock overlap, and
                  cites exact scheme document page numbers on every answer.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#8AB4F8] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">1-Click Digital Signature &amp; PDF Dossier:</strong>{' '}
                  Review live sliders with the family, click Approve, stamp the plan with a
                  cryptographic SHA-256 hash, and export the client PDF in 1 second.
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#262A34] flex items-center justify-between text-xs">
              <span className="text-[#9DA3AE]">Unlocked Practice Capacity</span>
              <span className="font-mono font-bold text-[#8AB4F8]">
                1,000+ Active Client Families
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: THE "$100M GRAND SLAM OFFER" STACK (4 STACKED CARDS)
      ===================================================================== */}
      <section id="offer-stack" className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#8AB4F8]">
              Everything Inside One Workspace
            </span>
            <h2 className="font-machina text-3xl md:text-4xl font-bold text-white tracking-tight mt-1">
              The 4-Pillar Fiduciary Operating System
            </h2>
          </div>
          <span className="font-caveat text-xl text-[#8AB4F8]">
            Zero spreadsheets. Zero distributor commissions.
          </span>
        </div>

        <div className="space-y-4">
          {[
            {
              number: '01',
              title: 'Two-Dimensional Balance Sheet Risk Engine (Ability vs. Comfort)',
              problemSolved:
                'Stops overconfident borrowers (48% EMI-to-income) from gambling in 90% equities, while gently bridging cash-heavy doctors out of inflation-losing fixed deposits.',
              deliverable: 'Capacity Clamp + Inflation Shield Bridge',
            },
            {
              number: '02',
              title: 'Category-Specific Indian Inflation & 4-Phase Auto Safety Shift',
              problemSolved:
                'Models 8.5% college tuition and 9.5% medical inflation with 10% annual step-up SIPs, and automatically steps equity down to 0% in the final 12 months before payout.',
              deliverable: 'Sequence-of-Returns Crash Protection',
            },
            {
              number: '03',
              title: '100% Direct-Plan Portfolio Engine & March 2020 Crash Replay',
              problemSolved:
                'Audits pairwise stock overlap across schemes, proves how the portfolio weathered the -38.4% March 2020 crash, and quantifies exact 20-year broker commission savings.',
              deliverable: 'Saves ₹42.08 Lakhs Per Household',
            },
            {
              number: '04',
              title: 'Page-Cited Scheme Document Lookup & Tamper-Evident Digital Seal',
              problemSolved:
                'Answers exit load, TER, and Section 112A / 50AA tax queries with verbatim page citations, and locks client exports until signed with your SHA-256 adviser stamp.',
              deliverable: '5-Year Inspection-Ready Audit Trail',
            },
          ].map((pillar) => (
            <div
              key={pillar.number}
              className="shery-reveal-card ag-panel-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#3A4050] transition"
            >
              <div className="flex items-start gap-4 max-w-2xl">
                <span className="font-machina text-2xl font-bold text-[#8AB4F8] shrink-0">
                  {pillar.number}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#9DA3AE] leading-relaxed">
                    {pillar.problemSolved}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <code className="ag-inline-code px-3 py-1 text-xs">
                  {pillar.deliverable}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: LIVE INTERACTIVE PRACTICE REVENUE & TIME CALCULATOR
          (Lets the Adviser prove the offer math to themselves in 5 seconds)
      ===================================================================== */}
      <section id="roi-calculator" className="max-w-5xl mx-auto px-6 py-16">
        <div className="shery-reveal-card ag-panel-card p-7 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-[#262A34]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8AB4F8]">
                Do The Math On Your Own Practice
              </span>
              <h2 className="font-machina text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
                What Happens When Every Client Plan Takes 12 Minutes?
              </h2>
            </div>
            <Link
              to={primaryDestination}
              className="ag-btn-blue px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 shrink-0"
            >
              <span>{primaryCtaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 6 Cols: 2 Sliders */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#9DA3AE]">Active Client Households Managed</span>
                  <span className="font-mono font-bold text-white">
                    {clientCount} Families
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={25}
                  value={clientCount}
                  onChange={(e) => setClientCount(Number(e.target.value))}
                  className="ag-slider"
                />
                <div className="flex justify-between text-[11px] text-[#636870] mt-1 font-mono">
                  <span>50 (Solo Start)</span>
                  <span>150 (Manual Cap)</span>
                  <span>1,000 (Fiducia Scale)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#9DA3AE]">
                    Annual Flat Fiduciary Fee Per Family
                  </span>
                  <span className="font-mono font-bold text-white">
                    {formatInrCompact(annualAdvisoryFeeInr)} / year
                  </span>
                </div>
                <input
                  type="range"
                  min={6000}
                  max={50000}
                  step={1000}
                  value={annualAdvisoryFeeInr}
                  onChange={(e) => setAnnualAdvisoryFeeInr(Number(e.target.value))}
                  className="ag-slider"
                />
                <div className="flex justify-between text-[11px] text-[#636870] mt-1 font-mono">
                  <span>₹6,000/yr (Mass Affluent)</span>
                  <span>₹25,000/yr</span>
                  <span>₹50,000/yr (HNI)</span>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: 3 Concrete Business Outcomes */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="bg-[#131519] border border-[#262A34] rounded-xl p-4">
                <div className="text-[11px] text-[#9DA3AE]">Annual Practice Revenue</div>
                <div className="font-machina text-2xl font-bold text-white mt-1">
                  {formatInrCompact(practiceAnnualRevenueInr)}
                </div>
                <div className="text-[11px] text-[#8AB4F8] mt-1 font-mono">
                  100% Fee-Only Advisory
                </div>
              </div>

              <div className="bg-[#131519] border border-[#262A34] rounded-xl p-4">
                <div className="text-[11px] text-[#9DA3AE]">Adviser Hours Saved / Yr</div>
                <div className="font-machina text-2xl font-bold text-white mt-1">
                  {hoursSavedPerYear.toLocaleString('en-IN')} hrs
                </div>
                <div className="text-[11px] text-[#636870] mt-1 font-mono">
                  {fiduciaHoursPerYear}h vs {manualHoursPerYear}h manual
                </div>
              </div>

              <div className="bg-[#131519] border border-[#262A34] rounded-xl p-4">
                <div className="text-[11px] text-[#9DA3AE]">Client Commissions Saved</div>
                <div className="font-machina text-2xl font-bold text-[#10B981] mt-1">
                  {formatInrCompact(totalClientCommissionSavedInr)}
                </div>
                <div className="text-[11px] text-[#636870] mt-1 font-mono">
                  20-Yr Direct Plan Wealth
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER CTA: ZERO-FRICTION ENTRY
      ===================================================================== */}
      <footer className="max-w-5xl mx-auto px-6 pt-8 pb-20">
        <div className="ag-panel-card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-machina text-2xl md:text-3xl font-bold text-white tracking-tight">
              Don&apos;t Take Our Word For It. Audit a Live Dossier in 30 Seconds.
            </h3>
            <p className="text-xs text-[#9DA3AE] mt-1.5">
              Pre-loaded with 3 complete Indian household folios, 15 flagship Direct funds,
              and live March 2020 crash stress-testing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to={primaryDestination}
              className="ag-btn-blue px-6 py-3 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>{primaryCtaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {!currentUser && (
              <Link
                to="/auth"
                className="ag-soft-pill px-5 py-3 rounded-full text-xs font-medium"
              >
                Adviser Sign In
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#636870] gap-2">
          <span>Fiducia — Fiduciary Advisory Operating System</span>
          <span>Built for Registered Investment Advisers</span>
        </div>
      </footer>
    </div>
  );
}
