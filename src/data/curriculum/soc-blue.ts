import type { CourseCurriculum } from '../../types'

/**
 * SPECIALIST COURSE — SOC Analyst / Blue Team (course id: soc-blue).
 *
 * Beginner-friendly, 10–12 week path to a SOC Analyst (L1/L2) role: log
 * analysis & SIEM, alert triage with MITRE ATT&CK, incident response
 * playbooks, and an introduction to threat intelligence & hunting. Anchored
 * to CompTIA Security+ now and GIAC GCIH next.
 *
 * Authored at STRUCTURAL depth: every module carries full metadata and every
 * lesson its title/kind/minutes/objectives/summary. The most important lessons
 * embed real `lab` blocks plus representative concept/check/reflection blocks
 * to demonstrate content; the rest carry `blocks: []` ready to be fleshed in
 * the same shape as the flagship (src/data/curriculum/career-program.ts).
 *
 * Pedagogy baked into the shape (see docs/curriculum/README.md):
 *  - Micro-learning: theory lessons are 7–15 min; labs/projects longer.
 *  - Every module interleaves theory → worked example → lab → retrieval check.
 *  - Mastery gating: pass the module assessment (≥80%) to unlock the next.
 *  - Soft skills via reflection/write-up blocks throughout.
 *  - NICE Work Role + Competency mapping on every module.
 *  - The embedded work-experience phase is the differentiator.
 */
export const socBlueCurriculum: CourseCurriculum = {
  courseId: 'soc-blue',
  title: 'SOC Analyst / Blue Team',
  format: 'Online · Hybrid (self-paced + cohort mentorship)',
  totalEstimatedHours: 130,
  weeklyCommitment: '10–12 hrs/week (≈10–12 weeks)',
  outcomeRole: 'SOC Analyst (L1/L2) / Security Operations Engineer',
  capstoneCert: 'CompTIA Security+ (GIAC GCIH next)',
  niceWorkRoles: [
    'Cyber Defense Analyst',
    'Cyber Defense Incident Responder',
    'Threat/Warning Analyst',
  ],

  modules: [
    /* ============================================================== */
    /* STAGE 2 · CORE SOC                                              */
    /* ============================================================== */

    /* -------- M1: Inside the SOC (rich sample lesson) ------------- */
    {
      id: 'soc-m1',
      title: 'Inside the SOC: People, Process & Tooling',
      tagline: 'Step into the analyst’s chair and learn how a 24×7 SOC runs.',
      stage: 2,
      estimatedHours: 16,
      summary:
        'How a Security Operations Center actually works: log sources and the SIEM, the alert lifecycle, SOC tiers and shifts, SLAs, and the metrics analysts are measured on. This is the map for everything that follows.',
      objectives: [
        'Describe SOC tiers, shifts and the alert lifecycle from detection to closure',
        'Explain how log sources feed a SIEM (Splunk / ELK / Sentinel)',
        'Define core SOC metrics: MTTD, MTTR, true/false positives and SLAs',
        'Understand the L1 analyst role and the realistic Indian entry path into it',
      ],
      nice: {
        competencies: ['Incident Detection', 'Security Operations'],
        workRoles: ['Cyber Defense Analyst', 'Threat/Warning Analyst'],
      },
      prerequisites: ['Basic networking and OS literacy (or the Foundations program)'],
      masteryRequired: true,
      lessons: [
        {
          id: 'soc-m1-l1',
          title: 'What a SOC Does',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'Log sources, the SIEM, and the people who watch systems around the clock.',
          objectives: [
            'Explain the purpose of a SOC and a SIEM',
            'Name common log sources and what each tells you',
            'Describe the L1 analyst’s day-to-day responsibilities',
          ],
          blocks: [
            {
              id: 'soc-m1-l1-b1',
              type: 'concept',
              title: 'The watch floor',
              body:
                'A Security Operations Center watches an organization’s systems around the clock. **Log sources** — servers, firewalls, endpoints (EDR), identity providers, cloud platforms — stream events into a **SIEM** (Security Information and Event Management; commonly **Splunk**, the **ELK** stack, or **Microsoft Sentinel**). The SIEM correlates those events against detection rules and raises **alerts**. Analysts triage the alerts, decide what is real, and respond.',
            },
            {
              id: 'soc-m1-l1-b2',
              type: 'callout',
              variant: 'india',
              title: 'The Indian entry path',
              body:
                'SOC Analyst (L1) is the single most common entry-level cybersecurity role hired in India, and the most realistic first job for graduates of this course. Many professionals move into security from an IT/helpdesk role first — strong log-reading and clear write-ups are exactly what gets you hired and promoted to L2.',
            },
            {
              id: 'soc-m1-l1-b3',
              type: 'check',
              question: {
                prompt: 'What is the primary job of a SIEM in a SOC?',
                options: [
                  { id: 'a', label: 'To block all malicious traffic at the firewall' },
                  { id: 'b', label: 'To collect and correlate log events and raise alerts' },
                  { id: 'c', label: 'To encrypt the organization’s data at rest' },
                  { id: 'd', label: 'To patch vulnerable systems automatically' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'The SIEM aggregates logs from many sources, correlates them against detection rules, and surfaces alerts for analysts to triage. It detects and centralizes — it does not block or patch on its own.',
              },
            },
          ],
        },
        {
          id: 'soc-m1-l2',
          title: 'Tiers, Shifts & the Alert Lifecycle',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'How an alert travels from L1 triage to L2 investigation to L3/IR.',
          objectives: [
            'Describe SOC tiers (L1/L2/L3) and what escalates between them',
            'Walk an alert through its full lifecycle to closure',
          ],
          blocks: [
            {
              id: 'soc-m1-l2-b1',
              type: 'concept',
              title: 'Tier 1 → Tier 2 → Tier 3',
              body:
                '**Tier 1** analysts triage the alert queue against SLAs: confirm, dismiss false positives, and escalate genuine threats. **Tier 2** investigates the real ones in depth — pivoting across log sources to scope the activity. **Tier 3 / IR** handles confirmed incidents and threat hunting. An alert’s lifecycle is: **detected → triaged → investigated → contained/responded → closed**, with notes recorded at every step.',
            },
            {
              id: 'soc-m1-l2-b2',
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
                  'Tier 1 analysts triage the alert queue, escalating genuine threats to Tier 2/3. This is the role this course trains you toward first.',
              },
            },
          ],
        },
        {
          id: 'soc-m1-l3',
          title: 'SOC Metrics & SLAs',
          kind: 'theory',
          estimatedMinutes: 10,
          summary: 'MTTD, MTTR, true/false positives and the SLAs that drive analyst behavior.',
          objectives: [
            'Define MTTD, MTTR and the true/false positive/negative matrix',
            'Explain how SLAs shape triage priorities',
          ],
          blocks: [],
        },
        {
          id: 'soc-m1-l4',
          title: 'Your First SIEM Search',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary: 'Tour a SIEM interface and run a basic search to find a meaningful event.',
          objectives: [
            'Navigate a SIEM and run a simple query',
            'Isolate one meaningful line from a noisy log',
          ],
          blocks: [
            {
              id: 'soc-m1-l4-b1',
              type: 'concept',
              title: 'Search is the core skill',
              body:
                'Whether you use Splunk SPL, an ELK/Kibana query, or Sentinel KQL, the daily loop is the same: **filter** down to relevant events, **aggregate** to spot patterns, then **pivot** on an interesting field (an IP, a user, a host) to expand the picture. Most of an analyst’s value is asking the right narrowing question quickly.',
            },
            {
              id: 'soc-m1-l4-b2',
              type: 'lab',
              title: 'Lab: Find the Flag in the Log File',
              labId: 'log-flag',
              body: 'Apply it now: cut through the noise and isolate the one line that matters.',
            },
          ],
          labIds: ['log-flag'],
        },
      ],
      assessment: {
        id: 'soc-m1-assessment',
        title: 'SOC Fundamentals Check',
        type: 'quiz',
        description:
          'Quiz on SOC structure, the alert lifecycle, SIEM basics and metrics, plus one short-answer item explaining the L1→L2 escalation decision. ≥80% unlocks Module 2.',
        passThreshold: 0.8,
        estimatedMinutes: 20,
      },
    },

    /* -------- M2: Log Analysis & SIEM (rich sample lesson) -------- */
    {
      id: 'soc-m2',
      title: 'Log Analysis & SIEM Foundations',
      tagline: 'Read logs like a detective — across Linux, Windows, network and cloud.',
      stage: 2,
      estimatedHours: 24,
      summary:
        'The bread-and-butter analyst skill: normal vs anomalous behavior across log sources, then querying a SIEM (Splunk SPL / ELK / Sentinel KQL) to extract indicators, count events, and build a simple detection.',
      objectives: [
        'Read Linux auth/syslog, Windows Event Log, and network/HTTP logs',
        'Distinguish normal baseline activity from anomalies',
        'Write SIEM queries to filter, aggregate and pivot on events',
        'Extract indicators of compromise (IPs, hashes, user-agents) from raw logs',
      ],
      nice: {
        competencies: ['Log Analysis', 'Threat Analysis'],
        workRoles: ['Cyber Defense Analyst', 'Threat/Warning Analyst'],
      },
      prerequisites: ['soc-m1'],
      masteryRequired: true,
      lessons: [
        {
          id: 'soc-m2-l1',
          title: 'Log Sources & What They Tell You',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'The key log sources an analyst lives in and the security signal each carries.',
          objectives: [
            'Map a log source to the activity it records',
            'Identify which source answers a given investigative question',
          ],
          blocks: [
            {
              id: 'soc-m2-l1-b1',
              type: 'concept',
              title: 'Every source answers a question',
              body:
                'Each log source answers a different question. **Auth logs** (Linux `/var/log/auth.log`, Windows Security Event Log) answer *who logged in, from where, and did it succeed?* **Network/firewall/proxy logs** answer *what talked to what, and how much?* **Endpoint/EDR** answers *what ran on this machine?* **DNS logs** answer *what names were resolved?* A good analyst knows which source to open first for a given alert.',
            },
            {
              id: 'soc-m2-l1-b2',
              type: 'callout',
              variant: 'industry',
              title: 'Master the baseline first',
              body:
                'You cannot recognize abnormal until you know normal. Before hunting for attacks, learn what a healthy day looks like for each source — expected login hours, typical egress volumes, common user-agents. Anomalies then jump off the page.',
            },
          ],
        },
        {
          id: 'soc-m2-l2',
          title: 'Reading Windows & Linux Auth Logs',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Key Windows Event IDs (4624/4625/4672) and Linux auth lines, in practice.',
          objectives: [
            'Interpret common Windows logon Event IDs',
            'Read Linux auth/sshd log lines and spot failed logins',
          ],
          blocks: [],
        },
        {
          id: 'soc-m2-l3',
          title: 'Inspecting HTTP & Web Traffic',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Dissect a captured request/response and interpret what the server is telling you.',
          objectives: [
            'Identify method, headers, status code and suspicious indicators in an HTTP exchange',
            'Flag an anomalous request from web/proxy logs',
          ],
          blocks: [
            {
              id: 'soc-m2-l3-b1',
              type: 'concept',
              title: 'Anatomy of an HTTP exchange',
              body:
                'A request has a **method** (GET/POST/…), a **path**, **headers** (metadata like `User-Agent` and `Authorization`), and an optional **body**. The response leads with a **status code**: 2xx success, 3xx redirect, 4xx client error, 5xx server error. Odd user-agents, long encoded query strings, and bursts of 4xx/5xx are classic signals worth a closer look.',
            },
            {
              id: 'soc-m2-l3-b2',
              type: 'lab',
              title: 'Lab: Inspect a Fake HTTP Request',
              labId: 'http-inspect',
              body: 'Read the captured request/response and decide what the server is telling you.',
            },
          ],
          labIds: ['http-inspect'],
        },
        {
          id: 'soc-m2-l4',
          title: 'Querying the SIEM: Filter, Aggregate, Pivot',
          kind: 'interactive',
          estimatedMinutes: 22,
          summary: 'The query loop in Splunk SPL / ELK / Sentinel KQL that powers every investigation.',
          objectives: [
            'Filter events down to a relevant set',
            'Aggregate to surface patterns, then pivot on a field',
          ],
          blocks: [],
        },
        {
          id: 'soc-m2-l5',
          title: 'Extracting Indicators of Compromise',
          kind: 'project',
          estimatedMinutes: 30,
          summary: 'Pull IPs, hashes and user-agents from a raw log and assemble an IOC list.',
          objectives: [
            'Identify and extract IOCs from messy log data',
            'Organize indicators for handoff/enrichment',
          ],
          blocks: [
            {
              id: 'soc-m2-l5-b1',
              type: 'reflection',
              title: 'Explain your evidence',
              body:
                'For each indicator you extracted, write one sentence stating why it is suspicious and which log line is your evidence. Being able to justify an IOC in plain language is what separates an L1 who escalates noise from one who escalates signal.',
            },
          ],
        },
      ],
      assessment: {
        id: 'soc-m2-assessment',
        title: 'Log Analysis Lab Challenge',
        type: 'lab-challenge',
        description:
          'Given a multi-source log set, identify the anomalous activity, extract the IOCs, and write the SIEM query that would detect it. Scored on accuracy and the clarity of your reasoning. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 40,
      },
    },

    /* -------- M3: Alert Triage with MITRE ATT&CK (rich sample) ---- */
    {
      id: 'soc-m3',
      title: 'Alert Triage with MITRE ATT&CK',
      tagline: 'Turn a noisy alert queue into prioritized, defensible decisions.',
      stage: 2,
      estimatedHours: 22,
      summary:
        'The core L1/L2 workflow: the attack lifecycle, mapping observed behavior to MITRE ATT&CK tactics and techniques, separating true from false positives, and detecting two signature patterns — brute force and data exfiltration.',
      objectives: [
        'Outline the attack lifecycle and map behavior to ATT&CK tactics/techniques',
        'Triage an alert: confirm, dismiss, or escalate with justification',
        'Detect brute-force authentication patterns and identify the source',
        'Detect anomalous outbound transfers indicating data exfiltration',
      ],
      nice: {
        competencies: ['Threat Analysis', 'Incident Detection', 'Alert Triage'],
        workRoles: ['Cyber Defense Analyst', 'Threat/Warning Analyst'],
      },
      prerequisites: ['soc-m2'],
      masteryRequired: true,
      lessons: [
        {
          id: 'soc-m3-l1',
          title: 'The Attack Lifecycle & MITRE ATT&CK',
          kind: 'theory',
          estimatedMinutes: 14,
          summary: 'How intrusions unfold in stages, and how ATT&CK gives defenders a shared map.',
          objectives: [
            'Name the phases of an attack from recon to actions on objectives',
            'Explain how ATT&CK tactics and techniques structure detection',
          ],
          blocks: [
            {
              id: 'soc-m3-l1-b1',
              type: 'concept',
              title: 'Attacks follow a pattern',
              body:
                'Real intrusions unfold in stages: **reconnaissance**, **initial access**, **execution/persistence**, **privilege escalation**, **lateral movement**, and finally **actions on objectives** (steal, encrypt, disrupt). **MITRE ATT&CK** catalogs the real-world **techniques** used at each **tactic** — giving SOCs a common language to label what they see and to structure detection coverage.',
            },
            {
              id: 'soc-m3-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'Defenders think in kill-chains',
              body:
                'Because attacks are staged, defenders get **multiple chances** to catch them. You do not need to block recon if you can detect lateral movement. Mapping every alert to an ATT&CK technique tells you *where in the chain* you are — and how urgent it is.',
            },
            {
              id: 'soc-m3-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'An attacker who already has a foothold uses stolen credentials to access other machines on the network. Which ATT&CK tactic is this?',
                options: [
                  { id: 'a', label: 'Reconnaissance' },
                  { id: 'b', label: 'Lateral Movement' },
                  { id: 'c', label: 'Initial Access' },
                  { id: 'd', label: 'Exfiltration' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'Moving from one compromised host to others using stolen access is Lateral Movement — a high-value detection opportunity late enough in the chain to confirm a real intrusion.',
              },
            },
          ],
        },
        {
          id: 'soc-m3-l2',
          title: 'True vs False Positives: The Triage Decision',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'A repeatable framework for confirming, dismissing, or escalating an alert.',
          objectives: [
            'Apply a structured triage workflow to an alert',
            'Justify a dismiss/escalate decision with evidence',
          ],
          blocks: [],
        },
        {
          id: 'soc-m3-l3',
          title: 'Detecting Brute Force',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Spot the failed-login spike, identify the attacking source, map it to ATT&CK.',
          objectives: [
            'Recognize a brute-force authentication pattern',
            'Identify the offending source IP and the ATT&CK technique',
          ],
          blocks: [
            {
              id: 'soc-m3-l3-b1',
              type: 'lab',
              title: 'Lab: Detect the Brute-Force Attempt',
              labId: 'brute-force',
              body: 'A wall of login events just hit your SIEM. Find the attacker and justify escalating.',
            },
          ],
          labIds: ['brute-force'],
        },
        {
          id: 'soc-m3-l4',
          title: 'Detecting Data Exfiltration',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Find the abnormal outbound transfer hiding in network flow data.',
          objectives: [
            'Distinguish normal vs anomalous egress volume',
            'Flag the exfiltrating host and recommend containment',
          ],
          blocks: [
            {
              id: 'soc-m3-l4-b1',
              type: 'lab',
              title: 'Lab: Spot the Data Exfiltration',
              labId: 'exfil-spot',
              body: 'One host just pushed gigabytes to an unknown IP. Find it and justify isolating it.',
            },
          ],
          labIds: ['exfil-spot'],
        },
      ],
      assessment: {
        id: 'soc-m3-assessment',
        title: 'SOC Triage Simulation',
        type: 'lab-challenge',
        description:
          'A timed mini-shift: triage a queue of alerts, identify the real incidents (including a brute-force and an exfiltration case), map each to ATT&CK, and record your triage decisions. Scored on accuracy and justification. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 50,
      },
    },

    /* -------- M4: Incident Response Playbooks (structural) -------- */
    {
      id: 'soc-m4',
      title: 'Incident Response Playbooks',
      tagline: 'When an alert is real, follow the playbook — and write it down.',
      stage: 2,
      estimatedHours: 22,
      summary:
        'The NIST IR lifecycle (preparation → detection & analysis → containment, eradication & recovery → post-incident), how playbooks turn it into repeatable steps, and how to write the incident note that drives the response.',
      objectives: [
        'Walk the NIST incident-response lifecycle end to end',
        'Execute a playbook for a common incident type (phishing, malware, account compromise)',
        'Decide on and document containment actions',
        'Write a clear, concise incident note a manager can act on',
      ],
      nice: {
        competencies: ['Incident Response', 'Incident Handling', 'Security Reporting'],
        workRoles: ['Cyber Defense Incident Responder', 'Cyber Defense Analyst'],
      },
      prerequisites: ['soc-m3'],
      masteryRequired: true,
      lessons: [
        {
          id: 'soc-m4-l1',
          title: 'The Incident Response Lifecycle',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'NIST’s four phases and where the SOC fits in each.',
          objectives: [
            'Describe the four NIST IR phases',
            'Explain the SOC’s role in detection, analysis and containment',
          ],
          blocks: [
            {
              id: 'soc-m4-l1-b1',
              type: 'concept',
              title: 'Four phases, one loop',
              body:
                'The NIST incident-response lifecycle is: **(1) Preparation** — tooling, playbooks, contacts ready *before* anything happens; **(2) Detection & Analysis** — confirm and scope the incident; **(3) Containment, Eradication & Recovery** — stop the bleeding, remove the threat, restore service; **(4) Post-Incident Activity** — the lessons-learned that feed back into preparation. The loop only improves if step 4 is actually done.',
            },
          ],
        },
        {
          id: 'soc-m4-l2',
          title: 'Anatomy of a Playbook',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'How a playbook turns the lifecycle into checklist steps for a specific incident type.',
          objectives: [
            'Read and follow an incident playbook',
            'Identify the decision points and escalation triggers in a playbook',
          ],
          blocks: [],
        },
        {
          id: 'soc-m4-l3',
          title: 'Containment Decisions',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary: 'Isolate, disable, block — choosing the right containment with minimal collateral.',
          objectives: [
            'Choose an appropriate containment action for a scenario',
            'Weigh business impact against risk when containing',
          ],
          blocks: [],
        },
        {
          id: 'soc-m4-l4',
          title: 'Writing the Incident Note',
          kind: 'project',
          estimatedMinutes: 25,
          summary: 'Turn your findings into a one-page incident summary stakeholders can act on.',
          objectives: [
            'Structure an incident note (summary, timeline, impact, recommendation)',
            'Communicate technical findings to a non-technical reader',
          ],
          blocks: [
            {
              id: 'soc-m4-l4-b1',
              type: 'reflection',
              title: 'Deliverable',
              body:
                'Write a one-page incident note for an incident you investigated this course. Lead with a one-sentence summary a manager can read in 10 seconds, then the timeline, impact, and your recommended action. Clear write-ups are the soft skill that gets L1 analysts promoted — this goes in your portfolio.',
            },
          ],
        },
      ],
      assessment: {
        id: 'soc-m4-assessment',
        title: 'Incident Handling Simulation',
        type: 'lab-challenge',
        description:
          'Run a scripted incident end to end against a playbook: detect, analyze, contain, and submit an incident note. Scored on correct playbook execution and clarity of the write-up. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 55,
      },
    },

    /* ============================================================== */
    /* STAGE 3 · ADVANCED — INTEL & HUNTING                            */
    /* ============================================================== */

    /* -------- M5: Threat Intelligence (structural) --------------- */
    {
      id: 'soc-m5',
      title: 'Threat Intelligence Foundations',
      tagline: 'Context turns indicators into decisions.',
      stage: 3,
      estimatedHours: 18,
      summary:
        'What threat intelligence is and how a SOC consumes it: the intelligence types, IOCs vs TTPs, the Pyramid of Pain, feeds and enrichment, and how intel sharpens triage and detection.',
      objectives: [
        'Distinguish strategic, operational and tactical intelligence',
        'Explain the difference between IOCs and TTPs and why TTPs matter more',
        'Apply the Pyramid of Pain to prioritize detection effort',
        'Enrich an alert with threat-intel context to improve a triage decision',
      ],
      nice: {
        competencies: ['Threat Analysis', 'Cyber Threat Intelligence'],
        workRoles: ['Threat/Warning Analyst', 'Cyber Defense Analyst'],
      },
      prerequisites: ['soc-m4'],
      masteryRequired: false,
      lessons: [
        {
          id: 'soc-m5-l1',
          title: 'What Threat Intelligence Is',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'The intelligence types and how each audience uses them.',
          objectives: [
            'Define strategic, operational and tactical intelligence',
            'Match an intel type to its consumer',
          ],
          blocks: [
            {
              id: 'soc-m5-l1-b1',
              type: 'concept',
              title: 'IOCs vs TTPs and the Pyramid of Pain',
              body:
                '**IOCs** (indicators of compromise — hashes, IPs, domains) are easy to detect but trivial for an attacker to change. **TTPs** (tactics, techniques and procedures — *how* an actor operates) are far harder to change. The **Pyramid of Pain** captures this: detecting on hashes barely inconveniences an attacker; detecting on TTPs forces them to rework their playbook. Mature SOCs invest detection effort higher up the pyramid.',
            },
          ],
        },
        {
          id: 'soc-m5-l2',
          title: 'Feeds, Sharing & Enrichment',
          kind: 'theory',
          estimatedMinutes: 12,
          summary: 'Intel feeds, sharing formats (STIX/TAXII), and enriching an alert.',
          objectives: [
            'Describe common intel feeds and sharing standards',
            'Explain how enrichment changes a triage decision',
          ],
          blocks: [],
        },
        {
          id: 'soc-m5-l3',
          title: 'Intel-Driven Triage',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Use threat-intel context to re-triage an ambiguous alert with confidence.',
          objectives: [
            'Enrich an indicator with intel context',
            'Re-rank an alert’s priority based on intel',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'soc-m5-assessment',
        title: 'Threat Intel Quiz + Enrichment Exercise',
        type: 'quiz',
        description:
          'Concept quiz plus a short exercise where you enrich two alerts with intel and justify the resulting triage decision in writing.',
        passThreshold: 0.8,
        estimatedMinutes: 25,
      },
    },

    /* -------- M6: Threat Hunting Basics (structural) ------------- */
    {
      id: 'soc-m6',
      title: 'Threat Hunting Basics',
      tagline: 'Stop waiting for alerts — go looking for what they missed.',
      stage: 3,
      estimatedHours: 18,
      summary:
        'The proactive complement to alert-driven monitoring: hypothesis-driven hunting, baselining normal behavior, hunting against MITRE ATT&CK techniques, and documenting hunts so detections improve over time.',
      objectives: [
        'Explain hypothesis-driven hunting and how it differs from alerting',
        'Build a baseline and hunt for deviations from it',
        'Run an ATT&CK-aligned hunt across log data',
        'Document a hunt and convert a finding into a new detection',
      ],
      nice: {
        competencies: ['Threat Hunting', 'Threat Analysis'],
        workRoles: ['Threat/Warning Analyst', 'Cyber Defense Analyst'],
      },
      prerequisites: ['soc-m5'],
      masteryRequired: false,
      lessons: [
        {
          id: 'soc-m6-l1',
          title: 'Hypothesis-Driven Hunting',
          kind: 'theory',
          estimatedMinutes: 13,
          summary: 'Why proactive hunting exists and how to frame a good hunt hypothesis.',
          objectives: [
            'Contrast hunting with reactive alerting',
            'Write a testable hunt hypothesis from a threat scenario',
          ],
          blocks: [
            {
              id: 'soc-m6-l1-b1',
              type: 'callout',
              variant: 'industry',
              title: 'Hunting assumes a breach',
              body:
                'Threat hunting starts from the assumption that something already evaded your alerts. Instead of waiting, you form a **hypothesis** ("if an attacker used technique X, I would see Y in the logs"), then go look. Every hunt either finds something or produces a new detection rule — so a hunt is never wasted.',
            },
          ],
        },
        {
          id: 'soc-m6-l2',
          title: 'Baselining & Anomaly Hunting',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Establish normal, then hunt for the statistical and behavioral outliers.',
          objectives: [
            'Build a behavioral baseline from log data',
            'Identify outliers worth investigating',
          ],
          blocks: [],
        },
        {
          id: 'soc-m6-l3',
          title: 'Hunting Against ATT&CK',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary: 'Pick a technique, derive what it would leave behind, and hunt the logs for it.',
          objectives: [
            'Translate an ATT&CK technique into observable artifacts',
            'Run the hunt and record the result',
          ],
          blocks: [],
        },
        {
          id: 'soc-m6-l4',
          title: 'Documenting the Hunt',
          kind: 'project',
          estimatedMinutes: 25,
          summary: 'Write up a hunt so it is repeatable and turn a finding into a detection.',
          objectives: [
            'Document a hunt (hypothesis, data, method, outcome)',
            'Propose a new detection rule from a finding',
          ],
          blocks: [
            {
              id: 'soc-m6-l4-b1',
              type: 'reflection',
              title: 'Deliverable: the threat-hunt report',
              body:
                'Write a short threat-hunt report: your hypothesis, the data sources and queries you used, what you found (or did not), and the detection you would add as a result. A clean, repeatable hunt report is exactly the artifact that gets an L1 noticed for L2/hunting work.',
            },
          ],
        },
      ],
      assessment: {
        id: 'soc-m6-assessment',
        title: 'Guided Hunt Project',
        type: 'project',
        description:
          'Run a guided, hypothesis-driven hunt against a provided dataset and submit a threat-hunt report plus one proposed detection rule. Peer + mentor reviewed.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },
  ],

  /* ============================================================== */
  /* EMBEDDED WORK EXPERIENCE — the differentiator                   */
  /* ============================================================== */
  workExperience: {
    id: 'soc-practicum',
    title: 'The Blue Team Practicum',
    format: 'Simulated SOC shifts + live-fire detection range',
    durationWeeks: 4,
    summary:
      'An apprenticeship-style phase that turns a trained analyst into a day-one-productive SOC hire. Learners work realistic tickets across rotating simulated SOC shifts, then defend a live-fire detection range while a red team injects activity in real time — producing verifiable portfolio artifacts under mentor supervision.',
    activities: [
      'Run rotating simulated SOC shifts: triage an alert queue against SLAs and escalate real incidents',
      'Defend a live-fire detection range: a red team injects attacks while you detect, triage and respond in real time',
      'Execute incident-response playbooks end to end on confirmed incidents',
      'Run a hypothesis-driven threat hunt against the range telemetry',
      'Attend daily stand-ups and a shift hand-off to practice professional SOC working rhythm',
      'Brief a "shift lead" panel (mentors role-playing senior analysts) on the night’s incidents',
    ],
    deliverables: [
      'A portfolio of 3+ incident notes from simulated shifts',
      'One full incident-response report from a live-fire incident',
      'A threat-hunt report with a proposed detection rule',
      'A mentor-signed competency sign-off mapped to NICE work-role tasks',
    ],
    mentorship:
      'Each learner is paired with an industry-certified SOC mentor for the duration; daily async shift check-ins, two live reviews per week, and a final assessed shift debrief.',
    competencies: [
      'Incident Detection',
      'Incident Response',
      'Alert Triage',
      'Threat Hunting',
      'Security Reporting',
    ],
    softSkills: [
      'Professional written communication (incident notes, tickets, hunt reports)',
      'Verbal communication & shift hand-offs to other analysts',
      'Teamwork and working to SLAs under time pressure',
      'Calm, structured decision-making during a live incident',
    ],
  },

  /* ============================================================== */
  /* BADGES (Open-Badges-style micro-credentials)                    */
  /* ============================================================== */
  badges: [
    {
      id: 'soc-badge-fundamentals',
      title: 'SOC Fundamentals',
      description: 'Understands SOC structure, the alert lifecycle, SIEM basics and metrics.',
      criteria: 'Pass the mastery check for Module 1.',
      icon: 'monitor',
    },
    {
      id: 'soc-badge-log-analyst',
      title: 'Log Analyst',
      description: 'Reads multi-source logs and queries a SIEM to extract indicators.',
      criteria: 'Pass the Log Analysis Lab Challenge (M2).',
      icon: 'clipboard',
    },
    {
      id: 'soc-badge-triage',
      title: 'SOC Triage Operator',
      description: 'Triages alerts and maps observed behavior to MITRE ATT&CK.',
      criteria: 'Score ≥80% on the SOC Triage Simulation (M3).',
      icon: 'target',
    },
    {
      id: 'soc-badge-responder',
      title: 'Incident Responder',
      description: 'Executes IR playbooks and writes actionable incident notes.',
      criteria: 'Pass the Incident Handling Simulation (M4).',
      icon: 'shield',
    },
    {
      id: 'soc-badge-work-ready',
      title: 'Work-Ready (Practicum Complete)',
      description: 'Completed the Blue Team Practicum with a mentor-signed competency sign-off.',
      criteria: 'Complete all practicum deliverables and pass the assessed shift debrief.',
      icon: 'career',
    },
  ],

  /* ============================================================== */
  /* CAPSTONE                                                         */
  /* ============================================================== */
  capstone: {
    id: 'soc-capstone',
    title: 'Blue Team Capstone: Defend the SOC',
    type: 'project',
    description:
      'A multi-day capstone shift against a simulated organization: monitor the SIEM, triage a realistic alert queue, detect and scope a planted multi-stage intrusion (initial access through exfiltration), execute the response playbook, and deliver (1) a technical incident report, (2) a triage log mapped to MITRE ATT&CK, and (3) a threat-hunt report with a proposed detection. Assessed by mentors against the NICE work-role competencies and added to the learner’s portfolio. Aligns with CompTIA Security+ readiness and points toward GIAC GCIH.',
    passThreshold: 0.8,
    estimatedMinutes: 480,
  },
}
