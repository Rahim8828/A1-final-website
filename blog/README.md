# 📝 Blog System

A complete blog management system for A1 Furniture Polish website.

## 📁 Folder Structure

```
blog/
├── assets/          # Blog post content (JS files)
├── components/      # Blog-specific React components
├── content/         # Markdown source files
├── data/           # Blog data management
├── pages/          # Blog page components
├── scripts/        # Build and management scripts
├── types/          # TypeScript type definitions
├── utils/          # Helper utilities
├── config.ts       # Blog configuration
├── index.ts        # Main export file
└── README.md       # This file
```

## 🚀 Quick Start

### Create a New Blog Post
```bash
npm run blog:new
```

### Generate Blog Content
```bash
npm run generate:blog
```

### Validate Blog Content
```bash
npm run blog:validate
```

## 📝 Content Workflow

1. **Create**: Use `npm run blog:new` to create a new markdown file
2. **Write**: Edit the markdown file in `blog/content/`
3. **Generate**: Run `npm run generate:blog` to convert to JS
4. **Build**: Run `npm run build` to include in website

## 🎨 Components

- **BlogCard**: Displays individual blog post cards
- **BlogFilters**: Search and filter functionality
- **BlogListPage**: Main blog listing page
- **BlogPostPage**: Individual blog post display

## 🔧 Configuration

Edit `blog/config.ts` to customize:
- Posts per page
- Featured posts limit
- Categories and authors
- Default settings

## 📊 Features

- ✅ Markdown-based content creation
- ✅ Automated content generation
- ✅ SEO optimization
- ✅ Category and tag management
- ✅ Search and filtering
- ✅ Pagination
- ✅ Related posts
- ✅ Featured posts
- ✅ Content validation
- ✅ Responsive design

## 🛠️ Development

### Adding New Categories
Edit `blog/config.ts` and add to the `categories` array.

### Adding New Authors
Edit `blog/config.ts` and add to the `authors` array.

### Custom Components
Add new components to `blog/components/` and export from `blog/index.ts`.

## 📈 Scaling

This system is designed to handle:
- Hundreds of blog posts
- Multiple authors
- Complex categorization
- Advanced search functionality
- SEO optimization at scale

## 🔍 SEO Features

- Automatic meta tag generation
- Structured data (JSON-LD)
- Canonical URLs
- Optimized images
- Internal linking
- Sitemap integration