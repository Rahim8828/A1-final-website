const fs = require('fs');
const path = require('path');

console.log('=== Image Verification Script ===\n');

// Read productCatalog.ts
const catalogPath = './src/data/productCatalog.ts';
const catalogContent = fs.readFileSync(catalogPath, 'utf8');

// Extract all image paths
const imageMatches = catalogContent.match(/image:\s*['"]([^'"]+)['"]/g);
const hoverMatches = catalogContent.match(/hoverImage:\s*['"]([^'"]+)['"]/g);

const allMatches = [...(imageMatches || []), ...(hoverMatches || [])];
const imagePaths = allMatches.map(m => m.match(/['"]([^'"]+)['"]/)[1]);
const uniquePaths = [...new Set(imagePaths)];

console.log(`Found ${uniquePaths.length} unique image references in productCatalog.ts\n`);

let missingCount = 0;
let foundCount = 0;

uniquePaths.forEach(imgPath => {
  // Convert to file system path
  const fsPath = path.join('./public', imgPath);
  
  if (fs.existsSync(fsPath)) {
    foundCount++;
    console.log(`✅ ${imgPath}`);
  } else {
    missingCount++;
    console.log(`❌ MISSING: ${imgPath}`);
  }
});

console.log(`\n=== Summary ===`);
console.log(`✅ Found: ${foundCount} images`);
console.log(`❌ Missing: ${missingCount} images`);

if (missingCount === 0) {
  console.log(`\n🎉 All images exist! Ready to test.`);
} else {
  console.log(`\n⚠️  ${missingCount} images need attention.`);
}

// Check CategoryBar images
console.log(`\n=== Checking CategoryBar.tsx ===`);
const categoryBarPath = './src/components/CategoryBar.tsx';
const categoryBarContent = fs.readFileSync(categoryBarPath, 'utf8');

let catMissing = 0;
let catFound = 0;

const categoryImageMatches = categoryBarContent.match(/['"]\/products[^'"]+['"]/g);
if (categoryImageMatches) {
  const categoryPaths = categoryImageMatches.map(m => m.replace(/['"]/g, ''));
  const uniqueCategoryPaths = [...new Set(categoryPaths)];
  
  uniqueCategoryPaths.forEach(imgPath => {
    const fsPath = path.join('./public', imgPath);
    
    if (fs.existsSync(fsPath)) {
      catFound++;
      console.log(`✅ ${imgPath}`);
    } else {
      catMissing++;
      console.log(`❌ MISSING: ${imgPath}`);
    }
  });
  
  console.log(`\nCategory Bar: ✅ ${catFound} found, ❌ ${catMissing} missing`);
}

// Check service images in public/assets
console.log(`\n=== Checking Service Images in public/assets ===`);
const serviceImages = [
  'sofa-polish.webp',
  'Bed-polish.webp',
  'Door-polish.webp',
  'Wardrobe-polish.webp',
  'Dining-polish.webp',
  'Cabinet-polish.webp',
  'side-table.webp',
  'TV-unit-polish.webp',
  'Mandir-polish.webp',
  'Jhula-Polish.webp',
  'Antique Furniture.webp',
  'wooden furniture .webp'
];

let serviceMissing = 0;
let serviceFound = 0;

serviceImages.forEach(img => {
  const fsPath = path.join('./public/assets', img);
  
  if (fs.existsSync(fsPath)) {
    serviceFound++;
    console.log(`✅ /assets/${img}`);
  } else {
    serviceMissing++;
    console.log(`❌ MISSING: /assets/${img}`);
  }
});

console.log(`\nService Images: ✅ ${serviceFound} found, ❌ ${serviceMissing} missing`);

console.log(`\n=== Final Summary ===`);
const totalMissing = missingCount + catMissing + serviceMissing;
const totalFound = foundCount + catFound + serviceFound;

console.log(`✅ Total Found: ${totalFound}`);
console.log(`❌ Total Missing: ${totalMissing}`);

if (totalMissing === 0) {
  console.log(`\n🎉🎉🎉 ALL IMAGES VERIFIED! 🎉🎉🎉`);
  console.log(`\nYou can now run:`);
  console.log(`  npm run dev    - to test in development`);
  console.log(`  npm run build  - to create production build`);
} else {
  console.log(`\n⚠️  Please fix the ${totalMissing} missing images before testing.`);
}
