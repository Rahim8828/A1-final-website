import React from 'react';
import { Shield, Star, Clock, Users } from 'lucide-react';

const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: Users,
      number: '50,000+',
      text: 'Services Completed',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Star,
      number: '4.8',
      text: 'Google Rating',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      showStar: true,
    },
    {
      icon: Clock,
      number: 'Same Day',
      text: 'Service Available',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Shield,
      number: '100%',
      text: 'Satisfaction Guarantee',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <section className="py-4 md:py-6 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className={`p-1.5 md:p-2 rounded-full ${badge.bgColor} flex-shrink-0`}>
                  <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${badge.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-xs md:text-base whitespace-nowrap">
                    {badge.number}{badge.showStar && '★'}
                  </p>
                  <p className="text-[10px] md:text-sm text-gray-600 leading-tight">
                    {badge.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
