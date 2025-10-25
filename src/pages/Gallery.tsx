import Navigation from "@/components/Navigation";
import { Play } from "lucide-react";
import Link from "next/link";

const Gallery = () => {
  const videos = [
    { 
      id: 1, 
      title: "Project Demo 1", 
      thumbnail: "bg-gradient-to-br from-primary to-primary/50",
      href: "/videos/demo-1" 
    },
    { 
      id: 2, 
      title: "Project Demo 2", 
      thumbnail: "bg-gradient-to-br from-blue-500 to-blue-700",
      href: "/videos/demo-2" 
    },
    { 
      id: 3, 
      title: "Project Demo 3", 
      thumbnail: "bg-gradient-to-br from-green-500 to-green-700",
      href: "/videos/demo-3" 
    },
    { 
      id: 4, 
      title: "Project Demo 4", 
      thumbnail: "bg-gradient-to-br from-red-500 to-red-700",
      href: "/videos/demo-4" 
    },
    { 
      id: 5, 
      title: "Project Demo 5", 
      thumbnail: "bg-gradient-to-br from-yellow-500 to-yellow-700",
      href: "/videos/demo-5" 
    },
    { 
      id: 6, 
      title: "Project Demo 6", 
      thumbnail: "bg-gradient-to-br from-purple-500 to-purple-700",
      href: "/videos/demo-6" 
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-12">Video Gallery</h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Link key={video.id} href={video.href} className="block">
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