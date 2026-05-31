import { useState } from 'react'
import { tracks } from '../data/tracks'
import { labsById } from '../data/labs'
import type { TrackId } from '../types'
import { DifficultyBadge, IntensityBadge } from './ui/Badge'

interface TrackComparisonProps {
  /** Open a lab by id (handled by the Labs section + scroll). */
  onOpenLab: (labId: string) => void
}

export function TrackComparison({ onOpenLab }: TrackComparisonProps) {
  const [expanded, setExpanded] = useState<TrackId | null>('soc')

  return (
    <section id="tracks" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-12 max-w-2xl">
          <span className="section-eyebrow">Choose Your Lane</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Track Comparison</h2>
          <p className="mt-3 text-white/65">
            Compare the four major cybersecurity tracks side by side. Click a row to
            reveal its mini-course outline and jump straight into relevant labs.
          </p>
        </div>

        <div className="card overflow-hidden">
          {/* Header row (desktop) */}
          <div className="hidden grid-cols-12 gap-4 border-b border-white/10 px-6 py-4 text-xs font-display uppercase tracking-wider text-white/50 md:grid">
            <div className="col-span-4">Track</div>
            <div className="col-span-2">Entry</div>
            <div className="col-span-2">Math / Prog</div>
            <div className="col-span-2">Time to Job</div>
            <div className="col-span-2 text-right">Salary (India)</div>
          </div>

          {tracks.map((t) => {
            const isOpen = expanded === t.id
            return (
              <div key={t.id} className="border-b border-white/10 last:border-0">
                <button
                  onClick={() => setExpanded(isOpen ? null : t.id)}
                  className={`grid w-full grid-cols-1 gap-3 px-6 py-5 text-left transition-colors hover:bg-white/[0.03] md:grid-cols-12 md:items-center md:gap-4 ${
                    isOpen ? 'bg-white/[0.04]' : ''
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-aqua transition-transform ${isOpen ? 'rotate-90' : ''}`}
                        aria-hidden
                      >
                        ▸
                      </span>
                      <span className="font-display font-semibold">{t.name}</span>
                    </div>
                    <p className="mt-1 pl-5 text-sm text-white/55">{t.description}</p>
                  </div>
                  <div className="pl-5 md:col-span-2 md:pl-0">
                    <span className="mr-2 text-xs text-white/40 md:hidden">Entry:</span>
                    <DifficultyBadge level={t.entryComplexity} />
                  </div>
                  <div className="pl-5 md:col-span-2 md:pl-0">
                    <span className="mr-2 text-xs text-white/40 md:hidden">Intensity:</span>
                    <IntensityBadge level={t.intensity} />
                  </div>
                  <div className="pl-5 text-sm text-white/80 md:col-span-2 md:pl-0">
                    <span className="mr-2 text-xs text-white/40 md:hidden">Time:</span>
                    {t.timeToJob}
                  </div>
                  <div className="pl-5 font-display text-sm font-semibold text-aqua md:col-span-2 md:pl-0 md:text-right">
                    ₹{t.salary.minLpa}–{t.salary.maxLpa} LPA
                  </div>
                </button>

                {isOpen && (
                  <div className="grid gap-6 px-6 pb-7 pt-1 md:grid-cols-2 animate-fade-up">
                    <div>
                      <h4 className="section-eyebrow">Mini-course outline</h4>
                      <ol className="mt-3 space-y-2">
                        {t.outline.map((o, i) => (
                          <li key={o} className="flex items-start gap-3 text-sm text-white/80">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua/15 font-display text-[11px] text-aqua">
                              {i + 1}
                            </span>
                            {o}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <h4 className="section-eyebrow">Relevant labs</h4>
                      <div className="mt-3 flex flex-col gap-2">
                        {t.labIds.map((id) => {
                          const lab = labsById[id]
                          if (!lab) return null
                          return (
                            <button
                              key={id}
                              onClick={() => onOpenLab(id)}
                              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:border-aqua/50 hover:bg-aqua/5"
                            >
                              <span className="text-sm text-white/85">{lab.title}</span>
                              <span className="shrink-0 font-display text-xs uppercase tracking-wider text-aqua">
                                Open →
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="mt-4 text-xs italic text-white/45">
          Salary bands are indicative India ranges (LPA) spanning junior to senior
          roles and vary by city, company and experience.
        </p>
      </div>
    </section>
  )
}
