import React from 'react';
import { Users, Briefcase, Award, Clock } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <Users className="w-8 h-8 md:w-10 md:h-10" />,
    value: '500+',
    label: 'Happy Customers',
  },
  {
    icon: <Briefcase className="w-8 h-8 md:w-10 md:h-10" />,
    value: '1000+',
    label: 'Projects Completed',
  },
  {
    icon: <Award className="w-8 h-8 md:w-10 md:h-10" />,
    value: '10+',
    label: 'Years Experience',
  },
  {
    icon: <Clock className="w-8 h-8 md:w-10 md:h-10" />,
    value: '24/7',
    label: 'Hours Service',
  },
];

const StatsSection: React.FC = () => {
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 overflow-hidden">
      {/* Decorative wave pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="currentColor" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 md:mb-5 text-white group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-3 leading-none">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-sm md:text-base lg:text-lg font-semibold text-white/90">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
