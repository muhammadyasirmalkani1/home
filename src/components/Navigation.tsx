import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Menu,
  X,
  Building,
  Rocket,
  Heart,
  Mail,
  ChevronDown,
  Sparkles,
  Star,
  MapPin,
  Eye,
  MoveRight,
  Phone,
  Zap
} from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Parallax effect for nav background
      if (navRef.current) {
        const opacity = Math.min(scrollY / 200, 0.95);
        navRef.current.style.backgroundColor = `rgba(10, 10, 20, ${opacity})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { 
      name: "Home", 
      href: "/", 
      icon: Home,
      type: "link"
    },
    { 
      name: "Properties", 
      href: "/properties", 
      icon: Building,
      type: "dropdown",
      items: [
        {
          name: "All Properties",
          href: "/properties",
          description: "Browse our complete collection",
          icon: Building,
          featured: false
        },
        {
          name: "Luxury Villas",
          href: "/properties/villas",
          description: "Exclusive villa residences",
          icon: Star,
          featured: true
        },
        {
          name: "Smart Homes",
          href: "/properties/smart",
          description: "AI-powered intelligent homes",
          icon: Zap,
          featured: true
        },
        {
          name: "Waterfront",
          href: "/properties/waterfront",
          description: "Properties with stunning water views",
          icon: MapPin,
          featured: false
        }
      ]
    },
    { 
      name: "Services", 
      href: "/services", 
      icon: Rocket,
      type: "dropdown",
      items: [
        {
          name: "Buying",
          href: "/services/buying",
          description: "Find your dream home",
          icon: Eye
        },
        {
          name: "Selling",
          href: "/services/selling",
          description: "Sell your property",
          icon: Star
        },
        {
          name: "Consultation",
          href: "/services/consultation",
          description: "Expert advice and planning",
          icon: Heart
        }
      ]
    },
    { 
      name: "About", 
      href: "/about", 
      icon: Heart,
      type: "link"
    },
    { 
      name: "Contact", 
      href: "/contact", 
      icon: Mail,
      type: "link"
    }
  ];

  const featuredProperties = [
    {
      name: "Skyline Penthouse",
      price: "$4,200,000",
      location: "Manhattan, NY",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=120&fit=crop",
      href: "/properties/skyline-penthouse"
    },
    {
      name: "Oceanfront Villa",
      price: "$8,750,000",
      location: "Malibu, CA",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&h=120&fit=crop",
      href: "/properties/oceanfront-villa"
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const NavLink = ({ item, mobile = false }: { item: any; mobile?: boolean }) => {
    if (item.type === "dropdown" && !mobile) {
      return (
        <DropdownMenu 
          open={activeDropdown === item.name} 
          onOpenChange={(open) => setActiveDropdown(open ? item.name : null)}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 relative group px-4 py-2 rounded-xl transition-all duration-500 ${
                isActive(item.href) 
                  ? "text-cyan-400 bg-cyan-400/10" 
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="font-medium">{item.name}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                activeDropdown === item.name ? "rotate-180" : ""
              }`} />
              
              {/* Animated underline */}
              <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform origin-left transition-transform duration-500 ${
                isActive(item.href) || activeDropdown === item.name ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-96 p-6 glass-card border-white/20 backdrop-blur-xl shadow-2xl animate-in zoom-in-95"
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="space-y-6">
              {/* Main Items */}
              <div className="space-y-3">
                {item.items.map((dropdownItem: any, index: number) => {
                  const Icon = dropdownItem.icon;
                  return (
                    <DropdownMenuItem key={index} asChild className="p-0">
                      <Link
                        to={dropdownItem.href}
                        className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group/item border-0 focus:bg-white/10"
                        onClick={() => setMobileOpen(false)}
                      >
                        <div className={`p-2 rounded-lg transition-all duration-300 ${
                          dropdownItem.featured 
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25" 
                            : "bg-white/5 group-hover/item:bg-gradient-to-r group-hover/item:from-cyan-500 group-hover/item:to-blue-600"
                        }`}>
                          <Icon className={`w-4 h-4 transition-colors ${
                            dropdownItem.featured 
                              ? "text-white" 
                              : "text-white/70 group-hover/item:text-white"
                          }`} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white group-hover/item:text-cyan-400 transition-colors">
                              {dropdownItem.name}
                            </span>
                            {dropdownItem.featured && (
                              <span className="px-2 py-1 text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/60 leading-relaxed">
                            {dropdownItem.description}
                          </p>
                        </div>
                        <MoveRight className="w-4 h-4 text-white/40 group-hover/item:text-cyan-400 group-hover/item:translate-x-1 transition-all duration-300" />
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </div>

              {/* Featured Properties for Properties Dropdown */}
              {item.name === "Properties" && (
                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-white">Featured Properties</span>
                  </div>
                  <div className="space-y-3">
                    {featuredProperties.map((property, index) => (
                      <Link
                        key={index}
                        to={property.href}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group/property"
                        onClick={() => setMobileOpen(false)}
                      >
                        <img 
                          src={property.image} 
                          alt={property.name}
                          className="w-12 h-12 rounded-lg object-cover shadow-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white text-sm truncate group-hover/property:text-cyan-400 transition-colors">
                            {property.name}
                          </div>
                          <div className="text-xs text-white/60 truncate">
                            {property.location}
                          </div>
                          <div className="text-sm font-bold text-cyan-400">
                            {property.price}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link
        to={item.href}
        className={`flex items-center space-x-2 relative group px-4 py-2 rounded-xl transition-all duration-500 ${
          mobile 
            ? `w-full text-left ${
                isActive(item.href) 
                  ? "text-cyan-400 bg-cyan-400/10" 
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`
            : `${
                isActive(item.href) 
                  ? "text-cyan-400 bg-cyan-400/10" 
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <item.icon className="w-4 h-4" />
        <span className="font-medium">{item.name}</span>
        
        {!mobile && (
          <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform origin-left transition-transform duration-500 ${
            isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`} />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Ambient Light Effect */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float" />
      </div>

      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${
          isScrolled 
            ? "backdrop-blur-2xl border-white/10 shadow-2xl py-3" 
            : "backdrop-blur-xl border-white/5 py-5"
        }`}
        style={{ backgroundColor: 'rgba(10, 10, 20, 0)' }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group relative"
              onClick={() => setMobileOpen(false)}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25 group-hover:scale-110 transition-transform duration-500">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  NEXUS
                </span>
                <span className="text-xs font-medium text-white/60 -mt-1 tracking-wider">
                  REAL ESTATE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigation.map((item, index) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <ThemeSwitcher />
              
              <Button 
                className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-500 px-6"
                asChild
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="lg:hidden text-white/80 hover:text-white hover:bg-white/10 relative"
                >
                  <Menu className="w-6 h-6" />
                  {!mobileOpen && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="glass-card border-l-white/10 w-80 p-0 backdrop-blur-3xl overflow-hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                    <Link 
                      to="/" 
                      className="flex items-center space-x-3"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Home className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                          NEXUS
                        </span>
                        <span className="text-xs font-medium text-white/60 -mt-1">
                          REAL ESTATE
                        </span>
                      </div>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setMobileOpen(false)}
                      className="text-white/80 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  {/* Navigation Items */}
                  <div className="flex-1 p-6 space-y-2 overflow-y-auto">
                    {navigation.map((item, index) => (
                      <div key={item.name} className="space-y-2">
                        <NavLink item={item} mobile />
                        
                        {/* Mobile Dropdown Items */}
                        {item.type === "dropdown" && item.items && (
                          <div className="ml-8 space-y-1 border-l-2 border-white/10 pl-4">
                            {item.items.map((dropdownItem: any, dropdownIndex: number) => {
                              const Icon = dropdownItem.icon;
                              return (
                                <Link
                                  key={dropdownIndex}
                                  to={dropdownItem.href}
                                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 group ${
                                    isActive(dropdownItem.href)
                                      ? "bg-cyan-400/10 text-cyan-400 font-semibold"
                                      : "text-white/70 hover:text-white hover:bg-white/10"
                                  }`}
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <Icon className="w-4 h-4" />
                                  <span className="flex-1">{dropdownItem.name}</span>
                                  {dropdownItem.featured && (
                                    <span className="px-2 py-1 text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full">
                                      Featured
                                    </span>
                                  )}
                                  <MoveRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Mobile Actions */}
                    <div className="pt-8 space-y-4">
                      <div className="flex justify-center">
                        <ThemeSwitcher />
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 shadow-2xl transition-all duration-500 group"
                        asChild
                      >
                        <Link to="/contact" onClick={() => setMobileOpen(false)} className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Contact Us</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-white/10 bg-gradient-to-r from-transparent to-white/5">
                    <div className="text-center text-sm text-white/60">
                      © 2024 NEXUS. Elevating real estate.
                    </div>
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

export default Navigation;