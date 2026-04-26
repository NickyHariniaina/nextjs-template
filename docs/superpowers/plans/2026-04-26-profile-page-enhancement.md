# Profile Page Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the profile page with elaborates sections (Header, About, Stats, Skills, Activity, Actions).

**Architecture:** Replace current single ProfileInfo component with 6 modular components. Each component in its own file for maintainability. Use existing glass CSS class and Button/Avatar UI components.

**Tech Stack:** Next.js 16, Tailwind CSS v4, existing UI components (Button, Avatar, Input)

---
## File Structure

```
src/components/profile/
├── profile-header.tsx      # NEW: Avatar, name, username, member date
├── about-card.tsx            # NEW: Name, email, bio fields
├── stats-card.tsx            # NEW: Total, Streak, Points cards
├── profile-skills.tsx        # NEW: Skills tags display + add button
├── profile-activity.tsx      # NEW: Recent activity list
├── profile-actions.tsx      # NEW: Edit/SignOut buttons
├── index.ts                 # NEW: Export all
└── profile-info.tsx          # DELETE (old component)
```

---

### Task 1: Create ProfileHeader Component

**Files:**
- Create: `src/components/profile/profile-header.tsx`

- [ ] **Step 1: Create ProfileHeader component**

```tsx
"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/store/useUserStore";

export default function ProfileHeader() {
  const user = useUserStore((state) => state.user);
  const isLoadingUser = useUserStore((state) => state.isLoadingUser);

  if (isLoadingUser || !user) return null;

  return (
    <div className="flex flex-col items-center text-center gap-4">
      <Avatar className="w-24 h-24 border-2 border-[#a089df]/30 shadow-lg">
        <AvatarImage src={user.image ?? undefined} />
      </Avatar>
      <div>
        <h1 className="font-semibold text-xl text-[#c5b5f0]">
          {user.firstName} {user.lastName}
        </h1>
        <span className="text-white/60 text-sm">@{user.username}</span>
        <p className="text-white/40 text-xs mt-1">Member since Jan 2026</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/profile/profile-header.tsx
git commit -m "feat: add ProfileHeader component"
```

---

### Task 2: Create AboutCard Component

**Files:**
- Create: `src/components/profile/about-card.tsx`

- [ ] **Step 1: Create AboutCard component**

```tsx
"use client";

import { useUserStore } from "@/store/useUserStore";

export default function AboutCard() {
  const user = useUserStore((state) => state.user);
  const isLoadingUser = useUserStore((state) => state.isLoadingUser);

  if (isLoadingUser || !user) return null;

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">About</h2>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-white/60 text-sm">Name</span>
          <span className="text-[#c5b5f0]">{user.firstName} {user.lastName}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white/60 text-sm">Email</span>
          <span className="text-[#c5b5f0]">{user.email}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white/60 text-sm">Bio</span>
          <span className="text-[#c5b5f0]">-</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/profile/about-card.tsx
git commit -m "feat: add AboutCard component"
```

---

### Task 3: Create StatsCard Component

**Files:**
- Create: `src/components/profile/stats-card.tsx`

- [ ] **Step 1: Create StatsCard component**

```tsx
export default function StatsCard() {
  const stats = [
    { label: "Total", value: "12" },
    { label: "Streak", value: "5" },
    { label: "Points", value: "100" },
  ];

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">Stats</h2>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <span className="text-2xl font-bold text-[#c5b5f0]">{stat.value}</span>
            <span className="text-white/60 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/profile/stats-card.tsx
git commit -m "feat: add StatsCard component"
```

---

### Task 4: Create ProfileSkills Component

**Files:**
- Create: `src/components/profile/profile-skills.tsx`

- [ ] **Step 1: Create ProfileSkills component**

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ProfileSkills() {
  const [skills] = useState(["React", "TypeScript", "Next.js"]);

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-[#a089df]/20 text-[#c5b5f0] rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-white/60 hover:text-white"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/profile/profile-skills.tsx
git commit -m "feat: add ProfileSkills component"
```

---

### Task 5: Create ProfileActivity Component

**Files:**
- Create: `src/components/profile/profile-activity.tsx`

- [ ] **Step 1: Create ProfileActivity component**

```tsx
export default function ProfileActivity() {
  const activities = [
    "Completed onboarding",
    "Updated profile",
  ];

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">Recent Activity</h2>
      <ul className="flex flex-col gap-2">
        {activities.map((activity, index) => (
          <li key={index} className="text-white/60 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a089df]" />
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/profile/profile-activity.tsx
git commit -m "feat: add ProfileActivity component"
```

---

### Task 6: Create ProfileActions Component

**Files:**
- Create: `src/components/profile/profile-actions.tsx`

- [ ] **Step 1: Create ProfileActions component**

```tsx
"use client";

import { Button } from "@/components/ui/button";
import SignOutButton from "../auth/sign-out-button";
import { useRouter } from "next/navigation";

export default function ProfileActions() {
  const router = useRouter();

  return (
    <div className="flex gap-4 justify-center">
      <Button
        onClick={() => router.push("/profile/settings")}
        className="bg-[#a089df] hover:bg-[#a089df]/90 text-white"
      >
        Edit Profile
      </Button>
      <SignOutButton />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/profile/profile-actions.tsx
git commit -m "feat: add ProfileActions component"
```

---

### Task 7: Create profile/index.ts & Update Profile Page

**Files:**
- Create: `src/components/profile/index.ts`
- Modify: `src/app/profile/page.tsx`

- [ ] **Step 1: Create index.ts**

```ts
export { default as ProfileHeader } from "./profile-header";
export { default as AboutCard } from "./about-card";
export { default as StatsCard } from "./stats-card";
export { default as ProfileSkills } from "./profile-skills";
export { default as ProfileActivity } from "./profile-activity";
export { default as ProfileActions } from "./profile-actions";
```

- [ ] **Step 2: Update profile page**

```tsx
import {
  ProfileHeader,
  AboutCard,
  StatsCard,
  ProfileSkills,
  ProfileActivity,
  ProfileActions,
} from "@/components/profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto p-6 flex flex-col gap-6">
      <ProfileHeader />
      
      <div className="grid md:grid-cols-2 gap-6">
        <AboutCard />
        <StatsCard />
      </div>
      
      <ProfileSkills />
      <ProfileActivity />
      <ProfileActions />
    </div>
  );
}
```

- [ ] **Step 3: Run lint & typecheck**

```bash
npm run lint && npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/profile/index.ts src/app/profile/page.tsx
git commit -m "feat: update profile page with modular components"
```

---

### Task 8: Remove Old ProfileInfo

**Files:**
- Delete: `src/components/profile/profile-info.tsx`

- [ ] **Step 1: Delete old component**

```bash
rm src/components/profile/profile-info.tsx
```

- [ ] **Step 2: Commit**

```bash
git rm src/components/profile/profile-info.tsx
git commit -m "refactor: remove old ProfileInfo component"
```

---

## Final Verification

- [ ] All 6 new components created
- [ ] Profile page updated
- [ ] Old component removed
- [ ] Lint & typecheck pass