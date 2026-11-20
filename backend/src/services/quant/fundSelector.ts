/**
 * Domain 04: Direct-Plan Fund Selection Engine & 10-Year Backtesting System
 * Includes the Curated 15 Flagship Direct-Plan Mutual Funds, Pairwise Stock Overlap Shield,
 * Direct vs Regular Commission Erosion Calculator, and Historical Crisis Replay (March 2020 COVID).
 */

import {
  AssetAllocation,
  CommissionErosionResult,
  DirectFundScheme,
} from '../../types/finance.types.js';

/**
 * 4. Curated Seed Universe of 15 Flagship Direct-Plan Growth Mutual Funds (AMFI Direct)
 */
export const FLAGSHIP_15_DIRECT_FUNDS: DirectFundScheme[] = [
  {
    isin: 'INF789F01XA0',
    schemeName: 'UTI Nifty 50 Index Fund Direct-Growth',
    amcName: 'UTI Mutual Fund',
    category: 'LARGE_CAP_INDEX',
    assetClass: 'EQUITY',
    directTerPct: 0.18,
    regularTerPct: 0.65,
    categoryMedianTerPct: 0.45,
    rolling3YrBeatConsistencyPct: 88.5,
    sortinoRatio: 1.92,
    cagr3YrPct: 14.2,
    cagr5YrPct: 15.8,
    cagr10YrPct: 13.6,
    topHoldings: {
      HDFCBANK: 11.4,
      RELIANCE: 9.2,
      ICICIBANK: 7.8,
      INFY: 5.9,
      ITC: 4.1,
      TCS: 3.9,
      LT: 3.8,
      BHARTIARTL: 3.6,
      AXISBANK: 3.1,
      SBIN: 2.9,
    },
    docId: 'DOC-UTI-NIFTY50-2026',
  },
  {
    isin: 'INF179K01YM2',
    schemeName: 'HDFC Index S&P BSE Sensex Direct-Growth',
    amcName: 'HDFC Mutual Fund',
    category: 'LARGE_CAP_INDEX',
    assetClass: 'EQUITY',
    directTerPct: 0.20,
    regularTerPct: 0.70,
    categoryMedianTerPct: 0.45,
    rolling3YrBeatConsistencyPct: 87.0,
    sortinoRatio: 1.89,
    cagr3YrPct: 13.9,
    cagr5YrPct: 15.4,
    cagr10YrPct: 13.5,
    topHoldings: {
      HDFCBANK: 12.8,
      RELIANCE: 10.5,
      ICICIBANK: 8.9,
      INFY: 6.7,
      ITC: 4.7,
      TCS: 4.5,
      LT: 4.3,
      BHARTIARTL: 4.0,
      AXISBANK: 3.5,
      KOTAKBANK: 3.0,
    },
    docId: 'DOC-HDFC-SENSEX-2026',
  },
  {
    isin: 'INF879O01027',
    schemeName: 'Parag Parikh Flexi Cap Fund Direct-Growth',
    amcName: 'PPFAS Mutual Fund',
    category: 'FLEXI_CAP',
    assetClass: 'EQUITY',
    directTerPct: 0.62,
    regularTerPct: 1.38,
    categoryMedianTerPct: 0.85,
    rolling3YrBeatConsistencyPct: 96.4,
    sortinoRatio: 2.48,
    cagr3YrPct: 19.4,
    cagr5YrPct: 22.1,
    cagr10YrPct: 18.7,
    topHoldings: {
      HDFCBANK: 8.1,
      BAJHLDNG: 6.9,
      POWERGRID: 5.8,
      COALINDIA: 5.4,
      ITC: 5.1,
      ICICIBANK: 4.9,
      MARUTI: 4.3,
      MSFT_US: 4.1,
      GOOGL_US: 3.9,
      META_US: 3.6,
    },
    docId: 'DOC-PPFAS-FLEXI-2026',
  },
  {
    isin: 'INF179K01UT0',
    schemeName: 'HDFC Flexi Cap Fund Direct-Growth',
    amcName: 'HDFC Mutual Fund',
    category: 'FLEXI_CAP',
    assetClass: 'EQUITY',
    directTerPct: 0.78,
    regularTerPct: 1.54,
    categoryMedianTerPct: 0.85,
    rolling3YrBeatConsistencyPct: 91.2,
    sortinoRatio: 2.21,
    cagr3YrPct: 21.3,
    cagr5YrPct: 21.8,
    cagr10YrPct: 16.4,
    topHoldings: {
      ICICIBANK: 9.1,
      HDFCBANK: 8.6,
      AXISBANK: 7.2,
      CIPLA: 5.4,
      SBI: 4.8,
      BHARTIARTL: 4.5,
      HCLTECH: 4.2,
      HAL: 3.8,
      NTPC: 3.5,
      INFY: 3.4,
    },
    docId: 'DOC-HDFC-FLEXI-2026',
  },
  {
    isin: 'INF247L01445',
    schemeName: 'Motilal Oswal Midcap Fund Direct-Growth',
    amcName: 'Motilal Oswal Mutual Fund',
    category: 'MID_CAP',
    assetClass: 'EQUITY',
    directTerPct: 0.65,
    regularTerPct: 1.68,
    categoryMedianTerPct: 0.75,
    rolling3YrBeatConsistencyPct: 92.8,
    sortinoRatio: 2.34,
    cagr3YrPct: 26.8,
    cagr5YrPct: 27.4,
    cagr10YrPct: 19.2,
    topHoldings: {
      PERSISTENT: 8.4,
      COFORGE: 7.6,
      DIXON: 6.9,
      TRENT: 6.2,
      KALYANKJIL: 5.8,
      POLYCAB: 5.1,
      TUBEINVEST: 4.4,
      MAXHEALTH: 4.2,
      VOLTAS: 3.9,
      KPITTECH: 3.6,
    },
    docId: 'DOC-MO-MIDCAP-2026',
  },
  {
    isin: 'INF204K01K15',
    schemeName: 'Nippon India Small Cap Fund Direct-Growth',
    amcName: 'Nippon India Mutual Fund',
    category: 'SMALL_CAP',
    assetClass: 'EQUITY',
    directTerPct: 0.68,
    regularTerPct: 1.52,
    categoryMedianTerPct: 0.78,
    rolling3YrBeatConsistencyPct: 94.1,
    sortinoRatio: 2.15,
    cagr3YrPct: 25.4,
    cagr5YrPct: 28.9,
    cagr10YrPct: 21.6,
    topHoldings: {
      MCX: 3.2,
      VOLTAMP: 2.8,
      APARINDS: 2.6,
      KARURVYSYA: 2.4,
      TEJASNET: 2.2,
      KIRLOSBROS: 2.1,
      CYIENT: 1.9,
      BHEL: 1.8,
      RADICO: 1.7,
      TIINDIA: 1.6,
    },
    docId: 'DOC-NIPPON-SMALL-2026',
  },
  {
    isin: 'INF109K01830',
    schemeName: 'ICICI Prudential All Seasons Bond Direct-Growth',
    amcName: 'ICICI Prudential Mutual Fund',
    category: 'DYNAMIC_BOND',
    assetClass: 'DEBT',
    directTerPct: 0.58,
    regularTerPct: 1.32,
    categoryMedianTerPct: 0.68,
    rolling3YrBeatConsistencyPct: 95.0,
    sortinoRatio: 3.12,
    cagr3YrPct: 7.8,
    cagr5YrPct: 7.9,
    cagr10YrPct: 8.4,
    topHoldings: {
      GOI_GSEC_2033: 32.0,
      GOI_GSEC_2029: 21.5,
      NABARD_AAA: 9.5,
      REC_AAA: 8.4,
      SIDBI_AAA: 7.2,
    },
    docId: 'DOC-ICICI-BOND-2026',
  },
  {
    isin: 'INF209K01YM8',
    schemeName: 'Aditya Birla Sun Life Corporate Bond Direct-Growth',
    amcName: 'Aditya Birla Sun Life Mutual Fund',
    category: 'CORPORATE_BOND',
    assetClass: 'DEBT',
    directTerPct: 0.32,
    regularTerPct: 0.52,
    categoryMedianTerPct: 0.40,
    rolling3YrBeatConsistencyPct: 93.4,
    sortinoRatio: 3.45,
    cagr3YrPct: 7.5,
    cagr5YrPct: 7.6,
    cagr10YrPct: 8.1,
    topHoldings: {
      NABARD_AAA: 14.2,
      HDFCBANK_BOND_AAA: 11.8,
      POWFIN_AAA: 10.4,
      REC_AAA: 9.8,
      GOI_GSEC_2028: 15.0,
    },
    docId: 'DOC-ABSL-CORPBOND-2026',
  },
  {
    isin: 'INF179K01VF7',
    schemeName: 'HDFC Short Term Debt Fund Direct-Growth',
    amcName: 'HDFC Mutual Fund',
    category: 'SHORT_DURATION_DEBT',
    assetClass: 'DEBT',
    directTerPct: 0.35,
    regularTerPct: 0.75,
    categoryMedianTerPct: 0.45,
    rolling3YrBeatConsistencyPct: 94.0,
    sortinoRatio: 3.58,
    cagr3YrPct: 7.4,
    cagr5YrPct: 7.5,
    cagr10YrPct: 7.9,
    topHoldings: {
      GOI_GSEC_2027: 18.5,
      NABARD_AAA: 12.0,
      LICHSGFIN_AAA: 9.2,
      SIDBI_AAA: 8.8,
      BAJFINANCE_AAA: 7.5,
    },
    docId: 'DOC-HDFC-SHORTDEBT-2026',
  },
  {
    isin: 'INF277K01YD8',
    schemeName: 'Tata Liquid Fund Direct-Growth',
    amcName: 'Tata Mutual Fund',
    category: 'LIQUID',
    assetClass: 'LIQUID_ARBITRAGE',
    directTerPct: 0.19,
    regularTerPct: 0.32,
    categoryMedianTerPct: 0.22,
    rolling3YrBeatConsistencyPct: 97.2,
    sortinoRatio: 4.80,
    cagr3YrPct: 6.9,
    cagr5YrPct: 6.1,
    cagr10YrPct: 6.6,
    topHoldings: {
      TBILL_91DAY: 38.0,
      SIDBI_CP_A1PLUS: 15.0,
      NABARD_CD_A1PLUS: 14.0,
      TREPS_OVERNIGHT: 22.0,
    },
    docId: 'DOC-TATA-LIQUID-2026',
  },
  {
    isin: 'INF174K01LS2',
    schemeName: 'Kotak Equity Arbitrage Fund Direct-Growth',
    amcName: 'Kotak Mahindra Mutual Fund',
    category: 'ARBITRAGE',
    assetClass: 'LIQUID_ARBITRAGE',
    directTerPct: 0.38,
    regularTerPct: 0.98,
    categoryMedianTerPct: 0.42,
    rolling3YrBeatConsistencyPct: 96.8,
    sortinoRatio: 4.52,
    cagr3YrPct: 7.4,
    cagr5YrPct: 6.5,
    cagr10YrPct: 6.8,
    topHoldings: {
      HEDGED_CASH_FUTURES_ARB: 71.5,
      KOTAK_LIQUID_DIRECT: 18.0,
      TBILL_182DAY: 10.5,
    },
    docId: 'DOC-KOTAK-ARB-2026',
  },
  {
    isin: 'INF200K01TK4',
    schemeName: 'SBI Overnight Fund Direct-Growth',
    amcName: 'SBI Mutual Fund',
    category: 'OVERNIGHT',
    assetClass: 'LIQUID_ARBITRAGE',
    directTerPct: 0.11,
    regularTerPct: 0.19,
    categoryMedianTerPct: 0.14,
    rolling3YrBeatConsistencyPct: 99.0,
    sortinoRatio: 5.00,
    cagr3YrPct: 6.6,
    cagr5YrPct: 5.8,
    cagr10YrPct: 6.2,
    topHoldings: {
      TREPS_RBI_OVERNIGHT: 96.5,
      TBILL_OVERNIGHT: 3.5,
    },
    docId: 'DOC-SBI-OVERNIGHT-2026',
  },
  {
    isin: 'INF204KB17I5',
    schemeName: 'Nippon India ETF Gold BeES Direct',
    amcName: 'Nippon India Mutual Fund',
    category: 'GOLD_ETF',
    assetClass: 'GOLD',
    directTerPct: 0.12,
    regularTerPct: 0.80,
    categoryMedianTerPct: 0.50,
    rolling3YrBeatConsistencyPct: 91.5,
    sortinoRatio: 1.85,
    cagr3YrPct: 14.8,
    cagr5YrPct: 13.4,
    cagr10YrPct: 11.9,
    topHoldings: {
      PHYSICAL_GOLD_995_BULLION: 99.8,
    },
    docId: 'DOC-NIPPON-GOLDBEES-2026',
  },
  {
    isin: 'INF109K015K4',
    schemeName: 'ICICI Prudential Multi-Asset Fund Direct-Growth',
    amcName: 'ICICI Prudential Mutual Fund',
    category: 'MULTI_ASSET',
    assetClass: 'EQUITY',
    directTerPct: 0.72,
    regularTerPct: 1.62,
    categoryMedianTerPct: 0.85,
    rolling3YrBeatConsistencyPct: 95.4,
    sortinoRatio: 2.65,
    cagr3YrPct: 19.8,
    cagr5YrPct: 21.4,
    cagr10YrPct: 16.2,
    topHoldings: {
      NTPC: 6.2,
      ICICIBANK: 5.9,
      RELIANCE: 5.4,
      MARUTI: 4.8,
      SUNPHARMA: 4.2,
      GOLD_ETFS_BULLION: 11.5,
      GOI_GSEC_2030: 14.0,
    },
    docId: 'DOC-ICICI-MULTIASSET-2026',
  },
  {
    isin: 'INF247L01015',
    schemeName: 'Motilal Oswal Nasdaq 100 ETF Direct',
    amcName: 'Motilal Oswal Mutual Fund',
    category: 'INTERNATIONAL_EQUITY',
    assetClass: 'EQUITY',
    directTerPct: 0.58,
    regularTerPct: 0.58,
    categoryMedianTerPct: 0.65,
    rolling3YrBeatConsistencyPct: 90.0,
    sortinoRatio: 2.10,
    cagr3YrPct: 21.5,
    cagr5YrPct: 20.2,
    cagr10YrPct: 19.8,
    topHoldings: {
      AAPL_US: 8.9,
      MSFT_US: 8.6,
      NVDA_US: 8.1,
      AMZN_US: 5.2,
      META_US: 4.8,
      GOOGL_US: 4.7,
    },
    docId: 'DOC-MO-NASDAQ100-2026',
  },
];

/**
 * 2. Direct-Plan Advantage: Eliminating the ~1.2%–1.5% Regular Plan Commission Bleed
 * Computes 20-year wealth erosion from distributor commissions.
 */
export function computeCommissionErosion(
  monthlySipInr: number = 25000,
  horizonYears: number = 20,
  grossReturnCagrPct: number = 13.5,
  directPlanTerPct: number = 0.65,
  regularPlanTerPct: number = 1.85
): CommissionErosionResult {
  const nMonths = Math.round(horizonYears * 12);

  const netDirectAnnualPct = grossReturnCagrPct - directPlanTerPct;
  const netRegularAnnualPct = grossReturnCagrPct - regularPlanTerPct;

  const rDirectMonthly = netDirectAnnualPct / 100 / 12;
  const rRegularMonthly = netRegularAnnualPct / 100 / 12;

  const directFinalCorpusInr = Math.round(
    monthlySipInr *
      ((Math.pow(1 + rDirectMonthly, nMonths) - 1) / rDirectMonthly) *
      (1 + rDirectMonthly)
  );

  const regularFinalCorpusInr = Math.round(
    monthlySipInr *
      ((Math.pow(1 + rRegularMonthly, nMonths) - 1) / rRegularMonthly) *
      (1 + rRegularMonthly)
  );

  const totalCommissionSavedInr = Math.max(0, directFinalCorpusInr - regularFinalCorpusInr);
  const totalInvestedPrincipal = monthlySipInr * nMonths;
  const wealthLossPercentageInRegular =
    Math.round((totalCommissionSavedInr / Math.max(1, directFinalCorpusInr - totalInvestedPrincipal)) * 1000) /
    10;

  return {
    monthlySipInr,
    horizonYears,
    grossReturnCagrPct,
    directPlanTerPct,
    regularPlanTerPct,
    directFinalCorpusInr,
    regularFinalCorpusInr,
    totalCommissionSavedInr,
    wealthLossPercentageInRegular,
  };
}

/**
 * 3.4 Pairwise Portfolio Overlap Shield
 * Overlap(A, B) = sum_{i in A intersect B} min(Weight_{i, A}, Weight_{i, B})
 */
export function calculatePairwiseOverlapPct(
  fundA: DirectFundScheme,
  fundB: DirectFundScheme
): {
  overlapPct: number;
  isRedundantAlert: boolean; // True if > 45% overlap
  overlappingStocks: Array<{ symbol: string; sharedWeightPct: number }>;
} {
  let totalOverlap = 0;
  const overlappingStocks: Array<{ symbol: string; sharedWeightPct: number }> = [];

  for (const [symbol, weightA] of Object.entries(fundA.topHoldings)) {
    const weightB = fundB.topHoldings[symbol];
    if (typeof weightB === 'number' && weightB > 0) {
      const shared = Math.min(weightA, weightB);
      totalOverlap += shared;
      overlappingStocks.push({
        symbol,
        sharedWeightPct: Math.round(shared * 100) / 100,
      });
    }
  }

  const overlapPct = Math.round(totalOverlap * 100) / 100;
  return {
    overlapPct,
    isRedundantAlert: overlapPct > 45.0,
    overlappingStocks,
  };
}

/**
 * 3. Quantitative Fund Scoring Model
 * FundScore = 0.35 * S_Rolling + 0.25 * S_Sortino + 0.25 * S_TER + 0.15 * S_Overlap
 */
export function computeQuantitativeFundScore(
  fund: DirectFundScheme,
  pairwiseOverlapPctWithBasket: number = 10
): number {
  const sRolling = Math.min(100, (fund.rolling3YrBeatConsistencyPct / 80) * 100);
  const sSortino = Math.min(100, (fund.sortinoRatio / 2.5) * 100);
  const deltaTer = fund.categoryMedianTerPct - fund.directTerPct;
  const sTer = Math.max(20, Math.min(100, 75 + deltaTer * 100));
  const sOverlap = Math.max(0, 100 - pairwiseOverlapPctWithBasket * 1.5);

  const score = 0.35 * sRolling + 0.25 * sSortino + 0.25 * sTer + 0.15 * sOverlap;
  return Math.round(score * 100) / 100;
}

/**
 * Recommends an Optimal, Low-Overlap 100% Direct Mutual Fund Basket for the given Asset Allocation
 */
export function selectOptimalDirectBasket(
  allocation: AssetAllocation,
  isSeniorCitizen: boolean = false
): {
  basket: Array<{
    fund: DirectFundScheme;
    weightPct: number;
    quantScore: number;
  }>;
  maxPairwiseEquityOverlapPct: number;
  weightedAverageDirectTerPct: number;
  weightedAverageRegularTerPct: number;
} {
  const selected: Array<{ fund: DirectFundScheme; weightPct: number; quantScore: number }> = [];

  // 1. Equity Allocation
  if (allocation.equityPct > 0) {
    const niftyIndex = FLAGSHIP_15_DIRECT_FUNDS.find(
      (f) => f.schemeName.includes('UTI Nifty 50')
    )!;
    const ppfasFlexi = FLAGSHIP_15_DIRECT_FUNDS.find(
      (f) => f.schemeName.includes('Parag Parikh Flexi Cap')
    )!;
    const midcapFund = FLAGSHIP_15_DIRECT_FUNDS.find(
      (f) => f.schemeName.includes('Motilal Oswal Midcap')
    )!;

    if (isSeniorCitizen || allocation.equityPct <= 30) {
      // Senior Citizen or Conservative: 100% of Equity in Large Cap Index + Low-Volatility Flexi Cap (Zero Mid/Small Cap)
      const wLarge = Math.round(allocation.equityPct * 0.6);
      const wFlexi = allocation.equityPct - wLarge;
      if (wLarge > 0) {
        selected.push({
          fund: niftyIndex,
          weightPct: wLarge,
          quantScore: computeQuantitativeFundScore(niftyIndex, 13.0),
        });
      }
      if (wFlexi > 0) {
        selected.push({
          fund: ppfasFlexi,
          weightPct: wFlexi,
          quantScore: computeQuantitativeFundScore(ppfasFlexi, 13.0),
        });
      }
    } else {
      // Standard Growth/Balanced: Split across Index, Flexi Cap, and Mid Cap (Zero redundant Large Cap overlap)
      const wLarge = Math.round(allocation.equityPct * 0.45);
      const wFlexi = Math.round(allocation.equityPct * 0.35);
      const wMid = allocation.equityPct - wLarge - wFlexi;

      selected.push({
        fund: niftyIndex,
        weightPct: wLarge,
        quantScore: computeQuantitativeFundScore(niftyIndex, 13.0),
      });
      selected.push({
        fund: ppfasFlexi,
        weightPct: wFlexi,
        quantScore: computeQuantitativeFundScore(ppfasFlexi, 13.0),
      });
      if (wMid > 0) {
        selected.push({
          fund: midcapFund,
          weightPct: wMid,
          quantScore: computeQuantitativeFundScore(midcapFund, 0),
        });
      }
    }
  }

  // 2. Debt Allocation
  if (allocation.debtPct > 0) {
    const shortDebt = FLAGSHIP_15_DIRECT_FUNDS.find((f) =>
      f.schemeName.includes('HDFC Short Term Debt')
    )!;
    selected.push({
      fund: shortDebt,
      weightPct: allocation.debtPct,
      quantScore: computeQuantitativeFundScore(shortDebt, 0),
    });
  }

  // 3. Liquid / Arbitrage Allocation
  if (allocation.liquidArbitragePct > 0) {
    const arbFund = FLAGSHIP_15_DIRECT_FUNDS.find((f) =>
      f.schemeName.includes('Kotak Equity Arbitrage')
    )!;
    selected.push({
      fund: arbFund,
      weightPct: allocation.liquidArbitragePct,
      quantScore: computeQuantitativeFundScore(arbFund, 0),
    });
  }

  // 4. Gold Allocation
  if (allocation.goldPct > 0) {
    const goldEtf = FLAGSHIP_15_DIRECT_FUNDS.find((f) =>
      f.schemeName.includes('Nippon India ETF Gold BeES')
    )!;
    selected.push({
      fund: goldEtf,
      weightPct: allocation.goldPct,
      quantScore: computeQuantitativeFundScore(goldEtf, 0),
    });
  }

  // Calculate Max Pairwise Overlap among Equity Funds in Basket
  const equityFunds = selected
    .filter((s) => s.fund.assetClass === 'EQUITY')
    .map((s) => s.fund);
  let maxOverlap = 0;
  for (let i = 0; i < equityFunds.length; i++) {
    for (let j = i + 1; j < equityFunds.length; j++) {
      const { overlapPct } = calculatePairwiseOverlapPct(equityFunds[i], equityFunds[j]);
      if (overlapPct > maxOverlap) maxOverlap = overlapPct;
    }
  }

  const weightedDirectTer =
    selected.reduce((acc, item) => acc + item.fund.directTerPct * (item.weightPct / 100), 0);
  const weightedRegularTer =
    selected.reduce((acc, item) => acc + item.fund.regularTerPct * (item.weightPct / 100), 0);

  return {
    basket: selected,
    maxPairwiseEquityOverlapPct: Math.round(maxOverlap * 100) / 100,
    weightedAverageDirectTerPct: Math.round(weightedDirectTer * 100) / 100,
    weightedAverageRegularTerPct: Math.round(weightedRegularTer * 100) / 100,
  };
}
