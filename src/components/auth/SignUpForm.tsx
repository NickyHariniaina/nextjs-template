'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SocialButtons } from './SocialButtons';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authClient.signUp.email({ 
        email, 
        password, 
        name: name || email.split('@')[0] 
      });
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.href = '/home';
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          className="input-dark w-full rounded-lg px-3 py-2.5 text-sm placeholder:text-slate-500"
          style={{ fontFamily: 'var(--font-jakarta)' }}
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="input-dark w-full rounded-lg px-3 py-2.5 text-sm placeholder:text-slate-500"
          style={{ fontFamily: 'var(--font-jakarta)' }}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-medium text-slate-300 mb-1.5">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="input-dark w-full rounded-lg px-3 py-2.5 text-sm"
          style={{ fontFamily: 'var(--font-jakarta)' }}
          placeholder="Min. 6 characters"
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}

      <SocialButtons />

      <button
        type="submit"
        disabled={loading}
        className="btn-gradient w-full flex items-center justify-center py-2.5 rounded-lg font-medium text-sm cursor-pointer disabled:cursor-not-allowed"
        style={{ fontFamily: 'var(--font-jakarta)' }}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          'Create account'
        )}
      </button>
    </form>
  );
};