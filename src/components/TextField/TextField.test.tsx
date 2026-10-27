import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './TextField';

describe('TextField', () => {
  it('relie le libellé au champ', () => {
    render(<TextField label="Nom" />);
    expect(screen.getByLabelText('Nom')).toBeInstanceOf(HTMLInputElement);
  });

  it("relie l'aide et l'erreur au champ et le marque invalide", () => {
    render(<TextField label="E-mail" hint="Format nom@exemple.fr" error="Adresse invalide" />);
    const input = screen.getByLabelText('E-mail');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Format nom@exemple.fr Adresse invalide');
  });

  it("n'est pas marqué invalide sans erreur", () => {
    render(<TextField label="E-mail" />);
    expect(screen.getByLabelText('E-mail')).not.toHaveAttribute('aria-invalid');
  });

  it('accepte la saisie', async () => {
    render(<TextField label="Ville" />);
    const input = screen.getByLabelText('Ville');
    await userEvent.type(input, 'Lyon');
    expect(input).toHaveValue('Lyon');
  });
});
