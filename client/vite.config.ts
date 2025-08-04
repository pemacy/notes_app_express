/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { loadEnv } from "vite";
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    env: loadEnv("", process.cwd(), ""),
    globals: true,
    setupFiles: './src/tests/testSetup.ts',
    reporters: ['verbose']
  }
})
