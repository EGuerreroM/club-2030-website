/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  bracketSameLine: true,
  endOfLine: 'lf',
  printWidth: 128,
  singleQuote: true,
  tabWidth: 2,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
