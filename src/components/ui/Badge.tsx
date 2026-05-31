import type { Difficulty, Intensity } from '../../types'

const difficultyStyles: Record<Difficulty, string> = {
  Beginner: 'bg-aqua/15 text-aqua border border-aqua/30',
  Intermediate: 'bg-cerulean/20 text-[#7fdcf2] border border-cerulean/40',
  Advanced: 'bg-[#08083F] text-white border border-white/25',
}

const intensityStyles: Record<Intensity, string> = {
  Low: 'bg-aqua/15 text-aqua border border-aqua/30',
  Medium: 'bg-cerulean/20 text-[#7fdcf2] border border-cerulean/40',
  High: 'bg-[#3a0d2a] text-[#ff9ecf] border border-[#ff9ecf]/40',
}

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return <span className={`chip ${difficultyStyles[level]}`}>{level}</span>
}

export function IntensityBadge({ level }: { level: Intensity }) {
  return (
    <span className={`chip ${intensityStyles[level]}`} title="Math / programming intensity">
      {level}
    </span>
  )
}

export function StageBadge({ stage }: { stage: number }) {
  return (
    <span className="chip bg-white/5 text-white/80 border border-white/15">
      Stage {stage}
    </span>
  )
}
