/**
 * Phase 4 Unit & API Integration Tests:
 * Validates Cloud / In-Memory Folio Persistence & SEBI Reg 19 Append-Only WORM Audit Ledger
 */

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Phase 4: Adviser Client Folio Cloud Persistence & WORM Audit Ledger', () => {
  const testAdviserUid = 'uid_adviser_phase4_test';

  it('Starts with 0 folios for a new adviser UID and persists upserted client folios', async () => {
    const initialRes = await request(app).get(`/api/v1/folios/${testAdviserUid}`);
    expect(initialRes.status).toBe(200);
    expect(initialRes.body.folios).toHaveLength(0);

    const saveRes = await request(app)
      .post(`/api/v1/folios/${testAdviserUid}`)
      .send({
        id: 'folio_test_01',
        clientName: 'Rohit Sharma',
        roleSubtitle: '29yo Senior Software Engineer',
        folderStatus: 'QUARANTINED',
        clientAge: 29,
        netMonthlyIncomeInr: 250000,
        monthlyLivingExpensesInr: 80000,
        totalMonthlyEmiInr: 120000,
        liquidSavingsInr: 200000,
        incomeStability: 'SALARIED_MNC_PROFESSIONAL',
        goalName: 'Child Higher Education Corpus',
        goalCategory: 'CHILD_HIGHER_EDUCATION',
        presentGoalCostInr: 2500000,
        horizonYears: 15,
        drawdownReaction: 'BUY_THE_DIP_AGGRESSIVELY',
        volatilityPreference: 'HIGH_RETURN_HIGH_VOLATILITY',
        pastCrisisExperience: 'POST_2021_NO_CRASH_EXPERIENCE',
      });

    expect(saveRes.status).toBe(200);
    expect(saveRes.body.folio.id).toBe('folio_test_01');

    const afterRes = await request(app).get(`/api/v1/folios/${testAdviserUid}`);
    expect(afterRes.status).toBe(200);
    expect(afterRes.body.folios).toHaveLength(1);
    expect(afterRes.body.folios[0].clientName).toBe('Rohit Sharma');
  });

  it('Generates a cryptographic SHA-256 Digital Seal and appends an immutable WORM audit entry', async () => {
    const signRes = await request(app)
      .post(`/api/v1/folios/${testAdviserUid}/folio_test_01/sign`)
      .send({
        clientName: 'Rohit Sharma',
        riaSebiRegistration: 'INA000018492',
        effectiveRiskScore: 56.5,
        assetAllocation: {
          equityPct: 50,
          debtPct: 35,
          liquidArbitragePct: 10,
          goldPct: 5,
        },
        recommendedFundIsins: ['INF789F01XA0', 'INF879O01027'],
      });

    expect(signRes.status).toBe(200);
    expect(signRes.body.sha256DigitalSeal).toMatch(/^[a-f0-9]{64}$/);
    expect(signRes.body.auditEntry.riaSebiRegistration).toBe('INA000018492');

    const ledgerRes = await request(app)
      .get('/api/v1/audit-ledger')
      .query({ adviserUid: testAdviserUid });

    expect(ledgerRes.status).toBe(200);
    expect(ledgerRes.body.entries.length).toBeGreaterThanOrEqual(1);
    expect(ledgerRes.body.entries[0].sha256DigitalSeal).toBe(
      signRes.body.sha256DigitalSeal
    );
  });

  it('Resets/clears folios for an adviser UID on workspace reset while preserving the WORM audit ledger', async () => {
    const delRes = await request(app).delete(`/api/v1/folios/${testAdviserUid}`);
    expect(delRes.status).toBe(200);

    const foliosAfter = await request(app).get(`/api/v1/folios/${testAdviserUid}`);
    expect(foliosAfter.body.folios).toHaveLength(0);

    // WORM Audit Ledger remains intact even if workspace drafts are cleared
    const ledgerAfter = await request(app)
      .get('/api/v1/audit-ledger')
      .query({ adviserUid: testAdviserUid });
    expect(ledgerAfter.body.entries.length).toBeGreaterThanOrEqual(1);
  });
});
