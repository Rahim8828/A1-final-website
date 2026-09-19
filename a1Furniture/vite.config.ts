
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import sitemap from 'vite-plugin-sitemap'; // Replaced with custom sitemap generation
// Dynamic route calculation for sitemap plugin removed (custom generator used instead)


// Simplified plugin - only serve local assets (no external backup needed)
function serveExternalAssets() {
  const localAssetsRoot = path.resolve(__dirname, 'assets');

  const mimeTypes: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ico': 'image/x-icon',
    '.js': 'application/javascript',
    '.css': 'text/css',
  };

  return {
    name: 'serve-local-assets',
    configureServer(server: any) {
      // Serve only local assets folder
      server.middlewares.use((req: any, res: any, next: any) => {
        let url = req.url?.split('?')[0] || '';
        try {
          url = decodeURIComponent(url);
        } catch (e) {}

        // Only handle /assets/ requests
        if (!url.startsWith('/assets/')) {
          return next();
        }

        const relative = url.slice(8); // Remove '/assets/'
        const filePath = path.join(localAssetsRoot, relative);
        
        // Security: ensure path is within assets root
        if (!filePath.startsWith(localAssetsRoot)) {
          return next();
        }

        // Serve file if it exists
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          if (req.method === 'HEAD') {
            return res.end();
          }
          return fs.createReadStream(filePath).pipe(res);
        }

        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  build: {
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        // Manual chunking: group heavy libraries so routes stay small
        manualChunks(id) {
          // Core React ecosystem → vendor-react chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // React Router → vendor-router chunk
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // UI libraries
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) {
            return 'vendor-icons';
          }
          // Other heavy dependencies
          if (id.includes('node_modules/react-helmet-async')) {
            return 'vendor-seo';
          }
          if (id.includes('node_modules/react-leaflet') || id.includes('node_modules/leaflet')) {
            return 'vendor-map';
          }
          // Page templates — shared by many route chunks
          if (id.includes('/src/components/ServicePageTemplate') ||
              id.includes('/src/components/SofaRepairPageTemplate') ||
              id.includes('/src/components/BedRepairPageTemplate')) {
            return 'templates';
          }
          // Data files that are large
          if (id.includes('/src/data/sofaRepairConfig') ||
              id.includes('/src/data/bedRepairConfig') ||
              id.includes('/src/data/seoGapPagesData') ||
              id.includes('/src/data/servicePageData')) {
            return 'page-data';
          }
        },
      },
    },
  },
  // Dev server configuration
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    cors: true,
    fs: {
      allow: ['..'], // Allow parent directory for blog imports
      strict: false
    },
    // Improve watch performance
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/.vite/**'],
      usePolling: false
    },
    // Faster HMR
    hmr: {
      overlay: true
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    holdUntilCrawlEnd: false,
    entries: ['index.html', 'src/main.tsx'],
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'react-helmet-async', 'react-icons'],
    exclude: ['@sparticuz/chromium', 'puppeteer-core', 'sharp', 'node-html-to-image']
  }
}));
