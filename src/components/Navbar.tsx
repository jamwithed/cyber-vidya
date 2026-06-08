import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import type { Route } from '../hooks/useRoute'
import { apiConfigured } from '../lib/api'

/** Section links only work on the home page; page links route anywhere. */
const sectionLinks = [
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#tracks', label: 'Tracks' },
  { href: '#labs', label: 'Labs' },
  { href: '#estimator', label: 'Estimator' },
]
const pageLinks: { href: string; label: string; route: Route }[] = [
  { href: '#/courses', label: 'Courses', route: 'courses' },
  { href: '#/about', label: 'About', route: 'about' },
  { href: '#/contact', label: 'Contact', route: 'contact' },
  // The student portal link only appears once the backend API is configured.
  ...(apiConfigured
    ? [{ href: '#/portal', label: 'Portal', route: 'portal' as Route }]
    : []),
]

export function Navbar({ route }: { route: Route }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-midnight/85 backdrop-blur-md border-b border-white/10 shadow-card'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a href="#/" className="shrink-0" aria-label="Cyber Vidya home">
          <Logo size={36} />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {sectionLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-text={l.label}
              className="glitch-hover font-display text-sm uppercase tracking-widest text-white/70 transition-colors hover:text-aqua"
            >
              {l.label}
            </a>
          ))}
          {pageLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-text={l.label}
              className={`glitch-hover font-display text-sm uppercase tracking-widest transition-colors hover:text-aqua ${
                route === l.route ? 'text-aqua' : 'text-white/70'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a href="#/contact" className="btn-primary">
            Enroll Now
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-midnight/95 px-5 py-4 backdrop-blur">
          <div className="flex flex-col gap-4">
            {sectionLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-sm uppercase tracking-widest text-white/80"
              >
                {l.label}
              </a>
            ))}
            {pageLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-sm uppercase tracking-widest text-white/80"
              >
                {l.label}
              </a>
            ))}
            <a href="#/contact" onClick={() => setOpen(false)} className="btn-primary w-full">
              Enroll Now
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
