import { Award, Users, Shield, Leaf, Target, Heart, Zap, CheckCircle2 } from 'lucide-react';
import SEOHead from '../../src/components/SEOHead';
import { FadeIn } from '../components/ScrollAnimations';
import { getCanonicalURL } from '../utils/canonicalURL';
import OptimizedImage from '../../src/components/OptimizedImage';

const About = () => {
  const values = [
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: 'Excellence',
      description: 'We strive for perfection in every furniture polishing project we undertake.'
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We ensure every customer is 100% happy with our service.'
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: 'Trust & Reliability',
      description: 'Trusted by Mumbai families and businesses for over a decade.'
    },
    {
      icon: <Leaf className="w-8 h-8 text-white" />,
      title: 'Eco-Friendly',
      description: 'We use environmentally safe polishing products that are safe for your family and pets.'
    }
  ];

  return (
    <>
      <SEOHead
        title="About A1 Furniture Polish - Mumbai's Trusted Furniture Polishing Experts"
        description="Learn about A1 Furniture Polish, Mumbai's leading furniture polishing service. 10+ years experience, eco-friendly products, skilled craftsmen. Serving all Mumbai areas."
        ogTitle="About A1 Furniture Polish - Mumbai's Trusted Furniture Polishing Experts"
        ogDescription="Learn about A1 Furniture Polish, Mumbai's leading furniture polishing service. 10+ years experience, eco-friendly products, skilled craftsmen. Serving all Mumbai areas."
        canonical={getCanonicalURL('/about')}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <span className="inline-block bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  About Us
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Mumbai's Most <span className="text-amber-600">Trusted</span> Furniture Polish Experts
                </h1>
                <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                  For over a decade, A1 Furniture Polish has been Mumbai's most trusted name in professional furniture polishing and restoration services. We have transformed thousands of furniture pieces across Mumbai, bringing them back to their original glory.
                </p>
                <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                  Our team of skilled craftsmen specializes in wooden furniture polish, antique restoration, and commercial furniture maintenance. We serve residential and commercial clients across all areas of Mumbai with the same dedication to quality and customer satisfaction.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8">
                  <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">10+</p>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">Years Experience</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">1000+</p>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">Happy Customers</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">100%</p>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="relative mt-8 lg:mt-0">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src="/assets/Sofa And chair.webp"
                    alt="Professional furniture polishing team in Mumbai"
                    className="w-full h-80 lg:h-[500px] object-cover"
                    width={800}
                    height={500}
                    loading="lazy"
                  />
                  {/* Overlay Badge */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white bg-opacity-95 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div>
                        <p className="text-lg md:text-xl font-bold text-gray-900">Certified Professionals</p>
                        <p className="text-xs md:text-sm text-gray-600">Trusted by 1000+ Mumbai families</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Drives Us Forward</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                These core values guide every furniture polishing project we undertake in Mumbai
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-bl-full opacity-50"></div>
                  
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {value.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{value.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Why Choose A1
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                We don't just polish furniture - we restore memories and bring back the beauty of your cherished pieces
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Precision Work</h3>
                  <p className="text-sm text-gray-600">Meticulous attention to detail in every project, ensuring flawless results.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Care</h3>
                  <p className="text-sm text-gray-600">Your satisfaction is our priority. We go the extra mile for every customer.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Fast Turnaround</h3>
                  <p className="text-sm text-gray-600">Same-day service available in select Mumbai areas without compromising quality.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quality Guarantee</h3>
                  <p className="text-sm text-gray-600">100% satisfaction guaranteed or we'll make it right at no extra cost.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Trusted Service</h3>
                  <p className="text-sm text-gray-600">Verified professionals with background checks and insurance coverage.</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={600}>
              <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Eco-Conscious</h3>
                  <p className="text-sm text-gray-600">Safe, non-toxic products that protect your family and the environment.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Experience the A1 Difference Today
              </h2>
              <p className="text-base md:text-lg text-amber-100 mb-8 leading-relaxed">
                Join hundreds of satisfied customers in Mumbai who trust A1 Furniture Polish for their furniture care needs. Get a free consultation and quote today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+918828709945"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-amber-600 px-6 py-4 md:px-8 rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-2xl font-semibold"
                >
                  <span>Call: +91 8828709945</span>
                </a>
                <a
                  href="https://wa.me/918828709945"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-4 md:px-8 rounded-xl hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-2xl font-semibold"
                >
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default About;
