import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const beforeAfterImages = [
  {
    before: '/assets/Sofa.jpeg',
    after: '/assets/sofa-polish.webp',
    title: 'Sofa Restoration',
  },
  {
    before: '/assets/Bed.jpeg',
    after: '/assets/Bed-polish.webp',
    title: 'Bed Polish',
  },
  {
    before: '/assets/Wardrobe.jpg',
    after: '/assets/Wardrobe-polish.webp',
    title: 'Wardrobe Refinishing',
  },
];

const BeforeAfterGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterImages.length);
    setSliderPosition(50);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
    setSliderPosition(50);
  };

  const current = beforeAfterImages[currentIndex];

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
            See The Transformation
          </h2>
          <p className="text-sm text-gray-600">Slide to compare before and after</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
            {/* Before Image */}
            <img
              src={current.before}
              alt="Before"
              className="absolute inset-0 w-full h-full object-contain bg-gray-100"
            />

            {/* After Image with clip */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={current.after}
                alt="After"
                className="absolute inset-0 w-full h-full object-contain bg-gray-100"
              />
            </div>

            {/* Slider */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={(e) => {
                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (rect) {
                    const x = moveEvent.clientX - rect.left;
                    const percentage = (x / rect.width) * 100;
                    setSliderPosition(Math.max(0, Math.min(100, percentage)));
                  }
                };

                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 text-gray-600 absolute left-1" />
                <ChevronRight className="w-4 h-4 text-gray-600 absolute right-1" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-0.5 rounded-full text-xs font-medium">
              Before
            </div>
            <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
              After
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>

          <div className="text-center mt-3">
            <h3 className="text-sm md:text-base font-semibold text-gray-900">{current.title}</h3>
            <div className="flex justify-center gap-1.5 mt-2">
              {beforeAfterImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setSliderPosition(50);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-amber-600 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
