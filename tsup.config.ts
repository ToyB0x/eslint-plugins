import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  format: ['cjs'],
  minify: true,
  sourcemap: true,
  external: ['espree'],
})
