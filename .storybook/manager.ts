import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'sonnet-ui',
    brandUrl: 'https://github.com/Romcharted/sonnet-ui',
    colorPrimary: '#1d4ed8',
    colorSecondary: '#1d4ed8',
  }),
});
