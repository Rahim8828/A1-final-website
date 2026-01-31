import { BlogPostData, BlogCategory, BlogTag } from '../types';

export class BlogHelpers {
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  static calculateReadTime(content: string, wordsPerMinute: number = 200): string {
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  static generateExcerpt(content: string, maxLength: number = 160): string {
    const plainText = content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
    if (plainText.length <= maxLength) return plainText;
    
    const truncated = plainText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return truncated.substring(0, lastSpace) + '...';
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  static sortPostsByDate(posts: BlogPostData[]): BlogPostData[] {
    return posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.date);
      const dateB = new Date(b.publishedAt || b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  static filterPostsByCategory(posts: BlogPostData[], categorySlug: string): BlogPostData[] {
    return posts.filter(post => {
      const postCategorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
      return postCategorySlug === categorySlug;
    });
  }

  static filterPostsByTag(posts: BlogPostData[], tagSlug: string): BlogPostData[] {
    return posts.filter(post => {
      if (!post.tags) return false;
      const postTagSlugs = post.tags.map(tag => tag.toLowerCase().replace(/\s+/g, '-'));
      return postTagSlugs.includes(tagSlug);
    });
  }

  static searchPosts(posts: BlogPostData[], query: string): BlogPostData[] {
    const searchTerm = query.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.keywords.toLowerCase().includes(searchTerm) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      post.content.toLowerCase().includes(searchTerm)
    );
  }

  static getRelatedPosts(
    posts: BlogPostData[], 
    currentPost: BlogPostData, 
    limit: number = 3
  ): BlogPostData[] {
    return posts
      .filter(post => post.slug !== currentPost.slug)
      .filter(post => 
        post.category === currentPost.category ||
        post.tags?.some(tag => currentPost.tags?.includes(tag))
      )
      .slice(0, limit);
  }

  static paginatePosts(
    posts: BlogPostData[], 
    page: number, 
    limit: number
  ): {
    posts: BlogPostData[];
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
    totalPosts: number;
  } {
    const totalPages = Math.ceil(posts.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      totalPages,
      currentPage: page,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      totalPosts: posts.length
    };
  }

  static extractCategories(posts: BlogPostData[]): BlogCategory[] {
    const categoryMap = new Map<string, BlogCategory>();

    posts.forEach(post => {
      const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
      if (!categoryMap.has(categorySlug)) {
        categoryMap.set(categorySlug, {
          id: categorySlug,
          name: post.category,
          slug: categorySlug,
          description: `Articles about ${post.category}`,
          color: 'amber',
          postCount: 0
        });
      }
      categoryMap.get(categorySlug)!.postCount!++;
    });

    return Array.from(categoryMap.values());
  }

  static extractTags(posts: BlogPostData[]): BlogTag[] {
    const tagMap = new Map<string, BlogTag>();

    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tagName => {
          const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
          if (!tagMap.has(tagSlug)) {
            tagMap.set(tagSlug, {
              id: tagSlug,
              name: tagName,
              slug: tagSlug,
              postCount: 0
            });
          }
          tagMap.get(tagSlug)!.postCount!++;
        });
      }
    });

    return Array.from(tagMap.values())
      .sort((a, b) => (b.postCount || 0) - (a.postCount || 0));
  }

  static generateSEOKeywords(post: BlogPostData): string {
    const baseKeywords = ['furniture polish', 'wood polish', 'mumbai'];
    const titleKeywords = post.title.toLowerCase().split(' ').slice(0, 3);
    const categoryKeywords = [post.category.toLowerCase()];
    const tagKeywords = post.tags?.slice(0, 2) || [];

    return [...baseKeywords, ...titleKeywords, ...categoryKeywords, ...tagKeywords]
      .filter(Boolean)
      .join(', ');
  }

  static validatePost(post: Partial<BlogPostData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const requiredFields = ['title', 'description', 'category', 'author', 'date'];

    requiredFields.forEach(field => {
      if (!post[field as keyof BlogPostData]) {
        errors.push(`Missing required field: ${field}`);
      }
    });

    if (post.title && post.title.length > 60) {
      errors.push('Title should be 60 characters or less for SEO');
    }

    if (post.description && post.description.length > 160) {
      errors.push('Description should be 160 characters or less for SEO');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export default BlogHelpers;