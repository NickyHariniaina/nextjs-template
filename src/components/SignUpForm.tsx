import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

interface SignUpFormProps {
  onSuccess: () => void;
}

export const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authClient.signUp.email({ email, password });
      onSuccess();
    } catch (err: any) {
      // Better Auth throws an error with a message
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 placeholder-white/50 text-white shadow-sm focus:border-white focus:ring-2 focus:ring-white/50 focus:ring-opacity-50"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength="6"
          className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 placeholder-white/50 text-white shadow-sm focus:border-white focus:ring-2 focus:ring-white/50 focus:ring-opacity-50"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
};