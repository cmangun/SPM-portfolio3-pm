/**
 * ATS Header Component for Case Studies
 * Provides structured, ATS-optimized metadata for each case study
 * This block is critical for Applicant Tracking Systems and AI recruiter tools
 */

interface ATSCaseStudyHeaderProps {
    role?: string;
    domain?: string;
    systemType?: string;
    coreSkills?: string[];
    outcome?: string;
    client: string;
}

const ATSCaseStudyHeader = ({
    role = "Forward-Deployed AI Architect / Principal AI Platform Engineer",
    domain = "Regulated Healthcare / Life Sciences",
    systemType = "Enterprise AI Platform, RAG, Knowledge Systems",
    coreSkills = ["AI Architecture", "MLOps", "AI Governance", "Vector Search", "Compliance"],
    outcome = "Production AI system deployed with zero compliance violations and measurable operational impact",
    client,
}: ATSCaseStudyHeaderProps) => {
    return (
        <div className="ats-case-study-header" style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '8px',
            padding: '20px 24px',
            marginBottom: '32px',
            fontSize: '13px',
            lineHeight: '1.8',
        }}>
            <div style={{ 
                fontSize: '10px', 
                fontWeight: '600', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '16px'
            }}>
                Case Study Metadata
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 24px' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>Role:</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{role}</span>
                
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>Client:</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{client}</span>
                
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>Domain:</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{domain}</span>
                
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>System Type:</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{systemType}</span>
                
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>Core Skills:</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{coreSkills.join(', ')}</span>
                
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>Outcome:</span>
                <span style={{ color: 'rgba(255,255,255,0.8)' }}>{outcome}</span>
            </div>
        </div>
    );
};

export default ATSCaseStudyHeader;
