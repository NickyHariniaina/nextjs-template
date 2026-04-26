'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth/auth-client';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SocialButtons } from './SocialButtons';
import { emailLoginSchema } from '@/lib/validation/auth';

interface SignInFormProps {
  onSuccess?: () => void;
}

export const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSuccess = () => {
    window.location.href = '/home';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = emailLoginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      await signIn.email({ email, password });
      if (onSuccess) {
        onSuccess();
      } else {
        handleSuccess();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="password" className="block text-xs font-medium text-slate-300">
            Password
          </label>
          <button type="button" className="text-xs text-slate-400 hover:text-purple-400 transition-colors cursor-pointer">
            Forgot?
          </button>
        </div>
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
          placeholder="••••••••"
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
          'Sign in'
        )}
      </button>
    </form>
  );
};