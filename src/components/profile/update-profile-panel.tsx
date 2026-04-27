"use client";

import { ArrowLeft, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import AvatarUpload from "./avatar-upload";
import PersonalInfoForm from "./personal-info-form";
import SecuritySection from "./security-section";

export default function UpdateProfilePanel() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto px-4 py-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a089df]/10 via-transparent to-[#faa178]/10 opacity-30 blur-3xl -z-10" />
        
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.push("/profile")}
            className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a089df] to-[#807be4] flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Account Settings
            </h1>
          </div>
        </div>
        
        <div className="flex flex-col gap-5">
          <div className="group relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#a089df]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-1">
              <AvatarUpload />
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#807be4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-1">
              <PersonalInfoForm />
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#faa178]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-1">
              <SecuritySection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}