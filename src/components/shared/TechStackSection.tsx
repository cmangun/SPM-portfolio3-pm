/**
 * Technology Stack Component for Case Studies
 * ATS-optimized explicit stack listing
 * Required for Applicant Tracking Systems to score skill presence
 */

interface TechStackSectionProps {
    languages?: string[];
    aiml?: string[];
    data?: string[];
    platforms?: string[];
    mlops?: string[];
    governance?: string[];
    custom?: { category: string; items: string[] }[];
}

const TechStackSection = ({
    languages = ['Python', 'TypeScript'],
    aiml = ['Large Language Models (LLMs)', 'Retrieval-Augmented Generation (RAG)'],
    data = ['Vector Databases', 'Enterprise Search', 'Structured Metadata Stores'],
    platforms = ['Cloud-native infrastructure', 'Containerized services'],
    mlops = ['CI/CD', 'Monitoring', 'Evaluation pipelines'],
    governance = ['Audit logging', 'Access control', 'Human-in-the-loop workflows'],
    custom,
}: TechStackSectionProps) => {
    const defaultStacks = [
        { category: 'Languages', items: languages },
        { category: 'AI/ML', items: aiml },
        { category: 'Data', items: data },
        { category: 'Platforms', items: platforms },
        { category: 'MLOps', items: mlops },
        { category: 'Governance', items: governance },
    ];

    const stacks = custom || defaultStacks;

    return (
        <div className="tech-stack-section" style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '24px',
            marginTop: '40px',
        }}>
            <div style={{ 
                fontSize: '10px', 
                fontWeight: '600', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '20px'
            }}>
                Technology Stack
            </div>
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '20px',
            }}>
                {stacks.map((stack, i) => (
                    <div key={i}>
                        <div style={{ 
                            fontSize: '11px', 
                            fontWeight: '600', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            color: 'rgba(255,255,255,0.5)',
                            marginBottom: '8px'
                        }}>
                            {stack.category}
                        </div>
                        <div style={{ 
                            fontSize: '13px', 
                            color: 'rgba(255,255,255,0.7)',
                            lineHeight: '1.6'
                        }}>
                            {stack.items.join(', ')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechStackSection;
