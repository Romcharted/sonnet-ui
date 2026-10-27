import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Components/Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Champ de saisie avec libellé, aide et message d'erreur. Le libellé est obligatoire, et l'aide comme l'erreur sont reliées au champ via `aria-describedby` pour être lues par les lecteurs d'écran.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Adresse e-mail',
    type: 'email',
    placeholder: 'nom@exemple.fr',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: 'Nous ne la partagerons jamais.' },
};

export const Required: Story = {
  args: { required: true },
};

export const WithError: Story = {
  args: {
    defaultValue: 'romain@',
    error: "L'adresse e-mail est incomplète.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'romain@exemple.fr' },
};
