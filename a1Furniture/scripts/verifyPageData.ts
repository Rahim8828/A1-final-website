/**
 * Verification script to check page data quality
 */

import { pagesData } from '../src/data/generatedPagesData';
import { calculateWordCount } from '../src/data/contentTemplates';

console.log('=== Page Data Quality Verification ===\n');

// Check a few sample pages in detail
const samplesToCheck = [
  pagesData[0],  // First Mumbai page
  pagesData[79], // Last Mumbai page
  pagesData[80], // First location-specific page
  pagesData[149], // Last page
];

samplesToCheck.forEach((page, index) => {
  console.log(`\n--- Sample ${index + 1} ---`);
  console.log(`URL: ${page.url}`);
  console.log(`Title: ${page.title}`);
  console.log(`Location: ${page.location}`);
  console.log(`Service: ${page.serviceName}`);
  console.log(`Variation: ${page.titleVariation}`);
  
  // Check word count
  const wordCount = calculateWordCount({
    introduction: page.introduction,
    services: page.services,
    process: page.process,
    serviceAreaDescription: page.serviceAreaDescription,
    pricing: page.pricing,
    whyChooseUs: page.whyChooseUs,
    faqs: page.faqs,
  });
  
  console.log(`Word Count: ${wordCount} words`);
  
  // Check required fields
  const hasAllFields = !!(
    page.title &&
    page.metaDescription &&
    page.h1 &&
    page.url &&
    page.canonicalUrl &&
    page.introduction &&
    page.services.length > 0 &&
    page.process.length > 0 &&
    page.locationAreas.length > 0 &&
    page.serviceAreaDescription &&
    page.pricing &&
    page.whyChooseUs.length > 0 &&
    page.faqs.length > 0 &&
    page.relatedServices.length > 0 &&
    page.schema.localBusiness &&
    page.schema.service &&
    page.primaryKeyword &&
    page.secondaryKeywords.length > 0
  );
  
  console.log(`All Required Fields: ${hasAllFields ? '✓' : '✗'}`);
  console.log(`Services Count: ${page.services.length}`);
  console.log(`FAQs Count: ${page.faqs.length}`);
  console.log(`Benefits Count: ${page.whyChooseUs.length}`);
  console.log(`Related Services: ${page.relatedServices.length}`);
  console.log(`Meta Description Length: ${page.metaDescription.length} chars`);
  console.log(`Title Length: ${page.title.length} chars`);
});

// Check distribution
console.log('\n\n=== Distribution Analysis ===\n');

const locationCounts = new Map<string, number>();
const categoryCounts = new Map<string, number>();
const variationCounts = new Map<string, number>();

pagesData.forEach(page => {
  locationCounts.set(page.location, (locationCounts.get(page.location) || 0) + 1);
  categoryCounts.set(page.serviceCategory, (categoryCounts.get(page.serviceCategory) || 0) + 1);
  variationCounts.set(page.titleVariation, (variationCounts.get(page.titleVariation) || 0) + 1);
});

console.log('Top 10 Locations by Page Count:');
const sortedLocations = Array.from(locationCounts.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);
sortedLocations.forEach(([location, count]) => {
  console.log(`  ${location}: ${count} pages`);
});

console.log('\nPages per Category:');
const sortedCategories = Array.from(categoryCounts.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);
sortedCategories.forEach(([category, count]) => {
  console.log(`  ${category}: ${count} pages`);
});

console.log('\nPages per Title Variation:');
Array.from(variationCounts.entries()).forEach(([variation, count]) => {
  console.log(`  ${variation}: ${count} pages`);
});

console.log('\n=== Verification Complete ===');
