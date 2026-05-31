import { site } from '../data/site'
import { Logo } from '../components/Logo'

/* Minimal inline icon set for the "Why choose us" cards. */
const icons: Record<string, JSX.Element> = {
  rocket: <path d="M5 15l4 4m6-16c-4 1-7 4-9 8l3 3c4-2 7-5 8-9 .3-1.2.3-2.4 0-3-.6-.3-1.8-.3-3 0Z M14.5 9.5h.01" />,
  lab: <path d="M9 3v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3M8 3h8M9 14h6" />,
  expert: <path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M5 20a7 7 0 0 1 14 0" />,
  career: <path d="M4 7h16v13H4zM9 7V4h6v3M4 12h16" />,
  cert: <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z M9 14l-2 7 5-3 5 3-2-7" />,
  mentor: <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M19 8v6M22 11h-6" />,
}

function Icon({ name }: { name: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name] ?? icons.cert}
    </svg>
  )
}

export function About() {
  return (
    <div className="pt-28">
      {/* Hero band */}
      <section className="relative overflow-hidden py-16">
        <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-cerulean/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5 text-center animate-fade-up">
          <div className="mb-6 flex justify-center">
            <Logo size={56} withWordmark={false} />
          </div>
          <span className="section-eyebrow">About Us</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/70">{site.mission}</p>
        </div>
      </section>

      {/* Mission / what we do */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card p-7 lg:col-span-2">
              <h2 className="text-2xl font-bold">What We Do</h2>
              <p className="mt-3 text-white/70">
                Cyber Vidya delivers career-oriented cybersecurity and AI education
                alongside enterprise security services. We combine structured
                curriculum, real-world labs and one-on-one mentorship so learners
                don't just pass exams — they're ready for the job on day one.
              </p>

              <h3 className="mt-7 section-eyebrow">Programs we teach</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {site.programs.map((p) => (
                  <div key={p.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="font-display text-sm font-semibold text-aqua">{p.title}</div>
                    <p className="mt-1 text-sm text-white/65">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-7">
              <h3 className="section-eyebrow">Enterprise services</h3>
              <ul className="mt-3 space-y-2">
                {site.services.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
                    {s}
                  </li>
                ))}
              </ul>

              <h3 className="mt-7 section-eyebrow">Flexible learning</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {site.trust.learningModes.map((m) => (
                  <span key={m} className="chip border border-cerulean/40 bg-cerulean/10 text-[#9fe6f7]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 max-w-2xl">
            <span className="section-eyebrow">Why Cyber Vidya</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Built to make you employable</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {site.sellingPoints.map((sp) => (
              <div key={sp.title} className="card p-6 transition hover:-translate-y-1 hover:border-aqua/40 hover:shadow-glow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-midnight">
                  <Icon name={sp.icon} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{sp.title}</h3>
                <p className="mt-2 text-sm text-white/65">{sp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Experts */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 max-w-2xl">
            <span className="section-eyebrow">Our Experts</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Meet the team</h2>
            <p className="mt-3 text-white/65">
              Learn from industry-certified professionals who bring real offensive and
              defensive experience into every session. Connect with them on LinkedIn.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:max-w-3xl">
            {site.team.map((m) => (
              <a
                key={m.name}
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex items-center gap-5 p-5 transition hover:-translate-y-1 hover:border-aqua/40 hover:shadow-glow-sm"
              >
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  className="h-28 w-24 shrink-0 rounded-xl object-cover ring-1 ring-white/10"
                />
                <div>
                  <h3 className="font-display text-lg font-semibold">{m.name}</h3>
                  <p className="mt-1 text-sm text-white/60">{m.role}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-aqua">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                    </svg>
                    View LinkedIn
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5">
          <div className="card grid gap-8 p-7 sm:grid-cols-3">
            <div>
              <h3 className="section-eyebrow">Trusted by industry</h3>
              <ul className="mt-3 space-y-1 text-sm text-white/80">
                {site.trust.clients.map((c) => (
                  <li key={c}>• {c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="section-eyebrow">Training delivered at</h3>
              <ul className="mt-3 space-y-1 text-sm text-white/80">
                {site.trust.institutions.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="section-eyebrow">Sector experience</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {site.trust.sectors.map((s) => (
                  <span key={s} className="chip border border-white/15 bg-white/5 text-white/75">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-4xl px-5">
          <div className="card overflow-hidden bg-midnight-panel p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Ready to start your cyber career?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Explore the interactive roadmap, try a hands-on lab, or talk to our
              team about the program that fits you best.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <a href="#/" className="btn-primary">Explore the Roadmap</a>
              <a href="#/contact" className="btn-ghost">Contact Us</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
