import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Play, Search, Filter, Grid3X3, List } from "lucide-react";

type Video = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  views: string;
  uploadDate: string;
  videoUrl: string;
};

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      id: 1,
      title: "Modern Web Development",
      description: "Building responsive web applications with React and Next.js",
      thumbnail: "bg-gradient-to-br from-purple-500 to-purple-700",
      duration: "12:34",
      category: "web",
      views: "24K",
      uploadDate: "2024-01-15",
      videoUrl: "/Videos/Business.mp4"
    },
    {
      id: 2,
      title: "Mobile App Design",
      description: "Creating beautiful mobile interfaces with modern design principles",
      thumbnail: "bg-gradient-to-br from-blue-500 to-blue-700",
      duration: "08:21",
      category: "design",
      views: "18K",
      uploadDate: "2024-01-12",
      videoUrl: "/Videos/Business.mp4"
    },
    {
      id: 3,
      title: "Cloud Architecture",
      description: "Scalable cloud solutions and infrastructure design",
      thumbnail: "bg-gradient-to-br from-green-500 to-green-700",
      duration: "15:42",
      category: "cloud",
      views: "32K",
      uploadDate: "2024-01-10",
      videoUrl: "/videos/cloud-architecture"
    },
    {
      id: 4,
      title: "UI/UX Principles",
      description: "Essential user experience design patterns and best practices",
      thumbnail: "bg-gradient-to-br from-red-500 to-red-700",
      duration: "10:15",
      category: "design",
      views: "28K",
      uploadDate: "2024-01-08",
      videoUrl: "/videos/ui-ux-principles"
    },
    {
      id: 5,
      title: "DevOps Pipeline",
      description: "Automated deployment and continuous integration workflows",
      thumbnail: "bg-gradient-to-br from-yellow-500 to-yellow-700",
      duration: "14:33",
      category: "devops",
      views: "21K",
      uploadDate: "2024-01-05",
      videoUrl: "/videos/devops-pipeline"
    },
    {
      id: 6,
      title: "AI Integration",
      description: "Implementing machine learning in modern applications",
      thumbnail: "bg-gradient-to-br from-indigo-500 to-indigo-700",
      duration: "18:09",
      category: "ai",
      views: "45K",
      uploadDate: "2024-01-03",
      videoUrl: "/videos/ai-integration"
    },
    {
      id: 7,
      title: "Database Optimization",
      description: "Advanced techniques for database performance and scaling",
      thumbnail: "bg-gradient-to-br from-pink-500 to-pink-700",
      duration: "11:27",
      category: "database",
      views: "16K",
      uploadDate: "2024-01-01",
      videoUrl: "/videos/database-optimization"
    },
    {
      id: 8,
      title: "Security Best Practices",
      description: "Modern web application security and vulnerability prevention",
      thumbnail: "bg-gradient-to-br from-orange-500 to-orange-700",
      duration: "13:45",
      category: "security",
      views: "29K",
      uploadDate: "2023-12-28",
      videoUrl: "/videos/security-practices"
    },
    {
      id: 9,
      title: "Microservices Architecture",
      description: "Building scalable systems with microservices patterns",
      thumbnail: "bg-gradient-to-br from-teal-500 to-teal-700",
      duration: "16:52",
      category: "architecture",
      views: "37K",
      uploadDate: "2023-12-25",
      videoUrl: "/videos/microservices"
    }
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "web", name: "Web Development" },
    { id: "design", name: "Design" },
    { id: "cloud", name: "Cloud" },
    { id: "devops", name: "DevOps" },
    { id: "ai", name: "AI/ML" },
    { id: "database", name: "Database" },
    { id: "security", name: "Security" },
    { id: "architecture", name: "Architecture" }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    // For demo, we'll just log the click. In real app, you'd navigate or show modal
    console.log("Playing video:", video.title);
    // You can use: router.push(video.videoUrl) for navigation
    // Or set up a modal: setIsModalOpen(true)
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Video Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of tutorials, demos, and project showcases
            </p>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-card border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredVideos.length} of {videos.length} videos
            </p>
          </div>

          {/* Video Grid/List */}
          <div className={
            viewMode === "grid" 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }>
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => handleVideoClick(video)}
                className={`
                  group relative bg-card border border-border rounded-xl overflow-hidden 
                  hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 
                  cursor-pointer transform hover:-translate-y-1
                  ${viewMode === "list" ? "flex gap-4 p-4" : ""}
                `}
              >
                {/* Thumbnail */}
                <div className={`
                  relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-video"}
                  ${video.thumbnail}
                `}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-background/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded-md">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className={`${viewMode === "list" ? "flex-1" : "p-5"}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full capitalize">
                      {categories.find(cat => cat.id === video.category)?.name.replace("Categories", "").trim()}
                    </span>
                    <span>{video.views} views</span>
                    <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No videos found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Gallery;