import { FlatCompat } from '@eslint/eslintrc';
import jsConfig from '@eslint/js';
import prettierPlugin from 'eslint-config-prettier';
import astroPlugin from 'eslint-plugin-astro';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

/** @type {import("eslint").Linter.Config} */
export default [
  ...compat.extends('prettier'),
  ...astroPlugin.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**', 'bin/**', 'build/**'],
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: 'typescript-eslint/parser',
    },
    rules: {
      ...jsConfig.configs.recommended.rules,
    },
  },
];
