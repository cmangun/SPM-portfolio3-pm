import HealthcareAIConsultantMain from './HealthcareAIConsultantMain';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
    title: 'Healthcare AI Consultant | HIPAA & FDA Compliant AI Systems',
    description: 'Healthcare AI Consultant specializing in production-grade, HIPAA-compliant AI systems for hospitals, pharmaceutical companies, and regulated healthcare organizations. RAG systems, LLM integration, MLOps pipelines.',
    keywords: [
        'healthcare AI consultant',
        'healthcare AI consulting',
        'medical AI consultant',
        'HIPAA compliant AI',
        'FDA AI compliance',
        'healthcare MLOps',
        'clinical AI systems',
        'pharma AI consultant',
        'healthcare LLM integration',
        'RAG systems healthcare',
        'AI consultant hospitals',
        'regulated AI systems',
        'healthcare data governance',
        'clinical decision support AI',
        'EHR AI integration',
    ],
    openGraph: {
        title: 'Healthcare AI Consultant | Christopher Mangun',
        description: 'Healthcare AI Consultant specializing in production-grade, HIPAA-compliant AI systems for hospitals, pharmaceutical companies, and regulated healthcare organizations.',
        url: `${siteConfig.url}/healthcare-ai-consultant`,
        type: 'website',
    },
    alternates: {
        canonical: `${siteConfig.url}/healthcare-ai-consultant`,
    },
};

// Enhanced JSON-LD for this specific page with FAQ schema
const healthcareAIConsultantSchema = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'ProfessionalService',
            '@id': `${siteConfig.url}/healthcare-ai-consultant/#service`,
            name: 'Christopher Mangun - Healthcare AI Consultant',
            url: `${siteConfig.url}/healthcare-ai-consultant`,
            description: 'Healthcare AI Consultant specializing in production-grade, HIPAA-compliant AI systems for hospitals, pharmaceutical companies, and regulated healthcare organizations.',
            provider: {
                '@type': 'Person',
                name: 'Christopher Mangun',
                jobTitle: 'Healthcare AI Consultant',
                url: siteConfig.url,
                sameAs: [
                    'https://www.linkedin.com/in/christopher-mangun-5257265/',
                    'https://github.com/cmangun',
                ],
                hasCredential: [
                    { '@type': 'EducationalOccupationalCredential', name: 'Google Cloud Professional Cloud Architect' },
                    { '@type': 'EducationalOccupationalCredential', name: 'Google Professional Machine Learning Engineer' },
                    { '@type': 'EducationalOccupationalCredential', name: 'Microsoft Azure AI Engineer Associate' },
                    { '@type': 'EducationalOccupationalCredential', name: 'AWS Machine Learning Specialty' },
                    { '@type': 'EducationalOccupationalCredential', name: 'IASSC Lean Six Sigma Black Belt' },
                ],
            },
            areaServed: {
                '@type': 'Country',
                name: 'United States',
            },
            serviceType: [
                'Healthcare AI Consulting',
                'HIPAA Compliant AI Implementation',
                'FDA 21 CFR Part 11 Compliance',
                'RAG System Development',
                'Healthcare LLM Integration',
                'MLOps for Regulated Industries',
                'Clinical Decision Support Systems',
                'EHR AI Integration',
            ],
            knowsAbout: [
                'HIPAA',
                'FDA 21 CFR Part 11',
                'GxP Compliance',
                'EHR Integration',
                'Epic Systems',
                'Cerner',
                'MLOps',
                'Generative AI in Healthcare',
                'Clinical Decision Support',
                'Healthcare Data Governance',
                'RAG Architecture',
                'LLM Fine-tuning',
            ],
        },
        {
            '@type': 'WebPage',
            '@id': `${siteConfig.url}/healthcare-ai-consultant/#webpage`,
            url: `${siteConfig.url}/healthcare-ai-consultant`,
            name: 'Healthcare AI Consultant | HIPAA & FDA Compliant AI Systems',
            description: 'Healthcare AI Consultant specializing in production-grade, HIPAA-compliant AI systems for hospitals, pharmaceutical companies, and regulated healthcare organizations.',
            isPartOf: {
                '@id': `${siteConfig.url}/#website`,
            },
            about: {
                '@id': `${siteConfig.url}/healthcare-ai-consultant/#service`,
            },
            primaryImageOfPage: {
                '@type': 'ImageObject',
                url: `${siteConfig.url}/og-image.png`,
            },
        },
        {
            '@type': 'FAQPage',
            '@id': `${siteConfig.url}/healthcare-ai-consultant/#faq`,
            mainEntity: [
                {
                    '@type': 'Question',
                    name: 'What services does a healthcare AI consultant provide?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'A healthcare AI consultant provides strategic advisory, architecture design, and implementation services for AI systems in regulated healthcare environments. Services include RAG system implementation, LLM integration with compliance guardrails, MLOps pipeline development, HIPAA/FDA compliance consulting, EHR integration, and clinical decision support system design. The goal is moving AI from pilot to production while maintaining regulatory compliance.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'How do you implement compliant RAG systems in healthcare?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Compliant RAG (Retrieval-Augmented Generation) systems in healthcare require HIPAA-compliant data handling, PII redaction pipelines, audit logging for all queries and responses, access controls aligned to clinical roles, and citation tracking for regulatory defensibility. I architect these systems with compliance as a first-class constraint, integrating with existing document management systems like Veeva Vault while maintaining full audit trails.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'What outcomes can healthcare AI deliver?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Healthcare AI can deliver measurable outcomes including: 35% reduction in MLR review cycles, 60% faster content retrieval, 99.9%+ system uptime for clinical applications, reduced model deployment time from months to weeks, and improved compliance posture with zero audit findings. ROI typically appears within 6-12 months for well-scoped implementations.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'Are your AI solutions HIPAA compliant?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes. All AI systems I design and implement are built with HIPAA compliance as a core requirement. This includes proper PHI handling, encryption at rest and in transit, access controls, comprehensive audit logging, BAA (Business Associate Agreement) requirements, and incident response procedures. I have maintained zero HIPAA violations across 8+ years of work in regulated healthcare environments.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'What is the typical engagement model?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Engagements range from one-time advisory assessments (AI readiness, architecture review) to multi-month embedded delivery where I work as part of your engineering team shipping production code. I also offer fractional AI architect retainers for organizations that need ongoing strategic guidance without a full-time hire.',
                    },
                },
                {
                    '@type': 'Question',
                    name: 'What industries do you serve?',
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'I specialize in healthcare, pharmaceutical, life sciences, and medical device industries. Clients include global pharmaceutical companies (Pfizer, Novartis, Sanofi, Eli Lilly, Amgen), medical device manufacturers (Abbott, Medtronic), health systems, and health tech startups. My focus is organizations operating under HIPAA, FDA, or GxP regulatory requirements.',
                    },
                },
            ],
        },
    ],
};

const page = () => {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(healthcareAIConsultantSchema),
                }}
            />
            <HealthcareAIConsultantMain />
        </>
    );
};

export default page;
