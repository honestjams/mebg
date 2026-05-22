'use client';

import { useState, useEffect } from 'react';
import { PHASES } from '../lib/gameRules';

interface PhaseNavigatorProps {
  currentPhase: number;
  onPhaseChange: (phase: number) => void;
  currentTurn: number;
  onEndTurn: () => void;
}

export default function PhaseNavigator({
  currentPhase,
  onPhaseChange,
  currentTurn,
  onEndTurn,
}: PhaseNavigatorProps) {
  const [animKey, setAnimKey] = useState(0);
  const phase = PHASES[currentPhase];

  const phaseClassMap: Record<number, string> = {
    0: 'phase-priority',
    1: 'phase-move',
    2: 'phase-shoot',
    3: 'phase-fight',
  };

  const phaseClass = phaseClassMap[currentPhase];

  function goNext() {
    if (currentPhase === PHASES.length - 1) {
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

  const phaseColorMap: Record<number, string> = {
    0: '#8b1a1a',
    1: '#2a5a2a',
    2: '#8a6020',
    3: '#6a2a2a',
  };

  const phaseColor = phaseColorMap[currentPhase];

  return (
    <div
      className={`panel ${phaseClass}`}
      style={{ marginBottom: '1rem' }}
    >
      {/* Phase step indicators */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '1.25rem' }}>
        {PHASES.map((p, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', flex: idx < PHASES.length - 1 ? 1 : 'none' }}>
            <button
              onClick={() => { setAnimKey((k) => k + 1); onPhaseChange(idx); }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.25rem 0.5rem',
              }}
            >
              <div
                className={`step-circle ${idx === currentPhase ? 'active' : idx < currentPhase ? 'done' : ''}`}
                style={idx === currentPhase ? { borderColor: phaseColor, color: phaseColor, boxShadow: `0 0 10px ${phaseColor}50` } : {}}
              >
                <span style={{ fontSize: '1rem' }}>{p.icon}</span>
              </div>
              <span style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.6rem',
                letterSpacing: '0.06em',
                color: idx === currentPhase ? phaseColor : 'rgba(200, 169, 110, 0.4)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                {p.name.replace(' Phase', '')}
              </span>
            </button>
            {idx < PHASES.length - 1 && (
              <div className="step-line" style={{ marginBottom: '1.2rem' }} />
            )}
          </div>
        ))}
      </div>

      {/* Current phase display */}
      <div
        key={animKey}
        className="phase-animate"
        style={{ textAlign: 'center', marginBottom: '1rem' }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{phase.icon}</div>
        <h2 style={{ color: phaseColor, marginBottom: '0.25rem', fontSize: '1.8rem' }}>
          {phase.name}
        </h2>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          color: 'rgba(200, 169, 110, 0.5)',
          textTransform: 'uppercase',
        }}>
          Turn {currentTurn}
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
          ← Prev Phase
        </button>

        {currentPhase === PHASES.length - 1 ? (
          <button
            className="btn-gold-filled"
            onClick={onEndTurn}
            style={{ borderColor: phaseColor, backgroundColor: phaseColor, color: '#f4e4c1' }}
          >
            End Turn →
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
