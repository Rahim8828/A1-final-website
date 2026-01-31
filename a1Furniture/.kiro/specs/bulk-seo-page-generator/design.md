# Design Document

## Overview

The Bulk SEO Page Generator is a data-driven system that automatically creates 150 location-based service pages for A1 Furniture Polish. The system uses a template-based approach with centralized data management, enabling easy content updates and consistent UI/UX across all pages.

**Page Distribution:**
- **80 pages**: 20 categories × 4 title variations with "Mumbai" as location
- **70 pages**: Balanced distribution across specific Mumbai locations (3-4 pages per category covering different locations and title variations)

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Page Generator Script                     │
│  (Reads data, generates React components, updates routes)   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Page Data Configuration                   │
│     (80 Mumbai pages + 70 location-specific pages)          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Service Page Template                       │
│        (Reusable React component with props)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Generated Pages                           │
│              (150 individual page components)                │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
ServicePageTemplate
├── SEOHead (meta tags, schema)
├── Header
├── HeroSection
│   ├── H1 Title
│   ├── Introduction
│   └── Primary CTA
├── ServiceListSection
├── ProcessSection
├── LocationCoverageSection
├── PricingSection
├── WhyChooseUsSection
├── FAQSection
├── RelatedServicesSection
├── FinalCTA
└── Footer
```

## Components and Interfaces

### 1. Data Structures

#### PageData Interface
```typescript
interface PageData {
  // SEO Fields
  title: string;
  metaDescription: string;
  h1: string;
  url: string;
  canonicalUrl: string;
  
  // Service Information
  serviceCategory: string;
  serviceName: string;
  location: string;
  titleVariation: 'affordable' | 'top-rated' | 'professional' | 'best';
  
  // Content Sections
  introduction: string;
  services: ServiceItem[];
  process: ProcessStep[];
  locationAreas: string[];
  pricing: PricingInfo;
  whyChooseUs: BenefitItem[];
  faqs: FAQItem[];
  relatedServices: RelatedService[];
  
  // Schema Data
  schema: {
    localBusiness: LocalBusinessSchema;
    service: ServiceSchema;
  };
  
  // Keywords
  primaryKeyword: string;
  secondaryKeywords: string[];
}

interface ServiceItem {
  name: string;
  description: string;
  icon?: string;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface PricingInfo {
  startingPrice: number;
  priceRange: string;
  factors: string[];
}

interface BenefitItem {
  title: string;
  description: string;
  icon?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface RelatedService {
  name: string;
  url: string;
}
```

### 2. Service Page Template Component

**File:** `src/components/ServicePageTemplate.tsx`

A reusable React component that accepts `PageData` as props and renders a complete service page with all sections.

**Key Features:**
- Accepts page data via props
- Renders SEO components with proper meta tags
- Uses existing UI components for consistency
- Implements responsive design
- Includes schema markup
- Handles internal linking

### 3. Page Data Configuration

**File:** `src/data/generatedPagesData.ts`

Centralized data file containing configuration for all 150 pages.

**Structure:**
```typescript
export const serviceCategories = [
  'furniture-polishing',
  'wood-polishing',
  'pu-polish',
  // ... 17 more categories
];

export const mumbaiLocations = [
  // Western Line
  'Andheri West', 'Andheri East', 'Jogeshwari', 'Goregaon', 'Malad', 
  'Kandivali', 'Borivali', 'Dahisar', 'Bandra', 'Khar', 'Santa Cruz', 
  'Vile Parle', 'Juhu', 'Versova', 'Oshiwara', 'Lokhandwala',
  // Central Line
  'Dadar', 'Sion', 'Matunga', 'Kurla', 'Ghatkopar', 'Vikhroli', 
  'Bhandup', 'Mulund', 'Thane', 'Wadala',
  // Harbour Line
  'Chembur', 'Govandi', 'Mankhurd', 'Navi Mumbai', 'Vashi',
  // Other Hotspots
  'Powai', 'Marol', 'Saki Naka', 'Chandivali', 'BKC', 'Mira Road', 
  'Bhayandar', 'Ghansoli', 'Airoli', 'Nerul'
];

export const titleVariations = [
  { type: 'affordable', prefix: 'Affordable' },
  { type: 'top-rated', prefix: 'Top-Rated', suffix: '| 4.9★ Rated' },
  { type: 'professional', prefix: 'Professional', suffix: '| Same-Day Service' },
  { type: 'best', prefix: 'Best', suffix: '| Expert Polishers' }
];

// Page Generation Strategy:
// Phase 1: 80 pages - All 20 categories × 4 title variations with "Mumbai" location
// Phase 2: 70 pages - Balanced distribution across specific locations
//          - Each category gets 3-4 additional pages with different locations
//          - Mix of all 4 title variations
//          - Priority to popular locations (Andheri, Bandra, Goregaon, Powai, Thane, etc.)

export const pagesData: PageData[] = [
  // Generated data for all 150 pages
];
```

### 4. Page Generator Script

**File:** `scripts/generatePages.ts`

Node.js script that generates all page component files.

**Functionality:**
- Reads page data configuration
- Generates React component files for each page
- Creates proper file names and directory structure
- Updates routing configuration
- Validates generated files
- Provides generation summary

## Data Models

### Service Categories (20 Total)

1. Furniture Polishing
2. Wood Polishing
3. PU Polish
4. PU Gloss Polish
5. PU Matt Polish
6. Melamine Polish
7. Duco Polish
8. Teak Wood Polish
9. Interior Wood Finishing
10. Door Polishing
11. Wardrobe Polishing
12. Dining Table Polishing
13. Sofa Wood Polish
14. Bed Wood Polish
15. Cabinet Wood Polish
16. Bookshelf/Rack Polish
17. Mandir Polish
18. Jhula Polish
19. Wooden Floor Polishing
20. Antique Furniture Polish

### Title Variations & Page Distribution

**Phase 1: Mumbai Generic Pages (80 pages)**

Each of the 20 service categories will have 4 title variations with "Mumbai" as the location:

1. **Affordable [Service] in Mumbai**
   - Example: "Affordable Furniture Polishing in Mumbai"

2. **Top-Rated [Service] in Mumbai | 4.9★ Rated**
   - Example: "Top-Rated Furniture Polishing in Mumbai | 4.9★ Rated"

3. **Professional [Service] in Mumbai | Same-Day Service**
   - Example: "Professional Furniture Polishing in Mumbai | Same-Day Service"

4. **Best [Service] in Mumbai | Expert Polishers**
   - Example: "Best Furniture Polishing in Mumbai | Expert Polishers"

**Phase 2: Location-Specific Pages (70 pages)**

Each category gets 3-4 additional pages with specific Mumbai locations:
- Mix of all 4 title variations
- Priority locations: Andheri West, Andheri East, Bandra, Goregaon, Powai, Thane, Dadar, Kurla, Malad, Borivali, etc.
- Balanced distribution to cover maximum geographic area

Examples:
- "Affordable Wood Polishing in Andheri West"
- "Top-Rated PU Polish in Bandra | 4.9★ Rated"
- "Professional Door Polishing in Goregaon | Same-Day Service"
- "Best Wardrobe Polishing in Powai | Expert Polishers"

**Total Pages: 80 + 70 = 150 pages**

### Mumbai Locations (41 Total)

**Western Line (16):**
Andheri West, Andheri East, Jogeshwari, Goregaon, Malad, Kandivali, Borivali, Dahisar, Bandra, Khar, Santa Cruz, Vile Parle, Juhu, Versova, Oshiwara, Lokhandwala

**Central Line (10):**
Dadar, Sion, Matunga, Kurla, Ghatkopar, Vikhroli, Bhandup, Mulund, Thane, Wadala

**Harbour Line (5):**
Chembur, Govandi, Mankhurd, Navi Mumbai, Vashi

**Other Hotspots (10):**
Powai, Marol, Saki Naka, Chandivali, BKC, Mira Road, Bhayandar, Ghansoli, Airoli, Nerul

### URL Structure

Pattern: `/services/{service-slug}-{location-slug}`

Examples:
- `/services/affordable-furniture-polishing-andheri-west`
- `/services/top-rated-furniture-polishing-bandra`
- `/services/professional-wood-polishing-goregaon`
- `/services/best-pu-polish-powai`
- `/services/affordable-wardrobe-polishing-thane`
- `/services/top-rated-door-polishing-dadar`

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Complete Page Generation
*For any* execution of the page generator script, the system should create exactly 150 unique page files with valid React component code (80 Mumbai pages + 70 location-specific pages).
**Validates: Requirements 1.1, 1.4**

### Property 2: Unique URL Generation
*For any* two generated pages, their URLs should be different and follow the SEO-friendly slug pattern.
**Validates: Requirements 1.5**

### Property 3: SEO Completeness
*For any* generated page, it should contain all required SEO elements: meta title, meta description, H1, canonical URL, schema markup, and Open Graph tags.
**Validates: Requirements 2.1, 2.2, 2.3, 2.5, 2.6, 2.7**

### Property 4: Content Structure Completeness
*For any* generated page, it should contain all required content sections: introduction, service list, process, location areas, pricing, why choose us, FAQ, and CTA.
**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8**

### Property 5: Word Count Range
*For any* generated page, the total word count should be between 1000 and 1500 words.
**Validates: Requirements 3.9**

### Property 6: Location Assignment Consistency
*For any* service category, it should have 4 Mumbai generic pages plus 3-4 location-specific pages with balanced distribution across title variations and priority locations.
**Validates: Requirements 1.3**

### Property 7: Valid React Component
*For any* generated page file, it should be a syntactically valid TypeScript React component that can be compiled without errors.
**Validates: Requirements 1.4, 4.4**

### Property 8: Internal Link Validity
*For any* internal link on a generated page, the target URL should correspond to an existing page in the system.
**Validates: Requirements 9.5**

### Property 9: Schema Markup Validity
*For any* generated page, the JSON-LD schema markup should be valid according to schema.org specifications.
**Validates: Requirements 2.5**

### Property 10: Responsive Design Compliance
*For any* generated page, it should render properly on mobile devices with no horizontal scroll and touch-friendly elements.
**Validates: Requirements 8.1, 8.3, 8.5**

## Error Handling

### Generator Script Errors

1. **Data Validation Errors**
   - Validate all required fields in page data
   - Check for duplicate URLs
   - Verify location assignments
   - Action: Log errors and halt generation

2. **File System Errors**
   - Handle directory creation failures
   - Handle file write failures
   - Action: Log error, skip file, continue with others

3. **Template Rendering Errors**
   - Validate template syntax
   - Check for missing data fields
   - Action: Log error with page details, skip page

### Runtime Errors

1. **Missing Page Data**
   - Fallback to default content
   - Log warning for monitoring

2. **Image Loading Errors**
   - Use placeholder images
   - Implement lazy loading with error boundaries

3. **Schema Validation Errors**
   - Log errors for debugging
   - Render page without schema (degraded mode)

## Testing Strategy

### Unit Testing

1. **Data Generation Tests**
   - Test page data structure creation
   - Test URL slug generation
   - Test location assignment logic
   - Test content template rendering

2. **Component Tests**
   - Test ServicePageTemplate with various props
   - Test SEO component rendering
   - Test section components with different data

3. **Utility Function Tests**
   - Test slug generation functions
   - Test word count calculation
   - Test schema generation functions

### Property-Based Testing

We will use **fast-check** for property-based testing in TypeScript/JavaScript.

Each property-based test should run a minimum of 100 iterations.

1. **Property Test: Complete Page Generation**
   - Generate random service categories and variations
   - Verify exactly 150 pages are created (80 Mumbai + 70 location-specific)
   - **Feature: bulk-seo-page-generator, Property 1: Complete Page Generation**

2. **Property Test: Unique URL Generation**
   - Generate multiple pages
   - Verify all URLs are unique
   - **Feature: bulk-seo-page-generator, Property 2: Unique URL Generation**

3. **Property Test: SEO Completeness**
   - Generate random page data
   - Verify all SEO elements are present
   - **Feature: bulk-seo-page-generator, Property 3: SEO Completeness**

4. **Property Test: Content Structure Completeness**
   - Generate random page data
   - Verify all content sections exist
   - **Feature: bulk-seo-page-generator, Property 4: Content Structure Completeness**

5. **Property Test: Word Count Range**
   - Generate random page content
   - Verify word count is between 1000-1500
   - **Feature: bulk-seo-page-generator, Property 5: Word Count Range**

6. **Property Test: Location Assignment Consistency**
   - Generate pages for all categories
   - Verify location assignment follows rules
   - **Feature: bulk-seo-page-generator, Property 6: Location Assignment Consistency**

7. **Property Test: Valid React Component**
   - Generate random page files
   - Verify TypeScript compilation succeeds
   - **Feature: bulk-seo-page-generator, Property 7: Valid React Component**

8. **Property Test: Internal Link Validity**
   - Generate pages with internal links
   - Verify all links point to existing pages
   - **Feature: bulk-seo-page-generator, Property 8: Internal Link Validity**

9. **Property Test: Schema Markup Validity**
   - Generate random schema data
   - Verify JSON-LD validates against schema.org
   - **Feature: bulk-seo-page-generator, Property 9: Schema Markup Validity**

### Integration Testing

1. **End-to-End Generation Test**
   - Run complete generation script
   - Verify all 150 files created (80 Mumbai + 70 location-specific)
   - Verify routing configuration updated
   - Verify pages render without errors

2. **SEO Validation Test**
   - Test meta tags in browser
   - Validate schema with Google's Rich Results Test
   - Check canonical URLs

3. **Performance Testing**
   - Measure page load times
   - Run Lighthouse audits
   - Verify performance scores > 90

## Implementation Notes

### Technology Stack

- **React 18** with TypeScript for components
- **React Router** for routing
- **Node.js** for generator script
- **fast-check** for property-based testing
- **Vite** for building and bundling

### File Organization

```
src/
├── components/
│   └── ServicePageTemplate.tsx
├── data/
│   ├── generatedPagesData.ts
│   └── servicePageHelpers.ts
├── pages/
│   └── generated/
│       ├── AffordableFurniturePolishingMumbai.tsx
│       ├── TopRatedFurniturePolishingMumbai.tsx
│       ├── AffordableWoodPolishingAndheriWest.tsx
│       ├── ProfessionalPUPolishBandra.tsx
│       └── ... (146 more files)
└── utils/
    ├── seoHelpers.ts
    └── schemaGenerator.ts

scripts/
└── generatePages.ts
```

### Performance Optimization

1. **Code Splitting**
   - Lazy load generated pages
   - Use React.lazy() for route-based splitting

2. **Image Optimization**
   - Use OptimizedImage component
   - Implement lazy loading
   - Use WebP format with fallbacks

3. **Bundle Size**
   - Share common data across pages
   - Minimize duplicate code
   - Use dynamic imports

### SEO Best Practices

1. **Meta Tags**
   - Unique title for each page (50-60 characters)
   - Compelling meta description (150-160 characters)
   - Include location and service keywords

2. **Heading Structure**
   - Single H1 per page
   - Logical H2/H3 hierarchy
   - Include keywords naturally

3. **Schema Markup**
   - LocalBusiness schema with location data
   - Service schema with pricing
   - BreadcrumbList for navigation

4. **Internal Linking**
   - Link to related services
   - Link to location pages
   - Use descriptive anchor text

5. **Content Quality**
   - Unique content for each page
   - Natural keyword placement
   - Helpful, informative content
   - Clear calls-to-action
ek 