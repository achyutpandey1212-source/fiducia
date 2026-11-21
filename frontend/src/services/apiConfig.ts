/**
 * Resolves the backend API base URL.
 * In development, defaults to relative path (using Vite proxy to port 4000).
 * In production (Vercel), uses VITE_API_BASE_URL (pointing to Render backend).
 */
export const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export function apiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE}${cleanEndpoint}`;
}
