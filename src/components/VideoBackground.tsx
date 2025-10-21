const VideoBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-overlay" />
    </div>
  );
};

export default VideoBackground;
