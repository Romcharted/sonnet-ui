import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('appelle onClick au clic', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Valider</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Valider' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('est de type "button" par défaut pour ne pas soumettre un formulaire', () => {
    render(<Button>Valider</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('bloque les clics et annonce le chargement quand loading est actif', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Envoi
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applique les classes de variante et de taille', () => {
    render(
      <Button variant="danger" size="lg">
        Supprimer
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveClass('sui-button--danger', 'sui-button--lg');
  });
});
