import type { CourseCurriculum } from '../../types'

/**
 * SPECIALIST COURSE — "Offensive Security & Red Teaming" (course id: offensive-red).
 *
 * Advanced, pentest-track specialization. Takes a learner who already has the
 * foundations (networking, OS, scripting, OWASP basics) and forges a working
 * Penetration Tester / Red Team Operator: recon → exploitation → privilege
 * escalation → Active Directory attacks → full adversary simulation → and, above
 * all, the professional reporting that turns an attacker's notes into client value.
 *
 * Authored at STRUCTURAL depth, mirroring the flagship (src/data/curriculum/
 * career-program.ts): every module/lesson carries complete metadata; the highest-
 * leverage lessons (the non-negotiable ethics/law module, the parameter-tampering
 * lab, and the reporting module) are fleshed to full block depth.
 *
 * Pedagogy baked into the shape (see docs/curriculum/README.md):
 *  - Micro-learning: theory lessons are 7–15 min; hands-on labs/projects run longer.
 *  - Every module interleaves theory → worked example → lab → retrieval check.
 *  - Mastery gating: pass the module assessment (≥80%) to unlock the next.
 *  - Reporting & responsible disclosure are weighted heavily — the skill that makes
 *    a pentester employable — and reinforced through reflection/write-up blocks.
 *  - NICE Work Role + Competency mapping on every module.
 *  - All offensive work is gated behind an explicit ethics/law/authorization module.
 *
 * Stage is 3 throughout: this is advanced specialization, not the foundation arc.
 */
export const offensiveRedCurriculum: CourseCurriculum = {
  courseId: 'offensive-red',
  title: 'Offensive Security & Red Teaming',
  format: 'Online · Hybrid (cohort + supervised range time)',
  totalEstimatedHours: 168,
  weeklyCommitment: '10–14 hrs/week (≈12–16 weeks)',
  outcomeRole: 'Penetration Tester / Red Team Operator',
  capstoneCert: 'OSCP (plus CRTP for Active Directory)',
  niceWorkRoles: [
    'Penetration Tester',
    'Exploitation Analyst',
    'Vulnerability Assessment Analyst',
  ],

  modules: [
    /* ============================================================== */
    /* STAGE 3 · OFFENSIVE SPECIALIZATION                              */
    /* ============================================================== */

    /* -------- M1: Ethics, Law & Rules of Engagement (FLESHED) ----- */
    {
      id: 'red-m1',
      title: 'Ethics, Law & Rules of Engagement (Read This First)',
      tagline: 'Authorization is the only thing separating a pentester from a criminal.',
      stage: 3,
      estimatedHours: 12,
      summary:
        'Before a single packet leaves your machine: what makes offensive work legal, how scope and rules of engagement (RoE) are written and enforced, India’s IT Act, and the professional discipline of responsible disclosure. Nothing else in this course is unlocked until this is passed.',
      objectives: [
        'State precisely what makes a penetration test legal (written, scoped authorization)',
        'Read and write a scope statement and rules of engagement (RoE)',
        'Summarize the relevant offences and defences under India’s IT Act, 2000',
        'Apply a responsible-disclosure process when you find a vulnerability',
      ],
      nice: {
        competencies: ['Legal, Government and Jurisprudence', 'Information Systems / Network Security'],
        workRoles: ['Penetration Tester', 'Vulnerability Assessment Analyst'],
      },
      prerequisites: ['Offensive Basics (OWASP Top 10, recon) — e.g. career-program M7'],
      masteryRequired: true,
      lessons: [
        {
          id: 'red-m1-l1',
          title: 'What Makes a Test Legal',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'The single rule that governs every action you take: explicit, written, scoped authorization from someone empowered to grant it.',
          objectives: [
            'Explain why authorization — not technique — is what makes a test legal',
            'Identify who can legitimately authorize a test on an asset',
            'Recognize when you are about to act outside scope',
          ],
          blocks: [
            {
              id: 'red-m1-l1-b1',
              type: 'concept',
              title: 'Identical actions, opposite outcomes',
              body:
                'A port scan, a credential-stuffing run, an exploit — the *technique* is legally neutral. What changes everything is **authorization**. The exact same command is a professional engagement when you have signed, scoped permission and a serious offence when you do not.\n\nA penetration test is only legal when you have **explicit, written authorization** to test **specifically defined assets**, granted by someone with the **authority to own the risk** of that testing. "I assumed it was fine" is not a defence.',
            },
            {
              id: 'red-m1-l1-b2',
              type: 'callout',
              variant: 'warning',
              title: 'The one habit that keeps you employed (and free)',
              body:
                'Before any action ask: **"Is this asset in scope, and do I have written permission to do this to it, right now?"** If you cannot answer yes to all three with a document in hand, stop. Out-of-scope curiosity has ended careers and started prosecutions.',
            },
            {
              id: 'red-m1-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'During an authorized external test of client-a.com, you discover that client-a.com is hosted on a shared server alongside other-company.com, which looks vulnerable. What should you do?',
                options: [
                  { id: 'a', label: 'Test other-company.com too — it is on the same box' },
                  { id: 'b', label: 'Stop, document the observation, and inform your client; do not touch the out-of-scope host' },
                  { id: 'c', label: 'Quietly exploit it to demonstrate the shared-hosting risk' },
                  { id: 'd', label: 'Report it directly to other-company.com yourself' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'other-company.com is out of scope — you have no authorization to test it. Note the shared-hosting risk as a finding for your client and let them handle disclosure; touching the other host would be unauthorized access.',
              },
            },
            {
              id: 'red-m1-l1-b4',
              type: 'reflection',
              title: 'Write the boundary',
              body:
                'In 3–4 sentences, describe a realistic situation where you would be technically *able* to escalate beyond your authorized scope but professionally *required* to stop. You will reuse this judgment on every engagement.',
            },
          ],
        },
        {
          id: 'red-m1-l2',
          title: 'Scope & Rules of Engagement',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'The documents that define an engagement: in-scope assets, excluded systems, testing windows, prohibited techniques, and the emergency stop / escalation path.',
          objectives: [
            'List the mandatory components of a rules-of-engagement document',
            'Distinguish in-scope from out-of-scope assets in a brief',
            'Explain testing windows, prohibited actions, and the abort/escalation procedure',
          ],
          blocks: [
            {
              id: 'red-m1-l2-b1',
              type: 'concept',
              title: 'What a RoE actually contains',
              body:
                'Rules of Engagement turn "you may test us" into something you can act on safely:\n\n- **In-scope assets** — exact IPs, domains, apps, accounts.\n- **Explicit exclusions** — systems you must never touch (e.g. production payment DB).\n- **Testing window** — dates/hours; whether after-hours only.\n- **Prohibited techniques** — e.g. no destructive DoS, no real social-engineering of staff without sign-off.\n- **Handling of sensitive data** — what you may exfiltrate to prove impact, and how you store/destroy it.\n- **Emergency contact & abort procedure** — who to call if you cause an outage or find an active breach.',
            },
            {
              id: 'red-m1-l2-b2',
              type: 'callout',
              variant: 'industry',
              title: 'Why this is a billable skill, not paperwork',
              body:
                'Clients buy trust as much as findings. An operator who scopes tightly, stays inside the lines, and escalates cleanly when something breaks is the one who gets the repeat contract. The RoE is where that trust is earned before the engagement even starts.',
            },
          ],
        },
        {
          id: 'red-m1-l3',
          title: 'India’s IT Act & the Legal Landscape',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'The offences a tester must understand — unauthorized access, data theft, damage — and how lawful authorization functions as the defence, in the Indian context.',
          objectives: [
            'Summarize the unauthorized-access and damage offences under the IT Act, 2000',
            'Explain how written authorization functions as the legal basis for testing',
            'Relate the IT Act to the DPDP Act when client/personal data is in scope',
          ],
          blocks: [
            {
              id: 'red-m1-l3-b1',
              type: 'callout',
              variant: 'india',
              title: 'The law you operate under',
              body:
                'In India, unauthorized access to a computer resource, and causing damage or extracting data without permission, are offences under the **Information Technology Act, 2000** (notably §43 and §66). Your scoped, written authorization is precisely what moves your actions from "unauthorized" to "authorized". When the engagement touches personal data, the **DPDP Act, 2023** adds obligations on how that data is handled. Treat the authorization letter as the document that keeps you on the right side of both.',
            },
            {
              id: 'red-m1-l3-b2',
              type: 'resource',
              title: 'The IT Act, 2000 (full text)',
              href: 'https://www.meity.gov.in/content/information-technology-act-2000',
              body: 'Primary source — skim §43 and §66 so you can speak to them with a client.',
            },
          ],
        },
        {
          id: 'red-m1-l4',
          title: 'Responsible Disclosure in Practice',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'What to do when you find a real vulnerability — coordinated disclosure, timelines, and the difference between bug bounty, VDP, and an engagement finding.',
          objectives: [
            'Describe a coordinated/responsible disclosure timeline',
            'Distinguish an engagement finding from a public-facing disclosure',
            'Explain why "weaponize and publish" is never the professional path',
          ],
          blocks: [
            {
              id: 'red-m1-l4-b1',
              type: 'reflection',
              title: 'Draft a disclosure note',
              body:
                'You found an authentication-bypass on an in-scope app. In 4–5 sentences, draft how you would communicate it to the client: the asset, the impact in plain language, your recommendation, and your proposed remediation/disclosure timeline. Clear disclosure is the bridge between hacking and getting paid for it.',
            },
          ],
        },
      ],
      assessment: {
        id: 'red-m1-assessment',
        title: 'Authorization & Ethics Gate',
        type: 'quiz',
        description:
          'Scenario-based quiz on scope, RoE, the IT Act, and disclosure, plus a short written "in scope or not?" judgment exercise. ≥80% is mandatory to unlock any hands-on module.',
        passThreshold: 0.8,
        estimatedMinutes: 25,
      },
    },

    /* -------- M2: Reconnaissance & Enumeration (structural) ------- */
    {
      id: 'red-m2',
      title: 'Reconnaissance & Enumeration',
      tagline: 'Map the attack surface before you ever knock on a door.',
      stage: 3,
      estimatedHours: 22,
      summary:
        'Passive OSINT and active enumeration: discover hosts, services, technologies and users on an authorized target, and build the attack-surface map that drives everything that follows.',
      objectives: [
        'Gather open-source intelligence (OSINT) without touching the target',
        'Enumerate live hosts, ports and services with scanning tooling',
        'Fingerprint web technologies and discover hidden content',
        'Compile findings into a structured attack-surface map',
      ],
      nice: {
        competencies: ['Vulnerability Assessment', 'Threat Analysis'],
        workRoles: ['Penetration Tester', 'Vulnerability Assessment Analyst'],
      },
      prerequisites: ['red-m1'],
      masteryRequired: true,
      lessons: [
        {
          id: 'red-m2-l1',
          title: 'Passive Recon & OSINT',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'DNS, certificate transparency, search-engine and breach-data intel — all without a single packet to the target.',
          objectives: ['Enumerate subdomains and assets passively', 'Build a target profile from open sources'],
          blocks: [],
        },
        {
          id: 'red-m2-l2',
          title: 'Active Scanning: Hosts, Ports & Services',
          kind: 'interactive',
          estimatedMinutes: 22,
          summary: 'Drive nmap against an authorized lab range to find what is alive and what it is running.',
          objectives: ['Run targeted port/service scans', 'Interpret scan output into a service inventory'],
          blocks: [],
        },
        {
          id: 'red-m2-l3',
          title: 'Web Tech Fingerprinting & Content Discovery',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary: 'Identify frameworks and versions, and brute-force hidden directories and endpoints.',
          objectives: ['Fingerprint a web stack', 'Discover unlinked content and endpoints'],
          blocks: [],
        },
        {
          id: 'red-m2-l4',
          title: 'Building the Attack-Surface Map',
          kind: 'project',
          estimatedMinutes: 30,
          summary: 'Turn raw recon into a structured, reportable map of hosts, services and candidate weaknesses.',
          objectives: ['Aggregate recon into a structured map', 'Prioritize the most promising entry points'],
          blocks: [],
        },
      ],
      assessment: {
        id: 'red-m2-assessment',
        title: 'Enumeration Lab Challenge',
        type: 'lab-challenge',
        description:
          'Enumerate a provided authorized range, then submit a structured attack-surface map identifying the key services and the most likely entry point. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 50,
      },
    },

    /* -------- M3: Web Exploitation (FLESHED lab) ----------------- */
    {
      id: 'red-m3',
      title: 'Web Application Exploitation',
      tagline: 'Turn an OWASP category into a working exploit — then describe the fix.',
      stage: 3,
      estimatedHours: 26,
      summary:
        'Hands-on exploitation of the most impactful web weaknesses: broken access control, injection, authentication flaws and client-trust bugs. Every exploit is paired with the remediation, because a finding without a fix is half a deliverable.',
      objectives: [
        'Exploit broken access control and client-trust flaws (e.g. parameter tampering)',
        'Identify and exploit injection vulnerabilities at a working level',
        'Attack weak authentication and session handling',
        'Articulate the impact and remediation for each exploited flaw',
      ],
      nice: {
        competencies: ['Penetration Testing', 'Vulnerability Assessment'],
        workRoles: ['Penetration Tester', 'Exploitation Analyst'],
      },
      prerequisites: ['red-m2'],
      masteryRequired: true,
      lessons: [
        {
          id: 'red-m3-l1',
          title: 'Broken Access Control & Client Trust',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary: 'The most common high-impact web class: the server trusting data the client controls.',
          objectives: ['Recognize broken-access-control patterns', 'Explain why client input is never trustworthy'],
          blocks: [
            {
              id: 'red-m3-l1-b1',
              type: 'concept',
              title: 'The server must never trust the client',
              body:
                'Anything the client sends — a URL parameter, a hidden form field, a cookie, a header — is fully under the attacker’s control. When an application makes a **security decision** based on that value (the price, the user id, the role), it can be tampered with. The fix is always the same in shape: **enforce the decision server-side**, against data the client cannot influence.',
            },
            {
              id: 'red-m3-l1-b2',
              type: 'lab',
              title: 'Lab: Parameter Tampering Mini-CTF',
              labId: 'param-tamper',
              body:
                'A rewards page trusts the client too much — the price comes from a URL parameter. Tamper it to unlock the flag, then write one sentence describing the server-side fix you would recommend in your report.',
            },
            {
              id: 'red-m3-l1-b3',
              type: 'reflection',
              title: 'From exploit to finding',
              body:
                'Write the parameter-tampering result as a two-line report finding: the **impact** (what an attacker gains) and the **remediation** (the server-side control). This is the exact shape every finding in your final pentest report will take.',
            },
          ],
          labIds: ['param-tamper'],
        },
        {
          id: 'red-m3-l2',
          title: 'Injection: SQL & Command',
          kind: 'interactive',
          estimatedMinutes: 24,
          summary: 'When user input becomes code: detect and exploit injection, then close it with parameterization.',
          objectives: ['Detect an injectable parameter', 'Explain parameterized queries as the fix'],
          blocks: [],
        },
        {
          id: 'red-m3-l3',
          title: 'Decoding & Inspecting Captured Tokens',
          kind: 'interactive',
          estimatedMinutes: 14,
          summary: 'Reversible encodings hide nothing — decode a captured token and reason about what it exposes.',
          objectives: ['Recognize Base64/hex encodings in tokens', 'Distinguish encoding from encryption in an exploit context'],
          blocks: [
            {
              id: 'red-m3-l3-b1',
              type: 'lab',
              title: 'Lab: Decode the Hidden String',
              labId: 'b64-decode',
              body: 'This captured token is just Base64. Decode it, recover the flag, and note why "we encoded it" is not a security control.',
            },
          ],
          labIds: ['b64-decode'],
        },
        {
          id: 'red-m3-l4',
          title: 'Attacking Authentication & Sessions',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary: 'Weak credentials, flawed session handling, and bypassing access controls.',
          objectives: ['Attack weak authentication flows', 'Identify insecure session handling'],
          blocks: [],
        },
        {
          id: 'red-m3-l5',
          title: 'Reading the Raw HTTP Exchange',
          kind: 'interactive',
          estimatedMinutes: 13,
          summary: 'Exploitation lives in the request/response — read a captured exchange and interpret what the server reveals.',
          objectives: ['Dissect a raw HTTP request/response', 'Spot a server signal worth exploiting'],
          blocks: [
            {
              id: 'red-m3-l5-b1',
              type: 'lab',
              title: 'Lab: Inspect a Fake HTTP Request',
              labId: 'http-inspect',
              body: 'Read the captured request/response and decide what the server is telling an attacker.',
            },
          ],
          labIds: ['http-inspect'],
        },
      ],
      assessment: {
        id: 'red-m3-assessment',
        title: 'Web Exploitation Find-and-Report',
        type: 'lab-challenge',
        description:
          'Compromise a vulnerable-by-design web app and submit each finding with a clear impact statement and remediation. Scored on both exploitation success and quality of the write-up.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },

    /* -------- M4: Exploitation & Privilege Escalation (structural) */
    {
      id: 'red-m4',
      title: 'Exploitation & Privilege Escalation',
      tagline: 'Get a shell, then turn a foothold into full control.',
      stage: 3,
      estimatedHours: 26,
      summary:
        'From initial access to root/SYSTEM: working with public exploits safely, gaining a foothold, and the Linux and Windows privilege-escalation paths that every OSCP-style box turns on.',
      objectives: [
        'Find, vet and run a public exploit against an authorized target',
        'Establish and stabilize a reverse/bind shell',
        'Enumerate and exploit Linux privilege-escalation vectors',
        'Enumerate and exploit Windows privilege-escalation vectors',
      ],
      nice: {
        competencies: ['Penetration Testing', 'Systems Exploitation'],
        workRoles: ['Exploitation Analyst', 'Penetration Tester'],
      },
      prerequisites: ['red-m3'],
      masteryRequired: true,
      lessons: [
        {
          id: 'red-m4-l1',
          title: 'Working with Public Exploits Safely',
          kind: 'theory',
          estimatedMinutes: 15,
          summary: 'Finding, reading and vetting exploit code before you ever run it against a target.',
          objectives: ['Locate and assess a public exploit', 'Review exploit code for safety before use'],
          blocks: [],
        },
        {
          id: 'red-m4-l2',
          title: 'Gaining & Stabilizing a Shell',
          kind: 'interactive',
          estimatedMinutes: 22,
          summary: 'Reverse vs bind shells, catching a callback, and upgrading to a stable interactive session.',
          objectives: ['Establish a reverse shell', 'Upgrade to a stable interactive TTY'],
          blocks: [],
        },
        {
          id: 'red-m4-l3',
          title: 'Linux Privilege Escalation',
          kind: 'interactive',
          estimatedMinutes: 24,
          summary: 'SUID binaries, sudo misconfigurations, cron jobs and writable paths — the classic Linux escalation map.',
          objectives: ['Enumerate Linux privesc vectors', 'Escalate to root via a misconfiguration'],
          blocks: [],
        },
        {
          id: 'red-m4-l4',
          title: 'Windows Privilege Escalation',
          kind: 'interactive',
          estimatedMinutes: 24,
          summary: 'Service misconfigurations, token abuse, unquoted paths and credential harvesting on Windows.',
          objectives: ['Enumerate Windows privesc vectors', 'Escalate to SYSTEM via a misconfiguration'],
          blocks: [],
        },
      ],
      assessment: {
        id: 'red-m4-assessment',
        title: 'Foothold-to-Root Challenge',
        type: 'lab-challenge',
        description:
          'Compromise a provided lab box from network access to full administrative control, documenting each step as you would in a report. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 90,
      },
    },

    /* -------- M5: Active Directory Attacks (structural) ---------- */
    {
      id: 'red-m5',
      title: 'Active Directory Attacks',
      tagline: 'Own the domain: the terrain of nearly every real enterprise breach.',
      stage: 3,
      estimatedHours: 28,
      summary:
        'How attackers move through a Windows domain: enumeration, credential attacks (Kerberoasting, password spraying), lateral movement, and the path to Domain Admin. This is the CRTP-aligned heart of modern offensive work.',
      objectives: [
        'Enumerate an Active Directory environment and map attack paths',
        'Execute credential attacks (Kerberoasting, AS-REP roasting, spraying)',
        'Move laterally using harvested credentials and hashes',
        'Chain misconfigurations into a domain-compromise path',
      ],
      nice: {
        competencies: ['Penetration Testing', 'Network Security', 'Systems Exploitation'],
        workRoles: ['Penetration Tester', 'Exploitation Analyst'],
      },
      prerequisites: ['red-m4'],
      masteryRequired: true,
      lessons: [
        {
          id: 'red-m5-l1',
          title: 'Active Directory for Attackers',
          kind: 'theory',
          estimatedMinutes: 15,
          summary: 'Domains, trusts, Kerberos and the objects that matter — the mental model behind every AD attack.',
          objectives: ['Explain AD core concepts and Kerberos at a working level', 'Identify high-value AD objects'],
          blocks: [],
        },
        {
          id: 'red-m5-l2',
          title: 'Domain Enumeration & Attack-Path Mapping',
          kind: 'interactive',
          estimatedMinutes: 24,
          summary: 'Enumerate users, groups, ACLs and sessions, then visualize the path to Domain Admin.',
          objectives: ['Enumerate AD objects and relationships', 'Map a path toward privileged access'],
          blocks: [],
        },
        {
          id: 'red-m5-l3',
          title: 'Credential Attacks: Kerberoasting & Spraying',
          kind: 'interactive',
          estimatedMinutes: 24,
          summary: 'Extract and crack service tickets, AS-REP roast, and spray passwords without locking accounts.',
          objectives: ['Perform Kerberoasting / AS-REP roasting', 'Run a safe password-spraying attack'],
          blocks: [],
        },
        {
          id: 'red-m5-l4',
          title: 'Lateral Movement & Domain Compromise',
          kind: 'project',
          estimatedMinutes: 40,
          summary: 'Use harvested credentials and hashes to pivot across hosts and reach Domain Admin.',
          objectives: ['Move laterally with pass-the-hash / pass-the-ticket', 'Chain steps to domain compromise'],
          blocks: [],
        },
      ],
      assessment: {
        id: 'red-m5-assessment',
        title: 'Domain Compromise Challenge',
        type: 'lab-challenge',
        description:
          'From a low-privileged foothold in a lab domain, chain enumeration and credential attacks to reach Domain Admin, documenting the attack path. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 120,
      },
    },

    /* -------- M6: Adversary Simulation & Red-Team Ops (structural) */
    {
      id: 'red-m6',
      title: 'Adversary Simulation & Red-Team Operations',
      tagline: 'From "find bugs" to "emulate a real threat actor against a defended network".',
      stage: 3,
      estimatedHours: 24,
      summary:
        'The red-team mindset: operating against a defended environment with objectives, command-and-control, persistence and evasion, and emulating a known adversary’s tactics with MITRE ATT&CK — while staying inside the rules of engagement.',
      objectives: [
        'Distinguish a penetration test from a red-team / adversary-simulation engagement',
        'Plan an operation around objectives, C2 and operational security',
        'Establish persistence and apply basic detection-evasion techniques',
        'Emulate an adversary’s TTPs and map them to MITRE ATT&CK',
      ],
      nice: {
        competencies: ['Penetration Testing', 'Threat Analysis', 'Adversarial Tactics'],
        workRoles: ['Penetration Tester', 'Exploitation Analyst'],
      },
      prerequisites: ['red-m5'],
      masteryRequired: true,
      lessons: [
        {
          id: 'red-m6-l1',
          title: 'Pentest vs Red Team',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'Objective-based, stealthy, adversary-emulating engagements vs broad vulnerability coverage.',
          objectives: ['Contrast pentest and red-team goals', 'Explain objective-based engagement design'],
          blocks: [],
        },
        {
          id: 'red-m6-l2',
          title: 'Command & Control, Persistence & OPSEC',
          kind: 'interactive',
          estimatedMinutes: 22,
          summary: 'Stand up a C2 channel, persist on a host, and keep your operation quiet and controlled.',
          objectives: ['Establish a C2 channel in the lab', 'Apply persistence with operator OPSEC'],
          blocks: [],
        },
        {
          id: 'red-m6-l3',
          title: 'Evasion & ATT&CK-Mapped Emulation',
          kind: 'interactive',
          estimatedMinutes: 22,
          summary: 'Basic detection evasion and emulating a chosen adversary’s techniques, mapped to MITRE ATT&CK.',
          objectives: ['Apply basic evasion techniques', 'Map executed actions to ATT&CK techniques'],
          blocks: [],
        },
        {
          id: 'red-m6-l4',
          title: 'The Attack Narrative',
          kind: 'project',
          estimatedMinutes: 30,
          summary: 'Tell the story of the operation — the chained path from initial access to objective — the way a red-team report does.',
          objectives: ['Construct a coherent attack narrative', 'Tie each step to an ATT&CK technique and a defensive lesson'],
          blocks: [
            {
              id: 'red-m6-l4-b1',
              type: 'reflection',
              title: 'Deliverable: the narrative',
              body:
                'Write the attack narrative for your lab operation as a numbered, chronological story: how you got in, how you escalated, how you reached the objective, and — for each step — what the defenders could have done to stop you. The narrative is what makes a red-team report actionable for the blue team.',
            },
          ],
        },
      ],
      assessment: {
        id: 'red-m6-assessment',
        title: 'Mini Adversary-Simulation Exercise',
        type: 'lab-challenge',
        description:
          'Run a short objective-based operation against a defended lab range and submit an attack narrative mapped to MITRE ATT&CK. Scored on objective completion, OPSEC, and narrative clarity.',
        passThreshold: 0.8,
        estimatedMinutes: 90,
      },
    },

    /* -------- M7: Professional Reporting & Disclosure (FLESHED) --- */
    {
      id: 'red-m7',
      title: 'Professional Reporting & Responsible Disclosure',
      tagline: 'The deliverable is the report — this is the skill that gets you hired.',
      stage: 3,
      estimatedHours: 18,
      summary:
        'A flawless compromise that is reported badly is a failed engagement. This module turns raw findings into a professional pentest report: an executive summary a CISO can act on, technical findings with reproducible steps and CVSS-style risk ratings, and clear, prioritized remediation guidance — delivered through responsible disclosure.',
      objectives: [
        'Structure a professional penetration-test report end to end',
        'Write an executive summary for a non-technical decision-maker',
        'Document a finding with evidence, risk rating and reproducible steps',
        'Produce prioritized, actionable remediation guidance',
      ],
      nice: {
        competencies: ['Security Reporting', 'Stakeholder Communication', 'Vulnerability Assessment'],
        workRoles: ['Penetration Tester', 'Vulnerability Assessment Analyst'],
      },
      prerequisites: ['red-m6'],
      masteryRequired: true,
      lessons: [
        {
          id: 'red-m7-l1',
          title: 'Anatomy of a Pentest Report',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'The standard sections of a professional report and who reads each one.',
          objectives: [
            'List the standard sections of a pentest report',
            'Match each section to its audience (executive vs technical)',
          ],
          blocks: [
            {
              id: 'red-m7-l1-b1',
              type: 'concept',
              title: 'Two reports in one document',
              body:
                'A professional report serves two readers at once. The **executive summary** is for decision-makers: business risk in plain language, the overall posture, and what to fund first — no jargon. The **technical findings** are for engineers: each issue with evidence, a reproducible proof, a risk rating, and a concrete fix.\n\nStandard skeleton: *Executive Summary → Scope & Methodology → Findings (each: title, risk, impact, evidence, reproduction, remediation) → Attack Narrative → Remediation Roadmap → Appendices.*',
            },
            {
              id: 'red-m7-l1-b2',
              type: 'callout',
              variant: 'industry',
              title: 'Why this module is weighted so heavily',
              body:
                'Clients never see you work — they see the report. It is the entire deliverable, the proof of value, and the thing your name is attached to. Operators who can exploit *and* communicate are rare and well paid; the ones who can only exploit stay junior.',
            },
            {
              id: 'red-m7-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'Which item belongs in the executive summary rather than the technical findings section?',
                options: [
                  { id: 'a', label: 'The exact HTTP request used to trigger the SQL injection' },
                  { id: 'b', label: 'A one-paragraph statement of overall business risk and the top priority to fund' },
                  { id: 'c', label: 'The CVSS vector string for each finding' },
                  { id: 'd', label: 'Step-by-step reproduction instructions' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'The executive summary is for non-technical decision-makers: business risk and priorities, no jargon. Requests, CVSS vectors and reproduction steps belong in the technical findings.',
              },
            },
          ],
        },
        {
          id: 'red-m7-l2',
          title: 'Writing the Executive Summary',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'Translate technical compromise into business risk a CISO can act on in five minutes.',
          objectives: ['Write jargon-free risk statements', 'Lead with the decision the reader must make'],
          blocks: [
            {
              id: 'red-m7-l2-b1',
              type: 'reflection',
              title: 'Translate the win',
              body:
                'Take your strongest finding from an earlier module and write a two-sentence executive line: what an attacker could do to the *business* (not the system), and the single action you recommend. No tool names, no payloads — just risk and recommendation.',
            },
          ],
        },
        {
          id: 'red-m7-l3',
          title: 'Documenting a Finding: Evidence, Risk & Reproduction',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'The repeatable shape of a technical finding, with CVSS-style rating and steps another tester can follow.',
          objectives: [
            'Write a finding with title, impact, evidence and reproduction steps',
            'Assign a defensible CVSS-style risk rating',
          ],
          blocks: [
            {
              id: 'red-m7-l3-b1',
              type: 'example',
              title: 'A finding, fully formed',
              body:
                '**Title:** Server-side trust of client-supplied price (broken access control)\n\n**Risk:** High (CVSS ~7.5) — unauthenticated, trivially exploitable, direct financial impact.\n\n**Impact:** An attacker can alter the purchase price via a URL parameter, buying items for an arbitrary amount.\n\n**Evidence:** Tampered request `GET /buy?item=42&price=0` returned `200 OK` and completed the order (screenshot/appendix A).\n\n**Reproduction:** 1) Add item to cart. 2) Intercept the checkout request. 3) Change `price` to `0`. 4) Forward — order completes.\n\n**Remediation:** Never trust client-supplied pricing; compute and validate the price server-side from the authoritative catalog.',
            },
          ],
        },
        {
          id: 'red-m7-l4',
          title: 'Remediation Guidance & Responsible Disclosure',
          kind: 'project',
          estimatedMinutes: 25,
          summary: 'Turn findings into a prioritized, realistic fix roadmap and deliver it through a responsible-disclosure process.',
          objectives: [
            'Prioritize remediation by risk and effort',
            'Run a responsible-disclosure handoff to the client',
          ],
          blocks: [
            {
              id: 'red-m7-l4-b1',
              type: 'reflection',
              title: 'Deliverable: remediation roadmap',
              body:
                'For three findings from your engagements, write a prioritized remediation roadmap: each fix, its risk, rough effort (quick win vs project), and the order you would tackle them in. End with a one-line disclosure note proposing how and when you would re-test. This goes in your portfolio.',
            },
          ],
        },
      ],
      assessment: {
        id: 'red-m7-assessment',
        title: 'Full Pentest Report Submission',
        type: 'project',
        description:
          'Produce a complete, professional pentest report for a provided engagement: executive summary, scoped methodology, documented findings with risk ratings and reproduction, an attack narrative, and a prioritized remediation roadmap. Mentor-reviewed for both technical accuracy and communication quality.',
        passThreshold: 0.8,
        estimatedMinutes: 120,
      },
    },
  ],

  /* ============================================================== */
  /* EMBEDDED WORK EXPERIENCE — the differentiator                   */
  /* ============================================================== */
  workExperience: {
    id: 'red-practicum',
    title: 'Supervised Offensive Engagement',
    format: 'Supervised, scoped penetration test against a sanctioned lab range / consenting partner',
    durationWeeks: 4,
    summary:
      'An apprenticeship-style engagement that turns a trained operator into a deliverable-producing professional. Under a senior mentor and a signed scope, the learner runs a full penetration test / adversary simulation against a sanctioned lab range (or a consenting partner SME/NGO), then writes and presents a complete professional report — exactly as on a real engagement.',
    activities: [
      'Sign and operate within a real scope statement and rules of engagement',
      'Run a full engagement: recon → exploitation → privilege escalation → AD / objective',
      'Maintain an operator log and evidence trail throughout the engagement',
      'Hold a kickoff and a mid-engagement check-in with the mentor (and partner, where applicable)',
      'Deliver and defend the findings in a client-style debrief presentation',
    ],
    deliverables: [
      'A complete professional penetration-test report (executive summary + technical findings)',
      'An attack narrative tracing the chained path from initial access to objective',
      'A prioritized remediation-guidance roadmap mapped to risk and effort',
      'A recorded client-style findings debrief presentation',
      'A mentor-signed competency sign-off mapped to NICE work-role tasks',
    ],
    mentorship:
      'Each learner is paired with an industry-certified offensive-security mentor for the engagement: a scoping kickoff, daily async check-ins, two live reviews, and a final assessed debrief of the report.',
    competencies: [
      'Penetration Testing',
      'Vulnerability Assessment',
      'Systems Exploitation',
      'Security Reporting',
      'Stakeholder Communication',
    ],
    softSkills: [
      'Professional written communication (reports, findings)',
      'Verbal communication & defending findings to stakeholders',
      'Operating ethically within scope and rules of engagement',
      'Problem-solving under realistic, time-boxed constraints',
    ],
  },

  /* ============================================================== */
  /* BADGES (Open-Badges-style micro-credentials)                    */
  /* ============================================================== */
  badges: [
    {
      id: 'red-badge-ethics',
      title: 'Authorized Operator',
      description: 'Cleared the ethics, law and rules-of-engagement gate that governs all offensive work.',
      criteria: 'Pass the Authorization & Ethics Gate (M1) at ≥80%.',
      icon: 'shield',
    },
    {
      id: 'red-badge-exploitation',
      title: 'Exploitation Practitioner',
      description: 'Demonstrated web exploitation and foothold-to-root privilege escalation.',
      criteria: 'Pass the mastery checks for Modules 3 and 4.',
      icon: 'code',
    },
    {
      id: 'red-badge-ad',
      title: 'Domain Dominator',
      description: 'Chained enumeration and credential attacks to compromise an Active Directory domain.',
      criteria: 'Score ≥80% on the Domain Compromise Challenge (M5).',
      icon: 'network',
    },
    {
      id: 'red-badge-redteam',
      title: 'Adversary Emulator',
      description: 'Ran an objective-based operation against a defended range and mapped it to MITRE ATT&CK.',
      criteria: 'Pass the Mini Adversary-Simulation Exercise (M6).',
      icon: 'target',
    },
    {
      id: 'red-badge-reporter',
      title: 'Professional Reporter',
      description: 'Delivered a complete, client-ready penetration-test report and remediation roadmap.',
      criteria: 'Pass the Full Pentest Report Submission (M7) and complete the supervised engagement.',
      icon: 'clipboard',
    },
  ],

  /* ============================================================== */
  /* CAPSTONE                                                         */
  /* ============================================================== */
  capstone: {
    id: 'red-capstone',
    title: 'OSCP-Style Exam: End-to-End Compromise & Report',
    type: 'project',
    description:
      'A timed, exam-day capstone modeled on the OSCP: against a set of authorized lab machines (including an Active Directory chain), the learner performs reconnaissance, exploitation, privilege escalation and lateral movement to fully compromise the targets, then delivers a complete professional penetration-test report with executive summary, documented findings, an attack narrative, and prioritized remediation. Assessed by mentors against the NICE work-role competencies, with the report added to the learner’s portfolio. Aligns with OSCP exam readiness.',
    passThreshold: 0.8,
    estimatedMinutes: 1440,
  },
}
