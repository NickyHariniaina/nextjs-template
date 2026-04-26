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