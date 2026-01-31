// Script to check if blog images are different
const fetch = require('node-fetch');
const cheerio = require('cheerio');

async function checkBlogImages() {
  try {
    console.log('🔍 Checking blog images...');
    
    // Fetch blog page
    const response = await fetch('http://localhost:5175/blog');
    const html = await response.text();
    
    // Parse HTML
    const $ = cheerio.load(html);
    
    // Extract all image sources
    const images = [];
    $('img').each((i, elem) => {
      const src = $(elem).attr('src');
      const alt = $(elem).attr('alt');
      if (src && src.includes('/assets/') && src.includes('.webp')) {
        images.push({ src, alt });
      }
    });
    
    console.log(`📊 Found ${images.length} blog images:`);
    console.log('================================');
    
    images.forEach((img, index) => {
      console.log(`${index + 1}. ${img.alt || 'No alt text'}`);
      console.log(`   📸 ${img.src}`);
      console.log('');
    });
    
    // Check for duplicates
    const imageSources = images.map(img => img.src);
    const uniqueSources = [...new Set(imageSources)];
    
    console.log(`✨ Unique images: ${uniqueSources.length}`);
    console.log(`🔄 Total images: ${imageSources.length}`);
    
    if (uniqueSources.length === imageSources.length) {
      console.log('✅ All blog images are DIFFERENT!');
    } else {
      console.log('❌ Some blog images are SAME!');
      
      // Find duplicates
      const duplicates = imageSources.filter((item, index) => imageSources.indexOf(item) !== index);
      console.log('🔄 Duplicate images:', [...new Set(duplicates)]);
    }
    
  } catch (error) {
    console.error('❌ Error checking blog images:', error.message);
  }
}

checkBlogImages();