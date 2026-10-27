import type { HTMLAttributes } from 'react';
import './Badge.css';

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Couleur sémantique du badge. */
  tone?: Tone;
}

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return (
    <span
      className={['sui-badge', `sui-badge--${tone}`, className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}
