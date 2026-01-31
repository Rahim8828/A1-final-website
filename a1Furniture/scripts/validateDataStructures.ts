/**
 * Validation script for data structures
 * Verifies that all required data structures are properly defined
 */

import { serviceCategories, mumbaiLocations, titleVariations, pageGenerationStrategy } from '../src/data/generatedPagesConfig';

console.log('=== Data Structure Validation ===\n');

// Validate Service Categories
console.log('✓ Service Categories:', serviceCategories.length);
if (serviceCategories.length !== 20) {
  console.error('❌ Expected 20 service categories, got', serviceCategories.length);
  process.exit(1);
}

// Validate Mumbai Locations
console.log('✓ Mumbai Locations:', mumbaiLocations.length);
if (mumbaiLocations.length !== 41) {
  console.error('❌ Expected 41 Mumbai locations, got', mumbaiLocations.length);
  process.exit(1);
}

// Validate Title Variations
console.log('✓ Title Variations:', titleVariations.length);
if (titleVariations.length !== 4) {
  console.error('❌ Expected 4 title variations, got', titleVariations.length);
  process.exit(1);
}

// Validate Page Generation Strategy
console.log('✓ Page Generation Strategy:');
console.log('  - Phase 1 (Mumbai):', pageGenerationStrategy.phase1.count, 'pages');
console.log('  - Phase 2 (Locations):', pageGenerationStrategy.phase2.count, 'pages');
console.log('  - Total:', pageGenerationStrategy.total, 'pages');

if (pageGenerationStrategy.total !== 150) {
  console.error('❌ Expected 150 total pages, got', pageGenerationStrategy.total);
  process.exit(1);
}

// Validate service category structure
const sampleCategory = serviceCategories[0];
if (!sampleCategory.id || !sampleCategory.name || !sampleCategory.slug) {
  console.error('❌ Service category missing required fields');
  process.exit(1);
}

// Validate location structure
const sampleLocation = mumbaiLocations[0];
if (!sampleLocation.id || !sampleLocation.name || !sampleLocation.slug || !sampleLocation.zone || sampleLocation.priority === undefined) {
  console.error('❌ Location missing required fields');
  process.exit(1);
}

// Validate title variation structure
const sampleVariation = titleVariations[0];
if (!sampleVariation.type || !sampleVariation.prefix || sampleVariation.suffix === undefined) {
  console.error('❌ Title variation missing required fields');
  process.exit(1);
}

console.log('\n✅ All data structures validated successfully!');
console.log('\nSummary:');
console.log('- 20 service categories defined');
console.log('- 41 Mumbai locations defined');
console.log('- 4 title variations defined');
console.log('- 150 total pages to be generated (80 Mumbai + 70 location-specific)');
