import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    convey: {
      serverUrl: 'http://localhost:3335',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
