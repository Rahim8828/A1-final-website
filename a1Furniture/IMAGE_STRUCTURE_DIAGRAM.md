# Image Structure Diagram

## Complete Image Organization

```
a1Furniture/
│
├── public/
│   ├── media/
│   │   └── banner/                          ← BANNER IMAGES
│   │       ├── banner_2_desktop.webp        (1920×800px)
│   │       ├── banner_2_mobile.webp         (800×600px)
│   │       ├── banner_3_desktop.webp        (1920×800px)
│   │       └── banner_3_mobile.webp         (800×600px)
│   │
│   └── products/
│       ├── front_page_service_products/     ← POPULAR SERVICES IMAGES
│       │   ├── antique_polish.png           → "Antique Polish"
│       │   ├── bed_polish.webp              → "Bed Polish"
│       │   ├── crokery_polish.webp          → "Crockery Polish"
│       │   ├── deco_paint_front.webp        → "Deco Paint"
│       │   ├── dining_set_polish.webp       → "Dining Set Polish"
│       │   ├── door_polish.webp             → "Door Polish"
│       │   ├── jhula_polish.webp            → "Jhula Polish"
│       │   ├── mandir_polish.webp           → "Mandir Polish"
│       │   ├── pu_polish_front.webp         → "PU Polish"
│       │   ├── shelve_polish.webp           → "Shelve Polish"
│       │   ├── sofa_polish.webp             → "Sofa Polish"
│       │   ├── table_polish.webp            → "Table Polish"
│       │   ├── tv_polish.webp               → "TV Polish"
│       │   └── wardrobe_polish.webp         → "Wardrobe Polish"
│       │
│       ├── sofa/                            ← PRODUCT COLOR VARIANTS
│       │   ├── 1_seater_sofa/
│       │   │   ├── darkWooden1seaterSofa.webp    (Dark Brown)
│       │   │   ├── lightBrown1seaterSofa.webp    (Light Brown)
│       │   │   └── white1seaterSofa.webp         (White)
│       │   ├── 2_seater/
│       │   │   ├── darkWooden2seatersofa.webp
│       │   │   ├── lightBrown2seaterSofa.webp
│       │   │   └── white2seaterSofa.webp
│       │   └── 3_seater/
│       │       ├── darkWooden3seatersofa.webp
│       │       ├── lightBrown3seatersofa.webp
│       │       └── white3seatersofa.webp
│       │
│       ├── bed/
│       │   ├── single_bed/
│       │   │   ├── darkWoodensinglebed.webp
│       │   │   ├── lightBrownsinglebed.webp
│       │   │   └── whitesinglebed.webp
│       │   ├── queen_bed/
│       │   │   ├── darkWoodenQueenSize.webp
│       │   │   ├── lightBrownQueen.webp
│       │   │   └── whiteQueen.webp
│       │   └── king_bed/
│       │       ├── darkWoodenKing.webp
│       │       ├── lightBrownKing.webp
│       │       └── whiteKing.webp
│       │
│       ├── dining_set/
│       ├── wardrobe/
│       ├── shelves/
│       ├── tv_units/
│       ├── doors/
│       ├── mandir/
│       └── antique/
│
└── src/
    ├── components/
    │   ├── HeroBanner.tsx                   ← Uses banner images
    │   ├── ProductCard.tsx                  ← Handles color variants
    │   └── PopularServices.tsx              ← Uses front_page_service_products
    │
    └── data/
        └── productCatalog.ts                ← Defines all products
```

---

## Image Flow Diagram

### 1. Banner Images Flow
```
User visits homepage
        ↓
HeroBanner.tsx loads
        ↓
Checks screen size
        ↓
    ┌───────┴───────┐
    ↓               ↓
Mobile          Desktop
(≤1024px)       (>1024px)
    ↓               ↓
banner_X_       banner_X_
mobile.webp     desktop.webp
    ↓               ↓
Auto-rotates every 5 seconds
```

### 2. Product Color Variant Flow
```
User views product card
        ↓
ProductCard.tsx renders
        ↓
Shows default: Dark Brown
        ↓
User clicks color button
        ↓
    ┌───────┼───────┐
    ↓       ↓       ↓
  Dark    Light   White
  Brown   Brown
    ↓       ↓       ↓
getImageForColor() transforms path
        ↓
darkWooden* → lightBrown* → white*
        ↓
Image updates with smooth transition
```

### 3. Popular Services Flow
```
User scrolls to Popular Services
        ↓
PopularServices.tsx loads
        ↓
Reads services array
        ↓
Maps each service to image
        ↓
    ┌───────────────┴───────────────┐
    ↓                               ↓
Mobile Layout                   Desktop Layout
(4-column grid)                 (7-column circular)
Square cards                    Circular images
    ↓                               ↓
Loads from front_page_service_products/
        ↓
sofa_polish.webp → "Sofa Polish"
bed_polish.webp → "Bed Polish"
...
```

---

## Color Variant Naming Pattern

```
Base Pattern: [colorPrefix][ProductName].webp

Examples:
┌─────────────────────────────────────────────────┐
│ Product: 1 Seater Sofa                          │
├─────────────────────────────────────────────────┤
│ Dark Brown:  darkWooden1seaterSofa.webp         │
│ Light Brown: lightBrown1seaterSofa.webp         │
│ White:       white1seaterSofa.webp              │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ Product: King Size Bed                          │
├─────────────────────────────────────────────────┤
│ Dark Brown:  darkWoodenKing.webp                │
│ Light Brown: lightBrownKing.webp                │
│ White:       whiteKing.webp                     │
└─────────────────────────────────────────────────┘

Color Prefixes:
• darkWooden or darkBrown → Dark Brown (#3E2723)
• lightBrown              → Light Brown (#8D6E63)
• white                   → White (#F5F5F5)
```

---

## Popular Services Naming Pattern

```
Pattern: [service_name]_polish.[ext]

File Name                    →  Display Name
─────────────────────────────────────────────────
sofa_polish.webp            →  Sofa Polish
bed_polish.webp             →  Bed Polish
wardrobe_polish.webp        →  Wardrobe Polish
door_polish.webp            →  Door Polish
dining_set_polish.webp      →  Dining Set Polish
table_polish.webp           →  Table Polish
crokery_polish.webp         →  Crockery Polish
shelve_polish.webp          →  Shelve Polish
tv_polish.webp              →  TV Polish
jhula_polish.webp           →  Jhula Polish
pu_polish_front.webp        →  PU Polish
deco_paint_front.webp       →  Deco Paint
mandir_polish.webp          →  Mandir Polish
antique_polish.png          →  Antique Polish

Conversion Rules:
1. Remove file extension
2. Replace underscores with spaces
3. Capitalize each word
4. Remove "_front" suffix if present
```

---

## Component Relationships

```
App.tsx
  │
  ├─→ Header.tsx
  │     └─→ (Category Bar - hidden on mobile)
  │
  └─→ Home.tsx
        │
        ├─→ MobileCategoryScroll.tsx (mobile only)
        │     └─→ Uses category images
        │
        ├─→ HeroBanner.tsx
        │     └─→ Uses banner images from /media/banner/
        │
        ├─→ TrustBadges.tsx
        │
        ├─→ ShopByCategories.tsx (desktop only)
        │     └─→ ProductCard.tsx (multiple)
        │           └─→ Uses product images with color variants
        │
        ├─→ PopularServices.tsx
        │     └─→ Uses images from front_page_service_products/
        │
        └─→ [Other sections...]
```

---

## Image Loading Priority

```
1. Banner Images (fetchPriority="high")
   ↓
2. Popular Services (lazy loading)
   ↓
3. Product Cards (lazy loading)
   ↓
4. Other Images (lazy loading)
```

---

## Responsive Breakpoints

```
Mobile:     < 768px
Tablet:     768px - 1023px
Desktop:    ≥ 1024px

Banner Aspect Ratios:
Mobile:     4:3  (aspect-[4/3])
Tablet:     2:1  (aspect-[2/1])
Desktop:    12:5 (aspect-[12/5])

Popular Services Grid:
Mobile:     4 columns (grid-cols-4)
Desktop:    7 columns (grid-cols-7)

Product Cards Grid:
Mobile:     1 column  (grid-cols-1)
Tablet:     2 columns (sm:grid-cols-2)
Desktop:    3 columns (lg:grid-cols-3)
Large:      4 columns (xl:grid-cols-4)
```

---

## File Size Recommendations

```
Banner Images:
├─ Desktop: 1920×800px, ~200-300KB (WebP)
└─ Mobile:  800×600px,  ~80-120KB (WebP)

Popular Services:
└─ Square:  500×500px,  ~50-80KB (WebP/PNG)

Product Images:
└─ Cards:   800×600px,  ~60-100KB (WebP)
```
