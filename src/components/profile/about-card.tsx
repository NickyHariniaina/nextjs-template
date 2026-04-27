"use client";

import { useUserStore } from "@/store/useUserStore";
import { User, Mail, FileText } from "lucide-react";

export default function AboutCard() {
  const user = useUserStore((state) => state.user);
  const isLoadingUser = useUserStore((state) => state.isLoadingUser);

  if (isLoadingUser || !user) return <div className="animate-pulse h-32 rounded-xl bg-white/5" />;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 p-5">
      <div className="absolute inset-0 bg-gradient-to-br from-[#a089df]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4 flex items-center gap-2">
          <User className="w-4 h-4" />
          About
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#a089df]/10 flex items-center justify-center">
              <User className="w-4 h-4 text-[#a089df]" />
            </div>
            <div>
              <div className="text-xs text-white/40">Name</div>
              <div className="text-white">{user.firstName} {user.lastName}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#807be4]/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#807be4]" />
            </div>
            <div>
              <div className="text-xs text-white/40">Email</div>
              <div className="text-white/80 text-sm truncate max-w-[200px]">{user.email}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#faa178]/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#faa178]" />
            </div>
            <div>
              <div className="text-xs text-white/40">Bio</div>
              <div className="text-white/60">-</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}