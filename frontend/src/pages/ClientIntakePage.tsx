/**
 * Screen 03: Client 2-Minute Fast Intake Flow (/intake)
 * Distraction-free, 3-step progressive client discovery form that saves a new
 * ClientFolioRecord directly into the Antigravity Adviser Workspace.
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ClientFolioRecord,
  DrawdownReactionOption,
  GoalCategory,
  IncomeStabilityTier,
  PastCrisisExperienceOption,
  VolatilityPreferenceOption,
  formatInrCompact,
} from '../services/localQuantEngine';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ClientIntakePageProps {
  onAddClientFolio: (folio: ClientFolioRecord) => void;
}

export default function ClientIntakePage({ onAddClientFolio }: ClientIntakePageProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [clientName, setClientName] = useState('');
  const [clientAge, setClientAge] = useState(33);
  const [netMonthlyIncomeInr, setNetMonthlyIncomeInr] = useState(200000);
  const [monthlyLivingExpensesInr, setMonthlyLivingExpensesInr] = useState(70000);
  const [totalMonthlyEmiInr, setTotalMonthlyEmiInr] = useState(40000);
  const [incomeStability, setIncomeStability] = useState<IncomeStabilityTier>(
    'SALARIED_MNC_PROFESSIONAL'
  );

  const [liquidSavingsInr, setLiquidSavingsInr] = useState(450000);
  const [goalName, setGoalName] = useState('Child Higher Education Corpus');
  const [goalCategory, setGoalCategory] = useState<GoalCategory>('CHILD_HIGHER_EDUCATION');
  const [presentGoalCostInr, setPresentGoalCostInr] = useState(2500000);
  const [horizonYears, setHorizonYears] = useState(14);

  const [drawdownReaction, setDrawdownReaction] = useState<DrawdownReactionOption>(
    'HOLD_AND_MAINTAIN_SIP'
  );
  const [volatilityPreference, setVolatilityPreference] =
    useState<VolatilityPreferenceOption>('MODERATE_GROWTH_BALANCED');
  const [pastCrisisExperience, setPastCrisisExperience] =
    useState<PastCrisisExperienceOption>('POST_2021_NO_CRASH_EXPERIENCE');

  const handleCompleteIntake = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `folio_${Date.now().toString(36)}`;
    const newFolio: ClientFolioRecord = {
      id,
      clientName: clientName.trim() || 'Ananya & Karthik Nair',
      roleSubtitle: `${clientAge}yo Household • ${goalName}`,
      folderStatus: 'QUARANTINED',
      clientAge,
      netMonthlyIncomeInr,
      monthlyLivingExpensesInr,
      totalMonthlyEmiInr,
      liquidSavingsInr,
      incomeStability,
      goalName: goalName.trim() || 'Primary Family Goal',
      goalCategory,
      presentGoalCostInr,
      horizonYears,
      drawdownReaction,
      volatilityPreference,
      pastCrisisExperience,
      customEquityOverridePct: null,
    };

    onAddClientFolio(newFolio);
    navigate(`/workbench?folio=${id}`);
  };

  return (
    <div className="min-h-screen bg-agCanvas text-agTextPrimary flex flex-col justify-between px-4 py-8">
      {/* Top Header */}
      <div className="max-w-2xl w-full mx-auto flex items-center justify-between">
        <Link to="/workbench" className="flex items-center gap-2 text-xs text-agTextSecondary hover:text-white transition">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Adviser Workspace</span>
        </Link>
        <div className="inline-flex items-center gap-1.5 text-xs text-agTextSecondary">
          <ShieldCheck className="w-3.5 h-3.5 text-agBlue" />
          <span>SEBI Reg 16 & 17 Suitability Intake</span>
        </div>
      </div>

      {/* Main Single-Column Card */}
      <div className="max-w-xl w-full mx-auto my-8 bg-agPanel border border-agBorder rounded-2xl p-6 md:p-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div
                className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center ${
                  step >= s
                    ? 'bg-agBlue text-white'
                    : 'bg-agInput text-agTextMuted border border-agBorder'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    step > s ? 'bg-agBlue' : 'bg-agBorder'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleCompleteIntake}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Step 1: Household Cash Flow & Obligations
                </h1>
                <p className="text-xs text-agTextSecondary mt-0.5">
                  Used to compute your objective Financial Safety Cushion (Risk Capacity).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-agTextSecondary mb-1">
                    Client / Family Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., Ananya & Karthik Nair"
                    className="w-full bg-agInput border border-agBorder focus:border-agBlue rounded-lg px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-agTextSecondary mb-1">
                    Primary Earner Age
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={85}
                    value={clientAge}
                    onChange={(e) => setClientAge(Number(e.target.value))}
                    className="w-full bg-agInput border border-agBorder focus:border-agBlue rounded-lg px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-agTextSecondary">Net Monthly Take-Home Income</span>
                  <span className="font-semibold text-white">
                    {formatInrCompact(netMonthlyIncomeInr)} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={40000}
                  max={1000000}
                  step={5000}
                  value={netMonthlyIncomeInr}
                  onChange={(e) => setNetMonthlyIncomeInr(Number(e.target.value))}
                  className="ag-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-agTextSecondary">Monthly Household Living Expenses</span>
                  <span className="font-semibold text-white">
                    {formatInrCompact(monthlyLivingExpensesInr)} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={400000}
                  step={5000}
                  value={monthlyLivingExpensesInr}
                  onChange={(e) => setMonthlyLivingExpensesInr(Number(e.target.value))}
                  className="ag-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-agTextSecondary">
                    Total Monthly Loan EMIs (Home, Car, Personal)
                  </span>
                  <span className="font-semibold text-white">
                    {formatInrCompact(totalMonthlyEmiInr)} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={400000}
                  step={2500}
                  value={totalMonthlyEmiInr}
                  onChange={(e) => setTotalMonthlyEmiInr(Number(e.target.value))}
                  className="ag-slider"
                />
              </div>

              <div>
                <label className="block text-xs text-agTextSecondary mb-1">
                  Employment & Income Stability Tier
                </label>
                <select
                  value={incomeStability}
                  onChange={(e) =>
                    setIncomeStability(e.target.value as IncomeStabilityTier)
                  }
                  className="w-full bg-agInput border border-agBorder rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="GOVERNMENT_PSU_TENURED">
                    Government / PSU / Tenured Corporate Officer (100/100)
                  </option>
                  <option value="SALARIED_MNC_PROFESSIONAL">
                    Salaried Private MNC / Established Doctor or CA (80/100)
                  </option>
                  <option value="ESTABLISHED_BUSINESS_SME">
                    Established Business Owner / Tier-1 SME (50/100)
                  </option>
                  <option value="FREELANCE_COMMISSION_FOUNDER">
                    Freelancer / Commission-Driven / Startup Founder (30/100)
                  </option>
                </select>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2 rounded-full bg-agBlue hover:bg-agBlueHover text-white text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <span>Next: Savings & Family Goal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Step 2: Emergency Reserve & Primary Family Goal
                </h1>
                <p className="text-xs text-agTextSecondary mt-0.5">
                  Models segmented Indian inflation (8.5% Education, 9.5% Medical) and glide path.
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-agTextSecondary">
                    Liquid Emergency Savings (Bank A/c + Fixed Deposits)
                  </span>
                  <span className="font-semibold text-white">
                    {formatInrCompact(liquidSavingsInr)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000000}
                  step={50000}
                  value={liquidSavingsInr}
                  onChange={(e) => setLiquidSavingsInr(Number(e.target.value))}
                  className="ag-slider"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-agTextSecondary mb-1">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className="w-full bg-agInput border border-agBorder rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-agTextSecondary mb-1">
                    Segmented Inflation Category
                  </label>
                  <select
                    value={goalCategory}
                    onChange={(e) => setGoalCategory(e.target.value as GoalCategory)}
                    className="w-full bg-agInput border border-agBorder rounded-lg px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="CHILD_HIGHER_EDUCATION">
                      Child Higher Education (8.5% Infl.)
                    </option>
                    <option value="HEALTHCARE_MEDICAL_CORPUS">
                      Healthcare / Medical Fund (9.5% Infl.)
                    </option>
                    <option value="RETIREMENT_LIVING">
                      Retirement Living Corpus (6.0% Infl.)
                    </option>
                    <option value="REAL_ESTATE_HOME_DOWNPAYMENT">
                      Real Estate Downpayment (7.0% Infl.)
                    </option>
                    <option value="MILESTONE_DISCRETIONARY">
                      Family Milestone / Wedding (6.0% Infl.)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-agTextSecondary">Present Cost of Goal Today</span>
                  <span className="font-semibold text-white">
                    {formatInrCompact(presentGoalCostInr)}
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={30000000}
                  step={100000}
                  value={presentGoalCostInr}
                  onChange={(e) => setPresentGoalCostInr(Number(e.target.value))}
                  className="ag-slider"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-agTextSecondary">Years Remaining Until Goal Maturity</span>
                  <span className="font-semibold text-white">{horizonYears} Years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={25}
                  step={0.5}
                  value={horizonYears}
                  onChange={(e) => setHorizonYears(Number(e.target.value))}
                  className="ag-slider"
                />
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-full bg-agInput border border-agBorder text-xs text-agTextSecondary hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2 rounded-full bg-agBlue hover:bg-agBlueHover text-white text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <span>Next: Market Crash Comfort</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Step 3: Market Crash Comfort (Risk Tolerance)
                </h1>
                <p className="text-xs text-agTextSecondary mt-0.5">
                  3 plain-language behavioral checks to measure psychological drawdown composure.
                </p>
              </div>

              <div>
                <label className="block text-xs text-agTextSecondary mb-1.5">
                  1. If your ₹10 Lakh portfolio dropped to ₹7.5 Lakh (-25%) in 30 days during a market crash, what would you do?
                </label>
                <select
                  value={drawdownReaction}
                  onChange={(e) =>
                    setDrawdownReaction(e.target.value as DrawdownReactionOption)
                  }
                  className="w-full bg-agInput border border-agBorder rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="PANIC_SELL_ALL">
                    Sell everything immediately to prevent further loss (10 pts)
                  </option>
                  <option value="LIQUIDATE_HALF_TO_FD">
                    Sell 50% and move to safe bank Fixed Deposits (35 pts)
                  </option>
                  <option value="HOLD_AND_MAINTAIN_SIP">
                    Do nothing, continue monthly SIPs and wait for recovery (70 pts)
                  </option>
                  <option value="BUY_THE_DIP_AGGRESSIVELY">
                    Invest additional capital to buy the market dip (100 pts)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-agTextSecondary mb-1.5">
                  2. Which return vs. fluctuation trade-off matches your family philosophy?
                </label>
                <select
                  value={volatilityPreference}
                  onChange={(e) =>
                    setVolatilityPreference(e.target.value as VolatilityPreferenceOption)
                  }
                  className="w-full bg-agInput border border-agBorder rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="CAPITAL_PROTECTION_PRIORITY">
                    Capital protection priority with predictable, stable returns (20 pts)
                  </option>
                  <option value="MODERATE_GROWTH_BALANCED">
                    Balanced long-term growth with moderate temporary dips (60 pts)
                  </option>
                  <option value="HIGH_RETURN_HIGH_VOLATILITY">
                    Maximum long-term wealth expansion despite sharp swings (100 pts)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-agTextSecondary mb-1.5">
                  3. What was your actual behavior during past market crashes (e.g. March 2020 COVID)?
                </label>
                <select
                  value={pastCrisisExperience}
                  onChange={(e) =>
                    setPastCrisisExperience(e.target.value as PastCrisisExperienceOption)
                  }
                  className="w-full bg-agInput border border-agBorder rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="PANICKED_SOLD_AT_LOSS">
                    Panicked, exited equity funds at a loss, and stayed in FDs (10 pts)
                  </option>
                  <option value="POST_2021_NO_CRASH_EXPERIENCE">
                    Started investing after 2021 — have not experienced a major crash (50 pts)
                  </option>
                  <option value="STAYED_INVESTED_2008_OR_2020">
                    Stayed 100% disciplined through 2020 COVID or 2008 crash (100 pts)
                  </option>
                </select>
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-full bg-agInput border border-agBorder text-xs text-agTextSecondary hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-agBlue hover:bg-agBlueHover text-white text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Compute Fiduciary Plan in Workspace</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="text-center text-[11px] text-agTextMuted">
        Zero LLM Math • Instant Deterministic Risk Capacity & Segmented Inflation Evaluation
      </div>
    </div>
  );
}
