module.exports = {
  presets: ['module:@react-native/babel-preset'],
  overrides: [
    {
      test: ['./src/database/**/*.js'],
      plugins: [],
    },
  ],
};
