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
      outDir: "dist",
    }),
  ],
  build: {
    lib: {
      entry: {
        index:  resolve(__dirname, "lib/index.ts"),
        "context/index":  resolve(__dirname, "lib/context/index.ts"),
        "layer/index":  resolve(__dirname, "lib/layer/index.ts"),
        "source/index":  resolve(__dirname, "lib/source/index.ts"),
        "source/interaction":  resolve(__dirname, "lib/interaction/index.ts"),
      },
      name: "@essercodes/r-ol",
      // the proper extensions will be added
      formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "react/jsx-runtime", /^ol($|\/)/],
    },
    copyPublicDir: false,
    emptyOutDir: true,
  },
});
