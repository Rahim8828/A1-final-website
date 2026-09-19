import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Tag, X } from 'lucide-react';
import { SelectedService } from '../types';
import SEO from '../components/SEO';

interface CartProps {
  selectedServices?: SelectedService[];
  onUpdateQuantity?: (serviceId: string, optionId: string, newQuantity: number) => void;
  onRemoveService?: (serviceId: string, optionId: string) => void;
  onProceedToCheckout?: () => void;
}

const Cart: React.FC<CartProps> = ({
  selectedServices = [],
  onUpdateQuantity = () => {},
  onRemoveService = () => {},
  onProceedToCheckout = () => {},
}) => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle navbar show/hide on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Scrolling up or at top - show navbar
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down - hide navbar
        setShowNavbar(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Valid coupons
  const validCoupons = {
    'FIRST10': { discount: 0.10, description: 'First Booking - 10% OFF' },
  };

  // Calculate totals
  const itemTotal = selectedServices.reduce((sum, service) => sum + service.price * service.quantity, 0);
  
  // Apply coupon discount
  let discount = 0;
  if (appliedCoupon && validCoupons[appliedCoupon as keyof typeof validCoupons]) {
    discount = Math.round(itemTotal * validCoupons[appliedCoupon as keyof typeof validCoupons].discount);
  }
  
  const totalAmount = itemTotal - discount;

  // Handle coupon application
  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (validCoupons[code as keyof typeof validCoupons]) {
      setAppliedCoupon(code);
      setCouponError('');
      setShowCouponModal(false);
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  return (
    <>
      <SEO
        title="Your Cart - A1 Furniture Polish | Review Your Booking"
        description="Review your furniture polishing service booking. Check selected services, pricing, and proceed to checkout for professional furniture care in Mumbai."
        keywords="furniture polish cart, booking review, service checkout, Mumbai furniture services"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Header - Auto-hide on scroll */}
        <header className={`bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30 transition-transform duration-300 ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}>
        <div className="max-w-3xl mx-auto px-3 py-3 md:py-4 flex items-center gap-2 md:gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <h1 className="text-lg md:text-xl font-bold">Your cart</h1>
        </div>
      </header>

      {/* Main Content - Add sufficient top padding for fixed header */}
      <main className="max-w-3xl mx-auto px-3 pt-20 md:pt-24 pb-32 md:pb-8 space-y-4 md:space-y-6">
        {/* Checkout Section */}
        <section className="bg-white rounded-lg p-3 md:p-6 shadow-sm">
          <h2 className="text-base md:text-xl font-bold mb-3">Checkout</h2>
          
          {/* Services List */}
          <div className="space-y-3 md:space-y-6">
            {selectedServices.map((service) => (
              <div key={`${service.serviceId}-${service.optionId}`} className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-xs md:text-base leading-tight">{service.serviceName}</h3>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-xs text-gray-700 flex-1 leading-tight">{service.optionName}</span>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border-2 border-orange-500 rounded-lg px-3 py-1.5">
                      <button
                        onClick={() => {
                          if (service.quantity > 1) {
                            onUpdateQuantity(service.serviceId, service.optionId, service.quantity - 1);
                          } else {
                            onRemoveService(service.serviceId, service.optionId);
                          }
                        }}
                        className="text-orange-600 font-bold text-lg w-6 h-6 flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="font-semibold text-orange-600 min-w-[24px] text-center text-base">
                        {service.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(service.serviceId, service.optionId, service.quantity + 1)}
                        className="text-orange-600 font-bold text-lg w-6 h-6 flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Price */}
                    <span className="font-semibold text-gray-900 min-w-[60px] text-right text-xs md:text-base">
                      ₹{(service.price * service.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coupons Section - Clickable Button */}
        <section className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
          <button
            onClick={() => setShowCouponModal(true)}
            className="w-full flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Tag className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-sm md:text-base">Apply Coupon</p>
                <p className="text-xs text-gray-600">Tap to apply coupon code</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Show applied coupon if exists */}
          {appliedCoupon && (
            <div className="mt-3 flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex-1">
                <p className="font-semibold text-green-800 text-sm">{appliedCoupon} Applied ✓</p>
                <p className="text-xs text-green-700">
                  {validCoupons[appliedCoupon as keyof typeof validCoupons].description}
                </p>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="p-1.5 hover:bg-green-100 rounded-full transition-colors flex-shrink-0"
                aria-label="Remove coupon"
              >
                <X className="w-4 h-4 text-green-700" />
              </button>
            </div>
          )}
        </section>

        {/* Payment Summary */}
        <section className="bg-white rounded-lg p-4 md:p-6 shadow-sm space-y-3">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Payment Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700 text-sm md:text-base">
              <span>Item total</span>
              <span className="font-semibold">₹{itemTotal.toLocaleString('en-IN')}</span>
            </div>
            
            {appliedCoupon && discount > 0 && (
              <div className="flex justify-between text-green-600 text-sm md:text-base">
                <span>Coupon Discount ({appliedCoupon})</span>
                <span className="font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-3 flex justify-between text-gray-900">
              <span className="font-bold text-base md:text-xl">Total</span>
              <span className="font-bold text-base md:text-xl">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom CTA - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onProceedToCheckout}
            className="w-full bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-700 transition-colors text-base shadow-lg active:scale-[0.98]"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
          {/* Modal Content */}
          <div className="bg-white w-full md:max-w-lg md:rounded-2xl rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Apply Coupon</h3>
              <button
                onClick={() => setShowCouponModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Coupon Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 uppercase text-base"
                  autoFocus
                />
                {couponError && (
                  <p className="mt-2 text-sm text-red-600">{couponError}</p>
                )}
              </div>

              {/* Available Coupons */}
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-sm font-semibold text-gray-800 mb-3">Available Coupons:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-base">FIRST10</p>
                      <p className="text-sm text-gray-600">First Booking - 10% OFF</p>
                    </div>
                    <button
                      onClick={() => {
                        setCouponCode('FIRST10');
                        setCouponError('');
                      }}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 px-3 py-1 border border-orange-600 rounded-md"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApplyCoupon}
                disabled={!couponCode.trim()}
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-lg hover:bg-orange-700 transition-colors text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Apply Coupon
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Cart;
