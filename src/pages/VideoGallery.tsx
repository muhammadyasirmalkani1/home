import { Play, X, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import VideoBackground from "@/components/VideoBackground";

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const videoSteps = [
    {
      id: 1,
      title: "Step 1: Introduction & Overview",
      description: "Get started with the basics and understand the fundamentals",
      thumbnail: "/img/DevFort.app.gif",
      videoUrl: "https://www.youtube.com/embed/3IVCeyrFch4?si=uHKOuuDdVqu-szvc",
      duration: "5:30",
      category: "Beginner",
    },
    {
      id: 2,
      title: "Step 2: Setup & Configuration",
      description: "Learn how to set up your environment and configure settings",
      thumbnail: "/img/DevFort.app.gif",
      videoUrl: "/videos/Business.mp4",
      duration: "8:45",
      category: "Beginner",
    },
    {
      id: 3,
      title: "Step 3: Core Concepts",
      description: "Master the essential concepts and techniques",
      thumbnail: "/img/DevFort.app.gif",
      videoUrl: "https://www.youtube.com/embed/_k0gSkyxhr8?si=DOe3M9n_S1HPPcC1",
      duration: "12:20",
      category: "Intermediate",
    },
    {
      id: 4,
      title: "Step 4: Advanced Features",
      description: "Explore advanced features and best practices",
      thumbnail: "/img/loading-screen.png",
      videoUrl: "public/videos/Business.mp4",
      duration: "15:10",
      category: "Advanced",
    },
    {
      id: 5,
      title: "Step 5: Real-world Examples",
      description: "Apply your knowledge with practical examples",
      thumbnail: "/img/loading-screen.png",
      videoUrl: "https://www.youtube.com/embed/3IVCeyrFch4?si=uHKOuuDdVqu-szvc",
      duration: "18:30",
      category: "Advanced",
    },
    {
      id: 6,
      title: "Step 6: Final Project",
      description: "Build a complete project from start to finish",
      thumbnail: "/img/loading-screen.png",
      videoUrl: "https://www.youtube.com/embed/3IVCeyrFch4?si=uHKOuuDdVqu-szvc",
      duration: "25:45",
      category: "Expert",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Beginner":
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
      case "Intermediate":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30";
      case "Advanced":
        return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30";
      case "Expert":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const categories = ["All", "Beginner", "Intermediate", "Advanced", "Expert"];
  
  const filteredVideos = selectedCategory === "All" 
    ? videoSteps 
    : videoSteps.filter(video => video.category === selectedCategory);

  return (
    <div className="relative min-h-screen overflow-hidden">
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
                Video Gallery
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow our step-by-step video tutorials to master every aspect
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video, index) => (
              <Card
                key={video.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden bg-background/60 backdrop-blur-sm border-border/50 animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
                onClick={() => video.videoUrl && setSelectedVideo(video.videoUrl)}
              >
                <CardContent className="p-0">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium border border-border/50">
                      {video.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(video.category)}>
                        {video.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Video {video.id}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Learning Path */}
          <div className="mt-20 p-8 bg-background/60 backdrop-blur-sm rounded-lg border border-border/50 text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-gold bg-clip-text text-transparent">
              Your Learning Path
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Badge className="bg-blue-500/20 text-blue-400">Beginner</Badge>
              <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-blue-400 to-green-400" />
              <Badge className="bg-green-500/20 text-green-400">Intermediate</Badge>
              <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-green-400 to-yellow-400" />
              <Badge className="bg-yellow-500/20 text-yellow-400">Advanced</Badge>
              <div className="hidden md:block w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-red-400" />
              <Badge className="bg-red-500/20 text-red-400">Expert</Badge>
            </div>
          </div>

          {/* Video Modal */}
          {selectedVideo && (
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <div
                className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  onClick={() => setSelectedVideo(null)}
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 rounded-full bg-background/90 hover:bg-background backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </Button>
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedVideo}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;