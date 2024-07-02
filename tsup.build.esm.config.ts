import { defineConfig } from "tsup";

export default defineConfig( [
  {
    entry: [
      "src/heat.ts"
    ],
    platform: "neutral",
    outExtension({ format }) {
      return {
        js: `.${format}.js`,
      };
    },
    format: [
      "esm"
    ],
    outDir: "./dist",
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    minify: 'terser',
    terserOptions: {
      compress: false,
      sourceMap: true,
      format: {
        beautify: true,
        comments: false
      }
    }
  }
] );