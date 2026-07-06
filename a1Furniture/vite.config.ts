
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import fs from 'fs';
// import sitemap from 'vite-plugin-sitemap'; // Replaced with custom sitemap generation
import { blogPosts } from './blog/data/blogPosts';
import { pagesData } from './src/data/generatedPagesData';
import { seoGapPagePaths } from './src/routes/seoGapRoutes';

const blogPostRoutes = blogPosts.map(post => `/blog/${post.slug}`);
const staticRoutes = [
  '/about',
  '/services',
  '/blog',
  '/contact',
  '/services/wooden-furniture-polish',
  '/sofa-chair-polishing',
  '/services/table-and-bed-polishing',
  '/services/antique-restoration',
  '/services/commercial-polishing',
  '/sofa-fabric-change',
  '/office-chair-repair',
  '/goregaon-furniture-polish',
  '/powai-furniture-polish',
  '/dadar',
  '/products',
  '/wood-polishing-services',
  '/deco-paint-services'
];

// Add all 150 generated service pages to sitemap
const generatedServiceRoutes = pagesData.map(page => page.url);

const dynamicRoutes = [...blogPostRoutes, ...staticRoutes, ...generatedServiceRoutes, ...seoGapPagePaths];


// Custom plugin to serve ../assets as /products during dev
function serveExternalAssets() {
  const assetsRoot = path.resolve(__dirname, '../assets');
  return {
    name: 'serve-product-images',
    configureServer(server: any) {
      // Serve /media/* from ../assets root (videos, banners)
      server.middlewares.use('/media', (req: any, res: any, next: any) => {
        const filePath = path.join(assetsRoot, decodeURIComponent(req.url || ''));
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes: Record<string, string> = {
            '.mp4': 'video/mp4', '.webm': 'video/webm',
            '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
            '.webp': 'image/webp',
          };
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
      // Serve /products/* from ../assets subfolders
      server.middlewares.use('/products', (req: any, res: any, next: any) => {
        const filePath = path.join(assetsRoot, decodeURIComponent(req.url || ''));
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes: Record<string, string> = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.webp': 'image/webp',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
          };
          res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          fs.createReadStream(filePath).pipe(res);
        } else {
          next();
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    serveExternalAssets(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/favicon.ico',
          dest: '.'
        },
        {
          src: 'public/favicon-16x16.png',
          dest: '.'
        },
        {
          src: 'public/favicon-32x32.png',
          dest: '.'
        },
        {
          src: 'public/apple-touch-icon.png',
          dest: '.'
        },
        {
          src: 'public/android-chrome-192x192.png',
          dest: '.'
        },
        {
          src: 'public/android-chrome-512x512.png',
          dest: '.'
        },
        {
          src: 'public/site.webmanifest',
          dest: '.'
        },
        {
          src: 'public/browserconfig.xml',
          dest: '.'
        },
        {
          src: 'public/robots.txt',
          dest: '.'
        },
        {
          src: 'public/_redirects',
          dest: '.'
        }
      ]
    }),
    // sitemap({ 
    //   hostname: 'https://a1furniturepolish.com', 
    //   dynamicRoutes
    // }), // Replaced with custom optimized sitemap generation
  ],
  build: {
    // Optimize build output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    },
    // Enhanced code splitting for better performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // All node_modules go into vendor chunk to avoid circular dependencies
          if (id.includes('node_modules/')) {
            // Markdown libraries - separate chunk (only used in blog)
            if (id.includes('node_modules/react-markdown') || 
                id.includes('node_modules/remark-gfm')) {
              return 'markdown-vendor';
            }
            // Everything else from node_modules → single vendor chunk
            return 'vendor';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Source maps for production debugging (optional)
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Optimize CSS
    cssMinify: true
  },
  // Dev server: serve parent assets folder as /products
  server: {
    fs: {
      allow: ['.', '..'],
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  }
});
