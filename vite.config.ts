import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
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
