import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[hsl(var(--glass-border))]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center animate-glow">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
              LuxeHome
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#properties" className="text-foreground hover:text-primary transition-colors">
              Properties
            </a>
            <a href="#featured" className="text-foreground hover:text-primary transition-colors">
              Featured
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <ThemeSwitcher />
            <Button variant="default" className="bg-gradient-gold hover:shadow-glow transition-all">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
