import React, { useMemo } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import {
  furnitureCategories,
  getMinPrice,
  getMaxPrice,
  getSeaterTypes,
  type FurnitureCategory,
  type ColorVariant,
} from '../data/furnitureProducts';

interface FilterState {
  category: FurnitureCategory;
  priceRange: [number, number];
  seaterTypes: string[];
  selectedColor: ColorVariant | null;
  sortBy: string;
}

interface ProductSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  productCount: number;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  productCount,
  isMobileOpen,
  onMobileClose,
}) => {
  const minPrice = useMemo(() => getMinPrice(), []);
  const maxPrice = useMemo(() => getMaxPrice(), []);
  const seaterTypes = useMemo(() => getSeaterTypes(), []);

  const [expandedSections, setExpandedSections] = React.useState({
    price: true,
    category: true,
    seater: true,
    color: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const colorOptions: { id: ColorVariant; label: string; hex: string; ring: string }[] = [
    { id: 'light-brown', label: 'Light Brown', hex: '#C4956A', ring: 'ring-amber-400' },
    { id: 'white', label: 'White', hex: '#F5F0E8', ring: 'ring-gray-400' },
    { id: 'dark-brown', label: 'Dark Brown', hex: '#4A2C2A', ring: 'ring-amber-800' },
  ];

  const seaterLabels: Record<string, string> = {
    '1-seater': '1 Seater / Single',
    '2-seater': '2 Seater / Double',
    '3-seater': '3 Seater / King',
    '4-seater': '4 Seater / Large',
    '6-seater': '6 Seater',
  };

  const handleSeaterToggle = (seater: string) => {
    const current = filters.seaterTypes;
    const updated = current.includes(seater)
      ? current.filter((s) => s !== seater)
      : [...current, seater];
    onFilterChange({ seaterTypes: updated });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, bound: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    if (bound === 'min') {
      onFilterChange({ priceRange: [value, filters.priceRange[1]] });
    } else {
      onFilterChange({ priceRange: [filters.priceRange[0], value] });
    }
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.priceRange[0] !== minPrice ||
    filters.priceRange[1] !== maxPrice ||
    filters.seaterTypes.length > 0 ||
    filters.selectedColor !== null;

  const sidebarContent = (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* ── PRICE RANGE ── */}
      <div className="py-3 border-b border-gray-100">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Price Range
          </span>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.price && (
          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 font-medium">
                ₹{filters.priceRange[0].toLocaleString('en-IN')}
              </span>
              <span className="text-gray-700 font-medium">
                ₹{filters.priceRange[1].toLocaleString('en-IN')}
              </span>
            </div>

            {/* Dual range slider */}
            <div className="relative h-2">
              <div className="absolute inset-0 bg-gray-200 rounded-full" />
              <div
                className="absolute h-full bg-amber-500 rounded-full"
                style={{
                  left: `${((filters.priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                  right: `${100 - ((filters.priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                }}
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={100}
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(e, 'min')}
                className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-amber-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10"
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={100}
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e, 'max')}
                className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-amber-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onFilterChange({ priceRange: [minPrice, maxPrice] })}
                className="flex-1 text-xs px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => {}} // Price is applied in real-time
                className="flex-1 text-xs px-3 py-1.5 rounded bg-amber-600 text-white hover:bg-amber-700 transition-colors font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── CATEGORY ── */}
      <div className="py-3 border-b border-gray-100">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Category
          </span>
          {expandedSections.category ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.category && (
          <div className="mt-3 space-y-1 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
            {furnitureCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ category: cat.id })}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                  filters.category === cat.id
                    ? 'bg-amber-50 text-amber-700 font-semibold border border-amber-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{cat.label}</span>
                {filters.category === cat.id && (
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── SEATER / SIZE ── */}
      <div className="py-3 border-b border-gray-100">
        <button
          onClick={() => toggleSection('seater')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Size / Seater
          </span>
          {expandedSections.seater ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.seater && (
          <div className="mt-3 space-y-1.5">
            {seaterTypes.map((seater) => (
              <label
                key={seater}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.seaterTypes.includes(seater)}
                  onChange={() => handleSeaterToggle(seater)}
                  className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-700">
                  {seaterLabels[seater] || seater}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* ── COLOR ── */}
      <div className="py-3">
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Polish Color
          </span>
          {expandedSections.color ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>

        {expandedSections.color && (
          <div className="mt-3 flex flex-wrap gap-3">
            {colorOptions.map((color) => (
              <button
                key={color.id}
                onClick={() =>
                  onFilterChange({
                    selectedColor: filters.selectedColor === color.id ? null : color.id,
                  })
                }
                className={`flex flex-col items-center gap-1.5 group`}
                title={color.label}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    filters.selectedColor === color.id
                      ? `${color.ring} ring-2 ring-offset-2 border-transparent scale-110`
                      : 'border-gray-300 hover:border-gray-400 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[10px] text-gray-600 font-medium">{color.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product count */}
      <div className="pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Showing <span className="font-semibold text-gray-700">{productCount}</span> products
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-4 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Filter Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-slide-in-left overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                onClick={onMobileClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close filters"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebarContent}
            {/* Apply button for mobile */}
            <div className="mt-4 sticky bottom-0 bg-white pt-3 pb-2 border-t border-gray-200">
              <button
                onClick={onMobileClose}
                className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors active:scale-95"
              >
                Show {productCount} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSidebar;
