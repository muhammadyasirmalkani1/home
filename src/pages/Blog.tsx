import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";

const blogArticles = [
  {
    id: "getting-started-react",
    title: "Getting Started with React: A Comprehensive Guide",
    excerpt: "Learn the fundamentals of React and start building modern web applications with this step-by-step guide for beginners.",
    category: "Tutorial",
    author: "John Doe",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "/placeholder.svg",
  },
  {
    id: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS: Tips and Tricks",
    excerpt: "Discover advanced techniques and best practices for building beautiful, responsive designs with Tailwind CSS.",
    category: "Design",
    author: "Jane Smith",
    date: "2024-01-20",
    readTime: "6 min read",
    image: "/placeholder.svg",
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for 2024",
    excerpt: "Explore the latest TypeScript features and learn how to write type-safe, maintainable code in your projects.",
    category: "Development",
    author: "Mike Johnson",
    date: "2024-01-25",
    readTime: "10 min read",
    image: "/placeholder.svg",
  },
  {
    id: "modern-web-performance",
    title: "Modern Web Performance Optimization",
    excerpt: "Boost your website's performance with these proven optimization techniques and tools used by industry leaders.",
    category: "Performance",
    author: "Sarah Williams",
    date: "2024-02-01",
    readTime: "12 min read",
    image: "/placeholder.svg",
  },
  {
    id: "ui-ux-principles",
    title: "Essential UI/UX Design Principles",
    excerpt: "Master the core principles of user interface and user experience design to create intuitive, user-friendly applications.",
    category: "Design",
    author: "David Brown",
    date: "2024-02-05",
    readTime: "7 min read",
    image: "/placeholder.svg",
  },
  {
    id: "state-management-guide",
    title: "Complete Guide to State Management in React",
    excerpt: "Navigate through different state management solutions and choose the right one for your React application.",
    category: "Tutorial",
    author: "Emily Davis",
    date: "2024-02-10",
    readTime: "15 min read",
    image: "/placeholder.svg",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Tutorial":
      return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
    case "Design":
      return "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30";
    case "Development":
      return "bg-green-500/20 text-green-400 hover:bg-green-500/30";
    case "Performance":
      return "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Blog = () => {
  return (
    <div className="relative min-h-screen">
      <VideoBackground />
      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-gold bg-clip-text text-transparent">
                Blog & Articles
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on web development, design, and technology
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article, index) => (
              <Card
                key={article.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-background/60 backdrop-blur-sm border-border/50 animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                {/* Article Image */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="space-y-3">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full group/btn justify-between"
                  >
                    <Link to={`/blog/${article.id}`}>
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Categories Section */}
          <div className="mt-20 p-8 bg-background/60 backdrop-blur-sm rounded-lg border border-border/50">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-gold bg-clip-text text-transparent">
              Explore by Category
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 cursor-pointer text-base px-4 py-2">
                Tutorial
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 cursor-pointer text-base px-4 py-2">
                Design
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 cursor-pointer text-base px-4 py-2">
                Development
              </Badge>
              <Badge className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 cursor-pointer text-base px-4 py-2">
                Performance
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
