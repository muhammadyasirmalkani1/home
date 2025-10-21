import { useEffect, useRef } from "react";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force video to play
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-[scale_20s_ease-in-out_infinite]"
        style={{ filter: "brightness(1.2) contrast(1.15)" }}
        onLoadedData={() => console.log("Video loaded successfully")}
        onError={(e) => console.error("Video error:", e)}
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-overlay backdrop-blur-[0.5px]" />
    </div>
  );
};

export default VideoBackground;
