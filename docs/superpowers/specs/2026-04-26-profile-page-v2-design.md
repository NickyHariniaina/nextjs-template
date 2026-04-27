# Profile Page V2 - Design Spec

**Date:** 2026-04-26  
**Status:** Approved

## Overview

Redesign profile page with Bento Grid + Glassmorphism for a modern, beautiful look.

## Visual Design

### Colors
- Background: `#0d0a1e`
- Card BG: `rgba(255, 255, 255, 0.05)` with glassmorphism
- Primary: `#a089df` (lavender)
- Secondary: `#807be4`
- Accent: `#faa178` (coral)
- Text: `#c5b5f0` (light), `#fafafa` (white)

### Style: Glassmorphism
- Backdrop blur: 15px
- Border: 1px solid rgba(255,255,255,0.1)
- Hover: border rgba(255,255,255,0.2)

### Bento Grid Layout
- Main card spans full width
- 3 column grid for secondary cards
- Gap: 1.5rem
- Border-radius: 1rem

## Components

### 1. ProfileCard (Main)
- Large gradient border avatar (80px)
- Name, username, member date
- Glass card with backdrop-blur

### 2. AboutCard
- Glass card with section title
- Fields: Name, Email, Bio

### 3. StatsCard
- 3 stat items: Total, Streak, Points
- Bento style

### 4. SkillsCard
- Tags with pill styling
- Add button

### 5. ActivityCard
- Recent activity list
- Bullet points

### 6. Actions
- Edit Profile + Settings buttons

## Acceptance Criteria

- [ ] Glassmorphism effect visible
- [ ] Bento Grid layout
- [ ] Smooth hover transitions
- [ ] Responsive