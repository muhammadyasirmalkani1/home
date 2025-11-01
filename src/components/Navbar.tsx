import { useState, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  User,
  Code,
  Briefcase,
  BookOpen,
  Image,
  Tag,
  Mail,
  Menu,
  X,
  FileText,
} from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/skills", label: "Skills", icon: Code },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/education", label: "Education", icon: BookOpen },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/pricing", label: "Pricing", icon: Tag },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-lg"
            : "bg-background/60 backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group transition-transform hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                  DevFort
                </span>
                <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">
                  Portfolio & Showcase
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group relative",
                      isActive
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-fade-in" />
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeSwitcher />
              <Button
                asChild
                className="relative overflow-hidden group"
                size="default"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <ThemeSwitcher />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative"
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isOpen
                        ? "opacity-0 rotate-90 scale-0"
                        : "opacity-100 rotate-0 scale-100"
                    )}
                  />
                  <X
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isOpen
                        ? "opacity-100 rotate-0 scale-100"
                        : "opacity-0 -rotate-90 scale-0"
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-lg z-40 lg:hidden transition-all duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 pt-24 pb-8 h-full overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 animate-fade-in group",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50 border border-transparent"
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-accent/50 text-muted-foreground group-hover:bg-accent group-hover:text-foreground"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium">{item.label}</span>
                </NavLink>
              );
            })}

            {/* Mobile Contact Button */}
            <div className="pt-6 mt-6 border-t border-border/50">
              <Button
                asChild
                className="w-full h-14 text-base"
                size="lg"
              >
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>Get in Touch</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;
