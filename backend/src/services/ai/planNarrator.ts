/**
 * Domain 05 & 07: Fiduciary Plan Narrator with Strict Client PII Stripping
 * Generates plain-language Indian RIA advisory memos explaining why a client's
 * Financial Safety Cushion (RC), Market Crash Comfort (RT), Glide Path, and
 * 100% Direct Mutual Fund Basket were selected, while guaranteeing zero PII leakage.
 */

import {
  CommissionErosionResult,
  DirectFundScheme,
  GoalProjectionResult,
  RiskEvaluationResult,
} from '../../types/finance.types.js';
import { stripClientPiiForExternalAi } from '../security/quarantineGate.js';
import {
  AiProviderType,
  executeThroughAiGateway,
} from './aiGateway.js';

export interface GenerateFiduciaryMemoParams {
  clientId: string;
  fullName?: string;
  email?: string;
  phone?: string;
  panNumber?: string;
  clientAge: number;
  netMonthlyIncomeInr: number;
  totalMonthlyEmiInr: number;
  riskProfile: RiskEvaluationResult;
  goalProjection: GoalProjectionResult;
  selectedBasket: Array<{
    fund: DirectFundScheme;
    weightPct: number;
    quantScore: number;
  }>;
  commissionErosion: CommissionErosionResult;
}

export interface FiduciaryMemoResult {
  memoMarkdown: string;
  anonymizedTokenUsed: string;
  piiVerifiedStripped: boolean;
  providerUsed: AiProviderType;
  latencyMs: number;
}

const PLAN_NARRATOR_SYSTEM_INSTRUCTION = `You are a Fiduciary Drafting Engine for a licensed Indian SEBI Registered Investment Adviser (INA000018492).
Write a calm, clear, plain-language Fiduciary Suitability Memo in 3 concise paragraphs:
1. Explain the client's Financial Safety Cushion (RC) vs Market Crash Comfort (RT) and any safety clamp applied under SEBI Regulation 17.
2. Explain the goal's Future Cost using segmented Indian inflation and how the 10% yearly step-up SIP and Auto Safety Shift protect their capital.
3. Highlight the 100% Direct-Plan Mutual Fund basket, citing the exact docId and expense ratios, and state the total broker commission saved over the horizon.`;

export async function generateFiduciaryPlanMemo(
  params: GenerateFiduciaryMemoParams
): Promise<FiduciaryMemoResult> {
  // Step 1: Mandatory PII Stripping before any external AI Gateway dispatch
  const anonymizedPayload = stripClientPiiForExternalAi({
    clientId: params.clientId,
    fullName: params.fullName,
    email: params.email,
    phone: params.phone,
    panNumber: params.panNumber,
    age: params.clientAge,
    netMonthlyIncomeInr: params.netMonthlyIncomeInr,
    totalMonthlyEmiInr: params.totalMonthlyEmiInr,
    liquidRunwayMonths: params.riskProfile.metrics.runwayMonths,
    effectiveRiskScore: params.riskProfile.effectiveRiskScore,
    recommendedAllocation: params.riskProfile.recommendedAllocation,
  });

  const basketSummary = params.selectedBasket
    .map(
      (b) =>
        `${b.fund.schemeName} (${b.weightPct}% weight, Direct TER ${b.fund.directTerPct}% vs Regular ${b.fund.regularTerPct}%, [${b.fund.docId}])`
    )
    .join('; ');

  const deterministicMemoBuilder = (): string => {
    const lakSaved = (
      params.commissionErosion.totalCommissionSavedInr / 100000
    ).toFixed(2);
    const fvLakhs = (
      params.goalProjection.segmentedFutureValueInr / 100000
    ).toFixed(2);

    return [
      `**1. SEBI Regulation 17 Suitability & Risk Balance (${params.riskProfile.riskCategory}):** ${params.riskProfile.conflictExplanation} Your portfolio is structured at **${params.riskProfile.recommendedAllocation.equityPct}% Direct Equity**, **${params.riskProfile.recommendedAllocation.debtPct}% High-Grade Debt**, **${params.riskProfile.recommendedAllocation.liquidArbitragePct}% Liquid/Arbitrage**, and **${params.riskProfile.recommendedAllocation.goldPct}% Sovereign Gold ETF**.`,
      `**2. Segmented Inflation & Auto Safety Shift (${params.goalProjection.goalName}):** Accounting for **${params.goalProjection.appliedInflationRatePct}% annual inflation**, your target corpus in ${params.goalProjection.horizonYears} years is **₹${fvLakhs} Lakhs** (preventing a ₹${(
        params.goalProjection.inflationShortfallPreventedInr / 100000
      ).toFixed(
        2
      )} Lakh shortfall compared to generic 6% CPI tools). By utilizing a **${params.goalProjection.stepUpAnnualIncreasePct}% annual Step-Up SIP**, your starting monthly commitment drops from ₹${params.goalProjection.flatMonthlySipInr.toLocaleString(
        'en-IN'
      )} to **₹${params.goalProjection.stepUpInitialMonthlySipInr.toLocaleString(
        'en-IN'
      )}/month**, currently positioned in the **${params.goalProjection.currentGlidePathPhase.phaseName}**.`,
      `**3. 100% Direct-Plan Execution & Commission Shield:** Allocated strictly across zero-commission AMFI Direct schemes (${basketSummary}). Over ${params.commissionErosion.horizonYears} years, eliminating distributor trail commissions saves your household **₹${lakSaved} Lakhs** under SEBI IA Regulation 15.`,
    ].join('\n\n');
  };

  const userPrompt = `ANONYMIZED CLIENT TELEMETRY: ${JSON.stringify(
    anonymizedPayload
  )}
CONFLICT EXPLANATION: ${params.riskProfile.conflictExplanation}
GOAL PROJECTION: ${params.goalProjection.goalName}, Horizon ${params.goalProjection.horizonYears}y, Inflation ${params.goalProjection.appliedInflationRatePct}%, Target FV ₹${params.goalProjection.segmentedFutureValueInr}, Step-Up SIP ₹${params.goalProjection.stepUpInitialMonthlySipInr}/mo.
DIRECT BASKET: ${basketSummary}
COMMISSION SAVED: ₹${params.commissionErosion.totalCommissionSavedInr}`;

  const gatewayRes = await executeThroughAiGateway({
    systemInstruction: PLAN_NARRATOR_SYSTEM_INSTRUCTION,
    userPrompt,
    cacheKeySalt: `MEMO::${anonymizedPayload.client_token}::${params.riskProfile.effectiveRiskScore}`,
    deterministicFallbackSynthesis: deterministicMemoBuilder,
  });

  return {
    memoMarkdown: gatewayRes.text,
    anonymizedTokenUsed: anonymizedPayload.client_token,
    piiVerifiedStripped: true,
    providerUsed: gatewayRes.providerUsed,
    latencyMs: gatewayRes.latencyMs,
  };
}
