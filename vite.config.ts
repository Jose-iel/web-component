import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "FormWidget",
      fileName: (format) => `form-widget.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        format: "iife",
        name: "FormWidget",
        sourcemap: true,
        globals: {},
      },
    },
    minify: "terser",
  },
});
