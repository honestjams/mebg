'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen" style={{ backgroundColor: '#1a0f08' }}>
      {/* Hero Section */}
      <main className="flex flex-col flex-1 items-center justify-center px-4 py-16 text-center">
        {/* Rune ornament top */}
        <div style={{ color: '#c8a96e', fontSize: '1.1rem', letterSpacing: '0.5rem', marginBottom: '1.5rem', opacity: 0.6 }}>
          ᚛ ✦ ᚜ ✦ ᚛ ✦ ᚜
        </div>

        {/* Main title */}
        <div style={{ maxWidth: '700px' }}>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.85rem',
            letterSpacing: '0.3em',
            color: '#c8a96e',
            opacity: 0.7,
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}>
            Middle Earth Strategy Battle Game
          </p>

          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 700,
            color: '#c8a96e',
            letterSpacing: '0.05em',
            lineHeight: 1.1,
            marginBottom: '1rem',
            textShadow: '0 0 40px rgba(200, 169, 110, 0.3), 0 2px 4px rgba(0,0,0,0.8)',
          }}>
            The One Tracker
          </h1>

          <p style={{
            fontFamily: 'Crimson Text, serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: '#f4e4c1',
            opacity: 0.85,
            marginBottom: '2.5rem',
            letterSpacing: '0.02em',
          }}>
            A Middle Earth Strategy Battle Game Companion
          </p>

          {/* Ornamental divider */}
          <div className="divider" style={{ maxWidth: '400px', margin: '0 auto 2.5rem' }}>
            <span className="divider-text">✦ ── ✦ ── ✦</span>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link href="/setup">
              <button className="btn-gold-filled" style={{ fontSize: '1rem', padding: '0.85rem 2.2rem' }}>
                ⚔️ Begin New Battle
              </button>
            </Link>
            <Link href="/rules">
              <button className="btn-gold" style={{ fontSize: '1rem', padding: '0.85rem 2.2rem' }}>
                📜 Quick Rules Reference
              </button>
            </Link>
          </div>

          {/* Thematic Quote */}
          <div className="panel" style={{
            maxWidth: '540px',
            margin: '0 auto',
            padding: '1.5rem 2rem',
            textAlign: 'center',
            borderColor: 'rgba(200, 169, 110, 0.4)',
          }}>
            <p style={{
              fontFamily: 'Crimson Text, serif',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: '#f4e4c1',
              opacity: 0.85,
              lineHeight: 1.7,
              marginBottom: '0.75rem',
            }}>
              &ldquo;Not all those who wander are lost; the old that is strong does not wither,
              deep roots are not reached by the frost.&rdquo;
            </p>
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              color: '#c8a96e',
              opacity: 0.7,
            }}>
              — J.R.R. Tolkien, The Fellowship of the Ring
            </p>
          </div>
        </div>

        {/* Bottom rune ornament */}
        <div style={{ color: '#c8a96e', fontSize: '1.1rem', letterSpacing: '0.5rem', marginTop: '2.5rem', opacity: 0.4 }}>
          ᚛ ✦ ᚜ ✦ ᚛ ✦ ᚜
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1rem',
        fontFamily: 'Cinzel, serif',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        color: 'rgba(200, 169, 110, 0.35)',
        borderTop: '1px solid rgba(200, 169, 110, 0.1)',
      }}>
        MESBG COMPANION &nbsp;✦&nbsp; NOT AFFILIATED WITH GAMES WORKSHOP
      </footer>
    </div>
  );
}
