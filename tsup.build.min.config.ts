import { defineConfig } from "tsup";


export default defineConfig( [
  {
    entry: [
      "src/heat.ts"
    ],
    outExtension({ }) {
      return {
        js: ".min.js",
      };
    },
    platform: "neutral",
    format: [
      "cjs"
    ],
    outDir: "./dist",
    dts: false,
    splitting: false,
    sourcemap: false,
    clean: false,
    minify: "terser",
    terserOptions: {
      compress: true,
      sourceMap: false,
      format: {
        comments: false,
        shorthand: true
      }
    }
  }
] );