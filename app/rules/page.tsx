'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WOUND_TABLE, HEROIC_ACTIONS } from '../../lib/gameRules';
import WoundTable from '../../components/WoundTable';

interface AccordionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Accordion({ title, icon, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="panel"
      style={{ marginBottom: '0.75rem', padding: '0' }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {icon && <span style={{ fontSize: '1.2rem' }}>{icon}</span>}
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#c8a96e' }}>{title}</h3>
        </div>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.9rem',
          color: 'rgba(200,169,110,0.5)',
          flexShrink: 0,
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s ease',
        }}>
          ▼
        </span>
      </button>

      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div style={{ padding: '0 1.25rem 1.25rem' }}>
          <hr className="gold-rule" style={{ marginTop: 0 }} />
          {children}
        </div>
      </div>
    </div>
  );
}

export default function RulesPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a0f08', padding: '1.5rem 1rem 3rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Back */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
          ← Return to Hall
        </Link>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ color: '#c8a96e', fontSize: '1rem', letterSpacing: '0.4rem', marginBottom: '0.75rem', opacity: 0.5 }}>
            ✦ ── ✦ ── ✦
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>
            Quick Rules Reference
          </h1>
          <p style={{ color: 'rgba(244,228,193,0.55)', fontSize: '1rem', fontStyle: 'italic' }}>
            The lore of battle, bound in parchment
          </p>
        </div>

        {/* Wound Table */}
        <Accordion title="To Wound Table" icon="🗡️" defaultOpen={true}>
          <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.95rem', color: 'rgba(244,228,193,0.7)', marginBottom: '0.75rem' }}>
            Cross-reference the attacker&apos;s <strong>Strength (S)</strong> with the defender&apos;s <strong>Defence (D)</strong>
            to find the minimum D6 roll needed to wound. A roll of 1 always fails; a roll of 6 always wounds.
          </p>
          <WoundTable />
        </Accordion>

        {/* Shoot values */}
        <Accordion title="Shooting Reference" icon="🏹">
          <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.95rem', color: 'rgba(244,228,193,0.7)', marginBottom: '1rem' }}>
            Roll a D6 equal to or above the model&apos;s Shoot value to hit. A natural 1 always misses.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { label: 'Shoot 2+', note: 'Master archers (Legolas, High Elves)' },
              { label: 'Shoot 3+', note: 'Skilled archers (Rangers, Wood Elves)' },
              { label: 'Shoot 4+', note: 'Average shooters (Orc Archers, Warriors)' },
              { label: 'Shoot 5+', note: 'Poor shots (Goblin Archers, Uruk Scouts)' },
              { label: 'Shoot 6+', note: 'Very poor shots (goblins with bows)' },
            ].map((row) => (
              <div key={row.label} className="panel-inner">
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', color: '#c8a96e', marginBottom: '0.2rem' }}>{row.label}</p>
                <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.9rem', color: 'rgba(244,228,193,0.65)' }}>{row.note}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <p className="lotr-label" style={{ marginBottom: '0.5rem' }}>In The Way Rules</p>
            <ul style={{ paddingLeft: '1.25rem' }}>
              {[
                'Roll a D6 for each model or piece of terrain in the way.',
                'On a 1, 2, or 3: the shot hits the obstacle/model in the way instead.',
                'On a 4, 5, or 6: the shot passes through — continue checking further obstacles.',
                'Friendly models in the way cannot be shot over without Volley Fire rules.',
              ].map((rule, i) => (
                <li key={i} style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.95rem', color: '#f4e4c1', lineHeight: 1.5, marginBottom: '0.3rem', opacity: 0.85 }}>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </Accordion>

        {/* Courage tests */}
        <Accordion title="Courage Tests" icon="🛡️">
          <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.95rem', color: 'rgba(244,228,193,0.7)', marginBottom: '1rem' }}>
            Roll 2D6 and compare the result to the model&apos;s Courage value. If the roll is equal to or under the Courage value, the model passes.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Crimson Text, serif', fontSize: '0.95rem' }}>
              <thead>
                <tr>
                  {['Situation', 'Test Required'].map((h) => (
                    <th key={h} style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid rgba(200,169,110,0.3)', color: '#c8a96e', textAlign: 'left', fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.08em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Army reaches Breaking Point', 'All models test each turn they wish to move toward the enemy'],
                  ['Charged by Terror-causing model', 'Test before moving; fail = cannot charge or move toward terror model'],
                  ['Within 3" of a Nazgûl using The Black Dart', 'Courage test or the model flees'],
                  ['Spell: Wither / Transfix / Compel', 'Varies by spell — see spell description'],
                  ['Heroic Resolve active', 'All friendly models within 6" automatically pass'],
                ].map(([sit, test], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(200,169,110,0.1)' }}>
                    <td style={{ padding: '0.5rem 0.75rem', color: '#f4e4c1', opacity: 0.9 }}>{sit}</td>
                    <td style={{ padding: '0.5rem 0.75rem', color: 'rgba(244,228,193,0.65)' }}>{test}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: '0.6rem 0.75rem', backgroundColor: 'rgba(139,26,26,0.2)', border: '1px solid rgba(139,26,26,0.4)', borderRadius: '3px' }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.7rem', letterSpacing: '0.1em', color: '#e07070' }}>Breaking Point: </span>
            <span style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.95rem', color: 'rgba(244,228,193,0.8)' }}>
              An army is broken when half or more of its models have been removed. Broken armies must test Courage each turn to move toward the enemy.
            </span>
          </div>
        </Accordion>

        {/* Heroic Actions */}
        <Accordion title="Heroic Actions" icon="✨">
          <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.95rem', color: 'rgba(244,228,193,0.7)', marginBottom: '1rem' }}>
            Declared in the Priority Phase. Each costs 1 Might point unless stated otherwise. The Priority player declares first, then alternates.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {HEROIC_ACTIONS.map((action, i) => (
              <div key={i} className="panel-inner" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '140px' }}>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', color: '#c8a96e', marginBottom: '0.15rem' }}>{action.name}</p>
                  <span style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    color: '#e07070',
                    backgroundColor: 'rgba(139,26,26,0.2)',
                    border: '1px solid rgba(139,26,26,0.4)',
                    borderRadius: '2px',
                    padding: '0.1rem 0.4rem',
                    display: 'inline-block',
                  }}>
                    {action.cost}
                  </span>
                </div>
                <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.95rem', color: 'rgba(244,228,193,0.8)', lineHeight: 1.4 }}>
                  {action.effect}
                </p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* Breaking Point Rules */}
        <Accordion title="Breaking Point Rules" icon="⚔️">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              {
                title: 'When is an army broken?',
                text: 'An army is broken when half or more of its models have been removed as casualties. Count the total models at the start of the game.',
              },
              {
                title: 'What happens when broken?',
                text: 'Every model in a broken army must take a Courage test at the start of the Move Phase. If failed, the model may not move closer to the enemy and may not charge.',
              },
              {
                title: 'Heroes and Breaking Point',
                text: 'Heroes may use Might to pass Courage tests (spend 1 Might to modify the roll by 1). A Hero who passes may also inspire nearby models using Heroic Resolve.',
              },
              {
                title: 'Conceding the Battle',
                text: 'A player with a broken army may concede at the end of any turn. The opposing player wins the scenario (consult the specific scenario for Victory Point implications).',
              },
              {
                title: 'Scenario Victory',
                text: 'Many scenarios grant bonus VPs for breaking the opponent\'s army. Always check the specific scenario rules for what happens at breaking point.',
              },
            ].map((item, i) => (
              <div key={i} className="panel-inner">
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.85rem', color: '#c8a96e', marginBottom: '0.3rem' }}>{item.title}</p>
                <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.95rem', color: 'rgba(244,228,193,0.8)', lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </Accordion>

        {/* Footer ornament */}
        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#c8a96e', opacity: 0.4, letterSpacing: '0.4rem' }}>
          ᚛ ✦ ᚜ ✦ ᚛
        </div>
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.65rem',
          letterSpacing: '0.08em',
          color: 'rgba(200,169,110,0.25)',
          textAlign: 'center',
          marginTop: '0.5rem',
          textTransform: 'uppercase',
        }}>
          MESBG Companion · Not affiliated with Games Workshop
        </p>
      </div>
    </div>
  );
}
