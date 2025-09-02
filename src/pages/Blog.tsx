import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Clock, Search, BookOpen, ExternalLink, User } from "lucide-react";
import { blogService, type BlogPost } from "@/services/blogService";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadBlogPosts();
    loadCategories();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [blogPosts, selectedCategory, searchQuery]);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const posts = await blogService.getBlogPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      toast({
        title: "Error Loading Posts",
        description: "Failed to load blog posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = await blogService.getBlogCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const filterPosts = () => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(filtered);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const searchResults = await blogService.searchBlogPosts(searchQuery);
        setFilteredPosts(searchResults);
      } catch (error) {
        console.error('Error searching posts:', error);
      }
    } else {
      filterPosts();
    }
  };

  const openNotionPage = () => {
    window.open(blogService.getNotionPageUrl(), '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Knowledge Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn about environmental issues, discover solutions, and stay informed with our comprehensive guides
          </p>
          
          <Button variant="outline" onClick={openNotionPage} className="mt-4">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Full Blog on Notion
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="shadow-soft hover:shadow-glow transition-all duration-300 group">
              {post.imageUrl && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                  <Separator orientation="vertical" className="h-3" />
                  <Clock className="h-3 w-3" />
                  <span>{post.readTimeMinutes} min read</span>
                </div>
                
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.publishedAt.toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Articles Found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No articles available at the moment.'}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <Card className="shadow-soft bg-gradient-subtle">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Want to Contribute?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Share your knowledge and experiences with the community. Help others learn about environmental issues and solutions.
            </p>
            <Button variant="hero" size="lg" onClick={openNotionPage}>
              <ExternalLink className="h-5 w-5 mr-2" />
              Contribute to Blog
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;