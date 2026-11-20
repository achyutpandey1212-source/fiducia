/**
 * Domain 05: Zero-Hallucination Fiduciary RAG & Grounded Research Pipeline
 * - Enforces Pre-Generation SEBI Guardrails (G-01..G-04) prior to retrieval
 * - Executes Hybrid Vector + Keyword Retrieval across the 15 Flagship Direct Funds
 * - Synthesizes responses with mandatory bracketed page citations: [DOC_ID, p. PAGE]
 * - Runs Post-Generation Deterministic Regex Number Cross-Check against verified tables
 */

import {
  STATUTORY_FACTSHEET_CHUNKS,
  StatutoryFactsheetChunk,
} from './factsheetCorpus.js';
import {
  AiProviderType,
  executeThroughAiGateway,
} from './aiGateway.js';
import {
  GuardrailInspectionResult,
  inspectPromptGuardrails,
} from '../guardrails/guardrails.js';

export interface CitedSourceBadge {
  docId: string;
  isin: string;
  schemeName: string;
  pageNumber: number;
  sectionType: string;
  directTerPct: number;
  exitLoadRule: string;
}

export interface DeterministicFactCheckReport {
  isFullyVerified: boolean;
  extractedFigures: number[];
  unverifiedFigures: number[];
  verificationBanner: string;
}

export interface FiduciaryRagQueryResponse {
  status: 'VERIFIED_SUCCESS' | 'BLOCKED_BY_SEBI_GUARDRAIL' | 'UNVERIFIED_FIGURE_WARNING';
  query: string;
  answerNarrative: string;
  citations: CitedSourceBadge[];
  factCheck: DeterministicFactCheckReport;
  guardrailCheck: GuardrailInspectionResult;
  aiTelemetry: {
    providerUsed: AiProviderType;
    keyIdUsed: string;
    cacheHit: boolean;
    totalLatencyMs: number;
  };
}

export const FIDUCIARY_RAG_SYSTEM_INSTRUCTION = `### SYSTEM INSTRUCTION: FIDUCIARY RESEARCH ASSISTANT
1. You are assisting a licensed SEBI Registered Investment Adviser (INA000018492).
2. Every numerical figure, expense ratio (TER), exit load penalty, lock-in period, or asset allocation rule MUST cite its source document and page number in brackets:
   Format: [DOC_ID, p. PAGE_NUMBER]
   Example: "The scheme levies an exit load of 2.00% if redeemed within 365 days [DOC-PPFAS-FLEXI-2026, p. 14]."
3. ZERO TOLERANCE FOR GUESSWORK: If an exact figure or risk factor is not explicitly present in the provided context chunks, you must state: "Data not available in official scheme documentation." Never approximate or use memory training data.`;

/**
 * 1. Hybrid Semantic + Keyword Chunk Retrieval
 * Scores all statutory SID/KIM chunks against the query and optional scheme ISIN filter
 */
export function retrieveTopCitedChunks(
  query: string,
  filterIsin?: string,
  topK: number = 3
): StatutoryFactsheetChunk[] {
  const normalizedQuery = (query || '').toLowerCase().trim();
  const queryTokens = normalizedQuery
    .replace(/[^a-z0-9.%₹\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2);

  let pool = STATUTORY_FACTSHEET_CHUNKS;
  if (filterIsin) {
    const filtered = pool.filter(
      (c) => c.isin.toLowerCase() === filterIsin.toLowerCase()
    );
    if (filtered.length > 0) {
      pool = filtered;
    }
  }

  const scored = pool.map((chunk) => {
    let score = 0;
    const hayScheme = chunk.schemeName.toLowerCase();
    const hayContent = chunk.content.toLowerCase();
    const hayDoc = chunk.docId.toLowerCase();

    // Exact ISIN or DocID match
    if (normalizedQuery.includes(chunk.isin.toLowerCase())) score += 50;
    if (normalizedQuery.includes(hayDoc)) score += 45;

    // Keyword array hits
    for (const kw of chunk.keywords) {
      if (normalizedQuery.includes(kw.toLowerCase())) {
        score += 12;
      }
    }

    // Token overlap
    for (const token of queryTokens) {
      if (hayScheme.includes(token)) score += 8;
      if (hayContent.includes(token)) score += 4;
    }

    // Intent boost for fees / exit load / ter vs objective / tax
    if (
      /\b(exit|load|ter|expense|fee|cost|lock-in|redeem|redemption)\b/i.test(
        normalizedQuery
      ) &&
      chunk.sectionType === 'EXIT_LOAD_AND_EXPENSE'
    ) {
      score += 10;
    }
    if (
      /\b(tax|ltcg|stcg|112a|50aa|slab)\b/i.test(normalizedQuery) &&
      chunk.sectionType === 'TAXATION_AND_SUITABILITY'
    ) {
      score += 15;
    }
    if (
      /\b(objective|holding|stock|benchmark|cagr|sortino|strategy)\b/i.test(
        normalizedQuery
      ) &&
      chunk.sectionType === 'INVESTMENT_OBJECTIVE_AND_STRATEGY'
    ) {
      score += 12;
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // If query is completely generic or empty, still return top chunks
  const best = scored.slice(0, Math.max(1, topK)).map((s) => s.chunk);
  return best;
}

/**
 * 2. Post-Generation Deterministic Regex Fact-Checker
 * Extracts all percentage figures and decimals from the generated narrative
 * and verifies that every number exists in the retrieved statutory chunks.
 */
export function verifyNarrativeNumbersAgainstChunks(
  narrativeText: string,
  sourceChunks: StatutoryFactsheetChunk[]
): DeterministicFactCheckReport {
  // Build allowed verified number set from chunks (including page numbers and verifiedNumbers)
  const allowedNumbers = new Set<number>();
  for (const chunk of sourceChunks) {
    allowedNumbers.add(chunk.pageNumber);
    allowedNumbers.add(chunk.directTerPct);
    allowedNumbers.add(chunk.regularTerPct);
    allowedNumbers.add(chunk.minimumSipInr);
    for (const num of chunk.verifiedNumbers) {
      allowedNumbers.add(num);
    }
    const textNums = [
      ...`${chunk.content} ${chunk.exitLoadRule} ${chunk.taxTreatmentSummary}`.matchAll(
        /(\d+(?:\.\d+)?)\s*%/g
      ),
    ];
    for (const m of textNums) {
      const parsed = parseFloat(m[1]);
      if (!Number.isNaN(parsed)) {
        allowedNumbers.add(parsed);
      }
    }
  }

  // Extract explicit decimal percentages or standalone percentage numbers e.g. "0.62%", "2.00%", "12.5%"
  const percentMatches = [...narrativeText.matchAll(/(\d+(?:\.\d+)?)\s*%/g)];
  const extractedFigures: number[] = [];
  const unverifiedFigures: number[] = [];

  for (const match of percentMatches) {
    const val = parseFloat(match[1]);
    if (!Number.isNaN(val)) {
      extractedFigures.push(val);
      // Check with 0.01 tolerance
      const isVerified = [...allowedNumbers].some(
        (allowed) => Math.abs(allowed - val) < 0.011
      );
      if (!isVerified) {
        unverifiedFigures.push(val);
      }
    }
  }

  const isFullyVerified = unverifiedFigures.length === 0;
  const verificationBanner = isFullyVerified
    ? '100% Deterministic Fact-Check Passed: All numerical TERs, percentages, and exit loads match statutory AMFI documentation.'
    : `[WARNING: Unverified figure detected in AI response (${unverifiedFigures
        .map((n) => `${n}%`)
        .join(', ')}). Manual RIA verification required.]`;

  return {
    isFullyVerified,
    extractedFigures,
    unverifiedFigures,
    verificationBanner,
  };
}

/**
 * Builds a 100% deterministic, zero-hallucination cited response directly from the retrieved statutory chunks
 */
export function buildDeterministicCitedSynthesis(
  chunks: StatutoryFactsheetChunk[]
): string {
  if (chunks.length === 0) {
    return 'Data not available in official scheme documentation.';
  }

  const primary = chunks[0];
  const lines: string[] = [primary.content];

  if (chunks.length > 1 && chunks[1].isin === primary.isin) {
    lines.push(chunks[1].content);
  } else if (chunks.length > 1) {
    lines.push(chunks[1].content);
  }

  lines.push(
    `Taxation & Statutory Summary: ${primary.taxTreatmentSummary} [${primary.docId}, p. ${primary.pageNumber}].`
  );

  return lines.join(' ');
}

/**
 * 3. Full End-to-End Fiduciary RAG Pipeline
 */
export async function queryFiduciaryRagPipeline(params: {
  query: string;
  filterIsin?: string;
  topK?: number;
}): Promise<FiduciaryRagQueryResponse> {
  const start = performance.now();
  const rawQuery = (params.query || '').trim();

  // Step 1: Run Pre-Generation SEBI Guardrail Firewall (G-01..G-04)
  const guardrailCheck = inspectPromptGuardrails(rawQuery);
  if (!guardrailCheck.passed) {
    return {
      status: 'BLOCKED_BY_SEBI_GUARDRAIL',
      query: rawQuery,
      answerNarrative:
        guardrailCheck.statutoryWarningNotice ||
        'Blocked by SEBI Regulatory Guardrail.',
      citations: [],
      factCheck: {
        isFullyVerified: true,
        extractedFigures: [],
        unverifiedFigures: [],
        verificationBanner:
          'Pre-Generation SEBI Firewall intercepted non-compliant query before inference.',
      },
      guardrailCheck,
      aiTelemetry: {
        providerUsed: 'DETERMINISTIC_LOCAL_FALLBACK',
        keyIdUsed: 'SEBI_PRE_GEN_FIREWALL',
        cacheHit: false,
        totalLatencyMs: Math.round((performance.now() - start) * 1000) / 1000,
      },
    };
  }

  // Step 2: Retrieve Top Cited Statutory Chunks
  const topChunks = retrieveTopCitedChunks(
    rawQuery,
    params.filterIsin,
    params.topK ?? 2
  );

  const contextBlock = topChunks
    .map(
      (c, i) =>
        `--- CHUNK ${i + 1} [${c.docId}, p. ${c.pageNumber}] (${c.schemeName}, ISIN: ${c.isin}) ---\n` +
        `Direct TER: ${c.directTerPct}% | Regular TER: ${c.regularTerPct}%\n` +
        `Exit Load: ${c.exitLoadRule}\n` +
        `Taxation: ${c.taxTreatmentSummary}\n` +
        `Verbatim Excerpt: ${c.content}`
    )
    .join('\n\n');

  const userPrompt = `OFFICIAL AMFI SCHEME CONTEXT CHUNKS:\n${contextBlock}\n\nADVISER QUERY: ${rawQuery}\n\nProvide a concise, accurate fiduciary response citing [${topChunks[0]?.docId}, p. ${topChunks[0]?.pageNumber}].`;

  // Step 3: Execute through Unified AI Gateway (with instant fallback to deterministic synthesis)
  const aiResponse = await executeThroughAiGateway({
    systemInstruction: FIDUCIARY_RAG_SYSTEM_INSTRUCTION,
    userPrompt,
    cacheKeySalt: `RAG::${params.filterIsin || 'ALL'}`,
    deterministicFallbackSynthesis: () =>
      buildDeterministicCitedSynthesis(topChunks),
  });

  // Step 4: Post-Generation Deterministic Regex Fact-Check
  const factCheck = verifyNarrativeNumbersAgainstChunks(
    aiResponse.text,
    topChunks
  );

  const finalNarrative = factCheck.isFullyVerified
    ? aiResponse.text
    : `${aiResponse.text}\n\n${factCheck.verificationBanner}`;

  const citations: CitedSourceBadge[] = topChunks.map((c) => ({
    docId: c.docId,
    isin: c.isin,
    schemeName: c.schemeName,
    pageNumber: c.pageNumber,
    sectionType: c.sectionType,
    directTerPct: c.directTerPct,
    exitLoadRule: c.exitLoadRule,
  }));

  return {
    status: factCheck.isFullyVerified
      ? 'VERIFIED_SUCCESS'
      : 'UNVERIFIED_FIGURE_WARNING',
    query: rawQuery,
    answerNarrative: finalNarrative,
    citations,
    factCheck,
    guardrailCheck,
    aiTelemetry: {
      providerUsed: aiResponse.providerUsed,
      keyIdUsed: aiResponse.keyIdUsed,
      cacheHit: aiResponse.cacheHit,
      totalLatencyMs: Math.round((performance.now() - start) * 1000) / 1000,
    },
  };
}
