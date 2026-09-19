#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ValidationResult {
  file: string;
  errors: string[];
  warnings: string[];
  isValid: boolean;
}

class BlogContentValidator {
  private articlesDir = 'blog/content';
  private assetsDir = 'blog/assets';
  private requiredFields = ['title', 'description', 'category', 'keywords', 'author', 'date'];

  async validateAllContent(): Promise<void> {
    console.log('🔍 Validating blog content...\n');

    const results: ValidationResult[] = [];
    const articleFiles = this.getArticleFiles();

    for (const file of articleFiles) {
      const result = await this.validateFile(file);
      results.push(result);
    }

    this.printResults(results);
  }

  private getArticleFiles(): string[] {
    if (!fs.existsSync(this.articlesDir)) {
      console.log(`❌ Articles directory '${this.articlesDir}' not found!`);
      return [];
    }

    return fs.readdirSync(this.articlesDir)
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(this.articlesDir, file));
  }

  private async validateFile(filePath: string): Promise<ValidationResult> {
    const fileName = path.basename(filePath);
    const result: ValidationResult = {
      file: fileName,
      errors: [],
      warnings: [],
      isValid: true
    };

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data: frontMatter, content: markdownContent } = matter(content);

      // Validate front matter
      this.validateFrontMatter(frontMatter, result);
      
      // Validate content
      this.validateContent(markdownContent, result);
      
      // Validate associated files
      this.validateAssociatedFiles(fileName, result);

      result.isValid = result.errors.length === 0;

    } catch (error) {
      result.errors.push(`Failed to read or parse file: ${error}`);
      result.isValid = false;
    }

    return result;
  }

  private validateFrontMatter(frontMatter: any, result: ValidationResult): void {
    // Check required fields
    for (const field of this.requiredFields) {
      if (!frontMatter[field]) {
        result.errors.push(`Missing required field: ${field}`);
      }
    }

    // Validate specific fields
    if (frontMatter.title && frontMatter.title.length > 60) {
      result.warnings.push('Title is longer than 60 characters (SEO recommendation)');
    }

    if (frontMatter.description && frontMatter.description.length > 160) {
      result.warnings.push('Description is longer than 160 characters (SEO recommendation)');
    }

    if (frontMatter.keywords && frontMatter.keywords.split(',').length > 10) {
      result.warnings.push('Too many keywords (SEO recommendation: max 10)');
    }

    // Validate date format
    if (frontMatter.date && !this.isValidDate(frontMatter.date)) {
      result.errors.push('Invalid date format. Use DD-MM-YYYY or YYYY-MM-DD');
    }

    // Validate category
    const validCategories = ['Furniture Care', 'DIY Tips', 'Local Services', 'Pricing Guide'];
    if (frontMatter.category && !validCategories.includes(frontMatter.category)) {
      result.warnings.push(`Category '${frontMatter.category}' is not in standard list: ${validCategories.join(', ')}`);
    }
  }

  private validateContent(content: string, result: ValidationResult): void {
    if (!content || content.trim().length === 0) {
      result.errors.push('Content is empty');
      return;
    }

    const wordCount = content.split(/\s+/).length;
    if (wordCount < 300) {
      result.warnings.push(`Content is quite short (${wordCount} words). Consider adding more content for better SEO.`);
    }

    // Check for headings
    if (!content.includes('#')) {
      result.warnings.push('No headings found. Consider adding headings for better structure.');
    }

    // Check for internal links
    if (!content.includes('](/') && !content.includes('](https://a1furniturepolish.com')) {
      result.warnings.push('No internal links found. Consider adding links to other pages.');
    }

    // Check for images
    if (!content.includes('![') && !content.includes('<img')) {
      result.warnings.push('No images found in content. Consider adding relevant images.');
    }
  }

  private validateAssociatedFiles(fileName: string, result: ValidationResult): void {
    const slug = path.basename(fileName, '.md');
    
    // Check for JS file
    const jsFile = path.join(this.assetsDir, `${slug}.js`);
    if (!fs.existsSync(jsFile)) {
      result.warnings.push(`Associated JS file not found: ${jsFile}`);
    }

    // Check for image file
    const imageExtensions = ['.webp', '.jpg', '.jpeg', '.png'];
    const hasImage = imageExtensions.some(ext => 
      fs.existsSync(path.join(this.assetsDir, `${slug}${ext}`))
    );
    
    if (!hasImage) {
      result.warnings.push(`No associated image found. Expected: ${slug}.webp (or .jpg, .jpeg, .png)`);
    }
  }

  private isValidDate(dateString: string): boolean {
    // Check DD-MM-YYYY format
    const ddmmyyyy = /^\d{2}-\d{2}-\d{4}$/;
    // Check YYYY-MM-DD format
    const yyyymmdd = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!ddmmyyyy.test(dateString) && !yyyymmdd.test(dateString)) {
      return false;
    }

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  private printResults(results: ValidationResult[]): void {
    const validFiles = results.filter(r => r.isValid);
    const invalidFiles = results.filter(r => !r.isValid);
    const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);

    console.log(`📊 Validation Summary:`);
    console.log(`✅ Valid files: ${validFiles.length}`);
    console.log(`❌ Invalid files: ${invalidFiles.length}`);
    console.log(`⚠️  Total warnings: ${totalWarnings}\n`);

    // Print detailed results
    for (const result of results) {
      if (result.errors.length > 0 || result.warnings.length > 0) {
        console.log(`📄 ${result.file}:`);
        
        if (result.errors.length > 0) {
          console.log(`  ❌ Errors:`);
          result.errors.forEach(error => console.log(`    - ${error}`));
        }
        
        if (result.warnings.length > 0) {
          console.log(`  ⚠️  Warnings:`);
          result.warnings.forEach(warning => console.log(`    - ${warning}`));
        }
        
        console.log('');
      }
    }

    if (invalidFiles.length === 0 && totalWarnings === 0) {
      console.log('🎉 All blog content is valid!');
    }
  }
}

// Run the validator
if (require.main === module) {
  const validator = new BlogContentValidator();
  validator.validateAllContent().catch(console.error);
}

export default BlogContentValidator;