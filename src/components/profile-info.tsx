"use client";

import { useUserStore } from "@/store/useUserStore";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import Link from "next/link";

const ProfileInfo = () => {
  const user = useUserStore((state) => state.user);
  const isLoadingUser = useUserStore((state) => state.isLoadingUser);
  const router = useRouter();

  if (isLoadingUser || !user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ background: '#181136' }}>
        <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center" style={{ background: '#181136' }}>
      <div className="noise" />
      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="glass rounded-2xl p-6 text-center">
          {/* Profile Image */}
          <div className="mb-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.firstName}
                className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-purple-500/30"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center ring-4 ring-purple-500/30" style={{ background: 'linear-gradient(135deg, #a089df 0%, #807be4 100%)' }}>
                <User className="w-12 h-12 text-white" />
              </div>
            )}
          </div>

          {/* Name */}
          <h1 className="text-xl font-semibold text-white mb-1" style={{ fontFamily: 'var(--font-outfit)' }}>
            {user.firstName} {user.lastName}
          </h1>

          {/* Display Username */}
          {user.displayUsername && (
            <p className="text-sm text-purple-400 mb-2" style={{ fontFamily: 'var(--font-jakarta)' }}>
              @{user.displayUsername}
            </p>
          )}

          {user.username && user.displayUsername !== user.username && (
            <p className="text-xs text-slate-500 mb-4" style={{ fontFamily: 'var(--font-jakarta)' }}>
            {user.username}
            </p>
          )}

          <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6" style={{ fontFamily: 'var(--font-jakarta)' }}>
            <Mail className="w-4 h-4" />
            {user.email}
          </div>

          <Button
            onClick={handleSignOut}
            variant="destructive"
            className="w-full"
          >
            Sign Out
          </Button>
        </div>

        <p className="mt-4 text-center text-slate-500 text-xs" style={{ fontFamily: 'var(--font-jakarta)' }}>
          <Link href="/" className="hover:underline">Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;