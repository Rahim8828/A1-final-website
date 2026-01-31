import React from 'react';
import { Clock, Shield, IndianRupee, Calendar, Award, Headphones } from 'lucide-react';

const WhyBookOnline: React.FC = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'Instant Booking',
      description: 'Book in 30 seconds. No calls, no waiting. Get confirmation immediately.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: IndianRupee,
      title: 'Transparent Pricing',
      description: 'See exact prices upfront. No hidden charges. What you see is what you pay.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Choose your preferred date and time. Reschedule anytime for free.',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Shield,
      title: '6-Month Warranty',
      description: 'All work comes with 6-month warranty. 100% satisfaction guaranteed.',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Award,
      title: 'Verified Professionals',
      description: 'All workers are background verified, trained, and experienced.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Customer support available round the clock via call, WhatsApp, or chat.',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Why Book Online with Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience hassle-free booking with complete transparency and guaranteed quality
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 text-center md:text-left"
              >
                <div className={`w-12 h-12 rounded-lg ${benefit.bgColor} flex items-center justify-center mb-4 mx-auto md:mx-0`}>
                  <IconComponent className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyBookOnline;
