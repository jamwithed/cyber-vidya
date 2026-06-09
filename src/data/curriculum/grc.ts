import type { CourseCurriculum } from '../../types'

/**
 * SPECIALIST COURSE — GRC / Risk & Compliance (course id: grc).
 *
 * Authored at "structural" depth: complete module + lesson metadata (title,
 * kind, minutes, summary, objectives) ready to flesh out, with full block depth
 * added only in the 2–3 most important lessons. Mirrors the flagship template in
 * career-program.ts (tone, formatting, comments, NICE mapping, pedagogy).
 *
 * GRC is a non-coding, communication-heavy discipline: the day job is writing
 * policies, running assessments, and briefing stakeholders. So the labs lean on
 * case studies, control-mapping and policy/report writing rather than hacking —
 * and reflection (write-up) blocks carry the soft-skill load, which is the core
 * job skill here.
 *
 * Pedagogy baked into the shape (see docs/curriculum/README.md):
 *  - Micro-learning: theory lessons are 7–15 min; case studies/projects longer.
 *  - Every module interleaves theory → case study → retrieval check.
 *  - Mastery gating: pass the module assessment (≥80%) to unlock the next.
 *  - Writing & stakeholder communication via reflection/write-up blocks.
 *  - NICE Work Role + Competency mapping on every module.
 *
 * Context: GRC is one of the top-6 cybersecurity skills gaps of 2025 (~27% of
 * organizations report it), with strong, durable demand — and India's DPDP Act
 * makes data-protection governance a board-level concern. This course is built
 * for that market.
 */
export const grcCurriculum: CourseCurriculum = {
  courseId: 'grc',
  title: 'GRC / Risk & Compliance',
  format: 'Self-paced + cohort mentorship',
  totalEstimatedHours: 96,
  weeklyCommitment: '10–12 hrs/week (≈8 weeks)',
  outcomeRole: 'GRC Analyst / Compliance Consultant (entry)',
  capstoneCert: 'ISACA CISA (with ISO/IEC 27001 Lead Implementer en route)',
  niceWorkRoles: [
    'Security Control Assessor',
    'Privacy Compliance Manager',
    'Information Systems Security Manager',
  ],

  modules: [
    /* ============================================================== */
    /* STAGE 2 · GRC FOUNDATIONS                                       */
    /* ============================================================== */

    /* -------- M1: What GRC Is (FULLY FLESHED) -------------------- */
    {
      id: 'grc-m1',
      title: 'Governance, Risk & Compliance: The Big Picture',
      tagline: 'Security decides what you do; GRC proves you should — and that you did.',
      stage: 2,
      estimatedHours: 14,
      summary:
        'The mental model the whole discipline rests on: what governance, risk and compliance each mean, how they fit together, the difference between security and compliance, and the language (control, policy, finding, evidence) you will use every single day.',
      objectives: [
        'Define governance, risk and compliance and explain how the three interlock',
        'Distinguish "secure" from "compliant" and explain why an org needs both',
        'Use the core GRC vocabulary correctly: control, policy, standard, finding, evidence',
        'Describe the GRC operating cycle from policy to audit to improvement',
      ],
      nice: {
        competencies: ['Security Governance', 'Risk Management'],
        workRoles: ['Security Control Assessor', 'Information Systems Security Manager'],
      },
      prerequisites: ['Basic familiarity with how organizations and IT systems work'],
      masteryRequired: true,
      lessons: [
        {
          id: 'grc-m1-l1',
          title: 'The Three Letters: G, R and C',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'Governance sets direction, risk management decides what to worry about, and compliance proves you meet the rules — three lenses on the same goal.',
          objectives: [
            'State what each of governance, risk and compliance is responsible for',
            'Explain how a decision flows from governance through risk to a control',
          ],
          blocks: [
            {
              id: 'grc-m1-l1-b1',
              type: 'concept',
              title: 'Three lenses, one goal',
              body:
                'GRC is one job seen through three lenses.\n\n- **Governance** — *direction and accountability.* Who decides, who is responsible, what the organisation has committed to (its policies, risk appetite and objectives).\n- **Risk management** — *focus.* Which threats matter most, and what we will do about each (accept, mitigate, transfer, avoid).\n- **Compliance** — *proof.* Demonstrating, with evidence, that we actually meet the laws, regulations and frameworks we are held to.\n\nThe three are a loop: governance sets the policy, risk decides where to put effort, controls implement the decision, and compliance audits prove the control works — feeding improvements back into governance.',
            },
            {
              id: 'grc-m1-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'The one sentence that defines the job',
              body:
                'A GRC professional repeatedly answers: **"What are we required to do, are we actually doing it, and can we prove it?"** Requirement → reality → evidence. Hold onto that triplet — every module sharpens one part of it.',
            },
            {
              id: 'grc-m1-l1-b3',
              type: 'concept',
              title: 'Secure is not the same as compliant',
              body:
                'A company can be **compliant but insecure** (it ticks every box on an old checklist while a real attacker walks straight in) or **secure but non-compliant** (strong defences, but no documented evidence, so an auditor or regulator cannot trust it). The goal is both: real protection *and* the documented proof that lets customers, boards and regulators rely on you.',
            },
            {
              id: 'grc-m1-l1-b4',
              type: 'check',
              question: {
                prompt:
                  'A firm has excellent firewalls and trained staff but keeps no records, has no written policies, and cannot show an auditor how access is granted. How is it best described?',
                options: [
                  { id: 'a', label: 'Secure and compliant' },
                  { id: 'b', label: 'Secure but not compliant' },
                  { id: 'c', label: 'Compliant but not secure' },
                  { id: 'd', label: 'Neither secure nor compliant' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'The protections are real (secure), but with no policies, records or evidence there is nothing to demonstrate to an auditor or regulator — so it is not compliant. Compliance is fundamentally about provable, documented assurance.',
              },
            },
            {
              id: 'grc-m1-l1-b5',
              type: 'reflection',
              title: 'Put it in your own words',
              body:
                'In 3–4 sentences, explain to an imaginary non-technical business owner why "we have good security" is not enough to satisfy a customer who demands proof. Clear, plain-language explanation to non-technical stakeholders is the single most-used GRC skill — start practicing it now.',
            },
          ],
        },
        {
          id: 'grc-m1-l2',
          title: 'The Language of GRC: Controls, Policies & Evidence',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'The vocabulary you will read and write daily: policy vs standard vs procedure, what a control is, and what counts as evidence.',
          objectives: [
            'Distinguish policy, standard, procedure and guideline',
            'Define a control and classify it as preventive, detective or corrective',
            'Explain what makes something acceptable audit evidence',
          ],
          blocks: [
            {
              id: 'grc-m1-l2-b1',
              type: 'concept',
              title: 'Policy → standard → procedure',
              body:
                'These are not synonyms, and using them precisely marks you as a professional:\n\n- **Policy** — the high-level rule and intent ("access must follow least privilege"). Approved by management.\n- **Standard** — the specific, mandatory requirement that makes the policy measurable ("passwords ≥ 14 characters, MFA on all admin accounts").\n- **Procedure** — the step-by-step *how* ("to grant access: raise a ticket, get manager approval, provision, log").\n- **Guideline** — recommended (not mandatory) best practice.\n\nA **control** is the actual safeguard that enforces all this — and **evidence** is the artefact (a log, a ticket, a screenshot, an approval email) that proves the control ran.',
            },
            {
              id: 'grc-m1-l2-b2',
              type: 'callout',
              variant: 'industry',
              title: 'Auditors live and die by evidence',
              body:
                'In an audit, "we do that" is worth nothing without proof. A control with no evidence is treated as a control that does not exist. A huge part of the GRC job is designing controls so they *generate evidence automatically* — the ticket, the log entry, the signed approval.',
            },
            {
              id: 'grc-m1-l2-b3',
              type: 'check',
              question: {
                prompt:
                  '"All laptops must encrypt their disks" is approved by management as a binding rule. "Encryption must use AES-256 with keys rotated annually" specifies exactly how. What are these two statements, respectively?',
                options: [
                  { id: 'a', label: 'A procedure and a guideline' },
                  { id: 'b', label: 'A policy and a standard' },
                  { id: 'c', label: 'A standard and a policy' },
                  { id: 'd', label: 'A control and a finding' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'The high-level binding intent is the policy; the specific measurable requirement that implements it is the standard. The procedure would be the steps to actually enable and verify encryption.',
              },
            },
          ],
        },
        {
          id: 'grc-m1-l3',
          title: 'The GRC Operating Cycle',
          kind: 'theory',
          estimatedMinutes: 11,
          summary:
            'How the work actually flows over a year: set policy, assess risk, implement controls, monitor, audit, improve — then repeat.',
          objectives: [
            'Sequence the stages of the GRC lifecycle',
            'Explain why GRC is continuous, not a one-time project',
          ],
          blocks: [],
        },
        {
          id: 'grc-m1-l4',
          title: 'Who Owns What: Roles & the Three Lines',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'The "three lines" model — operational owners, risk/compliance functions, and independent audit — and where a GRC analyst sits.',
          objectives: [
            'Describe the three-lines-of-defence model',
            'Identify the responsibilities of the board, management, GRC, and audit',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'grc-m1-assessment',
        title: 'GRC Foundations Mastery Check',
        type: 'quiz',
        description:
          'Mixed quiz plus one short-answer "explain in plain English" item covering the G/R/C split, secure-vs-compliant, and the policy/standard/control/evidence vocabulary. ≥80% unlocks Module 2.',
        passThreshold: 0.8,
        estimatedMinutes: 20,
      },
    },

    /* -------- M2: Frameworks (structural) ------------------------ */
    {
      id: 'grc-m2',
      title: 'Frameworks: ISO/IEC 27001 & the NIST CSF',
      tagline: 'The blueprints the whole world audits against.',
      stage: 2,
      estimatedHours: 18,
      summary:
        'The two frameworks every GRC analyst must know cold: ISO/IEC 27001 (an auditable, certifiable ISMS) and the NIST Cybersecurity Framework (a flexible, risk-based common language). Their structure, when each is used, and how they map to one another.',
      objectives: [
        'Explain what an Information Security Management System (ISMS) is',
        'Outline the structure of ISO/IEC 27001 and the role of its Annex A controls',
        'Describe the NIST CSF functions (Govern, Identify, Protect, Detect, Respond, Recover)',
        'Choose the right framework for a given organisation and map controls between them',
      ],
      nice: {
        competencies: ['Security Governance', 'Compliance', 'Control Frameworks'],
        workRoles: ['Security Control Assessor', 'Information Systems Security Manager'],
      },
      prerequisites: ['grc-m1'],
      masteryRequired: true,
      lessons: [
        {
          id: 'grc-m2-l1',
          title: 'ISO/IEC 27001 and the ISMS',
          kind: 'theory',
          estimatedMinutes: 15,
          summary:
            'What certification really means, the management-system clauses, and the Annex A control set.',
          objectives: [
            'Explain what ISO/IEC 27001 certification certifies',
            'Describe the ISMS clauses and the role of Annex A controls',
          ],
          blocks: [
            {
              id: 'grc-m2-l1-b1',
              type: 'concept',
              title: 'A system, not a checklist',
              body:
                'ISO/IEC 27001 certifies an **Information Security Management System** — a living, managed process for protecting information, not a one-off audit. Clauses 4–10 describe the *management system* (context, leadership, planning, support, operation, evaluation, improvement); **Annex A** lists the catalogue of security controls (organisational, people, physical and technological) an organisation selects from based on its risk assessment. You justify what you include — and exclude — in a document called the **Statement of Applicability**.',
            },
            {
              id: 'grc-m2-l1-b2',
              type: 'callout',
              variant: 'industry',
              title: 'Why employers value this',
              body:
                'ISO/IEC 27001 certification is increasingly a *precondition to win business*, especially for Indian IT/BPM firms serving global clients. The people who run the certification project — Lead Implementers — are in direct demand, which is exactly the path this course points you toward.',
            },
          ],
        },
        {
          id: 'grc-m2-l2',
          title: 'The NIST Cybersecurity Framework',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'The six CSF functions as a common language for risk, and how organisations use tiers and profiles.',
          objectives: [
            'Recall the six CSF functions and what each covers',
            'Explain how profiles express current vs target state',
          ],
          blocks: [
            {
              id: 'grc-m2-l2-b1',
              type: 'check',
              question: {
                prompt:
                  'Which of the following is NOT one of the six functions of the NIST Cybersecurity Framework (CSF 2.0)?',
                options: [
                  { id: 'a', label: 'Govern' },
                  { id: 'b', label: 'Identify' },
                  { id: 'c', label: 'Encrypt' },
                  { id: 'd', label: 'Recover' },
                ],
                correct: ['c'],
                multiple: false,
                explanation:
                  'The six functions are Govern, Identify, Protect, Detect, Respond and Recover. "Encrypt" is a control, not a top-level function — it would live under Protect.',
              },
            },
          ],
        },
        {
          id: 'grc-m2-l3',
          title: 'ISO vs NIST: Choosing and Crosswalking',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'When to reach for which framework, and how a control crosswalk lets you satisfy both at once.',
          objectives: [
            'Recommend a framework for a given context',
            'Read a control crosswalk between ISO Annex A and the CSF',
          ],
          blocks: [],
        },
        {
          id: 'grc-m2-l4',
          title: 'Case Study: Picking a Framework for an SME',
          kind: 'interactive',
          estimatedMinutes: 22,
          summary:
            'A 40-person Indian SaaS firm wants to win enterprise clients. Work through which framework(s) to adopt and why.',
          objectives: [
            'Apply framework selection criteria to a realistic business',
            'Justify a recommendation in writing for a non-technical founder',
          ],
          blocks: [
            {
              id: 'grc-m2-l4-b1',
              type: 'reflection',
              title: 'Write the recommendation',
              body:
                'In a half-page memo to the founder, recommend whether the SaaS firm should pursue ISO/IEC 27001 certification, adopt the NIST CSF, or both — and why, in business terms (cost, sales impact, effort). This memo format is exactly what you will write on the job; save it for your portfolio.',
            },
          ],
        },
      ],
      assessment: {
        id: 'grc-m2-assessment',
        title: 'Frameworks Knowledge Check',
        type: 'quiz',
        description:
          'Quiz on ISMS structure, CSF functions and crosswalking, plus a short written justification of a framework choice for a given scenario. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 25,
      },
    },

    /* -------- M3: Risk Assessment & Treatment (rich sample) ------ */
    {
      id: 'grc-m3',
      title: 'Risk Assessment & Treatment',
      tagline: 'Decide what to worry about — and prove the decision was deliberate.',
      stage: 2,
      estimatedHours: 18,
      summary:
        'The analytical heart of GRC: identify assets and threats, score risk as likelihood × impact, build and maintain a risk register, and choose a treatment (mitigate, accept, transfer, avoid) the business signs off on.',
      objectives: [
        'Identify assets, threats and vulnerabilities for a scope',
        'Score risk using likelihood × impact and a risk matrix',
        'Build and maintain a risk register with owners and treatment decisions',
        'Recommend and document a treatment option for each risk',
      ],
      nice: {
        competencies: ['Risk Management', 'Risk Assessment'],
        workRoles: ['Security Control Assessor', 'Information Systems Security Manager'],
      },
      prerequisites: ['grc-m2'],
      masteryRequired: true,
      lessons: [
        {
          id: 'grc-m3-l1',
          title: 'Risk = Likelihood × Impact',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'The scoring model that turns a sea of "scary things" into a ranked, defensible priority list.',
          objectives: [
            'Define asset, threat, vulnerability and risk precisely',
            'Score and rank risks using a likelihood × impact matrix',
          ],
          blocks: [
            {
              id: 'grc-m3-l1-b1',
              type: 'concept',
              title: 'Turning fear into a number',
              body:
                'A **risk** is the chance a **threat** exploits a **vulnerability** in an **asset**, causing harm. You make it comparable by scoring two dimensions: **likelihood** (how probable) and **impact** (how bad if it happens), each typically on a 1–5 scale. Multiply them and you get a risk rating (1–25) you can sort. Now a backlog of a hundred vague worries becomes a ranked list the business can actually act on — and, crucially, a *defensible record* of why you prioritised what you did.',
            },
            {
              id: 'grc-m3-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'Risk work is judgement made transparent',
              body:
                'The numbers are not magic — two analysts may score differently. The value is **transparency**: the matrix forces you to *show your reasoning* so management can challenge it and own the final decision. GRC never decides risk *for* the business; it makes the business decide *consciously*.',
            },
            {
              id: 'grc-m3-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'Risk A: likelihood 2, impact 5. Risk B: likelihood 4, impact 3. Using likelihood × impact, which should be prioritised first?',
                options: [
                  { id: 'a', label: 'Risk A (score 10)' },
                  { id: 'b', label: 'Risk B (score 12)' },
                  { id: 'c', label: 'They are equal' },
                  { id: 'd', label: 'Impact 5 always wins regardless of likelihood' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'A scores 2 × 5 = 10; B scores 4 × 3 = 12. B ranks higher. A common beginner mistake is fixating on the high-impact item — but a rare catastrophe can rank below a likely, moderately damaging one.',
              },
            },
          ],
        },
        {
          id: 'grc-m3-l2',
          title: 'The Four Treatments: Mitigate, Accept, Transfer, Avoid',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'Every risk gets a deliberate decision — and "accept" is a legitimate, documented choice, not a failure.',
          objectives: [
            'Distinguish the four risk-treatment options',
            'Recommend a treatment given cost vs residual risk',
          ],
          blocks: [
            {
              id: 'grc-m3-l2-b1',
              type: 'concept',
              title: 'Four doors out of a risk',
              body:
                'For every risk above appetite you choose one of four treatments: **Mitigate** (add controls to reduce likelihood or impact), **Transfer** (shift it — insurance, or a contractual clause with a vendor), **Avoid** (stop doing the risky activity entirely), or **Accept** (consciously live with it, signed off by an accountable owner). After treatment, whatever risk remains is the **residual risk** — and someone with authority must formally accept that too.',
            },
            {
              id: 'grc-m3-l2-b2',
              type: 'reflection',
              title: 'Defend an "accept" decision',
              body:
                'Pick a low-likelihood, low-impact risk (e.g. "an old internal wiki could leak harmless meeting notes"). In 3–4 sentences, write the justification for *accepting* it rather than spending money to mitigate. Being able to argue "this is not worth fixing" professionally — and in writing — is as important as knowing how to fix things.',
            },
          ],
        },
        {
          id: 'grc-m3-l3',
          title: 'Building the Risk Register',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary:
            'Assemble a working risk register: risk description, owner, scores, treatment, residual risk, status.',
          objectives: [
            'Populate the standard columns of a risk register',
            'Assign each risk a named owner and a clear treatment decision',
          ],
          blocks: [
            {
              id: 'grc-m3-l3-b1',
              type: 'lab',
              title: 'Lab: Govern a Cloud Misconfiguration Finding',
              labId: 's3-misconfig',
              body:
                'A finding lands on your desk: a storage bucket is exposed to the internet. First identify the misconfigured setting, then think like a GRC analyst — this is the kind of finding you will score, assign an owner, and track to closure in the risk register.',
            },
          ],
          labIds: ['s3-misconfig'],
        },
        {
          id: 'grc-m3-l4',
          title: 'Case Study: Risk-Assessing an NGO',
          kind: 'interactive',
          estimatedMinutes: 24,
          summary:
            'Run a scoped risk assessment for a small NGO that handles beneficiary personal data — identify, score and propose treatments.',
          objectives: [
            'Identify and score the top risks for a real-world small organisation',
            'Propose a justified treatment for each and record it in a register',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'grc-m3-assessment',
        title: 'Risk Assessment Project',
        type: 'project',
        description:
          'Submit a completed risk register for a provided scenario (10–15 risks): each scored, owned, with a justified treatment and residual-risk note. Peer + mentor reviewed for sound reasoning and clear writing.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },

    /* -------- M4: Data Protection & Privacy Law (structural) ----- */
    {
      id: 'grc-m4',
      title: 'Data Protection & Privacy: DPDP, GDPR & Global Rules',
      tagline: 'India just rewrote the rules — and the world is watching.',
      stage: 2,
      estimatedHours: 16,
      summary:
        "Privacy law from an Indian vantage point: the Digital Personal Data Protection (DPDP) Act 2023 and its core obligations, the EU GDPR as the global benchmark, data-subject rights, cross-border transfer, and a sector view (PCI DSS, HIPAA) so you can map any new regulation to controls.",
      objectives: [
        "Summarise the key obligations of India's DPDP Act 2023",
        'Explain core GDPR principles, lawful bases and data-subject rights',
        'Compare DPDP and GDPR and identify where they diverge',
        'Map a privacy obligation to the technical and organisational controls that satisfy it',
      ],
      nice: {
        competencies: ['Privacy', 'Compliance', 'Data Protection'],
        workRoles: ['Privacy Compliance Manager', 'Security Control Assessor'],
      },
      prerequisites: ['grc-m3'],
      masteryRequired: true,
      lessons: [
        {
          id: 'grc-m4-l1',
          title: "India's DPDP Act 2023: What Changed",
          kind: 'theory',
          estimatedMinutes: 15,
          summary:
            'Consent, the Data Fiduciary/Principal roles, breach notification and penalties — the obligations every Indian organisation now carries.',
          objectives: [
            'Define Data Fiduciary, Data Principal and consent under the DPDP Act',
            'State the core obligations and penalty exposure',
          ],
          blocks: [
            {
              id: 'grc-m4-l1-b1',
              type: 'concept',
              title: 'The DPDP Act in plain terms',
              body:
                "India's **Digital Personal Data Protection Act, 2023** governs how organisations handle the personal data of individuals in India. The organisation deciding why and how data is processed is the **Data Fiduciary**; the individual whose data it is is the **Data Principal**. Processing generally requires **clear, informed consent** for a stated purpose, data must be used only for that purpose and kept no longer than needed, and breaches must be notified. Significant Data Fiduciaries carry extra duties (a Data Protection Officer, audits, impact assessments). Penalties run to hundreds of crores of rupees — which is why DPDP turned data governance into a board-level issue overnight.",
            },
            {
              id: 'grc-m4-l1-b2',
              type: 'callout',
              variant: 'india',
              title: 'Why this is your edge in the Indian market',
              body:
                'Every Indian company that touches customer data now needs people who understand DPDP and can translate it into policies, consent flows and breach processes. Demand for privacy-literate GRC talent in India is rising sharply, and the field is young — early, fluent specialists have a real advantage. Make DPDP your signature strength.',
            },
            {
              id: 'grc-m4-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'Under the DPDP Act, what is the individual whose personal data is being processed called?',
                options: [
                  { id: 'a', label: 'Data Controller' },
                  { id: 'b', label: 'Data Fiduciary' },
                  { id: 'c', label: 'Data Principal' },
                  { id: 'd', label: 'Data Subject' },
                ],
                correct: ['c'],
                multiple: false,
                explanation:
                  'Under the DPDP Act the individual is the Data Principal and the processing organisation is the Data Fiduciary. ("Data Subject" and "Data Controller" are the equivalent GDPR terms — a classic exam trap.)',
              },
            },
          ],
        },
        {
          id: 'grc-m4-l2',
          title: 'The GDPR Benchmark',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'The EU regulation the rest of the world copies: principles, the six lawful bases, and data-subject rights.',
          objectives: [
            'List the GDPR data-processing principles',
            'Explain lawful bases and the main data-subject rights',
          ],
          blocks: [],
        },
        {
          id: 'grc-m4-l3',
          title: 'DPDP vs GDPR, and the Sector Rules',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'Where DPDP and GDPR agree and diverge, plus a working view of PCI DSS and HIPAA so any new regulation feels familiar.',
          objectives: [
            'Compare DPDP and GDPR on consent, rights and transfers',
            'Recognise when PCI DSS or HIPAA applies',
          ],
          blocks: [],
        },
        {
          id: 'grc-m4-l4',
          title: 'Case Study: From Obligation to Control',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary:
            'Take three real DPDP/GDPR obligations and map each to the concrete controls that satisfy it.',
          objectives: [
            'Translate a legal obligation into specific technical/organisational controls',
            'Document the obligation-to-control mapping for an audit',
          ],
          blocks: [
            {
              id: 'grc-m4-l4-b1',
              type: 'reflection',
              title: 'Map it and write it up',
              body:
                'Choose one obligation (e.g. "honour a Data Principal\'s request to erase their data"). In a short write-up, list the controls that make it real — the process, the system capability, the evidence you would keep — and note who owns each. Turning law into auditable controls is the everyday craft of a Privacy Compliance Manager.',
            },
          ],
        },
      ],
      assessment: {
        id: 'grc-m4-assessment',
        title: 'Privacy & Data-Protection Check',
        type: 'quiz',
        description:
          'Quiz on DPDP and GDPR concepts and a short obligation-to-control mapping exercise with written justification on two items. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 25,
      },
    },

    /* ============================================================== */
    /* STAGE 3 · AUDIT, POLICY & ASSURANCE                             */
    /* ============================================================== */

    /* -------- M5: Audit, Control Mapping & Policy Writing (rich) - */
    {
      id: 'grc-m5',
      title: 'Audit, Control Mapping & Policy Writing',
      tagline: 'Where GRC becomes real: write the policy, test the control, prove it.',
      stage: 3,
      estimatedHours: 18,
      summary:
        'The hands-on core of the role: how an audit runs, mapping a finding to the control that closes it, gathering evidence, and writing clear policies and audit-style findings that management can act on. This module is communication-heavy by design.',
      objectives: [
        'Explain the audit lifecycle from scoping to report',
        'Map an audit finding to the control that remediates it',
        'Gather and assess control evidence',
        'Write a clear policy and a well-structured audit finding',
      ],
      nice: {
        competencies: ['Control Assessment', 'Audit', 'Policy Development'],
        workRoles: ['Security Control Assessor', 'Information Systems Security Manager'],
      },
      prerequisites: ['grc-m4'],
      masteryRequired: true,
      lessons: [
        {
          id: 'grc-m5-l1',
          title: 'How an Audit Actually Runs',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'Scoping, fieldwork, evidence, findings and the closing report — and the difference between internal and external audit.',
          objectives: [
            'Sequence the phases of an audit',
            'Distinguish internal, external and certification audits',
          ],
          blocks: [
            {
              id: 'grc-m5-l1-b1',
              type: 'concept',
              title: 'An audit is a structured conversation about evidence',
              body:
                'An audit moves through clear phases: **scoping** (what is in and out), **fieldwork** (interviews, walkthroughs, sampling evidence), **testing** (does the control actually operate as described?), **findings** (gaps, rated by severity), and the **report** with agreed remediation actions and owners. An auditor is not the enemy — they are checking that controls *work* and produce *evidence*. Your job on the GRC side is to make that conversation short by having the evidence ready.',
            },
            {
              id: 'grc-m5-l1-b2',
              type: 'callout',
              variant: 'industry',
              title: 'CISA, decoded',
              body:
                "ISACA's **Certified Information Systems Auditor (CISA)** is the global gold standard for exactly this work, and the certification this course points toward. It signals you can independently assess controls and report on them — a skill that travels across every industry and pays well in India and abroad.",
            },
          ],
        },
        {
          id: 'grc-m5-l2',
          title: 'Mapping Findings to Controls',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary:
            'Given a finding, choose the control that closes the root cause — and justify the mapping.',
          objectives: [
            'Diagnose the root cause behind a finding',
            'Select and justify the single best-fit remediating control',
          ],
          blocks: [
            {
              id: 'grc-m5-l2-b1',
              type: 'concept',
              title: 'Fix the cause, not the symptom',
              body:
                'A weak mapping treats the symptom ("former staff still had access → delete those accounts"); a strong one treats the **root cause** ("there is no joiner/mover/leaver process → implement timely de-provisioning with periodic access reviews"). Auditors and managers reward control choices that prevent the *whole class* of finding from recurring, not just the one instance in front of you.',
            },
            {
              id: 'grc-m5-l2-b2',
              type: 'lab',
              title: 'Lab: Map the Control to the Compliance Gap',
              labId: 'grc-control',
              body:
                'An auditor flagged a finding. Pick the ISO 27001 / NIST control that directly remediates the root cause — then be ready to explain in one sentence why it is the right fit.',
            },
            {
              id: 'grc-m5-l2-b3',
              type: 'check',
              question: {
                prompt:
                  'A finding says backups exist but have never been test-restored. Which control most directly remediates the underlying gap?',
                options: [
                  { id: 'a', label: 'Encrypt the backups at rest' },
                  { id: 'b', label: 'Schedule and document periodic backup restoration tests' },
                  { id: 'c', label: 'Buy more backup storage' },
                  { id: 'd', label: 'Require longer passwords for the backup console' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'The gap is unverified recoverability — a backup you cannot restore is not a backup. The remediating control is regular, documented restore testing, which also produces the evidence an auditor will want.',
              },
            },
          ],
          labIds: ['grc-control'],
        },
        {
          id: 'grc-m5-l3',
          title: 'Writing Policies People Actually Follow',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary:
            'Anatomy of a good policy — purpose, scope, statements, roles, enforcement — and how to write it so it is usable, not shelfware.',
          objectives: [
            'Structure a policy with the standard required sections',
            'Write clear, enforceable policy statements in plain language',
          ],
          blocks: [
            {
              id: 'grc-m5-l3-b1',
              type: 'concept',
              title: 'A policy is a product with users',
              body:
                'Most policies fail not because they are wrong but because nobody reads or follows them. A good one has a clear **purpose**, defined **scope** (who/what it applies to), unambiguous **policy statements**, named **roles and responsibilities**, an **enforcement/exception** process, and a **review date**. Write statements as testable rules ("MFA is required for all remote access"), not vague aspirations ("we take access seriously"). Plain language wins: if a new hire cannot act on it, it is not done.',
            },
            {
              id: 'grc-m5-l3-b2',
              type: 'reflection',
              title: 'Draft a real policy section',
              body:
                'Draft the "Policy Statements" section of an **Access Control Policy** for a 50-person company — 5–8 enforceable, plain-language statements. Then re-read each and ask: could an auditor test it, and could a new employee follow it? Revise anything that fails. This draft goes in your portfolio.',
            },
          ],
        },
        {
          id: 'grc-m5-l4',
          title: 'Writing the Audit Finding',
          kind: 'project',
          estimatedMinutes: 22,
          summary:
            'Turn an observation into a professional finding: condition, criteria, cause, consequence (impact) and recommendation.',
          objectives: [
            'Structure a finding using the condition/criteria/cause/consequence model',
            'Write a recommendation a manager can act on',
          ],
          blocks: [
            {
              id: 'grc-m5-l4-b1',
              type: 'concept',
              title: 'The 5 C\'s of a finding',
              body:
                'A professional finding answers five things: **Condition** (what we observed), **Criteria** (the policy/standard/law it breaches), **Cause** (why it happened), **Consequence** (the impact/risk if unfixed), and **Corrective action** (the recommendation). Rate its severity, give it an owner and a due date, and lead with a one-sentence summary a busy executive can grasp in seconds.',
            },
            {
              id: 'grc-m5-l4-b2',
              type: 'reflection',
              title: 'Deliverable',
              body:
                'Write one full audit finding (all five C\'s, plus severity, owner and due date) for a provided observation. Lead with a single-sentence summary an executive can read in 10 seconds. Clarity here is the difference between a finding that gets fixed and one that gets ignored — this is the portfolio piece that proves you can communicate.',
            },
          ],
        },
      ],
      assessment: {
        id: 'grc-m5-assessment',
        title: 'Control-Mapping & Writing Assessment',
        type: 'project',
        description:
          'Two parts: (1) map a set of findings to their best-fit controls with written justification, and (2) submit one policy section and one full audit finding. Scored on correct mapping and clarity/structure of writing.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },

    /* -------- M6: Operating a GRC Program (structural) ----------- */
    {
      id: 'grc-m6',
      title: 'Operating & Communicating a GRC Program',
      tagline: 'Run the program year-round — and brief the people who fund it.',
      stage: 3,
      estimatedHours: 14,
      summary:
        'Turning one-off assessments into a running program: continuous monitoring and metrics, third-party/vendor risk, GRC tooling, and the stakeholder communication — dashboards, board briefings, persuasion — that is the senior end of the GRC career.',
      objectives: [
        'Define meaningful GRC metrics and continuous-monitoring practices',
        'Run a basic third-party / vendor risk review',
        'Describe how GRC tooling (registers, control libraries, dashboards) supports the work',
        'Communicate risk and compliance status to executives and the board',
      ],
      nice: {
        competencies: ['Risk Management', 'Vendor Risk Management', 'Stakeholder Communication'],
        workRoles: ['Information Systems Security Manager', 'Privacy Compliance Manager'],
      },
      prerequisites: ['grc-m5'],
      masteryRequired: true,
      lessons: [
        {
          id: 'grc-m6-l1',
          title: 'Continuous Monitoring & Metrics',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'Why point-in-time audits are not enough, and the KPIs/KRIs that show whether controls keep working.',
          objectives: [
            'Distinguish point-in-time vs continuous assurance',
            'Choose meaningful KPIs and KRIs for a control set',
          ],
          blocks: [],
        },
        {
          id: 'grc-m6-l2',
          title: 'Third-Party & Vendor Risk',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary:
            'Your supply chain is your attack surface — how to assess and monitor the vendors that touch your data.',
          objectives: [
            'Run a basic vendor risk assessment',
            'Decide what contractual and monitoring controls a vendor needs',
          ],
          blocks: [],
        },
        {
          id: 'grc-m6-l3',
          title: 'GRC Tooling & Automation',
          kind: 'theory',
          estimatedMinutes: 11,
          summary:
            'What GRC platforms do — control libraries, evidence collection, dashboards — and where automation helps vs hurts.',
          objectives: [
            'Describe the role of a GRC platform',
            'Identify which GRC tasks benefit from automation',
          ],
          blocks: [],
        },
        {
          id: 'grc-m6-l4',
          title: 'Briefing the Board: Communicating Risk',
          kind: 'project',
          estimatedMinutes: 22,
          summary:
            'The skill that defines a senior GRC professional: translating technical risk into business language a board will act on.',
          objectives: [
            'Build a one-slide risk summary for executives',
            'Present and defend a prioritised risk picture verbally',
          ],
          blocks: [
            {
              id: 'grc-m6-l4-b1',
              type: 'reflection',
              title: 'Deliverable: the board summary',
              body:
                'Produce a single-slide risk summary (top 5 risks, status, trend, ask) and write the 2-minute talking script you would deliver to a board. No jargon — every line must answer "so what should we, the board, do?" The ability to make leadership *care and act* is what separates a GRC analyst from a GRC leader.',
            },
          ],
        },
      ],
      assessment: {
        id: 'grc-m6-assessment',
        title: 'Program & Communication Assessment',
        type: 'peer-review',
        description:
          'Submit a one-slide executive risk summary plus a vendor risk note, then deliver a short verbal briefing for mentor + peer review. Scored on business framing and clarity of communication.',
        passThreshold: 0.8,
        estimatedMinutes: 45,
      },
    },
  ],

  /* ============================================================== */
  /* EMBEDDED WORK EXPERIENCE — the differentiator                   */
  /* ============================================================== */
  workExperience: {
    id: 'grc-practicum',
    title: 'The Cyber Vidya GRC Practicum',
    format: 'Supervised mini ISO 27001 / risk-assessment engagement for a partner SME or NGO',
    durationWeeks: 4,
    summary:
      'A structured, apprenticeship-style engagement that turns a trained learner into a day-one-productive GRC hire. Working under a mentor, learners run a scoped, low-risk assessment for a real partner SME or NGO — a gap analysis against a framework, a risk register, draft policies, and an audit-style report — then brief the partner like a consultant. Every artifact is portfolio-ready and employer-verifiable.',
    activities: [
      'Scope the engagement with the partner and agree what is in and out',
      'Run a gap analysis of the partner against ISO/IEC 27001 (or the NIST CSF)',
      'Build a risk register: identify, score and assign owners and treatments',
      'Draft two or three priority policies the partner is missing (e.g. access control, data protection)',
      'Write an audit-style assessment report with prioritised findings and a remediation roadmap',
      'Present findings and the roadmap to the partner in a management briefing',
    ],
    deliverables: [
      'A completed gap-analysis report mapped to a framework',
      'A populated risk register (scored, owned, with treatment decisions)',
      'Two or three draft policies written for the partner',
      'A professional audit-style assessment report with prioritised findings',
      'A recorded management presentation of findings and remediation roadmap',
      'A mentor-signed competency sign-off mapped to NICE work-role tasks',
    ],
    mentorship:
      'Each learner is paired with an industry-certified GRC mentor (CISA / ISO 27001 LI) for the engagement; daily async check-ins, two live reviews per week, and a final assessed client-style debrief.',
    competencies: [
      'Risk Management',
      'Control Assessment',
      'Compliance',
      'Policy Development',
      'Stakeholder Communication',
    ],
    softSkills: [
      'Professional written communication (policies, reports, findings)',
      'Verbal communication & presenting to non-technical stakeholders',
      'Client management and managing expectations',
      'Diplomacy when delivering uncomfortable findings',
    ],
  },

  /* ============================================================== */
  /* BADGES (Open-Badges-style micro-credentials)                    */
  /* ============================================================== */
  badges: [
    {
      id: 'grc-badge-foundations',
      title: 'GRC Foundations Certified',
      description: 'Mastered the GRC fundamentals, frameworks, risk and privacy law.',
      criteria: 'Pass the mastery checks for Modules 1–4.',
      icon: 'clipboard',
    },
    {
      id: 'grc-badge-risk',
      title: 'Risk Analyst',
      description: 'Built and defended a complete, owned risk register for a real scenario.',
      criteria: 'Score ≥80% on the Risk Assessment Project (M3).',
      icon: 'target',
    },
    {
      id: 'grc-badge-privacy',
      title: 'Privacy Specialist (DPDP)',
      description: 'Demonstrated working fluency in India\'s DPDP Act and the GDPR benchmark.',
      criteria: 'Score ≥80% on the Privacy & Data-Protection check (M4).',
      icon: 'shield',
    },
    {
      id: 'grc-badge-auditor',
      title: 'Control Assessor',
      description: 'Mapped findings to controls and wrote audit-grade policies and findings.',
      criteria: 'Score ≥80% on the Control-Mapping & Writing assessment (M5).',
      icon: 'cert',
    },
    {
      id: 'grc-badge-practicum',
      title: 'Work-Ready (GRC Practicum Complete)',
      description: 'Completed a supervised partner engagement with a mentor-signed sign-off.',
      criteria: 'Complete all practicum deliverables and pass the assessed debrief.',
      icon: 'career',
    },
  ],

  /* ============================================================== */
  /* CAPSTONE                                                         */
  /* ============================================================== */
  capstone: {
    id: 'grc-capstone',
    title: 'GRC Capstone: Mock Audit, Risk Treatment Plan & Stakeholder Briefing',
    type: 'project',
    description:
      'A multi-day capstone: given a simulated organisation, the learner conducts a full mock audit against a chosen framework, produces (1) an audit report with prioritised, severity-rated findings mapped to controls, (2) a risk register with a complete risk-treatment plan and residual-risk acceptances, and (3) a stakeholder briefing (slide + verbal) translating it all into business decisions. Assessed by mentors against the NICE work-role competencies, with extra weight on clarity of writing and communication. Aligns with CISA exam readiness and added to the learner\'s portfolio.',
    passThreshold: 0.8,
    estimatedMinutes: 540,
  },
}
