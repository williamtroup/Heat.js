import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: [
      "src/heat.ts"
    ],
    platform: "neutral",
    format: [
      "esm",
      "cjs"
    ],
    outDir: "./dist",
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    clean: false
  }
]);