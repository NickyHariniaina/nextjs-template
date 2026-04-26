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