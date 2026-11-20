/**
 * Fiducia — Primary Frontend Application Router
 * Enforces strict Firebase Authentication Route Protection:
 * - Only authenticated SEBI RIAs (Email/Password, Google OAuth, or Firebase Guest Session)
 *   can access `/workbench` or `/intake`.
 * - Unauthenticated users attempting to access `/workbench` or `/intake` are redirected to `/auth`.
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
import {
  getFirebaseAuth,
  onAuthStateChanged,
  User,
} from './services/firebaseClient';

const STORAGE_KEY = 'fiducia_client_folios_v1';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthChecking(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecking(false);
    });
    return () => unsub();
  }, []);

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
      // Fallback to initial folios
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

  if (authChecking) {
    return (
      <div className="ag-workspace-root min-h-screen flex items-center justify-center text-xs text-[#9DA3AE] font-mono">
        Verifying Adviser Session...
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage currentUser={currentUser} />}
      />
      <Route
        path="/auth"
        element={
          currentUser ? <Navigate to="/workbench" replace /> : <AuthPage initialMode="SIGN_IN" />
        }
      />
      <Route
        path="/signup"
        element={
          currentUser ? <Navigate to="/workbench" replace /> : <AuthPage initialMode="SIGN_UP" />
        }
      />
      <Route
        path="/intake"
        element={
          currentUser ? (
            <ClientIntakePage onAddClientFolio={handleAddClientFolio} />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route
        path="/workbench"
        element={
          currentUser ? (
            <WorkbenchPage folios={folios} onUpdateFolio={handleUpdateFolio} />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />
      <Route path="/admin/system" element={<SystemTelemetryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
