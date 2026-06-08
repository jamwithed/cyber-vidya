/**
 * Thin client for the Cyber Vidya backend.
 *
 * The backend base URL comes from VITE_API_BASE:
 *  - local dev: set in `.env.development` to http://localhost:4000
 *  - production: set as a Cloudflare build env var once the backend is hosted.
 * When it's empty (e.g. a production build before the backend is live), the
 * student portal shows a "launching soon" state instead of a broken login.
 */
export const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, '') ?? ''
export const apiConfigured = API_BASE.length > 0

const TOKEN_KEY = 'cv_student_token'

export function getStudentToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}
export function setStudentToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  opts: RequestInit & { auth?: boolean } = {},
): Promise<T> {
  const { auth, headers, ...rest } = opts
  const token = auth ? getStudentToken() : null
  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {}),
    },
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new ApiError(res.status, (data as { error?: string }).error || `Request failed (${res.status})`)
  }
  return data as T
}
