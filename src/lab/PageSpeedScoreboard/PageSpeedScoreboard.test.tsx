import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PageSpeedScoreboard, scoreBand, type PageSpeedScoreboardProps } from './PageSpeedScoreboard';

const props: PageSpeedScoreboardProps = {
  url: 'https://exemple.fr',
  date: '28 octobre 2026',
  scores: {
    mobile: { performance: 54, accessibility: 100, bestPractices: 100, seo: 88 },
    desktop: { performance: 97, accessibility: 100, bestPractices: 100, seo: 88 },
  },
};

describe('scoreBand', () => {
  it('suit les seuils de Lighthouse', () => {
    expect(scoreBand(100)).toBe('good');
    expect(scoreBand(90)).toBe('good');
    expect(scoreBand(89)).toBe('mid');
    expect(scoreBand(50)).toBe('mid');
    expect(scoreBand(49)).toBe('low');
    expect(scoreBand(0)).toBe('low');
  });
});

describe('PageSpeedScoreboard', () => {
  it('affiche les scores mobile par défaut', () => {
    render(<PageSpeedScoreboard {...props} />);
    expect(screen.getByRole('button', { name: 'Mobile' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('54')).toBeInTheDocument();
    expect(screen.queryByText('97')).not.toBeInTheDocument();
  });

  it('passe aux scores ordinateur au clic sur Bureau', async () => {
    render(<PageSpeedScoreboard {...props} />);
    await userEvent.click(screen.getByRole('button', { name: 'Bureau' }));
    expect(screen.getByRole('button', { name: 'Bureau' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Mobile' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('97')).toBeInTheDocument();
  });

  it('donne à chaque score un texte lisible par un lecteur d’écran', () => {
    render(<PageSpeedScoreboard {...props} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);
    expect(items[0]).toHaveTextContent('54 sur 100, Performances');
  });

  it('colore chaque score selon sa zone', () => {
    render(<PageSpeedScoreboard {...props} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('sui-pagespeed__item--mid');
    expect(items[1]).toHaveClass('sui-pagespeed__item--good');
  });

  it('ramène les valeurs hors limites entre 0 et 100', () => {
    render(
      <PageSpeedScoreboard
        {...props}
        scores={{
          mobile: { performance: 120, accessibility: -5, bestPractices: 99.6, seo: Number.NaN },
          desktop: props.scores.desktop,
        }}
      />,
    );
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('100 sur 100');
    expect(items[1]).toHaveTextContent('0 sur 100');
    expect(items[2]).toHaveTextContent('100 sur 100');
    expect(items[3]).toHaveTextContent('0 sur 100');
  });

  it('ouvre la source dans un nouvel onglet de façon sûre', () => {
    render(<PageSpeedScoreboard {...props} />);
    const link = screen.getByRole('link', { name: /exemple\.fr/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('ne plante pas sur une URL invalide', () => {
    render(<PageSpeedScoreboard {...props} url="pas une url" />);
    expect(screen.getByRole('link', { name: /pas une url/ })).toBeInTheDocument();
  });
});
