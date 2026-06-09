import type { CourseCurriculum } from '../../types'
import type { CourseProgress } from '../../hooks/useCourseProgress'

function StatusDot({ status }: { status: 'completed' | 'in-progress' | 'not-started' }) {
  if (status === 'completed') {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aqua text-midnight">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
          <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  return (
    <span
      className={`h-5 w-5 shrink-0 rounded-full border ${
        status === 'in-progress' ? 'border-aqua' : 'border-white/25'
      }`}
    />
  )
}

export function CourseOutline({
  course,
  progress,
  selectedLessonId,
  onSelect,
}: {
  course: CourseCurriculum
  progress: CourseProgress
  selectedLessonId: string | null
  onSelect: (lessonId: string) => void
}) {
  return (
    <nav className="space-y-5">
      {course.modules.map((m, i) => {
        const unlocked = progress.isModuleUnlocked(m.id)
        const complete = progress.isModuleComplete(m.id)
        return (
          <div key={m.id} className="card overflow-hidden">
            <div className="flex items-start gap-3 border-b border-white/10 px-4 py-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-display text-xs font-bold ${
                  complete
                    ? 'bg-brand-gradient text-midnight'
                    : unlocked
                      ? 'border border-aqua/40 text-aqua'
                      : 'border border-white/15 text-white/40'
                }`}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="chip border border-white/15 bg-white/5 text-[10px] text-white/60">
                    Stage {m.stage}
                  </span>
                  {!unlocked && <span className="text-xs text-white/40">🔒 Locked</span>}
                  {complete && <span className="text-xs text-aqua">Done</span>}
                </div>
                <h3 className="mt-1 font-display text-sm font-semibold leading-snug text-white">
                  {m.title}
                </h3>
              </div>
            </div>

            <ul className={!unlocked ? 'opacity-50' : ''}>
              {m.lessons.map((l) => {
                const status = progress.lessonStatus(l.id)
                const active = l.id === selectedLessonId
                return (
                  <li key={l.id}>
                    <button
                      disabled={!unlocked}
                      onClick={() => onSelect(l.id)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition ${
                        active
                          ? 'bg-aqua/10 text-white'
                          : 'text-white/70 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:hover:bg-transparent'
                      }`}
                    >
                      <StatusDot status={status} />
                      <span className="min-w-0 flex-1 truncate">{l.title}</span>
                      <span className="shrink-0 text-[11px] text-white/40">{l.estimatedMinutes}m</span>
                    </button>
                  </li>
                )
              })}
              {/* Assessment marker */}
              <li className="flex items-center gap-3 border-t border-white/8 px-4 py-2.5 text-xs text-white/45">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">📋</span>
                <span className="flex-1">{m.assessment.title}</span>
                {m.masteryRequired && m.assessment.passThreshold && (
                  <span className="shrink-0">≥{Math.round(m.assessment.passThreshold * 100)}%</span>
                )}
              </li>
            </ul>
          </div>
        )
      })}
    </nav>
  )
}
