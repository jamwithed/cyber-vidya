import { useEffect, useRef, useState } from 'react'

interface Line {
  prompt: string
  text: string
  cls?: string
  pause?: number
}

/** The "boot sequence" that types itself out. */
const SCRIPT: Line[] = [
  { prompt: '$', text: 'ssh operator@cyber-vidya.in', cls: 'text-aqua' },
  { prompt: '>', text: 'establishing secure channel ……… [ OK ]', cls: 'text-white/55' },
  { prompt: '>', text: 'auth: certificate verified — clearance: LEARNER', cls: 'text-white/55' },
  { prompt: '>', text: 'mounting roadmap/ → foundation · core · specialize · lead', cls: 'text-white/55' },
  { prompt: '>', text: 'arming labs/ … 8 challenges · mini-CTF online', cls: 'text-white/55' },
  { prompt: '>', text: 'loading flag{} validator … ready', cls: 'text-white/55' },
  { prompt: '✓', text: 'ACCESS GRANTED — welcome, operator.', cls: 'text-aqua font-semibold' },
]

export function HackerTerminal() {
  const [started, setStarted] = useState(false)
  const [lineIdx, setLineIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  // Honour reduced motion: render everything instantly.
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Start typing when the terminal scrolls into view.
  useEffect(() => {
    if (reduce) {
      setLineIdx(SCRIPT.length)
      return
    }
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce])

  // Drive the typing animation.
  useEffect(() => {
    if (!started || lineIdx >= SCRIPT.length) return
    const line = SCRIPT[lineIdx]
    if (typed.length < line.text.length) {
      const next = line.text.slice(0, typed.length + 1)
      const ch = line.text[typed.length]
      const delay = ch === ' ' ? 26 : 16 + ((typed.length * 7) % 22)
      const id = setTimeout(() => setTyped(next), delay)
      return () => clearTimeout(id)
    }
    const id = setTimeout(() => {
      setLineIdx((i) => i + 1)
      setTyped('')
    }, line.pause ?? 300)
    return () => clearTimeout(id)
  }, [started, lineIdx, typed])

  const done = lineIdx >= SCRIPT.length

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-5">
        <div
          ref={rootRef}
          className="scanlines relative overflow-hidden rounded-2xl border border-aqua/25 bg-midnight-900/80 shadow-glow-sm"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="glitch ml-3 font-mono text-xs text-white/45" data-text="operator@cyber-vidya: ~/access">
              operator@cyber-vidya: ~/access
            </span>
          </div>

          {/* Body */}
          <div className="min-h-[15rem] space-y-1.5 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
            {SCRIPT.map((line, i) => {
              if (i > lineIdx) return null
              const isCurrent = i === lineIdx && !done
              const content = isCurrent ? typed : line.text
              return (
                <div key={i} className="flex gap-2">
                  <span className={line.prompt === '✓' ? 'text-aqua' : 'text-cerulean'}>
                    {line.prompt}
                  </span>
                  <span className={line.cls ?? 'text-white/70'}>
                    {content}
                    {isCurrent && <span className="cursor-blink ml-0.5 text-aqua">▋</span>}
                  </span>
                </div>
              )
            })}
            {done && (
              <div className="flex gap-2 pt-1">
                <span className="text-cerulean">$</span>
                <span className="cursor-blink text-aqua">▋</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
