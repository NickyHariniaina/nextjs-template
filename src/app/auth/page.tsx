'use client'
import { useState } from 'react';
import { SignInForm } from '@/components/SignInForm';
import { SignUpForm } from '@/components/SignUpForm';

export default function AuthTogglePage() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleAuthSuccess = () => {
    // In a real app, you might redirect to a protected route or home page.
    // For now, we'll just reset the forms and show a success message via alert.
    // Alternatively, you could use Next.js router to redirect.
    // Since we don't have a protected route yet, we'll just alert and reset.
    alert('Authentication successful!');
    // Reset the toggle to sign-in form after success
    setShowSignUp(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[repeating-linear-gradient(45deg,#000000,#000000 20px,#ffffff 20px,#ffffff 40px)] dark:bg-[repeating-linear-gradient(45deg,#ffffff,#ffffff 20px,#000000 20px,#000000 40px)] p-4">
      <div 
        className="relative w-full max-w-md space-y-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl shadow-white/10"
        style={{ perspective: '1000px' }}
      >
        <div 
          className={`absolute w-full h-full ${showSignUp ? 'flipped' : ''}`} 
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s ease-in-out',
            backfaceVisibility: 'hidden'
          }}
          onClick={e => e.stopPropagation()}
        >
          {!showSignUp && (
            <div className="relative w-full h-full">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-white">
                  Sign in to your account
                </h2>
                <SignInForm onSuccess={handleAuthSuccess} />
                <div className="text-center text-sm">
                  <p className="text-white/50">
                    Don't have an account?
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSignUp(!showSignUp)}
                    className="font-medium text-white hover:text-white/80 underline"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          )}
          {showSignUp && (
            <div className="relative w-full h-full" style={{ transform: 'rotateY(180deg)' }}>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-white">
                  Create Account
                </h2>
                <SignUpForm onSuccess={handleAuthSuccess} />
                <div className="text-center text-sm">
                  <p className="text-white/50">
                    Already have an account?
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowSignUp(!showSignUp)}
                    className="font-medium text-white hover:text-white/80 underline"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}