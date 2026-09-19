/**
 * Bed Repair SEO Pages Configuration
 * Master config for bed repair service pages across Mumbai locations
 *
 * Parent keyword: bed repair mumbai
 * Child keywords: scratched bed, faded bed, water damaged bed, termite damaged bed
 * Wood types: veneer, solid wood, teakwood, walnut, MDF, plywood
 * Target queries: bed repair near me, bed repair contact number, wooden bed polish
 */

// ── Problem Types ──────────────────────────────────────────────────────

export interface BedRepairProblem {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  heroTitle: string;
  description: string;
  problemDetail: string;
  causes: string[];
  signs: string[];
  repairSteps: { title: string; description: string }[];
  images: { hero: string; before: string; after: string; process: string };
  priceRange: string;
  startingPrice: number;
  primaryKeyword: string;
  secondaryKeywords: string[];
  badgeColor: string;
}

export const bedRepairProblems: BedRepairProblem[] = [
  {
    id: 'scratched',
    slug: 'scratched-bed-repair',
    name: 'Scratched Bed Repair',
    shortName: 'Scratched',
    heroTitle: 'Scratched Bed? We\'ll Make It Flawless Again',
    description:
      'Professional scratched bed repair service in Mumbai. We remove deep scratches, scuff marks, and surface gouges from wooden beds — teakwood, veneer, plywood, MDF, walnut, and solid wood frames — using expert restoration techniques.',
    problemDetail:
      'Bed scratches are one of the most common wooden furniture problems faced by Mumbai households. Shifting the bed during cleaning, dragging heavy items like suitcases across the frame, accidental bumps from vacuum cleaners, children jumping and playing, and even normal daily use gradually leave visible scratch marks on bed frames, headboards, and footboards. On veneer beds, scratches expose the MDF or plywood base underneath, destroying the premium look. On solid teakwood beds, deep scratches break the polish layer and expose raw wood that absorbs Mumbai\'s humid air, leading to discoloration and swelling. Plywood beds develop splintering around scratches. Even high-quality walnut beds lose their elegance when surface scratches accumulate over time. Most families ignore minor scratches until they multiply and make the bed look old and beaten — but early professional repair is far cheaper than waiting until re-polishing the entire bed becomes necessary.',
    causes: [
      'Dragging the bed during house cleaning or rearranging',
      'Suitcases, boxes, and heavy items scraping the frame',
      'Children playing, jumping, and hitting the headboard',
      'Pets clawing at wooden bed legs and frame',
      'Belt buckles, zippers, and jewellery scratching the surface',
      'Vacuum cleaner and mop handle impacts',
      'Professional movers damaging beds during relocation',
    ],
    signs: [
      'Visible white or light-colored scratch lines on polished wood',
      'Veneer peeling or chipping around scratch marks',
      'Exposed raw wood or MDF base material showing through',
      'Rough texture when running hand along the bed frame',
      'Multiple fine scratch lines accumulated over years',
      'Paint or polish flaking along deep gouges',
      'Discoloration around old, untreated scratches',
    ],
    repairSteps: [
      { title: 'Damage Assessment', description: 'Our expert inspects scratch depth, wood type (teakwood, veneer, MDF, plywood, walnut, or solid wood), and the extent of damage. We photograph everything and provide a transparent estimate.' },
      { title: 'Surface Preparation', description: 'The scratched area is cleaned and degreased. Old, loose polish around the scratch is carefully removed. Fine sanding with 220-400 grit paper smooths the edges.' },
      { title: 'Scratch Filling & Repair', description: 'Deep scratches are filled with color-matched wood filler or hard wax sticks. Veneer damage is patched with matching veneer strips. Multiple thin layers ensure an invisible repair.' },
      { title: 'Color Matching & Touch-Up', description: 'We use our library of 500+ wood stain shades to match the exact original color. Professional airbrushing blends the repaired area seamlessly with the surrounding wood.' },
      { title: 'Polish & Protective Seal', description: 'A matching polish finish (PU, melamine, or lacquer) is applied and buffed. A protective clear coat guards against future scratches and extends bed life by years.' },
    ],
    images: {
      hero: '/assets/Antique Restoration.jpg',
      before: '/assets/Antique Restoration.jpg',
      after: '/assets/Antique Restoration.jpg',
      process: '/assets/Antique Restoration.jpg',
    },
    priceRange: '\u20B91,500 – \u20B910,000',
    startingPrice: 1500,
    primaryKeyword: 'scratched bed repair',
    secondaryKeywords: [
      'bed scratch repair near me',
      'wooden bed scratch removal',
      'bed frame scratch fix',
      'headboard scratch repair',
      'bed polish scratch repair',
      'wood furniture scratch repair',
    ],
    badgeColor: 'red',
  },
  {
    id: 'faded',
    slug: 'faded-bed-repair',
    name: 'Faded / Dull Bed Repair',
    shortName: 'Faded / Dull',
    heroTitle: 'Faded Bed? Restore the Original Rich Finish',
    description:
      'Expert faded and dull bed restoration service. We bring back the original color, grain beauty, and glossy finish to sun-damaged, aged, and worn-out wooden beds using professional re-polishing and staining techniques.',
    problemDetail:
      'Bed fading is an extremely widespread problem in Mumbai apartments where bedroom windows let in harsh sunlight for hours every day. UV radiation slowly breaks down the polish layer on wooden beds, causing teakwood to turn grayish, veneer to bleach and yellow, walnut to lose its rich dark tone, and painted MDF beds to chalk and peel. The effect is worst on the side of the bed facing the window — you\'ll notice one side is noticeably lighter than the other. Mumbai\'s relentless humidity compounds the issue by causing polish to cloud, crack, and lose its sheen. Even bedside tables and headboards directly under reading lamps develop concentrated fading spots. Polished solid wood beds that once looked stunning gradually become dull and lifeless. Most people assume this means the bed is "old" and needs replacing — but in reality, professional re-polishing can bring back 95% of the original beauty for a fraction of the cost of a new bed.',
    causes: [
      'Direct sunlight hitting the bed through bedroom windows',
      'UV radiation from both natural and artificial lighting',
      'Mumbai humidity causing polish to cloud and crack',
      'Chemical cleaning sprays stripping the polish layer',
      'Natural aging and oxidation of wood finish over 5-10 years',
      'Body heat and sweat contact degrading headboard finish',
      'Low-quality original polish that deteriorates quickly',
    ],
    signs: [
      'Uneven color — the window-facing side is lighter',
      'Dull, matte appearance on once-glossy polished wood',
      'Visible difference between headboard and footboard color',
      'Cloudy or whitish haze on the polish surface',
      'Wood grain appears washed out and lifeless',
      'Polish cracking or developing fine crazing lines',
      'Yellowing of originally clear-coated light wood',
    ],
    repairSteps: [
      { title: 'Wood & Finish Analysis', description: 'We identify the exact wood type, original polish type (PU, melamine, lacquer, or natural oil), and degree of fading. Our color library matches 500+ wood shades.' },
      { title: 'Surface Stripping & Cleaning', description: 'Old, damaged polish is carefully stripped using eco-friendly removers. The bare wood is thoroughly cleaned, degreased, and lightly sanded to a perfect smooth base.' },
      { title: 'Wood Staining & Color Restoration', description: 'Premium wood stain matched to the original shade is applied in multiple coats for rich, even color penetration. Grain patterns are enhanced and highlighted.' },
      { title: 'Re-Polishing with Premium Finish', description: 'Multiple coats of high-grade PU, melamine, or natural oil finish are applied with professional spray equipment for a factory-fresh appearance.' },
      { title: 'UV Protection & Final Buffing', description: 'UV-resistant top coat protects against future sun fading. Hand-buffing to the desired sheen level — matte, satin, or high gloss.' },
    ],
    images: {
      hero: '/assets/Antique Restoration.jpg',
      before: '/assets/Antique Restoration.jpg',
      after: '/assets/Antique Restoration.jpg',
      process: '/assets/Antique Restoration.jpg',
    },
    priceRange: '\u20B92,500 – \u20B915,000',
    startingPrice: 2500,
    primaryKeyword: 'faded bed repair',
    secondaryKeywords: [
      'dull bed restoration',
      'bed color restoration',
      'bed re-polishing service',
      'sun damaged bed repair',
      'wooden bed polish service',
      'bed polish renewal',
    ],
    badgeColor: 'amber',
  },
  {
    id: 'water-damaged',
    slug: 'water-damaged-bed-repair',
    name: 'Water Damaged Bed Repair',
    shortName: 'Water Damaged',
    heroTitle: 'Water Damaged Bed? We\'ll Rescue It',
    description:
      'Specialized water and moisture damaged bed repair in Mumbai. We fix watermarks, swelling, warping, mold, delamination, and structural damage caused by monsoon flooding, roof leaks, and humidity.',
    problemDetail:
      'Water damage is the most destructive force that can hit your wooden bed in Mumbai. Every monsoon season, thousands of beds suffer from ground-floor flooding, wall seepage, ceiling leaks, AC condensation dripping on headboards, and children spilling water bottles. The damage depends on wood type — plywood beds swell and delaminate as layers separate, veneer beds bubble and peel as the adhesive dissolves, MDF beds absorb water like a sponge and turn to pulp, teakwood beds develop dark water rings and warping, and solid wood beds crack as they absorb and then release moisture unevenly. The hidden danger is inside — mattress-level moisture creates the perfect breeding ground for mold and fungus between the bed platform and mattress, posing serious health risks including allergies, respiratory infections, and skin irritation. In Mumbai\'s 85%+ monsoon humidity, even minor water exposure on a bed can trigger mold growth within 24 hours. Professional water damage restoration is critical — DIY drying with fans simply cannot extract moisture trapped deep inside wooden joints and underneath the platform.',
    causes: [
      'Monsoon flooding in ground-floor Mumbai apartments',
      'Water seepage through bedroom walls during heavy rains',
      'Ceiling and roof leaks dripping directly onto beds',
      'AC condensation pipe leaking near the headboard',
      'Children spilling water bottles and drinks on the frame',
      'Plumbing leaks from bathrooms adjacent to bedrooms',
      'Persistent 85%+ humidity warping untreated wood',
    ],
    signs: [
      'Dark water rings or stains on the bed frame',
      'Veneer bubbling, peeling, or lifting from the base',
      'Plywood layers separating and delaminating',
      'MDF sections soft, swollen, or crumbling when pressed',
      'Musty, moldy smell from the bed platform area',
      'Visible mold spots between platform slats and mattress',
      'Bed frame warped — gaps where joints used to be tight',
      'Drawers stuck or not closing properly due to swelling',
    ],
    repairSteps: [
      { title: 'Emergency Assessment', description: 'We prioritize water damage calls. Our team assesses moisture levels with professional meters, checks for mold, evaluates structural damage, and creates an urgent rescue plan.' },
      { title: 'Industrial Drying & Extraction', description: 'Using industrial dehumidifiers and hot-air systems, we extract trapped moisture from plywood layers, MDF cores, joints, and hidden cavities. This prevents further mold and swelling.' },
      { title: 'Mold Treatment & Sanitization', description: 'Anti-fungal treatment eliminates mold at the root — critical for the bed platform where your mattress sits. UV sanitization kills remaining bacteria and eliminates musty odors permanently.' },
      { title: 'Structural Repair & Replacement', description: 'Warped wood is reshaped under controlled conditions. Delaminated plywood is re-bonded or replaced. Swollen MDF sections are cut out and replaced. Loose joints are re-glued with waterproof adhesive.' },
      { title: 'Re-Polishing & Waterproofing', description: 'Complete re-polishing matched to original finish. A marine-grade waterproof sealant is applied to all surfaces — especially joints and the underside — to guard against future water damage.' },
    ],
    images: {
      hero: '/assets/Antique Restoration.jpg',
      before: '/assets/Antique Restoration.jpg',
      after: '/assets/Antique Restoration.jpg',
      process: '/assets/Antique Restoration.jpg',
    },
    priceRange: '\u20B93,500 – \u20B920,000',
    startingPrice: 3500,
    primaryKeyword: 'water damaged bed repair',
    secondaryKeywords: [
      'moisture damaged bed repair',
      'bed mold removal service',
      'monsoon bed damage repair',
      'watermark bed fix',
      'bed water stain removal',
      'flood damaged bed repair',
    ],
    badgeColor: 'blue',
  },
  {
    id: 'termite',
    slug: 'termite-damaged-bed-repair',
    name: 'Termite Damaged Bed Repair',
    shortName: 'Termite Damaged',
    heroTitle: 'Termite Damaged Bed? Stop the Destruction Now',
    description:
      'Complete termite damage bed repair and treatment. We eliminate active termite colonies, repair eaten frames, replace destroyed wood, and apply long-lasting anti-termite protection with 5-year warranty.',
    problemDetail:
      'Termite damage in beds is one of the most alarming and expensive furniture problems in Mumbai. The city\'s warm, humid tropical climate supports massive termite populations — both subterranean termites that travel through mud tubes from soil, and drywood termites that attack from within. Beds are prime targets because they sit in one place for years, often against walls where termite colonies travel. The real danger is that termites eat from the inside out — the outer surface can look perfectly fine while the interior is hollow sawdust. A termite colony can completely destroy a bed\'s structural legs, side rails, headboard frame, and platform slats within 6-8 months. Plywood beds are especially vulnerable as termites devour the inner layers while the outer veneer hides the damage. Even teakwood, known for natural resistance, can be attacked by large subterranean colonies. The worst nightmare is a bed frame collapsing during the night because termites have eaten through the load-bearing legs. In Mumbai, infestations spike during May-September when pre-monsoon soil moisture drives colonies indoors seeking dry wood. Over 55% of ground-floor and 35% of upper-floor apartments in Mumbai report termite issues in furniture.',
    causes: [
      'Mumbai\'s warm, humid climate supporting massive termite populations',
      'Ground-floor apartments with direct soil contact',
      'Bed placed against wall with existing termite colony',
      'Softwood frames (pine, mango, sheesham) used in budget beds',
      'Monsoon moisture driving termites indoors seeking dry wood',
      'Untreated or poorly finished internal wood components',
      'Adjacent infested furniture spreading colonies to the bed',
    ],
    signs: [
      'Fine sawdust (frass) piles near bed legs or on the floor',
      'Hollow sound when tapping bed legs or frame with knuckles',
      'Small mud tubes running up bed legs from floor',
      'Bed legs feel soft, spongy, or crumble when squeezed',
      'Tiny pin-hole sized exit holes on wooden surfaces',
      'Sudden wobbling, creaking, or structural weakness',
      'Wings or dead termite bodies found near the bed area',
      'Bed platform sagging in sections where slats are eaten',
    ],
    repairSteps: [
      { title: 'Comprehensive Termite Scan', description: 'Professional inspection using tapping tests, moisture meters, and visual analysis to map all active colonies, tunnel networks, and full extent of structural damage in the bed.' },
      { title: 'Colony Elimination', description: 'Targeted anti-termite gel and chemical treatment (fipronil/imidacloprid-based) injected directly into tunnels and colonies. Soil treatment around the bed area to cut off subterranean access routes.' },
      { title: 'Damaged Wood Removal', description: 'All termite-eaten wood is carefully removed. Each component — legs, rails, headboard, platform — is individually assessed. Salvageable sections are marked; destroyed ones are removed for replacement.' },
      { title: 'Frame Rebuild with Resistant Wood', description: 'Destroyed sections replaced with termite-resistant hardwood (teak or sal). Load-bearing legs reinforced with metal brackets. All joints re-glued with marine-grade adhesive for maximum structural integrity.' },
      { title: 'Anti-Termite Treatment & Polish', description: 'Entire bed frame treated with professional-grade anti-termite solution. Premium wood polish (PU or melamine) applied as final protective barrier. 5-year anti-termite warranty included.' },
    ],
    images: {
      hero: '/assets/Antique Restoration.jpg',
      before: '/assets/Antique Restoration.jpg',
      after: '/assets/Antique Restoration.jpg',
      process: '/assets/Antique Restoration.jpg',
    },
    priceRange: '\u20B94,500 – \u20B928,000',
    startingPrice: 4500,
    primaryKeyword: 'termite damaged bed repair',
    secondaryKeywords: [
      'termite bed treatment',
      'anti termite bed service',
      'wooden bed termite repair',
      'termite furniture treatment mumbai',
      'termite damaged bed restoration',
      'bed frame termite repair',
    ],
    badgeColor: 'orange',
  },
];

// ── Wood Types ─────────────────────────────────────────────────────────

export interface BedWoodType {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  heroTitle: string;
  description: string;
  detail: string;
  characteristics: string[];
  commonIssues: string[];
  repairApproach: string;
  polishTypes: string[];
  images: { hero: string };
  priceRange: string;
  startingPrice: number;
  primaryKeyword: string;
  secondaryKeywords: string[];
}

export const bedWoodTypes: BedWoodType[] = [
  {
    id: 'veneer',
    slug: 'veneer-bed-polish',
    name: 'Veneer Bed Polish & Repair',
    shortName: 'Veneer',
    heroTitle: 'Veneer Bed Polish — Expert Repair & Restoration',
    description:
      'Professional veneer bed polishing and repair service in Mumbai. We fix peeling veneer, scratches, water damage, edge chipping, and fading on all veneer bed types with seamless color-matched restoration.',
    detail:
      'Veneer beds are the most popular choice in Mumbai homes due to their premium look at affordable prices. A thin sheet (0.5-3mm) of decorative wood — teak, walnut, oak, or rosewood — is bonded to an MDF, plywood, or particleboard base. While veneer beds look stunning when new, they are highly susceptible to damage from Mumbai\'s humidity, water spills, and everyday wear. The veneer sheet can peel, bubble, or lift when the underlying adhesive weakens due to moisture. Scratches on veneer beds are more visible and damaging because the decorative layer is so thin — one deep scratch can expose the plain base material. Edge chipping is extremely common on veneer beds, especially around headboard corners and side rail edges. The good news is that professional veneer bed repair can restore the appearance completely — including veneer patch replacement, edge re-bonding, and matched re-polishing — at a fraction of replacement cost.',
    characteristics: [
      'Thin decorative wood layer (0.5-3mm) on MDF/plywood base',
      'Available in teak, walnut, oak, rosewood, and maple patterns',
      'Smooth, uniform grain pattern with consistent finish',
      'Lightweight compared to solid wood',
      'Prone to peeling, bubbling, and edge damage in humidity',
    ],
    commonIssues: [
      'Veneer peeling and lifting from base material',
      'Bubbling due to moisture penetration',
      'Edge chipping on headboard and side rails',
      'Scratches exposing the plain base underneath',
      'Color fading from sunlight exposure',
      'Delamination from Mumbai\'s monsoon humidity',
    ],
    repairApproach:
      'We carefully re-bond lifted veneer using heat-activated adhesive, patch damaged sections with matching veneer strips, fill chips and scratches with color-matched filler, and apply a premium clear coat to protect against future humidity damage.',
    polishTypes: ['PU Polish', 'Melamine Polish', 'NC Lacquer'],
    images: { hero: '/assets/Antique Restoration.jpg' },
    priceRange: '\u20B92,000 – \u20B912,000',
    startingPrice: 2000,
    primaryKeyword: 'veneer bed polish',
    secondaryKeywords: [
      'veneer bed repair mumbai',
      'veneer furniture polish',
      'veneer peeling repair',
      'veneer bed restoration',
      'veneer wood polish service',
    ],
  },
  {
    id: 'solid-wood',
    slug: 'solid-wood-bed-polish',
    name: 'Solid Wood Bed Polish & Repair',
    shortName: 'Solid Wood',
    heroTitle: 'Solid Wood Bed Polish — Premium Restoration',
    description:
      'Premium solid wood bed polishing and repair service in Mumbai. We restore scratched, faded, and damaged solid wood beds — sheesham, mango, rubber wood, and imported hardwoods — with expert craftsmanship.',
    detail:
      'Solid wood beds are investments that can last generations when properly maintained. Unlike veneer or engineered wood, solid wood beds are made entirely from natural timber — sheesham (Indian rosewood), mango wood, rubber wood, acacia, or imported hardwoods. Their natural beauty comes from unique grain patterns that cannot be replicated. However, solid wood beds face specific challenges in Mumbai\'s climate. Humidity causes expansion and contraction cycles that lead to cracks, warping, and joint loosening over time. Direct sunlight fades the natural color and dries out the wood oils. Without regular polishing and maintenance, solid wood loses its lustre and develops a dull, neglected appearance. The beauty of solid wood beds is that they can be sanded down and completely refinished multiple times — unlike veneer beds that can only be repaired on the surface. Professional re-polishing of a solid wood bed brings back the deep, rich grain beauty and restores it to showroom condition.',
    characteristics: [
      '100% natural timber — no base material or layering',
      'Unique, irreplaceable grain patterns',
      'Extremely durable — lasts 25-50+ years with care',
      'Can be sanded and refinished multiple times',
      'Heavier and more expensive than engineered alternatives',
    ],
    commonIssues: [
      'Cracking and splitting from humidity cycles',
      'Joint loosening and structural wobbling',
      'Surface fading and color loss from sunlight',
      'Deep scratches and dents from daily use',
      'Wood drying out and losing natural oils',
      'Warping in Mumbai\'s extreme humidity',
    ],
    repairApproach:
      'We sand the entire bed to remove old polish, fill cracks and dents with matching wood filler, re-stain to restore original color depth, and apply multiple coats of premium PU or natural oil finish for lasting protection.',
    polishTypes: ['PU Polish', 'Natural Oil Finish', 'French Polish', 'Tung Oil'],
    images: { hero: '/assets/Antique Restoration.jpg' },
    priceRange: '\u20B93,000 – \u20B918,000',
    startingPrice: 3000,
    primaryKeyword: 'solid wood bed polish',
    secondaryKeywords: [
      'solid wood bed repair mumbai',
      'solid wood furniture polish',
      'sheesham bed polish',
      'solid wood bed restoration',
      'hardwood bed refinishing',
    ],
  },
  {
    id: 'teakwood',
    slug: 'teakwood-bed-polish',
    name: 'Teakwood Bed Polish & Repair',
    shortName: 'Teakwood',
    heroTitle: 'Teakwood Bed Polish — Restore the Royal Finish',
    description:
      'Specialist teakwood bed polishing and repair service in Mumbai. We restore the rich golden-brown finish, repair cracks, fix termite damage, and apply premium teak oil treatment for long-lasting protection.',
    detail:
      'Teakwood (Tectona grandis) beds are considered the gold standard of Indian furniture — prized for their rich golden-brown color, beautiful grain, natural oil content, and exceptional durability. Old teakwood beds passed down through generations are treasured family heirlooms. However, even teak\'s natural resistance has limits. Over decades, the original polish wears thin, the natural oils evaporate, and the once-rich color fades to a grayish-brown. Mumbai\'s climate creates a unique challenge — the extreme humidity causes teak to expand during monsoon and contract in winter, leading to hairline cracks and joint stress. Dust, pollution, and cooking oil vapors settle on teak surfaces, creating a grime layer that dulls the appearance. Many families don\'t realize that their dull-looking teak bed is hiding gorgeous wood underneath — professional stripping and re-polishing reveals the original beauty. Teak beds are the most rewarding to restore because the natural grain is always stunning once the old finish is removed and fresh polish is applied.',
    characteristics: [
      'Rich golden-brown color that deepens with age',
      'Natural oil content providing inherent moisture resistance',
      'Extremely durable — teak beds can last 50-100+ years',
      'Natural resistance to termites (though not immune to large colonies)',
      'High resale and heirloom value',
    ],
    commonIssues: [
      'Golden color fading to grayish-brown over decades',
      'Natural oils drying out from age and sun exposure',
      'Fine cracks from humidity expansion-contraction cycles',
      'Old, accumulated grime dulling the surface',
      'Joint loosening as the wood moves seasonally',
      'Previous amateur polish jobs with wrong products',
    ],
    repairApproach:
      'We carefully strip old polish, sand to reveal fresh teak underneath, apply traditional teak oil treatment to replenish natural oils, fill cracks with teak-specific filler, and finish with premium PU polish or natural tung oil for a stunning restoration.',
    polishTypes: ['PU Polish', 'Teak Oil Finish', 'Natural Beeswax', 'Tung Oil', 'Danish Oil'],
    images: { hero: '/assets/Antique Restoration.jpg' },
    priceRange: '\u20B94,000 – \u20B922,000',
    startingPrice: 4000,
    primaryKeyword: 'teakwood bed polish',
    secondaryKeywords: [
      'teak bed polish mumbai',
      'teakwood furniture polish',
      'teak wood bed repair',
      'old teak bed restoration',
      'teak bed refinishing service',
    ],
  },
  {
    id: 'walnut',
    slug: 'walnut-bed-polish',
    name: 'Walnut Bed Polish & Repair',
    shortName: 'Walnut',
    heroTitle: 'Walnut Bed Polish — Rich Dark Finish Restored',
    description:
      'Professional walnut bed polishing and repair service in Mumbai. We restore the signature dark chocolate color, repair scratches and dents, and protect walnut beds with premium finish for lasting elegance.',
    detail:
      'Walnut is one of the most sought-after woods for premium bedroom furniture due to its rich, dark chocolate-brown color, straight grain with occasional swirls, and sophisticated appearance. Both Indian walnut (Juglans regia, from Kashmir and Himachal) and American walnut (Black Walnut) beds command premium prices and require specialized care. The biggest challenge with walnut beds in Mumbai is maintaining the deep, rich dark color — sunlight fades walnut faster than most other woods, turning it from luxurious dark brown to a washed-out tan. Walnut is also softer than teak, making it more prone to dents and scratches. Humidity causes walnut to move more than denser hardwoods, sometimes creating gaps at joints. When walnut beds fade and lose their distinctive dark tone, the entire bedroom loses its premium feel. Professional walnut bed restoration focuses on restoring that signature rich, warm darkness through specialized dark walnut stains and multiple coats of protective finish.',
    characteristics: [
      'Rich dark chocolate-brown to purplish-brown color',
      'Straight grain with beautiful occasional swirls and knots',
      'Medium hardness — softer than teak, harder than pine',
      'Lightweight for its strength',
      'Fades faster than teak when exposed to sunlight',
    ],
    commonIssues: [
      'Signature dark color fading to tan or light brown',
      'Surface dents and scratches (softer than teak)',
      'Joint gaps developing from humidity cycles',
      'Polish clouding and losing depth of color',
      'Ring marks from cups and glasses on nightstands',
      'Swirl grain areas being harder to refinish evenly',
    ],
    repairApproach:
      'We sand and strip old finish, apply specialized dark walnut stain to restore the signature deep color, fill dents and scratches with walnut-matched filler, and seal with UV-protective PU polish to prevent future fading.',
    polishTypes: ['PU Polish', 'Natural Oil Finish', 'Dark Walnut Stain + Lacquer'],
    images: { hero: '/assets/Antique Restoration.jpg' },
    priceRange: '\u20B93,500 – \u20B920,000',
    startingPrice: 3500,
    primaryKeyword: 'walnut bed polish',
    secondaryKeywords: [
      'walnut bed repair mumbai',
      'walnut wood polish service',
      'walnut furniture restoration',
      'dark wood bed polish',
      'walnut bed refinishing',
    ],
  },
  {
    id: 'mdf',
    slug: 'mdf-bed-repair',
    name: 'MDF Bed Repair & Polish',
    shortName: 'MDF',
    heroTitle: 'MDF Bed Repair — Fix Swelling, Chipping & Damage',
    description:
      'Specialist MDF bed repair service in Mumbai. We fix water swelling, edge chipping, laminate peeling, surface damage, and structural issues in MDF beds using professional restoration techniques.',
    detail:
      'MDF (Medium Density Fibreboard) beds are one of the most common types in Mumbai apartments due to their smooth finish, versatile design options, and budget-friendly pricing. MDF is made from compressed wood fibers bonded with resin — creating a uniform, grainless surface perfect for painted and laminated finishes. However, MDF has a critical weakness in Mumbai\'s climate: it absorbs water like a sponge. Even minor moisture exposure causes MDF to swell, crumble, and lose structural integrity — and unlike solid wood, the damage is often irreversible once swelling occurs. Edge chipping is extremely common on MDF beds because the material crumbles easily when impacted. Laminate peeling on MDF bed surfaces is a frequent complaint during monsoon season when humidity weakens the adhesive. Despite these challenges, MDF beds can be professionally repaired in most cases — swollen sections can be replaced, edges can be re-profiled and re-laminated, and the entire surface can be repainted or re-laminated to look brand new.',
    characteristics: [
      'Uniform, grainless surface — perfect for smooth finishes',
      'Budget-friendly and widely available in Mumbai stores',
      'Available in painted, laminated, and veneered options',
      'Smooth and consistent for modern, sleek bed designs',
      'Critical weakness: absorbs water rapidly and irreversibly swells',
    ],
    commonIssues: [
      'Water swelling — edges and bottom sections expanding',
      'Edge chipping and crumbling at corners and joins',
      'Laminate or paint peeling in monsoon humidity',
      'Surface bubbling from moisture underneath',
      'Screw holes loosening as MDF degrades around fasteners',
      'Bottom panels sagging from mattress weight over years',
    ],
    repairApproach:
      'We cut out and replace swollen MDF sections, re-profile and reinforce edges with hardwood strips or metal edging, re-laminate surfaces with matching material, and apply moisture-resistant sealant to protect against future water damage.',
    polishTypes: ['Duco Paint', 'Laminate Overlay', 'PU Polish', 'Acrylic Finish'],
    images: { hero: '/assets/Antique Restoration.jpg' },
    priceRange: '\u20B91,500 – \u20B98,000',
    startingPrice: 1500,
    primaryKeyword: 'mdf bed repair',
    secondaryKeywords: [
      'mdf bed repair mumbai',
      'mdf furniture repair',
      'mdf bed water damage',
      'mdf bed edge repair',
      'mdf laminate bed repair',
    ],
  },
  {
    id: 'plywood',
    slug: 'plywood-bed-repair',
    name: 'Plywood Bed Repair & Polish',
    shortName: 'Plywood',
    heroTitle: 'Plywood Bed Repair — Fix Delamination & Damage',
    description:
      'Professional plywood bed repair service in Mumbai. We fix delamination, warping, edge damage, water swelling, and surface wear on marine and commercial plywood beds using expert techniques.',
    detail:
      'Plywood beds represent the middle ground between solid wood and MDF — offering decent strength, moderate water resistance (especially marine plywood), and reasonable pricing. Plywood is made from thin wood layers (plies) glued perpendicular to each other, creating cross-grain strength. In Mumbai, plywood beds are extremely popular for modular bedroom furniture. However, even quality plywood faces challenges in Mumbai\'s climate. The most common problem is delamination — layers separating due to moisture penetrating through edges, screw holes, or surface scratches. Non-marine commercial-grade plywood is particularly vulnerable during monsoon. Edge wear is another common issue as the exposed ply layers are fragile. Warping occurs when one side absorbs more moisture than the other, causing the bed platform to bow. Surface scratches on laminated plywood beds are harder to touch up because the decorative layer is bonded to the plywood — unlike solid wood that can be sanded down. Professional plywood bed repair involves re-bonding delaminated layers, reinforcing edges, replacing damaged sections, and re-laminating or re-veneering surfaces.',
    characteristics: [
      'Cross-grain layered construction for strength',
      'Marine plywood offers better water resistance',
      'Mid-range pricing between MDF and solid wood',
      'Good screw-holding ability compared to MDF',
      'Can be laminated, veneered, or painted',
    ],
    commonIssues: [
      'Delamination — layers separating from moisture',
      'Edge damage and exposed ply layers',
      'Warping and bowing of bed platform',
      'Surface laminate peeling in monsoon',
      'Screw holes enlarging from repeated assembly',
      'Commercial-grade plywood crumbling at edges',
    ],
    repairApproach:
      'We re-bond delaminated plies using waterproof adhesive and clamping, replace severely damaged sections with matching plywood grade, reinforce edges with solid wood lipping, and re-laminate or re-veneer surfaces for a fresh appearance.',
    polishTypes: ['Laminate Overlay', 'Veneer + PU Polish', 'Duco Paint', 'Melamine'],
    images: { hero: '/assets/Antique Restoration.jpg' },
    priceRange: '\u20B92,000 – \u20B910,000',
    startingPrice: 2000,
    primaryKeyword: 'plywood bed repair',
    secondaryKeywords: [
      'plywood bed repair mumbai',
      'plywood furniture repair',
      'plywood delamination repair',
      'plywood bed water damage',
      'plywood bed polish service',
    ],
  },
];

// ── FAQ Data ───────────────────────────────────────────────────────────

export interface BedRepairFAQ {
  question: string;
  answer: string;
  applicableTo: string[];
}

export const bedRepairFAQs: BedRepairFAQ[] = [
  {
    question: 'How much does bed repair cost in Mumbai?',
    answer:
      'Bed repair costs in Mumbai depend on the type and extent of damage. Minor scratch repairs start at \u20B91,500, faded bed re-polishing starts at \u20B92,500, water damage repair starts at \u20B93,500, and termite damage repair starts at \u20B94,500. Complete bed refurbishment ranges from \u20B95,000\u2013\u20B928,000 depending on bed size, wood type, and damage severity. A1 Furniture Polish provides free home inspection and transparent pricing with no hidden charges.',
    applicableTo: [],
  },
  {
    question: 'How do I find bed repair near me in Mumbai?',
    answer:
      'A1 Furniture Polish is Mumbai\'s top-rated bed repair service with 4.9\u2605 rating from 500+ customers on Google. We serve 45+ locations across Mumbai, Thane, and Navi Mumbai. Call +91 8828709945 or WhatsApp us photos of your bed damage for a free estimate. Same-day service available in most locations.',
    applicableTo: [],
  },
  {
    question: 'What is the bed repair contact number for A1 Furniture Polish?',
    answer:
      'You can reach A1 Furniture Polish for bed repair at +91 8828709945 (call or WhatsApp). We respond within 30 minutes during business hours (9 AM \u2013 8 PM, 7 days a week). Send photos of your bed damage via WhatsApp for a quick, free estimate. Same-day service available across Mumbai.',
    applicableTo: [],
  },
  {
    question: 'Which wood polish is best for a wooden bed?',
    answer:
      'The best polish depends on the wood type: PU (Polyurethane) polish is best for teakwood and solid wood beds as it provides a hard, durable, moisture-resistant finish. Melamine polish works well for veneer and plywood beds at a lower cost. Natural oil finishes (tung oil, Danish oil) are ideal for antique teak beds where you want a traditional matte look. For MDF beds, Duco paint or laminate overlay is recommended. Our technician will recommend the optimal polish type during the free inspection.',
    applicableTo: [],
  },
  {
    question: 'How long does bed repair take?',
    answer:
      'Most bed repairs are completed within 1\u20134 days. Minor scratch touch-ups take a few hours (same-day). Full re-polishing takes 2\u20133 days (including drying). Water damage repair takes 3\u20134 days (includes deep drying). Termite treatment with structural repair takes 4\u20136 days. We work at your home for most repairs \u2014 only complete frame rebuilds require workshop service.',
    applicableTo: [],
  },
  {
    question: 'Is it worth repairing an old wooden bed or should I buy new?',
    answer:
      'Wooden bed repair is almost always worth it if the frame is solid. A good teakwood or hardwood bed frame lasts 30\u201350+ years \u2014 re-polishing or repairing damage costs 50\u201370% less than buying an equivalent new bed. Even plywood and MDF beds can be cost-effectively repaired if the main structure is sound. Only buy new if the frame is completely compromised. Our technician gives an honest assessment during the free inspection.',
    applicableTo: [],
  },
  {
    question: 'Do you provide wooden bed polish service at home?',
    answer:
      'Yes, A1 Furniture Polish provides 100% doorstep bed polish and repair service across Mumbai, Thane, and Navi Mumbai. Our professionals come to your home with all tools, materials, and equipment. We cover surrounding areas to prevent dust and mess. Home service is available 7 days a week from 9 AM to 8 PM.',
    applicableTo: [],
  },
  {
    question: 'Can deep scratches on a veneer bed be repaired?',
    answer:
      'Yes, even deep scratches that expose the MDF/plywood base underneath veneer can be professionally repaired. We use matching veneer patches for severe damage, color-matched fillers for moderate scratches, and professional touch-up markers for minor surface scratches. The repair is virtually invisible when done by our trained technicians. Cost starts at \u20B91,500.',
    applicableTo: ['scratched'],
  },
  {
    question: 'How to prevent bed scratches?',
    answer:
      'To prevent bed scratches: (1) Use felt pads under items placed on the bed frame, (2) Avoid dragging the bed during cleaning \u2014 lift instead, (3) Apply protective polish coating every 12\u201318 months, (4) Keep pet nails trimmed, (5) Use a bed cover or frame guard during house moving. Our protective coating service costs \u20B9500\u20131,500 and reduces scratch risk by 80%.',
    applicableTo: ['scratched'],
  },
  {
    question: 'Can a badly faded teakwood bed be restored to original color?',
    answer:
      'Absolutely! Teakwood responds beautifully to restoration. We strip the old faded polish, sand to reveal fresh teak underneath (which is always gorgeous), apply traditional teak oil to replenish natural oils, then finish with premium PU polish in your choice of shade. The result is typically 95\u201398% as good as a brand new teak bed. This is one of our most satisfying services.',
    applicableTo: ['faded'],
  },
  {
    question: 'What polish types are available for wooden bed re-polishing?',
    answer:
      'We offer: (1) PU Polish \u2014 most durable, best for daily-use beds, available in matte/satin/gloss. (2) Melamine \u2014 budget-friendly, good finish. (3) NC Lacquer \u2014 quick-drying, natural look. (4) French Polish \u2014 traditional hand-applied shellac for antiques. (5) Natural Oil \u2014 tung, Danish, or teak oil for a warm matte finish. (6) Duco Paint \u2014 for MDF beds needing solid color. Our technician recommends the best option for your bed\'s wood type.',
    applicableTo: ['faded'],
  },
  {
    question: 'My bed got wet in Mumbai monsoon rain. What should I do?',
    answer:
      'Act immediately: (1) Remove the mattress and stand it separately to air-dry, (2) Wipe all standing water from bed surfaces, (3) Remove bed drawers and leave them open, (4) Place fans for air circulation around the bed, (5) Do NOT place the wet mattress back on the bed, (6) Call A1 at +91 8828709945 for emergency water damage service. Mold can start in 24 hours in Mumbai humidity. Professional drying prevents irreversible swelling in MDF and plywood beds.',
    applicableTo: ['water-damaged'],
  },
  {
    question: 'Can water-damaged MDF or plywood beds be saved?',
    answer:
      'It depends on severity. If caught early (within 24\u201348 hours), professional drying can save most of the bed. Moderately swollen MDF sections need to be cut out and replaced with new MDF. Delaminated plywood can often be re-bonded with waterproof adhesive. Severely damaged sections are replaced. In most cases, 70\u201390% of the bed can be saved. Our team assesses honestly and only recommends repair when it\'s cost-effective.',
    applicableTo: ['water-damaged'],
  },
  {
    question: 'How do I know if my bed has termites?',
    answer:
      'Check for these 5 signs: (1) Fine sawdust near bed legs, especially on the floor each morning, (2) Tap wooden legs and frame \u2014 a hollow sound means internal damage, (3) Look for thin mud tubes running up legs from the floor, (4) Press wooden parts \u2014 if they feel soft or crumble, termites have eaten through, (5) Look for tiny wings or dead termites near the bed. If you notice even one sign, call immediately. A1 offers free termite inspection across Mumbai.',
    applicableTo: ['termite'],
  },
  {
    question: 'Is anti-termite treatment safe for beds we sleep on?',
    answer:
      'Yes, modern anti-termite treatments are safe for bedroom use. We use targeted gel-based and localized chemical treatments (fipronil/imidacloprid) that are low-toxicity and approved for residential indoor use. There is no fumigation with harmful gases. The treatment is odorless within 2\u20133 hours. We advise keeping the bed unused for 3\u20134 hours after treatment. Our treatment comes with a 5-year warranty.',
    applicableTo: ['termite'],
  },
  {
    question: 'Can a termite-damaged bed frame be saved?',
    answer:
      'In most cases, yes. If termites have eaten less than 30% of the frame, we treat, fill, and reinforce the existing structure. If 30\u201360% is damaged, we replace affected sections with termite-resistant hardwood (teak or sal) while preserving the rest. Only when more than 60% is destroyed do we recommend a complete frame rebuild. Our technician gives an honest assessment during the free inspection. Repair costs \u20B94,500\u201315,000 vs \u20B918,000\u201328,000 for complete rebuild.',
    applicableTo: ['termite'],
  },
];

// ── Locations (Top 17 high-priority Mumbai locations for ~96 total pages) ──

export interface BedRepairLocation {
  id: string;
  name: string;
  slug: string;
  zone: string;
  priority: number;
  nearbyAreas: string[];
  lat: number;
  lng: number;
}

export const bedRepairLocations: BedRepairLocation[] = [
  { id: 'andheri-west', name: 'Andheri West', slug: 'andheri-west', zone: 'western', priority: 1, nearbyAreas: ['Lokhandwala', 'Versova', 'Oshiwara', 'DN Nagar', 'Four Bungalows', 'Gilbert Hill', 'Yari Road'], lat: 19.1364, lng: 72.8296 },
  { id: 'andheri-east', name: 'Andheri East', slug: 'andheri-east', zone: 'western', priority: 1, nearbyAreas: ['Marol', 'Saki Naka', 'Chakala', 'MIDC', 'Andheri Station', 'JB Nagar', 'Sahar Road'], lat: 19.1197, lng: 72.8464 },
  { id: 'goregaon', name: 'Goregaon', slug: 'goregaon', zone: 'western', priority: 1, nearbyAreas: ['Goregaon West', 'Goregaon East', 'Aarey Colony', 'Film City', 'Dindoshi', 'SV Road', 'Bangur Nagar'], lat: 19.1557, lng: 72.8495 },
  { id: 'malad', name: 'Malad', slug: 'malad', zone: 'western', priority: 1, nearbyAreas: ['Malad West', 'Malad East', 'Evershine Nagar', 'Orlem', 'Marve Road', 'Mindspace', 'Kurar Village'], lat: 19.1874, lng: 72.8484 },
  { id: 'kandivali', name: 'Kandivali', slug: 'kandivali', zone: 'western', priority: 1, nearbyAreas: ['Kandivali West', 'Kandivali East', 'Thakur Village', 'Mahavir Nagar', 'Charkop', 'Poisar', 'Samata Nagar'], lat: 19.2042, lng: 72.8527 },
  { id: 'borivali', name: 'Borivali', slug: 'borivali', zone: 'western', priority: 1, nearbyAreas: ['Borivali West', 'Borivali East', 'IC Colony', 'Shimpoli', 'LT Road', 'Sanjay Gandhi National Park', 'Gorai'], lat: 19.2307, lng: 72.8567 },
  { id: 'bandra', name: 'Bandra', slug: 'bandra', zone: 'western', priority: 1, nearbyAreas: ['Bandra West', 'Bandra East', 'Pali Hill', 'Carter Road', 'Bandstand', 'Linking Road', 'Hill Road', 'Reclamation'], lat: 19.0596, lng: 72.8295 },
  { id: 'jogeshwari', name: 'Jogeshwari', slug: 'jogeshwari', zone: 'western', priority: 1, nearbyAreas: ['Oshiwara', 'Ram Mandir', 'Behram Baug', 'Gundavali', 'Jogeshwari East', 'SV Road'], lat: 19.1326, lng: 72.8497 },
  { id: 'vile-parle', name: 'Vile Parle', slug: 'vile-parle', zone: 'western', priority: 1, nearbyAreas: ['Vile Parle West', 'Vile Parle East', 'Irla', 'Parle Point', 'Dixit Road', 'Hanuman Road'], lat: 19.0991, lng: 72.8433 },
  { id: 'juhu', name: 'Juhu', slug: 'juhu', zone: 'western', priority: 1, nearbyAreas: ['Juhu Beach', 'Juhu Tara Road', 'JVPD Scheme', 'Juhu Versova Link Road', 'Seven Bungalows'], lat: 19.1075, lng: 72.8263 },
  { id: 'lokhandwala', name: 'Lokhandwala', slug: 'lokhandwala', zone: 'western', priority: 1, nearbyAreas: ['Lokhandwala Complex', 'Oshiwara', 'New Link Road', 'Back Road', 'Andheri West'], lat: 19.1389, lng: 72.8279 },
  { id: 'dadar', name: 'Dadar', slug: 'dadar', zone: 'central', priority: 1, nearbyAreas: ['Dadar West', 'Dadar East', 'Shivaji Park', 'Matunga', 'Prabhadevi', 'Hindmata', 'Naigaon'], lat: 19.0185, lng: 72.8425 },
  { id: 'kurla', name: 'Kurla', slug: 'kurla', zone: 'central', priority: 1, nearbyAreas: ['Kurla West', 'Kurla East', 'BKC', 'Nehru Nagar', 'Chunabhatti', 'Tilak Nagar', 'LBS Marg'], lat: 19.0726, lng: 72.8794 },
  { id: 'thane', name: 'Thane', slug: 'thane', zone: 'central', priority: 1, nearbyAreas: ['Thane West', 'Thane East', 'Ghodbunder Road', 'Pokhran Road', 'Majiwada', 'Naupada', 'Hiranandani Estate'], lat: 19.2183, lng: 72.9781 },
  { id: 'powai', name: 'Powai', slug: 'powai', zone: 'other', priority: 1, nearbyAreas: ['Hiranandani Gardens', 'Powai Lake', 'IIT Bombay', 'Chandivali', 'Saki Vihar Road', 'Nahar', 'Central Avenue'], lat: 19.1176, lng: 72.9060 },
  { id: 'navi-mumbai', name: 'Navi Mumbai', slug: 'navi-mumbai', zone: 'harbour', priority: 1, nearbyAreas: ['Vashi', 'Nerul', 'Belapur', 'Kharghar', 'Panvel', 'Airoli', 'Ghansoli', 'Kopar Khairane'], lat: 19.0330, lng: 73.0297 },
  { id: 'chembur', name: 'Chembur', slug: 'chembur', zone: 'harbour', priority: 1, nearbyAreas: ['Chembur East', 'Chembur West', 'Chembur Colony', 'Tilak Nagar', 'RCF Colony', 'Diamond Garden'], lat: 19.0522, lng: 72.8994 },
];

// ── Master Page Services List ──────────────────────────────────────────

export const bedRepairServices = [
  { name: 'Scratched Bed Repair', description: 'Fix deep scratches, scuff marks & gouges on all wooden bed types \u2014 teakwood, veneer, plywood, MDF.', icon: '\uD83D\uDD27' },
  { name: 'Faded Bed Re-Polishing', description: 'Restore faded, dull beds to original color and shine with professional stripping and re-polishing.', icon: '\uD83C\uDFA8' },
  { name: 'Water Damage Repair', description: 'Fix swelling, warping, mold & delamination from monsoon damage, leaks, and humidity.', icon: '\uD83D\uDCA7' },
  { name: 'Termite Damage Treatment', description: 'Eliminate termites, repair eaten frames, replace destroyed wood with 5-year warranty.', icon: '\uD83D\uDC1B' },
  { name: 'Veneer Bed Repair', description: 'Re-bond peeling veneer, fix chips and edge damage, restore laminate surfaces.', icon: '\uD83E\uDEB5' },
  { name: 'Teakwood Bed Polish', description: 'Premium teak oil treatment and PU polish restoration for antique and modern teak beds.', icon: '\u2728' },
  { name: 'MDF & Plywood Bed Repair', description: 'Fix swollen MDF, delaminated plywood, re-laminate surfaces, reinforce edges.', icon: '\uD83D\uDEE0\uFE0F' },
  { name: 'Bed Frame Structural Repair', description: 'Fix wobbly beds, loose joints, cracked rails, broken legs & platform reinforcement.', icon: '\uD83E\uDEB5' },
  { name: 'Headboard Restoration', description: 'Repair and refinish wooden, upholstered, and padded headboards.', icon: '\uD83D\uDECF\uFE0F' },
  { name: 'Complete Bed Refurbishment', description: 'Full bed restoration from structural repair to final polish \u2014 looks brand new.', icon: '\uD83D\uDC8E' },
];

// ── Helper Functions ───────────────────────────────────────────────────

export function getBedFAQsForProblem(problemId: string): BedRepairFAQ[] {
  return bedRepairFAQs.filter(
    (faq) => faq.applicableTo.length === 0 || faq.applicableTo.includes(problemId)
  );
}

export function getBedRepairPageUrl(
  locationSlug: string,
  problemSlug?: string
): string {
  if (!problemSlug) {
    return locationSlug === 'mumbai'
      ? '/bed-repair-mumbai'
      : `/bed-repair-${locationSlug}`;
  }
  return locationSlug === 'mumbai'
    ? `/${problemSlug}`
    : `/${problemSlug}-${locationSlug}`;
}

export function getBedRepairInternalLinks(
  currentProblemId?: string,
  currentLocationSlug?: string,
  currentWoodTypeId?: string
): { label: string; url: string }[] {
  const links: { label: string; url: string }[] = [];

  // Link to master page
  if (currentLocationSlug !== 'mumbai' || currentProblemId || currentWoodTypeId) {
    links.push({ label: 'Bed Repair Mumbai', url: '/bed-repair-mumbai' });
  }

  // Link to problem pages
  for (const prob of bedRepairProblems) {
    if (prob.id !== currentProblemId) {
      links.push({ label: `${prob.name} Mumbai`, url: `/${prob.slug}` });
    }
  }

  // Link to wood type pages
  for (const wood of bedWoodTypes) {
    if (wood.id !== currentWoodTypeId) {
      links.push({ label: wood.shortName + ' Bed Polish', url: `/${wood.slug}` });
    }
  }

  // Link to key location pages
  const keyLocs = bedRepairLocations.filter((l) => l.priority === 1).slice(0, 5);
  for (const loc of keyLocs) {
    if (loc.slug !== currentLocationSlug) {
      links.push({ label: `Bed Repair ${loc.name}`, url: `/bed-repair-${loc.slug}` });
    }
  }

  return links.slice(0, 14);
}
