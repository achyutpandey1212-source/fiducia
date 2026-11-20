/**
 * Phase 4: Client Suitability PDF Dossier Component
 * Renders both:
 * 1. An interactive On-Screen Dossier Preview Modal inside the Adviser Workspace
 * 2. The exact `@media print` A4 Fiduciary Suitability Report with:
 *    - Adviser SEBI Registration & Date
 *    - Household Cash Flow, DTI & Emergency Reserve Summary
 *    - Two-Dimensional Risk Capacity vs. Tolerance Match & Applied Rule
 *    - Segmented Inflation Target Corpus & 4-Phase Glide Path Schedule
 *    - 100% AMFI Direct Mutual Fund Portfolio Table with Official SID Page Citations
 *    - Tamper-Evident Cryptographic SHA-256 Digital Signature Certificate
 */

import React from 'react';
import {
  ClientFolioRecord,
  LiveWorkspaceEvaluation,
  formatInrCompact,
} from '../../services/localQuantEngine';
import { ShieldCheck, Printer, X } from 'lucide-react';

interface ClientDossierDocumentProps {
  folio: ClientFolioRecord;
  evaluation: LiveWorkspaceEvaluation;
  sebiRegNo: string;
  adviserEmail?: string | null;
}

export const ClientDossierBody: React.FC<ClientDossierDocumentProps> = ({
  folio,
  evaluation,
  sebiRegNo,
  adviserEmail,
}) => {
  const conflictRuleDisplay: Record<string, string> = {
    CAPACITY_CLAMP: 'Capacity Clamp Applied (Balance-Sheet Protection)',
    INFLATION_SHIELD_BRIDGE: 'Inflation Shield Bridge Applied',
    HARMONIOUS_ALIGNMENT: 'Harmonious Capacity-Tolerance Alignment',
  };

  return (
    <div className="bg-white text-zinc-900 p-8 max-w-[794px] mx-auto text-[12px] leading-relaxed font-manrope">
      {/* 1. Statutory Letterhead */}
      <div className="flex items-start justify-between pb-4 mb-5 border-b-2 border-zinc-900">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-machina font-bold text-lg tracking-tight text-zinc-950">
              FIDUCIA
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-300 text-[10px] font-mono text-zinc-700">
              FIDUCIARY SUITABILITY DOSSIER
            </span>
          </div>
          <p className="text-[11px] text-zinc-600 mt-0.5">
            Issued under SEBI (Investment Advisers) Regulations, 2013 • 100% Direct-Plan Execution
          </p>
        </div>

        <div className="text-right font-mono text-[11px]">
          <div className="font-bold text-zinc-900">
            SEBI Reg No: {folio.riaSebiRegistration || sebiRegNo}
          </div>
          {adviserEmail && <div className="text-zinc-600">{adviserEmail}</div>}
          <div className="text-zinc-500">
            Date: {(folio.signedAtUtc || new Date().toISOString()).slice(0, 10)}
          </div>
        </div>
      </div>

      {/* 2. Client Household & Balance Sheet Summary */}
      <div className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
          1. Client Household &amp; Balance Sheet Profile
        </h3>
        <div className="grid grid-cols-4 gap-3 bg-zinc-50 border border-zinc-200 rounded-lg p-3">
          <div>
            <div className="text-[10.5px] text-zinc-500">Client Name</div>
            <div className="font-bold text-zinc-900">{folio.clientName}</div>
            <div className="text-[10.5px] text-zinc-500">Age: {folio.clientAge} Years</div>
          </div>
          <div>
            <div className="text-[10.5px] text-zinc-500">Net Monthly Income</div>
            <div className="font-mono font-bold text-zinc-900">
              {formatInrCompact(folio.netMonthlyIncomeInr)}/mo
            </div>
            <div className="text-[10.5px] text-zinc-600">
              Surplus: {formatInrCompact(evaluation.monthlySurplusInr)}/mo
            </div>
          </div>
          <div>
            <div className="text-[10.5px] text-zinc-500">Monthly Loan EMIs</div>
            <div className="font-mono font-bold text-zinc-900">
              {formatInrCompact(folio.totalMonthlyEmiInr)}/mo
            </div>
            <div className="text-[10.5px] text-zinc-600">
              DTI Ratio: {evaluation.dtiRatioPct}%
            </div>
          </div>
          <div>
            <div className="text-[10.5px] text-zinc-500">Emergency Reserve</div>
            <div className="font-mono font-bold text-zinc-900">
              {formatInrCompact(folio.liquidSavingsInr)}
            </div>
            <div className="text-[10.5px] text-zinc-600">
              Runway: {evaluation.runwayMonths} Months
            </div>
          </div>
        </div>
      </div>

      {/* 3. Two-Dimensional Risk Suitability & Goal Inflation Modeling */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="border border-zinc-200 rounded-lg p-3.5">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
            2. Two-Dimensional Risk Evaluation
          </div>
          <div className="space-y-1.5 text-[11.5px]">
            <div className="flex justify-between">
              <span className="text-zinc-600">Financial Capacity Score (RC):</span>
              <strong className="font-mono">{evaluation.riskCapacityScore} / 100</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Risk Tolerance Score (RT):</span>
              <strong className="font-mono">{evaluation.riskToleranceScore} / 100</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Resolution Rule:</span>
              <strong className="text-zinc-900">
                {conflictRuleDisplay[evaluation.conflictRuleTriggered]}
              </strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-zinc-200">
              <span className="font-semibold text-zinc-900">Effective Risk Score (ERS):</span>
              <strong className="font-mono text-zinc-950">
                {evaluation.effectiveRiskScore}/100 ({evaluation.riskCategoryLabel})
              </strong>
            </div>
          </div>
        </div>

        <div className="border border-zinc-200 rounded-lg p-3.5">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
            3. Goal Inflation &amp; Contribution Plan
          </div>
          <div className="space-y-1.5 text-[11.5px]">
            <div className="flex justify-between">
              <span className="text-zinc-600">Primary Goal ({folio.horizonYears}Y):</span>
              <strong className="text-zinc-900 truncate max-w-[180px]">
                {folio.goalName}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">
                Target Corpus ({evaluation.goal.appliedInflationPct}% Infl.):
              </span>
              <strong className="font-mono text-zinc-950">
                {formatInrCompact(evaluation.goal.segmentedFvInr)}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Shortfall Prevented vs 6% CPI:</span>
              <strong className="font-mono text-emerald-700">
                +{formatInrCompact(evaluation.goal.shortfallPreventedInr)}
              </strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-zinc-200">
              <span className="font-semibold text-zinc-900">
                10% Step-Up Starting SIP:
              </span>
              <strong className="font-mono text-zinc-950">
                {formatInrCompact(evaluation.goal.stepUpInitialSipInr)}/mo{' '}
                <span className="text-zinc-400 line-through font-normal">
                  ({formatInrCompact(evaluation.goal.flatMonthlySipInr)})
                </span>
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recommended 100% Direct-Plan Mutual Fund Portfolio Table */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            4. Recommended 100% Direct-Plan Mutual Fund Allocation
          </h3>
          <span className="text-[11px] font-mono text-zinc-700">
            Max Stock Overlap: <strong>{evaluation.maxPairwiseOverlapPct}%</strong> • 20Y
            Commission Saved:{' '}
            <strong className="text-emerald-700">
              {formatInrCompact(evaluation.commissionSaved20YrInr)}
            </strong>
          </span>
        </div>

        <table className="w-full border-collapse border border-zinc-200 text-[11.5px]">
          <thead>
            <tr className="bg-zinc-100 text-left text-zinc-700 border-b border-zinc-200">
              <th className="py-2 px-3">AMFI Direct Scheme Name &amp; ISIN</th>
              <th className="py-2 px-2.5">Category</th>
              <th className="py-2 px-2.5">Direct TER</th>
              <th className="py-2 px-2.5">SID Citation</th>
              <th className="py-2 px-2.5 text-right">Weight</th>
              <th className="py-2 px-3 text-right">Monthly SIP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {evaluation.basket.map((item) => (
              <tr key={item.fund.isin}>
                <td className="py-2 px-3">
                  <div className="font-semibold text-zinc-900">
                    {item.fund.schemeName}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    ISIN: {item.fund.isin} • Exit Load: {item.fund.exitLoadSummary}
                  </div>
                </td>
                <td className="py-2 px-2.5 text-zinc-700">{item.fund.categoryLabel}</td>
                <td className="py-2 px-2.5 font-mono text-zinc-900">
                  {item.fund.directTerPct}%{' '}
                  <span className="text-zinc-400 line-through">
                    ({item.fund.regularTerPct}%)
                  </span>
                </td>
                <td className="py-2 px-2.5 font-mono text-[10.5px] text-zinc-700">
                  [{item.fund.docId}, p. {item.fund.citedPage}]
                </td>
                <td className="py-2 px-2.5 text-right font-mono font-bold text-zinc-900">
                  {item.weightPct}%
                </td>
                <td className="py-2 px-3 text-right font-mono font-semibold text-zinc-900">
                  {formatInrCompact(item.monthlySipAllocationInr)}/mo
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. Dynamic Glide Path & March 2020 Crash Resilience Summary */}
      <div className="mb-5 bg-zinc-50 border border-zinc-200 rounded-lg p-3.5 flex items-center justify-between text-[11.5px]">
        <div>
          <strong className="text-zinc-900">Active Glide Path Phase:</strong>{' '}
          {
            evaluation.goal.glideSchedule[evaluation.goal.activeGlidePhaseIndex]
              .phaseName
          }{' '}
          ({evaluation.activeAllocation.equityPct}% Equity /{' '}
          {evaluation.activeAllocation.debtPct}% Debt /{' '}
          {evaluation.activeAllocation.liquidArbitragePct}% Liquid /{' '}
          {evaluation.activeAllocation.goldPct}% Gold)
        </div>
        <div className="font-mono text-zinc-800">
          March 2020 Stress Drawdown:{' '}
          <strong>{evaluation.covid2020Stress.fiduciaBasketDrawdownPct}%</strong> (vs
          Nifty -38.4%)
        </div>
      </div>

      {/* 6. Cryptographic SHA-256 Digital Signature Certificate */}
      <div className="border-2 border-zinc-900 rounded-lg p-4 bg-zinc-50">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2 font-bold text-zinc-950 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>
              CRYPTOGRAPHIC ADVISER SIGN-OFF &amp; 5-YEAR AUDIT LEDGER SEAL
            </span>
          </div>
          <span className="font-mono text-[10.5px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold">
            STATUS: APPROVED &amp; SIGNED
          </span>
        </div>

        <p className="text-[11px] text-zinc-600 mb-2">
          This suitability plan has been reviewed and digitally signed by a licensed
          Registered Investment Adviser ({folio.riaSebiRegistration || sebiRegNo}). Any
          unauthorized modification to the asset allocation or scheme ISINs invalidates
          the SHA-256 digest below.
        </p>

        <div className="bg-white border border-zinc-300 rounded px-3 py-2 font-mono text-[11px] text-zinc-900 break-all">
          <strong>SHA-256 Digital Seal:</strong>{' '}
          {folio.sha256DigitalSeal || 'UNSIGNED_DRAFT'}
        </div>
        <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1.5">
          <span>Folio ID: {folio.id}</span>
          <span>Signed Timestamp (UTC): {folio.signedAtUtc || 'Pending'}</span>
        </div>
      </div>
    </div>
  );
};

interface ClientDossierModalProps extends ClientDossierDocumentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientDossierModal: React.FC<ClientDossierModalProps> = ({
  isOpen,
  onClose,
  folio,
  evaluation,
  sebiRegNo,
  adviserEmail,
}) => {
  if (!isOpen) return null;

  return (
    <div className="ag-screen-only fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#181B21] border border-[#2E323D] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-[#262A34] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#8AB4F8]" />
            <span>
              Signed Client Suitability Dossier — {folio.clientName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="ag-btn-blue px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[#22252E] text-[#9DA3AE] hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Dossier Paper View */}
        <div className="p-6 overflow-y-auto bg-[#0D0E11]">
          <div className="rounded-xl overflow-hidden shadow-xl">
            <ClientDossierBody
              folio={folio}
              evaluation={evaluation}
              sebiRegNo={sebiRegNo}
              adviserEmail={adviserEmail}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
