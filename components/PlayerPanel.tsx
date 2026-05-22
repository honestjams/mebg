'use client';

import { useState } from 'react';

interface PlayerPanelProps {
  playerName: string;
  faction: 'good' | 'evil';
  pointLimit: number;
  points: number;
  vp: number;
  mwf: [number, number, number];
  onPointsChange: (val: number) => void;
  onVpChange: (val: number) => void;
  onMwfChange: (val: [number, number, number]) => void;
  isBreaking: boolean;
}

function Counter({
  label,
  value,
  onInc,
  onDec,
  min = 0,
  max,
  color,
}: {
  label: string;
  value: number;
  onInc: () => void;
  onDec: () => void;
  min?: number;
  max?: number;
  color?: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
      <span className="lotr-label" style={{ textAlign: 'center', fontSize: '0.65rem' }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <button
          className="btn-counter"
          onClick={onDec}
          disabled={value <= min}
          style={{ opacity: value <= min ? 0.3 : 1 }}
        >
          −
        </button>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: color || '#f4e4c1',
          minWidth: '2rem',
          textAlign: 'center',
        }}>
          {value}
        </span>
        <button
          className="btn-counter"
          onClick={onInc}
          disabled={max !== undefined && value >= max}
          style={{ opacity: max !== undefined && value >= max ? 0.3 : 1 }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function PlayerPanel({
  playerName,
  faction,
  pointLimit,
  points,
  vp,
  mwf,
  onPointsChange,
  onVpChange,
  onMwfChange,
  isBreaking,
}: PlayerPanelProps) {
  const [heroOpen, setHeroOpen] = useState(false);

  const isGood = faction === 'good';
  const factionColor = isGood ? '#a0c0f0' : '#e07070';
  const factionBorder = isGood ? 'rgba(100, 130, 220, 0.4)' : 'rgba(139, 26, 26, 0.4)';
  const factionBg = isGood ? 'rgba(100, 130, 180, 0.08)' : 'rgba(139, 26, 26, 0.08)';

  const pointsLost = pointLimit - points;
  const pointsPct = Math.max(0, Math.min(100, (points / pointLimit) * 100));

  function updateMwf(idx: number, delta: number) {
    const next = [...mwf] as [number, number, number];
    next[idx] = Math.max(0, next[idx] + delta);
    onMwfChange(next);
  }

  return (
    <div
      className="panel"
      style={{
        borderColor: isBreaking ? '#8b1a1a' : factionBorder,
        boxShadow: isBreaking
          ? '0 0 20px rgba(139,26,26,0.4), inset 0 0 30px rgba(0,0,0,0.3)'
          : `0 0 15px rgba(200,169,110,0.1), inset 0 0 30px rgba(0,0,0,0.3)`,
        backgroundColor: factionBg,
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          <h3 style={{ color: factionColor, fontSize: '1.2rem', marginBottom: '0.2rem' }}>
            {playerName}
          </h3>
          <span className={isGood ? 'faction-good' : 'faction-evil'}>
            {isGood ? '✦ Good' : '✦ Evil'}
          </span>
        </div>
        {isBreaking && (
          <div className="breaking-point-banner" style={{
            marginTop: '0.4rem',
            padding: '0.25rem 0.6rem',
            backgroundColor: 'rgba(139,26,26,0.3)',
            border: '1px solid #8b1a1a',
            borderRadius: '3px',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            color: '#e07070',
            textAlign: 'center',
          }}>
            ⚠ BREAKING POINT REACHED
          </div>
        )}
      </div>

      <hr className="gold-rule" />

      {/* Army Points */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span className="lotr-label" style={{ margin: 0 }}>Army Points</span>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: points <= pointLimit / 2 ? '#e07070' : '#f4e4c1',
          }}>
            {points}
            <span style={{ fontSize: '0.85rem', color: 'rgba(244,228,193,0.4)', fontWeight: 400 }}>
              /{pointLimit}
            </span>
          </span>
        </div>

        {/* Points bar */}
        <div style={{
          height: '4px',
          backgroundColor: 'rgba(200,169,110,0.15)',
          borderRadius: '2px',
          marginBottom: '0.5rem',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${pointsPct}%`,
            backgroundColor: pointsPct <= 50 ? '#8b1a1a' : factionColor,
            borderRadius: '2px',
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }} />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button
            className="btn-counter"
            onClick={() => onPointsChange(Math.min(pointLimit, points + 10))}
            style={{ width: '36px', height: '28px', fontSize: '0.8rem' }}
          >
            +10
          </button>
          <button
            className="btn-counter"
            onClick={() => onPointsChange(Math.min(pointLimit, points + 1))}
          >
            +
          </button>
          <button
            className="btn-counter"
            onClick={() => onPointsChange(Math.max(0, points - 1))}
          >
            −
          </button>
          <button
            className="btn-counter"
            onClick={() => onPointsChange(Math.max(0, points - 10))}
            style={{ width: '36px', height: '28px', fontSize: '0.8rem' }}
          >
            −10
          </button>
        </div>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.65rem',
          letterSpacing: '0.08em',
          color: 'rgba(200,169,110,0.4)',
          textAlign: 'center',
          marginTop: '0.3rem',
        }}>
          Lost: {pointsLost} pts
        </div>
      </div>

      <hr className="gold-rule" />

      {/* Victory Points */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
        <Counter
          label="Victory Points"
          value={vp}
          onInc={() => onVpChange(vp + 1)}
          onDec={() => onVpChange(Math.max(0, vp - 1))}
          color="#c8a96e"
        />
      </div>

      <hr className="gold-rule" />

      {/* Hero MWF — collapsible */}
      <button
        onClick={() => setHeroOpen(!heroOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: '100%',
          marginBottom: heroOpen ? '0.75rem' : 0,
        }}
      >
        <span className="lotr-label" style={{ margin: 0, flex: 1, textAlign: 'left' }}>
          Hero (Might / Will / Fate)
        </span>
        <span style={{
          color: '#c8a96e',
          fontSize: '0.8rem',
          fontFamily: 'Cinzel, serif',
          opacity: 0.6,
        }}>
          {heroOpen ? '▲' : '▼'}
        </span>
      </button>

      <div className={`accordion-content ${heroOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'space-around' }}>
          <Counter
            label="Might"
            value={mwf[0]}
            onInc={() => updateMwf(0, 1)}
            onDec={() => updateMwf(0, -1)}
            color="#c8a96e"
          />
          <Counter
            label="Will"
            value={mwf[1]}
            onInc={() => updateMwf(1, 1)}
            onDec={() => updateMwf(1, -1)}
            color="#a0c0f0"
          />
          <Counter
            label="Fate"
            value={mwf[2]}
            onInc={() => updateMwf(2, 1)}
            onDec={() => updateMwf(2, -1)}
            color={isGood ? '#a0f0b0' : '#f0a0a0'}
          />
        </div>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.6rem',
          letterSpacing: '0.07em',
          color: 'rgba(200,169,110,0.35)',
          textAlign: 'center',
          marginTop: '0.5rem',
          textTransform: 'uppercase',
        }}>
          Fate: 4+ to ignore wound
        </p>
      </div>
    </div>
  );
}
