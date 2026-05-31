import type { Lab } from '../types'
import { tracks } from '../data/tracks'
import { DifficultyBadge, StageBadge } from './ui/Badge'

const trackName = (id: Lab['track']) =>
  tracks.find((t) => t.id === id)?.shortName ?? id

const sandboxLabel: Record<Lab['sandboxType'], string> = {
  flagInput: 'Flag CTF',
  multipleChoice: 'Analyze',
  ipSelection: 'Detect',
}

export function LabCard({ lab, onOpen }: { lab: Lab; onOpen: (id: string) => void }) {
  return (
    <div className="card flex flex-col p-5 transition hover:-translate-y-1 hover:border-aqua/40 hover:shadow-glow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <StageBadge stage={lab.stage} />
        <span className="chip border border-cerulean/40 bg-cerulean/10 text-[#9fe6f7]">
          {trackName(lab.track)}
        </span>
        <span className="chip border border-aqua/30 bg-aqua/10 text-aqua">
          {sandboxLabel[lab.sandboxType]}
        </span>
      </div>

      <h3 className="font-display text-lg font-semibold leading-snug">{lab.title}</h3>
      <p className="mt-2 flex-1 text-sm text-white/60">{lab.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-white/55">
          <DifficultyBadge level={lab.difficulty} />
          <span className="flex items-center gap-1">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" strokeLinecap="round" />
            </svg>
            {lab.estimatedMinutes} min
          </span>
        </div>
        <button onClick={() => onOpen(lab.id)} className="btn-primary !px-4 !py-2 text-xs">
          Open Lab
        </button>
      </div>
    </div>
  )
}
