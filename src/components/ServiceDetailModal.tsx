import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { X, ArrowLeft, Shield, Wrench, Award, Umbrella, FileCheck, ChevronDown, ChevronLeft, ChevronRight, UserCheck, GraduationCap, BadgeCheck } from 'lucide-react';
import { ServiceData, ServiceOption } from '../types';
import ServiceOptionCard from './ServiceOptionCard';
import OptimizedImage from '../../src/components/OptimizedImage';
import ServiceSelectionSummary from './ServiceSelectionSummary';
import ProductDetailModal from './ProductDetailModal';

interface ServiceDetailModalProps {
  service: ServiceData | null;
  isOpen: boolean;
  onClose: () => void;
  onAddService: (serviceId: string, optionIndex: number, quantity: number) => void;
  onRemoveService: (serviceId: string, optionId: string) => void;
  onUpdateQuantity: (serviceId: string, optionId: string, quantity: number) => void;
  onViewCart?: () => void;
  selectedOptions: number[];
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onAddService,
  onRemoveService,
  onUpdateQuantity,
  onViewCart,
  selectedOptions,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [selectedProductOption, setSelectedProductOption] = useState<{ option: ServiceOption, index: number } | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleAdd = (optionIndex: number) => {
    onAddService(service!.id, optionIndex, 1);
    setQuantities(prev => ({ ...prev, [optionIndex]: 1 }));
  };

  const handleIncrease = (optionIndex: number) => {
    const currentQty = quantities[optionIndex] || 1;
    const newQty = currentQty + 1;
    const option = service!.options[optionIndex];
    onUpdateQuantity(service!.id, option.id || `${service!.id}-${optionIndex}`, newQty);
    setQuantities(prev => ({ ...prev, [optionIndex]: newQty }));
  };

  const handleDecrease = (optionIndex: number) => {
    const currentQty = quantities[optionIndex] || 1;
    const option = service!.options[optionIndex];
    const optionId = option.id || `${service!.id}-${optionIndex}`;

    if (currentQty > 1) {
      // Just decrease quantity
      const newQty = currentQty - 1;
      onUpdateQuantity(service!.id, optionId, newQty);
      setQuantities(prev => ({ ...prev, [optionIndex]: newQty }));
    } else {
      // Remove service completely
      onRemoveService(service!.id, optionId);
      setQuantities(prev => {
        const newQty = { ...prev };
        delete newQty[optionIndex];
        return newQty;
      });
    }
  };

  // Handle product option click - opens detail modal
  const handleProductClick = (option: ServiceOption, index: number) => {
    setSelectedProductOption({ option, index });
  };

  // Close product detail modal
  const closeProductDetail = () => {
    setSelectedProductOption(null);
  };

  // Check scroll position and update buttons
  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  // Scroll left
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: -240, behavior: 'smooth' });
  };

  // Scroll right
  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: 240, behavior: 'smooth' });
  };

  // Reset quantities when modal opens
  useEffect(() => {
    if (isOpen && service) {
      const initialQty: { [key: number]: number } = {};
      service.options.forEach((_, index) => {
        if (selectedOptions.includes(index)) {
          initialQty[index] = 1;
        }
      });
      setQuantities(initialQty);
      // Reset scroll position and check buttons
      setTimeout(checkScrollPosition, 100);
    }
  }, [isOpen, service, selectedOptions, checkScrollPosition]);

  // Handle focus trap
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus the modal
      modalRef.current?.focus();

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';

      // Restore focus to the previously focused element
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Trap focus within modal
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[99999] flex flex-col justify-end md:justify-center md:items-center p-0 md:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-h-[88vh] sm:max-h-[90vh] md:max-h-[90vh] md:max-w-2xl md:w-full bg-white 
                   rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col z-10
                   animate-slide-up md:animate-scale-in border border-[#D2B48C]/30 overflow-hidden"
      >
        {/* Header - Teakwood Gradient */}
        <div className="flex-shrink-0 bg-gradient-to-r from-[#5D3A1A] via-[#8B4513] to-[#A0522D] rounded-t-3xl md:rounded-t-2xl">
          <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-3.5">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full 
                       bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-150
                       focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Go back to service list"
              type="button"
            >
              <ArrowLeft className="w-5 h-5 text-white" aria-hidden="true" />
            </button>

            {/* Service Name */}
            <h2
              id="modal-title"
              className="flex-1 text-center text-base md:text-lg font-semibold text-[#FDF8F3] px-2 md:px-4 truncate"
            >
              {service.name}
            </h2>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex items-center justify-center w-9 h-9 rounded-full 
                       bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-150
                       focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close service details"
              type="button"
            >
              <X className="w-5 h-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Content - Responsive padding and spacing */}
        <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth webkit-overflow-scrolling-touch">
            <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 pb-4">
              {/* Service Options Section - With Auto-Scroll */}
              <section aria-labelledby="service-options-heading" className="bg-gray-50 -mx-3 sm:-mx-4 md:mx-0 px-3 sm:px-4 md:px-0 py-3 sm:py-4 md:py-0 md:bg-transparent rounded-lg md:rounded-none">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h3 id="service-options-heading" className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                    Select Service Option
                  </h3>
                  {/* Desktop scroll buttons */}
                  <div className="hidden md:flex items-center gap-2">
                    <button
                      onClick={scrollLeft}
                      disabled={!canScrollLeft}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200
                                ${canScrollLeft
                          ? 'border-gray-300 hover:bg-gray-100 text-gray-700'
                          : 'border-gray-200 text-gray-300 cursor-not-allowed'}`}
                      aria-label="Scroll left"
                      type="button"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={scrollRight}
                      disabled={!canScrollRight}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200
                                ${canScrollRight
                          ? 'border-gray-300 hover:bg-gray-100 text-gray-700'
                          : 'border-gray-200 text-gray-300 cursor-not-allowed'}`}
                      aria-label="Scroll right"
                      type="button"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Horizontal scroll container */}
                <div className="-mx-3 sm:-mx-4 md:mx-0 relative">
                  <div
                    ref={scrollContainerRef}
                    onScroll={checkScrollPosition}
                    className="flex flex-row gap-2 md:gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide px-3 sm:px-4 md:px-0 scroll-smooth"
                    role="group"
                    aria-label="Service pricing options"
                  >
                    {service.options.map((option, index) => (
                      <div
                        key={option.id || index}
                        className="flex-shrink-0 w-[220px] md:w-[260px] snap-start cursor-pointer"
                        onClick={() => handleProductClick(option, index)}
                      >
                        <ServiceOptionCard
                          option={option}
                          serviceImage={service.image}
                          isSelected={selectedOptions.includes(index)}
                          quantity={quantities[index] || 1}
                          onAdd={() => handleAdd(index)}
                          onIncrease={() => handleIncrease(index)}
                          onDecrease={() => handleDecrease(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Your Total Price Includes Section - Responsive padding and text */}
              <section className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 md:p-5" aria-labelledby="price-includes-heading">
                <h3 id="price-includes-heading" className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Your total price includes
                </h3>
                <ul className="space-y-2 sm:space-y-3" aria-label="Included features">
                  {service.priceIncludes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Why Choose Our Professionals - Clean Cube Box Design */}
              <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5" aria-labelledby="professionals-heading">
                <h3 id="professionals-heading" className="text-sm sm:text-base font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                  Why Choose Our Professionals
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {/* Background Verified */}
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mb-2">
                      <UserCheck className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs text-center text-gray-700 font-medium leading-tight">
                      Background Verified
                    </p>
                  </div>
                  {/* 300+ Hours Training */}
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mb-2">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs text-center text-gray-700 font-medium leading-tight">
                      300+ Hrs Training
                    </p>
                  </div>
                  {/* Certified */}
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mb-2">
                      <BadgeCheck className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs text-center text-gray-700 font-medium leading-tight">
                      Skill India Certified
                    </p>
                  </div>
                </div>
              </section>

              {/* A1 Cover Promise - Clean Cube Box Design */}
              <section className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5" aria-labelledby="promise-heading">
                <h3 id="promise-heading" className="text-sm sm:text-base font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                  A1 Cover Promise
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {/* 6 Months Warranty */}
                  <div className="flex flex-col p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mb-2">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-gray-900 mb-0.5">6 Months Warranty</p>
                    <p className="text-[10px] text-gray-500 leading-tight">Against peeling or fading</p>
                  </div>
                  {/* Damage Cover */}
                  <div className="flex flex-col p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mb-2">
                      <Umbrella className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-gray-900 mb-0.5">Damage Cover</p>
                    <p className="text-[10px] text-gray-500 leading-tight">Up to 10,000 protection</p>
                  </div>
                  {/* Verified Quotes */}
                  <div className="flex flex-col p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mb-2">
                      <FileCheck className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-gray-900 mb-0.5">Verified Quotes</p>
                    <p className="text-[10px] text-gray-500 leading-tight">No hidden charges</p>
                  </div>
                </div>
              </section>

              {/* Our Process Section - Responsive layout */}
              <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-amber-100" aria-labelledby="process-heading">
                <div className="text-center mb-3 sm:mb-4 md:mb-5">
                  <h3 id="process-heading" className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                    Our Process
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Step-by-step professional furniture polishing
                  </p>
                </div>
                <ol className="space-y-3 sm:space-y-4" aria-label="Service process steps">
                  {service.processSteps.map((step) => (
                    <li
                      key={step.step}
                      className="bg-white rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 ease-out border border-gray-100 hover:scale-[1.01]"
                    >
                      <div className="flex gap-2 sm:gap-3 md:gap-4">
                        {/* Step Number */}
                        <div className="flex-shrink-0">
                          <div
                            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold shadow-md"
                            aria-label={`Step ${step.step}`}
                          >
                            {step.step}
                          </div>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                            {step.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2 sm:mb-3">
                            {step.description}
                          </p>

                          {/* Step Image */}
                          <div className="rounded-lg overflow-hidden bg-gray-100">
                            <OptimizedImage
                              src={step.image}
                              alt={`${step.title} - ${step.description}`}
                              width={800}
                              height={600}
                              className="w-full h-auto"
                              loading="lazy"
                              objectFit="cover"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* FAQ Section - Mobile friendly */}
              <section className="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 md:p-5 mb-8" aria-labelledby="faq-heading">
                <h3 id="faq-heading" className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-2 sm:space-y-3 pb-4">
                  {service.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-md sm:rounded-lg overflow-hidden"
                    >
                      {/* Question Button - Touch-friendly min 44px height */}
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 text-left 
                                 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 ease-out
                                 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-inset
                                 min-h-[44px]"
                        aria-expanded={expandedFAQ === index}
                        aria-controls={`faq-answer-${index}`}
                        type="button"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 flex-1 pr-2">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0 transition-transform duration-300 ease-out
                                    ${expandedFAQ === index ? 'rotate-180' : 'rotate-0'}`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Answer */}
                      <div
                        id={`faq-answer-${index}`}
                        className={`overflow-hidden transition-all duration-300 ease-in-out
                                  ${expandedFAQ === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="p-3 sm:p-4 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Service Selection Summary - Separate Component */}
          <ServiceSelectionSummary
            selectedCount={selectedOptions.length}
            totalPrice={service.options
              .filter((_, index) => selectedOptions.includes(index))
              .reduce((sum, opt) => sum + opt.price, 0)}
            onDone={() => {
              onClose();
              if (onViewCart) {
                setTimeout(() => onViewCart(), 100);
              }
            }}
          />
        </div>
    </div>
  );

  return (
    <>
      {ReactDOM.createPortal(modalContent, document.body)}
      {/* Product Detail Modal - Opens when clicking on a service option */}
      {selectedProductOption && service && (
        <ProductDetailModal
          option={selectedProductOption.option}
          serviceImage={service.image}
          serviceName={service.name}
          priceIncludes={service.priceIncludes}
          isOpen={!!selectedProductOption}
          onClose={closeProductDetail}
          onAdd={() => handleAdd(selectedProductOption.index)}
          isSelected={selectedOptions.includes(selectedProductOption.index)}
          quantity={quantities[selectedProductOption.index] || 1}
          onIncrease={() => handleIncrease(selectedProductOption.index)}
          onDecrease={() => handleDecrease(selectedProductOption.index)}
        />
      )}
    </>
  );
};

export default ServiceDetailModal;
