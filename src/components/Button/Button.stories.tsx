import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Déclenche une action. Un seul bouton `primary` par zone d'écran : c'est l'action principale. `danger` est réservé aux actions destructrices.",
      },
    },
  },
  args: {
    children: 'Enregistrer',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Annuler' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'En savoir plus' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Supprimer le compte' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm">
        Petit
      </Button>
      <Button {...args} size="md">
        Moyen
      </Button>
      <Button {...args} size="lg">
        Grand
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2H9v5a1 1 0 1 1-2 0V9H2a1 1 0 0 1 0-2h5V2a1 1 0 0 1 1-1Z" />
      </svg>
    ),
    children: 'Ajouter',
  },
};

export const Loading: Story = {
  args: { loading: true, children: 'Envoi en cours' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
