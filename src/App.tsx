
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// Import UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  Palette as PaletteIcon,
  Sparkles,
  Rocket,
  Target,
  Clock,
  Shield,
  Heart,
  Building,
  Eye,
  Video,
  Map,
  Calendar,
  CheckCircle,
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  MoveRight,
  Cloud,
  Cpu,
  Zap as Lightning
} from "lucide-react";

const queryClient = new QueryClient();

// ===== CUSTOM HOOKS =====
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return isVisible;
};

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};

// ===== ADVANCED THEME SWITCHER =====
const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { name: "Cosmic", value: "cosmic", color: "bg-gradient-to-br from-purple-600 via-pink-500 to-red-500" },
    { name: "Neon", value: "neon", color: "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600" },
    { name: "Sunset", value: "sunset", color: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-500" },
    { name: "Forest", value: "forest", color: "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700" },
    { name: "Midnight", value: "midnight", color: "bg-gradient-to-br from-slate-800 via-purple-900 to-blue-900" },
    { name: "Royal", value: "royal", color: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "cosmic";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <div className="relative w-6 h-6">
            <PaletteIcon className="w-5 h-5 transition-all group-hover:scale-110 group-hover:rotate-12" />
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-cyan-400 animate-pulse" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-4 glass-card border-white/20 backdrop-blur-xl">
        <div className="flex items-center gap-2 px-2 py-1 mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Choose Your Vibe
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => changeTheme(theme.value)}
              className={`relative p-4 rounded-xl transition-all duration-500 group ${
                currentTheme === theme.value 
                  ? 'ring-2 ring-white/30 scale-105' 
                  : 'hover:scale-105 hover:ring-1 hover:ring-white/20'
              }`}
            >
              <div className={`w-full h-12 rounded-lg ${theme.color} transition-all duration-500`} />
              <span className={`text-xs font-medium mt-2 block text-center transition-colors ${
                currentTheme === theme.value ? 'text-white' : 'text-white/70 group-hover:text-white'
              }`}>
                {theme.name}
              </span>
              {currentTheme === theme.value && (
                <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-white drop-shadow-lg" />
              )}
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ===== MODERN NAVIGATION =====
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Features", href: "#features", icon: Sparkles },
    { name: "Properties", href: "#properties", icon: Building },
    { name: "Services", href: "#services", icon: Rocket },
    { name: "Testimonials", href: "#testimonials", icon: Heart },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <>
      {/* Animated Background */}
      <div 
        className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.15), transparent 80%)`,
          opacity: isScrolled ? 0.3 : 0.1
        }}
      />
      
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? "backdrop-blur-2xl bg-background/80 border-b border-white/10 shadow-2xl py-3" 
          : "backdrop-blur-xl bg-background/40 border-b border-white/5 py-5"
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center space-x-3 group relative">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-ping" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  NEXUS
                </span>
                <span className="text-xs font-medium text-white/60 -mt-1 tracking-wider">
                  REAL ESTATE
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative group py-2 px-1 text-white/80 hover:text-white transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500" />
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <ThemeSwitcher />
              
              <Button className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500">
                <Rocket className="w-4 h-4 mr-2 group-hover:rotate-45 transition-transform" />
                <span>Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white/80 hover:text-white hover:bg-white/10">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card border-l-white/10 w-80 p-0 backdrop-blur-3xl">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        NEXUS
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 p-6 space-y-4">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center space-x-3 p-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                      >
                        <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{item.name}</span>
                        <MoveRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

// ===== MODERN HERO SECTION =====
const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = ["Luxury", "Modern", "Smart", "Sustainable", "Exclusive"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
        {/* Main Heading */}
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-sm font-medium text-white/80">The Future of Real Estate is Here</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
              LIVE
            </span>
            <div className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient">
                {texts[currentText]}
              </span>
              <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient opacity-0 animate-typewriter">
                {texts[currentText]}
              </div>
            </div>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Discover intelligent homes that adapt to your lifestyle. 
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold">
              {" "}Powered by AI, designed for humans.
            </span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button size="lg" className="group relative h-16 px-12 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500">
            <Rocket className="w-5 h-5 mr-3 group-hover:rotate-45 transition-transform" />
            <span>Explore Properties</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Button>
          
          <Button size="lg" variant="outline" className="h-16 px-12 text-lg border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-500 group">
            <Video className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            <span>Virtual Tour</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto">
          {[
            { number: "500+", label: "Smart Homes", icon: Cpu },
            { number: "98%", label: "Satisfaction", icon: Heart },
            { number: "24/7", label: "AI Support", icon: Cloud },
            { number: "50+", label: "Locations", icon: Map },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-400/30 transition-all duration-500 mb-4">
                <stat.icon className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {stat.number}
              </div>
              <div className="text-sm text-white/60 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

// ===== MODERN STATS SECTION =====
const StatsSection = () => {
  const stats = [
    {
      icon: Building,
      value: "500+",
      label: "Premium Properties",
      description: "AI-curated luxury smart homes",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: Users,
      value: "10K+",
      label: "Happy Residents",
      description: "Living in our smart communities",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Award,
      value: "25+",
      label: "Innovation Awards",
      description: "For cutting-edge home technology",
      gradient: "from-orange-400 to-red-500"
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Success Rate",
      description: "Client satisfaction guaranteed",
      gradient: "from-green-400 to-emerald-500"
    }
  ];

  return (
    <section id="features" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background/60" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-700 hover:-translate-y-2"
            >
              {/* Animated Border */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                {/* Icon */}
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Value */}
                <div className={`text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="text-xl font-bold text-white">
                    {stat.label}
                  </div>
                  <div className="text-sm text-white/60 leading-relaxed">
                    {stat.description}
                  </div>
                </div>

                {/* Animated Arrow */}
                <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== MODERN FEATURED PROPERTIES =====
const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: "Neo Tokyo Penthouse",
      location: "Shibuya, Tokyo",
      price: "$8,500,000",
      beds: 4,
      baths: 3,
      sqft: "3,800",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      features: ["AI Assistant", "Smart Lighting", "VR Ready", "Eco-Friendly"],
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      id: 2,
      title: "Cyber Valley Estate",
      location: "Silicon Valley, CA",
      price: "$12,200,000",
      beds: 6,
      baths: 5,
      sqft: "7,200",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      features: ["Home AI", "Solar Roof", "Pool", "Gym"],
      gradient: "from-purple-400 to-pink-500"
    },
    {
      id: 3,
      title: "Ocean AI Residence",
      location: "Malibu, CA",
      price: "$15,750,000",
      beds: 5,
      baths: 4,
      sqft: "5,500",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      features: ["Beach Front", "Smart Security", "Cinema", "Wine Cellar"],
      gradient: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section id="properties" className="py-32 px-6 relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Featured Collection</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
              Future
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 block">
              Living Spaces
            </span>
          </h2>
          
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Experience the next generation of intelligent homes designed for modern living
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div 
              key={property.id}
              className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-700 hover:-translate-y-4"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
                
                {/* Price & Badge */}
                <div className="absolute bottom-4 left-4">
                  <div className="text-3xl font-black text-white drop-shadow-2xl">
                    {property.price}
                  </div>
                </div>
                
                <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${property.gradient} border-0 shadow-2xl`}>
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-white/60">
                  <MapPin className="w-4 h-4 mr-2" />
                  {property.location}
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {property.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/70"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <Bed className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-white/80">{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bath className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-white/80">{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Square className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-white/80">{property.sqft} sqft</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button className="w-full group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
                  <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  View Details
                  <MoveRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== MODERN SKILLS SECTION =====
const SkillsSection = () => {
  const skills = [
    {
      category: "Smart Home Tech",
      icon: Cpu,
      items: [
        { name: "AI Integration", level: 95 },
        { name: "IoT Systems", level: 88 },
        { name: "Voice Control", level: 92 },
        { name: "Automation", level: 90 }
      ],
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      category: "Sustainability",
      icon: Cloud,
      items: [
        { name: "Solar Energy", level: 85 },
        { name: "Water Recycling", level: 82 },
        { name: "Smart Grid", level: 78 },
        { name: "Eco Materials", level: 88 }
      ],
      gradient: "from-green-400 to-emerald-500"
    },
    {
      category: "Security",
      icon: Shield,
      items: [
        { name: "Biometric Access", level: 94 },
        { name: "AI Surveillance", level: 89 },
        { name: "Network Security", level: 91 },
        { name: "Emergency Systems", level: 96 }
      ],
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <section id="services" className="py-32 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Target className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Our Expertise</span>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
              Smart Home
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 block">
              Technology
            </span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div 
                key={skill.category}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-700 hover:-translate-y-2"
              >
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${skill.gradient} shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{skill.category}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {skill.items.map((item, itemIndex) => (
                    <div key={item.name} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 font-medium">{item.name}</span>
                        <span className="text-white/60 text-sm">{item.level}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
          <Navigation />
          <main>
            <HeroSection />
            <StatsSection />
            <FeaturedProperties />
            <SkillsSection />
            {/* Add more sections as needed */}
          </main>
          
          {/* Global Styles */}
          <style jsx global>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
            @keyframes float-delayed {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-30px) rotate(-180deg); }
            }
            @keyframes float-slow {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-10px) scale(1.1); }
            }
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes typewriter {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-float { animation: float 6s ease-in-out infinite; }
            .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
            .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
            .animate-gradient { 
              background-size: 200% 200%;
              animation: gradient 3s ease infinite; 
            }
            .animate-typewriter { animation: typewriter 0.5s ease-in-out; }
            .glass-card {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255, 255, 255, 0.2);
            }
          `}</style>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;