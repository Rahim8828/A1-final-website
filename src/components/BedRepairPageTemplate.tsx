import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  Shield,
  Award,
  Users,
  MessageCircle,
  Home,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  Wrench,
  Droplets,
  Bug,
  Palette,
  Sparkles,
  TreePine,
} from 'lucide-react';
import SEOHead from './SEOHead';
import { FadeIn } from './ScrollAnimations';
import TypesOfWoodWePolish from './TypesOfWoodWePolish';
import type {
  BedRepairProblem,
  BedRepairLocation,
  BedRepairFAQ,
  BedWoodType,
} from '../data/bedRepairConfig';
import {
  bedRepairProblems,
  bedRepairServices,
  bedWoodTypes,
  getBedRepairInternalLinks,
  getBedFAQsForProblem,
  bedRepairFAQs,
} from '../data/bedRepairConfig';

// ── Types ──────────────────────────────────────────────────────────────

export interface BedRepairPageProps {
  problem?: BedRepairProblem;
  location?: BedRepairLocation;
  woodType?: BedWoodType;
  pageType: 'master' | 'problem' | 'location' | 'location-problem' | 'wood-type';
}

// ── Icon map ───────────────────────────────────────────────────────────

const problemIcons: Record<string, React.ReactNode> = {
  scratched: <Wrench className="w-5 h-5" />,
  faded: <Palette className="w-5 h-5" />,
  'water-damaged': <Droplets className="w-5 h-5" />,
  termite: <Bug className="w-5 h-5" />,
};

const badgeColors: Record<string, string> = {
  red: 'bg-red-100 text-red-700 border-red-200',
  amber: 'bg-amber-100 text-amber-700 border-amber-200',
  blue: 'bg-blue-100 text-blue-700 border-blue-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
};

// ── Helper: build meta ─────────────────────────────────────────────────

function buildMeta(
  pageType: string,
  problem?: BedRepairProblem,
  location?: BedRepairLocation,
  woodType?: BedWoodType
) {
  const locName = location?.name || 'Mumbai';
  const locSlug = location?.slug || 'mumbai';

  if (pageType === 'master') {
    return {
      title: 'Bed Repair Mumbai | #1 Wooden Bed Repair Service Near You \u2013 A1 Furniture Polish',
      description: 'Best bed repair service in Mumbai. Fix scratched, faded, water damaged & termite damaged wooden beds. Teakwood, veneer, MDF, plywood, walnut \u2014 all wood types. 4.9\u2605 rated. Call +91 8828709945.',
      h1: 'Professional Bed Repair Service in Mumbai',
      canonical: 'https://a1furniturepolish.com/bed-repair-mumbai',
      breadcrumb: 'Bed Repair Mumbai',
      primaryKeyword: 'bed repair mumbai',
      secondaryKeywords: [
        'bed repair near me',
        'bed repair contact number',
        'wooden bed polish',
        'bed polishing service',
        'wooden bed repair near me',
        'furniture repair near me',
      ],
    };
  }

  if (pageType === 'wood-type' && woodType) {
    return {
      title: `${woodType.name} in Mumbai | Expert ${woodType.shortName} Bed Service \u2013 A1 Furniture Polish`,
      description: `${woodType.description} 4.9\u2605 rated, 500+ happy customers. Doorstep service. Call +91 8828709945.`,
      h1: `${woodType.name} Service in Mumbai`,
      canonical: `https://a1furniturepolish.com/${woodType.slug}`,
      breadcrumb: woodType.name,
      primaryKeyword: woodType.primaryKeyword,
      secondaryKeywords: woodType.secondaryKeywords,
    };
  }

  if (pageType === 'problem' && problem) {
    return {
      title: `${problem.name} in Mumbai | Professional ${problem.shortName} Bed Fix \u2013 A1 Furniture Polish`,
      description: `${problem.description} Doorstep service. 4.9\u2605 rated, 500+ happy customers. Call +91 8828709945.`,
      h1: `${problem.name} Service in Mumbai`,
      canonical: `https://a1furniturepolish.com/${problem.slug}`,
      breadcrumb: problem.name,
      primaryKeyword: problem.primaryKeyword,
      secondaryKeywords: problem.secondaryKeywords,
    };
  }

  if (pageType === 'location' && location) {
    return {
      title: `Bed Repair in ${locName} | Best Bed Repair Service ${locName} \u2013 A1 Furniture Polish`,
      description: `Professional bed repair service in ${locName}. Fix scratched, faded, water damaged & termite damaged wooden beds at doorstep. Teakwood, veneer, plywood, MDF. Serving ${location.nearbyAreas.slice(0, 3).join(', ')} & more. Call +91 8828709945.`,
      h1: `Best Bed Repair Service in ${locName}`,
      canonical: `https://a1furniturepolish.com/bed-repair-${locSlug}`,
      breadcrumb: `Bed Repair ${locName}`,
      primaryKeyword: `bed repair ${locName.toLowerCase()}`,
      secondaryKeywords: [
        `bed repair in ${locName.toLowerCase()}`,
        `bed repair near ${locName.toLowerCase()}`,
        `wooden bed polish ${locName.toLowerCase()}`,
        `bed repair contact number ${locName.toLowerCase()}`,
        `furniture repair ${locName.toLowerCase()}`,
        `best bed repair service ${locName.toLowerCase()}`,
      ],
    };
  }

  // location-problem
  if (problem && location) {
    return {
      title: `${problem.name} in ${locName} | ${problem.shortName} Bed Fix ${locName} \u2013 A1 Furniture Polish`,
      description: `${problem.shortName} bed repair in ${locName}. ${problem.description.slice(0, 120)} Serving ${location.nearbyAreas.slice(0, 3).join(', ')} & nearby. Call +91 8828709945.`,
      h1: `${problem.name} in ${locName}`,
      canonical: `https://a1furniturepolish.com/${problem.slug}-${locSlug}`,
      breadcrumb: `${problem.shortName} Bed \u2013 ${locName}`,
      primaryKeyword: `${problem.primaryKeyword} ${locName.toLowerCase()}`,
      secondaryKeywords: [
        `${problem.primaryKeyword} in ${locName.toLowerCase()}`,
        `bed repair ${locName.toLowerCase()}`,
        `wooden bed polish ${locName.toLowerCase()}`,
        ...problem.secondaryKeywords.slice(0, 3).map((k) => `${k} ${locName.toLowerCase()}`),
      ],
    };
  }

  return {
    title: 'Bed Repair Mumbai \u2013 A1 Furniture Polish',
    description: 'Professional bed repair in Mumbai.',
    h1: 'Bed Repair Mumbai',
    canonical: 'https://a1furniturepolish.com/bed-repair-mumbai',
    breadcrumb: 'Bed Repair',
    primaryKeyword: 'bed repair mumbai',
    secondaryKeywords: [],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════════

const BedRepairPageTemplate: React.FC<BedRepairPageProps> = ({
  problem,
  location,
  woodType,
  pageType,
}) => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const meta = buildMeta(pageType, problem, location, woodType);
  const locName = location?.name || 'Mumbai';
  const faqs: BedRepairFAQ[] = problem
    ? getBedFAQsForProblem(problem.id)
    : getBedFAQsForProblem('');
  const internalLinks = getBedRepairInternalLinks(
    problem?.id,
    location?.slug,
    woodType?.id
  );

  // Build JSON-LD schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'A1 Furniture Polish',
    image: 'https://a1furniturepolish.com/assets/bed/bed-polish.webp',
    '@id': meta.canonical,
    url: meta.canonical,
    telephone: '+918828709945',
    priceRange: problem?.priceRange || woodType?.priceRange || '\u20B91,500 \u2013 \u20B928,000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location ? `${locName}` : 'Goregaon West',
      addressLocality: locName === 'Mumbai' ? 'Mumbai' : locName,
      addressRegion: 'Maharashtra',
      postalCode: '400104',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location?.lat || 19.1557,
      longitude: location?.lng || 72.8495,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '20:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '534',
    },
    sameAs: [
      'https://wa.me/918828709945',
      'https://www.instagram.com/a1furniturepolish/',
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: problem?.name || woodType?.name || 'Bed Repair',
    provider: { '@type': 'LocalBusiness', name: 'A1 Furniture Polish' },
    areaServed: { '@type': 'City', name: locName },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: String(problem?.startingPrice || woodType?.startingPrice || 1500),
      availability: 'https://schema.org/InStock',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const serviceName = problem?.name || woodType?.name || 'bed repair';
  const whatsappMsg = `Hi, I need ${serviceName} service in ${locName}`;

  return (
    <>
      <SEOHead
        title={meta.title}
        description={meta.description}
        keywords={[meta.primaryKeyword, ...meta.secondaryKeywords].join(', ')}
        canonical={meta.canonical}
        structuredData={[localBusinessSchema, serviceSchema, faqSchema]}
        ogTitle={meta.title}
        ogDescription={meta.description}
        ogImage="/assets/Antique Restoration.jpg"
      />

      {/* ── Breadcrumb ── */}
      <section className="bg-gray-50 py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center flex-wrap gap-1 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center text-gray-600 hover:text-amber-600 transition-colors">
              <Home size={16} className="mr-1" /> Home
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link to="/bed-repair-mumbai" className="text-gray-600 hover:text-amber-600 transition-colors">
              Bed Repair
            </Link>
            {(problem || location || woodType) && (
              <>
                <ChevronRight size={16} className="text-gray-400" />
                <span className="text-amber-600 font-medium">{meta.breadcrumb}</span>
              </>
            )}
          </nav>
        </div>
      </section>

      {/* ── Hero Section ── */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Same-Day Service
                  </div>
                  {problem && (
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badgeColors[problem.badgeColor]}`}>
                      {problemIcons[problem.id]}
                      {problem.shortName} Problem
                    </div>
                  )}
                  {woodType && (
                    <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
                      <TreePine className="w-3.5 h-3.5" />
                      {woodType.shortName} Wood
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">
                    <MapPin className="w-3.5 h-3.5" />
                    {locName}
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                  {meta.h1}
                </h1>

                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  {problem
                    ? problem.description
                    : woodType
                    ? woodType.description
                    : `Professional bed repair service in ${locName}. We fix scratched, faded, water damaged, and termite damaged wooden beds at your doorstep. Expert craftsmen handle teakwood, veneer, plywood, MDF, walnut, and solid wood beds with 6-month warranty.`}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                  {[
                    { icon: <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />, text: '4.9\u2605 Rated' },
                    { icon: <Users className="w-4 h-4 text-blue-500" />, text: '500+ Families' },
                    { icon: <Shield className="w-4 h-4 text-green-500" />, text: '6 Mo Warranty' },
                    { icon: <Clock className="w-4 h-4 text-purple-500" />, text: 'Same Day Service' },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg shadow-sm text-xs md:text-sm font-medium">
                      {badge.icon}
                      {badge.text}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+918828709945"
                    className="flex items-center justify-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition-all duration-200 shadow-lg font-semibold min-h-[48px]"
                  >
                    <Phone size={20} />
                    Call Now \u2013 Free Estimate
                  </a>
                  <a
                    href={`https://wa.me/918828709945?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg font-semibold min-h-[48px]"
                  >
                    <MessageCircle size={20} />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={problem?.images?.hero || "/assets/Antique Restoration.jpg"}
                    alt={`${problem?.name || woodType?.name || 'Bed Repair'} service in ${locName}`}
                    className="w-full h-64 md:h-80 object-cover"
                    loading="eager"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/Antique Restoration.jpg';
                    }}
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-2xl font-bold text-amber-600">
                          {problem?.priceRange || woodType?.priceRange || '\u20B91,500'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                        ))}
                        <span className="text-sm font-semibold ml-1">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg px-4 py-2.5 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-gray-800">Available Today in {locName}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Problem Detail (problem pages) ── */}
      {problem && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl ${badgeColors[problem.badgeColor]}`}>
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Understanding the Problem: {problem.shortName} Bed
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg mb-8">{problem.problemDetail}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Common Causes
                    </h3>
                    <ul className="space-y-2.5">
                      {problem.causes.map((cause, i) => (
                        <li key={i} className="flex items-start gap-2 text-red-700 text-sm">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                    <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" /> Signs to Look For
                    </h3>
                    <ul className="space-y-2.5">
                      {problem.signs.map((sign, i) => (
                        <li key={i} className="flex items-start gap-2 text-amber-700 text-sm">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Wood Type Detail (wood type pages) ── */}
      {woodType && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
                    <TreePine className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    About {woodType.shortName} Beds
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg mb-8">{woodType.detail}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                    <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                      <TreePine className="w-5 h-5" /> Characteristics
                    </h3>
                    <ul className="space-y-2.5">
                      {woodType.characteristics.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-emerald-700 text-sm">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                    <h3 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" /> Common Issues
                    </h3>
                    <ul className="space-y-2.5">
                      {woodType.commonIssues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-2 text-amber-700 text-sm">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Repair approach + polish types */}
                <div className="mt-8 bg-gradient-to-br from-gray-50 to-amber-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Our {woodType.shortName} Repair Approach</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{woodType.repairApproach}</p>
                  <div className="flex flex-wrap gap-2">
                    {woodType.polishTypes.map((pt, i) => (
                      <span key={i} className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-200">
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Types of Wood We Polish ── */}
      <TypesOfWoodWePolish locationName={locName} />

      {/* ── Repair Process (problem pages) or Services (master/location/wood-type) ── */}
      {problem ? (
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-10">
                <span className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
                  Our {problem.shortName} Repair Process
                </span>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                  How We Fix Your {problem.shortName} Bed
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our proven 5-step process ensures complete restoration{location ? ` for customers in ${locName}` : ''}
                </p>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-5 gap-4">
              {problem.repairSteps.map((step, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <div className="relative bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shadow-md">
                      {i + 1}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                    {i < problem.repairSteps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                        <ArrowRight className="w-5 h-5 text-amber-400" />
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="text-center mt-10">
              <a href="tel:+918828709945" className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-xl hover:bg-amber-700 transition-all shadow-lg font-semibold">
                <Phone size={20} /> Get Free {problem.shortName} Repair Quote
              </a>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-10">
                <span className="inline-block bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
                  Complete Bed Repair Solutions
                </span>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                  Our Bed Repair Services{location ? ` in ${locName}` : ''}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  From minor scratches to complete restoration \u2014 we handle every wooden bed problem
                </p>
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bedRepairServices.map((service, i) => (
                <FadeIn key={i} delay={i * 50}>
                  <div className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-amber-300 hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="text-2xl mb-3">{service.icon}</div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">{service.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Wood Types Grid (master & location pages) ── */}
      {!problem && !woodType && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                  All Wood Types We Repair{location ? ` in ${locName}` : ''}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Click on your bed&apos;s wood type for specialized repair information and pricing
                </p>
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {bedWoodTypes.map((wood, i) => (
                <FadeIn key={i} delay={i * 80}>
                  <Link
                    to={`/${wood.slug}`}
                    className="group block bg-gradient-to-br from-emerald-50 to-amber-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                          <TreePine className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                          {wood.shortName}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{wood.description.slice(0, 100)}\u2026</p>
                      <div className="flex items-center justify-between">
                        <span className="text-amber-600 font-bold">{wood.priceRange}</span>
                        <span className="flex items-center gap-1 text-amber-600 text-sm font-semibold">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Problem Cards (master & location pages) ── */}
      {!problem && !woodType && (
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
                  Common Bed Problems We Fix{location ? ` in ${locName}` : ''}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Click on your bed&apos;s problem for detailed repair information and pricing
                </p>
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {bedRepairProblems.map((prob, i) => {
                const url = location ? `/${prob.slug}-${location.slug}` : `/${prob.slug}`;
                return (
                  <FadeIn key={i} delay={i * 80}>
                    <Link to={url} className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100">
                      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className={`p-4 rounded-full ${badgeColors[prob.badgeColor]}`}>
                          {problemIcons[prob.id]}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">{prob.shortName} Bed</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{prob.description.slice(0, 100)}\u2026</p>
                        <div className="mt-3 flex items-center gap-1 text-amber-600 text-sm font-semibold">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Pricing Section ── */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Transparent Pricing</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                No hidden charges. Free home consultation & estimate{location ? ` in ${locName}` : ''}.
              </p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bedRepairProblems.map((prob, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className={`relative bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border ${
                  problem?.id === prob.id ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-gray-700'
                }`}>
                  {problem?.id === prob.id && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">Current</div>
                  )}
                  <div className="text-center mb-4">
                    <div className={`inline-flex p-2 rounded-lg ${badgeColors[prob.badgeColor]} mb-2`}>{problemIcons[prob.id]}</div>
                    <h3 className="text-white font-bold">{prob.shortName}</h3>
                  </div>
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                      \u20B9{prob.startingPrice.toLocaleString()}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">Starting price</p>
                    <p className="text-gray-300 text-sm font-medium">{prob.priceRange}</p>
                  </div>
                  <a
                    href={`https://wa.me/918828709945?text=${encodeURIComponent(`Hi, I need ${prob.name} in ${locName}. Please share pricing.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Get Quote
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Factors affecting price: bed size, wood type (teakwood, veneer, MDF, plywood, walnut), damage severity, and polish type.
              Final quote after free home inspection.
            </p>
          </div>
        </div>
      </section>

      {/* ── Location Coverage ── */}
      {location && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MapPin className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Areas We Serve in {locName}</h2>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We provide doorstep {problem ? problem.name.toLowerCase() : 'bed repair'} service across all areas in {locName}
                </p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {location.nearbyAreas.map((area, i) => (
                <FadeIn key={i} delay={i * 30}>
                  <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{area}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href={`https://wa.me/918828709945?text=${encodeURIComponent(`Hi, I need ${problem ? problem.name : 'bed repair'} in ${locName}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-all shadow-lg font-semibold"
              >
                <MessageCircle size={20} /> Book Service in {locName}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── Why Choose Us ── */}
      <section className={`py-12 md:py-16 ${location ? 'bg-gray-50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Why Choose A1 Furniture Polish{location ? ` in ${locName}` : ''}?
              </h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Award className="w-7 h-7 text-amber-600" />, title: '15+ Years Experience', desc: 'Trusted by 500+ Mumbai families for expert bed repair and wood polishing.' },
              { icon: <Shield className="w-7 h-7 text-green-600" />, title: '6-Month Warranty', desc: 'Every repair comes with a 6-month warranty. We stand behind our work.' },
              { icon: <MapPin className="w-7 h-7 text-blue-600" />, title: 'Doorstep Service', desc: `We come to your home in ${locName}. No need to move heavy furniture.` },
              { icon: <Clock className="w-7 h-7 text-purple-600" />, title: 'Same-Day Available', desc: 'Emergency repairs and same-day service in most Mumbai locations.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-all">
                  <div className="inline-flex p-3 bg-gray-50 rounded-xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                {problem
                  ? `Common questions about ${problem.name.toLowerCase()} in ${locName}`
                  : woodType
                  ? `Common questions about ${woodType.name.toLowerCase()}`
                  : `Everything you need to know about bed repair in ${locName}`}
              </p>
            </div>
          </FadeIn>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 40}>
                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                  <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} className="flex items-center justify-between w-full px-5 py-4 text-left">
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFAQ === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFAQ === i && (
                    <div className="px-5 pb-4">
                      <p className="text-gray-700 leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Links ── */}
      <section className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Related Bed Repair Services</h2>
            <div className="flex flex-wrap gap-2">
              {internalLinks.map((link, i) => (
                <Link key={i} to={link.url} className="inline-flex items-center gap-1.5 bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-amber-300 hover:text-amber-700 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" /> {link.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-14 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {problem ? `Fix Your ${problem.shortName} Bed Today` : woodType ? `Get Your ${woodType.shortName} Bed Polished Today` : 'Get Your Bed Repaired Today'}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Free home consultation. Transparent pricing. 6-month warranty. Serving {locName} and all of Mumbai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+918828709945" className="inline-flex items-center justify-center gap-2 bg-white text-amber-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-colors shadow-xl">
                <Phone size={22} /> Call +91 88287 09945
              </a>
              <a
                href={`https://wa.me/918828709945?text=${encodeURIComponent(`Hi, I need ${serviceName} in ${locName}. Please send pricing and availability.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-xl"
              >
                <MessageCircle size={22} /> WhatsApp for Quick Quote
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default BedRepairPageTemplate;
