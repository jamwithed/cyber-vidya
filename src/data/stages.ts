import type { Stage } from '../types'

/**
 * The 4-stage cybersecurity roadmap.
 * Salary figures are indicative (LPA = lakhs per annum) and vary by city/company.
 */
export const stages: Stage[] = [
  {
    id: 1,
    title: 'Foundation',
    tagline: 'IT basics, networking, OS & scripting',
    description:
      'Build the bedrock every security career stands on: how computers, networks and operating systems actually work, plus enough scripting to automate the boring parts. You cannot secure what you do not understand.',
    difficulty: 'Beginner',
    duration: '0–6 months',
    topics: [
      'Computer & IT fundamentals',
      'Networking (TCP/IP, DNS, HTTP, ports)',
      'Linux & Windows administration',
      'Bash / Python scripting basics',
      'Virtualization & home labs',
    ],
    certs: ['(ISC)² CC', 'CompTIA ITF+', 'CompTIA Network+', 'Linux Essentials'],
    roles: [
      { role: 'IT Support / Helpdesk', minLpa: 2.5, maxLpa: 4.5 },
      { role: 'Jr. System / Network Admin', minLpa: 3, maxLpa: 6 },
      { role: 'NOC Technician', minLpa: 3.5, maxLpa: 6.5 },
    ],
  },
  {
    id: 2,
    title: 'Core Security',
    tagline: 'Blue basics, offensive basics & regulations',
    description:
      'Step into security proper. Learn how attacks work and how defenders detect them, get hands-on with a SIEM, run your first authorized exploits, and understand the laws and frameworks that govern the field globally.',
    difficulty: 'Intermediate',
    duration: '6–18 months',
    topics: [
      'Security concepts & CIA triad',
      'SOC workflows & SIEM monitoring',
      'Offensive basics (recon, exploitation, web)',
      'Cryptography fundamentals',
      'Compliance & regulations (IT Act, GDPR, ISO 27001)',
    ],
    certs: ['CompTIA Security+', 'eJPT', 'CEH', '(ISC)² SSCP'],
    roles: [
      { role: 'SOC Analyst (L1)', minLpa: 4, maxLpa: 7 },
      { role: 'Security Analyst', minLpa: 5, maxLpa: 9 },
      { role: 'Jr. Penetration Tester', minLpa: 5, maxLpa: 9 },
    ],
  },
  {
    id: 3,
    title: 'Specializations',
    tagline: 'SOC/DFIR · Pentest · Cloud · GRC',
    description:
      'Pick a lane and go deep. Whether you chase adversaries (DFIR), break systems (pentest), secure the cloud, or steer governance and risk (GRC), this is where you become genuinely employable as a specialist.',
    difficulty: 'Advanced',
    duration: '18–36 months',
    topics: [
      'Threat hunting & incident response (DFIR)',
      'Advanced penetration testing & red teaming',
      'Cloud security (AWS / Azure / GCP)',
      'Governance, Risk & Compliance (GRC)',
      'Detection engineering & malware analysis',
    ],
    certs: [
      'OSCP',
      'GIAC GCIH / GCFA',
      'AWS Security Specialty',
      '(ISC)² CCSP',
      'ISACA CISA',
    ],
    roles: [
      { role: 'SOC Analyst L2 / L3 · DFIR', minLpa: 8, maxLpa: 18 },
      { role: 'Penetration Tester', minLpa: 9, maxLpa: 22 },
      { role: 'Cloud Security Engineer', minLpa: 10, maxLpa: 26 },
      { role: 'GRC Analyst / Consultant', minLpa: 8, maxLpa: 20 },
    ],
  },
  {
    id: 4,
    title: 'Architect / Leadership',
    tagline: 'Design, strategy & people',
    description:
      'Move from doing to directing. Architect secure systems at scale, own enterprise risk, lead teams and programs, and translate security into business language for the boardroom.',
    difficulty: 'Advanced',
    duration: '36+ months',
    topics: [
      'Security architecture & zero-trust design',
      'Enterprise risk management',
      'Security program & team leadership',
      'Board-level communication & strategy',
      'Budgeting, vendor & policy governance',
    ],
    certs: ['(ISC)² CISSP', 'ISACA CISM', 'EC-Council CCISO', 'SABSA'],
    roles: [
      { role: 'Security Architect', minLpa: 20, maxLpa: 40 },
      { role: 'Security Manager / Lead', minLpa: 22, maxLpa: 45 },
      { role: 'CISO / Head of Security', minLpa: 35, maxLpa: 80 },
    ],
  },
]
