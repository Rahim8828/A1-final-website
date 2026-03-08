import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  inputDirs: [
    { input: path.join(__dirname, '../assets'), output: path.join(__dirname, '../public/assets/optimized') },
    { input: path.join(__dirname, '../public/products'), output: path.join(__dirname, '../public/products/optimized') },
    { input: path.join(__dirname, '../public/media'), output: path.join(__dirname, '../public/media/optimized') },
  ],
  formats: ['avif', 'webp', 'jpg'] as const,
  quality: {
    avif: 80,
    webp: 85,
    jpg: 90,
  },
  sizes: [320, 640, 768, 1024, 1280, 1920],
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
function getImageFiles(dir: string): string[] {
  const files: string[] = [];
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively get files from subdirectories
      const subFiles = getImageFiles(fullPath);
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

// Generate optimized images
async function optimizeImage(inputPath: string, inputDir: string, outputDir: string) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const relativePath = path.relative(inputDir, inputPath);
  const relativeDir = path.dirname(relativePath);
  
  // Create output directory structure
  const outputSubDir = path.join(outputDir, relativeDir);
  ensureDir(outputSubDir);
  
  console.log(`Processing: ${filename}`);
  
  try {
    // Get image metadata
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const originalWidth = metadata.width || 1920;
    
    // Generate images for each size
    for (const width of config.sizes) {
      // Skip if size is larger than original
      if (width > originalWidth) {
        continue;
      }
      
      // Resize image
      const resizedImage = sharp(inputPath).resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
      
      // Generate AVIF
      await resizedImage
        .clone()
        .avif({ quality: config.quality.avif })
        .toFile(path.join(outputSubDir, `${filename}-${width}w.avif`));
      
      // Generate WebP
      await resizedImage
        .clone()
        .webp({ quality: config.quality.webp })
        .toFile(path.join(outputSubDir, `${filename}-${width}w.webp`));
      
      // Generate JPG (fallback)
      await resizedImage
        .clone()
        .jpeg({ quality: config.quality.jpg })
        .toFile(path.join(outputSubDir, `${filename}-${width}w.jpg`));
      
      console.log(`  ✓ Generated ${width}w versions`);
    }
    
    // Also generate full-size versions
    const fullSizeImage = sharp(inputPath);
    
    await fullSizeImage
      .clone()
      .avif({ quality: config.quality.avif })
      .toFile(path.join(outputSubDir, `${filename}.avif`));
    
    await fullSizeImage
      .clone()
      .webp({ quality: config.quality.webp })
      .toFile(path.join(outputSubDir, `${filename}.webp`));
    
    await fullSizeImage
      .clone()
      .jpeg({ quality: config.quality.jpg })
      .toFile(path.join(outputSubDir, `${filename}.jpg`));
    
    console.log(`  ✓ Generated full-size versions`);
    
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error);
  }
}

// Main function
async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
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
    
    // Get all image files (recursive)
    const imageFiles = getImageFiles(inputDir);
    
    console.log(`  Found ${imageFiles.length} images to process\n`);
    
    // Process images sequentially to avoid memory issues
    for (const imagePath of imageFiles) {
      await optimizeImage(imagePath, inputDir, outputDir);
      totalProcessed++;
    }
    
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
