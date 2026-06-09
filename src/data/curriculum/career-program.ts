import type { CourseCurriculum } from '../../types'

/**
 * FLAGSHIP COURSE — fully fleshed reference curriculum.
 *
 * "Career-Oriented Cybersecurity Program" (course id: career-program).
 * Zero → job-ready across roadmap Stages 1–3, then an embedded work-experience
 * practicum and a portfolio capstone.
 *
 * This file is the canonical template every other course in src/data/curriculum/
 * mirrors. Foundation modules (M1, plus representative lessons in M5/M6) are
 * authored to full block depth; later modules carry complete lesson metadata
 * (title, kind, minutes, objectives, summary) ready to be filled in the same shape.
 *
 * Pedagogy baked into the shape (see docs/curriculum/README.md):
 *  - Micro-learning: theory lessons are 7–15 min.
 *  - Every module interleaves theory → worked example → lab → retrieval check.
 *  - Mastery gating: pass the module assessment (≥80%) to unlock the next.
 *  - Soft skills via reflection/write-up blocks throughout.
 *  - NICE Work Role + Competency mapping on every module.
 */
export const careerProgramCurriculum: CourseCurriculum = {
  courseId: 'career-program',
  title: 'Career-Oriented Cybersecurity Program',
  format: 'Self-paced + cohort mentorship',
  totalEstimatedHours: 320,
  weeklyCommitment: '8–10 hrs/week (≈7–9 months)',
  outcomeRole: 'SOC Analyst / Security Analyst (entry)',
  capstoneCert: 'CompTIA Security+ (plus (ISC)² CC en route, eJPT optional)',
  niceWorkRoles: [
    'Cyber Defense Analyst',
    'Cyber Defense Incident Responder',
    'Vulnerability Assessment Analyst',
  ],

  modules: [
    /* ============================================================== */
    /* STAGE 1 · FOUNDATION                                            */
    /* ============================================================== */

    /* -------- M1: Digital Foundations (FULLY FLESHED) ------------- */
    {
      id: 'cp-m1',
      title: 'Digital Foundations: How Computers Actually Work',
      tagline: 'You cannot secure what you do not understand.',
      stage: 1,
      estimatedHours: 14,
      summary:
        'Build the mental model every security career stands on: hardware, the OS, processes, files, memory, users and permissions, and how data is represented. We keep it hands-on from lesson one.',
      objectives: [
        'Explain the major parts of a computer and how an OS mediates between them',
        'Describe processes, the file system, users and permissions in plain language',
        'Convert between binary, decimal and hexadecimal, and read encoded data',
        'Set up a safe virtual home lab to practice in for the rest of the program',
      ],
      nice: {
        competencies: ['IT Fundamentals', 'Operating Systems Concepts'],
        workRoles: ['Technical Support Specialist', 'Cyber Defense Analyst'],
      },
      prerequisites: ['Basic computer literacy (use a browser, install software)'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cp-m1-l1',
          title: 'What a Computer Is (and the Security Mindset)',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'The hardware/software stack, and why a security professional asks "who can do what to this, and how would I know?" of everything.',
          objectives: [
            'Name the core hardware components and what each does',
            'Explain the role of the operating system as a resource broker',
            'State the CIA triad and apply it to an everyday device',
          ],
          blocks: [
            {
              id: 'cp-m1-l1-b1',
              type: 'concept',
              title: 'The stack, top to bottom',
              body:
                'Every system you will ever defend is a stack: **hardware** (CPU, RAM, storage, network card) at the bottom, an **operating system** in the middle that shares those resources safely between programs, and **applications** on top that do the work people care about.\n\nSecurity lives at every layer. A weak password is an application problem; a missing patch is an OS problem; a stolen laptop is a hardware problem. Your job is to reason about all three.',
            },
            {
              id: 'cp-m1-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'The one question that defines the job',
              body:
                'For anything you look at, ask: **"Who can do what to this — and would I know if they did?"** That single habit — thinking about access and visibility — is the seed of both blue-team (detect) and red-team (exploit) thinking.',
            },
            {
              id: 'cp-m1-l1-b3',
              type: 'concept',
              title: 'The CIA triad',
              body:
                'Security is usually framed as protecting three properties:\n\n- **Confidentiality** — only the right people can read it.\n- **Integrity** — it has not been tampered with.\n- **Availability** — it is there when you need it.\n\nMost attacks break one of these. Ransomware breaks availability; a data leak breaks confidentiality; a forged transaction breaks integrity.',
            },
            {
              id: 'cp-m1-l1-b4',
              type: 'check',
              question: {
                prompt:
                  'A hospital is hit by ransomware and doctors cannot open patient records during the outage. Which property of the CIA triad is most directly harmed?',
                options: [
                  { id: 'a', label: 'Confidentiality' },
                  { id: 'b', label: 'Integrity' },
                  { id: 'c', label: 'Availability' },
                  { id: 'd', label: 'Non-repudiation' },
                ],
                correct: ['c'],
                multiple: false,
                explanation:
                  'Availability — the data exists and is unchanged, but it is not accessible when needed. (If the attacker also stole the records, confidentiality would be harmed too.)',
              },
            },
            {
              id: 'cp-m1-l1-b5',
              type: 'reflection',
              title: 'Make it personal',
              body:
                'In 3–4 sentences, pick one device you own and describe one realistic threat to each of confidentiality, integrity and availability. Save this — you will reuse this "think in CIA" habit in every module.',
            },
          ],
        },
        {
          id: 'cp-m1-l2',
          title: 'Processes, Files, Users & Permissions',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'The OS abstractions attackers and defenders care about most: running programs, the file tree, and who is allowed to touch what.',
          objectives: [
            'Describe what a process is and how the OS isolates them',
            'Explain the file-system tree and the idea of file ownership',
            'Read a Unix permission string like rwxr-xr--',
          ],
          blocks: [
            {
              id: 'cp-m1-l2-b1',
              type: 'concept',
              title: 'Processes: programs that are running',
              body:
                'A **program** is a file on disk. A **process** is that program loaded into memory and executing, with its own slice of RAM the OS keeps isolated from other processes. When you investigate an incident, "what processes are running and who started them?" is one of the first questions you ask.',
            },
            {
              id: 'cp-m1-l2-b2',
              type: 'concept',
              title: 'Users, groups and permissions',
              body:
                'Every file and process belongs to a **user** and a **group**. Permissions decide who can **r**ead, **w**rite, or e**x**ecute. On Linux you will see strings like `rwxr-xr--`: the first three characters are the owner\'s rights, the next three the group\'s, the last three everyone else\'s.',
            },
            {
              id: 'cp-m1-l2-b3',
              type: 'example',
              title: 'Reading rwxr-xr--',
              body:
                '`rwxr-xr--` on a file owned by `deploy:devs` means:\n\n- **Owner (deploy):** read, write, execute\n- **Group (devs):** read, execute (no write)\n- **Others:** read only\n\nIf this were a script holding a secret, "others can read" might be a finding — least privilege says only who needs it should have access.',
            },
            {
              id: 'cp-m1-l2-b4',
              type: 'check',
              question: {
                prompt: 'For the permission string rw-r-----, who can read the file?',
                options: [
                  { id: 'a', label: 'Only the owner' },
                  { id: 'b', label: 'The owner and the group' },
                  { id: 'c', label: 'Everyone' },
                  { id: 'd', label: 'Nobody' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'Owner has rw-, group has r--, others have ---. So owner and group can read; others cannot.',
              },
            },
          ],
        },
        {
          id: 'cp-m1-l3',
          title: 'How Data Is Represented: Binary, Hex & Encoding',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary:
            'Bits, bytes, hex, and the difference between encoding and encryption — then a hands-on decode.',
          objectives: [
            'Convert between binary, decimal and hexadecimal',
            'Recognize Base64 and explain why encoding is not encryption',
            'Decode an encoded token to recover its contents',
          ],
          blocks: [
            {
              id: 'cp-m1-l3-b1',
              type: 'concept',
              title: 'Bits, bytes and hex',
              body:
                'A **bit** is a 0 or 1. Eight bits make a **byte**, which can hold 256 values (0–255). Because long binary strings are hard to read, we group them as **hexadecimal** (base 16, digits 0–9 then a–f): one hex digit = 4 bits, two hex digits = one byte. The byte `01000001` is `0x41`, which is the letter `A`.',
            },
            {
              id: 'cp-m1-l3-b2',
              type: 'callout',
              variant: 'warning',
              title: 'Encoding ≠ encryption',
              body:
                'Base64 and hex are **encodings** — reversible by anyone, no key needed. They hide nothing from an attacker. Encryption needs a key. Confusing the two is one of the most common beginner security mistakes.',
            },
            {
              id: 'cp-m1-l3-b3',
              type: 'lab',
              title: 'Lab: Decode the Hidden String',
              labId: 'b64-decode',
              body:
                'Apply it now: this captured token is just Base64. Decode it and recover the flag inside.',
            },
            {
              id: 'cp-m1-l3-b4',
              type: 'reflection',
              title: 'Explain it back',
              body:
                'A teammate says "I Base64-encoded the password so it is safe in the config file." In two sentences, explain why that is not true. (Communicating risk clearly is a core SOC skill.)',
            },
          ],
          labIds: ['b64-decode'],
        },
        {
          id: 'cp-m1-l4',
          title: 'Build Your Home Lab (Virtualization)',
          kind: 'interactive',
          estimatedMinutes: 25,
          summary:
            'Set up VirtualBox + a Linux VM so you have a safe, disposable place to practice everything that follows.',
          objectives: [
            'Explain what a virtual machine is and why we practice in one',
            'Install a hypervisor and create a Linux VM',
            'Take and restore a snapshot so mistakes are reversible',
          ],
          blocks: [
            {
              id: 'cp-m1-l4-b1',
              type: 'concept',
              title: 'Why a VM',
              body:
                'A **virtual machine** is a whole computer running as software inside your real one, fully isolated. You can break it, infect it on purpose, and roll it back to a clean **snapshot** in seconds. Never practice attacks on systems you do not own — your VM is the safe sandbox you will use for the rest of this program.',
            },
            {
              id: 'cp-m1-l4-b2',
              type: 'video',
              title: 'Walkthrough: VirtualBox + Ubuntu (guided)',
              estimatedMinutes: 12,
              body:
                'Follow along: install VirtualBox, create an Ubuntu VM, boot it, then take a snapshot named "clean-base". (Step-by-step PDF attached in resources.)',
            },
            {
              id: 'cp-m1-l4-b3',
              type: 'resource',
              title: 'VirtualBox downloads',
              href: 'https://www.virtualbox.org/',
              body: 'Free, cross-platform hypervisor used throughout the program.',
            },
            {
              id: 'cp-m1-l4-b4',
              type: 'check',
              question: {
                prompt: 'What is the main reason we take a snapshot before experimenting in a VM?',
                options: [
                  { id: 'a', label: 'It makes the VM run faster' },
                  { id: 'b', label: 'It lets us roll back to a clean state if something breaks' },
                  { id: 'c', label: 'It encrypts the VM disk' },
                  { id: 'd', label: 'It is required to connect to the internet' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'A snapshot is a restore point. Experiment freely, then revert to "clean-base" — failure becomes free.',
              },
            },
          ],
        },
      ],
      assessment: {
        id: 'cp-m1-assessment',
        title: 'Foundations Mastery Check',
        type: 'quiz',
        description:
          'Mixed quiz + one short-answer "explain in plain English" item covering hardware/OS, CIA, permissions, and encoding vs encryption. ≥80% unlocks Module 2.',
        passThreshold: 0.8,
        estimatedMinutes: 20,
      },
    },

    /* -------- M2: Networking Essentials (rich sample lesson) ------ */
    {
      id: 'cp-m2',
      title: 'Networking Essentials',
      tagline: 'How data moves — and where attacks and defenses live.',
      stage: 1,
      estimatedHours: 18,
      summary:
        'TCP/IP, DNS, HTTP, ports and packets. You will read real request/response pairs and learn the model that every later attack and detection is built on.',
      objectives: [
        'Explain the TCP/IP model and what happens when you load a web page',
        'Describe IP addresses, ports, DNS and common protocols',
        'Read a raw HTTP request/response and interpret status codes',
        'Use basic tooling (ping, nslookup, a browser network tab) to inspect traffic',
      ],
      nice: {
        competencies: ['Network Fundamentals', 'Infrastructure Design'],
        workRoles: ['Cyber Defense Analyst', 'Network Operations Specialist'],
      },
      prerequisites: ['cp-m1'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cp-m2-l1',
          title: 'The Journey of a Web Request',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'DNS → TCP → HTTP: what really happens between typing a URL and seeing a page.',
          objectives: [
            'Trace a request through DNS resolution, TCP connection and HTTP exchange',
            'Explain the role of IP addresses and ports',
          ],
          blocks: [
            {
              id: 'cp-m2-l1-b1',
              type: 'concept',
              title: 'From URL to page',
              body:
                'Type `cybervidya.co.in` and: (1) **DNS** turns the name into an IP address; (2) your machine opens a **TCP** connection to that IP on **port** 443; (3) it sends an **HTTP** request; (4) the server replies with an HTTP response your browser renders. Every web attack and every web detection hooks into one of these steps.',
            },
            {
              id: 'cp-m2-l1-b2',
              type: 'callout',
              variant: 'industry',
              title: 'Why analysts care',
              body:
                'A SOC analyst reads this exchange backwards: a weird DNS lookup, a connection to an odd IP/port, or a strange HTTP request is often the first sign of compromise. Master the normal flow and the abnormal jumps out.',
            },
          ],
        },
        {
          id: 'cp-m2-l2',
          title: 'IP Addresses, Ports & Common Protocols',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'Addressing, the well-known ports, and TCP vs UDP.',
          objectives: [
            'Distinguish IP address from port and explain why both are needed',
            'Recall well-known ports (80/443/22/53) and TCP vs UDP',
          ],
          blocks: [],
        },
        {
          id: 'cp-m2-l3',
          title: 'Reading HTTP: Methods, Headers & Status Codes',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Dissect a real request/response, then interpret a server reply in the lab.',
          objectives: [
            'Identify HTTP method, headers and body in a raw request',
            'Interpret status-code classes (2xx/3xx/4xx/5xx)',
          ],
          blocks: [
            {
              id: 'cp-m2-l3-b1',
              type: 'concept',
              title: 'Anatomy of an HTTP exchange',
              body:
                'A request has a **method** (GET/POST/…), a **path**, **headers** (metadata like `Authorization`), and an optional **body**. The response leads with a **status code**: 2xx success, 3xx redirect, 4xx client error, 5xx server error.',
            },
            {
              id: 'cp-m2-l3-b2',
              type: 'lab',
              title: 'Lab: Inspect a Fake HTTP Request',
              labId: 'http-inspect',
              body: 'Read the captured request/response and decide what the server is telling you.',
            },
          ],
          labIds: ['http-inspect'],
        },
        {
          id: 'cp-m2-l4',
          title: 'Hands-On: Inspect Your Own Traffic',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary: 'Use ping, nslookup and the browser network tab against sites you own/control.',
          objectives: [
            'Resolve a name with nslookup and reach a host with ping',
            'Read the browser network tab to see real requests',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'cp-m2-assessment',
        title: 'Networking Lab Challenge',
        type: 'lab-challenge',
        description:
          'Given a small packet/HTTP capture, identify the protocol, ports, and one anomalous request. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 30,
      },
    },

    /* -------- M3: Operating Systems (structural) ----------------- */
    {
      id: 'cp-m3',
      title: 'Operating Systems: Linux & Windows for Security',
      tagline: 'Drive both systems from the command line like a pro.',
      stage: 1,
      estimatedHours: 22,
      summary:
        'The Linux shell and Windows internals every analyst needs: navigation, files, users, services, logs, and the differences that matter in an investigation.',
      objectives: [
        'Navigate and manage files from the Linux shell',
        'Manage users, permissions and services on Linux',
        'Understand Windows accounts, the registry and the event log at a basic level',
        'Locate where each OS records security-relevant events',
      ],
      nice: {
        competencies: ['Operating Systems Concepts', 'System Administration'],
        workRoles: ['Cyber Defense Analyst', 'System Administrator'],
      },
      prerequisites: ['cp-m2'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cp-m3-l1',
          title: 'The Linux Shell: Survival Skills',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Move around, read and search files, and chain commands with pipes.',
          objectives: ['Navigate the filesystem and read/search files', 'Use pipes and redirection'],
          blocks: [],
        },
        {
          id: 'cp-m3-l2',
          title: 'Users, Permissions & sudo',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'Managing identity and privilege on Linux — the heart of least privilege.',
          objectives: ['Create/manage users and groups', 'Apply least privilege with sudo'],
          blocks: [],
        },
        {
          id: 'cp-m3-l3',
          title: 'Services, Processes & Logs on Linux',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Where Linux records what happened — your first stop in any investigation.',
          objectives: ['Inspect running services and processes', 'Find and read system/auth logs'],
          blocks: [],
          labIds: ['log-flag'],
        },
        {
          id: 'cp-m3-l4',
          title: 'Windows Internals for Defenders',
          kind: 'theory',
          estimatedMinutes: 15,
          summary: 'Accounts, the registry, and the Windows Event Log.',
          objectives: ['Explain Windows accounts and the registry', 'Locate key Event Log channels'],
          blocks: [],
        },
      ],
      assessment: {
        id: 'cp-m3-assessment',
        title: 'OS Hands-On Check',
        type: 'lab-challenge',
        description: 'Complete a set of guided shell tasks and locate a security event in the logs.',
        passThreshold: 0.8,
        estimatedMinutes: 35,
      },
    },

    /* -------- M4: Scripting & Automation (structural) ------------ */
    {
      id: 'cp-m4',
      title: 'Scripting & Automation with Python & Bash',
      tagline: 'Automate the boring parts; speak the language of tooling.',
      stage: 1,
      estimatedHours: 24,
      summary:
        'Enough Bash and Python to parse logs, call APIs, and automate repetitive analyst work — the multiplier that separates good analysts from great ones.',
      objectives: [
        'Write Bash one-liners to filter and transform text/logs',
        'Write small Python scripts with variables, loops, conditionals and functions',
        'Parse a log file and extract indicators with Python',
        'Call a simple REST API and handle the JSON response',
      ],
      nice: {
        competencies: ['Scripting', 'Data Analysis'],
        workRoles: ['Cyber Defense Analyst', 'Vulnerability Assessment Analyst'],
      },
      prerequisites: ['cp-m3'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cp-m4-l1',
          title: 'Bash for Log Wrangling',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'grep, cut, sort, uniq, pipes — turn a noisy log into an answer.',
          objectives: ['Filter and count log events with core CLI tools'],
          blocks: [],
        },
        {
          id: 'cp-m4-l2',
          title: 'Python Basics',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Variables, control flow, functions and data structures.',
          objectives: ['Write a Python script using loops, conditionals and functions'],
          blocks: [],
        },
        {
          id: 'cp-m4-l3',
          title: 'Parsing Logs with Python',
          kind: 'project',
          estimatedMinutes: 30,
          summary: 'Build a small script that reads an auth log and reports failed-login counts per IP.',
          objectives: ['Read a file, parse lines, aggregate, and print a report'],
          blocks: [],
        },
        {
          id: 'cp-m4-l4',
          title: 'Talking to APIs (JSON)',
          kind: 'interactive',
          estimatedMinutes: 15,
          summary: 'Call a REST endpoint and handle the response — the basis of threat-intel lookups.',
          objectives: ['Make an HTTP request in Python and parse JSON'],
          blocks: [],
        },
      ],
      assessment: {
        id: 'cp-m4-assessment',
        title: 'Automation Mini-Project',
        type: 'project',
        description:
          'Submit a working Python script that parses a provided log and outputs a summary report, plus a short README. Peer + mentor reviewed.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },

    /* ============================================================== */
    /* STAGE 2 · CORE SECURITY                                         */
    /* ============================================================== */

    /* -------- M5: Security First Principles (rich sample) --------- */
    {
      id: 'cp-m5',
      title: 'Security First Principles',
      tagline: 'Threats, risk, defense-in-depth and the crypto you must know.',
      stage: 2,
      estimatedHours: 20,
      summary:
        'The conceptual backbone of the field: threat actors and attack lifecycle, risk = likelihood × impact, defense-in-depth, authentication vs authorization, and practical cryptography (hashing, symmetric/asymmetric, TLS).',
      objectives: [
        'Describe common threat actors and the stages of an attack',
        'Express risk as likelihood × impact and prioritize accordingly',
        'Explain authentication, authorization and defense-in-depth',
        'Distinguish hashing, symmetric and asymmetric encryption and where each is used',
      ],
      nice: {
        competencies: ['Cybersecurity Fundamentals', 'Cryptography'],
        workRoles: ['Cyber Defense Analyst', 'Security Control Assessor'],
      },
      prerequisites: ['cp-m4'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cp-m5-l1',
          title: 'Threat Actors & the Attack Lifecycle',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'Who attacks, why, and the predictable phases they move through.',
          objectives: [
            'Name common threat-actor types and motivations',
            'Outline the phases of an attack (recon → access → actions)',
          ],
          blocks: [
            {
              id: 'cp-m5-l1-b1',
              type: 'concept',
              title: 'Attacks follow a pattern',
              body:
                'Real intrusions are not single events; they unfold in stages: **reconnaissance**, **initial access**, **execution/persistence**, **privilege escalation**, **lateral movement**, and finally **actions on objectives** (steal, encrypt, disrupt). Frameworks like MITRE ATT&CK catalog the techniques used at each stage — which is exactly how SOC teams structure detection.',
            },
            {
              id: 'cp-m5-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'Defenders think in kill-chains',
              body:
                'Because attacks are staged, defenders get **multiple chances** to catch them. You do not need to block recon if you can detect lateral movement. This is why "defense-in-depth" works.',
            },
            {
              id: 'cp-m5-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'An attacker who already has a foothold uses stolen credentials to access other machines on the network. Which phase is this?',
                options: [
                  { id: 'a', label: 'Reconnaissance' },
                  { id: 'b', label: 'Lateral movement' },
                  { id: 'c', label: 'Initial access' },
                  { id: 'd', label: 'Actions on objectives' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'Moving from one compromised host to others using stolen access is lateral movement — a high-value detection opportunity.',
              },
            },
          ],
        },
        {
          id: 'cp-m5-l2',
          title: 'Risk = Likelihood × Impact',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'How professionals decide what to fix first when everything looks urgent.',
          objectives: ['Score a risk by likelihood and impact', 'Prioritize a backlog of findings'],
          blocks: [],
        },
        {
          id: 'cp-m5-l3',
          title: 'Authentication, Authorization & Defense-in-Depth',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'Proving who you are vs what you may do, and layering controls.',
          objectives: ['Distinguish authN from authZ', 'Describe layered controls for a scenario'],
          blocks: [],
        },
        {
          id: 'cp-m5-l4',
          title: 'Practical Cryptography',
          kind: 'theory',
          estimatedMinutes: 15,
          summary: 'Hashing, symmetric vs asymmetric, and what TLS actually gives you.',
          objectives: [
            'Explain hashing vs encryption and where each is used',
            'Describe how TLS protects a web request',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'cp-m5-assessment',
        title: 'Principles Quiz + Risk Write-Up',
        type: 'quiz',
        description:
          'Concept quiz plus a short risk-ranking exercise where you justify priorities in writing (soft-skill + technical).',
        passThreshold: 0.8,
        estimatedMinutes: 25,
      },
    },

    /* -------- M6: Blue Team Basics (rich sample lesson) ----------- */
    {
      id: 'cp-m6',
      title: 'Blue Team Basics: SOC, Logs & SIEM',
      tagline: 'Step into the analyst’s chair: monitor, triage, respond.',
      stage: 2,
      estimatedHours: 26,
      summary:
        'How a Security Operations Center works: log sources, SIEM, alert triage with MITRE ATT&CK, brute-force and exfiltration detection, and writing a clean incident note.',
      objectives: [
        'Explain SOC tiers and the alert lifecycle',
        'Triage alerts using the MITRE ATT&CK framework',
        'Detect brute-force and data-exfiltration patterns in log/flow data',
        'Write a clear, concise incident summary a manager can act on',
      ],
      nice: {
        competencies: ['Incident Detection', 'Log Analysis', 'Threat Analysis'],
        workRoles: ['Cyber Defense Analyst', 'Cyber Defense Incident Responder'],
      },
      prerequisites: ['cp-m5'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cp-m6-l1',
          title: 'Inside a SOC: People, Process, Tooling',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'Tiers, shifts, the SIEM, and the alert lifecycle from detection to closure.',
          objectives: ['Describe SOC tiers and roles', 'Walk an alert through its lifecycle'],
          blocks: [
            {
              id: 'cp-m6-l1-b1',
              type: 'concept',
              title: 'What a SOC actually does',
              body:
                'A Security Operations Center watches an organization’s systems around the clock. **Log sources** (servers, firewalls, endpoints) feed a **SIEM** (Splunk / ELK / Microsoft Sentinel) that correlates events and raises **alerts**. **Tier 1** analysts triage alerts, **Tier 2** investigates the real ones, **Tier 3 / IR** handles confirmed incidents.',
            },
            {
              id: 'cp-m6-l1-b2',
              type: 'callout',
              variant: 'india',
              title: 'The Indian entry path',
              body:
                'SOC Analyst (L1) is the single most common entry-level cybersecurity role hired in India, and the most realistic first job for graduates of this program. Many professionals (≈56% globally) move into security from an IT role — your foundation modules are exactly that bridge.',
            },
            {
              id: 'cp-m6-l1-b3',
              type: 'check',
              question: {
                prompt: 'In a typical SOC, who first reviews and triages incoming alerts?',
                options: [
                  { id: 'a', label: 'Tier 3 / Incident Response' },
                  { id: 'b', label: 'Tier 1 analysts' },
                  { id: 'c', label: 'The CISO' },
                  { id: 'd', label: 'External auditors' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'Tier 1 analysts triage the alert queue, escalating genuine threats to Tier 2/3. This is the role most of you are training toward first.',
              },
            },
          ],
        },
        {
          id: 'cp-m6-l2',
          title: 'Reading Logs & Triaging with MITRE ATT&CK',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary: 'Map observed behavior to ATT&CK techniques, then find the flag in a noisy log.',
          objectives: ['Map an event to an ATT&CK technique', 'Extract an indicator from a log'],
          blocks: [
            {
              id: 'cp-m6-l2-b1',
              type: 'lab',
              title: 'Lab: Find the Flag in the Log File',
              labId: 'log-flag',
              body: 'Isolate the one meaningful line from the noise — core SOC skill #1.',
            },
          ],
          labIds: ['log-flag'],
        },
        {
          id: 'cp-m6-l3',
          title: 'Detecting Brute Force',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Spot the failed-login spike and identify the attacking source.',
          objectives: ['Recognize a brute-force pattern', 'Identify the offending source IP'],
          blocks: [
            {
              id: 'cp-m6-l3-b1',
              type: 'lab',
              title: 'Lab: Detect the Brute-Force Attempt',
              labId: 'brute-force',
              body: 'A wall of login events just hit your SIEM. Find the attacker.',
            },
          ],
          labIds: ['brute-force'],
        },
        {
          id: 'cp-m6-l4',
          title: 'Detecting Data Exfiltration',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Find the abnormal outbound transfer hiding in netflow.',
          objectives: ['Distinguish normal vs anomalous egress volume', 'Flag the exfiltrating host'],
          blocks: [
            {
              id: 'cp-m6-l4-b1',
              type: 'lab',
              title: 'Lab: Spot the Data Exfiltration',
              labId: 'exfil-spot',
              body: 'One host just pushed gigabytes to an unknown IP. Find it and justify isolating it.',
            },
          ],
          labIds: ['exfil-spot'],
        },
        {
          id: 'cp-m6-l5',
          title: 'Writing the Incident Note',
          kind: 'project',
          estimatedMinutes: 25,
          summary:
            'Turn your brute-force + exfil findings into a 1-page incident summary: what, when, impact, recommendation.',
          objectives: [
            'Structure an incident note (summary, timeline, impact, recommendation)',
            'Communicate technical findings to a non-technical reader',
          ],
          blocks: [
            {
              id: 'cp-m6-l5-b1',
              type: 'reflection',
              title: 'Deliverable',
              body:
                'Write a one-page incident note for the two events you investigated. Lead with a one-sentence summary a manager can read in 10 seconds, then the timeline, impact, and your recommended action. This goes in your portfolio.',
            },
          ],
        },
      ],
      assessment: {
        id: 'cp-m6-assessment',
        title: 'SOC Triage Simulation',
        type: 'lab-challenge',
        description:
          'A timed mini-shift: triage a queue of alerts, identify the two real incidents, and submit an incident note. Scored on accuracy + clarity of write-up.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },

    /* -------- M7: Offensive Basics (structural) ------------------ */
    {
      id: 'cp-m7',
      title: 'Offensive Basics: Recon, Web & Exploitation',
      tagline: 'Learn how attacks work so you can detect and stop them.',
      stage: 2,
      estimatedHours: 24,
      summary:
        'Authorized, hands-on offensive fundamentals: reconnaissance, the OWASP Top 10 mindset, parameter tampering, and an intro to a vulnerable-by-design target — always ethically, always in your lab.',
      objectives: [
        'Perform passive and active reconnaissance on an authorized target',
        'Explain the OWASP Top 10 categories at a working level',
        'Exploit a simple client-trust flaw (parameter tampering)',
        'Understand the ethics and legal boundaries of offensive work',
      ],
      nice: {
        competencies: ['Vulnerability Assessment', 'Penetration Testing'],
        workRoles: ['Vulnerability Assessment Analyst', 'Penetration Tester'],
      },
      prerequisites: ['cp-m6'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cp-m7-l1',
          title: 'Ethics, Law & Scope (Read This First)',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'Authorization, scope, and the IT Act — the rules that keep offensive work legal.',
          objectives: ['State what makes a test legal', 'Explain scope and rules of engagement'],
          blocks: [],
        },
        {
          id: 'cp-m7-l2',
          title: 'Reconnaissance',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Passive vs active recon and the tooling that maps an attack surface.',
          objectives: ['Gather open-source intel', 'Enumerate hosts/services on an authorized target'],
          blocks: [],
        },
        {
          id: 'cp-m7-l3',
          title: 'The OWASP Top 10 Mindset',
          kind: 'theory',
          estimatedMinutes: 15,
          summary: 'The ten most common web weaknesses and how attackers think about each.',
          objectives: ['Recognize each OWASP Top 10 category', 'Map a flaw to its category'],
          blocks: [],
        },
        {
          id: 'cp-m7-l4',
          title: 'Exploit a Client-Trust Flaw',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Tamper a trusted parameter to break an app that trusts the client too much.',
          objectives: ['Exploit parameter tampering', 'Explain the fix (never trust client input)'],
          blocks: [
            {
              id: 'cp-m7-l4-b1',
              type: 'lab',
              title: 'Lab: Parameter Tampering Mini-CTF',
              labId: 'param-tamper',
              body: 'The price comes from the URL. Tamper it to unlock the flag — then describe the fix.',
            },
          ],
          labIds: ['param-tamper'],
        },
      ],
      assessment: {
        id: 'cp-m7-assessment',
        title: 'Find-and-Report Challenge',
        type: 'lab-challenge',
        description:
          'Discover a planted vulnerability in a sandbox app and write a short finding (impact + remediation) — the bridge to professional pentest reporting.',
        passThreshold: 0.8,
        estimatedMinutes: 45,
      },
    },

    /* -------- M8: Governance, Law & Compliance (structural) ------ */
    {
      id: 'cp-m8',
      title: 'Governance, Law & Compliance',
      tagline: 'The rules of the game: frameworks, laws and audits.',
      stage: 2,
      estimatedHours: 16,
      summary:
        'Security frameworks (ISO 27001, NIST CSF), India’s IT Act and DPDP Act, GDPR basics, and how a control maps to a real audit finding.',
      objectives: [
        'Describe ISO 27001 and the NIST CSF at a working level',
        'Summarize India’s IT Act and DPDP Act obligations',
        'Map an audit finding to the control that remediates it',
        'Explain why compliance and security are related but not the same',
      ],
      nice: {
        competencies: ['Security Governance', 'Risk Management', 'Compliance'],
        workRoles: ['Security Control Assessor', 'Privacy Compliance Manager'],
      },
      prerequisites: ['cp-m7'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cp-m8-l1',
          title: 'Frameworks: ISO 27001 & NIST CSF',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'What frameworks are for and how the two best-known ones are structured.',
          objectives: ['Explain the purpose of a control framework', 'Outline ISO 27001 and NIST CSF'],
          blocks: [],
        },
        {
          id: 'cp-m8-l2',
          title: 'Law in India: IT Act & DPDP, plus GDPR',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'Core legal obligations for handling data in and beyond India.',
          objectives: ['Summarize IT Act/DPDP duties', 'Compare with GDPR at a high level'],
          blocks: [],
        },
        {
          id: 'cp-m8-l3',
          title: 'From Finding to Control',
          kind: 'interactive',
          estimatedMinutes: 14,
          summary: 'Map a real audit finding to the control that closes the gap.',
          objectives: ['Match a finding to the correct control', 'Justify the mapping'],
          blocks: [
            {
              id: 'cp-m8-l3-b1',
              type: 'lab',
              title: 'Lab: Map the Control to the Compliance Gap',
              labId: 'grc-control',
              body: 'An auditor flagged a finding. Pick the control that remediates it and explain why.',
            },
          ],
          labIds: ['grc-control'],
        },
      ],
      assessment: {
        id: 'cp-m8-assessment',
        title: 'Control-Mapping Quiz',
        type: 'quiz',
        description: 'Match findings to controls and frameworks; short written justification on two items.',
        passThreshold: 0.8,
        estimatedMinutes: 25,
      },
    },

    /* ============================================================== */
    /* STAGE 3 · SPECIALIZATION BRIDGE                                 */
    /* ============================================================== */
    {
      id: 'cp-m9',
      title: 'Choose Your Specialization',
      tagline: 'Pick a lane and go deep — with guidance.',
      stage: 3,
      estimatedHours: 30,
      summary:
        'A guided decision module: a taster of each track (SOC/DFIR, Pentest/Red, Cloud, GRC) using the salary/effort estimator and a self-assessment, then a deep first unit of your chosen track. Graduates continue into the matching specialist course.',
      objectives: [
        'Compare the four tracks by interest, intensity and outcomes',
        'Use the salary/effort estimator to set a realistic plan',
        'Complete a deep first unit in your chosen specialization',
        'Produce a personal learning plan toward your target role',
      ],
      nice: {
        competencies: ['Career Planning', 'Specialized Skill Development'],
        workRoles: ['Cyber Defense Analyst', 'Penetration Tester', 'Cloud Security Engineer', 'Security Control Assessor'],
      },
      prerequisites: ['cp-m8'],
      masteryRequired: false,
      lessons: [
        {
          id: 'cp-m9-l1',
          title: 'The Four Tracks, Honestly Compared',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'Day-in-the-life, intensity and earning trajectory for each track.',
          objectives: ['Describe each track realistically', 'Identify which fit your strengths'],
          blocks: [],
        },
        {
          id: 'cp-m9-l2',
          title: 'Plan Your Path (Estimator + Self-Assessment)',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Use the on-site estimator and a structured self-assessment to commit to a track.',
          objectives: ['Set a time-to-job plan', 'Choose a specialization with reasons'],
          blocks: [],
        },
        {
          id: 'cp-m9-l3',
          title: 'Deep Dive: First Unit of Your Track',
          kind: 'project',
          estimatedMinutes: 40,
          summary:
            'Branch into the opening module of your chosen specialist course (SOC, AppSec/Offensive, Cloud or GRC) and complete its first hands-on unit.',
          objectives: ['Complete a real specialist unit', 'Confirm your track choice with evidence'],
          blocks: [],
        },
      ],
      assessment: {
        id: 'cp-m9-assessment',
        title: 'Specialization Readiness',
        type: 'peer-review',
        description:
          'Submit a one-page personal learning plan (target role, track, certs, timeline) for mentor + peer review.',
        passThreshold: 0.8,
        estimatedMinutes: 30,
      },
    },
  ],

  /* ============================================================== */
  /* EMBEDDED WORK EXPERIENCE — the differentiator                   */
  /* ============================================================== */
  workExperience: {
    id: 'cp-practicum',
    title: 'The Cyber Vidya Practicum',
    format: 'Simulated SOC shifts + supervised live client micro-project',
    durationWeeks: 6,
    summary:
      'A structured, apprenticeship-style phase that turns a trained learner into a day-one-productive hire. Learners work realistic tickets in a simulated SOC, then contribute to a real, scoped, low-risk client engagement under mentor supervision — producing portfolio artifacts an employer can verify.',
    activities: [
      'Run simulated SOC shifts: triage an alert queue against SLAs, escalate real incidents',
      'Participate in a live-fire range exercise (a red team injects, you detect & respond)',
      'Contribute to a supervised client micro-project (e.g. a scoped vulnerability assessment or a control-gap review for a partner SME/NGO)',
      'Attend stand-ups and a sprint retro to practice professional working rhythm',
      'Present findings to a "client" panel (mentors role-playing stakeholders)',
    ],
    deliverables: [
      'A portfolio of 3+ incident notes from simulated shifts',
      'One professional finding/assessment report from the client micro-project',
      'A recorded 5-minute findings presentation',
      'A mentor-signed competency sign-off mapped to NICE work-role tasks',
    ],
    mentorship:
      'Each learner is paired with an industry-certified mentor for the duration; daily async check-ins, two live reviews per week, and a final assessed debrief.',
    competencies: [
      'Incident Detection',
      'Incident Response',
      'Vulnerability Assessment',
      'Security Reporting',
      'Stakeholder Communication',
    ],
    softSkills: [
      'Professional written communication (reports, tickets)',
      'Verbal communication & presenting to stakeholders',
      'Teamwork and working to SLAs/deadlines',
      'Problem-solving under realistic constraints',
    ],
  },

  /* ============================================================== */
  /* BADGES (Open-Badges-style micro-credentials)                    */
  /* ============================================================== */
  badges: [
    {
      id: 'cp-badge-foundation',
      title: 'Foundations Certified',
      description: 'Completed Stage 1: IT, networking, OS and scripting foundations.',
      criteria: 'Pass the mastery checks for Modules 1–4.',
      icon: 'shield',
    },
    {
      id: 'cp-badge-core',
      title: 'Core Security Practitioner',
      description: 'Completed Stage 2: blue + offensive basics and compliance.',
      criteria: 'Pass the mastery checks for Modules 5–8.',
      icon: 'monitor',
    },
    {
      id: 'cp-badge-soc-triage',
      title: 'SOC Triage Operator',
      description: 'Demonstrated alert triage and incident write-up in the SOC simulation.',
      criteria: 'Score ≥80% on the SOC Triage Simulation (M6).',
      icon: 'target',
    },
    {
      id: 'cp-badge-practicum',
      title: 'Work-Ready (Practicum Complete)',
      description: 'Completed the Cyber Vidya Practicum with a mentor-signed competency sign-off.',
      criteria: 'Complete all practicum deliverables and pass the assessed debrief.',
      icon: 'career',
    },
    {
      id: 'cp-badge-graduate',
      title: 'Program Graduate',
      description: 'Completed the full Career-Oriented Cybersecurity Program and capstone.',
      criteria: 'Earn all module badges, the practicum badge, and pass the capstone.',
      icon: 'cert',
    },
  ],

  /* ============================================================== */
  /* CAPSTONE                                                         */
  /* ============================================================== */
  capstone: {
    id: 'cp-capstone',
    title: 'Career Capstone: End-to-End Defense Case',
    type: 'project',
    description:
      'A multi-day capstone: given a simulated organization, the learner reconnoiters the environment, identifies and prioritizes risks, detects a planted incident, responds, and delivers (1) a technical incident report, (2) a prioritized remediation roadmap mapped to a framework, and (3) a stakeholder presentation. Assessed by mentors against the NICE work-role competencies and added to the learner’s portfolio. Aligns with Security+ exam readiness.',
    passThreshold: 0.8,
    estimatedMinutes: 600,
  },
}
