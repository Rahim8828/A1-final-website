import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  Paintbrush,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { getCanonicalURL } from '../utils/canonicalURL';
import {
  furnitureProducts,
  type FurnitureProduct,
  type ColorVariant,
} from '../data/furnitureProducts';
import { servicePageData } from '../data/servicePageData';

// ─── Helper: find nearest servicePageData entry for a product ───
function findServiceData(product: FurnitureProduct) {
  // Match by category → servicePageData id convention
  const categoryMap: Record<string, string[]> = {
    sofas: ['sofa-polish'],
    beds: ['bed-polish'],
    dining: ['dining-polish'],
    tables: ['table-polish'],
    wardrobes: ['wardrobe-polish'],
    cabinets: ['cabinet-polish'],
    'tv-units': ['tvunit-polish'],
    doors: ['door-polish'],
    jhula: ['jhula-polish'],
    mandir: ['mandir-polish'],
    'floor-polish': ['wooden-furniture-polish'],
    consultation: ['wooden-furniture-polish'],
    'color-refresh': ['deco-paint'],
  };

  const possibleIds = categoryMap[product.category] || [];
  for (const id of possibleIds) {
    const found = servicePageData.find((s) => s.id === id);
    if (found) return found;
  }
  // Fallback to first polish service
  return servicePageData[0];
}

// ─── Testimonial Interface ───
interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

// ─── Category-specific testimonials ───
const categoryTestimonials: Record<string, Testimonial[]> = {
  sofas: [
    { name: 'Kavita Nair', location: 'Bandra West', rating: 5, text: 'My 10-year-old sofa set looks absolutely brand new! The team handled the carving details perfectly. Worth every rupee.', date: '2 weeks ago' },
    { name: 'Arun Sharma', location: 'Goregaon', rating: 5, text: 'Sofa polish done in exactly 2.5 hours. Very clean work. No mess left behind. My wife is thrilled!', date: '1 month ago' },
    { name: 'Deepa Menon', location: 'Andheri', rating: 4, text: 'The finish on our wooden sofa turned out beautiful. The colour depth and the 6-month warranty made it feel like a smart upgrade.', date: '3 weeks ago' },
  ],
  beds: [
    { name: 'Sunita Verma', location: 'Malad', rating: 5, text: 'My queen-size bed looks like it came from the showroom yesterday! The headboard finish is stunning. Highly recommend.', date: '1 week ago' },
    { name: 'Rakesh Gupta', location: 'Powai', rating: 5, text: 'Our king bed polish was finished the same day and the final coat feels premium. Great communication throughout.', date: '3 weeks ago' },
    { name: 'Priyanka Jain', location: 'Borivali', rating: 4, text: 'The queen bed polish turned out better than expected. The light brown shade matches our room perfectly.', date: '1 month ago' },
  ],
  dining: [
    { name: 'Rahul Deshmukh', location: 'Dadar', rating: 5, text: 'Our 6-seater dining set was looking dull after 5 years. Now it shines like new! Heat-resistant coating is a great touch.', date: '2 weeks ago' },
    { name: 'Nisha Patel', location: 'Khar', rating: 5, text: 'Dining table and 4 chairs all polished beautifully. The food-safe finish gives me peace of mind.', date: '1 month ago' },
    { name: 'Vikram Singh', location: 'Vile Parle', rating: 4, text: 'Professional team, on-time arrival. The water-resistant coating on the dining table is exactly what we needed.', date: '3 weeks ago' },
  ],
  'floor-polish': [
    { name: 'Anita Desai', location: 'Bandra', rating: 5, text: 'The machine polish gave our living room floor an even premium gloss. It genuinely lifted the whole home.', date: '1 week ago' },
    { name: 'Mohan Iyer', location: 'Juhu', rating: 5, text: 'We chose hand polish for a more natural look and the grain came alive beautifully. Very clean, very professional.', date: '2 weeks ago' },
    { name: 'Shalini Rao', location: 'Santa Cruz', rating: 5, text: 'Clear pricing per square foot and the final finish looks far more expensive than what we paid.', date: '3 weeks ago' },
  ],
  consultation: [
    { name: 'Pooja Bhatt', location: 'Bandra', rating: 5, text: 'The ₹99 visit was worth it. We got a clear recommendation, accurate pricing, and booked the right polish service with confidence.', date: '2 weeks ago' },
    { name: 'Sameer Khan', location: 'Dadar', rating: 5, text: 'The expert explained the finish options properly during the consultation and helped us avoid an expensive wrong choice.', date: '3 weeks ago' },
    { name: 'Ritika Joshi', location: 'Versova', rating: 4, text: 'Fast visit, practical advice, and no sales pressure. It made the booking process feel very trustworthy.', date: '1 month ago' },
  ],
  'color-refresh': [
    { name: 'Amit Tiwari', location: 'Malad', rating: 5, text: 'We changed our chair finish from dark brown to a warm walnut tone and the result feels custom-made.', date: '2 weeks ago' },
    { name: 'Meera Shah', location: 'Powai', rating: 5, text: 'The door colour change made our entrance look brand new without replacing the woodwork. Very premium finish.', date: '3 weeks ago' },
    { name: 'Nitin Joshi', location: 'Goregaon', rating: 4, text: 'Booked a frame colour change for our bed and study table base. The updated shade modernised the room instantly.', date: '1 month ago' },
  ],
};

const defaultTestimonials: Testimonial[] = [
  {
    name: 'Priya Sharma',
    location: 'Andheri West',
    rating: 5,
    text: 'Absolutely incredible work! My old dining table looks brand new. The team was professional, punctual, and left no mess behind.',
    date: '3 weeks ago',
  },
  {
    name: 'Rajesh Mehta',
    location: 'Goregaon East',
    rating: 5,
    text: 'I was skeptical initially but the results exceeded my expectations. The polish quality is superb and their 6-month warranty gives great peace of mind.',
    date: '1 month ago',
  },
  {
    name: 'Sneha Patel',
    location: 'Powai',
    rating: 4,
    text: 'Very reliable service. Booked via WhatsApp and the team arrived on time. My wardrobe looks stunning after the polish. Highly recommend!',
    date: '2 months ago',
  },
];

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = useMemo(
    () => furnitureProducts.find((p) => p.id === productId),
    [productId]
  );

  const serviceData = useMemo(
    () => (product ? findServiceData(product) : null),
    [product]
  );

  const [selectedColor, setSelectedColor] = useState<ColorVariant>('dark-brown');
  const [imgError, setImgError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Related products in same category
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return furnitureProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Category-specific testimonials
  const testimonials = useMemo(() => {
    if (!product) return defaultTestimonials;
    return categoryTestimonials[product.category] || defaultTestimonials;
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-12 h-12 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-500 mb-6">
            The polish service you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate('/services')}
            className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
          >
            Browse All Services
          </button>
        </div>
      </div>
    );
  }

  const getImageForColor = (): string => {
    // If product has a direct image property (no color variants), use it
    if (product.image) return product.image;
    
    // Otherwise, use color variants
    if (!product.colorVariants || product.colorVariants.length === 0) {
      return '/products/placeholder.webp'; // Fallback
    }
    
    const variant = product.colorVariants.find((v) => v.id === selectedColor);
    if (variant?.image) return variant.image;
    const fallback = product.colorVariants.find((v) => v.image);
    return fallback?.image || '/products/placeholder.webp';
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const faqs = serviceData?.faqs || [
    { question: `How long does ${product.name} polishing take?`, answer: `Our ${product.name} polish service typically takes ${product.estimatedTime || '2-4 hours'} depending on the condition. Our expert craftsmen ensure thorough work without compromising quality.` },
    { question: 'What polish brands do you use?', answer: 'We use premium quality Melamine polish from trusted brands. It is eco-friendly, durable, and provides an excellent long-lasting finish.' },
    { question: 'Do you provide a warranty?', answer: 'Yes! All our wood polish services come with a 6-month warranty against peeling, flaking, or fading under normal use conditions.' },
    { question: 'Can I choose the polish shade?', answer: 'Absolutely! We offer three standard finishes — Light Brown, Dark Brown, and White. Custom shades can be matched on request at no extra cost.' },
    { question: 'Do I need to move the furniture?', answer: 'No, our professionals work on-site at your home. We recommend clearing the area around the furniture for easy access. We use protective sheets to keep your space clean.' },
    { question: `What's included in the price?`, answer: 'The total price includes material cost, labour, surface preparation, scratch removal, premium polish application, protective finish, post-service cleaning, and a 6-month warranty.' },
  ];

  const priceIncludes = serviceData?.priceIncludes || [
    'Material & labour cost (Hand Polish)',
    'Premium polish brand',
    'Post-service cleaning',
    'Scratch removal & surface preparation',
    '6 months warranty on polish',
  ];

  const processSteps = serviceData?.processSteps || [
    { step: 1, title: 'Consultation & Booking', description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.', image: '' },
    { step: 2, title: 'Surface Preparation', description: 'Our professionals clean and sand the furniture surface to remove old polish and scratches.', image: '' },
    { step: 3, title: 'Polish Shade Selection', description: 'Choose from clear or colored finishes that match your furniture and home décor.', image: '' },
    { step: 4, title: 'Gap Filling & Polish Application', description: 'We fill any gaps or cracks, then apply premium quality polish evenly.', image: '' },
    { step: 5, title: 'Drying & Finishing', description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.', image: '' },
    { step: 6, title: 'Quality Check & Handover', description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed furniture.', image: '' },
  ];

  const trustBadges = serviceData?.trustBadges || [
    { icon: 'shield-check', text: 'Background verified professionals' },
    { icon: 'wrench', text: '300+ hours of training' },
    { icon: 'medal', text: 'Certified under Skill India Programme' },
  ];

  // Generate SEO-rich content about this product
  const seoContent = {
    title: `${product.name} Service in Mumbai | Starting ₹${product.price.toLocaleString('en-IN')} | A1 Furniture Polish`,
    description: `Professional ${product.name.toLowerCase()} service in Mumbai. ₹${product.price.toLocaleString('en-IN')} only. Includes ${priceIncludes.slice(0, 3).join(', ')}. 6 months warranty. Book now!`,
  };

  return (
    <>
      <SEOHead
        title={seoContent.title}
        description={seoContent.description}
        canonical={getCanonicalURL(`/services/${product.id}`)}
      />

      <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-gray-100 py-2.5 px-4" aria-label="Breadcrumb">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-gray-500">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/services" className="hover:text-amber-600 transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              to={`/services?category=${product.category}`}
              className="hover:text-amber-600 transition-colors capitalize"
            >
              {product.category.replace('-', ' ')}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium truncate max-w-[180px]">{product.name}</span>
          </div>
        </nav>

        {/* ═══════════════════════════════════════════════
            MAIN PRODUCT SECTION
        ═══════════════════════════════════════════════ */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
              {/* LEFT — Product Image */}
              <div className="space-y-4">
                <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl border border-gray-100 overflow-hidden aspect-square">
                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm ${
                        product.badge === 'Best Seller'
                          ? 'bg-amber-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Discount */}
                  {discountPercent > 0 && (
                    <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold">
                      {discountPercent}% OFF
                    </div>
                  )}

                  {/* Image */}
                  <img
                    src={getImageForColor()}
                    alt={`${product.name} - ${selectedColor} finish - Professional wood polish service in Mumbai`}
                    className="w-full h-full object-cover p-4 md:p-6 transition-transform duration-300 hover:scale-105"
                    onError={() => setImgError(true)}
                  />
                </div>

                {/* Color Thumbnails - Only show if colorVariants exist and more than 1 */}
                {product.colorVariants && product.colorVariants.length > 1 && (
                  <div className="flex items-center gap-3 justify-center">
                    {product.colorVariants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => { setSelectedColor(variant.id); setImgError(false); }}
                        className={`relative w-16 h-16 rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                          selectedColor === variant.id
                            ? 'border-amber-500 ring-2 ring-amber-200 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: variant.hex + '30' }}
                        >
                          <div
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: variant.hex, borderColor: variant.hex === '#F5F0E8' ? '#d1d5db' : variant.hex }}
                          />
                        </div>
                        {selectedColor === variant.id && (
                          <div className="absolute inset-x-0 bottom-0 bg-amber-600 text-white text-[8px] font-bold text-center py-0.5">
                            {variant.label}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT — Product Details */}
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
                    A1 Furniture Polish
                  </p>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1 bg-green-600 text-white px-2.5 py-1 rounded-lg text-sm font-bold">
                    <span>{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.reviewCount.toLocaleString('en-IN')} Ratings
                  </span>
                  {product.estimatedTime && (
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {product.estimatedTime}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Short description */}
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>

                {/* Color Selection - Only show if colorVariants exist and more than 1 */}
                {product.colorVariants && product.colorVariants.length > 1 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Select Polish Shade</p>
                    <div className="flex items-center gap-3">
                      {product.colorVariants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => { setSelectedColor(variant.id); setImgError(false); }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                            selectedColor === variant.id
                              ? 'border-amber-500 bg-amber-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div
                            className="w-5 h-5 rounded-full border"
                            style={{ backgroundColor: variant.hex, borderColor: variant.hex === '#F5F0E8' ? '#d1d5db' : variant.hex }}
                          />
                          <span className={`text-xs font-medium ${
                            selectedColor === variant.id ? 'text-amber-700' : 'text-gray-600'
                          }`}>
                            {variant.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {product.features.map((f, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {f}
                    </span>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 py-3 border-t border-b border-gray-100">
                  {trustBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                      <ShieldCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons - Visible on all screen sizes */}
                <div className="flex gap-3 pt-6 pb-4">
                  <a
                    href={`https://wa.me/918828709945?text=Hi!%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}%20polish%20service%20(₹${product.price}).%20Please%20share%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-green-700 transition-colors shadow-md hover:shadow-lg active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Book via WhatsApp
                  </a>
                  <a
                    href="tel:+918828709945"
                    className="flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-amber-600 text-amber-600 rounded-xl font-bold text-sm hover:bg-amber-50 transition-colors active:scale-[0.98]"
                  >
                    <Phone className="w-5 h-5" />
                    Call
                  </a>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center justify-center w-12 rounded-xl border-2 transition-all ${
                      isLiked
                        ? 'border-red-300 bg-red-50 text-red-500'
                        : 'border-gray-200 text-gray-400 hover:border-gray-300'
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            YOUR TOTAL PRICE INCLUDES
        ═══════════════════════════════════════════════ */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
              Your Total Price Includes
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8 max-w-2xl mx-auto">
              No hidden charges. Everything is included in the price you see.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {priceIncludes.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            WHY CHOOSE OUR PROFESSIONALS
        ═══════════════════════════════════════════════ */}
        <section className="bg-gradient-to-b from-amber-50/50 to-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
              Why Choose A1 Furniture Polish?
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8 max-w-2xl mx-auto">
              Mumbai's most trusted furniture polish service with 10,000+ happy customers
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: <ShieldCheck className="w-7 h-7" />,
                  title: 'Verified Professionals',
                  desc: 'Every craftsman is background verified, trained, and certified under the Skill India Programme.',
                },
                {
                  icon: <Award className="w-7 h-7" />,
                  title: '6 Months Warranty',
                  desc: 'All polish services come with a 6-month warranty against peeling, flaking, or fading.',
                },
                {
                  icon: <Paintbrush className="w-7 h-7" />,
                  title: 'Premium Materials',
                  desc: 'We use only top-grade Melamine polish for a durable, showroom-quality finish.',
                },
                {
                  icon: <Users className="w-7 h-7" />,
                  title: '10,000+ Happy Customers',
                  desc: 'Trusted by families across Mumbai — Andheri, Goregaon, Powai, Bandra, Dadar and more.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-amber-600">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            OUR PROCESS
        ═══════════════════════════════════════════════ */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
              Our Polish Process
            </h2>
            <p className="text-sm text-gray-500 text-center mb-10 max-w-2xl mx-auto">
              A systematic 6-step process ensures perfect results every time
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="relative bg-gray-50 rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="absolute -top-3 -left-3 w-9 h-9 bg-amber-600 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 mt-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SEO CONTENT — DETAILED PRODUCT INFO
        ═══════════════════════════════════════════════ */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
            <div className="max-w-4xl mx-auto prose prose-gray prose-sm md:prose-base">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 not-prose">
                Professional {product.name} Service in Mumbai
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Looking for the <strong>best {product.name.toLowerCase()} service in Mumbai</strong>? A1 Furniture Polish
                  offers premium wood polishing services starting at just <strong>₹{product.price.toLocaleString('en-IN')}</strong>.
                  Our expert craftsmen specialize in restoring the natural beauty of your wooden furniture using top-quality
                  Melamine polish that lasts for years.
                </p>

                <div className="not-prose bg-amber-50 rounded-xl p-6 border border-amber-100">
                  <h3 className="font-bold text-gray-900 text-lg mb-3">What's Included in Our {product.name} Service?</h3>
                  <ul className="space-y-2">
                    {priceIncludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h3 className="text-xl font-bold text-gray-900 not-prose mt-8">
                  Why Is Regular Furniture Polishing Important?
                </h3>
                <p>
                  Wooden furniture is an investment that adds warmth and character to your home. Over time,
                  exposure to sunlight, humidity, and daily use can cause the surface to lose its shine,
                  develop scratches, and show signs of aging. Regular professional polishing not only restores
                  the appearance but also creates a protective barrier that extends the life of your furniture.
                </p>
                <ul className="space-y-1 text-sm">
                  <li><strong>Restores original beauty</strong> — Removes scratches, stains, and dull patches</li>
                  <li><strong>Protects against damage</strong> — Creates a moisture and heat-resistant barrier</li>
                  <li><strong>Increases furniture lifespan</strong> — Prevents wood from drying out and cracking</li>
                  <li><strong>Enhances home aesthetics</strong> — Polished furniture elevates your entire space</li>
                  <li><strong>Saves money long-term</strong> — Regular maintenance avoids costly replacements</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 not-prose mt-8">
                  Service Areas in Mumbai
                </h3>
                <p>
                  We provide {product.name.toLowerCase()} services across all major areas in Mumbai including
                  Andheri, Goregaon, Malad, Borivali, Kandivali, Powai, Bandra, Khar, Santa Cruz,
                  Vile Parle, Juhu, Versova, Jogeshwari, Dadar, Worli, Lower Parel, Kurla, Chembur,
                  Ghatkopar, Mulund, Thane, and Navi Mumbai. Our team reaches your doorstep at the
                  scheduled time — no delays, no excuses.
                </p>

                <h3 className="text-xl font-bold text-gray-900 not-prose mt-8">
                  Polish Types We Offer
                </h3>
                <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: 'Melamine Polish', desc: 'Most popular choice. Durable, affordable, and gives a smooth natural finish. Ideal for everyday furniture.' },
                    { name: 'Italian / Duco Polish', desc: 'Ultra-premium piano-like finish. Perfect for designer furniture and luxury homes.' },
                  ].map((type, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{type.name}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            TESTIMONIALS with Product Image
        ═══════════════════════════════════════════════ */}
        <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
            {/* Circular Product Image + Heading */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-amber-100 shadow-xl animate-float">
                  <img
                    src={getImageForColor()}
                    alt={`${product.name} - customer reviews`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-1.5 rounded-full border-2 border-amber-200/50 animate-pulse pointer-events-none" />
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md">
                  <Star className="w-3.5 h-3.5 fill-white" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-1">
                What Our Customers Say
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Real reviews from {product.name.toLowerCase()} customers across Mumbai
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {testimonials.map((review, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${
                          j < review.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-400">{review.location}</p>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            FAQs
        ═══════════════════════════════════════════════ */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8 max-w-2xl mx-auto">
              Everything you need to know about our {product.name.toLowerCase()} service
            </p>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-sm md:text-base font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {openFaqIndex === i ? (
                      <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaqIndex === i && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* FAQ Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: faq.answer,
                    },
                  })),
                }),
              }}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            RELATED PRODUCTS
        ═══════════════════════════════════════════════ */}
        {relatedProducts.length > 0 && (
          <section className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Related Services</h2>
                <Link
                  to={`/services?category=${product.category}`}
                  className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((rp) => {
                  const rpDiscount = Math.round(((rp.originalPrice - rp.price) / rp.originalPrice) * 100);
                  return (
                    <Link
                      key={rp.id}
                      to={`/services/${rp.id}`}
                      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="relative bg-gray-50 aspect-[4/3] overflow-hidden">
                        <img
                          src={rp.image || rp.colorVariants?.[0]?.image || '/products/placeholder.webp'}
                          alt={rp.name}
                          className="w-full h-full object-cover p-2 group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {rp.badge && (
                          <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                            {rp.badge}
                          </div>
                        )}
                      </div>
                      <div className="p-3 space-y-1.5">
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-amber-700 transition-colors">
                          {rp.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-0.5 bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                            {rp.rating} <Star className="w-2.5 h-2.5 fill-current" />
                          </div>
                          <span className="text-[10px] text-gray-400">({rp.reviewCount})</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-bold text-gray-900">₹{rp.price.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-gray-400 line-through">₹{rp.originalPrice.toLocaleString('en-IN')}</span>
                          {rpDiscount > 0 && (
                            <span className="text-[10px] font-semibold text-green-600">{rpDiscount}% off</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════
            STICKY BOTTOM BAR — Mobile
        ═══════════════════════════════════════════════ */}
        <div className="fixed bottom-14 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D2B48C]/30 shadow-2xl md:hidden">
          <div className="flex items-center gap-3 px-4 py-2.5">
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-[#5D3A1A]">₹{product.price.toLocaleString('en-IN')}</p>
              <p className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>
            </div>
            <a
              href={`https://wa.me/918828709945?text=Hi!%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}%20polish%20(₹${product.price}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-[#059669] to-[#047857] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md active:scale-[0.97]"
            >
              <MessageCircle className="w-4 h-4" />
              Book Now
            </a>
          </div>
        </div>

        {/* Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.name,
              description: product.description,
              image: getImageForColor(),
              brand: { '@type': 'Brand', name: 'A1 Furniture Polish' },
              offers: {
                '@type': 'Offer',
                priceCurrency: 'INR',
                price: product.price,
                priceValidUntil: '2026-12-31',
                availability: 'https://schema.org/InStock',
                seller: { '@type': 'Organization', name: 'A1 Furniture Polish' },
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: product.rating.toString(),
                ratingCount: product.reviewCount.toString(),
                bestRating: '5',
              },
            }),
          }}
        />
      </div>
    </>
  );
};

export default ProductDetail;
