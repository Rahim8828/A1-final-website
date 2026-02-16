/**
 * SEO Gap Pages Data Generator
 * Creates PageData for 50 high-priority SEO gap pages:
 * - "Near me" pages (2)
 * - Location hub pages (10)
 * - "Wooden polishing in {location}" (10)
 * - "Furniture polish in {location}" (10)
 * - "Wood polishing in {location}" (10)
 * - Standalone sofa/bed repair pages (8)
 * 
 * Generated: 2026-02-14
 */

import { PageData } from '../types';
import { locationCoordinates, businessInfo, commonProcessSteps, commonPricingFactors } from './commonPageData';

// ============================================================
// LOCATION DATA
// ============================================================

interface LocationInfo {
  name: string;
  slug: string;
  pincode: string;
  landmarks: string[];
  nearbyAreas: string[];
  zone: string;
}

const locations: Record<string, LocationInfo> = {
  thane: {
    name: 'Thane',
    slug: 'thane',
    pincode: '400601',
    landmarks: ['Viviana Mall', 'Hiranandani Estate', 'Thane Station', 'Upvan Lake', 'Korum Mall'],
    nearbyAreas: ['Ghodbunder Road', 'Majiwada', 'Naupada', 'Wagle Estate', 'Kopri', 'Panchpakhadi', 'Balkum', 'Manpada', 'Pokhran Road', 'Kasarvadavali'],
    zone: 'Central'
  },
  andheri: {
    name: 'Andheri',
    slug: 'andheri',
    pincode: '400058',
    landmarks: ['Andheri Station', 'Infiniti Mall', 'DN Nagar Metro', 'Lokhandwala Complex', 'Versova Beach'],
    nearbyAreas: ['Andheri West', 'Andheri East', 'Lokhandwala', 'Versova', 'Oshiwara', 'Four Bungalows', 'DN Nagar', 'Marol', 'SEEPZ', 'MIDC'],
    zone: 'Western'
  },
  bandra: {
    name: 'Bandra',
    slug: 'bandra',
    pincode: '400050',
    landmarks: ['Bandra Station', 'Linking Road', 'Hill Road', 'Bandstand', 'Mount Mary Church'],
    nearbyAreas: ['Bandra West', 'Bandra East', 'Pali Hill', 'Reclamation', 'Khar', 'Carter Road', 'Chapel Road', 'Turner Road', 'Waterfield Road', 'BKC'],
    zone: 'Western'
  },
  malad: {
    name: 'Malad',
    slug: 'malad',
    pincode: '400064',
    landmarks: ['Inorbit Mall', 'Malad Station', 'Mindspace', 'Marve Road', 'Evershine Nagar'],
    nearbyAreas: ['Malad West', 'Malad East', 'Evershine Nagar', 'Orlem', 'Kurar Village', 'Dattapada Road', 'Liberty Garden', 'Jankalyan Nagar', 'Pushpa Park', 'Chincholi'],
    zone: 'Western'
  },
  mulund: {
    name: 'Mulund',
    slug: 'mulund',
    pincode: '400080',
    landmarks: ['Mulund Station', 'R-Mall', 'Nirmal Lifestyle', 'Johnson & Johnson', 'Sanjay Gandhi National Park'],
    nearbyAreas: ['Mulund West', 'Mulund East', 'Nahur', 'Mulund Colony', 'Gavanpada', 'Panch Rasta', 'Zaver Road', 'M.G. Road', 'LBS Marg', 'Airoli'],
    zone: 'Central'
  },
  kandivali: {
    name: 'Kandivali',
    slug: 'kandivali',
    pincode: '400067',
    landmarks: ['Kandivali Station', 'Raghuleela Mall', 'Mahavir Nagar', 'Poisar', 'Thakur Village'],
    nearbyAreas: ['Kandivali West', 'Kandivali East', 'Thakur Village', 'Mahavir Nagar', 'Poisar', 'Charkop', 'Samata Nagar', 'Akurli Road', 'Damu Nagar', 'Lokhandwala Township'],
    zone: 'Western'
  },
  borivali: {
    name: 'Borivali',
    slug: 'borivali',
    pincode: '400066',
    landmarks: ['Borivali Station', 'Sanjay Gandhi National Park', 'IC Colony', 'Gorai Beach', 'Mandapeshwar Caves'],
    nearbyAreas: ['Borivali West', 'Borivali East', 'IC Colony', 'LT Road', 'Rajendra Nagar', 'Shimpoli', 'Gorai', 'Mandapeshwar', 'Vazira Nagar', 'Eksar'],
    zone: 'Western'
  },
  jogeshwari: {
    name: 'Jogeshwari',
    slug: 'jogeshwari',
    pincode: '400060',
    landmarks: ['Jogeshwari Station', 'Jogeshwari Caves', 'Oshiwara', 'Patel Estate', 'Western Express Highway'],
    nearbyAreas: ['Jogeshwari West', 'Jogeshwari East', 'Oshiwara', 'Behram Baug', 'Ram Mandir', 'Patel Estate', 'SV Road', 'Gundavali', 'JVLR', 'Meghwadi'],
    zone: 'Western'
  },
  chembur: {
    name: 'Chembur',
    slug: 'chembur',
    pincode: '400071',
    landmarks: ['Chembur Station', 'R City Mall', 'Diamond Garden', 'Sindhi Society', 'Tilak Nagar'],
    nearbyAreas: ['Chembur East', 'Chembur West', 'Tilak Nagar', 'Sindhi Society', 'Diamond Garden', 'Govandi', 'Ghatla', 'Sion-Trombay Road', 'RCF Colony', 'Basant Park'],
    zone: 'Harbour'
  },
  vileParle: {
    name: 'Vile Parle',
    slug: 'vile-parle',
    pincode: '400056',
    landmarks: ['Vile Parle Station', 'Airport', 'Parle Tilak Vidyalaya', 'Irla', 'Hanuman Road'],
    nearbyAreas: ['Vile Parle West', 'Vile Parle East', 'Irla', 'Nehru Road', 'Hanuman Road', 'Dixit Road', 'Parle Point', 'Airport Road', 'NS Road', 'Navpada'],
    zone: 'Western'
  },
  goregaon: {
    name: 'Goregaon',
    slug: 'goregaon',
    pincode: '400062',
    landmarks: ['Goregaon Station', 'Oberoi Mall', 'Film City', 'Hub Mall', 'Aarey Colony'],
    nearbyAreas: ['Goregaon West', 'Goregaon East', 'Oshiwara', 'Bangur Nagar', 'Film City Road', 'Jawahar Nagar', 'SV Road', 'Siddharth Nagar', 'NESCO', 'Motilal Nagar'],
    zone: 'Western'
  },
  powai: {
    name: 'Powai',
    slug: 'powai',
    pincode: '400076',
    landmarks: ['Powai Lake', 'Hiranandani Gardens', 'IIT Bombay', 'Galleria Mall', 'Central Avenue'],
    nearbyAreas: ['Hiranandani Gardens', 'IIT Area', 'Powai Plaza', 'Chandivali', 'Saki Naka', 'JVLR', 'Vikhroli', 'Kanjurmarg', 'Nahar', 'Lake Homes'],
    zone: 'Other'
  },
  dadar: {
    name: 'Dadar',
    slug: 'dadar',
    pincode: '400014',
    landmarks: ['Dadar Station', 'Shivaji Park', 'Siddhivinayak Temple', 'Plaza Cinema', 'Hindmata'],
    nearbyAreas: ['Dadar West', 'Dadar East', 'Prabhadevi', 'Shivaji Park', 'Hindmata', 'Naigaon', 'Matunga', 'Mahim', 'Wadala', 'Parel'],
    zone: 'Central'
  },
  khar: {
    name: 'Khar',
    slug: 'khar',
    pincode: '400052',
    landmarks: ['Khar Station', 'Khar Gymkhana', 'Linking Road', '16th Road', 'Pali Market'],
    nearbyAreas: ['Khar West', 'Khar East', 'Pali Hill', 'Linking Road', '16th Road', 'Khar Danda', 'Rizvi Complex', 'Carter Road', 'Bandra', 'Santacruz'],
    zone: 'Western'
  },
  juhu: {
    name: 'Juhu',
    slug: 'juhu',
    pincode: '400049',
    landmarks: ['Juhu Beach', 'ISKCON Temple', 'Prithvi Theatre', 'JW Marriott', 'Juhu Aerodrome'],
    nearbyAreas: ['Juhu Beach', 'Juhu Tara Road', 'Gulmohar Road', 'JVPD Scheme', 'Vile Parle', 'Andheri West', 'Versova', 'Santacruz West', 'Seven Bungalows', 'DN Nagar'],
    zone: 'Western'
  },
  vashi: {
    name: 'Vashi',
    slug: 'vashi',
    pincode: '400703',
    landmarks: ['Vashi Station', 'Inorbit Mall Vashi', 'APMC Market', 'Palm Beach Road', 'Vashi Bridge'],
    nearbyAreas: ['Sector 1-30', 'Sanpada', 'Turbhe', 'Kopar Khairane', 'Nerul', 'Palm Beach Road', 'CBD Belapur', 'Kharghar', 'Airoli', 'Ghansoli'],
    zone: 'Harbour'
  }
};

// ============================================================
// FAQ GENERATORS
// ============================================================

function generateNearMeFAQs(serviceType: 'furniture-polish' | 'wood-polishing'): PageData['faqs'] {
  const isFurniture = serviceType === 'furniture-polish';
  const serviceName = isFurniture ? 'furniture polish' : 'wood polishing';
  const serviceNameCap = isFurniture ? 'Furniture Polish' : 'Wood Polishing';

  return [
    {
      question: `How do I find the best ${serviceName} service near me?`,
      answer: `A1 Furniture Polish serves all areas across Mumbai, Thane, and Navi Mumbai. Simply call us at +91-9819519345 or WhatsApp at +91-8828709945 with your location. We'll connect you with our nearest service team within minutes. Our craftsmen are stationed across Mumbai zones for fast response.`
    },
    {
      question: `What is the cost of ${serviceName} near me?`,
      answer: `${serviceNameCap} costs vary by furniture size, polish type, and condition. Starting prices: Chair - ₹299, Dining Table - ₹1,499, Wardrobe - ₹2,499, Bed - ₹1,999. We offer free on-site estimation. No hidden charges, transparent pricing with written quotes before starting work.`
    },
    {
      question: `Do you offer same-day ${serviceName} service?`,
      answer: `Yes! We provide same-day and next-day ${serviceName} service across Mumbai. For urgent requirements, call us before 12 PM for same-day scheduling. Our teams are pre-positioned across Western, Central, and Harbour lines for fastest possible service delivery.`
    },
    {
      question: `Which areas in Mumbai do you serve for ${serviceName}?`,
      answer: `We serve all Mumbai areas: Andheri, Bandra, Goregaon, Malad, Borivali, Thane, Powai, Dadar, Mulund, Kandivali, Jogeshwari, Chembur, Vile Parle, Juhu, Khar, Santacruz, Ghatkopar, Kurla, Navi Mumbai, Vashi, and 30+ more locations. Wherever you are, we reach you.`
    },
    {
      question: `What types of ${serviceName} do you offer?`,
      answer: `We offer PU Polish (Gloss & Matt), Melamine Polish, Duco Paint Polish, Natural Wood Polish, Teak Oil Finish, French Polish, Lacquer Finish, and Antique Restoration Polish. Our experts recommend the best finish based on your furniture type, usage, and Mumbai's humid climate.`
    },
    {
      question: `How long does ${serviceName} take to complete?`,
      answer: `Single furniture piece: 1-2 days. Full room set: 3-5 days. The timeline includes surface preparation, repair, multiple polish coats with proper drying time, and quality inspection. We provide exact timelines during free consultation.`
    },
    {
      question: `Is your ${serviceName} service safe for children and pets?`,
      answer: `Absolutely. We use low-VOC and eco-friendly polish materials that are safe for homes with children and pets. After proper curing time (24-48 hours), the polished surfaces are completely safe. We advise on ventilation and safe re-entry time for each project.`
    },
    {
      question: `Do you provide a warranty on ${serviceName} work?`,
      answer: `Yes, we provide 1-3 year warranty depending on the polish type chosen. PU Polish carries the longest warranty. Our warranty covers peeling, bubbling, and color fading under normal usage conditions. We also offer annual maintenance packages.`
    },
    {
      question: `Can you match the existing polish color of my furniture?`,
      answer: `Yes, our master craftsmen specialize in color matching. We can replicate any existing wood tone or create custom shades. We bring color sample cards during consultation and can mix custom tints on-site to achieve perfect matches with your existing furniture.`
    },
    {
      question: `What should I do to prepare furniture for polishing?`,
      answer: `Simply clear the furniture of personal items. Our team handles everything else — dust removal, old polish stripping, surface preparation, and cleanup. We cover surrounding areas with protective sheets. After completion, we clean up the workspace completely.`
    }
  ];
}

function generateLocationHubFAQs(loc: LocationInfo): PageData['faqs'] {
  return [
    {
      question: `What furniture polish services are available in ${loc.name}?`,
      answer: `In ${loc.name}, we offer complete furniture polishing including PU Polish (Gloss & Matt), Melamine Polish, Duco Paint, Teak Wood Polish, Door Polish, Wardrobe Polish, Dining Table Polish, Bed Polish, Antique Restoration, and Wooden Floor Polishing. All services available at doorstep in ${loc.nearbyAreas.slice(0, 5).join(', ')}.`
    },
    {
      question: `How much does furniture polishing cost in ${loc.name}?`,
      answer: `Furniture polishing in ${loc.name} starts at ₹299 for small items. Chair polishing: ₹299-₹999, Dining Table: ₹1,499-₹3,999, Wardrobe: ₹2,499-₹5,499, Bed: ₹1,999-₹4,999. Price depends on size, polish type, and furniture condition. Free on-site estimation available.`
    },
    {
      question: `Do you provide home service for furniture polish in ${loc.name}?`,
      answer: `Yes! All our furniture polishing services in ${loc.name} are doorstep services. Our skilled craftsmen come to your home with all necessary materials and equipment. We serve ${loc.nearbyAreas.join(', ')} and surrounding areas. Book via call or WhatsApp.`
    },
    {
      question: `How long does furniture polishing take in ${loc.name}?`,
      answer: `For a single furniture piece in ${loc.name}: 1-2 days. Complete room set: 3-5 days. Full home renovation polish: 7-14 days. Time includes preparation, multiple coats with drying, and quality check. We work efficiently to minimize disruption to your daily routine.`
    },
    {
      question: `Which areas near ${loc.name} do you cover?`,
      answer: `From our ${loc.name} service zone, we cover ${loc.nearbyAreas.join(', ')}. Our teams are familiar with all ${loc.name} localities including near ${loc.landmarks.join(', ')}. Fast response times guaranteed across all these areas.`
    },
    {
      question: `Can you repair damaged furniture before polishing in ${loc.name}?`,
      answer: `Yes, we provide complete furniture repair and restoration before polishing. This includes fixing scratches, dents, broken joints, termite damage, water stains, and structural issues. Many ${loc.name} customers use our combined repair + polish service for best results.`
    },
    {
      question: `What is the best polish type for ${loc.name}'s climate?`,
      answer: `Given Mumbai's humid climate, we recommend PU (Polyurethane) Polish for most furniture in ${loc.name}. It's highly moisture-resistant and durable. For traditional furniture, Melamine Polish works well. For premium pieces, Italian PU Gloss gives the best finish. Our experts advise the ideal choice during consultation.`
    },
    {
      question: `Do you offer emergency furniture polishing in ${loc.name}?`,
      answer: `Yes, we offer urgent and same-day furniture polishing services in ${loc.name} for special occasions, pre-festival requirements, or unexpected guest arrivals. Call us before noon for same-day service availability. Extra charges may apply for rush jobs.`
    },
    {
      question: `How do I book furniture polish service in ${loc.name}?`,
      answer: `Booking is easy! Call +91-9819519345, WhatsApp +91-8828709945, or fill our online form. Share your ${loc.name} address, furniture details, and preferred date. We'll send our expert for free assessment within 24 hours. No advance payment needed.`
    },
    {
      question: `Why choose A1 Furniture Polish in ${loc.name}?`,
      answer: `A1 Furniture Polish is ${loc.name}'s most trusted polishing service with 15+ years experience, 500+ happy customers, 4.9★ Google rating, transparent pricing, and satisfaction guarantee. We use premium materials, skilled craftsmen, and offer warranty on all work.`
    }
  ];
}

function generateWoodenPolishingFAQs(loc: LocationInfo): PageData['faqs'] {
  return [
    {
      question: `What is the cost of wooden polishing in ${loc.name}?`,
      answer: `Wooden polishing in ${loc.name} starts from ₹35/sq.ft. Door polishing: ₹800-₹2,500, Window frames: ₹500-₹1,500, Wooden partition: ₹1,500-₹4,000. Price depends on wood type, area size, and finish quality. Get free on-site quotation in ${loc.name}.`
    },
    {
      question: `Which wood types can you polish in ${loc.name}?`,
      answer: `We polish all wood types in ${loc.name}: Teak, Sal, Sheesham (Rosewood), Mango Wood, Rubber Wood, Pine, Oak, Walnut, Mahogany, Sagwan, Ply with veneer, MDF, and Particle Board. Each wood gets specialized treatment for best results.`
    },
    {
      question: `How is wooden polishing different from furniture polishing?`,
      answer: `Wooden polishing covers all wood surfaces — doors, windows, staircases, railings, wooden flooring, wall panels, and ceiling beams, in addition to furniture. Furniture polishing focuses on movable items like tables, chairs, beds, and wardrobes. We offer both services in ${loc.name}.`
    },
    {
      question: `What finish options are available for wooden polishing in ${loc.name}?`,
      answer: `We offer Glossy (mirror shine), Matt (satin smooth), Semi-Gloss (balanced sheen), Natural (preserves wood grain), Rustic (aged look), and Custom tints in any shade. PU, Melamine, and Duco finishes available. Our ${loc.name} experts recommend the best option during consultation.`
    },
    {
      question: `Can you polish old wooden doors and windows in ${loc.name}?`,
      answer: `Absolutely! We specialize in restoring old wooden doors and windows in ${loc.name}. Service includes stripping old paint/polish, repairing wood damage, sanding smooth, and applying fresh polish. We can match existing interiors or create a completely new look.`
    },
    {
      question: `How long does wooden polishing last in Mumbai's humidity?`,
      answer: `With PU Polish, wooden surfaces last 5-7 years in ${loc.name}'s climate. Melamine lasts 3-5 years. We use moisture-resistant formulations specifically suited for Mumbai's humidity. Annual maintenance coating can extend the life further. Warranty included on all work.`
    },
    {
      question: `Do you polish wooden flooring in ${loc.name}?`,
      answer: `Yes! We provide complete wooden floor polishing in ${loc.name} including sanding, gap filling, staining, and multiple polish coats. We handle teak flooring, engineered wood, parquet, and hardwood floors. Machine sanding ensures perfectly smooth results.`
    },
    {
      question: `Is wooden polishing messy? How do you protect the house?`,
      answer: `We take full precautions in ${loc.name} homes. All surrounding furniture and floors are covered with protective sheets. We use dust-collection equipment during sanding. After work, complete cleanup is done. Most customers are surprised by how clean we leave the space.`
    },
    {
      question: `Can I stay at home during wooden polishing work in ${loc.name}?`,
      answer: `Yes, you can stay home during the work. We work room-by-room to minimize disruption. For full-home projects, we plan the sequence so you always have usable living space. We recommend good ventilation during polish application and drying.`
    },
    {
      question: `How quickly can you start wooden polishing work in ${loc.name}?`,
      answer: `We can typically start within 24-48 hours of booking in ${loc.name}. For urgent requirements near ${loc.landmarks[0]} or ${loc.landmarks[1]} areas, same-day consultation is often possible. Call +91-9819519345 to check immediate availability.`
    }
  ];
}

function generateFurniturePolishInFAQs(loc: LocationInfo): PageData['faqs'] {
  return [
    {
      question: `What is the starting price for furniture polish in ${loc.name}?`,
      answer: `Furniture polish in ${loc.name} starting prices: Single Chair ₹299, Center Table ₹799, Dining Table (4-seater) ₹1,499, Double Bed ₹1,999, 2-Door Wardrobe ₹2,499. We offer package deals for multiple items. Free assessment and no hidden charges.`
    },
    {
      question: `Which furniture items can you polish in ${loc.name}?`,
      answer: `We polish all wooden furniture in ${loc.name}: Dining Tables, Chairs, Beds, Wardrobes, Dressing Tables, TV Units, Shoe Racks, Bookshelves, Temple/Mandir, Jhula/Swing, Sofa Frames, Office Desks, Kitchen Cabinets, Doors, and Window Frames.`
    },
    {
      question: `Do you remove old polish before applying new polish in ${loc.name}?`,
      answer: `Yes, for best results our ${loc.name} team always strips old polish before reapplication. This ensures proper adhesion, even color, and longer-lasting finish. The process includes chemical stripping or sanding, depending on existing finish type and furniture condition.`
    },
    {
      question: `What is PU polish and is it good for furniture in ${loc.name}?`,
      answer: `PU (Polyurethane) Polish is the most premium furniture finish — highly durable, moisture-resistant, scratch-resistant, and gives a factory-like finish. It's ideal for ${loc.name}'s humid climate. Available in Gloss (shiny) and Matt (smooth satin) finishes. Lasts 5-7 years with proper care.`
    },
    {
      question: `Can you polish furniture at my home in ${loc.name}?`,
      answer: `Yes, all our furniture polish services in ${loc.name} are doorstep/home services. Our craftsmen come to your location in ${loc.nearbyAreas.slice(0, 3).join(', ')} and all nearby areas with complete materials and equipment. No need to transport furniture anywhere.`
    },
    {
      question: `How many coats of polish do you apply?`,
      answer: `We apply 3-5 coats depending on the polish type. PU Polish: 1 sealer + 2-3 topcoats. Melamine: 3-4 coats. Each coat has proper drying time between applications. More coats = deeper color and stronger protection. Our ${loc.name} experts determine the ideal number during assessment.`
    },
    {
      question: `Can you change the color of my furniture with polish in ${loc.name}?`,
      answer: `Yes! We can completely change your furniture color through staining and polishing. Choose from 50+ wood tones — from light pine to dark walnut. Our ${loc.name} craftsmen bring color cards and can create custom mixed shades to match your home interiors perfectly.`
    },
    {
      question: `Is furniture polishing better than buying new furniture?`,
      answer: `Professional polishing in ${loc.name} costs 70-80% less than replacing furniture and gives a brand-new appearance. It's environmentally friendly, preserves sentimental pieces, and solid wood furniture often has better quality than new mass-produced items. Polishing is almost always the smarter choice.`
    },
    {
      question: `What precautions should I take after furniture polishing?`,
      answer: `After polishing: avoid touching surfaces for 24 hours, don't place items on polished surfaces for 48 hours, ensure good ventilation for 2-3 days, avoid water contact for a week, and use coasters/mats going forward. Our ${loc.name} team provides detailed care instructions.`
    },
    {
      question: `Do you provide a bill and warranty for furniture polish in ${loc.name}?`,
      answer: `Yes, we provide proper GST bill and warranty card for all furniture polish work in ${loc.name}. Warranty ranges from 1-3 years depending on polish type. PU Polish gets the longest warranty. We maintain customer records for warranty service and annual maintenance follow-ups.`
    }
  ];
}

function generateWoodPolishingInFAQs(loc: LocationInfo): PageData['faqs'] {
  return [
    {
      question: `How much does wood polishing cost in ${loc.name}?`,
      answer: `Wood polishing rates in ${loc.name}: Per sq.ft. from ₹35 (Melamine) to ₹75 (PU Gloss). Chair: ₹299-₹999, Table: ₹999-₹3,999, Door: ₹800-₹2,500, Wardrobe: ₹2,499-₹5,499. We provide free inspection and detailed quotes in ${loc.name}.`
    },
    {
      question: `What are the different types of wood polish available in ${loc.name}?`,
      answer: `In ${loc.name} we offer: PU (Polyurethane) Polish — most durable, factory finish; Melamine Polish — budget-friendly, good protection; Duco Paint Polish — premium, car-paint like finish; French Polish — traditional, for antiques; NC Lacquer — fast drying; Teak Oil — natural, penetrating finish.`
    },
    {
      question: `Which wood polish is best for humidity in ${loc.name}?`,
      answer: `For ${loc.name}'s humid climate (60-90% humidity), PU Polish is the best choice. It forms a hard, moisture-proof barrier that prevents wood swelling and warping. For budget options, Melamine with added moisture sealant works well. Avoid French Polish in high-humidity areas.`
    },
    {
      question: `Can you polish termite-treated wood in ${loc.name}?`,
      answer: `Yes, we regularly polish termite-treated furniture in ${loc.name}. We first ensure the anti-termite treatment has fully dried (usually 7 days after treatment). Then we proceed with surface preparation and polish application. We can also coordinate with pest control services if needed.`
    },
    {
      question: `How do you handle wood polishing for large homes in ${loc.name}?`,
      answer: `For complete home wood polishing in ${loc.name}, we deploy multiple craftsmen and work room-by-room. We create a project plan, share the timeline, and work systematically. Typically: Living room furniture first, then bedrooms, then kitchen/doors. Large projects get dedicated project managers.`
    },
    {
      question: `Is wood polishing smelly? How long does the smell last?`,
      answer: `Modern polish materials used in ${loc.name} have significantly reduced odor. PU Polish has mild smell for 24-48 hours. Water-based options are nearly odorless. We recommend ventilation during and after work. The smell completely dissipates within 3-5 days for standard polish.`
    },
    {
      question: `Can you polish wood that has water damage in ${loc.name}?`,
      answer: `Yes, we can restore water-damaged wood in ${loc.name}. The process includes: drying the wood completely, sanding off damaged areas, filling holes or warps, and applying moisture-resistant polish. For severe water damage, we may recommend partial wood replacement before polishing.`
    },
    {
      question: `What is the difference between matt and glossy wood polish?`,
      answer: `Matt Polish gives a smooth, natural wood appearance without shine — modern, elegant, subtle. Shows fewer fingerprints. Glossy Polish provides a mirror-like shiny finish — luxurious, traditional, eye-catching. Both are equally durable. Matt is trending in ${loc.name} for contemporary interiors; Glossy for classic designs.`
    },
    {
      question: `Do you provide wood polishing for commercial spaces in ${loc.name}?`,
      answer: `Yes! We serve offices, restaurants, hotels, showrooms, and retail spaces across ${loc.name}. Commercial projects include: reception desks, conference tables, wooden partitions, flooring, door frames, and decorative panels. We offer after-hours service to not disrupt your business.`
    },
    {
      question: `How often should wood polishing be done in ${loc.name}?`,
      answer: `For ${loc.name}'s climate: PU Polish lasts 5-7 years, Melamine 3-5 years. High-traffic items (dining tables, doors) may need touch-up every 2-3 years. We recommend annual inspection and maintenance polishing for best longevity. We offer annual maintenance contracts.`
    }
  ];
}

function generateRepairFAQs(type: 'sofa' | 'bed', loc: LocationInfo): PageData['faqs'] {
  const item = type === 'sofa' ? 'sofa' : 'bed';
  const itemCap = type === 'sofa' ? 'Sofa' : 'Bed';
  return [
    {
      question: `How much does ${item} repair cost in ${loc.name}?`,
      answer: `${itemCap} repair in ${loc.name} starts at ₹${type === 'sofa' ? '999' : '799'}. Minor repairs (${type === 'sofa' ? 'cushion refilling, stitching' : 'slat replacement, joint tightening'}): ₹${type === 'sofa' ? '999-₹2,499' : '799-₹1,999'}. Major repairs (${type === 'sofa' ? 'frame repair, spring replacement' : 'frame repair, headboard fix'}): ₹${type === 'sofa' ? '2,499-₹5,999' : '1,999-₹4,999'}. Free inspection in ${loc.name}.`
    },
    {
      question: `What types of ${item} repair do you offer in ${loc.name}?`,
      answer: `In ${loc.name} we handle: ${type === 'sofa' ? 'Fabric Change/Reupholstery, Cushion Refilling (foam & fiber), Spring Replacement, Frame Repair, Recliner Mechanism Fix, Leather Repair & Restoration, Sagging Sofa Fix, Arm & Leg Repair' : 'Broken Slat Replacement, Headboard Repair, Frame Reinforcement, Storage Box Fix, Hydraulic Mechanism Repair, Wood Polish/Refinish, Joint Tightening, Caster/Wheel Fix'}. All at doorstep.`
    },
    {
      question: `Do you provide ${item} repair at home in ${loc.name}?`,
      answer: `Yes, all ${item} repairs in ${loc.name} are done at your doorstep. Our skilled carpenters come to ${loc.nearbyAreas.slice(0, 5).join(', ')} and surrounding areas with complete tools and materials. No need to move heavy ${item}s anywhere.`
    },
    {
      question: `How long does ${item} repair take in ${loc.name}?`,
      answer: `Minor ${item} repairs: same day to 1 day. ${type === 'sofa' ? 'Fabric change/reupholstery: 3-5 days. Complete sofa overhaul: 5-7 days' : 'Polish & refinish: 2-3 days. Major structural repair: 3-5 days'}. For urgent needs in ${loc.name}, we offer express service at additional cost.`
    },
    {
      question: `Can you repair a ${type === 'sofa' ? 'recliner sofa' : 'hydraulic storage bed'} in ${loc.name}?`,
      answer: `Yes! We specialize in ${type === 'sofa' ? 'recliner repair including mechanism fix, motor replacement, handle repair, and leather/fabric change. We service manual and electric recliners of all brands' : 'hydraulic bed repair including gas lift replacement, piston fix, hinge repair, and box mechanism restoration. We service all brands and sizes'} in ${loc.name}.`
    },
    {
      question: `Is ${item} repair worth it vs buying new in ${loc.name}?`,
      answer: `${itemCap} repair saves 50-70% compared to buying new. Quality ${type === 'sofa' ? 'sofa frames (teak/sal wood)' : 'bed frames (solid wood)'} last decades — only the ${type === 'sofa' ? 'upholstery and cushions' : 'finish and joints'} need periodic renewal. Repair is eco-friendly, faster, and preserves quality craftsmanship that's rare in new mass-produced ${item}s.`
    },
    {
      question: `Do you combine ${item} repair with wood polishing in ${loc.name}?`,
      answer: `Absolutely! Many ${loc.name} customers opt for combined ${item} repair + wood polishing for the best results. We offer package pricing that's 10-15% cheaper than booking separately. Your ${item} gets structural repair AND a fresh polished finish, looking brand new.`
    },
    {
      question: `What brands of ${item}s can you repair in ${loc.name}?`,
      answer: `We repair all brands in ${loc.name}: ${type === 'sofa' ? 'Godrej, Durian, Usha Lexus, Featherlite, Nilkamal, IKEA, HomeTown, Urban Ladder, Pepperfry, WoodenStreet, custom-made, and imported sofas' : 'Godrej Interio, IKEA, Urban Ladder, Durian, HomeTown, Pepperfry, WoodenStreet, Nilkamal, custom carpenter-made beds, and antique/vintage beds'}. All repairs guaranteed.`
    },
    {
      question: `How do I book ${item} repair in ${loc.name}?`,
      answer: `Simple! Call +91-9819519345 or WhatsApp +91-8828709945. Send photos of your ${item} for quick assessment. Share your ${loc.name} address and we'll schedule a free home inspection within 24 hours. No advance payment — pay only after work completion and inspection.`
    },
    {
      question: `Do you provide warranty on ${item} repair in ${loc.name}?`,
      answer: `Yes! All ${item} repair work in ${loc.name} comes with warranty. ${type === 'sofa' ? 'Fabric/upholstery: 1 year, Frame repair: 2 years, Spring/cushion: 1 year' : 'Structural repair: 2 years, Polish/finish: 1-3 years, Mechanism: 6 months-1 year'}. We provide warranty card with GST bill for your records.`
    }
  ];
}

// ============================================================
// COMMON SERVICE LISTS
// ============================================================

const furniturePolishServices: PageData['services'] = [
  { name: 'Complete Furniture Polish', description: 'Comprehensive polishing for all furniture types including wardrobes, dining tables, beds, cabinets, and more. Includes cleaning, preparation, sanding, multiple polish coats, and protective finishing.' },
  { name: 'PU Polish (Gloss & Matt)', description: 'Premium polyurethane polish — the gold standard for durability. Moisture-resistant, scratch-proof, factory-like finish. Available in high-gloss mirror shine or elegant matt satin finish.' },
  { name: 'Melamine Polish', description: 'Cost-effective professional polish with excellent protection. Perfect balance of quality and affordability. Available in transparent and wood-tone variants.' },
  { name: 'Furniture Restoration', description: 'Complete restoration of old, damaged, or antique furniture. Includes structural repair, scratch removal, dent filling, color restoration, and protective polish application.' },
  { name: 'Wood Color Change', description: 'Transform your furniture with professional staining and color matching. 50+ wood tones available. Perfect for updating furniture to match new interior designs.' },
  { name: 'Protective Coating', description: 'Advanced UV-resistant and moisture-proof coating that extends furniture life by years. Ideal for furniture near windows, in kitchens, or high-humidity areas.' }
];

const woodPolishingServices: PageData['services'] = [
  { name: 'Door & Window Polish', description: 'Professional polishing for all wooden doors, window frames, and shutters. Includes old paint/polish removal, repair, and fresh finish that withstands daily use and weather.' },
  { name: 'Wooden Floor Polishing', description: 'Machine-sanded floor polishing for teak, hardwood, engineered wood, and parquet flooring. Includes gap filling, staining, and multiple coats of durable floor polish.' },
  { name: 'Staircase & Railing Polish', description: 'Expert polishing for wooden staircases, banisters, and railings. High-durability finish that handles heavy foot traffic and daily hand contact.' },
  { name: 'Wall Panel & Ceiling Polish', description: 'Professional finishing for decorative wood panels, wainscoting, ceiling beams, and wooden partitions. Enhances the beauty of your interior woodwork.' },
  { name: 'Kitchen Cabinet Polish', description: 'Heat-resistant and moisture-proof polishing for kitchen cabinets and wooden countertops. Specially formulated to withstand kitchen environments.' },
  { name: 'Complete Home Wood Polish', description: 'Full home package covering all wooden surfaces — furniture, doors, windows, floors, staircases, cabinets. Coordinated finishes throughout your home at package pricing.' }
];

const sofaRepairServices: PageData['services'] = [
  { name: 'Sofa Fabric Change', description: 'Complete sofa reupholstery with premium fabrics — Suede, Velvet, Linen, Cotton, Jute, Leather, and Rexine. 500+ fabric options with samples shown at your doorstep.' },
  { name: 'Cushion Refilling', description: 'Replace sagging cushions with High-Resilience (HR) foam, Memory Foam, or Fiber Fill. Multiple density options for perfect comfort. Includes new cushion covers if needed.' },
  { name: 'Sofa Frame Repair', description: 'Structural repair for broken, cracked, or wobbly sofa frames. Expert carpentry using quality wood. Frame reinforcement for extended durability.' },
  { name: 'Spring Replacement', description: 'Full spring system replacement — sinuous springs, pocket springs, or webbing. Eliminates sagging and restores original seating comfort and support.' },
  { name: 'Recliner Repair', description: 'Complete recliner mechanism repair — manual and electric. Handle fix, motor replacement, cable adjustment, and footrest mechanism restoration for all brands.' },
  { name: 'Leather Sofa Restoration', description: 'Professional leather cleaning, conditioning, crack repair, color restoration, and protective coating. Revive faded, cracked, or damaged leather sofas to like-new condition.' }
];

const bedRepairServices: PageData['services'] = [
  { name: 'Bed Frame Repair', description: 'Structural repair of broken, cracked, or wobbly bed frames. Includes joint reinforcement, broken slat replacement, leg repair, and complete frame tightening.' },
  { name: 'Headboard Repair & Polish', description: 'Fix damaged headboards — wood repair, upholstery fix, or complete headboard refinishing with premium polish for a fresh new look.' },
  { name: 'Hydraulic Bed Repair', description: 'Expert repair of hydraulic storage beds — gas lift replacement, piston repair, hinge fix, and storage box mechanism restoration for smooth operation.' },
  { name: 'Bed Wood Polish', description: 'Complete bed frame refinishing with PU, Melamine, or Duco polish. Includes old polish removal, wood repair, sanding, and multiple coats of premium finish.' },
  { name: 'Storage Bed Box Repair', description: 'Fix storage bed compartments — broken boards, damaged hinges, misaligned mechanisms, and sagging bottoms. Includes reinforcement for heavy-duty use.' },
  { name: 'Cot & Bunk Bed Repair', description: 'Specialized repair for baby cots, toddler beds, and bunk beds. Safety-focused repairs with child-safe materials and finishes. Rail repair and stability reinforcement.' }
];

// ============================================================
// BENEFIT/WHY CHOOSE US LISTS
// ============================================================

function generateWhyChooseUsForLocation(loc: LocationInfo): PageData['whyChooseUs'] {
  return [
    { title: `${loc.name} Local Experts`, description: `Our craftsmen are familiar with ${loc.name} and serve ${loc.nearbyAreas.slice(0, 5).join(', ')} daily. Local expertise means faster service, knowledge of ${loc.name}-specific furniture styles, and quick response for follow-ups.` },
    { title: '15+ Years Experience', description: `Over 15 years delivering premium furniture polishing across Mumbai. Thousands of satisfied customers in and around ${loc.name}. Our experience means higher quality, fewer mistakes, and efficient project completion.` },
    { title: 'Premium Materials', description: 'We use only professional-grade polish materials from trusted brands. PU Polish, Italian imports, and eco-friendly options available. Quality materials ensure long-lasting, beautiful results.' },
    { title: 'Free Home Inspection', description: `Book a free consultation where our expert visits your ${loc.name} home, inspects furniture, recommends solutions, and provides transparent written quotations. No obligation, no hidden charges.` },
    { title: 'Satisfaction Guarantee', description: `Every project in ${loc.name} comes with our satisfaction guarantee. If you're not 100% happy with the results, we'll rework at no additional cost. Your satisfaction is our business.` },
    { title: 'Flexible Scheduling', description: `Choose your preferred date and time. We work on weekdays, weekends, and holidays in ${loc.name}. Morning, afternoon, or evening slots available. We respect your schedule and complete work on time.` }
  ];
}

// ============================================================
// PAGE DATA GENERATORS
// ============================================================

function generateSchema(serviceName: string, location: string, url: string, services: PageData['services']) {
  const coords = locationCoordinates[location] || locationCoordinates['Mumbai'];
  return {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: businessInfo.name,
      image: businessInfo.logo,
      '@id': businessInfo.website,
      url: `https://www.a1furniturepolish.com${url}`,
      telephone: businessInfo.phone,
      priceRange: businessInfo.priceRange,
      address: {
        '@type': 'PostalAddress',
        streetAddress: location,
        addressLocality: location,
        addressRegion: 'Maharashtra',
        postalCode: coords === locationCoordinates['Mumbai'] ? '400001' : '400001',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: coords.lat,
        longitude: coords.lng
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: businessInfo.openingHours.days,
        opens: businessInfo.openingHours.opens,
        closes: businessInfo.openingHours.closes
      },
      sameAs: [businessInfo.socialMedia.facebook, businessInfo.socialMedia.instagram],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: businessInfo.rating,
        bestRating: '5',
        worstRating: '1',
        ratingCount: businessInfo.reviewCount
      }
    },
    service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: serviceName,
      provider: { '@type': 'LocalBusiness', name: businessInfo.name },
      areaServed: { '@type': 'City', name: location },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${serviceName} Services`,
        itemListElement: services.map(s => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name }
        }))
      }
    }
  };
}

// ============================================================
// 1. NEAR ME PAGES (2)
// ============================================================

export const furniturePolishNearMeData: PageData = {
  title: 'Furniture Polish Near Me | Best Furniture Polishing Service in Mumbai',
  metaDescription: 'Looking for furniture polish near me? A1 Furniture Polish serves all Mumbai areas — Andheri, Bandra, Thane, Goregaon, Powai, Malad & more. Call +91-9819519345 for same-day service. Free quotes!',
  h1: 'Furniture Polish Near Me – Mumbai\'s #1 Doorstep Polishing Service',
  url: '/furniture-polish-near-me',
  canonicalUrl: 'https://www.a1furniturepolish.com/furniture-polish-near-me',
  serviceCategory: 'furniture-polishing',
  serviceName: 'Furniture Polish Near Me',
  location: 'Mumbai',
  titleVariation: 'best',
  introduction: 'Searching for "furniture polish near me"? A1 Furniture Polish is Mumbai\'s most trusted doorstep furniture polishing service. With service teams across all Mumbai zones — Western Line (Andheri, Bandra, Goregaon, Malad, Borivali), Central Line (Dadar, Thane, Mulund, Ghatkopar), and Harbour Line (Chembur, Vashi, Navi Mumbai) — we\'re always near you. Our 15+ years of experience, 500+ Google reviews (4.9★), and satisfaction guarantee make us the top choice. Whether you need PU Polish, Melamine Polish, or complete furniture restoration, our expert craftsmen arrive at your doorstep with premium materials and equipment. Same-day service available for urgent requirements. No advance payment needed — pay only after work completion.',
  services: furniturePolishServices,
  process: commonProcessSteps,
  locationAreas: ['Andheri', 'Bandra', 'Goregaon', 'Malad', 'Borivali', 'Thane', 'Powai', 'Dadar', 'Mulund', 'Kandivali', 'Jogeshwari', 'Chembur', 'Vile Parle', 'Juhu', 'Khar', 'Ghatkopar', 'Kurla', 'Navi Mumbai', 'Vashi', 'Santacruz'],
  serviceAreaDescription: 'We serve every corner of Mumbai, Thane, and Navi Mumbai. Our service teams are strategically stationed across Western suburbs (Andheri to Dahisar), Central Mumbai (Dadar to Thane), and Harbour Line (Chembur to Panvel). When you search "furniture polish near me," A1 Furniture Polish is truly always around the corner. We guarantee arrival within 2-4 hours for same-day assessments.',
  pricing: { startingPrice: 299, priceRange: '₹299 - ₹6,449', factors: commonPricingFactors },
  whyChooseUs: [
    { title: 'Nearest to You — Always', description: 'With service teams across 40+ Mumbai locations, we\'re the truly "near you" option. Fastest response times in the industry. Our zone-based routing ensures the nearest available craftsman reaches you.' },
    { title: '15+ Years Trusted Service', description: 'Over 15 years of furniture polishing expertise across Mumbai. 4.9★ rating on Google with 500+ verified reviews. Our reputation is built on consistent quality and honest pricing.' },
    { title: 'Same-Day Service', description: 'Need urgent furniture polishing? Call before 12 PM and we can start the same day in most Mumbai areas. Perfect for pre-occasion, festival, or surprise guest preparations.' },
    { title: 'Transparent Pricing', description: 'Free on-site inspection and written quotes before any work begins. No hidden charges, no surprise bills. Pay only after work completion and your satisfaction. Accept cash, UPI, and bank transfer.' },
    { title: 'Premium Quality Materials', description: 'We use only professional-grade PU, Melamine, and Duco polish from trusted Italian and Indian brands. Our materials are humidity-resistant, UV-protected, and designed for Mumbai\'s climate.' },
    { title: 'Full Warranty Included', description: 'Every project comes with 1-3 year warranty depending on polish type. We maintain records of all customers and proactively offer maintenance services. Peace of mind guaranteed.' }
  ],
  faqs: generateNearMeFAQs('furniture-polish'),
  relatedServices: [
    { name: 'Wood Polishing Near Me', url: '/wood-polishing-near-me' },
    { name: 'Furniture Polish in Andheri', url: '/furniture-polish-in-andheri' },
    { name: 'Furniture Polish in Thane', url: '/furniture-polish-in-thane' },
    { name: 'Furniture Polish in Bandra', url: '/furniture-polish-in-bandra' }
  ],
  schema: generateSchema('Furniture Polish Near Me', 'Mumbai', '/furniture-polish-near-me', furniturePolishServices),
  primaryKeyword: 'furniture polish near me',
  secondaryKeywords: ['furniture polishing near me', 'furniture polish near me price', 'best furniture polish near me', 'furniture polish service near me', 'wood polish near me', 'furniture polishing services near me Mumbai']
};

export const woodPolishingNearMeData: PageData = {
  title: 'Wood Polishing Near Me | Expert Wood Polish Service Mumbai',
  metaDescription: 'Need wood polishing near me? A1 Furniture Polish offers doorstep wood polishing across Mumbai — doors, floors, furniture, staircases. Call +91-9819519345. Starting ₹35/sq.ft!',
  h1: 'Wood Polishing Near Me – Professional Doorstep Service in Mumbai',
  url: '/wood-polishing-near-me',
  canonicalUrl: 'https://www.a1furniturepolish.com/wood-polishing-near-me',
  serviceCategory: 'wood-polishing',
  serviceName: 'Wood Polishing Near Me',
  location: 'Mumbai',
  titleVariation: 'professional',
  introduction: 'Looking for "wood polishing near me"? A1 Furniture Polish provides expert wood polishing services at your doorstep across all Mumbai, Thane, and Navi Mumbai areas. From wooden furniture and doors to floors, staircases, and wall panels — we polish every wood surface to perfection. Our master craftsmen use premium PU Polish, Melamine Polish, Duco Paint, and Natural Oil finishes to transform your woodwork. We understand Mumbai\'s humid climate challenges and use moisture-resistant formulations that last 5-7 years. 15+ years experience, 4.9★ Google rating, free consultation, and satisfaction guarantee. Call +91-9819519345 for same-day assessment.',
  services: woodPolishingServices,
  process: commonProcessSteps,
  locationAreas: ['Andheri', 'Bandra', 'Goregaon', 'Malad', 'Borivali', 'Thane', 'Powai', 'Dadar', 'Mulund', 'Kandivali', 'Jogeshwari', 'Chembur', 'Vile Parle', 'Juhu', 'Khar', 'Ghatkopar', 'Kurla', 'Navi Mumbai', 'Vashi', 'Santacruz'],
  serviceAreaDescription: 'Our wood polishing teams cover the entire Mumbai Metropolitan Region. Western Line suburbs from Churchgate to Dahisar, Central Mumbai from CST to Thane, and Harbour Line from Chembur to Panvel. Whether you need wood polishing in a high-rise apartment, bungalow, office, or commercial space — our team reaches you with all equipment and materials.',
  pricing: { startingPrice: 299, priceRange: '₹299 - ₹8,999', factors: [...commonPricingFactors, 'Total area in sq.ft.', 'Surface type (floor, furniture, doors)'] },
  whyChooseUs: [
    { title: 'All-Wood Experts', description: 'We polish everything made of wood — furniture, doors, windows, floors, staircases, cabinets, wall panels, and ceiling beams. One team, complete wood polishing solution.' },
    { title: 'Climate-Smart Formulations', description: 'Our polish materials are specifically selected for Mumbai\'s 60-90% humidity. Moisture-resistant PU Polish prevents swelling, warping, and fungal damage to your woodwork.' },
    { title: 'Machine + Hand Finishing', description: 'We combine power sanding machines for perfect surface preparation with expert hand finishing for detailed areas. This dual approach gives factory-quality results at your doorstep.' },
    { title: 'Free Color Consultation', description: 'Not sure which color or finish to choose? Our expert visits with a full color card (50+ wood tones) and finish samples. We recommend options that complement your interiors.' },
    { title: 'Clean Workmanship', description: 'We cover all surrounding surfaces with protective sheets, use dust-collection equipment, and leave your space spotlessly clean after work. Zero mess guaranteed.' },
    { title: 'Written Warranty', description: 'All wood polishing work gets written warranty plus GST invoice. PU Polish warranty: 3 years. Melamine: 2 years. We keep records and proactively reach out for maintenance.' }
  ],
  faqs: generateNearMeFAQs('wood-polishing'),
  relatedServices: [
    { name: 'Furniture Polish Near Me', url: '/furniture-polish-near-me' },
    { name: 'Wood Polishing in Thane', url: '/wood-polishing-in-thane' },
    { name: 'Wooden Polishing in Andheri', url: '/wooden-polishing-in-andheri' },
    { name: 'Wood Polishing in Bandra', url: '/wood-polishing-in-bandra' }
  ],
  schema: generateSchema('Wood Polishing Near Me', 'Mumbai', '/wood-polishing-near-me', woodPolishingServices),
  primaryKeyword: 'wood polishing near me',
  secondaryKeywords: ['wood polish near me', 'wooden polishing near me', 'wood polishing service near me', 'wood polish near me price', 'best wood polishing near me', 'door polishing near me']
};

// ============================================================
// 2. LOCATION HUB PAGES (10)
// ============================================================

function generateLocationHubPage(locKey: string): PageData {
  const loc = locations[locKey];
  const url = `/furniture-polish-${loc.slug}`;
  return {
    title: `Furniture Polish in ${loc.name} | Best Polishing Service ${loc.name}`,
    metaDescription: `Expert furniture polish in ${loc.name}. PU Polish, Melamine, Duco, restoration & more. Doorstep service in ${loc.nearbyAreas.slice(0, 3).join(', ')}. Call +91-9819519345. Starting ₹299!`,
    h1: `Furniture Polish in ${loc.name} – Doorstep Polishing Service`,
    url,
    canonicalUrl: `https://www.a1furniturepolish.com${url}`,
    serviceCategory: 'furniture-polishing',
    serviceName: `Furniture Polish ${loc.name}`,
    location: loc.name,
    titleVariation: 'best',
    introduction: `Looking for professional furniture polish in ${loc.name}? A1 Furniture Polish is ${loc.name}'s most trusted furniture polishing service with 15+ years of experience. We serve all ${loc.name} areas including ${loc.nearbyAreas.slice(0, 6).join(', ')} with doorstep polishing services. Our expert craftsmen specialize in PU Polish (Gloss & Matt), Melamine Polish, Duco Paint, and complete furniture restoration. We understand ${loc.name}'s specific needs — from high-rise apartments near ${loc.landmarks[0]} to independent homes near ${loc.landmarks[1]}. 4.9★ Google rating, transparent pricing starting ₹299, free consultation, and satisfaction guarantee. Book your free home inspection today!`,
    services: furniturePolishServices,
    process: commonProcessSteps,
    locationAreas: loc.nearbyAreas,
    serviceAreaDescription: `Our dedicated ${loc.name} service team covers all localities: ${loc.nearbyAreas.join(', ')}. We're familiar with every lane and society in ${loc.name}, ensuring prompt arrival and efficient service. Whether you're near ${loc.landmarks.join(', ')} or anywhere in ${loc.name}, our team reaches you within hours of booking.`,
    pricing: { startingPrice: 299, priceRange: '₹299 - ₹6,449', factors: commonPricingFactors },
    whyChooseUs: generateWhyChooseUsForLocation(loc),
    faqs: generateLocationHubFAQs(loc),
    relatedServices: [
      { name: `Wooden Polishing in ${loc.name}`, url: `/wooden-polishing-in-${loc.slug}` },
      { name: `Wood Polishing in ${loc.name}`, url: `/wood-polishing-in-${loc.slug}` },
      { name: 'Furniture Polish Near Me', url: '/furniture-polish-near-me' },
      { name: 'Service Areas Mumbai', url: '/service-areas-mumbai' }
    ],
    schema: generateSchema(`Furniture Polish ${loc.name}`, loc.name, url, furniturePolishServices),
    primaryKeyword: `furniture polish ${loc.name}`,
    secondaryKeywords: [`furniture polishing in ${loc.name}`, `furniture polish ${loc.name} price`, `best furniture polish in ${loc.name}`, `furniture polish near ${loc.name}`, `wood polish in ${loc.name}`, `furniture restoration ${loc.name}`]
  };
}

export const locationHubPages: Record<string, PageData> = {
  thane: generateLocationHubPage('thane'),
  andheri: generateLocationHubPage('andheri'),
  bandra: generateLocationHubPage('bandra'),
  malad: generateLocationHubPage('malad'),
  mulund: generateLocationHubPage('mulund'),
  kandivali: generateLocationHubPage('kandivali'),
  borivali: generateLocationHubPage('borivali'),
  jogeshwari: generateLocationHubPage('jogeshwari'),
  chembur: generateLocationHubPage('chembur'),
  vileParle: generateLocationHubPage('vileParle'),
};

// ============================================================
// 3. "WOODEN POLISHING IN {LOCATION}" (10)
// ============================================================

function generateWoodenPolishingInPage(locKey: string): PageData {
  const loc = locations[locKey];
  const url = `/wooden-polishing-in-${loc.slug}`;
  return {
    title: `Wooden Polishing in ${loc.name} | Expert Wood Polish Service`,
    metaDescription: `Professional wooden polishing in ${loc.name}. Doors, floors, furniture, staircases — all wood surfaces. Starting ₹35/sq.ft. Free inspection in ${loc.nearbyAreas.slice(0, 3).join(', ')}. Call now!`,
    h1: `Wooden Polishing in ${loc.name} – Complete Wood Finishing Service`,
    url,
    canonicalUrl: `https://www.a1furniturepolish.com${url}`,
    serviceCategory: 'wood-polishing',
    serviceName: `Wooden Polishing ${loc.name}`,
    location: loc.name,
    titleVariation: 'professional',
    introduction: `Need professional wooden polishing in ${loc.name}? A1 Furniture Polish delivers expert wood finishing services across all ${loc.name} areas — from furniture and doors to wooden floors, staircases, and wall panels. Our ${loc.name} team uses premium PU Polish (Gloss & Matt), Melamine Polish, Duco Paint, and Natural Wood Oils to transform every wooden surface in your home or office. Serving ${loc.nearbyAreas.slice(0, 5).join(', ')} and nearby areas. Our climate-smart formulations are designed to resist Mumbai's humidity, ensuring your woodwork looks beautiful for 5-7 years. Free home inspection, transparent pricing from ₹35/sq.ft., and full warranty on every project.`,
    services: woodPolishingServices,
    process: commonProcessSteps,
    locationAreas: loc.nearbyAreas,
    serviceAreaDescription: `Our wooden polishing service covers all of ${loc.name}, including ${loc.nearbyAreas.join(', ')}. Whether you need door polishing in a flat near ${loc.landmarks[0]}, floor polishing in a bungalow near ${loc.landmarks[1]}, or complete home woodwork finishing anywhere in ${loc.name}, our expert team delivers premium results at your doorstep.`,
    pricing: { startingPrice: 299, priceRange: '₹299 - ₹8,999', factors: [...commonPricingFactors, 'Total area in sq.ft.', 'Wood surface type'] },
    whyChooseUs: generateWhyChooseUsForLocation(loc),
    faqs: generateWoodenPolishingFAQs(loc),
    relatedServices: [
      { name: `Furniture Polish in ${loc.name}`, url: `/furniture-polish-${loc.slug}` },
      { name: `Wood Polishing in ${loc.name}`, url: `/wood-polishing-in-${loc.slug}` },
      { name: 'Wood Polishing Near Me', url: '/wood-polishing-near-me' },
      { name: 'Wooden Floor Polishing Mumbai', url: '/services/best-wooden-floor-polishing-mumbai' }
    ],
    schema: generateSchema(`Wooden Polishing ${loc.name}`, loc.name, url, woodPolishingServices),
    primaryKeyword: `wooden polishing in ${loc.name}`,
    secondaryKeywords: [`wooden polishing ${loc.name}`, `wood polishing in ${loc.name}`, `wooden furniture polish ${loc.name}`, `door polishing in ${loc.name}`, `wood polish ${loc.name} price`, `wooden floor polishing ${loc.name}`]
  };
}

export const woodenPolishingInPages: Record<string, PageData> = {
  thane: generateWoodenPolishingInPage('thane'),
  andheri: generateWoodenPolishingInPage('andheri'),
  bandra: generateWoodenPolishingInPage('bandra'),
  malad: generateWoodenPolishingInPage('malad'),
  goregaon: generateWoodenPolishingInPage('goregaon'),
  powai: generateWoodenPolishingInPage('powai'),
  dadar: generateWoodenPolishingInPage('dadar'),
  mulund: generateWoodenPolishingInPage('mulund'),
  borivali: generateWoodenPolishingInPage('borivali'),
  kandivali: generateWoodenPolishingInPage('kandivali'),
};

// ============================================================
// 4. "FURNITURE POLISH IN {LOCATION}" (10)
// ============================================================

function generateFurniturePolishInPage(locKey: string): PageData {
  const loc = locations[locKey];
  const url = `/furniture-polish-in-${loc.slug}`;
  return {
    title: `Furniture Polish in ${loc.name} | #1 Polishing Service ${loc.name}`,
    metaDescription: `Best furniture polish in ${loc.name}. PU, Melamine, Duco polish for all furniture. Doorstep service in ${loc.nearbyAreas.slice(0, 3).join(', ')}. Starting ₹299. Call +91-9819519345!`,
    h1: `Furniture Polish in ${loc.name} – Expert Doorstep Service`,
    url,
    canonicalUrl: `https://www.a1furniturepolish.com${url}`,
    serviceCategory: 'furniture-polishing',
    serviceName: `Furniture Polish in ${loc.name}`,
    location: loc.name,
    titleVariation: 'best',
    introduction: `Get the best furniture polish in ${loc.name} from A1 Furniture Polish — Mumbai's most trusted polishing experts. We bring premium PU Polish, Melamine Polish, Duco Paint, and traditional wood finishes right to your doorstep in ${loc.nearbyAreas.slice(0, 5).join(', ')} and all ${loc.name} areas. Our skilled craftsmen with 15+ years experience transform old, dull furniture into stunning showpieces. From dining tables and wardrobes to beds, cabinets, and antique pieces — we polish everything. Transparent pricing from ₹299, free home assessment, no advance payment, and written warranty. Join 500+ happy Mumbai families who trust A1 for furniture polish.`,
    services: furniturePolishServices,
    process: commonProcessSteps,
    locationAreas: loc.nearbyAreas,
    serviceAreaDescription: `We provide furniture polish in every corner of ${loc.name}: ${loc.nearbyAreas.join(', ')}. Whether you live in a society near ${loc.landmarks[0]}, a chawl near ${loc.landmarks[1]}, or an independent house anywhere in ${loc.name}, our team provides reliable doorstep furniture polishing service.`,
    pricing: { startingPrice: 299, priceRange: '₹299 - ₹6,449', factors: commonPricingFactors },
    whyChooseUs: generateWhyChooseUsForLocation(loc),
    faqs: generateFurniturePolishInFAQs(loc),
    relatedServices: [
      { name: `Wooden Polishing in ${loc.name}`, url: `/wooden-polishing-in-${loc.slug}` },
      { name: `Wood Polishing in ${loc.name}`, url: `/wood-polishing-in-${loc.slug}` },
      { name: `Furniture Polish ${loc.name}`, url: `/furniture-polish-${loc.slug}` },
      { name: 'Furniture Polish Near Me', url: '/furniture-polish-near-me' }
    ],
    schema: generateSchema(`Furniture Polish in ${loc.name}`, loc.name, url, furniturePolishServices),
    primaryKeyword: `furniture polish in ${loc.name}`,
    secondaryKeywords: [`furniture polishing in ${loc.name}`, `furniture polish in ${loc.name} price`, `best furniture polish in ${loc.name}`, `PU polish in ${loc.name}`, `furniture restoration in ${loc.name}`, `wood furniture polish ${loc.name}`]
  };
}

export const furniturePolishInPages: Record<string, PageData> = {
  thane: generateFurniturePolishInPage('thane'),
  andheri: generateFurniturePolishInPage('andheri'),
  bandra: generateFurniturePolishInPage('bandra'),
  malad: generateFurniturePolishInPage('malad'),
  mulund: generateFurniturePolishInPage('mulund'),
  jogeshwari: generateFurniturePolishInPage('jogeshwari'),
  chembur: generateFurniturePolishInPage('chembur'),
  khar: generateFurniturePolishInPage('khar'),
  juhu: generateFurniturePolishInPage('juhu'),
  vashi: generateFurniturePolishInPage('vashi'),
};

// ============================================================
// 5. "WOOD POLISHING IN {LOCATION}" (10)
// ============================================================

function generateWoodPolishingInPage(locKey: string): PageData {
  const loc = locations[locKey];
  const url = `/wood-polishing-in-${loc.slug}`;
  return {
    title: `Wood Polishing in ${loc.name} | Professional Wood Polish Service`,
    metaDescription: `Expert wood polishing in ${loc.name}. All wood surfaces — furniture, doors, floors. PU, Melamine, Duco finishes. Starting ₹35/sq.ft. Free quote in ${loc.nearbyAreas.slice(0, 3).join(', ')}!`,
    h1: `Wood Polishing in ${loc.name} – Premium Finish for Every Surface`,
    url,
    canonicalUrl: `https://www.a1furniturepolish.com${url}`,
    serviceCategory: 'wood-polishing',
    serviceName: `Wood Polishing in ${loc.name}`,
    location: loc.name,
    titleVariation: 'professional',
    introduction: `Looking for expert wood polishing in ${loc.name}? A1 Furniture Polish brings professional wood finishing to every doorstep in ${loc.name}. We handle all wooden surfaces — furniture, doors, windows, flooring, staircases, cabinets, and decorative woodwork. Our ${loc.name} team uses humidity-resistant PU Polish, Melamine, Duco Paint, and Natural Oil finishes that are proven to last 5-7 years in Mumbai's climate. Serving ${loc.nearbyAreas.slice(0, 6).join(', ')} and all surrounding areas. Whether it's a single door or complete home woodwork, we deliver flawless results. Free inspection, transparent pricing, and warranty on every project.`,
    services: woodPolishingServices,
    process: commonProcessSteps,
    locationAreas: loc.nearbyAreas,
    serviceAreaDescription: `Our wood polishing service team in ${loc.name} covers: ${loc.nearbyAreas.join(', ')}. From apartments and bungalows near ${loc.landmarks[0]} to commercial spaces near ${loc.landmarks[2]}, we bring professional wood finishing expertise to every ${loc.name} location.`,
    pricing: { startingPrice: 299, priceRange: '₹299 - ₹8,999', factors: [...commonPricingFactors, 'Total area in sq.ft.', 'Wood surface type'] },
    whyChooseUs: generateWhyChooseUsForLocation(loc),
    faqs: generateWoodPolishingInFAQs(loc),
    relatedServices: [
      { name: `Furniture Polish in ${loc.name}`, url: `/furniture-polish-in-${loc.slug}` },
      { name: `Wooden Polishing in ${loc.name}`, url: `/wooden-polishing-in-${loc.slug}` },
      { name: 'Wood Polishing Near Me', url: '/wood-polishing-near-me' },
      { name: 'Door Polishing Mumbai', url: '/services/best-door-polishing-mumbai' }
    ],
    schema: generateSchema(`Wood Polishing in ${loc.name}`, loc.name, url, woodPolishingServices),
    primaryKeyword: `wood polishing in ${loc.name}`,
    secondaryKeywords: [`wood polish in ${loc.name}`, `wood polishing ${loc.name} price`, `best wood polish in ${loc.name}`, `door polish in ${loc.name}`, `wooden floor polish ${loc.name}`, `furniture wood polish ${loc.name}`]
  };
}

export const woodPolishingInPages: Record<string, PageData> = {
  thane: generateWoodPolishingInPage('thane'),
  andheri: generateWoodPolishingInPage('andheri'),
  bandra: generateWoodPolishingInPage('bandra'),
  malad: generateWoodPolishingInPage('malad'),
  goregaon: generateWoodPolishingInPage('goregaon'),
  dadar: generateWoodPolishingInPage('dadar'),
  mulund: generateWoodPolishingInPage('mulund'),
  borivali: generateWoodPolishingInPage('borivali'),
  kandivali: generateWoodPolishingInPage('kandivali'),
  powai: generateWoodPolishingInPage('powai'),
};

// ============================================================
// 6. STANDALONE SOFA/BED REPAIR PAGES (8)
// ============================================================

function generateSofaRepairPage(locKey: string): PageData {
  const loc = locations[locKey];
  const url = `/sofa-repair-in-${loc.slug}`;
  return {
    title: `Sofa Repair in ${loc.name} | Expert Sofa Restoration Service`,
    metaDescription: `Professional sofa repair in ${loc.name}. Fabric change, cushion refilling, frame repair, recliner fix. Doorstep service in ${loc.nearbyAreas.slice(0, 3).join(', ')}. Call +91-9819519345!`,
    h1: `Sofa Repair in ${loc.name} – Complete Restoration at Your Doorstep`,
    url,
    canonicalUrl: `https://www.a1furniturepolish.com${url}`,
    serviceCategory: 'sofa-repair',
    serviceName: `Sofa Repair ${loc.name}`,
    location: loc.name,
    titleVariation: 'professional',
    introduction: `Need sofa repair in ${loc.name}? A1 Furniture Polish provides complete sofa repair and restoration services at your doorstep in ${loc.name}. Whether your sofa needs fabric change, cushion refilling, frame repair, spring replacement, recliner mechanism fix, or leather restoration — our skilled craftsmen handle it all. We serve ${loc.nearbyAreas.slice(0, 6).join(', ')} and all ${loc.name} areas. With 500+ fabric options, premium HR foam cushions, and expert carpenters, we transform old, sagging sofas into comfortable, beautiful seating. Save 50-70% vs buying new. Free home inspection, transparent pricing, and warranty on all repair work.`,
    services: sofaRepairServices,
    process: [
      { step: 1, title: 'Free Home Inspection', description: `Our expert visits your ${loc.name} home, inspects the sofa, discusses requirements, and provides a detailed written quote. No obligation.`, image: '/assets/optimized/consultation-booking.webp' },
      { step: 2, title: 'Material Selection', description: 'Choose from 500+ fabric samples, foam densities, and finish options. Our expert helps you pick the perfect combination for your needs and budget.', image: '/assets/optimized/Cleaning & Sanding.webp' },
      { step: 3, title: 'Repair & Restoration', description: 'Our skilled craftsmen repair the frame, replace springs/webbing, install new foam cushions, and apply chosen fabric with expert finishing.', image: '/assets/optimized/Cleaning & Sanding (2).webp' },
      { step: 4, title: 'Quality Check & Delivery', description: 'Thorough quality inspection of comfort, appearance, and durability. Final touches and cleanup. Pay only after your complete satisfaction.', image: '/assets/optimized/drying-finishing.webp' },
      { step: 5, title: 'After-Service Support', description: 'Warranty card provided. We follow up after 1 week to ensure satisfaction. Free minor adjustments within warranty period.', image: '/assets/optimized/filling-gaps-polish-application.webp' }
    ],
    locationAreas: loc.nearbyAreas,
    serviceAreaDescription: `Our sofa repair team in ${loc.name} covers all areas: ${loc.nearbyAreas.join(', ')}. We bring all tools, materials, and fabric samples to your doorstep. No need to transport heavy sofas anywhere. From luxury apartments near ${loc.landmarks[0]} to homes near ${loc.landmarks[1]}, we service all ${loc.name} localities.`,
    pricing: { startingPrice: 999, priceRange: '₹999 - ₹12,999', factors: ['Sofa size (1/2/3 seater, L-shape)', 'Type of repair needed', 'Fabric/material choice', 'Number of sofas', 'Recliner mechanism (if applicable)'] },
    whyChooseUs: [
      { title: `${loc.name} Doorstep Service`, description: `All sofa repair done at your home in ${loc.name}. We bring tools, materials, and 500+ fabric samples to your doorstep. No transportation headaches.` },
      { title: '500+ Fabric Options', description: 'Choose from Suede, Velvet, Linen, Cotton, Jute, Leatherette, and Genuine Leather in hundreds of colors and patterns. We bring sample swatches to your home.' },
      { title: 'Expert Carpenters', description: `Our ${loc.name} team includes experienced carpenters who can repair any sofa frame issue — from minor wobbles to complete reconstruction. Quality woodwork guaranteed.` },
      { title: 'Premium Foam & Cushions', description: 'We use high-quality HR Foam (32-40 density), Memory Foam, and Fiber Fill for maximum comfort and durability. No cheap sponge — only long-lasting materials.' },
      { title: 'Save 50-70%', description: 'Professional sofa repair costs a fraction of buying new. Quality solid-wood sofa frames last decades. Only the upholstery needs periodic renewal.' },
      { title: 'Warranty Included', description: `All sofa repair work in ${loc.name} comes with written warranty. Fabric: 1 year, Frame repair: 2 years, Cushion: 1 year. GST bill provided.` }
    ],
    faqs: generateRepairFAQs('sofa', loc),
    relatedServices: [
      { name: `Bed Repair in ${loc.name}`, url: `/bed-repair-in-${loc.slug}` },
      { name: `Furniture Polish in ${loc.name}`, url: `/furniture-polish-in-${loc.slug}` },
      { name: 'Sofa Fabric Change', url: '/sofa-fabric-change' },
      { name: 'Sofa Repair Mumbai', url: '/sofa-repair-mumbai' }
    ],
    schema: generateSchema(`Sofa Repair ${loc.name}`, loc.name, url, sofaRepairServices),
    primaryKeyword: `sofa repair in ${loc.name}`,
    secondaryKeywords: [`sofa repair ${loc.name}`, `sofa repair ${loc.name} cost`, `sofa fabric change ${loc.name}`, `sofa cushion repair ${loc.name}`, `recliner repair ${loc.name}`, `sofa restoration ${loc.name}`]
  };
}

function generateBedRepairPage(locKey: string): PageData {
  const loc = locations[locKey];
  const url = `/bed-repair-in-${loc.slug}`;
  return {
    title: `Bed Repair in ${loc.name} | Expert Bed Restoration Service`,
    metaDescription: `Professional bed repair in ${loc.name}. Frame repair, headboard fix, hydraulic bed repair, wood polish. Doorstep service in ${loc.nearbyAreas.slice(0, 3).join(', ')}. Call +91-9819519345!`,
    h1: `Bed Repair in ${loc.name} – Complete Bed Restoration at Doorstep`,
    url,
    canonicalUrl: `https://www.a1furniturepolish.com${url}`,
    serviceCategory: 'bed-repair',
    serviceName: `Bed Repair ${loc.name}`,
    location: loc.name,
    titleVariation: 'professional',
    introduction: `Need bed repair in ${loc.name}? A1 Furniture Polish provides expert bed repair and restoration services at your doorstep across ${loc.name}. From broken slats and wobbly frames to hydraulic bed mechanism fixes and complete bed refinishing — our skilled carpenters handle every bed issue. Serving ${loc.nearbyAreas.slice(0, 6).join(', ')} and all ${loc.name} areas. We repair all bed types: single, double, queen, king, bunk beds, baby cots, storage beds, and divan beds. Our combined repair + polish service gives your bed a brand-new makeover at 50-70% less than replacement cost. Free inspection, transparent pricing, warranty included.`,
    services: bedRepairServices,
    process: [
      { step: 1, title: 'Free Bed Inspection', description: `Our carpenter visits your ${loc.name} home, inspects the bed thoroughly, identifies all issues, and provides a transparent repair quote.`, image: '/assets/optimized/consultation-booking.webp' },
      { step: 2, title: 'Structural Repair', description: 'Fix broken slats, reinforce joints, repair/replace damaged wood, tighten the frame, and ensure structural stability for years of use.', image: '/assets/optimized/Cleaning & Sanding.webp' },
      { step: 3, title: 'Mechanism Fix', description: 'For hydraulic/storage beds: replace gas lifts, repair hinges, fix storage box mechanisms, and ensure smooth, reliable operation.', image: '/assets/optimized/Cleaning & Sanding (2).webp' },
      { step: 4, title: 'Polish & Refinish', description: 'Complete bed frame refinishing with chosen polish (PU/Melamine/Duco). Includes sanding, color selection, multiple coats, and protective finish.', image: '/assets/optimized/filling-gaps-polish-application.webp' },
      { step: 5, title: 'Quality Check', description: 'Thorough testing of structural stability, mechanism operation, finish quality, and overall appearance. Pay after your complete satisfaction.', image: '/assets/optimized/drying-finishing.webp' }
    ],
    locationAreas: loc.nearbyAreas,
    serviceAreaDescription: `Our bed repair team serves all of ${loc.name}: ${loc.nearbyAreas.join(', ')}. We carry all tools and materials needed for on-site bed repair. From homes near ${loc.landmarks[0]} to apartments near ${loc.landmarks[1]}, every ${loc.name} address is covered.`,
    pricing: { startingPrice: 799, priceRange: '₹799 - ₹8,999', factors: ['Bed size and type', 'Extent of damage/repair', 'Polish type if refinishing', 'Mechanism type (hydraulic, storage)', 'Material requirements'] },
    whyChooseUs: [
      { title: `${loc.name} Home Service`, description: `All bed repairs done at your home in ${loc.name}. Our carpenter arrives with complete toolkit and materials. No need to disassemble or transport your bed.` },
      { title: 'All Bed Types', description: 'We repair single beds, double beds, queen/king beds, bunk beds, baby cots, storage beds, divan beds, sofa-cum-beds, and Murphy beds. Every type, every size.' },
      { title: 'Combined Repair + Polish', description: `Get structural repair AND fresh polish in one project. Package pricing saves 10-15% in ${loc.name}. Your bed gets a complete makeover — sturdy frame plus stunning finish.` },
      { title: 'Quality Timber', description: 'When wood replacement is needed, we use quality Teak, Sal, or Sheesham wood to match your existing bed frame. No compromise on material quality.' },
      { title: 'Hydraulic Specialists', description: `We stock gas lifts and pistons for all hydraulic bed brands and sizes. Expert mechanism repair that restores smooth opening/closing of storage beds. Frequent service in ${loc.name}.` },
      { title: 'Warranty on Repairs', description: 'Structural repair: 2-year warranty. Polish: 1-3 year warranty. Mechanism: 6-12 month warranty. GST bill and warranty card provided.' }
    ],
    faqs: generateRepairFAQs('bed', loc),
    relatedServices: [
      { name: `Sofa Repair in ${loc.name}`, url: `/sofa-repair-in-${loc.slug}` },
      { name: `Furniture Polish in ${loc.name}`, url: `/furniture-polish-in-${loc.slug}` },
      { name: 'Bed Repair Mumbai', url: '/bed-repair-mumbai' },
      { name: 'Bed Wood Polish Mumbai', url: '/services/best-bed-wood-polish-mumbai' }
    ],
    schema: generateSchema(`Bed Repair ${loc.name}`, loc.name, url, bedRepairServices),
    primaryKeyword: `bed repair in ${loc.name}`,
    secondaryKeywords: [`bed repair ${loc.name}`, `bed repair ${loc.name} cost`, `bed frame repair ${loc.name}`, `hydraulic bed repair ${loc.name}`, `bed polish ${loc.name}`, `bed restoration ${loc.name}`]
  };
}

export const sofaRepairPages: Record<string, PageData> = {
  thane: generateSofaRepairPage('thane'),
  mulund: generateSofaRepairPage('mulund'),
  dadar: generateSofaRepairPage('dadar'),
  bandra: generateSofaRepairPage('bandra'),
};

export const bedRepairPages: Record<string, PageData> = {
  thane: generateBedRepairPage('thane'),
  mulund: generateBedRepairPage('mulund'),
  dadar: generateBedRepairPage('dadar'),
  bandra: generateBedRepairPage('bandra'),
};

// ============================================================
// MASTER LIST OF ALL 50 PAGES (for routing/sitemap)
// ============================================================

export interface SeoGapPage {
  key: string;
  componentName: string;
  path: string;
  data: PageData;
  category: string;
}

export const allSeoGapPages: SeoGapPage[] = [
  // Near Me (2)
  { key: 'furniturePolishNearMe', componentName: 'FurniturePolishNearMe', path: '/furniture-polish-near-me', data: furniturePolishNearMeData, category: 'near-me' },
  { key: 'woodPolishingNearMe', componentName: 'WoodPolishingNearMe', path: '/wood-polishing-near-me', data: woodPolishingNearMeData, category: 'near-me' },
  // Location Hubs (10)
  ...Object.entries(locationHubPages).map(([locKey, data]) => ({ key: `hub_${locKey}`, componentName: `FurniturePolish${data.location.replace(/\s/g, '')}`, path: data.url, data, category: 'location-hub' })),
  // Wooden Polishing In (10)
  ...Object.entries(woodenPolishingInPages).map(([locKey, data]) => ({ key: `woodenIn_${locKey}`, componentName: `WoodenPolishingIn${data.location.replace(/\s/g, '')}`, path: data.url, data, category: 'wooden-polishing-in' })),
  // Furniture Polish In (10)
  ...Object.entries(furniturePolishInPages).map(([locKey, data]) => ({ key: `fpIn_${locKey}`, componentName: `FurniturePolishIn${data.location.replace(/\s/g, '')}`, path: data.url, data, category: 'furniture-polish-in' })),
  // Wood Polishing In (10)
  ...Object.entries(woodPolishingInPages).map(([locKey, data]) => ({ key: `wpIn_${locKey}`, componentName: `WoodPolishingIn${data.location.replace(/\s/g, '')}`, path: data.url, data, category: 'wood-polishing-in' })),
  // Sofa Repair (4)
  ...Object.entries(sofaRepairPages).map(([locKey, data]) => ({ key: `sofaRepair_${locKey}`, componentName: `SofaRepairIn${data.location.replace(/\s/g, '')}`, path: data.url, data, category: 'sofa-repair' })),
  // Bed Repair (4)
  ...Object.entries(bedRepairPages).map(([locKey, data]) => ({ key: `bedRepair_${locKey}`, componentName: `BedRepairIn${data.location.replace(/\s/g, '')}`, path: data.url, data, category: 'bed-repair' })),
];
