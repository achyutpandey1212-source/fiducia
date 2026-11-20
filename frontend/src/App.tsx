/**
 * Fiducia — Primary Frontend Application Router
 * Connects:
 * - World 1 (Sheryians Editorial Obsidian Theme): LandingPage (/), AuthPage (/auth, /signup)
 * - World 2 (Antigravity Deep Slate Studio Workspace): WorkbenchPage (/workbench), ClientIntakePage (/intake), SystemTelemetryPage (/admin/system)
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import WorkbenchPage from './pages/WorkbenchPage';
import ClientIntakePage from './pages/ClientIntakePage';
import SystemTelemetryPage from './pages/SystemTelemetryPage';
import {
  ClientFolioRecord,
  INITIAL_CLIENT_FOLIOS,
} from './services/localQuantEngine';

const STORAGE_KEY = 'fiducia_client_folios_v1';

export default function App() {
  const [folios, setFolios] = useState<ClientFolioRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ClientFolioRecord[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial pre-seeded folios
    }
    return INITIAL_CLIENT_FOLIOS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(folios));
    } catch {
      // Ignore storage quota errors
    }
  }, [folios]);

  const handleUpdateFolio = (updated: ClientFolioRecord) => {
    setFolios((prev) =>
      prev.map((f) => (f.id === updated.id ? updated : f))
    );
  };

  const handleAddClientFolio = (newFolio: ClientFolioRecord) => {
    setFolios((prev) => [newFolio, ...prev]);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route
        path="/intake"
        element={<ClientIntakePage onAddClientFolio={handleAddClientFolio} />}
      />
      <Route
        path="/workbench"
        element={
          <WorkbenchPage folios={folios} onUpdateFolio={handleUpdateFolio} />
        }
      />
      <Route path="/admin/system" element={<SystemTelemetryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
