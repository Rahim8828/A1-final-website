import { BlogConfig } from './types';

export const blogConfig: BlogConfig = {
  postsPerPage: 9,
  featuredPostsLimit: 2,
  relatedPostsLimit: 3,
  excerptLength: 160,
  
  categories: [
    {
      id: 'furniture-care',
      name: 'Furniture Care',
      slug: 'furniture-care',
      description: 'Tips and guides for maintaining your furniture',
      color: 'amber',
      icon: '🪑',
      postCount: 0
    },
    {
      id: 'diy-tips',
      name: 'DIY Tips',
      slug: 'diy-tips',
      description: 'Do-it-yourself furniture care and polishing tips',
      color: 'blue',
      icon: '🔧',
      postCount: 0
    },
    {
      id: 'local-services',
      name: 'Local Services',
      slug: 'local-services',
      description: 'Location-specific furniture polishing services',
      color: 'green',
      icon: '📍',
      postCount: 0
    },
    {
      id: 'pricing-guide',
      name: 'Pricing Guide',
      slug: 'pricing-guide',
      description: 'Pricing information and cost guides',
      color: 'purple',
      icon: '💰',
      postCount: 0
    }
  ],

  authors: [
    {
      id: 'a1-team',
      name: 'A1 Furniture Polish Team',
      bio: 'Professional furniture polishing experts with 10+ years of experience in Mumbai',
      avatar: '/assets/team-avatar.webp',
      social: {
        website: 'https://a1furniturepolish.com',
        linkedin: 'https://linkedin.com/company/a1-furniture-polish'
      }
    }
  ],

  defaultAuthor: 'a1-team'
};

export const blogPaths = {
  content: 'blog/content',
  assets: 'blog/assets',
  components: 'blog/components',
  pages: 'blog/pages',
  data: 'blog/data',
  scripts: 'blog/scripts',
  utils: 'blog/utils'
};

export default blogConfig;