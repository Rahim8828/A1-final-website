
export const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: 'A1 Furniture Polish',
  image: 'https://a1furniturepolish.com/logo.png', // Replace with your actual logo URL
  url: 'https://a1furniturepolish.com',
  telephone: '+918828709945',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123, Furniture Lane',
    addressLocality: 'Mumbai',
    postalCode: '400058',
    addressRegion: 'MH',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.0760, // Replace with your actual latitude
    longitude: 72.8777, // Replace with your actual longitude
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
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/a1furniturepolish', // Replace with your actual Facebook URL
    'https://www.instagram.com/a1furniturepolish', // Replace with your actual Instagram URL
  ],
  priceRange: '$$',
  areaServed: [
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 19.1136, // Jogeshwari
        longitude: 72.8694,
      },
      geoRadius: '5000',
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 19.1194, // Andheri
        longitude: 72.8465,
      },
      geoRadius: '5000',
    },
    {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 19.1645, // Goregaon
        longitude: 72.8493,
      },
      geoRadius: '5000',
    },
  ],
};
