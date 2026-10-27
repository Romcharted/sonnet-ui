import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "Étiquette courte qui indique un statut. La couleur ne doit jamais être la seule information : le texte doit suffire à comprendre le statut.",
      },
    },
  },
  args: { children: 'Brouillon' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge tone="neutral">Brouillon</Badge>
      <Badge tone="info">En revue</Badge>
      <Badge tone="success">Publié</Badge>
      <Badge tone="warning">Expire bientôt</Badge>
      <Badge tone="danger">Rejeté</Badge>
    </div>
  ),
};
