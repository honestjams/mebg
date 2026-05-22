'use client';

import { useState, useCallback } from 'react';

const DICE_FACES: Record<number, string> = {
  1: '⚀',
  2: '⚁',
  3: '⚂',
  4: '⚃',
  5: '⚄',
  6: '⚅',
};

export default function DiceRoller() {
  const [result, setResult] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const roll = useCallback(() => {
    if (rolling) return;
    setRolling(true);
    setShowResult(false);
    setResult(null);

    // Animate for 600ms then show result
    setTimeout(() => {
      const value = Math.floor(Math.random() * 6) + 1;
      setResult(value);
      setRolling(false);
      setShowResult(true);
    }, 600);
  }, [rolling]);

  const resultColor =
    result === 1
      ? '#8b1a1a'
      : result === 6
      ? '#c8a96e'
      : '#f4e4c1';

  return (
    <div className="panel" style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem', letterSpacing: '0.1em' }}>
        Dice Roller
      </h3>

      {/* Dice display */}
      <div
        style={{
          minHeight: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.75rem',
        }}
      >
        {rolling && (
          <div
            className="dice-rolling"
            style={{
              fontSize: '3.5rem',
              color: '#c8a96e',
              display: 'inline-block',
            }}
          >
            🎲
          </div>
        )}

        {!rolling && result !== null && showResult && (
          <div
            key={result + '-' + Date.now()}
            className="dice-result"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}
          >
            <span
              style={{
                fontSize: '3rem',
                color: resultColor,
                lineHeight: 1,
              }}
            >
              {DICE_FACES[result] || result}
            </span>
            <span
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: resultColor,
                textShadow: result === 6 ? '0 0 15px rgba(200,169,110,0.5)' : result === 1 ? '0 0 15px rgba(139,26,26,0.5)' : 'none',
              }}
            >
              {result}
            </span>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              color: 'rgba(200,169,110,0.5)',
              textTransform: 'uppercase',
            }}>
              {result === 6 ? 'Exceptional!' : result === 1 ? 'Failure' : ''}
            </span>
          </div>
        )}

        {!rolling && result === null && (
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.75rem',
            color: 'rgba(200,169,110,0.35)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            — roll the die —
          </div>
        )}
      </div>

      <button
        className="btn-gold-filled"
        onClick={roll}
        disabled={rolling}
        style={{
          opacity: rolling ? 0.7 : 1,
          cursor: rolling ? 'not-allowed' : 'pointer',
          fontSize: '0.85rem',
          padding: '0.55rem 1.4rem',
        }}
      >
        {rolling ? 'Rolling…' : 'Roll D6'}
      </button>
    </div>
  );
}
