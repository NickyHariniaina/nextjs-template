'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { SiGithub, SiGoogle } from 'react-icons/si';
import { signIn } from '@/lib/auth/auth-client';
import { RippleButton } from '@/components/ui/ripple-button';

export const SocialButtons = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    setLoading(provider);
    try {
      await signIn.social({ provider, callbackURL: '/profile' });
    } catch {
      toast.error(`${provider} sign in failed`);
      setLoading(null);
    }
  };

  return (
    <div className="flex gap-3">
      <RippleButton
        type="button"
        rippleColor="#71717a"
        onClick={() => handleSocialSignIn('google')}
        disabled={!!loading}
        className="flex-1 py-3 px-4 rounded-xl bg-white/3 border-white/10 text-zinc-300 text-sm hover:bg-white/6 transition-colors disabled:opacity-50"
        aria-label="Continue with Google"
      >
        <span className="flex items-center justify-center gap-2">
          {loading === 'google' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <SiGoogle className="w-4 h-4 shrink-0" />
          )}
          Google
        </span>
      </RippleButton>

      <RippleButton
        type="button"
        rippleColor="#71717a"
        onClick={() => handleSocialSignIn('github')}
        disabled={!!loading}
        className="flex-1 py-3 px-4 rounded-xl bg-white/3 border-white/10 text-zinc-300 text-sm hover:bg-white/6 transition-colors disabled:opacity-50"
        aria-label="Continue with GitHub"
      >
        <span className="flex items-center justify-center gap-2">
          {loading === 'github' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <SiGithub className="w-4 h-4 shrink-0" />
          )}
          GitHub
        </span>
      </RippleButton>
    </div>
  );
};
