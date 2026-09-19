import { BlogPostData, BlogCategory, BlogTag, BlogAuthor } from '../types';

export class BlogManager {
  private static instance: BlogManager;
  private posts: Map<string, BlogPostData> = new Map();
  private categories: Map<string, BlogCategory> = new Map();
  private tags: Map<string, BlogTag> = new Map();
  private authors: Map<string, BlogAuthor> = new Map();

  static getInstance(): BlogManager {
    if (!BlogManager.instance) {
      BlogManager.instance = new BlogManager();
    }
    return BlogManager.instance;
  }

  // Post Management
  addPost(post: BlogPostData): void {
    this.posts.set(post.slug, post);
    this.updateCategoryCount(post.category);
    this.updateTagCounts(post.tags || []);
  }

  getPost(slug: string): BlogPostData | undefined {
    return this.posts.get(slug);
  }

  getAllPosts(): BlogPostData[] {
    return Array.from(this.posts.values())
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.publishedAt || b.date).getTime() - new Date(a.publishedAt || a.date).getTime());
  }

  getPostsByCategory(categorySlug: string): BlogPostData[] {
    return this.getAllPosts().filter(post => 
      post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
    );
  }

  getPostsByTag(tagSlug: string): BlogPostData[] {
    return this.getAllPosts().filter(post => 
      post.tags?.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === tagSlug)
    );
  }

  getFeaturedPosts(): BlogPostData[] {
    return this.getAllPosts().filter(post => post.featured);
  }

  getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostData[] {
    const currentPost = this.getPost(currentSlug);
    if (!currentPost) return [];

    const relatedPosts = this.getAllPosts()
      .filter(post => post.slug !== currentSlug)
      .filter(post => 
        post.category === currentPost.category ||
        post.tags?.some(tag => currentPost.tags?.includes(tag))
      )
      .slice(0, limit);

    return relatedPosts;
  }

  searchPosts(query: string): BlogPostData[] {
    const searchTerm = query.toLowerCase();
    return this.getAllPosts().filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.keywords.toLowerCase().includes(searchTerm) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Category Management
  addCategory(category: BlogCategory): void {
    this.categories.set(category.slug, category);
  }

  getCategories(): BlogCategory[] {
    return Array.from(this.categories.values());
  }

  private updateCategoryCount(categoryName: string): void {
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    const category = this.categories.get(categorySlug);
    if (category) {
      category.postCount = (category.postCount || 0) + 1;
    }
  }

  // Tag Management
  addTag(tag: BlogTag): void {
    this.tags.set(tag.slug, tag);
  }

  getTags(): BlogTag[] {
    return Array.from(this.tags.values());
  }

  private updateTagCounts(tags: string[]): void {
    tags.forEach(tagName => {
      const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
      const tag = this.tags.get(tagSlug);
      if (tag) {
        tag.postCount = (tag.postCount || 0) + 1;
      }
    });
  }

  // Author Management
  addAuthor(author: BlogAuthor): void {
    this.authors.set(author.id, author);
  }

  getAuthor(id: string): BlogAuthor | undefined {
    return this.authors.get(id);
  }

  // Pagination
  getPaginatedPosts(page: number = 1, limit: number = 10): {
    posts: BlogPostData[];
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  } {
    const allPosts = this.getAllPosts();
    const totalPages = Math.ceil(allPosts.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const posts = allPosts.slice(startIndex, endIndex);

    return {
      posts,
      totalPages,
      currentPage: page,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  // Analytics
  getPostStats(): {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    categoriesCount: number;
    tagsCount: number;
  } {
    const allPosts = Array.from(this.posts.values());
    return {
      totalPosts: allPosts.length,
      publishedPosts: allPosts.filter(p => p.status === 'published').length,
      draftPosts: allPosts.filter(p => p.status === 'draft').length,
      categoriesCount: this.categories.size,
      tagsCount: this.tags.size
    };
  }
}

export default BlogManager;