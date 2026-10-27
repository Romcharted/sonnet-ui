import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? 'light';
  document.documentElement.dataset.theme = theme;
  return <Story />;
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Thème des composants',
      toolbar: {
        title: 'Thème',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Clair' },
          { value: 'dark', title: 'Sombre' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', 'Components', ['Actions', 'Forms', 'Feedback']],
      },
    },
  },
};

export default preview;
