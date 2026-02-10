import { Metadata } from 'next';

// Base URL for the site
export const siteConfig = {
  url: 'https://healthcare-ai-consultant.com',
  name: 'Christopher Mangun',
  title: 'Senior Project Director — Healthcare, Regulated Marketing & AI-Enabled Platforms',
  shortTitle: 'Senior Project Director',
  description: 'Senior Project Director and Launch Lead with 15+ years delivering complex, regulated healthcare programs across pharma, diagnostics, medical devices, and enterprise marketing environments. Proven track record leading multi-brand portfolios, owning timelines and budgets, coordinating cross-functional teams, and ensuring compliance across medical, legal, and regulatory (MLR) workflows.',
  author: 'Christopher Mangun',
  email: 'cmangun@gmail.com',
  phone: '917-717-1894',
  location: 'New York, NY',
  linkedin: 'https://www.linkedin.com/in/christopher-mangun-5257265/',
  github: 'https://github.com/cmangun',
  keywords: [
    // Canonical Role Keywords (ATS Priority)
    'Senior Project Director',
    'Healthcare Project Director',
    'Project Director Healthcare',
    'Senior Project Manager Healthcare',
    'Healthcare Portfolio Manager',
    'Regulated Marketing Project Director',
    'Healthcare Agency Project Director',
    'Pharma Project Director',
    'Healthcare Launch Lead',
    'PMO Healthcare',
    // Core Capability Keywords
    'MLR Compliance',
    'Medical Legal Regulatory',
    'Cross-Functional Delivery',
    'Healthcare Program Management',
    'Portfolio Management',
    'Timeline Management',
    'Budget Management',
    'Stakeholder Alignment',
    'Regulatory Compliance',
    'Project Governance',
    // Domain Keywords
    'healthcare project management',
    'pharma project director',
    'life sciences project management',
    'medical device project management',
    'healthcare marketing delivery',
    'regulated content delivery',
    'healthcare agency management',
    'multi-brand portfolio management',
    'AI-enabled healthcare platforms',
    'healthcare digital transformation',
    // Compliance Keywords
    'FDA compliance',
    'HIPAA compliance',
    'MLR review management',
    'audit-ready documentation',
    'regulatory submissions',
    'healthcare compliance management',
  ],
};

// ATS/AEO Keyword Spine - for use in components
export const atsKeywords = {
  roles: [
    'Senior Project Director',
    'Healthcare Project Director',
    'Portfolio Manager',
    'Launch Lead',
    'PMO Lead',
    'Director of Production',
    'Program Delivery Lead',
    'Healthcare Agency Project Director',
    'Regulated Marketing Project Director',
    'Cross-Functional Delivery Lead',
  ],
  capabilities: [
    'MLR Compliance & Review Management',
    'Cross-Functional Team Leadership',
    'Timeline & Dependency Management',
    'Budget & Scope Control',
    'Stakeholder Alignment',
    'Risk Identification & Mitigation',
    'Deliverable Governance',
    'Project Planning & Execution',
    'Process Standardization',
    'Executive & Client Communication',
  ],
  compliance: [
    'Medical Legal Regulatory (MLR)',
    'FDA Compliance',
    'HIPAA Compliance',
    'Audit-Ready Documentation',
    'Regulatory Submissions',
    'Scope Control & Change Management',
  ],
  techStack: {
    languages: ['Project Management Tools', 'Digital Marketing Platforms'],
    aiml: ['AI-Enabled Healthcare Platforms', 'Digital Transformation'],
    data: ['Enterprise Data Systems', 'Healthcare Interoperability'],
    platforms: ['Agile Methodologies', 'PMO Governance'],
    mlops: ['Process Optimization', 'Workflow Standardization'],
    governance: ['MLR Review Workflows', 'Compliance Checkpoints', 'Delivery Governance'],
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
    google: '',
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
  jobTitle: 'Senior Project Director — Healthcare, Regulated Marketing & AI-Enabled Platforms',
  description: 'Senior Project Director and Launch Lead with 15+ years delivering complex, regulated healthcare programs across pharma, diagnostics, medical devices, and enterprise marketing environments. Proven track record leading multi-brand portfolios, owning timelines and budgets, coordinating cross-functional teams, and ensuring compliance across MLR workflows.',
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
    'Healthcare Project Management',
    'Regulated Marketing Delivery',
    'MLR Compliance & Review Management',
    'Cross-Functional Team Leadership',
    'Portfolio & Budget Management',
    'Healthcare Launch Programs',
    'Pharma Agency Operations',
    'FDA Compliance',
    'HIPAA Compliance',
    'AI-Enabled Healthcare Platforms',
    'Process Standardization',
    'Stakeholder Alignment',
    'Risk Identification & Mitigation',
    'Agile Delivery Methodologies',
    'Digital Transformation in Healthcare',
    'Medical Device Programs',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Lean Six Sigma Black Belt',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Certified Scrum Master (CSM)',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Stanford AI/ML Healthcare Specialization',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'AWS Certified Solutions Architect',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Cloud Professional Architect',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Professional Machine Learning Engineer',
    },
  ],
};

// JSON-LD Schema for ProfessionalService - ATS/AEO Optimized
export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteConfig.url}/#service`,
  name: `${siteConfig.name} - Senior Project Director`,
  url: siteConfig.url,
  description: 'Senior Project Director delivering regulated healthcare programs with cross-functional team leadership, MLR compliance management, timeline and budget ownership, and measurable outcomes across pharma, diagnostics, and medical device environments.',
  provider: {
    '@id': `${siteConfig.url}/#person`,
  },
  areaServed: {
    '@type': 'Country',
    name: 'United States',
  },
  serviceType: [
    'Healthcare Project Management',
    'Regulated Marketing Delivery',
    'MLR Compliance Management',
    'Portfolio & Program Operations',
    'Cross-Functional Team Leadership',
    'Healthcare Launch Programs',
    'Budget & Scope Management',
    'Stakeholder Alignment',
    'Process Standardization',
    'AI-Enabled Platform Delivery',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Healthcare Project Delivery Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Project Delivery & Execution',
          description: 'End-to-end project planning, timeline management, cross-functional coordination, and deliverable governance for regulated healthcare programs.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Regulated Review & Compliance Management',
          description: 'MLR submission tracking, claims substantiation alignment, audit-ready documentation, and compliance checkpoints for healthcare marketing.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Portfolio & Program Operations',
          description: 'Multi-brand portfolio management, status reporting, risk identification, and process standardization across concurrent healthcare initiatives.',
        },
      },
    ],
  },
};

// JSON-LD Schema for WebSite
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: `${siteConfig.name} - Senior Project Director`,
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
    'Senior Project Director',
    'Healthcare Project Management',
    'Regulated Marketing Delivery',
    'MLR Compliance',
    'Cross-Functional Delivery',
    caseStudy.client,
    caseStudy.systemType || 'Healthcare Program Delivery',
  ],
});

// FAQ Schema - ATS/AEO Optimized
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does a Senior Project Director in healthcare do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Senior Project Director in healthcare leads complex, regulated programs from strategy through delivery. They own timelines, budgets, and cross-functional coordination across brand, medical, legal, regulatory, creative, and production teams to ensure compliant, on-time, on-brand delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is MLR review management?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MLR (Medical, Legal, Regulatory) review management is the process of coordinating content submissions through medical, legal, and regulatory review teams to ensure all healthcare marketing materials are compliant with FDA regulations, brand standards, and evidence-based claims before publication.',
      },
    },
    {
      '@type': 'Question',
      name: 'What industries does Christopher Mangun serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Christopher Mangun specializes in healthcare, pharmaceutical, life sciences, diagnostics, and medical device industries. His clients include Pfizer, Abbott, Novartis, Sanofi, Medtronic, Eli Lilly, Boehringer Ingelheim, and Amgen across agency and enterprise environments.',
      },
    },
    {
      '@type': 'Question',
      name: 'What project management services does Christopher Mangun provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Christopher provides end-to-end project delivery and execution, MLR compliance management, portfolio and program operations, cross-functional team leadership, budget and scope management, stakeholder alignment, and process standardization for regulated healthcare programs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Christopher Mangun have experience with healthcare agency work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Christopher has extensive healthcare agency experience including Director of Production at IPG ProHealth & Area 23 managing a $51M portfolio across 13 pharma brands, Senior Digital Program Manager at Syneos Health GSW leading $12M+ engagements, and Associate Director of Project Management at Boundless Life Science Group.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Christopher Mangun\'s experience with regulated healthcare delivery?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Christopher has 15+ years delivering regulated healthcare programs with zero HIPAA violations across $51M+ in portfolios, zero FDA audit findings on system migrations, and proven expertise in MLR workflows, audit-ready documentation, and compliance across pharma, diagnostics, and medical device environments.',
      },
    },
  ],
};
