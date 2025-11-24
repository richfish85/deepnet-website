# DeepNet Visual Style Spec v1.0

A unified visual language for diagrams, infographics, technical documentation, and educational material.

## 🜁 DeepNet Style Sigil

Use at the top of any prompt to activate the DeepNet aesthetic profile:

DeepNet Sigil: DN-S0B1-Grid12-LW3-R6-BP-FC25D

<br>

Meaning:

DN – DeepNet identity

S0B1 – Style 0 (blueprint-tech) + Clarity level 1 (IKEA-like)

Grid12 – 12-column layout grid

LW3 – 3px primary outline line weight

R6 – 6px corner radius

BP – Blueprint palette

FC25D – Flat Color + 2.5D pseudo-depth, no gradients

This sigil serves as the “activation key” for consistent, deterministic rendering.

1. Visual Philosophy

DeepNet visuals follow a hybrid of:

blueprint aesthetics

minimalist engineering diagrams

IKEA instruction manual clarity

cyber-architecture neutrality

The tone is clean, direct, breathable, and modern.

Emphasis is on clarity first, aesthetics second.

2. Color Palette
Primary Color (DeepNet Blue)
#1D3A70

Secondary Slate
#2D2F3A

Accent Cyan
#57D8FF

Background White (Blueprint Paper)
#F7F8FA

Dark Mode Background (Terminal Black)
#0C0F14


Rules:

Avoid gradients.

Use accent cyan sparingly for emphasis and arrows.

Background must always remain clean and neutral.

3. Typography
Primary Typeface

Inter (or “Inter-like” if model substitution occurs)

Heading Hierarchy

H1: 44–56px, DeepNet Blue, bold

H2: 32px, semi-bold

H3: 24px, bold

Body: 16–18px

Caption/Notes: 14px

Rules:

No italics.

No serif fonts.

Keep headings minimal and sharp.

4. Iconography and Line Art
Line Weights

3px – outer borders

2px – separators

1px – fine internal details

Shape Language

Rounded rectangles (6px radius)

Simple geometric icons

No ornamental curves

Always flat color or 2.5D block shading

Arrows

Cyan

Thick

45° angled arrowhead

No curved arrows unless representing cyclic processes

5. Layout System
Grid

12-column grid

24–32px gutters

48–64px outer padding

Spacing

Plenty of whitespace

Avoid clutter

One concept per block unless grouped intentionally

Block Structure

Every content module is built as:

┌───────────────────────────────────────────┐
│  Title Bar (DeepNet Blue)                 │
│───────────────────────────────────────────│
│  Content Block / Diagram                  │
│                                           │
└───────────────────────────────────────────┘

Flow

Logical left→right or top→bottom

Never diagonal or chaotic

Use IKEA-style “step sequences” for procedural content

6. Illustration Style Rules
Allowed

Flat colors

2.5D pseudo-depth (simple shading ONLY)

Clean, interpretive hardware outlines

Blueprint-style renderings

Axonometric simplified shapes

Avoid

Photorealism (unless explicitly requested)

Heavy texture

Gradients

Shadows beyond light 2.5D block shading

Cluttered detail or busy patterns

7. Diagram Language
Nodes

Rounded rectangles or circles

DeepNet Blue outlines

Minimal labels

Internal separators using 1–2px lines

Connections

Straight 90° lines

Cyan arrowheads

T-joints and L-joints should snap to grid

Hardware Diagrams

Use simplified internal components (chips, pipelines, threads, buses)

Keep them visually intelligible with minimal detail

Flowcharts

Use only native shapes defined above

Maintain strict grid alignment

Minimal text inside nodes

8. Text Tone for Callouts

Voice should be:

confident

concise

frictionless

occasionally playful

always educational

Examples:

“This is where things break.”

“Keep this boundary strict.”

“Kernel mode: mistakes here cost everything.”

“Pipelines make speed, but also chaos.”

9. Standard Prompt Template

Use this when generating any DeepNet infographic or technical visual in Gemini:

DeepNet Sigil: DN-S0B1-Grid12-LW3-R6-BP-FC25D

Use the DeepNet Visual Style Spec:
- Primary color #1D3A70, accent #57D8FF, slate #2D2F3A.
- Inter font, blueprint-tech look, IKEA clarity.
- Flat color with 2.5D minimal shading.
- 12-column grid, generous whitespace.
- Thick 3px outlines, 6px rounded corners.
- Geometric icons, no gradients, no shadows.
- Straight 90° cyan arrows.
- Modular block layout with title bars.

Now render the following concept:
[YOUR CONTENT HERE]


Replace [YOUR CONTENT HERE] with the subject:
CPU internals, OS memory layout, MITRE attack chains, network topology, etc.

10. Versioning

This is DeepNet Visual Style Spec v1.0.
Future versions may include:

animated components

icon packs

colorblind-safe palette variations

4K/print-grade specification rules

dark-mode variant