'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RippleButton } from '@/components/ui/ripple-button';
import { Meteors } from '@/components/ui/meteors';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 overflow-hidden relative">
      <div className="absolute inset-0 aurora" />
      <div className="absolute inset-0 noise" />
      <Meteors number={14} className="bg-red-400 shadow-[0_0_0_1px_#f8717120]" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon */}
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 18 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg className="w-9 h-9 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-red-500/10 blur-xl -z-10" />
        </motion.div>

        <motion.h2
          className="mt-6 text-2xl font-semibold text-white"
          style={{ fontFamily: 'var(--font-outfit)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          Une erreur est survenue
        </motion.h2>

        <motion.p
          className="mt-3 text-zinc-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {error.message || 'Une erreur inattendue s\'est produite. Réessaie.'}
        </motion.p>

        {error.digest && (
          <motion.code
            className="mt-4 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-500 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            ref: {error.digest}
          </motion.code>
        )}

        <motion.div
          className="mt-8 flex gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RippleButton
            onClick={() => reset()}
            rippleColor="#a78bfa"
            className="bg-linear-to-r from-violet-600 to-indigo-600 border-violet-500/50 text-white text-sm font-medium px-5 py-2.5 shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500"
          >
            Réessayer
          </RippleButton>
          <Link href="/">
            <RippleButton
              rippleColor="#71717a"
              className="bg-zinc-900 border-zinc-700 text-zinc-300 text-sm font-medium px-5 py-2.5 hover:bg-zinc-800"
            >
              Accueil
            </RippleButton>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
