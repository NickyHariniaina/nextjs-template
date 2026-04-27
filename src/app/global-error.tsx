'use client';

import { Meteors } from '@/components/ui/meteors';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: '#09090b', color: '#fafafa', fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}>
        <div style={{ height: '100svh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Radial glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 60%, rgba(239,68,68,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          <Meteors number={12} className="bg-red-400 shadow-[0_0_0_1px_#f8717120]" />

          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 24px', maxWidth: '420px' }}>
            {/* Icon */}
            <div style={{
              width: 72, height: 72, borderRadius: 18,
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 24,
            }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>

            <h1 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 10px', color: '#fafafa' }}>
              Erreur critique
            </h1>
            <p style={{ fontSize: 14, color: '#a1a1aa', margin: '0 0 28px', lineHeight: 1.6 }}>
              Une erreur critique s&apos;est produite. Veuillez rafraîchir la page.
            </p>

            {error.digest && (
              <code style={{
                display: 'block', marginBottom: 20,
                padding: '6px 12px', background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, fontSize: 11, color: '#71717a', fontFamily: 'monospace',
              }}>
                ref: {error.digest}
              </code>
            )}

            <button
              onClick={() => reset()}
              style={{
                padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                color: '#fff', fontSize: 14, fontWeight: 500,
                boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Rafraîchir la page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
