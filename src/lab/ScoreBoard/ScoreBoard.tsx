import { useEffect, useState, type ReactNode } from 'react';
import './ScoreBoard.css';

export type Device = 'mobile' | 'desktop';

/** Les quatre catégories Lighthouse, notées sur 100. */
export interface CategoryScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface ScoreBoardProps {
  /** Scores mesurés sur mobile et sur ordinateur. */
  scores: Record<Device, CategoryScores>;
  /** Adresse du site mesuré. */
  url: string;
  /** Date de la mesure, déjà formatée pour l'affichage. */
  date: string;
  /** Explication d'un score, affichée avant la source. */
  note?: ReactNode;
  /** Appareil affiché au premier rendu. */
  defaultDevice?: Device;
  className?: string;
}

const CATEGORIES: { key: keyof CategoryScores; label: string }[] = [
  { key: 'performance', label: 'Performances' },
  { key: 'accessibility', label: 'Accessibilité' },
  { key: 'bestPractices', label: 'Bonnes pratiques' },
  { key: 'seo', label: 'SEO' },
];

const DEVICES: { key: Device; label: string }[] = [
  { key: 'mobile', label: 'Mobile' },
  { key: 'desktop', label: 'Bureau' },
];

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export type ScoreBand = 'good' | 'mid' | 'low';

/** Les seuils de Lighthouse : 90 et plus est bon, de 50 à 89 est à améliorer, moins de 50 est mauvais. */
export function scoreBand(score: number): ScoreBand {
  if (score >= 90) return 'good';
  if (score >= 50) return 'mid';
  return 'low';
}

/** Ramène une valeur reçue à un entier entre 0 et 100. */
function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.round(Math.min(100, Math.max(0, value)));
}

/** Affiche le domaine de l'URL, ou l'URL brute si elle est invalide. */
function displayHost(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/** Les scores PageSpeed Insights d'un site, sur mobile ou sur ordinateur. */
export function ScoreBoard({
  scores,
  url,
  date,
  note,
  defaultDevice = 'mobile',
  className,
}: ScoreBoardProps) {
  const [device, setDevice] = useState<Device>(defaultDevice);
  // Les anneaux partent de zéro puis se remplissent après le premier rendu.
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const values = scores[device];

  return (
    <div className={['sui-scoreboard', className].filter(Boolean).join(' ')}>
      <div className="sui-scoreboard__devices" role="group" aria-label="Appareil mesuré">
        {DEVICES.map((d) => (
          <button
            key={d.key}
            type="button"
            aria-pressed={device === d.key}
            onClick={() => setDevice(d.key)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <ul className="sui-scoreboard__list" aria-live="polite">
        {CATEGORIES.map(({ key, label }) => {
          const value = clampScore(values[key]);
          const offset = filled ? CIRCUMFERENCE * (1 - value / 100) : CIRCUMFERENCE;
          return (
            <li key={key} className={`sui-scoreboard__item sui-scoreboard__item--${scoreBand(value)}`}>
              <div className="sui-scoreboard__gauge">
                <svg viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r={RADIUS} className="sui-scoreboard__track" />
                  <circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    className="sui-scoreboard__ring"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                  />
                </svg>
                <span className="sui-scoreboard__value">
                  {value}
                  <span className="sui-scoreboard__sr"> sur 100, </span>
                </span>
              </div>
              <span className="sui-scoreboard__label">{label}</span>
            </li>
          );
        })}
      </ul>

      <p className="sui-scoreboard__note">
        {note && <>{note} </>}
        Mesuré avec PageSpeed Insights le {date}, sur{' '}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {displayHost(url)}
          <span className="sui-scoreboard__sr"> (nouvel onglet)</span>
        </a>
        .
      </p>
    </div>
  );
}
