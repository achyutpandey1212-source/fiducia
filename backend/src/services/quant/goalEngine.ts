/**
 * Domain 03: Goal-Based Financial Modeling & Dynamic Glide Paths
 * Executes segmented Indian inflation modeling, Flat vs Step-Up SIPs,
 * and Sequence-of-Returns De-risking Glide Paths in < 1ms.
 */

import {
  GlidePathStep,
  GoalCategory,
  GoalPlanningInput,
  GoalProjectionResult,
} from '../../types/finance.types.js';

/**
 * 2. Segmented Indian Inflation Parameters (Annual Rate %)
 */
export const SEGMENTED_INFLATION_RATES: Record<GoalCategory, number> = {
  CHILD_HIGHER_EDUCATION: 8.5,       // 8.5% private university tuition & education inflation
  HEALTHCARE_MEDICAL_CORPUS: 9.5,    // 9.5% medical & hospital inflation in India
  RETIREMENT_LIVING: 6.0,            // 6.0% general household CPI basket
  REAL_ESTATE_HOME_DOWNPAYMENT: 7.0, // 7.0% urban residential property index
  MILESTONE_DISCRETIONARY: 6.0,      // 6.0% vehicles, travel, family milestones
};

/**
 * Computes Future Value (FV = PV * (1 + r_infl)^t)
 */
export function computeFutureValue(
  presentValueInr: number,
  annualInflationPct: number,
  horizonYears: number
): number {
  const rate = annualInflationPct / 100;
  const fv = presentValueInr * Math.pow(1 + rate, Math.max(0, horizonYears));
  return Math.round(fv);
}

/**
 * 3.1 Flat Monthly SIP Formulation
 * SIP_flat = (FV * i) / ((1 + i) * ((1 + i)^n - 1))
 */
export function computeFlatMonthlySip(
  targetFutureValueInr: number,
  annualExpectedReturnPct: number,
  horizonYears: number
): number {
  if (horizonYears <= 0 || targetFutureValueInr <= 0) return targetFutureValueInr;

  const nMonths = Math.round(horizonYears * 12);
  const monthlyRate = annualExpectedReturnPct / 100 / 12;

  if (monthlyRate <= 0) {
    return Math.round(targetFutureValueInr / nMonths);
  }

  const denominator = (1 + monthlyRate) * (Math.pow(1 + monthlyRate, nMonths) - 1);
  const sip = (targetFutureValueInr * monthlyRate) / denominator;
  return Math.round(sip);
}

/**
 * 3.2 Step-Up (Top-Up) Monthly SIP Formulation
 * Solves analytically for initial monthly SIP_1 given annual step-up rate `s` (default 10%):
 * Corpus_t = sum_{y=1..t} [ SIP_1 * (1 + s)^(y-1) * sum_{m=1..12} (1 + i)^(12*(t - y) + (13 - m)) ]
 */
export function computeStepUpInitialMonthlySip(
  targetFutureValueInr: number,
  annualExpectedReturnPct: number,
  horizonYears: number,
  annualStepUpPct: number = 10
): number {
  if (horizonYears <= 0 || targetFutureValueInr <= 0) return targetFutureValueInr;

  const totalYears = Math.max(1, Math.round(horizonYears));
  const monthlyRate = annualExpectedReturnPct / 100 / 12;
  const stepUpRate = annualStepUpPct / 100;

  let unitSipAccumulatedFactor = 0;

  for (let y = 1; y <= totalYears; y++) {
    const yearlyStepMultiplier = Math.pow(1 + stepUpRate, y - 1);
    let monthsFactor = 0;
    for (let m = 1; m <= 12; m++) {
      const remainingMonths = 12 * (totalYears - y) + (13 - m);
      monthsFactor += Math.pow(1 + monthlyRate, remainingMonths);
    }
    unitSipAccumulatedFactor += yearlyStepMultiplier * monthsFactor;
  }

  if (unitSipAccumulatedFactor <= 0) return 0;
  return Math.round(targetFutureValueInr / unitSipAccumulatedFactor);
}

/**
 * 4. Dynamic Step-Down Glide Path (Sequence of Returns Risk De-risking)
 */
export function getDynamicGlidePathSchedule(): GlidePathStep[] {
  return [
    {
      phaseName: 'Capital Accumulation Phase',
      yearsRemainingWindow: 't > 5 Years',
      allocation: {
        equityPct: 75,
        debtPct: 20,
        liquidArbitragePct: 0,
        goldPct: 5,
      },
      rationale:
        'Long compounding window allows maximum exposure to Direct Equity & Sovereign Gold for real wealth expansion.',
    },
    {
      phaseName: 'Systematic De-Risking Phase',
      yearsRemainingWindow: '3 < t <= 5 Years',
      allocation: {
        equityPct: 50,
        debtPct: 40,
        liquidArbitragePct: 10,
        goldPct: 0,
      },
      rationale:
        'Trims volatile mid/small-cap exposure and locks gains into Short-Duration Corporate Debt & Arbitrage.',
    },
    {
      phaseName: 'Capital Preservation Phase',
      yearsRemainingWindow: '1 < t <= 3 Years',
      allocation: {
        equityPct: 25,
        debtPct: 60,
        liquidArbitragePct: 15,
        goldPct: 0,
      },
      rationale:
        'Shields accumulated corpus from cyclical bear markets while optimizing LTCG tax harvesting under Sec 112A.',
    },
    {
      phaseName: '100% Capital Lock Phase',
      yearsRemainingWindow: 't <= 1 Year',
      allocation: {
        equityPct: 0,
        debtPct: 20,
        liquidArbitragePct: 80,
        goldPct: 0,
      },
      rationale:
        'Zero equity exposure. A -40% stock market crash in the final 12 months has 0.00% impact on goal payout. T+1 liquidity guaranteed.',
    },
  ];
}

/**
 * Resolves the active Glide Path Step for a specific remaining horizon (years)
 */
export function resolveActiveGlidePathStep(horizonYears: number): GlidePathStep {
  const schedule = getDynamicGlidePathSchedule();
  if (horizonYears > 5) return schedule[0];
  if (horizonYears > 3) return schedule[1];
  if (horizonYears > 1) return schedule[2];
  return schedule[3];
}

/**
 * Complete Goal Financial Modeling Pipeline
 */
export function evaluateFinancialGoal(input: GoalPlanningInput): GoalProjectionResult {
  const appliedInflationRatePct = SEGMENTED_INFLATION_RATES[input.category] ?? 6.0;
  const naiveCpi6PctFutureValueInr = computeFutureValue(
    input.presentCostInr,
    6.0,
    input.horizonYears
  );
  const segmentedFutureValueInr = computeFutureValue(
    input.presentCostInr,
    appliedInflationRatePct,
    input.horizonYears
  );
  const inflationShortfallPreventedInr = Math.max(
    0,
    segmentedFutureValueInr - naiveCpi6PctFutureValueInr
  );

  const currentGlidePathPhase = resolveActiveGlidePathStep(input.horizonYears);

  // Default expected portfolio return based on horizon phase if not explicitly passed
  const defaultExpectedReturnPct =
    input.horizonYears > 5
      ? 12.0
      : input.horizonYears > 3
      ? 10.0
      : input.horizonYears > 1
      ? 8.0
      : 6.8;

  const expectedPortfolioReturnPct =
    input.expectedPortfolioReturnCagr ?? defaultExpectedReturnPct;
  const stepUpAnnualIncreasePct = input.stepUpRateAnnualPct ?? 10.0;

  const flatMonthlySipInr = computeFlatMonthlySip(
    segmentedFutureValueInr,
    expectedPortfolioReturnPct,
    input.horizonYears
  );

  const stepUpInitialMonthlySipInr = computeStepUpInitialMonthlySip(
    segmentedFutureValueInr,
    expectedPortfolioReturnPct,
    input.horizonYears,
    stepUpAnnualIncreasePct
  );

  const firstYearMonthlyCashflowSavedInr = Math.max(
    0,
    flatMonthlySipInr - stepUpInitialMonthlySipInr
  );

  return {
    goalName: input.goalName,
    category: input.category,
    presentCostInr: input.presentCostInr,
    horizonYears: input.horizonYears,
    appliedInflationRatePct,
    naiveCpi6PctFutureValueInr,
    segmentedFutureValueInr,
    inflationShortfallPreventedInr,
    expectedPortfolioReturnPct,
    flatMonthlySipInr,
    stepUpInitialMonthlySipInr,
    stepUpAnnualIncreasePct,
    firstYearMonthlyCashflowSavedInr,
    currentGlidePathPhase,
    fullGlidePathSchedule: getDynamicGlidePathSchedule(),
  };
}
