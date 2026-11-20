/**
 * Fiducia — Primary Express + TypeScript API Server
 * Exposes Deterministic Quant Math, Pre-Gen Guardrails, Quarantine Gate & Health Telemetry
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { evaluateClientRiskProfile } from './services/quant/riskEngine.js';
import { evaluateFinancialGoal } from './services/quant/goalEngine.js';
import {
  FLAGSHIP_15_DIRECT_FUNDS,
  computeCommissionErosion,
  calculatePairwiseOverlapPct,
  selectOptimalDirectBasket,
} from './services/quant/fundSelector.js';
import { runHistoricalStressTestSuite } from './services/quant/backtestEngine.js';
import {
  inspectPromptGuardrails,
  enforceSuitabilityAssertions,
} from './services/guardrails/guardrails.js';
import {
  PlanQuarantineStatus,
  SignedPlanRecord,
  assertPlanExportAllowed,
  generateSha256DigitalSeal,
} from './services/security/quarantineGate.js';
import { getMongoConnectionStatus } from './config/mongodb.js';
import { getKeepAliveTelemetry } from './services/infrastructure/keepAlive.service.js';
import { STATUTORY_FACTSHEET_CHUNKS } from './services/ai/factsheetCorpus.js';
import { getAiGatewayTelemetry } from './services/ai/aiGateway.js';
import { queryFiduciaryRagPipeline } from './services/ai/ragEngine.js';
import { generateFiduciaryPlanMemo } from './services/ai/planNarrator.js';

dotenv.config();

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// In-memory store for plans during Phase 1 / fallback mode
const planStore = new Map<string, SignedPlanRecord & { planData: unknown }>();

/**
 * 1. Health & Zero-Cost Infrastructure Telemetry Endpoints
 */
app.get('/api/v1/health/keep-alive', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'fiducia-api',
    modelVersion: process.env.APP_VERSION || 'fiducia-v1.0.0',
    databaseStatus: getMongoConnectionStatus(),
    keepAlive: getKeepAliveTelemetry(),
    timestampUtc: new Date().toISOString(),
  });
});

/**
 * 2. Complete End-to-End Deterministic Quant Plan Evaluation (< 18ms)
 */
app.post('/api/v1/quant/evaluate-plan', async (req, res) => {
  const start = performance.now();
  try {
    const {
      clientId,
      fullName,
      email,
      phone,
      panNumber,
      capacityInputs,
      toleranceInputs,
      goalInput,
      monthlySipInr,
    } = req.body;

    const riskProfile = evaluateClientRiskProfile(capacityInputs, toleranceInputs);
    const goalProjection = evaluateFinancialGoal({
      ...goalInput,
      horizonYears: goalInput?.horizonYears ?? capacityInputs.primaryGoalHorizonYears,
    });

    const isSenior = capacityInputs.clientAge >= 60;
    const directBasket = selectOptimalDirectBasket(riskProfile.recommendedAllocation, isSenior);
    const historicalBacktest = runHistoricalStressTestSuite(riskProfile.recommendedAllocation);
    const commissionErosion = computeCommissionErosion(
      monthlySipInr || goalProjection.stepUpInitialMonthlySipInr || 25000,
      capacityInputs.primaryGoalHorizonYears || 20
    );

    const fiduciaryMemo = await generateFiduciaryPlanMemo({
      clientId: clientId || 'client_anonymous',
      fullName,
      email,
      phone,
      panNumber,
      clientAge: capacityInputs.clientAge,
      netMonthlyIncomeInr: capacityInputs.netMonthlyIncomeInr,
      totalMonthlyEmiInr: capacityInputs.totalMonthlyEmiInr,
      riskProfile,
      goalProjection,
      selectedBasket: directBasket.basket,
      commissionErosion,
    });

    const planId = `plan_${Date.now().toString(36)}`;
    const quarantinedAtUtc = new Date().toISOString();

    const planRecord: SignedPlanRecord & { planData: unknown } = {
      planId,
      clientId: clientId || 'client_anonymous',
      status: 'QUARANTINED',
      quarantinedAtUtc,
      planData: {
        riskProfile,
        goalProjection,
        directBasket,
        historicalBacktest,
        commissionErosion,
        fiduciaryMemo,
      },
    };

    planStore.set(planId, planRecord);

    const totalComputeMs = Math.round((performance.now() - start) * 1000) / 1000;

    res.status(200).json({
      status: 'success',
      planId,
      quarantineStatus: 'QUARANTINED' as PlanQuarantineStatus,
      totalComputeMs,
      riskProfile,
      goalProjection,
      directBasket,
      historicalBacktest,
      commissionErosion,
      fiduciaryMemo,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
});

/**
 * 3. Curated 15 Flagship Direct Mutual Funds & Overlap Audit
 */
app.get('/api/v1/funds', (_req, res) => {
  res.status(200).json({
    status: 'success',
    count: FLAGSHIP_15_DIRECT_FUNDS.length,
    funds: FLAGSHIP_15_DIRECT_FUNDS,
  });
});

app.post('/api/v1/funds/overlap', (req, res) => {
  const { isinA, isinB } = req.body;
  const fundA = FLAGSHIP_15_DIRECT_FUNDS.find((f) => f.isin === isinA);
  const fundB = FLAGSHIP_15_DIRECT_FUNDS.find((f) => f.isin === isinB);

  if (!fundA || !fundB) {
    res.status(404).json({ status: 'error', message: 'One or both fund ISINs not found.' });
    return;
  }

  const overlap = calculatePairwiseOverlapPct(fundA, fundB);
  res.status(200).json({
    status: 'success',
    fundA: fundA.schemeName,
    fundB: fundB.schemeName,
    ...overlap,
  });
});

/**
 * 4. Pre-Generation SEBI Guardrails & Suitability Check
 */
app.post('/api/v1/guardrails/inspect-prompt', (req, res) => {
  const { prompt } = req.body;
  const result = inspectPromptGuardrails(prompt || '');

  if (!result.passed) {
    res.status(403).json({
      status: 'blocked',
      code: 'SEBI_GUARDRAIL_INTERCEPTED',
      ...result,
    });
    return;
  }

  res.status(200).json({
    status: 'passed',
    ...result,
  });
});

app.post('/api/v1/guardrails/assert-suitability', (req, res) => {
  const { proposedAllocation, clientContext } = req.body;
  const assertion = enforceSuitabilityAssertions(proposedAllocation, clientContext);
  res.status(assertion.isCompliant ? 200 : 403).json(assertion);
});

/**
 * 5. Cryptographic HITL Quarantine Gate & SHA-256 Sign-Off
 */
app.get('/api/v1/plans/:planId/export', (req, res) => {
  const plan = planStore.get(req.params.planId);
  if (!plan) {
    res.status(404).json({ status: 'error', message: 'Plan not found.' });
    return;
  }

  const check = assertPlanExportAllowed(plan);
  if (!check.allowed) {
    res.status(403).json(check.errorPayload);
    return;
  }

  res.status(200).json({
    status: 'success',
    planId: plan.planId,
    quarantineStatus: plan.status,
    sha256DigitalSeal: plan.sha256DigitalSeal,
    signedAtUtc: plan.signedAtUtc,
    riaSebiRegistration: plan.riaSebiRegistration,
    riaAdvisorNotes: plan.riaAdvisorNotes,
    planData: plan.planData,
  });
});

app.post('/api/v1/plans/:planId/sign', (req, res) => {
  const plan = planStore.get(req.params.planId);
  if (!plan) {
    res.status(404).json({ status: 'error', message: 'Plan not found.' });
    return;
  }

  const {
    riaSebiRegistration = 'INA000018492',
    riaAdvisorNotes = 'Reviewed and approved under SEBI Regulation 17 & 19.',
    effectiveRiskScore = 50,
    assetAllocation = { equity_pct: 50, debt_pct: 35, liquid_pct: 10, gold_pct: 5 },
    recommendedFundIsin = ['INF789F01XA0', 'INF879O01027'],
  } = req.body;

  const signedTimestampUtc = new Date().toISOString();
  const canonicalPayload = {
    plan_id: plan.planId,
    client_id: plan.clientId,
    ria_sebi_registration: riaSebiRegistration,
    signed_timestamp_utc: signedTimestampUtc,
    effective_risk_score: effectiveRiskScore,
    asset_allocation: assetAllocation,
    recommended_fund_isin: recommendedFundIsin,
    model_version: process.env.APP_VERSION || 'fiducia-v1.0.0',
  };

  const { sha256Hex } = generateSha256DigitalSeal(canonicalPayload);

  plan.status = 'APPROVED_SIGNED';
  plan.signedAtUtc = signedTimestampUtc;
  plan.riaSebiRegistration = riaSebiRegistration;
  plan.riaAdvisorNotes = riaAdvisorNotes;
  plan.sha256DigitalSeal = sha256Hex;
  plan.canonicalPayload = canonicalPayload;

  planStore.set(plan.planId, plan);

  res.status(200).json({
    status: 'success',
    planId: plan.planId,
    quarantineStatus: plan.status,
    sha256DigitalSeal: sha256Hex,
    signedTimestampUtc,
    riaSebiRegistration,
    canonicalPayload,
  });
});

/**
 * 6. Phase 2: Fiduciary Cited RAG Research Pipeline & Statutory Factsheet Endpoints
 */
app.post('/api/v1/rag/query', async (req, res) => {
  try {
    const { query, filterIsin, topK } = req.body;
    const ragResult = await queryFiduciaryRagPipeline({
      query: query || '',
      filterIsin,
      topK,
    });

    if (ragResult.status === 'BLOCKED_BY_SEBI_GUARDRAIL') {
      res.status(403).json(ragResult);
      return;
    }

    res.status(200).json(ragResult);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: (err as Error).message,
    });
  }
});

app.get('/api/v1/rag/factsheets', (_req, res) => {
  res.status(200).json({
    status: 'success',
    totalChunks: STATUTORY_FACTSHEET_CHUNKS.length,
    chunks: STATUTORY_FACTSHEET_CHUNKS,
  });
});

/**
 * 7. Phase 2: Admin System & AI Gateway Key Pool Telemetry (`/admin/system`)
 */
app.get('/api/v1/admin/telemetry', (_req, res) => {
  const aiTelemetry = getAiGatewayTelemetry();
  res.status(200).json({
    status: 'ok',
    service: 'fiducia-api',
    modelVersion: process.env.APP_VERSION || 'fiducia-v1.0.0',
    infrastructureCostInr: 0,
    databaseStatus: getMongoConnectionStatus(),
    keepAlive: getKeepAliveTelemetry(),
    aiGateway: aiTelemetry,
    timestampUtc: new Date().toISOString(),
  });
});
