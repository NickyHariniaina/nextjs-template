'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type RegisterSchema, registerSchema } from '@/lib/validation/auth';
import { signUp } from '@/lib/auth/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { RippleButton } from '@/components/ui/ripple-button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { getFallbackAvatarUrlAction } from '@/app/actions/get-fallback-avatar-url.action';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', username: '', email: '', password: '' },
    mode: 'onSubmit',
  });

  const submitRegisterData = async (data: RegisterSchema) => {
    setIsPending(true);
    try {
      await signUp.email({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        image: getFallbackAvatarUrlAction(data.firstName, data.lastName),
        password: data.password,
        username: data.username,
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
            toast.success('Account created successfully');
            onSuccess ? onSuccess() : router.push('/profile');
          },
        },
      });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsPending(false);
    }
  };

  const password = form.watch('password');

  return (
    <form onSubmit={form.handleSubmit(submitRegisterData)} className="space-y-4">
      {/* First + Last name */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FloatingLabelInput
            id="firstName"
            type="text"
            label="First name"
            {...form.register('firstName')}
            disabled={isPending}
          />
          {form.formState.errors.firstName && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 mt-1 px-1">
              {form.formState.errors.firstName.message}
            </motion.p>
          )}
        </div>
        <div>
          <FloatingLabelInput
            id="lastName"
            type="text"
            label="Last name"
            {...form.register('lastName')}
            disabled={isPending}
          />
          {form.formState.errors.lastName && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 mt-1 px-1">
              {form.formState.errors.lastName.message}
            </motion.p>
          )}
        </div>
      </div>

      {/* Username */}
      <div>
        <FloatingLabelInput
          id="username"
          type="text"
          label="Username"
          {...form.register('username')}
          disabled={isPending}
        />
        {form.formState.errors.username && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 mt-1 px-1">
            {form.formState.errors.username.message}
          </motion.p>
        )}
      </div>

      {/* Email */}
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

      {/* Password */}
      <div>
        <div className="relative">
          <FloatingLabelInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password (min. 6 characters)"
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
        {isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Create account'}
      </RippleButton>
    </form>
  );
};
