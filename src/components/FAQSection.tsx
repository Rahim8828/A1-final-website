import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How quickly can you start the furniture polishing work?',
      answer: 'We offer same-day service for most areas in Mumbai. Book before 2 PM and we can start the same day. Emergency services available within 2-4 hours.',
    },
    {
      question: 'What type of polish do you use? Is it safe?',
      answer: 'We use premium quality PU (Polyurethane) polish, Deco paint, and melamine polish. All materials are eco-friendly, non-toxic, and safe for homes with children and pets. We provide 6 months warranty on all polishing work.',
    },
    {
      question: 'Do I need to empty my furniture before polishing?',
      answer: 'Yes, please empty all items from the furniture. Our team will handle the furniture carefully, but we recommend removing all contents for safety and better results.',
    },
    {
      question: 'How long does the polishing work take?',
      answer: 'Small items (1-2 shelves): 2-3 hours | Medium furniture (bookshelf, TV unit): 4-6 hours | Large items (wardrobes): 1-2 days. Drying time is additional 24-48 hours depending on weather.',
    },
    {
      question: 'What is included in the price?',
      answer: 'Our price includes: Material cost (polish, sandpaper, primer), Labor charges, Transportation of materials, and 6 months service warranty. No hidden charges.',
    },
    {
      question: 'Do you provide color matching service?',
      answer: 'Yes! We can match any existing color or help you choose from 100+ shade options. We do a test patch before starting the full work to ensure perfect color match.',
    },
    {
      question: 'What if I am not satisfied with the work?',
      answer: 'We offer 100% satisfaction guarantee. If you are not happy with the work, we will redo it for free within 7 days. We also provide 6 months warranty against peeling or color fading.',
    },
    {
      question: 'Do you work on weekends and holidays?',
      answer: 'Yes, we work 7 days a week including weekends and holidays. You can book a slot that is convenient for you - morning, afternoon, or evening.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-gray-600">Quick answers to common questions about our services</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-orange-300 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
