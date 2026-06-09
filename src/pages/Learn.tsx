import { useMemo, useState } from 'react'
import { curriculumById } from '../data/curriculum'
import { useHash, learnCourseId } from '../hooks/useRoute'
import { useCourseProgress } from '../hooks/useCourseProgress'
import { CourseOutline } from '../components/curriculum/CourseOutline'
import { LessonReader } from '../components/curriculum/LessonReader'

export function Learn() {
  const hash = useHash()
  const courseId = learnCourseId(hash)
  const course = courseId ? curriculumById[courseId] : undefined
  const progress = useCourseProgress(course)
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

  // Flat lesson list (with owning module) for prev/next + gating.
  const flat = useMemo(
    () =>
      course?.modules.flatMap((m) => m.lessons.map((l) => ({ lesson: l, moduleId: m.id }))) ?? [],
    [course],
  )

  if (!course) {
    return (
      <div className="min-h-[70vh] pt-28">
        <div className="mx-auto max-w-xl px-5 py-16 text-center">
          <h1 className="font-display text-3xl font-bold">Course not found</h1>
          <p className="mt-3 text-white/60">
            We couldn’t find that course. Browse the full catalog to pick one.
          </p>
          <a href="#/courses" className="btn-primary mt-6 inline-flex">
            View all courses
          </a>
        </div>
      </div>
    )
  }

  const select = (lessonId: string) => {
    setSelectedLessonId(lessonId)
    progress.setCurrent(lessonId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const idx = flat.findIndex((f) => f.lesson.id === selectedLessonId)
  const current = idx >= 0 ? flat[idx] : null
  const prev = idx > 0 ? flat[idx - 1] : null
  const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null
  const nextUnlocked = next ? progress.isModuleUnlocked(next.moduleId) : false

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <header className="border-b border-white/10 bg-midnight/60">
        <div className="mx-auto max-w-7xl px-5 py-5">
          <a href="#/courses" className="text-xs font-display uppercase tracking-wider text-white/50 hover:text-aqua">
            ← All courses
          </a>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-bold sm:text-3xl">{course.title}</h1>
              <p className="mt-1 text-sm text-white/55">
                {course.outcomeRole} · {course.weeklyCommitment} · anchors to {course.capstoneCert}
              </p>
            </div>
            <button
              onClick={() => progress.resumeLessonId && select(progress.resumeLessonId)}
              className="btn-primary shrink-0"
            >
              {progress.completedCount > 0 ? 'Resume' : 'Start learning'}
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs text-white/50">
              <span>
                {progress.completedCount} / {progress.totalCount} lessons
              </span>
              <span>{progress.percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-gradient transition-all"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* Sidebar outline */}
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
          <CourseOutline
            course={course}
            progress={progress}
            selectedLessonId={selectedLessonId}
            onSelect={select}
          />
        </aside>

        {/* Main content */}
        <main className="min-w-0">
          {current ? (
            <LessonReader
              lesson={current.lesson}
              isComplete={progress.lessonStatus(current.lesson.id) === 'completed'}
              onComplete={() => progress.markComplete(current.lesson.id)}
              onPrev={() => prev && select(prev.lesson.id)}
              onNext={() => next && select(next.lesson.id)}
              hasPrev={!!prev}
              hasNext={!!next && nextUnlocked}
            />
          ) : (
            <Overview course={course} onStart={() => progress.resumeLessonId && select(progress.resumeLessonId)} started={progress.completedCount > 0} />
          )}
        </main>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Course overview (shown before a lesson is opened)                   */
/* ------------------------------------------------------------------ */
function Overview({
  course,
  onStart,
  started,
}: {
  course: import('../types').CourseCurriculum
  onStart: () => void
  started: boolean
}) {
  const we = course.workExperience
  return (
    <div className="space-y-6">
      <div className="card p-6 sm:p-8">
        <span className="section-eyebrow">Self-paced · pause & resume anytime</span>
        <h2 className="mt-2 text-2xl font-bold">What this path makes you</h2>
        <p className="mt-2 text-white/70">
          A job-ready <span className="text-aqua">{course.outcomeRole}</span>. ~
          {course.totalEstimatedHours} hours of study at {course.weeklyCommitment}, ending in a
          supervised work-experience practicum and a portfolio capstone.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {course.niceWorkRoles.map((r) => (
            <span key={r} className="chip border border-white/12 bg-white/5 text-white/75">
              {r}
            </span>
          ))}
        </div>
        <button onClick={onStart} className="btn-primary mt-6">
          {started ? 'Resume where you left off' : 'Start the first lesson'}
        </button>
      </div>

      {/* Work-experience phase */}
      <div className="card border-aqua/30 p-6 sm:p-8">
        <span className="section-eyebrow">Embedded work experience</span>
        <h2 className="mt-2 text-xl font-bold">{we.title}</h2>
        <p className="mt-1 text-sm text-white/55">
          {we.format} · {we.durationWeeks} weeks
        </p>
        <p className="mt-3 text-white/70">{we.summary}</p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="section-eyebrow">What you’ll do</h4>
            <ul className="mt-2 space-y-1.5">
              {we.activities.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="section-eyebrow">Portfolio you’ll walk away with</h4>
            <ul className="mt-2 space-y-1.5">
              {we.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cerulean" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Capstone + badges */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <span className="section-eyebrow">Capstone</span>
          <h3 className="mt-2 font-display text-lg font-semibold">{course.capstone.title}</h3>
          <p className="mt-2 text-sm text-white/70">{course.capstone.description}</p>
        </div>
        <div className="card p-6">
          <span className="section-eyebrow">Badges you can earn</span>
          <ul className="mt-3 space-y-2">
            {course.badges.map((b) => (
              <li key={b.id} className="text-sm">
                <span className="font-medium text-white">{b.title}</span>
                <span className="text-white/55"> — {b.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
