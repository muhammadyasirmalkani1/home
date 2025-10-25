// components/VideoBackground.tsx
import { useEffect, useRef, useState } from "react";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [videoSource, setVideoSource] = useState(0);

  // Multiple video sources for fallback
  const videoSources = [
    // High-quality real estate videos
    "https://videos.pexels.com/video-files/3209810/3209810-uhd_2560_1440_25fps.mp4", // Luxury home drone shot
    "https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4", // Modern architecture
    "https://videos.pexels.com/video-files/3209820/3209820-uhd_2560_1440_25fps.mp4", // City skyline
    "https://videos.pexels.com/video-files/3209824/3209824-uhd_2560_1440_25fps.mp4", // Luxury interior
  ];

  // Fallback background images
  const fallbackImages = [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80", // Modern mansion
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2860&q=80", // Luxury villa
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2856&q=80", // Penthouse interior
  ];

  useEffect(() => {
    const initializeVideo = async () => {
      if (!videoRef.current) return;

      try {
        // Set video attributes for better performance
        videoRef.current.setAttribute('muted', '');
        videoRef.current.setAttribute('playsinline', '');
        videoRef.current.setAttribute('webkit-playsinline', '');
        videoRef.current.setAttribute('preload', 'auto');
        videoRef.current.setAttribute('disablePictureInPicture', '');
        videoRef.current.setAttribute('controlsList', 'nodownload');

        // Try to play the video
        await videoRef.current.play();
        setIsLoading(false);
        console.log("✅ Video background loaded successfully");
      } catch (error) {
        console.warn("⚠️ Video autoplay failed:", error);
        
        // Try next video source
        if (videoSource < videoSources.length - 1) {
          setVideoSource(prev => prev + 1);
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    const timer = setTimeout(initializeVideo, 500);

    return () => {
      clearTimeout(timer);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, [videoSource]);

  const handleVideoError = () => {
    console.error("❌ Video source failed:", videoSources[videoSource]);
    
    if (videoSource < videoSources.length - 1) {
      // Try next video source
      setVideoSource(prev => prev + 1);
    } else {
      // All video sources failed, use fallback
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleVideoLoad = () => {
    console.log("🎥 Video data loaded successfully");
    setIsLoading(false);
  };

  // Fallback animated gradient background
  const FallbackBackground = () => (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 animate-gradient" />
      
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${fallbackImages[0]})`,
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-128 h-128 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );

  // Simple image fallback
  const ImageFallback = () => (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      <img 
        src={fallbackImages[0]} 
        alt="Luxury Real Estate Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.6) contrast(1.1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black/70_100%)]" />
    </div>
  );

  if (hasError) {
    return <FallbackBackground />;
  }

  return (
    <>
      <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-900 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-cyan-500/30 rounded-full" />
                <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" />
              </div>
              <span className="text-white/70 text-sm font-medium">Loading immersive experience...</span>
            </div>
          </div>
        )}

        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ 
            filter: "brightness(0.6) contrast(1.2) saturate(1.1)",
          }}
          onLoadedData={handleVideoLoad}
          onCanPlay={() => setIsLoading(false)}
          onError={handleVideoError}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
        >
          <source src={videoSources[videoSource]} type="video/mp4" />
          {/* Fallback text for unsupported browsers */}
          Your browser does not support the video tag.
        </video>

        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black/60_100%)]" />
        
        {/* Subtle animated elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Performance optimized background for mobile */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-br from-slate-900/80 via-purple-900/80 to-blue-900/80" />
      </div>

      {/* Global animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.3; 
          }
          50% { 
            transform: translateY(-40px) rotate(180deg) scale(1.1); 
            opacity: 0.6; 
          }
        }
        @keyframes float-delayed {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.2; 
          }
          50% { 
            transform: translateY(-60px) rotate(-180deg) scale(1.2); 
            opacity: 0.5; 
          }
        }
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
            opacity: 0.4; 
          }
          50% { 
            transform: translateY(-20px) scale(1.05); 
            opacity: 0.7; 
          }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { 
          animation: float 15s ease-in-out infinite; 
        }
        .animate-float-delayed { 
          animation: float-delayed 20s ease-in-out infinite; 
        }
        .animate-float-slow { 
          animation: float-slow 25s ease-in-out infinite; 
        }
        .animate-gradient { 
          background-size: 400% 400%;
          animation: gradient 20s ease infinite; 
        }
      `}</style>
    </>
  );
};

export default VideoBackground;