#!/usr/bin/env tsx

/**
 * Remaining Locations Analysis Script
 * Analyzes which Mumbai locations are not yet covered and potential for expansion
 */

import { mumbaiLocations, mumbaiGenericLocation } from '../src/data/generatedPagesConfig';
import { pagesData } from '../src/data/generatedPagesData';

interface RemainingLocationAnalysis {
  totalMumbaiLocations: number;
  coveredLocations: number;
  remainingLocations: number;
  remainingLocationsList: Array<{
    name: string;
    zone: string;
    priority: number;
    slug: string;
  }>;
  expansionPotential: {
    priority1Remaining: number;
    priority2Remaining: number;
    priority3Remaining: number;
  };
  recommendedNextLocations: Array<{
    name: string;
    zone: string;
    priority: number;
    reason: string;
  }>;
}

function analyzeRemainingLocations(): RemainingLocationAnalysis {
  // Get all covered locations from generated pages (excluding Mumbai generic)
  const coveredLocationNames = new Set(
    pagesData
      .filter(page => page.location !== 'Mumbai')
      .map(page => page.location)
  );
  
  // Add manual location pages
  const manualLocations = ['Goregaon', 'Powai'];
  manualLocations.forEach(loc => coveredLocationNames.add(loc));
  
  // Find remaining locations
  const remainingLocationsList = mumbaiLocations.filter(
    location => !coveredLocationNames.has(location.name)
  );
  
  // Count by priority
  const expansionPotential = {
    priority1Remaining: remainingLocationsList.filter(loc => loc.priority === 1).length,
    priority2Remaining: remainingLocationsList.filter(loc => loc.priority === 2).length,
    priority3Remaining: remainingLocationsList.filter(loc => loc.priority === 3).length,
  };
  
  // Recommend next locations (priority 1 and 2 first)
  const recommendedNextLocations = remainingLocationsList
    .filter(loc => loc.priority <= 2)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 10)
    .map(loc => ({
      name: loc.name,
      zone: loc.zone,
      priority: loc.priority,
      reason: loc.priority === 1 
        ? 'High-priority business area with strong demand'
        : 'Good market potential with decent connectivity'
    }));
  
  return {
    totalMumbaiLocations: mumbaiLocations.length,
    coveredLocations: coveredLocationNames.size,
    remainingLocations: remainingLocationsList.length,
    remainingLocationsList,
    expansionPotential,
    recommendedNextLocations,
  };
}

function printRemainingLocationAnalysis() {
  const analysis = analyzeRemainingLocations();
  
  console.log('📍 A1 FURNITURE POLISH - REMAINING LOCATIONS ANALYSIS');
  console.log('=' .repeat(65));
  
  console.log(`\n📊 COVERAGE SUMMARY:`);
  console.log(`   Total Mumbai Locations Available: ${analysis.totalMumbaiLocations}`);
  console.log(`   Currently Covered: ${analysis.coveredLocations}`);
  console.log(`   Remaining to Cover: ${analysis.remainingLocations}`);
  console.log(`   Coverage Percentage: ${((analysis.coveredLocations / analysis.totalMumbaiLocations) * 100).toFixed(1)}%`);
  
  console.log(`\n🎯 EXPANSION POTENTIAL:`);
  console.log(`   Priority 1 Locations Remaining: ${analysis.expansionPotential.priority1Remaining}`);
  console.log(`   Priority 2 Locations Remaining: ${analysis.expansionPotential.priority2Remaining}`);
  console.log(`   Priority 3 Locations Remaining: ${analysis.expansionPotential.priority3Remaining}`);
  
  if (analysis.remainingLocations > 0) {
    console.log(`\n🗺️  ALL REMAINING LOCATIONS (${analysis.remainingLocations}):`);
    
    // Group by zone
    const byZone = {
      western: analysis.remainingLocationsList.filter(loc => loc.zone === 'western'),
      central: analysis.remainingLocationsList.filter(loc => loc.zone === 'central'),
      harbour: analysis.remainingLocationsList.filter(loc => loc.zone === 'harbour'),
      other: analysis.remainingLocationsList.filter(loc => loc.zone === 'other'),
    };
    
    Object.entries(byZone).forEach(([zone, locations]) => {
      if (locations.length > 0) {
        console.log(`\n   ${zone.toUpperCase()} LINE (${locations.length}):`);
        locations.forEach((loc, index) => {
          const priorityIcon = loc.priority === 1 ? '⭐' : loc.priority === 2 ? '🔸' : '🔹';
          console.log(`     ${priorityIcon} ${loc.name} (Priority ${loc.priority})`);
        });
      }
    });
    
    console.log(`\n🚀 TOP 10 RECOMMENDED FOR NEXT EXPANSION:`);
    analysis.recommendedNextLocations.forEach((loc, index) => {
      const priorityIcon = loc.priority === 1 ? '⭐' : '🔸';
      console.log(`   ${(index + 1).toString().padStart(2, '0')}. ${priorityIcon} ${loc.name} (${loc.zone})`);
      console.log(`       → ${loc.reason}`);
    });
    
    console.log(`\n💡 EXPANSION STRATEGY RECOMMENDATIONS:`);
    
    if (analysis.expansionPotential.priority1Remaining > 0) {
      console.log(`   🎯 IMMEDIATE PRIORITY: Cover remaining ${analysis.expansionPotential.priority1Remaining} Priority 1 locations first`);
      console.log(`      These are high-demand business areas with strong market potential`);
    }
    
    if (analysis.expansionPotential.priority2Remaining > 0) {
      console.log(`   📈 MEDIUM TERM: Expand to ${analysis.expansionPotential.priority2Remaining} Priority 2 locations`);
      console.log(`      Good market potential with decent connectivity and demand`);
    }
    
    if (analysis.expansionPotential.priority3Remaining > 0) {
      console.log(`   🔮 LONG TERM: Consider ${analysis.expansionPotential.priority3Remaining} Priority 3 locations`);
      console.log(`      Lower priority areas for comprehensive coverage`);
    }
    
    // Calculate potential pages
    const potentialPages = analysis.remainingLocations * 3; // Average 3 pages per location
    console.log(`\n📄 EXPANSION POTENTIAL:`);
    console.log(`   Potential Additional Pages: ~${potentialPages} pages`);
    console.log(`   (Assuming 3 pages per location on average)`);
    console.log(`   Total Possible Pages: ${152 + potentialPages} pages`);
    
  } else {
    console.log(`\n🎉 CONGRATULATIONS!`);
    console.log(`   All Mumbai locations are already covered!`);
    console.log(`   Your website has complete Mumbai coverage.`);
  }
  
  return analysis;
}

// Run the analysis
printRemainingLocationAnalysis();

export { analyzeRemainingLocations, printRemainingLocationAnalysis };