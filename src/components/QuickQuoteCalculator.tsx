import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { servicePageData } from '../data/servicePageData';

const QuickQuoteCalculator: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showQuote, setShowQuote] = useState(false);

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedOption('');
    setShowQuote(false);
  };

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
    setShowQuote(true);
  };

  const selectedServiceData = servicePageData.find(s => s.id === selectedService);
  const selectedOptionData = selectedServiceData?.options.find(o => o.id === selectedOption);

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Get Instant Quote
            </h2>
          </div>
          <p className="text-gray-600">Select your furniture type and get pricing in seconds</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                1. Select Furniture Type
              </label>
              <select
                value={selectedService}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              >
                <option value="">Choose furniture type...</option>
                {servicePageData.slice(0, 8).map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Option Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                2. Select Size/Type
              </label>
              <select
                value={selectedOption}
                onChange={(e) => handleOptionChange(e.target.value)}
                disabled={!selectedService}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Choose size/type...</option>
                {selectedServiceData?.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quote Result */}
          {showQuote && selectedOptionData && (
            <div className="mt-6 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {selectedOptionData.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Estimated time: {selectedOptionData.estimatedTime}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-bold text-orange-600">
                    ₹{selectedOptionData.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Inclusive of materials</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/918828709945?text=Hi! I want to book ${selectedServiceData?.name} - ${selectedOptionData.name} for ₹${selectedOptionData.price.toLocaleString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <span>Book in 30 Seconds</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:+918828709945"
                  className="flex-1 bg-white text-orange-600 border-2 border-orange-600 py-3 px-6 rounded-lg hover:bg-orange-50 transition-colors font-semibold text-center"
                >
                  Call for Confirmation
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickQuoteCalculator;
