# FDE Case Study Grid — 6 Studies × 4 Phases = 24 Sections

## Master Grid

---

## 1. PFIZER — CoCo AI

**H1**: CoCo AI  
**H2**: An industry-first agentic Company Concierge for onboarding, process adherence, and communication flow

| Phase | Challenge | What I Did | Key Deliverables | Metrics |
|-------|-----------|------------|------------------|---------|
| **DIAGNOSE** | ~1,000 new staff needed onboarding. 20+ fragmented systems. 25+ min to find one asset. 40% MLR rejection rate. | Mapped content lifecycle from brief → MLR → field. Measured search time, queue delays, revision loops. Proved 75% of delays were in search/retrieval, not reviewer capacity. | MLR Cycle-Time Baseline, Content Funnel Analysis, RACI Map, Risk Register | 42-day baseline cycle, 40% revision rate, 75% delays in search |
| **ARCHITECT** | Needed AI-ready architecture over 20+ legacy systems without creating shadow system of record or violating MLR constraints. | Designed CoCo as governed datasphere over Veeva, SharePoint, Workfront, CLM. Separated systems of record from AI orchestration via stateless RAG layer. | C4 System Context, RAG Pipeline Blueprint, Integration Contracts, ADRs | >85% retrieval accuracy SLO, <350ms p95 latency SLO, >99.7% uptime SLO |
| **ENGINEER** | Had to prove CoCo could handle real Pfizer workloads under strict MLR, security, and regional constraints. | Implemented hybrid semantic + keyword search with caching. Built AI Content API with role-aware access. Wired up service health dashboards and incident playbooks. | Production RAG Pipeline, AI Content API, Service Health Dashboards, Incident Runbooks | p95 latency 850ms→280ms, 99.7% uptime, 4,200 req/day |
| **ENABLE** | Without adoption by MLR and field teams, platform would become another unused AI experiment. ~1,000 staff to onboard. | Embedded CoCo in Teams and intranet. Ran training for 200+ users. Published governance playbook. Created champion cohorts in 3 pilot brands. | CoCo in Teams, Training Curriculum, Governance Playbook, Adoption Dashboard | 200+ users, 94% training completion, 4.3/5 satisfaction, 15min→60sec time-to-answer |

---

## 2. IPG HEALTH — AI Playbooks

**H1**: AI Playbooks  
**H2**: Regulated content systems for global pharmaceutical markets

| Phase | Challenge | What I Did | Key Deliverables | Metrics |
|-------|-----------|------------|------------------|---------|
| **DIAGNOSE** | 14 agencies with fragmented storage—local drives, Teams, email, legacy portals. 61% of queries returned irrelevant or outdated content. Teams couldn't find current document versions. | Indexed every legacy storage location. Mapped creative/medical/regulatory document lifecycle. Measured search failure rate and identified version conflicts. | Document Lifecycle Map, Search Failure Baseline, Taxonomy Gap Analysis | 61% search failure rate, 14,000+ docs to index |
| **ARCHITECT** | Needed architecture fusing SharePoint, Azure Cognitive Search, and Microsoft Graph while respecting agency-specific permissions. | Defined metadata-first, Azure-based search backbone. Created taxonomy standardization for brand, stage, audience, regulatory status. Designed search UX for each role. | Unified Intranet Architecture, Metadata Blueprint, Search UX Patterns | P95 search latency <200ms SLO |
| **ENGINEER** | Legacy content was inconsistent, unstructured, poorly tagged—blocking relevance. | Built ingestion pipelines with automated tagging using metadata heuristics + Azure OCR. Implemented version lineage and authoritative hierarchy enforcement. | Production Ingestion Pipelines, Index Refresh Workflows, Version Lineage Schema | 14,000+ docs indexed, P95 <200ms achieved |
| **ENABLE** | Adoption would fail unless strategy, creative, and medical teams could immediately find what they needed. | Created role-based search templates for PM, Creative, Editing, Medical, Regulatory. Built launch playbooks tied to single source of truth. "Find anything in 30 seconds" training. | Search Templates, Launch Playbooks, Training Curriculum | 28% faster launch cycles, 3.4 hrs/week reclaimed for PMs, 1,900 redundant docs eliminated |

---

## 3. ABBOTT ALINITY — Advanced Analytics

**H1**: Advanced Analytics  
**H2**: AI/ML diagnostics platform serving 27,000+ devices globally

| Phase | Challenge | What I Did | Key Deliverables | Metrics |
|-------|-----------|------------|------------------|---------|
| **DIAGNOSE** | 850TB+ Oracle workloads across Architect, Alinity, Libre. 15B+ tests/year, 180+ countries. Complex queries taking 14-24 hours. FDA audit approaching. | Cataloged all workloads with GxP impact lens. Mapped flows from instrument → LIS → warehouse → analytics. Defined success in mission terms: sub-minute analytics, zero integrity incidents. | GxP Impact Assessment, Data Flow Map, Success Criteria Document | 850TB+ cataloged, 15B+ annual tests, 180+ countries |
| **ARCHITECT** | Needed GxP-qualified AWS architecture treating compliance as design constraint, not afterthought. | Designed three-zone data lake (raw → curated → analytics) on S3 with ALCOA+ integrity. Dual-path query: Athena for cohort analytics, Aurora + DynamoDB for sub-second lookups. Zero-trust access. | AWS Landing Zone Design, Data Lake Architecture, Compliance Mapping | 21 CFR Part 11 + EU Annex 11 mapped to AWS services |
| **ENGINEER** | 850TB Oracle-to-AWS migration under strict GxP controls. 6-month deployment cycles needed to shrink. | Used Snowball Edge for migration with SHA-256 checksums. Built Treesitter-backed ETL in Glue. Completed IQ/OQ/PQ with 450+ test cases, 30-day parallel runs. | Migration Execution, ETL Pipeline, Validation Report | 850TB migrated, 450+ test cases, 99.97% result agreement |
| **ENABLE** | Clinical ops, data science, and regulatory teams needed visible mission outcomes, not just infrastructure. | Shipped React-based query/visualization layer. Achieved 1,440× performance improvement (24hr → <60sec). Built real-time dashboards for latency, pipeline health, GxP compliance. | Query Interface, Monitoring Dashboard, User Training | 1,440× speedup, 650+ concurrent users, 99.97% uptime |

**IMPACT**: Zero FDA/EU GMP audit findings. $12.7M annual cost reduction (~79%). Zero data integrity incidents since launch.

---

## 4. PFIZER — Global Content Automation

**H1**: Global Content Automation  
**H2**: Human-in-the-loop governance for compliant AI workflows

| Phase | Challenge | What I Did | Key Deliverables | Metrics |
|-------|-----------|------------|------------------|---------|
| **DIAGNOSE** | AI automation requests increasing. No governance framework. Risk of unreviewed AI outputs in regulated content. Quarterly strain updates, 40+ languages, split agency model. | Mapped MLR funnel and cycle time (42 days baseline). Analyzed revision loops—40% driven by retrieval failures. Documented that 20+ unconnected systems blocked AI/ML enablement. | MLR Funnel Analysis, Revision Root Cause, System Fragmentation Map | 42-day MLR cycle, 40% revision rate, 20+ systems |
| **ARCHITECT** | Needed governed AI platform respecting MLR constraints, medical-promo boundaries, data residency, auditability. | Designed Charlie as governed content engine with policy-controlled agent framework. Explicit human checkpoints, cost guards, PII filtering, audit logging. | Governance Framework, Policy-as-Code Design, MLR Gateway Spec | Guardrails for off-label, hallucination, region mismatch |
| **ENGINEER** | Governance had to be real code—running in CI/CD, MLOps pipelines—not PDFs. | Built tool registry with permission model. Implemented request-level cost ceilings, structured output validation, sentence-level lineage logging. MLR gateway enforcing guardrails. | Tool Registry, Cost Guards, Lineage Logging, MLR Gateway | Every AI suggestion logged with source → prompt → output |
| **ENABLE** | Teams feared governance would add bureaucracy and slow them down further. | Partnered with high-value pilots. Provided templates that passed governance gates on first attempt. Showed codified checks reduced rework and audit questions. | Pilot Templates, Governance Playbook, First-Pass Success Patterns | 35% faster compliant content review, zero compliance escalations |

**IMPACT**: MLR 42→14 days (-65%), 3× asset throughput (272→816/mo), $2.08M annual savings.

---

## 5. ABBOTT LIBRE — Patient-Critical Systems

**H1**: Patient-Critical Systems  
**H2**: Real-time reliability engineering for continuous glucose monitoring

| Phase | Challenge | What I Did | Key Deliverables | Metrics |
|-------|-----------|------------|------------------|---------|
| **DIAGNOSE** | No unified view of device health across global fleet. Incident response was reactive, not proactive. Reliability = patient safety for continuous glucose monitoring. | Mapped telemetry gaps across BinaxNOW and Libre platforms. Identified key signals needed for proactive reliability management. Documented evaluation touchpoints. | Telemetry Gap Analysis, Signal Requirements, Evaluation Schema | Multi-lot, multi-site coverage needed |
| **ARCHITECT** | Needed architecture working at edge in resource-constrained hospital environments while aggregating to cloud for fleet-wide visibility. | Designed edge collectors normalizing telemetry before upstream send. Cloud aggregation for dashboards and alerting. Ingestion and QC procedures flagging anomalies automatically. | Edge Collector Design, Cloud Aggregation Architecture, QC Procedures | Real-time alerting capability |
| **ENGINEER** | Building reliable telemetry from instruments in hospital environments with variable connectivity. | Implemented edge collectors, shared ML-ready store, reliability dashboards showing uptime, test volumes, incident trends. Built regulatory-ready summary views with drill-down. | Edge Collectors, ML-Ready Store, Reliability Dashboards, Regulatory Views | Sensitivity/specificity by lot and condition |
| **ENABLE** | Local teams needed actionable signals instead of noisy logs or missing data. Clinical affairs needed to run evaluations independently. | Defined alert rules and on-call paths for regional teams. Delivered training so teams could generate submission-ready outputs independently. | Alert Rules, On-Call Procedures, Training Documentation | Regional response before patient impact |

**IMPACT**: 99.9% uptime target maintained. ~87% symptomatic sensitivity. 15-minute results enabling on-site isolation decisions. FDA EUA achieved.

---

## 6. MEDTRONIC GI GENIUS — Defensible Clinical AI

**H1**: Defensible Clinical AI  
**H2**: FDA 510(k) cleared detection with end-to-end data lineage

| Phase | Challenge | What I Did | Key Deliverables | Metrics |
|-------|-----------|------------|------------------|---------|
| **DIAGNOSE** | Legacy systems couldn't support LLM context windows. No accepted safety envelope for AI suggestions. Clinicians lacked calibrated confidence metrics. FDA 510(k) pathway required defensible lineage. | Showed governance and infrastructure—not modeling—were primary blockers. Documented that clinical teams needed confidence metrics within regulated workflows. | Technical Assessment, Regulatory Analysis, Requirements Spec | 12 legacy systems, 3 regulatory frameworks |
| **ARCHITECT** | Needed LLM-centered architecture plugging into EHR/imaging, operating under SaMD and HIPAA rules, responding within sub-second latency in OR. | Defined layered architecture: guarded context builder, air-gapped LLM gateway, evaluation harness with golden sets, audit/logging layer. Explicit degraded modes when unavailable. | Security Architecture, LLM Infrastructure Design, Evaluation Framework | SLOs for latency, confidence, audit completeness |
| **ENGINEER** | Had to integrate with clinical systems without downtime. Build evaluation at same time as inference. Prove reliability under real usage. | Implemented encrypted context management, streaming-safe APIs, evaluation pipelines tied to curated clinical scenarios, service health dashboards. | Air-gapped LLM Deployment, Evaluation Engine, Confidence Dashboard, Audit Trail System | 99.2% evaluated accuracy, p95 <500ms |
| **ENABLE** | Surgeons and risk officers skeptical of black-box outputs. Worried about liability if AI suggestion was wrong or over-trusted. | Piloted in restricted workflows with human-in-the-loop confirmation. Explicit labeling of AI suggestions. Training on confidence interpretation and escalation. | Clinical Protocols, Clinician Training, Feedback System | 25 clinicians trained, 4.5/5 satisfaction, 89% adoption |

**IMPACT**: 99.2% evaluated accuracy (vs ~96% baseline). 40% faster time-to-decision. Zero security incidents. FDA 510(k) pathway cleared.

---

## Summary: 24 Sections at a Glance

| Case Study | Diagnose | Architect | Engineer | Enable |
|------------|----------|-----------|----------|--------|
| **1. CoCo AI** | Search failure, 40% revision rate | RAG over 20+ systems | p95 280ms, 99.7% uptime | 200+ users, 94% training |
| **2. AI Playbooks** | 61% search failure, fragmentation | Azure + Graph + SharePoint | 14K docs, <200ms | 28% faster launches |
| **3. Advanced Analytics** | 850TB, 24hr queries | GxP AWS landing zone | 1,440× speedup | 650+ users, $12.7M savings |
| **4. Global Content Automation** | 42-day MLR, 20+ systems | Policy-as-code governance | Lineage logging, MLR gateway | 35% faster reviews |
| **5. Patient-Critical Systems** | No fleet visibility | Edge + cloud hybrid | Real-time dashboards | Regional response paths |
| **6. Defensible Clinical AI** | No safety envelope | Air-gapped LLM + eval | 99.2% accuracy | Human-in-loop pilots |
