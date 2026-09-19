import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  desktop: string;
  mobile: string;
  badge: string;
  cta: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    desktop: '/media/banner/banner_5_mobile.webp',
    mobile: '/media/banner/banner_5_mobile.webp',
    badge: 'Starting From ₹2,449*',
    cta: 'EXPLORE SERVICES',
    ctaLink: '/services',
  },
];

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    if (!hasMultipleSlides) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hasMultipleSlides]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const slide = slides[currentSlide];

  return (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 px-3 sm:px-4 md:px-6 lg:px-8 pt-3 sm:pt-4 md:pt-6 pb-3 sm:pb-4 md:pb-6">
      <div className="max-w-[1600px] mx-auto">
        <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          <picture key={`bg-${currentSlide}`}>
            <source media="(min-width: 1024px)" srcSet={slide.desktop} />
            <img
              src={slide.mobile}
              alt="A1 Furniture Polish"
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
            />
          </picture>

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

          {hasMultipleSlides && (
            <>
              {/* Navigation Arrows - Desktop only */}
              <button
                onClick={prevSlide}
                className="hidden lg:flex absolute left-4 xl:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xl:w-12 xl:h-12 items-center justify-center rounded-full bg-white/90 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 xl:w-6 xl:h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="hidden lg:flex absolute right-4 xl:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 xl:w-12 xl:h-12 items-center justify-center rounded-full bg-white/90 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 xl:w-6 xl:h-6 text-gray-800" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-2.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                      i === currentSlide
                        ? 'bg-amber-400 w-6 sm:w-8 shadow-lg'
                        : 'bg-white/50 w-2 sm:w-2.5 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
