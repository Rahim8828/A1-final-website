import React from 'react';
import { FadeIn } from './ScrollAnimations';

const woodTypes = [
  { name: 'TEAKWOOD', image: '/assets/seo/bed/wooden_types/teakwood.png' },
  { name: 'VENEER', image: '/assets/seo/bed/wooden_types/veneeer.png' },
  { name: 'WALNUT', image: '/assets/seo/bed/wooden_types/walnut.png' },
  { name: 'MDF', image: '/assets/seo/bed/wooden_types/mdf.png' },
  { name: 'SOLID WOOD', image: '/assets/seo/bed/wooden_types/solidwood.png' },
  { name: 'PLYWOOD', image: '/assets/seo/bed/wooden_types/plywood.png' },
];

interface TypesOfWoodWePolishProps {
  /** Optional location name for contextual heading */
  locationName?: string;
}

const TypesOfWoodWePolish: React.FC<TypesOfWoodWePolishProps> = ({ locationName }) => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — Wood type image grid */}
          <FadeIn>
            <div className="grid grid-cols-3 gap-4">
              {woodTypes.map((wood, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={wood.image}
                      alt={`${wood.name} wood polishing`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-center py-2.5 text-xs sm:text-sm font-bold text-gray-800 tracking-wide">
                    {wood.name}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right — Description */}
          <FadeIn delay={150}>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
                Types of Wood We Polish
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {locationName ? `At A1 Furniture Polish ${locationName}, we` : 'Colorwale we'} bring 30+ years of craftsmanship and expertise in premium
                wood polishing — from classic French Polish to modern PU, Monocoat,
                Melamine, Water-based PU, and high-gloss Polyester Lamination. Whether it's
                open grain or smooth filled finish, our skilled team ensures perfection in every
                stroke.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default TypesOfWoodWePolish;
