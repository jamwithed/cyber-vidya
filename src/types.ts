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
  /** Indicative annual salary range in India, in lakhs per annum (LPA). */
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
  /** Roles + indicative India salary ranges unlocked here. */
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
  /** Indicative India salary band (LPA) across junior→senior. */
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
  /** Per-track salary bands by target level (India, LPA). */
  salary: Record<TrackId, Record<TargetLevel, SalaryBand>>
  /**
   * Baseline total study hours typically needed to reach each level, by track.
   * The estimator divides this by the learner's weekly hours to get months.
   */
  baselineHours: Record<TrackId, Record<TargetLevel, number>>
  disclaimer: string
}
