import { useEffect, useState } from 'react'
import { Logo } from '../components/Logo'
import { courses } from '../data/courses'
import { DifficultyBadge } from '../components/ui/Badge'
import {
  apiConfigured,
  apiFetch,
  ApiError,
  getStudentToken,
  setStudentToken,
} from '../lib/api'

interface StudentMe {
  id: string
  fullName: string
  email: string
  phone: string | null
  track: string | null
  status: string
  enrolledAt: string
  hasAccount: boolean
}

export function Portal() {
  const [token, setToken] = useState<string | null>(getStudentToken())
  const [student, setStudent] = useState<StudentMe | null>(null)
  const [loading, setLoading] = useState<boolean>(!!getStudentToken())
  const [error, setError] = useState('')

  // Login form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Load profile when we have a token.
  useEffect(() => {
    if (!token) return
    let alive = true
    setLoading(true)
    apiFetch<{ student: StudentMe }>('/api/students/me', { auth: true })
      .then((d) => alive && setStudent(d.student))
      .catch((e: ApiError) => {
        if (!alive) return
        if (e.status === 401) logout()
        else setError(e.message)
      })
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [token])

  function logout() {
    setStudentToken(null)
    setToken(null)
    setStudent(null)
    setError('')
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const data = await apiFetch<{ token: string }>('/api/auth/student/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      })
      setStudentToken(data.token)
      setToken(data.token)
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[70vh] pt-28">
      <section className="relative overflow-hidden py-12">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-cerulean/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5">
          {!apiConfigured ? (
            <ComingSoon />
          ) : !token ? (
            <LoginCard
              email={email}
              password={password}
              error={error}
              submitting={submitting}
              onEmail={setEmail}
              onPassword={setPassword}
              onSubmit={handleLogin}
            />
          ) : loading ? (
            <div className="card mx-auto max-w-md p-8 text-center text-white/60">Loading your portal…</div>
          ) : student ? (
            <Dashboard student={student} onLogout={logout} />
          ) : (
            <div className="card mx-auto max-w-md p-8 text-center">
              <p className="text-[#ffb8db]">{error || 'Could not load your profile.'}</p>
              <button onClick={logout} className="btn-ghost mt-4">
                Back to sign in
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function LoginCard(props: {
  email: string
  password: string
  error: string
  submitting: boolean
  onEmail: (v: string) => void
  onPassword: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
}) {
  return (
    <div className="mx-auto max-w-md">
      <div className="mb-6 flex justify-center">
        <Logo size={48} withWordmark={false} />
      </div>
      <h1 className="text-center font-display text-3xl font-bold sm:text-4xl">Student Portal</h1>
      <p className="mt-2 text-center text-white/60">Sign in to view your course.</p>

      <form onSubmit={props.onSubmit} className="card mt-6 space-y-4 p-6">
        <label className="block">
          <span className="mb-1.5 block font-display text-xs uppercase tracking-wider text-white/55">Email</span>
          <input
            type="email"
            autoComplete="username"
            value={props.email}
            onChange={(e) => props.onEmail(e.target.value)}
            className="cv-input"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-display text-xs uppercase tracking-wider text-white/55">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={props.password}
            onChange={(e) => props.onPassword(e.target.value)}
            className="cv-input"
            required
          />
        </label>
        {props.error && (
          <p className="rounded-lg border border-[#ff9ecf]/40 bg-[#3a0d2a]/40 px-3 py-2 text-sm text-[#ffb8db]">
            {props.error}
          </p>
        )}
        <button type="submit" disabled={props.submitting} className="btn-primary w-full">
          {props.submitting ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-center text-xs text-white/45">
          No account yet? Your instructor sets up your login — contact us if you need access.
        </p>
      </form>
    </div>
  )
}

function Dashboard({ student, onLogout }: { student: StudentMe; onLogout: () => void }) {
  const course = courses.find((c) => c.id === student.track)
  const firstName = student.fullName.split(' ')[0]
  const enrolled = new Date(student.enrolledAt).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="section-eyebrow">Student Portal</span>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Welcome back, <span className="brand-text-gradient">{firstName}</span>
          </h1>
        </div>
        <button onClick={onLogout} className="btn-ghost">
          Log out
        </button>
      </div>

      {/* Account summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <InfoCard label="Status" value={student.status} highlight />
        <InfoCard label="Enrolled" value={enrolled} />
        <InfoCard label="Email" value={student.email} />
      </div>

      {/* Chosen course */}
      {course ? (
        <div className="card p-6 sm:p-8">
          <span className="section-eyebrow">Your course</span>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            {course.level === 'All levels' ? (
              <span className="chip border border-white/15 bg-white/5 text-white/75">All levels</span>
            ) : (
              <DifficultyBadge level={course.level} />
            )}
            <span className="chip border border-white/15 bg-white/5 text-white/70">⏱ {course.duration}</span>
            <span className="chip border border-cerulean/40 bg-cerulean/10 text-[#9fe6f7]">{course.format}</span>
          </div>
          <p className="mt-3 text-white/70">{course.tagline}</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="section-eyebrow">What you'll learn</h3>
              <ul className="mt-3 space-y-2">
                {course.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="section-eyebrow">Career outcomes</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {course.outcomes.map((o) => (
                  <span key={o} className="chip border border-white/12 bg-white/5 text-white/75">
                    {o}
                  </span>
                ))}
              </div>
              <h3 className="section-eyebrow mt-5">Certifications you'll prep for</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {course.certs.map((c) => (
                  <span key={c} className="chip border border-cerulean/40 bg-cerulean/10 text-[#9fe6f7]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-6">
            <a href="#/" className="btn-primary">Open the roadmap</a>
            <a href="#labs" className="btn-ghost">Practice in the labs</a>
          </div>
        </div>
      ) : (
        <div className="card p-6">
          <span className="section-eyebrow">Your course</span>
          <p className="mt-2 text-white/75">
            {student.track
              ? `You're enrolled in: ${student.track}.`
              : 'No course has been assigned to your account yet.'}
          </p>
          <p className="mt-2 text-sm text-white/55">
            If this looks wrong, contact your instructor to update your enrollment.
          </p>
        </div>
      )}
    </div>
  )
}

function InfoCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="card px-5 py-4">
      <div className="font-display text-xs uppercase tracking-wider text-white/50">{label}</div>
      <div className={`mt-1 font-display text-lg font-semibold ${highlight ? 'text-aqua capitalize' : 'text-white'}`}>
        {value}
      </div>
    </div>
  )
}

function ComingSoon() {
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mb-6 flex justify-center">
        <Logo size={48} withWordmark={false} />
      </div>
      <h1 className="font-display text-3xl font-bold sm:text-4xl">Student Portal</h1>
      <p className="mx-auto mt-4 max-w-sm text-white/65">
        The student portal is launching soon. Enrolled students will sign in here to access their
        course. Check back shortly.
      </p>
      <a href="#/contact" className="btn-primary mt-6 inline-flex">
        Contact us
      </a>
    </div>
  )
}
