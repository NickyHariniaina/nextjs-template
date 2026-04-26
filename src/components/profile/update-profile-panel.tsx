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