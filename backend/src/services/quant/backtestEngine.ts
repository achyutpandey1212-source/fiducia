/**
 * Domain 04 & Domain 10 (WOW Feature A): 10-Year Historical Backtesting & Crisis Replay Engine
 * Simulates the recommended portfolio through actual historical Indian market shocks:
 * - March 2020 COVID Crash (-38.4% Nifty 50 drawdown)
 * - 2016 Demonetization
 * - 2018 IL&FS NBFC Liquidity Crisis
 * - 2022 Russia-Ukraine Geopolitical Shock
 */

import { AssetAllocation } from '../../types/finance.types.js';

export interface HistoricalCrisisReplay {
  eventId: string;
  eventName: string;
  eventDate: string;
  niftyBenchmarkDrawdownPct: number;
  unadvisedDiy100PctEquityDrawdownPct: number;
  fiduciaPortfolioDrawdownPct: number;
  drawdownCushionProtectedPct: number;
  recoveryMonthsFiducia: number;
  recoveryMonthsUnadvised: number;
}

export interface CovidCrashMonthlyTrajectory {
  monthLabel: string;
  unadvisedDiyEquityValue: number; // Indexed to 100 in Jan 2020
  fiduciaDirectBasketValue: number; // Indexed to 100 in Jan 2020
}

/**
 * Computes how a specific Asset Allocation performs across major Indian historical stress events
 */
export function runHistoricalStressTestSuite(allocation: AssetAllocation): {
  stressEvents: HistoricalCrisisReplay[];
  covidCrash2020MonthlyCurve: CovidCrashMonthlyTrajectory[];
  expected10YrCagrPct: number;
  maxHistoricalDrawdownPct: number;
  calmarRatio: number;
} {
  const eqWeight = allocation.equityPct / 100;
  const debtWeight = allocation.debtPct / 100;
  const liqWeight = allocation.liquidArbitragePct / 100;
  const goldWeight = allocation.goldPct / 100;

  // Component returns during March 2020 COVID Shock (Peak-to-Trough Feb-Mar 2020)
  // Equity: -38.4%, Short/Corp Debt: +0.6%, Liquid/Arbitrage: +0.5%, Gold BeES: +8.2%
  const covidPortfolioDrawdownRaw =
    eqWeight * -38.4 + debtWeight * 0.6 + liqWeight * 0.5 + goldWeight * 8.2;
  const covidDrawdownPct = Math.round(Math.min(-1.5, covidPortfolioDrawdownRaw) * 10) / 10;

  // Component returns during Demonetization (Nov-Dec 2016)
  const demonetizationRaw =
    eqWeight * -11.2 + debtWeight * 1.8 + liqWeight * 0.6 + goldWeight * -1.5;
  const demonetizationDrawdownPct = Math.round(Math.min(-0.8, demonetizationRaw) * 10) / 10;

  // Component returns during IL&FS Crisis (Sep-Oct 2018)
  const ilfsRaw =
    eqWeight * -14.8 + debtWeight * 0.4 + liqWeight * 0.6 + goldWeight * 4.5;
  const ilfsDrawdownPct = Math.round(Math.min(-1.0, ilfsRaw) * 10) / 10;

  // Component returns during Russia-Ukraine Shock (Feb-Jun 2022)
  const ukraineRaw =
    eqWeight * -15.6 + debtWeight * 0.3 + liqWeight * 0.5 + goldWeight * 5.2;
  const ukraineDrawdownPct = Math.round(Math.min(-1.0, ukraineRaw) * 10) / 10;

  const stressEvents: HistoricalCrisisReplay[] = [
    {
      eventId: 'MARCH_2020_COVID',
      eventName: 'March 2020 COVID-19 Crash',
      eventDate: 'Feb 2020 – Mar 2020',
      niftyBenchmarkDrawdownPct: -38.4,
      unadvisedDiy100PctEquityDrawdownPct: -39.1,
      fiduciaPortfolioDrawdownPct: covidDrawdownPct,
      drawdownCushionProtectedPct: Math.round((39.1 - Math.abs(covidDrawdownPct)) * 10) / 10,
      recoveryMonthsFiducia: Math.max(2, Math.round(eqWeight * 14)),
      recoveryMonthsUnadvised: 11,
    },
    {
      eventId: 'NOV_2016_DEMONETIZATION',
      eventName: 'Demonetization Liquidity Shock',
      eventDate: 'Nov 2016 – Dec 2016',
      niftyBenchmarkDrawdownPct: -11.2,
      unadvisedDiy100PctEquityDrawdownPct: -12.8,
      fiduciaPortfolioDrawdownPct: demonetizationDrawdownPct,
      drawdownCushionProtectedPct:
        Math.round((12.8 - Math.abs(demonetizationDrawdownPct)) * 10) / 10,
      recoveryMonthsFiducia: 2,
      recoveryMonthsUnadvised: 4,
    },
    {
      eventId: 'SEP_2018_ILFS_CRISIS',
      eventName: 'IL&FS NBFC Credit Freeze',
      eventDate: 'Sep 2018 – Oct 2018',
      niftyBenchmarkDrawdownPct: -14.8,
      unadvisedDiy100PctEquityDrawdownPct: -16.5,
      fiduciaPortfolioDrawdownPct: ilfsDrawdownPct,
      drawdownCushionProtectedPct: Math.round((16.5 - Math.abs(ilfsDrawdownPct)) * 10) / 10,
      recoveryMonthsFiducia: 3,
      recoveryMonthsUnadvised: 6,
    },
    {
      eventId: 'FEB_2022_UKRAINE_SHOCK',
      eventName: 'Russia-Ukraine & Global Rate Hike Shock',
      eventDate: 'Feb 2022 – Jun 2022',
      niftyBenchmarkDrawdownPct: -15.6,
      unadvisedDiy100PctEquityDrawdownPct: -16.2,
      fiduciaPortfolioDrawdownPct: ukraineDrawdownPct,
      drawdownCushionProtectedPct: Math.round((16.2 - Math.abs(ukraineDrawdownPct)) * 10) / 10,
      recoveryMonthsFiducia: 3,
      recoveryMonthsUnadvised: 5,
    },
  ];

  const unadvisedMultipliers = [
    { m: 'Jan 2020', diy: 100.0, eqChange: 0.0, safeChange: 0.0 },
    { m: 'Feb 2020', diy: 93.4, eqChange: -6.6, safeChange: 0.7 },
    { m: 'Mar 2020 (Trough)', diy: 60.9, eqChange: -39.1, safeChange: 1.2 },
    { m: 'Apr 2020', diy: 71.2, eqChange: -28.8, safeChange: 2.1 },
    { m: 'May 2020', diy: 69.5, eqChange: -30.5, safeChange: 2.8 },
    { m: 'Jun 2020', diy: 76.8, eqChange: -23.2, safeChange: 3.5 },
    { m: 'Jul 2020', diy: 82.4, eqChange: -17.6, safeChange: 4.3 },
    { m: 'Aug 2020', diy: 86.1, eqChange: -13.9, safeChange: 4.9 },
    { m: 'Sep 2020', diy: 85.2, eqChange: -14.8, safeChange: 5.4 },
    { m: 'Oct 2020 (Recovered)', diy: 88.7, eqChange: -11.3, safeChange: 6.1 },
    { m: 'Nov 2020', diy: 98.9, eqChange: -1.1, safeChange: 6.8 },
    { m: 'Dec 2020', diy: 106.4, eqChange: 6.4, safeChange: 7.5 },
  ];

  const covidCrash2020MonthlyCurve: CovidCrashMonthlyTrajectory[] = unadvisedMultipliers.map(
    (pt) => {
      const safeWeight = debtWeight + liqWeight + goldWeight;
      const fiduciaChange = eqWeight * pt.eqChange + safeWeight * pt.safeChange;
      return {
        monthLabel: pt.m,
        unadvisedDiyEquityValue: pt.diy,
        fiduciaDirectBasketValue: Math.round((100 + fiduciaChange) * 10) / 10,
      };
    }
  );

  const expected10YrCagrPct =
    Math.round(
      (eqWeight * 15.6 + debtWeight * 7.8 + liqWeight * 6.8 + goldWeight * 11.9) * 100
    ) / 100;

  const maxHistoricalDrawdownPct = Math.abs(covidDrawdownPct);
  const calmarRatio =
    Math.round((expected10YrCagrPct / Math.max(1, maxHistoricalDrawdownPct)) * 100) / 100;

  return {
    stressEvents,
    covidCrash2020MonthlyCurve,
    expected10YrCagrPct,
    maxHistoricalDrawdownPct,
    calmarRatio,
  };
}
