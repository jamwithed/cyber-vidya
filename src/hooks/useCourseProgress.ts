import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CourseCurriculum, ProgressStatus } from '../types'

/**
 * Client-side, pause/resume course progress, persisted in localStorage.
 *
 * This makes the self-paced experience work end-to-end with no backend: a
 * learner can close the tab and come back to exactly where they were. When the
 * backend portal API is live, this same shape maps 1:1 onto the Enrollment /
 * LessonProgress models in src/types.ts and can be synced server-side.
 */
interface StoredProgress {
  /** lessonId → status. */
  lessons: Record<string, ProgressStatus>
  /** The "Resume" target. */
  currentLessonId?: string
  /** Earned badge ids. */
  badges: string[]
  updatedAt: string
}

const empty: StoredProgress = { lessons: {}, badges: [], updatedAt: '' }

function keyFor(courseId: string) {
  return `cv_progress_${courseId}`
}

function load(courseId: string): StoredProgress {
  try {
    const raw = localStorage.getItem(keyFor(courseId))
    if (!raw) return { ...empty }
    const parsed = JSON.parse(raw) as Partial<StoredProgress>
    return {
      lessons: parsed.lessons ?? {},
      currentLessonId: parsed.currentLessonId,
      badges: parsed.badges ?? [],
      updatedAt: parsed.updatedAt ?? '',
    }
  } catch {
    return { ...empty }
  }
}

export interface CourseProgress {
  /** Raw status per lesson. */
  lessonStatus: (lessonId: string) => ProgressStatus
  /** True if every lesson in the module is completed. */
  isModuleComplete: (moduleId: string) => boolean
  /**
   * True if the module is reachable: all *earlier* mastery-required modules are
   * complete. Implements mastery-based progression gating.
   */
  isModuleUnlocked: (moduleId: string) => boolean
  /** 0–100 across all authored lessons. */
  percent: number
  completedCount: number
  totalCount: number
  /** Where "Resume" should drop the learner (first incomplete / last visited). */
  resumeLessonId: string | undefined
  earnedBadges: string[]
  /* mutations */
  markComplete: (lessonId: string) => void
  markIncomplete: (lessonId: string) => void
  setCurrent: (lessonId: string) => void
  reset: () => void
}

export function useCourseProgress(course: CourseCurriculum | undefined): CourseProgress {
  const courseId = course?.courseId ?? ''
  const [state, setState] = useState<StoredProgress>(() => load(courseId))

  // Reload when switching courses.
  useEffect(() => {
    setState(load(courseId))
  }, [courseId])

  // Persist on every change.
  useEffect(() => {
    if (!courseId) return
    try {
      localStorage.setItem(keyFor(courseId), JSON.stringify(state))
    } catch {
      /* storage full / unavailable — progress is best-effort offline */
    }
  }, [courseId, state])

  const allLessons = useMemo(
    () => course?.modules.flatMap((m) => m.lessons) ?? [],
    [course],
  )

  const lessonStatus = useCallback(
    (lessonId: string): ProgressStatus => state.lessons[lessonId] ?? 'not-started',
    [state.lessons],
  )

  const isModuleComplete = useCallback(
    (moduleId: string) => {
      const m = course?.modules.find((mm) => mm.id === moduleId)
      if (!m || m.lessons.length === 0) return false
      return m.lessons.every((l) => state.lessons[l.id] === 'completed')
    },
    [course, state.lessons],
  )

  const isModuleUnlocked = useCallback(
    (moduleId: string) => {
      if (!course) return false
      const idx = course.modules.findIndex((m) => m.id === moduleId)
      if (idx <= 0) return true
      // Unlocked only if every earlier mastery-required module is complete.
      return course.modules.slice(0, idx).every((m) => {
        if (!m.masteryRequired) return true
        return m.lessons.every((l) => state.lessons[l.id] === 'completed')
      })
    },
    [course, state.lessons],
  )

  const completedCount = useMemo(
    () => allLessons.filter((l) => state.lessons[l.id] === 'completed').length,
    [allLessons, state.lessons],
  )
  const totalCount = allLessons.length
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  const resumeLessonId = useMemo(() => {
    const firstIncomplete = allLessons.find((l) => state.lessons[l.id] !== 'completed')
    return firstIncomplete?.id ?? state.currentLessonId ?? allLessons[0]?.id
  }, [allLessons, state.lessons, state.currentLessonId])

  const markComplete = useCallback((lessonId: string) => {
    setState((s) => ({
      ...s,
      lessons: { ...s.lessons, [lessonId]: 'completed' },
      updatedAt: new Date().toISOString(),
    }))
  }, [])

  const markIncomplete = useCallback((lessonId: string) => {
    setState((s) => ({
      ...s,
      lessons: { ...s.lessons, [lessonId]: 'in-progress' },
      updatedAt: new Date().toISOString(),
    }))
  }, [])

  const setCurrent = useCallback((lessonId: string) => {
    setState((s) => ({
      ...s,
      currentLessonId: lessonId,
      lessons:
        s.lessons[lessonId] === 'completed'
          ? s.lessons
          : { ...s.lessons, [lessonId]: 'in-progress' },
      updatedAt: new Date().toISOString(),
    }))
  }, [])

  const reset = useCallback(() => {
    setState({ ...empty, updatedAt: new Date().toISOString() })
  }, [])

  return {
    lessonStatus,
    isModuleComplete,
    isModuleUnlocked,
    percent,
    completedCount,
    totalCount,
    resumeLessonId,
    earnedBadges: state.badges,
    markComplete,
    markIncomplete,
    setCurrent,
    reset,
  }
}
