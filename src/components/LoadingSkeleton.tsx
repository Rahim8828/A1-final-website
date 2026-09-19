import React from 'react';

export const HeroSkeleton = () => (
  <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 py-12 md:py-20 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="h-12 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
          <div className="h-6 bg-gray-300 rounded w-5/6 mb-8"></div>
          <div className="flex gap-4">
            <div className="h-14 bg-gray-300 rounded w-48"></div>
            <div className="h-14 bg-gray-300 rounded w-40"></div>
          </div>
        </div>
        <div className="relative">
          <div className="bg-gray-300 rounded-lg w-full h-80 md:h-96"></div>
        </div>
      </div>
    </div>
  </div>
);

export const ServiceCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
    <div className="bg-gray-300 w-full h-48"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-24"></div>
    </div>
  </div>
);

export const TestimonialSkeleton = () => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-lg animate-pulse">
    <div className="flex space-x-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-5 h-5 bg-gray-300 rounded"></div>
      ))}
    </div>
    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
    <div className="h-5 bg-gray-300 rounded w-32 mb-1"></div>
    <div className="h-4 bg-gray-300 rounded w-24"></div>
  </div>
);

export const PageSkeleton = () => (
  <div className="min-h-screen">
    <HeroSkeleton />
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);
