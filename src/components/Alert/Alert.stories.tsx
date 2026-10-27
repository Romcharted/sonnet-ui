import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Alert } from './Alert';

const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Message important lié à la page ou à une action. Les tons `danger` et `warning` utilisent `role=\"alert\"` et sont annoncés immédiatement par les lecteurs d'écran. Les tons `info` et `success` utilisent `role=\"status\"`, plus discret.",
      },
    },
  },
  args: {
    title: 'Profil mis à jour',
    children: 'Vos modifications sont visibles par les autres membres.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { tone: 'info', title: 'Maintenance prévue', children: 'Le service sera indisponible dimanche de 2h à 4h.' },
};

export const Success: Story = {
  args: { tone: 'success' },
};

export const Warning: Story = {
  args: { tone: 'warning', title: 'Abonnement bientôt expiré', children: 'Il reste 3 jours sur votre essai gratuit.' },
};

export const Danger: Story = {
  args: { tone: 'danger', title: 'Paiement refusé', children: 'Vérifiez les informations de votre carte.' },
};

export const Dismissible: Story = {
  args: { tone: 'info', onDismiss: fn() },
};

export const TitleOnly: Story = {
  args: { tone: 'success', children: undefined },
};
