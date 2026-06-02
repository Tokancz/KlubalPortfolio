import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  // imagetools resizes + recompresses project renders at import time (dev and
  // build), reading the committed originals read-only — see src/data/projects.ts.
  plugins: [vue(), imagetools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Make mixins (no CSS output until used) available in every
        // <style lang="scss"> block without an explicit @use line.
        additionalData: `@use "@/assets/styles/_mixins.scss" as *;`,
      },
    },
  },
})
