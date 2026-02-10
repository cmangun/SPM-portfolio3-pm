import { Metadata } from 'next';

// Base URL for the site
export const siteConfig = {
  url: 'https://healthcare-ai-consultant.com',
  name: 'Christopher Mangun',
  title: 'Forward-Deployed AI Architect & Principal AI Platform Engineer',
  shortTitle: 'Healthcare AI Consultant',
  description: 'Forward-Deployed AI Architect and Principal AI Platform Engineer specializing in production-grade AI systems for regulated enterprises. Expert in Retrieval-Augmented Generation (RAG), enterprise knowledge platforms, and AI governance for healthcare and life sciences under HIPAA, FDA, and GxP constraints.',
  author: 'Christopher Mangun',
  email: 'cmangun@gmail.com',
  phone: '917-717-1894',
  location: 'New York, NY',
  linkedin: 'https://www.linkedin.com/in/christopher-mangun-5257265/',
  github: 'https://github.com/cmangun',
  keywords: [
    // Canonical Role Keywords (ATS Priority)
    'Forward Deployed Engineer',
    'FDE',
    'Principal AI Architect',
    'Principal AI Platform Engineer',
    'Enterprise AI Architect',
    'Machine Learning Platform Engineer',
    'MLOps Architect',
    'AI Governance Architect',
    'Regulated AI Systems Engineer',
    'Healthcare AI Architect',
    'Production AI Systems Lead',
    // Core Capability Keywords
    'Retrieval-Augmented Generation',
    'RAG',
    'Vector Search',
    'Enterprise Knowledge Systems',
    'AI Governance',
    'Human-in-the-Loop',
    'HITL',
    'Model Risk Management',
    'Auditability and Traceability',
    'Enterprise Search',
    'Data Provenance',
    'Policy Enforcement',
    'AI Evaluation and Monitoring',
    // Compliance Keywords
    'FDA 21 CFR Part 11',
    'HIPAA Compliance',
    'SOC 2',
    'Enterprise Security',
    'Audit Trails',
    'Access Controls',
    'RBAC',
    'ABAC',
    'Data Classification',
    'PHI Handling',
    // Domain Keywords
    'healthcare AI consultant',
    'pharma AI consultant',
    'life sciences AI',
    'medical device AI',
    'clinical AI systems',
    'regulated AI systems',
    'enterprise RAG systems',
    'healthcare LLM integration',
    'healthcare MLOps',
    'AI consultant New York',
  ],
};

// ATS/AEO Keyword Spine - for use in components
export const atsKeywords = {
  roles: [
    'Forward Deployed Engineer (FDE)',
    'Principal AI Architect',
    'Principal AI Platform Engineer',
    'Enterprise AI Architect',
    'Machine Learning Platform Engineer',
    'MLOps Architect',
    'AI Governance Architect',
    'Regulated AI Systems Engineer',
    'Healthcare AI Architect',
    'Production AI Systems Lead',
  ],
  capabilities: [
    'Retrieval-Augmented Generation (RAG)',
    'Vector Search',
    'Enterprise Knowledge Systems',
    'AI Governance',
    'Human-in-the-Loop (HITL)',
    'Model Risk Management',
    'Auditability and Traceability',
    'Enterprise Search',
    'Data Provenance',
    'Policy Enforcement',
    'AI Evaluation and Monitoring',
  ],
  compliance: [
    'FDA 21 CFR Part 11',
    'HIPAA Compliance',
    'SOC 2',
    'Enterprise Security',
    'Audit Trails',
    'Access Controls (RBAC / ABAC)',
    'Data Classification',
    'PHI Handling',
  ],
  techStack: {
    languages: ['Python', 'TypeScript'],
    aiml: ['Large Language Models (LLMs)', 'Retrieval-Augmented Generation (RAG)'],
    data: ['Vector Databases', 'Enterprise Search', 'Structured Metadata Stores'],
    platforms: ['Cloud-native infrastructure', 'Containerized services'],
    mlops: ['CI/CD', 'Monitoring', 'Evaluation pipelines'],
    governance: ['Audit logging', 'Access control', 'Human-in-the-loop workflows'],
  },
};

// Default metadata for the site
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: `${siteConfig.name} - ${siteConfig.title}`,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.png`],
    creator: '@cmangun',
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: '', // Add Google Search Console verification code
  },
};

// JSON-LD Schema for Person - ATS/AEO Optimized
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteConfig.url}/#person`,
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  jobTitle: 'Forward-Deployed AI Architect and Principal AI Platform Engineer',
  description: 'Forward-Deployed AI Architect and Principal AI Platform Engineer specializing in the design and deployment of production-grade AI systems for regulated enterprises. Expert in Retrieval-Augmented Generation (RAG), enterprise search, AI governance, MLOps, and human-in-the-loop systems, with deep experience in healthcare, life sciences, and compliance-driven environments.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New York',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  sameAs: [
    siteConfig.linkedin,
    siteConfig.github,
  ],
  knowsAbout: [
    'Forward Deployed Engineering',
    'Enterprise AI Architecture',
    'Retrieval-Augmented Generation (RAG)',
    'Vector Search',
    'AI Governance',
    'Human-in-the-Loop Systems',
    'MLOps',
    'Healthcare AI',
    'HIPAA Compliance',
    'FDA 21 CFR Part 11',
    'SOC 2',
    'Enterprise Knowledge Systems',
    'Model Risk Management',
    'Audit Trails',
    'Large Language Models',
    'Production AI Systems',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Cloud Professional Cloud Architect',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Professional Machine Learning Engineer',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Microsoft Azure AI Engineer Associate',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'AWS Machine Learning Specialty',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Lean Six Sigma Black Belt',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Stanford AI/ML Healthcare Specialization',
    },
  ],
};

// JSON-LD Schema for ProfessionalService - ATS/AEO Optimized
export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteConfig.url}/#service`,
  name: `${siteConfig.name} - Forward-Deployed AI Architect`,
  url: siteConfig.url,
  description: 'Forward-Deployed AI Architect and Principal AI Platform Engineer delivering production-grade AI systems for regulated enterprises. Specializing in RAG systems, enterprise knowledge platforms, AI governance, and HIPAA/FDA-compliant solutions.',
  provider: {
    '@id': `${siteConfig.url}/#person`,
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  serviceType: [
    'Forward Deployed Engineering',
    'Enterprise AI Architecture',
    'RAG System Implementation',
    'AI Governance Consulting',
    'MLOps Pipeline Development',
    'HIPAA Compliance Consulting',
    'FDA AI Regulatory Guidance',
    'Medical Device AI Advisory',
    'Enterprise Knowledge Systems',
    'Human-in-the-Loop AI Systems',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Enterprise AI Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'RAG System Implementation',
          description: 'Design and deploy retrieval-augmented generation systems for enterprise knowledge management with full governance and audit trails.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Governance Architecture',
          description: 'Build AI governance frameworks including human-in-the-loop workflows, policy enforcement, and model risk management.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'MLOps for Regulated Industries',
          description: 'Build production ML pipelines with audit trails for HIPAA, FDA 21 CFR Part 11, and SOC 2 compliance.',
        },
      },
    ],
  },
};

// JSON-LD Schema for WebSite with SearchAction
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: `${siteConfig.name} - Forward-Deployed AI Architect`,
  description: siteConfig.description,
  publisher: {
    '@id': `${siteConfig.url}/#person`,
  },
  inLanguage: 'en-US',
};

// Combined schema for homepage
export const homePageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    personSchema,
    professionalServiceSchema,
    websiteSchema,
  ],
};

// Helper to generate case study schema - ATS/AEO Optimized
export const generateCaseStudySchema = (caseStudy: {
  title: string;
  description: string;
  client: string;
  slug: string;
  datePublished?: string;
  image?: string;
  systemType?: string;
  outcome?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${siteConfig.url}/${caseStudy.slug}/#article`,
  headline: caseStudy.title,
  description: caseStudy.description,
  author: {
    '@id': `${siteConfig.url}/#person`,
  },
  publisher: {
    '@id': `${siteConfig.url}/#person`,
  },
  url: `${siteConfig.url}/${caseStudy.slug}`,
  datePublished: caseStudy.datePublished || '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  image: caseStudy.image || `${siteConfig.url}/og-image.png`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/${caseStudy.slug}`,
  },
  about: {
    '@type': 'Organization',
    name: caseStudy.client,
  },
  articleSection: 'Case Study',
  keywords: [
    'Forward Deployed Engineer',
    'Principal AI Architect',
    'enterprise AI',
    'production AI',
    'RAG systems',
    'AI governance',
    caseStudy.client,
    caseStudy.systemType || 'Enterprise AI Platform',
  ],
});

// FAQ Schema for common questions - ATS/AEO Optimized
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Forward Deployed Engineer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Forward Deployed Engineer (FDE) is a technical leader who embeds directly with customers to design, deploy, and operate production AI systems. FDEs own the full lifecycle from architecture through governance, compliance, reliability, and organizational adoption.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a Principal AI Architect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Principal AI Architect designs enterprise-scale AI systems including RAG platforms, LLM integrations, and AI governance frameworks. They ensure systems meet regulatory, security, and operational requirements in compliance-driven industries like healthcare and life sciences.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I specialize in healthcare, pharmaceutical, life sciences, and medical device industries. My clients include companies like Pfizer, Abbott, Novartis, Sanofi, and Medtronic. I deliver production AI systems under HIPAA, FDA 21 CFR Part 11, and SOC 2 constraints.',
      },
    },
    {
      '@type': 'Question',
      name: 'What AI services do you provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'I provide enterprise RAG system implementation, AI governance architecture, MLOps pipeline development, HIPAA compliance consulting, FDA AI regulatory guidance, and human-in-the-loop AI system design for regulated enterprises.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are your AI solutions compliant with healthcare regulations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all AI systems I design and implement are built with regulatory compliance as a core requirement, including HIPAA, FDA 21 CFR Part 11, SOC 2, and GxP standards. This includes audit trails, access controls (RBAC/ABAC), data classification, and PHI handling.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this candidate have production AI experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this portfolio demonstrates real-world production experience as a Forward-Deployed Engineer and Principal AI Architect, delivering enterprise AI systems that meet regulatory, security, and operational requirements in healthcare and other compliance-driven industries.',
      },
    },
  ],
};
