import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { categories } from '../data/productCatalog';

const categoryImages: Record<string, string> = {
  all: '/products/front_page_service_products/sofa_polish.webp',
  sofas: '/products/sofa/1_seater_sofa/darkWooden1seaterSofa.webp',
  beds: '/products/bed/king_bed/darkWoodenKing.webp',
  'dining-tables': '/products/dining_set/6_seater/darkbrown6seater.webp',
  'wardrobes-storage': '/products/wardrobe/double/darkWoodendoubleWardrobe.webp',
  'tv-units': '/products/tvUnitPolish/WallMounted/darkBrownWallMounted.webp',
  doors: '/products/doors/single_door/darkWoodensingle.webp',
  'floor-polish': '/assets/Door-polish.webp',
  mandir: '/products/mandir/darkBrownmandir.webp',
  jhula: '/products/jhula/darkWoodenJhula.webp',
  consultation: '/products/consultation/visiting.png',
  'color-refresh': '/products/consultation/visiting2.png',
};

const MobileCategoryScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Touch drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="bg-white pt-3 pb-3">
      {/* Search Bar */}
      <div className="px-3 mb-3">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search Products, Color & More..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-12 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-amber-600 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-3">
        <h2 className="text-base font-bold text-gray-900">Services by Category</h2>
        <Link to="/services" className="text-sm text-amber-600 font-semibold">
          View All
        </Link>
      </div>

      {/* Horizontal Scrolling Grid - 2 rows with drag functionality */}
      <div className="px-3">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          className="overflow-x-auto overflow-y-hidden hide-scrollbar cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="inline-grid grid-rows-2 grid-flow-col gap-3 pb-2">
            {categories.slice(1).map((cat) => {
              const linkTo = cat.id === 'all' ? '/' : `/services?category=${cat.id}#products`;
              
              return (
                <Link
                  key={cat.id}
                  to={linkTo}
                  className="flex flex-col items-center w-[90px]"
                  style={{ scrollSnapAlign: 'start' }}
                  draggable={false}
                >
                  {/* Category Image */}
                  <div className="w-[90px] h-[90px] rounded-2xl bg-gray-50 overflow-hidden border border-gray-200 shadow-sm mb-2 pointer-events-none">
                    <img
                      src={categoryImages[cat.id] }
                      alt={cat.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  {/* Category Label */}
                  <span className="text-xs font-medium text-gray-700 text-center leading-tight line-clamp-2 pointer-events-none">
                    {cat.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileCategoryScroll;
