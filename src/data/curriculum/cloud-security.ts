import type { CourseCurriculum } from '../../types'

/**
 * CLOUD SECURITY — specialist curriculum (course id: cloud-security).
 *
 * An Intermediate, 10–12 week track that takes a learner who already understands
 * security fundamentals into the cloud: AWS/Azure/GCP fundamentals, IAM and
 * least-privilege design, posture management (CSPM), Infrastructure-as-Code and
 * container security, and cloud-native detection & response. It ends with an
 * embedded cloud practicum and a secure-by-design capstone.
 *
 * Authored at STRUCTURAL depth, mirroring the flagship template
 * (src/data/curriculum/career-program.ts): every module carries complete
 * metadata and full lesson metadata (title, kind, minutes, summary, objectives),
 * with representative content blocks (concept/lab/check/reflection) fleshed out
 * in the two or three most important lessons.
 *
 * Pedagogy baked into the shape (see docs/curriculum/README.md):
 *  - Micro-learning: theory lessons are 7–15 min; labs/projects run longer.
 *  - Every module interleaves theory → worked example → lab → retrieval check.
 *  - Mastery gating: pass the module assessment (≥80%) to unlock the next.
 *  - Soft skills via reflection/write-up blocks throughout.
 *  - NICE Work Role + Competency mapping on every module.
 *
 * Industry context (verified 2025): Cloud Security is the #2 cybersecurity
 * skills gap (36% of organizations report it) — one of the highest-demand,
 * highest-differentiation skills a defender can carry into the job market.
 */
export const cloudSecurityCurriculum: CourseCurriculum = {
  courseId: 'cloud-security',
  title: 'Cloud Security',
  format: 'Self-paced + cohort mentorship',
  totalEstimatedHours: 120,
  weeklyCommitment: '8–10 hrs/week (≈10–12 weeks)',
  outcomeRole: 'Cloud Security Engineer / DevSecOps Engineer',
  capstoneCert: 'AWS Certified Security – Specialty (then (ISC)² CCSP)',
  niceWorkRoles: [
    'Security Architect',
    'Systems Security Analyst',
    'Cyber Defense Analyst (Cloud)',
  ],

  modules: [
    /* ============================================================== */
    /* STAGE 2 · CLOUD FUNDAMENTALS & IDENTITY                         */
    /* ============================================================== */

    /* -------- M1: Cloud Fundamentals (rich sample lessons) -------- */
    {
      id: 'cloud-m1',
      title: 'Cloud Fundamentals & the Shared Responsibility Model',
      tagline: 'The cloud is just someone else’s computer — know exactly which parts are yours to secure.',
      stage: 2,
      estimatedHours: 16,
      summary:
        'Build the mental model the rest of the course stands on: service and deployment models, the big-three providers (AWS/Azure/GCP) and how their building blocks map to each other, the shared responsibility model, and how cloud changes the threat surface.',
      objectives: [
        'Distinguish IaaS, PaaS and SaaS and the deployment models (public/private/hybrid)',
        'Map equivalent compute, storage, network and identity services across AWS, Azure and GCP',
        'Apply the shared responsibility model to decide what you must secure vs the provider',
        'Describe how the cloud shifts the threat surface compared to on-premises',
      ],
      nice: {
        competencies: ['Cloud Computing Fundamentals', 'Cybersecurity Fundamentals'],
        workRoles: ['Systems Security Analyst', 'Security Architect'],
      },
      prerequisites: ['Security fundamentals (CIA, authN/authZ, networking basics)'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cloud-m1-l1',
          title: 'Service & Deployment Models',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'IaaS vs PaaS vs SaaS and public/private/hybrid — and why the model you pick decides how much security work is yours.',
          objectives: [
            'Define IaaS, PaaS and SaaS with a real example of each',
            'Explain how the service model changes the boundary of your responsibility',
          ],
          blocks: [
            {
              id: 'cloud-m1-l1-b1',
              type: 'concept',
              title: 'The three service models',
              body:
                'Cloud is sold in layers. With **IaaS** (e.g. EC2, Azure VMs) you rent raw compute and storage and run everything above the hypervisor yourself. With **PaaS** (e.g. App Service, Cloud Run) you hand over the OS and runtime and just ship code. With **SaaS** (e.g. Google Workspace) you consume a finished application.\n\nThe higher up the stack you go, the more the provider secures for you — and the smaller, but more identity-centric, your job becomes.',
            },
            {
              id: 'cloud-m1-l1-b2',
              type: 'callout',
              variant: 'industry',
              title: 'Why this is the #2 skills gap',
              body:
                'Organizations moved to the cloud faster than they hired people who understand it. In 2025, cloud security is the **#2 cybersecurity skills gap (36%)** — which means a defender who can reason about these models is immediately valuable and hard to replace.',
            },
            {
              id: 'cloud-m1-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'Your company runs its app on AWS Lambda (Function-as-a-Service). The provider patches the OS and runtime; you only ship code. Which service model is closest to this?',
                options: [
                  { id: 'a', label: 'IaaS' },
                  { id: 'b', label: 'PaaS' },
                  { id: 'c', label: 'SaaS' },
                  { id: 'd', label: 'On-premises' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'Serverless / FaaS is a PaaS-style model: the provider owns the OS and runtime, you own only your code and its configuration (including its IAM permissions).',
              },
            },
          ],
        },
        {
          id: 'cloud-m1-l2',
          title: 'AWS, Azure & GCP — One Mental Map',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'Learn one set of concepts (compute, storage, network, identity) and map them across the three big providers so you are never lost in a new console.',
          objectives: [
            'Match equivalent core services across AWS, Azure and GCP',
            'Recognize the identity service as the true control plane of each cloud',
          ],
          blocks: [
            {
              id: 'cloud-m1-l2-b1',
              type: 'concept',
              title: 'Same ideas, different names',
              body:
                'Every provider has the same four primitives: **compute** (EC2 / VMs / Compute Engine), **object storage** (S3 / Blob Storage / Cloud Storage), **virtual networking** (VPC / VNet / VPC), and **identity** (IAM / Entra ID / Cloud IAM). Learn the concept once and the console differences are just vocabulary.',
            },
            {
              id: 'cloud-m1-l2-b2',
              type: 'callout',
              variant: 'key',
              title: 'Identity is the new perimeter',
              body:
                'On-prem, the firewall was the perimeter. In the cloud there is no edge to stand on — **identity is the perimeter**. Almost every cloud breach traces back to an over-permissioned or exposed credential, which is why IAM gets its own module next.',
            },
          ],
        },
        {
          id: 'cloud-m1-l3',
          title: 'The Shared Responsibility Model',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'The single most misunderstood diagram in cloud — who secures what, and where the costly assumptions hide.',
          objectives: [
            'State who is responsible for which layer under each service model',
            'Identify a real-world gap caused by a shared-responsibility misunderstanding',
          ],
          blocks: [
            {
              id: 'cloud-m1-l3-b1',
              type: 'concept',
              title: 'Security OF the cloud vs IN the cloud',
              body:
                'The provider is responsible for security **of** the cloud — the hardware, the hypervisor, the physical data center. You are responsible for security **in** the cloud — your data, your identities, your configurations, your network rules. "The provider handles security" is the assumption that causes most cloud breaches: the provider never configures your S3 bucket policy for you.',
            },
            {
              id: 'cloud-m1-l3-b2',
              type: 'reflection',
              title: 'Draw the line',
              body:
                'Pick one service you have used (or want to use) and, in 3–4 sentences, write where the responsibility line falls for it. Save this — you will reuse "who owns this layer?" thinking in every CSPM finding you triage later.',
            },
          ],
        },
        {
          id: 'cloud-m1-l4',
          title: 'How the Cloud Changes the Threat Surface',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'Ephemeral assets, public-by-mistake storage, API-driven everything, and credential sprawl — the attacks that barely existed on-prem.',
          objectives: [
            'Describe cloud-specific attack patterns (misconfig, credential theft, metadata abuse)',
            'Explain why speed and self-service make misconfiguration the top cloud risk',
          ],
          blocks: [],
        },
        {
          id: 'cloud-m1-l5',
          title: 'Hands-On: Tour the Console & Read a Bucket Policy',
          kind: 'interactive',
          estimatedMinutes: 22,
          summary:
            'Open a real provider console (free tier), inspect a storage bucket’s exposure, and reason about who can reach it.',
          objectives: [
            'Navigate a cloud console to find storage and its access settings',
            'Read an object-storage access configuration and judge whether it is safe',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'cloud-m1-assessment',
        title: 'Cloud Fundamentals Mastery Check',
        type: 'quiz',
        description:
          'Mixed quiz plus a short-answer item: given a deployment, state who is responsible for each layer and name the most likely misconfiguration. ≥80% unlocks Module 2.',
        passThreshold: 0.8,
        estimatedMinutes: 20,
      },
    },

    /* -------- M2: IAM & Least Privilege (rich sample lessons) ----- */
    {
      id: 'cloud-m2',
      title: 'Identity & Access Management: Least-Privilege Design',
      tagline: 'In the cloud, identity is the perimeter — so design it like one.',
      stage: 2,
      estimatedHours: 22,
      summary:
        'The heart of cloud security: users, roles, policies and trust relationships; how to read and write least-privilege policy documents; federation and short-lived credentials; and how to find and fix the over-permissioned identities attackers love.',
      objectives: [
        'Explain principals, roles, policies and trust/assume-role relationships',
        'Read and author a least-privilege IAM policy document',
        'Prefer short-lived, federated credentials over long-lived keys',
        'Detect and remediate privilege-escalation and over-permission paths',
      ],
      nice: {
        competencies: ['Identity & Access Management', 'Access Controls'],
        workRoles: ['Security Architect', 'Systems Security Analyst'],
      },
      prerequisites: ['cloud-m1'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cloud-m2-l1',
          title: 'Principals, Roles, Policies & Trust',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'The four nouns of cloud identity and how they snap together to answer "who can do what to which resource".',
          objectives: [
            'Define principal, role, policy and trust relationship',
            'Trace how an assume-role grants temporary access',
          ],
          blocks: [
            {
              id: 'cloud-m2-l1-b1',
              type: 'concept',
              title: 'The grammar of cloud access',
              body:
                'A **principal** (a user, a service, a workload) is granted a **policy** — a document listing allowed actions on resources. A **role** is a bundle of permissions a principal can temporarily *assume* via a **trust relationship**. Every access decision is the cloud answering one question: "does an attached policy allow this principal to take this action on this resource?"',
            },
            {
              id: 'cloud-m2-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'Roles over keys, always',
              body:
                'Long-lived access keys are the cloud equivalent of a password written on a sticky note: they leak in code, logs and screenshots. Roles hand out **short-lived, auto-expiring** credentials instead. Designing for roles is the single biggest IAM hygiene win.',
            },
          ],
        },
        {
          id: 'cloud-m2-l2',
          title: 'Reading & Writing Least-Privilege Policies',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary:
            'Dissect a policy document line by line, spot the wildcard that grants too much, and tighten it to exactly what the workload needs.',
          objectives: [
            'Interpret Effect/Action/Resource/Condition in a policy',
            'Rewrite an over-broad policy to least privilege',
          ],
          blocks: [
            {
              id: 'cloud-m2-l2-b1',
              type: 'concept',
              title: 'The four fields that matter',
              body:
                'A policy statement is just **Effect** (Allow/Deny), **Action** (the API calls), **Resource** (what they apply to), and an optional **Condition**. The danger sign is the wildcard: `"Action": "*"` on `"Resource": "*"` is admin-over-everything. Least privilege means naming the *specific* actions on the *specific* resources a workload actually uses.',
            },
            {
              id: 'cloud-m2-l2-b2',
              type: 'example',
              title: 'From dangerous to scoped',
              body:
                'A policy with `s3:*` on `*` lets a leaked credential read, write and **delete every bucket** in the account. Scoped to `s3:GetObject` on `arn:aws:s3:::reports-bucket/*`, the same leaked credential can only read one folder of one bucket. Same workload, a fraction of the blast radius.',
            },
            {
              id: 'cloud-m2-l2-b3',
              type: 'check',
              question: {
                prompt:
                  'A workload that only needs to read files from one bucket is given a policy allowing s3:* on all resources. What is the primary risk?',
                options: [
                  { id: 'a', label: 'The policy will be rejected as invalid' },
                  { id: 'b', label: 'It is slower than a scoped policy' },
                  { id: 'c', label: 'If the credential leaks, the blast radius is the entire S3 footprint' },
                  { id: 'd', label: 'Nothing — wildcards are best practice for convenience' },
                ],
                correct: ['c'],
                multiple: false,
                explanation:
                  'Over-permissioning does not break anything functionally, which is exactly why it spreads. The cost shows up only when the credential is compromised — and then the blast radius is everything the wildcard allowed.',
              },
            },
          ],
        },
        {
          id: 'cloud-m2-l3',
          title: 'Federation & Short-Lived Credentials',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'SSO, identity federation, and workload identity — how to stop minting long-lived keys entirely.',
          objectives: [
            'Explain federation and single sign-on into a cloud account',
            'Describe workload identity as the replacement for static keys',
          ],
          blocks: [],
        },
        {
          id: 'cloud-m2-l4',
          title: 'Hunting Over-Permissioned Identities',
          kind: 'interactive',
          estimatedMinutes: 22,
          summary:
            'Use access analyzers and last-used data to find dormant admins and risky escalation paths, then right-size them.',
          objectives: [
            'Find unused permissions and dormant privileged identities',
            'Identify a privilege-escalation path and propose the fix',
          ],
          blocks: [],
        },
        {
          id: 'cloud-m2-l5',
          title: 'Project: Right-Size an Account’s IAM',
          kind: 'project',
          estimatedMinutes: 35,
          summary:
            'Given an account with messy permissions, produce a least-privilege remediation: scoped policies, role replacements for keys, and a short justification.',
          objectives: [
            'Convert over-broad policies to least privilege',
            'Document the change and its risk reduction for reviewers',
          ],
          blocks: [
            {
              id: 'cloud-m2-l5-b1',
              type: 'reflection',
              title: 'Deliverable',
              body:
                'Write a one-page IAM remediation summary: the three riskiest findings, the exact policy/role change for each, and one sentence per change on how it shrinks the blast radius. This is the kind of artifact a hiring manager loves to see — keep it for your portfolio.',
            },
          ],
        },
      ],
      assessment: {
        id: 'cloud-m2-assessment',
        title: 'Least-Privilege Policy Challenge',
        type: 'lab-challenge',
        description:
          'Given an over-permissioned account, rewrite two policies to least privilege and justify the changes in writing. Scored on correctness + clarity. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 45,
      },
    },

    /* ============================================================== */
    /* STAGE 3 · POSTURE, IaC & WORKLOAD SECURITY                      */
    /* ============================================================== */

    /* -------- M3: CSPM (rich sample lesson + s3-misconfig lab) ---- */
    {
      id: 'cloud-m3',
      title: 'Cloud Security Posture Management (CSPM)',
      tagline: 'Misconfiguration is the #1 cloud breach cause — measure it continuously.',
      stage: 3,
      estimatedHours: 20,
      summary:
        'How to find and fix misconfigurations at scale: benchmarks (CIS), CSPM tooling, the classic public-storage-bucket failure, network exposure, encryption and logging gaps, and how to turn findings into a prioritized remediation plan.',
      objectives: [
        'Explain what CSPM does and how it maps findings to benchmarks like CIS',
        'Identify the highest-impact misconfigurations (public storage, open ports, no encryption/logging)',
        'Triage and prioritize a CSPM finding set by risk',
        'Produce a remediation plan that a team can execute',
      ],
      nice: {
        competencies: ['Vulnerability Assessment', 'Security Configuration Management'],
        workRoles: ['Systems Security Analyst', 'Cyber Defense Analyst'],
      },
      prerequisites: ['cloud-m2'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cloud-m3-l1',
          title: 'What CSPM Is & Why It Exists',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'Continuous configuration assessment against benchmarks — the cloud answer to "is anything dangerously misconfigured right now?"',
          objectives: [
            'Describe how CSPM continuously evaluates configuration against a benchmark',
            'Explain why misconfiguration, not zero-days, is the top cloud breach cause',
          ],
          blocks: [
            {
              id: 'cloud-m3-l1-b1',
              type: 'concept',
              title: 'Posture, measured continuously',
              body:
                'A **CSPM** tool reads your cloud configuration through its APIs and checks every resource against a **benchmark** (most commonly the **CIS Benchmarks**): is this bucket public, is that database encrypted, is logging on, is this port open to the world? Because cloud changes by the minute, this check runs **continuously** — a resource that was safe at 9am can be exposed by a careless deploy at noon.',
            },
            {
              id: 'cloud-m3-l1-b2',
              type: 'callout',
              variant: 'industry',
              title: 'Where the breaches actually come from',
              body:
                'The headline cloud incidents are rarely exotic exploits — they are public buckets, leaked keys and open management ports. CSPM exists because the cheapest way to prevent a breach is to never ship the misconfiguration in the first place, and the second cheapest is to catch it within minutes.',
            },
          ],
        },
        {
          id: 'cloud-m3-l2',
          title: 'The Classic: Public Storage Buckets',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary:
            'Walk through the most common cloud data leak — a misconfigured storage bucket — then find the exposed one in the lab.',
          objectives: [
            'Recognize the configuration that makes a bucket world-readable',
            'Identify and remediate a misconfigured bucket from its policy',
          ],
          blocks: [
            {
              id: 'cloud-m3-l2-b1',
              type: 'concept',
              title: 'How a bucket goes public',
              body:
                'Object storage is private by default — until someone, chasing a quick fix, flips a block-public-access toggle or attaches a policy with `"Principal": "*"`. Now the whole internet can list and download every object. No exploit required; the door was simply left open. The fix is layered: account-level public-access blocks, scoped bucket policies, and a CSPM rule that screams the moment a bucket turns public.',
            },
            {
              id: 'cloud-m3-l2-b2',
              type: 'lab',
              title: 'Lab: Identify the Misconfigured Cloud Bucket',
              labId: 's3-misconfig',
              body:
                'Inspect the bucket configurations and pick out the one exposed to the public internet — then describe exactly what to change to close it.',
            },
            {
              id: 'cloud-m3-l2-b3',
              type: 'reflection',
              title: 'Explain the fix',
              body:
                'In two sentences a non-technical manager could follow, explain why the bucket was exposed and what you changed. Translating a config finding into plain business risk is a daily cloud-security skill.',
            },
          ],
          labIds: ['s3-misconfig'],
        },
        {
          id: 'cloud-m3-l3',
          title: 'Network Exposure, Encryption & Logging Gaps',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'The other recurring findings: security groups open to 0.0.0.0/0, unencrypted data at rest, and audit logging switched off.',
          objectives: [
            'Spot an over-permissive network rule',
            'Explain why encryption-at-rest and audit logging are baseline controls',
          ],
          blocks: [],
        },
        {
          id: 'cloud-m3-l4',
          title: 'Triage & Prioritize a Finding Set',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary:
            'Turn a noisy wall of CSPM findings into a ranked, actionable list using exposure and impact.',
          objectives: [
            'Rank findings by exploitability and blast radius',
            'Separate must-fix-now from accepted-risk',
          ],
          blocks: [],
        },
        {
          id: 'cloud-m3-l5',
          title: 'Project: CSPM Remediation Report',
          kind: 'project',
          estimatedMinutes: 30,
          summary:
            'From a provided finding set, write the remediation report you would hand a platform team: prioritized findings, fixes and owners.',
          objectives: [
            'Author a prioritized, actionable remediation report',
            'Map each finding to a CIS control',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'cloud-m3-assessment',
        title: 'Posture Triage Challenge',
        type: 'lab-challenge',
        description:
          'Given a CSPM finding set, identify the two highest-risk misconfigurations, propose remediations, and rank the rest with justification. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 45,
      },
    },

    /* -------- M4: IaC & Container Security (structural) ----------- */
    {
      id: 'cloud-m4',
      title: 'Securing Infrastructure-as-Code & Containers',
      tagline: 'Shift left: catch the misconfiguration before it ever ships.',
      stage: 3,
      estimatedHours: 22,
      summary:
        'Security where modern cloud is actually built: scanning Terraform/CloudFormation before deploy, securing the container image and registry, hardening Kubernetes, and wiring guardrails into the CI/CD pipeline (DevSecOps).',
      objectives: [
        'Scan Infrastructure-as-Code for misconfigurations before deployment',
        'Build and scan a minimal, least-privilege container image',
        'Apply baseline Kubernetes hardening (RBAC, network policy, no privileged pods)',
        'Embed security gates into a CI/CD pipeline',
      ],
      nice: {
        competencies: ['Secure Software Development', 'Security Configuration Management'],
        workRoles: ['Security Architect', 'Systems Security Analyst'],
      },
      prerequisites: ['cloud-m3'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cloud-m4-l1',
          title: 'Infrastructure-as-Code & Why It’s a Security Win',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'IaC makes infrastructure reviewable and repeatable — which means you can catch misconfigurations in a pull request instead of in production.',
          objectives: [
            'Explain what IaC is and how it makes config auditable',
            'Describe the "scan the template before deploy" model',
          ],
          blocks: [
            {
              id: 'cloud-m4-l1-b1',
              type: 'concept',
              title: 'Infrastructure you can review like code',
              body:
                'With **Infrastructure-as-Code** (Terraform, CloudFormation, Bicep) your whole environment is defined in text files. That is a gift to security: a public bucket or an open security group now shows up as a line in a **pull request** you can scan and block *before* it is ever created. Fixing a misconfiguration in code is minutes; fixing it after a breach is months.',
            },
            {
              id: 'cloud-m4-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'This is what "shift left" means',
              body:
                'Shifting left = moving security checks earlier, to the moment of authoring rather than the moment of incident. IaC scanning is the purest example: the defender reviews the blueprint instead of chasing the building after it is on fire.',
            },
          ],
        },
        {
          id: 'cloud-m4-l2',
          title: 'Scanning IaC Before Deploy',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary:
            'Run a policy scanner over a Terraform template, read the findings, and fix the template to pass.',
          objectives: [
            'Run an IaC scanner and interpret its findings',
            'Remediate a flagged template and re-scan to green',
          ],
          blocks: [],
        },
        {
          id: 'cloud-m4-l3',
          title: 'Container & Image Security',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary:
            'Minimal base images, no secrets in layers, non-root users, and scanning the image for known vulnerabilities.',
          objectives: [
            'Build a least-privilege, minimal container image',
            'Scan an image and remediate vulnerable dependencies',
          ],
          blocks: [],
        },
        {
          id: 'cloud-m4-l4',
          title: 'Kubernetes Hardening Basics',
          kind: 'theory',
          estimatedMinutes: 15,
          summary:
            'RBAC, network policies, secrets handling and why a privileged pod is a cluster-wide risk.',
          objectives: [
            'Apply least privilege with Kubernetes RBAC',
            'Explain network policies and the danger of privileged pods',
          ],
          blocks: [],
        },
        {
          id: 'cloud-m4-l5',
          title: 'DevSecOps: Gates in the Pipeline',
          kind: 'project',
          estimatedMinutes: 30,
          summary:
            'Wire IaC and image scans into CI so a risky change fails the build — security as an automatic guardrail, not a manual gate.',
          objectives: [
            'Add a security scan step that can fail a build',
            'Document the guardrail and its rationale in a PR',
          ],
          blocks: [
            {
              id: 'cloud-m4-l5-b1',
              type: 'reflection',
              title: 'Deliverable: the hardening PR',
              body:
                'Open a pull request that adds an IaC/image scan gate to a sample pipeline and fixes the issues it surfaces. Write the PR description as you would for real reviewers: what the gate does, what it caught, and why it is worth the few seconds it adds to every build. This PR is a portfolio piece.',
            },
          ],
        },
      ],
      assessment: {
        id: 'cloud-m4-assessment',
        title: 'Harden-the-Deployment Project',
        type: 'project',
        description:
          'Submit a hardened IaC template + container image with a CI scan gate, plus a short README explaining each fix. Peer + mentor reviewed against least-privilege and shift-left criteria.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },

    /* -------- M5: Cloud Detection & Response (structural + lab) --- */
    {
      id: 'cloud-m5',
      title: 'Cloud Detection & Response',
      tagline: 'When prevention fails, see it fast and contain it cleanly.',
      stage: 3,
      estimatedHours: 20,
      summary:
        'Cloud-native monitoring and incident response: the audit-log control plane (CloudTrail and friends), high-signal detections (impossible travel, key abuse, public-exposure changes), inspecting requests and metadata, and running a cloud incident from detection to containment.',
      objectives: [
        'Locate and read the cloud audit-log control plane (e.g. CloudTrail)',
        'Build high-signal detections for credential abuse and exposure changes',
        'Investigate a request/metadata trail to scope an incident',
        'Execute a cloud incident-response runbook to containment',
      ],
      nice: {
        competencies: ['Incident Detection', 'Incident Response', 'Log Analysis'],
        workRoles: ['Cyber Defense Analyst', 'Systems Security Analyst'],
      },
      prerequisites: ['cloud-m4'],
      masteryRequired: true,
      lessons: [
        {
          id: 'cloud-m5-l1',
          title: 'The Audit-Log Control Plane',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'Every API call in the cloud is logged — CloudTrail / Activity Log / Audit Logs are your single source of truth for "who did what".',
          objectives: [
            'Explain what the cloud audit log records and why it is the IR foundation',
            'Identify the events that matter most for detection',
          ],
          blocks: [
            {
              id: 'cloud-m5-l1-b1',
              type: 'concept',
              title: 'Everything is an API call',
              body:
                'In the cloud, *every* action — launching a VM, reading a secret, changing a bucket policy — is an API call, and the **audit log** (AWS CloudTrail, Azure Activity Log, GCP Audit Logs) records the identity, the action, the source IP and the time of each one. That makes the audit log the cloud defender’s equivalent of the SOC log feed: turn it on everywhere, and almost any investigation starts here with "who called what, from where, when?"',
            },
            {
              id: 'cloud-m5-l1-b2',
              type: 'callout',
              variant: 'warning',
              title: 'Logging off = blind',
              body:
                'An attacker’s first move in a mature cloud intrusion is often to disable or delete the audit trail. Centralizing logs to an account the workload identities cannot touch is what keeps your visibility — and your evidence — intact.',
            },
          ],
        },
        {
          id: 'cloud-m5-l2',
          title: 'High-Signal Cloud Detections',
          kind: 'interactive',
          estimatedMinutes: 20,
          summary:
            'Build the detections that actually catch cloud attacks: anomalous key use, impossible travel, and a resource suddenly turning public.',
          objectives: [
            'Author detections for credential abuse and exposure changes',
            'Tune a detection to cut false positives',
          ],
          blocks: [],
        },
        {
          id: 'cloud-m5-l3',
          title: 'Investigating a Request & Metadata Trail',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary:
            'Follow a suspicious request through the logs and inspect what was sent — the cloud version of reading the wire.',
          objectives: [
            'Trace a suspicious request through the audit log',
            'Read a captured request to scope what an attacker did',
          ],
          blocks: [
            {
              id: 'cloud-m5-l3-b1',
              type: 'lab',
              title: 'Lab: Inspect the Suspicious Request',
              labId: 'http-inspect',
              body:
                'Read the captured request/response from the audit trail and decide what the caller was actually trying to do — and whether it succeeded.',
            },
          ],
          labIds: ['http-inspect'],
        },
        {
          id: 'cloud-m5-l4',
          title: 'Running a Cloud Incident to Containment',
          kind: 'project',
          estimatedMinutes: 35,
          summary:
            'A simulated cloud incident: detect it, scope it from the logs, contain it (revoke the credential, lock the resource), and write it up.',
          objectives: [
            'Execute detection → scoping → containment for a cloud incident',
            'Document the timeline and containment actions clearly',
          ],
          blocks: [
            {
              id: 'cloud-m5-l4-b1',
              type: 'reflection',
              title: 'Deliverable: cloud incident runbook',
              body:
                'Turn what you just did into a reusable cloud incident runbook: the detection that fired, the log queries that scoped it, the exact containment steps (which credential to revoke, which resource to lock), and the one-line manager summary. A clean runbook is what makes the next incident calm instead of chaotic — keep it for your portfolio.',
            },
          ],
        },
      ],
      assessment: {
        id: 'cloud-m5-assessment',
        title: 'Cloud Incident Simulation',
        type: 'lab-challenge',
        description:
          'A timed simulated cloud breach: detect the activity, scope it from the audit log, choose the correct containment actions, and submit a short incident note. Scored on accuracy + clarity of write-up. ≥80% to complete the module track.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },
  ],

  /* ============================================================== */
  /* EMBEDDED WORK EXPERIENCE — the differentiator                   */
  /* ============================================================== */
  workExperience: {
    id: 'cloud-practicum',
    title: 'The Cloud Security Practicum',
    format: 'Supervised hardening of a real-ish cloud account + simulated cloud incident',
    durationWeeks: 4,
    summary:
      'A structured, apprenticeship-style phase that turns a trained learner into a day-one-productive cloud security engineer. Working in a sandboxed-but-realistic cloud account, learners fix the IAM, stand up posture management, harden a real deployment, and run a simulated cloud incident end to end under mentor supervision — producing portfolio artifacts an employer can verify.',
    activities: [
      'Audit and right-size the account’s IAM: replace long-lived keys with roles and scope over-broad policies to least privilege',
      'Enable and tune CSPM, then drive a finding set down by remediating the highest-risk misconfigurations',
      'Harden a live deployment via Infrastructure-as-Code (a scanned, reviewed PR) and add a CI security gate',
      'Stand up audit logging and high-signal detections, then detect and contain a red-team-injected cloud incident',
      'Present findings and the remediation roadmap to a "client" panel (mentors role-playing stakeholders)',
    ],
    deliverables: [
      'A CSPM remediation report (prioritized findings, fixes, owners, mapped to CIS controls)',
      'An IaC hardening pull request that fixes flagged misconfigurations and adds a scan gate',
      'A cloud incident runbook used to detect, scope and contain the simulated incident',
      'A mentor-signed competency sign-off mapped to NICE work-role tasks',
    ],
    mentorship:
      'Each learner is paired with a cloud-certified mentor for the duration; daily async check-ins, two live reviews per week, and a final assessed debrief.',
    competencies: [
      'Identity & Access Management',
      'Security Configuration Management',
      'Vulnerability Assessment',
      'Incident Detection',
      'Incident Response',
    ],
    softSkills: [
      'Professional written communication (remediation reports, PR descriptions, runbooks)',
      'Verbal communication & presenting risk to stakeholders',
      'Teamwork with platform/DevOps partners and working to deadlines',
      'Problem-solving under realistic constraints',
    ],
  },

  /* ============================================================== */
  /* BADGES (Open-Badges-style micro-credentials)                    */
  /* ============================================================== */
  badges: [
    {
      id: 'cloud-badge-foundations',
      title: 'Cloud Foundations Certified',
      description: 'Mastered cloud service models, multi-cloud building blocks and shared responsibility.',
      criteria: 'Pass the mastery check for Module 1.',
      icon: 'cloud',
    },
    {
      id: 'cloud-badge-iam',
      title: 'Least-Privilege Architect',
      description: 'Designed and remediated cloud IAM to least privilege.',
      criteria: 'Score ≥80% on the Least-Privilege Policy Challenge (M2).',
      icon: 'shield',
    },
    {
      id: 'cloud-badge-posture',
      title: 'Posture & IaC Defender',
      description: 'Triaged CSPM findings and hardened deployments via scanned Infrastructure-as-Code.',
      criteria: 'Pass the mastery checks for Modules 3 and 4.',
      icon: 'clipboard',
    },
    {
      id: 'cloud-badge-response',
      title: 'Cloud Incident Responder',
      description: 'Detected, scoped and contained a simulated cloud incident from the audit logs.',
      criteria: 'Score ≥80% on the Cloud Incident Simulation (M5).',
      icon: 'monitor',
    },
    {
      id: 'cloud-badge-graduate',
      title: 'Cloud Security Engineer (Graduate)',
      description: 'Completed the full Cloud Security course, the practicum and the secure-by-design capstone.',
      criteria: 'Earn all module badges, complete the practicum, and pass the capstone.',
      icon: 'cert',
    },
  ],

  /* ============================================================== */
  /* CAPSTONE                                                         */
  /* ============================================================== */
  capstone: {
    id: 'cloud-capstone',
    title: 'Cloud Capstone: Secure-by-Design a Cloud Workload',
    type: 'project',
    description:
      'A multi-day capstone: given a small, deliberately-imperfect cloud workload, the learner secures it end to end — designs least-privilege IAM, fixes posture findings, hardens the deployment with scanned Infrastructure-as-Code and a CI gate, enables logging and detections, then proves resilience against a planted incident. Deliverables: (1) a hardened, reviewable IaC repository, (2) a CSPM-style assessment report mapped to CIS controls, and (3) a stakeholder presentation of the design and residual risk. Assessed by mentors against the NICE work-role competencies and added to the learner’s portfolio. Aligns with AWS Security – Specialty exam readiness.',
    passThreshold: 0.8,
    estimatedMinutes: 600,
  },
}
