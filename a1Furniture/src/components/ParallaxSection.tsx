import React, { ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = 0.5, 
  className = '' 
}) => {
  return (
    <section className={`relative ${className}`}>
      {children}
    </section>
  );
};

export default ParallaxSection;
