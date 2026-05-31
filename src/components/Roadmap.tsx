import { useState } from 'react'
import { stages } from '../data/stages'
import type { Stage } from '../types'
import { DifficultyBadge } from './ui/Badge'

function formatLpa(n: number) {
  return Number.isInteger(n) ? `${n}` : n.toFixed(1)
}

function StageDetail({ stage }: { stage: Stage }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 animate-fade-up">
      <div>
        <p className="text-white/75">{stage.description}</p>

        <h4 className="mt-6 section-eyebrow">What you learn</h4>
        <ul className="mt-3 space-y-2">
          {stage.topics.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-white/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
              {t}
            </li>
          ))}
        </ul>

        <h4 className="mt-6 section-eyebrow">Target certifications</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {stage.certs.map((c) => (
            <span key={c} className="chip border border-cerulean/40 bg-cerulean/10 text-[#9fe6f7]">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="section-eyebrow">Roles &amp; indicative salary (India)</h4>
        <div className="mt-3 space-y-2">
          {stage.roles.map((r) => (
            <div
              key={r.role}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <span className="text-sm text-white/85">{r.role}</span>
              <span className="font-display text-sm font-semibold text-aqua">
                ₹{formatLpa(r.minLpa)}–{formatLpa(r.maxLpa)} LPA
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs italic text-white/45">
          Approximate ranges — vary by city, company &amp; experience.
        </p>
      </div>
    </div>
  )
}

export function Roadmap() {
  const [active, setActive] = useState<Stage['id']>(1)
  const current = stages.find((s) => s.id === active)!

  return (
    <section id="roadmap" className="scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 max-w-2xl">
          <span className="section-eyebrow">The Path</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Roadmap Timeline</h2>
          <p className="mt-3 text-white/65">
            Four stages from IT fundamentals to security leadership. Click a stage
            to expand its details, durations, certs and salary bands.
          </p>
        </div>

        {/* Stepper */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-white/10 md:block" />
          <div className="relative grid grid-cols-2 gap-4 md:grid-cols-4">
            {stages.map((s) => {
              const isActive = s.id === active
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`group flex flex-col items-center gap-3 text-center transition ${
                    isActive ? '' : 'opacity-70 hover:opacity-100'
                  }`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-bold transition-all ${
                      isActive
                        ? 'bg-brand-gradient text-midnight shadow-glow animate-pulse-glow'
                        : 'border border-white/20 bg-midnight text-white/80 group-hover:border-aqua'
                    }`}
                  >
                    {s.id}
                  </span>
                  <span className="font-display text-sm font-semibold uppercase tracking-wide">
                    {s.title}
                  </span>
                  <span className="text-xs text-white/50">{s.duration}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active stage card */}
        <div className="card mt-10 p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold">
              <span className="text-aqua">Stage {current.id}:</span> {current.title}
            </h3>
            <DifficultyBadge level={current.difficulty} />
            <span className="chip border border-white/15 bg-white/5 text-white/70">
              {current.duration}
            </span>
            <span className="ml-auto text-sm text-white/55">{current.tagline}</span>
          </div>
          <StageDetail stage={current} />
        </div>
      </div>
    </section>
  )
}
