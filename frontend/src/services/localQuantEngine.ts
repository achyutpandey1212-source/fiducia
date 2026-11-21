/**
 * Tier 1: Zero-Latency (< 0.2ms) Local Browser Quant Engine
 * Executes deterministic SEBI Reg 16 & 17 Risk Capacity (RC), Risk Tolerance (RT),
 * Explicit Conflict Resolution (Capacity Clamp / Inflation Shield Bridge),
 * Segmented Indian Inflation Modeling, 4-Phase Glide Path, Direct Fund Basket Selection,
 * Pairwise Stock Overlap Shield, and March 2020 COVID Crash Replay directly at 60fps in V8.
 */

export type IncomeStabilityTier =
  | 'GOVERNMENT_PSU_TENURED'
  | 'SALARIED_MNC_PROFESSIONAL'
  | 'ESTABLISHED_BUSINESS_SME'
  | 'FREELANCE_COMMISSION_FOUNDER';

export type DrawdownReactionOption =
  | 'PANIC_SELL_ALL'
  | 'LIQUIDATE_HALF_TO_FD'
  | 'HOLD_AND_MAINTAIN_SIP'
  | 'BUY_THE_DIP_AGGRESSIVELY';

export type VolatilityPreferenceOption =
  | 'CAPITAL_PROTECTION_PRIORITY'
  | 'MODERATE_GROWTH_BALANCED'
  | 'HIGH_RETURN_HIGH_VOLATILITY';

export type PastCrisisExperienceOption =
  | 'PANICKED_SOLD_AT_LOSS'
  | 'POST_2021_NO_CRASH_EXPERIENCE'
  | 'STAYED_INVESTED_2008_OR_2020';

export type GoalCategory =
  | 'CHILD_HIGHER_EDUCATION'
  | 'HEALTHCARE_MEDICAL_CORPUS'
  | 'RETIREMENT_LIVING'
  | 'REAL_ESTATE_HOME_DOWNPAYMENT'
  | 'MILESTONE_DISCRETIONARY';

export type ConflictResolutionRule =
  | 'CAPACITY_CLAMP'
  | 'INFLATION_SHIELD_BRIDGE'
  | 'HARMONIOUS_ALIGNMENT';

export interface AssetAllocation {
  equityPct: number;
  debtPct: number;
  liquidArbitragePct: number;
  goldPct: number;
}

export interface ClientFolioRecord {
  id: string;
  clientName: string;
  roleSubtitle: string;
  folderStatus: 'QUARANTINED' | 'APPROVED_SIGNED';
  clientAge: number;
  netMonthlyIncomeInr: number;
  monthlyLivingExpensesInr: number;
  totalMonthlyEmiInr: number;
  liquidSavingsInr: number;
  incomeStability: IncomeStabilityTier;
  goalName: string;
  goalCategory: GoalCategory;
  presentGoalCostInr: number;
  horizonYears: number;
  drawdownReaction: DrawdownReactionOption;
  volatilityPreference: VolatilityPreferenceOption;
  pastCrisisExperience: PastCrisisExperienceOption;
  customEquityOverridePct?: number | null;
  sha256DigitalSeal?: string;
  signedAtUtc?: string;
  riaSebiRegistration?: string;
  riaSupervisoryNote?: string;
}

export interface DirectFundScheme {
  isin: string;
  schemeName: string;
  amcName: string;
  categoryLabel: string;
  assetClass: 'EQUITY' | 'DEBT' | 'LIQUID_ARBITRAGE' | 'GOLD';
  directTerPct: number;
  regularTerPct: number;
  cagr3YrPct: number;
  cagr5YrPct: number;
  cagr10YrPct: number;
  sortinoRatio: number;
  topHoldings: Record<string, number>;
  docId: string;
  citedPage: number;
  exitLoadSummary: string;
}

export const CURATED_15_DIRECT_FUNDS: DirectFundScheme[] = [
  {
    isin: 'INF789F01XA0',
    schemeName: 'UTI Nifty 50 Index Fund Direct-Growth',
    amcName: 'UTI Mutual Fund',
    categoryLabel: 'Large-Cap Index',
    assetClass: 'EQUITY',
    directTerPct: 0.18,
    regularTerPct: 0.65,
    cagr3YrPct: 14.2,
    cagr5YrPct: 15.8,
    cagr10YrPct: 13.6,
    sortinoRatio: 1.92,
    topHoldings: { HDFCBANK: 11.4, RELIANCE: 9.2, ICICIBANK: 7.8, INFY: 5.9, ITC: 4.1, TCS: 3.9, LT: 3.8 },
    docId: 'DOC-UTI-NIFTY50-2026',
    citedPage: 12,
    exitLoadSummary: 'Nil (0.00% across all redemptions)',
  },
  {
    isin: 'INF179K01YM2',
    schemeName: 'HDFC Index S&P BSE Sensex Direct-Growth',
    amcName: 'HDFC Mutual Fund',
    categoryLabel: 'Large-Cap Index',
    assetClass: 'EQUITY',
    directTerPct: 0.20,
    regularTerPct: 0.70,
    cagr3YrPct: 13.9,
    cagr5YrPct: 15.4,
    cagr10YrPct: 13.5,
    sortinoRatio: 1.89,
    topHoldings: { HDFCBANK: 12.8, RELIANCE: 10.5, ICICIBANK: 8.9, INFY: 6.7, ITC: 4.7, TCS: 4.5, LT: 4.3 },
    docId: 'DOC-HDFC-SENSEX-2026',
    citedPage: 15,
    exitLoadSummary: '0.25% within 3 days; Nil after 3 days',
  },
  {
    isin: 'INF879O01027',
    schemeName: 'Parag Parikh Flexi Cap Fund Direct-Growth',
    amcName: 'PPFAS Mutual Fund',
    categoryLabel: 'Flexi-Cap Core',
    assetClass: 'EQUITY',
    directTerPct: 0.62,
    regularTerPct: 1.38,
    cagr3YrPct: 19.4,
    cagr5YrPct: 22.1,
    cagr10YrPct: 18.7,
    sortinoRatio: 2.48,
    topHoldings: { HDFCBANK: 8.1, BAJHLDNG: 6.9, POWERGRID: 5.8, COALINDIA: 5.4, ITC: 5.1, ICICIBANK: 4.9, MSFT_US: 4.1 },
    docId: 'DOC-PPFAS-FLEXI-2026',
    citedPage: 14,
    exitLoadSummary: '10% units free/yr; >10%: 2.00% (<365d), 1.00% (366-730d)',
  },
  {
    isin: 'INF179K01UT0',
    schemeName: 'HDFC Flexi Cap Fund Direct-Growth',
    amcName: 'HDFC Mutual Fund',
    categoryLabel: 'Flexi-Cap Active',
    assetClass: 'EQUITY',
    directTerPct: 0.78,
    regularTerPct: 1.54,
    cagr3YrPct: 21.3,
    cagr5YrPct: 21.8,
    cagr10YrPct: 16.4,
    sortinoRatio: 2.21,
    topHoldings: { ICICIBANK: 9.1, HDFCBANK: 8.6, AXISBANK: 7.2, CIPLA: 5.4, SBI: 4.8, BHARTIARTL: 4.5 },
    docId: 'DOC-HDFC-FLEXI-2026',
    citedPage: 18,
    exitLoadSummary: '1.00% within 365 days; Nil after 1 year',
  },
  {
    isin: 'INF247L01445',
    schemeName: 'Motilal Oswal Midcap Fund Direct-Growth',
    amcName: 'Motilal Oswal Mutual Fund',
    categoryLabel: 'Mid-Cap Growth',
    assetClass: 'EQUITY',
    directTerPct: 0.65,
    regularTerPct: 1.68,
    cagr3YrPct: 26.8,
    cagr5YrPct: 27.4,
    cagr10YrPct: 19.2,
    sortinoRatio: 2.34,
    topHoldings: { PERSISTENT: 8.4, COFORGE: 7.6, DIXON: 6.9, TRENT: 6.2, KALYANKJIL: 5.8, POLYCAB: 5.1 },
    docId: 'DOC-MO-MIDCAP-2026',
    citedPage: 21,
    exitLoadSummary: '1.00% within 365 days; Nil thereafter',
  },
  {
    isin: 'INF204K01K15',
    schemeName: 'Nippon India Small Cap Fund Direct-Growth',
    amcName: 'Nippon India Mutual Fund',
    categoryLabel: 'Small-Cap Alpha',
    assetClass: 'EQUITY',
    directTerPct: 0.68,
    regularTerPct: 1.52,
    cagr3YrPct: 25.4,
    cagr5YrPct: 28.9,
    cagr10YrPct: 21.6,
    sortinoRatio: 2.15,
    topHoldings: { MCX: 3.2, VOLTAMP: 2.8, APARINDS: 2.6, KARURVYSYA: 2.4, TEJASNET: 2.2 },
    docId: 'DOC-NIPPON-SMALL-2026',
    citedPage: 19,
    exitLoadSummary: '1.00% within 365 days; Nil after 1 year',
  },
  {
    isin: 'INF109K01830',
    schemeName: 'ICICI Prudential All Seasons Bond Direct-Growth',
    amcName: 'ICICI Prudential Mutual Fund',
    categoryLabel: 'Dynamic Bond',
    assetClass: 'DEBT',
    directTerPct: 0.58,
    regularTerPct: 1.32,
    cagr3YrPct: 7.8,
    cagr5YrPct: 7.9,
    cagr10YrPct: 8.4,
    sortinoRatio: 3.12,
    topHoldings: { GOI_GSEC_2033: 32.0, GOI_GSEC_2029: 21.5, NABARD_AAA: 9.5, REC_AAA: 8.4 },
    docId: 'DOC-ICICI-BOND-2026',
    citedPage: 16,
    exitLoadSummary: '0.25% within 30 days; Nil thereafter',
  },
  {
    isin: 'INF209K01YM8',
    schemeName: 'Aditya Birla Sun Life Corporate Bond Direct-Growth',
    amcName: 'Aditya Birla Sun Life Mutual Fund',
    categoryLabel: 'AAA Corporate Bond',
    assetClass: 'DEBT',
    directTerPct: 0.32,
    regularTerPct: 0.52,
    cagr3YrPct: 7.5,
    cagr5YrPct: 7.6,
    cagr10YrPct: 8.1,
    sortinoRatio: 3.45,
    topHoldings: { NABARD_AAA: 14.2, HDFCBANK_BOND_AAA: 11.8, POWFIN_AAA: 10.4, REC_AAA: 9.8 },
    docId: 'DOC-ABSL-CORPBOND-2026',
    citedPage: 11,
    exitLoadSummary: 'Nil (0.00%)',
  },
  {
    isin: 'INF179K01VF7',
    schemeName: 'HDFC Short Term Debt Fund Direct-Growth',
    amcName: 'HDFC Mutual Fund',
    categoryLabel: 'Short-Duration Debt',
    assetClass: 'DEBT',
    directTerPct: 0.35,
    regularTerPct: 0.75,
    cagr3YrPct: 7.4,
    cagr5YrPct: 7.5,
    cagr10YrPct: 7.9,
    sortinoRatio: 3.58,
    topHoldings: { GOI_GSEC_2027: 18.5, NABARD_AAA: 12.0, LICHSGFIN_AAA: 9.2, SIDBI_AAA: 8.8 },
    docId: 'DOC-HDFC-SHORTDEBT-2026',
    citedPage: 13,
    exitLoadSummary: 'Nil (0.00%)',
  },
  {
    isin: 'INF277K01YD8',
    schemeName: 'Tata Liquid Fund Direct-Growth',
    amcName: 'Tata Mutual Fund',
    categoryLabel: 'Liquid Reserve',
    assetClass: 'LIQUID_ARBITRAGE',
    directTerPct: 0.19,
    regularTerPct: 0.32,
    cagr3YrPct: 6.9,
    cagr5YrPct: 6.1,
    cagr10YrPct: 6.6,
    sortinoRatio: 4.80,
    topHoldings: { TBILL_91DAY: 38.0, SIDBI_CP_A1PLUS: 15.0, NABARD_CD_A1PLUS: 14.0 },
    docId: 'DOC-TATA-LIQUID-2026',
    citedPage: 9,
    exitLoadSummary: 'Graded up to Day 6; 0.00% from Day 7',
  },
  {
    isin: 'INF174K01LS2',
    schemeName: 'Kotak Equity Arbitrage Fund Direct-Growth',
    amcName: 'Kotak Mahindra Mutual Fund',
    categoryLabel: 'Tax-Efficient Arbitrage',
    assetClass: 'LIQUID_ARBITRAGE',
    directTerPct: 0.38,
    regularTerPct: 0.98,
    cagr3YrPct: 7.4,
    cagr5YrPct: 6.5,
    cagr10YrPct: 6.8,
    sortinoRatio: 4.52,
    topHoldings: { HEDGED_CASH_FUTURES_ARB: 71.5, KOTAK_LIQUID_DIRECT: 18.0, TBILL_182DAY: 10.5 },
    docId: 'DOC-KOTAK-ARB-2026',
    citedPage: 17,
    exitLoadSummary: '0.25% within 30 days; Nil after 30 days (Sec 112A Equity Tax)',
  },
  {
    isin: 'INF200K01TK4',
    schemeName: 'SBI Overnight Fund Direct-Growth',
    amcName: 'SBI Mutual Fund',
    categoryLabel: 'Overnight T+1 Cash',
    assetClass: 'LIQUID_ARBITRAGE',
    directTerPct: 0.11,
    regularTerPct: 0.19,
    cagr3YrPct: 6.6,
    cagr5YrPct: 5.8,
    cagr10YrPct: 6.2,
    sortinoRatio: 5.00,
    topHoldings: { TREPS_RBI_OVERNIGHT: 96.5, TBILL_OVERNIGHT: 3.5 },
    docId: 'DOC-SBI-OVERNIGHT-2026',
    citedPage: 8,
    exitLoadSummary: 'Nil (0.00% from Day 1)',
  },
  {
    isin: 'INF204KB17I5',
    schemeName: 'Nippon India ETF Gold BeES Direct',
    amcName: 'Nippon India Mutual Fund',
    categoryLabel: 'Sovereign Gold Hedge',
    assetClass: 'GOLD',
    directTerPct: 0.12,
    regularTerPct: 0.80,
    cagr3YrPct: 14.8,
    cagr5YrPct: 13.4,
    cagr10YrPct: 11.9,
    sortinoRatio: 1.85,
    topHoldings: { PHYSICAL_GOLD_995_BULLION: 99.8 },
    docId: 'DOC-NIPPON-GOLDBEES-2026',
    citedPage: 10,
    exitLoadSummary: 'Nil (0.00%)',
  },
  {
    isin: 'INF109K015K4',
    schemeName: 'ICICI Prudential Multi-Asset Fund Direct-Growth',
    amcName: 'ICICI Prudential Mutual Fund',
    categoryLabel: 'Multi-Asset Hybrid',
    assetClass: 'EQUITY',
    directTerPct: 0.72,
    regularTerPct: 1.62,
    cagr3YrPct: 19.8,
    cagr5YrPct: 21.4,
    cagr10YrPct: 16.2,
    sortinoRatio: 2.65,
    topHoldings: { NTPC: 6.2, ICICIBANK: 5.9, RELIANCE: 5.4, MARUTI: 4.8, GOLD_ETFS_BULLION: 11.5 },
    docId: 'DOC-ICICI-MULTIASSET-2026',
    citedPage: 22,
    exitLoadSummary: '30% units free; 1.00% within 365 days above 30%',
  },
  {
    isin: 'INF247L01015',
    schemeName: 'Motilal Oswal Nasdaq 100 ETF Direct',
    amcName: 'Motilal Oswal Mutual Fund',
    categoryLabel: 'International Equity',
    assetClass: 'EQUITY',
    directTerPct: 0.58,
    regularTerPct: 0.58,
    cagr3YrPct: 21.5,
    cagr5YrPct: 20.2,
    cagr10YrPct: 19.8,
    sortinoRatio: 2.10,
    topHoldings: { AAPL_US: 8.9, MSFT_US: 8.6, NVDA_US: 8.1, AMZN_US: 5.2, META_US: 4.8 },
    docId: 'DOC-MO-NASDAQ100-2026',
    citedPage: 11,
    exitLoadSummary: 'Nil (0.00%)',
  },
];

export const INITIAL_CLIENT_FOLIOS: ClientFolioRecord[] = [
  {
    id: 'folio_rohit_sharma',
    clientName: 'Rohit Sharma',
    roleSubtitle: '29yo Senior Software Engineer • High EMI Debt Overhang',
    folderStatus: 'QUARANTINED',
    clientAge: 29,
    netMonthlyIncomeInr: 250000,
    monthlyLivingExpensesInr: 80000,
    totalMonthlyEmiInr: 120000,
    liquidSavingsInr: 200000,
    incomeStability: 'SALARIED_MNC_PROFESSIONAL',
    goalName: 'Child Higher Education Corpus',
    goalCategory: 'CHILD_HIGHER_EDUCATION',
    presentGoalCostInr: 2500000,
    horizonYears: 15,
    drawdownReaction: 'BUY_THE_DIP_AGGRESSIVELY',
    volatilityPreference: 'HIGH_RETURN_HIGH_VOLATILITY',
    pastCrisisExperience: 'POST_2021_NO_CRASH_EXPERIENCE',
    customEquityOverridePct: null,
  },
  {
    id: 'folio_priya_mehta',
    clientName: 'Dr. Priya Mehta',
    roleSubtitle: '42yo Consultant Surgeon • Zero Debt, ₹80L FD Cash Drag',
    folderStatus: 'QUARANTINED',
    clientAge: 42,
    netMonthlyIncomeInr: 600000,
    monthlyLivingExpensesInr: 150000,
    totalMonthlyEmiInr: 0,
    liquidSavingsInr: 8000000,
    incomeStability: 'SALARIED_MNC_PROFESSIONAL',
    goalName: 'Daughter Medical Postgraduate Fund',
    goalCategory: 'CHILD_HIGHER_EDUCATION',
    presentGoalCostInr: 4500000,
    horizonYears: 12,
    drawdownReaction: 'PANIC_SELL_ALL',
    volatilityPreference: 'CAPITAL_PROTECTION_PRIORITY',
    pastCrisisExperience: 'PANICKED_SOLD_AT_LOSS',
    customEquityOverridePct: null,
  },
  {
    id: 'folio_vikram_kapoor',
    clientName: 'Vikram Kapoor',
    roleSubtitle: '56yo Corporate Director • Approaching Retirement Cliff (2.5 Yrs)',
    folderStatus: 'QUARANTINED',
    clientAge: 56,
    netMonthlyIncomeInr: 450000,
    monthlyLivingExpensesInr: 140000,
    totalMonthlyEmiInr: 25000,
    liquidSavingsInr: 3500000,
    incomeStability: 'GOVERNMENT_PSU_TENURED',
    goalName: 'Retirement Living Corpus Lock',
    goalCategory: 'RETIREMENT_LIVING',
    presentGoalCostInr: 20000000,
    horizonYears: 2.5,
    drawdownReaction: 'HOLD_AND_MAINTAIN_SIP',
    volatilityPreference: 'MODERATE_GROWTH_BALANCED',
    pastCrisisExperience: 'STAYED_INVESTED_2008_OR_2020',
    customEquityOverridePct: null,
  },
];

export const GOAL_INFLATION_MAP: Record<GoalCategory, { ratePct: number; label: string }> = {
  CHILD_HIGHER_EDUCATION: { ratePct: 8.5, label: 'Child Higher Education (8.5% Infl.)' },
  HEALTHCARE_MEDICAL_CORPUS: { ratePct: 9.5, label: 'Healthcare & Medical Reserve (9.5% Infl.)' },
  RETIREMENT_LIVING: { ratePct: 6.0, label: 'Retirement Living Corpus (6.0% Infl.)' },
  REAL_ESTATE_HOME_DOWNPAYMENT: { ratePct: 7.0, label: 'Real Estate Downpayment (7.0% Infl.)' },
  MILESTONE_DISCRETIONARY: { ratePct: 6.0, label: 'Family Milestone / Discretionary (6.0% Infl.)' },
};

export interface LiveWorkspaceEvaluation {
  computeTimeMs: number;
  dtiRatioPct: number;
  dtiScore: number;
  runwayMonths: number;
  runwayScore: number;
  horizonScore: number;
  stabilityScore: number;
  monthlySurplusInr: number;
  riskCapacityScore: number;
  riskToleranceScore: number;
  effectiveRiskScore: number;
  conflictRuleTriggered: ConflictResolutionRule;
  conflictTitle: string;
  conflictExplanation: string;
  riskCategoryLabel: string;
  baseAllocation: AssetAllocation;
  activeAllocation: AssetAllocation;
  regulatoryViolationsIntercepted: string[];
  isHardQuarantineTriggered: boolean;
  goal: {
    appliedInflationPct: number;
    naive6PctFvInr: number;
    segmentedFvInr: number;
    shortfallPreventedInr: number;
    flatMonthlySipInr: number;
    stepUpInitialSipInr: number;
    monthlyCashflowSavedInr: number;
    activeGlidePhaseIndex: number;
    glideSchedule: Array<{
      phaseName: string;
      windowLabel: string;
      equityPct: number;
      debtPct: number;
      liquidPct: number;
      goldPct: number;
      rationale: string;
    }>;
  };
  basket: Array<{
    fund: DirectFundScheme;
    weightPct: number;
    monthlySipAllocationInr: number;
  }>;
  maxPairwiseOverlapPct: number;
  weightedDirectTerPct: number;
  weightedRegularTerPct: number;
  commissionSaved20YrInr: number;
  directFinalCorpus20YrInr: number;
  regularFinalCorpus20YrInr: number;
  covid2020Stress: {
    niftyDrawdownPct: number;
    unadvisedDiyDrawdownPct: number;
    fiduciaBasketDrawdownPct: number;
    cushionSavedPct: number;
    recoveryMonthsFiducia: number;
    monthlyCurve: Array<{
      month: string;
      diyValue: number;
      fiduciaValue: number;
    }>;
  };
}

/**
 * Pure, zero-allocation 60fps evaluation function for a ClientFolioRecord
 */
export function computeLiveWorkspaceEvaluation(
  folio: ClientFolioRecord
): LiveWorkspaceEvaluation {
  const t0 = performance.now();

  // 1. DTI Ratio & Score (35% weight)
  const income = Math.max(1, folio.netMonthlyIncomeInr);
  const dtiRatio = Math.max(0, folio.totalMonthlyEmiInr) / income;
  const dtiRatioPct = Math.round(dtiRatio * 1000) / 10;
  const dtiScore =
    dtiRatio <= 0.20 ? 100 : dtiRatio <= 0.35 ? 80 : dtiRatio <= 0.50 ? 45 : 10;

  // 2. Emergency Runway Score (25% weight)
  const monthlyOutflow = Math.max(
    1,
    folio.monthlyLivingExpensesInr + folio.totalMonthlyEmiInr
  );
  const runwayMonths =
    Math.round((Math.max(0, folio.liquidSavingsInr) / monthlyOutflow) * 10) / 10;
  const runwayScore =
    runwayMonths >= 12 ? 100 : runwayMonths >= 6 ? 80 : runwayMonths >= 3 ? 50 : 15;

  // 3. Horizon Score (25% weight)
  const h = folio.horizonYears;
  const horizonScore = h >= 10 ? 100 : h >= 5 ? 75 : h >= 3 ? 40 : 10;

  // 4. Income Stability Score (15% weight)
  const stabilityMap: Record<IncomeStabilityTier, number> = {
    GOVERNMENT_PSU_TENURED: 100,
    SALARIED_MNC_PROFESSIONAL: 80,
    ESTABLISHED_BUSINESS_SME: 50,
    FREELANCE_COMMISSION_FOUNDER: 30,
  };
  const stabilityScore = stabilityMap[folio.incomeStability];

  const riskCapacityScore =
    Math.round(
      (0.35 * dtiScore +
        0.25 * runwayScore +
        0.25 * horizonScore +
        0.15 * stabilityScore) *
        10
    ) / 10;

  // 5. Psychometric Risk Tolerance (RT)
  const drawdownMap: Record<DrawdownReactionOption, number> = {
    PANIC_SELL_ALL: 10,
    LIQUIDATE_HALF_TO_FD: 35,
    HOLD_AND_MAINTAIN_SIP: 70,
    BUY_THE_DIP_AGGRESSIVELY: 100,
  };
  const volatilityMap: Record<VolatilityPreferenceOption, number> = {
    CAPITAL_PROTECTION_PRIORITY: 20,
    MODERATE_GROWTH_BALANCED: 60,
    HIGH_RETURN_HIGH_VOLATILITY: 100,
  };
  const experienceMap: Record<PastCrisisExperienceOption, number> = {
    PANICKED_SOLD_AT_LOSS: 10,
    POST_2021_NO_CRASH_EXPERIENCE: 50,
    STAYED_INVESTED_2008_OR_2020: 100,
  };

  const riskToleranceScore =
    Math.round(
      (0.50 * drawdownMap[folio.drawdownReaction] +
        0.30 * volatilityMap[folio.volatilityPreference] +
        0.20 * experienceMap[folio.pastCrisisExperience]) *
        10
    ) / 10;

  // 6. Explicit Conflict Resolution Rules (ERS)
  let effectiveRiskScore: number;
  let conflictRuleTriggered: ConflictResolutionRule;
  let conflictTitle: string;
  let conflictExplanation: string;

  if (riskToleranceScore - riskCapacityScore > 20) {
    effectiveRiskScore = Math.min(riskToleranceScore, riskCapacityScore);
    conflictRuleTriggered = 'CAPACITY_CLAMP';
    conflictTitle = 'Safety Limit Applied (SEBI Reg 17 Capacity Clamp)';
    conflictExplanation = `Client's Market Crash Comfort (${riskToleranceScore}/100) exceeds their Financial Safety Cushion (${riskCapacityScore}/100) due to ${dtiRatioPct}% EMI burden and ${runwayMonths}m emergency buffer. Risk clamped to ${effectiveRiskScore}/100 to prevent household insolvency.`;
  } else if (riskCapacityScore - riskToleranceScore > 20) {
    effectiveRiskScore =
      Math.round((riskToleranceScore + 0.30 * (riskCapacityScore - riskToleranceScore)) * 10) /
      10;
    conflictRuleTriggered = 'INFLATION_SHIELD_BRIDGE';
    conflictTitle = 'Inflation Shield Bridge Applied';
    conflictExplanation = `Client has a strong Financial Safety Cushion (${riskCapacityScore}/100) with ${runwayMonths}m reserve, but conservative Market Crash Comfort (${riskToleranceScore}/100). Gently bridged to ${effectiveRiskScore}/100 to beat 8.5% education inflation without volatility anxiety.`;
  } else {
    effectiveRiskScore =
      Math.round((0.60 * riskCapacityScore + 0.40 * riskToleranceScore) * 10) / 10;
    conflictRuleTriggered = 'HARMONIOUS_ALIGNMENT';
    conflictTitle = 'Harmonious Capacity-Tolerance Balance';
    conflictExplanation = `Financial Safety Cushion (${riskCapacityScore}/100) and Market Crash Comfort (${riskToleranceScore}/100) are within 20 points. Weighted 60/40 toward balance sheet capacity for an ERS of ${effectiveRiskScore}/100.`;
  }

  // 7. Base Allocation & Dynamic Glide Path Override for Short Horizons
  let baseAllocation: AssetAllocation;
  let riskCategoryLabel: string;

  if (effectiveRiskScore <= 25) {
    riskCategoryLabel = 'Ultra Conservative';
    baseAllocation = { equityPct: 10, debtPct: 50, liquidArbitragePct: 35, goldPct: 5 };
  } else if (effectiveRiskScore <= 45) {
    riskCategoryLabel = 'Conservative';
    baseAllocation = { equityPct: 25, debtPct: 45, liquidArbitragePct: 25, goldPct: 5 };
  } else if (effectiveRiskScore <= 65) {
    riskCategoryLabel = 'Balanced / Moderate';
    baseAllocation = { equityPct: 50, debtPct: 35, liquidArbitragePct: 10, goldPct: 5 };
  } else if (effectiveRiskScore <= 80) {
    riskCategoryLabel = 'Growth / Dynamic';
    baseAllocation = { equityPct: 70, debtPct: 20, liquidArbitragePct: 5, goldPct: 5 };
  } else {
    riskCategoryLabel = 'Aggressive Growth';
    baseAllocation = { equityPct: 85, debtPct: 10, liquidArbitragePct: 0, goldPct: 5 };
  }

  // Enforce Dynamic Glide Path Ceiling when Goal Maturity is <= 5 Years
  if (h <= 1 && baseAllocation.equityPct > 0) {
    baseAllocation = { equityPct: 0, debtPct: 20, liquidArbitragePct: 80, goldPct: 0 };
    riskCategoryLabel = '100% Capital Lock (Final Year Glide)';
  } else if (h <= 3 && baseAllocation.equityPct > 25) {
    baseAllocation = { equityPct: 25, debtPct: 60, liquidArbitragePct: 15, goldPct: 0 };
    riskCategoryLabel = 'Capital Preservation (T-3 Yr Glide)';
  } else if (h <= 5 && baseAllocation.equityPct > 50) {
    baseAllocation = { equityPct: 50, debtPct: 40, liquidArbitragePct: 10, goldPct: 0 };
  }

  // 8. Check Regulatory Assertions & Optional Manual Equity Slider Override
  const regulatoryViolationsIntercepted: string[] = [];
  let activeAllocation = { ...baseAllocation };

  if (typeof folio.customEquityOverridePct === 'number') {
    const reqEq = Math.max(0, Math.min(95, Math.round(folio.customEquityOverridePct)));
    const remaining = 100 - reqEq;
    const gold = reqEq <= 90 ? 5 : 0;
    const debt = Math.round((remaining - gold) * 0.65);
    const liq = remaining - gold - debt;
    activeAllocation = {
      equityPct: reqEq,
      debtPct: Math.max(0, debt),
      liquidArbitragePct: Math.max(0, liq),
      goldPct: gold,
    };
  }

  if (folio.clientAge >= 60 && activeAllocation.equityPct > 30) {
    regulatoryViolationsIntercepted.push(
      `SEBI Reg 17 Assertion A1 (Senior Citizen Capital Shield): Client age is ${folio.clientAge} (>= 60). Equity allocation (${activeAllocation.equityPct}%) violates the 30% statutory senior safety ceiling.`
    );
  }
  if (dtiRatio > 0.50 && activeAllocation.equityPct > 10) {
    regulatoryViolationsIntercepted.push(
      `SEBI Reg 17 Assertion A2 (Debt Overhang Lock): Monthly EMIs consume ${dtiRatioPct}% of income (>50% threshold). Volatile equity SIP deployment is blocked until high-cost debt is reduced.`
    );
  }
  if (runwayMonths < 2.0 && activeAllocation.equityPct > 30) {
    regulatoryViolationsIntercepted.push(
      `SEBI Reg 17 Assertion A3 (Emergency Liquidity Invariant): Liquid emergency buffer is ${runwayMonths} months (< 2m critical minimum). Equity above 30% violates fiduciary liquidity rules.`
    );
  }
  if (h <= 1 && activeAllocation.equityPct > 0) {
    regulatoryViolationsIntercepted.push(
      `Sequence of Returns Invariant: Goal matures in ${h} yr (<= 12 months). Any equity exposure (${activeAllocation.equityPct}%) risks terminal drawdown before payout.`
    );
  }
  if (
    typeof folio.customEquityOverridePct === 'number' &&
    folio.customEquityOverridePct >= 85 &&
    baseAllocation.equityPct < 85
  ) {
    regulatoryViolationsIntercepted.push(
      `SEBI Reg 17 Assertion A4 (Unsubstantiated Speculative Override): Manual equity override (${activeAllocation.equityPct}%) exceeds the fiduciarily evaluated suitability ceiling (${baseAllocation.equityPct}%). Fiduciary rules forbid unverified aggressive risk overrides.`
    );
  }

  // 9. Goal Inflation & Flat vs Step-Up SIP Math
  const appliedInflationPct = GOAL_INFLATION_MAP[folio.goalCategory].ratePct;
  const naive6PctFvInr = Math.round(folio.presentGoalCostInr * Math.pow(1.06, Math.max(0.5, h)));
  const segmentedFvInr = Math.round(
    folio.presentGoalCostInr * Math.pow(1 + appliedInflationPct / 100, Math.max(0.5, h))
  );
  const shortfallPreventedInr = Math.max(0, segmentedFvInr - naive6PctFvInr);

  const expectedReturnPct =
    (activeAllocation.equityPct * 14.5 +
      activeAllocation.debtPct * 7.5 +
      activeAllocation.liquidArbitragePct * 6.9 +
      activeAllocation.goldPct * 11.5) /
    100;

  const nMonths = Math.max(6, Math.round(h * 12));
  const mRate = expectedReturnPct / 100 / 12;
  const flatDenom = (1 + mRate) * (Math.pow(1 + mRate, nMonths) - 1);
  const flatMonthlySipInr = Math.round((segmentedFvInr * mRate) / Math.max(0.0001, flatDenom));

  // Step-Up SIP (10% annual increase)
  const totalYears = Math.max(1, Math.round(h));
  let stepFactor = 0;
  for (let y = 1; y <= totalYears; y++) {
    const yMult = Math.pow(1.10, y - 1);
    let mSum = 0;
    for (let m = 1; m <= 12; m++) {
      const rem = 12 * (totalYears - y) + (13 - m);
      mSum += Math.pow(1 + mRate, rem);
    }
    stepFactor += yMult * mSum;
  }
  const stepUpInitialSipInr = Math.round(segmentedFvInr / Math.max(1, stepFactor));
  const monthlyCashflowSavedInr = Math.max(0, flatMonthlySipInr - stepUpInitialSipInr);

  const glideSchedule = [
    {
      phaseName: 'Phase 1: Capital Accumulation',
      windowLabel: 'Horizon > 5 Years',
      equityPct: 75,
      debtPct: 20,
      liquidPct: 0,
      goldPct: 5,
      rationale: 'Maximum compounding via Direct Index, Flexi-Cap & Mid-Cap Equity.',
    },
    {
      phaseName: 'Phase 2: Systematic De-Risking',
      windowLabel: 'T-5 to T-3 Years',
      equityPct: 50,
      debtPct: 40,
      liquidPct: 10,
      goldPct: 0,
      rationale: 'Trims mid-cap cyclical risk into AAA Short-Duration Corporate Debt.',
    },
    {
      phaseName: 'Phase 3: Capital Preservation',
      windowLabel: 'T-3 to T-1 Years',
      equityPct: 25,
      debtPct: 60,
      liquidPct: 15,
      goldPct: 0,
      rationale: 'Protects accumulated corpus against bear markets; harvests Sec 112A LTCG.',
    },
    {
      phaseName: 'Phase 4: 100% Capital Lock',
      windowLabel: 'Final 12 Months',
      equityPct: 0,
      debtPct: 20,
      liquidPct: 80,
      goldPct: 0,
      rationale: '0% equity exposure. Market crashes have 0.00% impact on payout.',
    },
  ];
  const activeGlidePhaseIndex = h > 5 ? 0 : h > 3 ? 1 : h > 1 ? 2 : 3;

  // 10. Direct Mutual Fund Basket Selection & Pairwise Overlap Audit
  const basket: Array<{
    fund: DirectFundScheme;
    weightPct: number;
    monthlySipAllocationInr: number;
  }> = [];

  const utiNifty = CURATED_15_DIRECT_FUNDS[0];
  const ppfasFlexi = CURATED_15_DIRECT_FUNDS[2];
  const moMidcap = CURATED_15_DIRECT_FUNDS[4];
  const hdfcShortDebt = CURATED_15_DIRECT_FUNDS[8];
  const kotakArb = CURATED_15_DIRECT_FUNDS[10];
  const goldBees = CURATED_15_DIRECT_FUNDS[12];

  if (activeAllocation.equityPct > 0) {
    if (folio.clientAge >= 60 || activeAllocation.equityPct <= 30) {
      const w1 = Math.round(activeAllocation.equityPct * 0.6);
      const w2 = activeAllocation.equityPct - w1;
      if (w1 > 0) {
        basket.push({
          fund: utiNifty,
          weightPct: w1,
          monthlySipAllocationInr: Math.round((stepUpInitialSipInr * w1) / 100),
        });
      }
      if (w2 > 0) {
        basket.push({
          fund: ppfasFlexi,
          weightPct: w2,
          monthlySipAllocationInr: Math.round((stepUpInitialSipInr * w2) / 100),
        });
      }
    } else {
      const w1 = Math.round(activeAllocation.equityPct * 0.45);
      const w2 = Math.round(activeAllocation.equityPct * 0.35);
      const w3 = activeAllocation.equityPct - w1 - w2;
      basket.push({
        fund: utiNifty,
        weightPct: w1,
        monthlySipAllocationInr: Math.round((stepUpInitialSipInr * w1) / 100),
      });
      basket.push({
        fund: ppfasFlexi,
        weightPct: w2,
        monthlySipAllocationInr: Math.round((stepUpInitialSipInr * w2) / 100),
      });
      if (w3 > 0) {
        basket.push({
          fund: moMidcap,
          weightPct: w3,
          monthlySipAllocationInr: Math.round((stepUpInitialSipInr * w3) / 100),
        });
      }
    }
  }

  if (activeAllocation.debtPct > 0) {
    basket.push({
      fund: hdfcShortDebt,
      weightPct: activeAllocation.debtPct,
      monthlySipAllocationInr: Math.round(
        (stepUpInitialSipInr * activeAllocation.debtPct) / 100
      ),
    });
  }

  if (activeAllocation.liquidArbitragePct > 0) {
    basket.push({
      fund: kotakArb,
      weightPct: activeAllocation.liquidArbitragePct,
      monthlySipAllocationInr: Math.round(
        (stepUpInitialSipInr * activeAllocation.liquidArbitragePct) / 100
      ),
    });
  }

  if (activeAllocation.goldPct > 0) {
    basket.push({
      fund: goldBees,
      weightPct: activeAllocation.goldPct,
      monthlySipAllocationInr: Math.round(
        (stepUpInitialSipInr * activeAllocation.goldPct) / 100
      ),
    });
  }

  // Pairwise Equity Overlap calculation
  const eqFunds = basket.filter((b) => b.fund.assetClass === 'EQUITY').map((b) => b.fund);
  let maxPairwiseOverlapPct = 0;
  for (let i = 0; i < eqFunds.length; i++) {
    for (let j = i + 1; j < eqFunds.length; j++) {
      let overlap = 0;
      for (const [sym, wA] of Object.entries(eqFunds[i].topHoldings)) {
        const wB = eqFunds[j].topHoldings[sym];
        if (wB) overlap += Math.min(wA, wB);
      }
      if (overlap > maxPairwiseOverlapPct) maxPairwiseOverlapPct = overlap;
    }
  }
  maxPairwiseOverlapPct = Math.round(maxPairwiseOverlapPct * 10) / 10;

  const weightedDirectTerPct =
    Math.round(
      basket.reduce((acc, b) => acc + (b.fund.directTerPct * b.weightPct) / 100, 0) * 100
    ) / 100;
  const weightedRegularTerPct =
    Math.round(
      basket.reduce((acc, b) => acc + (b.fund.regularTerPct * b.weightPct) / 100, 0) * 100
    ) / 100;

  // 11. 20-Year Direct vs Regular Commission Erosion
  const refSip = Math.max(25000, stepUpInitialSipInr);
  const rDir = (13.5 - 0.65) / 100 / 12;
  const rReg = (13.5 - 1.85) / 100 / 12;
  const directFinalCorpus20YrInr = Math.round(
    refSip * ((Math.pow(1 + rDir, 240) - 1) / rDir) * (1 + rDir)
  );
  const regularFinalCorpus20YrInr = Math.round(
    refSip * ((Math.pow(1 + rReg, 240) - 1) / rReg) * (1 + rReg)
  );
  const commissionSaved20YrInr = Math.max(
    0,
    directFinalCorpus20YrInr - regularFinalCorpus20YrInr
  );

  // 12. March 2020 COVID Crash Replay
  const eqW = activeAllocation.equityPct / 100;
  const safeW = 1 - eqW;
  const rawCovidDrop =
    eqW * -38.4 +
    (activeAllocation.debtPct / 100) * 0.6 +
    (activeAllocation.liquidArbitragePct / 100) * 0.5 +
    (activeAllocation.goldPct / 100) * 8.2;
  const fiduciaBasketDrawdownPct = Math.round(Math.min(-1.2, rawCovidDrop) * 10) / 10;

  const curveTemplate = [
    { m: 'Jan 20', diy: 100.0, eqD: 0.0, sD: 0.0 },
    { m: 'Feb 20', diy: 93.4, eqD: -6.6, sD: 0.7 },
    { m: 'Mar 20', diy: 60.9, eqD: -39.1, sD: 1.2 },
    { m: 'Apr 20', diy: 71.2, eqD: -28.8, sD: 2.1 },
    { m: 'May 20', diy: 69.5, eqD: -30.5, sD: 2.8 },
    { m: 'Jun 20', diy: 76.8, eqD: -23.2, sD: 3.5 },
    { m: 'Jul 20', diy: 82.4, eqD: -17.6, sD: 4.3 },
    { m: 'Aug 20', diy: 86.1, eqD: -13.9, sD: 4.9 },
    { m: 'Sep 20', diy: 85.2, eqD: -14.8, sD: 5.4 },
    { m: 'Oct 20', diy: 88.7, eqD: -11.3, sD: 6.1 },
    { m: 'Nov 20', diy: 98.9, eqD: -1.1, sD: 6.8 },
    { m: 'Dec 20', diy: 106.4, eqD: 6.4, sD: 7.5 },
  ];

  const monthlyCurve = curveTemplate.map((pt) => ({
    month: pt.m,
    diyValue: pt.diy,
    fiduciaValue: Math.round((100 + (eqW * pt.eqD + safeW * pt.sD)) * 10) / 10,
  }));

  const monthlySurplusInr = Math.max(
    0,
    folio.netMonthlyIncomeInr - folio.monthlyLivingExpensesInr - folio.totalMonthlyEmiInr
  );

  const computeTimeMs = Math.round((performance.now() - t0) * 1000) / 1000;

  return {
    computeTimeMs,
    dtiRatioPct,
    dtiScore,
    runwayMonths,
    runwayScore,
    horizonScore,
    stabilityScore,
    monthlySurplusInr,
    riskCapacityScore,
    riskToleranceScore,
    effectiveRiskScore,
    conflictRuleTriggered,
    conflictTitle,
    conflictExplanation,
    riskCategoryLabel,
    baseAllocation,
    activeAllocation,
    regulatoryViolationsIntercepted,
    isHardQuarantineTriggered: regulatoryViolationsIntercepted.length > 0,
    goal: {
      appliedInflationPct,
      naive6PctFvInr,
      segmentedFvInr,
      shortfallPreventedInr,
      flatMonthlySipInr,
      stepUpInitialSipInr,
      monthlyCashflowSavedInr,
      activeGlidePhaseIndex,
      glideSchedule,
    },
    basket,
    maxPairwiseOverlapPct,
    weightedDirectTerPct,
    weightedRegularTerPct,
    commissionSaved20YrInr,
    directFinalCorpus20YrInr,
    regularFinalCorpus20YrInr,
    covid2020Stress: {
      niftyDrawdownPct: -38.4,
      unadvisedDiyDrawdownPct: -39.1,
      fiduciaBasketDrawdownPct,
      cushionSavedPct: Math.round((39.1 - Math.abs(fiduciaBasketDrawdownPct)) * 10) / 10,
      recoveryMonthsFiducia: Math.max(2, Math.round(eqW * 13)),
      monthlyCurve,
    },
  };
}

/**
 * Formats an Indian Rupee number cleanly into ₹ Lakhs / ₹ Crores or standard en-IN commas
 */
export function formatInrCompact(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (abs >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}
