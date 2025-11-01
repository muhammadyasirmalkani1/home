import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";

// Article data (in a real app, this would come from an API or database)
const articlesData: Record<string, any> = {
  "getting-started-react": {
    id: "getting-started-react",
    title: "Getting Started with React: A Comprehensive Guide",
    category: "Tutorial",
    author: "John Doe",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "/placeholder.svg",
    content: `
      <h2>Introduction to React</h2>
      <p>React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we'll cover everything you need to know to get started with React development.</p>
      
      <h3>What is React?</h3>
      <p>React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".</p>
      
      <h3>Setting Up Your Development Environment</h3>
      <p>Before we dive into React, let's set up your development environment. You'll need Node.js and npm installed on your machine. Once you have those, you can create a new React application using Create React App.</p>
      
      <h3>Understanding Components</h3>
      <p>Components are the building blocks of any React application. They are reusable pieces of code that return HTML elements to be rendered on the page. Components can be functional or class-based.</p>
      
      <h3>State and Props</h3>
      <p>State and props are fundamental concepts in React. Props are read-only and allow you to pass data from parent to child components, while state is managed within a component and can change over time.</p>
      
      <h3>Getting Started with Hooks</h3>
      <p>React Hooks let you use state and other React features without writing a class. The most commonly used hooks are useState and useEffect, which handle state management and side effects respectively.</p>
      
      <h3>Next Steps</h3>
      <p>Now that you understand the basics, start building your own React applications. Practice is key to mastering React development. Try creating small projects and gradually increase complexity.</p>
    `,
  },
  "mastering-tailwind-css": {
    id: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS: Tips and Tricks",
    category: "Design",
    author: "Jane Smith",
    date: "2024-01-20",
    readTime: "6 min read",
    image: "/placeholder.svg",
    content: `
      <h2>Why Tailwind CSS?</h2>
      <p>Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML.</p>
      
      <h3>Key Benefits</h3>
      <p>Tailwind CSS offers rapid development, consistent design systems, and highly customizable configurations that adapt to your project needs.</p>
      
      <h3>Best Practices</h3>
      <p>Learn to use @apply directives, extract components, and configure your tailwind.config.js for optimal results.</p>
    `,
  },
  "typescript-best-practices": {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for 2024",
    category: "Development",
    author: "Mike Johnson",
    date: "2024-01-25",
    readTime: "10 min read",
    image: "/placeholder.svg",
    content: `
      <h2>Modern TypeScript Development</h2>
      <p>TypeScript has evolved significantly, bringing powerful features that enhance code quality and developer experience.</p>
      
      <h3>Type Safety</h3>
      <p>Leverage TypeScript's type system to catch errors at compile time and improve code reliability.</p>
      
      <h3>Advanced Types</h3>
      <p>Explore union types, intersection types, and mapped types to write more expressive code.</p>
    `,
  },
  "modern-web-performance": {
    id: "modern-web-performance",
    title: "Modern Web Performance Optimization",
    category: "Performance",
    author: "Sarah Williams",
    date: "2024-02-01",
    readTime: "12 min read",
    image: "/placeholder.svg",
    content: `
      <h2>Performance Matters</h2>
      <p>Web performance directly impacts user experience, engagement, and conversion rates.</p>
      
      <h3>Core Web Vitals</h3>
      <p>Focus on LCP, FID, and CLS to deliver exceptional user experiences.</p>
      
      <h3>Optimization Techniques</h3>
      <p>Implement lazy loading, code splitting, and efficient caching strategies.</p>
    `,
  },
  "ui-ux-principles": {
    id: "ui-ux-principles",
    title: "Essential UI/UX Design Principles",
    category: "Design",
    author: "David Brown",
    date: "2024-02-05",
    readTime: "7 min read",
    image: "/placeholder.svg",
    content: `
      <h2>Design That Works</h2>
      <p>Great UI/UX design combines aesthetics with functionality to create delightful user experiences.</p>
      
      <h3>Core Principles</h3>
      <p>Master consistency, hierarchy, and accessibility in your designs.</p>
      
      <h3>User-Centered Design</h3>
      <p>Always design with your users' needs and behaviors in mind.</p>
    `,
  },
  "state-management-guide": {
    id: "state-management-guide",
    title: "Complete Guide to State Management in React",
    category: "Tutorial",
    author: "Emily Davis",
    date: "2024-02-10",
    readTime: "15 min read",
    image: "/placeholder.svg",
    content: `
      <h2>State Management Solutions</h2>
      <p>Choosing the right state management solution is crucial for building scalable React applications.</p>
      
      <h3>Context API</h3>
      <p>Use React's built-in Context API for simple to moderate state management needs.</p>
      
      <h3>Redux and Alternatives</h3>
      <p>Explore Redux, Zustand, and Recoil for complex state management requirements.</p>
    `,
  },
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Tutorial":
      return "bg-blue-500/20 text-blue-400";
    case "Design":
      return "bg-purple-500/20 text-purple-400";
    case "Development":
      return "bg-green-500/20 text-green-400";
    case "Performance":
      return "bg-orange-500/20 text-orange-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const BlogArticle = () => {
  const { articleId } = useParams();
  const article = articleId ? articlesData[articleId] : null;

  if (!article) {
    return (
      <div className="relative min-h-screen">
        <VideoBackground />
        <div className="relative z-10">
          <Navbar />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <VideoBackground />
      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            asChild
            variant="ghost"
            className="mb-8 animate-fade-in"
          >
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 space-y-6 animate-fade-in">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Share Button */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-video rounded-lg overflow-hidden mb-12 animate-fade-in">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <Card className="p-8 md:p-12 bg-background/60 backdrop-blur-sm border-border/50 animate-fade-in">
              <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </CardContent>
            </Card>

            {/* Related Articles CTA */}
            <div className="mt-12 p-8 bg-gradient-gold/10 rounded-lg border border-primary/20 text-center animate-fade-in">
              <h3 className="text-2xl font-bold mb-4">Enjoyed this article?</h3>
              <p className="text-muted-foreground mb-6">
                Check out more articles on our blog
              </p>
              <Button asChild size="lg">
                <Link to="/blog">
                  Explore More Articles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
