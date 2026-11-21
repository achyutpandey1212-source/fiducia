/**
 * Fiducia — Primary Frontend Application Router
 * - Scopes client folios strictly per authenticated Firebase user UID (`fiducia_folios_${uid}`).
 * - Every new user or new Guest session starts with a 100% fresh, empty workspace (`[]`).
 * - Provides a 1-click handler in the top bar to populate (or clear) the 3 sample client folios.
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
import { apiUrl } from './services/apiConfig';
import {
  getFirebaseAuth,
  onAuthStateChanged,
  User,
} from './services/firebaseClient';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [folios, setFolios] = useState<ClientFolioRecord[]>([]);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthChecking(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userScopedKey = `fiducia_folios_${user.uid}`;
          const saved = localStorage.getItem(userScopedKey);
          if (saved) {
            const parsed = JSON.parse(saved) as ClientFolioRecord[];
            if (Array.isArray(parsed)) {
              setFolios(parsed);
            } else {
              setFolios([]);
            }
          } else {
            // Brand new user or new guest session always starts 100% fresh and empty
            setFolios([]);
          }
        } catch {
          setFolios([]);
        }
      } else {
        setFolios([]);
      }
      setAuthChecking(false);
    });
    return () => unsub();
  }, []);

  const persistUserFolios = (nextFolios: ClientFolioRecord[]) => {
    setFolios(nextFolios);
    if (currentUser) {
      try {
        localStorage.setItem(
          `fiducia_folios_${currentUser.uid}`,
          JSON.stringify(nextFolios)
        );
      } catch {
        // Ignore storage quota errors
      }
    }
  };

  const syncFolioToBackend = async (folio: ClientFolioRecord) => {
    if (!currentUser) return;
    try {
      await fetch(apiUrl(`/api/v1/folios/${currentUser.uid}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(folio),
      });
    } catch {
      // Offline / frontend-only resilience
    }
  };

  const handleUpdateFolio = (updated: ClientFolioRecord) => {
    persistUserFolios(
      folios.map((f) => (f.id === updated.id ? updated : f))
    );
    void syncFolioToBackend(updated);
  };

  const handleAddClientFolio = (newFolio: ClientFolioRecord) => {
    persistUserFolios([newFolio, ...folios]);
    void syncFolioToBackend(newFolio);
  };

  const handleLoadSampleFolios = () => {
    // Deep clone the 3 locked hackathon personas so slider mutations are fresh
    const clonedSamples: ClientFolioRecord[] = JSON.parse(
      JSON.stringify(INITIAL_CLIENT_FOLIOS)
    );
    persistUserFolios(clonedSamples);
    clonedSamples.forEach((sample) => {
      void syncFolioToBackend(sample);
    });
  };

  const handleClearAllFolios = () => {
    persistUserFolios([]);
    if (currentUser) {
      fetch(apiUrl(`/api/v1/folios/${currentUser.uid}`), { method: 'DELETE' }).catch(
        () => {}
      );
    }
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
            <WorkbenchPage
              folios={folios}
              onUpdateFolio={handleUpdateFolio}
              onLoadSampleFolios={handleLoadSampleFolios}
              onClearAllFolios={handleClearAllFolios}
            />
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
