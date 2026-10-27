import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Style visuel, selon l'importance de l'action. */
  variant?: ButtonVariant;
  /** Taille du bouton. */
  size?: ButtonSize;
  /** Affiche un indicateur de chargement et bloque les clics. */
  loading?: boolean;
  /** Prend toute la largeur du conteneur. */
  fullWidth?: boolean;
  /** Icône affichée avant le texte. */
  icon?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  disabled,
  className,
  children,
  type = 'button',
  ref,
  ...rest
}: ButtonProps) {
  const classes = [
    'sui-button',
    `sui-button--${variant}`,
    `sui-button--${size}`,
    fullWidth && 'sui-button--full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className="sui-button__spinner" aria-hidden="true" />
      ) : (
        icon && (
          <span className="sui-button__icon" aria-hidden="true">
            {icon}
          </span>
        )
      )}
      <span>{children}</span>
    </button>
  );
}
