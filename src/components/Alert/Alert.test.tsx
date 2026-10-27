import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('utilise role="alert" pour les erreurs', () => {
    render(<Alert tone="danger" title="Erreur" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Erreur');
  });

  it('utilise role="status" pour les succès', () => {
    render(<Alert tone="success" title="Enregistré" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it("n'affiche pas de bouton fermer sans onDismiss", () => {
    render(<Alert title="Info" />);
    expect(screen.queryByRole('button', { name: 'Fermer' })).not.toBeInTheDocument();
  });

  it('appelle onDismiss au clic sur Fermer', async () => {
    const onDismiss = vi.fn();
    render(<Alert title="Info" onDismiss={onDismiss} />);
    await userEvent.click(screen.getByRole('button', { name: 'Fermer' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
