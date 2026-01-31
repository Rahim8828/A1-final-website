# Implementation Plan

- [x] 1. Setup URL Canonicalization System
  - Create canonical URL utility functions
  - Update _headers file with redirect rules for www/non-www and http/https
  - Enhance SEOHead component to always include canonical tags
  - Update all page components to pass canonical URLs
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 1.1 Create canonical URL utility module
  - Write `src/utils/canonicalURL.ts` with getCanonicalURL function
  - Implement URL normalization (remove trailing slashes, force https, remove www)
  - Add configuration object for base URL and preferences
  - _Requirements: 1.1, 1.4_

- [x] 1.2 Configure server-level redirects
  - Update `public/_headers` with 301 redirects for www to non-www
  - Add http to https redirect rules
  - Add trailing slash normalization rules
  - _Requirements: 1.1, 1.3_

- [x] 1.3 Update SEOHead component for canonical support
  - Modify `src/components/SEOHead.tsx` to make canonical prop required
  - Add automatic canonical URL generation if not provided
  - Ensure canonical link tag is always rendered
  - _Requirements: 1.2, 1.4_

- [x] 1.4 Update all page components with canonical URLs
  - Add canonical prop to Home, About, Services, Contact, Blog pages
  - Use canonicalURL utility to generate proper URLs
  - Verify all internal links use canonical format
  - _Requirements: 1.4, 1.5_

- [x] 2. Implement Performance Optimizations (LCP & FCP)
  - Add preload hints for LCP images in index.html
  - Implement critical CSS extraction and inlining
  - Defer non-critical JavaScript loading
  - Optimize font loading with font-display swap
  - Configure code splitting in Vite
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 2.1 Add LCP image preload hints
  - Update `index.html` with preload link for hero image
  - Add fetchpriority="high" attribute to LCP images
  - Identify and preload LCP images for key pages (Home, Services)
  - _Requirements: 2.2, 2.3_

- [x] 2.2 Configure critical CSS extraction
  - Install and configure vite-plugin-critical or similar
  - Update `vite.config.ts` to extract critical CSS
  - Inline critical CSS in HTML head during build
  - Load full CSS asynchronously with preload technique
  - _Requirements: 3.2, 3.3, 7.2, 7.3_

- [x] 2.3 Optimize JavaScript loading
  - Add defer attribute to Google Analytics script (already done, verify)
  - Ensure all non-critical scripts use async or defer
  - Move inline scripts to external files where beneficial
  - _Requirements: 3.1, 3.4_

- [x] 2.4 Optimize font loading
  - Add font-display: swap to font declarations in CSS
  - Preload critical fonts in index.html
  - Use system fonts as fallback during font loading
  - _Requirements: 7.4_

- [x] 2.5 Enhance Vite code splitting configuration
  - Update `vite.config.ts` manualChunks for better splitting
  - Separate vendor bundles by usage frequency
  - Implement route-based code splitting
  - _Requirements: 2.4, 3.3_

- [x] 3. Implement Modern Image Format Support
  - Create image optimization build script using Sharp
  - Generate WebP and AVIF versions of all images
  - Update OptimizedImage component to use picture element
  - Add responsive image support with srcset and sizes
  - Ensure proper width/height attributes on all images
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 3.1 Create image optimization build script
  - Write `scripts/optimizeImages.ts` using Sharp library
  - Implement conversion to WebP (85% quality) and AVIF (80% quality)
  - Generate multiple sizes: 320w, 640w, 768w, 1024w, 1280w, 1920w
  - Output optimized images to `public/assets/optimized/`
  - Add script to package.json build process
  - _Requirements: 4.2, 4.4_

- [x] 3.2 Enhance OptimizedImage component
  - Update `src/components/OptimizedImage.tsx` to use picture element
  - Add source elements for AVIF and WebP with type attributes
  - Implement srcset for responsive images
  - Make width and height props required to prevent CLS
  - Add sizes prop for responsive image selection
  - Maintain aspect ratio with CSS
  - _Requirements: 4.1, 4.3, 4.5, 6.1, 6.3, 6.4, 6.5_

- [x] 3.3 Create image helper utilities
  - Write `src/utils/imageHelpers.ts` for image URL generation
  - Implement function to generate srcset strings
  - Add function to calculate sizes attribute
  - Create helper to get optimized image paths
  - _Requirements: 6.2, 6.3_

- [x] 3.4 Update all image usages across the site
  - Replace img tags with OptimizedImage component
  - Add proper width and height to all images
  - Set priority prop for LCP images
  - Add appropriate sizes attribute for responsive images
  - _Requirements: 6.1, 6.5_

- [ ] 4. Create Custom 404 Error Page
  - Build NotFound page component with helpful navigation
  - Add search functionality
  - Include popular services links
  - Configure React Router for 404 handling
  - Style page consistently with site design
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 4.1 Create NotFound page component
  - Write `src/pages/NotFound.tsx` with error message and hero section
  - Add search bar component for site search
  - Display grid of 6 popular services with links
  - Show 3 recent blog posts
  - Include contact CTA section
  - Add breadcrumb navigation (Home > 404)
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [ ] 4.2 Configure React Router for 404 handling
  - Update `src/App.tsx` router configuration
  - Add catch-all route (*) that renders NotFound component
  - Ensure proper 404 status code is returned
  - _Requirements: 5.5_

- [ ] 5. Configure Security Headers
  - Update _headers file with HSTS and security headers
  - Create DNS configuration documentation for SPF record
  - Add Content Security Policy headers
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 5.1 Add security headers to _headers file
  - Update `public/_headers` with Strict-Transport-Security header
  - Add X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
  - Include Referrer-Policy and Permissions-Policy headers
  - Set HSTS with max-age=31536000, includeSubDomains, and preload
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 5.2 Create SPF record documentation
  - Write `docs/DNS_CONFIGURATION.md` with SPF record setup instructions
  - Document SPF record format: v=spf1 include:_spf.google.com ~all
  - Add instructions for DNS provider configuration
  - Include verification steps
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 6. Optimize HTTP Requests
  - Review and optimize Vite bundling configuration
  - Combine CSS files into single bundle
  - Implement icon optimization strategy
  - Reduce total HTTP requests to under 20
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 6.1 Optimize Vite bundling configuration
  - Update `vite.config.ts` rollupOptions for better bundling
  - Configure manualChunks to combine small modules
  - Ensure CSS is bundled into single file
  - Minimize chunk count while maintaining code splitting benefits
  - _Requirements: 10.2, 10.3_

- [ ] 6.2 Implement icon optimization
  - Audit current icon usage across the site
  - Inline critical SVG icons (< 5 icons)
  - Use lucide-react icons efficiently with tree-shaking
  - Remove unused icon imports
  - _Requirements: 10.4_

- [ ] 6.3 Audit and reduce HTTP requests
  - Use Chrome DevTools Network tab to count requests
  - Identify and eliminate unnecessary requests
  - Combine small assets where possible
  - Verify total requests are under 20 per page
  - _Requirements: 10.1, 10.5_

- [ ] 7. Implement Complete Favicon System
  - Generate multiple favicon sizes and formats
  - Create Apple touch icons
  - Add web app manifest
  - Update index.html with all favicon link tags
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 7.1 Generate favicon assets
  - Create `public/favicon.ico` (32x32 ICO format)
  - Generate `public/favicon.svg` (vector format)
  - Create `public/favicon-16x16.png`
  - Create `public/favicon-32x32.png`
  - Generate `public/apple-touch-icon.png` (180x180)
  - _Requirements: 11.1, 11.2, 11.4_

- [ ] 7.2 Create web app manifest
  - Write `public/manifest.json` with app metadata
  - Include name, short_name, icons array, theme_color, background_color
  - Add display mode and start_url
  - _Requirements: 11.3_

- [ ] 7.3 Update index.html with favicon links
  - Add link tags for all favicon sizes
  - Include SVG favicon with type="image/svg+xml"
  - Add Apple touch icon link
  - Add manifest.json link
  - Ensure proper fallback order for browser compatibility
  - _Requirements: 11.5_

- [ ] 8. Performance Monitoring Setup
  - Implement Web Vitals tracking
  - Add performance metrics to analytics
  - Create performance monitoring utilities
  - _Requirements: 2.6, 7.5_

- [ ] 8.1 Implement Web Vitals tracking
  - Install web-vitals package
  - Create `src/utils/webVitals.ts` utility
  - Track LCP, FCP, CLS, FID, TTFB metrics
  - Send metrics to Google Analytics
  - _Requirements: 2.6, 7.5_

- [ ] 8.2 Add performance monitoring to main app
  - Import and initialize Web Vitals in `src/main.tsx`
  - Configure metric reporting thresholds
  - Add console logging for development environment
  - _Requirements: 2.6, 7.5_

- [ ] 9. Testing and Validation
  - Run Lighthouse audits on all key pages
  - Verify all images load in modern formats with fallbacks
  - Test 404 page functionality
  - Validate security headers
  - Check canonical URLs on all pages
  - Verify performance metrics meet targets
  - _Requirements: All_

- [ ] 9.1 Run comprehensive Lighthouse audits
  - Test homepage, services page, about page, contact page
  - Verify SEO score is 100/100
  - Check Performance score is 90+
  - Ensure Accessibility score is 90+
  - Document any remaining issues
  - _Requirements: All_

- [ ] 9.2 Validate image optimization
  - Verify WebP/AVIF images are served to supporting browsers
  - Check fallback to JPG/PNG for older browsers
  - Confirm image file sizes reduced by 30%+
  - Test responsive images load correct sizes
  - Verify no image distortion or CLS issues
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 9.3 Test security and canonical URLs
  - Verify HSTS header is present in response
  - Check all security headers are configured
  - Test www to non-www redirects
  - Verify http to https redirects
  - Confirm canonical tags on all pages
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 9.4 Validate performance metrics
  - Measure LCP on key pages (target < 2.5s)
  - Measure FCP on key pages (target < 1.8s)
  - Count HTTP requests (target < 20)
  - Check total page size (target < 1.5MB)
  - Verify no render-blocking resources
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5, 7.1, 7.2, 7.3, 7.4, 7.5, 10.1_

- [ ] 9.5 Cross-browser testing
  - Test in Chrome, Firefox, Safari, Edge
  - Verify mobile Safari and Chrome Mobile
  - Check favicon displays correctly in all browsers
  - Confirm image formats work with fallbacks
  - Test 404 page in all browsers
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 10. Documentation and Deployment
  - Update README with SEO optimization details
  - Document build process changes
  - Create deployment checklist
  - Deploy to staging and verify
  - Deploy to production
  - _Requirements: All_

- [ ] 10.1 Update project documentation
  - Document new build scripts in README
  - Add SEO optimization section to docs
  - Document image optimization workflow
  - Include performance monitoring setup
  - _Requirements: All_

- [ ] 10.2 Create deployment checklist
  - Write deployment steps in docs/DEPLOYMENT.md
  - Include pre-deployment testing steps
  - Add post-deployment verification steps
  - Document rollback procedure
  - _Requirements: All_

- [ ] 10.3 Deploy and verify
  - Run production build locally
  - Deploy to staging environment
  - Run full Lighthouse audit on staging
  - Verify all optimizations are working
  - Deploy to production
  - Monitor performance metrics for 24 hours
  - _Requirements: All_
