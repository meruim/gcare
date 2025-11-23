import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),

    viteImagemin({
      // Optimize PNG images
      optipng: {
        optimizationLevel: 7,
      },

      // Optimize JPG/JPEG images
      mozjpeg: {
        quality: 80,
      },

      // Optimize WebP images
      webp: {
        quality: 85,
      },

      // Optimize SVG images
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
            active: false,
          },
          {
            name: "removeEmptyAttrs",
            active: true,
          },
        ],
      },

      // Optimize GIF images
      gifsicle: {
        optimizationLevel: 3,
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
  },

  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          helmet: ["react-helmet-async"],
        },
      },
    },

    chunkSizeWarningLimit: 1000,

    // Minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "react-helmet-async"],
  },
});
