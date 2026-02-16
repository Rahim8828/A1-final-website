/**
 * Bed Repair SEO Page Generator
 *
 * Generates static .tsx page files for all combinations of:
 * - 17 locations × bed-repair (location pages)
 * - 17 locations × 4 problems (location-problem pages)
 *
 * Total: 17 location pages + 68 location-problem pages = 85 pages
 * Plus: 1 master page + 4 problem pages + 6 wood type pages = 11 hand-crafted pages
 * Grand total: 96 bed repair SEO pages
 *
 * Usage: npx tsx scripts/generateBedRepairPages.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Location & Problem Data (inline to avoid TS import issues in scripts) ──

const locations = [
  { id: 'andheri-west', name: 'Andheri West', slug: 'andheri-west' },
  { id: 'andheri-east', name: 'Andheri East', slug: 'andheri-east' },
  { id: 'goregaon', name: 'Goregaon', slug: 'goregaon' },
  { id: 'malad', name: 'Malad', slug: 'malad' },
  { id: 'kandivali', name: 'Kandivali', slug: 'kandivali' },
  { id: 'borivali', name: 'Borivali', slug: 'borivali' },
  { id: 'bandra', name: 'Bandra', slug: 'bandra' },
  { id: 'jogeshwari', name: 'Jogeshwari', slug: 'jogeshwari' },
  { id: 'vile-parle', name: 'Vile Parle', slug: 'vile-parle' },
  { id: 'juhu', name: 'Juhu', slug: 'juhu' },
  { id: 'lokhandwala', name: 'Lokhandwala', slug: 'lokhandwala' },
  { id: 'dadar', name: 'Dadar', slug: 'dadar' },
  { id: 'kurla', name: 'Kurla', slug: 'kurla' },
  { id: 'thane', name: 'Thane', slug: 'thane' },
  { id: 'powai', name: 'Powai', slug: 'powai' },
  { id: 'navi-mumbai', name: 'Navi Mumbai', slug: 'navi-mumbai' },
  { id: 'chembur', name: 'Chembur', slug: 'chembur' },
];

const problems = [
  { id: 'scratched', slug: 'scratched-bed-repair' },
  { id: 'faded', slug: 'faded-bed-repair' },
  { id: 'water-damaged', slug: 'water-damaged-bed-repair' },
  { id: 'termite', slug: 'termite-damaged-bed-repair' },
];

// ── Helpers ────────────────────────────────────────────────────────────

function toPascalCase(str: string): string {
  return str
    .split(/[-\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function generateLocationPage(loc: typeof locations[0]): string {
  const componentName = `BedRepair${toPascalCase(loc.name)}`;
  return `import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-${loc.slug}
 * Keyword: bed repair ${loc.name.toLowerCase()}, bed repair in ${loc.name.toLowerCase()}
 */
const ${componentName}: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === '${loc.id}')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default ${componentName};
`;
}

function generateLocationProblemPage(
  loc: typeof locations[0],
  prob: typeof problems[0]
): string {
  const componentName = `${toPascalCase(prob.slug)}${toPascalCase(loc.name)}`;
  return `import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /${prob.slug}-${loc.slug}
 * Keyword: ${prob.slug.replace(/-/g, ' ')} ${loc.name.toLowerCase()}
 */
const ${componentName}: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === '${prob.id}')!;
  const location = bedRepairLocations.find((l) => l.id === '${loc.id}')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default ${componentName};
`;
}

// ── Main ───────────────────────────────────────────────────────────────

const outDir = path.resolve(__dirname, '../src/pages/bed-repair/generated');

// Create output directory
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

let created = 0;
let skipped = 0;

// 1. Generate location-only pages (17 pages)
for (const loc of locations) {
  const componentName = `BedRepair${toPascalCase(loc.name)}`;
  const fileName = `${componentName}.tsx`;
  const filePath = path.join(outDir, fileName);
  const routePath = `/bed-repair-${loc.slug}`;

  if (fs.existsSync(filePath)) {
    skipped++;
    console.log(`⏭  Skipped (exists): ${fileName}`);
  } else {
    fs.writeFileSync(filePath, generateLocationPage(loc), 'utf-8');
    created++;
    console.log(`✅ Created: ${fileName} → ${routePath}`);
  }
}

// 2. Generate location × problem pages (68 pages)
for (const loc of locations) {
  for (const prob of problems) {
    const componentName = `${toPascalCase(prob.slug)}${toPascalCase(loc.name)}`;
    const fileName = `${componentName}.tsx`;
    const filePath = path.join(outDir, fileName);
    const routePath = `/${prob.slug}-${loc.slug}`;

    if (fs.existsSync(filePath)) {
      skipped++;
      console.log(`⏭  Skipped (exists): ${fileName}`);
    } else {
      fs.writeFileSync(filePath, generateLocationProblemPage(loc, prob), 'utf-8');
      created++;
      console.log(`✅ Created: ${fileName} → ${routePath}`);
    }
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Created: ${created} files`);
console.log(`   Skipped: ${skipped} files`);
console.log(`   Total:   ${created + skipped} generated pages`);
console.log(`   Output:  ${outDir}`);
