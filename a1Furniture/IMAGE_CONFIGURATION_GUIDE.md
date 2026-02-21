# Image Configuration Guide

## Banner Images

### File: `src/components/HeroBanner.tsx`

Banner images are imported in the `slides` array (lines 14-29):

```typescript
const slides: Slide[] = [
  {
    desktop: '/media/banner/banner_2_desktop.webp',
    mobile: '/media/banner/banner_2_mobile.webp',
    badge: 'Starting From ₹1,299*',
    cta: 'Book Now',
    ctaLink: '/services',
  },
  {
    desktop: '/media/banner/banner_3_desktop.webp',
    mobile: '/media/banner/banner_3_mobile.webp',
    badge: 'Starting From ₹2,449*',
    cta: 'Explore Services',
    ctaLink: '/services',
  },
];
```

**Location:** `dist/media/banner/` or `public/media/banner/`
- `banner_2_desktop.webp` (1920×800px)
- `banner_2_mobile.webp` (800×600px)
- `banner_3_desktop.webp` (1920×800px)
- `banner_3_mobile.webp` (800×600px)

---

## Product Color Variants

### File: `src/components/ProductCard.tsx`

Color variants are handled in the `getImageForColor()` function (lines 28-60).

**How it works:**
1. User selects a color: Dark Brown, Light Brown, or White
2. The function transforms the image filename based on the selected color
3. Image paths follow naming conventions:
   - Dark: `darkWooden*` or `darkBrown*`
   - Light: `lightBrown*`
   - White: `white*`

**Example transformations:**
```
Original: /products/sofa/1_seater_sofa/darkWooden1seaterSofa.webp

Dark Brown:   /products/sofa/1_seater_sofa/darkWooden1seaterSofa.webp
Light Brown:  /products/sofa/1_seater_sofa/lightBrown1seaterSofa.webp
White:        /products/sofa/1_seater_sofa/white1seaterSofa.webp
```

### File: `src/data/productCatalog.ts`

Products are defined with their base images. Each product should have corresponding color variants in the same directory:

```typescript
{
  id: 'sofa-1-seater',
  name: '1 Seater Sofa',
  category: 'sofas',
  image: '/products/sofa/1_seater_sofa/darkWooden1seaterSofa.webp',  // Base image
  hoverImage: '/products/sofa/1_seater_sofa/lightBrowns1seater.webp', // Hover image
  startingPrice: 1449,
  serviceLink: '/services?service=sofa-1seater',
}
```

**Required file structure for each product:**
```
/products/[category]/[subcategory]/
  ├── darkWooden[ProductName].webp  (Dark Brown variant)
  ├── lightBrown[ProductName].webp  (Light Brown variant)
  └── white[ProductName].webp       (White variant)
```

---

## Popular Services Section

### File: `src/components/PopularServices.tsx`

Popular services now use images from `public/products/front_page_service_products/`:

```typescript
const services: ServiceItem[] = [
  { id: 'sofa', name: 'Sofa Polish', image: '/products/front_page_service_products/sofa_polish.webp', link: '/services?service=sofa-polish' },
  { id: 'bed', name: 'Bed Polish', image: '/products/front_page_service_products/bed_polish.webp', link: '/services?service=bed-polish' },
  { id: 'wardrobe', name: 'Wardrobe Polish', image: '/products/front_page_service_products/wardrobe_polish.webp', link: '/services?service=wardrobe-polish' },
  { id: 'door', name: 'Door Polish', image: '/products/front_page_service_products/door_polish.webp', link: '/services?service=door-polish' },
  { id: 'dining', name: 'Dining Set Polish', image: '/products/front_page_service_products/dining_set_polish.webp', link: '/services?service=dining-set-polish' },
  { id: 'table', name: 'Table Polish', image: '/products/front_page_service_products/table_polish.webp', link: '/services?service=table-polish' },
  { id: 'crockery', name: 'Crockery Polish', image: '/products/front_page_service_products/crokery_polish.webp', link: '/services?service=cabinet-polish' },
  { id: 'shelf', name: 'Shelve Polish', image: '/products/front_page_service_products/shelve_polish.webp', link: '/services?service=wooden-shelf-polish' },
  { id: 'tv-unit', name: 'TV Polish', image: '/products/front_page_service_products/tv_polish.webp', link: '/services?service=tv-unit-polish' },
  { id: 'jhula', name: 'Jhula Polish', image: '/products/front_page_service_products/jhula_polish.webp', link: '/services?service=jhula-polish' },
  { id: 'pu-polish', name: 'PU Polish', image: '/products/front_page_service_products/pu_polish_front.webp', link: '/wood-polishing-services' },
  { id: 'deco-paint', name: 'Deco Paint', image: '/products/front_page_service_products/deco_paint_front.webp', link: '/deco-paint-services' },
  { id: 'mandir', name: 'Mandir Polish', image: '/products/front_page_service_products/mandir_polish.webp', link: '/services?service=mandir-polish' },
  { id: 'antique', name: 'Antique Polish', image: '/products/front_page_service_products/antique_polish.png', link: '/services?service=antique-polish' },
];
```

**Image naming convention:**
- Filename: `[service_name]_polish.[ext]`
- Display name: Converts `antique_polish.png` → "Antique Polish"
- Converts `deco_paint_front.webp` → "Deco Paint"

**Available images in `public/products/front_page_service_products/`:**
- antique_polish.png
- bed_polish.webp
- crokery_polish.webp
- deco_paint_front.webp
- dining_set_polish.webp
- door_polish.webp
- jhula_polish.webp
- mandir_polish.webp
- pu_polish_front.webp
- shelve_polish.webp
- sofa_polish.webp
- table_polish.webp
- tv_polish.webp
- wardrobe_polish.webp

---

## Summary of Key Files

1. **Banner Images:** `src/components/HeroBanner.tsx` (lines 14-29)
2. **Product Color Variants:** `src/components/ProductCard.tsx` (lines 28-60)
3. **Product Catalog:** `src/data/productCatalog.ts` (defines all products)
4. **Popular Services:** `src/components/PopularServices.tsx` (lines 8-22)

---

## How to Add New Images

### Adding a new banner:
1. Place images in `public/media/banner/`
2. Update `slides` array in `src/components/HeroBanner.tsx`

### Adding a new product with color variants:
1. Create directory: `public/products/[category]/[subcategory]/`
2. Add three images: `darkWooden*.webp`, `lightBrown*.webp`, `white*.webp`
3. Add product to `src/data/productCatalog.ts`

### Adding a new popular service:
1. Place image in `public/products/front_page_service_products/`
2. Name it: `[service_name]_polish.[ext]`
3. Add entry to `services` array in `src/components/PopularServices.tsx`
