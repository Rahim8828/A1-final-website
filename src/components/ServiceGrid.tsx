import React from 'react';
import { ServiceData } from '../types';
import ServiceCard from './ServiceCard';

interface ServiceGridProps {
  services: ServiceData[];
  onViewDetails: (serviceId: string) => void;
  onQuickAdd: (serviceId: string, optionIndex: number) => void;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  onViewDetails,
  onQuickAdd,
}) => {
  return (
    <div className="w-full px-4 py-6">
      {/* Grid Container - 3 columns on mobile, 4 on tablet, 4-5 on desktop */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onViewDetails={onViewDetails}
            onQuickAdd={onQuickAdd}
          />
        ))}
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No services available at the moment.</p>
          <p className="text-gray-400 text-sm mt-2">Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceGrid;
