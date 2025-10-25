import { useEffect, useRef, useState } from "react";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Check if user is on Safari (which has stricter autoplay policies)
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafariBrowser);

    const initializeVideo = async () => {
      if (!videoRef.current) return;

      try {
        // Set video attributes for better performance
        videoRef.current.setAttribute('muted', '');
        videoRef.current.setAttribute('playsinline', '');
        videoRef.current.setAttribute('webkit-playsinline', '');
        videoRef.current.setAttribute('preload', 'auto');

        // Wait for video to be ready
        await videoRef.current.play();
        
        setIsLoading(false);
        console.log("✅ Video background loaded successfully");
      } catch (error) {
        console.warn("⚠️ Video autoplay failed, implementing fallback:", error);
        setHasError(true);
        setIsLoading(false);
        
        // Fallback: Try to play on user interaction
        const handleUserInteraction = () => {
          if (videoRef.current) {
            videoRef.current.play().catch(console.error);
          }
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('touchstart', handleUserInteraction);
        };
        
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initializeVideo, 100);

    return () => {
      clearTimeout(timer);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    };
  }, []);

  // Fallback background gradient if video fails
  const FallbackBackground = () => (
    <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 animate-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60" />
      
      {/* Animated particles fallback */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {!hasError ? (
        <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-slate-900 z-10 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-white/70 text-sm">Loading immersive experience...</span>
              </div>
            </div>
          )}
          
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ 
              filter: "brightness(0.6) contrast(1.2) saturate(1.1)",
              opacity: isLoading ? 0 : 1
            }}
            onLoadedData={() => {
              console.log("🎥 Video data loaded");
              setIsLoading(false);
            }}
            onCanPlay={() => {
              console.log("▶️ Video can play");
              setIsLoading(false);
            }}
            onError={(e) => {
              console.error("❌ Video error:", e);
              setHasError(true);
              setIsLoading(false);
            }}
            onWaiting={() => {
              console.log("⏳ Video waiting for data");
              setIsLoading(true);
            }}
            onPlaying={() => {
              console.log("🎬 Video playing");
              setIsLoading(false);
            }}
          >
            {/* Multiple video sources for better browser compatibility */}
            <source src="/videos/background.mp4" type="video/mp4" />
            <source src="/videos/background.webm" type="video/webm" />
            <source src="/videos/background.ogv" type="video/ogg" />
            
            {/* Fallback image if video format not supported */}
            <img 
              src="/images/background-fallback.jpg" 
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            Your browser does not support the video tag.
          </video>
          
          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_black/80_100%)]" />
          
          {/* Subtle animated elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-float-delayed" />
          </div>

          {/* Safari-specific notice */}
          {isSafari && !isLoading && !hasError && (
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 max-w-xs">
              <p className="text-xs text-white/70">
                For best experience, ensure "Auto-Play" is enabled in your Safari settings.
              </p>
            </div>
          )}
        </div>
      ) : (
        <FallbackBackground />
      )}
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.8; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { 
          animation: float 8s ease-in-out infinite; 
        }
        .animate-float-delayed { 
          animation: float-delayed 12s ease-in-out infinite; 
        }
        .animate-gradient { 
          background-size: 400% 400%;
          animation: gradient 15s ease infinite; 
        }
      `}</style>
    </>
  );
};

export default VideoBackground;