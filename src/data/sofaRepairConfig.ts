/**
 * Sofa Repair SEO Pages Configuration
 * Master config for sofa repair service pages across Mumbai locations
 * 
 * Parent keyword: sofa repair mumbai
 * Child keywords: scratched sofa, faded sofa, water damaged sofa, termite damaged sofa
 */

// ── Problem Types ──────────────────────────────────────────────────────

export interface SofaRepairProblem {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  heroTitle: string;
  description: string;
  /** Detailed paragraph about the real-world problem */
  problemDetail: string;
  /** What causes this problem */
  causes: string[];
  /** Signs the customer should look for */
  signs: string[];
  /** How A1 fixes it – step by step */
  repairSteps: { title: string; description: string }[];
  /** Suggested images for this problem type (path in /assets/) */
  images: { hero: string; before: string; after: string; process: string };
  /** Pricing guidance */
  priceRange: string;
  startingPrice: number;
  /** SEO keywords */
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** Color accent for UI badge */
  badgeColor: string;
}

export const sofaRepairProblems: SofaRepairProblem[] = [
  {
    id: 'scratched',
    slug: 'scratched-sofa-repair',
    name: 'Scratched Sofa Repair',
    shortName: 'Scratched',
    heroTitle: 'Scratched Sofa? Restore It Like New',
    description:
      'Professional scratched sofa repair service. We remove deep scratches, claw marks, and surface abrasions from leather, rexine, and wooden sofa frames using advanced restoration techniques.',
    problemDetail:
      'Sofa scratches are one of the most common furniture problems in Indian homes. Pet claws, children playing, shifting furniture, belt buckles, and everyday use leave unsightly marks on leather, rexine, and fabric sofas. Deep scratches on leather sofas expose the base material, leading to peeling and cracking over time. Wooden sofa frames get scratched during house cleaning or relocation. Left untreated, scratches worsen with daily use — leather dries and cracks, fabric frays, and wood loses its protective finish. In Mumbai\'s humid climate, exposed wood from scratches absorbs moisture, causing swelling and discoloration.',
    causes: [
      'Pet claws and nail scratches',
      'Children playing with sharp toys',
      'Belt buckles, zippers, and rough clothing',
      'Furniture shifting and relocation damage',
      'Keys, coins, and everyday objects',
      'Improper cleaning with abrasive materials',
    ],
    signs: [
      'Visible white or light-colored scratch lines on leather',
      'Peeling or flaking around scratch marks',
      'Rough texture when running your hand over the surface',
      'Faded color along scratch lines',
      'Exposed wood grain on sofa frame',
      'Fabric threads pulled or frayed',
    ],
    repairSteps: [
      { title: 'Damage Assessment', description: 'Our expert inspects scratch depth, material type, and extent of damage. We photograph the damage and provide a transparent repair estimate.' },
      { title: 'Surface Cleaning', description: 'The scratched area is thoroughly cleaned with material-specific cleaners to remove dirt, oils, and debris from the scratch grooves.' },
      { title: 'Scratch Filling & Repair', description: 'Deep scratches are filled with color-matched leather filler, wood putty, or fabric bonding agents. Multiple thin layers ensure seamless blending.' },
      { title: 'Color Matching & Touch-Up', description: 'We professionally color-match the repaired area with the rest of the sofa using premium dyes and pigments for invisible repair.' },
      { title: 'Protective Coating', description: 'A protective sealant or conditioning treatment is applied to prevent future scratches and extend the sofa\'s life.' },
    ],
    images: {
      hero: '/assets/sofa/scratched-sofa-repair.webp',
      before: '/assets/sofa/scratched-sofa-before.webp',
      after: '/assets/sofa/scratched-sofa-after.webp',
      process: '/assets/sofa/scratch-repair-process.webp',
    },
    priceRange: '₹1,500 – ₹8,000',
    startingPrice: 1500,
    primaryKeyword: 'scratched sofa repair',
    secondaryKeywords: [
      'sofa scratch repair near me',
      'leather sofa scratch removal',
      'sofa scratch fix',
      'cat scratch sofa repair',
      'pet scratch sofa fix',
      'sofa surface repair',
    ],
    badgeColor: 'red',
  },
  {
    id: 'faded',
    slug: 'faded-sofa-repair',
    name: 'Faded / Dull Sofa Repair',
    shortName: 'Faded / Dull',
    heroTitle: 'Faded Sofa? Bring Back the Original Shine',
    description:
      'Expert faded and dull sofa restoration service. We restore color, shine, and vibrancy to sun-damaged, aged, and worn-out sofas using professional re-dyeing and polishing techniques.',
    problemDetail:
      'Sofa fading is an extremely common yet overlooked problem in Mumbai homes. Continuous exposure to sunlight through windows, fluorescent lighting, and general aging causes leather, fabric, and rexine sofas to lose their original color and sheen. UV radiation breaks down dye molecules in the material, causing gradual bleaching. In fabric sofas, colors wash out with repeated cleaning. Leather sofas develop a chalky, dried-out appearance as natural oils evaporate over time. The humidity in Mumbai accelerates oxidation of upholstery materials. A faded sofa makes your entire living room look old and neglected, even if the sofa frame is perfectly fine. Most people assume they need a new sofa, but professional restoration can bring back 90-95% of the original appearance at a fraction of replacement cost.',
    causes: [
      'Direct sunlight exposure through windows',
      'UV radiation from both natural and artificial light',
      'Chemical cleaners that strip color',
      'Natural aging and oxidation of materials',
      'Mumbai\'s high humidity accelerating fading',
      'Frequent washing of removable covers',
      'Body oils and sweat degrading dye over time',
    ],
    signs: [
      'Uneven color — areas facing sunlight are lighter',
      'Chalky or matte appearance on once-glossy leather',
      'Visible difference between seat cushions and backrest',
      'Armrests noticeably lighter than body of sofa',
      'White or gray patches on colored fabric',
      'Loss of pattern definition on printed fabrics',
    ],
    repairSteps: [
      { title: 'Color & Material Analysis', description: 'We analyze the original color, material type, and degree of fading. Using our color library of 500+ shades we identify the exact match.' },
      { title: 'Deep Cleaning & Preparation', description: 'Full sofa deep cleaning removes surface grime, oils, and old polish residue. This prepares the material for optimal dye absorption.' },
      { title: 'Professional Re-Dyeing', description: 'Using spray, brush, or immersion techniques depending on the material, we apply multiple coats of premium, colorfast dye matched to the original shade.' },
      { title: 'Finishing & Conditioning', description: 'Leather is conditioned with premium oils. Fabric is treated with UV-resistant sprays. Wood frames are re-polished to match the refreshed upholstery.' },
      { title: 'UV Protection Treatment', description: 'A UV-blocking protective treatment is applied to prevent future fading, especially critical for sofas near windows in Mumbai apartments.' },
    ],
    images: {
      hero: '/assets/sofa/faded-sofa-repair.webp',
      before: '/assets/sofa/faded-sofa-before.webp',
      after: '/assets/sofa/faded-sofa-after.webp',
      process: '/assets/sofa/fading-repair-process.webp',
    },
    priceRange: '₹2,000 – ₹12,000',
    startingPrice: 2000,
    primaryKeyword: 'faded sofa repair',
    secondaryKeywords: [
      'dull sofa restoration',
      'sofa color restoration',
      'sofa re-dyeing service',
      'sun damaged sofa repair',
      'sofa polishing service',
      'sofa coating service',
    ],
    badgeColor: 'amber',
  },
  {
    id: 'water-damaged',
    slug: 'water-damaged-sofa-repair',
    name: 'Water Damaged Sofa Repair',
    shortName: 'Water Damaged',
    heroTitle: 'Water Damaged Sofa? We\'ll Save It',
    description:
      'Specialized water and moisture damaged sofa repair. We fix watermarks, mold, swelling, delamination, and structural damage caused by flooding, leaks, and Mumbai\'s monsoon humidity.',
    problemDetail:
      'Water damage is arguably the most destructive problem for sofas in Mumbai. Every monsoon season, thousands of sofas are affected by flooding in ground-floor homes, water seepage through walls and windows, roof leaks, AC condensation drips, and accidental spills of large quantities of liquid. Water damage goes far beyond surface stains — it penetrates deep into foam cushions creating a breeding ground for mold and bacteria. Wooden frames absorb moisture and swell, causing joints to loosen and eventually break. Leather becomes stiff, wrinkled, and develops a musty odor. Fabric upholstery develops permanent watermarks and mold that poses serious health risks including allergies and respiratory problems. In Mumbai, where monsoon humidity stays above 85% for months, even minor water exposure can lead to rapid mold growth within 24-48 hours. Quick professional intervention is critical to save a water-damaged sofa.',
    causes: [
      'Mumbai monsoon flooding in ground-floor homes',
      'Water seepage through walls during heavy rains',
      'Roof and ceiling leaks directly onto furniture',
      'AC condensation dripping on nearby sofas',
      'Large accidental spills (water buckets, aquariums)',
      'Pipe bursts and plumbing leaks',
      'High ambient humidity (85%+) during monsoon',
    ],
    signs: [
      'Visible watermarks or ring stains on surface',
      'Musty or moldy smell coming from cushions',
      'White or green mold spots on fabric or leather',
      'Cushions feel unusually heavy or stay damp',
      'Wooden frame is swollen — drawers or parts stick',
      'Upholstery is stiff, wrinkled, or bubbling',
      'Discoloration or dark patches on the base',
    ],
    repairSteps: [
      { title: 'Emergency Assessment', description: 'We prioritize water damage calls. Our team assesses the extent of damage, mold presence, structural integrity, and creates a rescue plan within hours.' },
      { title: 'Industrial Drying & Dehumidification', description: 'Using industrial dehumidifiers and hot-air systems, we extract all moisture from cushions, foam, wooden frames, and upholstery — preventing further mold growth.' },
      { title: 'Mold Treatment & Sanitization', description: 'Medical-grade anti-fungal treatment kills mold at the root. UV sanitization and enzyme-based cleaners eliminate bacteria and odor permanently.' },
      { title: 'Structural Repair', description: 'Swollen wood is treated and reshaped. Loose joints are re-glued and reinforced. Damaged foam is replaced with high-density, waterproof alternatives.' },
      { title: 'Upholstery Restoration', description: 'Leather is re-conditioned, fabric is deep-cleaned and re-dyed if needed. A waterproof protective coating is applied to guard against future water damage.' },
    ],
    images: {
      hero: '/assets/sofa/water-damaged-sofa-repair.webp',
      before: '/assets/sofa/water-damaged-sofa-before.webp',
      after: '/assets/sofa/water-damaged-sofa-after.webp',
      process: '/assets/sofa/water-damage-repair-process.webp',
    },
    priceRange: '₹3,000 – ₹18,000',
    startingPrice: 3000,
    primaryKeyword: 'water damaged sofa repair',
    secondaryKeywords: [
      'moisture affected sofa repair',
      'sofa mold removal service',
      'monsoon sofa damage repair',
      'watermark sofa fix',
      'sofa water stain removal',
      'flood damaged furniture repair',
    ],
    badgeColor: 'blue',
  },
  {
    id: 'termite',
    slug: 'termite-damaged-sofa-repair',
    name: 'Termite Damaged Sofa Repair',
    shortName: 'Termite Damaged',
    heroTitle: 'Termite Damaged Sofa? Stop the Destruction',
    description:
      'Complete termite damage sofa repair and treatment. We eliminate active termite colonies, repair structural wood damage, replace eaten frames, and apply long-lasting anti-termite treatment.',
    problemDetail:
      'Termite damage is one of the most devastating and expensive furniture problems in Mumbai. The city\'s warm, humid tropical climate is an ideal breeding ground for subterranean and drywood termites that attack wooden sofa frames, legs, and internal structures. Termites work silently from the inside — by the time you notice sawdust piles, hollow-sounding wood, or tiny mud tubes on your sofa, the damage is often already severe. A termite colony can consume the entire wooden structure of a sofa in 6-12 months if left untreated. In Mumbai, termite infestations are particularly aggressive during pre-monsoon and monsoon months (May-September) when soil moisture drives colonies indoors. Over 60% of ground-floor and 40% of upper-floor apartments in Mumbai face termite issues. The wooden frames of sofas, especially those made with softwoods like pine or mango, are prime targets. Once one piece of furniture is infested, termites spread to adjacent items, wardrobes, doors, and even structural wood in walls.',
    causes: [
      'Mumbai\'s tropical climate ideal for termite colonies',
      'Ground-floor apartments with soil contact',
      'Softwood frames (pine, mango) used in budget sofas',
      'Pre-existing termite colonies in building walls',
      'Monsoon moisture providing ideal conditions',
      'Untreated or poorly finished wood',
      'Proximity to wooden doors/windows with termites',
    ],
    signs: [
      'Fine sawdust (frass) piles near or under the sofa',
      'Hollow sound when tapping wooden legs or frame',
      'Small mud tubes on legs or underside',
      'Sofa legs feel soft or crumble when pressed',
      'Tiny exit holes (1-2mm) on wooden surfaces',
      'Sudden wobbling or structural weakness',
      'Wings or dead termites near the sofa area',
    ],
    repairSteps: [
      { title: 'Termite Detection Scan', description: 'Professional inspection using tapping tests and moisture meters to locate all active termite colonies, tunnel networks, and extent of structural damage.' },
      { title: 'Active Colony Elimination', description: 'We apply targeted anti-termite chemicals (chlorpyriphos or fipronil-based) to eliminate active colonies. This includes treating the soil around your home for subterranean termites.' },
      { title: 'Damaged Wood Removal', description: 'All termite-eaten wood is carefully removed. We assess which parts can be treated and saved versus what needs complete replacement.' },
      { title: 'Frame Reinforcement & Rebuild', description: 'New termite-resistant hardwood (teak or sal) replaces damaged sections. Joints are reinforced with metal brackets and marine-grade adhesive for maximum strength.' },
      { title: 'Anti-Termite Treatment & Polish', description: 'The entire sofa frame is treated with long-lasting anti-termite solution. Premium wood polish is applied for appearance and as an additional protective barrier. 5-year treatment warranty.' },
    ],
    images: {
      hero: '/assets/sofa/termite-damaged-sofa-repair.webp',
      before: '/assets/sofa/termite-damaged-sofa-before.webp',
      after: '/assets/sofa/termite-damaged-sofa-after.webp',
      process: '/assets/sofa/termite-repair-process.webp',
    },
    priceRange: '₹4,000 – ₹25,000',
    startingPrice: 4000,
    primaryKeyword: 'termite damaged sofa repair',
    secondaryKeywords: [
      'termite sofa treatment',
      'termite sofa refurbished',
      'anti termite sofa service',
      'wooden sofa termite repair',
      'termite furniture treatment mumbai',
      'termite damaged furniture restoration',
    ],
    badgeColor: 'orange',
  },
];

// ── FAQ Data ───────────────────────────────────────────────────────────

export interface SofaRepairFAQ {
  question: string;
  answer: string;
  /** Which problem pages this FAQ appears on (empty = all pages) */
  applicableTo: string[];
}

export const sofaRepairFAQs: SofaRepairFAQ[] = [
  // General FAQs (appear on master page + all problem pages)
  {
    question: 'Which furniture polish is better — spray or wax — and what are the top options for everyday use in India?',
    answer: 'For everyday sofa wood frame maintenance in India, wax-based polish is better for deep nourishment and scratch protection, while spray polish is convenient for quick clean-ups. Top options include Pidilite Fevicol Furniture Polish (wax), Godrej Ezee furniture spray, and A1\'s professional-grade PU wood polish. For leather sofas, use dedicated leather conditioners rather than wood polish. Our technicians can recommend the best product based on your sofa\'s material during our free consultation.',
    applicableTo: [],
  },
  {
    question: 'What is furniture refurbishment?',
    answer: 'Furniture refurbishment is the complete process of restoring old, damaged, or worn-out furniture to like-new condition. For sofas, this includes structural frame repair, spring and foam replacement, re-upholstery or fabric change, leather restoration, wood polishing, and protective treatments. At A1 Furniture Polish, our sofa refurbishment service costs 40-60% less than buying new furniture and produces results that last 5-8 years. We handle everything from minor cosmetic touch-ups to complete rebuilds.',
    applicableTo: [],
  },
  {
    question: 'How much does sofa repair cost in Mumbai?',
    answer: 'Sofa repair costs in Mumbai vary based on the type and extent of damage. Minor scratch repairs start at ₹1,500, faded sofa restoration starts at ₹2,000, water damage repair starts at ₹3,000, and termite damage repair starts at ₹4,000. Complete sofa refurbishment ranges from ₹5,000-₹25,000 depending on sofa size and damage severity. A1 Furniture Polish offers free home consultation and transparent pricing with no hidden charges.',
    applicableTo: [],
  },
  {
    question: 'How long does sofa repair take?',
    answer: 'Most sofa repairs are completed within 1-3 days. Minor scratch or fading touch-ups take just a few hours (same-day service). Water damage repair takes 2-3 days (includes drying time). Termite damage repair with structural work takes 3-5 days. Complete sofa refurbishment takes 5-7 days. We work at your home for most repairs — only severe structural damage requires workshop repair. Same-day and next-day emergency service available across Mumbai.',
    applicableTo: [],
  },
  {
    question: 'Do you provide sofa polishing service at home?',
    answer: 'Yes, A1 Furniture Polish provides 100% doorstep sofa polishing and repair service across Mumbai, Thane, and Navi Mumbai. Our trained professionals come to your home with all necessary tools, materials, and equipment. No need to disassemble or transport your sofa. We cover the surrounding area to prevent mess. Home service is available 7 days a week from 9 AM to 8 PM.',
    applicableTo: [],
  },
  {
    question: 'How do I find top-rated sofa repair near me?',
    answer: 'A1 Furniture Polish is the top-rated sofa repair service in Mumbai with 4.9★ rating from 500+ customers on Google. We serve 45+ locations across Mumbai, Thane, and Navi Mumbai with expert technicians. Simply call +91 8828709945 or WhatsApp us with photos of your sofa damage for a free estimate. We offer same-day service in most Mumbai locations.',
    applicableTo: [],
  },
  {
    question: 'Is repairing a sofa worth it or should I buy new?',
    answer: 'Sofa repair is almost always worth it if the frame is solid. Professional repair costs 40-70% less than a new sofa of equivalent quality. A good sofa frame (teak, sal, or metal) can last 15-20 years — replacing upholstery, fixing scratches, or treating termite damage extends this further. Only buy new if the frame is completely compromised. Our technician will honestly advise you during the free assessment.',
    applicableTo: [],
  },
  // Scratched-specific
  {
    question: 'Can deep cat scratch marks on a leather sofa be fixed?',
    answer: 'Yes, most cat and pet scratches on leather sofas can be professionally repaired. We use specialized leather fillers, color-matching dyes, and sealants to make scratches virtually invisible. Light surface scratches are repaired in under 2 hours. Deep scratches that expose the base material take a bit longer but can still be restored to 90-95% original appearance. Cost starts at ₹1,500 for minor scratches.',
    applicableTo: ['scratched'],
  },
  {
    question: 'How to prevent sofa scratches from pets?',
    answer: 'To prevent pet scratches: (1) Apply scratch-guard protective coating (we offer this service), (2) Use sofa covers or throws in high-risk areas, (3) Keep pet nails trimmed regularly, (4) Provide scratching alternatives like cat posts, (5) For leather sofas, regular conditioning keeps the surface supple and more resistant to claw marks. Our protective coating service reduces scratch damage by 80% and costs ₹500-1,000 per sofa.',
    applicableTo: ['scratched'],
  },
  // Faded-specific
  {
    question: 'Can a badly sun-faded sofa be restored to its original color?',
    answer: 'Yes, even severely sun-faded sofas can be restored to very close to their original color. Our professional re-dyeing process uses fabric-specific or leather-specific colorfast dyes that penetrate deep into the material. We can match any color from our library of 500+ shades. Leather sofas typically restore to 95% original appearance, fabric sofas to 85-90%. We also apply UV protection treatment to prevent future fading.',
    applicableTo: ['faded'],
  },
  {
    question: 'What is sofa coating service?',
    answer: 'Sofa coating is a protective treatment applied after repair or restoration. For leather sofas, it\'s a clear sealant that prevents fading, cracking, and staining. For fabric sofas, it\'s a Scotchgard-type spray that repels water, stains, and UV rays. For wooden frames, it\'s PU or melamine polish that protects against scratches and moisture. A1 offers all three types of coating. Costs range from ₹1,000-3,000 and lasts 12-18 months.',
    applicableTo: ['faded'],
  },
  // Water-damage-specific
  {
    question: 'My sofa got wet in the Mumbai monsoon. What should I do immediately?',
    answer: 'Act quickly: (1) Move the sofa away from the water source if possible, (2) Remove all cushions and stand them up to air-dry, (3) Use towels to soak up as much water as possible, (4) Do NOT use a hair dryer on leather — it causes cracking, (5) Turn on fans and open windows for airflow, (6) Call A1 at +91 8828709945 for emergency water damage service — we respond within hours. Mold can start growing in 24-48 hours in Mumbai humidity, so professional drying is critical.',
    applicableTo: ['water-damaged'],
  },
  {
    question: 'Can mold on a wet sofa cause health problems?',
    answer: 'Yes, mold on water-damaged sofas is a serious health hazard, especially in Mumbai\'s humid climate. Mold spores cause allergic reactions (sneezing, itchy eyes, skin rashes), respiratory problems (coughing, wheezing, asthma attacks), and in severe cases, fungal infections. Children, elderly, and people with existing allergies are most at risk. Professional mold removal with anti-fungal treatment is essential — DIY cleaning often just removes visible mold while the root continues growing inside cushions.',
    applicableTo: ['water-damaged'],
  },
  // Termite-specific
  {
    question: 'How do I know if my sofa has termites?',
    answer: 'Check for these 5 signs: (1) Fine sawdust (frass) near or under the sofa especially on the floor, (2) Tap wooden legs — hollow sound means internal damage, (3) Look for tiny mud tubes on legs or the underside, (4) Press wooden parts — if they feel soft or crumble, termites have eaten through, (5) Look for tiny wings or dead termites near the sofa. If you notice any of these, call immediately — termite damage spreads very fast. A1 offers free termite inspection in all Mumbai locations.',
    applicableTo: ['termite'],
  },
  {
    question: 'Will termite treatment damage my sofa or home?',
    answer: 'No, modern anti-termite treatments are safe for your sofa and home. We use gel-based and localized chemical treatments that are targeted specifically at termite tunnels and colonies. The chemicals used (fipronil and imidacloprid) are low-toxicity and approved for residential use. There\'s no fumigation with harmful gases. The treatment is odorless within 2-3 hours. We advise a 2-hour gap before using the treated furniture. Our anti-termite treatment comes with a 5-year warranty.',
    applicableTo: ['termite'],
  },
  {
    question: 'Can a termite-damaged sofa frame be saved or does it need replacement?',
    answer: 'It depends on the extent of damage. If termites have eaten less than 30% of the frame, we can treat, fill, and reinforce the existing structure. If 30-60% is damaged, we replace the affected sections with new termite-resistant hardwood while preserving the rest. If more than 60% is eaten, a complete frame rebuild is more cost-effective. Our technician will give you an honest assessment during the free inspection. Frame repair costs ₹4,000-15,000 vs ₹15,000-25,000 for complete rebuild.',
    applicableTo: ['termite'],
  },
];

// ── Locations (re-export from generatedPagesConfig + add coordinates) ──

export interface SofaRepairLocation {
  id: string;
  name: string;
  slug: string;
  zone: string;
  priority: number;
  /** Nearby areas for SEO content */
  nearbyAreas: string[];
  /** Lat/Lng for schema */
  lat: number;
  lng: number;
}

export const sofaRepairLocations: SofaRepairLocation[] = [
  { id: 'andheri-west', name: 'Andheri West', slug: 'andheri-west', zone: 'western', priority: 1, nearbyAreas: ['Lokhandwala', 'Versova', 'Oshiwara', 'DN Nagar', 'Four Bungalows', 'Gilbert Hill', 'Yari Road'], lat: 19.1364, lng: 72.8296 },
  { id: 'andheri-east', name: 'Andheri East', slug: 'andheri-east', zone: 'western', priority: 1, nearbyAreas: ['Marol', 'Saki Naka', 'Chakala', 'MIDC', 'Andheri Station', 'JB Nagar', 'Sahar Road'], lat: 19.1197, lng: 72.8464 },
  { id: 'jogeshwari', name: 'Jogeshwari', slug: 'jogeshwari', zone: 'western', priority: 2, nearbyAreas: ['Oshiwara', 'Ram Mandir', 'Behram Baug', 'Gundavali', 'Jogeshwari East', 'SV Road'], lat: 19.1326, lng: 72.8497 },
  { id: 'goregaon', name: 'Goregaon', slug: 'goregaon', zone: 'western', priority: 1, nearbyAreas: ['Goregaon West', 'Goregaon East', 'Aarey Colony', 'Film City', 'Dindoshi', 'SV Road', 'Bangur Nagar'], lat: 19.1557, lng: 72.8495 },
  { id: 'malad', name: 'Malad', slug: 'malad', zone: 'western', priority: 1, nearbyAreas: ['Malad West', 'Malad East', 'Evershine Nagar', 'Orlem', 'Marve Road', 'Mindspace', 'Kurar Village'], lat: 19.1874, lng: 72.8484 },
  { id: 'kandivali', name: 'Kandivali', slug: 'kandivali', zone: 'western', priority: 2, nearbyAreas: ['Kandivali West', 'Kandivali East', 'Thakur Village', 'Mahavir Nagar', 'Charkop', 'Poisar', 'Samata Nagar'], lat: 19.2042, lng: 72.8527 },
  { id: 'borivali', name: 'Borivali', slug: 'borivali', zone: 'western', priority: 1, nearbyAreas: ['Borivali West', 'Borivali East', 'IC Colony', 'Shimpoli', 'LT Road', "Sanjay Gandhi National Park", 'Gorai'], lat: 19.2307, lng: 72.8567 },
  { id: 'dahisar', name: 'Dahisar', slug: 'dahisar', zone: 'western', priority: 2, nearbyAreas: ['Dahisar West', 'Dahisar East', 'Anand Nagar', 'Rawalpada', 'SV Road Dahisar', 'Mira-Bhayandar border'], lat: 19.2502, lng: 72.8625 },
  { id: 'bandra', name: 'Bandra', slug: 'bandra', zone: 'western', priority: 1, nearbyAreas: ['Bandra West', 'Bandra East', 'Pali Hill', 'Carter Road', 'Bandstand', 'Linking Road', 'Hill Road', 'Reclamation'], lat: 19.0596, lng: 72.8295 },
  { id: 'khar', name: 'Khar', slug: 'khar', zone: 'western', priority: 2, nearbyAreas: ['Khar West', 'Khar East', 'Khar Road', 'Linking Road Khar', 'SV Road Khar'], lat: 19.0713, lng: 72.8364 },
  { id: 'santacruz', name: 'Santacruz', slug: 'santacruz', zone: 'western', priority: 2, nearbyAreas: ['Santacruz West', 'Santacruz East', 'Kalina', 'Vakola', 'Nehru Road', 'Santacruz Market'], lat: 19.0841, lng: 72.8382 },
  { id: 'vile-parle', name: 'Vile Parle', slug: 'vile-parle', zone: 'western', priority: 2, nearbyAreas: ['Vile Parle West', 'Vile Parle East', 'Irla', 'Parle Point', 'Dixit Road', 'Hanuman Road'], lat: 19.0991, lng: 72.8433 },
  { id: 'juhu', name: 'Juhu', slug: 'juhu', zone: 'western', priority: 2, nearbyAreas: ['Juhu Beach', 'Juhu Tara Road', 'JVPD Scheme', 'Juhu Versova Link Road', 'Seven Bungalows'], lat: 19.1075, lng: 72.8263 },
  { id: 'versova', name: 'Versova', slug: 'versova', zone: 'western', priority: 3, nearbyAreas: ['Versova Beach', 'Seven Bungalows', 'Yari Road', 'JP Road', 'Four Bungalows'], lat: 19.1318, lng: 72.8172 },
  { id: 'lokhandwala', name: 'Lokhandwala', slug: 'lokhandwala', zone: 'western', priority: 2, nearbyAreas: ['Lokhandwala Complex', 'Oshiwara', 'New Link Road', 'Back Road', 'Andheri West'], lat: 19.1389, lng: 72.8279 },
  { id: 'oshiwara', name: 'Oshiwara', slug: 'oshiwara', zone: 'western', priority: 3, nearbyAreas: ['Oshiwara Village', 'New Link Road', 'Ram Mandir', 'Jogeshwari Link Road'], lat: 19.1354, lng: 72.8371 },
  { id: 'dadar', name: 'Dadar', slug: 'dadar', zone: 'central', priority: 1, nearbyAreas: ['Dadar West', 'Dadar East', 'Shivaji Park', 'Matunga', 'Prabhadevi', 'Hindmata', 'Naigaon'], lat: 19.0185, lng: 72.8425 },
  { id: 'sion', name: 'Sion', slug: 'sion', zone: 'central', priority: 2, nearbyAreas: ['Sion West', 'Sion East', 'Dharavi', "King's Circle", 'Sion Fort', 'Sion Hospital area'], lat: 19.0400, lng: 72.8622 },
  { id: 'matunga', name: 'Matunga', slug: 'matunga', zone: 'central', priority: 2, nearbyAreas: ['Matunga East', 'Matunga West', "King's Circle", 'Five Gardens', 'Maheshwari Udyan'], lat: 19.0272, lng: 72.8533 },
  { id: 'kurla', name: 'Kurla', slug: 'kurla', zone: 'central', priority: 1, nearbyAreas: ['Kurla West', 'Kurla East', 'BKC', 'Nehru Nagar', 'Chunabhatti', 'Tilak Nagar', 'LBS Marg'], lat: 19.0726, lng: 72.8794 },
  { id: 'ghatkopar', name: 'Ghatkopar', slug: 'ghatkopar', zone: 'central', priority: 2, nearbyAreas: ['Ghatkopar West', 'Ghatkopar East', 'Pant Nagar', 'Rajawadi', 'Amrut Nagar', 'LBS Marg'], lat: 19.0860, lng: 72.9081 },
  { id: 'vikhroli', name: 'Vikhroli', slug: 'vikhroli', zone: 'central', priority: 2, nearbyAreas: ['Vikhroli West', 'Vikhroli East', 'Kannamwar Nagar', 'Pirojshanagar', 'Tagore Nagar', 'Godrej Colony'], lat: 19.1060, lng: 72.9268 },
  { id: 'bhandup', name: 'Bhandup', slug: 'bhandup', zone: 'central', priority: 2, nearbyAreas: ['Bhandup West', 'Bhandup East', 'Nahur', 'Kanjurmarg', 'LBS Marg Bhandup', 'Sonapur'], lat: 19.1480, lng: 72.9378 },
  { id: 'mulund', name: 'Mulund', slug: 'mulund', zone: 'central', priority: 2, nearbyAreas: ['Mulund West', 'Mulund East', 'Mulund Colony', 'Dumping Road', 'LBS Marg Mulund', 'Nahur'], lat: 19.1726, lng: 72.9563 },
  { id: 'thane', name: 'Thane', slug: 'thane', zone: 'central', priority: 1, nearbyAreas: ['Thane West', 'Thane East', 'Ghodbunder Road', 'Pokhran Road', 'Majiwada', 'Naupada', 'Hiranandani Estate'], lat: 19.2183, lng: 72.9781 },
  { id: 'wadala', name: 'Wadala', slug: 'wadala', zone: 'central', priority: 2, nearbyAreas: ['Wadala East', 'Wadala West', 'BPT Colony', 'Antop Hill', 'Wadala Bridge'], lat: 19.0193, lng: 72.8631 },
  { id: 'chembur', name: 'Chembur', slug: 'chembur', zone: 'harbour', priority: 2, nearbyAreas: ['Chembur East', 'Chembur West', 'Chembur Colony', 'Tilak Nagar', 'RCF Colony', 'Diamond Garden'], lat: 19.0522, lng: 72.8994 },
  { id: 'navi-mumbai', name: 'Navi Mumbai', slug: 'navi-mumbai', zone: 'harbour', priority: 1, nearbyAreas: ['Vashi', 'Nerul', 'Belapur', 'Kharghar', 'Panvel', 'Airoli', 'Ghansoli', 'Kopar Khairane'], lat: 19.0330, lng: 73.0297 },
  { id: 'vashi', name: 'Vashi', slug: 'vashi', zone: 'harbour', priority: 2, nearbyAreas: ['Vashi Sector 1-30', 'Sanpada', 'Turbhe', 'Kopar Khairane', 'Vashi Bridge'], lat: 19.0771, lng: 72.9987 },
  { id: 'powai', name: 'Powai', slug: 'powai', zone: 'other', priority: 1, nearbyAreas: ['Hiranandani Gardens', 'Powai Lake', 'IIT Bombay', 'Chandivali', 'Saki Vihar Road', 'Nahar', 'Central Avenue'], lat: 19.1176, lng: 72.9060 },
  { id: 'mira-road', name: 'Mira Road', slug: 'mira-road', zone: 'other', priority: 2, nearbyAreas: ['Mira Road East', 'Mira Road West', 'Kashimira', 'Beverly Park', 'Sheetal Nagar', 'Pleasant Park'], lat: 19.2813, lng: 72.8723 },
  { id: 'bkc', name: 'BKC', slug: 'bkc', zone: 'other', priority: 2, nearbyAreas: ['Bandra Kurla Complex', 'MMRDA Grounds', 'Kalanagar', 'Bandra East'], lat: 19.0657, lng: 72.8706 },
];

// ── Master Page Services List ──────────────────────────────────────────

export const sofaRepairServices = [
  { name: 'Scratched Sofa Repair', description: 'Fix deep scratches, claw marks & surface abrasions on leather, rexine, and fabric sofas.', icon: '🔧' },
  { name: 'Faded Sofa Color Restoration', description: 'Restore faded, dull, and sun-damaged sofas to original color with professional re-dyeing.', icon: '🎨' },
  { name: 'Water Damage Repair', description: 'Fix watermarks, mold, swelling & structural damage from monsoon flooding and leaks.', icon: '💧' },
  { name: 'Termite Damage Treatment', description: 'Eliminate termites, repair eaten frames, and apply long-lasting anti-termite protection.', icon: '🐛' },
  { name: 'Sofa Re-Upholstery', description: 'Complete fabric or leather change with 200+ material options to choose from.', icon: '🛋️' },
  { name: 'Sofa Frame Rebuild', description: 'Structural frame repair, joint reinforcement, and complete wooden frame restoration.', icon: '🪵' },
  { name: 'Sofa Foam Replacement', description: 'Replace worn-out, sagging foam with high-density, long-lasting cushion foam.', icon: '☁️' },
  { name: 'Leather Sofa Conditioning', description: 'Premium leather care — cleaning, conditioning, crack repair, and protective coating.', icon: '✨' },
  { name: 'Sofa Spring Repair', description: 'Fix broken or sagging springs, replace spring systems for proper support and comfort.', icon: '🔩' },
  { name: 'Sofa Polishing Service', description: 'Wood frame polishing with PU, melamine, or duco finish options for a brand-new look.', icon: '💎' },
];

// ── Helper: Get FAQs for a specific problem ────────────────────────────

export function getFAQsForProblem(problemId: string): SofaRepairFAQ[] {
  return sofaRepairFAQs.filter(
    (faq) => faq.applicableTo.length === 0 || faq.applicableTo.includes(problemId)
  );
}

// ── Helper: Generate page URL for a location + problem combo ───────────

export function getSofaRepairPageUrl(
  locationSlug: string,
  problemSlug?: string
): string {
  if (!problemSlug) {
    return locationSlug === 'mumbai'
      ? '/sofa-repair-mumbai'
      : `/sofa-repair-${locationSlug}`;
  }
  return locationSlug === 'mumbai'
    ? `/${problemSlug}`
    : `/${problemSlug}-${locationSlug}`;
}

// ── Helper: Get all internal links for a page (for interlinking) ──────

export function getSofaRepairInternalLinks(
  currentProblemId?: string,
  currentLocationSlug?: string
): { label: string; url: string }[] {
  const links: { label: string; url: string }[] = [];

  // Link to master page
  if (currentLocationSlug !== 'mumbai' || currentProblemId) {
    links.push({ label: 'Sofa Repair Mumbai', url: '/sofa-repair-mumbai' });
  }

  // Link to other problem pages
  for (const problem of sofaRepairProblems) {
    if (problem.id !== currentProblemId) {
      links.push({
        label: `${problem.name} Mumbai`,
        url: `/${problem.slug}`,
      });
    }
  }

  // Link to a few key location pages
  const keyLocations = sofaRepairLocations.filter((l) => l.priority === 1).slice(0, 6);
  for (const loc of keyLocations) {
    if (loc.slug !== currentLocationSlug) {
      links.push({
        label: `Sofa Repair in ${loc.name}`,
        url: `/sofa-repair-${loc.slug}`,
      });
    }
  }

  return links.slice(0, 12); // Limit to 12 links
}
