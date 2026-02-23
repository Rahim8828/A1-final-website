# Image Flow Analysis - Service By Categories Section

## Overview
The images you see in the "Service By Categories" section with three color variants below each product are sourced from the `furnitureProducts.ts` data file and rendered through the `FurnitureProductCard` component.

---

## Image Source Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  furnitureProducts.ts                            │
│  (Data Source - Contains all product information)               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Each product has:
                         │ • colorVariants array
                         │ • Each variant has: id, label, hex, image
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Example Product Structure:                          │
│                                                                  │
│  {                                                               │
│    id: 'sofa-1-seater',                                         │
│    name: '1 Seater Sofa Polish',                               │
│    colorVariants: makeColorVariants(                            │
│      '/products/sofa/1_seater_sofa',  ← Base Path              │
│      'darkWooden1seaterSofa.webp',     ← Dark Brown Image      │
│      'lightBrown1seater.webp',         ← Light Brown Image     │
│      'white1seaterSofa.webp'           ← White Image           │
│    )                                                            │
│  }                                                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ makeColorVariants() creates:
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Color Variants Array:                               │
│                                                                  │
│  [                                                               │
│    {                                                             │
│      id: 'dark-brown',                                          │
│      label: 'Dark Brown',                                       │
│      hex: '#4A2C2A',                                            │
│      image: '/products/sofa/1_seater_sofa/darkWooden1seaterSofa.webp' │
│    },                                                            │
│    {                                                             │
│      id: 'light-brown',                                         │
│      label: 'Light Brown',                                      │
│      hex: '#C4956A',                                            │
│      image: '/products/sofa/1_seater_sofa/lightBrown1seater.webp' │
│    },                                                            │
│    {                                                             │
│      id: 'white',                                               │
│      label: 'White',                                            │
│      hex: '#F5F0E8',                                            │
│      image: '/products/sofa/1_seater_sofa/white1seaterSofa.webp' │
│    }                                                             │
│  ]                                                               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Passed to component
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│           FurnitureProductCard Component                         │
│  (Renders the product card with color selection)                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Component Logic:
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. State Management:                                            │
│     const [selectedColor, setSelectedColor] = useState('dark-brown') │
│                                                                  │
│  2. Image Selection Function:                                   │
│     const getImageForColor = () => {                            │
│       const variant = product.colorVariants.find(              │
│         v => v.id === selectedColor                             │
│       );                                                         │
│       return variant?.image || fallback;                        │
│     }                                                            │
│                                                                  │
│  3. Render Color Swatches:                                      │
│     {product.colorVariants.map(variant => (                     │
│       <button                                                    │
│         onClick={() => setSelectedColor(variant.id)}           │
│         style={{ backgroundColor: variant.hex }}               │
│       />                                                         │
│     ))}                                                          │
│                                                                  │
│  4. Display Selected Image:                                     │
│     <img src={getImageForColor()} alt={product.name} />        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Actual File Paths in Your Project

### Image Directory Structure:
```
public/
└── products/
    ├── sofa/
    │   ├── 1_seater_sofa/
    │   │   ├── darkWooden1seaterSofa.webp
    │   │   ├── lightBrown1seater.webp
    │   │   └── white1seaterSofa.webp
    │   ├── 2_seater/
    │   │   ├── darkWoodeb2seatersofa.webp
    │   │   ├── lightBrown2seaterSofa.webp
    │   │   └── white2seaterSofa.webp
    │   └── 3_seater/
    │       ├── darkWooden3seatersofa.webp
    │       ├── lightBrown3seatersofa.webp
    │       └── white3seaterSofa.webp
    ├── bed/
    │   ├── king_bed/
    │   │   ├── darkWoodenKing.webp
    │   │   ├── lightBrownKing.webp
    │   │   └── whiteKing.webp
    │   └── ... (other bed types)
    ├── doors/
    ├── tables/
    ├── wardrobes/
    ├── dining_set/
    ├── cabinet/
    ├── shelves/
    ├── tvUnitPolish/
    ├── jhula/
    ├── mandir/
    ├── antique/
    ├── FloorPoshining/
    ├── pu_polish/
    └── deco_paint/
```

---

## How Color Variants Work

### 1. **Data Definition** (furnitureProducts.ts)
```typescript
// Helper function that creates the color variant array
function makeColorVariants(
  basePath: string,      // e.g., '/products/sofa/1_seater_sofa'
  darkImg: string,       // e.g., 'darkWooden1seaterSofa.webp'
  lightImg: string,      // e.g., 'lightBrown1seater.webp'
  whiteImg?: string      // e.g., 'white1seaterSofa.webp' (optional)
): ColorOption[]
```

### 2. **Component State** (FurnitureProductCard.tsx)
```typescript
// Default selected color is 'dark-brown'
const [selectedColor, setSelectedColor] = useState<ColorVariant>('dark-brown');
```

### 3. **User Interaction**
- User clicks on a color swatch (circle button)
- `setSelectedColor()` updates the state
- Component re-renders with new image

### 4. **Image Display**
```typescript
// Gets the image path for currently selected color
const getImageForColor = (): string => {
  const variant = product.colorVariants.find((v) => v.id === selectedColor);
  if (variant && variant.image) return variant.image;
  // Fallback to first available image
  const fallback = product.colorVariants.find((v) => v.image);
  return fallback?.image || '';
};
```

---

## Visual Representation of What You See

```
┌─────────────────────────────────────────────────────┐
│  [Product Card]                                      │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │                                               │  │
│  │         [Product Image]                       │  │
│  │    (Changes based on selected color)         │  │
│  │                                               │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│  Color Swatches:                                    │
│  ● ● ●  ← Three clickable circles                  │
│  │ │ │                                              │
│  │ │ └─ White (#F5F0E8)                            │
│  │ └─── Light Brown (#C4956A)                      │
│  └───── Dark Brown (#4A2C2A) [Selected by default] │
│                                                      │
│  1 SEATER SOFA POLISH                               │
│  ⭐ 4.9 (356)                                       │
│  ₹1,599  ₹2,099  24% off                           │
│                                                      │
│  [Book Polish Service]                              │
└─────────────────────────────────────────────────────┘
```

---

## Key Points

1. **Image Source**: All images come from `public/products/` directory
2. **Data Definition**: Product data with color variants defined in `src/data/furnitureProducts.ts`
3. **Component**: `FurnitureProductCard.tsx` handles the display and color switching
4. **Default Color**: Dark brown is selected by default
5. **Color Hex Codes**:
   - Dark Brown: `#4A2C2A`
   - Light Brown: `#C4956A`
   - White: `#F5F0E8`

---

## To Add/Modify Images

### Option 1: Add new product with color variants
```typescript
{
  id: 'new-product',
  name: 'New Product Polish',
  colorVariants: makeColorVariants(
    '/products/category/product_name',
    'dark_image.webp',
    'light_image.webp',
    'white_image.webp'
  ),
  // ... other properties
}
```

### Option 2: Manually define color variants
```typescript
{
  id: 'custom-product',
  name: 'Custom Product',
  colorVariants: [
    {
      id: 'dark-brown',
      label: 'Dark Brown',
      hex: '#4A2C2A',
      image: '/products/custom/dark.webp'
    },
    {
      id: 'light-brown',
      label: 'Light Brown',
      hex: '#C4956A',
      image: '/products/custom/light.webp'
    },
    {
      id: 'white',
      label: 'White',
      hex: '#F5F0E8',
      image: '/products/custom/white.webp'
    }
  ],
  // ... other properties
}
```

---

## Summary

The three color circles you see below each product in the "Service By Categories" section are:

1. **Defined** in `furnitureProducts.ts` using the `makeColorVariants()` helper function
2. **Stored** as an array of color options with hex codes and image paths
3. **Rendered** by `FurnitureProductCard.tsx` as clickable color swatches
4. **Interactive** - clicking a color swatch changes the displayed product image
5. **Image paths** point to actual files in `public/products/` directory

The system is fully dynamic - when you click a color swatch, the component updates its state and displays the corresponding image for that color variant.
