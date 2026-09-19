import React from 'react';
import { ServiceOption } from '../types';
import { Clock } from 'lucide-react';
import OptimizedImage from '../../src/components/OptimizedImage';

interface ServiceOptionCardProps {
  option: ServiceOption;
  serviceImage: string;
  isSelected: boolean;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const ServiceOptionCard: React.FC<ServiceOptionCardProps> = ({
  option,
  serviceImage,
  isSelected,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}) => {
  const optionImage = option.image || serviceImage;

  return (
    <article
      className={`relative rounded-xl p-3 sm:p-4 transition-all duration-300 ease-out border h-full flex flex-col
                  ${isSelected 
                    ? 'bg-gray-50 ring-2 ring-amber-500 border-amber-500 shadow-lg shadow-amber-100' 
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
      aria-label={`${option.name} pricing option${isSelected ? ', selected' : ''}`}
    >
      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 z-10" aria-label="Selected">
          <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full shadow-md">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Option Image - Top */}
      <div className="w-full mb-2 bg-gray-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
        <OptimizedImage
          src={optionImage}
          alt={`${option.name} service option`}
          width={400}
          height={400}
          className="w-full h-full object-cover"
          loading="lazy"
          objectFit="cover"
        />
      </div>

      {/* Option Details - Bottom */}
      <div className="flex-1 flex flex-col">
        {/* Option Name */}
        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 line-clamp-2">
          {option.name}
        </h4>

        {/* Estimated Time */}
        {option.estimatedTime && (
          <div className="flex items-center gap-0.5 mb-1" aria-label={`Estimated time ${option.estimatedTime}`}>
            <Clock className="w-2.5 h-2.5 text-gray-500" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs text-gray-600">{option.estimatedTime}</span>
          </div>
        )}

        {/* Price */}
        <div className="mb-1.5">
          <p className="text-sm sm:text-base font-bold text-gray-900" aria-label={`Price ${option.price} rupees`}>
            ₹{option.price.toLocaleString()}
          </p>
        </div>

        {/* Add Button - Bottom */}
        <div className="mt-auto">
          {!isSelected ? (
            <button
              onClick={onAdd}
              className="w-full px-2 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-200 ease-out
                         focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-1
                         active:scale-95 flex items-center justify-center shadow-sm hover:shadow-md
                         bg-gradient-to-r from-[#5D3A1A] via-[#8B4513] to-[#A0522D] text-white hover:from-[#8B4513] hover:to-[#CD853F]
                         min-h-[34px] sm:min-h-[38px]"
              aria-label={`Add ${option.name} to booking for ${option.price} rupees`}
              type="button"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center justify-between border-2 border-[#8B4513] rounded-lg px-2 py-1 bg-white/90 shadow-sm relative z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDecrease();
                }}
                className="text-[#5D3A1A] font-bold text-lg sm:text-xl min-w-[30px] min-h-[30px] sm:min-w-[34px] sm:min-h-[34px] 
                           flex items-center justify-center hover:bg-[#D2B48C]/30 rounded transition-colors
                           active:bg-[#D2B48C]/50 touch-manipulation cursor-pointer"
                aria-label="Decrease quantity"
                type="button"
              >
                −
              </button>
              <span className="font-bold text-[#5D3A1A] min-w-[24px] text-center text-sm sm:text-base pointer-events-none">
                {quantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onIncrease();
                }}
                className="text-[#5D3A1A] font-bold text-lg sm:text-xl min-w-[30px] min-h-[30px] sm:min-w-[34px] sm:min-h-[34px]
                           flex items-center justify-center hover:bg-[#D2B48C]/30 rounded transition-colors
                           active:bg-[#D2B48C]/50 touch-manipulation cursor-pointer"
                aria-label="Increase quantity"
                type="button"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ServiceOptionCard;
