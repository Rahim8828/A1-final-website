import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, Search } from 'lucide-react';
import { servicePageData } from '../data/servicePageData';
import { products } from '../data/productCatalog';

// Searchable items index
interface SearchItem {
  label: string;
  description: string;
  link: string;
  type: 'service' | 'product' | 'location' | 'page';
}

const locations = [
  'Goregaon', 'Powai', 'Andheri', 'Dadar', 'Bandra', 'Jogeshwari',
  'Malad', 'Borivali', 'Kandivali', 'Vile Parle', 'Juhu', 'Versova',
  'Khar', 'Santa Cruz', 'Kurla', 'Chembur', 'Ghatkopar', 'Mulund',
  'Thane', 'Worli', 'Lower Parel', 'Parel', 'Sion', 'Wadala',
  'Byculla', 'Colaba', 'Fort', 'Churchgate', 'Dahisar', 'Mira Road',
];

const buildSearchIndex = (): SearchItem[] => {
  const items: SearchItem[] = [];

  // Services
  servicePageData.forEach((s) => {
    items.push({ label: s.name, description: `Starting ₹${Math.min(...s.options.map(o => o.price))}`, link: `/services?service=${s.options[0]?.id || s.id}`, type: 'service' });
    s.options.forEach((opt) => {
      items.push({ label: opt.name, description: `₹${opt.price} — ${s.name}`, link: `/services?service=${opt.id}`, type: 'service' });
    });
  });

  // Products from catalog
  products.forEach((p) => {
    items.push({ label: p.name, description: `Polish from ₹${p.startingPrice.toLocaleString('en-IN')}`, link: p.serviceLink, type: 'product' });
  });

  // Locations
  locations.forEach((loc) => {
    items.push({ label: `${loc} Furniture Polish`, description: `Service in ${loc}, Mumbai`, link: '/services', type: 'location' });
  });

  // Core pages
  items.push({ label: 'About Us', description: 'Learn about A1 Furniture Polish', link: '/about', type: 'page' });
  items.push({ label: 'Contact', description: 'Get in touch with us', link: '/contact', type: 'page' });
  items.push({ label: 'Blog', description: 'Tips and guides', link: '/blog', type: 'page' });
  items.push({ label: 'All Services', description: 'Browse all polishing services', link: '/services', type: 'page' });

  return items;
};

const categoryNav = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return searchIndex
      .filter(item => item.label.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))
      .slice(0, 8);
  }, [searchQuery, searchIndex]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearchSelect = (item: SearchItem) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    navigate(item.link);
  };

  const typeColors: Record<string, string> = {
    service: 'bg-amber-100 text-amber-700',
    product: 'bg-blue-100 text-blue-700',
    location: 'bg-green-100 text-green-700',
    page: 'bg-gray-100 text-gray-600',
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const [showPromo, setShowPromo] = useState(true);

  return (
    <header className="sticky top-0 z-[100] bg-white shadow-md">
      
      {/* Main Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-[72px] gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-white font-bold text-base sm:text-lg md:text-xl">A1</span>
            </div>
            <div>
              <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">A1 Furniture Polish</h1>
              <p className="text-[10px] sm:text-[11px] text-amber-600 font-medium leading-tight">Professional Polishing Services</p>
            </div>
          </Link>

          {/* Navigation Links in Header Middle */}
          <nav className="hidden md:flex items-center justify-center gap-8 flex-1 mx-4">
            {categoryNav.map((cat) => (
              <Link
                key={cat.name}
                to={cat.href}
                className={`text-[15px] font-semibold transition-colors whitespace-nowrap px-1 ${
                  isActive(cat.href)
                    ? 'text-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons - Call and WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Call Button */}
            <a
              href="tel:+918828709945"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg sm:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm font-semibold">Call Now</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/918828709945"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#25D366] hover:bg-[#20BA56] text-white rounded-lg sm:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="hidden sm:inline text-sm font-semibold">WhatsApp</span>
            </a>

            {/* Mobile menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-amber-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar in Navigation Bar Slot */}
      <div className="border-t border-gray-100 hidden md:block py-2 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center" ref={searchRef}>
            <div className="relative w-full max-w-xl">
              <div className={`flex items-center border rounded-xl bg-white transition-all duration-200 ${isSearchFocused ? 'border-amber-400 shadow-md ring-2 ring-amber-100' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search Services & Locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="flex-1 px-4 py-2 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
                />
                <button className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-amber-600 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Search Dropdown */}
              {isSearchFocused && (searchResults.length > 0 || searchQuery.trim()) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleSearchSelect(item)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{item.label}</p>
                          <p className="text-xs text-gray-500 truncate">{item.description}</p>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 uppercase ${typeColors[item.type]}`}>
                          {item.type}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-gray-400">
                      No results for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          {/* Mobile Search */}
          <div className="px-4 py-3 border-b border-gray-50">
            <div className={`flex items-center border rounded-lg ${isSearchFocused ? 'border-amber-400' : 'border-gray-200'}`}>
              <input
                type="text"
                placeholder="Search services, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 mr-3" />
            </div>
            {isSearchFocused && searchResults.length > 0 && (
              <div className="mt-2 bg-white rounded-lg border border-gray-100 max-h-48 overflow-y-auto">
                {searchResults.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { handleSearchSelect(item); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-left border-b border-gray-50 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase ${typeColors[item.type]}`}>
                      {item.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nav Links */}
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-amber-600 bg-amber-50'
                    : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Contact */}
          <div className="px-4 pb-4 flex gap-2">
            <a
              href="tel:+918828709945"
              className="flex-1 flex items-center justify-center gap-2 bg-amber-600 text-white py-2.5 rounded-lg text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <a
              href="https://wa.me/918828709945"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA56] text-white py-2.5 rounded-lg text-sm font-medium"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
