'use client';

import Link from 'next/link';

const COLORS = {
  primary: '#a089df',
};

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: COLORS.primary }}
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white">Hacker</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="#features" className="text-sm text-slate-500 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#contact" className="text-sm text-slate-500 hover:text-white transition-colors">
            Contact
          </Link>
          <Link 
            href="/auth" 
            className="text-sm font-medium text-white px-4 py-2 rounded-lg transition-all hover:opacity-80"
            style={{ background: COLORS.primary }}
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}