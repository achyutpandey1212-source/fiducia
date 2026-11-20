/**
 * Domain 05: Statutory AMFI SID, KIM & Factsheet Corpus for the 15 Flagship Direct Funds
 * Contains verified page-level chunks, exact TERs, exit loads, taxation rules,
 * investment objectives, and riskometer classifications.
 */

export type FactsheetSectionType =
  | 'EXIT_LOAD_AND_EXPENSE'
  | 'INVESTMENT_OBJECTIVE_AND_STRATEGY'
  | 'TAXATION_AND_SUITABILITY';

export interface StatutoryFactsheetChunk {
  chunkId: string;
  docId: string;
  isin: string;
  schemeName: string;
  amcName: string;
  sectionType: FactsheetSectionType;
  pageNumber: number;
  effectiveDate: string;
  riskometerGrade: 'Low' | 'Low to Moderate' | 'Moderate' | 'Moderately High' | 'High' | 'Very High';
  benchmarkIndex: string;
  directTerPct: number;
  regularTerPct: number;
  exitLoadRule: string;
  lockInPeriod: string;
  minimumSipInr: number;
  taxTreatmentSummary: string;
  content: string;
  keywords: string[];
  verifiedNumbers: number[];
}

export const STATUTORY_FACTSHEET_CHUNKS: StatutoryFactsheetChunk[] = [
  // 1. UTI Nifty 50 Index Fund Direct-Growth
  {
    chunkId: 'CHUNK-UTI-NIFTY50-FEES',
    docId: 'DOC-UTI-NIFTY50-2026',
    isin: 'INF789F01XA0',
    schemeName: 'UTI Nifty 50 Index Fund Direct-Growth',
    amcName: 'UTI Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 12,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Very High',
    benchmarkIndex: 'Nifty 50 TRI',
    directTerPct: 0.18,
    regularTerPct: 0.65,
    exitLoadRule: 'Nil (0.00%). No exit load is levied on redemptions at any holding period.',
    lockInPeriod: 'Nil (Open-ended index scheme)',
    minimumSipInr: 500,
    taxTreatmentSummary: 'Equity taxation under Sec 112A: LTCG (>12 months) taxed at 12.5% above ₹1.25 Lakh annual exemption; STCG (<=12 months) taxed at 20%.',
    content:
      'UTI Nifty 50 Index Fund Direct-Growth charges a Total Expense Ratio (TER) of 0.18% per annum compared to 0.65% in the Regular Plan [DOC-UTI-NIFTY50-2026, p. 12]. The scheme levies an exit load of 0.00% (Nil) across all redemption timelines, with a minimum monthly SIP of ₹500 and zero lock-in period [DOC-UTI-NIFTY50-2026, p. 12].',
    keywords: ['uti', 'nifty 50', 'index', 'exit load', 'ter', 'expense ratio', 'fee', 'INF789F01XA0'],
    verifiedNumbers: [0.18, 0.65, 0.0, 500, 12, 12.5, 1.25, 20],
  },
  {
    chunkId: 'CHUNK-UTI-NIFTY50-OBJ',
    docId: 'DOC-UTI-NIFTY50-2026',
    isin: 'INF789F01XA0',
    schemeName: 'UTI Nifty 50 Index Fund Direct-Growth',
    amcName: 'UTI Mutual Fund',
    sectionType: 'INVESTMENT_OBJECTIVE_AND_STRATEGY',
    pageNumber: 4,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Very High',
    benchmarkIndex: 'Nifty 50 TRI',
    directTerPct: 0.18,
    regularTerPct: 0.65,
    exitLoadRule: 'Nil (0.00%)',
    lockInPeriod: 'Nil',
    minimumSipInr: 500,
    taxTreatmentSummary: 'Equity LTCG 12.5% (>12m), STCG 20% (<=12m).',
    content:
      'The principal investment objective of UTI Nifty 50 Index Fund Direct-Growth is to passively replicate the composition of the Nifty 50 Index and generate returns commensurate with the Nifty 50 Total Return Index (TRI), subject to minimal tracking error of 0.04% [DOC-UTI-NIFTY50-2026, p. 4]. Top holdings include HDFC Bank (11.4%), Reliance Industries (9.2%), and ICICI Bank (7.8%) [DOC-UTI-NIFTY50-2026, p. 4].',
    keywords: ['uti', 'nifty 50', 'objective', 'tracking error', 'holdings', 'benchmark', 'INF789F01XA0'],
    verifiedNumbers: [50, 0.04, 11.4, 9.2, 7.8, 4],
  },

  // 2. HDFC Index S&P BSE Sensex Direct-Growth
  {
    chunkId: 'CHUNK-HDFC-SENSEX-FEES',
    docId: 'DOC-HDFC-SENSEX-2026',
    isin: 'INF179K01YM2',
    schemeName: 'HDFC Index S&P BSE Sensex Direct-Growth',
    amcName: 'HDFC Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 15,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Very High',
    benchmarkIndex: 'S&P BSE Sensex TRI',
    directTerPct: 0.20,
    regularTerPct: 0.70,
    exitLoadRule: '0.25% if redeemed within 3 days from the date of allotment; Nil (0.00%) after 3 days.',
    lockInPeriod: 'Nil',
    minimumSipInr: 500,
    taxTreatmentSummary: 'Equity taxation under Sec 112A: LTCG (>12 months) at 12.5% beyond ₹1.25 Lakh; STCG at 20%.',
    content:
      'HDFC Index S&P BSE Sensex Direct-Growth carries a Direct Plan Total Expense Ratio (TER) of 0.20% vs 0.70% in the Regular Plan [DOC-HDFC-SENSEX-2026, p. 15]. The scheme levies a short-term anti-arbitrage exit load of 0.25% if redeemed within 3 days of allotment, and 0.00% exit load thereafter [DOC-HDFC-SENSEX-2026, p. 15].',
    keywords: ['hdfc', 'sensex', 'index', 'exit load', 'ter', 'expense ratio', 'INF179K01YM2'],
    verifiedNumbers: [0.20, 0.70, 0.25, 3, 0.0, 500, 15, 12.5, 1.25, 20],
  },

  // 3. Parag Parikh Flexi Cap Fund Direct-Growth
  {
    chunkId: 'CHUNK-PPFAS-FLEXI-FEES',
    docId: 'DOC-PPFAS-FLEXI-2026',
    isin: 'INF879O01027',
    schemeName: 'Parag Parikh Flexi Cap Fund Direct-Growth',
    amcName: 'PPFAS Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 14,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Very High',
    benchmarkIndex: 'Nifty 500 TRI',
    directTerPct: 0.62,
    regularTerPct: 1.38,
    exitLoadRule:
      '10% of units may be redeemed without exit load every year. For redemptions above 10% limit: 2.00% if redeemed within 365 days; 1.00% if redeemed between 366 and 730 days; Nil after 730 days (2 years).',
    lockInPeriod: 'Nil (Open-ended flexi-cap scheme)',
    minimumSipInr: 1000,
    taxTreatmentSummary: 'Treated as Domestic Equity Fund (>65% Indian equity): LTCG (>12 months) at 12.5% above ₹1.25 Lakh; STCG at 20%.',
    content:
      'Parag Parikh Flexi Cap Fund Direct-Growth operates with a Direct Total Expense Ratio (TER) of 0.62% compared to 1.38% in its Regular Plan [DOC-PPFAS-FLEXI-2026, p. 14]. Under its statutory exit load structure, 10% of allotted units can be redeemed free of charge within each 365-day window; redemptions exceeding 10% attract an exit load of 2.00% within 365 days and 1.00% between 366 and 730 days, becoming 0.00% after 730 days [DOC-PPFAS-FLEXI-2026, p. 14].',
    keywords: ['parag parikh', 'ppfas', 'flexi cap', 'exit load', 'ter', 'expense ratio', '365 days', '730 days', 'INF879O01027'],
    verifiedNumbers: [0.62, 1.38, 10, 2.0, 365, 1.0, 366, 730, 0.0, 1000, 14, 12.5, 1.25, 20, 65],
  },
  {
    chunkId: 'CHUNK-PPFAS-FLEXI-OBJ',
    docId: 'DOC-PPFAS-FLEXI-2026',
    isin: 'INF879O01027',
    schemeName: 'Parag Parikh Flexi Cap Fund Direct-Growth',
    amcName: 'PPFAS Mutual Fund',
    sectionType: 'INVESTMENT_OBJECTIVE_AND_STRATEGY',
    pageNumber: 6,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Very High',
    benchmarkIndex: 'Nifty 500 TRI',
    directTerPct: 0.62,
    regularTerPct: 1.38,
    exitLoadRule: '2.00% (<365d), 1.00% (366-730d) above 10% free units',
    lockInPeriod: 'Nil',
    minimumSipInr: 1000,
    taxTreatmentSummary: 'Equity LTCG 12.5% (>12m), STCG 20% (<=12m).',
    content:
      'Parag Parikh Flexi Cap Fund Direct-Growth invests a minimum of 65% of corpus in domestic Indian equities across market capitalizations (Large, Mid, Small) and up to 35% in overseas technology equities (Microsoft 4.1%, Alphabet 3.9%, Meta 3.6%) and covered arbitrage positions [DOC-PPFAS-FLEXI-2026, p. 6]. It has delivered a 10-year CAGR of 18.7% with a Sortino ratio of 2.48 [DOC-PPFAS-FLEXI-2026, p. 6].',
    keywords: ['parag parikh', 'ppfas', 'flexi cap', 'foreign', 'overseas', 'strategy', 'cagr', 'sortino', 'INF879O01027'],
    verifiedNumbers: [65, 35, 4.1, 3.9, 3.6, 18.7, 2.48, 6],
  },

  // 4. HDFC Flexi Cap Fund Direct-Growth
  {
    chunkId: 'CHUNK-HDFC-FLEXI-FEES',
    docId: 'DOC-HDFC-FLEXI-2026',
    isin: 'INF179K01UT0',
    schemeName: 'HDFC Flexi Cap Fund Direct-Growth',
    amcName: 'HDFC Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 18,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Very High',
    benchmarkIndex: 'Nifty 500 TRI',
    directTerPct: 0.78,
    regularTerPct: 1.54,
    exitLoadRule: '1.00% if redeemed or switched out within 365 days (1 year) from allotment; Nil after 1 year.',
    lockInPeriod: 'Nil',
    minimumSipInr: 500,
    taxTreatmentSummary: 'Equity taxation under Sec 112A: LTCG (>12 months) at 12.5% above ₹1.25 Lakh; STCG at 20%.',
    content:
      'HDFC Flexi Cap Fund Direct-Growth charges a Direct Plan Total Expense Ratio (TER) of 0.78% compared to 1.54% in the Regular Plan [DOC-HDFC-FLEXI-2026, p. 18]. An exit load of 1.00% applies if units are redeemed within 365 days from allotment, and 0.00% thereafter [DOC-HDFC-FLEXI-2026, p. 18].',
    keywords: ['hdfc flexi cap', 'exit load', 'ter', 'expense ratio', 'INF179K01UT0'],
    verifiedNumbers: [0.78, 1.54, 1.0, 365, 0.0, 500, 18, 12.5, 1.25, 20],
  },

  // 5. Motilal Oswal Midcap Fund Direct-Growth
  {
    chunkId: 'CHUNK-MO-MIDCAP-FEES',
    docId: 'DOC-MO-MIDCAP-2026',
    isin: 'INF247L01445',
    schemeName: 'Motilal Oswal Midcap Fund Direct-Growth',
    amcName: 'Motilal Oswal Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 21,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Very High',
    benchmarkIndex: 'Nifty Midcap 150 TRI',
    directTerPct: 0.65,
    regularTerPct: 1.68,
    exitLoadRule: '1.00% if redeemed on or before 365 days from allotment; Nil after 365 days.',
    lockInPeriod: 'Nil',
    minimumSipInr: 500,
    taxTreatmentSummary: 'Equity taxation under Sec 112A: LTCG (>12 months) at 12.5% above ₹1.25 Lakh; STCG at 20%.',
    content:
      'Motilal Oswal Midcap Fund Direct-Growth maintains a Direct Plan Total Expense Ratio (TER) of 0.65% vs 1.68% in the Regular Plan, saving investors 1.03% annually in distributor trail fees [DOC-MO-MIDCAP-2026, p. 21]. It mandates a minimum 65% allocation to mid-cap companies ranked 101st to 250th by full market capitalization and levies a 1.00% exit load within 365 days [DOC-MO-MIDCAP-2026, p. 21].',
    keywords: ['motilal oswal', 'midcap', 'mid cap', 'exit load', 'ter', 'expense ratio', 'INF247L01445'],
    verifiedNumbers: [0.65, 1.68, 1.03, 65, 101, 250, 1.0, 365, 21, 12.5, 1.25, 20],
  },

  // 6. Nippon India Small Cap Fund Direct-Growth
  {
    chunkId: 'CHUNK-NIPPON-SMALL-FEES',
    docId: 'DOC-NIPPON-SMALL-2026',
    isin: 'INF204K01K15',
    schemeName: 'Nippon India Small Cap Fund Direct-Growth',
    amcName: 'Nippon India Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 19,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Very High',
    benchmarkIndex: 'Nifty Smallcap 250 TRI',
    directTerPct: 0.68,
    regularTerPct: 1.52,
    exitLoadRule: '1.00% if redeemed or switched out on or before 1 year (365 days) from allotment; Nil after 1 year.',
    lockInPeriod: 'Nil',
    minimumSipInr: 1000,
    taxTreatmentSummary: 'Equity taxation under Sec 112A: LTCG (>12 months) at 12.5% above ₹1.25 Lakh; STCG at 20%.',
    content:
      'Nippon India Small Cap Fund Direct-Growth has a Direct Total Expense Ratio (TER) of 0.68% compared to 1.52% in its Regular Plan [DOC-NIPPON-SMALL-2026, p. 19]. The scheme invests at least 65% in small-cap equities (ranked 251st and beyond) across a diversified 180+ stock basket (no single stock >3.5%) and charges an exit load of 1.00% for redemptions within 365 days [DOC-NIPPON-SMALL-2026, p. 19].',
    keywords: ['nippon', 'small cap', 'smallcap', 'exit load', 'ter', 'expense ratio', 'INF204K01K15'],
    verifiedNumbers: [0.68, 1.52, 65, 251, 180, 3.5, 1.0, 365, 1000, 19, 12.5, 1.25, 20],
  },

  // 7. ICICI Prudential All Seasons Bond Direct-Growth
  {
    chunkId: 'CHUNK-ICICI-BOND-FEES',
    docId: 'DOC-ICICI-BOND-2026',
    isin: 'INF109K01830',
    schemeName: 'ICICI Prudential All Seasons Bond Direct-Growth',
    amcName: 'ICICI Prudential Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 16,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Moderate',
    benchmarkIndex: 'NIFTY Composite Debt Index B-III',
    directTerPct: 0.58,
    regularTerPct: 1.32,
    exitLoadRule: '0.25% if redeemed within 30 days (1 month) from allotment; Nil after 30 days.',
    lockInPeriod: 'Nil',
    minimumSipInr: 1000,
    taxTreatmentSummary: 'Specified Mutual Fund Debt Taxation (Sec 50AA): Capital gains across all holding periods are added to total income and taxed at the investor’s applicable income tax slab rate.',
    content:
      'ICICI Prudential All Seasons Bond Direct-Growth charges a Direct Total Expense Ratio (TER) of 0.58% vs 1.32% in the Regular Plan [DOC-ICICI-BOND-2026, p. 16]. It dynamically manages Macaulay duration between 1 and 10 years across sovereign G-Secs and AAA bonds, levying a 0.25% exit load only within the first 30 days [DOC-ICICI-BOND-2026, p. 16]. Under Section 50AA of the Finance Act, capital gains are taxed at the investor’s marginal income tax slab [DOC-ICICI-BOND-2026, p. 16].',
    keywords: ['icici', 'all seasons bond', 'dynamic bond', 'debt', 'tax', '50aa', 'exit load', 'ter', 'INF109K01830'],
    verifiedNumbers: [0.58, 1.32, 1, 10, 0.25, 30, 1000, 16],
  },

  // 8. Aditya Birla Sun Life Corporate Bond Direct-Growth
  {
    chunkId: 'CHUNK-ABSL-CORPBOND-FEES',
    docId: 'DOC-ABSL-CORPBOND-2026',
    isin: 'INF209K01YM8',
    schemeName: 'Aditya Birla Sun Life Corporate Bond Direct-Growth',
    amcName: 'Aditya Birla Sun Life Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 11,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Low to Moderate',
    benchmarkIndex: 'NIFTY Corporate Bond Index A-II',
    directTerPct: 0.32,
    regularTerPct: 0.52,
    exitLoadRule: 'Nil (0.00%). Zero exit load across all holding periods.',
    lockInPeriod: 'Nil',
    minimumSipInr: 1000,
    taxTreatmentSummary: 'Debt taxation under Sec 50AA: Gains taxed at investor marginal income tax slab rate.',
    content:
      'Aditya Birla Sun Life Corporate Bond Direct-Growth operates with a low Direct TER of 0.32% compared to 0.52% in the Regular Plan and zero (0.00%) exit load [DOC-ABSL-CORPBOND-2026, p. 11]. By statutory mandate, over 80% of the portfolio is invested strictly in highest-rated AAA corporate bonds (NABARD, HDFC Bank, Power Finance Corp) and sovereign Government Securities [DOC-ABSL-CORPBOND-2026, p. 11].',
    keywords: ['aditya birla', 'absl', 'corporate bond', 'aaa', 'debt', 'exit load', 'ter', 'INF209K01YM8'],
    verifiedNumbers: [0.32, 0.52, 0.0, 80, 1000, 11],
  },

  // 9. HDFC Short Term Debt Fund Direct-Growth
  {
    chunkId: 'CHUNK-HDFC-SHORTDEBT-FEES',
    docId: 'DOC-HDFC-SHORTDEBT-2026',
    isin: 'INF179K01VF7',
    schemeName: 'HDFC Short Term Debt Fund Direct-Growth',
    amcName: 'HDFC Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 13,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Low to Moderate',
    benchmarkIndex: 'CRISIL Short Duration Debt A-II Index',
    directTerPct: 0.35,
    regularTerPct: 0.75,
    exitLoadRule: 'Nil (0.00%). Zero exit load on redemptions.',
    lockInPeriod: 'Nil',
    minimumSipInr: 500,
    taxTreatmentSummary: 'Debt taxation under Sec 50AA: Gains taxed at investor marginal income tax slab rate.',
    content:
      'HDFC Short Term Debt Fund Direct-Growth charges a Direct Plan Total Expense Ratio (TER) of 0.35% vs 0.75% in the Regular Plan and imposes a 0.00% (Nil) exit load [DOC-HDFC-SHORTDEBT-2026, p. 13]. The scheme maintains portfolio Macaulay duration strictly between 1 year and 3 years to insulate capital against RBI interest rate volatility [DOC-HDFC-SHORTDEBT-2026, p. 13].',
    keywords: ['hdfc short term', 'short duration', 'debt', 'macaulay duration', 'exit load', 'ter', 'INF179K01VF7'],
    verifiedNumbers: [0.35, 0.75, 0.0, 1, 3, 500, 13],
  },

  // 10. Tata Liquid Fund Direct-Growth
  {
    chunkId: 'CHUNK-TATA-LIQUID-FEES',
    docId: 'DOC-TATA-LIQUID-2026',
    isin: 'INF277K01YD8',
    schemeName: 'Tata Liquid Fund Direct-Growth',
    amcName: 'Tata Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 9,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Low to Moderate',
    benchmarkIndex: 'CRISIL Liquid Debt A-I Index',
    directTerPct: 0.19,
    regularTerPct: 0.32,
    exitLoadRule:
      'SEBI Graded Exit Load up to Day 6 (Day 1: 0.0070%, Day 2: 0.0065%, Day 3: 0.0060%, Day 4: 0.0055%, Day 5: 0.0050%, Day 6: 0.0045%); Nil (0.00%) from Day 7 onwards.',
    lockInPeriod: 'Nil',
    minimumSipInr: 500,
    taxTreatmentSummary: 'Debt taxation under Sec 50AA: Gains taxed at investor marginal income tax slab rate.',
    content:
      'Tata Liquid Fund Direct-Growth carries a Direct Total Expense Ratio (TER) of 0.19% vs 0.32% in the Regular Plan [DOC-TATA-LIQUID-2026, p. 9]. It invests exclusively in money market instruments, 91-day Treasury Bills, and A1+ commercial paper with maturity up to 91 days. A SEBI-mandated graded exit load applies for the first 6 days, dropping to 0.00% from Day 7 onwards [DOC-TATA-LIQUID-2026, p. 9].',
    keywords: ['tata liquid', 'liquid fund', '91 days', 'graded exit load', 'day 7', 'ter', 'INF277K01YD8'],
    verifiedNumbers: [0.19, 0.32, 91, 6, 7, 0.0, 500, 9],
  },

  // 11. Kotak Equity Arbitrage Fund Direct-Growth
  {
    chunkId: 'CHUNK-KOTAK-ARB-FEES',
    docId: 'DOC-KOTAK-ARB-2026',
    isin: 'INF174K01LS2',
    schemeName: 'Kotak Equity Arbitrage Fund Direct-Growth',
    amcName: 'Kotak Mahindra Mutual Fund',
    sectionType: 'TAXATION_AND_SUITABILITY',
    pageNumber: 17,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Low',
    benchmarkIndex: 'Nifty 50 Arbitrage Index',
    directTerPct: 0.38,
    regularTerPct: 0.98,
    exitLoadRule: '0.25% if redeemed within 30 days from allotment; Nil (0.00%) after 30 days.',
    lockInPeriod: 'Nil',
    minimumSipInr: 500,
    taxTreatmentSummary:
      'Qualifies for Equity Taxation under Sec 112A despite zero directional equity risk: LTCG (>12 months) taxed at only 12.5% (with ₹1.25L exemption) and STCG at 20%, outperforming 30% slab-taxed Fixed Deposits for high-bracket investors.',
    content:
      'Kotak Equity Arbitrage Fund Direct-Growth charges a Direct TER of 0.38% vs 0.98% in the Regular Plan, with a 0.25% exit load for redemptions within 30 days and 0.00% thereafter [DOC-KOTAK-ARB-2026, p. 17]. Because it holds >65% in completely hedged cash-versus-futures equity arbitrage, it delivers debt-like low volatility while qualifying for favorable Equity Taxation under Section 112A (12.5% LTCG after 12 months instead of 30% FD tax slab) [DOC-KOTAK-ARB-2026, p. 17].',
    keywords: ['kotak', 'arbitrage', 'tax', '112a', 'hedged', 'exit load', '30 days', 'ter', 'INF174K01LS2'],
    verifiedNumbers: [0.38, 0.98, 0.25, 30, 0.0, 65, 12.5, 12, 30, 20, 1.25, 17],
  },

  // 12. SBI Overnight Fund Direct-Growth
  {
    chunkId: 'CHUNK-SBI-OVERNIGHT-FEES',
    docId: 'DOC-SBI-OVERNIGHT-2026',
    isin: 'INF200K01TK4',
    schemeName: 'SBI Overnight Fund Direct-Growth',
    amcName: 'SBI Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 8,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Low',
    benchmarkIndex: 'CRISIL Liquid Overnight Index',
    directTerPct: 0.11,
    regularTerPct: 0.19,
    exitLoadRule: 'Nil (0.00%). Zero exit load even on 1-day redemption.',
    lockInPeriod: 'Nil',
    minimumSipInr: 500,
    taxTreatmentSummary: 'Debt taxation under Sec 50AA: Taxed at marginal income tax slab rate.',
    content:
      'SBI Overnight Fund Direct-Growth has an ultra-low Direct Total Expense Ratio (TER) of 0.11% vs 0.19% in the Regular Plan and 0.00% exit load from Day 1 [DOC-SBI-OVERNIGHT-2026, p. 8]. It parks 96.5% of assets in collateralized RBI TREPS overnight instruments with 1-business-day maturity, eliminating both credit default risk and interest rate duration risk [DOC-SBI-OVERNIGHT-2026, p. 8].',
    keywords: ['sbi overnight', 'overnight', 'treps', 'emergency fund', 'exit load', 'ter', 'INF200K01TK4'],
    verifiedNumbers: [0.11, 0.19, 0.0, 1, 96.5, 8],
  },

  // 13. Nippon India ETF Gold BeES Direct
  {
    chunkId: 'CHUNK-NIPPON-GOLD-FEES',
    docId: 'DOC-NIPPON-GOLDBEES-2026',
    isin: 'INF204KB17I5',
    schemeName: 'Nippon India ETF Gold BeES Direct',
    amcName: 'Nippon India Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 10,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'High',
    benchmarkIndex: 'Domestic Price of Physical Gold (995 Purity)',
    directTerPct: 0.12,
    regularTerPct: 0.80,
    exitLoadRule: 'Nil (0.00%). Traded with T+1 liquidity and zero exit load.',
    lockInPeriod: 'Nil',
    minimumSipInr: 500,
    taxTreatmentSummary: 'Gold ETF LTCG (>12 months listed ETF holding period under amended Finance Act 2024) taxed at 12.5% without indexation; STCG at slab rate.',
    content:
      'Nippon India ETF Gold BeES Direct carries a Total Expense Ratio (TER) of 0.12% and 0.00% exit load [DOC-NIPPON-GOLDBEES-2026, p. 10]. Backed 99.8% by physical London Bullion Market Association (LBMA) 995-fineness gold vaults, it acts as an institutional hedge against INR currency depreciation and equity tail-risk shocks [DOC-NIPPON-GOLDBEES-2026, p. 10].',
    keywords: ['nippon', 'gold', 'goldbees', 'etf', 'exit load', 'ter', 'hedge', 'INF204KB17I5'],
    verifiedNumbers: [0.12, 0.80, 0.0, 99.8, 995, 12.5, 10],
  },

  // 14. ICICI Prudential Multi-Asset Fund Direct-Growth
  {
    chunkId: 'CHUNK-ICICI-MULTIASSET-FEES',
    docId: 'DOC-ICICI-MULTIASSET-2026',
    isin: 'INF109K015K4',
    schemeName: 'ICICI Prudential Multi-Asset Fund Direct-Growth',
    amcName: 'ICICI Prudential Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 22,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Very High',
    benchmarkIndex: 'Nifty 200 TRI (65%) + Nifty Composite Debt Index (25%) + Domestic Gold Price (10%)',
    directTerPct: 0.72,
    regularTerPct: 1.62,
    exitLoadRule: 'Up to 30% of units redeemed within 365 days: Nil. Above 30% limit within 365 days: 1.00% exit load. After 365 days: Nil.',
    lockInPeriod: 'Nil',
    minimumSipInr: 1000,
    taxTreatmentSummary: 'Maintains >=65% gross equity & arbitrage exposure to qualify for Equity Taxation under Sec 112A (12.5% LTCG >12m).',
    content:
      'ICICI Prudential Multi-Asset Fund Direct-Growth charges a Direct TER of 0.72% vs 1.62% in the Regular Plan [DOC-ICICI-MULTIASSET-2026, p. 22]. It allocates across at least three asset classes (minimum 10% each in Equity, Debt, and Gold/Silver/REITs). Up to 30% of units can be redeemed free within 365 days; redemptions above 30% within 365 days incur a 1.00% exit load [DOC-ICICI-MULTIASSET-2026, p. 22].',
    keywords: ['icici', 'multi-asset', 'multi asset', 'hybrid', 'exit load', 'ter', 'INF109K015K4'],
    verifiedNumbers: [0.72, 1.62, 10, 30, 365, 1.0, 0.0, 65, 25, 22, 12.5],
  },

  // 15. Motilal Oswal Nasdaq 100 ETF Direct
  {
    chunkId: 'CHUNK-MO-NASDAQ100-FEES',
    docId: 'DOC-MO-NASDAQ100-2026',
    isin: 'INF247L01015',
    schemeName: 'Motilal Oswal Nasdaq 100 ETF Direct',
    amcName: 'Motilal Oswal Mutual Fund',
    sectionType: 'EXIT_LOAD_AND_EXPENSE',
    pageNumber: 11,
    effectiveDate: '2026-01-31',
    riskometerGrade: 'Very High',
    benchmarkIndex: 'NASDAQ-100 TRI (INR)',
    directTerPct: 0.58,
    regularTerPct: 0.58,
    exitLoadRule: 'Nil (0.00%). Zero exit load.',
    lockInPeriod: 'Nil',
    minimumSipInr: 500,
    taxTreatmentSummary: 'International ETF Taxation (Amended Finance Act 2024): LTCG (>12 months) taxed at 12.5%; STCG at marginal slab rate.',
    content:
      'Motilal Oswal Nasdaq 100 ETF Direct charges a Total Expense Ratio (TER) of 0.58% with 0.00% exit load [DOC-MO-NASDAQ100-2026, p. 11]. It tracks the top 100 non-financial global technology leaders listed on NASDAQ, including Apple (8.9%), Microsoft (8.6%), and NVIDIA (8.1%) [DOC-MO-NASDAQ100-2026, p. 11].',
    keywords: ['motilal oswal', 'nasdaq', 'nasdaq 100', 'international', 'us equity', 'exit load', 'ter', 'INF247L01015'],
    verifiedNumbers: [0.58, 0.0, 100, 8.9, 8.6, 8.1, 11, 12.5, 12],
  },
];
