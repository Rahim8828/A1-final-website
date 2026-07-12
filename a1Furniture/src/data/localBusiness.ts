
export const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: 'A1 Furniture Polish',
  image: 'https://a1furniturepolish.com/android-chrome-512x512.png',
  url: 'https://a1furniturepolish.com',
  telephone: '+918828709945',
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
  priceRange: '$$',
  areaServed: [
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 19.1136,
        longitude: 72.8694,
      },
      geoRadius: '5000',
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 19.1194,
        longitude: 72.8465,
      },
      geoRadius: '5000',
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 19.1645,
        longitude: 72.8493,
      },
      geoRadius: '5000',
    },
  ],
};

