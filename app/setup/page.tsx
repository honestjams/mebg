'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const POINT_PRESETS = [300, 400, 500, 600, 700, 750];
const TURN_PRESETS = [6, 8, 10, 12];

type Player = {
  name: string;
  faction: 'good' | 'evil';
};

const PLAYER_LABELS: Record<number, { color: string; bg: string; border: string }> = {
  0: { color: '#a0c0f0', bg: 'rgba(100,130,180,0.08)', border: 'rgba(100,130,220,0.25)' },
  1: { color: '#e07070', bg: 'rgba(139,26,26,0.1)', border: 'rgba(139,26,26,0.3)' },
  2: { color: '#a0f0b0', bg: 'rgba(50,120,70,0.1)', border: 'rgba(50,120,70,0.35)' },
  3: { color: '#e8c98e', bg: 'rgba(200,169,110,0.1)', border: 'rgba(200,169,110,0.35)' },
};

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1: 2-4 players
  const [players, setPlayers] = useState<Player[]>([
    { name: '', faction: 'good' },
    { name: '', faction: 'evil' },
  ]);

  // Step 2
  const [pointPreset, setPointPreset] = useState<number | 'custom'>(500);
  const [customPoints, setCustomPoints] = useState('500');
  const [scenario, setScenario] = useState('');
  const [maxTurns, setMaxTurns] = useState<number>(10);

  const pointLimit =
    pointPreset === 'custom' ? parseInt(customPoints, 10) || 500 : pointPreset;

  function updatePlayer(idx: number, patch: Partial<Player>) {
    setPlayers((ps) => ps.map((p, i) => (i === idx ? { ...p, ...patch } : p)));
  }

  function addPlayer() {
    if (players.length >= 4) return;
    setPlayers((ps) => [...ps, { name: '', faction: ps.length % 2 === 0 ? 'good' : 'evil' }]);
  }

  function removePlayer(idx: number) {
    if (players.length <= 2) return;
    setPlayers((ps) => ps.filter((_, i) => i !== idx));
  }

  function canAdvance1() {
    return players.every((p) => p.name.trim().length > 0) && players.length >= 2;
  }

  function canAdvance2() {
    return pointLimit >= 100 && scenario.trim().length > 0 && maxTurns >= 2;
  }

  function marchToWar() {
    const params = new URLSearchParams();
    players.forEach((p, i) => {
      params.set(`p${i + 1}`, p.name.trim());
      params.set(`f${i + 1}`, p.faction);
    });
    params.set('n', String(players.length));
    params.set('pts', String(pointLimit));
    params.set('scenario', scenario.trim());
    params.set('maxTurns', String(maxTurns));
    router.push(`/game?${params.toString()}`);
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a0f08', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          ← Return to Hall
        </Link>

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

        {/* Step 1: Players (2-4) */}
        {step === 1 && (
          <div className="panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Step I — The Champions</h2>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(200,169,110,0.55)' }}>
                {players.length} {players.length === 1 ? 'PLAYER' : 'PLAYERS'} · MAX 4
              </span>
            </div>
            <p style={{ color: 'rgba(244,228,193,0.55)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Name the commanders who shall lead their armies to glory or ruin.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {players.map((player, idx) => {
                const lbl = PLAYER_LABELS[idx];
                return (
                  <div key={idx} style={{ position: 'relative' }}>
                    <div style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: lbl.bg,
                      border: `1px solid ${lbl.border}`,
                      borderRadius: '3px',
                      marginBottom: '0.75rem',
                      fontFamily: 'Cinzel, serif',
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      color: lbl.color,
                      textAlign: 'center',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span>PLAYER {idx + 1}</span>
                      {players.length > 2 && (
                        <button
                          onClick={() => removePlayer(idx)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: lbl.color,
                            opacity: 0.55,
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            padding: 0,
                          }}
                          aria-label={`Remove player ${idx + 1}`}
                          title="Remove player"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <label className="lotr-label">Commander Name</label>
                      <input
                        type="text"
                        className="lotr-input"
                        placeholder={idx === 0 ? 'e.g. Gandalf the Grey' : idx === 1 ? 'e.g. Dark Lord Sauron' : 'e.g. Théoden King'}
                        value={player.name}
                        onChange={(e) => updatePlayer(idx, { name: e.target.value })}
                        maxLength={40}
                      />
                    </div>

                    <div>
                      <label className="lotr-label">Faction</label>
                      <select
                        className="lotr-select"
                        value={player.faction}
                        onChange={(e) => updatePlayer(idx, { faction: e.target.value as 'good' | 'evil' })}
                      >
                        <option value="good">✦ Forces of Good</option>
                        <option value="evil">✦ Forces of Evil</option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>

            {players.length < 4 && (
              <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                <button className="btn-gold" onClick={addPlayer} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                  + Add Another Commander
                </button>
              </div>
            )}

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

        {/* Step 2: Points, Scenario, Turns */}
        {step === 2 && (
          <div className="panel">
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Step II — The Battlefield</h2>
            <p style={{ color: 'rgba(244,228,193,0.55)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Agree upon the terms of engagement before drawing blades.
            </p>

            {/* Point limit */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="lotr-label">Army Point Limit (per player)</label>
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

            {/* Max Turns */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="lotr-label">Maximum Turns</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                {TURN_PRESETS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setMaxTurns(t)}
                    className={maxTurns === t ? 'btn-gold-filled' : 'btn-gold'}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
                  >
                    {t} turns
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(244,228,193,0.4)', marginTop: '0.35rem' }}>
                Standard MESBG scenarios run 10 turns. Game ends automatically when this is reached.
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
              <button className="btn-gold" onClick={() => setStep(1)}>← Back</button>
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

            <div className="panel-inner" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${players.length === 2 ? 2 : 'auto-fit,minmax(180px,1fr)'}, 1fr)`, gap: '0.75rem' }}>
                {players.map((p, i) => {
                  const lbl = PLAYER_LABELS[i];
                  return (
                    <div key={i}>
                      <p className="lotr-label">Player {i + 1}</p>
                      <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: lbl.color }}>{p.name}</p>
                      <span className={p.faction === 'good' ? 'faction-good' : 'faction-evil'} style={{ marginTop: '0.25rem', display: 'inline-block' }}>
                        {p.faction === 'good' ? 'Forces of Good' : 'Forces of Evil'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="panel-inner" style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <p className="lotr-label">Scenario</p>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: '#f4e4c1' }}>{scenario}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p className="lotr-label">Max Turns</p>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', fontWeight: 700, color: '#c8a96e' }}>{maxTurns}</p>
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
              <button className="btn-gold" onClick={() => setStep(2)}>← Back</button>
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
