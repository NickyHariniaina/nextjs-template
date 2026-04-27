'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInForm } from '@/components/auth/SignInForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { SocialButtons } from '@/components/auth/SocialButtons';
import { RippleButton } from '@/components/ui/ripple-button';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  const handleAuthSuccess = () => router.push('/profile');

  return (
    <div className="h-screen w-screen flex overflow-hidden">

      {/* LEFT — Visual panel */}
      <div className="hidden lg:flex lg:w-[50%] relative overflow-hidden bg-zinc-950">
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="w-12 h-12 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-outfit)' }}>H</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-5xl font-semibold text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
              Build something<br />
              <span className="text-zinc-400">extraordinary.</span>
            </h2>
            <p className="text-zinc-500 text-lg max-w-md">
              Join thousands of developers building the next generation of applications.
            </p>
            <div className="flex items-center gap-6 mt-12">
              <div className="flex -space-x-3">
                {['JD', 'AS', 'MK', 'RL', 'TW'].map((initials, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-zinc-300 text-xs font-medium"
                  >
                    {initials}
                  </motion.div>
                ))}
              </div>
              <p className="text-zinc-500 text-sm">5,000+ developers</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px bg-white/6 shrink-0" />

      {/* RIGHT — Form panel */}
      <div className="w-full lg:w-[50%] relative h-full overflow-y-auto overscroll-contain bg-zinc-950">
        <div className="noise" />

        <div className="min-h-full flex items-center justify-center px-8 py-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm relative z-10"
          >
            {/* Mobile logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:hidden w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center mb-8"
            >
              <span className="text-lg font-bold text-white">H</span>
            </motion.div>

            {/* Back arrow + title */}
            <div className="flex items-center gap-3 mb-8">
              <button
                type="button"
                onClick={() => isSignUp && setIsSignUp(false)}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Back"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
                {isSignUp ? 'Create an account' : 'Sign in'}
              </h1>
            </div>

            {/* Forms */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignUp ? 'signup' : 'signin'}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.18 }}
              >
                {isSignUp ? (
                  <SignUpForm onSuccess={handleAuthSuccess} />
                ) : (
                  <SignInForm onSuccess={handleAuthSuccess} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-zinc-600 uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Social buttons */}
            <div className="mb-6">
              <SocialButtons />
            </div>

            {/* Toggle */}
            <RippleButton
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              rippleColor="#8b5cf6"
              className="w-full py-3 rounded-xl bg-transparent border-violet-500/40 text-violet-400 text-sm font-medium hover:bg-violet-500/6 transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Create a new account'}
            </RippleButton>

            <p className="mt-8 text-center text-zinc-600 text-xs">
              By continuing, you agree to our Terms of Service
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
