import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('affiche son contenu avec le ton demandé', () => {
    render(<Badge tone="success">Publié</Badge>);
    expect(screen.getByText('Publié')).toHaveClass('sui-badge--success');
  });

  it('utilise le ton neutre par défaut', () => {
    render(<Badge>Brouillon</Badge>);
    expect(screen.getByText('Brouillon')).toHaveClass('sui-badge--neutral');
  });
});
