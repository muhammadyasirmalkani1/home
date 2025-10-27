import VideoBackground from "@/components/VideoBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <VideoBackground />
      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />
        <main>
          <HeroSection />
          <StatsSection />
          <FeaturedProperties />
        </main>
      </div>
    </div>
  );
};

export default Index;
