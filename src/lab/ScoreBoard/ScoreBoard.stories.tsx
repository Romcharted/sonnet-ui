import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ScoreBoard } from './ScoreBoard';

const meta = {
  title: 'Lab/ScoreBoard',
  component: ScoreBoard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Affiche les scores PageSpeed Insights d'un site, sur mobile ou sur ordinateur, avec les seuils de couleur de Lighthouse. Utilisé sur les pages projets de [romain-sonnet.fr](https://romain-sonnet.fr). Le composant reçoit les scores en props : il n'appelle pas l'API, ce qui permet de montrer chaque cas ici sans dépendre de Google.",
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
    url: 'https://didtap.com',
    date: '27 octobre 2026',
    note: "Le SEO est à 63 parce que le site est volontairement en noindex : il ne sera indexé qu'à la sortie de l'appli.",
    scores: {
      mobile: { performance: 99, accessibility: 100, bestPractices: 100, seo: 63 },
      desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 63 },
    },
  },
} satisfies Meta<typeof ScoreBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Les vrais scores de didtap.com. */
export const Didtap: Story = {};

/** Les vrais scores de crystalshredder.com : la performance mobile passe à 91. */
export const CrystalShredder: Story = {
  args: {
    url: 'https://crystalshredder.com',
    note: "Le SEO est à 63 parce que le site est volontairement en noindex : il ne sera indexé qu'à la sortie du jeu.",
    scores: {
      mobile: { performance: 91, accessibility: 100, bestPractices: 100, seo: 63 },
      desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 63 },
    },
  },
};

/** Un site moyen : la plupart des scores sont dans la zone orange. */
export const NeedsWork: Story = {
  args: {
    url: 'https://exemple.fr',
    note: undefined,
    scores: {
      mobile: { performance: 54, accessibility: 82, bestPractices: 78, seo: 92 },
      desktop: { performance: 76, accessibility: 82, bestPractices: 78, seo: 92 },
    },
  },
};

/** Un site en difficulté, avec des scores sous 50. */
export const Poor: Story = {
  args: {
    url: 'https://exemple.fr',
    note: 'Images non optimisées et scripts tiers bloquants.',
    scores: {
      mobile: { performance: 23, accessibility: 45, bestPractices: 58, seo: 70 },
      desktop: { performance: 41, accessibility: 45, bestPractices: 58, seo: 70 },
    },
  },
};

/** Ouvre directement sur les scores ordinateur. */
export const DesktopFirst: Story = {
  args: { defaultDevice: 'desktop' },
};

/** Test d'interaction : passer sur Bureau affiche les scores ordinateur. */
export const SwitchDevice: Story = {
  args: {
    scores: {
      mobile: { performance: 54, accessibility: 82, bestPractices: 78, seo: 92 },
      desktop: { performance: 97, accessibility: 82, bestPractices: 78, seo: 92 },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('54')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Bureau' }));
    await expect(canvas.getByRole('button', { name: 'Bureau' })).toHaveAttribute('aria-pressed', 'true');
    await expect(canvas.getByText('97')).toBeInTheDocument();
  },
};
