import React from 'react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { Star } from 'lucide-react';
import { getCanonicalURL } from '../utils/canonicalURL';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

const CommercialPolishing = () => {
  const pageUrl = "https://a1furniturepolish.com/commercial-polishing";
  const a1Tel = "+918828709945";
  const a1Whatsapp = "https://wa.me/918828709945";

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'A1 Furniture Polish',
    image: 'https://a1furniturepolish.com/logo.png',
    telephone: a1Tel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jogeshwari West',
      addressLocality: 'Mumbai',
      addressRegion: 'MH',
      postalCode: '400102',
      addressCountry: 'IN',
    },
    url: pageUrl,
    serviceType: 'Commercial Furniture Polishing',
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Bandra Kurla Complex' },
      { '@type': 'City', name: 'Andheri' },
      { '@type': 'City', name: 'Lower Parel' },
      { '@type': 'City', name: 'Goregaon' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What types of commercial properties do you service?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide furniture polishing services for a wide range of commercial spaces, including offices, hotels, restaurants, showrooms, and retail stores across Mumbai.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer services outside of regular business hours?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we understand the need to minimize disruption. We offer flexible scheduling, including evenings and weekends, to complete the work without affecting your business operations in areas like Bandra Kurla Complex.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you handle large-volume projects like polishing all the doors in a hotel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We have the team and capacity to handle large-scale projects, such as polishing all wooden doors, chairs, and tables in a hotel or office building efficiently.',
        },
      },
       {
        '@type': 'Question',
        name: 'What kind of finish is best for high-traffic commercial furniture?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For high-traffic areas, we recommend durable, resilient finishes like polyurethane (PU) polish, which offers excellent resistance to scratches, spills, and daily wear and tear.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide annual maintenance contracts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer annual maintenance contracts (AMCs) for businesses in Mumbai to ensure their furniture always looks pristine. This is a cost-effective way to maintain a professional image.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Commercial Furniture Polishing in Mumbai | A1 Furniture Polish"
        description="Professional commercial furniture polishing in Mumbai. We service offices, hotels, & restaurants in BKC, Andheri, Lower Parel. Flexible hours, durable finishes."
        canonical={getCanonicalURL('/commercial-polishing')}
      />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative bg-amber-600 text-white">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Commercial Furniture Polishing in Mumbai
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-amber-100">
            Elevate your business environment with a professional and lasting finish.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a href={a1Whatsapp} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Get a Quote</a>
            <a href={`tel:${a1Tel}`} className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Call Now</a>
          </div>
        </div>
      </section>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Intro Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Maintain a Professional Image with Flawless Furniture
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
             The state of your furniture speaks volumes about your business. A1 Furniture Polish provides expert <a href={pageUrl} className="text-amber-600 hover:underline">commercial furniture polishing in Mumbai</a> to ensure your office, hotel, or restaurant always looks its best. We deliver durable, high-quality finishes with minimal disruption to your operations.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <OptimizedImage
                src="/assets/drying-finishing.webp"
                alt="Polished furniture in a commercial space"
                width={1920}
                height={1280}
                className="rounded-lg shadow-xl"
                sizes={COMMON_SIZES.content}
              />
            </div>
            <div>
              {/* Why Choose Us Section */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Partner in Business Presentation</h3>
               <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Flexible Scheduling:</strong> We work around your business hours, including evenings and weekends, to ensure zero downtime for your operations in Bandra Kurla Complex (BKC) and Lower Parel.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Large Project Capacity:</strong> Our team is equipped to handle high-volume work, from polishing conference tables and workstations to hotel doors and restaurant seating.</div>
                </li>
                 <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                   <div><strong>Durable & High-Traffic Finishes:</strong> We specialize in applying tough, resilient polishes like PU that withstand the rigors of commercial use in busy areas like Andheri and Goregaon.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Annual Maintenance Contracts (AMC):</strong> We offer customized AMCs to keep your furniture in pristine condition year-round, protecting your investment.</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Our Process Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Efficient Commercial Polishing Process</h3>
            <ol className="grid md:grid-cols-4 gap-8 text-center">
               <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">1</div>
                <h4 className="font-semibold text-lg mb-2">Project Consultation</h4>
                <p className="text-gray-600">We assess your requirements, volume of work, and schedule to provide a detailed project plan and quote.</p>
              </li>
              <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h4 className="font-semibold text-lg mb-2">On-Site Execution</h4>
                <p className="text-gray-600">Our professional team arrives on-site at the agreed time and efficiently carries out the polishing work.</p>
              </li>
              <li className="flex flex-col items-center">
                 <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">3</div>
                <h4 className="font-semibold text-lg mb-2">Durable Finishing</h4>
                <p className="text-gray-600">We apply high-grade, durable polishes designed to withstand heavy use and maintain their look.</p>
              </li>
              <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">4</div>
                <h4 className="font-semibold text-lg mb-2">Quality Assurance</h4>
                <p className="text-gray-600">We conduct a thorough review to ensure the quality meets our high standards and your expectations.</p>
              </li>
            </ol>
          </div>
          
           {/* Service Locations */}
          <div className="mt-20 text-center bg-gray-50 p-8 rounded-lg">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">Serving Businesses Across Mumbai</h3>
             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
               We are a trusted partner for businesses in Mumbai's key commercial hubs:
             </p>
             <div className="mt-4 flex justify-center flex-wrap gap-4">
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Bandra Kurla Complex (BKC)</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Andheri East & West</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Lower Parel</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Goregaon</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Nariman Point</span>
             </div>
          </div>


          {/* Testimonials Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">What Our Business Clients Say</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-500"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
                <p className="text-gray-600 mb-4">"A1 Furniture Polish is our go-to for maintaining our office furniture. They work after hours and always deliver a fantastic result. Highly professional team for corporate needs in BKC."</p>
                <p className="font-semibold text-gray-800">- Facilities Manager, IT Firm</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                    <div className="flex text-amber-500"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
                <p className="text-gray-600 mb-4">"We used their service for our restaurant chairs and tables. The durable finish has held up remarkably well to constant use. Fast, reliable, and excellent quality."</p>
                <p className="font-semibold text-gray-800">- Restaurant Owner, Andheri</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <h4 className="font-semibold text-lg text-gray-900">{faq.name}</h4>
                  <p className="mt-2 text-gray-600">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20 text-center bg-amber-600 text-white p-12 rounded-lg">
            <h3 className="text-3xl font-bold mb-4">Enhance Your Business Environment</h3>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto mb-8">
              Contact us to discuss your commercial furniture polishing needs and to request a competitive quote.
            </p>
            <div className="flex justify-center space-x-4">
              <a href={a1Whatsapp} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Request a Quote</a>
              <a href={`tel:${a1Tel}`} className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Call for Consultation</a>
            </div>
          </div>
          
           {/* Internal Linking Footer */}
           <div className="mt-16 text-center">
                <h4 className="font-semibold text-lg mb-4">Explore Our Other Services</h4>
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-amber-600">
                    <a href="/wooden-furniture-polish" className="hover:underline">Wooden Furniture Polish</a>
                    <a href="/antique-restoration" className="hover:underline">Antique Restoration</a>
                    <a href="/" className="hover:underline">Homepage</a>
                </div>
           </div>

        </div>
      </div>
    </>
  );
};

export default CommercialPolishing;
