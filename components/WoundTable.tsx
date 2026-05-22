'use client';

import { useState } from 'react';
import { WOUND_TABLE } from '../lib/gameRules';

export default function WoundTable() {
  const [selectedS, setSelectedS] = useState<number | null>(null);
  const [selectedD, setSelectedD] = useState<number | null>(null);

  const highlighted =
    selectedS !== null && selectedD !== null
      ? WOUND_TABLE[selectedS - 1]?.[selectedD - 1]
      : undefined;

  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.8rem',
        }}>
          <thead>
            <tr>
              <th style={{
                padding: '0.4rem 0.5rem',
                borderBottom: '1px solid rgba(200,169,110,0.3)',
                color: '#c8a96e',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
              }}>
                S \ D
              </th>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((d) => (
                <th
                  key={d}
                  onClick={() => setSelectedD(selectedD === d ? null : d)}
                  style={{
                    padding: '0.4rem 0.5rem',
                    borderBottom: '1px solid rgba(200,169,110,0.3)',
                    color: selectedD === d ? '#f4e4c1' : '#c8a96e',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: selectedD === d ? 'rgba(200,169,110,0.2)' : 'transparent',
                    fontWeight: selectedD === d ? 700 : 600,
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    transition: 'all 0.15s ease',
                    userSelect: 'none',
                  }}
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WOUND_TABLE.map((row, sIdx) => {
              const s = sIdx + 1;
              return (
                <tr key={s}>
                  <td
                    onClick={() => setSelectedS(selectedS === s ? null : s)}
                    style={{
                      padding: '0.4rem 0.5rem',
                      borderBottom: '1px solid rgba(200,169,110,0.1)',
                      color: selectedS === s ? '#f4e4c1' : '#c8a96e',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: selectedS === s ? 'rgba(200,169,110,0.2)' : 'transparent',
                      fontWeight: selectedS === s ? 700 : 600,
                      fontSize: '0.7rem',
                      letterSpacing: '0.08em',
                      transition: 'all 0.15s ease',
                      userSelect: 'none',
                    }}
                  >
                    {s}
                  </td>
                  {row.map((val, dIdx) => {
                    const d = dIdx + 1;
                    const isHighlighted = selectedS === s && selectedD === d;
                    const isImpossible = val === null;
                    const isRowSel = selectedS === s;
                    const isColSel = selectedD === d;
                    const isIntersect = isRowSel && isColSel;

                    let cellBg = 'transparent';
                    let cellColor = isImpossible ? 'rgba(244,228,193,0.15)' : '#f4e4c1';
                    let cellBorder = '1px solid rgba(200,169,110,0.08)';

                    if (isIntersect && !isImpossible) {
                      cellBg = 'rgba(139,26,26,0.5)';
                      cellColor = '#f4e4c1';
                      cellBorder = '1px solid #8b1a1a';
                    } else if (isRowSel || isColSel) {
                      cellBg = 'rgba(200,169,110,0.1)';
                    }

                    if (isImpossible) {
                      cellBg = 'rgba(0,0,0,0.3)';
                    }

                    return (
                      <td
                        key={d}
                        className="wound-cell"
                        onClick={() => {
                          setSelectedS(selectedS === s ? null : s);
                          setSelectedD(selectedD === d ? null : d);
                        }}
                        style={{
                          padding: '0.4rem 0.5rem',
                          borderBottom: '1px solid rgba(200,169,110,0.1)',
                          border: cellBorder,
                          textAlign: 'center',
                          backgroundColor: cellBg,
                          color: cellColor,
                          fontWeight: isIntersect ? 700 : 400,
                          fontSize: '0.8rem',
                          transition: 'all 0.15s ease',
                          cursor: 'pointer',
                          userSelect: 'none',
                        }}
                      >
                        {isImpossible ? '—' : val + '+'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Result display */}
      {selectedS !== null && selectedD !== null && (
        <div style={{
          marginTop: '0.75rem',
          padding: '0.5rem 1rem',
          backgroundColor: highlighted !== undefined && highlighted !== null
            ? 'rgba(139,26,26,0.25)'
            : 'rgba(0,0,0,0.3)',
          border: `1px solid ${highlighted !== undefined && highlighted !== null ? '#8b1a1a' : 'rgba(200,169,110,0.2)'}`,
          borderRadius: '3px',
          textAlign: 'center',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.85rem',
        }}>
          {highlighted !== undefined && highlighted !== null ? (
            <span style={{ color: '#f4e4c1' }}>
              S{selectedS} vs D{selectedD}:{' '}
              <strong style={{ color: '#c8a96e', fontSize: '1.1rem' }}>
                {highlighted}+
              </strong>{' '}
              to wound
            </span>
          ) : (
            <span style={{ color: 'rgba(244,228,193,0.4)' }}>
              S{selectedS} vs D{selectedD}: Cannot wound
            </span>
          )}
        </div>
      )}

      <p style={{
        marginTop: '0.5rem',
        fontFamily: 'Cinzel, serif',
        fontSize: '0.65rem',
        letterSpacing: '0.08em',
        color: 'rgba(200,169,110,0.4)',
        textAlign: 'center',
        textTransform: 'uppercase',
      }}>
        Click row (S) and column (D) to highlight
      </p>
    </div>
  );
}
