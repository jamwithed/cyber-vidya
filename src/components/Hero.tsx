import { Logo } from './Logo'
import { site } from '../data/site'

const stats = [
  { value: '4', label: 'Roadmap stages' },
  { value: '4', label: 'Career tracks' },
  { value: '8', label: 'Hands-on labs' },
  { value: 'Hybrid', label: 'Classroom · Online' },
]

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
      <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      {/* Decorative glow orbs */}
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-cerulean/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 h-72 w-72 rounded-full bg-aqua/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <div className="mb-6 flex justify-center">
            <Logo size={64} withWordmark={false} />
          </div>

          <span className="chip mb-5 inline-flex border border-aqua/30 bg-aqua/10 text-aqua">
            Cybersecurity &amp; AI education · India
          </span>

          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            Professional <span className="brand-text-gradient">Cybersecurity</span>{' '}
            Experts &amp; Educators
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
            {site.subTagline} Learn through an interactive roadmap, real hands-on
            labs and a live mini-CTF playground — built and taught by
            industry-certified professionals.
          </p>

          {/* Selling-point pointers */}
          <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-2">
            {site.heroPointers.map((p) => (
              <li key={p} className="flex items-center gap-1.5 text-sm text-white/80">
                <span className="text-aqua">
                  <CheckIcon />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#roadmap" className="btn-primary">
              Explore Roadmap
            </a>
            <a href="#labs" className="btn-ghost">
              Try Labs
            </a>
            <a href="#/contact" className="btn-ghost">
              Talk to an Expert
            </a>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card px-4 py-5 text-center">
              <div className="font-display text-3xl font-bold brand-text-gradient">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
