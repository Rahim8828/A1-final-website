import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, Shield, Wrench, Award, Umbrella, FileCheck, ChevronDown } from 'lucide-react';
import { ServiceData } from '../types';
import ServiceOptionCard from './ServiceOptionCard';
import OptimizedImage from '../../src/components/OptimizedImage';
import ServiceSelectionSummary from './ServiceSelectionSummary';

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
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

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
    }
  }, [isOpen, service, selectedOptions]);

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

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container - Full-screen on mobile, overlay on desktop */}
      <div className="fixed inset-0 flex items-stretch md:items-center md:justify-center pb-16 md:pb-0">
        {/* Modal Content - Full-screen mobile (< 768px), overlay desktop (>= 768px) */}
        <div
          ref={modalRef}
          tabIndex={-1}
          className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:w-auto bg-white 
                     md:rounded-2xl shadow-2xl flex flex-col z-50
                     animate-slide-up md:animate-scale-in"
        >
          {/* Header - Sticky, touch-friendly buttons (min 44x44px) */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
              {/* Back Button - Touch-friendly 44x44px minimum */}
              <button
                onClick={onClose}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full 
                         hover:bg-gray-100 active:scale-90 transition-all duration-150 ease-out
                         focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                aria-label="Go back to service list"
                type="button"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" aria-hidden="true" />
              </button>

              {/* Service Name - Responsive text size */}
              <h2
                id="modal-title"
                className="flex-1 text-center text-base md:text-lg lg:text-xl font-semibold text-gray-900 px-2 md:px-4 truncate"
              >
                {service.name}
              </h2>

              {/* Close Button - Touch-friendly 44x44px minimum */}
              <button
                onClick={onClose}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-full 
                         hover:bg-gray-100 active:scale-90 transition-all duration-150 ease-out
                         focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                aria-label="Close service details"
                type="button"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-700" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Scrollable Content - Responsive padding and spacing */}
          <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth webkit-overflow-scrolling-touch">
            <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6 pb-4">
              {/* Service Options Section - Responsive text and spacing */}
              <section aria-labelledby="service-options-heading" className="bg-gray-50 -mx-3 sm:-mx-4 md:mx-0 px-3 sm:px-4 md:px-0 py-3 sm:py-4 md:py-0 md:bg-transparent rounded-lg md:rounded-none">
                <h3 id="service-options-heading" className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                  Select Service Option
                </h3>
                {/* Mobile & Desktop: Horizontal scroll with cards */}
                <div className="-mx-3 sm:-mx-4 md:mx-0">
                  <div className="flex flex-row gap-2 md:gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide px-3 sm:px-4 md:px-0" role="group" aria-label="Service pricing options">
                    {service.options.map((option, index) => (
                      <div key={option.id || index} className="flex-shrink-0 w-[220px] md:w-[260px] snap-start">
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

              {/* Top Professionals Section - Light & Compact UI */}
              <section className="bg-amber-50 rounded-lg p-4 border border-amber-200" aria-labelledby="professionals-heading">
                <h3 id="professionals-heading" className="text-base font-bold text-gray-900 mb-3">
                  Why Choose Our Professionals?
                </h3>
                <div className="space-y-2">
                  {service.trustBadges.map((badge, index) => {
                    // Map icon names to Lucide components
                    const IconComponent =
                      badge.icon === 'shield-check'
                        ? Shield
                        : badge.icon === 'wrench'
                        ? Wrench
                        : Award;

                    return (
                      <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-amber-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 leading-snug flex-1">
                          {badge.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* A1 Cover Promise Section - Responsive sizing */}
              <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-green-100" aria-labelledby="promise-heading">
                <h3 id="promise-heading" className="text-base sm:text-lg font-semibold text-green-700 mb-3 sm:mb-4">
                  A1 Cover Promise
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {/* 6 months warranty */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">
                        6 months warranty
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        On all polishing work against peeling or fading
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Damage cover */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Umbrella className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">
                        Up to ₹10,000 damage cover
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Protection against accidental damage during service
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Verified quotes */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <FileCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900">
                        Verified quotes
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        Transparent pricing with no hidden charges
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
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
    </div>
  );
};

export default ServiceDetailModal;
