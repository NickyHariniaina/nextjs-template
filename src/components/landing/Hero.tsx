'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

const COLORS = {
  primary: '#a089df',
  secondary: '#807be4',
  accent: '#faa178',
};

export function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0d0a1e' }}
    >
      {/* Dark abstract background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="glow1" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#a089df" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="glow2" cx="70%" cy="70%">
              <stop offset="0%" stopColor="#807be4" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="500" fill="url(#glow1)" />
          <circle cx="1500" cy="800" r="600" fill="url(#glow2)" />
        </svg>
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Sparkles className="w-5 h-5 mx-auto" style={{ color: COLORS.accent }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          The platform that<br />
          <span 
            className="text-transparent bg-clip-text"
            style={{ 
              background: `linear-gradient(to right, ${COLORS.accent}, ${COLORS.primary})`,
              WebkitBackgroundClip: 'text',
            }}
          >
            connects you to the jobs of tomorrow.
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl mx-auto"
        >
          Personalized training, resume analysis, and interview preparation for your future career.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            href="/auth" 
            className="px-8 py-4 rounded-lg text-lg font-medium text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: COLORS.primary }}
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a 
            href="#features" 
            className="px-8 py-4 rounded-lg text-lg font-medium border-2 text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
            style={{ borderColor: '#2a2a3e' }}
          >
            Learn more
            <ChevronDown className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 text-slate-600" />
      </motion.div>
    </section>
  );
}