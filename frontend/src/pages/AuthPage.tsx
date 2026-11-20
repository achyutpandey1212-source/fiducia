/**
 * World 1 (Sheryians Editorial Obsidian Style): Adviser Sign-In & Registration Page (/auth)
 * Uses genuine Firebase Web SDK:
 * - Email & Password Sign-In / Sign-Up
 * - 1-Tap Google OAuth
 * - Firebase Anonymous Sign-In (signInAnonymously)
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
import { ShieldCheck, ArrowRight, UserCheck, Lock, Mail, BadgeCheck } from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'SIGN_IN' | 'SIGN_UP'>('SIGN_IN');
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
      setErrorMsg((err as Error).message || 'Anonymous guest sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-void text-white flex flex-col justify-between px-4 py-8">
      {/* Top Bar */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-vermilion-500" />
          <span className="font-machina text-lg font-bold tracking-tight">Fiducia</span>
        </Link>
        <Link
          to="/"
          className="text-xs text-zinc-400 hover:text-white transition"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Centered Obsidian Auth Card */}
      <div className="w-full max-w-[430px] mx-auto my-8 bg-card border border-standardBorder rounded-2xl p-7 md:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-standardBorder text-[11px] text-zinc-300 mb-5">
          <ShieldCheck className="w-3.5 h-3.5 text-vermilion-500" />
          <span>SEBI Registered Investment Adviser Portal</span>
        </div>

        <h1 className="font-machina text-2xl font-bold tracking-tight mb-1.5">
          {mode === 'SIGN_IN' ? 'Welcome back, Adviser' : 'Register Adviser Practice'}
        </h1>
        <p className="text-xs text-zinc-400 mb-6">
          {mode === 'SIGN_IN'
            ? 'Sign in to access your fiduciary client folios and SEBI Regulation 19 audit seal workbench.'
            : 'Create your licensed RIA account to automate suitability math and direct mutual fund planning.'}
        </p>

        {!isConfigured && (
          <div className="mb-4 p-3 rounded-xl bg-[#f59e0b15] border border-[#f59e0b40] text-xs text-amber-300">
            Notice: VITE_FIREBASE_* keys not detected. Ensure your frontend/.env is loaded and restart Vite.
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-[#ef44441a] border border-[#ef44444d] text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-3.5">
          {mode === 'SIGN_UP' && (
            <div>
              <label className="block text-[11px] text-zinc-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Siddharth Verma"
                className="w-full bg-input border border-standardBorder focus:border-vermilion-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] text-zinc-400 mb-1 flex items-center justify-between">
              <span>Work Email</span>
              <Mail className="w-3.5 h-3.5 text-zinc-500" />
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adviser@practice.in"
              className="w-full bg-input border border-standardBorder focus:border-vermilion-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition"
            />
          </div>

          <div>
            <label className="block text-[11px] text-zinc-400 mb-1 flex items-center justify-between">
              <span>Password</span>
              <Lock className="w-3.5 h-3.5 text-zinc-500" />
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-input border border-standardBorder focus:border-vermilion-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition"
            />
          </div>

          <div>
            <label className="block text-[11px] text-zinc-400 mb-1 flex items-center justify-between">
              <span>SEBI RIA Registration Number</span>
              <BadgeCheck className="w-3.5 h-3.5 text-fiduciarySafe" />
            </label>
            <input
              type="text"
              value={sebiRegNo}
              onChange={(e) => setSebiRegNo(e.target.value)}
              placeholder="INA000018492"
              className="w-full bg-input border border-standardBorder focus:border-vermilion-500 rounded-xl px-3.5 py-2 text-xs font-mono text-zinc-200 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-vermilion-500 hover:bg-vermilion-600 disabled:opacity-50 text-white font-semibold text-sm py-2.5 rounded-full transition flex items-center justify-center gap-2"
          >
            <span>
              {loading
                ? 'Authenticating...'
                : mode === 'SIGN_IN'
                ? 'Sign In to Workbench'
                : 'Create Adviser Account'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-standardBorder" />
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Or continue with</span>
          <div className="h-px flex-1 bg-standardBorder" />
        </div>

        {/* Google OAuth & Anonymous Guest Auth */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-input hover:bg-[#1c1c1c] border border-standardBorder text-white text-xs font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2.5"
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
            className="w-full bg-[#111111] hover:bg-[#191919] border border-bentoBorder text-zinc-300 hover:text-white text-xs font-medium py-2.5 rounded-xl transition flex items-center justify-center gap-2"
          >
            <UserCheck className="w-3.5 h-3.5 text-vermilion-400" />
            <span>Continue as Anonymous Session (Firebase Guest)</span>
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-zinc-400">
          {mode === 'SIGN_IN' ? (
            <>
              New SEBI RIA practice?{' '}
              <button
                type="button"
                onClick={() => setMode('SIGN_UP')}
                className="text-vermilion-400 hover:underline font-medium"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an adviser account?{' '}
              <button
                type="button"
                onClick={() => setMode('SIGN_IN')}
                className="text-vermilion-400 hover:underline font-medium"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom Legal Footnote */}
      <div className="text-center text-[11px] text-zinc-600">
        Protected by Cryptographic SHA-256 Audit Seals • SEBI (Investment Advisers) Regulations, 2013
      </div>
    </div>
  );
}
