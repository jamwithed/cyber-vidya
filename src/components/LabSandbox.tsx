import { useEffect, useRef, useState } from 'react'
import type { Sandbox } from '../types'
import { usePhonePortrait } from '../hooks/useMediaQuery'

/** Pull a flag{...} token out of the sandbox answers / typed input / message. */
function extractFlag(sandbox: Sandbox, typed: string): string | null {
  const candidates: string[] = []
  if (sandbox.type === 'flagInput') {
    candidates.push(...sandbox.answers, typed)
  }
  if ('successMessage' in sandbox) candidates.push(sandbox.successMessage)
  for (const c of candidates) {
    const m = (c || '').match(/flag\{[^}]*\}/i)
    if (m) return m[0]
  }
  return null
}

interface LabSandboxProps {
  sandbox: Sandbox
  /** Fired the first time the lab is solved (drives confetti). */
  onSolved: () => void
}

/** Normalize free-text answers for forgiving comparison. */
function norm(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ')
}

function arraysEqualAsSet(a: string[], b: string[]) {
  if (a.length !== b.length) return false
  const sb = new Set(b)
  return a.every((x) => sb.has(x))
}

type Status = 'idle' | 'success' | 'fail'

export function LabSandbox({ sandbox, onSolved }: LabSandboxProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [solved, setSolved] = useState(false)
  const [hintsShown, setHintsShown] = useState(0)
  const [attempts, setAttempts] = useState(0)

  // Per-type input state
  const [text, setText] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  // Wide content (logs, request/JSON dumps, IP tables) can't fit a narrow
  // portrait phone without sideways scrolling — ask the user to rotate.
  const phonePortrait = usePhonePortrait()
  const [forcePortrait, setForcePortrait] = useState(false)
  const needsWide =
    sandbox.type === 'ipSelection' ||
    ('mono' in sandbox && Boolean((sandbox as { mono?: boolean }).mono))
  const showRotate = needsWide && phonePortrait && !forcePortrait

  const succeed = () => {
    setStatus('success')
    if (!solved) {
      setSolved(true)
      onSolved()
    }
  }

  const fail = () => {
    setStatus('fail')
    setAttempts((a) => a + 1)
    // Auto-surface one more hint after each failure (up to all available).
    setHintsShown((h) => Math.min(h + 1, sandbox.hints.length))
  }

  const check = () => {
    if (sandbox.type === 'flagInput') {
      const ok = sandbox.answers.some((a) => norm(a) === norm(text))
      ok ? succeed() : fail()
    } else if (sandbox.type === 'multipleChoice') {
      const ok = arraysEqualAsSet(selected, sandbox.correct)
      ok ? succeed() : fail()
    } else {
      const ok = arraysEqualAsSet(selected, sandbox.correct)
      ok ? succeed() : fail()
    }
  }

  const reset = () => {
    setStatus('idle')
    setText('')
    setSelected([])
  }

  const toggle = (id: string, multiple: boolean) => {
    if (status === 'success') return
    setStatus('idle')
    setSelected((prev) =>
      multiple
        ? prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id]
        : [id],
    )
  }

  const successText =
    'successMessage' in sandbox ? sandbox.successMessage : 'Correct!'
  const capturedFlag = status === 'success' ? extractFlag(sandbox, text) : null

  return (
    <div className="rounded-2xl border border-aqua/25 bg-midnight-900/60 p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gradient text-midnight">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-aqua">
          Sandbox
        </h4>
      </div>

      {showRotate ? (
        <RotatePrompt onContinue={() => setForcePortrait(true)} />
      ) : (
        <>
      {/* Mock content block (logs / request / json / encoded) */}
      {'content' in sandbox && sandbox.content && (
        <pre
          className={`mb-4 max-h-72 overflow-auto rounded-xl border border-white/10 bg-black/40 p-4 text-[11px] leading-relaxed text-aqua/90 sm:text-xs ${
            sandbox.mono ? 'font-mono' : 'font-body whitespace-pre-wrap text-white/80'
          }`}
        >
          {sandbox.content}
        </pre>
      )}

      <p className="mb-3 text-sm font-medium text-white/85">{sandbox.prompt}</p>

      {/* ---- flagInput ---- */}
      {sandbox.type === 'flagInput' && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setStatus('idle')
            }}
            onKeyDown={(e) => e.key === 'Enter' && check()}
            placeholder={sandbox.placeholder ?? 'Type your answer…'}
            disabled={status === 'success'}
            className="flex-1 rounded-xl border border-white/15 bg-black/40 px-4 py-2.5 font-mono text-sm text-white placeholder:text-white/30 focus:border-aqua disabled:opacity-60"
          />
          <button onClick={check} disabled={status === 'success' || !text.trim()} className="btn-primary">
            Submit
          </button>
        </div>
      )}

      {/* ---- multipleChoice ---- */}
      {sandbox.type === 'multipleChoice' && (
        <div className="flex flex-col gap-2">
          {sandbox.options.map((opt) => {
            const isSel = selected.includes(opt.id)
            return (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                  isSel
                    ? 'border-aqua/60 bg-aqua/10 text-white'
                    : 'border-white/12 bg-white/[0.03] text-white/80 hover:border-white/30'
                }`}
              >
                <input
                  type={sandbox.multiple ? 'checkbox' : 'radio'}
                  name="mc"
                  checked={isSel}
                  onChange={() => toggle(opt.id, !!sandbox.multiple)}
                  disabled={status === 'success'}
                  className="accent-[#22A7C8]"
                />
                {opt.label}
              </label>
            )
          })}
          <button
            onClick={check}
            disabled={status === 'success' || selected.length === 0}
            className="btn-primary mt-2 self-start"
          >
            Submit
          </button>
        </div>
      )}

      {/* ---- ipSelection ---- */}
      {sandbox.type === 'ipSelection' && (
        <div>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-[11px] sm:text-xs">
              <thead className="bg-white/5 font-display uppercase tracking-wider text-white/55">
                <tr>
                  <th className="px-3 py-2 w-8" />
                  {sandbox.columns.map((c) => (
                    <th key={c} className="px-3 py-2">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono">
                {sandbox.rows.map((row) => {
                  const isSel = selected.includes(row.id)
                  return (
                    <tr
                      key={row.id}
                      onClick={() => toggle(row.id, true)}
                      className={`cursor-pointer border-t border-white/8 transition ${
                        isSel ? 'bg-aqua/10' : 'hover:bg-white/[0.04]'
                      }`}
                    >
                      <td className="px-3 py-2">
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            isSel ? 'border-aqua bg-aqua' : 'border-white/30'
                          }`}
                        >
                          {isSel && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#08083F" strokeWidth="4">
                              <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                      </td>
                      {row.cells.map((cell, i) => (
                        <td key={i} className="px-3 py-2 text-white/80">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <button
            onClick={check}
            disabled={status === 'success' || selected.length === 0}
            className="btn-primary mt-3"
          >
            Submit
          </button>
        </div>
      )}

      {/* ---- Feedback ---- */}
      {status === 'success' && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-aqua/40 bg-aqua/10 px-4 py-3 animate-pop">
          <span className="text-lg">✅</span>
          <p className="text-sm text-aqua">{successText}</p>
        </div>
      )}

      {status === 'success' && capturedFlag && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-aqua/30 bg-black/50 px-4 py-2.5 font-mono text-sm">
          <span className="text-cerulean">🔓 captured</span>
          <TypedFlag value={capturedFlag} />
        </div>
      )}

      {status === 'fail' && (
        <div className="mt-4 rounded-xl border border-[#ff9ecf]/40 bg-[#3a0d2a]/40 px-4 py-3">
          <p className="text-sm text-[#ffb8db]">
            ❌ Not quite — attempt {attempts}. {attempts >= 1 && 'Check the hint below and try again.'}
          </p>
        </div>
      )}

      {/* ---- Hints ---- */}
      {sandbox.hints.length > 0 && status !== 'success' && (
        <div className="mt-4">
          {hintsShown > 0 && (
            <ul className="mb-2 space-y-1">
              {sandbox.hints.slice(0, hintsShown).map((h, i) => (
                <li key={i} className="text-xs text-white/60">
                  💡 {h}
                </li>
              ))}
            </ul>
          )}
          {hintsShown < sandbox.hints.length && (
            <button
              onClick={() => setHintsShown((h) => h + 1)}
              className="text-xs font-display uppercase tracking-wider text-cerulean hover:text-aqua"
            >
              Show a hint ({hintsShown}/{sandbox.hints.length})
            </button>
          )}
        </div>
      )}

      {status === 'success' && (
        <button
          onClick={reset}
          className="mt-3 text-xs font-display uppercase tracking-wider text-white/50 hover:text-aqua"
        >
          ↺ Reset &amp; try again
        </button>
      )}
        </>
      )}
    </div>
  )
}

const SCRAMBLE = '!<>-_\\/[]{}=+*^?#§$%&01'

/** "Decrypts" a flag with a left-to-right scramble-resolve reveal + cursor. */
function TypedFlag({ value }: { value: string }) {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)
  const raf = useRef(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(value)
      setDone(true)
      return
    }
    let frame = 0
    const tick = () => {
      const revealed = Math.floor(frame / 2) // ~2 frames per character
      let out = ''
      for (let i = 0; i < value.length; i++) {
        if (i < revealed || value[i] === ' ') out += value[i]
        else out += SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]
      }
      setDisplay(out)
      frame++
      if (revealed <= value.length) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
        setDone(true)
      }
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [value])

  return (
    <span className="font-mono font-semibold tracking-wide text-aqua">
      {display}
      <span className={`ml-0.5 text-aqua ${done ? 'cursor-blink' : ''}`}>▋</span>
    </span>
  )
}

/** Shown in place of a wide sandbox when a phone is held in portrait. */
function RotatePrompt({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-aqua/30 bg-aqua/10 text-aqua">
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        >
          <rect x="4" y="2" width="12" height="20" rx="2" transform="rotate(-20 10 12)" />
          <path d="M20 9a7 7 0 0 0-5-4" />
          <path d="M20 5v4h-4" />
        </svg>
      </span>
      <div>
        <h5 className="font-display text-base font-semibold text-white">Rotate to landscape</h5>
        <p className="mx-auto mt-1.5 max-w-xs text-sm text-white/65">
          This lab shows wide logs and tables. Turn your phone sideways so everything
          fits — no sideways scrolling needed.
        </p>
      </div>
      <button
        onClick={onContinue}
        className="text-xs font-display uppercase tracking-wider text-white/45 underline-offset-4 hover:text-aqua hover:underline"
      >
        Continue in portrait anyway
      </button>
    </div>
  )
}
