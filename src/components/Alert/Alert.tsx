import type { HTMLAttributes, ReactNode } from 'react';
import type { Tone } from '../Badge';
import './Alert.css';

export type AlertTone = Exclude<Tone, 'neutral'>;

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Couleur et importance du message. */
  tone?: AlertTone;
  /** Titre court, en gras. */
  title?: ReactNode;
  /** Si fourni, affiche un bouton de fermeture. */
  onDismiss?: () => void;
}

export function Alert({ tone = 'info', title, onDismiss, className, children, ...rest }: AlertProps) {
  // Les erreurs et avertissements interrompent le lecteur d'écran, les autres non.
  const role = tone === 'danger' || tone === 'warning' ? 'alert' : 'status';

  return (
    <div
      role={role}
      className={['sui-alert', `sui-alert--${tone}`, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className="sui-alert__content">
        {title && <p className="sui-alert__title">{title}</p>}
        {children && <div className="sui-alert__body">{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="sui-alert__close" aria-label="Fermer" onClick={onDismiss}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M3.3 3.3a1 1 0 0 1 1.4 0L8 6.6l3.3-3.3a1 1 0 1 1 1.4 1.4L9.4 8l3.3 3.3a1 1 0 0 1-1.4 1.4L8 9.4l-3.3 3.3a1 1 0 0 1-1.4-1.4L6.6 8 3.3 4.7a1 1 0 0 1 0-1.4Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
