import React from 'react';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../components/JsonLd';
import { Star } from 'lucide-react';
import { getCanonicalURL } from '../utils/canonicalURL';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

const TableAndBedPolishing = () => {
  const pageUrl = "https://a1furniturepolish.com/table-bed-polishing";
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
    serviceType: 'Table & Bed Polishing',
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Jogeshwari' },
      { '@type': 'City', name: 'Andheri' },
      { '@type': 'City', name: 'Goregaon' },
      { '@type': 'City', name: 'Oshiwara' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What kinds of tables do you polish?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We polish all kinds of wooden tables, including dining tables, coffee tables, study tables, and side tables. We work with various finishes to restore their surfaces in Mumbai.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you remove water marks and heat stains from my dining table?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our polishing process is highly effective at removing surface-level water marks, heat stains, and minor scratches. We sand the surface to prepare it for a fresh, new finish.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you polish a large, heavy bed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our team provides on-site services in Jogeshwari and Andheri. We carefully work in your home, protecting the surrounding area and disassembling parts of the bed only if necessary.',
        },
      },
       {
        '@type': 'Question',
        name: 'How long does it take to polish a wooden bed frame?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Polishing a standard wooden bed frame typically takes 4-6 hours, depending on its design and condition. We ensure the work is completed efficiently in your Goregaon home.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the polishing smell strong?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use low-VOC (Volatile Organic Compounds) and eco-friendly products to minimize odors. We also ensure your space is well-ventilated during and after the process.',
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Table & Bed Polishing in Mumbai | A1 Furniture Polish"
        description="Professional table and bed polishing in Mumbai. We restore dining tables, coffee tables, and wooden beds in Jogeshwari, Andheri & Goregaon. Contact us!"
        canonical={getCanonicalURL('/table-bed-polishing')}
      />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero Section */}
      <section className="relative bg-amber-600 text-white">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Table & Bed Polishing Services in Mumbai
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-amber-100">
            Restore the centerpiece of your dining room and the comfort of your bedroom.
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
              Restore Your Dining Tables and Beds
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
             Your dining table and bed are more than just furniture; they are central to your daily life. At A1 Furniture Polish, we offer expert <a href={pageUrl} className="text-amber-600 hover:underline">table and bed polishing in Mumbai</a>. We erase signs of daily use, from water marks on your coffee table to scuffs on your bed frame, bringing back a flawless and durable finish.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <OptimizedImage
                src="/assets/Table & Bed Polishing.jpg"
                alt="Craftsman polishing a dining table in Mumbai"
                width={1920}
                height={1280}
                className="rounded-lg shadow-xl"
                sizes={COMMON_SIZES.content}
              />
            </div>
            <div>
              {/* Why Choose Us Section */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Polish Your Tables and Beds?</h3>
               <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Remove Stains & Scratches:</strong> Our process effectively removes unsightly water rings, heat stains, food spills, and scratches from table surfaces.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Restore Bed Frame Beauty:</strong> We restore the shine and color of your wooden bed frames, headboards, and footboards, enhancing your bedroom's aesthetic.</div>
                </li>
                 <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                   <div><strong>Hygienic and Clean Finish:</strong> A fresh polish seals the wood, making it easier to clean and more hygienic for daily use in your Jogeshwari or Andheri home.</div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 font-bold mr-2">✔</span>
                  <div><strong>Increased Durability:</strong> Our high-quality finishes protect the wood from future damage, extending the life of your valuable furniture in Goregaon.</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Our Process Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Table & Bed Polishing Process</h3>
            <ol className="grid md:grid-cols-4 gap-8 text-center">
               <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">1</div>
                <h4 className="font-semibold text-lg mb-2">Surface Analysis</h4>
                <p className="text-gray-600">We examine the extent of stains, scratches, and wear to determine the best course of action for restoration.</p>
              </li>
              <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">2</div>
                <h4 className="font-semibold text-lg mb-2">Deep Sanding</h4>
                <p className="text-gray-600">The tabletop or bed frame is thoroughly sanded to remove the damaged layer and create a perfectly smooth surface.</p>
              </li>
              <li className="flex flex-col items-center">
                 <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">3</div>
                <h4 className="font-semibold text-lg mb-2">Stain & Polish</h4>
                <p className="text-gray-600">We apply stain if needed, followed by multiple coats of durable polish for a rich, protective finish.</p>
              </li>
              <li className="flex flex-col items-center">
                <div className="bg-amber-500 text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">4</div>
                <h4 className="font-semibold text-lg mb-2">Curing & Finish</h4>
                <p className="text-gray-600">The polish is allowed to cure properly, resulting in a hard, beautiful surface that is ready for use.</p>
              </li>
            </ol>
          </div>
          
           {/* Service Locations */}
          <div className="mt-20 text-center bg-gray-50 p-8 rounded-lg">
             <h3 className="text-2xl font-bold text-gray-900 mb-4">Serving Across Mumbai</h3>
             <p className="text-lg text-gray-600 max-w-3xl mx-auto">
               We provide on-site table and bed polishing services throughout Mumbai, with a focus on these key areas:
             </p>
             <div className="mt-4 flex justify-center flex-wrap gap-4">
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Jogeshwari</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Andheri</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Goregaon</span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">Oshiwara</span>
                 <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">And all over Mumbai</span>
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
                <p className="text-gray-600 mb-4">"They completely removed the white stains from my coffee table. It looks incredible. Very professional and clean work from the A1 team in my Goregaon apartment."</p>
                <p className="font-semibold text-gray-800">- Neha V.</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                    <div className="flex text-amber-500"><Star /><Star /><Star /><Star /><Star /></div>
                </div>
                <p className="text-gray-600 mb-4">"I was ready to throw away my old dining table, but A1 Furniture Polish restored it beautifully. Saved me a lot of money. Great on-site service in Jogeshwari."</p>
                <p className="font-semibold text-gray-800">- Sanjay P.</p>
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
            <h3 className="text-3xl font-bold mb-4">Give Your Tables and Beds a New Look!</h3>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto mb-8">
             Contact us for a free estimate on our expert table and bed polishing services in Mumbai.
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
                    <a href="/sofa-chair-polishing" className="hover:underline">Sofa & Chair Polishing</a>
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

export default TableAndBedPolishing;
