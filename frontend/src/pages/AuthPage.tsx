/**
 * Adviser Authentication Portal (/auth & /signup)
 * Unified with the Antigravity Deep Slate Studio Color Hierarchy (#0D0E11 Canvas,
 * #181B21 Elevated Slate Card, Polished Off-White Hairline Borders, #1A73E8 Blue Action Pill)
 * + Sheryians Neue Machina Typography & Vertical Reel Rollover Motion.
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  getFirebaseAuth,
  isFirebaseWebConfigured,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  updateProfile,
} from '../services/firebaseClient';
import { ArrowRight, UserCheck, Lock, Mail, BadgeCheck, ArrowLeft } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'SIGN_IN' | 'SIGN_UP';
}

export default function AuthPage({ initialMode = 'SIGN_IN' }: AuthPageProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'SIGN_IN' | 'SIGN_UP'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [sebiRegNo, setSebiRegNo] = useState('INA000018492');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const auth = getFirebaseAuth();
  const isConfigured = isFirebaseWebConfigured();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!auth) {
      setErrorMsg('Firebase Web SDK is not configured in frontend/.env.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'SIGN_IN') {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (fullName.trim()) {
          await updateProfile(cred.user, {
            displayName: `${fullName.trim()} (${sebiRegNo.trim() || 'INA000018492'})`,
          });
        }
      }
      localStorage.setItem('fiducia_sebi_reg', sebiRegNo.trim() || 'INA000018492');
      navigate('/workbench');
    } catch (err) {
      setErrorMsg((err as Error).message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    if (!auth) {
      setErrorMsg('Firebase Web SDK is not configured in frontend/.env.');
      return;
    }
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      localStorage.setItem('fiducia_sebi_reg', sebiRegNo.trim() || 'INA000018492');
      navigate('/workbench');
    } catch (err) {
      setErrorMsg((err as Error).message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setErrorMsg(null);
    if (!auth) {
      setErrorMsg('Firebase Web SDK is not configured in frontend/.env.');
      return;
    }
    setLoading(true);
    try {
      await signInAnonymously(auth);
      localStorage.setItem('fiducia_sebi_reg', sebiRegNo.trim() || 'INA000018492');
      navigate('/workbench');
    } catch (err) {
      setErrorMsg((err as Error).message || 'Guest session sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ag-workspace-root min-h-screen flex flex-col justify-between px-4 py-8 font-manrope">
      {/* Top Bar */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#20232B] border border-[#323642] flex items-center justify-center font-machina font-bold text-xs text-white">
            Λ
          </div>
          <span className="font-machina text-base font-bold tracking-tight text-white">
            Fiducia
          </span>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#9DA3AE] hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Centered Elevated Slate Auth Card (#181B21 with Polished Off-White Hairline) */}
      <div className="ag-panel-card w-full max-w-[420px] mx-auto my-8 p-7 md:p-8 shadow-2xl">
        <h1 className="font-machina text-2xl font-bold tracking-tight text-white mb-1">
          {mode === 'SIGN_IN' ? 'Adviser Sign In' : 'Create Adviser Account'}
        </h1>
        <p className="text-xs text-[#9DA3AE] mb-6">
          {mode === 'SIGN_IN'
            ? 'Access your client folios, suitability parameters, and digital signature workspace.'
            : 'Set up your practice workspace to manage client portfolios and compliance dossiers.'}
        </p>

        {!isConfigured && (
          <div className="mb-4 p-3 rounded-xl bg-[#2A2215] border border-[#F59E0B]/40 text-xs text-amber-200">
            VITE_FIREBASE_* keys not detected. Ensure frontend/.env is configured and restart Vite.
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-[#2A171B] border border-[#EF4444]/40 text-xs text-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-3.5">
          {mode === 'SIGN_UP' && (
            <div>
              <label className="block text-[11.5px] text-[#9DA3AE] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Siddharth Verma"
                className="w-full bg-[#131519] border border-[#2A2E39] focus:border-[#1A73E8] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#636870] outline-none transition"
              />
            </div>
          )}

          <div>
            <label className="block text-[11.5px] text-[#9DA3AE] mb-1 flex items-center justify-between">
              <span>Work Email</span>
              <Mail className="w-3.5 h-3.5 text-[#636870]" />
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adviser@practice.in"
              className="w-full bg-[#131519] border border-[#2A2E39] focus:border-[#1A73E8] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#636870] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-[11.5px] text-[#9DA3AE] mb-1 flex items-center justify-between">
              <span>Password</span>
              <Lock className="w-3.5 h-3.5 text-[#636870]" />
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#131519] border border-[#2A2E39] focus:border-[#1A73E8] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#636870] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-[11.5px] text-[#9DA3AE] mb-1 flex items-center justify-between">
              <span>Registration Number</span>
              <BadgeCheck className="w-3.5 h-3.5 text-[#8AB4F8]" />
            </label>
            <input
              type="text"
              value={sebiRegNo}
              onChange={(e) => setSebiRegNo(e.target.value)}
              placeholder="INA000018492"
              className="w-full bg-[#131519] border border-[#2A2E39] focus:border-[#1A73E8] rounded-xl px-3.5 py-2 text-xs font-mono text-white placeholder-[#636870] outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ag-btn-blue w-full mt-2 font-semibold text-xs py-2.5 rounded-full flex items-center justify-center gap-2 shadow-md"
          >
            <span>
              {loading
                ? 'Authenticating...'
                : mode === 'SIGN_IN'
                ? 'Sign In to Workspace'
                : 'Create Adviser Account'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#262A34]" />
          <span className="text-[10.5px] text-[#636870] uppercase tracking-wider">
            Or continue with
          </span>
          <div className="h-px flex-1 bg-[#262A34]" />
        </div>

        {/* Google OAuth & Instant Anonymous Session */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="ag-soft-pill w-full text-xs font-medium py-2.5 rounded-xl flex items-center justify-center gap-2.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"
              />
              <path
                fill="#FBBC05"
                d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.9C3.5 21.4 7.4 24 12 24z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={handleAnonymousSignIn}
            disabled={loading}
            className="ag-soft-pill w-full text-xs font-medium py-2.5 rounded-xl flex items-center justify-center gap-2"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#8AB4F8]" />
            <span>Continue as Guest Adviser</span>
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-[#9DA3AE]">
          {mode === 'SIGN_IN' ? (
            <>
              New practice?{' '}
              <button
                type="button"
                onClick={() => setMode('SIGN_UP')}
                className="text-[#8AB4F8] hover:underline font-medium"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => setMode('SIGN_IN')}
                className="text-[#8AB4F8] hover:underline font-medium"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>

      <div className="text-center text-[11px] text-[#636870]">
        Fiducia — Fiduciary Advisory Operating System
      </div>
    </div>
  );
}
