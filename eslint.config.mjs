import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import tailwind from 'eslint-plugin-tailwindcss';
import zod from 'eslint-plugin-zod';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals',
    'next/typescript',
    'prettier',
    'plugin:tailwindcss/recommended'),
  {
    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'zod/require-strict': 2,
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'error'
    },
    plugins: { tailwind, zod }
  }
];

export default eslintConfig;
