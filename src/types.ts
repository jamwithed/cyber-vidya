/**
 * Cyber Vidya — shared domain model.
 * All roadmap / track / lab / salary content is described by these interfaces and
 * lives in `src/data/*`, so it can be edited without touching components.
 */

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'
export type Intensity = 'Low' | 'Medium' | 'High'

/** Career tracks the site compares. */
export type TrackId = 'soc' | 'pentest' | 'cloud' | 'grc'

/** Roadmap stages, 1 → 4. */
export type StageId = 1 | 2 | 3 | 4

/* ------------------------------------------------------------------ */
/* Roadmap stages                                                      */
/* ------------------------------------------------------------------ */

export interface RoleSalary {
  /** Job title unlocked at this stage. */
  role: string
  /** Indicative annual salary range, in lakhs per annum (LPA). */
  minLpa: number
  maxLpa: number
}

export interface Stage {
  id: StageId
  title: string
  /** One-line tagline shown on the timeline node. */
  tagline: string
  description: string
  difficulty: Difficulty
  /** Human-readable duration, e.g. "0–6 months". */
  duration: string
  /** What the learner studies in this stage. */
  topics: string[]
  /** Target certifications for this stage. */
  certs: string[]
  /** Roles + indicative salary ranges unlocked here. */
  roles: RoleSalary[]
}

/* ------------------------------------------------------------------ */
/* Tracks (comparison view)                                            */
/* ------------------------------------------------------------------ */

export interface Track {
  id: TrackId
  name: string
  shortName: string
  description: string
  entryComplexity: Difficulty
  /** Math / programming intensity required. */
  intensity: Intensity
  /** Time to become job-ready, e.g. "6–12 months". */
  timeToJob: string
  /** Indicative salary band (LPA) across junior→senior. */
  salary: { minLpa: number; maxLpa: number }
  /** Mini-course outline revealed when a track row is expanded. */
  outline: string[]
  /** Lab ids relevant to this track. */
  labIds: string[]
}

/* ------------------------------------------------------------------ */
/* Labs + sandbox / mini-CTF                                           */
/* ------------------------------------------------------------------ */

export type SandboxType = 'flagInput' | 'multipleChoice' | 'ipSelection'

/** A single-answer (or accepted-set) text/flag challenge. */
export interface FlagSandbox {
  type: 'flagInput'
  /** Mock material the learner inspects (logs, request dump, encoded string…). */
  content: string
  /** Monospace presentation for the content block? */
  mono?: boolean
  prompt: string
  placeholder?: string
  /** Accepted answers (case-insensitive, trimmed). First entry is canonical. */
  answers: string[]
  hints: string[]
  successMessage: string
}

/** Multiple-choice question, optionally allowing several correct answers. */
export interface MultipleChoiceSandbox {
  type: 'multipleChoice'
  content?: string
  mono?: boolean
  prompt: string
  options: { id: string; label: string }[]
  /** Ids of the correct option(s). */
  correct: string[]
  /** Allow selecting more than one option (checkbox vs radio). */
  multiple?: boolean
  hints: string[]
  successMessage: string
}

/** Pick the suspicious row/IP from a tabular dataset. */
export interface IpSelectionSandbox {
  type: 'ipSelection'
  prompt: string
  columns: string[]
  rows: { id: string; cells: string[] }[]
  /** Row id(s) that are the correct answer. */
  correct: string[]
  hints: string[]
  successMessage: string
}

export type Sandbox = FlagSandbox | MultipleChoiceSandbox | IpSelectionSandbox

export interface Lab {
  id: string
  title: string
  stage: StageId
  track: TrackId
  difficulty: Difficulty
  estimatedMinutes: number
  description: string
  prerequisites: string[]
  steps: string[]
  /** Discriminator mirrored from `sandbox.type` for quick filtering. */
  sandboxType: SandboxType
  sandbox: Sandbox
}

/* ------------------------------------------------------------------ */
/* Salary / effort estimator                                           */
/* ------------------------------------------------------------------ */

export type TargetLevel = 'Junior' | 'Intermediate' | 'Senior'

export interface SalaryBand {
  minLpa: number
  maxLpa: number
}

/* ------------------------------------------------------------------ */
/* Courses / programs                                                  */
/* ------------------------------------------------------------------ */

export interface Course {
  id: string
  title: string
  tagline: string
  /** 'All levels' for the flagship program that spans the whole journey. */
  level: Difficulty | 'All levels'
  duration: string
  /** Delivery format, e.g. "Classroom · Online · Hybrid". */
  format: string
  /** Optional link to a roadmap track. */
  trackId?: TrackId
  /** What learners study. */
  highlights: string[]
  /** Career outcomes / roles unlocked. */
  outcomes: string[]
  certs: string[]
  featured?: boolean
  icon: string
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  name: string
  /** Role + company or batch, e.g. "SOC Analyst · FinSecure Bank". */
  role: string
  quote: string
  /** 1–5 star rating. */
  rating: number
  /** Avatar initials, e.g. "RK". */
  initials: string
}

export interface SalaryEstimateConfig {
  /** Per-track salary bands by target level (LPA). */
  salary: Record<TrackId, Record<TargetLevel, SalaryBand>>
  /**
   * Baseline total study hours typically needed to reach each level, by track.
   * The estimator divides this by the learner's weekly hours to get months.
   */
  baselineHours: Record<TrackId, Record<TargetLevel, number>>
  disclaimer: string
}

/* ------------------------------------------------------------------ */
/* Curriculum — self-paced, pause/resume, NICE-aligned, work-integrated */
/* ------------------------------------------------------------------ */
/**
 * Design references (verified during research, see docs/curriculum/README.md):
 *  - NIST NICE Framework (SP 800-181r1): Task→Knowledge→Skill blocks bundled
 *    into employer-driven Competencies, each with an assessment method.
 *  - Micro-learning: theory lessons target 7–15 min (replace one 50-min unit
 *    with 2–3 short lessons) to lift completion.
 *  - HTB Academy: Path → Module → Section, theory ("Article") and interactive
 *    sections interleaved, per-section progress — mirrored below.
 *  - ISC2 2025: internships/apprenticeships have the highest recommendation
 *    rate (69%) → every course carries an embedded WorkExperiencePhase.
 *  - Soft skills rank highest for entry hires → reflection/write-up blocks.
 */

/** A retrieval-practice question rendered inline inside a lesson (low-stakes). */
export interface InlineQuestion {
  prompt: string
  options: { id: string; label: string }[]
  /** Ids of the correct option(s). */
  correct: string[]
  multiple?: boolean
  /** Always shown after answering — feedback is a core anti-dropout lever. */
  explanation: string
}

/** The atomic content units that make up a lesson. */
export type LessonBlockType =
  | 'concept' // teaching text (markdown)
  | 'video' // micro-video, 7–15 min
  | 'callout' // tip / warning / key idea / industry note / India note
  | 'example' // worked example or walkthrough
  | 'lab' // hands-on; links a Lab id from src/data/labs.ts
  | 'check' // inline retrieval-practice question (spaced practice)
  | 'reflection' // soft-skill prompt: write-up, report, peer exercise
  | 'resource' // cited external reading

export interface LessonBlock {
  id: string
  type: LessonBlockType
  title?: string
  /** Markdown body for text-bearing blocks (concept/example/reflection/callout). */
  body?: string
  /** For type 'lab' — the Lab id this block embeds. */
  labId?: string
  /** For type 'check' — the inline question. */
  question?: InlineQuestion
  /** For type 'video' / time-bearing blocks. */
  estimatedMinutes?: number
  /** For type 'callout'. */
  variant?: 'tip' | 'warning' | 'key' | 'industry' | 'india'
  /** For type 'resource' — external source URL + label. */
  href?: string
}

/** HTB-style distinction: reading ("Article") vs hands-on vs assessed. */
export type LessonKind = 'theory' | 'interactive' | 'assessment' | 'project'

export interface Lesson {
  id: string
  title: string
  kind: LessonKind
  /** Micro-learning target: 7–15 for theory; longer for labs/projects. */
  estimatedMinutes: number
  summary: string
  /** Learner-facing "by the end you can…" objectives. */
  objectives: string[]
  /**
   * Authored content. May be empty for courses defined at structural depth
   * (metadata only) — the flagship course is fleshed to full block depth.
   */
  blocks: LessonBlock[]
  /** Labs referenced by this lesson (mirrors any 'lab' blocks for quick filtering). */
  labIds?: string[]
}

/** NICE alignment metadata attached to a module. */
export interface NiceAlignment {
  /** NICE Competency names this module builds toward. */
  competencies?: string[]
  /** NICE Work Roles this module supports. */
  workRoles?: string[]
}

export interface ModuleAssessment {
  id: string
  title: string
  type: 'quiz' | 'lab-challenge' | 'project' | 'peer-review'
  description: string
  /** Mastery gate, 0–1 (e.g. 0.8 = 80%). Undefined = not gated. */
  passThreshold?: number
  estimatedMinutes: number
}

export interface Module {
  id: string
  title: string
  tagline: string
  /** Ties the module to the 4-stage roadmap (src/data/stages.ts). */
  stage: StageId
  estimatedHours: number
  summary: string
  objectives: string[]
  nice?: NiceAlignment
  /** Module ids or named prerequisites that should be done first. */
  prerequisites: string[]
  lessons: Lesson[]
  assessment: ModuleAssessment
  /** If true, the assessment must be passed to unlock the next module. */
  masteryRequired: boolean
}

/** Open-Badges-style micro-credential earned within a course. */
export interface Badge {
  id: string
  title: string
  description: string
  /** What earns the badge (the assertion criteria). */
  criteria: string
  icon: string
}

/**
 * The embedded work-experience phase — Cyber Vidya's differentiator.
 * Modeled on apprenticeship / practicum designs that produce day-one-ready hires.
 */
export interface WorkExperiencePhase {
  id: string
  title: string
  /** e.g. 'Simulated SOC shift', 'Live-fire range', 'Client micro-project'. */
  format: string
  durationWeeks: number
  summary: string
  /** What the learner actually does. */
  activities: string[]
  /** Tangible artifacts that prove work-readiness (portfolio pieces). */
  deliverables: string[]
  /** Supervision / mentorship model. */
  mentorship: string
  /** Competencies assessed during the phase (NICE competency names). */
  competencies: string[]
  /** Soft skills deliberately developed (communication, teamwork, …). */
  softSkills: string[]
}

export interface CourseCurriculum {
  /** Matches a Course.id in src/data/courses.ts. */
  courseId: string
  title: string
  format: string
  totalEstimatedHours: number
  /** Recommended pace, e.g. "6–8 hrs/week". */
  weeklyCommitment: string
  /** The single primary role this path targets. */
  outcomeRole: string
  /** The single capstone certification this path anchors to. */
  capstoneCert: string
  /** NICE Work Roles the whole course maps to. */
  niceWorkRoles: string[]
  modules: Module[]
  /** Embedded apprenticeship / practicum (present on every course). */
  workExperience: WorkExperiencePhase
  badges: Badge[]
  /** Final capstone project, completed after all modules + work experience. */
  capstone: ModuleAssessment
}

/* ------------------------------------------------------------------ */
/* Progress — pause/resume persistence (front-end shape; mirrors backend) */
/* ------------------------------------------------------------------ */

export type ProgressStatus = 'not-started' | 'in-progress' | 'completed'

export interface LessonProgress {
  lessonId: string
  status: ProgressStatus
  /** Resume point: the last block the learner saw. */
  lastBlockId?: string
  secondsSpent?: number
  completedAt?: string
}

export interface ModuleProgress {
  moduleId: string
  status: ProgressStatus
  /** Latest assessment score, 0–1. */
  assessmentScore?: number
  masteryMet: boolean
}

/** A student's run through one course. The unit the portal loads on sign-in. */
export interface Enrollment {
  studentId: string
  courseId: string
  startedAt: string
  lastActiveAt: string
  /** Where "Resume" drops the learner back in. */
  currentModuleId?: string
  currentLessonId?: string
  lessons: Record<string, LessonProgress>
  modules: Record<string, ModuleProgress>
  earnedBadgeIds: string[]
  workExperienceStatus: ProgressStatus
}
