import type { Track } from '../types'

/** The four comparison tracks. Salary bands are indicative ranges (LPA). */
export const tracks: Track[] = [
  {
    id: 'soc',
    name: 'SOC / Blue Team',
    shortName: 'SOC / Blue',
    description:
      'Defend organizations in real time — monitor, triage and respond to threats from a Security Operations Center.',
    entryComplexity: 'Beginner',
    intensity: 'Low',
    timeToJob: '6–12 months',
    salary: { minLpa: 4, maxLpa: 18 },
    outline: [
      'Networking & log fundamentals',
      'SIEM tooling (Splunk / ELK / Sentinel)',
      'Alert triage & the MITRE ATT&CK framework',
      'Incident response playbooks',
      'Threat intelligence & hunting basics',
    ],
    labIds: ['log-flag', 'http-inspect', 'brute-force', 'exfil-spot'],
  },
  {
    id: 'pentest',
    name: 'Penetration Testing / Red Team',
    shortName: 'Pentest / Red',
    description:
      'Think like an attacker — find and exploit vulnerabilities before the real adversaries do, then report them.',
    entryComplexity: 'Intermediate',
    intensity: 'High',
    timeToJob: '9–18 months',
    salary: { minLpa: 5, maxLpa: 25 },
    outline: [
      'Linux, networking & scripting depth',
      'Web app security (OWASP Top 10)',
      'Exploitation & privilege escalation',
      'Active Directory attacks',
      'Reporting & responsible disclosure',
    ],
    labIds: ['param-tamper', 'b64-decode', 'http-inspect'],
  },
  {
    id: 'cloud',
    name: 'Cloud Security',
    shortName: 'Cloud',
    description:
      'Secure the platforms everything now runs on — identity, configuration and workloads across AWS, Azure and GCP.',
    entryComplexity: 'Intermediate',
    intensity: 'Medium',
    timeToJob: '9–15 months',
    salary: { minLpa: 8, maxLpa: 30 },
    outline: [
      'Cloud fundamentals (one provider deep)',
      'IAM & least-privilege design',
      'Network & storage security controls',
      'Infrastructure-as-Code & CSPM',
      'Container & Kubernetes security',
    ],
    labIds: ['s3-misconfig', 'http-inspect'],
  },
  {
    id: 'grc',
    name: 'GRC / Risk / Compliance',
    shortName: 'GRC / Risk',
    description:
      'Steer security strategy — map controls to frameworks, manage risk, and keep the organization audit-ready.',
    entryComplexity: 'Beginner',
    intensity: 'Low',
    timeToJob: '6–12 months',
    salary: { minLpa: 5, maxLpa: 22 },
    outline: [
      'Security frameworks (ISO 27001, NIST CSF)',
      'Risk assessment & treatment',
      'Data protection & privacy laws (GDPR, DPDP) & global regulations',
      'Audit, evidence & control mapping',
      'Policy writing & vendor risk',
    ],
    labIds: ['grc-control', 's3-misconfig'],
  },
]
