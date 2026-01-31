// Check blog data at runtime
import { blogPosts } from './blog/data/blogPosts.js';

console.log('🔍 Runtime Blog Image Check');
console.log('===========================');

console.log(`📊 Total blog posts: ${blogPosts.length}`);

const images = blogPosts.map(post => post.image);
const uniqueImages = [...new Set(images)];

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

console.log('\n📝 Blog Posts with Images:');
console.log('==========================');
blogPosts.forEach((post, index) => {
  console.log(`${index + 1}. ${post.title.substring(0, 60)}...`);
  console.log(`   📸 ${post.image}`);
  console.log('');
});