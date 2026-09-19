import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
// OPTIMIZED: Reduced from 6 sizes → 3, dropped AVIF (very slow encoder),
//            added caching, parallel processing.
const config = {
  inputDirs: [
    { input: path.join(__dirname, '../assets'), output: path.join(__dirname, '../public/assets/optimized') },
    { input: path.join(__dirname, '../public/products'), output: path.join(__dirname, '../public/products/optimized') },
    { input: path.join(__dirname, '../public/media'), output: path.join(__dirname, '../public/media/optimized') },
  ],
  formats: ['webp', 'jpg'] as const,
  quality: {
    webp: 85,
    jpg: 85,
  },
  // 3 breakpoints cover mobile / tablet / desktop — sufficient for srcset
  sizes: [480, 768, 1280],
  // Max concurrent image encode operations (tune to CPU core count)
  concurrency: 4,
};

// Supported input formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];

// Helper to ensure directory exists
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Get all image files from directory (recursive)
function getImageFiles(dir: string, excludeDir?: string): string[] {
  const files: string[] = [];
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip the output directory to prevent infinite loops
      if (excludeDir && fullPath === excludeDir) {
        continue;
      }
      // Recursively get files from subdirectories
      const subFiles = getImageFiles(fullPath, excludeDir);
      files.push(...subFiles);
    } else {
      const ext = path.extname(item).toLowerCase();
      if (supportedFormats.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

// Returns true if the output file exists and is newer than the source file (cache hit)
function isCached(outputPath: string, inputMtime: number): boolean {
  if (!fs.existsSync(outputPath)) return false;
  return fs.statSync(outputPath).mtimeMs >= inputMtime;
}

// Generate optimized images for one source file
async function optimizeImage(inputPath: string, inputDir: string, outputDir: string) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const relativePath = path.relative(inputDir, inputPath);
  const relativeDir = path.dirname(relativePath);

  // Create output directory structure
  const outputSubDir = path.join(outputDir, relativeDir);
  ensureDir(outputSubDir);

  const inputMtime = fs.statSync(inputPath).mtimeMs;

  try {
    const metadata = await sharp(inputPath).metadata();
    const originalWidth = metadata.width || 1280;

    let generated = 0;
    let skipped = 0;

    for (const width of config.sizes) {
      // Skip sizes larger than the original image
      if (width > originalWidth) continue;

      // All format outputs for this width — generate in parallel
      await Promise.all(
        config.formats.map(async (fmt) => {
          const outPath = path.join(outputSubDir, `${filename}-${width}w.${fmt === 'jpg' ? 'jpg' : fmt}`);

          // Cache: skip if already up-to-date
          if (isCached(outPath, inputMtime)) {
            skipped++;
            return;
          }

          const base = sharp(inputPath).resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside',
          });

          if (fmt === 'webp') {
            await base.webp({ quality: config.quality.webp }).toFile(outPath);
          } else {
            await base.jpeg({ quality: config.quality.jpg }).toFile(outPath);
          }
          generated++;
        })
      );
    }

    if (skipped > 0 && generated === 0) {
      console.log(`  ⏭  Skipped (cached): ${filename}`);
    } else {
      console.log(`  ✓ ${filename} — generated ${generated}, skipped ${skipped} (cached)`);
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error);
  }
}

// Run an array of async tasks with a maximum concurrency cap
async function runWithConcurrency<T>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]> {
  const results: T[] = [];
  const executing: Promise<void>[] = [];

  for (const task of tasks) {
    const p = task().then((r) => { results.push(r); }) as Promise<void>;
    executing.push(p);
    if (executing.length >= limit) {
      await Promise.race(executing);
      // Remove settled promises
      for (let i = executing.length - 1; i >= 0; i--) {
        // @ts-ignore — check settled via a flag trick
        if (await Promise.race([executing[i], Promise.resolve('pending')]) !== 'pending') {
          executing.splice(i, 1);
        }
      }
    }
  }

  await Promise.all(executing);
  return results;
}

// Main function
async function main() {
  console.log('🖼️  Starting image optimization...\n');
  console.log(`   Sizes:       ${config.sizes.join(', ')}w`);
  console.log(`   Formats:     ${config.formats.join(', ')}`);
  console.log(`   Concurrency: ${config.concurrency}`);
  console.log(`   Cache:       enabled (skips unchanged images)\n`);

  let totalProcessed = 0;

  // Process each input directory
  for (const dirConfig of config.inputDirs) {
    const { input: inputDir, output: outputDir } = dirConfig;

    console.log(`\n📁 Processing directory: ${path.relative(__dirname, inputDir)}`);

    // Check if input directory exists
    if (!fs.existsSync(inputDir)) {
      console.log(`  ⚠️  Directory not found, skipping...`);
      continue;
    }
    
    // Ensure output directory exists
    ensureDir(outputDir);
    
    // Get all image files (recursive), excluding the output directory to prevent infinite loops
    const imageFiles = getImageFiles(inputDir, outputDir);

    console.log(`  Found ${imageFiles.length} images\n`);

    // Process images in parallel batches (respects concurrency limit)
    const tasks = imageFiles.map((imgPath) => () => optimizeImage(imgPath, inputDir, outputDir));
    await runWithConcurrency(tasks, config.concurrency);

    totalProcessed += imageFiles.length;

    console.log(`  ✅ Completed: ${imageFiles.length} images`);
    console.log(`  Output: ${path.relative(__dirname, outputDir)}`);
  }
  
  console.log('\n✅ Image optimization complete!');
  console.log(`📊 Total images processed: ${totalProcessed}`);
  console.log('\n📂 Output directories:');
  config.inputDirs.forEach(({ output }) => {
    console.log(`   • ${path.relative(__dirname, output)}`);
  });
}

// Run the script
main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
