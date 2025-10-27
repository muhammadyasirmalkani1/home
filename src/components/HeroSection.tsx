import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import TechStackSlider from "@/components/TechStackSlider";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
          <span className="block text-foreground">Discover Your</span>
          <span className="block bg-gradient-gold bg-clip-text text-transparent animate-glow">
            Dream Home
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Modern responsive navigation with a left sidebar for md+ and a slide-over drawer for mobile.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button 
            asChild
            size="lg"
            className="bg-gradient-gold hover:shadow-glow transition-all text-lg px-8 py-6"
          >
            <Link to="/properties">
              View Properties
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button 
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6"
          >
            <Link to="/properties">
              <Search className="mr-2 w-5 h-5" />
              Search Homes
            </Link>
          </Button>
        </div>

        {/* Logo Slider Section */}
        <div className="pt-16">
          <TechStackSlider />
        </div>

        <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Properties</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">50+</div>
            <div className="text-muted-foreground">Locations</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">98%</div>
            <div className="text-muted-foreground">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
