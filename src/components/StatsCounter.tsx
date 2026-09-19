import React, { useState, useEffect, useRef } from 'react';
import { Users, Briefcase, Award, Clock } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, end, label, suffix = '+', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-center p-3 md:p-4">
      <div className="w-12 h-12 md:w-14 md:h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
        {icon}
      </div>
      <div className="text-xl md:text-3xl font-bold text-white mb-1">
        {count}{suffix}
      </div>
      <div className="text-xs md:text-sm text-amber-100 font-medium">
        {label}
      </div>
    </div>
  );
};

const StatsCounter = () => {
  return (
    <section className="py-6 md:py-8 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <StatItem
            icon={<Users className="w-6 h-6 md:w-8 md:h-8 text-white" />}
            end={500}
            label="Happy Customers"
            suffix="+"
          />
          <StatItem
            icon={<Briefcase className="w-6 h-6 md:w-8 md:h-8 text-white" />}
            end={1000}
            label="Projects Completed"
            suffix="+"
          />
          <StatItem
            icon={<Award className="w-6 h-6 md:w-8 md:h-8 text-white" />}
            end={10}
            label="Years Experience"
            suffix="+"
          />
          <StatItem
            icon={<Clock className="w-6 h-6 md:w-8 md:h-8 text-white" />}
            end={24}
            label="Hours Service"
            suffix="/7"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
