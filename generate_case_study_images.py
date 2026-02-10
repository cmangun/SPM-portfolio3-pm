#!/usr/bin/env python3
"""
Generate unique placeholder images for each FDE case study.
Each image uses thematic colors and abstract patterns appropriate to the case study.
"""

from PIL import Image, ImageDraw
import math
import random
import os

# Image dimensions
WIDTH = 900
HEIGHT = 520

def create_gradient(draw, width, height, color1, color2, direction='horizontal'):
    """Create a gradient background"""
    for i in range(height if direction == 'vertical' else width):
        ratio = i / (height if direction == 'vertical' else width)
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        if direction == 'vertical':
            draw.line([(0, i), (width, i)], fill=(r, g, b))
        else:
            draw.line([(i, 0), (i, height)], fill=(r, g, b))

def add_grid_pattern(draw, width, height, color, spacing=40, opacity=30):
    """Add subtle grid lines"""
    grid_color = (color[0], color[1], color[2], opacity)
    for x in range(0, width, spacing):
        draw.line([(x, 0), (x, height)], fill=grid_color[:3], width=1)
    for y in range(0, height, spacing):
        draw.line([(0, y), (width, y)], fill=grid_color[:3], width=1)

def add_circuit_pattern(draw, width, height, color, num_lines=15):
    """Add circuit-like pattern for tech themes"""
    random.seed(42)
    for _ in range(num_lines):
        x = random.randint(0, width)
        y = random.randint(0, height)
        segments = random.randint(3, 8)
        points = [(x, y)]
        for _ in range(segments):
            direction = random.choice(['h', 'v'])
            length = random.randint(30, 150)
            if direction == 'h':
                x = max(0, min(width, x + random.choice([-1, 1]) * length))
            else:
                y = max(0, min(height, y + random.choice([-1, 1]) * length))
            points.append((x, y))
        for i in range(len(points) - 1):
            draw.line([points[i], points[i+1]], fill=color, width=2)
        for point in points:
            draw.ellipse([point[0]-4, point[1]-4, point[0]+4, point[1]+4], fill=color)

def add_data_flow_pattern(draw, width, height, color):
    """Add flowing data lines for analytics themes"""
    random.seed(123)
    for i in range(8):
        y_base = height * (i + 1) / 9
        points = []
        for x in range(0, width + 20, 20):
            y = y_base + math.sin(x * 0.02 + i) * 30 + random.randint(-10, 10)
            points.append((x, int(y)))
        draw.line(points, fill=color, width=2)

def add_network_nodes(draw, width, height, color, num_nodes=12):
    """Add connected nodes for system architecture themes"""
    random.seed(456)
    nodes = [(random.randint(100, width-100), random.randint(100, height-100)) for _ in range(num_nodes)]
    for i, node1 in enumerate(nodes):
        for j, node2 in enumerate(nodes):
            if i < j and random.random() > 0.6:
                draw.line([node1, node2], fill=color, width=1)
    for node in nodes:
        draw.ellipse([node[0]-8, node[1]-8, node[0]+8, node[1]+8], fill=color)
        draw.ellipse([node[0]-4, node[1]-4, node[0]+4, node[1]+4], fill=(255, 255, 255))

def add_wave_pattern(draw, width, height, color):
    """Add wave pattern for real-time/monitoring themes"""
    for wave in range(3):
        points = []
        y_offset = height * (wave + 1) / 4
        amplitude = 40 - wave * 10
        for x in range(-10, width + 10, 5):
            y = y_offset + math.sin(x * 0.03 + wave * 1.5) * amplitude
            points.append((x, int(y)))
        draw.line(points, fill=color, width=3)

def add_medical_cross_pattern(draw, width, height, color):
    """Add subtle medical cross pattern for healthcare themes"""
    size = 20
    spacing = 80
    for x in range(spacing//2, width, spacing):
        for y in range(spacing//2, height, spacing):
            draw.rectangle([x-size, y-3, x+size, y+3], fill=color)
            draw.rectangle([x-3, y-size, x+3, y+size], fill=color)

def add_document_stack(draw, width, height, color):
    """Add document/file icon pattern for content themes"""
    random.seed(789)
    for _ in range(8):
        x = random.randint(50, width - 100)
        y = random.randint(50, height - 80)
        w, h = 60, 70
        draw.rectangle([x, y, x+w, y+h], outline=color, width=2)
        for i in range(4):
            line_y = y + 15 + i * 12
            draw.line([x+8, line_y, x+w-8, line_y], fill=color, width=1)

CASE_STUDIES = {
    '01': {
        'name': 'Pfizer CoCo',
        'colors': {
            'gradient1': (20, 40, 80),
            'gradient2': (40, 80, 140),
            'accent': (100, 160, 220),
            'pattern': (60, 120, 180),
        },
        'patterns': ['grid', 'network']
    },
    '02': {
        'name': 'AI Playbook',
        'colors': {
            'gradient1': (30, 30, 40),
            'gradient2': (50, 50, 70),
            'accent': (120, 60, 200),
            'pattern': (80, 80, 100),
        },
        'patterns': ['grid', 'circuit']
    },
    '03': {
        'name': 'Abbott Alinity',
        'colors': {
            'gradient1': (60, 20, 80),
            'gradient2': (100, 40, 120),
            'accent': (180, 100, 220),
            'pattern': (140, 80, 180),
        },
        'patterns': ['data_flow', 'network']
    },
    '04': {
        'name': 'Pfizer Content',
        'colors': {
            'gradient1': (20, 60, 60),
            'gradient2': (40, 100, 100),
            'accent': (80, 180, 180),
            'pattern': (60, 140, 140),
        },
        'patterns': ['grid', 'document']
    },
    '05': {
        'name': 'Abbott Libre',
        'colors': {
            'gradient1': (80, 30, 30),
            'gradient2': (140, 50, 50),
            'accent': (220, 100, 100),
            'pattern': (180, 80, 80),
        },
        'patterns': ['wave', 'network']
    },
    '06': {
        'name': 'Medtronic GI Genius',
        'colors': {
            'gradient1': (20, 80, 60),
            'gradient2': (40, 140, 100),
            'accent': (80, 200, 150),
            'pattern': (60, 160, 120),
        },
        'patterns': ['medical', 'wave']
    },
}

SECTION_VARIATIONS = {
    '1': {'pattern_emphasis': 'primary', 'seed_offset': 0, 'gradient_flip': False},
    '2': {'pattern_emphasis': 'secondary', 'seed_offset': 100, 'gradient_flip': True},
    '3': {'pattern_emphasis': 'both_light', 'seed_offset': 200, 'gradient_flip': False},
    '5': {'pattern_emphasis': 'both', 'seed_offset': 300, 'gradient_flip': True},
}

def generate_image(case_study_id, section_id, output_dir):
    """Generate a unique image for a specific case study section"""
    config = CASE_STUDIES[case_study_id]
    section = SECTION_VARIATIONS[section_id]
    
    img = Image.new('RGB', (WIDTH, HEIGHT), config['colors']['gradient1'])
    draw = ImageDraw.Draw(img)
    
    g1, g2 = config['colors']['gradient1'], config['colors']['gradient2']
    if section.get('gradient_flip', False):
        g1, g2 = g2, g1
    
    direction = 'horizontal' if section_id in ['2', '3'] else 'vertical'
    create_gradient(draw, WIDTH, HEIGHT, g1, g2, direction)
    
    random.seed(int(case_study_id) * 1000 + section['seed_offset'] + int(section_id) * 7)
    
    patterns = config['patterns']
    pattern_color = config['colors']['pattern']
    accent_color = config['colors']['accent']
    
    emphasis = section['pattern_emphasis']
    
    if emphasis in ['primary', 'both', 'both_light']:
        pattern = patterns[0]
        spacing = 60 if emphasis == 'both_light' else 50
        if pattern == 'grid':
            add_grid_pattern(draw, WIDTH, HEIGHT, pattern_color, spacing)
        elif pattern == 'circuit':
            add_circuit_pattern(draw, WIDTH, HEIGHT, pattern_color, 12 if emphasis == 'both_light' else 15)
        elif pattern == 'data_flow':
            add_data_flow_pattern(draw, WIDTH, HEIGHT, pattern_color)
        elif pattern == 'wave':
            add_wave_pattern(draw, WIDTH, HEIGHT, pattern_color)
        elif pattern == 'medical':
            add_medical_cross_pattern(draw, WIDTH, HEIGHT, pattern_color)
        elif pattern == 'document':
            add_document_stack(draw, WIDTH, HEIGHT, pattern_color)
    
    if emphasis in ['secondary', 'both', 'both_light'] and len(patterns) > 1:
        pattern = patterns[1]
        if pattern == 'network':
            add_network_nodes(draw, WIDTH, HEIGHT, accent_color, 10 if emphasis == 'both_light' else 12)
        elif pattern == 'circuit':
            add_circuit_pattern(draw, WIDTH, HEIGHT, accent_color, 8)
        elif pattern == 'wave':
            add_wave_pattern(draw, WIDTH, HEIGHT, accent_color)
        elif pattern == 'document':
            add_document_stack(draw, WIDTH, HEIGHT, accent_color)
    
    if section_id == '1':
        add_grid_pattern(draw, WIDTH, HEIGHT, accent_color, 100)
    elif section_id == '3':
        for i in range(-HEIGHT, WIDTH + HEIGHT, 60):
            draw.line([(i, 0), (i + HEIGHT, HEIGHT)], fill=pattern_color, width=1)
    
    if case_study_id == '01':
        filename = f"CS1_{section_id}.jpg"
    else:
        filename = f"CS{case_study_id}_{section_id}.jpg"
    filepath = os.path.join(output_dir, filename)
    img.save(filepath, 'JPEG', quality=90)
    print(f"Generated: {filepath}")
    return filepath

def main():
    output_base = '/Users/christophermangun/Desktop/claude_readme/Christopher_Mangun_FDE/Portfolio/public/assets/img/fde'
    
    for cs_id in CASE_STUDIES.keys():
        cs_dir = os.path.join(output_base, f'case-study-{cs_id}')
        os.makedirs(cs_dir, exist_ok=True)
        
        for section_id in SECTION_VARIATIONS.keys():
            generate_image(cs_id, section_id, cs_dir)
    
    print(f"\nAll images generated in: {output_base}")

if __name__ == '__main__':
    main()
