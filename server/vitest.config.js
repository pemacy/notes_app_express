import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig({
  test: {
    setupFiles: ["./src/tests/testSetup.ts"],
    env: loadEnv("", process.cwd(), ""),
    globals: true,
    reporters: [["default", { summary: false }]],
  },
});
