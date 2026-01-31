import React from 'react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { Star } from 'lucide-react';
import { getCanonicalURL } from '../utils/canonicalURL';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

const WoodenFurniturePolish = () => {
  const pageUrl = "https://a1furniturepolish.com/wooden-furniture-polish";
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
    serviceType: 'Wooden Furniture Polish',
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Bandra' },
      { '@type': 'City', name: 'Andheri' },
      { '@type': 'City', name: 'Juhu' },
      { '@type': 'City', name: 'South Mumbai' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What types of wooden furniture do you polish?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "We polish all kinds of wooden furniture, including sofas, chairs, dining tables, beds, wardrobes, cabinets, doors, and more. If it's wood, we can polish it!",
        },
      },
      {
        '@type': 'Question',
        name: 'Can you remove scratches and stains from my dining table?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our skilled technicians are experts at removing scratches, water marks, heat stains, and other blemishes from wooden surfaces before applying a fresh coat of polish.',
        },
      },
      {
        '@type': 'Question',
        name: 'What polish do you recommend for high-use items like tables and chairs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For high-traffic furniture, we recommend durable finishes like Polyurethane (PU) or Melamine polish. They offer excellent protection against spills, scratches, and daily wear and tear.',
        },
      },
       {
        '@type': 'Question',
        name: 'Can you change the color of my furniture?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We can strip the old finish and apply a new wood stain to change the color of your furniture, allowing you to match it with your new interior decor.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer on-site polishing services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we primarily offer on-site services across Mumbai. Our team comes fully equipped and takes all necessary precautions to ensure a clean, professional, and hassle-free experience in your home.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Wooden Furniture Polish in Mumbai | A1 Furniture Polish"
        description="Expert wooden furniture polishing in Mumbai. We restore sofas, chairs, tables, beds, and more. Get a free quote for services in Bandra, Andheri, Juhu, and South Mumbai."
        canonical={getCanonicalURL('/wooden-furniture-polish')}
      />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative bg-amber-600 text-white">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Wooden Furniture Polish in Mumbai
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-amber-100">
            Bringing back the natural beauty and shine of all your wooden furniture.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a href={a1Whatsapp} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Get a Free Quote</a>
            <a href={`tel:${a1Tel}`} className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Call an Expert</a>
          </div>
        </div>
      </section>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Intro Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Your One-Stop Solution for All Wood Polishing Needs
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
             From your cherished dining table and comfortable bed to your elegant sofas and chairs, every piece of wooden furniture deserves to look its best. A1 Furniture Polish provides comprehensive <a href={pageUrl} className="text-amber-600 hover:underline">wooden furniture polishing services in Mumbai</a>, tailored to restore and protect your valuable items.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <OptimizedImage
                src="/assets/wooden furniture .webp"
                alt="A polished living room set including a sofa and coffee table"
                width={1920}
                height={1080}
                className="rounded-lg shadow-xl block mx-auto"
                sizes={COMMON_SIZES.content}
              />
            </div>
            <div>
              {/* Why Choose Us Section */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Quality</h3>
               <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Comprehensive Service:</strong> We handle all furniture types, from dining tables, beds, and wardrobes to sofa frames, chairs, and cabinets.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Stain & Scratch Removal:</strong> Our specialty is fixing imperfections, making your furniture look flawless once more in homes across Bandra, Andheri, and South Mumbai.</div>
                </li>
                 <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                   <div><strong>Durable & Protective Finishes:</strong> We use high-quality Melamine, PU, and other polishes to ensure a finish that is both beautiful and long-lasting.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>On-Site Service Excellence:</strong> Enjoy a clean, convenient, and professional polishing service at your doorstep, anywhere in the Mumbai region.</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Our Process Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Proven Polishing Process</h3>
            <ol className="grid md:grid-cols-4 gap-8 text-center">
               <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">1</div>
                <h4 className="font-semibold text-lg mb-2">Consultation & Quote</h4>
                <p className="text-gray-600">We assess your furniture's condition and provide a clear, detailed quote with no hidden costs.</p>
              </li>
              <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h4 className="font-semibold text-lg mb-2">Surface Preparation</h4>
                <p className="text-gray-600">We meticulously prepare the wood, sanding and treating stains to ensure a perfect base.</p>
              </li>
              <li className="flex flex-col items-center">
                 <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">3</div>
                <h4 className="font-semibold text-lg mb-2">Expert Application</h4>
                <p className="text-gray-600">Our skilled artisans apply the chosen polish evenly for a consistent and beautiful finish.</p>
              </li>
              <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">4</div>
                <h4 className="font-semibold text-lg mb-2">Final Quality Check</h4>
                <p className="text-gray-600">We conduct a thorough inspection to ensure the final result meets our high standards of quality.</p>
              </li>
            </ol>
          </div>
          
           {/* Service Locations */}
          <div className="mt-20 text-center bg-gray-50 p-8 rounded-lg">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">Servicing Homes Across the Entire Mumbai Region</h3>
             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
               Our expert on-site furniture polishing service is available for all residential clients in Mumbai:
             </p>
             <div className="mt-4 flex justify-center flex-wrap gap-4">
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">South Mumbai</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Bandra & Khar</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Andheri & Juhu</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Powai & Chembur</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Thane</span>
             </div>
          </div>


          {/* Testimonials Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">What Our Customers Are Saying</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-500"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
                <p className="text-gray-600 mb-4">"A1 did a fantastic job on our dining table and chairs. The finish is excellent and the team was very professional. They took care of everything at our home in Andheri."</p>
                <p className="font-semibold text-gray-800">- Sunita R.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                    <div className="flex text-amber-500"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
                <p className="text-gray-600 mb-4">"I had my old wooden bed and wardrobe polished. The results are amazing! They look brand new. I highly recommend A1 for anyone looking for top-quality wood polishing in Mumbai."</p>
                <p className="font-semibold text-gray-800">- Rajesh P., Bandra</p>
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
            <h3 className="text-3xl font-bold mb-4">Renew Your Wooden Furniture Today!</h3>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto mb-8">
              Contact us now for a comprehensive quote and let us bring the shine back to your furniture.
            </p>
            <div className="flex justify-center space-x-4">
              <a href={a1Whatsapp} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Get a Quote</a>
              <a href={`tel:${a1Tel}`} className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Call Now</a>
            </div>
          </div>
          
           {/* Internal Linking Footer */}
           <div className="mt-16 text-center">
                <h4 className="font-semibold text-lg mb-4">Explore Our Specialized Services</h4>
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-amber-600">
                    <a href="/commercial-polishing" className="hover:underline">Commercial Polishing</a>
                    <a href="/antique-restoration" className="hover:underline">Antique Restoration</a>
                    <a href="/" className="hover:underline">Homepage</a>
                </div>
           </div>

        </div>
      </div>
    </>
  );
};

export default WoodenFurniturePolish;
