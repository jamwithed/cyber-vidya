import { useState } from 'react'
import type { InlineQuestion, Lesson, LessonBlock } from '../../types'
import { labsById } from '../../data/labs'
import { LabSandbox } from '../LabSandbox'
import { Markdown } from './markdown'

const calloutStyles: Record<string, { ring: string; label: string; icon: string }> = {
  tip: { ring: 'border-aqua/30 bg-aqua/[0.07]', label: 'Tip', icon: '💡' },
  warning: { ring: 'border-[#ff9ecf]/40 bg-[#3a0d2a]/30', label: 'Watch out', icon: '⚠️' },
  key: { ring: 'border-cerulean/40 bg-cerulean/10', label: 'Key idea', icon: '🔑' },
  industry: { ring: 'border-white/15 bg-white/[0.04]', label: 'From the field', icon: '🏢' },
  india: { ring: 'border-aqua/30 bg-aqua/[0.07]', label: 'India context', icon: '🇮🇳' },
}

/* ------------------------------------------------------------------ */
/* Inline retrieval-practice check                                     */
/* ------------------------------------------------------------------ */
function Check({ q }: { q: InlineQuestion }) {
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const correct =
    selected.length === q.correct.length && selected.every((s) => q.correct.includes(s))

  const toggle = (id: string) => {
    if (submitted) return
    setSelected((prev) =>
      q.multiple
        ? prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id]
        : [id],
    )
  }

  return (
    <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-base">🧠</span>
        <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-aqua">
          Quick check
        </h4>
      </div>
      <p className="mb-3 text-sm font-medium text-white/85">{q.prompt}</p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt) => {
          const isSel = selected.includes(opt.id)
          const isRight = q.correct.includes(opt.id)
          const showState = submitted && (isSel || isRight)
          return (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition ${
                showState
                  ? isRight
                    ? 'border-aqua/60 bg-aqua/10 text-white'
                    : 'border-[#ff9ecf]/50 bg-[#3a0d2a]/30 text-[#ffb8db]'
                  : isSel
                    ? 'border-aqua/60 bg-aqua/10 text-white'
                    : 'border-white/12 bg-white/[0.03] text-white/80 hover:border-white/30'
              }`}
            >
              <input
                type={q.multiple ? 'checkbox' : 'radio'}
                checked={isSel}
                onChange={() => toggle(opt.id)}
                disabled={submitted}
                className="accent-[#22A7C8]"
              />
              {opt.label}
              {submitted && isRight && <span className="ml-auto text-aqua">✓</span>}
            </label>
          )
        })}
      </div>
      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={selected.length === 0}
          className="btn-primary mt-3 self-start !px-4 !py-2 text-xs disabled:opacity-50"
        >
          Check answer
        </button>
      ) : (
        <div
          className={`mt-3 rounded-xl border px-4 py-3 text-sm ${
            correct
              ? 'border-aqua/40 bg-aqua/10 text-aqua'
              : 'border-cerulean/40 bg-cerulean/10 text-[#9fe6f7]'
          }`}
        >
          <p className="font-medium">{correct ? '✅ Correct' : 'ℹ️ Not quite — here’s why'}</p>
          <p className="mt-1 text-white/75">{q.explanation}</p>
          <button
            onClick={() => {
              setSubmitted(false)
              setSelected([])
            }}
            className="mt-2 text-xs font-display uppercase tracking-wider text-white/50 hover:text-aqua"
          >
            ↺ Try again
          </button>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Embedded lab                                                        */
/* ------------------------------------------------------------------ */
function LabBlock({ labId, body }: { labId: string; body?: string }) {
  const [solved, setSolved] = useState(false)
  const lab = labsById[labId]
  if (!lab) {
    return (
      <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-5 text-sm text-white/60">
        Lab <code className="font-mono text-aqua">{labId}</code> — opens in the{' '}
        <a href="#labs" className="text-aqua hover:underline">
          Labs playground
        </a>
        .
      </div>
    )
  }
  return (
    <div className="rounded-2xl border border-aqua/30 bg-aqua/[0.04] p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="chip border border-aqua/40 bg-aqua/10 text-aqua">🧪 Hands-on lab</span>
        <span className="font-display text-sm font-semibold text-white">{lab.title}</span>
        <span className="ml-auto text-xs text-white/50">{lab.estimatedMinutes} min</span>
      </div>
      {body && <p className="mb-3 text-sm text-white/70">{body}</p>}
      <LabSandbox sandbox={lab.sandbox} onSolved={() => setSolved(true)} />
      {solved && (
        <p className="mt-3 text-xs font-medium text-aqua">✓ Lab solved — nice work.</p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Block dispatcher                                                    */
/* ------------------------------------------------------------------ */
function Block({ block }: { block: LessonBlock }) {
  switch (block.type) {
    case 'concept':
    case 'example':
      return (
        <div>
          {block.title && (
            <h3 className="font-display text-lg font-semibold text-white">{block.title}</h3>
          )}
          {block.body && <Markdown body={block.body} />}
        </div>
      )
    case 'callout': {
      const s = calloutStyles[block.variant ?? 'tip'] ?? calloutStyles.tip
      return (
        <div className={`rounded-2xl border px-5 py-4 ${s.ring}`}>
          <div className="mb-1 flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-white/70">
            <span>{s.icon}</span>
            {block.title ?? s.label}
          </div>
          {block.body && <Markdown body={block.body} />}
        </div>
      )
    }
    case 'reflection':
      return (
        <div className="rounded-2xl border border-cerulean/30 bg-cerulean/[0.06] px-5 py-4">
          <div className="mb-1 flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-wider text-[#9fe6f7]">
            <span>✍️</span>
            {block.title ?? 'Reflect & write'}
          </div>
          {block.body && <Markdown body={block.body} />}
        </div>
      )
    case 'video':
      return (
        <div className="rounded-2xl border border-white/12 bg-white/[0.03] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-midnight">
              ▶
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-white">
                {block.title ?? 'Video walkthrough'}
              </p>
              {block.estimatedMinutes && (
                <p className="text-xs text-white/50">{block.estimatedMinutes} min</p>
              )}
            </div>
          </div>
          {block.body && <Markdown body={block.body} />}
        </div>
      )
    case 'resource':
      return (
        <a
          href={block.href ?? '#'}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm text-aqua transition hover:border-aqua/40"
        >
          🔗 {block.title ?? block.href} ↗
        </a>
      )
    case 'lab':
      return <LabBlock labId={block.labId ?? ''} body={block.body} />
    case 'check':
      return block.question ? <Check q={block.question} /> : null
    default:
      return null
  }
}

/* ------------------------------------------------------------------ */
/* Lesson reader                                                       */
/* ------------------------------------------------------------------ */
const kindLabel: Record<Lesson['kind'], string> = {
  theory: 'Reading',
  interactive: 'Hands-on',
  assessment: 'Assessment',
  project: 'Project',
}

export function LessonReader({
  lesson,
  isComplete,
  onComplete,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  lesson: Lesson
  isComplete: boolean
  onComplete: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  return (
    <article className="min-w-0">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="chip border border-cerulean/40 bg-cerulean/10 text-[#9fe6f7]">
          {kindLabel[lesson.kind]}
        </span>
        <span className="chip border border-white/15 bg-white/5 text-white/70">
          ⏱ {lesson.estimatedMinutes} min
        </span>
        {isComplete && (
          <span className="chip border border-aqua/40 bg-aqua/10 text-aqua">✓ Completed</span>
        )}
      </div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{lesson.title}</h1>
      <p className="mt-2 text-white/65">{lesson.summary}</p>

      {lesson.objectives.length > 0 && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h4 className="section-eyebrow">By the end you can</h4>
          <ul className="mt-2 space-y-1.5">
            {lesson.objectives.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm text-white/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.blocks.length > 0 ? (
        <div className="mt-6 space-y-5">
          {lesson.blocks.map((b) => (
            <Block key={b.id} block={b} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-sm text-white/55">
          <p className="font-medium text-white/70">Lesson content in production.</p>
          <p className="mt-1">
            This lesson’s structure, objectives and timing are set; the full teaching content is
            being authored in the same format as the flagship program. You can still mark it
            done to plan your path.
          </p>
        </div>
      )}

      {/* Footer nav + completion */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
        <button onClick={onPrev} disabled={!hasPrev} className="btn-ghost disabled:opacity-40">
          ← Previous
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={onComplete}
            className={isComplete ? 'btn-ghost' : 'btn-primary'}
          >
            {isComplete ? '✓ Completed' : 'Mark complete'}
          </button>
          {hasNext && (
            <button onClick={onNext} className="btn-primary">
              {isComplete ? 'Next →' : 'Skip →'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
