/**
 * Firebase Admin SDK Authentication & Token Verification Middleware
 * Verifies real Firebase ID tokens issued via:
 * - Email / Password Authentication
 * - Google OAuth Sign-In
 * - Firebase Anonymous Authentication (signInAnonymously)
 */

import admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedAdviserRequest extends Request {
  adviser?: {
    uid: string;
    email: string | undefined;
    isAnonymous: boolean;
    signInProvider: string;
  };
}

let firebaseInitialized = false;

export function initializeFirebaseAdmin(): boolean {
  if (firebaseInitialized || admin.apps.length > 0) {
    firebaseInitialized = true;
    return true;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (
    !projectId ||
    !clientEmail ||
    !rawPrivateKey ||
    projectId.startsWith('your_') ||
    rawPrivateKey.includes('YOUR_KEY_HERE')
  ) {
    return false;
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: rawPrivateKey.replace(/\\n/g, '\n'),
      }),
    });
    firebaseInitialized = true;
    return true;
  } catch (err) {
    console.error('[Firebase Admin] Failed to initialize certificate:', (err as Error).message);
    return false;
  }
}

/**
 * Express middleware that verifies the real Firebase JWT Bearer token
 */
export async function authenticateAdviser(
  req: AuthenticatedAdviserRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      status: 'error',
      code: 'UNAUTHORIZED',
      message: 'Missing Firebase Authorization Bearer token.',
    });
    return;
  }

  const idToken = authHeader.replace('Bearer ', '').trim();
  const isReady = initializeFirebaseAdmin();

  if (!isReady) {
    res.status(503).json({
      status: 'error',
      code: 'FIREBASE_ADMIN_NOT_CONFIGURED',
      message:
        'Firebase Admin SDK credentials (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY) are not configured in backend/.env.',
    });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const signInProvider = decodedToken.firebase?.sign_in_provider || 'custom';

    req.adviser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      isAnonymous: signInProvider === 'anonymous',
      signInProvider,
    };

    next();
  } catch (err) {
    res.status(401).json({
      status: 'error',
      code: 'INVALID_FIREBASE_TOKEN',
      message: `Firebase ID token verification failed: ${(err as Error).message}`,
    });
  }
}
