import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import SEOHead from '../../src/components/SEOHead';
import { FadeIn } from '../components/ScrollAnimations';
import { getCanonicalURL } from '../utils/canonicalURL';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    service: 'Bed Wood Polish',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.full_name || !formData.phone_number) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    const message = `New Quote Request from Website:

Name: ${formData.full_name}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone_number}
Service: ${formData.service}
Message: ${formData.message || 'No additional message'}

URL: ${window.location.href}`;

    const whatsappUrl = `https://wa.me/918828709945?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    alert('WhatsApp opened with your quote request. Please tap Send in WhatsApp to send the message.');
    
    // Reset form
    setFormData({
      full_name: '',
      email: '',
      phone_number: '',
      service: 'Bed Wood Polish',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Your full name *</label>
        <input 
          type="text" 
          name="full_name" 
          id="full_name" 
          value={formData.full_name}
          onChange={handleChange}
          autoComplete="name" 
          required
          className="mt-1 py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-amber-500 focus:border-amber-500 border border-gray-300 rounded-md" 
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email address</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email}
          onChange={handleChange}
          autoComplete="email" 
          className="mt-1 py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-amber-500 focus:border-amber-500 border border-gray-300 rounded-md" 
        />
      </div>
      <div>
        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Your phone number *</label>
        <input 
          type="tel" 
          name="phone_number" 
          id="phone_number" 
          value={formData.phone_number}
          onChange={handleChange}
          autoComplete="tel" 
          required
          className="mt-1 py-3 px-4 block w-full focus:ring-amber-500 focus:border-amber-500 border border-gray-300 rounded-md" 
          placeholder="+91 12345 67890" 
        />
      </div>
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select a service</label>
        <select 
          id="service" 
          name="service" 
          value={formData.service}
          onChange={handleChange}
          className="mt-1 py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-amber-500 focus:border-amber-500 border border-gray-300 rounded-md"
        >
          <option>Bed Wood Polish</option>
          <option>Door Wood Polish</option>
          <option>Cabinet Wood Polish</option>
          <option>Table Wood Polish</option>
          <option>Dining Set Polish</option>
          <option>Wooden Door Frame Polish</option>
          <option>Bookshelf / Rack Polish</option>
          <option>Wooden Shelf Polish</option>
          <option>Mandir Polish</option>
          <option>Jula Polish</option>
          <option>Sofa Polish</option>
          <option>Chester Drawer Polish</option>
          <option>Wardrobe Polish</option>
          <option>TV Unit Polish</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Tell us about your furniture polishing requirements</label>
        <textarea 
          id="message" 
          name="message" 
          rows={4} 
          value={formData.message}
          onChange={handleChange}
          className="mt-1 py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-amber-500 focus:border-amber-500 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone size={24} className="text-white" />,
      title: 'Phone',
      text: '+91 8828709945',
      href: 'tel:+918828709945',
    },
    {
      icon: <Mail size={24} className="text-white" />,
      title: 'Email',
      text: 'a1furniturepolishservice@gmail.com',
      href: 'mailto:a1furniturepolishservice@gmail.com',
    },
    {
        icon: <MapPin size={24} className="text-white" />,
        title: 'Address',
        text: 'Shop No 18, Akbar Ali Compound, Relief Road, near HK College, Oshiwara, Jogeshwari West, Mumbai, Maharashtra 400102',
    },
    {
      icon: <Clock size={24} className="text-white" />,
      title: 'Hours',
      text: 'Available 24/7',
    },
  ];

  return (
    <>
      <SEOHead
        title="Contact A1 Furniture Polish in Mumbai"
        description="Get in touch with A1 Furniture Polish for expert wood polishing services in Mumbai. Contact us for a free quote for your furniture."
        keywords="a1 furniture polish contact, furniture polishing mumbai, wood polish service, contact for furniture polish"
        canonical={getCanonicalURL('/contact')}
      />
      
      <div className="bg-white text-gray-800">

        {/* Header */}
        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 py-16 md:py-20 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <FadeIn>
              <span className="inline-block bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Let's Restore Your <span className="text-amber-600">Furniture</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We're here to help you restore the beauty of your furniture. Reach out for a free consultation and quote. Available 24/7 for your convenience.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">

            {/* Contact Information */}
            <FadeIn>
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  Have questions? We're here to help! Reach out through any of these channels.
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                        {item.href ? (
                          <a href={item.href} className="text-sm md:text-base text-gray-600 hover:text-amber-600 transition-colors break-words">
                            {item.text}
                          </a>
                        ) : (
                          <p className="text-sm md:text-base text-gray-600 break-words">{item.text}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-900">Quick Response Guaranteed</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    We typically respond within 30 minutes during business hours. For urgent requests, call us directly!
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a 
                    href="tel:+918828709945" 
                    className="flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all transform hover:scale-105"
                  >
                    <Phone size={18} className="mr-2" /> Call Now
                  </a>
                  <a 
                    href="https://wa.me/918828709945" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:scale-105"
                  >
                    <MessageCircle size={18} className="mr-2" /> WhatsApp
                  </a>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={200}>
              <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Request a Free Quote</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you with a detailed quote within 24 hours.
                </p>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Visit Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Us in Mumbai</h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                We serve customers across Mumbai and surrounding areas. Visit our workshop or we'll come to you!
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={200}>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.058352628886!2d72.83614527462436!3d19.14892284968038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b774c4aec095%3A0x5d8d2b1b1e74bc0a!2sA1%20Furniture%20Polish%20Service!5e0!3m2!1sen!2sin!4v1758041294733!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </FadeIn>

          {/* Service Areas */}
          <FadeIn delay={300}>
            <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 p-6 md:p-8 rounded-2xl border border-amber-200">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-center">
                We Serve All Mumbai Areas
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-center">
                {['Andheri', 'Bandra', 'Powai', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali', 'Borivali'].map((area, index) => (
                  <div key={index} className="bg-white px-3 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-700">
                    {area}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                ...and many more areas across Mumbai!
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
};

export default Contact;