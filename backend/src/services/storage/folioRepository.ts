/**
 * Phase 4: MongoDB Atlas M0 + In-Memory Dual-Tier Persistence Repository
 * Persists Adviser Client Folios and Append-Only WORM (Write-Once, Read-Many)
 * Cryptographic SHA-256 Audit Logs under SEBI IA Regulation 19.
 */

import { getDatabase } from '../../config/mongodb.js';

export interface StoredClientFolio {
  id: string;
  adviserUid: string;
  clientName: string;
  roleSubtitle: string;
  folderStatus: 'QUARANTINED' | 'APPROVED_SIGNED';
  clientAge: number;
  netMonthlyIncomeInr: number;
  monthlyLivingExpensesInr: number;
  totalMonthlyEmiInr: number;
  liquidSavingsInr: number;
  incomeStability: string;
  goalName: string;
  goalCategory: string;
  presentGoalCostInr: number;
  horizonYears: number;
  drawdownReaction: string;
  volatilityPreference: string;
  pastCrisisExperience: string;
  customEquityOverridePct?: number | null;
  sha256DigitalSeal?: string;
  signedAtUtc?: string;
  riaSebiRegistration?: string;
  updatedAtUtc: string;
}

export interface ImmutableAuditLogEntry {
  auditId: string;
  folioId: string;
  adviserUid: string;
  riaSebiRegistration: string;
  clientName: string;
  signedTimestampUtc: string;
  effectiveRiskScore: number;
  assetAllocation: {
    equityPct: number;
    debtPct: number;
    liquidArbitragePct: number;
    goldPct: number;
  };
  recommendedFundIsins: string[];
  sha256DigitalSeal: string;
  canonicalPayloadJson: string;
}

const memoryFoliosByAdviser = new Map<string, Map<string, StoredClientFolio>>();
const memoryAuditLedger: ImmutableAuditLogEntry[] = [];

export async function listFoliosForAdviser(
  adviserUid: string
): Promise<StoredClientFolio[]> {
  const db = getDatabase();
  if (db) {
    try {
      const docs = await db
        .collection<StoredClientFolio>('client_folios')
        .find({ adviserUid })
        .sort({ updatedAtUtc: -1 })
        .toArray();
      return docs;
    } catch {
      // Fallback to in-memory map on transient error
    }
  }

  const userMap = memoryFoliosByAdviser.get(adviserUid);
  if (!userMap) return [];
  return Array.from(userMap.values());
}

export async function upsertClientFolio(
  adviserUid: string,
  folio: Omit<StoredClientFolio, 'adviserUid' | 'updatedAtUtc'>
): Promise<StoredClientFolio> {
  const record: StoredClientFolio = {
    ...folio,
    adviserUid,
    updatedAtUtc: new Date().toISOString(),
  };

  let userMap = memoryFoliosByAdviser.get(adviserUid);
  if (!userMap) {
    userMap = new Map();
    memoryFoliosByAdviser.set(adviserUid, userMap);
  }
  userMap.set(record.id, record);

  const db = getDatabase();
  if (db) {
    try {
      await db
        .collection<StoredClientFolio>('client_folios')
        .updateOne(
          { id: record.id, adviserUid },
          { $set: record },
          { upsert: true }
        );
    } catch {
      // Retained in memory
    }
  }

  return record;
}

export async function clearFoliosForAdviser(adviserUid: string): Promise<void> {
  memoryFoliosByAdviser.delete(adviserUid);
  const db = getDatabase();
  if (db) {
    try {
      await db
        .collection<StoredClientFolio>('client_folios')
        .deleteMany({ adviserUid });
    } catch {
      // Ignore
    }
  }
}

export async function appendImmutableAuditSeal(
  entry: ImmutableAuditLogEntry
): Promise<ImmutableAuditLogEntry> {
  memoryAuditLedger.unshift(entry);

  const db = getDatabase();
  if (db) {
    try {
      await db
        .collection<ImmutableAuditLogEntry>('sebi_reg19_audit_ledger')
        .insertOne({ ...entry });
    } catch {
      // Retained in in-memory WORM ledger
    }
  }

  return entry;
}

export async function listImmutableAuditLedger(
  adviserUid?: string
): Promise<ImmutableAuditLogEntry[]> {
  const db = getDatabase();
  if (db) {
    try {
      const filter = adviserUid ? { adviserUid } : {};
      return await db
        .collection<ImmutableAuditLogEntry>('sebi_reg19_audit_ledger')
        .find(filter)
        .sort({ signedTimestampUtc: -1 })
        .limit(50)
        .toArray();
    } catch {
      // Fallback
    }
  }

  return adviserUid
    ? memoryAuditLedger.filter((e) => e.adviserUid === adviserUid)
    : memoryAuditLedger;
}
