/**
 * Single source of truth for company info, contact details and marketing copy.
 * Sourced from cybervidya.co.in — edit here to update About / Contact / Footer.
 */

export const site = {
  name: 'Cyber Vidya',
  tagline: 'Professional Cybersecurity Experts & Educators',
  subTagline:
    'World-class cybersecurity & AI education that bridges the gap between academic learning and real industry needs.',
  mission:
    'At Cyber Vidya, we are dedicated to providing world-class cybersecurity and AI education. Our mission is to bridge the gap between academic learning and industry needs, offering practical, hands-on training that prepares professionals for real-world challenges.',

  contact: {
    email: 'info@cybervidya.co.in',
    phone: '+91 93091 65399',
    phoneHref: '+919309165399',
    address: '67, 6th Floor, Business Bay, Mumbai Naka, Nashik, Maharashtra 422001',
    instagram: { handle: '@cyber_vidya', url: 'https://instagram.com/cyber_vidya' },
    linkedin: { handle: 'Cyber Vidya', url: 'https://www.linkedin.com/company/cyber-vidya' },
  },

  /** Headline selling points used on the hero + About page. */
  sellingPoints: [
    {
      title: 'Future-Proof Curriculum',
      desc: 'Industry-matched, job-ready content updated to match what employers actually hire for.',
      icon: 'rocket',
    },
    {
      title: 'Real-World Training, Not Just Books',
      desc: 'Hands-on labs, live simulations and a browser-based mini-CTF playground.',
      icon: 'lab',
    },
    {
      title: 'Learn from the Best',
      desc: 'Industry-certified expert trainers with real offensive & defensive experience.',
      icon: 'expert',
    },
    {
      title: 'Your Career, Our Priority',
      desc: 'Dedicated career guidance, internships and placement support.',
      icon: 'career',
    },
    {
      title: 'Internationally Recognized Certifications',
      desc: 'Prepare for globally respected credentials that travel with you.',
      icon: 'cert',
    },
    {
      title: 'One-on-One Mentorship',
      desc: 'Personal mentorship and a strong industry network behind every learner.',
      icon: 'mentor',
    },
  ],

  /** Compact pointers shown as a strip under the hero headline. */
  heroPointers: [
    'Hands-on labs & live mini-CTF',
    'Industry-certified trainers',
    'Placement & career support',
    'Globally recognized certifications',
  ],

  /** Programs offered (from the live site). */
  programs: [
    {
      title: 'Career-Oriented Cybersecurity Program',
      desc: 'A structured path from fundamentals to job-ready specialist, mapped to the roadmap on this site.',
    },
    {
      title: 'Application Security',
      desc: 'Secure coding, OWASP Top 10, web & API vulnerability assessment.',
    },
    {
      title: 'Infrastructure & Network Security',
      desc: 'Hardening, monitoring, and defending networks and systems end to end.',
    },
    {
      title: 'Offensive Security & Red Teaming',
      desc: 'Ethical hacking, exploitation and adversary simulation, hands-on.',
    },
    {
      title: 'AI & Machine Learning',
      desc: 'Applied AI/ML programs for the next generation of security and data talent.',
    },
  ],

  /** Enterprise services (from the live site). */
  services: [
    'Vulnerability assessments',
    'Enterprise security solutions',
    'Incident response planning',
    'Staff security training workshops',
  ],

  /** Trust / proof points. */
  trust: {
    clients: ['TechCorp Solutions', 'FinSecure Bank'],
    institutions: ['Patkar College', 'NMIMS College'],
    sectors: ['Healthcare', 'Finance', 'Manufacturing', 'Technology'],
    learningModes: ['Classroom', 'Online', 'Hybrid'],
  },
} as const
