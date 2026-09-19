import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { servicePageData } from '../data/servicePageData';
import ServiceDetailModal from '../components/ServiceDetailModal';
import BookingSummary from '../components/BookingSummary';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCanonicalURL } from '../utils/canonicalURL';
import CouponModal from '../components/CouponModal';
import CouponSection from '../components/CouponSection';
import PaymentSummary from '../components/PaymentSummary';
import CartIcon from '../components/CartIcon';
import FloatingCartButton from '../components/FloatingCartButton';
import Toast from '../components/Toast';
import { SelectedService } from '../types';
import { openWhatsAppBooking } from '../utils/whatsappBooking';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAnalytics } from '../hooks/useAnalytics';

// Constants for quantity limits
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

// Cart version - increment this when cart structure changes
const CART_VERSION = '1.0.0';

const IkeaAssembly = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useLocalStorage<SelectedService[]>('cart', []);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const analytics = useAnalytics();

  // Filter only IKEA services
  const ikeaServices = useMemo(() => {
    return servicePageData.filter(service => service.tabCategory === 'ikea');
  }, []);

  // Handle URL parameter for opening service modal
  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId && ikeaServices.find(s => s.id === serviceId)) {
      setSelectedServiceId(serviceId);
      searchParams.delete('service');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, ikeaServices]);

  // Check cart version and clear if outdated
  useEffect(() => {
    const storedVersion = localStorage.getItem('cartVersion');
    if (storedVersion !== CART_VERSION) {
      localStorage.removeItem('cart');
      localStorage.setItem('cartVersion', CART_VERSION);
      setSelectedServices([]);
    }
  }, [setSelectedServices]);

  // Handle browser back button for cart
  useEffect(() => {
    const handlePopState = () => {
      if (showCart) {
        setShowCart(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showCart]);

  // Update URL when cart opens/closes
  useEffect(() => {
    if (showCart) {
      window.history.pushState({ cart: true }, '', '?cart=open');
    } else if (window.location.search.includes('cart=open')) {
      window.history.pushState({}, '', window.location.pathname);
    }
  }, [showCart]);

  // Valid coupons
  const validCoupons: { [key: string]: { discount: number; description: string } } = {
    'FIRST10': { discount: 0.10, description: 'First Booking - 10% OFF' },
  };

  // Coupon handlers
  const handleApplyCoupon = useCallback((code: string) => {
    setAppliedCoupon(code);
  }, []);

  const handleRemoveCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const handleViewDetails = (serviceId: string) => {
    const service = ikeaServices.find(s => s.id === serviceId);
    if (service) {
      analytics.trackServiceView(serviceId, service.name);
    }
    setSelectedServiceId(serviceId);
  };

  const handleCloseModal = () => {
    setSelectedServiceId(null);
  };

  const calculateTotal = useMemo((): number => {
    return selectedServices.reduce((sum, service) => {
      return sum + service.price * service.quantity;
    }, 0);
  }, [selectedServices]);

  const addService = useCallback(
    (serviceId: string, optionIndex: number, quantity: number = 1) => {
      setIsAddingToCart(true);
      
      try {
        const service = ikeaServices.find((s) => s.id === serviceId);
        if (!service) {
          return;
        }

        const option = service.options[optionIndex];
        if (!option) {
          return;
        }

        const validQuantity = Math.max(MIN_QUANTITY, Math.min(MAX_QUANTITY, quantity));

      setSelectedServices((prevServices) => {
        const existingIndex = prevServices.findIndex(
          (s) => s.serviceId === serviceId && s.optionId === (option.id || `${serviceId}-${optionIndex}`)
        );

        if (existingIndex >= 0) {
          const updated = [...prevServices];
          const newQuantity = Math.min(updated[existingIndex].quantity + validQuantity, MAX_QUANTITY);
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQuantity,
          };
          return updated;
        } else {
          const newService: SelectedService = {
            serviceId: service.id,
            serviceName: service.name,
            optionId: option.id || `${serviceId}-${optionIndex}`,
            optionName: option.name,
            price: option.price,
            quantity: validQuantity,
            image: service.image,
          };
          return [...prevServices, newService];
        }
      });
        setToastMessage(`${option.name} added to cart`);
      } finally {
        setTimeout(() => setIsAddingToCart(false), 300);
      }
    },
    [setSelectedServices, ikeaServices]
  );

  const updateQuantity = useCallback((serviceId: string, optionId: string, newQuantity: number) => {
    const validQuantity = Math.max(MIN_QUANTITY, Math.min(MAX_QUANTITY, newQuantity));

    setSelectedServices((prevServices) => {
      return prevServices.map((service) => {
        if (service.serviceId === serviceId && service.optionId === optionId) {
          return {
            ...service,
            quantity: validQuantity,
          };
        }
        return service;
      });
    });
  }, [setSelectedServices]);

  const removeService = useCallback((serviceId: string, optionId: string) => {
    setSelectedServices((prevServices) => {
      return prevServices.filter((service) => {
        return !(service.serviceId === serviceId && service.optionId === optionId);
      });
    });
  }, [setSelectedServices]);

  const handleAddService = (serviceId: string, optionIndex: number, quantity: number = 1) => {
    addService(serviceId, optionIndex, quantity);
  };

  const handleViewCart = useCallback(() => {
    analytics.trackViewCart(selectedServices.length, calculateTotal);
    setShowCart(true);
  }, [selectedServices.length, calculateTotal, analytics]);

  const handleBookNow = useCallback(() => {
    setBookingError(null);
    setIsLoading(true);

    try {
      if (selectedServices.length === 0) {
        setBookingError('Please select at least one service before booking');
        setIsLoading(false);
        return;
      }

      analytics.trackBooking(selectedServices.length, calculateTotal);
      openWhatsAppBooking(selectedServices, calculateTotal);
      
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to open WhatsApp. Please try again.';
      setBookingError(errorMessage);
      setIsLoading(false);
    }
  }, [selectedServices, calculateTotal, analytics]);

  const getSelectedOptions = (serviceId: string): number[] => {
    const service = ikeaServices.find((s) => s.id === serviceId);
    if (!service) return [];

    return service.options
      .map((option, index) => {
        const optionId = option.id || `${serviceId}-${index}`;
        const isSelected = selectedServices.some((s) => s.serviceId === serviceId && s.optionId === optionId);
        return isSelected ? index : -1;
      })
      .filter((index) => index >= 0);
  };

  const selectedService = ikeaServices.find((s) => s.id === selectedServiceId);

  return (
    <>
      <SEO 
        title="IKEA Furniture Assembly Services - A1 Assembly | Professional Assembly"
        description="Book professional IKEA furniture assembly services in Mumbai. Bed, wardrobe, dining, table assembly with 60 days warranty. Expert assembly, all tools provided."
        keywords="IKEA assembly Mumbai, furniture assembly, bed assembly, wardrobe assembly, professional assembly service"
        canonical={getCanonicalURL('/ikea-assembly')}
        image="/assets/Bed-polish.webp"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b-2 border-amber-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-10 md:w-12 flex items-center justify-center">
                </div>
              </div>
              
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg 
                    className="w-6 h-6 md:w-7 md:h-7 text-amber-600 hidden sm:block" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <h1 className="text-lg sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    IKEA Furniture Assembly
                  </h1>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base font-medium">
                  Professional assembly • 60 Days Warranty • Trained Experts
                </p>
              </div>
              
              <div className="flex items-center">
                <CartIcon
                  itemCount={selectedServices.length}
                  onClick={handleViewCart}
                />
              </div>
            </div>
          </div>
        </header>

      {/* Category Grid Section */}
      <section className="bg-gray-50 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 sm:gap-2">
            {ikeaServices.map((service) => (
              <button
                key={service.id}
                onClick={() => handleViewDetails(service.id)}
                className="flex flex-col items-center gap-1 p-1.5 sm:p-2 bg-white rounded-md hover:shadow-md active:shadow-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-amber-600 group"
                type="button"
              >
                <div className="w-full aspect-square bg-gray-50 rounded overflow-hidden flex items-center justify-center p-1 sm:p-1.5 group-hover:bg-gray-100 transition-colors">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-[9px] sm:text-[10px] font-medium text-gray-900 text-center line-clamp-2 w-full leading-tight">
                  {service.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {ikeaServices.map((service) => {
          const minPrice = Math.min(...service.options.map(opt => opt.price));
          
          return (
            <section key={service.id} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {service.name}
              </h2>

              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {service.name}
                    </h3>

                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
                      <span className="text-xs text-gray-600">
                        ({service.reviewCount >= 1000 ? `${(service.reviewCount / 1000).toFixed(1)}K` : service.reviewCount} reviews)
                      </span>
                    </div>

                    <p className="text-base sm:text-lg font-bold text-gray-900">
                      Starts at ₹{minPrice.toLocaleString()}
                    </p>

                    <div className="border-t border-gray-200"></div>

                    <ul className="space-y-1.5">
                      {service.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                          <span className="text-gray-400">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleViewDetails(service.id)}
                      className="text-amber-600 font-semibold text-sm hover:text-amber-700 transition-colors"
                      type="button"
                    >
                      View details
                    </button>
                  </div>

                  <div className="flex flex-col items-center gap-2 w-32 sm:w-40 flex-shrink-0">
                    <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-3">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <button
                      onClick={() => handleViewDetails(service.id)}
                      className="w-full px-4 py-2 bg-white text-amber-600 font-semibold text-sm rounded-lg border-2 border-amber-600 hover:bg-amber-50 active:scale-95 transition-all duration-200"
                      type="button"
                    >
                      Add
                    </button>

                    <p className="text-xs text-gray-600">
                      {service.options.length} options
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <ServiceDetailModal
        service={selectedService || null}
        isOpen={!!selectedServiceId}
        onClose={handleCloseModal}
        onAddService={handleAddService}
        onRemoveService={removeService}
        onUpdateQuantity={updateQuantity}
        onViewCart={handleViewCart}
        selectedOptions={selectedServiceId ? getSelectedOptions(selectedServiceId) : []}
      />

      {!showCart && (
        <BookingSummary
          selectedServices={selectedServices}
          totalPrice={calculateTotal}
          onUpdateQuantity={updateQuantity}
          onRemoveService={removeService}
          onBookNow={handleBookNow}
          onViewCart={handleViewCart}
          showDoneButton={selectedServices.length > 0}
        />
      )}

      {showCart && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto md:pb-0 pb-20">
          <div className="min-h-screen md:min-h-auto">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h1 className="text-xl font-bold">Your cart</h1>
                </div>
                {selectedServices.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Clear all items from cart?')) {
                        setSelectedServices([]);
                        setShowCart(false);
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                    type="button"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-40 md:pb-32">
              {selectedServices.length === 0 ? (
                <section className="bg-white rounded-lg p-8 shadow-sm text-center">
                  <div className="max-w-sm mx-auto">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Add services to get started with your booking</p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                      type="button"
                    >
                      Browse Services
                    </button>
                  </div>
                </section>
              ) : (
                <>
                  <section className="bg-white rounded-lg p-4 shadow-sm">
                    <h2 className="text-lg font-bold mb-4">Checkout</h2>
                    
                    <div className="space-y-6">
                  {selectedServices.map((service) => {
                    const currentServiceId = service.serviceId;
                    const currentOptionId = service.optionId;
                    const currentQuantity = service.quantity;
                    
                    return (
                      <div key={`${currentServiceId}-${currentOptionId}`} className="space-y-3">
                        <h3 className="font-semibold text-gray-900">{service.serviceName}</h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{service.optionName}</span>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 border-2 border-amber-600 rounded-lg px-3 py-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (currentQuantity > 1) {
                                    updateQuantity(currentServiceId, currentOptionId, currentQuantity - 1);
                                  } else {
                                    removeService(currentServiceId, currentOptionId);
                                  }
                                }}
                                className="text-amber-600 font-bold text-lg w-6 h-6 flex items-center justify-center hover:bg-amber-50 rounded transition-colors"
                                type="button"
                              >
                                −
                              </button>
                              <span className="font-semibold text-amber-600 min-w-[20px] text-center">
                                {currentQuantity}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(currentServiceId, currentOptionId, currentQuantity + 1);
                                }}
                                className="text-amber-600 font-bold text-lg w-6 h-6 flex items-center justify-center hover:bg-amber-50 rounded transition-colors"
                                type="button"
                              >
                                +
                              </button>
                            </div>
                          
                            <span className="font-semibold text-gray-900 min-w-[80px] text-right">
                              ₹{(service.price * currentQuantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <CouponSection
                appliedCoupon={appliedCoupon}
                validCoupons={validCoupons}
                onOpenModal={() => setShowCouponModal(true)}
              />

              <PaymentSummary
                itemTotal={calculateTotal}
                appliedCoupon={appliedCoupon}
                validCoupons={validCoupons}
              />
              </>
              )}
            </main>

            {selectedServices.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg mb-20 md:mb-0 z-40">
              <div className="max-w-3xl mx-auto">
                <button
                  onClick={handleBookNow}
                  className="w-full bg-amber-600 text-white font-semibold py-4 rounded-lg hover:bg-amber-700 transition-colors shadow-md active:scale-95"
                >
                  Book Now
                </button>
              </div>
              </div>
            )}
          </div>
        </div>
      )}

      <CouponModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        appliedCoupon={appliedCoupon}
        validCoupons={validCoupons}
      />

      {bookingError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideInUp">
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">{bookingError}</span>
            <button
              onClick={() => setBookingError(null)}
              className="ml-2 hover:bg-red-600 rounded p-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <LoadingSpinner size="lg" text="Opening WhatsApp..." />
          </div>
        </div>
      )}

      {!showCart && (
        <FloatingCartButton
          itemCount={selectedServices.length}
          onClick={handleViewCart}
        />
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}

      {isAddingToCart && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-sm">
          <div className="bg-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-lg flex items-center gap-2 sm:gap-3 mx-auto">
            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-amber-600 flex-shrink-0"></div>
            <span className="font-medium text-gray-900 text-sm sm:text-base">Adding to cart...</span>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default IkeaAssembly;
