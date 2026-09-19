import { useState, useCallback, useMemo } from 'react';
import SEOHead from '../components/SEO';
import { getCanonicalURL } from '../utils/canonicalURL';
import ServiceDetailModal from '../components/ServiceDetailModal';
import CartIcon from '../components/CartIcon';
import FloatingCartButton from '../components/FloatingCartButton';
import BookingSummary from '../components/BookingSummary';
import { SelectedService } from '../types';
import { openWhatsAppBooking } from '../utils/whatsappBooking';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Sofa Services Data
const sofaServicesData = [
  {
    id: 'sofa-fabric-change',
    name: 'Sofa Fabric Change',
    category: 'sofa-services',
    rating: 4.8,
    reviewCount: 1456,
    duration: '~4 hrs',
    features: [
      'Labor costs only, fabric cost separate',
      'High-quality fabric options',
      'Professional installation',
    ],
    image: '/assets/Sofa_Fabric_Change_20.webp',
    options: [
      { id: 'sofa-1seater', name: '1 Seater Sofa', price: 3499, rating: 4.8, reviewCount: 234, estimatedTime: '3 hrs' },
      { id: 'sofa-2seater', name: '2 Seater Sofa', price: 4499, rating: 4.9, reviewCount: 345, estimatedTime: '4 hrs' },
      { id: 'sofa-3seater', name: '3 Seater Sofa', price: 5999, rating: 4.8, reviewCount: 456, estimatedTime: '5 hrs' },
      { id: 'sofa-lshape', name: 'L Shape Sofa', price: 8999, rating: 4.9, reviewCount: 234, estimatedTime: '6 hrs' },
      { id: 'sofa-cumbed', name: 'Sofa Cumbed', price: 5999, rating: 4.7, reviewCount: 187, estimatedTime: '5 hrs' },
      { id: 'bed-side-3', name: 'Bed Side 3 Side', price: 3499, rating: 4.8, reviewCount: 123, estimatedTime: '3 hrs' },
      { id: 'recliner-1', name: 'Recliner 1 Seater', price: 4499, rating: 4.9, reviewCount: 156, estimatedTime: '3.5 hrs' },
      { id: 'recliner-2', name: 'Recliner 2 Seater', price: 7499, rating: 4.8, reviewCount: 198, estimatedTime: '5 hrs' },
      { id: 'recliner-3', name: 'Recliner 3 Seater', price: 9999, rating: 4.9, reviewCount: 145, estimatedTime: '6 hrs' },
      { id: 'recliner-311', name: 'Recliner 3-1-1 Seater', price: 13999, rating: 4.8, reviewCount: 89, estimatedTime: '7 hrs' },
    ],
    selectedOption: -1,
    priceIncludes: ['Labor cost', 'Professional installation', 'Old fabric removal', 'Free consultation'],
    materials: ['/assets/Sofa_Fabric_Change_20.webp'],
    processSteps: [
      {
        step: 1,
        title: 'Consultation & Booking',
        description: 'Book your service online or via WhatsApp. Our team will confirm your appointment and discuss fabric options.',
        image: '/assets/consultation-booking.webp'
      },
      {
        step: 2,
        title: 'Fabric Selection',
        description: 'Choose from a wide range of high-quality fabrics. Our expert will help you select the perfect fabric for your sofa.',
        image: '/assets/Sofa_Fabric_Change_20.webp'
      },
      {
        step: 3,
        title: 'Old Fabric Removal',
        description: 'Our professionals carefully remove the old fabric without damaging the sofa frame or cushions.',
        image: '/assets/Cleaning & Sanding.webp'
      },
      {
        step: 4,
        title: 'Frame Inspection & Repair',
        description: 'We inspect the sofa frame and cushions, making any necessary repairs before installing new fabric.',
        image: '/assets/filling-gaps-polish-application.webp'
      },
      {
        step: 5,
        title: 'New Fabric Installation',
        description: 'Professional installation of your chosen fabric with precise stitching and finishing.',
        image: '/assets/drying-finishing.webp'
      },
      {
        step: 6,
        title: 'Quality Check & Handover',
        description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed sofa.',
        image: '/assets/wooden furniture .webp'
      }
    ],
    faqs: [
      {
        question: 'How long does sofa fabric change take?',
        answer: 'Typically, sofa fabric change takes 3-6 hours depending on the size and type of sofa. We ensure thorough work without rushing.'
      },
      {
        question: 'Is fabric cost included in the price?',
        answer: 'No, the price shown is for labor only. Fabric cost is separate and depends on your choice of material and quality.'
      },
      {
        question: 'What types of fabric are available?',
        answer: 'We offer a wide range of fabrics including cotton, linen, velvet, leather, and synthetic options in various colors and patterns.'
      },
      {
        question: 'Do you provide warranty on the work?',
        answer: 'Yes, we provide warranty on the installation work. The fabric warranty depends on the manufacturer.'
      },
      {
        question: 'Can you repair the sofa frame if needed?',
        answer: 'Yes, we inspect the frame during fabric removal and can make necessary repairs at an additional cost.'
      }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' },
    ],
  },
  {
    id: 'office-chair-repair',
    name: 'Office Chair Repair',
    category: 'chair-repair',
    rating: 4.8,
    reviewCount: 1234,
    duration: '~1 hr',
    features: [
      'On-site repair service',
      'High-quality spare parts',
      'Warranty on replaced parts',
    ],
    image: '/assets/Chair Repair.jpg',
    options: [
      { id: 'chair-steel-base', name: 'Steel Finish Base', price: 749, rating: 4.8, reviewCount: 345, estimatedTime: '1 hr' },
      { id: 'chair-black-base', name: 'Black Finish Base', price: 619, rating: 4.8, reviewCount: 289, estimatedTime: '1 hr' },
      { id: 'chair-nylon-base', name: 'Nylon Base', price: 549, rating: 4.7, reviewCount: 234, estimatedTime: '1 hr' },
      { id: 'chair-plastic-base', name: 'Plastic Base', price: 549, rating: 4.7, reviewCount: 198, estimatedTime: '1 hr' },
      { id: 'chair-wheel', name: 'Wheel Replacement', price: 449, rating: 4.8, reviewCount: 156, estimatedTime: '45 mins' },
      { id: 'chair-hydraulic', name: 'Hydraulic Replacement', price: 599, rating: 4.9, reviewCount: 212, estimatedTime: '1 hr' },
    ],
    selectedOption: -1,
    priceIncludes: ['Labour charge (₹249 included)', 'High-quality spare parts', 'On-site repair', 'Warranty on parts'],
    materials: ['/assets/Chair Repair.jpg'],
    processSteps: [
      {
        step: 1,
        title: 'Consultation & Booking',
        description: 'Book your service online or via WhatsApp. Our team will confirm your appointment and discuss the repair needed.',
        image: '/assets/consultation-booking.webp'
      },
      {
        step: 2,
        title: 'Chair Inspection',
        description: 'Our technician inspects your office chair to identify the exact issue and required parts.',
        image: '/assets/Chair Repair.jpg'
      },
      {
        step: 3,
        title: 'Part Removal',
        description: 'Carefully remove the damaged or worn-out part (base, wheels, or hydraulic) from your chair.',
        image: '/assets/Cleaning & Sanding.webp'
      },
      {
        step: 4,
        title: 'New Part Installation',
        description: 'Install the new high-quality replacement part with proper tools and techniques.',
        image: '/assets/filling-gaps-polish-application.webp'
      },
      {
        step: 5,
        title: 'Testing & Adjustment',
        description: 'Test the chair for proper functionality and make necessary adjustments for comfort.',
        image: '/assets/drying-finishing.webp'
      },
      {
        step: 6,
        title: 'Quality Check & Handover',
        description: 'Final inspection to ensure everything works perfectly. We clean up and hand over your repaired chair.',
        image: '/assets/wooden furniture .webp'
      }
    ],
    faqs: [
      {
        question: 'How long does office chair repair take?',
        answer: 'Most repairs take 45 minutes to 1 hour. We complete the work on-site at your location.'
      },
      {
        question: 'What parts can you replace?',
        answer: 'We can replace chair bases (steel, black, nylon, plastic), wheels, hydraulic cylinders, armrests, and other components.'
      },
      {
        question: 'Do you provide warranty on replaced parts?',
        answer: 'Yes, we provide warranty on all replaced parts. The warranty period varies by part type.'
      },
      {
        question: 'Is labour charge included in the price?',
        answer: 'Yes, labour charge of ₹249 is included in all our chair repair prices.'
      },
      {
        question: 'Do you repair chairs at my office?',
        answer: 'Yes, we provide on-site repair service at your home or office location.'
      }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' },
    ],
  },
];

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

const SofaServices = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useLocalStorage<SelectedService[]>('cart', []);
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = useMemo((): number => {
    return selectedServices.reduce((sum, service) => sum + service.price * service.quantity, 0);
  }, [selectedServices]);

  const addService = useCallback(
    (serviceId: string, optionIndex: number, quantity: number = 1) => {
      const service = sofaServicesData.find((s) => s.id === serviceId);
      if (!service) return;

      const option = service.options[optionIndex];
      if (!option) return;

      const validQuantity = Math.max(MIN_QUANTITY, Math.min(MAX_QUANTITY, quantity));

      setSelectedServices((prevServices) => {
        const existingIndex = prevServices.findIndex(
          (s) => s.serviceId === serviceId && s.optionId === option.id
        );

        if (existingIndex >= 0) {
          const updated = [...prevServices];
          const newQuantity = Math.min(updated[existingIndex].quantity + validQuantity, MAX_QUANTITY);
          updated[existingIndex] = { ...updated[existingIndex], quantity: newQuantity };
          return updated;
        } else {
          const newService: SelectedService = {
            serviceId: service.id,
            serviceName: service.name,
            optionId: option.id,
            optionName: option.name,
            price: option.price,
            quantity: validQuantity,
            image: service.image,
          };
          return [...prevServices, newService];
        }
      });
    },
    [setSelectedServices]
  );

  const updateQuantity = useCallback((serviceId: string, optionId: string, newQuantity: number) => {
    const validQuantity = Math.max(MIN_QUANTITY, Math.min(MAX_QUANTITY, newQuantity));
    setSelectedServices((prevServices) =>
      prevServices.map((service) =>
        service.serviceId === serviceId && service.optionId === optionId
          ? { ...service, quantity: validQuantity }
          : service
      )
    );
  }, [setSelectedServices]);

  const removeService = useCallback((serviceId: string, optionId: string) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((service) => !(service.serviceId === serviceId && service.optionId === optionId))
    );
  }, [setSelectedServices]);

  const handleViewDetails = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

  const handleCloseModal = () => {
    setSelectedServiceId(null);
  };

  const handleAddService = (serviceId: string, optionIndex: number, quantity: number = 1) => {
    addService(serviceId, optionIndex, quantity);
  };

  const handleViewCart = useCallback(() => {
    setShowCart(true);
  }, []);

  const handleBookNow = useCallback(() => {
    setIsLoading(true);
    try {
      if (selectedServices.length === 0) {
        alert('Please select at least one service');
        setIsLoading(false);
        return;
      }
      openWhatsAppBooking(selectedServices, calculateTotal);
      setIsLoading(false);
    } catch (error) {
      // Error logged for debugging (removed in production build)
      setIsLoading(false);
    }
  }, [selectedServices, calculateTotal]);

  const getSelectedOptions = (serviceId: string): number[] => {
    const service = sofaServicesData.find((s) => s.id === serviceId);
    if (!service) return [];

    return service.options
      .map((option, index) => {
        const isSelected = selectedServices.some((s) => s.serviceId === serviceId && s.optionId === option.id);
        return isSelected ? index : -1;
      })
      .filter((index) => index >= 0);
  };

  const selectedService = sofaServicesData.find((s) => s.id === selectedServiceId);

  return (
    <>
      <SEOHead 
        title="Sofa Services - Fabric Change & Chair Repair | A1 Polish"
        description="Professional sofa fabric change and office chair repair services in Mumbai. Expert service with warranty."
        keywords="sofa fabric change, office chair repair, furniture repair Mumbai"
        canonical={getCanonicalURL('/sofa-fabric-change')}
        image="/assets/Sofa_Fabric_Change_20.webp"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b-2 border-amber-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  Sofa Services
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base font-medium">
                  Fabric Change • Chair Repair • Expert Service
                </p>
              </div>
              <div className="flex items-center">
                <CartIcon itemCount={selectedServices.length} onClick={handleViewCart} />
              </div>
            </div>
          </div>
        </header>

        {/* Services List */}
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {sofaServicesData.map((service) => {
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
                        <span className="text-xs text-gray-600">({service.reviewCount} reviews)</span>
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
                        className="w-full px-4 py-2 bg-white text-amber-600 font-semibold text-sm rounded-lg border-2 border-amber-600 hover:bg-amber-50 active:scale-95 transition-all"
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

        {/* Service Detail Modal */}
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

        {/* Booking Summary */}
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

        {/* Cart View */}
        {showCart && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto md:pb-0 pb-20">
            <div className="min-h-screen md:min-h-auto">
              {/* Header */}
              <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowCart(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Go back"
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
                {/* Empty Cart Message */}
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
                    {/* Checkout Section */}
                    <section className="bg-white rounded-lg p-4 shadow-sm">
                      <h2 className="text-lg font-bold mb-4">Checkout</h2>
                      
                      {/* Services List */}
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
                                  {/* Quantity Selector */}
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
                                      aria-label="Decrease quantity"
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
                                      aria-label="Increase quantity"
                                      type="button"
                                    >
                                      +
                                    </button>
                                  </div>
                                
                                  {/* Price */}
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

                    {/* Payment Summary */}
                    <section className="bg-white rounded-lg p-4 shadow-sm">
                      <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-700">
                          <span>Item total</span>
                          <span>₹{calculateTotal.toLocaleString()}</span>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-3">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>₹{calculateTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}
              </main>

              {/* Bottom CTA - Above bottom nav on mobile - Only show if cart has items */}
              {selectedServices.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg mb-20 md:mb-0 z-40">
                  <div className="max-w-3xl mx-auto">
                    <button
                      onClick={handleBookNow}
                      disabled={isLoading}
                      className="w-full bg-amber-600 text-white font-semibold py-4 rounded-lg hover:bg-amber-700 transition-colors shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Opening WhatsApp...' : 'Book Now'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Floating Cart Button */}
        {!showCart && (
          <FloatingCartButton
            itemCount={selectedServices.length}
            onClick={handleViewCart}
          />
        )}
      </div>
    </>
  );
};

export default SofaServices;
