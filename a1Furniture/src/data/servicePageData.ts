import { ServiceData } from '../types';

// Service categories for tabs
export type ServiceCategory = 'polish' | 'sofa' | 'product' | 'ikea';

export const servicePageData: ServiceData[] = [
  {
    id: 'sofa-polish',
    name: 'Sofa Wood Polish',
    category: 'furniture-polish',
    tabCategory: 'sofa' as ServiceCategory,
    rating: 4.9,
    reviewCount: 2156,
    duration: '~2.5 hrs',
    features: [
      '6 Months Polished Warranty',
      'Premium wood finish',
      'Scratch removal included',
    ],
    image: '/products/front_page_service_products/sofa_polish.webp',
    options: [
      {
        id: 'sofa-1seater',
        name: '1 Seater Sofa',
        price: 1449,
        rating: 4.9,
        reviewCount: 356,
        estimatedTime: '1.5 hrs',
        description: 'Complete wood polish restoration for single-seater sofas. Includes surface preparation, scratch removal, premium polish application, and protective finish. Ideal for armchairs and accent seating.',
        image: '/products/sofa/1_seater_sofa/darkWooden1seaterSofa.webp'
      },
      {
        id: 'sofa-2seater',
        name: '2 Seater Sofa',
        price: 1999,
        rating: 4.9,
        reviewCount: 456,
        estimatedTime: '2 hrs',
        description: 'Professional polish service for 2-seater sofas and loveseats. Our craftsmen restore the natural wood grain, remove surface imperfections, and apply a durable finish that lasts.',
        image: '/products/sofa/2_seater/darkWoodeb2seatersofa.webp'
      },
      {
        id: 'sofa-3seater',
        name: '3 Seater Sofa',
        price: 2949,
        rating: 4.8,
        reviewCount: 678,
        estimatedTime: '2.5 hrs',
        description: 'Full restoration polish for 3-seater sofas. Comprehensive service includes deep cleaning, stain removal, gap filling, and multi-coat polish application for a showroom-quality finish.',
        image: '/products/sofa/3_seater/darkWooden3seatersofa.webp'
      },
      
    ],
    selectedOption: -1,
    priceIncludes: [
      'Material & labour cost (Hand Polish)',
      'Premium polish brand',
      'Post-service cleaning',
      'Scratch removal & surface preparation',
      '6 months warranty on polish',
      'Machine Polish: Extra ₹1,749/-'
    ],
    materials: [
      '/assets/select-wood-polish-shade.webp',
      '/assets/Cleaning & Sanding.webp',
      '/assets/filling-gaps-polish-application.webp',
      '/assets/drying-finishing.webp'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Consultation & Booking',
        description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.',
        image: '/assets/consultation-booking.webp'
      },
      {
        step: 2,
        title: 'Surface Preparation',
        description: 'Our professionals clean and sand the furniture surface to remove old polish and scratches.',
        image: '/assets/Cleaning & Sanding.webp'
      },
      {
        step: 3,
        title: 'Polish Shade Selection',
        description: 'Choose from clear or colored finishes that match your furniture and home décor.',
        image: '/assets/select-wood-polish-shade.webp'
      },
      {
        step: 4,
        title: 'Gap Filling & Polish Application',
        description: 'We fill any gaps or cracks, then apply premium quality polish evenly.',
        image: '/assets/filling-gaps-polish-application.webp'
      },
      {
        step: 5,
        title: 'Drying & Finishing',
        description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.',
        image: '/assets/drying-finishing.webp'
      },
      {
        step: 6,
        title: 'Quality Check & Handover',
        description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed furniture.',
        image: '/assets/wooden furniture .webp'
      }
    ],
    faqs: [
      {
        question: 'How long does sofa polishing take?',
        answer: 'Typically, sofa polishing takes 2-4 hours depending on the size. We ensure thorough work without rushing.'
      },
      {
        question: 'What type of polish do you use?',
        answer: 'We use premium quality Melamine or PU polish based on your preference. Both are durable, eco-friendly, and provide excellent finish.'
      },
      {
        question: 'Do I need to move the sofa?',
        answer: 'No, our professionals can work on-site. However, we recommend clearing the area around the sofa for easy access.'
      },
      {
        question: 'Is there a warranty on the polish?',
        answer: 'Yes, we provide a 1-year warranty on all our polishing work against peeling or fading under normal use.'
      }
    ],
    trustBadges: [
      {
        icon: 'shield-check',
        text: 'Background verified professionals'
      },
      {
        icon: 'wrench',
        text: '300+ hours of training'
      },
      {
        icon: 'medal',
        text: 'Certified under Skill India Programme'
      }
    ]
  },
  {
    id: 'bed-polish',
    name: 'Bed Wood Polish',
    category: 'furniture-polish',
    rating: 4.8,
    reviewCount: 1847,
    duration: '~3 hrs',
    features: [
      '6 Months Polished Warranty',
      'Choice of clear or coloured finishes',
      'Removes scratches and enhances natural look',
    ],
    image: '/products/front_page_service_products/bed_polish.webp',
    options: [
      {
        id: 'bed-single',
        name: 'Single Bed',
        price: 3899,
        rating: 4.8,
        reviewCount: 342,
        estimatedTime: '3 hrs',
        description: 'Professional wood polish service for single beds. Complete restoration including headboard, footboard, and side rails. Removes scratches and restores original wood beauty.',
        image: '/products/bed/single_bed/darkWoodensinglebed.webp'
      },
      {
        id: 'bed-queen',
        name: 'Queen Size Bed',
        price: 4500,
        rating: 4.9,
        reviewCount: 521,
        estimatedTime: '3.5 hrs',
        description: 'Comprehensive polish service for queen size beds. Full coverage of frame, headboard, and all wooden components with premium quality finish and protective coating.',
        image: '/products/bed/queen_bed/darkWoodenQueenSize.webp'
      },
      {
        id: 'bed-king',
        name: 'King Size Bed',
        price: 5899,
        rating: 4.8,
        reviewCount: 284,
        estimatedTime: '4 hrs',
        description: 'Complete wood polish restoration for king size beds. Extended service covers all surfaces with attention to detail. Includes scratch removal and long-lasting protective finish.',
        image: '/products/bed/king_bed/darkWoodenKing.webp'
      },
      {
        id: 'bed-sofacumbed',
        name: 'Sofa cum Bed',
        price: 4799,
        rating: 4.7,
        reviewCount: 89,
        estimatedTime: '4 hrs',
        description: 'Specialized polish service for sofa-cum-bed furniture. Covers both sofa and bed mechanisms wooden components with care for moving parts and joints.',
        image: '/products/sofa_cum_bed/darkBrownSofaCumBed.webp'
      },
    ],
    selectedOption: -1,
    priceIncludes: [
      'Material & labour cost (Hand Polish)',
      'Premium polish brand (Melamine)',
      'Post-service cleaning',
      'Scratch removal & surface preparation',
      '6 months warranty on polish',
      'Machine Polish: Extra ₹1,749/-'
    ],
    materials: [
      '/assets/select-wood-polish-shade.webp',
      '/assets/Cleaning & Sanding.webp',
      '/assets/filling-gaps-polish-application.webp',
      '/assets/drying-finishing.webp'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Consultation & Booking',
        description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.',
        image: '/assets/consultation-booking.webp'
      },
      {
        step: 2,
        title: 'Surface Preparation',
        description: 'Our professionals clean and sand the furniture surface to remove old polish and scratches.',
        image: '/assets/Cleaning & Sanding.webp'
      },
      {
        step: 3,
        title: 'Polish Shade Selection',
        description: 'Choose from clear or colored finishes that match your furniture and home décor.',
        image: '/assets/select-wood-polish-shade.webp'
      },
      {
        step: 4,
        title: 'Gap Filling & Polish Application',
        description: 'We fill any gaps or cracks, then apply premium quality polish evenly.',
        image: '/assets/filling-gaps-polish-application.webp'
      },
      {
        step: 5,
        title: 'Drying & Finishing',
        description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.',
        image: '/assets/drying-finishing.webp'
      },
      {
        step: 6,
        title: 'Quality Check & Handover',
        description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed furniture.',
        image: '/assets/wooden furniture .webp'
      }
    ],
    faqs: [
      {
        question: 'How long does bed polishing take?',
        answer: 'Typically, bed polishing takes 3-4 hours depending on the size and condition of the bed. We ensure thorough work without rushing.'
      },
      {
        question: 'What type of polish do you use?',
        answer: 'We use premium quality Melamine or PU polish based on your preference. Both are durable, eco-friendly, and provide excellent finish.'
      },
      {
        question: 'Do I need to move the bed?',
        answer: 'No, our professionals can work on-site. However, we recommend clearing the area around the bed for easy access.'
      },
      {
        question: 'Is there a warranty on the polish?',
        answer: 'Yes, we provide a 1-year warranty on all our polishing work against peeling or fading under normal use.'
      }
    ],
    trustBadges: [
      {
        icon: 'shield-check',
        text: 'Background verified professionals'
      },
      {
        icon: 'wrench',
        text: '300+ hours of training'
      },
      {
        icon: 'medal',
        text: 'Certified under Skill India Programme'
      }
    ]
  },
  {
    id: 'door-polish',
    name: 'Door Wood Polish',
    category: 'furniture-polish',
    rating: 4.8,
    reviewCount: 1934,
    duration: '~2 hrs',
    features: [
      '6 Months Polished Warranty',
      'Both sides polishing',
      'Frame polishing included',
    ],
    image: '/products/front_page_service_products/door_polish.webp',
    options: [
      { id: 'door-single', name: 'Single Door', price: 2449, rating: 4.7, reviewCount: 523, estimatedTime: '2 hrs', image: '/products/front_page_service_products/door_polish.webp' },
      { id: 'door-2door', name: '2 Door', price: 3899, rating: 4.8, reviewCount: 789, estimatedTime: '3 hrs', image: '/products/front_page_service_products/door_polish.webp' },
      { id: 'door-3door', name: '3 Door', price: 4899, rating: 4.7, reviewCount: 345, estimatedTime: '3.5 hrs', image: '/products/front_page_service_products/door_polish.webp' },
      { id: 'door-4door', name: '4 Door', price: 5899, rating: 4.8, reviewCount: 277, estimatedTime: '4 hrs', image: '/products/front_page_service_products/door_polish.webp' },
    ],
    selectedOption: -1,
    priceIncludes: ['Material & labour cost (Hand Polish)', 'Premium polish brand (Melamine)', 'Post-service cleaning', 'Both sides polishing', '6 months warranty on polish', 'Machine Polish: Extra ₹1,749/-'],
    materials: ['/assets/select-wood-polish-shade.webp', '/assets/Cleaning & Sanding.webp', '/assets/filling-gaps-polish-application.webp', '/assets/drying-finishing.webp'],
    processSteps: [
      { step: 1, title: 'Consultation & Booking', description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Surface Preparation', description: 'Our professionals clean and sand the door surface to remove old polish and scratches.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Polish Shade Selection', description: 'Choose from clear or colored finishes that match your door and home décor.', image: '/assets/select-wood-polish-shade.webp' },
      { step: 4, title: 'Gap Filling & Polish Application', description: 'We fill any gaps or cracks, then apply premium quality polish evenly on both sides.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 5, title: 'Drying & Finishing', description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.', image: '/assets/drying-finishing.webp' },
      { step: 6, title: 'Quality Check & Handover', description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed door.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'How long does door polishing take?', answer: 'Typically, door polishing takes 2-3 hours depending on the size and type. We ensure thorough work without rushing.' },
      { question: 'Do you polish both sides?', answer: 'Yes, we polish both sides of the door and the frame if selected.' },
      { question: 'What type of polish do you use?', answer: 'We use premium quality Melamine or PU polish based on your preference. Both are durable and provide excellent finish.' },
      { question: 'Is there a warranty on the polish?', answer: 'Yes, we provide a 1-year warranty on all our polishing work against peeling or fading under normal use.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' },
      { icon: 'medal', text: 'Certified under Skill India Programme' }
    ]
  },
  {
    id: 'table-polish',
    name: 'Table Wood Polish',
    category: 'furniture-polish',
    rating: 4.8,
    reviewCount: 1767,
    duration: '~2.5 hrs',
    features: ['6 Months Polished Warranty', 'Scratch-resistant finish', 'Food-safe polish options'],
    image: '/products/front_page_service_products/table_polish.webp',
    options: [
      { id: 'table-coffee', name: 'Coffee Table', price: 1549, rating: 4.8, reviewCount: 234, estimatedTime: '1.5 hrs', image: '/products/front_page_service_products/table_polish.webp' },
      { id: 'table-center', name: 'Center Table', price: 2899, rating: 4.9, reviewCount: 567, estimatedTime: '2.5 hrs', image: '/products/front_page_service_products/table_polish.webp' },
      { id: 'table-side', name: 'Side Table', price: 1999, rating: 4.8, reviewCount: 456, estimatedTime: '2 hrs', image: '/products/front_page_service_products/table_polish.webp' },
      { id: 'table-study', name: 'Study Table', price: 3899, rating: 4.7, reviewCount: 310, estimatedTime: '3 hrs', image: '/products/front_page_service_products/table_polish.webp' },
    ],
    selectedOption: -1,
    priceIncludes: ['Material & labour cost (Hand Polish)', 'Premium polish brand (Melamine)', 'Post-service cleaning', 'Scratch removal & surface preparation', '6 months warranty on polish', 'Machine Polish: Extra ₹1,749/-'],
    materials: ['/assets/select-wood-polish-shade.webp', '/assets/Cleaning & Sanding.webp', '/assets/filling-gaps-polish-application.webp', '/assets/drying-finishing.webp'],
    processSteps: [
      { step: 1, title: 'Consultation & Booking', description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Surface Preparation', description: 'Our professionals clean and sand the table surface to remove old polish and scratches.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Polish Shade Selection', description: 'Choose from clear or colored finishes that match your table and home décor.', image: '/assets/select-wood-polish-shade.webp' },
      { step: 4, title: 'Gap Filling & Polish Application', description: 'We fill any gaps or cracks, then apply premium quality polish evenly.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 5, title: 'Drying & Finishing', description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.', image: '/assets/drying-finishing.webp' },
      { step: 6, title: 'Quality Check & Handover', description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed table.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'How long does table polishing take?', answer: 'Typically, table polishing takes 2-3 hours depending on the size. We ensure thorough work without rushing.' },
      { question: 'Is the polish food-safe?', answer: 'Yes, we use food-safe polish options for dining tables that are completely safe for daily use.' },
      { question: 'What type of polish do you use?', answer: 'We use premium quality Melamine or PU polish based on your preference. Both are durable and provide excellent finish.' },
      { question: 'Is there a warranty on the polish?', answer: 'Yes, we provide a 1-year warranty on all our polishing work against peeling or fading under normal use.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' },
      { icon: 'medal', text: 'Certified under Skill India Programme' }
    ]
  },
  {
    id: 'wardrobe-polish',
    name: 'Wardrobe Wood Polish',
    category: 'furniture-polish',
    rating: 4.9,
    reviewCount: 2345,
    duration: '~4 hrs',
    features: ['6 Months Polished Warranty', 'Inside & outside polishing', 'Handles & fittings care'],
    image: '/products/front_page_service_products/wardrobe_polish.webp',
    options: [
      { id: 'wardrobe-2door', name: '2 Door Wardrobe', price: 3499, rating: 4.9, reviewCount: 678, estimatedTime: '3.5 hrs', image: '/products/front_page_service_products/wardrobe_polish.webp' },
      { id: 'wardrobe-3door', name: '3 Door Wardrobe', price: 4449, rating: 4.8, reviewCount: 892, estimatedTime: '4.5 hrs', image: '/products/front_page_service_products/wardrobe_polish.webp' },
      { id: 'wardrobe-4door', name: '4 Door Wardrobe', price: 5849, rating: 4.9, reviewCount: 456, estimatedTime: '5 hrs', image: '/products/front_page_service_products/wardrobe_polish.webp' },
      { id: 'wardrobe-sliding', name: 'Sliding Door Wardrobe', price: 6799, rating: 4.8, reviewCount: 319, estimatedTime: '4 hrs', image: '/products/front_page_service_products/wardrobe_polish.webp' },
    ],
    selectedOption: -1,
    priceIncludes: ['Material & labour cost (Hand Polish)', 'Premium polish brand (Melamine)', 'Post-service cleaning', 'Inside & outside polishing', '6 months warranty on polish', 'Machine Polish: Extra ₹1,749/-'],
    materials: ['/assets/select-wood-polish-shade.webp', '/assets/Cleaning & Sanding.webp', '/assets/filling-gaps-polish-application.webp', '/assets/drying-finishing.webp'],
    processSteps: [
      { step: 1, title: 'Consultation & Booking', description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Surface Preparation', description: 'Our professionals clean and sand the wardrobe surface to remove old polish and scratches.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Polish Shade Selection', description: 'Choose from clear or colored finishes that match your wardrobe and home décor.', image: '/assets/select-wood-polish-shade.webp' },
      { step: 4, title: 'Gap Filling & Polish Application', description: 'We fill any gaps or cracks, then apply premium quality polish evenly inside and outside.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 5, title: 'Drying & Finishing', description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.', image: '/assets/drying-finishing.webp' },
      { step: 6, title: 'Quality Check & Handover', description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed wardrobe.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'How long does wardrobe polishing take?', answer: 'Typically, wardrobe polishing takes 3-5 hours depending on the size and number of doors. We ensure thorough work without rushing.' },
      { question: 'Do you polish inside the wardrobe?', answer: 'Yes, we polish both inside and outside surfaces of the wardrobe for a complete finish.' },
      { question: 'What type of polish do you use?', answer: 'We use premium quality Melamine or PU polish based on your preference. Both are durable and provide excellent finish.' },
      { question: 'Is there a warranty on the polish?', answer: 'Yes, we provide a 1-year warranty on all our polishing work against peeling or fading under normal use.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' },
      { icon: 'medal', text: 'Certified under Skill India Programme' }
    ]
  },
  {
    id: 'dining-set-polish',
    name: 'Dining Set Polish',
    category: 'furniture-polish',
    rating: 4.9,
    reviewCount: 1876,
    duration: '~5 hrs',
    features: ['6 Months Polished Warranty', 'Complete polish for table and chairs', 'Heat and water-resistant finish', 'All Materials & Labour Cost'],
    image: '/products/front_page_service_products/dining_set_polish.webp',
    options: [
      { id: 'dining-2seater', name: '2 Seater + Bench', price: 3449, rating: 4.9, reviewCount: 467, estimatedTime: '3.5 hrs', image: '/products/front_page_service_products/dining_set_polish.webp' },
      { id: 'dining-4seater', name: '4 Seater Dining Set', price: 3899, rating: 4.9, reviewCount: 567, estimatedTime: '4 hrs', image: '/products/front_page_service_products/dining_set_polish.webp' },
      { id: 'dining-6seater', name: '6 Seater Dining Set', price: 5399, rating: 4.9, reviewCount: 789, estimatedTime: '5 hrs', image: '/products/front_page_service_products/dining_set_polish.webp' },
      { id: 'single-table', name: 'Single Table Polish', price: 2999, rating: 4.8, reviewCount: 234, estimatedTime: '1.5 hrs', image: '/products/front_page_service_products/dining_set_polish.webp' },
      { id: 'single-chair', name: 'Single Chair Polish', price: 999, rating: 4.7, reviewCount: 189, estimatedTime: '1 hr', image: '/products/front_page_service_products/dining_set_polish.webp' }
    ],
    selectedOption: -1,
    priceIncludes: ['Material & labour cost (Hand Polish)', 'Premium polish brand (Melamine)', 'Post-service cleaning', 'Complete polish for table and chairs', 'Heat and water-resistant finish', '6 months warranty on polish', 'Machine Polish: Extra ₹1,749/-'],
    materials: ['/assets/select-wood-polish-shade.webp', '/assets/Cleaning & Sanding.webp', '/assets/filling-gaps-polish-application.webp', '/assets/drying-finishing.webp'],
    processSteps: [
      { step: 1, title: 'Consultation & Booking', description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Surface Preparation', description: 'Our professionals clean and sand the dining set surface to remove old polish and scratches.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Polish Shade Selection', description: 'Choose from clear or colored finishes that match your dining set and home décor.', image: '/assets/select-wood-polish-shade.webp' },
      { step: 4, title: 'Gap Filling & Polish Application', description: 'We fill any gaps or cracks, then apply premium quality polish evenly on table and chairs.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 5, title: 'Drying & Finishing', description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.', image: '/assets/drying-finishing.webp' },
      { step: 6, title: 'Quality Check & Handover', description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed dining set.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'How long does dining set polishing take?', answer: 'Typically, dining set polishing takes 4-6 hours depending on the size. We ensure thorough work without rushing.' },
      { question: 'Do you polish both table and chairs?', answer: 'Yes, we polish the complete dining set including table and all chairs for a uniform finish.' },
      { question: 'What type of polish do you use?', answer: 'We use premium quality Melamine or PU polish based on your preference. Both are durable and provide excellent finish.' },
      { question: 'Is there a warranty on the polish?', answer: 'Yes, we provide a 1-year warranty on all our polishing work against peeling or fading under normal use.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' },
      { icon: 'medal', text: 'Certified under Skill India Programme' }
    ]
  },
  {
    id: 'cabinet-polish',
    name: 'Cabinet Wood Polish',
    category: 'furniture-polish',
    rating: 4.8,
    reviewCount: 1456,
    duration: '~2.5 hrs',
    features: ['6 Months Polished Warranty', 'Inside & outside polishing', 'Handles & hinges care'],
    image: '/products/front_page_service_products/crokery_polish.webp',
    options: [
      { id: 'cabinet-single', name: 'Single Door Cabinet', price: 2449, rating: 4.8, reviewCount: 345, estimatedTime: '2 hrs', image: '/products/front_page_service_products/crokery_polish.webp' },
      { id: 'cabinet-double', name: 'Double Door Cabinet', price: 2999, rating: 4.9, reviewCount: 567, estimatedTime: '2.5 hrs', image: '/products/front_page_service_products/crokery_polish.webp' },
      { id: 'cabinet-3door', name: '3 Door Cabinet', price: 3899, rating: 4.7, reviewCount: 234, estimatedTime: '3 hrs', image: '/products/front_page_service_products/crokery_polish.webp' },
      { id: 'cabinet-crockery', name: 'Crockery Self', price: 3999, rating: 4.8, reviewCount: 310, estimatedTime: '3.5 hrs', image: '/products/front_page_service_products/crokery_polish.webp' },
    ],
    selectedOption: -1,
    priceIncludes: ['Material & labour cost (Hand Polish)', 'Premium polish brand (Melamine)', 'Post-service cleaning', 'Inside & outside polishing', '6 months warranty on polish', 'Machine Polish: Extra ₹1,749/-'],
    materials: ['/assets/select-wood-polish-shade.webp', '/assets/Cleaning & Sanding.webp', '/assets/filling-gaps-polish-application.webp', '/assets/drying-finishing.webp'],
    processSteps: [
      { step: 1, title: 'Consultation & Booking', description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Surface Preparation', description: 'Our professionals clean and sand the cabinet surface to remove old polish and scratches.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Polish Shade Selection', description: 'Choose from clear or colored finishes that match your cabinet and home décor.', image: '/assets/select-wood-polish-shade.webp' },
      { step: 4, title: 'Gap Filling & Polish Application', description: 'We fill any gaps or cracks, then apply premium quality polish evenly.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 5, title: 'Drying & Finishing', description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.', image: '/assets/drying-finishing.webp' },
      { step: 6, title: 'Quality Check & Handover', description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed cabinet.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'How long does cabinet polishing take?', answer: 'Typically, cabinet polishing takes 2-3 hours depending on the size. We ensure thorough work without rushing.' },
      { question: 'Do you polish inside the cabinet?', answer: 'Yes, we polish both inside and outside surfaces for a complete finish.' },
      { question: 'What type of polish do you use?', answer: 'We use premium quality Melamine or PU polish based on your preference. Both are durable and provide excellent finish.' },
      { question: 'Is there a warranty on the polish?', answer: 'Yes, we provide a 1-year warranty on all our polishing work against peeling or fading under normal use.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' },
      { icon: 'medal', text: 'Certified under Skill India Programme' }
    ]
  },
  {
    id: 'mandir-polish',
    name: 'Mandir Polish',
    category: 'furniture-polish',
    rating: 4.9,
    reviewCount: 987,
    duration: '~3 hrs',
    features: ['6 Months Polished Warranty', 'Choice of clear or coloured finishes', 'All Materials & Labour Cost'],
    image: '/products/front_page_service_products/mandir_polish.webp',
    options: [
      { id: 'mandir-standard', name: 'Mandir', price: 2999, rating: 4.9, reviewCount: 987, estimatedTime: '3 hrs', image: '/products/front_page_service_products/mandir_polish.webp' }
    ],
    selectedOption: -1,
    priceIncludes: ['Material & labour cost (Hand Polish)', 'Premium polish brand', 'Post-service cleaning', '6 months warranty', 'Machine Polish: Extra ₹1,749/-'],
    materials: ['/assets/select-wood-polish-shade.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Consultation & Booking', description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Surface Preparation', description: 'Our professionals clean and sand the mandir surface to remove old polish and scratches.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Polish Shade Selection', description: 'Choose from clear or colored finishes that match your mandir and home décor.', image: '/assets/select-wood-polish-shade.webp' },
      { step: 4, title: 'Gap Filling & Polish Application', description: 'We fill any gaps or cracks, then apply premium quality polish evenly.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 5, title: 'Drying & Finishing', description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.', image: '/assets/drying-finishing.webp' },
      { step: 6, title: 'Quality Check & Handover', description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed mandir.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'How long does mandir polishing take?', answer: 'Typically 3 hours.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  },
  {
    id: 'jhula-polish',
    name: 'Jhula Polish',
    category: 'furniture-polish',
    rating: 4.8,
    reviewCount: 765,
    duration: '~4 hrs',
    features: ['6 Months Polished Warranty', 'Choice of clear or coloured finishes', 'All Materials & Labour Cost'],
    image: '/products/front_page_service_products/jhula_polish.webp',
    options: [
      { id: 'jhula-1seater', name: '1 Seater Jhula', price: 1999, rating: 4.8, reviewCount: 465, estimatedTime: '3 hrs', image: '/products/front_page_service_products/jhula_polish.webp' },
      { id: 'jhula-2seater', name: '2 Seater Jhula', price: 2799, rating: 4.8, reviewCount: 765, estimatedTime: '4 hrs', image: '/products/front_page_service_products/jhula_polish.webp' },
      { id: 'jhula-3seater', name: '3 Seater Jhula', price: 3449, rating: 4.9, reviewCount: 345, estimatedTime: '5 hrs', image: '/products/front_page_service_products/jhula_polish.webp' }
    ],
    selectedOption: -1,
    priceIncludes: ['Material & labour cost (Hand Polish)', 'Premium polish brand', 'Post-service cleaning', '6 months warranty', 'Machine Polish: Extra ₹1,749/-'],
    materials: ['/assets/select-wood-polish-shade.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Consultation & Booking', description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Surface Preparation', description: 'Our professionals clean and sand the jhula surface to remove old polish and scratches.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Polish Shade Selection', description: 'Choose from clear or colored finishes that match your jhula and home décor.', image: '/assets/select-wood-polish-shade.webp' },
      { step: 4, title: 'Gap Filling & Polish Application', description: 'We fill any gaps or cracks, then apply premium quality polish evenly.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 5, title: 'Drying & Finishing', description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.', image: '/assets/drying-finishing.webp' },
      { step: 6, title: 'Quality Check & Handover', description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed jhula.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'How long does jhula polishing take?', answer: 'Typically 4 hours.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  },
  {
    id: 'tv-unit-polish',
    name: 'TV Unit Polish',
    category: 'furniture-polish',
    rating: 4.8,
    reviewCount: 1123,
    duration: '~4 hrs',
    features: ['6 Months Polished Warranty', 'Choice of clear or coloured finishes', 'All Materials & Labour Cost'],
    image: '/products/front_page_service_products/tv_polish.webp',
    options: [
      { id: 'tv-small', name: 'Small', price: 2899, rating: 4.8, reviewCount: 345, estimatedTime: '3 hrs', image: '/products/front_page_service_products/tv_polish.webp' },
      { id: 'tv-medium', name: 'Medium', price: 3899, rating: 4.9, reviewCount: 567, estimatedTime: '4 hrs', image: '/products/front_page_service_products/tv_polish.webp' },
      { id: 'tv-large', name: 'Large', price: 4899, rating: 4.8, reviewCount: 211, estimatedTime: '5 hrs', image: '/products/front_page_service_products/tv_polish.webp' }
    ],
    selectedOption: -1,
    priceIncludes: ['Material & labour cost (Hand Polish)', 'Premium polish brand', 'Post-service cleaning', '6 months warranty', 'Machine Polish: Extra ₹1,749/-'],
    materials: ['/assets/select-wood-polish-shade.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Consultation & Booking', description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Surface Preparation', description: 'Our professionals clean and sand the TV unit surface to remove old polish and scratches.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Polish Shade Selection', description: 'Choose from clear or colored finishes that match your furniture and home décor.', image: '/assets/select-wood-polish-shade.webp' },
      { step: 4, title: 'Gap Filling & Polish Application', description: 'We fill any gaps or cracks, then apply premium quality polish evenly.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 5, title: 'Drying & Finishing', description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.', image: '/assets/drying-finishing.webp' },
      { step: 6, title: 'Quality Check & Handover', description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed TV unit.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'How long does TV unit polishing take?', answer: 'Typically 3-5 hours depending on size.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  },
  {
    id: 'floor-polishing',
    name: 'Floor Polishing',
    category: 'floor-polish',
    rating: 4.9,
    reviewCount: 2345,
    duration: 'Varies by area',
    features: ['Professional floor polishing service', 'Restores shine and protects wooden floors', 'Eco-friendly polishing materials', 'Hand Polish: ₹80/sqft | Machine Polish: ₹96/sqft'],
    image: '/products/FloorPoshining/darkBrownLamination.webp',
    options: [
      { id: 'floor-hand', name: 'Hand Polish (per sqft)', price: 80, rating: 4.9, reviewCount: 1234, estimatedTime: 'Varies', image: '/products/FloorPoshining/lamination_polishing.webp' },
      { id: 'floor-machine', name: 'Machine Polish (per sqft)', price: 96, rating: 4.9, reviewCount: 1111, estimatedTime: 'Varies', image: '/products/FloorPoshining/darkBrownMachinePolish.webp' }
    ],
    selectedOption: -1,
    priceIncludes: ['Material & labour cost', 'Premium polish brand', 'Post-service cleaning', 'Floor protection'],
    materials: ['/assets/select-wood-polish-shade.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Consultation & Booking', description: 'Book your service online or via WhatsApp. Our team will confirm your appointment.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Surface Preparation', description: 'Our professionals clean and prepare the floor surface thoroughly.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Polish Shade Selection', description: 'Choose from clear or colored finishes that match your interior décor.', image: '/assets/select-wood-polish-shade.webp' },
      { step: 4, title: 'Gap Filling & Polish Application', description: 'We fill any gaps or cracks, then apply premium quality polish evenly.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 5, title: 'Drying & Finishing', description: 'Allow proper drying time and apply finishing coats for a smooth, glossy finish.', image: '/assets/drying-finishing.webp' },
      { step: 6, title: 'Quality Check & Handover', description: 'Final inspection to ensure perfect finish. We clean up and hand over your refreshed floor.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'How long does floor polishing take?', answer: 'Depends on the area size.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  },


  // IKEA Furniture Assembly Services
  {
    id: 'ikea-bed-assembly',
    name: 'Bed Assembly',
    category: 'ikea-assembly',
    tabCategory: 'ikea' as ServiceCategory,
    rating: 4.85,
    reviewCount: 3456,
    duration: '~2 hrs',
    features: ['Professional assembly', 'All tools provided', '60 days warranty'],
    image: '/products/front_page_service_products/bed_polish.webp',
    options: [
      { id: 'ikea-single-bed', name: 'Single bed assembly', price: 1449, rating: 4.85, reviewCount: 3000, estimatedTime: '2 hrs', image: '/products/front_page_service_products/bed_polish.webp' },
      { id: 'ikea-double-bed', name: 'Double bed assembly', price: 1599, rating: 4.87, reviewCount: 13000, estimatedTime: '2 hrs', image: '/products/front_page_service_products/bed_polish.webp' },
      { id: 'ikea-hydraulic-bed', name: 'Hydraulic bed assembly', price: 2299, rating: 4.86, reviewCount: 3000, estimatedTime: '2.5 hrs', image: '/products/front_page_service_products/bed_polish.webp' },
      { id: 'ikea-daydiwan-bed', name: 'Day/diwan bed assembly', price: 1549, rating: 4.80, reviewCount: 392, estimatedTime: '2 hrs', image: '/products/front_page_service_products/bed_polish.webp' },
      { id: 'ikea-loft-bed', name: 'Loft/bunk bed assembly', price: 1929, rating: 4.80, reviewCount: 553, estimatedTime: '2.5 hrs', image: '/products/front_page_service_products/bed_polish.webp' }
    ],
    selectedOption: -1,
    priceIncludes: ['Professional assembly', 'All tools & hardware', 'Post-assembly cleaning', '60 days warranty'],
    materials: ['/assets/consultation-booking.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Booking', description: 'Book your assembly service online or via WhatsApp.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Professional arrives', description: 'Our trained professional arrives with all necessary tools.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Assembly', description: 'Expert assembly of your furniture following manufacturer guidelines.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 4, title: 'Quality check', description: 'Thorough inspection to ensure stability and proper assembly.', image: '/assets/drying-finishing.webp' },
      { step: 5, title: 'Cleanup & handover', description: 'We clean up packaging and hand over your assembled furniture.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'Do I need to provide tools?', answer: 'No, our professionals bring all necessary tools and equipment.' },
      { question: 'How long does assembly take?', answer: 'Most bed assemblies take 2-2.5 hours depending on complexity.' },
      { question: 'Is there a warranty?', answer: 'Yes, we provide 60 days warranty on all assembly services.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  },
  {
    id: 'ikea-wardrobe-assembly',
    name: 'Wardrobe Assembly',
    category: 'ikea-assembly',
    tabCategory: 'ikea' as ServiceCategory,
    rating: 4.82,
    reviewCount: 2500,
    duration: '~2.5 hrs',
    features: ['Professional assembly', 'All tools provided', '60 days warranty'],
    image: '/products/front_page_service_products/wardrobe_polish.webp',
    options: [
      { id: 'ikea-single-wardrobe', name: 'Single door wardrobe assembly', price: 1599, rating: 4.84, reviewCount: 824, estimatedTime: '2 hrs', image: '/products/front_page_service_products/wardrobe_polish.webp' },
      { id: 'ikea-double-wardrobe', name: 'Double door wardrobe assembly', price: 1849, rating: 4.81, reviewCount: 2000, estimatedTime: '2 hrs', image: '/products/front_page_service_products/wardrobe_polish.webp' },
      { id: 'ikea-three-wardrobe', name: 'Three door wardrobe assembly', price: 1949, rating: 4.78, reviewCount: 3000, estimatedTime: '2.5 hrs', image: '/products/front_page_service_products/wardrobe_polish.webp' },
      { id: 'ikea-four-wardrobe', name: 'Four door wardrobe assembly', price: 2049, rating: 4.79, reviewCount: 2000, estimatedTime: '3 hrs', image: '/products/front_page_service_products/wardrobe_polish.webp' },
      { id: 'ikea-sliding-wardrobe', name: 'Sliding door wardrobe assembly', price: 1799, rating: 4.79, reviewCount: 832, estimatedTime: '3.5 hrs', image: '/products/front_page_service_products/wardrobe_polish.webp' }
    ],
    selectedOption: -1,
    priceIncludes: ['Professional assembly', 'All tools & hardware', 'Post-assembly cleaning', '60 days warranty'],
    materials: ['/assets/consultation-booking.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Booking', description: 'Book your assembly service online or via WhatsApp.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Professional arrives', description: 'Our trained professional arrives with all necessary tools.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Assembly', description: 'Expert assembly of your wardrobe following manufacturer guidelines.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 4, title: 'Quality check', description: 'Thorough inspection to ensure stability and proper assembly.', image: '/assets/drying-finishing.webp' },
      { step: 5, title: 'Cleanup & handover', description: 'We clean up packaging and hand over your assembled wardrobe.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'Do I need to provide tools?', answer: 'No, our professionals bring all necessary tools and equipment.' },
      { question: 'How long does assembly take?', answer: 'Wardrobe assembly takes 2-3.5 hours depending on size and type.' },
      { question: 'Is there a warranty?', answer: 'Yes, we provide 60 days warranty on all assembly services.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  },
  {
    id: 'ikea-dining-assembly',
    name: 'Dining & Kitchen Assembly',
    category: 'ikea-assembly',
    tabCategory: 'ikea' as ServiceCategory,
    rating: 4.86,
    reviewCount: 1800,
    duration: '~1.5 hrs',
    features: ['Professional assembly', 'All tools provided', '60 days warranty'],
    image: '/products/front_page_service_products/dining_set_polish.webp',
    options: [
      { id: 'ikea-dining-table', name: 'Wooden dining table assembly', price: 1349, rating: 4.85, reviewCount: 1000, estimatedTime: '1.5 hrs', image: '/products/front_page_service_products/dining_set_polish.webp' },
      { id: 'ikea-extendable-table', name: 'Extendable dining table assembly', price: 1499, rating: 4.73, reviewCount: 183, estimatedTime: '2 hrs', image: '/products/front_page_service_products/dining_set_polish.webp' },
      { id: 'ikea-dining-chair', name: 'Dining chair assembly', price: 1199, rating: 4.86, reviewCount: 719, estimatedTime: '30 mins', image: '/products/front_page_service_products/dining_set_polish.webp' },
      { id: 'ikea-dining-set', name: 'Dining table with chair assembly', price: 1699, rating: 4.89, reviewCount: 751, estimatedTime: '2 hrs', image: '/products/front_page_service_products/dining_set_polish.webp' },
      { id: 'ikea-utensil-rack', name: 'Utensil rack assembly', price: 1269, rating: 4.82, reviewCount: 1000, estimatedTime: '30 mins', image: '/products/front_page_service_products/crokery_polish.webp' },
      { id: 'ikea-bar-trolley', name: 'Bar trolley assembly', price: 1699, rating: 4.85, reviewCount: 36, estimatedTime: '1.5 hrs', image: '/products/front_page_service_products/dining_set_polish.webp' },
      { id: 'ikea-bar-cabinet', name: 'Bar cabinet assembly', price: 1449, rating: 4.83, reviewCount: 112, estimatedTime: '1 hr', image: '/products/front_page_service_products/crokery_polish.webp' },
      { id: 'ikea-bar-stool', name: 'Bar stool assembly', price: 1399, rating: 4.83, reviewCount: 66, estimatedTime: '1 hr', image: '/products/front_page_service_products/dining_set_polish.webp' },
      { id: 'ikea-bar-table', name: 'Bar table assembly', price: 1699, rating: 4.88, reviewCount: 26, estimatedTime: '1.5 hrs', image: '/products/front_page_service_products/table_polish.webp' },
      { id: 'ikea-bar-set', name: 'Bar table set assembly', price: 2099, rating: 4.88, reviewCount: 26, estimatedTime: '2 hrs', image: '/products/front_page_service_products/dining_set_polish.webp' }
    ],
    selectedOption: -1,
    priceIncludes: ['Professional assembly', 'All tools & hardware', 'Post-assembly cleaning', '60 days warranty'],
    materials: ['/assets/consultation-booking.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Booking', description: 'Book your assembly service online or via WhatsApp.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Professional arrives', description: 'Our trained professional arrives with all necessary tools.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Assembly', description: 'Expert assembly following manufacturer guidelines.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 4, title: 'Quality check', description: 'Thorough inspection to ensure stability.', image: '/assets/drying-finishing.webp' },
      { step: 5, title: 'Cleanup & handover', description: 'We clean up and hand over your assembled furniture.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'Do I need to provide tools?', answer: 'No, our professionals bring all necessary tools and equipment.' },
      { question: 'How long does assembly take?', answer: 'Assembly time varies from 30 mins to 2 hours depending on the item.' },
      { question: 'Is there a warranty?', answer: 'Yes, we provide 60 days warranty on all assembly services.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  },
  {
    id: 'ikea-tables-chairs-assembly',
    name: 'Tables & Chairs Assembly',
    category: 'ikea-assembly',
    tabCategory: 'ikea' as ServiceCategory,
    rating: 4.88,
    reviewCount: 1500,
    duration: '~1.5 hrs',
    features: ['Professional assembly', 'All tools provided', '60 days warranty'],
    image: '/assets/Study-table-polish.webp',
    options: [
      { id: 'ikea-study-table', name: 'Study table assembly', price: 1449, rating: 4.90, reviewCount: 7000, estimatedTime: '1.5 hrs' },
      { id: 'ikea-standing-table', name: 'Standing table assembly', price: 1999, rating: 4.86, reviewCount: 704, estimatedTime: '2.5 hrs' },
      { id: 'ikea-coffee-table', name: 'Coffee table assembly', price: 1269, rating: 4.88, reviewCount: 2000, estimatedTime: '1 hr' },
      { id: 'ikea-side-table', name: 'Side table assembly', price: 1199, rating: 4.85, reviewCount: 2000, estimatedTime: '1 hr' }
    ],
    selectedOption: -1,
    priceIncludes: ['Professional assembly', 'All tools & hardware', 'Post-assembly cleaning', '60 days warranty'],
    materials: ['/assets/consultation-booking.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Booking', description: 'Book your assembly service online or via WhatsApp.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Professional arrives', description: 'Our trained professional arrives with all necessary tools.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Assembly', description: 'Expert assembly following manufacturer guidelines.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 4, title: 'Quality check', description: 'Thorough inspection to ensure stability.', image: '/assets/drying-finishing.webp' },
      { step: 5, title: 'Cleanup & handover', description: 'We clean up and hand over your assembled furniture.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'Do I need to provide tools?', answer: 'No, our professionals bring all necessary tools and equipment.' },
      { question: 'How long does assembly take?', answer: 'Assembly time varies from 1 to 2.5 hours depending on the item.' },
      { question: 'Is there a warranty?', answer: 'Yes, we provide 60 days warranty on all assembly services.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  },
  {
    id: 'ikea-living-tv-assembly',
    name: 'Living & TV Assembly',
    category: 'ikea-assembly',
    tabCategory: 'ikea' as ServiceCategory,
    rating: 4.82,
    reviewCount: 1800,
    duration: '~1.5 hrs',
    features: ['Professional assembly', 'All tools provided', '60 days warranty'],
    image: '/assets/sofa-polish.webp',
    options: [
      { id: 'ikea-sofa', name: 'Sofa assembly', price: 1449, rating: 4.87, reviewCount: 1000, estimatedTime: '1.5 hrs' },
      { id: 'ikea-chaise-lounger', name: 'Chaise lounger assembly', price: 1449, rating: 4.68, reviewCount: 44, estimatedTime: '1 hr 15 mins' },
      { id: 'ikea-corner-sofa', name: 'Corner sofa assembly', price: 1599, rating: 4.80, reviewCount: 166, estimatedTime: '2 hrs' },
      { id: 'ikea-sofa-cum-bed', name: 'Sofa cum bed assembly', price: 1549, rating: 4.87, reviewCount: 802, estimatedTime: '1.5 hrs' },
      { id: 'ikea-recliner', name: 'Recliner assembly', price: 1399, rating: 4.78, reviewCount: 557, estimatedTime: '1 hr' },
      { id: 'ikea-tv-bench', name: 'TV bench assembly', price: 1449, rating: 4.86, reviewCount: 2000, estimatedTime: '1.5 hrs' }
    ],
    selectedOption: -1,
    priceIncludes: ['Professional assembly', 'All tools & hardware', 'Post-assembly cleaning', '60 days warranty'],
    materials: ['/assets/consultation-booking.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Booking', description: 'Book your assembly service online or via WhatsApp.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Professional arrives', description: 'Our trained professional arrives with all necessary tools.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Assembly', description: 'Expert assembly following manufacturer guidelines.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 4, title: 'Quality check', description: 'Thorough inspection to ensure stability.', image: '/assets/drying-finishing.webp' },
      { step: 5, title: 'Cleanup & handover', description: 'We clean up and hand over your assembled furniture.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'Do I need to provide tools?', answer: 'No, our professionals bring all necessary tools and equipment.' },
      { question: 'How long does assembly take?', answer: 'Assembly time varies from 1 to 2 hours depending on the item.' },
      { question: 'Is there a warranty?', answer: 'Yes, we provide 60 days warranty on all assembly services.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  },
  {
    id: 'ikea-chairs-assembly',
    name: 'Chairs & Seating Assembly',
    category: 'ikea-assembly',
    tabCategory: 'ikea' as ServiceCategory,
    rating: 4.84,
    reviewCount: 1500,
    duration: '~45 mins',
    features: ['Professional assembly', 'All tools provided', '60 days warranty'],
    image: '/assets/Study-table-polish.webp',
    options: [
      { id: 'ikea-stool', name: 'Stool assembly', price: 1179, rating: 4.92, reviewCount: 213, estimatedTime: '30 mins' },
      { id: 'ikea-bench', name: 'Bench assembly', price: 1249, rating: 4.81, reviewCount: 271, estimatedTime: '45 mins' },
      { id: 'ikea-office-chair', name: 'Office chair assembly', price: 1249, rating: 4.85, reviewCount: 6000, estimatedTime: '45 mins' },
      { id: 'ikea-gaming-chair', name: 'Gaming chair assembly', price: 1799, rating: 4.84, reviewCount: 596, estimatedTime: '1 hr' },
      { id: 'ikea-chair', name: 'Chair assembly', price: 1249, rating: 4.83, reviewCount: 693, estimatedTime: '45 mins' },
      { id: 'ikea-wheels-fitting', name: 'Table/chair wheels fitting', price: 1199, rating: 4.78, reviewCount: 1000, estimatedTime: '30 mins' }
    ],
    selectedOption: -1,
    priceIncludes: ['Professional assembly', 'All tools & hardware', 'Post-assembly cleaning', '60 days warranty'],
    materials: ['/assets/consultation-booking.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Booking', description: 'Book your assembly service online or via WhatsApp.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Professional arrives', description: 'Our trained professional arrives with all necessary tools.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Assembly', description: 'Expert assembly following manufacturer guidelines.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 4, title: 'Quality check', description: 'Thorough inspection to ensure stability.', image: '/assets/drying-finishing.webp' },
      { step: 5, title: 'Cleanup & handover', description: 'We clean up and hand over your assembled furniture.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'Do I need to provide tools?', answer: 'No, our professionals bring all necessary tools and equipment.' },
      { question: 'How long does assembly take?', answer: 'Assembly time varies from 30 mins to 1 hour depending on the item.' },
      { question: 'Is there a warranty?', answer: 'Yes, we provide 60 days warranty on all assembly services.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  },
  {
    id: 'ikea-children-assembly',
    name: 'Children Furniture Assembly',
    category: 'ikea-assembly',
    tabCategory: 'ikea' as ServiceCategory,
    rating: 4.86,
    reviewCount: 800,
    duration: '~1 hr',
    features: ['Professional assembly', 'All tools provided', '60 days warranty'],
    image: '/assets/Bed-polish.webp',
    options: [
      { id: 'ikea-changing-table', name: 'Changing table assembly', price: 1299, rating: 4.84, reviewCount: 224, estimatedTime: '30 mins' },
      { id: 'ikea-cot', name: 'Cot assembly', price: 1399, rating: 4.84, reviewCount: 1000, estimatedTime: '30 mins' },
      { id: 'ikea-high-chair', name: 'High chair assembly', price: 1279, rating: 4.81, reviewCount: 121, estimatedTime: '30 mins' },
      { id: 'ikea-children-bed', name: "Children's bed assembly", price: 1449, rating: 4.90, reviewCount: 114, estimatedTime: '1 hr' },
      { id: 'ikea-children-desk', name: "Children's desk & chair assembly", price: 1729, rating: 4.87, reviewCount: 248, estimatedTime: '1.5 hrs' }
    ],
    selectedOption: -1,
    priceIncludes: ['Professional assembly', 'All tools & hardware', 'Post-assembly cleaning', '60 days warranty'],
    materials: ['/assets/consultation-booking.webp', '/assets/Cleaning & Sanding.webp'],
    processSteps: [
      { step: 1, title: 'Booking', description: 'Book your assembly service online or via WhatsApp.', image: '/assets/consultation-booking.webp' },
      { step: 2, title: 'Professional arrives', description: 'Our trained professional arrives with all necessary tools.', image: '/assets/Cleaning & Sanding.webp' },
      { step: 3, title: 'Assembly', description: 'Expert assembly following manufacturer guidelines.', image: '/assets/filling-gaps-polish-application.webp' },
      { step: 4, title: 'Quality check', description: 'Thorough inspection to ensure stability and safety.', image: '/assets/drying-finishing.webp' },
      { step: 5, title: 'Cleanup & handover', description: 'We clean up and hand over your assembled furniture.', image: '/assets/wooden furniture .webp' }
    ],
    faqs: [
      { question: 'Do I need to provide tools?', answer: 'No, our professionals bring all necessary tools and equipment.' },
      { question: 'Is it safe for children?', answer: 'Yes, we ensure all safety standards are met during assembly.' },
      { question: 'Is there a warranty?', answer: 'Yes, we provide 60 days warranty on all assembly services.' }
    ],
    trustBadges: [
      { icon: 'shield-check', text: 'Background verified professionals' },
      { icon: 'wrench', text: '300+ hours of training' }
    ]
  }
];

