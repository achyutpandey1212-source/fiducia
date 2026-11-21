/**
 * Screen 03: Client Fast Intake Flow (/intake)
 * Clean, distraction-free 3-step client onboarding form with zero internal lore.
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
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    <div className="ag-workspace-root min-h-screen flex flex-col justify-between px-4 py-8">
      {/* Top Header */}
      <div className="max-w-xl w-full mx-auto flex items-center justify-between">
        <Link
          to="/workbench"
          className="flex items-center gap-2 text-xs text-[#9DA3AE] hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Workspace</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#636870]">
          <img
            src="/logo/fiducia-logo.png"
            alt="Fiducia"
            className="w-4 h-4 object-contain rounded"
          />
          <span>Fiducia Client Onboarding</span>
        </div>
      </div>

      {/* Main Single-Column Card */}
      <div className="ag-panel-card max-w-xl w-full mx-auto my-auto p-6 md:p-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div
                className={`w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center ${
                  step >= s
                    ? 'ag-btn-blue'
                    : 'bg-[#14171D] text-[#636870] border border-[#262A34]'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    step > s ? 'bg-[#1A73E8]' : 'bg-[#252833]'
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
                <h1 className="text-lg font-semibold text-white tracking-tight">
                  Step 1: Household Cash Flow
                </h1>
                <p className="text-xs text-[#9DA3AE] mt-0.5">
                  Monthly income, living expenses, and active loan obligations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs text-[#9DA3AE] mb-1">
                    Client / Family Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., Ananya & Karthik Nair"
                    className="w-full bg-[#131519] border border-[#2A2E39] focus:border-[#1A73E8] rounded-lg px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9DA3AE] mb-1">
                    Primary Earner Age
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={85}
                    value={clientAge}
                    onChange={(e) => setClientAge(Number(e.target.value))}
                    className="w-full bg-[#131519] border border-[#2A2E39] focus:border-[#1A73E8] rounded-lg px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#9DA3AE]">Net Monthly Take-Home Income</span>
                  <span className="font-mono font-semibold text-white">
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
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#9DA3AE]">Monthly Household Living Expenses</span>
                  <span className="font-mono font-semibold text-white">
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
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#9DA3AE]">Total Monthly Loan EMIs</span>
                  <span className="font-mono font-semibold text-white">
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
                <label className="block text-xs text-[#9DA3AE] mb-1">
                  Employment &amp; Income Stability
                </label>
                <select
                  value={incomeStability}
                  onChange={(e) =>
                    setIncomeStability(e.target.value as IncomeStabilityTier)
                  }
                  className="w-full bg-[#131519] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="GOVERNMENT_PSU_TENURED">
                    Government / PSU / Tenured Corporate Role
                  </option>
                  <option value="SALARIED_MNC_PROFESSIONAL">
                    Salaried Private Enterprise / Established Practice
                  </option>
                  <option value="ESTABLISHED_BUSINESS_SME">
                    Business Owner / SME
                  </option>
                  <option value="FREELANCE_COMMISSION_FOUNDER">
                    Independent Consultant / Variable Income
                  </option>
                </select>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="ag-btn-blue px-5 py-2 rounded-full text-xs font-medium flex items-center gap-1.5"
                >
                  <span>Next: Savings &amp; Goal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h1 className="text-lg font-semibold text-white tracking-tight">
                  Step 2: Emergency Reserve &amp; Financial Goal
                </h1>
                <p className="text-xs text-[#9DA3AE] mt-0.5">
                  Existing liquid savings and target timeline.
                </p>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#9DA3AE]">
                    Liquid Savings (Bank Balance + Fixed Deposits)
                  </span>
                  <span className="font-mono font-semibold text-white">
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
                  <label className="block text-xs text-[#9DA3AE] mb-1">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className="w-full bg-[#131519] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#9DA3AE] mb-1">
                    Goal Category
                  </label>
                  <select
                    value={goalCategory}
                    onChange={(e) => setGoalCategory(e.target.value as GoalCategory)}
                    className="w-full bg-[#131519] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="CHILD_HIGHER_EDUCATION">
                      Child Higher Education (8.5% Infl.)
                    </option>
                    <option value="HEALTHCARE_MEDICAL_CORPUS">
                      Healthcare &amp; Medical Reserve (9.5% Infl.)
                    </option>
                    <option value="RETIREMENT_LIVING">
                      Retirement Living Corpus (6.0% Infl.)
                    </option>
                    <option value="REAL_ESTATE_HOME_DOWNPAYMENT">
                      Real Estate Downpayment (7.0% Infl.)
                    </option>
                    <option value="MILESTONE_DISCRETIONARY">
                      Family Milestone (6.0% Infl.)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#9DA3AE]">Current Cost of Goal Today</span>
                  <span className="font-mono font-semibold text-white">
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
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#9DA3AE]">Time Horizon</span>
                  <span className="font-mono font-semibold text-white">
                    {horizonYears} Years
                  </span>
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
                  className="ag-soft-pill px-4 py-2 rounded-full text-xs"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="ag-btn-blue px-5 py-2 rounded-full text-xs font-medium flex items-center gap-1.5"
                >
                  <span>Next: Risk Preferences</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h1 className="text-lg font-semibold text-white tracking-tight">
                  Step 3: Market Volatility Preferences
                </h1>
                <p className="text-xs text-[#9DA3AE] mt-0.5">
                  How the household responds to temporary market drawdowns.
                </p>
              </div>

              <div>
                <label className="block text-xs text-[#9DA3AE] mb-1.5">
                  1. If your portfolio dropped 25% during a market correction, how would you respond?
                </label>
                <select
                  value={drawdownReaction}
                  onChange={(e) =>
                    setDrawdownReaction(e.target.value as DrawdownReactionOption)
                  }
                  className="w-full bg-[#131519] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="PANIC_SELL_ALL">
                    Exit all investments immediately to prevent further loss
                  </option>
                  <option value="LIQUIDATE_HALF_TO_FD">
                    Move 50% into bank fixed deposits
                  </option>
                  <option value="HOLD_AND_MAINTAIN_SIP">
                    Stay invested and continue regular monthly SIPs
                  </option>
                  <option value="BUY_THE_DIP_AGGRESSIVELY">
                    Invest additional surplus to accumulate at lower levels
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#9DA3AE] mb-1.5">
                  2. Preferred balance between capital stability and growth:
                </label>
                <select
                  value={volatilityPreference}
                  onChange={(e) =>
                    setVolatilityPreference(e.target.value as VolatilityPreferenceOption)
                  }
                  className="w-full bg-[#131519] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="CAPITAL_PROTECTION_PRIORITY">
                    Prioritize capital preservation with steady returns
                  </option>
                  <option value="MODERATE_GROWTH_BALANCED">
                    Balanced growth with moderate fluctuations
                  </option>
                  <option value="HIGH_RETURN_HIGH_VOLATILITY">
                    Long-term equity growth despite short-term volatility
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#9DA3AE] mb-1.5">
                  3. Prior investing experience through market cycles:
                </label>
                <select
                  value={pastCrisisExperience}
                  onChange={(e) =>
                    setPastCrisisExperience(e.target.value as PastCrisisExperienceOption)
                  }
                  className="w-full bg-[#131519] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="PANICKED_SOLD_AT_LOSS">
                    Exited equity markets during a previous downturn
                  </option>
                  <option value="POST_2021_NO_CRASH_EXPERIENCE">
                    Began investing recently (post-2021)
                  </option>
                  <option value="STAYED_INVESTED_2008_OR_2020">
                    Stayed invested through the 2020 or 2008 market downturns
                  </option>
                </select>
              </div>

              <div className="pt-3 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="ag-soft-pill px-4 py-2 rounded-full text-xs"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="ag-btn-blue px-6 py-2 rounded-full text-xs font-medium flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Create Client Folio</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <div />
    </div>
  );
}
