// Blog service for fetching content from Notion
// This service fetches blog posts from the specified Notion page

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  author: string;
  imageUrl?: string;
  readTimeMinutes: number;
}

class BlogService {
  private notionPageUrl = 'https://glen-hammer-7bb.notion.site/BLOG-1abc5691405e80baa346dcda909b50f0';
  
  // Mock blog posts - In production, this would fetch from Notion API
  private mockBlogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Understanding Garbage Burning: Environmental Impact and Alternatives',
      content: 'Garbage burning is a common practice in many urban areas, but it has severe environmental and health consequences...',
      excerpt: 'Learn about the harmful effects of garbage burning and discover eco-friendly alternatives.',
      category: 'Environment',
      tags: ['waste management', 'air pollution', 'health'],
      publishedAt: new Date('2024-01-15'),
      author: 'GEODHA Team',
      imageUrl: '/images/blog/garbage-burning.jpg',
      readTimeMinutes: 5
    },
    {
      id: '2',
      title: 'Waste Segregation: A Citizen\'s Guide',
      content: 'Proper waste segregation is the first step towards effective waste management...',
      excerpt: 'Master the art of waste segregation with this comprehensive guide.',
      category: 'Education',
      tags: ['waste segregation', 'recycling', 'sustainability'],
      publishedAt: new Date('2024-01-10'),
      author: 'Environmental Expert',
      imageUrl: '/images/blog/waste-segregation.jpg',
      readTimeMinutes: 7
    },
    {
      id: '3',
      title: 'Preventing Waterlogging: Community Solutions',
      content: 'Waterlogging is a major urban problem that can be addressed through community action...',
      excerpt: 'Discover how communities can work together to prevent waterlogging issues.',
      category: 'Community Action',
      tags: ['waterlogging', 'drainage', 'community'],
      publishedAt: new Date('2024-01-05'),
      author: 'Urban Planner',
      imageUrl: '/images/blog/waterlogging.jpg',
      readTimeMinutes: 6
    },
    {
      id: '4',
      title: 'Air Quality Monitoring: What Citizens Can Do',
      content: 'Citizens can play a crucial role in monitoring and improving air quality in their neighborhoods...',
      excerpt: 'Learn how to monitor air quality and take action to improve it.',
      category: 'Air Quality',
      tags: ['air quality', 'pollution monitoring', 'citizen science'],
      publishedAt: new Date('2024-01-01'),
      author: 'Air Quality Specialist',
      imageUrl: '/images/blog/air-quality.jpg',
      readTimeMinutes: 8
    }
  ];

  // Get all blog posts
  async getBlogPosts(limit?: number): Promise<BlogPost[]> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const posts = this.mockBlogPosts.sort((a, b) => 
        b.publishedAt.getTime() - a.publishedAt.getTime()
      );
      
      return limit ? posts.slice(0, limit) : posts;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  // Get blog post by ID
  async getBlogPost(id: string): Promise<BlogPost | null> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const post = this.mockBlogPosts.find(post => post.id === id);
      return post || null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  }

  // Get blog posts by category
  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return this.mockBlogPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching blog posts by category:', error);
      throw error;
    }
  }

  // Search blog posts
  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const lowercaseQuery = query.toLowerCase();
      return this.mockBlogPosts.filter(post =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    } catch (error) {
      console.error('Error searching blog posts:', error);
      throw error;
    }
  }

  // Get personalized blog suggestions based on user's report history
  async getPersonalizedSuggestions(userReportCategories: string[]): Promise<BlogPost[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Map report categories to blog categories
      const categoryMapping: Record<string, string[]> = {
        'garbage': ['Environment', 'Education'],
        'sewage': ['Community Action', 'Environment'],
        'burning': ['Environment', 'Air Quality'],
        'construction': ['Community Action'],
        'pollution': ['Air Quality', 'Environment']
      };
      
      const relevantCategories = userReportCategories.flatMap(
        category => categoryMapping[category] || []
      );
      
      return this.mockBlogPosts.filter(post =>
        relevantCategories.includes(post.category)
      ).slice(0, 3);
    } catch (error) {
      console.error('Error getting personalized suggestions:', error);
      throw error;
    }
  }

  // Get the direct Notion page URL for embedding
  getNotionPageUrl(): string {
    return this.notionPageUrl;
  }

  // Get blog categories
  async getBlogCategories(): Promise<string[]> {
    try {
      const posts = await this.getBlogPosts();
      const categories = [...new Set(posts.map(post => post.category))];
      return categories.sort();
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      throw error;
    }
  }
}

export const blogService = new BlogService();