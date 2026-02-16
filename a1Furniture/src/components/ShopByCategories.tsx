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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
          Service By Categories
        </h2>
        <p className="text-gray-500 text-center mb-8 text-sm">
          Explore our furniture polishing services by category
        </p>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeTab === cat.id
                    ? 'bg-white text-amber-700 border-amber-600 shadow-sm'
                    : 'bg-transparent text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No products in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByCategories;
