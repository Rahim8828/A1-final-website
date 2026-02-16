import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, LayoutGrid, Columns2, ChevronRight, ShoppingCart } from 'lucide-react';
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

  // Category thumbnail data — maps each service to a product image from assets folder
  const categoryThumbnails: { filterCategory: FurnitureCategory; label: string; image: string }[] = [
    { filterCategory: 'sofas', label: 'Sofa Wood Polish', image: '/products/sofa/1_seater_sofa/lightBrownsingleSofa.png' },
    { filterCategory: 'beds', label: 'Bed Wood Polish', image: '/products/bed/queen_bed/lightbrownQueen.png' },
    { filterCategory: 'doors', label: 'Door Wood Polish', image: '/products/doors/single_door/darkBrownDoor.png' },
    { filterCategory: 'tables', label: 'Table Wood Polish', image: '/products/table/side_table/lightBrowntable.png' },
    { filterCategory: 'wardrobes', label: 'Wardrobe Wood Polish', image: '/products/wardrobe/double/lightBrown.png' },
    { filterCategory: 'dining', label: 'Dining Set Polish', image: '/products/dining_set/4_seater/lightbrown_4.png' },
    { filterCategory: 'cabinets', label: 'Cabinet Wood Polish', image: '/products/cabinet/crokery/lightBrown_crokery.png' },
    { filterCategory: 'shelves', label: 'Bookshelf / Rack Polish', image: '/products/shelves/brownShelve.png' },
    { filterCategory: 'shelves', label: 'Wooden Shelf Polish', image: '/products/shelves/ligt_brown_shelve.png' },
    { filterCategory: 'mandir', label: 'Mandir Polish', image: '/products/mandir/darkWoodenMandir.png' },
    { filterCategory: 'jhula', label: 'Jhula Polish', image: '/products/jhula/darkWoodenJhula.png' },
    { filterCategory: 'all', label: 'Chester Drawer Polish', image: '/assets/optimized/Chester Drawer.webp' },
    { filterCategory: 'tv-units', label: 'TV Unit Polish', image: '/products/tvUnitPolish/solidWood/darkBrown_solidwood.png' },
    { filterCategory: 'wood-polish', label: 'Floor Polishing', image: '/products/FloorPoshining/wooden_polish.webp' },
    { filterCategory: 'pu-polish', label: 'PU Polish', image: '/products/pu_polish/pu_matt_polish.webp' },
    { filterCategory: 'deco-paint', label: 'Deco Paint', image: '/products/deco_paint/designer_deco_paint.webp' },
    { filterCategory: 'antique', label: 'Antique / Carving Furniture', image: '/products/antique/largeAntiqueImage.png' },
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
        p.colorVariants.some((v) => v.id === filters.selectedColor && v.image)
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

  // Category description text
  const categoryDescription = useMemo(() => {
    const descriptions: Record<string, string> = {
      all: 'Transform your home with our professional furniture wood polish services. Our expert craftsmen use premium-grade materials and proven techniques to restore, protect, and beautify every piece of wooden furniture — backed by a 6-month service warranty.',
      sofas: 'Your sofa is the centrepiece of your living room — it defines the character of your décor. Our specialist polish service restores the natural grain, removes scratches, and applies a lasting protective coat that brings your wooden sofa back to showroom glory.',
      beds: 'Wake up to a bed that looks brand new. From single to king-size, our professional wood polish service covers headboards, footboards, side rails, and slats — delivering a smooth, luxurious finish that lasts for months.',
      dining: 'Your dining set deserves a finish that handles daily life. We polish tables and chairs with a heat-resistant, water-resistant, and food-safe coating — keeping your dining area elegant and ready to impress.',
      tables: 'Coffee tables, center tables, study desks, side tables — we give every surface a scratch-resistant, food-safe finish that looks stunning and lasts. Expert polishing for every type of table in your home.',
      wardrobes: 'Complete inside and outside wardrobe polish with careful attention to handles, hinges, and fittings. We deliver a premium, long-lasting finish that protects your wardrobe and adds elegance to your bedroom.',
      cabinets: 'Inside, outside, handles, hinges, and glass fronts — we polish every detail of your cabinets. Expert coverage that restores the wood and gives your storage a refined, polished appearance.',
      shelves: 'Bookshelves and display shelves polished to perfection with premium materials. Includes thorough post-service cleaning so your shelves are ready to style immediately.',
      'tv-units': 'Give your entertainment area a showroom-quality upgrade. Our TV unit polish uses premium materials for a flawless, fingerprint-resistant finish that complements your living room.',
      doors: 'Both sides polished, frame included. Our door wood polish service uses durable coatings that withstand daily use, weather exposure, and still look stunning year after year.',
      jhula: 'Traditional jhula polish with special attention to joints, chains, and carved details. We use heritage-grade finishing techniques for lasting beauty and structural care.',
      mandir: 'Sacred furniture deserves sacred care. Our mandir polish service respects intricate carvings and traditional designs while applying a premium protective finish.',
      antique: 'Preserve history, restore beauty. Our antique furniture restoration service protects original carvings, respects patina, and applies traditional finishing techniques trusted by collectors.',
      'wood-polish': 'Choose from 8 premium wood polish types — French Polish, Melamine, PU, Monocoat, Lamination, Wax, Water PU, and classic Wooden Polish. Each crafted for different needs, budgets, and aesthetics. All with 6-month warranty.',
      'pu-polish': 'PU (Polyurethane) polish delivers a factory-grade, ultra-durable finish — available in Gloss, Matt, and Satin. Water-resistant, heat-resistant, and built to last. The premium choice for luxury interiors.',
      'deco-paint': 'Transform tired furniture with designer deco paint — solid colours, textures, metallic accents, and hand-painted motifs. Give any piece a completely new look with our professional deco paint service.',
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
      cabinets: 'Expert Cabinet Restoration & Polish',
      shelves: 'Perfect Finish for Every Shelf',
      'tv-units': 'Showroom-Quality TV Unit Polish',
      doors: 'Stunning Door Polish, Both Sides',
      jhula: 'Traditional Jhula Polish & Care',
      mandir: 'Sacred Finish for Your Mandir',
      antique: 'Heritage Restoration Specialists',
      'wood-polish': '8 Premium Wood Polish Types',
      'pu-polish': 'Ultra-Premium PU Polish Finishes',
      'deco-paint': 'Designer Deco Paint Makeovers',
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
                  Furniture Wood Polish
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-500 font-medium">
                  Professional polishing &bull; 6 Months Warranty &bull; Expert Craftsmen
                </p>
              </div>
              <a
                href="tel:+919892060961"
                className="relative flex-shrink-0 ml-3 p-2.5 rounded-full hover:bg-amber-50 transition-colors"
                aria-label="Get a free quote"
                title="Call for free quote"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                  {filteredProducts.length > 0 ? filteredProducts.length : '!'}
                </span>
              </a>
            </div>

            {/* Category Thumbnail Grid — square images */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 gap-3 md:gap-4">
              {categoryThumbnails.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryThumbnailClick(item.filterCategory)}
                  className={`flex flex-col items-center gap-1.5 p-1.5 sm:p-2 rounded-xl transition-all duration-200 hover:bg-amber-50 hover:shadow-md group ${
                    filters.category === item.filterCategory
                      ? 'bg-amber-50 ring-2 ring-amber-400 shadow-sm'
                      : ''
                  }`}
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-contain p-1.5"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-amber-700 line-clamp-2">
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
        <div ref={productSectionRef} className="max-w-[1400px] mx-auto px-4 py-6">
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
    antique: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 4.5H18l-3.5 2.5L16 14.5 12 12l-4 2.5 1.5-4.5L6 7.5h4.5L12 3z" />
        <rect x="6" y="16" width="12" height="4" rx="1" />
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
