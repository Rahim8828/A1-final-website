import React, { useState } from 'react';
import { categories, getProductsByCategory, type CategoryTab } from '../data/productCatalog';
import ProductCard from './ProductCard';

const ShopByCategories: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const filteredProducts = getProductsByCategory(activeTab);

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
          Best-Selling Polish Categories
        </h2>
        <p className="text-gray-600 text-center mb-10 text-base max-w-2xl mx-auto">
          Curated pricing for the most in-demand furniture polish, colour change, and consultation services.
        </p>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 rounded-full text-base font-semibold transition-all duration-200 border-2 ${
                  activeTab === cat.id
                    ? 'bg-amber-600 text-white border-amber-600 shadow-lg scale-105'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-amber-400 hover:text-amber-600 hover:shadow-md'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Significantly Larger Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-xl">No products in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByCategories;
