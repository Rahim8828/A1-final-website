import React, { useState, useEffect } from 'react';
import { Users, Clock } from 'lucide-react';

const UrgencyNotification = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const notifications = [
    { icon: Users, text: 'Rajesh from Bandra just booked a service', time: '2 min ago' },
    { icon: Clock, text: '3 slots left today in Andheri', time: 'Just now' },
    { icon: Users, text: 'Priya from Powai just requested a quote', time: '5 min ago' },
    { icon: Clock, text: '2 slots left today in Goregaon', time: '1 min ago' },
    { icon: Users, text: 'Amit from Jogeshwari just booked', time: '3 min ago' },
    { icon: Users, text: 'Sneha from Malad just confirmed installation', time: '4 min ago' },
    { icon: Clock, text: '4 slots left today in Kandivali', time: '2 min ago' },
    { icon: Users, text: 'Vikram from Borivali just requested a quote', time: '6 min ago' },
    { icon: Clock, text: '1 slot left today in Dahisar', time: 'Just now' },
    { icon: Users, text: 'Neha from Vile Parle just booked a service', time: '7 min ago' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const notification = notifications[currentNotification];
  const Icon = notification.icon;

  return (
    <div
      className={`fixed bottom-20 md:bottom-6 left-3 md:left-6 bg-white rounded-xl shadow-2xl p-2.5 md:p-3.5 max-w-[calc(100vw-5rem)] sm:max-w-xs z-40 border-l-4 border-orange-500 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
    >
      <div className="flex items-start gap-2 md:gap-2.5">
        <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-orange-600" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-[11px] md:text-sm font-bold text-gray-900 leading-tight">{notification.text}</p>
          <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 font-medium">{notification.time}</p>
        </div>
      </div>

    </div>
  );
};

export default UrgencyNotification;
