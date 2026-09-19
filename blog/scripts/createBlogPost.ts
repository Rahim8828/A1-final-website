#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';

interface BlogPostTemplate {
  title: string;
  description: string;
  category: string;
  keywords: string;
  author: string;
  tags: string[];
  featured: boolean;
}

class BlogPostCreator {
  private rl: readline.Interface;
  private articlesDir = 'blog/content';

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async createNewPost() {
    console.log('🚀 Creating a new blog post...\n');

    try {
      const postData = await this.collectPostData();
      const slug = this.generateSlug(postData.title);
      const filename = `${slug}.md`;
      const filepath = path.join(this.articlesDir, filename);

      // Check if file already exists
      if (fs.existsSync(filepath)) {
        console.log(`❌ A blog post with slug "${slug}" already exists!`);
        this.rl.close();
        return;
      }

      const content = this.generateMarkdownContent(postData);
      
      // Ensure articles directory exists
      if (!fs.existsSync(this.articlesDir)) {
        fs.mkdirSync(this.articlesDir, { recursive: true });
      }

      fs.writeFileSync(filepath, content);
      
      console.log(`✅ Blog post created successfully!`);
      console.log(`📄 File: ${filepath}`);
      console.log(`🔗 Slug: ${slug}`);
      console.log(`\n📝 Next steps:`);
      console.log(`1. Edit the content in ${filepath}`);
      console.log(`2. Add an image to assets/ folder named: ${slug}.webp`);
      console.log(`3. Run 'npm run generate:blog' to update the blog data`);
      
    } catch (error) {
      console.error('❌ Error creating blog post:', error);
    } finally {
      this.rl.close();
    }
  }

  private async collectPostData(): Promise<BlogPostTemplate> {
    const title = await this.askQuestion('📝 Enter blog post title: ');
    const description = await this.askQuestion('📄 Enter description (160 chars max): ');
    const category = await this.askQuestion('📂 Enter category (e.g., Furniture Care, DIY Tips, Local Services): ');
    const keywords = await this.askQuestion('🔍 Enter keywords (comma-separated): ');
    const author = await this.askQuestion('👤 Enter author name (default: A1 Furniture Polish Team): ') || 'A1 Furniture Polish Team';
    const tagsInput = await this.askQuestion('🏷️  Enter tags (comma-separated, optional): ');
    const featuredInput = await this.askQuestion('⭐ Is this a featured post? (y/N): ');

    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
    const featured = featuredInput.toLowerCase() === 'y' || featuredInput.toLowerCase() === 'yes';

    return {
      title,
      description,
      category,
      keywords,
      author,
      tags,
      featured
    };
  }

  private askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private generateMarkdownContent(data: BlogPostTemplate): string {
    const currentDate = new Date().toLocaleDateString('en-GB');
    const readTime = '5 min read'; // Default, will be calculated later

    return `---
title: "${data.title}"
description: "${data.description}"
category: "${data.category}"
keywords: "${data.keywords}"
author: "${data.author}"
date: "${currentDate}"
readTime: "${readTime}"
tags: [${data.tags.map(tag => `"${tag}"`).join(', ')}]
featured: ${data.featured}
status: "draft"
---

# ${data.title}

${data.description}

## Introduction

Write your introduction here...

## Main Content

### Section 1

Your content here...

### Section 2

More content here...

## Conclusion

Wrap up your article here...

---

## Ready to Get Started?

Contact A1 Furniture Polish today for professional furniture polishing services in Mumbai.

**📱 Call:** 8828709945  
**💬 WhatsApp:** [Click here](https://wa.me/918828709945)  
**📍 Service Areas:** Mumbai | Navi Mumbai | Thane
`;
  }
}

// Run the creator
if (require.main === module) {
  const creator = new BlogPostCreator();
  creator.createNewPost().catch(console.error);
}

export default BlogPostCreator;