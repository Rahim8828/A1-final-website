import React from 'react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { Star, CheckCircle } from 'lucide-react';
import { getCanonicalURL } from '../utils/canonicalURL';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

const SofaAndChairPolishing = () => {
  const pageUrl = "https://a1furniturepolish.com/sofa-chair-polishing";
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
    serviceType: 'Sofa & Chair Polishing',
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
        name: 'What types of sofas and chairs do you polish?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We polish all wooden sofas, chairs, armchairs, rocking chairs, and benches. We handle various wood types to ensure your seating furniture gets the best care in Mumbai.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you protect the upholstery during polishing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We take great care to protect all fabric and leather upholstery. It is carefully covered and masked before any sanding or polishing work begins to prevent any damage.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best polish for dining chairs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For high-use items like dining chairs, we recommend durable finishes like Melamine or PU polish. They offer excellent protection against spills, scratches, and daily wear and tear.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you change the color of my sofa frame?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We can strip the old finish and apply a new wood stain to change the color of your sofa or chair frames, allowing you to match them with your interior decor.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer on-site polishing services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide expert on-site services for sofa and chair polishing across the entire Mumbai region for your convenience. There is no need to transport your furniture.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Sofa & Chair Polishing in Mumbai | A1 Furniture Polish"
        description="Expert sofa and chair polishing in Mumbai. We restore all types of wooden seating in Bandra, Andheri, Juhu & South Mumbai. Call for a free quote!"
        canonical={getCanonicalURL('/sofa-chair-polishing')}
      />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative bg-amber-600 text-white">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Sofa & Chair Polishing Service in Mumbai
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-amber-100">
            Restore the elegance and comfort of your wooden seating furniture.
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
              Expert Polishing for Your Sofas and Chairs
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
             Your wooden sofas and chairs are central to your living space. At A1 Furniture Polish, we offer specialized <a href={pageUrl} className="text-amber-600 hover:underline">sofa and chair polishing in Mumbai</a> to remove signs of wear, scratches, and dullness. We bring back the sophisticated finish, making your seating the highlight of your home once again.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <OptimizedImage
                src="/assets/Sofa And chair.jpg"
                alt="A polished wooden sofa and chair"
                width={1920}
                height={1280}
                className="rounded-lg shadow-xl"
                sizes={COMMON_SIZES.content}
              />
            </div>
            <div>
              {/* Why Choose Us Section */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The A1 Polish Advantage for Seating</h3>
               <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Specialized Expertise:</strong> We focus exclusively on wooden furniture, with deep experience in polishing all types of seating for clients in Bandra, Andheri, and Juhu.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Upholstery Protection:</strong> We meticulously protect all fabric and leather parts of your furniture, ensuring no polish comes into contact with them. Your furniture is in safe hands.</div>
                </li>
                 <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                   <div><strong>Attention to Detail:</strong> From simple stools to chairs with intricate carvings, we provide a flawless finish every time for homes across South Mumbai.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>On-Site Convenience:</strong> Our professional team comes to your home, providing a clean, convenient, and hassle-free service without the need to transport your valuable furniture.</div>
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
                <p className="text-gray-600">We assess your chairs and sofas, discuss your needs, and provide a clear, detailed quote.</p>
              </li>
              <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h4 className="font-semibold text-lg mb-2">Surface Preparation</h4>
                <p className="text-gray-600">We mask upholstery, sand the wood, and treat stains to ensure a perfect base.</p>
              </li>
              <li className="flex flex-col items-center">
                 <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">3</div>
                <h4 className="font-semibold text-lg mb-2">Expert Application</h4>
                <p className="text-gray-600">Our skilled artisans apply the chosen polish evenly for a consistent and beautiful finish.</p>
              </li>
              <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">4</div>
                <h4 className="font-semibold text-lg mb-2">Final Quality Check</h4>
                <p className="text-gray-600">We conduct a thorough inspection to ensure the result meets our high standards.</p>
              </li>
            </ol>
          </div>
          
           {/* Service Locations */}
          <div className="mt-20 text-center bg-gray-50 p-8 rounded-lg">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">Servicing Homes Across the Entire Mumbai Region</h3>
             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
               Our on-site sofa and chair polishing service is available for all residential clients in Mumbai, including:
             </p>
             <div className="mt-4 flex justify-center flex-wrap gap-4">
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">South Mumbai</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Bandra & Khar</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Andheri & Juhu</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Powai & Chembur</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Thane</span>
             </div>
          </div>

          {/* Caring for your Polished Furniture */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Caring for Your Polished Furniture</h3>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <CheckCircle className="text-green-500 h-6 w-6 mr-3 mt-1"/>
                <div>
                  <h4 className="font-semibold text-lg">Dust Regularly</h4>
                  <p className="text-gray-600">Use a soft, lint-free cloth to dust your furniture regularly. This prevents the build-up of dirt that can scratch the polish.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 h-6 w-6 mr-3 mt-1"/>
                <div>
                  <h4 className="font-semibold text-lg">Avoid Direct Sunlight</h4>
                  <p className="text-gray-600">Prolonged exposure to direct sunlight can cause the polish to fade or crack. Try to position your furniture away from windows.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 h-6 w-6 mr-3 mt-1"/>
                <div>
                  <h4 className="font-semibold text-lg">Use Coasters & Mats</h4>
                  <p className="text-gray-600">Protect the surface from moisture and heat by using coasters, placemats, and tablecloths, especially on dining tables and coffee tables.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-500 h-6 w-6 mr-3 mt-1"/>
                <div>
                  <h4 className="font-semibold text-lg">Clean Spills Immediately</h4>
                  <p className="text-gray-600">Wipe up any spills immediately with a soft, damp cloth. Avoid using harsh chemicals or abrasive cleaners.</p>
                </div>
              </div>
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
                <p className="text-gray-600 mb-4">"My dining chairs look better than new! A1 Furniture Polish protected the fabric perfectly and the wood finish is flawless. Excellent service in my Andheri West home."</p>
                <p className="font-semibold text-gray-800">- Sunita M.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                    <div className="flex text-amber-500"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
                <p className="text-gray-600 mb-4">"Professional, punctual, and skilled. They transformed our old wooden sofa set in our Bandra apartment. The team was very careful and did a clean job."</p>
                <p className="font-semibold text-gray-800">- Amit D.</p>
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
            <h3 className="text-3xl font-bold mb-4">Renew Your Seating Furniture Today!</h3>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto mb-8">
             Get in touch for a free consultation and let us bring back the shine to your sofas and chairs.
            </p>
            <div className="flex justify-center space-x-4">
              <a href={a1Whatsapp} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Get a Quote</a>
              <a href={`tel:${a1Tel}`} className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300">Call Now</a>
            </div>
          </div>
          
           {/* Internal Linking Footer */}
           <div className="mt-16 text-center">
                <h4 className="font-semibold text-lg mb-4">Explore Our Other Services</h4>
                <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-amber-600">
                    <a href="/wooden-furniture-polish" className="hover:underline">Wooden Furniture Polish</a>
                    <a href="/table-bed-polishing" className="hover:underline">Table & Bed Polishing</a>
                    <a href="/antique-restoration" className="hover:underline">Antique Restoration</a>
                    <a href="/commercial-polishing" className="hover:underline">Commercial Polishing</a>
                    <a href="/" className="hover:underline">Homepage</a>
                </div>
           </div>

        </div>
      </div>
    </>
  );
};

export default SofaAndChairPolishing;
