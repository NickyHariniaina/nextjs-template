'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SignInFormProps {
  onSuccess: () => void;
}

export const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authClient.signIn.email({ email, password });
      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="input-field w-full rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400"
          style={{ fontFamily: 'var(--font-raleway)' }}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <button type="button" className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
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
          className="input-field w-full rounded-xl px-4 py-3 text-slate-900"
          style={{ fontFamily: 'var(--font-raleway)' }}
          placeholder="••••••••"
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center py-3 rounded-xl font-medium text-sm cursor-pointer disabled:cursor-not-allowed"
        style={{ fontFamily: 'var(--font-raleway)' }}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
};