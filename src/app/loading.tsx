'use client';

import { motion } from 'framer-motion';
import { Ripple } from '@/components/ui/ripple';

export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 overflow-hidden relative">
      {/* Ripple background */}
      <Ripple mainCircleSize={120} mainCircleOpacity={0.15} numCircles={7} />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo mark */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </motion.div>
          {/* Glow */}
          <div className="absolute inset-0 rounded-2xl bg-violet-500/30 blur-xl -z-10" />
        </div>

        {/* Loading bar */}
        <div className="w-40 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full w-1/2 bg-linear-to-r from-violet-500 via-fuchsia-400 to-violet-500 rounded-full"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <p className="text-zinc-500 text-xs tracking-widest uppercase">Loading</p>
      </motion.div>
    </div>
  );
}
