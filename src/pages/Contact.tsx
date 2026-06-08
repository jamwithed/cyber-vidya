import { useState } from 'react'
import { site } from '../data/site'
import { tracks } from '../data/tracks'
import { apiConfigured, apiFetch } from '../lib/api'

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: tracks[0].name, message: '' })
  const [sent, setSent] = useState(false)
  const [sentVia, setSentVia] = useState<'api' | 'mailto'>('mailto')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const update = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }))
    setError('')
  }

  const openMailto = () => {
    const subject = encodeURIComponent(`Course enquiry — ${form.interest}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nInterested in: ${form.interest}\n\n${form.message}`,
    )
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`
    setSentVia('mailto')
    setSent(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email and message.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    // When the backend is configured, store the message there. Otherwise (or if
    // it fails) fall back to opening the user's mail client.
    if (apiConfigured) {
      setSubmitting(true)
      try {
        await apiFetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim() || undefined,
            interest: form.interest,
            message: form.message.trim(),
          }),
        })
        setSentVia('api')
        setSent(true)
      } catch {
        openMailto() // graceful fallback
      } finally {
        setSubmitting(false)
      }
      return
    }

    openMailto()
  }

  const cards = [
    { icon: <MailIcon />, label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: <PhoneIcon />, label: 'Phone', value: site.contact.phone, href: `tel:${site.contact.phoneHref}` },
    { icon: <PinIcon />, label: 'Visit us', value: site.contact.address, href: undefined },
  ]

  return (
    <div className="pt-28">
      <section className="relative overflow-hidden py-14">
        <div className="pointer-events-none absolute -top-20 left-0 h-80 w-80 rounded-full bg-aqua/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5 text-center animate-fade-up">
          <span className="section-eyebrow">Contact Us</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Let's talk about your <span className="brand-text-gradient">cyber career</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            Questions about a program, batch dates, or corporate training? Reach out —
            our team typically responds within one business day.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-5">
          {/* Contact details */}
          <div className="space-y-4 lg:col-span-2">
            {cards.map((c) => (
              <div key={c.label} className="card flex items-start gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-midnight">
                  {c.icon}
                </span>
                <div>
                  <div className="font-display text-xs uppercase tracking-wider text-white/50">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="mt-1 block text-white/90 hover:text-aqua">
                      {c.value}
                    </a>
                  ) : (
                    <div className="mt-1 text-white/90">{c.value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="card p-5">
              <div className="font-display text-xs uppercase tracking-wider text-white/50">Follow us</div>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href={site.contact.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-xs">
                  Instagram {site.contact.instagram.handle}
                </a>
                <a href={site.contact.linkedin.url} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-xs">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card p-6 sm:p-8 lg:col-span-3">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center animate-pop">
                <span className="text-4xl">✅</span>
                <h2 className="mt-4 text-2xl font-bold">Thank you, {form.name.split(' ')[0]}!</h2>
                <p className="mt-2 max-w-md text-white/70">
                  {sentVia === 'api' ? (
                    <>We've received your message and will get back to you within one business day.</>
                  ) : (
                    <>Your email app should have opened with your enquiry ready to send. If it didn't, email us directly.</>
                  )}{' '}
                  You can also reach us at{' '}
                  <a href={`mailto:${site.contact.email}`} className="text-aqua">
                    {site.contact.email}
                  </a>
                  .
                </p>
                <button onClick={() => setSent(false)} className="btn-ghost mt-6">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h2 className="text-xl font-bold">Send us a message</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name *">
                    <input
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Your name"
                      className="cv-input"
                    />
                  </Field>
                  <Field label="Email *">
                    <input
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@example.com"
                      type="email"
                      className="cv-input"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+91…"
                      className="cv-input"
                    />
                  </Field>
                  <Field label="Interested in">
                    <select
                      value={form.interest}
                      onChange={(e) => update('interest', e.target.value)}
                      className="cv-input"
                    >
                      {tracks.map((t) => (
                        <option key={t.id} className="bg-midnight">
                          {t.name}
                        </option>
                      ))}
                      <option className="bg-midnight">AI &amp; Machine Learning</option>
                      <option className="bg-midnight">Corporate / Enterprise Training</option>
                    </select>
                  </Field>
                </div>
                <Field label="Message *">
                  <textarea
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="Tell us what you're looking for…"
                    rows={5}
                    className="cv-input resize-y"
                  />
                </Field>

                {error && (
                  <p className="rounded-lg border border-[#ff9ecf]/40 bg-[#3a0d2a]/40 px-3 py-2 text-sm text-[#ffb8db]">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
                  {submitting ? 'Sending…' : 'Send message'}
                </button>
                <p className="text-xs text-white/45">
                  {apiConfigured ? 'We typically reply within one business day.' : 'Submitting opens your email app pre-filled.'}{' '}
                  Prefer to call?{' '}
                  <a href={`tel:${site.contact.phoneHref}`} className="text-aqua">
                    {site.contact.phone}
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-xs uppercase tracking-wider text-white/55">{label}</span>
      {children}
    </label>
  )
}
