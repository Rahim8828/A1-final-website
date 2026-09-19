import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { MdBrush } from 'react-icons/md';
import { FaChair } from 'react-icons/fa';
import { ShoppingBag } from 'lucide-react';

const navigation = [
  { name: 'A1', href: '/', icon: HiHome },
  { name: 'Polish', href: '/services?tab=polish', icon: MdBrush },
  { name: 'Sofa', href: '/sofa-fabric-change', icon: FaChair },
  { name: 'Cart', href: '/services?cart=open', icon: ShoppingBag, isCart: true },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState<number>(0);

  // Synchronize cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          const parsed = JSON.parse(cartData);
          if (Array.isArray(parsed)) {
            const count = parsed.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
            setCartCount(count);
            return;
          }
        }
      } catch (e) {
        // ignore parse error
      }
      setCartCount(0);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    if (href === '/sofa-fabric-change') {
      return location.pathname === '/sofa-fabric-change';
    }
    if (href.includes('cart=open')) {
      return location.search.includes('cart=open');
    }
    if (href.includes('/services')) {
      return location.pathname.startsWith('/services') && !location.search.includes('cart=open');
    }
    return location.pathname === href;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('cart=open')) {
      if (location.pathname === '/services') {
        e.preventDefault();
        navigate('/services?cart=open');
      }
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 border-t border-gray-200 safe-area-inset-bottom">
      <div className="flex justify-around items-center max-w-full mx-auto px-1.5 py-1">
        {navigation.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 px-0.5 rounded-lg transition-all duration-200 ${
                active
                  ? 'text-amber-600 bg-amber-50'
                  : 'text-gray-600 hover:text-amber-600 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <Icon className={`${active ? 'w-5 h-5' : 'w-4 h-4'} transition-all duration-200`} />
                {item.isCart && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-gradient-to-br from-amber-500 to-amber-600 text-white text-[9px] font-bold rounded-full min-w-[15px] h-[15px] px-1 flex items-center justify-center border border-white shadow-sm">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 font-medium ${active ? 'font-semibold text-amber-600' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
