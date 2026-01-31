# Implementation Plan

- [x] 1. Set up data structures and TypeScript interfaces
  - Create TypeScript interfaces for PageData, ServiceItem, ProcessStep, PricingInfo, BenefitItem, FAQItem, and RelatedService
  - Define service categories array (20 categories)
  - Define Mumbai locations array (41 locations)
  - Define title variations configuration
  - _Requirements: 1.2, 5.1, 5.2_

- [x] 2. Create SEO and schema utility functions
  - [x] 2.1 Implement URL slug generation function
    - Create function to convert service name and location to kebab-case URL
    - Handle special characters and spaces
    - Ensure uniqueness
    - _Requirements: 1.5_

  - [x] 2.2 Implement schema markup generator
    - Create LocalBusiness schema generator
    - Create Service schema generator
    - Create BreadcrumbList schema generator
    - Validate JSON-LD output
    - _Requirements: 2.5_

  - [x] 2.3 Implement SEO meta tag generator
    - Create function to generate meta title with keywords
    - Create function to generate meta description (150-160 chars)
    - Create function to generate Open Graph tags
    - _Requirements: 2.1, 2.2, 2.7_

- [x] 3. Create ServicePageTemplate component
  - [x] 3.1 Build main template component structure
    - Create ServicePageTemplate.tsx component
    - Accept PageData as props
    - Set up component sections structure
    - _Requirements: 4.1, 4.2_

  - [x] 3.2 Implement SEO head section
    - Integrate SEOHead component with page data
    - Render meta tags, title, canonical URL
    - Render JSON-LD schema markup
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6, 2.7_

  - [x] 3.3 Implement hero section
    - Render H1 with location and service keywords
    - Render introduction paragraph
    - Add primary CTA button
    - _Requirements: 2.3, 3.1, 10.1_

  - [x] 3.4 Implement content sections
    - Create ServiceListSection component
    - Create ProcessSection component
    - Create LocationCoverageSection component
    - Create PricingSection component
    - Create WhyChooseUsSection component
    - Integrate existing FAQSection component
    - Create RelatedServicesSection component
    - Add CTAs throughout sections
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 10.2_

  - [x] 3.5 Implement responsive design
    - Add mobile-specific styles
    - Ensure touch-friendly buttons (min 44px)
    - Ensure readable fonts (min 16px)
    - Add sticky floating CTA for mobile
    - Test no horizontal scroll on mobile
    - _Requirements: 4.4, 8.1, 8.2, 8.3, 8.5, 10.4_

  - [x] 3.6 Add internal linking
    - Implement related services links
    - Implement location-specific links
    - Add breadcrumb navigation
    - Use descriptive anchor text with keywords
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 4. Create page data configuration
  - [x] 4.1 Build page data generator function
    - Create function to generate PageData for each service/location/variation combination
    - Phase 1: Generate 80 pages (20 categories × 4 variations with "Mumbai" location)
    - Phase 2: Generate 70 pages (balanced distribution across specific locations)
    - Implement smart location distribution logic (3-4 pages per category)
    - Generate unique content for each page (150 total)
    - Ensure word count 1000-1500 per page
    - _Requirements: 1.2, 1.3, 3.9_

  - [x] 4.2 Generate content templates
    - Create introduction paragraph templates
    - Create service list templates for each category
    - Create process step templates
    - Create pricing information templates
    - Create "Why Choose Us" content templates
    - Create FAQ templates for each service category
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.6, 3.7_

  - [x] 4.3 Create generatedPagesData.ts file
    - Generate all 150 PageData objects (80 Mumbai + 70 location-specific)
    - Validate data completeness
    - Export pagesData array
    - _Requirements: 1.1, 5.2, 5.5_

- [x] 5. Build page generator script
  - [x] 5.1 Create generatePages.ts script
    - Set up Node.js script with TypeScript
    - Import page data configuration
    - Create file system utilities
    - _Requirements: 6.1_

  - [x] 5.2 Implement page file generation
    - Create function to generate React component code
    - Implement proper file naming (PascalCase)
    - Create pages in src/pages/generated/ directory
    - Validate generated TypeScript syntax
    - _Requirements: 1.4, 6.2, 6.3, 6.4_

  - [x] 5.3 Implement routing configuration update
    - Generate route definitions for all 150 pages
    - Update App.tsx or routes file with new routes
    - Implement lazy loading for generated pages
    - _Requirements: 6.5, 7.3_

  - [x] 5.4 Add validation and error handling
    - Validate all required fields in page data
    - Check for duplicate URLs
    - Handle file system errors gracefully
    - Log errors with details
    - _Requirements: 5.5_

  - [x] 5.5 Add generation summary output
    - Count generated files
    - List any errors or warnings
    - Display generation statistics
    - _Requirements: 6.6_

- [x] 6. Checkpoint - Ensure all tests pass, ask the user if questions arise

- [x] 7. Optimize for performance
  - [x] 7.1 Implement code splitting
    - Configure lazy loading for generated pages
    - Set up React.lazy() imports
    - _Requirements: 7.3_

  - [x] 7.2 Optimize images
    - Ensure OptimizedImage component is used
    - Implement lazy loading for images
    - _Requirements: 7.2_

  - [x] 7.3 Minimize bundle size
    - Extract common data to shared modules
    - Remove duplicate code
    - Analyze bundle size
    - _Requirements: 7.4_

- [x] 8. Run generator and create all pages
  - [x] 8.1 Execute page generator script
    - Run generatePages.ts script
    - Verify 150 files created (80 Mumbai + 70 location-specific)
    - Check for any errors
    - _Requirements: 1.1, 6.1_

  - [x] 8.2 Verify generated pages
    - Check file naming conventions
    - Verify directory structure
    - Test TypeScript compilation
    - Verify Phase 1 (Mumbai pages) and Phase 2 (location-specific) both complete
    - _Requirements: 1.4, 6.2, 6.3_

  - [x] 8.3 Test routing configuration
    - Verify all 150 routes are registered
    - Test navigation to generated pages
    - Verify lazy loading works
    - _Requirements: 6.5_

- [x] 9. Validate SEO implementation
  - [x] 9.1 Test SEO elements on sample pages
    - Verify meta titles are unique and contain keywords
    - Verify meta descriptions are 150-160 characters
    - Verify H1 tags contain location and service keywords
    - Verify canonical URLs are correct
    - Verify Open Graph tags are present
    - _Requirements: 2.1, 2.2, 2.3, 2.6, 2.7_

  - [x] 9.2 Validate schema markup
    - Test JSON-LD with Google Rich Results Test
    - Verify LocalBusiness schema is valid
    - Verify Service schema is valid
    - _Requirements: 2.5_

  - [x] 9.3 Test internal linking
    - Verify related service links work
    - Verify location links work
    - Verify breadcrumbs work
    - Check all internal links are valid
    - _Requirements: 9.1, 9.2, 9.3, 9.5_

- [x] 10. Test responsive design and mobile experience
  - [x] 10.1 Test mobile layouts
    - Test on various mobile screen sizes
    - Verify no horizontal scroll
    - Verify touch-friendly buttons
    - Verify readable font sizes
    - Test sticky floating CTA
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 10.4_

  - [x] 10.2 Test CTAs and booking flow
    - Verify CTAs above the fold
    - Verify CTAs throughout page
    - Test CTA click functionality
    - Verify booking modal/WhatsApp opens
    - Verify contact options are present
    - _Requirements: 10.1, 10.2, 10.3, 10.5_

- [x] 11. Performance testing and optimization
  - [x] 11.1 Run Lighthouse audits
    - Test 3-5 sample pages
    - Verify performance score > 90
    - Verify mobile score > 90
    - Check First Contentful Paint < 1.5s
    - _Requirements: 7.1, 7.5, 8.4_

  - [x] 11.2 Optimize based on results
    - Address any performance issues
    - Optimize images if needed
    - Reduce bundle size if needed
    - _Requirements: 7.2, 7.4_

- [x] 12. Final checkpoint - Ensure all tests pass, ask the user if questions arise
