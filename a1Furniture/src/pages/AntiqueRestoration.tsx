import React from 'react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { Star } from 'lucide-react';
import { getCanonicalURL } from '../utils/canonicalURL';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

const AntiqueRestoration = () => {
  const pageUrl = "https://a1furniturepolish.com/antique-restoration";
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
    serviceType: 'Antique Furniture Restoration',
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'South Mumbai' },
      { '@type': 'City', name: 'Bandra' },
      { '@type': 'City', name: 'Juhu' },
      { '@type': 'City', name: 'Andheri' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between polishing and antique restoration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Antique restoration is a more delicate and specialized process. It focuses on preserving the value and historical integrity of the piece, using traditional techniques and materials, whereas standard polishing is focused on creating a modern, durable finish.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you repair structural damage to antique furniture?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our service includes structural repairs such as fixing loose joints, replacing missing veneer, and repairing cracks. We aim to restore both the beauty and functionality of your antique pieces.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work on-site for antique restoration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For extensive restorations, we often recommend bringing the furniture to our workshop in Mumbai where we have specialized tools. However, minor touch-ups and assessments can be done on-site for your convenience.',
        },
      },
       {
        '@type': 'Question',
        name: 'How do you match the original finish of an antique?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our master craftsmen have extensive experience in color matching and using traditional finishes like shellac or French polish to replicate the original look and feel of your valuable furniture.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is antique restoration expensive?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The cost depends on the complexity of the restoration. We provide a detailed, transparent quote after a thorough assessment. Restoring an antique is an investment in preserving a valuable asset.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Antique Furniture Restoration in Mumbai | A1 Furniture Polish"
        description="Expert antique furniture restoration in Mumbai. We preserve the value and beauty of your heirlooms with traditional techniques. Serving South Mumbai, Bandra, Juhu."
        canonical={getCanonicalURL('/antique-restoration')}
      />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative bg-amber-600 text-white">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Antique Furniture Restoration in Mumbai
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-amber-100">
            Preserving the legacy and beauty of your most valuable heirlooms.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a href={a1Whatsapp} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">WhatsApp Us</a>
            <a href={`tel:${a1Tel}`} className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Call Now</a>
          </div>
        </div>
      </section>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Intro Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Honor Your Heirlooms with Expert Restoration
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
             Antique furniture carries history, value, and sentiment. At A1 Furniture Polish, we provide specialized <a href={pageUrl} className="text-amber-600 hover:underline">antique furniture restoration in Mumbai</a>. Our approach is one of respect and conservation, using traditional methods to revive your pieces while preserving their unique character and value.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <OptimizedImage
                src="/assets/Antique Restoration.jpg"
                alt="Restored antique furniture"
                width={1920}
                height={1280}
                className="rounded-lg shadow-xl"
                sizes={COMMON_SIZES.content}
              />
            </div>
            <div>
              {/* Why Choose Us Section */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Authenticity</h3>
               <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Master Craftsmanship:</strong> Our artisans are trained in historical restoration techniques, serving discerning clients in South Mumbai, Bandra, and Juhu.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Value Preservation:</strong> Our primary goal is to enhance and preserve the monetary and sentimental value of your antique furniture.</div>
                </li>
                 <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                   <div><strong>Traditional Materials:</strong> We use period-appropriate materials like shellac, waxes, and natural glues to ensure an authentic finish.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Structural & Veneer Repair:</strong> We go beyond polishing to perform delicate structural repairs, fixing joints, and replacing damaged veneer with precision.</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Our Process Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Antique Restoration Process</h3>
            <ol className="grid md:grid-cols-4 gap-8 text-center">
               <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">1</div>
                <h4 className="font-semibold text-lg mb-2">Detailed Assessment</h4>
                <p className="text-gray-600">We conduct an in-depth analysis of the piece’s history, construction, and damage to plan the restoration.</p>
              </li>
              <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h4 className="font-semibold text-lg mb-2">Gentle Cleaning</h4>
                <p className="text-gray-600">We gently clean decades of dirt and grime without stripping the original patina or damaging delicate surfaces.</p>
              </li>
              <li className="flex flex-col items-center">
                 <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">3</div>
                <h4 className="font-semibold text-lg mb-2">Structural Repair</h4>
                <p className="text-gray-600">We carefully repair any structural issues, ensuring the piece is stable and functional once more.</p>
              </li>
              <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">4</div>
                <h4 className="font-semibold text-lg mb-2">Finish Restoration</h4>
                <p className="text-gray-600">We painstakingly restore the finish, often using French polishing techniques to achieve an authentic, rich luster.</p>
              </li>
            </ol>
          </div>
          
           {/* Service Locations */}
          <div className="mt-20 text-center bg-gray-50 p-8 rounded-lg">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">Serving Discerning Clients Across Mumbai</h3>
             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
               Our specialized antique restoration services are available across Mumbai, with a focus on areas known for heritage properties:
             </p>
             <div className="mt-4 flex justify-center flex-wrap gap-4">
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">South Mumbai</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Bandra</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Juhu</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Andheri</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Malabar Hill</span>
             </div>
          </div>


          {/* Testimonials Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">What Our Clients Say</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-500"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
                <p className="text-gray-600 mb-4">"They restored my grandfather\'s writing desk with incredible care and skill. I was afraid its character would be lost, but they preserved it beautifully. True artists."</p>
                <p className="font-semibold text-gray-800">- R. Fernandez, Bandra</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                    <div className="flex text-amber-500"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
                <p className="text-gray-600 mb-4">"I entrusted A1 with a family heirloom, and they exceeded all my expectations. The repair work is seamless, and the finish is perfect. Worth every rupee for this level of quality in Mumbai."</p>
                <p className="font-semibold text-gray-800">- Mrs. Desai, South Mumbai</p>
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
            <h3 className="text-3xl font-bold mb-4">Preserve Your Legacy Furniture!</h3>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto mb-8">
             Contact us for a private consultation to discuss the restoration of your valuable antique furniture.
            </p>
            <div className="flex justify-center space-x-4">
              <a href={a1Whatsapp} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">WhatsApp Us</a>
              <a href={`tel:${a1Tel}`} className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Call Now</a>
            </div>
          </div>
          
           {/* Internal Linking Footer */}
           <div className="mt-16 text-center">
                <h4 className="font-semibold text-lg mb-4">Explore Our Other Services</h4>
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-amber-600">
                    <a href="/wooden-furniture-polish" className="hover:underline">Wooden Furniture Polish</a>
                    <a href="/commercial-polishing" className="hover:underline">Commercial Polishing</a>
                    <a href="/" className="hover:underline">Homepage</a>
                </div>
           </div>

        </div>
      </div>
    </>
  );
};

export default AntiqueRestoration;
