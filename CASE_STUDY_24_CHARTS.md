# FDE Case Study Grid — 24 Sections with Charts

## Chart Mapping Strategy

Each quadrant gets ONE signature visualization:
- **Diagnose** → Funnel, Gap Analysis, or Baseline Metrics
- **Architect** → System Context, Layer Model, or Pipeline Diagram
- **Engineer** → Service Health, Latency, or Data Quality
- **Enable** → Journey Map, Org Health, or Adoption Curve

---

## 1. PFIZER — CoCo AI

| Phase | Chart Type | Chart Name | What It Shows |
|-------|------------|------------|---------------|
| **DIAGNOSE** | Funnel | MLR Content Funnel | 2,500 assets created → 520 deployed (20.8% yield). Shows 75% of delays in Search & Retrieval stage. |
| **ARCHITECT** | System Context (C4) | Charlie/CoCo System Context | Users (Producer, MLR Reviewer, Brand Lead, Admin) → CoCo → External systems (Veeva, SharePoint, Workfront, Teams, Azure OpenAI) |
| **ENGINEER** | Service Health | AI Content API Dashboard | 5 services (AI Content API, Vector Search, Embedding, MLR Gateway, Cache) with uptime, latency percentiles, error rates |
| **ENABLE** | Journey Map | Producer Journey | Brief → AI-Assisted Draft → MLR Submission → Approval. Emotional arc from "anxious" to "delighted" |

---

## 2. IPG HEALTH — AI Playbooks

| Phase | Chart Type | Chart Name | What It Shows |
|-------|------------|------------|---------------|
| **DIAGNOSE** | Bar Chart | Search Failure Baseline | 61% irrelevant results, 24% outdated, 15% accurate. Proves search—not capacity—is the bottleneck. |
| **ARCHITECT** | Layer Diagram | Azure Intranet Architecture | SharePoint → Graph Connectors → Azure Cognitive Search → Role-Based Search UX |
| **ENGINEER** | Metrics Dashboard | Index Health | 14,000+ docs indexed, P95 latency <200ms, 92% relevance score |
| **ENABLE** | Before/After | Launch Cycle Comparison | Before: 14 days avg. After: 10 days avg. 28% improvement with PM hours reclaimed overlay |

---

## 3. ABBOTT ALINITY — Advanced Analytics

| Phase | Chart Type | Chart Name | What It Shows |
|-------|------------|------------|---------------|
| **DIAGNOSE** | Scope Diagram | Data Landscape | 850TB across 3 platforms (Architect, Alinity, Libre), 180+ countries, 15B tests/year |
| **ARCHITECT** | Layer Model | GxP AWS Landing Zone | 3-zone data lake (Raw → Curated → Analytics) + Dual-path query (Athena + Aurora/DynamoDB) |
| **ENGINEER** | Migration Tracker | Snowball Migration Progress | 850TB moved with SHA-256 checksums, 450+ test cases, 99.97% agreement |
| **ENABLE** | Performance Comparison | Query Speedup | 24 hours → <60 seconds (1,440× improvement). Bar chart with before/after |

---

## 4. PFIZER — Global Content Automation

| Phase | Chart Type | Chart Name | What It Shows |
|-------|------------|------------|---------------|
| **DIAGNOSE** | RACI Matrix | MLR Content Workflow | 6 workstreams × 5 stakeholders (Brand, Producer, MLR, Platform, IT). Shows accountability gaps. |
| **ARCHITECT** | RAG Pipeline | Charlie RAG Blueprint | Ingest → Normalize → Index → Retrieve → Generate → MLR Gateway. With guardrails at each stage. |
| **ENGINEER** | Latency Percentiles | API Performance Over 6 Weeks | p50/p95/p99 trending down from 850ms to 280ms as optimizations landed |
| **ENABLE** | Sparkline Grid | Impact KPIs | 4 sparklines: Cycle Time (42→14), Assets/Month (272→816), Revision Rate (40%→15%), Active Users (0→68%) |

---

## 5. ABBOTT LIBRE — Patient-Critical Systems

| Phase | Chart Type | Chart Name | What It Shows |
|-------|------------|------------|---------------|
| **DIAGNOSE** | Gap Analysis | Telemetry Coverage | Heat map showing which device signals are captured vs. missing across fleet |
| **ARCHITECT** | Architecture Diagram | Edge + Cloud Hybrid | Edge collectors at hospital → Cloud aggregation → Fleet dashboard → Alerting |
| **ENGINEER** | Reliability Dashboard | Fleet Uptime | 99.9% target line with actual uptime by region. Incident breakdown by cause. |
| **ENABLE** | Alert Flow | Incident Response Path | Detection → Classification → Regional Alert → Response → Resolution. With SLA times at each step. |

---

## 6. MEDTRONIC GI GENIUS — Defensible Clinical AI

| Phase | Chart Type | Chart Name | What It Shows |
|-------|------------|------------|---------------|
| **DIAGNOSE** | Funnel | Clinical Query Pipeline | 450 queries/day → 445 LLM processed → 440 evaluated → 398 high-confidence → 385 accepted |
| **ARCHITECT** | System Context | Clinical LLM Platform | Surgeon/Staff/Director → Decision Support LLM → EHR, LLM Service (air-gapped), FDA Audit System |
| **ENGINEER** | Model Card | Evaluation Metrics | Retrieval Accuracy 91%, Citation Faithfulness 96%, User Satisfaction 4.2/5, p95 Latency 280ms |
| **ENABLE** | Adoption Curve | Clinician Rollout | Week-over-week adoption: trained → piloting → active use. 89% adoption rate achieved. |

---

## Chart Type Summary

| Chart Type | Used In | Best For |
|------------|---------|----------|
| **Funnel** | CoCo Diagnose, Medtronic Diagnose | Showing drop-off and yield |
| **System Context (C4)** | CoCo Architect, Medtronic Architect | Showing users, system, integrations |
| **Service Health** | CoCo Engineer | Multi-service reliability view |
| **Journey Map** | CoCo Enable | User experience with emotional arc |
| **Bar Chart** | IPG Diagnose | Comparing categories |
| **Layer Diagram** | IPG Architect, Alinity Architect | Showing stack/tiers |
| **Metrics Dashboard** | IPG Engineer | KPI snapshot |
| **Before/After** | IPG Enable, Alinity Enable | Impact comparison |
| **Scope Diagram** | Alinity Diagnose | Scale and breadth |
| **Migration Tracker** | Alinity Engineer | Progress and validation |
| **RACI Matrix** | Automation Diagnose | Accountability mapping |
| **RAG Pipeline** | Automation Architect | Data flow with stages |
| **Latency Percentiles** | Automation Engineer | Performance trends |
| **Sparkline Grid** | Automation Enable | Multiple KPIs over time |
| **Gap Analysis** | Libre Diagnose | Coverage vs. gaps |
| **Architecture Diagram** | Libre Architect | Hybrid topology |
| **Reliability Dashboard** | Libre Engineer | Uptime and incidents |
| **Alert Flow** | Libre Enable | Process with SLAs |
| **Model Card** | Medtronic Engineer | ML model documentation |
| **Adoption Curve** | Medtronic Enable | Rollout progress |

---

## Existing Charts in Your Codebase

From `pfizerData.ts`, `abbottData.ts`, `medtronicData.ts`:

| Chart Key | Available | Used For |
|-----------|-----------|----------|
| `funnel` | ✅ | Diagnose funnels |
| `raciMatrix` | ✅ | Accountability |
| `systemContext` | ✅ | C4 diagrams |
| `ragPipeline` | ✅ | RAG flow |
| `layerModel` | ✅ | Architecture stack |
| `serviceHealth` | ✅ | Reliability |
| `latencyPercentiles` | ✅ | Performance trends |
| `dataQuality` | ✅ | Quality scores |
| `journeyMap` | ✅ | User experience |
| `orgHealth` | ✅ | Adoption metrics |
| `waterfall` | ✅ | ROI breakdown |
| `sparklineGrid` | ✅ | KPI trends |
| `modelCard` | ✅ | ML documentation |
| `gantt` | ✅ | Timeline |
| `calendarHeatmap` | ✅ | Volume over time |
| `unitEconomics` | ✅ | Cost analysis |

---

## Final 24-Chart Matrix

| # | Case Study | Diagnose Chart | Architect Chart | Engineer Chart | Enable Chart |
|---|------------|----------------|-----------------|----------------|--------------|
| 1 | CoCo AI | Funnel | System Context | Service Health | Journey Map |
| 2 | AI Playbooks | Bar (Search Failure) | Layer Diagram | Metrics Dashboard | Before/After |
| 3 | Advanced Analytics | Scope Diagram | Layer Model | Migration Tracker | Performance Comparison |
| 4 | Global Content Automation | RACI Matrix | RAG Pipeline | Latency Percentiles | Sparkline Grid |
| 5 | Patient-Critical Systems | Gap Analysis | Architecture Diagram | Reliability Dashboard | Alert Flow |
| 6 | Defensible Clinical AI | Funnel | System Context | Model Card | Adoption Curve |
