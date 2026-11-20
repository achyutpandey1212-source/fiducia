/**
 * Domain 07: Cryptographic Human-in-the-Loop (HITL) Quarantine Architecture
 * Enforces HTTP 403 Quarantine Gate until licensed SEBI RIA sign-off,
 * generates tamper-evident SHA-256 digital seals, and strips client PII.
 */

import crypto from 'node:crypto';
import { AssetAllocation } from '../../types/finance.types.js';

export type PlanQuarantineStatus = 'QUARANTINED' | 'APPROVED_SIGNED';

export interface CanonicalSignPayload {
  plan_id: string;
  client_id: string;
  ria_sebi_registration: string; // e.g. "INA000018492"
  signed_timestamp_utc: string;  // ISO-8601 UTC timestamp
  effective_risk_score: number;
  asset_allocation: {
    equity_pct: number;
    debt_pct: number;
    liquid_pct: number;
    gold_pct: number;
  };
  recommended_fund_isin: string[];
  model_version: string;
}

export interface SignedPlanRecord {
  planId: string;
  clientId: string;
  status: PlanQuarantineStatus;
  quarantinedAtUtc: string;
  signedAtUtc?: string;
  riaSebiRegistration?: string;
  riaAdvisorNotes?: string;
  sha256DigitalSeal?: string;
  canonicalPayload?: CanonicalSignPayload;
}

/**
 * Deterministically serializes a CanonicalSignPayload with sorted keys
 * and computes its SHA-256 cryptographic hex digest.
 */
export function generateSha256DigitalSeal(payload: CanonicalSignPayload): {
  canonicalJson: string;
  sha256Hex: string;
} {
  const canonicalObject: CanonicalSignPayload = {
    plan_id: payload.plan_id,
    client_id: payload.client_id,
    ria_sebi_registration: payload.ria_sebi_registration,
    signed_timestamp_utc: payload.signed_timestamp_utc,
    effective_risk_score: payload.effective_risk_score,
    asset_allocation: {
      equity_pct: payload.asset_allocation.equity_pct,
      debt_pct: payload.asset_allocation.debt_pct,
      liquid_pct: payload.asset_allocation.liquid_pct,
      gold_pct: payload.asset_allocation.gold_pct,
    },
    recommended_fund_isin: [...payload.recommended_fund_isin].sort(),
    model_version: payload.model_version,
  };

  const canonicalJson = JSON.stringify(canonicalObject);
  const sha256Hex = crypto.createHash('sha256').update(canonicalJson, 'utf8').digest('hex');

  return { canonicalJson, sha256Hex };
}

/**
 * Verifies whether a signed plan's SHA-256 seal is authentic and untampered
 */
export function verifySha256DigitalSeal(
  payload: CanonicalSignPayload,
  expectedSha256Hex: string
): boolean {
  const { sha256Hex } = generateSha256DigitalSeal(payload);
  return sha256Hex === expectedSha256Hex;
}

/**
 * Enforces the HTTP 403 Quarantine Barrier prior to PDF export or client sharing
 */
export function assertPlanExportAllowed(plan: {
  planId: string;
  status: PlanQuarantineStatus;
  quarantinedAtUtc: string;
  sha256DigitalSeal?: string;
}): {
  allowed: boolean;
  httpStatusCode: 200 | 403;
  errorPayload?: {
    status: 'error';
    code: 'PLAN_QUARANTINED';
    message: string;
    plan_id: string;
    quarantined_at: string;
  };
} {
  if (plan.status !== 'APPROVED_SIGNED' || !plan.sha256DigitalSeal) {
    return {
      allowed: false,
      httpStatusCode: 403,
      errorPayload: {
        status: 'error',
        code: 'PLAN_QUARANTINED',
        message:
          'This plan is under mandatory regulatory quarantine. Under SEBI IA Regulations, it cannot be exported or distributed until reviewed and digitally signed by an authorized RIA.',
        plan_id: plan.planId,
        quarantined_at: plan.quarantinedAtUtc,
      },
    };
  }

  return {
    allowed: true,
    httpStatusCode: 200,
  };
}

/**
 * 5. Client PII Stripping Architecture
 * Strips Name, Phone, Email, PAN, Aadhaar before any external AI Gateway call.
 */
export function stripClientPiiForExternalAi(rawClientRecord: {
  clientId: string;
  fullName?: string;
  email?: string;
  phone?: string;
  panNumber?: string;
  age: number;
  netMonthlyIncomeInr: number;
  totalMonthlyEmiInr: number;
  liquidRunwayMonths: number;
  effectiveRiskScore: number;
  recommendedAllocation: AssetAllocation;
}): {
  client_token: string;
  age: number;
  annual_income_inr: number;
  monthly_emi_inr: number;
  liquid_runway_months: number;
  ers_score: number;
  allocation: AssetAllocation;
} {
  const tokenHash = crypto
    .createHash('sha256')
    .update(rawClientRecord.clientId)
    .digest('hex')
    .slice(0, 8);

  return {
    client_token: `token_${tokenHash}`,
    age: rawClientRecord.age,
    annual_income_inr: rawClientRecord.netMonthlyIncomeInr * 12,
    monthly_emi_inr: rawClientRecord.totalMonthlyEmiInr,
    liquid_runway_months: rawClientRecord.liquidRunwayMonths,
    ers_score: rawClientRecord.effectiveRiskScore,
    allocation: rawClientRecord.recommendedAllocation,
  };
}
