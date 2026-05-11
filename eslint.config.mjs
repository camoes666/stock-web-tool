import nextPlugin from '@next/eslint-plugin-next'
import tseslint from 'typescript-eslint'

const eslintConfig = [
  {
    ignores: ['.next/**', '.worktrees/**', 'node_modules/**', 'next-env.d.ts']
  },
  ...tseslint.configs.recommended,
  {
    files: ['*.js', '*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  },
  nextPlugin.configs['core-web-vitals']
]

export default eslintConfig
