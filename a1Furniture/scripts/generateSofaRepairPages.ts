/**
 * Sofa Repair SEO Page Generator
 * 
 * Generates static .tsx page files for all combinations of:
 * - 31 locations × sofa-repair (location pages)
 * - 31 locations × 4 problems (location-problem pages)
 * 
 * Total: 31 location pages + 124 location-problem pages = 155 pages
 * Plus: 1 master page + 4 problem pages = 5 hand-crafted pages
 * Grand total: 160 sofa repair SEO pages
 * 
 * Usage: npx tsx scripts/generateSofaRepairPages.ts
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
  { id: 'jogeshwari', name: 'Jogeshwari', slug: 'jogeshwari' },
  { id: 'goregaon', name: 'Goregaon', slug: 'goregaon' },
  { id: 'malad', name: 'Malad', slug: 'malad' },
  { id: 'kandivali', name: 'Kandivali', slug: 'kandivali' },
  { id: 'borivali', name: 'Borivali', slug: 'borivali' },
  { id: 'dahisar', name: 'Dahisar', slug: 'dahisar' },
  { id: 'bandra', name: 'Bandra', slug: 'bandra' },
  { id: 'khar', name: 'Khar', slug: 'khar' },
  { id: 'santacruz', name: 'Santacruz', slug: 'santacruz' },
  { id: 'vile-parle', name: 'Vile Parle', slug: 'vile-parle' },
  { id: 'juhu', name: 'Juhu', slug: 'juhu' },
  { id: 'versova', name: 'Versova', slug: 'versova' },
  { id: 'lokhandwala', name: 'Lokhandwala', slug: 'lokhandwala' },
  { id: 'oshiwara', name: 'Oshiwara', slug: 'oshiwara' },
  { id: 'dadar', name: 'Dadar', slug: 'dadar' },
  { id: 'sion', name: 'Sion', slug: 'sion' },
  { id: 'matunga', name: 'Matunga', slug: 'matunga' },
  { id: 'kurla', name: 'Kurla', slug: 'kurla' },
  { id: 'ghatkopar', name: 'Ghatkopar', slug: 'ghatkopar' },
  { id: 'vikhroli', name: 'Vikhroli', slug: 'vikhroli' },
  { id: 'bhandup', name: 'Bhandup', slug: 'bhandup' },
  { id: 'mulund', name: 'Mulund', slug: 'mulund' },
  { id: 'thane', name: 'Thane', slug: 'thane' },
  { id: 'wadala', name: 'Wadala', slug: 'wadala' },
  { id: 'chembur', name: 'Chembur', slug: 'chembur' },
  { id: 'navi-mumbai', name: 'Navi Mumbai', slug: 'navi-mumbai' },
  { id: 'vashi', name: 'Vashi', slug: 'vashi' },
  { id: 'powai', name: 'Powai', slug: 'powai' },
  { id: 'mira-road', name: 'Mira Road', slug: 'mira-road' },
];

const problems = [
  { id: 'scratched', slug: 'scratched-sofa-repair' },
  { id: 'faded', slug: 'faded-sofa-repair' },
  { id: 'water-damaged', slug: 'water-damaged-sofa-repair' },
  { id: 'termite', slug: 'termite-damaged-sofa-repair' },
];

// ── Helpers ────────────────────────────────────────────────────────────

function toPascalCase(str: string): string {
  return str
    .split(/[-\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function generateLocationPage(loc: typeof locations[0]): string {
  const componentName = `SofaRepair${toPascalCase(loc.name)}`;
  return `import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-${loc.slug}
 * Keyword: sofa repair ${loc.name.toLowerCase()}, sofa repair in ${loc.name.toLowerCase()}
 */
const ${componentName}: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === '${loc.id}')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
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
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /${prob.slug}-${loc.slug}
 * Keyword: ${prob.slug.replace(/-/g, ' ')} ${loc.name.toLowerCase()}
 */
const ${componentName}: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === '${prob.id}')!;
  const location = sofaRepairLocations.find((l) => l.id === '${loc.id}')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default ${componentName};
`;
}

// ── Main ───────────────────────────────────────────────────────────────

const outDir = path.resolve(__dirname, '../src/pages/sofa-repair/generated');

// Create output directory
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Track all generated pages for route generation
const generatedPages: { componentName: string; path: string; importPath: string }[] = [];

let created = 0;
let skipped = 0;

// 1. Generate location-only pages (31 pages)
for (const loc of locations) {
  const componentName = `SofaRepair${toPascalCase(loc.name)}`;
  const fileName = `${componentName}.tsx`;
  const filePath = path.join(outDir, fileName);
  const routePath = `/sofa-repair-${loc.slug}`;

  if (fs.existsSync(filePath)) {
    skipped++;
    console.log(`⏭  Skipped (exists): ${fileName}`);
  } else {
    fs.writeFileSync(filePath, generateLocationPage(loc), 'utf-8');
    created++;
    console.log(`✅ Created: ${fileName} → ${routePath}`);
  }

  generatedPages.push({
    componentName,
    path: routePath,
    importPath: `./pages/sofa-repair/generated/${componentName}`,
  });
}

// 2. Generate location × problem pages (124 pages)
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

    generatedPages.push({
      componentName,
      path: routePath,
      importPath: `./pages/sofa-repair/generated/${componentName}`,
    });
  }
}

// 3. Generate route snippet file for easy copy-paste into App.tsx
const routeSnippetPath = path.join(outDir, '_ROUTES_SNIPPET.tsx');
const lazyImports = generatedPages
  .map((p) => `const ${p.componentName} = lazy(() => import('${p.importPath}'));`)
  .join('\n');

const routeLines = generatedPages
  .map((p) => `              <Route path="${p.path}" element={<${p.componentName} />} />`)
  .join('\n');

const snippet = `/**
 * AUTO-GENERATED — Copy these into App.tsx
 * Generated on: ${new Date().toISOString()}
 * 
 * Pages: ${generatedPages.length} total
 *   - ${locations.length} location pages
 *   - ${locations.length * problems.length} location × problem pages
 */

// ── Lazy Imports (add to top of App.tsx) ──
${lazyImports}

// ── Routes (add inside <Routes>) ──
              {/* Sofa Repair Location & Problem Pages (auto-generated) */}
${routeLines}
`;

fs.writeFileSync(routeSnippetPath, snippet, 'utf-8');

console.log('\n' + '═'.repeat(60));
console.log(`✅ Created: ${created} new page files`);
console.log(`⏭  Skipped: ${skipped} existing files`);
console.log(`📄 Route snippet saved to: ${routeSnippetPath}`);
console.log(`📊 Total sofa repair pages: ${generatedPages.length + 5} (${generatedPages.length} generated + 5 hand-crafted)`);
console.log('═'.repeat(60));
