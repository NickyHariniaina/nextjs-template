"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/store/useUserStore";
import { Badge } from "lucide-react";

export default function ProfileCard() {
  const user = useUserStore((state) => state.user);
  const isLoadingUser = useUserStore((state) => state.isLoadingUser);

  if (isLoadingUser || !user) return <div className="animate-pulse h-40 rounded-xl bg-white/5" />;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] backdrop-blur-xl p-8">
      <div className="absolute inset-0 bg-gradient-to-r from-[#a089df]/10 via-transparent to-[#faa178]/10" />
      
      <div className="relative flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#a089df] via-[#807be4] to-[#faa178] rounded-full opacity-50 blur-md group-hover:opacity-80 transition-opacity duration-500" />
          <div className="relative w-28 h-28 rounded-full p-0.5 bg-gradient-to-br from-[#a089df] via-[#807be4] to-[#faa178]">
            <Avatar className="w-full h-full bg-[#0d0a1e] rounded-full">
              <AvatarImage src={user.image ?? undefined} className="object-cover" />
            </Avatar>
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {user.firstName} {user.lastName}
          </h1>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
            <span className="text-white/60">@{user.username}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/40 text-sm">Member since Jan 2026</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="text-center px-4">
            <div className="text-2xl font-bold text-[#c5b5f0]">12</div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Total</div>
          </div>
          <div className="text-center px-4">
            <div className="text-2xl font-bold text-[#faa178]">5</div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Streak</div>
          </div>
          <div className="text-center px-4">
            <div className="text-2xl font-bold text-[#807be4]">100</div>
            <div className="text-xs text-white/40 uppercase tracking-wider">Points</div>
          </div>
        </div>
      </div>
    </div>
  );
}