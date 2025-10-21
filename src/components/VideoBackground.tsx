const VideoBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-[scale_20s_ease-in-out_infinite]"
        style={{ filter: "brightness(1.1) contrast(1.1)" }}
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-overlay backdrop-blur-[1px]" />
    </div>
  );
};

export default VideoBackground;
