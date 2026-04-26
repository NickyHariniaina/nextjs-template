# Profile Page Enhancement - Design Spec

**Date:** 2026-04-26  
**Status:** Approved

## Overview

Redesign the user profile page (`/profile`) to be more elaborate and professional, suitable for a hackathon template. The design should be clean, extensible, and follow the existing dark theme.

## Visual Design

### Colors
- Background: `#0d0a1e`
- Card BG: `rgba(255, 255, 255, 0.02)` with glass effect
- Primary: `#a089df`
- Secondary: `#807be4`
- Accent: `#faa178`
- Text: `#c5b5f0` (light), `#fafafa` (white)
- Border: `rgba(255, 255, 255, 0.08)`

### Typography
- Font: Raleway (already in use)
- Headers: Bold, larger sizes
- Body: Regular weight

### Components
- Glass card effect for sections
- Consistent padding (p-6)
- Rounded corners (rounded-lg)
- Hover states with subtle border color change

## Page Structure

```
┌─────────────────────────────────────────┐
│           HEADER (ProfileHeader)        │
│  ┌──────┐                              │
│  │Avatar│   Name                        │
│  │ 100px│   @username                  │
│  └──────┘   Member since Jan 2026     │
├─────────────────────────────────────────┤
│  MAIN CONTENT (flex gap-6)              │
│  ┌────────────────┐ ┌──────────────┐ │
│  │  ABOUT         │ │  STATS        │ │
│  │                │ │              │ │
│  │ Name: John     │ │ [12] Total   │ │
│  │ Email: j@...   │ │ [5] Streak   │ │
│  │ Bio: -         │ │ [100] Pts    │ │
│  │                │ │              │ │
│  └────────────────┘ └──────────────┘ │
├─────────────────────────────────────────┤
│  SKILLS (ProfileSkills)                 │
│  [React] [TypeScript] [Next.js] [+Add] │
├─────────────────────────────────────────┤
│  RECENT ACTIVITY (ProfileActivity)       │
│  • Completed onboarding               │
│  • Updated profile                   │
├─────────────────────────────────────────┤
│  ACTIONS (ProfileActions)               │
│  [Edit Profile]  [Sign Out]           │
└─────────────────────────────────────────┘
```

## Components

### 1. ProfileHeader
- Large avatar (w-24 h-24) with gradient border
- Name (h1, text-xl, bold, text-light)
- Username (@username, text-white/60)
- Member since date (text-sm, text-white/40)

### 2. AboutCard
- Glass card with section title "About"
- Fields: Name, Email, Bio
- Labels in text-white/60, values in text-light

### 3. StatsCard
- Glass card with section title "Stats"
- 3 stat items in a row: Total, Streak, Points
- Number bold large, label small below

### 4. ProfileSkills
- Section title "Skills"
- Tags display: pill-shaped badges
- Add button (+ icon)
- Placeholder data: ["React", "TypeScript", "Next.js"]

### 5. ProfileActivity
- Section title "Recent Activity"
- Simple list with bullet points
- Placeholder items

### 6. ProfileActions
- Edit Profile button (primary, leads to /profile/settings)
- Sign Out button (secondary/outline)

## Implementation Notes

- Use existing `glass` CSS class from globals.css
- Use existing `Button` component
- Use existing `Avatar` component
- Data will be placeholders, extensible for hackathon
- All section components in `src/components/profile/`

## Acceptance Criteria

- [ ] Profile page displays all 6 sections
- [ ] Dark theme (#0d0a1e) consistent
- [ ] Responsive (works on mobile)
- [ ] All placeholders clearly editable
- [ ] Links work (/profile/settings, sign out)