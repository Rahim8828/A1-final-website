#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

interface BlogPostMeta {
  title: string;
  description: string;
  keywords: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

class BlogContentGenerator {
  private articlesDir = 'blog/content';
  private assetsDir = 'blog/assets';
  private dataFile = 'blog/data/blogPosts.ts';

  async generateAllContent() {
    console.log('🚀 Starting blog content generation...');
    
    const articles = this.getArticleFiles();
    const blogPosts: Omit<BlogPostMeta, 'content'>[] = [];
    const importStatements: string[] = [];

    for (const article of articles) {
      const postData = await this.processArticle(article);
      if (postData) {
        blogPosts.push(postData.meta);
        importStatements.push(postData.importStatement);
      }
    }

    await this.generateDataFile(blogPosts, importStatements);
    console.log(`✅ Generated ${blogPosts.length} blog posts`);
  }

  private getArticleFiles(): string[] {
    return fs.readdirSync(this.articlesDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(this.articlesDir, file));
  }

  private async processArticle(filePath: string): Promise<{
    meta: Omit<BlogPostMeta, 'content'>;
    importStatement: string;
  } | null> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data: frontMatter, content: markdownContent } = matter(content);
      
      const slug = this.generateSlug(path.basename(filePath, '.md'));
      const htmlContent = await marked(markdownContent);
      
      // Generate JS file
      const jsFileName = `${slug}.js`;
      const jsFilePath = path.join(this.assetsDir, jsFileName);
      
      const jsContent = `export default \`${this.escapeTemplate(htmlContent)}\`;`;
      fs.writeFileSync(jsFilePath, jsContent);

      const meta: Omit<BlogPostMeta, 'content'> = {
        slug,
        title: frontMatter.title || this.generateTitle(slug),
        description: frontMatter.description || this.generateDescription(markdownContent),
        keywords: frontMatter.keywords || this.generateKeywords(slug),
        category: frontMatter.category || 'Furniture Care',
        author: frontMatter.author || 'A1 Furniture Polish Team',
        date: frontMatter.date || new Date().toLocaleDateString('en-GB'),
        readTime: frontMatter.readTime || this.calculateReadTime(markdownContent),
        image: frontMatter.image || this.getCorrectImagePath(slug)
      };

      return {
        meta,
        importStatement: `    case '${slug}':\n      return (await import('../assets/${slug}.js')).default;`
      };
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
      return null;
    }
  }

  private generateSlug(filename: string): string {
    return filename
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private generateTitle(slug: string): string {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private generateDescription(content: string): string {
    const firstParagraph = content.split('\n\n')[0];
    return firstParagraph.substring(0, 160) + '...';
  }

  private generateKeywords(slug: string): string {
    const baseKeywords = ['furniture polish', 'wood polish', 'mumbai'];
    const slugKeywords = slug.split('-').slice(0, 3);
    return [...baseKeywords, ...slugKeywords].join(', ');
  }

  private calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  private getCorrectImagePath(slug: string): string {
    // Map slugs to actual WebP file names in assets folder
    const imageMap: Record<string, string> = {
      '10-powerful-reasons-why-choose-a1-furniture-polish-for-wooden-furniture-in-goregaon': '/assets/Why Choose A1 Furniture Polish for Wooden Furniture in Goregaon.webp',
      'a1-furniture-polish-pricing-services-in-bandra-complete-guide-2025': '/assets/A1 Furniture Polishing Price And Service In Bandra.webp',
      'best-wood-polishing-in-andheri-restore-shine-with-a1-furniture-polish': '/assets/Best Wood Polishing In Andheri.webp',
      'professional-furniture-polishing-services-in-jogeshwari-a1-furniture-polish': '/assets/Furniture Polishing Services In Jogeshwari.webp',
      'step-by-step-furniture-polishing-guide-for-mumbai-homes': '/assets/Furntiure Polishing Guide For Mumbai.webp',
      'top-furniture-polish-services-in-mumbai-enhance-your-home-d-cor': '/assets/Top Furniture Polish Services in Mumbai.webp',
      'wood-polishing-cost-in-mumbai': '/assets/Wood Polishing Cost in Mumbai.webp',
      'choosing-the-right-wood-polish': '/assets/Ultimate Guide to choose.webp',
      'common-polishing-mistakes': '/assets/5 Common Mistakes To Avoid.webp',
      'how-to-maintain-wooden-furniture': '/assets/How To Maintain Wooden Furniture At Home.webp'
    };

    return imageMap[slug] || `/assets/${slug}.webp`;
  }

  private escapeTemplate(content: string): string {
    return content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${');
  }

  private async generateDataFile(blogPosts: Omit<BlogPostMeta, 'content'>[], importStatements: string[]) {
    const dataFileContent = `import { BlogPostData } from '../types';

export const blogPosts: Omit<BlogPostData, 'content'>[] = ${JSON.stringify(blogPosts, null, 2)};

export const fetchBlogPostContent = async (slug: string) => {
  switch (slug) {
${importStatements.join('\n')}
    default:
      throw new Error('Blog post not found');
  }
};
`;

    fs.writeFileSync(this.dataFile, dataFileContent);
  }
}

// Run the generator
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new BlogContentGenerator();
  generator.generateAllContent().catch(console.error);
}

export default BlogContentGenerator;