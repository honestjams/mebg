'use client';

import { useState } from 'react';
import { HEROES, getHeroesByFaction, Hero } from '../lib/heroes';

export type ModelEntry = {
  id: string;
  name: string;
  might: number;
  will: number;
  fate: number;
  // Optional reference to a roster hero — keeps starting values for reset
  rosterId?: string;
  startMight?: number;
  startWill?: number;
  startFate?: number;
};

interface PlayerPanelProps {
  playerName: string;
  faction: 'good' | 'evil';
  pointLimit: number;
  points: number;
  vp: number;
  models: ModelEntry[];
  armySize: number;
  modelsRemaining: number;
  onPointsChange: (val: number) => void;
  onVpChange: (val: number) => void;
  onModelsChange: (models: ModelEntry[]) => void;
  onArmySizeChange: (val: number) => void;
  onModelsRemainingChange: (val: number) => void;
  isBreaking: boolean;
  hasPriority: boolean;
  playerIndex: number; // 0..3 for colour theming
}

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

function ResourceCounter({
  label,
  value,
  onChange,
  color,
  compact = false,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  color: string;
  compact?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
      <span style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '0.55rem',
        letterSpacing: '0.1em',
        color: 'rgba(200,169,110,0.55)',
        textTransform: 'uppercase',
      }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <button
          className="btn-counter"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value <= 0}
          style={{ opacity: value <= 0 ? 0.3 : 1, width: compact ? '22px' : '26px', height: compact ? '22px' : '26px', fontSize: '0.8rem' }}
        >−</button>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: compact ? '0.95rem' : '1.05rem',
          fontWeight: 700,
          color,
          minWidth: '1.5rem',
          textAlign: 'center',
        }}>{value}</span>
        <button
          className="btn-counter"
          onClick={() => onChange(value + 1)}
          style={{ width: compact ? '22px' : '26px', height: compact ? '22px' : '26px', fontSize: '0.8rem' }}
        >+</button>
      </div>
    </div>
  );
}

function HeroRow({
  model,
  onChange,
  onRemove,
  faction,
}: {
  model: ModelEntry;
  onChange: (m: ModelEntry) => void;
  onRemove: () => void;
  faction: 'good' | 'evil';
}) {
  const fateColor = faction === 'good' ? '#a0f0b0' : '#f0a0a0';
  const [editing, setEditing] = useState(false);

  return (
    <div className="panel-inner" style={{ padding: '0.5rem 0.6rem', marginBottom: '0.4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
        {editing ? (
          <input
            type="text"
            value={model.name}
            onChange={(e) => onChange({ ...model, name: e.target.value })}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') setEditing(false); }}
            autoFocus
            className="lotr-input"
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem', flex: 1 }}
            maxLength={40}
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: '#f4e4c1',
              flex: 1, textAlign: 'left', padding: 0,
            }}
            title="Click to rename"
          >
            {model.name}
          </button>
        )}
        <button
          onClick={onRemove}
          style={{
            background: 'transparent', border: 'none', color: 'rgba(224,112,112,0.6)',
            cursor: 'pointer', fontSize: '0.85rem', padding: '0 0.2rem',
          }}
          title="Remove model"
          aria-label={`Remove ${model.name}`}
        >✕</button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-around' }}>
        <ResourceCounter
          label="Might"
          value={model.might}
          onChange={(v) => onChange({ ...model, might: v })}
          color="#c8a96e"
          compact
        />
        <ResourceCounter
          label="Will"
          value={model.will}
          onChange={(v) => onChange({ ...model, will: v })}
          color="#a0c0f0"
          compact
        />
        <ResourceCounter
          label="Fate"
          value={model.fate}
          onChange={(v) => onChange({ ...model, fate: v })}
          color={fateColor}
          compact
        />
      </div>
    </div>
  );
}

const PLAYER_COLORS: Record<number, { color: string; border: string; bg: string }> = {
  0: { color: '#a0c0f0', border: 'rgba(100, 130, 220, 0.4)', bg: 'rgba(100, 130, 180, 0.08)' },
  1: { color: '#e07070', border: 'rgba(139, 26, 26, 0.4)', bg: 'rgba(139, 26, 26, 0.08)' },
  2: { color: '#a0f0b0', border: 'rgba(50, 140, 80, 0.4)', bg: 'rgba(50, 120, 70, 0.08)' },
  3: { color: '#e8c98e', border: 'rgba(200, 169, 110, 0.45)', bg: 'rgba(200, 169, 110, 0.08)' },
};

export default function PlayerPanel({
  playerName,
  faction,
  pointLimit,
  points,
  vp,
  models,
  armySize,
  modelsRemaining,
  onPointsChange,
  onVpChange,
  onModelsChange,
  onArmySizeChange,
  onModelsRemainingChange,
  isBreaking,
  hasPriority,
  playerIndex,
}: PlayerPanelProps) {
  const [armySizeInput, setArmySizeInput] = useState(armySize > 0 ? String(armySize) : '');
  const [heroOpen, setHeroOpen] = useState(true);
  const [rosterOpen, setRosterOpen] = useState(false);
  const [rosterFilter, setRosterFilter] = useState('');

  const theme = PLAYER_COLORS[playerIndex] ?? PLAYER_COLORS[0];
  const factionColor = theme.color;

  const pointsLost = pointLimit - points;
  const pointsPct = Math.max(0, Math.min(100, (points / pointLimit) * 100));

  function updateModel(idx: number, m: ModelEntry) {
    onModelsChange(models.map((x, i) => (i === idx ? m : x)));
  }

  function removeModel(idx: number) {
    onModelsChange(models.filter((_, i) => i !== idx));
  }

  function addCustomModel() {
    const next: ModelEntry = {
      id: makeId(),
      name: `Hero ${models.length + 1}`,
      might: 1, will: 1, fate: 1,
      startMight: 1, startWill: 1, startFate: 1,
    };
    onModelsChange([...models, next]);
  }

  function addFromRoster(hero: Hero) {
    const next: ModelEntry = {
      id: makeId(),
      name: hero.name,
      might: hero.might,
      will: hero.will,
      fate: hero.fate,
      rosterId: hero.id,
      startMight: hero.might,
      startWill: hero.will,
      startFate: hero.fate,
    };
    onModelsChange([...models, next]);
    setRosterOpen(false);
    setRosterFilter('');
  }

  function resetAllMwf() {
    onModelsChange(models.map((m) => ({
      ...m,
      might: m.startMight ?? m.might,
      will: m.startWill ?? m.will,
      fate: m.startFate ?? m.fate,
    })));
  }

  const rosterChoices = getHeroesByFaction(faction).filter((h) =>
    rosterFilter === '' || h.name.toLowerCase().includes(rosterFilter.toLowerCase()) || h.army.toLowerCase().includes(rosterFilter.toLowerCase())
  );

  return (
    <div
      className="panel"
      style={{
        borderColor: hasPriority ? '#c8a96e' : isBreaking ? '#8b1a1a' : theme.border,
        boxShadow: hasPriority
          ? '0 0 18px rgba(200,169,110,0.35), inset 0 0 30px rgba(0,0,0,0.3)'
          : isBreaking
          ? '0 0 20px rgba(139,26,26,0.4), inset 0 0 30px rgba(0,0,0,0.3)'
          : '0 0 15px rgba(200,169,110,0.1), inset 0 0 30px rgba(0,0,0,0.3)',
        backgroundColor: theme.bg,
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.4rem', flexWrap: 'wrap' }}>
          <h3 style={{ color: factionColor, fontSize: '1.1rem', marginBottom: '0.2rem' }}>
            {hasPriority && <span style={{ color: '#c8a96e', marginRight: '0.3rem' }}>⚔</span>}
            {playerName}
          </h3>
          <span className={faction === 'good' ? 'faction-good' : 'faction-evil'} style={{ fontSize: '0.6rem' }}>
            {faction === 'good' ? '✦ Good' : '✦ Evil'}
          </span>
        </div>
        {isBreaking && (
          <div style={{
            marginTop: '0.35rem',
            padding: '0.2rem 0.5rem',
            backgroundColor: 'rgba(139,26,26,0.3)',
            border: '1px solid #8b1a1a',
            borderRadius: '3px',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: '#e07070',
            textAlign: 'center',
          }}>
            ⚠ BROKEN
          </div>
        )}
      </div>

      <hr className="gold-rule" />

      {/* Army Points */}
      <div style={{ marginBottom: '0.65rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
          <span className="lotr-label" style={{ margin: 0 }}>Army Points</span>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: points <= pointLimit / 2 ? '#e07070' : '#f4e4c1',
          }}>
            {points}
            <span style={{ fontSize: '0.8rem', color: 'rgba(244,228,193,0.4)', fontWeight: 400 }}>
              /{pointLimit}
            </span>
          </span>
        </div>

        <div style={{
          height: '4px',
          backgroundColor: 'rgba(200,169,110,0.15)',
          borderRadius: '2px',
          marginBottom: '0.4rem',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${pointsPct}%`,
            backgroundColor: pointsPct <= 50 ? '#8b1a1a' : factionColor,
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }} />
        </div>

        <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-counter" onClick={() => onPointsChange(Math.min(pointLimit, points + 25))} style={{ width: '38px', height: '26px', fontSize: '0.75rem' }}>+25</button>
          <button className="btn-counter" onClick={() => onPointsChange(Math.min(pointLimit, points + 10))} style={{ width: '38px', height: '26px', fontSize: '0.75rem' }}>+10</button>
          <button className="btn-counter" onClick={() => onPointsChange(Math.max(0, points - 10))} style={{ width: '38px', height: '26px', fontSize: '0.75rem' }}>−10</button>
          <button className="btn-counter" onClick={() => onPointsChange(Math.max(0, points - 25))} style={{ width: '38px', height: '26px', fontSize: '0.75rem' }}>−25</button>
        </div>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.6rem',
          letterSpacing: '0.08em',
          color: 'rgba(200,169,110,0.4)',
          textAlign: 'center',
          marginTop: '0.25rem',
        }}>
          Lost: {pointsLost} pts
        </div>
      </div>

      <hr className="gold-rule" />

      {/* Force Strength */}
      {(() => {
        const breakAt = armySize > 0 ? Math.floor(armySize * 0.25) : null;
        const remainPct = armySize > 0 ? Math.max(0, Math.min(100, (modelsRemaining / armySize) * 100)) : 100;
        return (
          <div style={{ marginBottom: '0.65rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <span className="lotr-label" style={{ margin: 0 }}>Force Strength</span>
              {armySize > 0 && (
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: isBreaking ? '#e07070' : '#f4e4c1',
                }}>
                  {modelsRemaining}
                  <span style={{ fontSize: '0.8rem', color: 'rgba(244,228,193,0.4)', fontWeight: 400 }}>
                    /{armySize}
                  </span>
                </span>
              )}
            </div>

            {/* Army size setter */}
            {armySize === 0 ? (
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <input
                  type="number"
                  min={1}
                  max={300}
                  className="lotr-input"
                  placeholder="Starting models…"
                  value={armySizeInput}
                  onChange={(e) => setArmySizeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const n = parseInt(armySizeInput, 10);
                      if (n > 0) onArmySizeChange(n);
                    }
                  }}
                  style={{ flex: 1, padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                />
                <button
                  className="btn-gold"
                  style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem', whiteSpace: 'nowrap' }}
                  onClick={() => {
                    const n = parseInt(armySizeInput, 10);
                    if (n > 0) onArmySizeChange(n);
                  }}
                >
                  Set
                </button>
              </div>
            ) : (
              <>
                {/* Progress bar */}
                <div style={{
                  height: '4px',
                  backgroundColor: 'rgba(200,169,110,0.15)',
                  borderRadius: '2px',
                  marginBottom: '0.4rem',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${remainPct}%`,
                    backgroundColor: isBreaking ? '#8b1a1a' : remainPct <= 50 ? '#c8703a' : factionColor,
                    transition: 'width 0.3s ease, background-color 0.3s ease',
                  }} />
                </div>

                {/* Casualty buttons */}
                <div style={{ display: 'flex', gap: '0.3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="btn-counter"
                    onClick={() => onModelsRemainingChange(Math.max(0, modelsRemaining - 1))}
                    disabled={modelsRemaining <= 0}
                    style={{ opacity: modelsRemaining <= 0 ? 0.3 : 1, width: '44px', height: '26px', fontSize: '0.75rem' }}
                  >
                    −1
                  </button>
                  <button
                    className="btn-counter"
                    onClick={() => onModelsRemainingChange(Math.min(armySize, modelsRemaining + 1))}
                    disabled={modelsRemaining >= armySize}
                    style={{ opacity: modelsRemaining >= armySize ? 0.3 : 1, width: '44px', height: '26px', fontSize: '0.75rem' }}
                  >
                    +1
                  </button>
                  <button
                    className="btn-counter"
                    onClick={() => {
                      setArmySizeInput('');
                      onArmySizeChange(0);
                    }}
                    style={{ width: '44px', height: '26px', fontSize: '0.7rem' }}
                    title="Reset army size"
                  >
                    ↺
                  </button>
                </div>

                {/* Breaking point info */}
                <div style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.08em',
                  color: isBreaking ? '#e07070' : 'rgba(200,169,110,0.4)',
                  textAlign: 'center',
                  marginTop: '0.25rem',
                }}>
                  {isBreaking
                    ? '⚔ FORCE BROKEN — courage tests at Move Phase start'
                    : `Breaks at ≤ ${breakAt} model${breakAt === 1 ? '' : 's'} · ${armySize - modelsRemaining} lost`}
                </div>
              </>
            )}
          </div>
        );
      })()}

      <hr className="gold-rule" />

      {/* Victory Points */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        <span className="lotr-label" style={{ margin: 0 }}>Victory Points</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button className="btn-counter" onClick={() => onVpChange(Math.max(0, vp - 1))} disabled={vp <= 0} style={{ opacity: vp <= 0 ? 0.3 : 1 }}>−</button>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#c8a96e',
            minWidth: '2rem',
            textAlign: 'center',
          }}>{vp}</span>
          <button className="btn-counter" onClick={() => onVpChange(vp + 1)}>+</button>
        </div>
      </div>

      <hr className="gold-rule" />

      {/* Heroes section */}
      <button
        onClick={() => setHeroOpen(!heroOpen)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          width: '100%', marginBottom: heroOpen ? '0.5rem' : 0,
        }}
      >
        <span className="lotr-label" style={{ margin: 0, flex: 1, textAlign: 'left' }}>
          Heroes ({models.length}) · Might / Will / Fate
        </span>
        <span style={{ color: '#c8a96e', fontSize: '0.8rem', opacity: 0.6 }}>
          {heroOpen ? '▲' : '▼'}
        </span>
      </button>

      <div className={`accordion-content ${heroOpen ? 'open' : ''}`}>
        {models.length === 0 && (
          <p style={{
            fontFamily: 'Crimson Text, serif',
            fontStyle: 'italic',
            fontSize: '0.8rem',
            color: 'rgba(244,228,193,0.4)',
            textAlign: 'center',
            padding: '0.4rem 0',
          }}>
            No heroes yet. Add from roster or create custom.
          </p>
        )}

        {models.map((m, i) => (
          <HeroRow
            key={m.id}
            model={m}
            onChange={(updated) => updateModel(i, updated)}
            onRemove={() => removeModel(i)}
            faction={faction}
          />
        ))}

        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-gold" onClick={addCustomModel} style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}>
            + Add Custom
          </button>
          <button className="btn-gold" onClick={() => setRosterOpen(true)} style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}>
            + From Roster
          </button>
          {models.length > 0 && (
            <button className="btn-gold" onClick={resetAllMwf} style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}>
              ↻ Reset MWF
            </button>
          )}
        </div>

        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.55rem',
          letterSpacing: '0.07em',
          color: 'rgba(200,169,110,0.35)',
          textAlign: 'center',
          marginTop: '0.5rem',
          textTransform: 'uppercase',
        }}>
          Fate: 4+ to ignore wound · Might modifies any die ±1
        </p>
      </div>

      {/* Roster Modal */}
      {rosterOpen && (
        <div
          onClick={() => setRosterOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="panel"
            style={{
              maxWidth: '480px', width: '100%',
              maxHeight: '85vh', display: 'flex', flexDirection: 'column',
              borderColor: theme.border,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <h3 style={{ color: factionColor, fontSize: '1rem', margin: 0 }}>
                {faction === 'good' ? '✦ Heroes of the West' : '✦ Servants of the Shadow'}
              </h3>
              <button onClick={() => setRosterOpen(false)} className="btn-counter">✕</button>
            </div>
            <input
              type="text"
              className="lotr-input"
              placeholder="Search by name or army…"
              value={rosterFilter}
              onChange={(e) => setRosterFilter(e.target.value)}
              style={{ marginBottom: '0.5rem' }}
              autoFocus
            />
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.25rem' }}>
              {rosterChoices.length === 0 && (
                <p style={{ fontStyle: 'italic', textAlign: 'center', padding: '1rem', color: 'rgba(244,228,193,0.4)' }}>
                  No heroes match.
                </p>
              )}
              {rosterChoices.map((hero) => (
                <button
                  key={hero.id}
                  onClick={() => addFromRoster(hero)}
                  className="panel-inner"
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    background: 'transparent', cursor: 'pointer',
                    marginBottom: '0.4rem', padding: '0.5rem 0.7rem',
                    borderColor: 'rgba(200,169,110,0.2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: '#f4e4c1' }}>{hero.name}</span>
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.08em', color: '#c8a96e' }}>
                      {hero.points} pts
                    </span>
                  </div>
                  <p style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', letterSpacing: '0.08em', color: 'rgba(200,169,110,0.55)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {hero.army}
                  </p>
                  <p style={{ fontFamily: 'Crimson Text, serif', fontSize: '0.78rem', color: 'rgba(244,228,193,0.7)', lineHeight: 1.3 }}>
                    M{hero.stats.move}" · F{hero.stats.fight} · S{hero.stats.strength} · D{hero.stats.defence} · A{hero.stats.attacks} · W{hero.stats.wounds} · C{hero.stats.courage}
                    {' · '}
                    <span style={{ color: '#c8a96e' }}>{hero.might}M / {hero.will}W / {hero.fate}F</span>
                  </p>
                  {hero.notes && (
                    <p style={{ fontFamily: 'Crimson Text, serif', fontStyle: 'italic', fontSize: '0.72rem', color: 'rgba(244,228,193,0.5)', marginTop: '0.15rem' }}>
                      {hero.notes}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
