'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInForm } from '@/components/SignInForm';
import { SignUpForm } from '@/components/SignUpForm';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuthSuccess = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#d4af37_0%,_transparent_50%)] opacity-5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#171717_0%,_transparent_50%)] opacity-3" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm mx-4"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#171717] mb-6"
          >
            <span className="text-white font-bold text-xl" style={{ fontFamily: 'var(--font-space)' }}>H</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-semibold text-[#171717] tracking-tight"
            style={{ fontFamily: 'var(--font-space)' }}
          >
            Welcome back
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-[#737373]"
            style={{ fontFamily: 'var(--font-dm)' }}
          >
            {isSignUp ? 'Create your account' : 'Sign in to continue'}
          </motion.p>
        </div>

        <div className="glass-card rounded-2xl p-6">
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

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-[#737373] text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              {' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#171717] font-medium hover:underline cursor-pointer"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}