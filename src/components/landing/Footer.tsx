'use client';

const COLORS = {
  primary: '#a089df',
  darkBg2: '#1a1a4e',
};

const footerLinks = [
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  return (
    <footer className="py-8 px-6" style={{ background: COLORS.darkBg2 }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center" 
              style={{ background: COLORS.primary }}
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-sm text-slate-400">© 2025 Hacker. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}