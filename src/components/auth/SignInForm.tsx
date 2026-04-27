'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type EmailLoginSchema, emailLoginSchema } from '@/lib/validation/auth';
import { signIn } from '@/lib/auth/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { RippleButton } from '@/components/ui/ripple-button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';

interface SignInFormProps {
  onSuccess?: () => void;
}

export const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<EmailLoginSchema>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const submitLoginData = async (data: EmailLoginSchema) => {
    setIsPending(true);
    try {
      await signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onRequest: () => setIsPending(true),
          onResponse: () => { setIsPending(false); form.reset(); },
          onError: (ctx) => {
            if (ctx.error.code === 'SCHEMA_VALIDATION_FAILED') {
              toast.error(ctx.error.details.issues[0].message);
              return;
            }
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success('Signed in successfully');
            onSuccess ? onSuccess() : router.push('/profile');
          },
        },
      });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setIsPending(false);
    }
  };

  const password = form.watch('password');

  return (
    <form onSubmit={form.handleSubmit(submitLoginData)} className="space-y-4">
      <div>
        <FloatingLabelInput
          id="email"
          type="email"
          label="Email"
          {...form.register('email')}
          disabled={isPending}
        />
        {form.formState.errors.email && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 mt-1 px-1">
            {form.formState.errors.email.message}
          </motion.p>
        )}
      </div>

      <div>
        <div className="relative">
          <FloatingLabelInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...form.register('password')}
            disabled={isPending}
            className="pr-11"
          />
          {password && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        {form.formState.errors.password && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 mt-1 px-1">
            {form.formState.errors.password.message}
          </motion.p>
        )}
      </div>

      <RippleButton
        type="submit"
        disabled={isPending}
        rippleColor="#a78bfa"
        className="w-full py-3.5 rounded-xl text-sm font-semibold bg-violet-600 border-violet-500/50 text-white hover:bg-violet-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Sign in'}
      </RippleButton>

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push('/forgot-password')}
          className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          Forgot password?
        </button>
      </div>
    </form>
  );
};
