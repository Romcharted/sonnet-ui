import type { CSSProperties } from 'react';

const cell: CSSProperties = { padding: '8px 12px', borderBottom: '1px solid #e2e8f0', textAlign: 'left' };

/** Affiche une liste de tokens couleur avec un aperçu. */
export function ColorTokens({ tokens }: { tokens: { name: string; usage: string }[] }) {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={cell}>Aperçu</th>
          <th style={cell}>Token</th>
          <th style={cell}>Usage</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((t) => (
          <tr key={t.name}>
            <td style={cell}>
              <span
                style={{
                  display: 'inline-block',
                  width: 40,
                  height: 24,
                  borderRadius: 4,
                  border: '1px solid #94a3b8',
                  background: `var(${t.name})`,
                }}
              />
            </td>
            <td style={cell}>
              <code>{t.name}</code>
            </td>
            <td style={cell}>{t.usage}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Affiche l'échelle d'espacement sous forme de barres. */
export function SpacingTokens({ steps }: { steps: number[] }) {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <tbody>
        {steps.map((s) => (
          <tr key={s}>
            <td style={cell}>
              <code>--sui-space-{s}</code>
            </td>
            <td style={cell}>{s * 4}px</td>
            <td style={{ ...cell, width: '60%' }}>
              <span
                style={{
                  display: 'block',
                  height: 12,
                  width: `var(--sui-space-${s})`,
                  background: 'var(--sui-color-primary)',
                  borderRadius: 2,
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
