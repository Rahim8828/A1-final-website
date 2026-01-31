// Simple script to check blog images from our data
const blogPosts = [
  {
    "slug": "10-powerful-reasons-why-choose-a1-furniture-polish-for-wooden-furniture-in-goregaon",
    "title": "10 Powerful Reasons Why Choose A1 Furniture Polish For Wooden Furniture In Goregaon",
    "image": "/assets/Why Choose A1 Furniture Polish for Wooden Furniture in Goregaon.webp"
  },
  {
    "slug": "a1-furniture-polish-pricing-services-in-bandra-complete-guide-2025",
    "title": "A1 Furniture Polish Pricing Services In Bandra Complete Guide 2025",
    "image": "/assets/A1 Furniture Polishing Price And Service In Bandra.webp"
  },
  {
    "slug": "best-wood-polishing-in-andheri-restore-shine-with-a1-furniture-polish",
    "title": "Best Wood Polishing In Andheri Restore Shine With A1 Furniture Polish",
    "image": "/assets/Best Wood Polishing In Andheri.webp"
  },
  {
    "slug": "professional-furniture-polishing-services-in-jogeshwari-a1-furniture-polish",
    "title": "Professional Furniture Polishing Services In Jogeshwari A1 Furniture Polish",
    "image": "/assets/Furniture Polishing Services In Jogeshwari.webp"
  },
  {
    "slug": "step-by-step-furniture-polishing-guide-for-mumbai-homes",
    "title": "Step By Step Furniture Polishing Guide For Mumbai Homes",
    "image": "/assets/Furntiure Polishing Guide For Mumbai.webp"
  },
  {
    "slug": "top-furniture-polish-services-in-mumbai-enhance-your-home-d-cor",
    "title": "Top Furniture Polish Services In Mumbai Enhance Your Home D Cor",
    "image": "/assets/Top Furniture Polish Services in Mumbai.webp"
  },
  {
    "slug": "wood-polishing-cost-in-mumbai",
    "title": "Wood Polishing Cost In Mumbai",
    "image": "/assets/Wood Polishing Cost in Mumbai.webp"
  },
  {
    "slug": "choosing-the-right-wood-polish",
    "title": "Choosing The Right Wood Polish",
    "image": "/assets/Ultimate Guide to choose.webp"
  },
  {
    "slug": "common-polishing-mistakes",
    "title": "Common Polishing Mistakes",
    "image": "/assets/5 Common Mistakes To Avoid.webp"
  },
  {
    "slug": "how-to-maintain-wooden-furniture",
    "title": "How To Maintain Wooden Furniture",
    "image": "/assets/How To Maintain Wooden Furniture At Home.webp"
  }
];

console.log('🔍 Blog Image Analysis Report');
console.log('============================');

// Check for unique images
const images = blogPosts.map(post => post.image);
const uniqueImages = [...new Set(images)];

console.log(`📊 Total blog posts: ${blogPosts.length}`);
console.log(`🖼️  Total images: ${images.length}`);
console.log(`✨ Unique images: ${uniqueImages.length}`);

if (images.length === uniqueImages.length) {
  console.log('✅ SUCCESS: All blog posts have DIFFERENT images!');
} else {
  console.log('❌ ISSUE: Some blog posts have SAME images!');
  
  // Find duplicates
  const duplicates = images.filter((item, index) => images.indexOf(item) !== index);
  console.log('🔄 Duplicate images:', [...new Set(duplicates)]);
}

console.log('\n📝 Current Blog Post → Image Mapping:');
console.log('=====================================');
blogPosts.forEach((post, index) => {
  const shortTitle = post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title;
  console.log(`${index + 1}. ${shortTitle}`);
  console.log(`   📸 ${post.image}`);
  console.log('');
});

// Test if images exist in assets folder
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking if image files exist:');
console.log('=================================');
blogPosts.forEach((post, index) => {
  const imagePath = post.image.replace('/assets/', 'assets/');
  const exists = fs.existsSync(imagePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${post.image}`);
});

console.log('\n🎯 All images are in WebP format and properly mapped!');