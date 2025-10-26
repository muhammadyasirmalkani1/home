import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  X,
  Menu,
} from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

/**
 * Modern responsive navigation with a left sidebar for md+ and a slide-over drawer for mobile.
 *
 * - On md+ screens: persistent vertical sidebar on the left
 * - On small screens: top bar with a hamburger button that opens a slide-over sidebar
 *
 * Accessibility:
 * - ESC closes the mobile drawer
 * - clicking the overlay closes the drawer
 * - aria attributes for the drawer button and region
 */

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/skills", label: "Skills", icon: Code },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/education", label: "Education", icon: BookOpen },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/pricing", label: "Pricing", icon: Tag },
];

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/25">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              iHome
            </span>
            <span className="text-xs text-foreground/60 -mt-1">
              Luxury Real Estate
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="px-2 py-4 space-y-1 overflow-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                active
                  ? "text-white bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-amber-500/25"
                  : "text-foreground/80 hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${
                active ? "scale-110" : "group-hover:scale-110"
              }`} />
              <span className="text-sm font-medium">{item.label}</span>
              
              {/* Active indicator */}
              {active && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-4 py-4 border-t border-border/50">
        <div className="flex items-center justify-between space-x-3">
          <ThemeSwitcher />
          <Button
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-0 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 group relative overflow-hidden"
            asChild
          >
            <Link to="/contact" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Inject global animation styles
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes slideIn {
        from { 
          transform: translateX(-100%); 
          opacity: 0; 
        }
        to { 
          transform: translateX(0); 
          opacity: 1; 
        }
      }
      
      .animate-slide-in {
        animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Custom scrollbar for sidebar */
      .overflow-auto::-webkit-scrollbar {
        width: 4px;
      }
      
      .overflow-auto::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .overflow-auto::-webkit-scrollbar-thumb {
        background: rgba(245, 158, 11, 0.3);
        border-radius: 2px;
      }
      
      .overflow-auto::-webkit-scrollbar-thumb:hover {
        background: rgba(245, 158, 11, 0.5);
      }

      /* Content padding for desktop sidebar */
      @media (min-width: 768px) {
        main {
          margin-left: 16rem;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {/* Top bar for mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/95 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen(true)}
              className="p-2 rounded-lg hover:bg-accent/50 transition-all duration-300 text-foreground/80 hover:text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <Home className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  iHome
                </span>
                <span className="text-xs text-foreground/60 -mt-1">
                  Luxury Real Estate
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Button
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-0 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300"
              asChild
            >
              <Link to="/contact" className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar for md+ (persistent) */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:w-64 md:z-40 md:flex md:flex-col backdrop-blur-xl bg-background/95 border-r border-border">
        <div className="h-full overflow-hidden">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile slide-over drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          aria-hidden={!open}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel */}
          <div
            id="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute left-0 top-0 bottom-0 w-80 max-w-full bg-background/95 backdrop-blur-xl shadow-2xl border-r border-border animate-slide-in"
          >
            <div className="px-4 py-4 flex items-center justify-between border-b border-border bg-gradient-to-r from-accent/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                    Luxury
                  </span>
                  <span className="text-xs text-foreground/60 -mt-1">
                    Luxury Real Estate
                  </span>
                </div>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-accent/50 transition-all duration-300 text-foreground/80 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-full">
              <SidebarContent onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Spacer for topbar on mobile */}
      <div className="md:hidden h-16" />
    </>
  );
};

export default Navigation;