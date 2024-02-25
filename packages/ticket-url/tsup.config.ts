import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  format: ['cjs'],
  minify: true,
  sourcemap: false, // reduce the npm package size by disabling sourcemaps (8MB -> 1MB)
  external: ['espree'],
})
