import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Import UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

// Import icons
import { 
  Home, 
  User, 
  Briefcase, 
  Mail,
  GraduationCap,
  Image,
  DollarSign,
  Code2,
  Database,
  Globe,
  Server,
  Smartphone,
  Palette,
  GitBranch,
  Zap,
  Award,
  Users,
  TrendingUp,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowRight,
  Search,
  Phone,
  Star,
  ChevronDown,
  Menu,
  X,
  Palette as PaletteIcon
} from "lucide-react";

const queryClient = new QueryClient();

// ===== THEME SWITCHER =====
const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const themes = [
    { name: "Dark", value: "dark", color: "bg-slate-800", ring: "ring-slate-600" },
    { name: "Light", value: "light", color: "bg-slate-100", ring: "ring-slate-300" },
    { name: "Blue", value: "blue", color: "bg-blue-500", ring: "ring-blue-400" },
    { name: "Red", value: "red", color: "bg-red-500", ring: "ring-red-400" },
    { name: "Green", value: "green", color: "bg-emerald-500", ring: "ring-emerald-400" },
    { name: "Yellow", value: "yellow", color: "bg-yellow-400", ring: "ring-yellow-300" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <div className="relative">
      <Button variant="outline" size="icon" className="border-border hover:border-primary">
        <PaletteIcon className="h-5 w-5" />
      </Button>
      <div className="absolute top-12 right-0 w-52 bg-card border border-border rounded-lg shadow-xl p-2 hidden">
        <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border/50">
          Choose Theme
        </div>
        {themes.map((theme) => (
          <div
            key={theme.value}
            onClick={() => changeTheme(theme.value)}
            className={`flex items-center gap-3 cursor-pointer my-1 px-3 py-2.5 rounded-md ${
              currentTheme === theme.value ? 'bg-primary/10' : ''
            }`}
          >
            <div className={`w-6 h-6 rounded-lg ${theme.color} ${
              currentTheme === theme.value ? `${theme.ring} ring-2` : 'border-2 border-border'
            } shadow-sm transition-all`} />
            <span className={`font-medium ${
              currentTheme === theme.value ? 'text-primary' : 'text-foreground'
            }`}>
              {theme.name}
            </span>
            {currentTheme === theme.value && (
              <span className="ml-auto text-primary text-xs">✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== NAVIGATION =====
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? "backdrop-blur-xl bg-background/90 border-b border-border shadow-lg py-2" 
        : "backdrop-blur-md bg-background/70 border-b border-border py-4"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center animate-pulse">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                LuxeHome
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Luxury Real Estate
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {['Home', 'About', 'Properties', 'Services', 'Gallery', 'Pricing'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-foreground/80 hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
            <ThemeSwitcher />
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-lg transition-all">
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

// ===== HERO SECTION =====
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
          <span className="block text-foreground">Discover Your</span>
          <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-pulse">
            Dream Home
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Explore luxury properties that redefine elegance and comfort in prime locations
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:shadow-lg transition-all text-lg px-8 py-6">
            View Properties
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6">
            <Search className="mr-2 w-5 h-5" />
            Search Homes
          </Button>
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

// ===== STATS SECTION =====
const StatsSection = () => {
  const stats = [
    { icon: Home, value: "500+", label: "Premium Properties", description: "Carefully curated luxury homes" },
    { icon: Users, value: "10K+", label: "Happy Clients", description: "Satisfied homeowners worldwide" },
    { icon: Award, value: "25+", label: "Awards Won", description: "Industry recognition & excellence" },
    { icon: TrendingUp, value: "98%", label: "Success Rate", description: "Client satisfaction guaranteed" }
  ];

  return (
    <section className="py-24 px-6 bg-background/50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="group relative p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary transition-all duration-500">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-500">
                  <stat.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-semibold text-foreground">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== FEATURED PROPERTIES =====
const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: "Modern Villa Residence",
      location: "Beverly Hills, CA",
      price: "$4,500,000",
      beds: 5,
      baths: 4,
      sqft: "4,200",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Luxury Penthouse Suite",
      location: "Manhattan, NY",
      price: "$8,200,000",
      beds: 4,
      baths: 3,
      sqft: "3,800",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      featured: true
    },
    {
      id: 3,
      title: "Coastal Paradise Estate",
      location: "Malibu, CA",
      price: "$6,750,000",
      beds: 6,
      baths: 5,
      sqft: "5,500",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      featured: false
    }
  ];

  return (
    <section className="py-24 px-6" id="properties">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-bold">
            <span className="text-foreground">Featured </span>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Properties</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked exclusive properties from our premium collection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="group overflow-hidden bg-card/80 backdrop-blur-sm border-border hover:border-primary transition-all duration-500 hover:shadow-lg hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {property.featured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 border-0">
                    Featured
                  </Badge>
                )}
                <div className="absolute bottom-4 left-4">
                  <div className="text-3xl font-bold text-white drop-shadow-lg">
                    {property.price}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {property.location}
                </div>

                <div className="flex justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-1">
                    <Bed className="w-4 h-4 text-primary" />
                    <span className="text-sm">{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4 text-primary" />
                    <span className="text-sm">{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="w-4 h-4 text-primary" />
                    <span className="text-sm">{property.sqft} sqft</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== SKILLS SECTION =====
const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Globe,
      skills: [
        { name: "React/Next.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "Tailwind CSS", level: 90 },
      ]
    },
    {
      title: "Backend Development", 
      icon: Server,
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Python", level: 85 },
        { name: "Express.js", level: 90 },
        { name: "API Development", level: 92 },
      ]
    },
    {
      title: "Database & Cloud",
      icon: Database,
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 88 },
        { name: "AWS/Azure", level: 80 },
        { name: "Docker", level: 82 },
      ]
    }
  ];

  return (
    <section className="py-24 px-6 bg-background/30" id="skills">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl font-bold">
            <span className="text-foreground">Skills & </span>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground">Comprehensive technical skills and professional expertise</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="glass-card p-6 hover-lift">
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2 bg-white/10" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ===== MAIN APP COMPONENT =====
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <main>
            <HeroSection />
            <StatsSection />
            <FeaturedProperties />
            <Skills />
            {/* Add other sections as needed */}
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;