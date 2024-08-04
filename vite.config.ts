import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { normalizePath } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": normalizePath(path.resolve("./src")),
      "@components": normalizePath(path.resolve("./src/components")),
      "@routes": normalizePath(path.resolve("./src/routes")),
      "@store": normalizePath(path.resolve("./src/store")),
      "@hooks": normalizePath(path.resolve("./src/hooks")),
      "@assets": normalizePath(path.resolve("./src/assets")),
      "@models": normalizePath(path.resolve("./src/models")),
      "@services": normalizePath(path.resolve("./src/services")),
      "@config": normalizePath(path.resolve("./src/config")),
    },
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.ts",
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
});
