import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const customerReviews = [
  {
    name: 'Priya Sharma',
    location: 'Bandra, Mumbai',
    rating: 5,
    image: '/assets/sofa-polish.webp',
    service: 'Sofa Polish',
    review: 'Excellent work! My sofa looks brand new.',
  },
  {
    name: 'Rajesh Patel',
    location: 'Andheri, Mumbai',
    rating: 5,
    image: '/assets/Bed-polish.webp',
    service: 'Bed Polish',
    review: 'Very professional service. Highly recommended!',
  },
  {
    name: 'Meera Joshi',
    location: 'Powai, Mumbai',
    rating: 5,
    image: '/assets/Wardrobe-polish.webp',
    service: 'Wardrobe Polish',
    review: 'Amazing transformation! Worth every penny.',
  },
  {
    name: 'Amit Kumar',
    location: 'Goregaon, Mumbai',
    rating: 5,
    image: '/assets/Door-polish.webp',
    service: 'Door Polish',
    review: 'Great quality work. Very satisfied!',
  },
  {
    name: 'Sneha Desai',
    location: 'Juhu, Mumbai',
    rating: 5,
    image: '/assets/side-table.webp',
    service: 'Table Polish',
    review: 'Professional team. Excellent results!',
  },
];

const CustomerPhotos: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % customerReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % customerReviews.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + customerReviews.length) % customerReviews.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Join 50,000+ Happy Customers
          </h2>
          <p className="text-sm md:text-base text-gray-600">Trusted by thousands of homes and offices across Mumbai for quality furniture polishing services</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {customerReviews.map((review, index) => (
                <div key={index} className="min-w-full">
                  <div className="bg-white p-4 md:p-6">
                    <div className="grid md:grid-cols-2 gap-4 items-center">
                      {/* Image */}
                      <div className="relative h-48 md:h-56 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={review.image}
                          alt={review.service}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          {review.service}
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="text-center md:text-left">
                        {/* Rating */}
                        <div className="flex justify-center md:justify-start gap-0.5 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                          ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-sm md:text-base text-gray-700 mb-4 italic">
                          "{review.review}"
                        </p>

                        {/* Customer Info */}
                        <div>
                          <p className="font-bold text-gray-900 text-sm md:text-base">{review.name}</p>
                          <p className="text-xs text-gray-600">{review.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-4">
            {customerReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-amber-600'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                } rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerPhotos;
