import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { MdBrush } from 'react-icons/md';
import { FaChair } from 'react-icons/fa';
import { Package } from 'lucide-react';

const navigation = [
  { name: 'A1', href: '/', icon: HiHome },
  { name: 'Polish', href: '/services?tab=polish', icon: MdBrush },
  { name: 'Products', href: '/services#products', icon: Package },
  { name: 'Sofa', href: '/sofa-fabric-change', icon: FaChair },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab');
  
  const isActive = (href: string) => {
    // For home page
    if (href === '/') {
      return location.pathname === '/';
    }
    
    // For sofa fabric change
    if (href === '/sofa-fabric-change') {
      return location.pathname === '/sofa-fabric-change';
    }
    
    // For services with tabs
    if (href.includes('/services')) {
      if (!location.pathname.startsWith('/services')) {
        return false;
      }
      
      // Check if this is a tab-specific link
      if (href.includes('tab=polish')) {
        return currentTab === 'polish' || (!currentTab && location.pathname === '/services');
      }
      if (href.includes('#products')) {
        return location.hash === '#products' || location.pathname === '/services';
      }
      
      return false;
    }
    
    return location.pathname === href;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle products section scroll
    if (href === '/services#products') {
      e.preventDefault();
      
      if (location.pathname === '/services') {
        // Already on services page, just scroll
        const element = document.querySelector('[data-products-section]');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to services page with hash
        navigate('/services#products');
      }
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 border-t border-gray-200 safe-area-inset-bottom">
      <div className="flex justify-around items-center max-w-full mx-auto px-1.5 py-0.5">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-0.5 rounded-lg transition-all duration-200 ${
              isActive(item.href)
                ? 'text-amber-600 bg-amber-50'
                : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className={`${isActive(item.href) ? 'w-[18px] h-[18px]' : 'w-4 h-4'} transition-all duration-200`} />
            <span className={`text-[9px] mt-0.5 font-medium ${isActive(item.href) ? 'font-semibold' : ''}`}>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
