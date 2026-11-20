/**
 * Fiducia — Core Financial & Regulatory Domain Types
 * Strictly aligned with SEBI (Investment Advisers) Regulations, 2013
 */

export type IncomeStabilityTier =
  | 'GOVERNMENT_PSU_TENURED'      // Score: 100
  | 'SALARIED_MNC_PROFESSIONAL'    // Score: 80
  | 'ESTABLISHED_BUSINESS_SME'     // Score: 50
  | 'FREELANCE_COMMISSION_FOUNDER'; // Score: 30

export type DrawdownReactionOption =
  | 'PANIC_SELL_ALL'               // Score: 10
  | 'LIQUIDATE_HALF_TO_FD'         // Score: 35
  | 'HOLD_AND_MAINTAIN_SIP'        // Score: 70
  | 'BUY_THE_DIP_AGGRESSIVELY';    // Score: 100

export type VolatilityPreferenceOption =
  | 'CAPITAL_PROTECTION_PRIORITY'  // Score: 20
  | 'MODERATE_GROWTH_BALANCED'     // Score: 60
  | 'HIGH_RETURN_HIGH_VOLATILITY'; // Score: 100

export type PastCrisisExperienceOption =
  | 'PANICKED_SOLD_AT_LOSS'        // Score: 10
  | 'POST_2021_NO_CRASH_EXPERIENCE'// Score: 50
  | 'STAYED_INVESTED_2008_OR_2020';// Score: 100

export type ConflictResolutionRule =
  | 'CAPACITY_CLAMP'               // RT - RC > 20 -> ERS = min(RT, RC)
  | 'INFLATION_SHIELD_BRIDGE'      // RC - RT > 20 -> ERS = RT + 0.30 * (RC - RT)
  | 'HARMONIOUS_ALIGNMENT';        // |RT - RC| <= 20 -> ERS = 0.60 * RC + 0.40 * RT

export type RiskCategory =
  | 'Ultra Conservative'
  | 'Conservative'
  | 'Balanced / Moderate'
  | 'Growth / Dynamic'
  | 'Aggressive Growth';

export interface AssetAllocation {
  equityPct: number;
  debtPct: number;
  liquidArbitragePct: number;
  goldPct: number;
}

export interface RiskCapacityInputs {
  netMonthlyIncomeInr: number;
  monthlyLivingExpensesInr: number;
  totalMonthlyEmiInr: number;
  liquidSavingsInr: number;
  primaryGoalHorizonYears: number;
  incomeStability: IncomeStabilityTier;
  clientAge: number;
}

export interface RiskToleranceInputs {
  drawdownReaction: DrawdownReactionOption;
  volatilityPreference: VolatilityPreferenceOption;
  pastCrisisExperience: PastCrisisExperienceOption;
}

export interface RiskEvaluationResult {
  riskCapacityScore: number;      // RC in [0, 100]
  riskToleranceScore: number;     // RT in [0, 100]
  effectiveRiskScore: number;     // ERS in [0, 100]
  conflictRuleTriggered: ConflictResolutionRule;
  conflictExplanation: string;    // Plain-language Indian RIA explanation
  riskCategory: RiskCategory;
  recommendedAllocation: AssetAllocation;
  metrics: {
    dtiRatio: number;
    dtiScore: number;
    runwayMonths: number;
    runwayScore: number;
    horizonScore: number;
    stabilityScore: number;
  };
  regulatoryClampsApplied: string[];
  executionTimeMs: number;
}

export type GoalCategory =
  | 'CHILD_HIGHER_EDUCATION'       // 8.5% annual inflation
  | 'HEALTHCARE_MEDICAL_CORPUS'    // 9.5% annual inflation
  | 'RETIREMENT_LIVING'            // 6.0% annual inflation
  | 'REAL_ESTATE_HOME_DOWNPAYMENT' // 7.0% annual inflation
  | 'MILESTONE_DISCRETIONARY';     // 6.0% annual inflation

export interface GoalPlanningInput {
  goalName: string;
  category: GoalCategory;
  presentCostInr: number;
  horizonYears: number;
  expectedPortfolioReturnCagr?: number; // Optional override, defaults to allocation weighted return
  stepUpRateAnnualPct?: number;         // Defaults to 10% (0.10)
}

export interface GlidePathStep {
  phaseName: string;
  yearsRemainingWindow: string;
  allocation: AssetAllocation;
  rationale: string;
}

export interface GoalProjectionResult {
  goalName: string;
  category: GoalCategory;
  presentCostInr: number;
  horizonYears: number;
  appliedInflationRatePct: number;
  naiveCpi6PctFutureValueInr: number;
  segmentedFutureValueInr: number;
  inflationShortfallPreventedInr: number;
  expectedPortfolioReturnPct: number;
  flatMonthlySipInr: number;
  stepUpInitialMonthlySipInr: number;
  stepUpAnnualIncreasePct: number;
  firstYearMonthlyCashflowSavedInr: number;
  currentGlidePathPhase: GlidePathStep;
  fullGlidePathSchedule: GlidePathStep[];
}

export interface DirectFundScheme {
  isin: string;
  schemeName: string;
  amcName: string;
  category:
    | 'LARGE_CAP_INDEX'
    | 'FLEXI_CAP'
    | 'MID_CAP'
    | 'SMALL_CAP'
    | 'DYNAMIC_BOND'
    | 'CORPORATE_BOND'
    | 'SHORT_DURATION_DEBT'
    | 'LIQUID'
    | 'ARBITRAGE'
    | 'OVERNIGHT'
    | 'GOLD_ETF'
    | 'MULTI_ASSET'
    | 'INTERNATIONAL_EQUITY';
  assetClass: 'EQUITY' | 'DEBT' | 'LIQUID_ARBITRAGE' | 'GOLD';
  directTerPct: number;
  regularTerPct: number;
  categoryMedianTerPct: number;
  rolling3YrBeatConsistencyPct: number;
  sortinoRatio: number;
  cagr3YrPct: number;
  cagr5YrPct: number;
  cagr10YrPct: number;
  topHoldings: Record<string, number>; // Stock/Instrument Symbol -> Portfolio Weight %
  docId: string;
}

export interface CommissionErosionResult {
  monthlySipInr: number;
  horizonYears: number;
  grossReturnCagrPct: number;
  directPlanTerPct: number;
  regularPlanTerPct: number;
  directFinalCorpusInr: number;
  regularFinalCorpusInr: number;
  totalCommissionSavedInr: number;
  wealthLossPercentageInRegular: number;
}
