import Navigation from "@/components/Navigation";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const videos = [
    { 
      id: 1, 
      title: "Project Demo 1", 
      thumbnail: "bg-gradient-to-br from-primary to-primary/50",
      to: "/Videos/Business.mp4" 
    },
    { 
      id: 2, 
      title: "Project Demo 2", 
      thumbnail: "bg-gradient-to-br from-primary to-primary/50",
      to: "/Videos/Business.mp4" 
    },
    // ... other videos
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-12">Video Gallery</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Link key={video.id} to={video.to} className="block">
                <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-glow transition-all cursor-pointer">
                  <div className={`aspect-video ${video.thumbnail} flex items-center justify-center`}>
                    <div className="w-16 h-16 bg-background/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">{video.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;