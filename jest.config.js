module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/' // Всі файли крім axios в node_modules
  ],
};
