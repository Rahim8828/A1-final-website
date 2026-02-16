import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  /** Desktop ≥1024px — 1920×800 */
  desktop: string;
  /** Tablet 640–1023px — 1200×600 */
  tablet: string;
  /** Mobile <640px — 800×600 */
  mobile: string;
  badge: string;
  cta: string;
  ctaLink: string;
}

const slides: Slide[] = [
  {
    desktop: '/media/banner/banner_2.webp',
    tablet: '/media/banner/banner_2.webp',
    mobile: '/media/banner/banner_2.webp',
    badge: 'Starting From ₹1,299*',
    cta: 'Book Now',
    ctaLink: '/services',
  },
  {
    desktop: '/media/banner/banner_3.png.webp',
    tablet: '/media/banner/banner_3.png.webp',
    mobile: '/media/banner/banner_3.png.webp',
    badge: 'Starting From ₹2,449*',
    cta: 'Explore Services',
    ctaLink: '/services',
  },
];

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const slide = slides[currentSlide];

  return (
    <section className="bg-white">
      {/* Full-width banner — edge to edge within max container */}
      <div className="max-w-[1600px] mx-auto">
        <div className="relative overflow-hidden rounded-none sm:rounded-xl sm:mx-4 md:mx-6">
          {/* Banner image — responsive <picture> for 3 breakpoints */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[2/1] lg:aspect-[12/5] overflow-hidden">
            <picture key={`bg-${currentSlide}`}>
              {/* Desktop ≥1024px */}
              <source media="(min-width: 1024px)" srcSet={slide.desktop} />
              {/* Tablet 640–1023px */}
              <source media="(min-width: 640px)" srcSet={slide.tablet} />
              {/* Mobile <640px (fallback) */}
              <img
                src={slide.mobile}
                alt="A1 Furniture Polish — Professional Wood Polish Services"
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </picture>

            {/* Subtle bottom gradient for tag readability */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Price tag + CTA — bottom left */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 z-10 flex items-center gap-3">
              <span className="bg-amber-600 text-white px-4 py-2 rounded-lg text-xs md:text-sm font-bold shadow-lg">
                {slide.badge}
              </span>
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2 rounded-lg text-xs md:text-sm font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                {slide.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all shadow-md"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-all shadow-md"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? 'bg-white w-7'
                      : 'bg-white/40 w-2.5 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
