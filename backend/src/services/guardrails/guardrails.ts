/**
 * Domain 06: Bi-Directional Regulatory Guardrails & Adversarial Interception
 * Implements Pre-Generation Deterministic Interceptors (G-01 to G-04) and
 * Post-Generation Suitability Assertions (SEBI IA Regulations 15 & 17).
 */

import { AssetAllocation } from '../../types/finance.types.js';

export type InterceptorRuleId = 'G-01' | 'G-02' | 'G-03' | 'G-04';

export interface GuardrailInspectionResult {
  passed: boolean;
  violatedRuleId?: InterceptorRuleId;
  ruleName?: string;
  sebiRegulationCited?: string;
  statutoryWarningNotice?: string;
  executionLatencyMs: number;
}

interface InterceptorSpec {
  id: InterceptorRuleId;
  name: string;
  sebiRegulation: string;
  patterns: RegExp[];
  statutoryWarning: string;
}

const PRE_GEN_INTERCEPTORS: InterceptorSpec[] = [
  {
    id: 'G-01',
    name: 'Return Guarantee Interceptor',
    sebiRegulation: 'SEBI (Investment Advisers) Regulations, 2013 — Regulation 15(1)',
    patterns: [
      /\b(guarantee|guaranteed|assured|risk[- ]?free)\b.*\b(\d+\s*%|return|profit|double|income)\b/i,
      /\b(\d+\s*%|return|profit)\b.*\b(guarantee|guaranteed|assured|risk[- ]?free|fixed)\b/i,
      /\b(safe|sure|certain)\s+(1[2-9]|[2-9]\d)\s*%\s*(return|cagr|interest)?/i,
    ],
    statutoryWarning:
      'SEBI Statutory Warning: Mutual funds and securities are subject to market risks. Promising, implying, or guaranteeing fixed/assured returns on market-linked instruments is strictly illegal under SEBI IA Regulation 15(1).',
  },
  {
    id: 'G-02',
    name: 'F&O Loss-Chasing & Speculative Derivatives Gate',
    sebiRegulation: 'SEBI (Investment Advisers) Regulations, 2013 — Regulation 17 (Suitability)',
    patterns: [
      /\b(recover|make back)\b.*\b(f&o|fno|options?|futures?|intraday|loss|losses)\b/i,
      /\b(hero[- ]?zero|naked\s+option|intraday\s+leverage|jackpot\s+call|expiry\s+trade)\b/i,
    ],
    statutoryWarning:
      'SEBI Statutory Warning (F&O Risk Disclosure): Official SEBI empirical studies establish that 93% of individual retail traders incur net losses in Equity Futures & Options. Loss-chasing via leveraged derivatives is blocked; workflow locked to fiduciary capital preservation.',
  },
  {
    id: 'G-03',
    name: 'Unregulated Asset & Crypto Filter',
    sebiRegulation: 'SEBI (Investment Advisers) Regulations, 2013 — Regulation 15(9)',
    patterns: [
      /\b(bitcoin|btc|ethereum|crypto|cryptocurrency|altcoin|dogecoin|solana|memecoin|nft|nfts|binary\s+options?|chit\s+fund|ponzi|forex\s+trading)\b/i,
    ],
    statutoryWarning:
      'SEBI Statutory Warning: The requested instrument (Cryptocurrency / Unregulated Contract / Chit Fund) falls outside SEBI regulatory jurisdiction and is not covered by the SEBI Investor Protection Fund (IPF). A licensed RIA cannot recommend unregulated speculative assets.',
  },
  {
    id: 'G-04',
    name: 'Emergency Liquidity Reserve Drain Trap',
    sebiRegulation: 'SEBI (Investment Advisers) Regulations, 2013 — Regulation 17(1)',
    patterns: [
      /\b(invest|put|move|deploy|gamble)\b.*\b(all\s+my\s+)?(emergency\s+(fund|cash|savings|buffer|money)|medical\s+buffer)\b.*\b(in|into|to)\b.*\b(stocks?|equity|small[- ]?cap|mid[- ]?cap|market)\b/i,
      /\b(gamble|bet)\s+(my\s+)?(savings|emergency|rent|hospital)\b/i,
    ],
    statutoryWarning:
      'SEBI Fiduciary Suitability Block (Reg 17): Depleting household emergency cash reserves into volatile equities exposes the family to forced liquidation during emergencies. 100% of emergency reserves must remain in Overnight/Liquid T+1 instruments.',
  },
];

/**
 * 2. Pre-Generation Adversarial Prompt Firewall
 * Evaluates incoming user/adviser prompts in < 2ms before any LLM or RAG call.
 */
export function inspectPromptGuardrails(prompt: string): GuardrailInspectionResult {
  const start = performance.now();
  const normalized = (prompt || '').trim();

  for (const spec of PRE_GEN_INTERCEPTORS) {
    for (const regex of spec.patterns) {
      if (regex.test(normalized)) {
        return {
          passed: false,
          violatedRuleId: spec.id,
          ruleName: spec.name,
          sebiRegulationCited: spec.sebiRegulation,
          statutoryWarningNotice: spec.statutoryWarning,
          executionLatencyMs: Math.round((performance.now() - start) * 1000) / 1000,
        };
      }
    }
  }

  return {
    passed: true,
    executionLatencyMs: Math.round((performance.now() - start) * 1000) / 1000,
  };
}

/**
 * 3. Post-Generation Suitability Assertions (SEBI Reg 17)
 * Enforces deterministic bounds on any proposed or manually dragged slider allocation.
 */
export function enforceSuitabilityAssertions(
  proposedAllocation: AssetAllocation,
  clientContext: {
    clientAge: number;
    dtiRatio: number;
    runwayMonths: number;
  }
): {
  isCompliant: boolean;
  clampedAllocation: AssetAllocation;
  violationsIntercepted: string[];
} {
  const violationsIntercepted: string[] = [];
  let clamped = { ...proposedAllocation };

  // Assertion A1: Senior Citizen Capital Shield (Age >= 60 -> Max Equity <= 30%)
  if (clientContext.clientAge >= 60 && clamped.equityPct > 30) {
    violationsIntercepted.push(
      `SEBI Regulation 17 Violation Intercepted (Assertion A1 — Senior Citizen Shield): Client is ${clientContext.clientAge} years old. Equity allocation (${clamped.equityPct}%) exceeds the 30% statutory safety ceiling for senior citizens.`
    );
    const excess = clamped.equityPct - 30;
    clamped = {
      equityPct: 30,
      debtPct: clamped.debtPct + excess,
      liquidArbitragePct: clamped.liquidArbitragePct,
      goldPct: clamped.goldPct,
    };
  }

  // Assertion A2: Debt-to-Income Overhang Lock (DTI > 50% -> Equity = 0%)
  if (clientContext.dtiRatio > 0.50 && clamped.equityPct > 0) {
    violationsIntercepted.push(
      `SEBI Regulation 17 Violation Intercepted (Assertion A2 — Debt Overhang Lock): Client DTI ratio is ${(
        clientContext.dtiRatio * 100
      ).toFixed(1)}% (>50% threshold). Volatile equity exposure blocked; surplus must service high-cost debt & liquid buffer.`
    );
    clamped = {
      equityPct: 0,
      debtPct: 20,
      liquidArbitragePct: 80,
      goldPct: 0,
    };
  }

  // Assertion A3: Emergency Liquidity Invariant (Runway < 3 Months -> Max Equity <= 30%)
  if (clientContext.runwayMonths < 3 && clamped.equityPct > 30) {
    violationsIntercepted.push(
      `SEBI Regulation 17 Violation Intercepted (Assertion A3 — Emergency Liquidity Invariant): Emergency runway is ${clientContext.runwayMonths.toFixed(
        1
      )} months (< 3 months minimum). High equity allocation (${clamped.equityPct}%) clamped to 30% until 6-month liquid buffer is established.`
    );
    const excess = clamped.equityPct - 30;
    clamped = {
      equityPct: 30,
      debtPct: clamped.debtPct,
      liquidArbitragePct: clamped.liquidArbitragePct + excess,
      goldPct: clamped.goldPct,
    };
  }

  return {
    isCompliant: violationsIntercepted.length === 0,
    clampedAllocation: clamped,
    violationsIntercepted,
  };
}
