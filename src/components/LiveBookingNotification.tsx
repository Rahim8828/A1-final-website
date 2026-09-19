import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const bookings = [
  { name: 'Priya S.', service: 'Sofa Polish', area: 'Andheri' },
  { name: 'Rajesh M.', service: 'Bed Polish', area: 'Bandra' },
  { name: 'Amit K.', service: 'Wardrobe Polish', area: 'Goregaon' },
  { name: 'Sneha P.', service: 'Door Polish', area: 'Powai' },
  { name: 'Vikram R.', service: 'Table Polish', area: 'Juhu' },
];

const LiveBookingNotification: React.FC = () => {
  const [currentBooking, setCurrentBooking] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true);
      setCurrentBooking((prev) => (prev + 1) % bookings.length);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    const interval = setInterval(showNotification, 8000);
    showNotification();

    return () => clearInterval(interval);
  }, []);

  const booking = bookings[currentBooking];

  return (
    <div
      className={`fixed bottom-20 md:bottom-6 left-4 md:left-6 z-40 transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 flex items-center gap-3 max-w-xs">
        <div className="flex-shrink-0">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {booking.name} from {booking.area}
          </p>
          <p className="text-xs text-gray-600">
            Booked {booking.service} • Just now
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveBookingNotification;
