import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgContent = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#D97706;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#92400E;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="102" fill="url(#grad)" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="256" font-family="Arial, sans-serif" font-weight="bold">A1</text>
</svg>
`;

async function generateFavicons() {
  const publicDir = path.join(process.cwd(), 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgBuffer = Buffer.from(svgContent);

  try {
    // Generate favicon.ico (32x32)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    
    console.log('✓ Generated favicon-32x32.png');

    // Generate favicon-16x16.png
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    
    console.log('✓ Generated favicon-16x16.png');

    // Generate apple-touch-icon (180x180)
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    
    console.log('✓ Generated apple-touch-icon.png');

    // Generate android-chrome icons
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
    
    console.log('✓ Generated android-chrome-192x192.png');

    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
    
    console.log('✓ Generated android-chrome-512x512.png');

    // Keep the SVG version
    fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
    console.log('✓ Generated favicon.svg');

    console.log('\n✅ All favicon files generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
