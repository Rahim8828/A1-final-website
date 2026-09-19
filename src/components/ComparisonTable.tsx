import React from 'react';
import { Check, X } from 'lucide-react';

const ComparisonTable = () => {
  const features = [
    { feature: 'Price', a1: '20% Lower', others: 'Higher' },
    { feature: 'Quality Products', a1: true, others: true },
    { feature: 'Experienced Team (10+ years)', a1: true, others: false },
    { feature: 'Same-Day Service', a1: true, others: false },
    { feature: 'Free Consultation', a1: true, others: false },
    { feature: 'Eco-Friendly Products', a1: true, others: true },
    { feature: 'Warranty/Guarantee', a1: true, others: false },
    { feature: '24/7 Customer Support', a1: true, others: false },
    { feature: 'Free Touch-ups (30 days)', a1: true, others: false },
  ];

  return (
    <section className="py-12 md:py-16 pb-24 md:pb-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            Why Choose A1 Over Others?
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            See how we compare to other furniture polishing services in Mumbai
          </p>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <th className="px-3 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-700">
                    Features
                  </th>
                  <th className="px-3 py-3 md:px-6 md:py-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center mb-1 md:mb-2">
                        <span className="text-white font-bold text-base md:text-lg">A1</span>
                      </div>
                      <span className="text-xs md:text-sm font-bold text-amber-600 hidden sm:inline">A1 Furniture Polish</span>
                      <span className="text-xs font-bold text-amber-600 sm:hidden">A1</span>
                    </div>
                  </th>
                  <th className="px-3 py-3 md:px-6 md:py-4 text-center text-xs md:text-sm font-semibold text-gray-700">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-lg flex items-center justify-center mb-1 md:mb-2">
                        <span className="text-gray-600 font-bold text-xs">Others</span>
                      </div>
                      <span className="text-xs md:text-sm hidden sm:inline">Other Services</span>
                      <span className="text-xs sm:hidden">Others</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 md:px-6 md:py-4 text-xs md:text-sm font-medium text-gray-900">
                      {item.feature}
                    </td>
                    <td className="px-3 py-3 md:px-6 md:py-4 text-center">
                      {typeof item.a1 === 'boolean' ? (
                        item.a1 ? (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center">
                              <X className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                            </div>
                          </div>
                        )
                      ) : (
                        <span className="inline-block bg-amber-100 text-amber-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                          {item.a1}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 md:px-6 md:py-4 text-center">
                      {typeof item.others === 'boolean' ? (
                        item.others ? (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center">
                              <X className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                            </div>
                          </div>
                        )
                      ) : (
                        <span className="text-xs md:text-sm text-gray-600">{item.others}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 md:mt-8 text-center px-4">
          <a
            href="tel:+918828709945"
            className="inline-flex items-center justify-center space-x-2 bg-amber-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg hover:bg-amber-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-semibold text-sm md:text-base w-full sm:w-auto"
          >
            <span>Choose A1 - Call Now</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
