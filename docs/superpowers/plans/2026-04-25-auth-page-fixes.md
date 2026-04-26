# Auth Page Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix accessibility, performance, and code quality issues in the auth page

**Architecture:** Each fix is a separate focused task - social buttons accessibility, keyboard navigation, emoji removal, page reload fix

**Tech Stack:** Next.js 16, React 19, Framer Motion

---

### Task 1: Fix Social Buttons Accessibility

**Files:**
- Modify: `src/app/auth/page.tsx:176-191`

- [ ] **Step 1: Add aria-label to Google button**

```tsx
<button 
  className="flex-1 btn-social py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
  aria-label="Sign in with Google"
>
```

- [ ] **Step 2: Add aria-label to GitHub button**

```tsx
<button 
  className="flex-1 btn-social py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
  aria-label="Sign in with GitHub"
>
```

- [ ] **Step 3: Add focus styles to buttons**

In `src/app/globals.css`, add:

```css
.btn-social:focus-visible,
.social-btn:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/auth/page.tsx src/app/globals.css
git commit -m "fix: add aria-labels and focus states to social buttons"
```

---

### Task 2: Fix Toggle Button Keyboard Navigation

**Files:**
- Modify: `src/app/auth/page.tsx:199-204`

- [ ] **Step 1: Add keyboard event handler**

```tsx
<button
  onClick={() => setIsSignUp(!isSignUp)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsSignUp(!isSignUp);
    }
  }}
  className="text-white font-medium hover:text-purple-400 transition-colors cursor-pointer"
  aria-label={isSignUp ? 'Switch to sign in' : 'Switch to sign up'}
>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/auth/page.tsx
git commit -m "fix: add keyboard navigation to auth toggle button"
```

---

### Task 3: Replace Emoji Placeholders with Initials

**Files:**
- Modify: `src/app/auth/page.tsx:92-104`

- [ ] **Step 1: Replace emoji with styled initials**

```tsx
<div className="flex -space-x-3">
  {['JD', 'AS', 'MK', 'RL', 'TW'].map((initials, i) => (
    <motion.div 
      key={i}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 + i * 0.1 }}
      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-medium"
    >
      {initials}
    </motion.div>
  ))}
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/auth/page.tsx
git commit -m "fix: replace emoji avatars with styled initials"
```

---

### Task 4: Fix Page Reload on Auth Success

**Files:**
- Modify: `src/app/auth/page.tsx:11-13`

- [ ] **Step 1: Import useRouter from next/navigation**

```tsx
import { useRouter } from 'next/navigation';
```

- [ ] **Step 2: Replace window.location.href with useRouter**

```tsx
export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuthSuccess = () => {
    router.push('/');
  };
```

- [ ] **Step 3: Commit**

```bash
git add src/app/auth/page.tsx
git commit -m "fix: use router.push instead of window.location.href"
```

---

### Task 5: Extract Social Icons to Components

**Files:**
- Create: `src/components/icons/GoogleIcon.tsx`
- Create: `src/components/icons/GitHubIcon.tsx`
- Modify: `src/app/auth/page.tsx:177-190`

- [ ] **Step 1: Create GoogleIcon component**

```tsx
export const GoogleIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.38 8.55 1 10.22 1 12s.38 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
```

- [ ] **Step 2: Create GitHubIcon component**

```tsx
export const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
```

- [ ] **Step 3: Update auth page imports and usage**

```tsx
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { GitHubIcon } from '@/components/icons/GitHubIcon';

// Replace SVG with components
<GoogleIcon />
<GitHubIcon />
```

- [ ] **Step 4: Commit**

```bash
git add src/components/icons/ src/app/auth/page.tsx
git commit -m "refactor: extract social icons to separate components"
```

---

### Task 6: Optimize Framer Motion Animations

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add will-change for animated elements**

```css
.aurora::before {
  will-change: transform;
}

motion.div {
  will-change: transform, opacity;
}
```

- [ ] **Step 2: Reduce blur complexity**

In `src/app/auth/page.tsx`, replace `blur-3xl` with `blur-2xl` on lines 32, 44, 56.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/app/auth/page.tsx
git commit -m "perf: optimize animations with will-change and reduced blur"
```

---

**Plan complete. Two execution options:**

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks
2. **Inline Execution** - Execute tasks in this session with checkpoints

Which approach?