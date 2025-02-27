import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["lib/**/*.ts", "lib/**/*.tsx"],
      outDir: "dist/@essercodes/r-ol",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "@essercodes/r-ol",
      // the proper extensions will be added
      fileName: "@essercodes/r-ol/r-ol",
      formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "react/jsx-runtime", /^ol($|\/)/],
    },
    copyPublicDir: false,
  },
});
