'use client';
import CursorAndBackgroundProvider from '@/components/provider/CustomCursorProvider';
import ScrollSmoothProvider from '@/components/provider/ScrollSmoothProvider';
import AnimationWrapper from '@/components/shared/Animation/AnimationWrapper';
import BackToTop from '@/components/shared/BackToTop/BackToTop';
import PortfolioWebglHeader from '@/layouts/headers/PortfolioWebglHeader';
import FDEFooter from '@/layouts/footers/FDEFooter';

const ResumePage = () => {
  return (
    <ScrollSmoothProvider>
      <CursorAndBackgroundProvider>
        <AnimationWrapper>
          <div className="fde-page">
            <div id="magic-cursor" className='cursor-bg-red'>
              <div id="ball"></div>
            </div>

            <BackToTop />
            <PortfolioWebglHeader darkText={true} />

            <div id="smooth-wrapper">
              <div id="smooth-content">
                <main>
                  {/* Hero Section */}
                  <section style={{ 
                    paddingTop: '140px', 
                    paddingBottom: '80px',
                    backgroundColor: '#ffffff'
                  }}>
                    <div className="container" style={{ maxWidth: '900px' }}>
                      <div style={{ marginBottom: '48px' }}>
                        <p style={{ 
                          fontSize: '14px', 
                          fontWeight: 500, 
                          textTransform: 'uppercase', 
                          letterSpacing: '2px',
                          color: '#666',
                          marginBottom: '16px'
                        }}>
                          Forward Deployed Engineer AI / ML
                        </p>
                        <h1 style={{ 
                          fontSize: '56px', 
                          fontWeight: 700, 
                          marginBottom: '24px',
                          lineHeight: 1.1
                        }}>
                          Christopher Mangun
                        </h1>
                        <p style={{ 
                          fontSize: '18px', 
                          lineHeight: 1.7, 
                          color: '#444',
                          maxWidth: '700px'
                        }}>
                          Forward-Deployed AI Engineer with 15+ years leading technical transformation across regulated industries.
                        </p>
                        <p style={{ 
                          fontSize: '16px', 
                          lineHeight: 1.7, 
                          color: '#666',
                          maxWidth: '700px',
                          marginTop: '16px'
                        }}>
                          Specializes in enterprise LLM architectures, AI deployment strategy, and the cross-functional implementation of compliance-ready AI systems. A seasoned contractor who leads by example, builds bridges of trust across domains, and enables reliable, high-stakes delivery.
                        </p>
                      </div>

                      {/* Stats Row */}
                      <div style={{ 
                        display: 'flex', 
                        gap: '48px', 
                        paddingTop: '32px',
                        borderTop: '1px solid #eee',
                        marginBottom: '64px'
                      }}>
                        <div>
                          <p style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Experience</p>
                          <p style={{ fontSize: '18px', fontWeight: 600 }}>15+ Years</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Specialization</p>
                          <p style={{ fontSize: '18px', fontWeight: 600 }}>Regulated Industries</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '12px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Availability</p>
                          <p style={{ fontSize: '18px', fontWeight: 600 }}>Contract / FDE Roles</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Professional Experience */}
                  <section style={{ paddingBottom: '80px', backgroundColor: '#ffffff' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>
                      <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: 700, 
                        marginBottom: '40px',
                        paddingBottom: '16px',
                        borderBottom: '2px solid #1a1a1a'
                      }}>
                        Professional Experience
                      </h2>

                      {/* Job 1 */}
                      <div style={{ marginBottom: '48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Self-Employed Contractor</h3>
                          <span style={{ fontSize: '14px', color: '#666' }}>NYC | July 2025 – Present</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>Activation Architect / Forward-Deployed Engineer</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Built Salesforce–Shopify integration pipelines and marketing automation infrastructure supporting Love Trust's growth platform.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Authored ID8TION and The Activation Architect (The 5%), advancing structured AI/ML implementation methodologies.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444' }}>Earned the Stanford AI/ML Healthcare Specialization, strengthening expertise in regulated AI systems.</li>
                        </ul>
                      </div>

                      {/* Job 2 */}
                      <div style={{ marginBottom: '48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Publicis Groupe / Pfizer Colab</h3>
                          <span style={{ fontSize: '14px', color: '#666' }}>New York, NY | Mar 2024 – July 2025</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>Production Lead (Forward Deployed Engineering Role)</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Embedded with Pfizer Global Production as part of CEO special projects strike-force pilots, focused on strategic operations.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Led design of an internal AI search assistant using OpenAI + SharePoint, accelerating air-gapped enterprise search via Glean-style semantic indexing.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444' }}>Production Lead (IC Role) for Pfizer's largest brand initiatives (Abrysvo RSV & Comirnaty vaccines).</li>
                        </ul>
                      </div>

                      {/* Job 3 */}
                      <div style={{ marginBottom: '48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>IPG Health – IPG ProHealth & Area 23</h3>
                          <span style={{ fontSize: '14px', color: '#666' }}>New York, NY | Mar 2020 – Mar 2024</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>Director of Production & Delivery</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Launched global intranet with single-source knowledge bases for AREA23, FCB Health & ProHealth.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Managed $51M portfolio across Novartis (6 brands) and Sanofi (7 brands).</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Designed solutions for market access and regulatory pathways in HCP engagement.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444' }}>Directed 60+ cross-disciplinary staff across product, creative, and medical.</li>
                        </ul>
                      </div>

                      {/* Job 4 */}
                      <div style={{ marginBottom: '48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Abbott Labs – Advanced Analytics & Machine Learning</h3>
                          <span style={{ fontSize: '14px', color: '#666' }}>Chicago, IL | Dec 2018 – Mar 2020</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>Forward-Deployed Engineering (Contract)</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Deployed data ingestion and ML-readiness pipelines across 30K+ global diagnostics systems; enabled real-time insights for business leaders and downstream LLM-readiness and advanced analytics enablement.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Led agile transformation of global data ecosystem enabling BinaxNOW.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444' }}>Built production-grade NLP and LLM-readiness pipelines optimizing read round-trip latency by 10×.</li>
                        </ul>
                      </div>

                      {/* Job 5 */}
                      <div style={{ marginBottom: '48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Boundless Life Science Group (HCB)</h3>
                          <span style={{ fontSize: '14px', color: '#666' }}>Chicago, IL | Sep 2017 – Oct 2018</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>Associate Director, Tech</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Guided strategy for GI Genius™ AI system for adenoma detection.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Directed launches for 3 pharma brands ($5M portfolio).</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444' }}>Implemented agile workflows for healthcare teams.</li>
                        </ul>
                      </div>

                      {/* Job 6 */}
                      <div style={{ marginBottom: '48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Syneos Health GSW / Innovation Lab</h3>
                          <span style={{ fontSize: '14px', color: '#666' }}>NYC | Jan 2015 – Jan 2017</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>Senior Technical Program Manager</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Developed $12M SOWs and staffing plans for Eli Lilly, Boehringer Ingelheim.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Led launches for Amgen Biosimilars & Repatha; MM&M award-winning Pradaxa TV campaign.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444' }}>Tech lead Salesforce/Veeva Cloud gatekeeper for Eli Lilly.</li>
                        </ul>
                      </div>

                      {/* Job 7 */}
                      <div style={{ marginBottom: '48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Self-Employed Contractor</h3>
                          <span style={{ fontSize: '14px', color: '#666' }}>NYC | Jan 2008 – Jan 2015</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>Software Engineer (SaaS)</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Engineered workflow and application infrastructure for Running Man Post (HBO).</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Designed and deployed systems for MSK Enterprise, AOM Non-Profit, Concentric Health, and Grey Group.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444' }}>Served as embedded contractor to optimize Pfizer's Salesforce + CLM (Closed-Loop Marketing) integration layers.</li>
                        </ul>
                      </div>

                      {/* Job 8 */}
                      <div style={{ marginBottom: '48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Naked Heart Foundation</h3>
                          <span style={{ fontSize: '14px', color: '#666' }}>New York, NY | 2005 – 2008</span>
                        </div>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '16px', fontStyle: 'italic' }}>Project Manager</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Partnered with Natalia Vodianova to launch the Naked Heart Foundation's first global digital platform.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444', marginBottom: '8px' }}>Engineered the international donation system with multi-currency support and full tax-compliant receipts.</li>
                          <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#444' }}>Built a secure, scalable website architecture enabling global fundraising and transparent financial reporting.</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Key Achievements */}
                  <section style={{ paddingTop: '60px', paddingBottom: '60px', backgroundColor: '#f8f8f8' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>
                      <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: 700, 
                        marginBottom: '32px',
                        paddingBottom: '16px',
                        borderBottom: '2px solid #1a1a1a'
                      }}>
                        Key Achievements
                      </h2>
                      <ul style={{ paddingLeft: '20px', margin: 0 }}>
                        <li style={{ fontSize: '16px', lineHeight: 1.8, color: '#444', marginBottom: '16px' }}>Reduced compliant content review cycles by 35% and increased asset reuse 2.3× via Azure ML + SharePoint/Teams RAG system with MLR-aware guardrails at Publicis.</li>
                        <li style={{ fontSize: '16px', lineHeight: 1.8, color: '#444', marginBottom: '16px' }}>Designed and deployed HIPAA-compliant data plane at Abbott enabling ML for BinaxNOW.</li>
                        <li style={{ fontSize: '16px', lineHeight: 1.8, color: '#444', marginBottom: '16px' }}>Built first-in-industry MCP RAG platform for pharma data retrieval.</li>
                        <li style={{ fontSize: '16px', lineHeight: 1.8, color: '#444' }}>Improved enterprise data retrieval efficiency by 65% through ML pipeline optimization.</li>
                      </ul>
                    </div>
                  </section>

                  {/* Technical Skills */}
                  <section style={{ paddingTop: '60px', paddingBottom: '80px', backgroundColor: '#ffffff' }}>
                    <div className="container" style={{ maxWidth: '900px' }}>
                      <h2 style={{ 
                        fontSize: '28px', 
                        fontWeight: 700, 
                        marginBottom: '32px',
                        paddingBottom: '16px',
                        borderBottom: '2px solid #1a1a1a'
                      }}>
                        Technical Skills
                      </h2>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Cloud</p>
                          <p style={{ fontSize: '15px', color: '#666' }}>Azure OpenAI, AWS Bedrock, GCP Vertex AI</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>LLM Ops</p>
                          <p style={{ fontSize: '15px', color: '#666' }}>LangChain, PromptLayer, OpenAI Eval, Weights & Biases</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Collaboration Platforms</p>
                          <p style={{ fontSize: '15px', color: '#666' }}>SharePoint, Airtable, Zapier, Asana, Salesforce, ServiceNow</p>
                        </div>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '8px' }}>Compliance</p>
                          <p style={{ fontSize: '15px', color: '#666' }}>Audit-Ready ML, Transparent AI Logging, Security in Deployment</p>
                        </div>
                      </div>
                    </div>
                  </section>

                </main>
                <FDEFooter />
              </div>
            </div>
          </div>
        </AnimationWrapper>
      </CursorAndBackgroundProvider>
    </ScrollSmoothProvider>
  );
};

export default ResumePage;
