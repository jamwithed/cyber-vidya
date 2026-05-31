import { courses } from '../data/courses'
import type { Course } from '../types'
import { DifficultyBadge } from '../components/ui/Badge'

const icons: Record<string, JSX.Element> = {
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />,
  monitor: <path d="M3 5h18v11H3zM8 21h8M12 16v5" />,
  code: <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 5l-2 14" />,
  network: <path d="M6 4h4v4H6zM14 16h4v4h-4zM6 16h4v4H6zM8 8v4m0 0h8m-8 0v4m8-4v4" />,
  target: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />,
  cloud: <path d="M6 18a4 4 0 0 1 .7-7.9 5 5 0 0 1 9.5-1.1A4 4 0 0 1 17 18H6z" />,
  clipboard: <path d="M9 4h6v3H9zM7 5H5v15h14V5h-2M8 11h8M8 15h6" />,
  chip: <path d="M7 7h10v10H7zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />,
}

function Icon({ name }: { name: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {icons[name] ?? icons.shield}
    </svg>
  )
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div
      className={`card flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-glow-sm ${
        course.featured ? 'border-aqua/50 shadow-glow-sm lg:col-span-2' : 'hover:border-aqua/40'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-midnight">
          <Icon name={course.icon} />
        </span>
        {course.featured && (
          <span className="chip border border-aqua/40 bg-aqua/10 text-aqua">★ Flagship</span>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold leading-snug">{course.title}</h3>
      <p className="mt-2 text-sm text-white/65">{course.tagline}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {course.level === 'All levels' ? (
          <span className="chip border border-white/15 bg-white/5 text-white/75">All levels</span>
        ) : (
          <DifficultyBadge level={course.level} />
        )}
        <span className="chip border border-white/15 bg-white/5 text-white/70">⏱ {course.duration}</span>
        <span className="chip border border-cerulean/40 bg-cerulean/10 text-[#9fe6f7]">{course.format}</span>
      </div>

      <div className={`mt-5 ${course.featured ? 'grid gap-6 sm:grid-cols-2' : ''}`}>
        <div>
          <h4 className="section-eyebrow">What you'll learn</h4>
          <ul className="mt-2 space-y-1.5">
            {course.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-white/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className={course.featured ? '' : 'mt-4'}>
          <h4 className="section-eyebrow">Career outcomes</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {course.outcomes.map((o) => (
              <span key={o} className="chip border border-white/12 bg-white/5 text-white/75">{o}</span>
            ))}
          </div>
          <h4 className="section-eyebrow mt-4">Aligned certifications</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {course.certs.map((c) => (
              <span key={c} className="chip border border-cerulean/40 bg-cerulean/10 text-[#9fe6f7]">{c}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 pt-2">
        <a href="#/contact" className="btn-primary !px-5 !py-2 text-xs">Enroll Now</a>
        {course.trackId && (
          <a href="#tracks" className="font-display text-xs uppercase tracking-wider text-aqua hover:underline">
            View track →
          </a>
        )}
      </div>
    </div>
  )
}

export function Courses() {
  return (
    <div className="pt-28">
      <section className="relative overflow-hidden py-14">
        <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-cerulean/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-5 text-center animate-fade-up">
          <span className="section-eyebrow">Courses &amp; Programs</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Industry-ready <span className="brand-text-gradient">cybersecurity</span> programs
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            From your first day in IT to advanced red teaming and cloud security — pick the
            program that matches your goals. Every course is hands-on, mentor-led, and mapped
            to globally recognized certifications.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a href="#roadmap" className="btn-ghost">See the Roadmap</a>
            <a href="#/contact" className="btn-primary">Talk to an Advisor</a>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-5 lg:grid-cols-2">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-5">
          <div className="card bg-midnight-panel p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Not sure which course fits?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Use the salary &amp; effort estimator, explore the interactive roadmap, or talk to
              our team for a personalized recommendation.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <a href="#estimator" className="btn-ghost">Try the Estimator</a>
              <a href="#/contact" className="btn-primary">Get Guidance</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
