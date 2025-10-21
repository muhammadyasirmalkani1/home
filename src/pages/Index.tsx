import VideoBackground from "@/components/VideoBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <VideoBackground />
      <div className="relative z-10">
        <Navigation />
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
