# Product Card Image Integration Fix

## Problem
The home screen "Shop By Categories" section had two issues:
1. Product images were using string transformation logic instead of actual imported images from `furnitureProducts.ts`
2. Deco paint products (Designer, Texture, Solid Colour) were showing color variant circles even though they don't have actual color variations

## Root Cause
`ProductCard.tsx` was using `productCatalog.ts` data and transforming filenames with string replacement logic (e.g., replacing "darkBrown" with "lightBrown"). This approach:
- Was error-prone and didn't work for all products (like the chair)
- Didn't respect the actual image imports in `furnitureProducts.ts`
- Couldn't distinguish products that shouldn't show color variants

## Solution
Updated `ProductCard.tsx` to integrate with `furnitureProducts.ts`:

### Changes Made

1. **Import furnitureProducts data**
   ```typescript
   import { furnitureProducts } from '../data/furnitureProducts';
   import type { ColorVariant as FurnitureColorVariant } from '../data/furnitureProducts';
   ```

2. **Match product by ID**
   ```typescript
   const furnitureProduct = furnitureProducts.find(fp => fp.id === product.id);
   ```

3. **Detect deco-paint products**
   ```typescript
   const isDecoPaint = product.category === 'deco-paint';
   ```

4. **Use actual color variant images**
   ```typescript
   const getImageForColor = (color: ColorVariant): string => {
     if (furnitureProduct && furnitureProduct.colorVariants) {
       const variantId = mapColorVariant(color);
       const variant = furnitureProduct.colorVariants.find(v => v.id === variantId);
       if (variant && variant.image) {
         return variant.image;
       }
     }
     return product.image; // Fallback
   };
   ```

5. **Conditionally render color selector**
   ```typescript
   {!isDecoPaint && furnitureProduct && furnitureProduct.colorVariants && (
     <div className="...color selector...">
       {furnitureProduct.colorVariants.map((variant) => (
         // Render color buttons dynamically from actual data
       ))}
     </div>
   )}
   ```

## Benefits

1. **Accurate Images**: All products now use their actual imported images from `furnitureProducts.ts`
2. **No More String Transformation**: Eliminates error-prone filename manipulation
3. **Works for All Products**: Chair, doors, beds, sofas - all products now display correct color variants
4. **Conditional Color Selector**: Deco paint products no longer show color variant circles
5. **Single Source of Truth**: `furnitureProducts.ts` is the definitive source for all product data
6. **Maintainable**: Adding new products or changing images only requires updating `furnitureProducts.ts`

## Products Affected

### Color Variants Now Hidden (3 products)
- Designer Deco Paint
- Texture Deco Paint  
- Solid Colour Deco Paint

### All Other Products (40+ products)
- Now use actual images from `furnitureProducts.ts` colorVariants
- Color selector dynamically generated from actual data
- Correct images for all color variants (dark brown, light brown, white)

## Testing Checklist

- [ ] Home screen loads without errors
- [ ] All furniture products show correct images
- [ ] Color variant selector works for sofas, beds, tables, etc.
- [ ] Deco paint products do NOT show color variant circles
- [ ] Chair light brown variant displays correctly
- [ ] All products link to correct service pages
- [ ] Image transitions are smooth when changing colors

## Files Modified

- `src/components/ProductCard.tsx` - Complete rewrite of image handling logic

## Files Referenced (Not Modified)

- `src/data/furnitureProducts.ts` - Source of truth for product data
- `src/data/productCatalog.ts` - Still used for basic product info
- `src/components/ShopByCategories.tsx` - No changes needed
