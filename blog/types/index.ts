export interface BlogPostData {
  slug: string;
  title: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  description: string;
  keywords: string;
  content: string;
  tags?: string[];
  featured?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  relatedPosts?: string[];
  tableOfContents?: boolean;
  excerpt?: string;
  status?: 'draft' | 'published' | 'archived';
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
  color: string;
  icon?: string;
  postCount?: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount?: number;
}

export interface BlogAuthor {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface BlogConfig {
  postsPerPage: number;
  featuredPostsLimit: number;
  relatedPostsLimit: number;
  excerptLength: number;
  categories: BlogCategory[];
  authors: BlogAuthor[];
  defaultAuthor: string;
}

export interface BlogSearchResult {
  posts: BlogPostData[];
  totalCount: number;
  query: string;
  filters: {
    category?: string;
    tags?: string[];
  };
}

export interface BlogPagination {
  posts: BlogPostData[];
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalPosts: number;
}