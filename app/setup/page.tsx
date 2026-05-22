'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const POINT_PRESETS = [300, 400, 500, 600, 700, 750];

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [f1, setF1] = useState<'good' | 'evil'>('good');
  const [f2, setF2] = useState<'good' | 'evil'>('evil');

  // Step 2
  const [pointPreset, setPointPreset] = useState<number | 'custom'>(500);
  const [customPoints, setCustomPoints] = useState('500');
  const [scenario, setScenario] = useState('');

  const pointLimit =
    pointPreset === 'custom' ? parseInt(customPoints, 10) || 500 : pointPreset;

  function canAdvance1() {
    return p1Name.trim().length > 0 && p2Name.trim().length > 0;
  }

  function canAdvance2() {
    return pointLimit >= 100 && scenario.trim().length > 0;
  }

  function marchToWar() {
    const params = new URLSearchParams({
      p1: p1Name.trim(),
      p2: p2Name.trim(),
      f1,
      f2,
      pts: String(pointLimit),
      scenario: scenario.trim(),
    });
    router.push(`/game?${params.toString()}`);
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a0f08', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Back link */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          ← Return to Hall
        </Link>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ color: '#c8a96e', fontSize: '1rem', letterSpacing: '0.4rem', marginBottom: '0.75rem', opacity: 0.5 }}>
            ✦ ── ✦ ── ✦
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '0.4rem' }}>
            Prepare for Battle
          </h1>
          <p style={{ color: 'rgba(244,228,193,0.6)', fontSize: '1rem' }}>
            Marshal your forces before the storm breaks
          </p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 3 ? 1 : 'none' }}>
              <div className={`step-circle ${step === s ? 'active' : step > s ? 'done' : ''}`}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && <div className="step-line" />}
            </div>
          ))}
        </div>

        {/* Step 1: Players */}
        {step === 1 && (
          <div className="panel">
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Step I — The Champions</h2>
            <p style={{ color: 'rgba(244,228,193,0.55)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Name the commanders who shall lead their armies to glory or ruin.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {/* Player 1 */}
              <div>
                <div style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'rgba(100,130,180,0.08)',
                  border: '1px solid rgba(100,130,220,0.25)',
                  borderRadius: '3px',
                  marginBottom: '0.75rem',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: '#a0c0f0',
                  textAlign: 'center',
                }}>
                  PLAYER 1
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <label className="lotr-label">Commander Name</label>
                  <input
                    type="text"
                    className="lotr-input"
                    placeholder="e.g. Gandalf the Grey"
                    value={p1Name}
                    onChange={(e) => setP1Name(e.target.value)}
                    maxLength={40}
                  />
                </div>

                <div>
                  <label className="lotr-label">Faction</label>
                  <select
                    className="lotr-select"
                    value={f1}
                    onChange={(e) => setF1(e.target.value as 'good' | 'evil')}
                  >
                    <option value="good">✦ Forces of Good</option>
                    <option value="evil">✦ Forces of Evil</option>
                  </select>
                </div>
              </div>

              {/* Player 2 */}
              <div>
                <div style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'rgba(139,26,26,0.1)',
                  border: '1px solid rgba(139,26,26,0.3)',
                  borderRadius: '3px',
                  marginBottom: '0.75rem',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: '#e07070',
                  textAlign: 'center',
                }}>
                  PLAYER 2
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <label className="lotr-label">Commander Name</label>
                  <input
                    type="text"
                    className="lotr-input"
                    placeholder="e.g. The Dark Lord Sauron"
                    value={p2Name}
                    onChange={(e) => setP2Name(e.target.value)}
                    maxLength={40}
                  />
                </div>

                <div>
                  <label className="lotr-label">Faction</label>
                  <select
                    className="lotr-select"
                    value={f2}
                    onChange={(e) => setF2(e.target.value as 'good' | 'evil')}
                  >
                    <option value="good">✦ Forces of Good</option>
                    <option value="evil">✦ Forces of Evil</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="divider" style={{ marginTop: '1.5rem' }}>
              <span className="divider-text">✦ ── ✦</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="btn-gold-filled"
                onClick={() => setStep(2)}
                disabled={!canAdvance1()}
                style={{ opacity: canAdvance1() ? 1 : 0.45 }}
              >
                Next: The Battlefield →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Points & Scenario */}
        {step === 2 && (
          <div className="panel">
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Step II — The Battlefield</h2>
            <p style={{ color: 'rgba(244,228,193,0.55)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Agree upon the terms of engagement before drawing blades.
            </p>

            {/* Point limit */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="lotr-label">Army Point Limit</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {POINT_PRESETS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPointPreset(p)}
                    className={pointPreset === p ? 'btn-gold-filled' : 'btn-gold'}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPointPreset('custom')}
                  className={pointPreset === 'custom' ? 'btn-gold-filled' : 'btn-gold'}
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                >
                  Custom
                </button>
              </div>
              {pointPreset === 'custom' && (
                <input
                  type="number"
                  className="lotr-input"
                  placeholder="Enter point limit..."
                  value={customPoints}
                  onChange={(e) => setCustomPoints(e.target.value)}
                  min={100}
                  max={9999}
                  style={{ maxWidth: '200px' }}
                />
              )}
              <p style={{ fontSize: '0.8rem', color: 'rgba(244,228,193,0.4)', marginTop: '0.35rem' }}>
                Breaking point is reached at {Math.floor(pointLimit / 2)} points remaining.
              </p>
            </div>

            {/* Scenario */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="lotr-label">Scenario Name</label>
              <input
                type="text"
                className="lotr-input"
                placeholder="e.g. Domination, Hold Ground, To the Death..."
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                maxLength={60}
              />
            </div>

            <div className="divider">
              <span className="divider-text">✦ ── ✦</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn-gold" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button
                className="btn-gold-filled"
                onClick={() => setStep(3)}
                disabled={!canAdvance2()}
                style={{ opacity: canAdvance2() ? 1 : 0.45 }}
              >
                Review Orders →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="panel">
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Step III — The Order of Battle</h2>
            <p style={{ color: 'rgba(244,228,193,0.55)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              The forces are arrayed. Review and march to war.
            </p>

            {/* Summary */}
            <div className="panel-inner" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p className="lotr-label">Player 1</p>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: '#a0c0f0' }}>{p1Name}</p>
                  <span className="faction-good" style={{ marginTop: '0.25rem', display: 'inline-block' }}>
                    {f1 === 'good' ? 'Forces of Good' : 'Forces of Evil'}
                  </span>
                </div>
                <div>
                  <p className="lotr-label">Player 2</p>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: '#e07070' }}>{p2Name}</p>
                  <span className={f2 === 'good' ? 'faction-good' : 'faction-evil'} style={{ marginTop: '0.25rem', display: 'inline-block' }}>
                    {f2 === 'good' ? 'Forces of Good' : 'Forces of Evil'}
                  </span>
                </div>
              </div>
            </div>

            <div className="panel-inner" style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p className="lotr-label">Scenario</p>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: '#f4e4c1' }}>{scenario}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="lotr-label">Point Limit</p>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', fontWeight: 700, color: '#c8a96e' }}>{pointLimit}</p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: 'Crimson Text, serif', fontStyle: 'italic', color: 'rgba(244,228,193,0.6)', fontSize: '1rem' }}>
                &ldquo;Courage is found in unlikely places.&rdquo; — J.R.R. Tolkien
              </p>
            </div>

            <div className="divider">
              <span className="divider-text">✦ ── ✦</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-gold" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button
                className="btn-gold-filled"
                onClick={marchToWar}
                style={{ fontSize: '1rem', padding: '0.75rem 2rem', backgroundColor: '#8b1a1a', borderColor: '#8b1a1a', color: '#f4e4c1' }}
              >
                ⚔️ March to War!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
