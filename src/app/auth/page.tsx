'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInForm } from '@/components/SignInForm';
import { SignUpForm } from '@/components/SignUpForm';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuthSuccess = () => {
    router.push('/');
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* LEFT - Visual Panel */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
          {/* Animated shapes */}
          <div className="absolute inset-0">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-2xl"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-fuchsia-500/10 blur-2xl"
            />
            <motion.div
              animate={{ 
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-indigo-500/10 blur-2xl"
            />
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-outfit)' }}>H</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-5xl font-semibold text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
              Build something<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400">
                extraordinary.
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md">
              Join thousands of developers building the next generation of applications.
            </p>
            
            <div className="flex items-center gap-8 mt-12">
              <div className="flex -space-x-3">
                {['JD', 'AS', 'MK', 'RL', 'TW'].map((initials, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-medium"
                  >
                    {initials}
                  </motion.div>
                ))}
              </div>
              <p className="text-slate-400 text-sm" style={{ fontFamily: 'var(--font-jakarta)' }}>
                5,000+ developers
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT - Form Panel */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 relative">
        <div className="aurora" />
        <div className="noise" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Header */}
          <div className="mb-10">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:hidden w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-6"
            >
              <span className="text-xl font-bold text-white">H</span>
            </motion.div>
            
            <h1 
              className="text-3xl font-semibold text-white mb-2"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {isSignUp ? 'Create account' : 'Welcome back'}
            </h1>
            <p 
              className="text-slate-400"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              {isSignUp ? 'Start your journey with us' : 'Enter your credentials to continue'}
            </p>
          </div>

          {/* Form */}
          <div className="glass rounded-2xl p-8 gradient-line">
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignUp ? 'signup' : 'signin'}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {isSignUp ? (
                  <SignUpForm onSuccess={handleAuthSuccess} />
                ) : (
                  <SignInForm onSuccess={handleAuthSuccess} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-slate-500 uppercase" style={{ fontFamily: 'var(--font-jakarta)' }}>or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 btn-social py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer" aria-label="Sign in with Google">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.38 8.55 1 10.22 1 12s.38 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm text-slate-300" style={{ fontFamily: 'var(--font-jakarta)' }}>Google</span>
              </button>
              <button className="flex-1 btn-social py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer" aria-label="Sign in with GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm text-slate-300" style={{ fontFamily: 'var(--font-jakarta)' }}>GitHub</span>
              </button>
            </div>
          </div>

          {/* Toggle */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm" style={{ fontFamily: 'var(--font-jakarta)' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              {' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsSignUp(!isSignUp);
                  }
                }}
                className="text-white font-medium hover:text-purple-400 transition-colors cursor-pointer"
                aria-label={isSignUp ? 'Switch to sign in' : 'Switch to sign up'}
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>

          <p className="mt-8 text-center text-slate-500 text-xs">
            By continuing, you agree to our Terms of Service
          </p>
        </motion.div>
      </div>
    </div>
  );
}