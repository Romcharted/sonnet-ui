import { useId, type InputHTMLAttributes, type Ref } from 'react';
import './TextField.css';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Libellé visible, obligatoire pour l'accessibilité. */
  label: string;
  /** Aide affichée sous le champ. */
  hint?: string;
  /** Message d'erreur. Quand il est présent, le champ est marqué invalide. */
  error?: string;
  ref?: Ref<HTMLInputElement>;
}

export function TextField({
  label,
  hint,
  error,
  id,
  required,
  className,
  ref,
  ...rest
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={['sui-field', error && 'sui-field--invalid', className].filter(Boolean).join(' ')}>
      <label className="sui-field__label" htmlFor={inputId}>
        {label}
        {required && (
          <span className="sui-field__required" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>
      <input
        ref={ref}
        id={inputId}
        className="sui-field__input"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint && (
        <p id={hintId} className="sui-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="sui-field__error">
          {error}
        </p>
      )}
    </div>
  );
}
