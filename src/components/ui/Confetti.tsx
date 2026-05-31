import { useEffect, useState } from 'react'

/**
 * Tiny dependency-free confetti burst, used on lab/CTF success.
 * Renders a fixed set of brand-colored pieces that fall + fade, then unmounts.
 */

const COLORS = ['#4FFFF2', '#22A7C8', '#FFFFFF', '#7fdcf2']
const PIECES = 36

interface ConfettiProps {
  /** Bump this key (e.g. a counter) each time you want a new burst. */
  fireKey: number
}

export function Confetti({ fireKey }: ConfettiProps) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (fireKey === 0) return
    setActive(true)
    const t = setTimeout(() => setActive(false), 1600)
    return () => clearTimeout(t)
  }, [fireKey])

  if (!active) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {Array.from({ length: PIECES }).map((_, i) => {
        // Deterministic pseudo-random spread based on index (no Math.random needed).
        const left = (i * 53) % 100
        const delay = (i % 8) * 60
        const duration = 1100 + ((i * 37) % 500)
        const size = 6 + (i % 4) * 2
        const color = COLORS[i % COLORS.length]
        const rotate = (i * 47) % 360
        return (
          <span
            key={`${fireKey}-${i}`}
            style={{
              position: 'absolute',
              top: '-5%',
              left: `${left}%`,
              width: size,
              height: size * 1.6,
              background: color,
              borderRadius: 2,
              transform: `rotate(${rotate}deg)`,
              animation: `cv-confetti ${duration}ms ${delay}ms ease-in forwards`,
            }}
          />
        )
      })}
      <style>{`
        @keyframes cv-confetti {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(540deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
