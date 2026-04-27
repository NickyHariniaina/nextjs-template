# Landing Page Design Spec

## Overview
Template landing page pour hack tomorrow - inspire par in-nova sans copier directement

## Font
- **Raleway** - toute l'app (via Google Fonts Self-hosted)

## Colors
```css
primary: #a089df      /* Lavender */
secondary: #807be4   /* Purple */
accent: #faa178      /* Coral/Peach */
darkBg: #181136      /* Dark purple bg */
darkBg2: #1a1a4e    /* Secondary dark bg */
textLight: #c5b5f0   /* Light text */
```

## Sections

### 1. Header
- Logo (icon H)
- Nav links: Features, How it works, Pricing
- EN|FR language toggle
- Sign in button

### 2. Hero
- Full-width gradient blobs (animated)
- Grid pattern overlay
- Titre: "The platform that connects you to the jobs of tomorrow"
- Gradient text: #faa178 → #a089df → #807be4
- Subtitle: "Personalized training, resume analysis, interview preparation..."
- CTA: "Start now" button

### 3. Features (4 cards)
- CV Analysis
- Interview Simulation
- Soft Skills
- Hard Skills

### 4. How it works (4 steps)
- 01: Create Your Account
- 02: AI Profile Analysis
- 03: Follow a Personalized Plan
- 04: Progress Toward Your Ideal Job

### 5. AI Cards (3 cards)
- Personalized Support
- Concrete Tools to Act
- Continuous Evolution

### 6. Contact
- Name, Email, Message form
- Newsletter signup

### 7. Footer
- Links: Terms, Privacy, Contact
- Copyright

## Implementation
- Use h-screen for full viewport sections
- Framer Motion for animations
- Dark theme throughout
- Mobile responsive