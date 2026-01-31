import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts, fetchBlogPostContent } from '../data/blogPosts';
import { BlogPostData } from '../types';
import SEOHead from '../../src/components/SEOHead';
import JsonLd from '../../src/components/JsonLd';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import OptimizedImage from '../../src/components/OptimizedImage';
import { COMMON_SIZES } from '../../src/utils/imageHelpers';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = blogPosts.find(p => p.slug === slug);
        if (!postData) {
          setError('Blog post not found');
          setLoading(false);
          return;
        }
        const content = await fetchBlogPostContent(slug!);
        setPost({ ...postData, content });
        setLoading(false);
      } catch (err) {
        setError('Failed to load blog post');
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  if (!post) {
    return null;
  }

  const blogPostSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://a1furniturepolish.com/blog/${post.slug}`,
      },
      headline: post.title,
      description: post.description,
      image: `https://a1furniturepolish.com${post.image}`,
      author: {
        '@type': 'Organization',
        name: 'A1 Furniture Polish',
        url: 'https://a1furniturepolish.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'A1 Furniture Polish',
        logo: {
          '@type': 'ImageObject',
          url: 'https://a1furniturepolish.com/logo.png',
        },
      },
      datePublished: post.date,
    };

  return (
    <>
      <SEOHead
        title={`${post.title} | A1 Furniture Polish`}
        description={post.description}
        keywords={post.keywords}
        ogUrl={`https://a1furniturepolish.com/blog/${post.slug}`}
        ogImage={`https://a1furniturepolish.com${post.image}`}
      />
      <JsonLd data={blogPostSchema} />

      <div className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-8">
            <Link to="/blog" className="flex items-center text-amber-600 hover:text-amber-700 transition-colors duration-200">
              <ArrowLeft size={20} className="mr-2" />
              <span>Back to Blog</span>
            </Link>
          </div>

          <article>
            <header className="mb-8">
              <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
              <div className="mt-4 flex items-center text-gray-500 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <span className="mx-2">|</span>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
                <span className="mx-2">|</span>
                <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{post.author}</span>
                </div>
              </div>
            </header>
            
            {/* Hide header image for wood polishing cost post */}
            {post.slug !== 'wood-polishing-cost-in-mumbai' && (
              <div className="mb-8 blog-post-header">
                <div className="w-full overflow-hidden rounded-lg shadow-md">
                  <OptimizedImage 
                    src={post.image} 
                    alt={post.title} 
                    width={800}
                    height={450}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            <div 
              className="prose prose-lg max-w-none blog-content" 
              dangerouslySetInnerHTML={{ 
                __html: post.slug === 'wood-polishing-cost-in-mumbai' 
                  ? post.content.replace(/<h1[^>]*>.*?<\/h1>/gi, '') 
                  : post.content 
              }} 
            />

          </article>

        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
