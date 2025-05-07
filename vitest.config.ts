import { configDefaults, defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  test: {
    include: [
      ...configDefaults.include,
      'src/**/*.test.ts',
      'src/**/*.test.tsx',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules',
        'dist',
        'build',
        'public',
        'src/**/index.ts',
        '*.config.*',
        '**/*.d.ts',
        'src/common/enums.ts',
        'src/common/types.ts',
        'src/main.tsx',
      ],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      hooks: path.resolve(__dirname, './src/hooks'),
      common: path.resolve(__dirname, './src/common'),
      pages: path.resolve(__dirname, './src/pages'),
      contexts: path.resolve(__dirname, './src/contexts'),
      firestore: path.resolve(__dirname, './src/firestore'),
      mocks: path.resolve(__dirname, './mocks'),
    },
  },
  plugins: [tsconfigPaths()],
});
