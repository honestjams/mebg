'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PHASES } from '../../lib/gameRules';
import PhaseNavigator from '../../components/PhaseNavigator';
import DiceRoller from '../../components/DiceRoller';
import PlayerPanel from '../../components/PlayerPanel';

function GameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const p1Name = searchParams.get('p1') || 'Player 1';
  const p2Name = searchParams.get('p2') || 'Player 2';
  const f1 = (searchParams.get('f1') || 'good') as 'good' | 'evil';
  const f2 = (searchParams.get('f2') || 'evil') as 'good' | 'evil';
  const pointLimit = parseInt(searchParams.get('pts') || '500', 10);
  const scenario = searchParams.get('scenario') || 'Custom Battle';

  // Game state
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [priorityPlayer, setPriorityPlayer] = useState<1 | 2>(1);

  // Player state
  const [p1Points, setP1Points] = useState(pointLimit);
  const [p2Points, setP2Points] = useState(pointLimit);
  const [p1VP, setP1VP] = useState(0);
  const [p2VP, setP2VP] = useState(0);
  const [p1MWF, setP1MWF] = useState<[number, number, number]>([3, 3, 3]);
  const [p2MWF, setP2MWF] = useState<[number, number, number]>([3, 3, 3]);

  const [phaseAnimKey, setPhaseAnimKey] = useState(0);

  const breakingPoint = Math.floor(pointLimit / 2);
  const p1Breaking = p1Points <= breakingPoint;
  const p2Breaking = p2Points <= breakingPoint;
  const eitherBreaking = p1Breaking || p2Breaking;

  function handlePhaseChange(phase: number) {
    setPhaseAnimKey((k) => k + 1);
    setCurrentPhase(phase);
  }

  function handleEndTurn() {
    setCurrentTurn((t) => t + 1);
    setCurrentPhase(0);
    setPhaseAnimKey((k) => k + 1);
  }

  function togglePriority() {
    setPriorityPlayer((p) => (p === 1 ? 2 : 1));
  }

  const currentPhaseData = PHASES[currentPhase];

  const phaseColorMap: Record<number, string> = {
    0: '#8b1a1a',
    1: '#2a5a2a',
    2: '#8a6020',
    3: '#6a2a2a',
  };
  const phaseColor = phaseColorMap[currentPhase];

  const priorityName = priorityPlayer === 1 ? p1Name : p2Name;

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
        <Link href="/setup" style={{ fontSize: '0.8rem', opacity: 0.6, flexShrink: 0 }}>
          ← Setup
        </Link>

        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'rgba(200,169,110,0.5)', textTransform: 'uppercase' }}>
            {scenario}
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', color: '#c8a96e', fontWeight: 700 }}>
            Turn {currentTurn} &nbsp;·&nbsp; {currentPhaseData.icon} {currentPhaseData.name}
          </div>
        </div>

        <Link href="/rules" style={{ fontSize: '0.8rem', opacity: 0.6, flexShrink: 0 }}>
          Rules →
        </Link>
      </header>

      {/* Breaking Point Banner */}
      {eitherBreaking && (
        <div className="breaking-point-banner" style={{
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
          {p1Breaking && p2Breaking
            ? 'Both armies are broken!'
            : p1Breaking
            ? `${p1Name}'s army is broken!`
            : `${p2Name}'s army is broken!`}
        </div>
      )}

      {/* Main content */}
      <main style={{ flex: 1, padding: '0.75rem 1rem 1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Top: Phase Navigator */}
        <PhaseNavigator
          currentPhase={currentPhase}
          onPhaseChange={handlePhaseChange}
          currentTurn={currentTurn}
          onEndTurn={handleEndTurn}
        />

        {/* Phase Rules Panel */}
        <div
          key={phaseAnimKey}
          className="panel phase-animate"
          style={{
            borderColor: phaseColor,
            boxShadow: `0 0 15px ${phaseColor}30, inset 0 0 30px rgba(0,0,0,0.3)`,
            marginBottom: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{currentPhaseData.icon}</span>
            <h3 style={{ color: phaseColor, margin: 0, fontSize: '1.1rem' }}>
              {currentPhaseData.name} — Rules
            </h3>
          </div>

          <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.75rem' }}>
            {currentPhaseData.rules.map((rule, i) => (
              <li
                key={i}
                style={{
                  fontFamily: 'Crimson Text, serif',
                  fontSize: '1rem',
                  color: '#f4e4c1',
                  lineHeight: 1.5,
                  marginBottom: '0.35rem',
                  opacity: 0.9,
                }}
              >
                {rule}
              </li>
            ))}
          </ul>

          <div style={{
            padding: '0.5rem 0.75rem',
            backgroundColor: `${phaseColor}20`,
            border: `1px solid ${phaseColor}40`,
            borderRadius: '3px',
          }}>
            <span style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: phaseColor,
              textTransform: 'uppercase',
              marginRight: '0.5rem',
            }}>
              ✦ Tip
            </span>
            <span style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(244,228,193,0.75)' }}>
              {currentPhaseData.tips}
            </span>
          </div>
        </div>

        {/* Priority indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
          <button
            onClick={togglePriority}
            className="btn-gold"
            style={{ borderColor: '#8b1a1a', color: '#e07070' }}
          >
            ⚔️ Priority: {priorityName} — Toggle
          </button>
        </div>

        {/* Bottom row: Player panels + Dice */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '0.75rem',
          alignItems: 'start',
        }}>
          {/* Player 1 */}
          <PlayerPanel
            playerName={p1Name}
            faction={f1}
            pointLimit={pointLimit}
            points={p1Points}
            vp={p1VP}
            mwf={p1MWF}
            onPointsChange={setP1Points}
            onVpChange={setP1VP}
            onMwfChange={setP1MWF}
            isBreaking={p1Breaking}
          />

          {/* Center: Dice Roller */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '160px', maxWidth: '200px' }}>
            <DiceRoller />

            {/* VP Summary */}
            <div className="panel" style={{ textAlign: 'center', padding: '0.75rem' }}>
              <p className="lotr-label" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Victory Points</p>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 700, color: f1 === 'good' ? '#a0c0f0' : '#e07070' }}>
                    {p1VP}
                  </span>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: 'rgba(200,169,110,0.45)', letterSpacing: '0.08em' }}>
                    {p1Name.split(' ')[0]}
                  </p>
                </div>
                <span style={{ color: 'rgba(200,169,110,0.3)', fontFamily: 'Cinzel, serif' }}>vs</span>
                <div>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 700, color: f2 === 'good' ? '#a0c0f0' : '#e07070' }}>
                    {p2VP}
                  </span>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: 'rgba(200,169,110,0.45)', letterSpacing: '0.08em' }}>
                    {p2Name.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Player 2 */}
          <PlayerPanel
            playerName={p2Name}
            faction={f2}
            pointLimit={pointLimit}
            points={p2Points}
            vp={p2VP}
            mwf={p2MWF}
            onPointsChange={setP2Points}
            onVpChange={setP2VP}
            onMwfChange={setP2MWF}
            isBreaking={p2Breaking}
          />
        </div>
      </main>

      {/* Footer */}
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
