'use client';

import { useState, useEffect } from 'react';
import { PHASES } from '../lib/gameRules';

interface PhaseNavigatorProps {
  currentPhase: number;
  onPhaseChange: (phase: number) => void;
  currentTurn: number;
  maxTurns: number;
  onEndTurn: () => void;
}

const PHASE_CLASS_MAP: Record<number, string> = {
  0: 'phase-priority',
  1: 'phase-move',
  2: 'phase-shoot',
  3: 'phase-fight',
  4: 'phase-priority',
};

export default function PhaseNavigator({
  currentPhase,
  onPhaseChange,
  currentTurn,
  maxTurns,
  onEndTurn,
}: PhaseNavigatorProps) {
  const [animKey, setAnimKey] = useState(0);
  const phase = PHASES[currentPhase];
  const phaseClass = PHASE_CLASS_MAP[currentPhase] ?? '';
  const phaseColor = phase.color;
  const isLastPhase = currentPhase === PHASES.length - 1;
  const isLastTurn = currentTurn >= maxTurns;

  function goNext() {
    if (isLastPhase) {
      onEndTurn();
    } else {
      setAnimKey((k) => k + 1);
      onPhaseChange(currentPhase + 1);
    }
  }

  function goPrev() {
    if (currentPhase > 0) {
      setAnimKey((k) => k + 1);
      onPhaseChange(currentPhase - 1);
    }
  }

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [currentPhase]);

  return (
    <div className={`panel ${phaseClass}`} style={{ marginBottom: '1rem' }}>
      {/* Phase step indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {PHASES.map((p, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', flex: idx < PHASES.length - 1 ? 1 : 'none', minWidth: 'fit-content' }}>
            <button
              onClick={() => { setAnimKey((k) => k + 1); onPhaseChange(idx); }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '0.2rem', padding: '0.2rem 0.4rem',
              }}
            >
              <div
                className={`step-circle ${idx === currentPhase ? 'active' : idx < currentPhase ? 'done' : ''}`}
                style={idx === currentPhase ? { borderColor: p.color, color: p.color, boxShadow: `0 0 10px ${p.color}50` } : {}}
              >
                <span style={{ fontSize: '0.95rem' }}>{p.icon}</span>
              </div>
              <span style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.58rem',
                letterSpacing: '0.06em',
                color: idx === currentPhase ? p.color : 'rgba(200, 169, 110, 0.4)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                {p.short}
              </span>
            </button>
            {idx < PHASES.length - 1 && (
              <div className="step-line" style={{ marginBottom: '1rem' }} />
            )}
          </div>
        ))}
      </div>

      {/* Current phase display */}
      <div key={animKey} className="phase-animate" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
        <div style={{ fontSize: '2.2rem', marginBottom: '0.15rem' }}>{phase.icon}</div>
        <h2 style={{ color: phaseColor, marginBottom: '0.2rem', fontSize: '1.55rem' }}>
          {phase.name}
        </h2>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          color: 'rgba(200, 169, 110, 0.5)',
          textTransform: 'uppercase',
        }}>
          Turn {currentTurn} of {maxTurns}
        </p>
      </div>

      {/* Nav buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
        <button
          className="btn-gold"
          onClick={goPrev}
          disabled={currentPhase === 0}
          style={{ opacity: currentPhase === 0 ? 0.35 : 1 }}
        >
          ← Prev
        </button>

        {isLastPhase ? (
          <button
            className="btn-gold-filled"
            onClick={onEndTurn}
            style={{
              borderColor: isLastTurn ? '#8b1a1a' : phaseColor,
              backgroundColor: isLastTurn ? '#8b1a1a' : phaseColor,
              color: '#f4e4c1',
            }}
          >
            {isLastTurn ? '⚔ End Game' : 'End Turn →'}
          </button>
        ) : (
          <button
            className="btn-gold"
            onClick={goNext}
            style={{ borderColor: phaseColor, color: phaseColor }}
          >
            Next Phase →
          </button>
        )}
      </div>
    </div>
  );
}
