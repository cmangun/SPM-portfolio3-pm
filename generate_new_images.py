#!/usr/bin/env python3
"""
Generate professional case study images for Healthcare AI Portfolio
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, Circle, Rectangle, Polygon, Wedge
import numpy as np
import os

# Base path for images
BASE_PATH = "/Users/christophermangun/Desktop/claude_readme/Christopher_Mangun_FDE/Portfolio/public/assets/img/fde"

# Color schemes
COLORS = {
    'cs01': {'primary': '#0066CC', 'secondary': '#003366', 'accent': '#00AAFF', 'bg': '#F8FAFC'},
    'cs02': {'primary': '#1A1A2E', 'secondary': '#16213E', 'accent': '#E94560', 'bg': '#0F3460'},
    'cs03': {'primary': '#00539B', 'secondary': '#002D62', 'accent': '#7AB2E1', 'bg': '#F0F4F8'},
    'cs04': {'primary': '#0066CC', 'secondary': '#004080', 'accent': '#66B2FF', 'bg': '#E6F0FA'},
    'cs05': {'primary': '#00539B', 'secondary': '#003D73', 'accent': '#4DA6FF', 'bg': '#EEF5FF'},
    'cs06': {'primary': '#00205B', 'secondary': '#001A4D', 'accent': '#0066B2', 'bg': '#F5F7FA'},
}

def create_gradient_bg(fig, ax, color1, color2):
    gradient = np.linspace(0, 1, 256).reshape(-1, 1)
    ax.imshow(gradient, aspect='auto', cmap=plt.cm.colors.LinearSegmentedColormap.from_list('grad', [color1, color2]),
              extent=[0, 1, 0, 1], zorder=0, alpha=0.9)

def add_tech_pattern(ax, color, alpha=0.1):
    np.random.seed(42)
    for _ in range(15):
        x, y = np.random.rand(), np.random.rand()
        ax.plot([x, x + np.random.rand() * 0.15], [y, y], color=color, alpha=alpha, linewidth=1)
        ax.plot([x, x], [y, y + np.random.rand() * 0.1], color=color, alpha=alpha, linewidth=1)

# ============== CS01: Pfizer CoCo AI ==============
def generate_cs01():
    colors = COLORS['cs01']
    output_dir = f"{BASE_PATH}/case-study-01"
    
    # CS1_0 - Hero
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#E6F3FF')
    add_tech_pattern(ax, colors['secondary'])
    
    ax.text(0.5, 0.9, 'Enterprise RAG Platform', fontsize=28, fontweight='bold', ha='center', color=colors['secondary'])
    ax.text(0.5, 0.83, 'Pharmaceutical Knowledge Management', fontsize=14, ha='center', color=colors['primary'])
    
    # Central RAG box
    ax.add_patch(FancyBboxPatch((0.3, 0.35), 0.4, 0.3, boxstyle="round,pad=0.02", facecolor=colors['primary'], edgecolor=colors['secondary'], linewidth=3))
    ax.text(0.5, 0.55, 'RAG Engine', fontsize=20, fontweight='bold', ha='center', color='white')
    ax.text(0.5, 0.43, 'Vector Search + LLM', fontsize=11, ha='center', color='white', alpha=0.9)
    
    # Surrounding nodes
    nodes = [(0.15, 0.7, 'Content'), (0.85, 0.7, 'MLR'), (0.15, 0.25, 'Users'), (0.85, 0.25, 'Audit'), (0.5, 0.12, 'Governance')]
    for x, y, label in nodes:
        ax.add_patch(FancyBboxPatch((x-0.08, y-0.05), 0.16, 0.1, boxstyle="round,pad=0.01", facecolor='white', edgecolor=colors['primary'], linewidth=2))
        ax.text(x, y, label, fontsize=10, ha='center', va='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS1_0.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS1_1 - Diagnose
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#FFF5F5', '#FFE8E8')
    
    ax.text(0.5, 0.9, 'Content Discovery Challenge', fontsize=24, fontweight='bold', ha='center', color='#CC0000')
    
    funnel = [(0.85, 0.72, '500K+ Documents', '#FF6B6B'), (0.65, 0.54, '45% Duplicate', '#FF5252'), 
              (0.45, 0.38, '6hr Search Time', '#E53935'), (0.28, 0.24, '35% Rework', '#C62828')]
    for w, y, label, c in funnel:
        ax.add_patch(FancyBboxPatch((0.5-w/2, y-0.05), w, 0.1, boxstyle="round,pad=0.01", facecolor=c, alpha=0.9))
        ax.text(0.5, y, label, fontsize=13, ha='center', va='center', color='white', fontweight='bold')
    
    plt.savefig(f"{output_dir}/CS1_1.jpg", dpi=100, bbox_inches='tight', facecolor='white')
    plt.close()
    
    # CS1_2 - Architect
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#E6F3FF')
    
    ax.text(0.5, 0.92, 'System Architecture', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    layers = [(0.82, 'Presentation', 'Teams + Web Portal'), (0.66, 'API Gateway', 'Auth + Rate Limit'),
              (0.50, 'RAG Service', 'Retrieval + Generation'), (0.34, 'Vector Store', 'Azure Cognitive Search'),
              (0.18, 'Data Layer', 'Content Repository')]
    for y, title, desc in layers:
        ax.add_patch(FancyBboxPatch((0.12, y-0.05), 0.76, 0.1, boxstyle="round,pad=0.01", facecolor=colors['primary'], alpha=0.2+(y/2)))
        ax.text(0.16, y, title, fontsize=12, fontweight='bold', va='center', color=colors['secondary'])
        ax.text(0.84, y, desc, fontsize=9, ha='right', va='center', color=colors['primary'])
    
    plt.savefig(f"{output_dir}/CS1_2.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS1_3 - Engineer
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#E6F3FF')
    
    ax.text(0.5, 0.92, 'Implementation Metrics', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    metrics = [(0.2, 0.65, '500+', 'Users'), (0.5, 0.65, '2.3x', 'Asset Reuse'), (0.8, 0.65, '65%', 'MLR Reduction'),
               (0.2, 0.32, '$2.08M', 'Savings'), (0.5, 0.32, '99.9%', 'Uptime'), (0.8, 0.32, '0', 'Issues')]
    for x, y, val, lbl in metrics:
        ax.add_patch(FancyBboxPatch((x-0.11, y-0.1), 0.22, 0.2, boxstyle="round,pad=0.02", facecolor='white', edgecolor=colors['primary'], linewidth=2))
        ax.text(x, y+0.02, val, fontsize=22, fontweight='bold', ha='center', color=colors['primary'])
        ax.text(x, y-0.05, lbl, fontsize=9, ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS1_3.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS1_5 - Impact
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#E8F5E9', '#C8E6C9')
    
    ax.text(0.5, 0.9, 'Business Impact', fontsize=24, fontweight='bold', ha='center', color='#2E7D32')
    
    for i, (icon, label) in enumerate([('✓', 'Zero Violations'), ('✓', 'FDA Ready'), ('✓', 'Production')]):
        x = 0.25 + i * 0.25
        ax.add_patch(Circle((x, 0.6), 0.07, facecolor='#4CAF50', edgecolor='#2E7D32', linewidth=2))
        ax.text(x, 0.6, icon, fontsize=24, ha='center', va='center', color='white')
        ax.text(x, 0.48, label, fontsize=11, ha='center', color='#2E7D32')
    
    ax.add_patch(FancyBboxPatch((0.15, 0.2), 0.7, 0.12, boxstyle="round,pad=0.01", facecolor='#4CAF50', alpha=0.9))
    ax.text(0.5, 0.26, '412% ROI in Year 1', fontsize=18, fontweight='bold', ha='center', color='white')
    
    plt.savefig(f"{output_dir}/CS1_5.jpg", dpi=100, bbox_inches='tight', facecolor='#E8F5E9')
    plt.close()
    print("✓ CS01 (Pfizer CoCo AI)")

# ============== CS02: IPG Health ==============
def generate_cs02():
    colors = COLORS['cs02']
    output_dir = f"{BASE_PATH}/case-study-02"
    
    # CS02_0 - Hero
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], colors['secondary'])
    
    ax.text(0.5, 0.9, 'Multi-Tenant Compliance Platform', fontsize=24, fontweight='bold', ha='center', color='white')
    ax.text(0.5, 0.82, '$51M Portfolio | 13 Pharma Brands', fontsize=13, ha='center', color=colors['accent'])
    
    brands = ['Novartis', 'Sanofi', 'Pfizer', 'Lilly', 'AbbVie', 'Merck']
    for i, brand in enumerate(brands):
        x, y = 0.2 + (i % 3) * 0.3, 0.55 if i < 3 else 0.35
        ax.add_patch(FancyBboxPatch((x-0.1, y-0.05), 0.2, 0.1, boxstyle="round,pad=0.01", facecolor=colors['primary'], edgecolor=colors['accent'], linewidth=2))
        ax.text(x, y, brand, fontsize=11, ha='center', va='center', color='white')
    
    ax.add_patch(FancyBboxPatch((0.25, 0.12), 0.5, 0.08, boxstyle="round,pad=0.01", facecolor=colors['accent']))
    ax.text(0.5, 0.16, 'HIPAA Governance Layer', fontsize=11, fontweight='bold', ha='center', color='white')
    
    plt.savefig(f"{output_dir}/CS02_0.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS02_1 - Diagnose
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], colors['secondary'])
    
    ax.text(0.5, 0.9, 'Compliance Challenge', fontsize=24, fontweight='bold', ha='center', color='white')
    
    for i, (val, lbl) in enumerate([('13', 'Brands'), ('$51M', 'Portfolio'), ('4yr', 'Timeline')]):
        x = 0.25 + i * 0.25
        ax.add_patch(FancyBboxPatch((x-0.09, y-0.09), 0.18, 0.18, boxstyle="round,pad=0.01", facecolor=colors['accent'], alpha=0.3))
        ax.text(x, 0.58, val, fontsize=26, fontweight='bold', ha='center', color=colors['accent'])
        ax.text(x, 0.48, lbl, fontsize=11, ha='center', color='white')
    
    ax.text(0.5, 0.28, 'Zero Tolerance for HIPAA Violations', fontsize=16, ha='center', color=colors['accent'], fontweight='bold')
    
    plt.savefig(f"{output_dir}/CS02_1.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS02_2 - Architect
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], colors['secondary'])
    
    ax.text(0.5, 0.92, 'Tenant Isolation Architecture', fontsize=24, fontweight='bold', ha='center', color='white')
    
    for i, label in enumerate(['Tenant A', 'Tenant B', 'Tenant C']):
        x = 0.2 + i * 0.3
        ax.add_patch(FancyBboxPatch((x-0.1, 0.4), 0.2, 0.35, boxstyle="round,pad=0.01", facecolor=colors['primary'], edgecolor=colors['accent'], linewidth=2))
        ax.text(x, 0.7, label, fontsize=11, fontweight='bold', ha='center', color='white')
        for j, comp in enumerate(['Data', 'Config', 'Audit']):
            ax.text(x, 0.58 - j*0.08, comp, fontsize=9, ha='center', color='white', alpha=0.8)
    
    ax.add_patch(FancyBboxPatch((0.1, 0.15), 0.8, 0.12, boxstyle="round,pad=0.01", facecolor=colors['accent']))
    ax.text(0.5, 0.21, 'Shared: Security | Compliance | Monitoring', fontsize=11, ha='center', color='white')
    
    plt.savefig(f"{output_dir}/CS02_2.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS02_3 - Engineer
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], colors['secondary'])
    
    ax.text(0.5, 0.92, 'Team Scaling: 5 → 60+', fontsize=24, fontweight='bold', ha='center', color='white')
    
    for i, (yr, sz) in enumerate([('Y1', 5), ('Y2', 15), ('Y3', 35), ('Y4', 60)]):
        x, h = 0.2 + i * 0.2, sz / 70 * 0.45
        ax.add_patch(FancyBboxPatch((x-0.06, 0.25), 0.12, h, boxstyle="round,pad=0.01", facecolor=colors['accent'], alpha=0.85))
        ax.text(x, 0.25 + h + 0.03, str(sz), fontsize=14, fontweight='bold', ha='center', color='white')
        ax.text(x, 0.2, yr, fontsize=10, ha='center', color='white', alpha=0.8)
    
    ax.text(0.5, 0.82, '8 Direct Reports | 3 Promoted', fontsize=12, ha='center', color=colors['accent'])
    
    plt.savefig(f"{output_dir}/CS02_3.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS02_5 - Impact
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#1A4D1A', '#0D2B0D')
    
    ax.text(0.5, 0.9, 'Compliance Achievement', fontsize=24, fontweight='bold', ha='center', color='white')
    ax.add_patch(Circle((0.5, 0.52), 0.18, facecolor='#4CAF50', edgecolor='white', linewidth=3))
    ax.text(0.5, 0.52, '0', fontsize=64, fontweight='bold', ha='center', va='center', color='white')
    ax.text(0.5, 0.28, 'HIPAA Violations\n4 Years', fontsize=14, ha='center', color='white')
    
    for i, (v, l) in enumerate([('60%', 'Cost Cut'), ('99.9%', 'Uptime'), ('$51M', 'Protected')]):
        x = 0.2 + i * 0.3
        ax.text(x, 0.12, v, fontsize=18, fontweight='bold', ha='center', color='#4CAF50')
        ax.text(x, 0.06, l, fontsize=9, ha='center', color='white')
    
    plt.savefig(f"{output_dir}/CS02_5.jpg", dpi=100, bbox_inches='tight', facecolor='#1A4D1A')
    plt.close()
    print("✓ CS02 (IPG Health)")

# ============== CS03: Abbott Alinity ==============
def generate_cs03():
    colors = COLORS['cs03']
    output_dir = f"{BASE_PATH}/case-study-03"
    
    # CS03_0 - Hero
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#E6F0FA')
    add_tech_pattern(ax, colors['primary'])
    
    ax.text(0.5, 0.9, 'GxP-Compliant ML Pipeline', fontsize=26, fontweight='bold', ha='center', color=colors['secondary'])
    ax.text(0.5, 0.82, '27,000+ Medical Devices | AWS Migration', fontsize=13, ha='center', color=colors['primary'])
    
    # Pipeline flow
    stages = ['Ingest', 'Process', 'Model', 'Deploy', 'Monitor']
    for i, stage in enumerate(stages):
        x = 0.15 + i * 0.175
        ax.add_patch(FancyBboxPatch((x-0.06, 0.45), 0.12, 0.12, boxstyle="round,pad=0.01", facecolor=colors['primary'] if i != 2 else colors['accent'], edgecolor='white', linewidth=2))
        ax.text(x, 0.51, stage, fontsize=9, ha='center', va='center', color='white', fontweight='bold')
        if i < 4:
            ax.annotate('', xy=(x+0.09, 0.51), xytext=(x+0.06, 0.51), arrowprops=dict(arrowstyle='->', color=colors['accent'], lw=2))
    
    ax.add_patch(FancyBboxPatch((0.2, 0.2), 0.6, 0.1, boxstyle="round,pad=0.01", facecolor='white', edgecolor=colors['primary'], linewidth=2))
    ax.text(0.5, 0.25, 'FDA 21 CFR Part 11 Compliant', fontsize=12, ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS03_0.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS03_1 - Diagnose
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#FFF8E1', '#FFECB3')
    
    ax.text(0.5, 0.9, 'Legacy System Challenge', fontsize=24, fontweight='bold', ha='center', color='#E65100')
    
    issues = [('27K', 'Devices'), ('6mo', 'Deploy Time'), ('On-Prem', 'Infrastructure'), ('Manual', 'Validation')]
    for i, (val, lbl) in enumerate(issues):
        x = 0.2 + (i % 2) * 0.6
        y = 0.6 if i < 2 else 0.35
        ax.add_patch(FancyBboxPatch((x-0.12, y-0.08), 0.24, 0.16, boxstyle="round,pad=0.01", facecolor='#FF9800', alpha=0.8))
        ax.text(x, y+0.02, val, fontsize=20, fontweight='bold', ha='center', color='white')
        ax.text(x, y-0.04, lbl, fontsize=10, ha='center', color='white')
    
    plt.savefig(f"{output_dir}/CS03_1.jpg", dpi=100, bbox_inches='tight', facecolor='#FFF8E1')
    plt.close()
    
    # CS03_2 - Architect
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#E6F0FA')
    
    ax.text(0.5, 0.92, 'AWS Migration Architecture', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    # Cloud layers
    layers = [(0.78, 'SageMaker', 'Model Training & Serving'), (0.58, 'Lambda + S3', 'Data Pipeline'), 
              (0.38, 'RDS + DynamoDB', 'Audit & Metadata'), (0.18, 'VPC + IAM', 'Security & Compliance')]
    for y, title, desc in layers:
        ax.add_patch(FancyBboxPatch((0.15, y-0.06), 0.7, 0.12, boxstyle="round,pad=0.01", facecolor=colors['primary'], alpha=0.3+(y/2)))
        ax.text(0.2, y, title, fontsize=12, fontweight='bold', va='center', color=colors['secondary'])
        ax.text(0.8, y, desc, fontsize=9, ha='right', va='center', color=colors['primary'])
    
    plt.savefig(f"{output_dir}/CS03_2.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS03_3 - Engineer
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#E6F0FA')
    
    ax.text(0.5, 0.92, 'Deployment Acceleration', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    # Before/After comparison
    ax.add_patch(FancyBboxPatch((0.1, 0.45), 0.35, 0.3, boxstyle="round,pad=0.01", facecolor='#FFCDD2', edgecolor='#C62828', linewidth=2))
    ax.text(0.275, 0.7, 'BEFORE', fontsize=12, fontweight='bold', ha='center', color='#C62828')
    ax.text(0.275, 0.55, '6 months', fontsize=22, fontweight='bold', ha='center', color='#C62828')
    
    ax.add_patch(FancyBboxPatch((0.55, 0.45), 0.35, 0.3, boxstyle="round,pad=0.01", facecolor='#C8E6C9', edgecolor='#2E7D32', linewidth=2))
    ax.text(0.725, 0.7, 'AFTER', fontsize=12, fontweight='bold', ha='center', color='#2E7D32')
    ax.text(0.725, 0.55, '3 weeks', fontsize=22, fontweight='bold', ha='center', color='#2E7D32')
    
    ax.text(0.5, 0.25, '88% Faster Deployments', fontsize=18, fontweight='bold', ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS03_3.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS03_5 - Impact
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#E3F2FD', '#BBDEFB')
    
    ax.text(0.5, 0.9, 'FDA Audit Results', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    ax.add_patch(Circle((0.5, 0.52), 0.18, facecolor=colors['primary'], edgecolor='white', linewidth=3))
    ax.text(0.5, 0.52, '0', fontsize=64, fontweight='bold', ha='center', va='center', color='white')
    ax.text(0.5, 0.28, 'Audit Findings', fontsize=16, ha='center', color=colors['secondary'], fontweight='bold')
    
    for i, (v, l) in enumerate([('99.99%', 'Uptime'), ('27K+', 'Devices'), ('100%', 'Compliant')]):
        x = 0.2 + i * 0.3
        ax.text(x, 0.12, v, fontsize=16, fontweight='bold', ha='center', color=colors['primary'])
        ax.text(x, 0.06, l, fontsize=9, ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS03_5.jpg", dpi=100, bbox_inches='tight', facecolor='#E3F2FD')
    plt.close()
    print("✓ CS03 (Abbott Alinity)")

# ============== CS04: Pfizer Content Automation ==============
def generate_cs04():
    colors = COLORS['cs04']
    output_dir = f"{BASE_PATH}/case-study-04"
    
    # CS04_0 - Hero
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#D6EAFF')
    
    ax.text(0.5, 0.9, 'Human-in-the-Loop MLR', fontsize=26, fontweight='bold', ha='center', color=colors['secondary'])
    ax.text(0.5, 0.82, 'AI-Assisted Compliance Workflow', fontsize=13, ha='center', color=colors['primary'])
    
    # HITL flow
    ax.add_patch(FancyBboxPatch((0.1, 0.4), 0.2, 0.2, boxstyle="round,pad=0.01", facecolor=colors['primary']))
    ax.text(0.2, 0.5, 'AI\nReview', fontsize=12, ha='center', va='center', color='white', fontweight='bold')
    
    ax.add_patch(FancyBboxPatch((0.4, 0.4), 0.2, 0.2, boxstyle="round,pad=0.01", facecolor=colors['accent']))
    ax.text(0.5, 0.5, 'Human\nValidation', fontsize=12, ha='center', va='center', color='white', fontweight='bold')
    
    ax.add_patch(FancyBboxPatch((0.7, 0.4), 0.2, 0.2, boxstyle="round,pad=0.01", facecolor='#4CAF50'))
    ax.text(0.8, 0.5, 'Approved\nContent', fontsize=12, ha='center', va='center', color='white', fontweight='bold')
    
    ax.annotate('', xy=(0.38, 0.5), xytext=(0.32, 0.5), arrowprops=dict(arrowstyle='->', color='#333', lw=2))
    ax.annotate('', xy=(0.68, 0.5), xytext=(0.62, 0.5), arrowprops=dict(arrowstyle='->', color='#333', lw=2))
    
    ax.text(0.5, 0.2, '82% Auto-Validation Rate', fontsize=14, ha='center', color=colors['secondary'], fontweight='bold')
    
    plt.savefig(f"{output_dir}/CS04_0.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS04_1 - Diagnose
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#FFF3E0', '#FFE0B2')
    
    ax.text(0.5, 0.9, 'MLR Bottleneck Analysis', fontsize=24, fontweight='bold', ha='center', color='#E65100')
    
    bottlenecks = [('72hr', 'Avg Review'), ('3.2', 'Revision Cycles'), ('$4.2K', 'Cost/Asset'), ('18%', 'Rejection Rate')]
    for i, (val, lbl) in enumerate(bottlenecks):
        x = 0.2 + (i % 2) * 0.6
        y = 0.6 if i < 2 else 0.35
        ax.add_patch(FancyBboxPatch((x-0.12, y-0.08), 0.24, 0.16, boxstyle="round,pad=0.01", facecolor='#FF9800', alpha=0.85))
        ax.text(x, y+0.02, val, fontsize=20, fontweight='bold', ha='center', color='white')
        ax.text(x, y-0.04, lbl, fontsize=10, ha='center', color='white')
    
    plt.savefig(f"{output_dir}/CS04_1.jpg", dpi=100, bbox_inches='tight', facecolor='#FFF3E0')
    plt.close()
    
    # CS04_2 - Architect
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#D6EAFF')
    
    ax.text(0.5, 0.92, 'HITL Architecture', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    # Workflow stages
    stages = [('Content\nUpload', 0.1), ('AI\nAnalysis', 0.3), ('Human\nReview', 0.5), ('Approval\nGate', 0.7), ('Publish', 0.9)]
    for label, x in stages:
        ax.add_patch(Circle((x, 0.55), 0.08, facecolor=colors['primary'], edgecolor='white', linewidth=2))
        ax.text(x, 0.55, label, fontsize=8, ha='center', va='center', color='white')
    
    for i in range(4):
        ax.annotate('', xy=(0.12 + i*0.2 + 0.16, 0.55), xytext=(0.12 + i*0.2 + 0.08, 0.55), arrowprops=dict(arrowstyle='->', color=colors['accent'], lw=2))
    
    ax.add_patch(FancyBboxPatch((0.2, 0.25), 0.6, 0.12, boxstyle="round,pad=0.01", facecolor='white', edgecolor=colors['primary'], linewidth=2))
    ax.text(0.5, 0.31, 'Audit Trail + Compliance Logging', fontsize=11, ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS04_2.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS04_3 - Engineer
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#D6EAFF')
    
    ax.text(0.5, 0.92, 'Performance Metrics', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    metrics = [(0.2, 0.65, '71%', 'Faster Reviews'), (0.5, 0.65, '82%', 'Auto-Validated'), (0.8, 0.65, '100%', 'Audit Trail'),
               (0.35, 0.32, '2.1→0.8', 'Revisions'), (0.65, 0.32, '$1.2K', 'Cost/Asset')]
    for x, y, val, lbl in metrics:
        ax.add_patch(FancyBboxPatch((x-0.12, y-0.1), 0.24, 0.2, boxstyle="round,pad=0.02", facecolor='white', edgecolor=colors['primary'], linewidth=2))
        ax.text(x, y+0.02, val, fontsize=18, fontweight='bold', ha='center', color=colors['primary'])
        ax.text(x, y-0.05, lbl, fontsize=9, ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS04_3.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS04_5 - Impact
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#E8F5E9', '#C8E6C9')
    
    ax.text(0.5, 0.9, 'Compliance Impact', fontsize=24, fontweight='bold', ha='center', color='#2E7D32')
    
    results = [('✓', '71% Faster'), ('✓', 'Full Traceability'), ('✓', 'Zero Violations')]
    for i, (icon, label) in enumerate(results):
        x = 0.25 + i * 0.25
        ax.add_patch(Circle((x, 0.55), 0.08, facecolor='#4CAF50', edgecolor='#2E7D32', linewidth=2))
        ax.text(x, 0.55, icon, fontsize=24, ha='center', va='center', color='white')
        ax.text(x, 0.42, label, fontsize=11, ha='center', color='#2E7D32')
    
    ax.add_patch(FancyBboxPatch((0.2, 0.18), 0.6, 0.1, boxstyle="round,pad=0.01", facecolor='#4CAF50'))
    ax.text(0.5, 0.23, '$3.5M Annual Savings', fontsize=16, fontweight='bold', ha='center', color='white')
    
    plt.savefig(f"{output_dir}/CS04_5.jpg", dpi=100, bbox_inches='tight', facecolor='#E8F5E9')
    plt.close()
    print("✓ CS04 (Pfizer Content)")

# ============== CS05: Abbott Libre CGM ==============
def generate_cs05():
    colors = COLORS['cs05']
    output_dir = f"{BASE_PATH}/case-study-05"
    
    # CS05_0 - Hero
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#D6E8FF')
    
    ax.text(0.5, 0.9, 'Patient-Critical Real-Time Systems', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    ax.text(0.5, 0.82, 'Continuous Glucose Monitoring | 4M+ Patients', fontsize=13, ha='center', color=colors['primary'])
    
    # Heartbeat-style line
    x = np.linspace(0.1, 0.9, 200)
    y = 0.5 + 0.08 * np.sin(x * 30) * np.exp(-((x - 0.5) ** 2) / 0.1)
    ax.plot(x, y, color=colors['accent'], linewidth=3)
    ax.scatter([0.5], [0.5], color=colors['primary'], s=200, zorder=5)
    
    ax.add_patch(FancyBboxPatch((0.3, 0.2), 0.4, 0.1, boxstyle="round,pad=0.01", facecolor=colors['primary']))
    ax.text(0.5, 0.25, '99.99% Alert Delivery', fontsize=14, fontweight='bold', ha='center', color='white')
    
    plt.savefig(f"{output_dir}/CS05_0.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS05_1 - Diagnose
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#FFEBEE', '#FFCDD2')
    
    ax.text(0.5, 0.9, 'Patient Safety Stakes', fontsize=24, fontweight='bold', ha='center', color='#C62828')
    
    stakes = [('4M+', 'Patients'), ('24/7', 'Monitoring'), ('<1s', 'Required'), ('0', 'Miss Tolerance')]
    for i, (val, lbl) in enumerate(stakes):
        x = 0.2 + (i % 2) * 0.6
        y = 0.6 if i < 2 else 0.35
        ax.add_patch(FancyBboxPatch((x-0.12, y-0.08), 0.24, 0.16, boxstyle="round,pad=0.01", facecolor='#E53935', alpha=0.85))
        ax.text(x, y+0.02, val, fontsize=20, fontweight='bold', ha='center', color='white')
        ax.text(x, y-0.04, lbl, fontsize=10, ha='center', color='white')
    
    plt.savefig(f"{output_dir}/CS05_1.jpg", dpi=100, bbox_inches='tight', facecolor='#FFEBEE')
    plt.close()
    
    # CS05_2 - Architect
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#D6E8FF')
    
    ax.text(0.5, 0.92, 'Real-Time Alert Architecture', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    # Flow diagram
    components = [('CGM\nSensor', 0.15), ('Edge\nProcess', 0.35), ('Alert\nEngine', 0.55), ('Patient\nNotify', 0.75), ('Care\nTeam', 0.95)]
    for label, x in components:
        ax.add_patch(FancyBboxPatch((x-0.08, 0.45), 0.16, 0.15, boxstyle="round,pad=0.01", facecolor=colors['primary'], edgecolor='white', linewidth=2))
        ax.text(x, 0.525, label, fontsize=9, ha='center', va='center', color='white')
    
    for i in range(4):
        ax.annotate('', xy=(0.09 + i*0.2 + 0.18, 0.525), xytext=(0.09 + i*0.2 + 0.1, 0.525), arrowprops=dict(arrowstyle='->', color=colors['accent'], lw=2))
    
    ax.text(0.5, 0.25, 'Sub-Second Latency | Multi-Channel Delivery', fontsize=12, ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS05_2.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS05_3 - Engineer
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#D6E8FF')
    
    ax.text(0.5, 0.92, 'Reliability Engineering', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    metrics = [(0.2, 0.6, '99.99%', 'Delivery'), (0.5, 0.6, '<800ms', 'Latency'), (0.8, 0.6, '0', 'Missed Alerts'),
               (0.35, 0.3, '3', 'Redundancy'), (0.65, 0.3, '24/7', 'Monitoring')]
    for x, y, val, lbl in metrics:
        ax.add_patch(FancyBboxPatch((x-0.11, y-0.08), 0.22, 0.16, boxstyle="round,pad=0.02", facecolor='white', edgecolor=colors['primary'], linewidth=2))
        ax.text(x, y+0.02, val, fontsize=18, fontweight='bold', ha='center', color=colors['primary'])
        ax.text(x, y-0.04, lbl, fontsize=9, ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS05_3.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS05_5 - Impact
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#E8F5E9', '#C8E6C9')
    
    ax.text(0.5, 0.9, 'Patient Safety Impact', fontsize=24, fontweight='bold', ha='center', color='#2E7D32')
    
    ax.add_patch(Circle((0.5, 0.52), 0.18, facecolor='#4CAF50', edgecolor='white', linewidth=3))
    ax.text(0.5, 0.52, '0', fontsize=64, fontweight='bold', ha='center', va='center', color='white')
    ax.text(0.5, 0.28, 'Missed Critical Alerts', fontsize=16, ha='center', color='#2E7D32', fontweight='bold')
    
    for i, (v, l) in enumerate([('4M+', 'Patients'), ('99.99%', 'Delivery'), ('<1s', 'Latency')]):
        x = 0.2 + i * 0.3
        ax.text(x, 0.12, v, fontsize=16, fontweight='bold', ha='center', color='#4CAF50')
        ax.text(x, 0.06, l, fontsize=9, ha='center', color='#2E7D32')
    
    plt.savefig(f"{output_dir}/CS05_5.jpg", dpi=100, bbox_inches='tight', facecolor='#E8F5E9')
    plt.close()
    print("✓ CS05 (Abbott Libre CGM)")

# ============== CS06: Medtronic GI Genius ==============
def generate_cs06():
    colors = COLORS['cs06']
    output_dir = f"{BASE_PATH}/case-study-06"
    
    # CS06_0 - Hero
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#E8EEF5')
    add_tech_pattern(ax, colors['primary'])
    
    ax.text(0.5, 0.9, 'FDA 510(k) AI Medical Device', fontsize=26, fontweight='bold', ha='center', color=colors['secondary'])
    ax.text(0.5, 0.82, 'AI-Assisted Polyp Detection', fontsize=13, ha='center', color=colors['primary'])
    
    # Central device representation
    ax.add_patch(Circle((0.5, 0.5), 0.18, facecolor=colors['primary'], edgecolor='white', linewidth=3))
    ax.text(0.5, 0.52, 'GI', fontsize=32, fontweight='bold', ha='center', va='center', color='white')
    ax.text(0.5, 0.42, 'Genius', fontsize=14, ha='center', va='center', color='white')
    
    # Surrounding metrics
    metrics = [(0.2, 0.75, '99.7%'), (0.8, 0.75, '14%↑'), (0.2, 0.25, '510(k)'), (0.8, 0.25, '500+')]
    labels = ['Sensitivity', 'ADR', 'Cleared', 'Sites']
    for (x, y, val), lbl in zip(metrics, labels):
        ax.add_patch(FancyBboxPatch((x-0.08, y-0.05), 0.16, 0.1, boxstyle="round,pad=0.01", facecolor='white', edgecolor=colors['primary'], linewidth=2))
        ax.text(x, y+0.01, val, fontsize=12, fontweight='bold', ha='center', color=colors['primary'])
        ax.text(x, y-0.08, lbl, fontsize=9, ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS06_0.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS06_1 - Diagnose
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#E3F2FD', '#BBDEFB')
    
    ax.text(0.5, 0.9, 'Clinical Challenge', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    # Funnel - polyp miss rate
    funnel = [(0.8, 0.72, '15M Colonoscopies/yr'), (0.6, 0.54, '26% Polyp Miss Rate'), 
              (0.4, 0.38, 'Preventable Cancers'), (0.25, 0.24, 'Need: AI Detection')]
    for w, y, label in funnel:
        ax.add_patch(FancyBboxPatch((0.5-w/2, y-0.05), w, 0.1, boxstyle="round,pad=0.01", facecolor=colors['primary'], alpha=0.6 + y/3))
        ax.text(0.5, y, label, fontsize=12, ha='center', va='center', color='white', fontweight='bold')
    
    plt.savefig(f"{output_dir}/CS06_1.jpg", dpi=100, bbox_inches='tight', facecolor='#E3F2FD')
    plt.close()
    
    # CS06_2 - Architect
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#E8EEF5')
    
    ax.text(0.5, 0.92, 'FDA Regulatory Architecture', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    # Regulatory pathway
    stages = [('Design\nControl', 0.15), ('V&V\nProtocol', 0.35), ('Clinical\nTrial', 0.55), ('510(k)\nSubmission', 0.75), ('FDA\nClearance', 0.95)]
    for i, (label, x) in enumerate(stages):
        c = '#4CAF50' if i == 4 else colors['primary']
        ax.add_patch(FancyBboxPatch((x-0.08, 0.45), 0.16, 0.15, boxstyle="round,pad=0.01", facecolor=c, edgecolor='white', linewidth=2))
        ax.text(x, 0.525, label, fontsize=9, ha='center', va='center', color='white')
    
    for i in range(4):
        ax.annotate('', xy=(0.09 + i*0.2 + 0.18, 0.525), xytext=(0.09 + i*0.2 + 0.1, 0.525), arrowprops=dict(arrowstyle='->', color=colors['accent'], lw=2))
    
    ax.text(0.5, 0.25, '21 CFR 820 + IEC 62304 Compliance', fontsize=12, ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS06_2.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS06_3 - Engineer
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, colors['bg'], '#E8EEF5')
    
    ax.text(0.5, 0.92, 'Model Validation Results', fontsize=24, fontweight='bold', ha='center', color=colors['secondary'])
    
    metrics = [(0.2, 0.6, '99.7%', 'Sensitivity'), (0.5, 0.6, '98.5%', 'Specificity'), (0.8, 0.6, '0.99', 'AUC'),
               (0.35, 0.3, '30fps', 'Real-time'), (0.65, 0.3, '50K+', 'Images')]
    for x, y, val, lbl in metrics:
        ax.add_patch(FancyBboxPatch((x-0.11, y-0.08), 0.22, 0.16, boxstyle="round,pad=0.02", facecolor='white', edgecolor=colors['primary'], linewidth=2))
        ax.text(x, y+0.02, val, fontsize=18, fontweight='bold', ha='center', color=colors['primary'])
        ax.text(x, y-0.04, lbl, fontsize=9, ha='center', color=colors['secondary'])
    
    plt.savefig(f"{output_dir}/CS06_3.jpg", dpi=100, bbox_inches='tight', facecolor=colors['bg'])
    plt.close()
    
    # CS06_5 - Impact
    fig, ax = plt.subplots(figsize=(11.52, 8.96), dpi=100)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis('off')
    create_gradient_bg(fig, ax, '#E8F5E9', '#C8E6C9')
    
    ax.text(0.5, 0.9, 'FDA Clearance Achieved', fontsize=24, fontweight='bold', ha='center', color='#2E7D32')
    
    ax.add_patch(Circle((0.5, 0.52), 0.18, facecolor='#4CAF50', edgecolor='white', linewidth=3))
    ax.text(0.5, 0.52, '✓', fontsize=64, ha='center', va='center', color='white')
    ax.text(0.5, 0.28, '510(k) Cleared', fontsize=18, ha='center', color='#2E7D32', fontweight='bold')
    
    for i, (v, l) in enumerate([('14%', 'ADR Improvement'), ('500+', 'Clinical Sites'), ('99.7%', 'Sensitivity')]):
        x = 0.2 + i * 0.3
        ax.text(x, 0.12, v, fontsize=16, fontweight='bold', ha='center', color='#4CAF50')
        ax.text(x, 0.06, l, fontsize=9, ha='center', color='#2E7D32')
    
    plt.savefig(f"{output_dir}/CS06_5.jpg", dpi=100, bbox_inches='tight', facecolor='#E8F5E9')
    plt.close()
    print("✓ CS06 (Medtronic GI Genius)")


if __name__ == "__main__":
    print("Generating case study images...")
    generate_cs01()
    generate_cs02()
    generate_cs03()
    generate_cs04()
    generate_cs05()
    generate_cs06()
    print("\n✅ All images generated successfully!")
