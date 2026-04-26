# Edit Profile Page - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended)

**Goal:** Redesign the profile edit/settings page with Dribbble-inspired dark theme design

**Architecture:** Rewrite UpdateProfilePanel component with glass cards, proper labels, clean sections

**Tech Stack:** Next.js 16, Tailwind CSS v4, existing UI components

---
## File Structure

```
src/components/profile/
├── edit-profile-card.tsx      # NEW: Main edit profile container
├── avatar-upload.tsx       # NEW: Avatar upload section
├── personal-info-form.tsx   # NEW: Personal info form section
├── security-section.tsx   # NEW: Password change section
└── index.ts             # UPDATE: Export new components
```

---

### Task 1: Create AvatarUpload Component

**Files:**
- Create: `src/components/profile/avatar-upload.tsx`

- [ ] **Step 1: Create AvatarUpload component**

```tsx
"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { updateUser } from "@/lib/auth/auth-client";
import { useUserStore } from "@/store/useUserStore";
import { getImageUrlAction } from "@/app/actions/get-image-url.action";
import { removeImageUrlAction } from "@/app/actions/remove-image-url.action";
import { getFallbackAvatarUrlAction } from "@/app/actions/get-fallback-avatar-url.action";
import { cn } from "@/lib/utils";

export default function AvatarUpload() {
  const { user } = useUserStore();
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsPending(true);
      const result = await getImageUrlAction(file);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      await updateUser({
        image: result.url,
        fetchOptions: {
          onError: (ctx) => toast.error(ctx.error.message),
          onSuccess: () => toast.success("Avatar updated"),
        },
      });
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  const handleRemove = async () => {
    if (!user) return;
    try {
      setIsPending(true);
      const result = await removeImageUrlAction();
      if (result.success) {
        const fallbackUrl = getFallbackAvatarUrlAction(user.firstName, user.lastName);
        await updateUser({
          image: fallbackUrl,
          fetchOptions: {
            onError: (ctx) => toast.error(ctx.error.message),
            onSuccess: () => toast.success("Avatar removed"),
          },
        });
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">Profile Photo</h2>
      <div className="flex items-center gap-6">
        <div 
          onClick={() => inputRef.current?.click()}
          className="relative group cursor-pointer"
        >
          <div className="w-24 h-24 rounded-full p-0.5 bg-gradient-to-br from-[#a089df] via-[#807be4] to-[#faa178]">
            <Avatar className="w-full h-full bg-[#0d0a1e]">
              <AvatarImage src={user?.image ?? undefined} />
            </Avatar>
          </div>
          <div className={cn(
            "absolute inset-0 rounded-full flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity",
            isPending && "opacity-100"
          )}>
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-white/60 text-sm">Click to upload or drag and drop</p>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isPending}
              className="bg-[#a089df] hover:bg-[#a089df]/90 text-white"
            >
              Change
            </Button>
            <Button
              type="button"
              onClick={handleRemove}
              disabled={isPending}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/profile/avatar-upload.tsx
git commit -m "feat: add AvatarUpload component"
```

---

### Task 2: Create PersonalInfoForm Component

**Files:**
- Create: `src/components/profile/personal-info-form.tsx`

- [ ] **Step 1: Create PersonalInfoForm component**

```tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateUser } from "@/lib/auth/auth-client";
import { useUserStore } from "@/store/useUserStore";

export default function PersonalInfoForm() {
  const { user } = useUserStore();
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    username: user?.username ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsPending(true);
      await updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        fetchOptions: {
          onError: (ctx) => toast.error(ctx.error.message),
          onSuccess: () => toast.success("Profile updated"),
        },
      });
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-lg p-6">
      <h2 className="font-semibold text-lg text-[#c5b5f0] mb-4">Personal Information</h2>
      
      <div className="border-t border-white/10 mb-4" />
      
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-white/60">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
            className="input-dark"
            placeholder="First Name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-white/60">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
            className="input-dark"
            placeholder="Last Name"
          />
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <Label htmlFor="username" className="text-white/60">Username</Label>
        <Input
          id="username"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
          className="input-dark"
          placeholder="username"
        />
      </div>
      
      <div className="space-y-2 mb-4">
        <Label htmlFor="email" className="text-white/60">Email</Label>
        <Input
          id="email"
          value={user?.email ?? ""}
          disabled
          className="input-dark opacity-50 cursor-not-allowed"
          placeholder="email@example.com"
        />
        <p className="text-white/40 text-xs">Email cannot be changed</p>
      </div>
      
      <Button
        type="submit"
        disabled={isPending}
        className="bg-[#a089df] hover:bg-[#a089df]/90 text-white"
      >
        Save Changes
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/profile/personal-info-form.tsx
git commit -m "feat: add PersonalInfoForm component"
```

---

### Task 3: Create SecuritySection Component

**Files:**
- Create: `src/components/profile/security-section.tsx`

- [ ] **Step 1: Create SecuritySection component**

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Lock, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { updateUser } from "@/lib/auth/auth-client";

export default function SecuritySection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    try {
      setIsPending(true);
      await updateUser({
        password: passwords.new,
        fetchOptions: {
          onError: (ctx) => toast.error(ctx.error.message),
          onSuccess: () => {
            toast.success("Password updated");
            setPasswords({ current: "", new: "", confirm: "" });
            setIsExpanded(false);
          },
        },
      });
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="glass rounded-lg p-6">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-[#a089df]" />
          <h2 className="font-semibold text-lg text-[#c5b5f0]">Security</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-white/60" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white/60" />
        )}
      </button>
      
      {isExpanded && (
        <>
          <div className="border-t border-white/10 my-4" />
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-white/60">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                className="input-dark"
                placeholder="Enter current password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-white/60">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                className="input-dark"
                placeholder="Enter new password"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white/60">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                className="input-dark"
                placeholder="Confirm new password"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#a089df] hover:bg-[#a089df]/90 text-white"
            >
              <KeyRound className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/profile/security-section.tsx
git commit -m "feat: add SecuritySection component"
```

---

### Task 4: Update Edit Profile Page

**Files:**
- Modify: `src/components/profile/update-profile-panel.tsx`

- [ ] **Step 1: Rewrite UpdateProfilePanel component**

```tsx
"use client";

import { ArrowLeft, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import AvatarUpload from "./avatar-upload";
import PersonalInfoForm from "./personal-info-form";
import SecuritySection from "./security-section";

export default function UpdateProfilePanel() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#a089df]" />
          <h1 className="text-xl font-semibold text-[#c5b5f0]">Account Settings</h1>
        </div>
      </div>
      
      <div className="flex flex-col gap-6">
        <AvatarUpload />
        <PersonalInfoForm />
        <SecuritySection />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Run lint & typecheck**

```bash
npm run lint && npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/profile/update-profile-panel.tsx
git commit -m "feat: update profile settings page with dark theme design"
```

---

## Final Verification

- [ ] All components created
- [ ] Page renders with dark theme
- [ ] Lint & typecheck pass