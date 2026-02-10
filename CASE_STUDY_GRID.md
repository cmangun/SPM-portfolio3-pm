# FDE Case Study Grid — 6 Studies × 4 Phases

## Structure
Each case study follows the FDE methodology:
- **Diagnose**: What was broken? What did I find by embedding?
- **Architect**: What solution did I design? What tradeoffs?
- **Engineer**: What did I build? What technical decisions?
- **Enable**: How did I drive adoption? What's the lasting impact?

---

## Case Study 1: CoCo (Pfizer)

| Phase | Content |
|-------|---------|
| **Title Options** | "CoCo" / "Enterprise Knowledge at Speed" / "RAG for Regulated Content" |
| **Subtitle** | AI-Enhanced Enterprise Knowledge Base |
| **Brand** | Pfizer |
| **Linked Repos** | `enterprise-llm-integration`, `fde-reference-architectures` |

| Phase | What Happened |
|-------|---------------|
| **Diagnose** | ~1,000 new staff, 12 weeks to onboard. 20+ fragmented systems. 25+ min to find one asset. 40% MLR rejection rate. |
| **Architect** | RAG layer over existing systems (Veeva, SharePoint, Workfront). Azure ML + AKS + Cognitive Search. Graph-RAG for relationship queries. |
| **Engineer** | Sub-second retrieval. 99.9% uptime. Sentence-level citations. MLR gateway for compliance checking. |
| **Enable** | ~1,000 onboarded in weeks. Embedded in Teams. 65% faster MLR cycles. $2.08M annual savings. |

**Proposed Title**: "CoCo"  
**Proposed Subtitle**: "Enterprise Knowledge Retrieval at Scale"

---

## Case Study 2: Knowledge at Scale (Pfizer / IPG)

| Phase | Content |
|-------|---------|
| **Title Options** | "Knowledge at Scale" / "Adoption-First Enablement" / "Platform Adoption Playbook" |
| **Subtitle** | Adoption-first enablement for Pfizer agencies |
| **Brand** | Pfizer / IPG |
| **Linked Repos** | `fde-deployment-patterns`, `field-deployed-engineer-showcase` |

| Phase | What Happened |
|-------|---------------|
| **Diagnose** | Multiple agencies (IPG, Publicis) supporting Pfizer. Inconsistent tooling. No shared patterns. Duplicated effort across teams. |
| **Architect** | Standardized deployment patterns. Shared component library. Golden path templates. Cross-agency governance model. |
| **Engineer** | Reusable deployment scripts. Validation tooling. CI/CD templates. Documentation-as-code. |
| **Enable** | 2.3× asset reuse improvement. Reduced onboarding from months to weeks. Playbooks adopted across 6+ agencies. |

**Proposed Title**: "Scaling Adoption"  
**Proposed Subtitle**: "Playbooks for Multi-Agency Enablement"

---

## Case Study 3: Quality-First Diagnostics (Abbott / Alinity)

| Phase | Content |
|-------|---------|
| **Title Options** | "Quality-First Diagnostics" / "Safety-Critical Pipelines" / "FDA-Ready ML Infrastructure" |
| **Subtitle** | Shipping safety-critical systems at global scale |
| **Brand** | Abbott / Alinity |
| **Linked Repos** | `secure-workflow-orchestration`, `regulated-data-pipelines` |

| Phase | What Happened |
|-------|---------------|
| **Diagnose** | 27,000-device ML pipeline. Legacy on-prem infrastructure. FDA audit approaching. 6-month deployment cycles. |
| **Architect** | HIPAA-compliant AWS data plane. Hybrid Azure/AWS architecture. Automated compliance checks. |
| **Engineer** | Zero audit findings during FDA inspection. Containerized model serving. CI/CD with compliance gates. |
| **Enable** | Deployment time: 6 months → 3 weeks. 45+ data scientists supported. MLOps best practices institutionalized. |

**Proposed Title**: "Zero Audit Findings"  
**Proposed Subtitle**: "FDA-Ready ML Infrastructure"

---

## Case Study 4: Constrained AI (Pfizer)

| Phase | Content |
|-------|---------|
| **Title Options** | "Constrained AI" / "Automation with Boundaries" / "Human-in-the-Loop Governance" |
| **Subtitle** | Automation with explicit human boundaries |
| **Brand** | Pfizer |
| **Linked Repos** | `deployable-ai-agents`, `enterprise-llm-integration` |

| Phase | What Happened |
|-------|---------------|
| **Diagnose** | AI automation requests increasing. No governance framework. Risk of unreviewed AI outputs in regulated content. |
| **Architect** | Policy-controlled agent framework. Explicit human checkpoints. Cost guards. PII filtering. Audit logging. |
| **Engineer** | Tool registry with permission model. Request-level cost ceilings. Structured output validation. |
| **Enable** | 35% faster compliant content review. Zero compliance escalations. Framework adopted for 5+ use cases. |

**Proposed Title**: "Guardrails at Scale"  
**Proposed Subtitle**: "AI Automation with Human Boundaries"

---

## Case Study 5: Patient-Critical Reliability (Abbott / Libre)

| Phase | Content |
|-------|---------|
| **Title Options** | "Patient-Critical Reliability" / "When Seconds Matter" / "Observability for Life-Critical Systems" |
| **Subtitle** | Incident response when seconds matter |
| **Brand** | Abbott / Libre |
| **Linked Repos** | `llm-observability-dashboards`, `hybrid-connectivity-bridge` |

| Phase | What Happened |
|-------|---------------|
| **Diagnose** | Continuous glucose monitoring platform. Reliability = patient safety. Incident response was reactive, not proactive. |
| **Architect** | Real-time observability stack. Hybrid connectivity for edge devices. Proactive alerting. Incident runbooks. |
| **Engineer** | Prometheus + Grafana dashboards. Sub-minute alerting. Automated incident classification. |
| **Enable** | 99.9% uptime maintained. MTTR reduced by 60%. Runbooks adopted by 3 support teams. |

**Proposed Title**: "Seconds Matter"  
**Proposed Subtitle**: "Reliability for Patient-Critical Systems"

---

## Case Study 6: Defensible Clinical AI (Medtronic / GI Genius)

| Phase | Content |
|-------|---------|
| **Title Options** | "Defensible Clinical AI" / "Lineage for Trust" / "510(k) Ready AI" |
| **Subtitle** | Data lineage for trusted detection |
| **Brand** | Medtronic / GI Genius |
| **Linked Repos** | `regulated-data-pipelines`, `fde-reference-architectures` |

| Phase | What Happened |
|-------|---------------|
| **Diagnose** | AI-assisted colonoscopy detection. FDA 510(k) pathway. Need for defensible data lineage. Model validation requirements. |
| **Architect** | End-to-end lineage tracking. Immutable audit trail. Model card framework. Validation protocol documentation. |
| **Engineer** | Schema-first pipelines. Deterministic transforms. Lineage metadata at every step. |
| **Enable** | FDA 510(k) clearance achieved. Lineage framework reused for 2 additional devices. |

**Proposed Title**: "Defensible AI"  
**Proposed Subtitle**: "Data Lineage for Clinical Trust"

---

## Summary Grid

| # | Brand | Title | Subtitle | Key Metric |
|---|-------|-------|----------|------------|
| 1 | Pfizer | CoCo | Enterprise Knowledge Retrieval at Scale | $2.08M savings, 65% faster MLR |
| 2 | Pfizer / IPG | Scaling Adoption | Playbooks for Multi-Agency Enablement | 2.3× asset reuse |
| 3 | Abbott / Alinity | Zero Audit Findings | FDA-Ready ML Infrastructure | 6mo → 3wk deployments |
| 4 | Pfizer | Guardrails at Scale | AI Automation with Human Boundaries | 35% faster reviews, 0 escalations |
| 5 | Abbott / Libre | Seconds Matter | Reliability for Patient-Critical Systems | 99.9% uptime, 60% MTTR reduction |
| 6 | Medtronic | Defensible AI | Data Lineage for Clinical Trust | FDA 510(k) clearance |

---

## Repo Coverage

| Repo | Case Studies Using It |
|------|-----------------------|
| `enterprise-llm-integration` | 1, 4 |
| `fde-reference-architectures` | 1, 6 |
| `fde-deployment-patterns` | 2 |
| `field-deployed-engineer-showcase` | 2 |
| `secure-workflow-orchestration` | 3 |
| `regulated-data-pipelines` | 3, 6 |
| `deployable-ai-agents` | 4 |
| `llm-observability-dashboards` | 5 |
| `hybrid-connectivity-bridge` | 5 |

All 9 technical repos are now mapped to case studies.
