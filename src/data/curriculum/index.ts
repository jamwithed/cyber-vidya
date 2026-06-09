import type { CourseCurriculum, Module, Lesson } from '../../types'
import { careerProgramCurriculum } from './career-program'
import { socBlueCurriculum } from './soc-blue'
import { appsecCurriculum } from './appsec'
import { infraNetworkCurriculum } from './infra-network'
import { offensiveRedCurriculum } from './offensive-red'
import { cloudSecurityCurriculum } from './cloud-security'
import { grcCurriculum } from './grc'
import { aiMlCurriculum } from './ai-ml'

/**
 * Curriculum catalog. One CourseCurriculum per Course in src/data/courses.ts.
 * The flagship (career-program) is fleshed to full block depth; the rest are
 * authored to structural depth (complete module/lesson metadata + representative
 * content blocks), ready to be filled in lesson-by-lesson using the same shape.
 *
 * See docs/curriculum/README.md for the design rationale and research citations.
 */
export const curricula: CourseCurriculum[] = [
  careerProgramCurriculum,
  socBlueCurriculum,
  appsecCurriculum,
  infraNetworkCurriculum,
  offensiveRedCurriculum,
  cloudSecurityCurriculum,
  grcCurriculum,
  aiMlCurriculum,
]

/** Lookup by Course.id (e.g. 'soc-blue'). */
export const curriculumById: Record<string, CourseCurriculum> = Object.fromEntries(
  curricula.map((c) => [c.courseId, c]),
)

/* ------------------------------------------------------------------ */
/* Derived helpers (used by the portal to render & track progress)     */
/* ------------------------------------------------------------------ */

/** Flat, ordered list of every lesson in a course (for resume / next-up). */
export function lessonsOf(courseId: string): Lesson[] {
  const c = curriculumById[courseId]
  if (!c) return []
  return c.modules.flatMap((m) => m.lessons)
}

/** Total authored lessons in a course — denominator for a progress bar. */
export function lessonCount(courseId: string): number {
  return lessonsOf(courseId).length
}

/** Sum of every lesson's estimated minutes + assessments (rough study time). */
export function estimatedMinutes(courseId: string): number {
  const c = curriculumById[courseId]
  if (!c) return 0
  const lessonMins = c.modules.reduce(
    (sum, m) => sum + m.lessons.reduce((s, l) => s + l.estimatedMinutes, 0),
    0,
  )
  const assessMins = c.modules.reduce((sum, m) => sum + m.assessment.estimatedMinutes, 0)
  return lessonMins + assessMins + c.capstone.estimatedMinutes
}

/** Find the first module whose prerequisites aren't yet in `completedModuleIds`. */
export function nextUnlockedModule(
  courseId: string,
  completedModuleIds: string[],
): Module | undefined {
  const c = curriculumById[courseId]
  if (!c) return undefined
  const done = new Set(completedModuleIds)
  return c.modules.find((m) => !done.has(m.id))
}
