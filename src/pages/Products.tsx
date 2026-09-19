import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, LayoutGrid, Columns2, ChevronRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { getCanonicalURL } from '../utils/canonicalURL';
import FurnitureProductCard from '../components/FurnitureProductCard';
import ProductSidebar from '../components/ProductSidebar';
import {
  furnitureProducts,
  furnitureCategories,
  getMinPrice,
  getMaxPrice,
  type FurnitureCategory,
  type ColorVariant,
} from '../data/furnitureProducts';

type ViewMode = 'grid-2' | 'grid-3';
type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

interface FilterState {
  category: FurnitureCategory;
  priceRange: [number, number];
  seaterTypes: string[];
  selectedColor: ColorVariant | null;
  sortBy: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'popular', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const minPrice = useMemo(() => getMinPrice(), []);
  const maxPrice = useMemo(() => getMaxPrice(), []);

  const [viewMode, setViewMode] = useState<ViewMode>('grid-3');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Read initial category from URL param
  const initialCategory = useMemo(() => {
    const catParam = searchParams.get('category');
    if (catParam && furnitureCategories.some(c => c.id === catParam)) {
      return catParam as FurnitureCategory;
    }
    return 'all' as FurnitureCategory;
  }, []); // Only on mount

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    priceRange: [minPrice, maxPrice],
    seaterTypes: [],
    selectedColor: null,
    sortBy: 'recommended',
  });

  // Sync URL param when category changes via header nav links
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam && furnitureCategories.some(c => c.id === catParam) && catParam !== filters.category) {
      setFilters(prev => ({ ...prev, category: catParam as FurnitureCategory }));
    }
  }, [searchParams]);

  const handleFilterChange = useCallback((updates: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
    // Update URL when category changes
    if (updates.category) {
      if (updates.category === 'all') {
        searchParams.delete('category');
      } else {
        searchParams.set('category', updates.category);
      }
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleReset = useCallback(() => {
    setFilters({
      category: 'all',
      priceRange: [minPrice, maxPrice],
      seaterTypes: [],
      selectedColor: null,
      sortBy: 'recommended',
    });
    setSortBy('recommended');
    searchParams.delete('category');
    setSearchParams(searchParams, { replace: true });
  }, [minPrice, maxPrice, searchParams, setSearchParams]);

  // Ref for scrolling to product section on category click
  const productSectionRef = useRef<HTMLDivElement>(null);

  // Handle hash navigation to products section
  useEffect(() => {
    if (window.location.hash === '#products' && productSectionRef.current) {
      setTimeout(() => {
        productSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  // Category thumbnail data — maps each service to a product image from assets folder
  const categoryThumbnails: { filterCategory: FurnitureCategory; label: string; image: string }[] = [
    { filterCategory: 'sofas', label: 'Sofa Wood Polish', image: '/products/front_page_service_products/sofa_polish.webp' },
    { filterCategory: 'beds', label: 'Bed Wood Polish', image: '/products/front_page_service_products/bed_polish.webp' },
    { filterCategory: 'doors', label: 'Door Wood Polish', image: '/products/front_page_service_products/door_polish.webp' },
    { filterCategory: 'tables', label: 'Table Wood Polish', image: '/products/front_page_service_products/table_polish.webp' },
    { filterCategory: 'wardrobes', label: 'Wardrobe Wood Polish', image: '/products/front_page_service_products/wardrobe_polish.webp' },
    { filterCategory: 'dining', label: 'Dining Set Polish', image: '/products/front_page_service_products/dining_set_polish.webp' },
    { filterCategory: 'cabinets', label: 'Crockery Shelf Polish', image: '/products/front_page_service_products/crokery_polish.webp' },
    { filterCategory: 'mandir', label: 'Mandir Polish', image: 'products/mandir/darkBrownmandir.webp' },
    { filterCategory: 'floor-polish', label: 'Floor Polishing', image: '/products/FloorPoshining/lamination_polishing.webp' },
    { filterCategory: 'consultation', label: 'Consultation Visit', image: '/products/consultation/visiting.png' },
    { filterCategory: 'color-refresh', label: 'Colour Change', image: '/products/consultation/visiting2.png' },
  ];

  // Click a category thumbnail → set filter + scroll to products
  const handleCategoryThumbnailClick = useCallback((category: FurnitureCategory) => {
    handleFilterChange({ category });
    setTimeout(() => {
      productSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, [handleFilterChange]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let result = [...furnitureProducts];

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Seater filter
    if (filters.seaterTypes.length > 0) {
      result = result.filter((p) => p.seaterType && filters.seaterTypes.includes(p.seaterType));
    }

    // Color filter - show products that have the selected color variant
    if (filters.selectedColor) {
      result = result.filter((p) =>
        p.colorVariants?.some((v) => v.id === filters.selectedColor && v.image)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'recommended':
      default:
        // Best sellers first, then by rating
        result.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return b.rating - a.rating;
        });
    }

    return result;
  }, [filters, sortBy]);

  const currentCategoryLabel = useMemo(() => {
    const cat = furnitureCategories.find((c) => c.id === filters.category);
    return cat?.label || 'All Products';
  }, [filters.category]);

  // Category description text - Shortened for a cleaner layout
  const categoryDescription = useMemo(() => {
    const descriptions: Record<string, string> = {
      all: 'Professional furniture wood polishing to restore and protect your wooden pieces with a 6-month warranty.',
      sofas: 'Restore the natural grain and remove scratches from your wooden sofas with a lasting protective coat.',
      beds: 'Professional bed wood polishing from headboards to slats, delivering a smooth, luxury finish.',
      dining: 'Heat-resistant, water-resistant, and food-safe polishing for dining tables and chairs.',
      tables: 'Scratch-resistant, water-proof polishing for coffee, center, study, and side tables.',
      wardrobes: 'Complete inside and outside wardrobe polish with high durability and premium wood care.',
      cabinets: 'Detailed polishing for crockery shelves, cabinets, and premium display storage.',
      doors: 'Durable, weather-resistant door wood polishing (both sides and frame included).',
      mandir: 'Respectful polishing for sacred wooden mandirs with premium protective finishes.',
      'floor-polish': 'Hand & machine floor polishing with transparent per-square-foot rates.',
      consultation: 'Low-friction ₹99 home visit for expert assessment and total price clarity.',
      'color-refresh': 'Professional tone shift and color refresh for wooden furniture without buying new.',
    };
    return descriptions[filters.category] || descriptions.all;
  }, [filters.category]);

  // Category taglines for the banner
  const categoryTagline = useMemo(() => {
    const taglines: Record<string, string> = {
      all: 'Mumbai\'s Most Trusted Furniture Polish Experts',
      sofas: 'Restore the Heart of Your Living Room',
      beds: 'Premium Bed Polish for a Luxury Feel',
      dining: 'Dine in Style, Every Single Day',
      tables: 'Flawless Finish for Every Table',
      wardrobes: 'Premium Wardrobe Polish Service',
      cabinets: 'Premium Storage & Crockery Refinishing',
      doors: 'Stunning Door Polish, Both Sides',
      mandir: 'Sacred Finish for Your Mandir',
      'floor-polish': 'Hand & Machine Floor Polish',
      consultation: 'Book an Expert Home Visit',
      'color-refresh': 'Colour Change for Wooden Pieces',
    };
    return taglines[filters.category] || taglines.all;
  }, [filters.category]);

  return (
    <>
      <SEOHead
        title={`${currentCategoryLabel} Polish Services | A1 Furniture Polish - ${filteredProducts.length} Products`}
        description={`Professional ${currentCategoryLabel.toLowerCase()} polish services in Mumbai. ${filteredProducts.length} products starting from ₹${filteredProducts.length > 0 ? Math.min(...filteredProducts.map(p => p.price)).toLocaleString('en-IN') : '999'}. 6 months warranty, expert craftsmen.`}
        canonical={getCanonicalURL('/services')}
      />

      <div className="min-h-screen bg-gray-50">
        {/* ══════════════════════════════════════════
            BREADCRUMB
        ══════════════════════════════════════════ */}
        <nav className="bg-white border-b border-gray-100 py-2.5 px-4" aria-label="Breadcrumb">
          <div className="max-w-[1400px] mx-auto flex items-center gap-1.5 text-xs text-gray-500">
            <a href="/" className="hover:text-amber-600 transition-colors">Home</a>
            <ChevronRight className="w-3 h-3" />
            <a href="/services" className="hover:text-amber-600 transition-colors">Services</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{currentCategoryLabel}</span>
          </div>
        </nav>

        {/* ══════════════════════════════════════════
            SERVICE CATEGORIES HEADER — Thumbnail Grid
        ══════════════════════════════════════════ */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[1400px] mx-auto px-4 pt-6 pb-4 md:pt-8 md:pb-5">
            {/* Title Row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex-1 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  A1 Furniture Polish & Colour Studio
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-500 font-medium">
                  {categoryTagline} • Premium finishing • Transparent pricing
                </p>
              </div>
            </div>

            {/* Category Thumbnail Grid — square images with zoom effect */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-12 gap-3 md:gap-4">
              {categoryThumbnails.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryThumbnailClick(item.filterCategory)}
                  className={`flex flex-col items-center gap-1.5 p-1.5 sm:p-2 rounded-xl transition-all duration-300 hover:bg-amber-50 hover:shadow-lg group ${
                    filters.category === item.filterCategory
                      ? 'bg-amber-50 ring-2 ring-amber-400 shadow-sm'
                      : ''
                  }`}
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-md">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-amber-700 transition-colors line-clamp-2">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            MAIN CONTENT: SIDEBAR + PRODUCTS
        ══════════════════════════════════════════ */}
        <div ref={productSectionRef} data-products-section className="max-w-[1400px] mx-auto px-4 py-6">
          {/* Sort Bar */}
          <div className="flex items-center justify-between mb-5 bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">Sort By :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer font-medium text-gray-700"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 hidden sm:inline">View As</span>
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid-2')}
                  className={`p-1.5 rounded-md transition-all ${
                    viewMode === 'grid-2'
                      ? 'bg-white shadow-sm text-amber-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label="2 column view"
                >
                  <Columns2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid-3')}
                  className={`p-1.5 rounded-md transition-all ${
                    viewMode === 'grid-3'
                      ? 'bg-white shadow-sm text-amber-600'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label="3 column view"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Layout: Sidebar + Grid */}
          <div className="flex gap-6">
            {/* Sidebar */}
            <ProductSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              productCount={filteredProducts.length}
              isMobileOpen={mobileFilterOpen}
              onMobileClose={() => setMobileFilterOpen(false)}
            />

            {/* Product Grid */}
            <main className="flex-1 min-w-0">
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SlidersHorizontal className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-4 ${
                    viewMode === 'grid-2'
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <FurnitureProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

// ──────────────────────────────────
// Category Icon Component
// ──────────────────────────────────
const CategoryIcon: React.FC<{ icon: string; isActive: boolean }> = ({ icon, isActive }) => {
  const color = isActive ? '#D97706' : '#6B7280';
  const size = 28;

  const icons: Record<string, React.ReactNode> = {
    grid: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        {isActive && <path d="M7 7L10 10M7 10L10 7" stroke={color} strokeWidth="1.5" />}
      </svg>
    ),
    sofa: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11V8a2 2 0 012-2h12a2 2 0 012 2v3" />
        <path d="M3 11v4a1 1 0 001 1h16a1 1 0 001-1v-4a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
        <path d="M5 16v2M19 16v2" />
      </svg>
    ),
    bed: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17V7a2 2 0 012-2h14a2 2 0 012 2v10" />
        <path d="M3 13h18v4H3z" />
        <path d="M3 17v2M21 17v2" />
      </svg>
    ),
    dining: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="5" width="16" height="2" rx="1" />
        <path d="M6 7v12M18 7v12M10 7v12M14 7v12" />
      </svg>
    ),
    table: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="2" rx="1" />
        <path d="M5 10v8M19 10v8" />
      </svg>
    ),
    wardrobe: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <line x1="12" y1="3" x2="12" y2="21" />
        <circle cx="10" cy="12" r="0.5" fill={color} />
        <circle cx="14" cy="12" r="0.5" fill={color} />
      </svg>
    ),
    cabinet: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <circle cx="12" cy="8" r="0.5" fill={color} />
        <circle cx="12" cy="16" r="0.5" fill={color} />
      </svg>
    ),
    shelf: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
      </svg>
    ),
    tv: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="12" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    door: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="3" width="12" height="18" rx="1" />
        <circle cx="15" cy="12" r="1" fill={color} />
      </svg>
    ),
    drawer: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <line x1="4" y1="8" x2="20" y2="8" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="16" x2="20" y2="16" />
        <circle cx="12" cy="6" r="0.5" fill={color} />
        <circle cx="12" cy="10" r="0.5" fill={color} />
        <circle cx="12" cy="14" r="0.5" fill={color} />
        <circle cx="12" cy="18" r="0.5" fill={color} />
      </svg>
    ),
    jhula: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3v4M19 3v4" />
        <path d="M5 7c0 0 2 3 7 3s7-3 7-3" />
        <rect x="7" y="10" width="10" height="6" rx="1" />
        <path d="M7 16l-1 4M17 16l1 4" />
      </svg>
    ),
    mandir: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 6v12H4V9l8-6z" />
        <path d="M9 21v-6h6v6" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    ),

    polish: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v4l-1 1H10L9 7V3z" />
        <path d="M10 8h4v2a5 5 0 01-4 0V8z" />
        <path d="M12 10v7" />
        <path d="M8 17h8" />
        <path d="M7 17v3h10v-3" />
      </svg>
    ),
    paint: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="11" rx="2" />
        <path d="M9 14v3a2 2 0 004 0v-3" />
        <circle cx="7" cy="9" r="1.5" fill={color} />
        <circle cx="12" cy="9" r="1.5" fill={color} />
        <circle cx="17" cy="9" r="1.5" fill={color} />
      </svg>
    ),
  };

  return <>{icons[icon] || icons.grid}</>;
};

export default Products;
