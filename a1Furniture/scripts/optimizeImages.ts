import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  inputDir: path.join(__dirname, '../assets'),
  outputDir: path.join(__dirname, '../public/assets/optimized'),
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

// Get all image files from directory
function getImageFiles(dir: string): string[] {
  const files: string[] = [];
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      continue; // Skip directories
    }
    
    const ext = path.extname(item).toLowerCase();
    if (supportedFormats.includes(ext)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Generate optimized images
async function optimizeImage(inputPath: string) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const relativePath = path.relative(config.inputDir, inputPath);
  const relativeDir = path.dirname(relativePath);
  
  // Create output directory structure
  const outputSubDir = path.join(config.outputDir, relativeDir);
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
  
  // Ensure output directory exists
  ensureDir(config.outputDir);
  
  // Get all image files
  const imageFiles = getImageFiles(config.inputDir);
  
  console.log(`Found ${imageFiles.length} images to process\n`);
  
  // Process images sequentially to avoid memory issues
  for (const imagePath of imageFiles) {
    await optimizeImage(imagePath);
  }
  
  console.log('\n✅ Image optimization complete!');
  console.log(`Output directory: ${config.outputDir}`);
}

// Run the script
main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
