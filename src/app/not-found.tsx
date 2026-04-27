'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { RippleButton } from '@/components/ui/ripple-button';
import { Meteors } from '@/components/ui/meteors';

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 aurora" />
      <div className="absolute inset-0 noise" />
      <Meteors number={18} className="bg-violet-400 shadow-[0_0_0_1px_#a78bfa20]" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 404 */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <span
            className="text-[140px] font-bold leading-none bg-linear-to-br from-violet-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent select-none"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            404
          </span>
          <div className="absolute inset-0 bg-violet-500/15 blur-[80px] rounded-full -z-10" />
        </motion.div>

        <motion.h1
          className="text-2xl font-semibold text-white -mt-2"
          style={{ fontFamily: 'var(--font-outfit)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          Page introuvable
        </motion.h1>

        <motion.p
          className="mt-3 text-zinc-400 max-w-sm text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Cette page n&apos;existe pas ou a été déplacée.
        </motion.p>

        <motion.div
          className="mt-8 flex gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Link href="/">
            <RippleButton
              rippleColor="#a78bfa"
              className="bg-linear-to-r from-violet-600 to-indigo-600 border-violet-500/50 text-white text-sm font-medium px-5 py-2.5 shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500"
            >
              Accueil
            </RippleButton>
          </Link>
          <Link href="/auth">
            <RippleButton
              rippleColor="#71717a"
              className="bg-zinc-900 border-zinc-700 text-zinc-300 text-sm font-medium px-5 py-2.5 hover:bg-zinc-800"
            >
              Connexion
            </RippleButton>
          </Link>
        </motion.div>

        <motion.p
          className="mt-10 text-zinc-600 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          Appuie sur <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400 text-xs">Esc</kbd> pour revenir
        </motion.p>
      </motion.div>
    </div>
  );
}
