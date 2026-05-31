/**
 * Cyber Vidya logo — rebuilt as inline SVG from the brand guide:
 * graduation cap + person + open book + laptop, in the approved aqua→cerulean
 * gradient (#4FFFF2 → #22A7C8). Only brand colors are used, no effects applied,
 * per the guide's "Dos".
 */

interface LogoProps {
  /** Render the wordmark beside the icon. */
  withWordmark?: boolean
  /** Pixel height of the icon. */
  size?: number
  className?: string
}

let gradientSeq = 0

export function Logo({ withWordmark = true, size = 40, className = '' }: LogoProps) {
  // Unique gradient ids so multiple logos on a page don't collide.
  const uid = `cv-${gradientSeq++}`

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Cyber Vidya logo"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id={`${uid}-aqua`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4FFFF2" />
            <stop offset="100%" stopColor="#22A7C8" />
          </linearGradient>
          <linearGradient id={`${uid}-light`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D6FBFA" />
          </linearGradient>
        </defs>

        {/* Open book — fanned pages */}
        <path
          d="M60 92 C44 80 28 80 14 86 L14 70 C28 64 44 64 60 76 C76 64 92 64 106 70 L106 86 C92 80 76 80 60 92 Z"
          fill={`url(#${uid}-aqua)`}
        />
        <path
          d="M60 88 C46 78 32 78 20 82 L20 74 C32 70 46 70 60 79 C74 70 88 70 100 74 L100 82 C88 78 74 78 60 88 Z"
          fill="#22A7C8"
          opacity="0.55"
        />

        {/* Laptop base behind the person */}
        <path
          d="M38 74 L82 74 L74 58 L46 58 Z"
          fill={`url(#${uid}-aqua)`}
          opacity="0.85"
        />
        <circle cx="60" cy="66" r="2.4" fill="#08083F" />

        {/* Person head + shoulders */}
        <circle cx="60" cy="40" r="13" fill={`url(#${uid}-light)`} />
        <path
          d="M44 60 C44 50 52 46 60 46 C68 46 76 50 76 60 Z"
          fill={`url(#${uid}-light)`}
        />

        {/* Graduation cap */}
        <path d="M30 30 L60 19 L90 30 L60 41 Z" fill={`url(#${uid}-aqua)`} />
        <path d="M48 36 L72 36 L72 47 C72 52 48 52 48 47 Z" fill="#22A7C8" />
        <path d="M88 31 L88 44" stroke="#4FFFF2" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="88" cy="46" r="3" fill="#4FFFF2" />
      </svg>

      {withWordmark && (
        <span className="font-display font-bold leading-none tracking-wider text-white">
          <span className="text-aqua">CYBER</span> VIDYA
        </span>
      )}
    </span>
  )
}
