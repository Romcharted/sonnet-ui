import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { PageSpeedScoreboard } from './PageSpeedScoreboard';

const meta = {
  title: 'Lab/PageSpeed Scoreboard',
  component: PageSpeedScoreboard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Affiche les quatre scores PageSpeed Insights d'un site : performances, accessibilité, bonnes pratiques et SEO. Le switch passe des scores mobile aux scores bureau, et les anneaux s'animent à l'affichage puis à chaque changement. Les couleurs suivent les seuils de Lighthouse : vert à partir de 90, orange de 50 à 89, rouge en dessous.\n\nPour rejouer l'animation d'entrée, utilise le bouton *Remount component* de la barre d'outils.",
      },
    },
  },
  argTypes: {
    // La date est un texte déjà formaté, pas une date à choisir dans un calendrier.
    date: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    url: 'https://exemple.fr',
    date: '28 octobre 2026',
    scores: {
      mobile: { performance: 78, accessibility: 96, bestPractices: 100, seo: 92 },
      desktop: { performance: 98, accessibility: 96, bestPractices: 100, seo: 100 },
    },
  },
} satisfies Meta<typeof PageSpeedScoreboard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Un site en bonne forme. Passe sur Bureau pour voir les anneaux se remplir. */
export const Default: Story = {};

/** Des scores dans la zone orange. */
export const NeedsWork: Story = {
  args: {
    scores: {
      mobile: { performance: 54, accessibility: 82, bestPractices: 78, seo: 85 },
      desktop: { performance: 76, accessibility: 82, bestPractices: 78, seo: 85 },
    },
  },
};

/** Des scores sous 50, dans la zone rouge. */
export const Poor: Story = {
  args: {
    scores: {
      mobile: { performance: 23, accessibility: 45, bestPractices: 58, seo: 70 },
      desktop: { performance: 41, accessibility: 45, bestPractices: 58, seo: 70 },
    },
  },
};

/** Test d'interaction : le switch passe de Mobile à Bureau puis revient. */
export const SwitchDevice: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mobile = canvas.getByRole('button', { name: 'Mobile' });
    const desktop = canvas.getByRole('button', { name: 'Bureau' });

    await expect(mobile).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByText('78')).toBeInTheDocument();

    await userEvent.click(desktop);
    await expect(desktop).toHaveAttribute('aria-pressed', 'true');
    await waitFor(() => expect(canvas.getByText('98')).toBeInTheDocument());

    await userEvent.click(mobile);
    await expect(mobile).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByText('78')).toBeInTheDocument();
  },
};
