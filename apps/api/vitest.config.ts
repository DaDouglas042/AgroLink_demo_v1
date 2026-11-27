import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      // Gate de cobertura: el job de CI FALLA si la cobertura baja de aquí.
      // Hoy está en 66.66% (Stmts) — el umbral deja margen para crecer.
      thresholds: {
        statements: 60,
        lines: 60,
      },
    },
  },
})
