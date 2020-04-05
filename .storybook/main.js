module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    {
      name: '@storybook/preset-create-react-app',
      options: {
        craOverrides: {
          fileLoaderExcludes: ['less'],
        },
      },
    },
    '@storybook/preset-typescript',
    '@storybook/preset-ant-design',
    '@storybook/addon-storysource',
    '@storybook/addon-actions',
    '@storybook/addon-links',
  ],
};
