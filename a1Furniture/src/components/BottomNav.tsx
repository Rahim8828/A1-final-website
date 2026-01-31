import { Link, useLocation } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { MdBrush } from 'react-icons/md';
import { FaChair, FaTools } from 'react-icons/fa';

const navigation = [
  { name: 'A1', href: '/', icon: HiHome },
  { name: 'Polish', href: '/services', icon: MdBrush },
  { name: 'IKEA', href: '/ikea-assembly', icon: FaTools },
  { name: 'Sofa', href: '/sofa-fabric-change', icon: FaChair },
];

const BottomNav = () => {
  const location = useLocation();
  const isActive = (href: string) => {
    // Highlight Polish tab for all service pages
    if (href === '/services') {
      return location.pathname.startsWith('/services');
    }
    return location.pathname === href;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50 border-t border-gray-200 safe-area-inset-bottom">
      <div className="flex justify-around items-center max-w-full mx-auto px-1.5 py-0.5">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
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
