import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft, Search, Phone, MessageCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found — A1 Furniture Polish</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="The page you're looking for doesn't exist. Browse our furniture polishing services or contact us." />
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Number */}
          <div className="mb-6">
            <span className="text-8xl md:text-9xl font-black text-amber-200 select-none">404</span>
          </div>

          {/* Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Sorry, the page you're looking for doesn't exist or has been moved.
            Let us help you find what you need!
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-md"
            >
              <Home size={18} />
              Go to Home
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-colors"
            >
              <Search size={18} />
              Browse Services
            </Link>
            <a
              href="https://wa.me/918828709945?text=Hi%2C%20I%20need%20help%20finding%20a%20service"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>

          {/* Popular Services */}
          <div className="bg-white rounded-xl shadow-md p-6 text-left">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Popular Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Link to="/services/wooden-furniture-polish" className="text-amber-700 hover:text-amber-900 hover:underline py-1">
                → Wooden Furniture Polish
              </Link>
              <Link to="/sofa-chair-polishing" className="text-amber-700 hover:text-amber-900 hover:underline py-1">
                → Sofa & Chair Polishing
              </Link>
              <Link to="/services/table-and-bed-polishing" className="text-amber-700 hover:text-amber-900 hover:underline py-1">
                → Table & Bed Polishing
              </Link>
              <Link to="/services/antique-restoration" className="text-amber-700 hover:text-amber-900 hover:underline py-1">
                → Antique Restoration
              </Link>
              <Link to="/deco-paint-services" className="text-amber-700 hover:text-amber-900 hover:underline py-1">
                → Deco Paint Services
              </Link>
              <Link to="/sofa-services" className="text-amber-700 hover:text-amber-900 hover:underline py-1">
                → Sofa Repair Services
              </Link>
              <Link to="/ikea-assembly" className="text-amber-700 hover:text-amber-900 hover:underline py-1">
                → IKEA Assembly
              </Link>
              <Link to="/contact" className="text-amber-700 hover:text-amber-900 hover:underline py-1">
                → Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
            <Phone size={14} />
            <span>Need help? Call us at </span>
            <a href="tel:+918828709945" className="text-amber-700 font-semibold hover:underline">
              +91 8828709945
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
