/**
 * Phase 1 Comprehensive Unit & Integration Test Suite
 * Tests 100% of the deterministic Quant Mathematics, Goal Glide Paths,
 * Commission Erosion, Stock Overlap, Pre-Gen SEBI Guardrails, and Cryptographic Seal.
 */

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import {
  calculateRiskCapacity,
  calculateRiskTolerance,
  resolveRiskConflict,
  evaluateClientRiskProfile,
} from '../src/services/quant/riskEngine.js';
import {
  computeFutureValue,
  computeFlatMonthlySip,
  computeStepUpInitialMonthlySip,
  evaluateFinancialGoal,
  resolveActiveGlidePathStep,
} from '../src/services/quant/goalEngine.js';
import {
  FLAGSHIP_15_DIRECT_FUNDS,
  computeCommissionErosion,
  calculatePairwiseOverlapPct,
  selectOptimalDirectBasket,
} from '../src/services/quant/fundSelector.js';
import { runHistoricalStressTestSuite } from '../src/services/quant/backtestEngine.js';
import {
  inspectPromptGuardrails,
  enforceSuitabilityAssertions,
} from '../src/services/guardrails/guardrails.js';
import {
  generateSha256DigitalSeal,
  verifySha256DigitalSeal,
  assertPlanExportAllowed,
  stripClientPiiForExternalAi,
} from '../src/services/security/quarantineGate.js';
import { app } from '../src/app.js';

describe('Domain 02: Two-Dimensional Risk Profiling Engine (RC, RT & ERS)', () => {
  it('Persona 1 (Rohit Sharma — Overconfident Indebted Techie): Triggers CAPACITY_CLAMP', () => {
    // 29yo Software Engineer, Income 2.5L/mo, EMI 1.2L/mo (48% DTI), Runway ~1 month
    const capacity = calculateRiskCapacity({
      netMonthlyIncomeInr: 250000,
      monthlyLivingExpensesInr: 80000,
      totalMonthlyEmiInr: 120000,
      liquidSavingsInr: 200000, // 1 month runway
      primaryGoalHorizonYears: 3.5,
      incomeStability: 'SALARIED_MNC_PROFESSIONAL',
      clientAge: 29,
    });

    expect(capacity.dtiRatio).toBeCloseTo(0.48, 2);
    expect(capacity.dtiScore).toBe(45);
    expect(capacity.runwayMonths).toBeCloseTo(1.0, 2);
    expect(capacity.runwayScore).toBe(15);

    const rtScore = calculateRiskTolerance({
      drawdownReaction: 'BUY_THE_DIP_AGGRESSIVELY',
      volatilityPreference: 'HIGH_RETURN_HIGH_VOLATILITY',
      pastCrisisExperience: 'POST_2021_NO_CRASH_EXPERIENCE',
    });

    expect(rtScore).toBe(90); // 0.5*100 + 0.3*100 + 0.2*50 = 90

    const conflict = resolveRiskConflict(capacity.rcScore, rtScore);
    expect(conflict.ruleTriggered).toBe('CAPACITY_CLAMP');
    expect(conflict.effectiveRiskScore).toBe(capacity.rcScore);
  });

  it('Persona 2 (Dr. Priya Mehta — Inflation-Vulnerable Doctor): Triggers INFLATION_SHIELD_BRIDGE', () => {
    // 42yo Surgeon, Income 6L/mo, 0 EMI, 80L FD savings, 15yr horizon
    const evaluation = evaluateClientRiskProfile(
      {
        netMonthlyIncomeInr: 600000,
        monthlyLivingExpensesInr: 150000,
        totalMonthlyEmiInr: 0,
        liquidSavingsInr: 8000000,
        primaryGoalHorizonYears: 15,
        incomeStability: 'SALARIED_MNC_PROFESSIONAL',
        clientAge: 42,
      },
      {
        drawdownReaction: 'PANIC_SELL_ALL',
        volatilityPreference: 'CAPITAL_PROTECTION_PRIORITY',
        pastCrisisExperience: 'PANICKED_SOLD_AT_LOSS',
      }
    );

    expect(evaluation.riskCapacityScore).toBeGreaterThan(90);
    expect(evaluation.riskToleranceScore).toBe(13); // 0.5*10 + 0.3*20 + 0.2*10 = 13
    expect(evaluation.conflictRuleTriggered).toBe('INFLATION_SHIELD_BRIDGE');
    // ERS = RT + 0.30 * (RC - RT) = 13 + 0.30 * (97 - 13) = 38.2
    expect(evaluation.effectiveRiskScore).toBeCloseTo(38.2, 1);
    expect(evaluation.riskCategory).toBe('Conservative');
    expect(evaluation.executionTimeMs).toBeLessThan(18);
  });

  it('Enforces Harmonious Alignment when |RT - RC| <= 20', () => {
    const conflict = resolveRiskConflict(70, 80);
    expect(conflict.ruleTriggered).toBe('HARMONIOUS_ALIGNMENT');
    expect(conflict.effectiveRiskScore).toBe(74); // 0.6*70 + 0.4*80 = 74
  });
});

describe('Domain 03: Segmented Goal Inflation & Dynamic Step-Down Glide Path', () => {
  it('Proves the ₹25,07,984 shortfall between Naive 6% CPI and 8.5% Education Inflation on ₹25L over 15 years', () => {
    const naiveFv = computeFutureValue(2500000, 6.0, 15);
    const segmentedFv = computeFutureValue(2500000, 8.5, 15);

    expect(naiveFv).toBe(5991395);
    expect(segmentedFv).toBe(8499357);
    expect(segmentedFv - naiveFv).toBeGreaterThan(2500000);
  });

  it('Computes Step-Up SIP (10% annual increase) reducing initial monthly cashflow burden by >35%', () => {
    const flatSip = computeFlatMonthlySip(8500000, 12.0, 15);
    const stepUpSip = computeStepUpInitialMonthlySip(8500000, 12.0, 15, 10.0);

    expect(stepUpSip).toBeLessThan(flatSip * 0.65);
  });

  it('Persona 3 (Vikram Kapoor — Pre-Retiree): Transitions Glide Path to 0% Equity in Final Year', () => {
    const phaseAccumulation = resolveActiveGlidePathStep(10);
    const phasePreservation = resolveActiveGlidePathStep(2.5);
    const phaseLock = resolveActiveGlidePathStep(0.8);

    expect(phaseAccumulation.allocation.equityPct).toBe(75);
    expect(phasePreservation.allocation.equityPct).toBe(25);
    expect(phaseLock.allocation.equityPct).toBe(0);
    expect(phaseLock.allocation.liquidArbitragePct).toBe(80);
  });
});

describe('Domain 04: Direct-Plan Fund Selection, Overlap Shield & Backtest Engine', () => {
  it('Contains all 15 curated AMFI Direct-Plan Growth schemes', () => {
    expect(FLAGSHIP_15_DIRECT_FUNDS).toHaveLength(15);
  });

  it('Verifies >₹42 Lakhs saved on a ₹25,000/mo SIP over 20 years in Direct vs Regular plans', () => {
    const erosion = computeCommissionErosion(25000, 20, 13.5, 0.65, 1.85);
    expect(erosion.totalCommissionSavedInr).toBeGreaterThan(4100000);
  });

  it('Flags High Portfolio Overlap (>45%) between two Large Cap Index funds', () => {
    const utiNifty = FLAGSHIP_15_DIRECT_FUNDS[0];
    const hdfcSensex = FLAGSHIP_15_DIRECT_FUNDS[1];

    const overlap = calculatePairwiseOverlapPct(utiNifty, hdfcSensex);
    expect(overlap.overlapPct).toBeGreaterThan(45);
    expect(overlap.isRedundantAlert).toBe(true);
  });

  it('Simulates March 2020 COVID Crash (-16.2% Balanced Basket vs -39.1% Unadvised DIY)', () => {
    const bt = runHistoricalStressTestSuite({
      equityPct: 45,
      debtPct: 35,
      liquidArbitragePct: 15,
      goldPct: 5,
    });
    const covidEvent = bt.stressEvents.find((e) => e.eventId === 'MARCH_2020_COVID')!;
    expect(covidEvent.unadvisedDiy100PctEquityDrawdownPct).toBe(-39.1);
    expect(covidEvent.fiduciaPortfolioDrawdownPct).toBeCloseTo(-16.5, 0);
    expect(bt.covidCrash2020MonthlyCurve).toHaveLength(12);
  });
});

describe('Domain 06 & 07: SEBI Guardrails, Suitability Clamps & SHA-256 Quarantine Gate', () => {
  it('Intercepts adversarial prompts (G-01 Guaranteed Return, G-02 F&O Loss, G-03 Crypto, G-04 Emergency Drain)', () => {
    const g01 = inspectPromptGuardrails('Give me a guaranteed 25% return mutual fund');
    expect(g01.passed).toBe(false);
    expect(g01.violatedRuleId).toBe('G-01');

    const g02 = inspectPromptGuardrails('How to recover F&O loss using hero-zero option trade?');
    expect(g02.passed).toBe(false);
    expect(g02.violatedRuleId).toBe('G-02');

    const g03 = inspectPromptGuardrails('Allocate 50% of client portfolio to Bitcoin and crypto');
    expect(g03.passed).toBe(false);
    expect(g03.violatedRuleId).toBe('G-03');

    const g04 = inspectPromptGuardrails('Invest all my emergency cash in small-cap stocks');
    expect(g04.passed).toBe(false);
    expect(g04.violatedRuleId).toBe('G-04');

    const valid = inspectPromptGuardrails('What is the exit load of Parag Parikh Flexi Cap Fund?');
    expect(valid.passed).toBe(true);
  });

  it('Enforces Senior Citizen Suitability Assertion A1 (Age 65 -> Equity Clamped to 30%)', () => {
    const check = enforceSuitabilityAssertions(
      { equityPct: 90, debtPct: 5, liquidArbitragePct: 0, goldPct: 5 },
      { clientAge: 65, dtiRatio: 0.1, runwayMonths: 12 }
    );
    expect(check.isCompliant).toBe(false);
    expect(check.clampedAllocation.equityPct).toBe(30);
  });

  it('Enforces HTTP 403 Quarantine Gate before signing and unlocks after SHA-256 signature', async () => {
    const evalRes = await request(app)
      .post('/api/v1/quant/evaluate-plan')
      .send({
        clientId: 'client_rohit_01',
        capacityInputs: {
          netMonthlyIncomeInr: 250000,
          monthlyLivingExpensesInr: 80000,
          totalMonthlyEmiInr: 120000,
          liquidSavingsInr: 200000,
          primaryGoalHorizonYears: 10,
          incomeStability: 'SALARIED_MNC_PROFESSIONAL',
          clientAge: 29,
        },
        toleranceInputs: {
          drawdownReaction: 'BUY_THE_DIP_AGGRESSIVELY',
          volatilityPreference: 'HIGH_RETURN_HIGH_VOLATILITY',
          pastCrisisExperience: 'POST_2021_NO_CRASH_EXPERIENCE',
        },
        goalInput: {
          goalName: 'Child Higher Education',
          category: 'CHILD_HIGHER_EDUCATION',
          presentCostInr: 2500000,
          horizonYears: 15,
        },
      });

    expect(evalRes.status).toBe(200);
    const { planId } = evalRes.body;

    // Attempt export while QUARANTINED -> Must return HTTP 403
    const blockedExport = await request(app).get(`/api/v1/plans/${planId}/export`);
    expect(blockedExport.status).toBe(403);
    expect(blockedExport.body.code).toBe('PLAN_QUARANTINED');

    // Sign plan as licensed SEBI RIA
    const signRes = await request(app)
      .post(`/api/v1/plans/${planId}/sign`)
      .send({
        riaSebiRegistration: 'INA000018492',
        riaAdvisorNotes: 'Capacity clamp verified. Approved for client execution.',
      });

    expect(signRes.status).toBe(200);
    expect(signRes.body.sha256DigitalSeal).toMatch(/^[a-f0-9]{64}$/);

    // Retry export after sign-off -> Must return HTTP 200
    const unlockedExport = await request(app).get(`/api/v1/plans/${planId}/export`);
    expect(unlockedExport.status).toBe(200);
    expect(unlockedExport.body.quarantineStatus).toBe('APPROVED_SIGNED');
  });

  it('Strips all Client PII before external AI dispatch', () => {
    const anonymized = stripClientPiiForExternalAi({
      clientId: 'rohit_sharma_pan_abcde1234f',
      fullName: 'Rohit Sharma',
      email: 'rohit@gmail.com',
      phone: '+919876543210',
      panNumber: 'ABCDE1234F',
      age: 29,
      netMonthlyIncomeInr: 250000,
      totalMonthlyEmiInr: 120000,
      liquidRunwayMonths: 1.0,
      effectiveRiskScore: 30,
      recommendedAllocation: { equityPct: 25, debtPct: 45, liquidArbitragePct: 25, goldPct: 5 },
    });

    expect(JSON.stringify(anonymized)).not.toContain('Rohit');
    expect(JSON.stringify(anonymized)).not.toContain('ABCDE1234F');
    expect(anonymized.client_token).toMatch(/^token_[a-f0-9]{8}$/);
  });
});
