
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
// import sitemap from 'vite-plugin-sitemap'; // Replaced with custom sitemap generation
import { blogPosts } from './blog/data/blogPosts';
import { pagesData } from './src/data/generatedPagesData';

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
  '/products'
];

// Add all 150 generated service pages to sitemap
const generatedServiceRoutes = pagesData.map(page => page.url);

const dynamicRoutes = [...blogPostRoutes, ...staticRoutes, ...generatedServiceRoutes];


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'assets',
          dest: '.'
        },
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
          // Core React libraries - loaded on every page
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom')) {
            return 'react-vendor';
          }
          
          // UI libraries - icons and components
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          
          // SEO and meta libraries
          if (id.includes('node_modules/react-helmet-async')) {
            return 'seo-vendor';
          }
          
          // Markdown and content libraries (used in blog)
          if (id.includes('node_modules/react-markdown') || 
              id.includes('node_modules/remark-gfm')) {
            return 'markdown-vendor';
          }
          
          // Route-based code splitting for pages
          if (id.includes('src/pages/')) {
            const pageName = id.split('src/pages/')[1].split('.')[0];
            // Don't bundle generated pages together - let them be lazy loaded individually
            return `page-${pageName.toLowerCase()}`;
          }
          
          // Component chunks for lazy-loaded components
          if (id.includes('src/components/ExitIntentPopup') ||
              id.includes('src/components/OurProcess') ||
              id.includes('src/components/StatsCounter')) {
            return 'lazy-components';
          }
          
          // Data modules - shared across generated pages
          if (id.includes('src/data/contentTemplates') ||
              id.includes('src/data/pageDataGenerator') ||
              id.includes('src/data/generatedPagesConfig')) {
            return 'page-data';
          }
          
          // Generated pages data - separate chunk
          if (id.includes('src/data/generatedPagesData')) {
            return 'generated-data';
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
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  }
});
