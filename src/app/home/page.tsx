'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SessionUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  username?: string | null;
  displayUsername?: string | null;
}

export default function HomePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/auth');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ background: '#181136' }}>
        <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ background: '#181136' }}>
        <div className="text-center">
          <p className="text-slate-400 mb-4">Please sign in to view your profile</p>
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const user = session.user as SessionUser;

  return (
    <div className="h-screen w-screen flex items-center justify-center" style={{ background: '#181136' }}>
      <div className="noise" />
      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="glass rounded-2xl p-6 text-center">
          <div className="mb-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center" style={{ background: '#a089df' }}>
                <User className="w-10 h-10 text-white" />
              </div>
            )}
          </div>

          <h1 className="text-xl font-semibold text-white mb-1">
            {user.name}
          </h1>
          
          {user.displayUsername && (
            <p className="text-sm text-slate-400 mb-4">
              @{user.displayUsername}
            </p>
          )}

          {user.username && user.displayUsername !== user.username && (
            <p className="text-xs text-slate-500 mb-4">
              Username: {user.username}
            </p>
          )}

          <p className="text-xs text-slate-500 mb-6">
            {user.email}
          </p>

          <Button
            onClick={async () => {
              await fetch('/api/auth/sign-out', { method: 'POST' });
              router.push('/auth');
            }}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <p className="mt-4 text-center text-slate-500 text-xs">
          <Link href="/" className="hover:underline">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}