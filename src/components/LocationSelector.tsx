import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const mumbaiAreas = [
  'Andheri', 'Bandra', 'Borivali', 'Goregaon', 'Jogeshwari', 'Juhu',
  'Kandivali', 'Malad', 'Powai', 'Santacruz', 'Vile Parle', 'Worli'
];

const LocationSelector: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-amber-500 transition-colors shadow-sm"
      >
        <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{selectedLocation}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
            {mumbaiAreas.map((area) => (
              <button
                key={area}
                onClick={() => {
                  setSelectedLocation(area);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-amber-50 text-sm text-gray-700 hover:text-amber-600 transition-colors border-b border-gray-100 last:border-0"
              >
                {area}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LocationSelector;
