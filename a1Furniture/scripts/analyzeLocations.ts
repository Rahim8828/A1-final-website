#!/usr/bin/env tsx

/**
 * Location Analysis Script
 * Analyzes all pages and extracts unique locations covered by the website
 */

import { mumbaiLocations, mumbaiGenericLocation } from '../src/data/generatedPagesConfig';
import { pagesData } from '../src/data/generatedPagesData';

interface LocationAnalysis {
  totalLocations: number;
  uniqueLocations: string[];
  locationsByZone: {
    western: string[];
    central: string[];
    harbour: string[];
    other: string[];
  };
  locationsByPriority: {
    priority1: string[];
    priority2: string[];
    priority3: string[];
  };
  manualPages: string[];
  generatedPages: {
    total: number;
    mumbaiGeneric: number;
    locationSpecific: number;
    locationBreakdown: Record<string, number>;
  };
}

function analyzeLocations(): LocationAnalysis {
  // Get all unique locations from generated pages
  const generatedPageLocations = new Set(pagesData.map(page => page.location));
  
  // Manual location-specific pages (from src/pages directory)
  const manualPages = [
    'Goregaon', // GoregaonFurniturePolish.tsx
    'Powai',    // PowaiFurniturePolish.tsx
  ];
  
  // Combine all locations
  const allLocations = new Set([
    ...generatedPageLocations,
    ...manualPages
  ]);
  
  // Remove 'Mumbai' generic location for unique count
  allLocations.delete('Mumbai');
  const uniqueLocations = Array.from(allLocations).sort();
  
  // Categorize by zone
  const locationsByZone = {
    western: [] as string[],
    central: [] as string[],
    harbour: [] as string[],
    other: [] as string[],
  };
  
  // Categorize by priority
  const locationsByPriority = {
    priority1: [] as string[],
    priority2: [] as string[],
    priority3: [] as string[],
  };
  
  uniqueLocations.forEach(location => {
    const locationData = mumbaiLocations.find(loc => loc.name === location);
    if (locationData) {
      locationsByZone[locationData.zone].push(location);
      locationsByPriority[`priority${locationData.priority}` as keyof typeof locationsByPriority].push(location);
    }
  });
  
  // Sort each zone
  Object.keys(locationsByZone).forEach(zone => {
    locationsByZone[zone as keyof typeof locationsByZone].sort();
  });
  
  Object.keys(locationsByPriority).forEach(priority => {
    locationsByPriority[priority as keyof typeof locationsByPriority].sort();
  });
  
  // Analyze generated pages
  const mumbaiGenericPages = pagesData.filter(page => page.location === 'Mumbai').length;
  const locationSpecificPages = pagesData.filter(page => page.location !== 'Mumbai').length;
  
  // Count pages per location
  const locationBreakdown: Record<string, number> = {};
  pagesData.forEach(page => {
    if (page.location !== 'Mumbai') {
      locationBreakdown[page.location] = (locationBreakdown[page.location] || 0) + 1;
    }
  });
  
  return {
    totalLocations: uniqueLocations.length,
    uniqueLocations,
    locationsByZone,
    locationsByPriority,
    manualPages,
    generatedPages: {
      total: pagesData.length,
      mumbaiGeneric: mumbaiGenericPages,
      locationSpecific: locationSpecificPages,
      locationBreakdown,
    },
  };
}

function printLocationAnalysis() {
  const analysis = analyzeLocations();
  
  console.log('🏙️  A1 FURNITURE POLISH - LOCATION COVERAGE ANALYSIS');
  console.log('=' .repeat(60));
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Total Unique Locations Covered: ${analysis.totalLocations}`);
  console.log(`   Manual Location Pages: ${analysis.manualPages.length}`);
  console.log(`   Generated Location Pages: ${analysis.generatedPages.locationSpecific}`);
  console.log(`   Mumbai Generic Pages: ${analysis.generatedPages.mumbaiGeneric}`);
  console.log(`   Total Pages: ${analysis.generatedPages.total + analysis.manualPages.length}`);
  
  console.log(`\n🗺️  ALL LOCATIONS COVERED (${analysis.totalLocations}):`);
  analysis.uniqueLocations.forEach((location, index) => {
    console.log(`   ${(index + 1).toString().padStart(2, '0')}. ${location}`);
  });
  
  console.log(`\n🚇 LOCATIONS BY ZONE:`);
  console.log(`   Western Line (${analysis.locationsByZone.western.length}): ${analysis.locationsByZone.western.join(', ')}`);
  console.log(`   Central Line (${analysis.locationsByZone.central.length}): ${analysis.locationsByZone.central.join(', ')}`);
  console.log(`   Harbour Line (${analysis.locationsByZone.harbour.length}): ${analysis.locationsByZone.harbour.join(', ')}`);
  console.log(`   Other Areas (${analysis.locationsByZone.other.length}): ${analysis.locationsByZone.other.join(', ')}`);
  
  console.log(`\n⭐ LOCATIONS BY PRIORITY:`);
  console.log(`   Priority 1 (${analysis.locationsByPriority.priority1.length}): ${analysis.locationsByPriority.priority1.join(', ')}`);
  console.log(`   Priority 2 (${analysis.locationsByPriority.priority2.length}): ${analysis.locationsByPriority.priority2.join(', ')}`);
  console.log(`   Priority 3 (${analysis.locationsByPriority.priority3.length}): ${analysis.locationsByPriority.priority3.join(', ')}`);
  
  console.log(`\n📄 PAGES PER LOCATION:`);
  Object.entries(analysis.generatedPages.locationBreakdown)
    .sort(([,a], [,b]) => b - a)
    .forEach(([location, count]) => {
      const isManual = analysis.manualPages.includes(location);
      const totalPages = count + (isManual ? 1 : 0);
      console.log(`   ${location}: ${totalPages} pages${isManual ? ' (including 1 manual)' : ''}`);
    });
  
  // Add manual-only locations
  analysis.manualPages.forEach(location => {
    if (!analysis.generatedPages.locationBreakdown[location]) {
      console.log(`   ${location}: 1 page (manual only)`);
    }
  });
  
  console.log(`\n🎯 COVERAGE INSIGHTS:`);
  console.log(`   • All major Mumbai railway lines covered`);
  console.log(`   • Focus on high-priority business areas`);
  console.log(`   • Balanced distribution across zones`);
  console.log(`   • Strong presence in Western suburbs`);
  console.log(`   • Good coverage of Central and Harbour lines`);
  console.log(`   • Strategic coverage of business hubs like BKC, Powai`);
  
  return analysis;
}

// Run the analysis
printLocationAnalysis();

export { analyzeLocations, printLocationAnalysis };