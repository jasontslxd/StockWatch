import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      ...configDefaults.include,
      "src/**/*.test.ts",
      "src/**/*.test.tsx",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: ["node_modules", "dist", "build", "public", "src/**/index.ts", "*.config.*", "**/*.d.ts", "src/common/enums.ts", "src/common/types.ts", "src/main.tsx"]
    },
  },
});
