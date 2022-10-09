/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve(__dirname, "src"),
    },
  },
  plugins: [],
  build: {
    target: "esnext",
    minify: false,
    lib: {
      entry: resolve(__dirname, "src", "index.tsx"),
      formats: ["es"],
    },
  },
  test: {
    environment: "happy-dom",
    globals: true,
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    setupFiles: "./test/setup-test-env.ts",
    // if you have few tests, try commenting one
    // or both out to improve performance:
    threads: false,
    isolate: false,
    include: ["/**/*.test.{ts,tsx}"],
    watchExclude: [".*\\/node_modules\\/.*", ".*\\/dist\\/.*"],
  },
});
