'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PHASES, DEFAULT_MAX_TURNS } from '../../lib/gameRules';
import { getScenario, Scenario } from '../../lib/scenarios';
import PhaseNavigator from '../../components/PhaseNavigator';
import DiceRoller from '../../components/DiceRoller';
import PlayerPanel, { ModelEntry } from '../../components/PlayerPanel';

function ScenarioPanel({ scenario }: { scenario: Scenario }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="panel" style={{ marginBottom: '0.75rem', borderColor: 'rgba(200,169,110,0.35)', padding: 0 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', padding: '0.55rem 0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.12em', color: '#c8a96e', textTransform: 'uppercase' }}>
            📜 {scenario.name}
          </span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.08em', color: 'rgba(200,169,110,0.45)', textTransform: 'uppercase', padding: '0.1rem 0.35rem', border: '1px solid rgba(200,169,110,0.25)', borderRadius: '2px' }}>
            {scenario.gameEndType === '25pct' ? '25% end' : scenario.gameEndType === 'broken-roll' ? 'broken + D6 roll' : 'special'}
          </span>
        </div>
        <span style={{ color: 'rgba(200,169,110,0.5)', fontSize: '0.75rem' }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 0.85rem 0.75rem', borderTop: '1px solid rgba(200,169,110,0.15)' }}>
          <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.9rem', color: 'rgba(244,228,193,0.8)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
            {scenario.objective}
          </p>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.08em', color: '#c8a96e', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Victory Points</p>
          <ul style={{ paddingLeft: '1rem', margin: '0 0 0.5rem' }}>
            {scenario.vpScoring.map((v, i) => (
              <li key={i} style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.82rem', color: 'rgba(244,228,193,0.75)', lineHeight: 1.35, marginBottom: '0.15rem' }}>{v}</li>
            ))}
          </ul>
          <div style={{ padding: '0.3rem 0.5rem', backgroundColor: 'rgba(139,26,26,0.15)', border: '1px solid rgba(139,26,26,0.3)', borderRadius: '3px' }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.08em', color: '#e07070' }}>Game Ends: </span>
            <span style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.82rem', color: 'rgba(244,228,193,0.8)' }}>{scenario.gameEnd}</span>
          </div>
        </div>
      )}
    </div>
  );
}

type PlayerState = {
  name: string;
  faction: 'good' | 'evil';
  points: number;
  vp: number;
  models: ModelEntry[];
};

function GameContent() {
  const searchParams = useSearchParams();

  // Parse player count from search params (default 2, max 4)
  const numPlayers = Math.min(4, Math.max(2, parseInt(searchParams.get('n') || '2', 10)));
  const pointLimit = parseInt(searchParams.get('pts') || '500', 10);
  const scenarioName = searchParams.get('scenario') || 'Custom Battle';
  const scenarioId = searchParams.get('scenarioId') || '';
  const maxTurns = parseInt(searchParams.get('maxTurns') || String(DEFAULT_MAX_TURNS), 10);
  const scenarioData = getScenario(scenarioId);

  // Initialise players from URL
  const initialPlayers: PlayerState[] = useMemo(() => {
    const list: PlayerState[] = [];
    for (let i = 1; i <= numPlayers; i++) {
      list.push({
        name: searchParams.get(`p${i}`) || `Player ${i}`,
        faction: (searchParams.get(`f${i}`) || (i % 2 === 1 ? 'good' : 'evil')) as 'good' | 'evil',
        points: pointLimit,
        vp: 0,
        models: [],
      });
    }
    return list;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [players, setPlayers] = useState<PlayerState[]>(initialPlayers);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [priorityPlayer, setPriorityPlayer] = useState(0); // 0..n-1
  const [gameOver, setGameOver] = useState(false);
  const [checkedActions, setCheckedActions] = useState<Set<string>>(new Set());

  const breakingPoint = Math.floor(pointLimit / 2);

  function updatePlayer(idx: number, patch: Partial<PlayerState>) {
    setPlayers((ps) => ps.map((p, i) => (i === idx ? { ...p, ...patch } : p)));
  }

  function handlePhaseChange(phase: number) {
    setCurrentPhase(phase);
    setCheckedActions(new Set());
  }

  function handleEndTurn() {
    if (currentTurn >= maxTurns) {
      setGameOver(true);
      return;
    }
    setCurrentTurn((t) => t + 1);
    setCurrentPhase(0);
    setCheckedActions(new Set());
  }

  function cyclePriority() {
    setPriorityPlayer((p) => (p + 1) % players.length);
  }

  function toggleAction(key: string) {
    setCheckedActions((set) => {
      const next = new Set(set);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function resetGame() {
    setPlayers(initialPlayers);
    setCurrentPhase(0);
    setCurrentTurn(1);
    setPriorityPlayer(0);
    setGameOver(false);
    setCheckedActions(new Set());
  }

  const currentPhaseData = PHASES[currentPhase];
  const phaseColor = currentPhaseData.color;

  // Breaking-point status
  const playerBreaking = players.map((p) => p.points <= breakingPoint);
  const anyBreaking = playerBreaking.some(Boolean);

  // Game over screen
  if (gameOver) {
    const ranked = [...players].map((p, i) => ({ ...p, idx: i })).sort((a, b) => b.vp - a.vp || b.points - a.points);
    const winner = ranked[0];
    const tied = ranked.filter((p) => p.vp === winner.vp && p.points === winner.points);
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#1a0f08', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div className="panel" style={{ maxWidth: '600px', width: '100%', textAlign: 'center', borderColor: '#c8a96e', boxShadow: '0 0 40px rgba(200,169,110,0.3)' }}>
          <div style={{ color: '#c8a96e', fontSize: '1.1rem', letterSpacing: '0.5rem', marginBottom: '1rem', opacity: 0.6 }}>
            ᚛ ✦ ᚜ ✦ ᚛ ✦ ᚜
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '0.5rem' }}>The Battle is Ended</h1>
          <p style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.2em', color: 'rgba(200,169,110,0.6)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
            {scenarioName.toUpperCase()} · {currentTurn} TURNS FOUGHT
          </p>

          <div className="divider" style={{ margin: '1.25rem auto', maxWidth: '320px' }}>
            <span className="divider-text">✦ Victor ✦</span>
          </div>

          {tied.length > 1 ? (
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', color: '#c8a96e', marginBottom: '1rem' }}>
              The field is divided — {tied.map((t) => t.name).join(' & ')} share the day.
            </p>
          ) : (
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: '#c8a96e', marginBottom: '1rem' }}>
              {winner.name}
            </p>
          )}

          <div className="panel-inner" style={{ marginBottom: '1.25rem' }}>
            {ranked.map((p, place) => (
              <div key={p.idx} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.4rem 0',
                borderBottom: place < ranked.length - 1 ? '1px solid rgba(200,169,110,0.15)' : 'none',
              }}>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.95rem', color: place === 0 ? '#c8a96e' : '#f4e4c1' }}>
                  {place + 1}. {p.name}
                </span>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', color: 'rgba(244,228,193,0.65)' }}>
                  {p.vp} VP · {p.points}/{pointLimit} pts
                </span>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: 'Crimson Text, serif', fontStyle: 'italic', color: 'rgba(244,228,193,0.6)', marginBottom: '1.5rem' }}>
            &ldquo;The Road goes ever on and on…&rdquo;
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={resetGame}>↻ Replay</button>
            <Link href="/setup"><button className="btn-gold-filled">⚔ New Battle</button></Link>
            <Link href="/"><button className="btn-gold">↩ Hall</button></Link>
          </div>
        </div>
      </div>
    );
  }

  // Layout grid for player panels — responsive based on player count
  const playerGridCols =
    players.length === 2 ? 'repeat(2, minmax(0, 1fr))' :
    players.length === 3 ? 'repeat(3, minmax(0, 1fr))' :
    'repeat(auto-fit, minmax(220px, 1fr))';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a0f08', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#2d1b0e',
        borderBottom: '1px solid rgba(200,169,110,0.3)',
        padding: '0.6rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <Link href="/setup" style={{ fontSize: '0.8rem', opacity: 0.6, flexShrink: 0 }}>← Setup</Link>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(200,169,110,0.5)', textTransform: 'uppercase' }}>
            {scenarioName}
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: '#c8a96e', fontWeight: 700 }}>
            Turn {currentTurn}/{maxTurns} &nbsp;·&nbsp; {currentPhaseData.icon} {currentPhaseData.name}
          </div>
        </div>
        <Link href="/rules" style={{ fontSize: '0.8rem', opacity: 0.6, flexShrink: 0 }}>Rules →</Link>
      </header>

      {/* Breaking-Point banner */}
      {anyBreaking && (
        <div style={{
          backgroundColor: 'rgba(139,26,26,0.3)',
          borderBottom: '1px solid #8b1a1a',
          padding: '0.4rem 1rem',
          textAlign: 'center',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          color: '#e07070',
        }}>
          ⚠ BREAKING POINT —{' '}
          {players.filter((_, i) => playerBreaking[i]).map((p) => p.name).join(', ')} broken
        </div>
      )}

      {/* Final-turn banner */}
      {currentTurn >= maxTurns && !gameOver && (
        <div style={{
          backgroundColor: 'rgba(200,169,110,0.15)',
          borderBottom: '1px solid #c8a96e',
          padding: '0.4rem 1rem',
          textAlign: 'center',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          color: '#c8a96e',
        }}>
          ✦ FINAL TURN — the long day draws to a close
        </div>
      )}

      <main style={{ flex: 1, padding: '0.75rem 1rem 1rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Scenario VP reminder (collapsed by default) */}
        {scenarioData && <ScenarioPanel scenario={scenarioData} />}

        {/* Top: Phase Navigator */}
        <PhaseNavigator
          currentPhase={currentPhase}
          onPhaseChange={handlePhaseChange}
          currentTurn={currentTurn}
          maxTurns={maxTurns}
          onEndTurn={handleEndTurn}
        />

        {/* Phase Action Checklist */}
        <div className="panel" style={{
          borderColor: phaseColor,
          boxShadow: `0 0 15px ${phaseColor}30, inset 0 0 30px rgba(0,0,0,0.3)`,
          marginBottom: '0.75rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '1.3rem' }}>{currentPhaseData.icon}</span>
            <h3 style={{ color: phaseColor, margin: 0, fontSize: '1rem' }}>
              {currentPhaseData.name} — Action Sequence
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {currentPhaseData.actions.map((act, i) => {
              const key = `${currentTurn}-${currentPhase}-${i}`;
              const done = checkedActions.has(key);
              return (
                <button
                  key={i}
                  onClick={() => toggleAction(key)}
                  style={{
                    background: done ? `${phaseColor}18` : 'transparent',
                    border: `1px solid ${done ? phaseColor : 'rgba(200,169,110,0.18)'}`,
                    borderRadius: '3px',
                    padding: '0.45rem 0.7rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.55rem',
                    transition: 'background-color 0.15s ease, border-color 0.15s ease',
                  }}
                >
                  <span style={{
                    minWidth: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: `1.5px solid ${done ? phaseColor : 'rgba(200,169,110,0.45)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: phaseColor,
                    fontSize: '0.7rem',
                    flexShrink: 0,
                    marginTop: '0.15rem',
                  }}>
                    {done ? '✓' : ''}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '0.78rem',
                      letterSpacing: '0.04em',
                      color: done ? phaseColor : '#f4e4c1',
                      marginBottom: '0.15rem',
                    }}>
                      {act.step}
                      {act.who && (
                        <span style={{
                          marginLeft: '0.5rem',
                          fontSize: '0.6rem',
                          letterSpacing: '0.08em',
                          color: 'rgba(200,169,110,0.55)',
                          textTransform: 'uppercase',
                        }}>· {act.who}</span>
                      )}
                    </div>
                    <p style={{
                      fontFamily: 'Crimson Text, serif',
                      fontSize: '0.82rem',
                      color: 'rgba(244,228,193,0.7)',
                      lineHeight: 1.35,
                      margin: 0,
                    }}>
                      {act.detail}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{
            marginTop: '0.6rem',
            padding: '0.5rem 0.7rem',
            backgroundColor: `${phaseColor}20`,
            border: `1px solid ${phaseColor}40`,
            borderRadius: '3px',
          }}>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              color: phaseColor,
              textTransform: 'uppercase',
              marginRight: '0.4rem',
            }}>✦ Tip</span>
            <span style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.88rem', fontStyle: 'italic', color: 'rgba(244,228,193,0.75)' }}>
              {currentPhaseData.tips}
            </span>
          </div>
        </div>

        {/* Priority bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={cyclePriority}
            className="btn-gold"
            style={{ borderColor: '#c8a96e', color: '#c8a96e' }}
          >
            ⚔️ Priority: {players[priorityPlayer].name} — Cycle
          </button>
        </div>

        {/* Dice + VP Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(180px, 220px) 1fr',
          gap: '0.75rem',
          marginBottom: '0.75rem',
          alignItems: 'start',
        }}>
          <DiceRoller />

          <div className="panel" style={{ padding: '0.75rem' }}>
            <p className="lotr-label" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Victory Points</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${players.length}, minmax(0, 1fr))`,
              gap: '0.5rem',
            }}>
              {players.map((p, i) => (
                <div key={i} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0.4rem',
                  borderRadius: '3px',
                  backgroundColor: priorityPlayer === i ? 'rgba(200,169,110,0.1)' : 'transparent',
                  border: priorityPlayer === i ? '1px solid rgba(200,169,110,0.35)' : '1px solid transparent',
                }}>
                  <span style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    color: 'rgba(200,169,110,0.65)',
                    textTransform: 'uppercase',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {priorityPlayer === i && '⚔ '}{p.name.split(' ')[0]}
                  </span>
                  <span style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: p.faction === 'good' ? '#a0c0f0' : '#e07070',
                  }}>
                    {p.vp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Player panels */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: playerGridCols,
          gap: '0.75rem',
          alignItems: 'start',
        }}>
          {players.map((p, i) => (
            <PlayerPanel
              key={i}
              playerName={p.name}
              faction={p.faction}
              pointLimit={pointLimit}
              points={p.points}
              vp={p.vp}
              models={p.models}
              onPointsChange={(v) => updatePlayer(i, { points: v })}
              onVpChange={(v) => updatePlayer(i, { vp: v })}
              onModelsChange={(m) => updatePlayer(i, { models: m })}
              isBreaking={playerBreaking[i]}
              hasPriority={priorityPlayer === i}
              playerIndex={i}
            />
          ))}
        </div>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '0.75rem',
        fontFamily: 'Cinzel, serif',
        fontSize: '0.65rem',
        letterSpacing: '0.1em',
        color: 'rgba(200,169,110,0.25)',
        borderTop: '1px solid rgba(200,169,110,0.1)',
      }}>
        MESBG COMPANION &nbsp;✦&nbsp; NOT AFFILIATED WITH GAMES WORKSHOP
      </footer>
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', backgroundColor: '#1a0f08', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Cinzel, serif', color: '#c8a96e' }}>Marshalling forces…</p>
      </div>
    }>
      <GameContent />
    </Suspense>
  );
}
