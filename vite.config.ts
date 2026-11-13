import { defineConfig } from "vite";
import path from "path";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact({ reactAliasesEnabled: false })],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: "es2022",
    outDir: "dist",
    sourcemap: "hidden",
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
