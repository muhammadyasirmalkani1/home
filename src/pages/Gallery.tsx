"use client";

import { Play, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const Gallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Inject 3D background animation CSS
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      /* === 3D Background Animation === */
      .background-3d {
        position: fixed;
        inset: 0;
        overflow: hidden;
        z-index: -1;
        background: radial-gradient(circle at 50% 50%, #0a0a0f 0%, #050507 100%);
        perspective: 1000px;
      }

      .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(100px);
        opacity: 0.6;
        animation: float 20s infinite ease-in-out alternate;
        transform-style: preserve-3d;
      }

      .orb:nth-child(1) {
        width: 600px;
        height: 600px;
        top: -100px;
        left: -200px;
        background: radial-gradient(circle, rgba(124,58,237,0.6) 0%, rgba(6,182,212,0.3) 100%);
        animation-delay: 0s;
      }

      .orb:nth-child(2) {
        width: 500px;
        height: 500px;
        bottom: -150px;
        right: -100px;
        background: radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(59,130,246,0.3) 100%);
        animation-delay: 2s;
      }

      .orb:nth-child(3) {
        width: 700px;
        height: 700px;
        top: 30%;
        left: 40%;
        background: radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(16,185,129,0.3) 100%);
        animation-delay: 4s;
      }

      @keyframes float {
        0% { transform: translate3d(0px, 0px, 0px) rotate(0deg); }
        50% { transform: translate3d(40px, -40px, 80px) rotate(180deg); }
        100% { transform: translate3d(-60px, 60px, -80px) rotate(360deg); }
      }

      .gradient-text {
        background: linear-gradient(90deg, #7C3AED, #06B6D4);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .glass-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const videoSteps = [
    {
      id: 1,
      title: "Step 1: Introduction & Overview",
      description: "Get started with the basics and understand the fundamentals",
      thumbnail: "/img/DevFort.app.gif",
      videoUrl: "/Video/business.mp4",
      duration: "5:30",
      category: "Beginner",
    },
    {
      id: 2,
      title: "Step 2: Setup & Configuration",
      description: "Learn how to set up your environment and configure settings",
      thumbnail: "/img/DevFort.app.gif",
      videoUrl: "/Video/business.mp4",
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
      videoUrl: "https://www.youtube.com/embed/GWrJZhZqFwQ?si=jVD9tREYOktU0Wyv",
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

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* 3D Animated Background */}
      <div className="background-3d">
        <div className="orb" />
        <div className="orb" />
        <div className="orb" />
      </div>

      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="gradient-text">Video Gallery</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Follow our step-by-step video tutorials to master every aspect
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoSteps.map((video) => (
              <Card
                key={video.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden bg-black/40 backdrop-blur-md border border-white/10"
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
                      <div className="w-16 h-16 rounded-full bg-purple-600/90 group-hover:bg-purple-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(video.category)}>
                        {video.category}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        Video {video.id}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Learning Path */}
          <div className="mt-20 p-8 glass-card rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text">
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
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
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

export default Gallery;