import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Para suporte a React
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
      name: "FormWidget", // O nome global da sua biblioteca quando usada em um ambiente IIFE
      fileName: (format) => `form-widget.${format}.js`, // Define o nome do arquivo de saída
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
