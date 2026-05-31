# Cyber Vidya — Cybersecurity Roadmap in India

An interactive, single-page web app that presents a cybersecurity career roadmap
for India with **salary estimates**, **difficulty levels**, a **track comparison**,
and **live, browser-based labs / mini-CTF challenges**. Built to the
**Cyber Vidya Brand Guide** (Orbitron headlines, Midnight Blue / Cerulean /
Electric Aqua palette, gradient logo).

## ✨ Features

- **Roadmap timeline** — 4 clickable stages (Foundation → Core Security →
  Specializations → Architect/Leadership) with topics, durations, target certs and
  indicative India salary bands.
- **Track comparison** — SOC/Blue, Pentest/Red, Cloud Security, GRC/Risk compared by
  entry complexity, math/programming intensity, time-to-job and salary. Expand any row
  for a mini-course outline and one-click links to relevant labs.
- **Labs + mini-CTF playground** — filter by stage/track, open a lab, read the brief,
  and solve a challenge entirely client-side:
  - `flagInput` — find/decode/tamper to recover a `flag{...}`
  - `multipleChoice` — analyze a request / config / audit finding
  - `ipSelection` — spot the malicious IP or exfiltration row
  - Immediate success/failure feedback, progressive hints, and a confetti burst on solve.
- **Salary & learning-effort estimator** — choose a track, target level and weekly
  hours to get an estimated time-to-job-ready and salary band.
- **Courses page** (`#/courses`) — full program catalog with levels, durations, formats,
  learning outcomes and aligned certifications; flagship program highlighted.
- **About** (`#/about`) and **Contact** (`#/contact`) pages, plus a **Testimonials**
  section — all driven by `src/data/site.ts`, `courses.ts` and `testimonials.ts`.

> ⚠️ The testimonials in `src/data/testimonials.ts` are **sample/demo content** —
> replace them with real, consented learner reviews before going live.

> All salary/time figures and lab definitions live in `src/data/*` and are
> **data-driven** — edit them without touching components.

## 🧱 Tech stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** (brand tokens configured in `tailwind.config.js`)
- No backend, no heavy dependencies — everything runs in the browser.

## 🗂 Project structure

```
src/
├─ types.ts              # Stage, Track, Lab (+ Sandbox union), SalaryEstimateConfig
├─ data/
│  ├─ stages.ts          # 4 roadmap stages
│  ├─ tracks.ts          # 4 comparison tracks
│  ├─ labs.ts            # 8 labs incl. flag/answer + sandbox definitions
│  ├─ salary.ts          # estimator salary bands + effort baselines
│  ├─ site.ts            # company info, contact details, selling points
│  ├─ courses.ts         # course/program catalog
│  └─ testimonials.ts    # learner testimonials (SAMPLE — replace)
├─ hooks/useRoute.ts     # tiny dependency-free hash router
├─ pages/                # Home.tsx · About.tsx · Contact.tsx · Courses.tsx
├─ components/
│  ├─ Logo.tsx           # inline-SVG brand logo
│  ├─ Navbar.tsx · Hero.tsx · Roadmap.tsx · TrackComparison.tsx
│  ├─ Labs.tsx · LabCard.tsx · LabSandbox.tsx · Estimator.tsx
│  ├─ Testimonials.tsx · Footer.tsx
│  └─ ui/ Badge.tsx · Confetti.tsx
├─ App.tsx · main.tsx · index.css
```

## 🚀 Run locally

```bash
npm install
npm run dev
```

Open the printed URL (default http://localhost:5173).

## 📦 Build for production

```bash
npm run build      # type-checks then builds to /dist
npm run preview    # preview the production build locally
```

## ☁️ Deploy (Vercel — simplest path)

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Vite — **Build:** `npm run build`, **Output:** `dist`. Deploy.

> Netlify works identically (Build `npm run build`, Publish directory `dist`), as does
> any static host (Cloudflare Pages, GitHub Pages) since the output is fully static.

## ✏️ Editing content

- **Add a lab:** append a `Lab` object to `src/data/labs.ts` (give it a `sandbox` of one
  of the three types) and reference its `id` in the relevant track's `labIds`.
- **Change salaries/timelines:** edit `src/data/stages.ts`, `tracks.ts`, or `salary.ts`.

---

*Educational project. Salary ranges and timelines are approximate and vary by city,
company and experience.*
