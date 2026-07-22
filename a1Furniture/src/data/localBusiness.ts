
export const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'A1 Furniture Polish',
  image: 'https://a1furniturepolish.com/android-chrome-512x512.png',
  url: 'https://a1furniturepolish.com',
  telephone: '+918828709945',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shop No 18, Akbar Ali Compound, Relief Road, near HK College, Oshiwara, Jogeshwari West',
    addressLocality: 'Mumbai',
    postalCode: '400102',
    addressRegion: 'MH',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.1358,
    longitude: 72.8347,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  sameAs: [
    'https://www.facebook.com/a1furniturepolish',
    'https://www.instagram.com/a1furniturepolish',
  ],
  areaServed: [
    // Western Suburbs
    { '@type': 'Neighborhood', name: 'Andheri West' },
    { '@type': 'Neighborhood', name: 'Andheri East' },
    { '@type': 'Neighborhood', name: 'Bandra West' },
    { '@type': 'Neighborhood', name: 'Bandra East' },
    { '@type': 'Neighborhood', name: 'Juhu' },
    { '@type': 'Neighborhood', name: 'Goregaon West' },
    { '@type': 'Neighborhood', name: 'Goregaon East' },
    { '@type': 'Neighborhood', name: 'Malad West' },
    { '@type': 'Neighborhood', name: 'Malad East' },
    { '@type': 'Neighborhood', name: 'Borivali West' },
    { '@type': 'Neighborhood', name: 'Borivali East' },
    { '@type': 'Neighborhood', name: 'Kandivali' },
    { '@type': 'Neighborhood', name: 'Santacruz' },
    { '@type': 'Neighborhood', name: 'Vile Parle' },
    { '@type': 'Neighborhood', name: 'Khar West' },
    { '@type': 'Neighborhood', name: 'Oshiwara' },
    { '@type': 'Neighborhood', name: 'Lokhandwala' },
    { '@type': 'Neighborhood', name: 'Versova' },
    { '@type': 'Neighborhood', name: 'Jogeshwari' },
    { '@type': 'Neighborhood', name: 'Dahisar' },
    // Central Suburbs & Eastern Suburbs
    { '@type': 'Neighborhood', name: 'Powai' },
    { '@type': 'Neighborhood', name: 'Ghatkopar' },
    { '@type': 'Neighborhood', name: 'Chembur' },
    { '@type': 'Neighborhood', name: 'Kurla' },
    { '@type': 'Neighborhood', name: 'Mulund' },
    { '@type': 'Neighborhood', name: 'Bhandup' },
    { '@type': 'Neighborhood', name: 'Vikhroli' },
    { '@type': 'Neighborhood', name: 'Sion' },
    { '@type': 'Neighborhood', name: 'Matunga' },
    { '@type': 'Neighborhood', name: 'Dadar' },
    // South Mumbai
    { '@type': 'Neighborhood', name: 'South Mumbai' },
    { '@type': 'Neighborhood', name: 'Worli' },
    { '@type': 'Neighborhood', name: 'Lower Parel' },
    { '@type': 'Neighborhood', name: 'Prabhadevi' },
    { '@type': 'Neighborhood', name: 'Mahalaxmi' },
    { '@type': 'Neighborhood', name: 'Colaba' },
    { '@type': 'Neighborhood', name: 'Marine Drive' },
    { '@type': 'Neighborhood', name: 'Malabar Hill' },
    { '@type': 'Neighborhood', name: 'Tardeo' },
    { '@type': 'Neighborhood', name: 'Byculla' },
    // Extended Mumbai Region
    { '@type': 'City', name: 'Mumbai' },
    { '@type': 'City', name: 'Thane' },
    { '@type': 'City', name: 'Navi Mumbai' }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Furniture Polishing & Repair Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wood Furniture Polishing',
          description: 'Professional wood polishing, touch-up, and scratch removal service across Mumbai.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'PU Polish & Melamine Coating',
          description: 'High-gloss & matt PU polish and melamine finish for modern wooden furniture and doors.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sofa Repair & Upholstery',
          description: 'Sofa cushioning, fabric changing, leatherette repair, and wood framework polishing.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Antique Furniture Restoration',
          description: 'Expert restoration and French polishing for vintage and antique wooden furniture.'
        }
      }
    ]
  }
};

