import type { CourseCurriculum } from '../../types'

/**
 * SPECIALIST COURSE — Application Security (course id: appsec).
 *
 * Intermediate, pentest-track deep dive into finding and fixing flaws in web
 * apps and APIs: the OWASP Top 10 in depth, secure coding & code review, web/API
 * vulnerability assessment, and hands-on exploitation — anchored by professional
 * vulnerability reporting, the skill that makes an AppSec analyst employable on
 * day one. Application Security is one of the top-3 cybersecurity skills gaps in
 * 2025, so the market for these graduates is wide open.
 *
 * Authored at STRUCTURAL depth: every module/lesson carries complete metadata
 * (title, kind, minutes, objectives, summary). The most important lessons are
 * fleshed to full block depth (concept/lab/check/reflection); the rest keep
 * `blocks: []` ready to be filled in the same shape as the flagship.
 *
 * Pedagogy mirrors the flagship (see docs/curriculum/README.md):
 *  - Micro-learning: theory lessons are 7–15 min.
 *  - Every module interleaves theory → worked example → lab → retrieval check.
 *  - Mastery gating: pass the module assessment (≥80%) to unlock the next.
 *  - Soft skills via report-writing and peer code-review reflection blocks.
 *  - NICE Work Role + Competency mapping on every module.
 */
export const appsecCurriculum: CourseCurriculum = {
  courseId: 'appsec',
  title: 'Application Security',
  format: 'Self-paced + cohort mentorship',
  totalEstimatedHours: 130,
  weeklyCommitment: '12–16 hrs/week (≈8–10 weeks)',
  outcomeRole: 'Application Security Analyst / AppSec Engineer',
  capstoneCert: 'eLearnSecurity Web App Pentester (eWPT) → Burp Suite Certified Practitioner',
  niceWorkRoles: [
    'Secure Software Assessor',
    'Vulnerability Assessment Analyst',
    'Software Developer (Secure)',
  ],

  modules: [
    /* ============================================================== */
    /* STAGE 2 · APPSEC FUNDAMENTALS                                   */
    /* ============================================================== */

    /* -------- M1: Web & HTTP for Attackers (FULLY FLESHED) -------- */
    {
      id: 'appsec-m1',
      title: 'Web & HTTP for Attackers',
      tagline: 'You attack what you understand — start with the request.',
      stage: 2,
      estimatedHours: 16,
      summary:
        'The protocol layer every web attack rides on: HTTP requests/responses, methods, headers, status codes, cookies and sessions, the same-origin policy, and the trust boundary between client and server. You will read and tamper with real requests from lesson one.',
      objectives: [
        'Dissect an HTTP request/response into method, path, headers, body and status code',
        'Explain how cookies and sessions carry state across stateless HTTP',
        'Describe the same-origin policy and the client/server trust boundary',
        'Tamper with a client-controlled parameter and explain why the server must never trust it',
      ],
      nice: {
        competencies: ['Web Application Security', 'Network Fundamentals'],
        workRoles: ['Vulnerability Assessment Analyst', 'Secure Software Assessor'],
      },
      prerequisites: ['Comfort with the command line and basic networking (TCP/IP, DNS)'],
      masteryRequired: true,
      lessons: [
        {
          id: 'appsec-m1-l1',
          title: 'Anatomy of an HTTP Exchange',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'Methods, paths, headers, bodies and status codes — and the one trust boundary that the whole field hinges on.',
          objectives: [
            'Identify every part of a raw HTTP request and response',
            'Interpret status-code classes (2xx/3xx/4xx/5xx)',
            'State where the client/server trust boundary sits and why it matters',
          ],
          blocks: [
            {
              id: 'appsec-m1-l1-b1',
              type: 'concept',
              title: 'Request, response, repeat',
              body:
                'The web is a conversation of **requests** and **responses**. A request has a **method** (GET/POST/PUT/DELETE), a **path**, **headers** (metadata like `Cookie` and `Authorization`), and an optional **body**. The response leads with a **status code** — 2xx success, 3xx redirect, 4xx client error, 5xx server error — followed by its own headers and body.\n\nEverything an AppSec analyst does starts here: if you can read an exchange byte by byte, you can spot where an app trusts something it should have checked.',
            },
            {
              id: 'appsec-m1-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'The trust boundary is the whole game',
              body:
                'Everything the client sends — URL parameters, form fields, headers, cookies — is **fully under the attacker\'s control**. The server is the only place trust can live. Nearly every web vulnerability is, at heart, a server that believed something the client said. Burn this in: **never trust client input.**',
            },
            {
              id: 'appsec-m1-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'A server reads a `price` value from a URL query string and charges the user that amount without re-checking it against the catalog. What is the root cause of the resulting flaw?',
                options: [
                  { id: 'a', label: 'The response used the wrong status code' },
                  { id: 'b', label: 'The server trusted client-controlled input' },
                  { id: 'c', label: 'HTTP is unencrypted' },
                  { id: 'd', label: 'The cookie was not set' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'The price is client-controlled, so the attacker can set it to anything. Trust must live on the server: it should look up the real price, never accept it from the request.',
              },
            },
          ],
        },
        {
          id: 'appsec-m1-l2',
          title: 'Inspect a Live HTTP Request',
          kind: 'interactive',
          estimatedMinutes: 15,
          summary:
            'Read a captured request/response pair and decide exactly what the server is telling you.',
          objectives: [
            'Locate the method, headers and status code in a raw capture',
            'Interpret what a 401 response means for an attacker probing auth',
          ],
          blocks: [
            {
              id: 'appsec-m1-l2-b1',
              type: 'concept',
              title: 'Reading captures like an analyst',
              body:
                'Before you reach for a proxy, train your eye on raw text. The first response line carries the verdict; the headers carry the context (`WWW-Authenticate`, `Set-Cookie`, `Location`). An assessor reads a response backwards from its status code to reconstruct what the server decided and why.',
            },
            {
              id: 'appsec-m1-l2-b2',
              type: 'lab',
              title: 'Lab: Inspect a Fake HTTP Request',
              labId: 'http-inspect',
              body: 'Read the captured login request/response and decide what the server is telling you.',
            },
          ],
          labIds: ['http-inspect'],
        },
        {
          id: 'appsec-m1-l3',
          title: 'Cookies, Sessions & State',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'How a stateless protocol remembers who you are — and where that memory can be stolen or forged.',
          objectives: [
            'Explain how a session cookie ties requests to a logged-in user',
            'Name the cookie flags (HttpOnly, Secure, SameSite) that harden a session',
          ],
          blocks: [],
        },
        {
          id: 'appsec-m1-l4',
          title: 'Same-Origin Policy & the Browser Security Model',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'The rule that keeps one site from reading another — and the headers (CORS, CSP) that bend it.',
          objectives: [
            'Define an "origin" and state what the same-origin policy blocks',
            'Explain at a high level what CORS and CSP relax or restrict',
          ],
          blocks: [],
        },
        {
          id: 'appsec-m1-l5',
          title: 'Encoding on the Wire (Base64, URL, Hex)',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary:
            'Tokens and parameters are rarely plaintext — recognize the encoding, then decode it to see what an app really stores.',
          objectives: [
            'Recognize Base64, URL and hex encoding in requests and tokens',
            'Decode an encoded value and explain why encoding is not encryption',
          ],
          blocks: [
            {
              id: 'appsec-m1-l5-b1',
              type: 'callout',
              variant: 'warning',
              title: 'Encoding ≠ encryption',
              body:
                'Base64, URL-encoding and hex are **reversible by anyone** — no key needed. When you see a "scrambled" token in a request, decode it before assuming it is protected. Apps that hide secrets behind encoding are hiding nothing from you.',
            },
            {
              id: 'appsec-m1-l5-b2',
              type: 'lab',
              title: 'Lab: Decode the Hidden String',
              labId: 'b64-decode',
              body: 'This captured token is just Base64. Decode it and recover the flag inside.',
            },
          ],
          labIds: ['b64-decode'],
        },
      ],
      assessment: {
        id: 'appsec-m1-assessment',
        title: 'HTTP & Trust-Boundary Check',
        type: 'lab-challenge',
        description:
          'Given a small set of captured requests/responses, identify the method, status meaning, the client-controlled inputs, and the one request that crosses a trust boundary. ≥80% unlocks Module 2.',
        passThreshold: 0.8,
        estimatedMinutes: 30,
      },
    },

    /* -------- M2: OWASP Top 10 In Depth (rich sample lesson) ------ */
    {
      id: 'appsec-m2',
      title: 'The OWASP Top 10, In Depth',
      tagline: 'The ten weaknesses behind most real-world web breaches.',
      stage: 2,
      estimatedHours: 24,
      summary:
        'A category-by-category tour of the OWASP Top 10 (2021): broken access control, injection, cryptographic failures, SSRF and the rest. For each, you learn how it arises, how an attacker probes it, what it impacts, and how it is fixed — the vocabulary every AppSec interview and report is written in.',
      objectives: [
        'Recognize and name each OWASP Top 10 category from a symptom or finding',
        'Explain the root cause and business impact of each category',
        'Map a real vulnerability to its correct OWASP category and CWE family',
        'Describe the canonical remediation for each category',
      ],
      nice: {
        competencies: ['Web Application Security', 'Vulnerability Assessment'],
        workRoles: ['Secure Software Assessor', 'Vulnerability Assessment Analyst'],
      },
      prerequisites: ['appsec-m1'],
      masteryRequired: true,
      lessons: [
        {
          id: 'appsec-m2-l1',
          title: 'Broken Access Control (A01)',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'The #1 category: IDOR, forced browsing and privilege escalation — when the app forgets to check who you are.',
          objectives: [
            'Define broken access control and recognize an IDOR',
            'Distinguish authentication from authorization in a finding',
          ],
          blocks: [
            {
              id: 'appsec-m2-l1-b1',
              type: 'concept',
              title: 'Access control is checked on every request',
              body:
                'Broken access control tops the OWASP Top 10 because it is so easy to get wrong: the app authenticates you once at login, then forgets to **authorize** each later action. **IDOR** (Insecure Direct Object Reference) is the classic case — changing `/invoice?id=1001` to `id=1002` and seeing someone else\'s invoice. The fix is server-side: every request must check that *this user* may touch *this object*.',
            },
            {
              id: 'appsec-m2-l1-b2',
              type: 'callout',
              variant: 'industry',
              title: 'Why this category dominates reports',
              body:
                'Access-control flaws are the most common and most impactful findings in real web assessments — they need no special payload, only an attacker who edits an id. When you write findings, expect A01 to fill the high-severity rows.',
            },
            {
              id: 'appsec-m2-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'A logged-in user changes the `account_id` in an API call and retrieves another customer\'s data. Which OWASP category and sub-class is this?',
                options: [
                  { id: 'a', label: 'Cryptographic Failures — weak encryption' },
                  { id: 'b', label: 'Broken Access Control — IDOR' },
                  { id: 'c', label: 'Injection — SQL injection' },
                  { id: 'd', label: 'Security Misconfiguration' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'The user is authenticated but accesses an object they are not authorized for by tampering with a direct reference (account_id). That is broken access control, specifically an IDOR.',
              },
            },
          ],
        },
        {
          id: 'appsec-m2-l2',
          title: 'Injection: SQL, Command & Beyond (A03)',
          kind: 'theory',
          estimatedMinutes: 15,
          summary:
            'When user input is mistaken for code: SQLi, OS command injection, and the parameterization that kills it.',
          objectives: [
            'Explain how injection arises when data is concatenated into a query/command',
            'State the canonical fix (parameterized queries / safe APIs)',
          ],
          blocks: [],
        },
        {
          id: 'appsec-m2-l3',
          title: 'Cross-Site Scripting & the Browser as a Weapon (A03)',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'Reflected, stored and DOM XSS — running attacker JavaScript in a victim\'s session, and the encoding/CSP that stops it.',
          objectives: [
            'Distinguish reflected, stored and DOM-based XSS',
            'Describe output encoding and CSP as defenses',
          ],
          blocks: [],
        },
        {
          id: 'appsec-m2-l4',
          title: 'Crypto, Misconfig, SSRF & the Rest',
          kind: 'theory',
          estimatedMinutes: 15,
          summary:
            'A rapid, structured pass through the remaining categories: cryptographic failures, security misconfiguration, vulnerable components, identification/auth failures, integrity failures, logging gaps and SSRF.',
          objectives: [
            'Recognize each remaining OWASP category from a symptom',
            'Pair each with its canonical remediation',
          ],
          blocks: [],
        },
        {
          id: 'appsec-m2-l5',
          title: 'Exploit a Client-Trust Flaw',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary:
            'Put A01 thinking into practice: tamper a trusted parameter to break an app that trusts the client too much, then describe the fix.',
          objectives: [
            'Exploit parameter tampering against a client-trusting endpoint',
            'Write the one-line root cause and remediation for the finding',
          ],
          blocks: [
            {
              id: 'appsec-m2-l5-b1',
              type: 'lab',
              title: 'Lab: Parameter Tampering Mini-CTF',
              labId: 'param-tamper',
              body: 'The price comes from the URL. Tamper it to unlock the flag — then write the fix in one sentence.',
            },
            {
              id: 'appsec-m2-l5-b2',
              type: 'reflection',
              title: 'Findings practice',
              body:
                'In three sentences, document the parameter-tampering flaw the way you would in a report: what you did, what the impact is, and the remediation. Lead with the impact a manager cares about (free or under-priced purchases). This is your first portfolio finding.',
            },
          ],
          labIds: ['param-tamper'],
        },
      ],
      assessment: {
        id: 'appsec-m2-assessment',
        title: 'OWASP Top 10 Mastery Quiz',
        type: 'quiz',
        description:
          'Match symptoms and findings to the correct OWASP category and remediation, plus two short written root-cause justifications. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 30,
      },
    },

    /* -------- M3: Secure Coding & Code Review (structural) -------- */
    {
      id: 'appsec-m3',
      title: 'Secure Coding & Code Review',
      tagline: 'Find the bug before the attacker does — in the source.',
      stage: 2,
      estimatedHours: 22,
      summary:
        'Shift left: read source the way an attacker would, recognize the dangerous patterns (string-built queries, missing authZ checks, unsafe deserialization, hard-coded secrets), and run a structured manual code review that produces actionable, kindly-worded findings.',
      objectives: [
        'Identify vulnerable patterns in source across common languages',
        'Run a structured secure code review with a repeatable checklist',
        'Interpret SAST tool output and triage false positives',
        'Write clear, respectful code-review feedback a developer will act on',
      ],
      nice: {
        competencies: ['Secure Software Development', 'Software Testing'],
        workRoles: ['Software Developer (Secure)', 'Secure Software Assessor'],
      },
      prerequisites: ['appsec-m2'],
      masteryRequired: true,
      lessons: [
        {
          id: 'appsec-m3-l1',
          title: 'Reading Source Like an Attacker',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'Trace untrusted input from entry point (source) to dangerous operation (sink).',
          objectives: ['Trace a source-to-sink dataflow', 'Spot a string-concatenated query'],
          blocks: [],
        },
        {
          id: 'appsec-m3-l2',
          title: 'The Secure Code Review Checklist',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'A repeatable pass: input validation, authN/authZ, crypto, secrets, error handling.',
          objectives: ['Apply a code-review checklist to a module', 'Prioritize findings by risk'],
          blocks: [],
        },
        {
          id: 'appsec-m3-l3',
          title: 'SAST: Automating the First Pass',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Run a static analyzer, read its output, and separate real findings from noise.',
          objectives: ['Interpret SAST results', 'Triage and dismiss a false positive with reasoning'],
          blocks: [],
        },
        {
          id: 'appsec-m3-l4',
          title: 'Peer Code Review as a Soft Skill',
          kind: 'project',
          estimatedMinutes: 30,
          summary:
            'Review a peer\'s snippet, write findings that teach rather than scold, then receive a review of your own.',
          objectives: [
            'Write actionable, respectful review comments',
            'Receive feedback without defensiveness',
          ],
          blocks: [
            {
              id: 'appsec-m3-l4-b1',
              type: 'reflection',
              title: 'Review someone, be reviewed',
              body:
                'Review a peer\'s 30-line snippet and leave three comments: each names the issue, explains the risk in one line, and suggests a fix — phrased so the author wants to act on it. Then read the review of your own code and reply to one comment. Communicating findings kindly and clearly is the difference between a report that gets fixed and one that gets ignored.',
            },
          ],
        },
      ],
      assessment: {
        id: 'appsec-m3-assessment',
        title: 'Code Review Exercise',
        type: 'peer-review',
        description:
          'Submit a written review of a provided vulnerable module (findings + remediations + severity), assessed by a mentor and one peer on accuracy and communication quality.',
        passThreshold: 0.8,
        estimatedMinutes: 45,
      },
    },

    /* ============================================================== */
    /* STAGE 3 · ADVANCED WEB & API EXPLOITATION                       */
    /* ============================================================== */

    /* -------- M4: Web Vulnerability Assessment with Burp ---------- */
    {
      id: 'appsec-m4',
      title: 'Web Vulnerability Assessment with Burp Suite',
      tagline: 'Drive a real assessment end-to-end with the industry-standard proxy.',
      stage: 3,
      estimatedHours: 26,
      summary:
        'The working AppSec toolkit: intercept and replay traffic with Burp Suite (Proxy, Repeater, Intruder), map an app\'s attack surface, and hunt and confirm the OWASP categories you studied — broken access control, injection and XSS — on a vulnerable-by-design target, ethically and in your lab.',
      objectives: [
        'Configure Burp Suite as an intercepting proxy and map an application',
        'Use Repeater and Intruder to manipulate and fuzz requests',
        'Discover and confirm IDOR, SQL injection and XSS on an authorized target',
        'Capture reproducible evidence (request/response, steps) for each finding',
      ],
      nice: {
        competencies: ['Vulnerability Assessment', 'Penetration Testing'],
        workRoles: ['Vulnerability Assessment Analyst', 'Secure Software Assessor'],
      },
      prerequisites: ['appsec-m3'],
      masteryRequired: true,
      lessons: [
        {
          id: 'appsec-m4-l1',
          title: 'Ethics, Scope & Rules of Engagement (Read First)',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'Authorization, scope and India\'s IT Act — the rules that keep assessment work legal.',
          objectives: ['State what makes a test legal', 'Define scope and rules of engagement'],
          blocks: [
            {
              id: 'appsec-m4-l1-b1',
              type: 'callout',
              variant: 'india',
              title: 'Authorization is non-negotiable',
              body:
                'Testing a system without written authorization is an offence under India\'s IT Act, 2000 (notably §43 and §66). Every technique in this module is for your own lab or a target you have explicit, scoped permission to test. No authorization, no test — full stop.',
            },
          ],
        },
        {
          id: 'appsec-m4-l2',
          title: 'Burp Suite: Proxy, Repeater, Intruder',
          kind: 'interactive',
          estimatedMinutes: 22,
          summary: 'Intercept, modify and replay requests; automate variations with Intruder.',
          objectives: ['Intercept and edit a live request', 'Fuzz a parameter with Intruder'],
          blocks: [],
        },
        {
          id: 'appsec-m4-l3',
          title: 'Mapping the Attack Surface',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Crawl, enumerate endpoints and parameters, and build a target model before attacking.',
          objectives: ['Enumerate endpoints and inputs', 'Prioritize where to test first'],
          blocks: [],
        },
        {
          id: 'appsec-m4-l4',
          title: 'Hunting Access Control & Injection',
          kind: 'interactive',
          estimatedMinutes: 24,
          summary: 'Confirm IDOR by swapping object ids, and prove SQL injection with a safe payload.',
          objectives: ['Confirm an IDOR', 'Demonstrate SQL injection and capture evidence'],
          blocks: [
            {
              id: 'appsec-m4-l4-b1',
              type: 'concept',
              title: 'Confirm, then capture',
              body:
                'Finding a flaw is half the job; **confirming it reproducibly** is the half that goes in the report. For every issue, save the exact request that triggers it, the response that proves it, and the minimal steps to reproduce. Evidence is what turns a hunch into an actionable, defensible finding.',
            },
          ],
        },
        {
          id: 'appsec-m4-l5',
          title: 'Hunting Cross-Site Scripting',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary: 'Find an injection point, prove script execution, and note the safe-by-default fix.',
          objectives: ['Confirm reflected/stored XSS', 'Record impact and remediation'],
          blocks: [],
        },
      ],
      assessment: {
        id: 'appsec-m4-assessment',
        title: 'Web Assessment Lab Challenge',
        type: 'lab-challenge',
        description:
          'On a provided vulnerable web app, discover and confirm at least three distinct OWASP findings using Burp, capturing reproducible evidence for each. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 90,
      },
    },

    /* -------- M5: API Security (structural) ----------------------- */
    {
      id: 'appsec-m5',
      title: 'API Security & the OWASP API Top 10',
      tagline: 'Modern apps are APIs — secure the endpoints behind the UI.',
      stage: 3,
      estimatedHours: 20,
      summary:
        'APIs carry today\'s traffic and today\'s breaches. Learn REST and GraphQL surfaces, token-based auth (JWT, OAuth at a working level), and the OWASP API Top 10 — especially BOLA/BFLA (object- and function-level authorization) — then test an API methodically.',
      objectives: [
        'Map a REST/GraphQL API\'s endpoints, methods and auth model',
        'Recognize the OWASP API Top 10, especially BOLA and BFLA',
        'Inspect and tamper with a JWT and explain common token weaknesses',
        'Run a structured API vulnerability assessment with reproducible evidence',
      ],
      nice: {
        competencies: ['Web Application Security', 'Vulnerability Assessment'],
        workRoles: ['Secure Software Assessor', 'Vulnerability Assessment Analyst'],
      },
      prerequisites: ['appsec-m4'],
      masteryRequired: true,
      lessons: [
        {
          id: 'appsec-m5-l1',
          title: 'How APIs Differ from Web Pages',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'REST vs GraphQL, JSON payloads, and why the UI is no longer the security boundary.',
          objectives: ['Describe REST/GraphQL surfaces', 'Explain why hidden UI ≠ protected endpoint'],
          blocks: [],
        },
        {
          id: 'appsec-m5-l2',
          title: 'The OWASP API Top 10: BOLA & BFLA',
          kind: 'theory',
          estimatedMinutes: 15,
          summary: 'Object- and function-level authorization failures — the API era\'s broken access control.',
          objectives: ['Define BOLA and BFLA', 'Recognize them from an API request'],
          blocks: [
            {
              id: 'appsec-m5-l2-b1',
              type: 'callout',
              variant: 'industry',
              title: 'BOLA is the new IDOR',
              body:
                'Broken Object Level Authorization (BOLA) is the most common and damaging API flaw — the same "swap the id, get someone else\'s data" problem as IDOR, now on JSON endpoints with no UI to hide behind. Test every object reference in every endpoint as a different user.',
            },
          ],
        },
        {
          id: 'appsec-m5-l3',
          title: 'Token Auth: JWT & OAuth Basics',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Decode a JWT, read its claims, and recognize common signing and validation mistakes.',
          objectives: ['Decode and read a JWT', 'Name common JWT/OAuth weaknesses'],
          blocks: [],
        },
        {
          id: 'appsec-m5-l4',
          title: 'Assessing an API End-to-End',
          kind: 'project',
          estimatedMinutes: 30,
          summary: 'Map, authenticate, fuzz and confirm authorization flaws on a sample API.',
          objectives: ['Run a structured API test', 'Capture evidence for each finding'],
          blocks: [],
        },
      ],
      assessment: {
        id: 'appsec-m5-assessment',
        title: 'API Assessment Lab Challenge',
        type: 'lab-challenge',
        description:
          'Test a provided API for BOLA/BFLA and a token weakness; confirm and document each finding with reproducible evidence. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 75,
      },
    },

    /* -------- M6: Professional Vulnerability Reporting ------------ */
    {
      id: 'appsec-m6',
      title: 'Professional Vulnerability Reporting',
      tagline: 'A finding nobody can act on is no finding at all.',
      stage: 3,
      estimatedHours: 14,
      summary:
        'The day-one skill that distinguishes a hireable AppSec analyst: turning raw findings into a clear, prioritized, professional report. Severity scoring with CVSS, reproducible steps, business-impact framing, remediation guidance, and a stakeholder readout.',
      objectives: [
        'Score a finding with CVSS and justify the rating',
        'Write a finding with reproducible steps, evidence, impact and remediation',
        'Structure a full assessment report (exec summary → findings → appendix)',
        'Present results to both a developer and a non-technical stakeholder',
      ],
      nice: {
        competencies: ['Security Reporting', 'Stakeholder Communication'],
        workRoles: ['Secure Software Assessor', 'Vulnerability Assessment Analyst'],
      },
      prerequisites: ['appsec-m5'],
      masteryRequired: true,
      lessons: [
        {
          id: 'appsec-m6-l1',
          title: 'Severity & CVSS Scoring',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'Score consistently with CVSS so severities mean the same thing to everyone.',
          objectives: ['Build a CVSS vector for a finding', 'Justify a severity rating'],
          blocks: [
            {
              id: 'appsec-m6-l1-b1',
              type: 'concept',
              title: 'Why scoring is a communication tool',
              body:
                'CVSS turns "this feels bad" into a defensible number a triage team can sort on. Score by **attack vector, complexity, privileges, user interaction** and the **impact** to confidentiality, integrity and availability. The number matters less than the consistency: when every finding is scored the same way, the business can trust your prioritization.',
            },
          ],
        },
        {
          id: 'appsec-m6-l2',
          title: 'Anatomy of a Great Finding',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'Title, severity, affected asset, reproducible steps, evidence, impact, remediation.',
          objectives: ['List the required parts of a finding', 'Write reproducible steps a dev can follow'],
          blocks: [
            {
              id: 'appsec-m6-l2-b1',
              type: 'callout',
              variant: 'key',
              title: 'Write for the person who has to fix it',
              body:
                'A finding exists to be remediated. Lead with impact in business terms, give steps precise enough to reproduce on the first try, attach the request/response as evidence, and end with a concrete fix — not "sanitize input" but *what* to sanitize and *how*. Empathy for the reader is what gets bugs closed.',
            },
          ],
        },
        {
          id: 'appsec-m6-l3',
          title: 'The Full Assessment Report',
          kind: 'project',
          estimatedMinutes: 35,
          summary: 'Assemble findings into a professional report with an executive summary and roadmap.',
          objectives: ['Structure a complete report', 'Write an exec summary a CISO can read in two minutes'],
          blocks: [
            {
              id: 'appsec-m6-l3-b1',
              type: 'reflection',
              title: 'Deliverable: your first report',
              body:
                'Take the findings from Modules 4 and 5 and assemble them into a real report: executive summary (one page, non-technical), a prioritized findings table, then each finding in full. This is the single most important portfolio artifact in the course — employers ask to see exactly this.',
            },
          ],
        },
        {
          id: 'appsec-m6-l4',
          title: 'Presenting to Stakeholders',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Tailor the same results for a developer and for a non-technical decision-maker.',
          objectives: ['Brief a developer on a fix', 'Summarize risk for a non-technical leader'],
          blocks: [],
        },
      ],
      assessment: {
        id: 'appsec-m6-assessment',
        title: 'Vulnerability Report Submission',
        type: 'project',
        description:
          'Submit a complete, professionally formatted assessment report (exec summary, CVSS-scored findings, evidence, remediation), peer- and mentor-reviewed on clarity, accuracy and actionability.',
        passThreshold: 0.8,
        estimatedMinutes: 90,
      },
    },
  ],

  /* ============================================================== */
  /* EMBEDDED WORK EXPERIENCE — the differentiator                   */
  /* ============================================================== */
  workExperience: {
    id: 'appsec-practicum',
    title: 'AppSec Practicum: Secure a Real Partner App',
    format: 'Supervised secure-code review + live web/API vulnerability assessment',
    durationWeeks: 4,
    summary:
      'An apprenticeship-style phase that turns a trained learner into a day-one-productive AppSec hire. Working under mentor supervision on a real, scoped partner application (an SME or NGO web/API), learners perform a secure code review, run a supervised vulnerability assessment, and deliver a professional findings report a client could act on — the exact workflow of a junior AppSec analyst.',
    activities: [
      'Scope the engagement and confirm written authorization and rules of engagement',
      'Perform a structured secure code review of part of a real partner codebase',
      'Run a supervised web and API vulnerability assessment with Burp Suite',
      'Confirm findings, capture reproducible evidence, and score them with CVSS',
      'Participate in peer code-review rounds and a mentor finding-validation review',
      'Present the results to a "client" panel (mentors role-playing stakeholders)',
    ],
    deliverables: [
      'A secure code-review write-up with prioritized findings',
      'One professional web/API vulnerability assessment report (exec summary + CVSS-scored findings + remediation)',
      'A reproducible evidence pack (requests/responses, steps) for each finding',
      'A recorded 5-minute stakeholder findings presentation',
      'A mentor-signed competency sign-off mapped to NICE work-role tasks',
    ],
    mentorship:
      'Each learner is paired with an industry-certified AppSec mentor for the duration; daily async check-ins, two live finding-validation reviews per week, and a final assessed debrief.',
    competencies: [
      'Web Application Security',
      'Vulnerability Assessment',
      'Secure Software Development',
      'Security Reporting',
      'Stakeholder Communication',
    ],
    softSkills: [
      'Professional written communication (vulnerability reports, review comments)',
      'Giving and receiving code-review feedback constructively',
      'Verbal communication & presenting findings to stakeholders',
      'Working ethically within scope and to deadlines',
    ],
  },

  /* ============================================================== */
  /* BADGES (Open-Badges-style micro-credentials)                    */
  /* ============================================================== */
  badges: [
    {
      id: 'appsec-badge-fundamentals',
      title: 'AppSec Fundamentals',
      description: 'Mastered HTTP, the client/server trust boundary, and the OWASP Top 10.',
      criteria: 'Pass the mastery checks for Modules 1–2.',
      icon: 'shield',
    },
    {
      id: 'appsec-badge-code-reviewer',
      title: 'Secure Code Reviewer',
      description: 'Demonstrated structured secure code review and constructive peer feedback.',
      criteria: 'Pass the Code Review Exercise (M3) at ≥80%.',
      icon: 'code',
    },
    {
      id: 'appsec-badge-web-hunter',
      title: 'Web & API Vulnerability Hunter',
      description: 'Discovered and confirmed real OWASP web and API findings with evidence.',
      criteria: 'Pass the Web (M4) and API (M5) assessment lab challenges.',
      icon: 'target',
    },
    {
      id: 'appsec-badge-reporter',
      title: 'Professional Reporter',
      description: 'Produced a clear, CVSS-scored, actionable vulnerability assessment report.',
      criteria: 'Score ≥80% on the Vulnerability Report Submission (M6).',
      icon: 'clipboard',
    },
    {
      id: 'appsec-badge-graduate',
      title: 'Application Security Analyst',
      description: 'Completed the full Application Security course, practicum and capstone.',
      criteria: 'Earn all module badges, complete the practicum, and pass the capstone.',
      icon: 'cert',
    },
  ],

  /* ============================================================== */
  /* CAPSTONE                                                         */
  /* ============================================================== */
  capstone: {
    id: 'appsec-capstone',
    title: 'AppSec Capstone: Full Application Penetration Test & Report',
    type: 'project',
    description:
      'A multi-day capstone: given a scoped, vulnerable-by-design web application with an API back end, the learner plans the engagement, maps the attack surface, discovers and confirms vulnerabilities across the OWASP web and API Top 10 (broken access control, injection, XSS, BOLA, token flaws), captures reproducible evidence, and delivers (1) a professional assessment report with CVSS-scored findings and remediation, and (2) a stakeholder presentation. Assessed by mentors against the NICE work-role competencies, added to the learner\'s portfolio, and aligned with eWPT / Burp Suite Certified Practitioner exam readiness.',
    passThreshold: 0.8,
    estimatedMinutes: 600,
  },
}
