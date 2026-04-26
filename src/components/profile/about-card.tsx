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