import React from 'react';

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ itemCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2.5 md:p-3 hover:bg-white/80 active:bg-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 shadow-sm hover:shadow-md group"
      aria-label={`View cart with ${itemCount} items`}
      type="button"
    >
      <svg
        className="w-6 h-6 md:w-7 md:h-7 text-gray-900 group-hover:text-amber-600 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      
      {/* Cart Item Count Badge - Enhanced */}
      {itemCount > 0 && (
        <span 
          className="absolute -top-1 -right-1 bg-gradient-to-br from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full min-w-[22px] h-[22px] px-1.5 flex items-center justify-center shadow-lg border-2 border-white animate-scale-in"
          aria-label={`${itemCount} items in cart`}
        >
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
