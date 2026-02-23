# Chair Light Brown Color Variant Fix

## Problem

The dining chair on the home screen was not displaying the light brown color variant correctly, even though:
- The image file exists: `/products/dining_set/chair/lightBrown.webp`
- It's correctly defined in `furnitureProducts.ts`
- It works perfectly on the services and products pages

## Root Cause

The home screen uses a different component (`ProductCard.tsx`) and data source (`productCatalog.ts`) than the services/products pages.

### The Issue:

1. **Different Components**:
   - Home screen: Uses `ProductCard.tsx` (in `ShopByCategories` component)
   - Services/Products pages: Use `FurnitureProductCard.tsx`

2. **Filename Transformation Logic**:
   - `ProductCard.tsx` uses string replacement to transform filenames
   - Chair has unique naming: `darkbrownChair.webp` → `lightBrown.webp` (not `lightBrownChair.webp`)
   - The generic replacement logic was converting:
     - `darkbrownChair.webp` → `lightBrownChair.webp` ❌ (file doesn't exist)
     - Should be: `darkbrownChair.webp` → `lightBrown.webp` ✅

## Solution

Added special handling for the chair product in `ProductCard.tsx`:

```typescript
// Chair special case: darkbrownChair.webp -> lightBrown.webp (not lightBrownChair.webp)
if (filenameLower.includes('chair')) {
  if (color === 'dark') {
    return directory + 'darkbrownChair.webp';
  } else if (color === 'light') {
    return directory + 'lightBrown.webp';  // ← Fixed: exact filename
  } else if (color === 'white') {
    return directory + 'whiteChair.webp';
  }
}
```

## Files Modified

### `src/components/ProductCard.tsx`
- Added special case handling for chair product
- Ensures correct filename mapping for all three color variants

## Testing

Test the chair on the home screen:

1. Navigate to home page
2. Find "Dining Chair" in the "Service By Categories" section
3. Click the three color circles:
   - **Dark Brown**: Should show `darkbrownChair.webp` ✅
   - **Light Brown**: Should show `lightBrown.webp` ✅
   - **White**: Should show `whiteChair.webp` ✅

## Why It Worked on Other Pages

The services and products pages use `FurnitureProductCard.tsx` which:
- Gets color variants directly from `furnitureProducts.ts`
- Uses the `makeColorVariants()` helper function
- Has explicit image paths for each color variant
- No filename transformation needed

## Summary

The chair light brown color variant now displays correctly on the home screen. The fix adds special handling for the chair's unique filename pattern while maintaining compatibility with all other products.

## Related Files

- ✅ `src/components/ProductCard.tsx` - Fixed
- ℹ️ `src/data/productCatalog.ts` - No changes needed
- ℹ️ `src/data/furnitureProducts.ts` - Already correct
- ℹ️ `src/components/FurnitureProductCard.tsx` - Already working
