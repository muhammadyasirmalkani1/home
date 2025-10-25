// components/navigation.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Menu, 
  X, 
  User, 
  Briefcase, 
  Mail,
  GraduationCap,
  Image,
  DollarSign,
  ChevronDown,
  Code2,
  Search,
  Phone,
  Star
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: Home
    },
    {
      name: "About",
      href: "/about",
      icon: User
    },
    {
      name: "Properties",
      href: "/properties",
      icon: Home,
      dropdown: true,
      items: [
        {
          name: "All Properties",
          href: "/properties",
          description: "Browse our complete collection",
          icon: Home,
          featured: false
        },
        {
          name: "Featured Homes",
          href: "/properties/featured",
          description: "Handpicked luxury properties",
          icon: Star,
          featured: true
        },
        {
          name: "Luxury Villas",
          href: "/properties/villas",
          description: "Exclusive villa residences",
          icon: Home,
          featured: false
        },
        {
          name: "Waterfront Homes",
          href: "/properties/waterfront",
          description: "Properties with water views",
          icon: Home,
          featured: false
        }
      ]
    },
    {
      name: "Services",
      href: "/services",
      icon: Briefcase,
      dropdown: true,
      items: [
        {
          name: "Buying",
          href: "/services/buying",
          description: "Find your dream home",
          icon: Home
        },
        {
          name: "Selling",
          href: "/services/selling",
          description: "Sell your property",
          icon: DollarSign
        },
        {
          name: "Consultation",
          href: "/services/consultation",
          description: "Expert advice",
          icon: User
        }
      ]
    },
    {
      name: "Gallery",
      href: "/gallery",
      icon: Image
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: DollarSign
    }
  ];

  const featuredProperties = [
    {
      name: "Modern Villa Residence",
      price: "$4,500,000",
      location: "Beverly Hills, CA",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=120&fit=crop",
      href: "/properties/1"
    },
    {
      name: "Luxury Penthouse",
      price: "$8,200,000",
      location: "Manhattan, NY",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=120&fit=crop",
      href: "/properties/2"
    },
    {
      name: "Coastal Estate",
      price: "$6,750,000",
      location: "Malibu, CA",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&h=120&fit=crop",
      href: "/properties/3"
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const NavLink = ({ item, mobile = false }: { item: any; mobile?: boolean }) => {
    if (item.dropdown && !mobile) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 relative group ${
                isActive(item.href) 
                  ? "text-primary font-semibold" 
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
              <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
              <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-gold transform origin-left transition-transform ${
                isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-96 p-6 glass-card border-[hsl(var(--glass-border))] shadow-xl"
          >
            <div className="space-y-6">
              {/* Main Items */}
              <div className="space-y-3">
                {item.items.map((dropdownItem: any, index: number) => {
                  const Icon = dropdownItem.icon;
                  return (
                    <DropdownMenuItem key={index} asChild>
                      <Link
                        to={dropdownItem.href}
                        className="flex items-start space-x-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group/item"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className={`p-2 rounded-lg ${
                          dropdownItem.featured 
                            ? "bg-gradient-gold" 
                            : "bg-primary/10 group-hover/item:bg-gradient-gold"
                        } transition-colors`}>
                          <Icon className={`w-4 h-4 ${
                            dropdownItem.featured 
                              ? "text-primary-foreground" 
                              : "text-primary group-hover/item:text-primary-foreground"
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground flex items-center gap-2">
                            {dropdownItem.name}
                            {dropdownItem.featured && (
                              <span className="px-2 py-1 text-xs bg-gradient-gold text-primary-foreground rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {dropdownItem.description}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </div>

              {/* Featured Properties for Properties Dropdown */}
              {item.name === "Properties" && (
                <div className="border-t border-[hsl(var(--glass-border))] pt-4">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Featured Properties
                  </h4>
                  <div className="space-y-3">
                    {featuredProperties.map((property, index) => (
                      <Link
                        key={index}
                        to={property.href}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors group/property"
                        onClick={() => setIsOpen(false)}
                      >
                        <img 
                          src={property.image} 
                          alt={property.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm truncate">
                            {property.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {property.location}
                          </div>
                          <div className="text-sm font-bold text-primary">
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
        className={`flex items-center space-x-2 transition-colors relative group ${
          mobile 
            ? `px-4 py-3 rounded-lg ${
                isActive(item.href) 
                  ? "bg-primary text-primary-foreground font-semibold" 
                  : "hover:bg-white/10 text-foreground"
              }`
            : `${
                isActive(item.href) 
                  ? "text-primary font-semibold" 
                  : "text-foreground/80 hover:text-foreground"
              }`
        }`}
        onClick={() => setIsOpen(false)}
      >
        <item.icon className="w-4 h-4" />
        <span>{item.name}</span>
        {!mobile && (
          <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-gold transform origin-left transition-transform ${
            isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`} />
        )}
      </Link>
    );
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "backdrop-blur-xl bg-background/90 border-b border-[hsl(var(--glass-border))] shadow-lg py-2" 
          : "backdrop-blur-md bg-background/70 border-b border-[hsl(var(--glass-border))] py-4"
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center animate-glow group-hover:scale-110 transition-transform duration-300">
                <Home className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                  LuxeHome
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Luxury Real Estate
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <NavLink key={index} item={item} />
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="relative text-foreground/80 hover:text-foreground"
              >
                <Search className="w-5 h-5" />
              </Button>

              <ThemeSwitcher />
              
              <Button 
                variant="default" 
                className="bg-gradient-gold hover:shadow-glow transition-all group relative overflow-hidden"
                asChild
              >
                <Link to="/contact" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card border-l-[hsl(var(--glass-border))] w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-[hsl(var(--glass-border))]">
                    <Link 
                      to="/" 
                      className="flex items-center space-x-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                        <Home className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                          LuxeHome
                        </span>
                        <span className="text-xs text-muted-foreground -mt-1">
                          Luxury Real Estate
                        </span>
                      </div>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex-1 p-6 space-y-2 overflow-y-auto">
                    {navigation.map((item, index) => (
                      <div key={index}>
                        <NavLink item={item} mobile />
                        
                        {/* Mobile Dropdown Items */}
                        {item.dropdown && item.items && (
                          <div className="ml-8 mt-2 space-y-1 border-l-2 border-[hsl(var(--glass-border))] pl-4">
                            {item.items.map((dropdownItem: any, dropdownIndex: number) => {
                              const Icon = dropdownItem.icon;
                              return (
                                <Link
                                  key={dropdownIndex}
                                  to={dropdownItem.href}
                                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                                    isActive(dropdownItem.href)
                                      ? "bg-primary/20 text-primary font-semibold"
                                      : "hover:bg-white/10 text-foreground/80"
                                  }`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  <Icon className="w-4 h-4" />
                                  <span>{dropdownItem.name}</span>
                                  {dropdownItem.featured && (
                                    <span className="px-2 py-1 text-xs bg-gradient-gold text-primary-foreground rounded-full ml-auto">
                                      Featured
                                    </span>
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Mobile Actions */}
                    <div className="pt-6 space-y-4">
                      <div className="flex justify-center">
                        <ThemeSwitcher />
                      </div>
                      
                      <Button 
                        variant="default" 
                        className="w-full bg-gradient-gold hover:shadow-glow transition-all" 
                        asChild
                      >
                        <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>Contact Us</span>
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-[hsl(var(--glass-border))]">
                    <div className="text-center text-sm text-muted-foreground">
                      © 2024 LuxeHome. All rights reserved.
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-xl bg-background/95 flex items-start justify-center pt-32">
          <div className="container mx-auto px-6 max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search properties, locations, features..."
                className="w-full h-16 text-lg pl-16 pr-4 border-2 border-primary/20 focus:border-primary bg-card/50 backdrop-blur-sm"
                autoFocus
              />
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="mt-8 text-center text-muted-foreground">
              <p>Try searching for "luxury villas", "waterfront properties", or "Beverly Hills"</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;