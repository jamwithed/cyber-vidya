# Cyber Vidya — Curriculum Design Blueprint

> A self-paced, job-ready, work-integrated cybersecurity curriculum, anchored to
> the NIST NICE Framework and evidence-based learning science, designed to plug
> directly into the Cyber Vidya student portal and backend.

This document is the design rationale. The machine-readable curriculum lives in
[`src/data/curriculum/`](../../src/data/curriculum/) and its types in
[`src/types.ts`](../../src/types.ts) (the *Curriculum* section).

---

## 1. What this delivers

Cyber Vidya's site already defines a **4-stage roadmap**, **4 career tracks**, **8
courses**, and **9 interactive labs**. What it lacked — and what this work adds — is
the layer underneath each course: **modules → lessons → content blocks →
assessments → progress tracking → an embedded work-experience phase → badges**,
designed so a student can **study at their own time, pause, and resume**, stay
engaged, and finish **work-ready**.

| Layer | Where it lives |
|---|---|
| Domain model (types) | `src/types.ts` → *Curriculum* + *Progress* sections |
| Flagship course (full depth) | `src/data/curriculum/career-program.ts` |
| 7 specialist courses (structural) | `src/data/curriculum/*.ts` |
| Catalog + helpers | `src/data/curriculum/index.ts` |
| This blueprint | `docs/curriculum/README.md` |
| Progress persistence (proposed) | §6 below — Prisma models for the backend |

---

## 2. Research foundation (what the design is built on)

These findings were multi-source verified (fan-out search → fetch → 3-vote
adversarial verification). Confidence and primary sources are noted.

1. **Anchor to NIST NICE.** The NICE Workforce Framework (SP 800-181r1)
   "establishes a common language that describes cybersecurity work and the
   knowledge and skills needed," and is explicitly designed to *support
   curriculum development with hands-on learning and apprenticeships*. Its
   building blocks are **Task → Knowledge → Skill (TKS)** statements bundled into
   **Work Roles** and **Competencies** — each Competency has a name, description,
   and an **assessment method**. *(High confidence. NIST primary source.)*
2. **Work-integrated learning is the differentiator.** ISC2's 2025 Workforce
   Study found internships/apprenticeships are used by only **3%** of the
   workforce as an entry path, yet carry the **highest recommendation rate
   (69%)** of any method — ahead of certifications (67%). *(High confidence.)*
3. **Soft skills rank highest for entry hires.** The top five entry-level skills
   employers seek are all *non-technical*: problem-solving (29%), teamwork (24%),
   communication (22%), willingness to learn (20%), strategic thinking (16%).
   *(High confidence.)*
4. **Market gaps favor Cloud & GRC; AI/ML is the #1 gap.** 2025 skills gaps:
   AI/ML 41%, **Cloud Security 36%**, Risk Assessment 29%, AppSec 28%, Security
   Engineering 27%, **GRC 27%**. The market shifted from a *headcount* gap to a
   *skills* deficiency. *(High confidence.)*
5. **Self-paced courses structurally over-drop out** — low entry/exit barriers
   make attrition much higher than in-person. Of twelve candidate dropout
   factors, six dominate and are within our control: **course design, feedback,
   social presence, social support**, plus scaffolding for academic skills and
   prior experience. *(High confidence.)*
6. **Micro-learning works.** Replacing one ~50-minute unit with **2–3 lessons of
   7–15 minutes** measurably raised completion in real university trials. *(High
   confidence.)*
7. **HTB Academy's structure is directly transferable.** Path → Module → Section,
   with theory ("Article", reading-only) and interactive (hands-on) sections
   **interleaved** in a table of contents, tracked per-section, organized into
   **job-role paths each tied to one certification**. *(High confidence.)*
8. **Gamification is a *motivation* lever, not a skill-builder.** Effect sizes are
   contested across meta-analyses. Use points/badges/streaks for engagement, but
   never assume they make a learner more competent on their own. *(Medium
   confidence — use with restraint.)*

> **Deliberately NOT used** (refuted during verification): the "22% retention /
> 17% transfer" micro-learning stats, "~5% MOOC completion," gamification framed
> as a competence-builder, and "email nudges don't work." We avoid quoting these.

---

## 3. The learning model (data architecture)

A five-level hierarchy that mirrors HTB Academy and maps onto the existing
roadmap:

```
Track (existing)         SOC · Pentest · Cloud · GRC
  └─ Course (existing)   one CourseCurriculum, anchored to ONE role + ONE cert
       └─ Module         a coherent subject, tied to a roadmap Stage, mastery-gated
            └─ Lesson    micro-learning unit (theory | interactive | assessment | project)
                 └─ Block  concept · video · callout · example · lab · check · reflection · resource
```

Key shape decisions (see `src/types.ts`):

- **`Lesson.kind`** distinguishes reading from hands-on (HTB's Article vs
  interactive), so the portal can render and sequence them differently.
- **`LessonBlock`** is the atomic content unit. `check` blocks are inline
  retrieval-practice questions; `reflection` blocks are the soft-skill /
  write-up prompts; `lab` blocks embed an existing Lab id from
  `src/data/labs.ts`. This keeps theory, practice, and recall **interleaved**.
- **`Module.stage`** ties every module back to the 4-stage roadmap, so progress
  visibly advances a learner along the path the site already markets.
- **`Module.nice`** records the NICE Competencies and Work Roles the module
  builds — the spine of "job-ready," and the basis for assessment design.
- **`Module.masteryRequired` + `ModuleAssessment.passThreshold`** implement
  **mastery-based progression**: you unlock the next module by demonstrating the
  current one (default gate **0.8**).

---

## 4. Pedagogy & engagement design (how it holds attention and builds skill)

Every course is built from the same research-backed rhythm:

| Principle | How it's implemented |
|---|---|
| **Micro-learning** | Theory lessons target **7–15 min**; one big topic becomes 2–3 short lessons. |
| **Interleaving** | Each module sequences *concept → worked example → lab → retrieval check*, not a wall of theory then a wall of labs. |
| **Retrieval practice** | Low-stakes `check` blocks inside lessons; spacing the same idea across lessons. Every check shows an **explanation** (feedback is a top anti-dropout lever). |
| **Mastery gating** | `passThreshold: 0.8` on module assessments; you prove a module before the next unlocks. Reduces the "lost and behind" dropout spiral. |
| **Hands-on from lesson one** | Labs are embedded *inside* lessons via `lab` blocks, not bolted on at the end. |
| **Soft skills as first-class** | `reflection` blocks require incident notes, report-writing, "explain it back," and peer review — the skills employers rank #1. |
| **Gamification (light touch)** | Badges and visible progress for motivation only (see research caveat #8). Skill is proven by assessments and the practicum, never by points. |
| **Engineering against dropout** | The six controllable factors are addressed directly: *course design* (chunking, clear objectives), *feedback* (explanations + mentor reviews), *social presence/support* (cohort mentorship, the practicum), and *scaffolding* (foundation modules + prerequisites). |

**Lesson template** (the repeatable unit authors fill):

1. `concept` — the idea, in plain language (≤ ~250 words).
2. `example` — a worked walkthrough.
3. `lab` *or* `check` — apply it, then recall it.
4. `reflection` — write/communicate it (soft skill).

---

## 5. Self-paced study: pause & resume

Self-paced is not just "no schedule" — it requires the system to **remember
exactly where each learner was** and let them resume instantly. That's the
`Enrollment` + `LessonProgress` + `ModuleProgress` model in `src/types.ts`:

- `Enrollment.currentModuleId` / `currentLessonId` — the **"Resume" target**.
- `LessonProgress.lastBlockId` — resume *within* a lesson (scroll/block-level).
- `LessonProgress.secondsSpent`, `status` — progress bar + analytics.
- `ModuleProgress.assessmentScore`, `masteryMet` — gating + transcript.
- `earnedBadgeIds`, `workExperienceStatus` — milestones.

The portal computes "X% complete, next up: <lesson>" from
`lessonCount()` / `nextUnlockedModule()` in `src/data/curriculum/index.ts`.

---

## 6. Backend: progress persistence (proposed Prisma models)

The current schema (`backend/prisma/schema.prisma`) has `Admin`, `Student`,
`ContactMessage` — no learning state. To support pause/resume and mastery
gating, add these models (kept normalized; lesson/module *content* stays in the
TypeScript catalog, only *progress* is persisted):

```prisma
/// A student's run through one course.
model Enrollment {
  id           String   @id @default(cuid())
  studentId    String
  courseId     String                 // matches Course.id in the catalog
  status       String   @default("active") // active | completed | paused
  currentModuleId String?
  currentLessonId String?
  workExpStatus   String  @default("not-started")
  startedAt    DateTime @default(now())
  lastActiveAt DateTime @updatedAt

  student        Student          @relation(fields: [studentId], references: [id])
  lessonProgress LessonProgress[]
  moduleProgress ModuleProgress[]
  earnedBadges   EarnedBadge[]

  @@unique([studentId, courseId])
  @@index([studentId])
}

model LessonProgress {
  id           String   @id @default(cuid())
  enrollmentId String
  lessonId     String                 // matches Lesson.id in the catalog
  status       String   @default("not-started") // not-started | in-progress | completed
  lastBlockId  String?                // resume point within the lesson
  secondsSpent Int      @default(0)
  completedAt  DateTime?

  enrollment Enrollment @relation(fields: [enrollmentId], references: [id], onDelete: Cascade)

  @@unique([enrollmentId, lessonId])
  @@index([enrollmentId])
}

model ModuleProgress {
  id              String   @id @default(cuid())
  enrollmentId    String
  moduleId        String               // matches Module.id in the catalog
  status          String   @default("not-started")
  assessmentScore Float?               // 0–1
  masteryMet      Boolean  @default(false)
  completedAt     DateTime?

  enrollment Enrollment @relation(fields: [enrollmentId], references: [id], onDelete: Cascade)

  @@unique([enrollmentId, moduleId])
  @@index([enrollmentId])
}

model EarnedBadge {
  id           String   @id @default(cuid())
  enrollmentId String
  badgeId      String               // matches Badge.id in the catalog
  earnedAt     DateTime @default(now())

  enrollment Enrollment @relation(fields: [enrollmentId], references: [id], onDelete: Cascade)

  @@unique([enrollmentId, badgeId])
}
```

> Add a back-relation `enrollments Enrollment[]` to the existing `Student` model,
> run `prisma migrate`, then expose endpoints like
> `GET /api/students/me/enrollment`, `POST /api/progress/lesson`,
> `POST /api/progress/assessment`. Content (catalog) ships with the frontend;
> only progress hits the DB — minimal, cheap, and offline-cache-friendly.

**Standards note:** for portability/interop, the progress model aligns with
**xAPI/cmi5** concepts (a learner "experienced/completed" an activity) and the
badges align with **Open Badges** (an assertion with criteria) — useful if Cyber
Vidya later issues verifiable credentials.

---

## 7. NICE alignment (the spine of "job-ready")

Each course anchors to **one primary Work Role and one capstone certification**
(HTB's one-path-one-cert pattern). Each module declares the NICE **Competencies**
and **Work Roles** it builds. This gives:

- **Learners** a clear line from lesson → competency → role → job.
- **Mentors/employers** a competency checklist to sign off (used in the
  practicum's "mentor-signed competency sign-off").
- **Assessment design** that follows NICE: a Competency *has* an assessment
  method, so module assessments test the competency, not just recall.

| Course | Primary Work Role | Capstone cert |
|---|---|---|
| Career-Oriented Program | Cyber Defense Analyst | Security+ (CC en route) |
| SOC Analyst / Blue Team | Cyber Defense Analyst / Incident Responder | Security+ → GCIH |
| Application Security | Secure Software Assessor | eWPT → BSCP |
| Infrastructure & Network | Network Operations / Sysadmin | Network+ → Security+ |
| Offensive & Red Teaming | Penetration Tester | OSCP (+ CRTP) |
| Cloud Security | Security Architect (Cloud) | AWS Security → CCSP |
| GRC / Risk & Compliance | Security Control Assessor | CISA → ISO 27001 LI |
| AI & Machine Learning | AI/ML Security Specialist | Vendor AI/ML cert |

---

## 8. The embedded work-experience model (the differentiator)

Every course carries a `WorkExperiencePhase` — an apprenticeship-style practicum
placed *after* the taught modules. This is the research-backed move (finding #2):
work-integrated learning has the highest recommendation rate of any entry path.

**The pattern (per course):**

1. **Simulated practice first** — a safe, realistic environment (simulated SOC
   shifts, a live-fire range, a sandbox app/cloud/network). Learners work
   *tickets*, not exercises, against SLAs.
2. **Supervised real work next** — a scoped, low-risk contribution to a *real*
   engagement (a partner SME/NGO assessment, a code review, a risk review),
   under a paired industry-certified mentor.
3. **Tangible deliverables** — every practicum outputs **portfolio artifacts** an
   employer can verify: incident notes, a findings/assessment report, a recorded
   presentation, and a **mentor-signed competency sign-off mapped to NICE tasks**.
4. **Professional rhythm** — stand-ups, a retro, and a stakeholder presentation
   build the teamwork and communication skills employers rank #1.

This is what makes a graduate **"ready for you to give them work experience as
part of their curriculum"**: by the time they finish, they have already *done*
the work, produced the artifacts, and been signed off against the role's
competencies.

---

## 9. Badging & credentialing

Each course defines `badges[]` (Open-Badges-style: title, description, **criteria**,
icon) at three milestones: **stage completion**, **a signature skill** (e.g. "SOC
Triage Operator"), and **"Work-Ready"** on practicum completion, plus a final
**Graduate** badge. Badges are motivation + a shareable signal; the *proof* is the
assessment scores and the practicum sign-off behind each badge's criteria.

---

## 10. The full catalog (all 8 courses)

All courses follow the same shape; the flagship is fleshed to full lesson-content
depth as the template, the rest to structural depth (complete module/lesson
metadata + representative content blocks).

### 10.1 Career-Oriented Cybersecurity Program ⭐ *(flagship, full depth)*
Zero → job-ready across Stages 1–3, then practicum + capstone. ~320 hrs.
**M1** Digital Foundations · **M2** Networking Essentials · **M3** OS (Linux &
Windows) · **M4** Scripting & Automation · **M5** Security First Principles ·
**M6** Blue Team Basics (SOC/SIEM) · **M7** Offensive Basics · **M8** Governance,
Law & Compliance · **M9** Choose Your Specialization → **The Cyber Vidya
Practicum** (simulated SOC + client micro-project) → **Capstone** (end-to-end
defense case). Anchors to Security+.

### 10.2 SOC Analyst / Blue Team
~Stage 2→3, 10–12 wks. **M1** Inside the SOC · **M2** Log Analysis & SIEM
(Splunk/ELK/Sentinel) · **M3** Alert Triage with MITRE ATT&CK · **M4** Incident
Response Playbooks · **M5** Threat Intelligence · **M6** Threat Hunting. Practicum:
Blue Team simulated shifts + live-fire range. Labs: `log-flag`, `http-inspect`,
`brute-force`, `exfil-spot`. → Security+/GCIH.

### 10.3 Application Security
Stage 2→3, 8–10 wks. **M1** Web & HTTP for Attackers · **M2** OWASP Top 10 in
depth · **M3** Secure Coding & Code Review · **M4** Web VA with Burp · **M5** API
Security (API Top 10) · **M6** Professional Vulnerability Reporting. Practicum:
secure-code review + supervised web/API assessment of a partner app. Labs:
`http-inspect`, `b64-decode`, `param-tamper`. → eWPT/BSCP. *(AppSec = top-3 2025
gap.)*

### 10.4 Infrastructure & Network Security
Stage 1→2, 8–12 wks. **M1** Network Foundations · **M2** Perimeter Defense
(firewalls/segmentation/VPN) · **M3** System & Endpoint Hardening · **M4** IAM ·
**M5** Monitoring, Logging & Detection · **M6** Secure Operations & Network IR.
Practicum: harden + monitor a lab network, respond to an injected incident. Labs:
`http-inspect`, `brute-force`, `log-flag`. → Network+/Security+. *(Strong IT→security
bridge.)*

### 10.5 Offensive Security & Red Teaming
Stage 3, 12–16 wks, advanced. **M1** Ethics, Law & Rules of Engagement *(gating,
IT Act/DPDP)* · **M2** Recon & Enumeration · **M3** Web Exploitation · **M4**
Exploitation & PrivEsc · **M5** Active Directory Attacks (CRTP-aligned) · **M6**
Adversary Simulation & Red-Team Ops · **M7** Professional Reporting & Disclosure.
Practicum: supervised scoped pentest + full report. Labs: `param-tamper`,
`b64-decode`, `http-inspect`. → OSCP.

### 10.6 Cloud Security
Stage 2→3, 10–12 wks. **M1** Cloud Fundamentals & Shared Responsibility · **M2**
IAM & Least-Privilege · **M3** CSPM · **M4** IaC & Container Security · **M5**
Cloud Detection & Response. Practicum: IAM right-sizing + CSPM remediation + IaC
hardening PR + cloud incident runbook. Labs: `s3-misconfig`, `http-inspect`. →
AWS Security/CCSP. *(Cloud = #2 2025 gap, 36%.)*

### 10.7 GRC / Risk & Compliance
Stage 2→3, 8 wks. **M1** GRC Fundamentals · **M2** ISO 27001 & NIST CSF · **M3**
Risk Assessment & Treatment · **M4** Data-Protection Law (India DPDP + GDPR) ·
**M5** Audit, Control Mapping & Policy Writing · **M6** Operating & Communicating
a Program. Practicum: mini ISO 27001 engagement for a partner SME/NGO. Labs:
`grc-control`, `s3-misconfig` (as findings to govern). → CISA/ISO 27001 LI.
*(Communication-heavy; GRC = top-6 2025 gap, 27%.)*

### 10.8 AI & Machine Learning
Stage 2→3, 12 wks. **M1** Python for Data & ML · **M2** ML Foundations · **M3**
Core Algorithms & Model Building · **M4** Evaluation & Responsible AI · **M5** AI
in Cybersecurity (phishing classification, log-anomaly detection) · **M6** From
Notebook to Production. Practicum: build/evaluate a real security ML model. →
vendor AI/ML cert. *(AI/ML = **#1** 2025 gap, 41% — strategic growth bet.)*

---

## 11. Implementation roadmap (suggested next steps)

1. **Render the curriculum in the portal.** `Portal.tsx` currently shows course
   metadata only. Add a course-outline view (modules → lessons) and a lesson
   reader that walks `LessonBlock[]`, driven by `curriculumById`.
2. **Wire progress.** Add the Prisma models in §6, the endpoints, and persist
   `lastBlockId` / lesson status so "Resume" works across sessions/devices.
3. **Gate by mastery.** Lock modules until the prior `assessment.passThreshold`
   is met; surface badges on completion.
4. **Flesh remaining content.** The 7 specialist courses are structurally
   complete; fill their lessons' `blocks[]` using the flagship + §4 template.
5. **Stand up the practicum ops.** Mentor pairing, the simulated-SOC range, and
   partner SME/NGO pipeline for the supervised micro-projects.
6. **Consider an AI-security emphasis.** AI/ML is the #1 market gap and currently
   a standalone course — a future "AI for Security" cross-track unit is a strong
   differentiator.

---

## 12. Sources (verified, primary unless noted)

- NIST NICE Framework — Resource Center & **SP 800-181r1** (primary).
- **ISC2 2025 Cybersecurity Workforce Study** (primary) — demand, skills gaps,
  entry-path recommendation rates, soft-skill priorities.
- *Computers & Education* (2021), ScienceDirect — self-paced dropout (primary).
- Aldowah et al. (2020), *J. Computing in Higher Education* — MOOC dropout
  factors (DEMATEL) (primary).
- *AAOUJ* (Emerald) — micro-learning completion gains (primary).
- *Frontiers in Psychology* (2023) — gamification meta-analysis (primary; high
  heterogeneity — treat as motivation lever only).
- **Hack The Box Academy Help Center** — Paths/Modules/Sections structure
  (primary).
- 1EdTech (Open Badges), xAPI/cmi5 — credentialing/progress interop (primary).

> Time-sensitive: ISC2 figures are the 2025 snapshot and will be superseded by
> the 2026 study. Gaps in the evidence set: granular India salary/demand data and
> module-level structures for TryHackMe/INE/SANS/Google were not independently
> confirmed and should be validated before being quoted in marketing.
