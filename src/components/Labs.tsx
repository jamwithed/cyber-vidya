import { useEffect, useMemo, useState } from 'react'
import { labs, labsById } from '../data/labs'
import { tracks } from '../data/tracks'
import { stages } from '../data/stages'
import type { Lab, StageId, TrackId } from '../types'
import { LabCard } from './LabCard'
import { LabSandbox } from './LabSandbox'
import { Confetti } from './ui/Confetti'
import { DifficultyBadge, StageBadge } from './ui/Badge'

interface LabsProps {
  /** Lab requested from elsewhere (e.g. a track row). */
  openLabId: string | null
  onOpenLab: (id: string | null) => void
}

type StageFilter = StageId | 'all'
type TrackFilter = TrackId | 'all'

export function Labs({ openLabId, onOpenLab }: LabsProps) {
  const [stageFilter, setStageFilter] = useState<StageFilter>('all')
  const [trackFilter, setTrackFilter] = useState<TrackFilter>('all')
  const [confettiKey, setConfettiKey] = useState(0)
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  const openLab: Lab | null = openLabId ? labsById[openLabId] ?? null : null

  const filtered = useMemo(
    () =>
      labs.filter(
        (l) =>
          (stageFilter === 'all' || l.stage === stageFilter) &&
          (trackFilter === 'all' || l.track === trackFilter),
      ),
    [stageFilter, trackFilter],
  )

  // Lock body scroll while the lab modal is open.
  useEffect(() => {
    document.body.style.overflow = openLab ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [openLab])

  // Close on Escape.
  useEffect(() => {
    if (!openLab) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onOpenLab(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openLab, onOpenLab])

  const handleSolved = (labId: string) => {
    setConfettiKey((k) => k + 1)
    setCompleted((prev) => new Set(prev).add(labId))
  }

  return (
    <section id="labs" className="scroll-mt-24 py-14 sm:py-20">
      <Confetti fireKey={confettiKey} />

      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 max-w-2xl">
          <span className="section-eyebrow">Hands-On</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Labs &amp; Mini-CTF Playground</h2>
          <p className="mt-3 text-white/65">
            Pick a lab, read the brief, and solve the challenge right in your browser.
            Everything runs client-side — type a <code className="text-aqua">flag{'{}'}</code>,
            answer a question, or spot the malicious IP. Immediate feedback included.
          </p>
          {completed.size > 0 && (
            <p className="mt-3 font-display text-sm text-aqua">
              ✔ {completed.size} / {labs.length} labs solved
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <FilterGroup label="Stage">
            <FilterChip active={stageFilter === 'all'} onClick={() => setStageFilter('all')}>
              All
            </FilterChip>
            {stages.map((s) => (
              <FilterChip
                key={s.id}
                active={stageFilter === s.id}
                onClick={() => setStageFilter(s.id)}
              >
                {s.id}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup label="Track">
            <FilterChip active={trackFilter === 'all'} onClick={() => setTrackFilter('all')}>
              All
            </FilterChip>
            {tracks.map((t) => (
              <FilterChip
                key={t.id}
                active={trackFilter === t.id}
                onClick={() => setTrackFilter(t.id)}
              >
                {t.shortName}
              </FilterChip>
            ))}
          </FilterGroup>
        </div>

        {/* Catalog */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((lab) => (
              <LabCard key={lab.id} lab={lab} onOpen={onOpenLab} />
            ))}
          </div>
        ) : (
          <p className="text-white/55">No labs match these filters yet.</p>
        )}
      </div>

      {/* Lab detail modal */}
      {openLab && (
        <LabDetail
          lab={openLab}
          solved={completed.has(openLab.id)}
          onClose={() => onOpenLab(null)}
          onSolved={() => handleSolved(openLab.id)}
        />
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Filter UI                                                           */
/* ------------------------------------------------------------------ */

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-display text-xs uppercase tracking-wider text-white/45">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-xs font-medium transition sm:py-1.5 ${
        active
          ? 'bg-brand-gradient text-midnight'
          : 'border border-white/15 bg-white/5 text-white/70 hover:border-aqua/40'
      }`}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Lab detail modal                                                    */
/* ------------------------------------------------------------------ */

function LabDetail({
  lab,
  solved,
  onClose,
  onSolved,
}: {
  lab: Lab
  solved: boolean
  onClose: () => void
  onSolved: () => void
}) {
  const [stepsOpen, setStepsOpen] = useState(true)

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-2 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative my-2 w-full max-w-3xl rounded-2xl border border-white/12 bg-midnight-panel shadow-card sm:my-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={lab.title}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/10 p-5 sm:p-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <StageBadge stage={lab.stage} />
              <DifficultyBadge level={lab.difficulty} />
              <span className="chip border border-white/15 bg-white/5 text-white/65">
                {lab.estimatedMinutes} min
              </span>
              {solved && (
                <span className="chip border border-aqua/40 bg-aqua/10 text-aqua">✔ Solved</span>
              )}
            </div>
            <h3 className="text-xl font-bold sm:text-2xl">{lab.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close lab"
            className="shrink-0 rounded-lg border border-white/15 p-2 text-white/70 transition hover:border-aqua hover:text-aqua"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 p-5 sm:p-6">
          <p className="text-white/75">{lab.description}</p>

          <div>
            <h4 className="section-eyebrow">Prerequisites</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {lab.prerequisites.map((p) => (
                <li key={p} className="chip border border-white/12 bg-white/5 text-white/70">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Collapsible steps */}
          <div className="rounded-xl border border-white/10">
            <button
              onClick={() => setStepsOpen((o) => !o)}
              className="flex w-full items-center justify-between px-4 py-3"
              aria-expanded={stepsOpen}
            >
              <span className="section-eyebrow">Step-by-step instructions</span>
              <span className={`text-aqua transition-transform ${stepsOpen ? 'rotate-180' : ''}`}>
                ⌄
              </span>
            </button>
            {stepsOpen && (
              <ol className="space-y-2 px-4 pb-4">
                {lab.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua/15 font-display text-[11px] text-aqua">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* The interactive sandbox */}
          <LabSandbox sandbox={lab.sandbox} onSolved={onSolved} />
        </div>
      </div>
    </div>
  )
}
