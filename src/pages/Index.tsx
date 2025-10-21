import VideoBackground from "@/components/VideoBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <VideoBackground />
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedProperties />
      </main>
    </div>
  );
};

export default Index;
