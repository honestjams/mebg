'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ALL_SCENARIOS, RULES_MANUAL_SCENARIOS, MATCHED_PLAY_SCENARIOS, Scenario } from '../../lib/scenarios';

const POINT_PRESETS = [300, 400, 500, 600, 700, 750];
const TURN_PRESETS = [6, 8, 10, 12];

type Player = { name: string; faction: 'good' | 'evil' };

const PLAYER_LABELS: Record<number, { color: string; bg: string; border: string }> = {
  0: { color: '#a0c0f0', bg: 'rgba(100,130,180,0.08)', border: 'rgba(100,130,220,0.25)' },
  1: { color: '#e07070', bg: 'rgba(139,26,26,0.1)', border: 'rgba(139,26,26,0.3)' },
  2: { color: '#a0f0b0', bg: 'rgba(50,120,70,0.1)', border: 'rgba(50,120,70,0.35)' },
  3: { color: '#e8c98e', bg: 'rgba(200,169,110,0.1)', border: 'rgba(200,169,110,0.35)' },
};

function ScenarioCard({
  scenario,
  selected,
  onSelect,
}: {
  scenario: Scenario;
  selected: boolean;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      style={{
        border: `1px solid ${selected ? '#c8a96e' : 'rgba(200,169,110,0.2)'}`,
        borderRadius: '4px',
        backgroundColor: selected ? 'rgba(200,169,110,0.1)' : 'rgba(45,27,14,0.6)',
        marginBottom: '0.5rem',
        overflow: 'hidden',
        transition: 'border-color 0.15s ease',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0.75rem', gap: '0.5rem' }}>
        <button
          onClick={onSelect}
          style={{
            width: '16px', height: '16px', borderRadius: '50%',
            border: `2px solid ${selected ? '#c8a96e' : 'rgba(200,169,110,0.4)'}`,
            backgroundColor: selected ? '#c8a96e' : 'transparent',
            flexShrink: 0, cursor: 'pointer',
          }}
          aria-label={`Select ${scenario.name}`}
        />
        <button
          onClick={onSelect}
          style={{
            flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
            textAlign: 'left', fontFamily: 'Cinzel, serif', fontSize: '0.9rem',
            color: selected ? '#c8a96e' : '#f4e4c1', padding: 0,
          }}
        >
          {scenario.name}
        </button>
        <span style={{
          fontFamily: 'Cinzel, serif', fontSize: '0.55rem', letterSpacing: '0.08em',
          color: 'rgba(200,169,110,0.45)', textTransform: 'uppercase', flexShrink: 0,
        }}>
          {scenario.gameEndType === '25pct' ? '25% end' : scenario.gameEndType === 'broken-roll' ? 'broken+roll' : 'special'}
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'rgba(200,169,110,0.5)', fontSize: '0.75rem', padding: '0 0.2rem', flexShrink: 0,
          }}
          aria-label="Expand scenario details"
        >
          {expanded ? '▲' : '▼'}
        </button>
      </div>

      {/* Objective line always visible */}
      <p style={{
        fontFamily: 'Crimson Text, serif', fontSize: '0.82rem',
        color: 'rgba(244,228,193,0.65)', padding: '0 0.75rem 0.4rem',
        lineHeight: 1.35, margin: 0,
      }}>
        {scenario.objective}
      </p>

      {/* Expanded details */}
      {expanded && (
        <div style={{ padding: '0 0.75rem 0.6rem', borderTop: '1px solid rgba(200,169,110,0.15)', marginTop: '0.2rem' }}>
          {scenario.specialRules.length > 0 && (
            <div style={{ marginTop: '0.5rem' }}>
              <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.08em', color: '#c8a96e', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Special Rules
              </p>
              <ul style={{ paddingLeft: '1rem', margin: 0 }}>
                {scenario.specialRules.map((r, i) => (
                  <li key={i} style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.8rem', color: 'rgba(244,228,193,0.75)', lineHeight: 1.4, marginBottom: '0.15rem' }}>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div style={{ marginTop: '0.5rem' }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', letterSpacing: '0.08em', color: '#c8a96e', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Victory Points
            </p>
            <ul style={{ paddingLeft: '1rem', margin: 0 }}>
              {scenario.vpScoring.map((v, i) => (
                <li key={i} style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.8rem', color: 'rgba(244,228,193,0.75)', lineHeight: 1.4, marginBottom: '0.15rem' }}>
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: '0.5rem', padding: '0.3rem 0.5rem', backgroundColor: 'rgba(139,26,26,0.15)', border: '1px solid rgba(139,26,26,0.3)', borderRadius: '3px' }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.08em', color: '#e07070' }}>Game Ends: </span>
            <span style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.8rem', color: 'rgba(244,228,193,0.8)' }}>{scenario.gameEnd}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [players, setPlayers] = useState<Player[]>([
    { name: '', faction: 'good' },
    { name: '', faction: 'evil' },
  ]);

  const [pointPreset, setPointPreset] = useState<number | 'custom'>(500);
  const [customPoints, setCustomPoints] = useState('500');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('domination');
  const [maxTurns, setMaxTurns] = useState<number>(10);
  const [scenarioFilter, setScenarioFilter] = useState<'all' | 'rules-manual' | 'matched-play'>('rules-manual');

  const pointLimit = pointPreset === 'custom' ? parseInt(customPoints, 10) || 500 : pointPreset;
  const selectedScenario = ALL_SCENARIOS.find((s) => s.id === selectedScenarioId);

  const filteredScenarios =
    scenarioFilter === 'all' ? ALL_SCENARIOS :
    scenarioFilter === 'rules-manual' ? RULES_MANUAL_SCENARIOS :
    MATCHED_PLAY_SCENARIOS;

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

  const canAdvance1 = players.every((p) => p.name.trim().length > 0) && players.length >= 2;
  const canAdvance2 = pointLimit >= 100 && !!selectedScenario && maxTurns >= 2;

  function marchToWar() {
    const params = new URLSearchParams();
    players.forEach((p, i) => {
      params.set(`p${i + 1}`, p.name.trim());
      params.set(`f${i + 1}`, p.faction);
    });
    params.set('n', String(players.length));
    params.set('pts', String(pointLimit));
    params.set('scenario', selectedScenario?.name ?? 'Custom Battle');
    params.set('scenarioId', selectedScenarioId);
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

        {/* ── STEP 1: PLAYERS ─────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Step I — The Champions</h2>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'rgba(200,169,110,0.55)' }}>
                {players.length} PLAYER{players.length !== 1 ? 'S' : ''} · MAX 4
              </span>
            </div>
            <p style={{ color: 'rgba(244,228,193,0.55)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Name the commanders who shall lead their armies to glory or ruin.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {players.map((player, idx) => {
                const lbl = PLAYER_LABELS[idx];
                return (
                  <div key={idx}>
                    <div style={{
                      padding: '0.5rem 0.75rem', backgroundColor: lbl.bg,
                      border: `1px solid ${lbl.border}`, borderRadius: '3px', marginBottom: '0.75rem',
                      fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.1em',
                      color: lbl.color, textAlign: 'center',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span>PLAYER {idx + 1}</span>
                      {players.length > 2 && (
                        <button onClick={() => removePlayer(idx)} style={{ background: 'transparent', border: 'none', color: lbl.color, opacity: 0.55, cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>✕</button>
                      )}
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <label className="lotr-label">Commander Name</label>
                      <input type="text" className="lotr-input" placeholder={idx === 0 ? 'e.g. Gandalf the Grey' : idx === 1 ? 'e.g. The Dark Lord Sauron' : 'e.g. Théoden King'} value={player.name} onChange={(e) => updatePlayer(idx, { name: e.target.value })} maxLength={40} />
                    </div>
                    <div>
                      <label className="lotr-label">Faction</label>
                      <select className="lotr-select" value={player.faction} onChange={(e) => updatePlayer(idx, { faction: e.target.value as 'good' | 'evil' })}>
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

            <div className="divider" style={{ marginTop: '1.5rem' }}><span className="divider-text">✦ ── ✦</span></div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-gold-filled" onClick={() => setStep(2)} disabled={!canAdvance1} style={{ opacity: canAdvance1 ? 1 : 0.45 }}>
                Next: The Battlefield →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: POINTS + SCENARIO + TURNS ──────────────────────────── */}
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
                  <button key={p} onClick={() => setPointPreset(p)} className={pointPreset === p ? 'btn-gold-filled' : 'btn-gold'} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>{p}</button>
                ))}
                <button onClick={() => setPointPreset('custom')} className={pointPreset === 'custom' ? 'btn-gold-filled' : 'btn-gold'} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>Custom</button>
              </div>
              {pointPreset === 'custom' && (
                <input type="number" className="lotr-input" placeholder="Enter point limit..." value={customPoints} onChange={(e) => setCustomPoints(e.target.value)} min={100} max={9999} style={{ maxWidth: '200px' }} />
              )}
              <p style={{ fontSize: '0.8rem', color: 'rgba(244,228,193,0.4)', marginTop: '0.35rem' }}>
                Breaking point is reached at {Math.floor(pointLimit / 2)} points remaining.
              </p>
            </div>

            {/* Max Turns */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="lotr-label">Maximum Turns</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                {TURN_PRESETS.map((t) => (
                  <button key={t} onClick={() => setMaxTurns(t)} className={maxTurns === t ? 'btn-gold-filled' : 'btn-gold'} style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>{t} turns</button>
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(244,228,193,0.4)' }}>
                Standard MESBG scenarios use no fixed turn limit — games end on scenario conditions. Use 10 as a safe fallback.
              </p>
            </div>

            {/* Scenario picker */}
            <div style={{ marginBottom: '0.5rem' }}>
              <label className="lotr-label">Scenario</label>
              <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                {(['rules-manual', 'matched-play', 'all'] as const).map((f) => (
                  <button key={f} onClick={() => setScenarioFilter(f)} className={scenarioFilter === f ? 'btn-gold-filled' : 'btn-gold'} style={{ fontSize: '0.75rem', padding: '0.35rem 0.7rem' }}>
                    {f === 'rules-manual' ? 'Rules Manual (12)' : f === 'matched-play' ? 'Matched Play (6)' : 'All (18)'}
                  </button>
                ))}
              </div>

              <div style={{ maxHeight: '380px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                {filteredScenarios.map((s) => (
                  <ScenarioCard
                    key={s.id}
                    scenario={s}
                    selected={selectedScenarioId === s.id}
                    onSelect={() => setSelectedScenarioId(s.id)}
                  />
                ))}
              </div>
            </div>

            <div className="divider"><span className="divider-text">✦ ── ✦</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn-gold" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-gold-filled" onClick={() => setStep(3)} disabled={!canAdvance2} style={{ opacity: canAdvance2 ? 1 : 0.45 }}>
                Review Orders →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: REVIEW ──────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="panel">
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Step III — The Order of Battle</h2>
            <p style={{ color: 'rgba(244,228,193,0.55)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              The forces are arrayed. Review and march to war.
            </p>

            <div className="panel-inner" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(players.length, 2)}, 1fr)`, gap: '0.75rem' }}>
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

            {selectedScenario && (
              <div className="panel-inner" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <div>
                    <p className="lotr-label">Scenario</p>
                    <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: '#f4e4c1' }}>{selectedScenario.name}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="lotr-label">Points / Turns</p>
                    <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.1rem', fontWeight: 700, color: '#c8a96e' }}>
                      {pointLimit} pts · {maxTurns} turns
                    </p>
                  </div>
                </div>
                <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.88rem', color: 'rgba(244,228,193,0.7)', lineHeight: 1.4 }}>
                  {selectedScenario.objective}
                </p>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(200,169,110,0.5)', marginTop: '0.35rem', textTransform: 'uppercase' }}>
                  {selectedScenario.gameEnd}
                </p>
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <p style={{ fontFamily: 'Crimson Text, serif', fontStyle: 'italic', color: 'rgba(244,228,193,0.6)', fontSize: '1rem' }}>
                &ldquo;Courage is found in unlikely places.&rdquo; — J.R.R. Tolkien
              </p>
            </div>

            <div className="divider"><span className="divider-text">✦ ── ✦</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn-gold" onClick={() => setStep(2)}>← Back</button>
              <button className="btn-gold-filled" onClick={marchToWar} style={{ fontSize: '1rem', padding: '0.75rem 2rem', backgroundColor: '#8b1a1a', borderColor: '#8b1a1a', color: '#f4e4c1' }}>
                ⚔️ March to War!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
