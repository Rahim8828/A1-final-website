# Manual Image Mapping Guide

## CRITICAL: Check These Files First

### 1. Verify Image Files Exist
**Location:** `public/products/front_page_service_products/`

Check if these files exist:
- [ ] sofa_polish.webp
- [ ] bed_polish.webp
- [ ] door_polish.webp
- [ ] table_polish.webp
- [ ] wardrobe_polish.webp
- [ ] dining_set_polish.webp
- [ ] crokery_polish.webp
- [ ] shelve_polish.webp
- [ ] mandir_polish.webp
- [ ] jhula_polish.webp
- [ ] tv_polish.webp
- [ ] pu_polish_front.webp
- [ ] deco_paint_front.webp
- [ ] antique_polish.png

---

## EXACT FILE LOCATIONS TO EDIT

### File 1: `src/data/servicePageData.ts`

This is the ONLY file you need to edit for image paths.

#### Service 1: Sofa Wood Polish
**Line:** ~14
```typescript
image: '/products/front_page_service_products/sofa_polish.webp',
```

**Options (Lines ~16-50):**
```typescript
options: [
  {
    id: 'sofa-1seater',
    name: '1 Seater Sofa',
    price: 1449,
    image: '/products/front_page_service_products/sofa_polish.webp',  // ← EDIT THIS
  },
  {
    id: 'sofa-2seater',
    name: '2 Seater Sofa',
    price: 1999,
    image: '/products/front_page_service_products/sofa_polish.webp',  // ← EDIT THIS
  },
  // ... repeat for all 4 sofa options
]
```

---

#### Service 2: Bed Wood Polish
**Line:** ~140
```typescript
image: '/products/front_page_service_products/bed_polish.webp',
```

**Options (Lines ~142-180):**
```typescript
options: [
  {
    id: 'bed-single',
    name: 'Single Bed',
    price: 2449,
    image: '/products/front_page_service_products/bed_polish.webp',  // ← EDIT THIS
  },
  // ... repeat for all 6 bed options
]
```

---

#### Service 3: Door Wood Polish
**Line:** ~270
```typescript
image: '/products/front_page_service_products/door_polish.webp',
```

**Options (Lines ~272-280):**
```typescript
options: [
  { id: 'door-single', name: 'Single Door', price: 2449, image: '/products/front_page_service_products/door_polish.webp' },
  { id: 'door-2door', name: '2 Door', price: 3899, image: '/products/front_page_service_products/door_polish.webp' },
  { id: 'door-3door', name: '3 Door', price: 4899, image: '/products/front_page_service_products/door_polish.webp' },
  { id: 'door-4door', name: '4 Door', price: 5899, image: '/products/front_page_service_products/door_polish.webp' },
]
```

---

#### Service 4: Table Wood Polish
**Line:** ~320
```typescript
image: '/products/front_page_service_products/table_polish.webp',
```

**Options (Lines ~322-330):**
```typescript
options: [
  { id: 'table-coffee', name: 'Coffee Table', price: 1549, image: '/assets/Coffe-table-polish.webp' },  // ← CHANGE TO: '/products/front_page_service_products/table_polish.webp'
  { id: 'table-center', name: 'Center Table', price: 2899, image: '/assets/Center-table-polish.webp' },  // ← CHANGE TO: '/products/front_page_service_products/table_polish.webp'
  { id: 'table-side', name: 'Side Table', price: 1999, image: '/products/front_page_service_products/table_polish.webp' },  // ← ALREADY CORRECT
  { id: 'table-study', name: 'Study Table', price: 3899, image: '/assets/Study-table-polish.webp' },  // ← CHANGE TO: '/products/front_page_service_products/table_polish.webp'
]
```

---

#### Service 5: Wardrobe Wood Polish
**Line:** ~380
```typescript
image: '/products/front_page_service_products/wardrobe_polish.webp',
```

**Options (Lines ~382-390):**
```typescript
options: [
  { id: 'wardrobe-2door', name: '2 Door Wardrobe', price: 3499, image: '/products/front_page_service_products/wardrobe_polish.webp' },
  { id: 'wardrobe-3door', name: '3 Door Wardrobe', price: 4449, image: '/products/front_page_service_products/wardrobe_polish.webp' },
  { id: 'wardrobe-4door', name: '4 Door Wardrobe', price: 5849, image: '/products/front_page_service_products/wardrobe_polish.webp' },
  { id: 'wardrobe-sliding', name: 'Sliding Door Wardrobe', price: 6799, image: '/products/front_page_service_products/wardrobe_polish.webp' },
]
```

---

#### Service 6: Dining Set Polish
**Line:** ~440
```typescript
image: '/products/front_page_service_products/dining_set_polish.webp',
```

**Options (Lines ~442-450):**
```typescript
options: [
  { id: 'dining-2seater', name: '2 Seater + Bench', price: 3449, image: '/products/front_page_service_products/dining_set_polish.webp' },
  { id: 'dining-4seater', name: '4 Seater Dining Set', price: 3899, image: '/products/front_page_service_products/dining_set_polish.webp' },
  { id: 'dining-6seater', name: '6 Seater Dining Set', price: 5399, image: '/products/front_page_service_products/dining_set_polish.webp' },
  { id: 'single-table', name: 'Single Table Polish', price: 2999, image: '/products/front_page_service_products/dining_set_polish.webp' },
  { id: 'single-chair', name: 'Single Chair Polish', price: 999, image: '/products/front_page_service_products/dining_set_polish.webp' }
]
```

---

#### Service 7: Cabinet Wood Polish
**Line:** ~500
```typescript
image: '/products/front_page_service_products/crokery_polish.webp',
```

**Options (Lines ~502-510):**
```typescript
options: [
  { id: 'cabinet-single', name: 'Single Door Cabinet', price: 2449, image: '/products/front_page_service_products/crokery_polish.webp' },
  { id: 'cabinet-double', name: 'Double Door Cabinet', price: 2999, image: '/products/front_page_service_products/crokery_polish.webp' },
  { id: 'cabinet-3door', name: '3 Door Cabinet', price: 3899, image: '/products/front_page_service_products/crokery_polish.webp' },
  { id: 'cabinet-crockery', name: 'Crockery Self', price: 3999, image: '/products/front_page_service_products/crokery_polish.webp' },
]
```

---

## QUICK FIX STEPS

1. **Open:** `src/data/servicePageData.ts`

2. **Search for:** `/assets/` (Find all old image paths)

3. **Replace with:** `/products/front_page_service_products/[appropriate_image].webp`

4. **Verify image files exist in:** `public/products/front_page_service_products/`

5. **Rebuild:** `npm run build`

---

## DEBUGGING CHECKLIST

If images still don't show:

### Check 1: Image Files Exist
```bash
ls public/products/front_page_service_products/
```

### Check 2: Image Paths in servicePageData.ts
- All paths should start with `/products/front_page_service_products/`
- No paths should start with `/assets/`

### Check 3: Browser Console
- Open DevTools (F12)
- Check Console for 404 errors
- Check Network tab for failed image requests

### Check 4: Image File Names Match Exactly
- Case-sensitive: `sofa_polish.webp` ≠ `Sofa_Polish.webp`
- Underscores vs hyphens: `sofa_polish.webp` ≠ `sofa-polish.webp`

---

## COMPLETE IMAGE MAPPING TABLE

| Service Name | Main Image Path | Option Image Path |
|-------------|----------------|-------------------|
| Sofa Wood Polish | `/products/front_page_service_products/sofa_polish.webp` | Same as main |
| Bed Wood Polish | `/products/front_page_service_products/bed_polish.webp` | Same as main |
| Door Wood Polish | `/products/front_page_service_products/door_polish.webp` | Same as main |
| Table Wood Polish | `/products/front_page_service_products/table_polish.webp` | Same as main |
| Wardrobe Wood Polish | `/products/front_page_service_products/wardrobe_polish.webp` | Same as main |
| Dining Set Polish | `/products/front_page_service_products/dining_set_polish.webp` | Same as main |
| Cabinet Wood Polish | `/products/front_page_service_products/crokery_polish.webp` | Same as main |
| Bookshelf / Rack Polish | `/products/front_page_service_products/shelve_polish.webp` | Same as main |
| Wooden Shelf Polish | `/products/front_page_service_products/shelve_polish.webp` | Same as main |
| Mandir Polish | `/products/front_page_service_products/mandir_polish.webp` | Same as main |
| Jhula Polish | `/products/front_page_service_products/jhula_polish.webp` | Same as main |
| TV Unit Polish | `/products/front_page_service_products/tv_polish.webp` | Same as main |
| Floor Polishing | `/products/front_page_service_products/pu_polish_front.webp` | Same as main |
| PU Polish | `/products/front_page_service_products/pu_polish_front.webp` | Same as main |
| Deco Paint | `/products/front_page_service_products/deco_paint_front.webp` | Same as main |
| Antique / Carving Furniture | `/products/front_page_service_products/antique_polish.png` | Same as main |

---

## ALTERNATIVE: If Images Don't Exist

If the images don't exist in `public/products/front_page_service_products/`, you need to:

1. **Find the actual images** in your project
2. **Copy them** to `public/products/front_page_service_products/`
3. **Rename them** to match the expected names above
4. **Rebuild** the project

OR

1. **Update the paths** in `servicePageData.ts` to point to where the images actually are
2. **Rebuild** the project
