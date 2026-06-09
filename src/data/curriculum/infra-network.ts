import type { CourseCurriculum } from '../../types'

/**
 * INFRASTRUCTURE & NETWORK SECURITY — structural curriculum.
 *
 * "Infrastructure & Network Security" (course id: infra-network).
 * A beginner, foundational course that doubles as the classic IT → security
 * bridge: most security professionals enter the field from a networking or
 * sysadmin background, and this course meets them exactly there. It carries a
 * learner from "what is a subnet?" to standing up segmentation, hardening hosts,
 * and building the logging + detection that lets you actually see an attack.
 *
 * Authored at STRUCTURAL depth, mirroring the flagship template
 * (src/data/curriculum/career-program.ts):
 *  - Foundation modules use stage 1 (networking + hardening basics);
 *    monitoring, detection and IAM use stage 2.
 *  - Every module carries full lesson metadata; the two or three most important
 *    lessons are fleshed to block depth (concept / lab / check / reflection),
 *    with a real `lab` block wherever one fits.
 *
 * Pedagogy baked into the shape (see docs/curriculum/README.md):
 *  - Micro-learning: theory lessons are 7–15 min; labs/projects run longer.
 *  - Every module interleaves theory → worked example → lab → retrieval check.
 *  - Mastery gating: pass the module assessment (≥80%) to unlock the next.
 *  - Soft skills via documentation / runbook-writing reflection blocks.
 *  - NICE Work Role + Competency mapping on every module.
 */
export const infraNetworkCurriculum: CourseCurriculum = {
  courseId: 'infra-network',
  title: 'Infrastructure & Network Security',
  format: 'Classroom · Online · Hybrid',
  totalEstimatedHours: 130,
  weeklyCommitment: '10–14 hrs/week (≈8–12 weeks)',
  outcomeRole: 'Network Security Engineer / Security Administrator',
  capstoneCert: 'CompTIA Network+ → CompTIA Security+',
  niceWorkRoles: [
    'Network Operations Specialist',
    'System Administrator',
    'Cyber Defense Infrastructure Support',
  ],

  modules: [
    /* ============================================================== */
    /* STAGE 1 · NETWORKING & HARDENING FOUNDATIONS                    */
    /* ============================================================== */

    /* -------- M1: Network Foundations (FLESHED) ------------------- */
    {
      id: 'infra-m1',
      title: 'Network Foundations: Protocols, Addressing & the Stack',
      tagline: 'You cannot defend a network you cannot read.',
      stage: 1,
      estimatedHours: 22,
      summary:
        'The bedrock of the whole course: the OSI/TCP-IP model, IP addressing and subnetting, the protocols that carry real traffic (DNS, DHCP, HTTP/S, SSH), and how to read a packet. We stay hands-on — you will inspect real request/response pairs, not just memorize layers.',
      objectives: [
        'Map a real conversation onto the OSI and TCP/IP models',
        'Work with IPv4 addressing, subnets and CIDR notation',
        'Recall the well-known ports and the role of DNS, DHCP, HTTP/S and SSH',
        'Read a raw HTTP request/response and interpret what the server is saying',
      ],
      nice: {
        competencies: ['Network Fundamentals', 'Infrastructure Design'],
        workRoles: ['Network Operations Specialist', 'Cyber Defense Infrastructure Support'],
      },
      prerequisites: ['Basic computer literacy (use a browser, install software)'],
      masteryRequired: true,
      lessons: [
        {
          id: 'infra-m1-l1',
          title: 'The Models: OSI & TCP/IP',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'Why we slice the network into layers, and how a single web request touches every one of them.',
          objectives: [
            'Name the OSI layers and the four TCP/IP layers',
            'Place a protocol (DNS, TCP, IP, Ethernet) at the correct layer',
            'Explain why layering is the defender’s map of where to look',
          ],
          blocks: [
            {
              id: 'infra-m1-l1-b1',
              type: 'concept',
              title: 'Layers are a defender’s map',
              body:
                'Networks are built in **layers** so each can change independently: physical wires at the bottom, then framing (Ethernet), addressing (IP), transport (TCP/UDP), and applications (HTTP, DNS) on top. The OSI model has seven layers; the practical TCP/IP model collapses them to four.\n\nFor a defender the layers are a **map of where problems live**. A cut cable is L1; an ARP spoof is L2; a routing issue is L3; a blocked port is L4; a malicious request is L7. Knowing the layer tells you which tool to reach for.',
            },
            {
              id: 'infra-m1-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'One request, every layer',
              body:
                'Loading a page touches them all: **DNS** (L7) to resolve the name, **TCP** (L4) to open a connection, **IP** (L3) to route packets, **Ethernet/Wi-Fi** (L2) to reach the next hop. Master the normal path and the abnormal jump out.',
            },
            {
              id: 'infra-m1-l1-b3',
              type: 'check',
              question: {
                prompt:
                  'An attacker poisons the ARP cache to redirect a victim’s traffic through their machine. Which layer is being abused?',
                options: [
                  { id: 'a', label: 'Layer 2 (Data Link)' },
                  { id: 'b', label: 'Layer 3 (Network)' },
                  { id: 'c', label: 'Layer 4 (Transport)' },
                  { id: 'd', label: 'Layer 7 (Application)' },
                ],
                correct: ['a'],
                multiple: false,
                explanation:
                  'ARP maps IP addresses to MAC addresses and operates at Layer 2. ARP spoofing is a classic Layer 2 attack — which is why L2 controls like dynamic ARP inspection exist.',
              },
            },
          ],
        },
        {
          id: 'infra-m1-l2',
          title: 'IP Addressing, Subnets & CIDR',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary:
            'IPv4 addresses, the subnet mask, and how CIDR carves a network into segments — the skill segmentation is built on.',
          objectives: [
            'Read an IPv4 address and its subnet mask',
            'Compute network and broadcast addresses for a /24 and /26',
            'Express a range in CIDR notation',
          ],
          blocks: [
            {
              id: 'infra-m1-l2-b1',
              type: 'concept',
              title: 'An address has two halves',
              body:
                'An IPv4 address like `10.20.5.37` is really two parts: a **network** portion and a **host** portion. The **subnet mask** (e.g. `/24`, or `255.255.255.0`) is the line between them. Everything sharing the same network portion is on the same subnet and can talk directly; crossing subnets requires a router — which is precisely where you place controls.',
            },
            {
              id: 'infra-m1-l2-b2',
              type: 'example',
              title: 'Reading 10.20.5.0/26',
              body:
                'A `/26` borrows 2 host bits, giving 4 subnets of 64 addresses each. For `10.20.5.0/26`:\n\n- **Network:** 10.20.5.0\n- **Usable hosts:** 10.20.5.1 – 10.20.5.62\n- **Broadcast:** 10.20.5.63\n\nThe next subnet starts at 10.20.5.64. Subnetting like this is how you put servers, users and IoT on separate segments.',
            },
          ],
        },
        {
          id: 'infra-m1-l3',
          title: 'Core Protocols: DNS, DHCP, HTTP/S & SSH',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'The everyday protocols that carry the traffic you will defend — what each does and the port it lives on.',
          objectives: [
            'Explain DNS resolution and DHCP address assignment',
            'Recall well-known ports (53, 67/68, 80, 443, 22)',
            'Distinguish TCP from UDP and why each protocol picks one',
          ],
          blocks: [],
        },
        {
          id: 'infra-m1-l4',
          title: 'Reading HTTP on the Wire',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary:
            'Dissect a real request/response pair and interpret the status code the server returns.',
          objectives: [
            'Identify the method, headers and body of an HTTP request',
            'Interpret status-code classes (2xx/3xx/4xx/5xx)',
          ],
          blocks: [
            {
              id: 'infra-m1-l4-b1',
              type: 'concept',
              title: 'Anatomy of an HTTP exchange',
              body:
                'A request carries a **method** (GET/POST/…), a **path**, **headers** (metadata like `Host` and `Authorization`), and an optional **body**. The response leads with a **status code**: 2xx success, 3xx redirect, 4xx client error, 5xx server error. Reading these fluently is the first step toward spotting a malicious request.',
            },
            {
              id: 'infra-m1-l4-b2',
              type: 'lab',
              title: 'Lab: Inspect a Fake HTTP Request',
              labId: 'http-inspect',
              body:
                'Read the captured request/response pair and decide what the server is telling the client.',
            },
          ],
          labIds: ['http-inspect'],
        },
      ],
      assessment: {
        id: 'infra-m1-assessment',
        title: 'Networking Foundations Check',
        type: 'lab-challenge',
        description:
          'Mixed quiz on the models and protocols plus a subnetting exercise and one HTTP-capture interpretation. ≥80% unlocks Module 2.',
        passThreshold: 0.8,
        estimatedMinutes: 35,
      },
    },

    /* -------- M2: Perimeter & Segmentation (structural) ---------- */
    {
      id: 'infra-m2',
      title: 'Perimeter Defense: Firewalls, Segmentation & VPNs',
      tagline: 'Decide who may talk to whom — and enforce it.',
      stage: 1,
      estimatedHours: 24,
      summary:
        'How traffic is controlled as it crosses boundaries: stateful firewalls and rule design, network segmentation and VLANs, the DMZ pattern, NAT, and remote access over VPNs. You will write deny-by-default rule sets and design a segmented small-office network.',
      objectives: [
        'Write a deny-by-default firewall rule set for a stated policy',
        'Design VLAN-based segmentation that limits lateral movement',
        'Explain the DMZ pattern and where NAT fits',
        'Describe how a site-to-site and a client VPN protect traffic',
      ],
      nice: {
        competencies: ['Network Security', 'Infrastructure Design', 'Access Control'],
        workRoles: ['Network Operations Specialist', 'Cyber Defense Infrastructure Support'],
      },
      prerequisites: ['infra-m1'],
      masteryRequired: true,
      lessons: [
        {
          id: 'infra-m2-l1',
          title: 'How Firewalls Decide',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'Stateless vs stateful filtering, the anatomy of a rule, and why order and default-deny matter.',
          objectives: [
            'Explain stateful inspection',
            'Read a firewall rule (source, destination, port, action)',
          ],
          blocks: [
            {
              id: 'infra-m2-l1-b1',
              type: 'concept',
              title: 'Default deny, then allow on purpose',
              body:
                'A firewall evaluates traffic against an ordered list of **rules** (source, destination, port/protocol, action) and stops at the first match. A **stateful** firewall also remembers established connections so return traffic is allowed automatically.\n\nThe golden rule: **deny everything by default, then explicitly allow only what the business needs.** A permissive default is how flat, over-trusting networks get owned.',
            },
            {
              id: 'infra-m2-l1-b2',
              type: 'callout',
              variant: 'warning',
              title: 'Rule order is a trap',
              body:
                'Because matching stops at the first hit, a broad `allow` above a narrow `deny` silently neuters the deny. Always order from most specific to most general, and end with an explicit default-deny.',
            },
          ],
        },
        {
          id: 'infra-m2-l2',
          title: 'Segmentation & VLANs',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'Breaking a flat network into zones so a single compromise cannot reach everything.',
          objectives: [
            'Explain why segmentation limits blast radius',
            'Map assets (users, servers, IoT) to VLANs/zones',
          ],
          blocks: [
            {
              id: 'infra-m2-l2-b1',
              type: 'callout',
              variant: 'industry',
              title: 'Segmentation is the cheapest big win',
              body:
                'In most breach post-mortems the attacker’s freedom came from a **flat network** — one foothold could reach the domain controller, the backups and the databases. Segmentation rarely stops the first intrusion, but it is the single most effective control for containing it.',
            },
          ],
        },
        {
          id: 'infra-m2-l3',
          title: 'DMZ, NAT & Public-Facing Services',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'Where internet-facing services belong, and how NAT hides the internal network.',
          objectives: ['Describe the DMZ pattern', 'Explain source vs destination NAT'],
          blocks: [],
        },
        {
          id: 'infra-m2-l4',
          title: 'Design a Segmented Network',
          kind: 'project',
          estimatedMinutes: 40,
          summary:
            'Given a small-office brief, design VLANs and a deny-by-default rule set, and draw the topology.',
          objectives: [
            'Produce a segmentation plan and firewall rules from a policy',
            'Draw a labeled network diagram of your design',
          ],
          blocks: [
            {
              id: 'infra-m2-l4-b1',
              type: 'reflection',
              title: 'Deliverable: the design doc',
              body:
                'Write a one-page design for a 30-person office: list your VLANs and what lives on each, the inter-VLAN rules (deny-by-default), and attach a labeled diagram. Justify each allow rule in one line — "because X needs to reach Y for Z". Clear written justification of access decisions is a core engineer skill; this goes in your portfolio.',
            },
          ],
        },
      ],
      assessment: {
        id: 'infra-m2-assessment',
        title: 'Segmentation Design Review',
        type: 'project',
        description:
          'Submit your segmented-network design (VLANs, deny-by-default rules, diagram) with written justification. Mentor + peer reviewed for correctness and clarity.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },

    /* -------- M3: System & Endpoint Hardening (structural) ------- */
    {
      id: 'infra-m3',
      title: 'System & Endpoint Hardening',
      tagline: 'Shrink the attack surface on every box you run.',
      stage: 1,
      estimatedHours: 22,
      summary:
        'Turning a default install into a defensible host: secure baselines and CIS Benchmarks, disabling unneeded services and ports, patch management, account and credential hygiene, and endpoint protection. Applied to both Linux and Windows.',
      objectives: [
        'Apply a secure baseline and reason from a CIS Benchmark',
        'Disable unneeded services, ports and default accounts',
        'Establish a patch-management cadence and verify it',
        'Produce a repeatable hardening checklist for a host',
      ],
      nice: {
        competencies: ['System Hardening', 'System Administration', 'Configuration Management'],
        workRoles: ['System Administrator', 'Cyber Defense Infrastructure Support'],
      },
      prerequisites: ['infra-m2'],
      masteryRequired: true,
      lessons: [
        {
          id: 'infra-m3-l1',
          title: 'Attack Surface & Secure Baselines',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'What "attack surface" means in practice, and how a baseline (CIS) gives you a known-good target.',
          objectives: [
            'Define attack surface and name ways to reduce it',
            'Explain what a CIS Benchmark provides',
          ],
          blocks: [
            {
              id: 'infra-m3-l1-b1',
              type: 'concept',
              title: 'Every open thing is a door',
              body:
                'A host’s **attack surface** is everything an attacker could interact with: listening services, open ports, installed software, user accounts, scheduled tasks. Hardening is the discipline of **closing the doors you do not need**. A **CIS Benchmark** is a community-agreed checklist of those settings for a given OS — a known-good target you can measure against instead of guessing.',
            },
            {
              id: 'infra-m3-l1-b2',
              type: 'callout',
              variant: 'india',
              title: 'The IT → security bridge',
              body:
                'Hardening is where sysadmins and network admins cross naturally into security — most security professionals enter the field from an IT operations role, and these are the exact skills that make the jump. If you already administer servers, you are closer to a security career than you think.',
            },
          ],
        },
        {
          id: 'infra-m3-l2',
          title: 'Disabling Services, Ports & Default Accounts',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary:
            'Find what is listening, decide what is needed, and shut down the rest on Linux and Windows.',
          objectives: [
            'Enumerate listening services and open ports',
            'Disable unneeded services and remove/rename default accounts',
          ],
          blocks: [],
        },
        {
          id: 'infra-m3-l3',
          title: 'Patch Management',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'Why unpatched systems dominate breach reports, and how to run a sane patch cadence.',
          objectives: [
            'Describe a patch-management lifecycle',
            'Prioritize patches by exposure and severity',
          ],
          blocks: [],
        },
        {
          id: 'infra-m3-l4',
          title: 'Build a Hardening Checklist',
          kind: 'project',
          estimatedMinutes: 30,
          summary:
            'Turn a CIS-style baseline into a concrete, repeatable checklist for one of your lab hosts.',
          objectives: [
            'Translate a baseline into actionable checklist items',
            'Verify each item and record the result',
          ],
          blocks: [
            {
              id: 'infra-m3-l4-b1',
              type: 'reflection',
              title: 'Deliverable: the checklist',
              body:
                'Produce a hardening checklist for one lab host: each row is a control, the command/step to apply it, and how you verified it. Write it so a teammate could follow it without you in the room — that is the test of a good runbook. Save it for the work-experience phase.',
            },
          ],
        },
      ],
      assessment: {
        id: 'infra-m3-assessment',
        title: 'Hardening Hands-On Check',
        type: 'lab-challenge',
        description:
          'Harden a provided default install against a baseline, then submit your verified hardening checklist. Scored on coverage and correctness.',
        passThreshold: 0.8,
        estimatedMinutes: 45,
      },
    },

    /* ============================================================== */
    /* STAGE 2 · MONITORING, DETECTION & IDENTITY                      */
    /* ============================================================== */

    /* -------- M4: Identity & Access Management (structural) ------- */
    {
      id: 'infra-m4',
      title: 'Identity & Access Management',
      tagline: 'The new perimeter is who you are, not where you are.',
      stage: 2,
      estimatedHours: 20,
      summary:
        'Authentication and authorization done right: least privilege and RBAC, multi-factor authentication, directory services (Active Directory / LDAP), and credential hygiene. The controls that decide whether a stolen password becomes a breach.',
      objectives: [
        'Distinguish authentication from authorization',
        'Apply least privilege and role-based access control',
        'Explain MFA and why it blunts credential theft',
        'Describe how a directory (AD/LDAP) centralizes identity',
      ],
      nice: {
        competencies: ['Identity & Access Management', 'Access Control'],
        workRoles: ['System Administrator', 'Cyber Defense Infrastructure Support'],
      },
      prerequisites: ['infra-m3'],
      masteryRequired: true,
      lessons: [
        {
          id: 'infra-m4-l1',
          title: 'AuthN vs AuthZ & Least Privilege',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'Proving who you are versus what you may do — and why every account should have the minimum it needs.',
          objectives: [
            'Distinguish authentication from authorization',
            'Apply least privilege to a set of roles',
          ],
          blocks: [
            {
              id: 'infra-m4-l1-b1',
              type: 'concept',
              title: 'Two different questions',
              body:
                '**Authentication** answers "are you who you claim to be?" (password, token, biometric). **Authorization** answers "now that I know who you are, what are you allowed to do?" They are separate controls, and confusing them is a common design flaw.\n\n**Least privilege** says every account, service and process should hold the **minimum** rights needed for its job — no standing admin "just in case". It is the control that keeps one compromised account from becoming a compromised network.',
            },
            {
              id: 'infra-m4-l1-b2',
              type: 'check',
              question: {
                prompt:
                  'A logged-in user tries to open another user’s files and is refused. Which control just acted?',
                options: [
                  { id: 'a', label: 'Authentication' },
                  { id: 'b', label: 'Authorization' },
                  { id: 'c', label: 'Encryption' },
                  { id: 'd', label: 'Segmentation' },
                ],
                correct: ['b'],
                multiple: false,
                explanation:
                  'The user was already authenticated (logged in). Refusing access to resources they are not permitted to use is authorization.',
              },
            },
          ],
        },
        {
          id: 'infra-m4-l2',
          title: 'MFA & Strong Authentication',
          kind: 'theory',
          estimatedMinutes: 11,
          summary:
            'The factors, why MFA defeats most credential theft, and where it still has gaps.',
          objectives: [
            'Name the authentication factor types',
            'Explain why MFA stops password reuse and phishing payoffs',
          ],
          blocks: [],
        },
        {
          id: 'infra-m4-l3',
          title: 'Directory Services: AD & LDAP',
          kind: 'theory',
          estimatedMinutes: 14,
          summary:
            'How organizations centralize accounts, groups and policy — and why AD is a prime attacker target.',
          objectives: [
            'Describe what a directory service provides',
            'Explain groups, OUs and group policy at a basic level',
          ],
          blocks: [],
        },
        {
          id: 'infra-m4-l4',
          title: 'Stop the Brute Force',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary:
            'See credential attacks in the data: spot a failed-login spike and identify the attacking source, then reason about the controls (lockout, MFA, rate-limiting) that stop it.',
          objectives: [
            'Recognize a brute-force pattern in auth logs',
            'Identify the offending source IP and recommend a control',
          ],
          blocks: [
            {
              id: 'infra-m4-l4-b1',
              type: 'lab',
              title: 'Lab: Detect the Brute-Force Attempt',
              labId: 'brute-force',
              body:
                'A wall of login events just hit the logs. Find the attacking source, then name the IAM control that would have blunted it.',
            },
            {
              id: 'infra-m4-l4-b2',
              type: 'reflection',
              title: 'Recommend the fix',
              body:
                'In two or three sentences, recommend the controls you would put in place after this attack (account lockout, MFA, rate-limiting, alerting). Write it as you would for a change ticket your team will act on.',
            },
          ],
          labIds: ['brute-force'],
        },
      ],
      assessment: {
        id: 'infra-m4-assessment',
        title: 'IAM Concepts & Brute-Force Lab',
        type: 'lab-challenge',
        description:
          'Concept quiz on authN/authZ, least privilege and MFA, plus the brute-force detection lab with a short control recommendation. ≥80% to proceed.',
        passThreshold: 0.8,
        estimatedMinutes: 30,
      },
    },

    /* -------- M5: Monitoring, Logging & Detection (FLESHED) ------- */
    {
      id: 'infra-m5',
      title: 'Monitoring, Logging & Detection',
      tagline: 'If you are not logging it, you cannot see the attack.',
      stage: 2,
      estimatedHours: 26,
      summary:
        'Standing up the visibility layer: which log sources matter, centralizing them into a SIEM, baselining normal traffic, and writing detection rules for the patterns that signal an attack. You will hunt a flag through a noisy log and turn an observation into a reusable rule.',
      objectives: [
        'Choose the right log sources for hosts, network and identity',
        'Centralize logs into a SIEM and explain why aggregation matters',
        'Baseline normal behavior and spot meaningful deviations',
        'Write a simple, well-documented detection rule',
      ],
      nice: {
        competencies: ['Network Monitoring', 'Log Analysis', 'Incident Detection'],
        workRoles: ['Cyber Defense Infrastructure Support', 'Network Operations Specialist'],
      },
      prerequisites: ['infra-m4'],
      masteryRequired: true,
      lessons: [
        {
          id: 'infra-m5-l1',
          title: 'Log Sources & Centralization (SIEM)',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'What to log, where it comes from, and why pulling it all into one place changes the game.',
          objectives: [
            'List key log sources across hosts, network and identity',
            'Explain what a SIEM adds beyond scattered logs',
          ],
          blocks: [
            {
              id: 'infra-m5-l1-b1',
              type: 'concept',
              title: 'Visibility is a choice you make in advance',
              body:
                'Detection starts long before the attack — with the **log sources** you decided to collect: firewall and flow logs from the network, auth and system logs from hosts, and authentication events from your directory. A **SIEM** (Splunk, ELK, Microsoft Sentinel) pulls these into one place and **correlates** them, so a failed login here plus an odd outbound connection there become a single, visible story.',
            },
            {
              id: 'infra-m5-l1-b2',
              type: 'callout',
              variant: 'key',
              title: 'The infra engineer owns the pipeline',
              body:
                'Analysts read the alerts, but it is the network/security engineer who makes sure the **logs actually flow** — agents installed, sources forwarding, time synced, retention set. No pipeline, no detection. This is your part of the job.',
            },
          ],
        },
        {
          id: 'infra-m5-l2',
          title: 'Baselining Normal',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'You cannot recognize abnormal until you know normal — building a baseline of typical traffic and behavior.',
          objectives: [
            'Explain why a baseline is prerequisite to detection',
            'Identify what to measure for a traffic/behavior baseline',
          ],
          blocks: [],
        },
        {
          id: 'infra-m5-l3',
          title: 'Hunt the Flag in the Logs',
          kind: 'interactive',
          estimatedMinutes: 16,
          summary:
            'Core analyst skill #1: isolate the one meaningful line from a wall of noise.',
          objectives: [
            'Filter and search a noisy log effectively',
            'Extract the indicator hiding in the noise',
          ],
          blocks: [
            {
              id: 'infra-m5-l3-b1',
              type: 'lab',
              title: 'Lab: Find the Flag in the Log File',
              labId: 'log-flag',
              body:
                'Somewhere in this noisy auth log a single line matters. Read carefully and extract it.',
            },
          ],
          labIds: ['log-flag'],
        },
        {
          id: 'infra-m5-l4',
          title: 'Writing Detection Rules',
          kind: 'project',
          estimatedMinutes: 30,
          summary:
            'Turn a known-bad pattern into a documented, reusable detection rule — and explain its trade-offs.',
          objectives: [
            'Express a detection pattern as a rule (condition + threshold)',
            'Document a rule and reason about false positives',
          ],
          blocks: [
            {
              id: 'infra-m5-l4-b1',
              type: 'concept',
              title: 'A rule is a hypothesis you write down',
              body:
                'A detection **rule** encodes "this pattern is probably bad": a **condition** (e.g. failed logins from one source) and a **threshold** (e.g. more than 20 in 60 seconds). Good rules ship with documentation — what it catches, why, and the expected false positives — so the next person can tune it instead of muting it.',
            },
            {
              id: 'infra-m5-l4-b2',
              type: 'reflection',
              title: 'Deliverable: a documented rule',
              body:
                'Write one detection rule for the brute-force or exfiltration pattern: state the condition, the threshold, what it catches, and one realistic false positive. Documenting your detection logic clearly is what separates a maintainable SIEM from an alert swamp. Save this for the practicum.',
            },
          ],
        },
        {
          id: 'infra-m5-l5',
          title: 'Spotting Anomalous Traffic',
          kind: 'interactive',
          estimatedMinutes: 18,
          summary:
            'Apply your baseline: find the host whose outbound volume does not fit the pattern.',
          objectives: [
            'Distinguish normal vs anomalous egress against a baseline',
            'Flag the suspicious host and justify the call',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'infra-m5-assessment',
        title: 'Detection Lab Challenge',
        type: 'lab-challenge',
        description:
          'Hunt an indicator through a provided log set, then submit one documented detection rule with its expected false positives. Scored on accuracy and clarity of the write-up.',
        passThreshold: 0.8,
        estimatedMinutes: 45,
      },
    },

    /* -------- M6: Secure Operations & Incident Response (struct) -- */
    {
      id: 'infra-m6',
      title: 'Secure Operations & Network Incident Response',
      tagline: 'When detection fires, what do you actually do?',
      stage: 2,
      estimatedHours: 18,
      summary:
        'Operating and defending the network day to day: the incident-response lifecycle applied to network events, network access control (NAC) and wireless security, runbooks, and the change/backup discipline that keeps a hardened network hardened.',
      objectives: [
        'Walk a network incident through the IR lifecycle',
        'Contain a compromised host using segmentation and access control',
        'Explain NAC and core wireless security controls',
        'Write a runbook a teammate can execute under pressure',
      ],
      nice: {
        competencies: ['Incident Response', 'Network Security', 'Secure Operations'],
        workRoles: ['Cyber Defense Infrastructure Support', 'Network Operations Specialist'],
      },
      prerequisites: ['infra-m5'],
      masteryRequired: true,
      lessons: [
        {
          id: 'infra-m6-l1',
          title: 'The IR Lifecycle for Network Events',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'Prepare → detect → contain → eradicate → recover → learn, mapped to things that happen on a network.',
          objectives: [
            'Name the IR lifecycle phases',
            'Map a network compromise to each phase',
          ],
          blocks: [
            {
              id: 'infra-m6-l1-b1',
              type: 'concept',
              title: 'Containment buys you time',
              body:
                'The IR lifecycle runs **prepare → detect → contain → eradicate → recover → lessons learned**. For a network engineer the highest-leverage phase is **containment**: the segmentation and access control you built earlier let you **isolate a compromised host** — move it to a quarantine VLAN, drop its firewall rules — without taking the whole business offline. Good architecture is what makes fast containment possible.',
            },
          ],
        },
        {
          id: 'infra-m6-l2',
          title: 'NAC & Wireless Security',
          kind: 'theory',
          estimatedMinutes: 13,
          summary:
            'Controlling what may join the network at all, and securing the wireless edge.',
          objectives: [
            'Explain network access control (802.1X) at a basic level',
            'Describe core wireless controls (WPA2/3, segmentation of guest Wi-Fi)',
          ],
          blocks: [],
        },
        {
          id: 'infra-m6-l3',
          title: 'Respond to an Injected Incident',
          kind: 'interactive',
          estimatedMinutes: 25,
          summary:
            'A scenario drops an active compromise on your lab network — you detect it, contain it, and document what you did.',
          objectives: [
            'Identify the compromised host from the telemetry',
            'Contain it and record the response steps taken',
          ],
          blocks: [
            {
              id: 'infra-m6-l3-b1',
              type: 'reflection',
              title: 'Deliverable: the response log',
              body:
                'As you work the incident, keep a timestamped response log: what you saw, what you did, and when. Afterward, write a one-paragraph summary a manager can read in 10 seconds. This is the artifact that proves you can operate under pressure — it goes in your portfolio.',
            },
          ],
        },
        {
          id: 'infra-m6-l4',
          title: 'Runbooks, Change & Backups',
          kind: 'theory',
          estimatedMinutes: 12,
          summary:
            'The unglamorous discipline that keeps a secure network secure: documented procedures, change control and tested backups.',
          objectives: [
            'Explain why runbooks and change control reduce risk',
            'State what makes a backup actually restorable',
          ],
          blocks: [],
        },
      ],
      assessment: {
        id: 'infra-m6-assessment',
        title: 'Network Incident Simulation',
        type: 'lab-challenge',
        description:
          'A timed scenario: detect an injected network compromise, contain it correctly, and submit a response log + short incident summary. Scored on correct containment and clarity of the write-up.',
        passThreshold: 0.8,
        estimatedMinutes: 60,
      },
    },
  ],

  /* ============================================================== */
  /* EMBEDDED WORK EXPERIENCE — the differentiator                   */
  /* ============================================================== */
  workExperience: {
    id: 'infra-practicum',
    title: 'Network Defense Practicum',
    format: 'Supervised lab-network build-out + live-fire incident response',
    durationWeeks: 3,
    summary:
      'An apprenticeship-style phase that turns the skills into a portfolio. Each learner is handed a small, deliberately weak lab network: they harden it, stand up centralized logging and detection, and then respond to an incident a mentor injects against the environment they built — producing the same artifacts an employer would expect on day one.',
    activities: [
      'Harden a provided multi-host lab network (segmentation, firewall rules, host hardening) against a baseline',
      'Stand up centralized logging and a working detection pipeline into a SIEM',
      'Author detection rules for brute-force, anomalous egress and unauthorized access',
      'Respond to a mentor-injected network incident: detect, contain, eradicate, recover',
      'Present the build and the incident response to a "client" panel of mentors',
    ],
    deliverables: [
      'A completed hardening checklist for every host in the network',
      'A labeled network diagram of the segmented, defended topology',
      'A set of documented detection rules with expected false positives',
      'An incident response log + one-page incident summary from the injected event',
      'A mentor-signed competency sign-off mapped to NICE work-role tasks',
    ],
    mentorship:
      'Each learner is paired with an industry-certified network/security mentor; daily async check-ins, two live reviews per week, and a final assessed debrief on the build and the incident.',
    competencies: [
      'System Hardening',
      'Network Security',
      'Network Monitoring',
      'Incident Response',
      'Security Reporting',
    ],
    softSkills: [
      'Technical documentation (runbooks, hardening checklists, diagrams)',
      'Written incident communication for technical and non-technical readers',
      'Working to change-control and operational discipline',
      'Problem-solving under realistic constraints',
    ],
  },

  /* ============================================================== */
  /* BADGES (Open-Badges-style micro-credentials)                    */
  /* ============================================================== */
  badges: [
    {
      id: 'infra-badge-network-foundations',
      title: 'Network Foundations Certified',
      description: 'Mastered the protocols, addressing and packet-reading the course is built on.',
      criteria: 'Pass the mastery check for Module 1.',
      icon: 'network',
    },
    {
      id: 'infra-badge-hardening',
      title: 'Hardening & Segmentation Engineer',
      description: 'Designed a segmented network and produced a verified hardening checklist.',
      criteria: 'Pass the mastery checks for Modules 2 and 3.',
      icon: 'shield',
    },
    {
      id: 'infra-badge-iam',
      title: 'Access Control Practitioner',
      description: 'Applied least privilege, MFA and identity controls, and detected a credential attack.',
      criteria: 'Pass the mastery check for Module 4.',
      icon: 'clipboard',
    },
    {
      id: 'infra-badge-detection',
      title: 'Detection Engineer',
      description: 'Stood up logging and authored documented detection rules.',
      criteria: 'Score ≥80% on the Detection Lab Challenge (M5).',
      icon: 'monitor',
    },
    {
      id: 'infra-badge-graduate',
      title: 'Network Security Graduate',
      description: 'Completed the full Infrastructure & Network Security course, practicum and capstone.',
      criteria: 'Earn all module badges, complete the practicum, and pass the capstone.',
      icon: 'cert',
    },
  ],

  /* ============================================================== */
  /* CAPSTONE                                                         */
  /* ============================================================== */
  capstone: {
    id: 'infra-capstone',
    title: 'Capstone: Design, Harden & Defend a Network Segment',
    type: 'project',
    description:
      'A multi-day capstone that runs a network segment end to end: given an organizational brief, the learner designs a segmented topology, hardens every host to a baseline, stands up centralized logging with detection rules, and then detects and responds to a planted incident. Deliverables are (1) a network diagram and segmentation/firewall design, (2) per-host hardening checklists, (3) a documented detection rule set, and (4) an incident response report. Assessed by mentors against the NICE work-role competencies and added to the learner’s portfolio. Aligns with CompTIA Network+ and Security+ exam readiness.',
    passThreshold: 0.8,
    estimatedMinutes: 600,
  },
}
