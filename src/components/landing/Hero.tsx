'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

const COLORS = {
  primary: '#a089df',
  secondary: '#807be4',
  accent: '#faa178',
};

interface HeroProps {
  lang: 'en' | 'fr';
}

export function Hero({ lang }: HeroProps) {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ background: '#181136' }}
    >
      {/* Abstract background - in-nova style */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Abstract waves */}
        <svg className="absolute w-full h-full opacity-20" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a089df" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#807be4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#faa178" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#807be4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#a089df" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path 
            d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z" 
            fill="url(#grad1)" 
            className="animate-pulse"
          />
          <path 
            d="M0,500 Q300,300 600,500 T1200,500 L1200,800 L0,800 Z" 
            fill="url(#grad2)" 
            opacity="0.5"
          />
          <circle cx="200" cy="300" r="300" fill="#a089df" opacity="0.1" className="animate-pulse" />
          <circle cx="1000" cy="400" r="400" fill="#807be4" opacity="0.08" className="animate-pulse" />
          <circle cx="800" cy="200" r="200" fill="#faa178" opacity="0.05" className="animate-pulse" />
        </svg>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm"
          style={{ 
            background: `${COLORS.primary}15`, 
            border: `1px solid ${COLORS.primary}30` 
          }}
        >
          <Sparkles className="w-4 h-4" style={{ color: COLORS.accent }} />
          <span className="text-slate-200">AI-Powered Interview Practice</span>
        </motion.div>

        {/* Title */}
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
              background: `linear-gradient(to right, ${COLORS.accent}, ${COLORS.primary}, ${COLORS.secondary})`,
              WebkitBackgroundClip: 'text',
            }}
          >
            connects you to the jobs of tomorrow.
          </span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto"
        >
          {lang === 'en'
            ? 'Personalized training, resume analysis, interview preparation, and upskilling for future careers.'
            : 'Formation personnalisée, analyse CV, préparation aux entretiens et développement de compétences.'}
        </motion.p>
        
        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            href="/auth" 
            className="group px-8 py-4 rounded-lg text-lg font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{ 
              background: COLORS.primary, 
              boxShadow: `0 4px 20px ${COLORS.primary}40` 
            }}
          >
            {lang === 'en' ? 'Start now' : 'Commencer'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="#features" 
            className="px-8 py-4 rounded-lg text-lg font-medium border-2 transition-all duration-300 hover:bg-white/5 flex items-center justify-center gap-2"
            style={{ borderColor: COLORS.primary, color: COLORS.primary }}
          >
            {lang === 'en' ? 'Learn more' : 'En savoir plus'}
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-500 flex items-start justify-center p-2">
          <motion.div 
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full"
            style={{ background: COLORS.primary }}
          />
        </div>
      </motion.div>
    </section>
  );
}