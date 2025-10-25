import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Code,
  Briefcase,
  GraduationCap,
  Video,
  DollarSign,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  path: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const navItems: NavItem[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: User },
  { name: "Skills", path: "/skills", icon: Code },
  { name: "Experience", path: "/experience", icon: Briefcase },
  { name: "Projects", path: "/projects", icon: Briefcase },
  { name: "Education", path: "/education", icon: GraduationCap },
  { name: "Gallery", path: "/gallery", icon: Video },
  { name: "Pricing", path: "/pricing", icon: DollarSign },
  { name: "Contact", path: "/contact", icon: Mail },
];

const Navigation = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Escape and lock body scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    // Lock body scroll when sidebar is open
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  // Close when clicking outside sidebar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!sidebarOpen) return;
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300",
        isScrolled 
          ? "bg-background/95 border-border/50 shadow-lg" 
          : "bg-background/80 border-border/30"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
                onClick={() => setSidebarOpen(false)}
              >
                Portfolio
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 group relative",
                      active 
                        ? "text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25" 
                        : "text-foreground/80 hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                    
                    {/* Animated underline for active state */}
                    {!active && (
                      <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                aria-expanded={sidebarOpen}
                className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300 text-foreground/80 hover:text-foreground"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-300",
          sidebarOpen 
            ? "pointer-events-auto bg-black/50 backdrop-blur-sm" 
            : "pointer-events-none bg-transparent"
        )}
        aria-hidden={!sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar panel */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-80 max-w-full bg-background/95 backdrop-blur-xl border-r border-border/50 transform transition-transform duration-300 shadow-2xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-gradient-to-r from-background to-background/80">
          <h2 id="sidebar-title" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Navigation
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-xl hover:bg-white/10 transition-all duration-300 text-foreground/80 hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 group",
                      active 
                        ? "text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25" 
                        : "text-foreground/80 hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5 flex-shrink-0 transition-transform duration-300",
                      active ? "text-white" : "text-foreground/60 group-hover:text-foreground"
                    )} />
                    <span className="font-medium">{item.name}</span>
                    
                    {/* Animated arrow for hover effect */}
                    {!active && (
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300">
                        <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="px-6 py-4 border-t border-border/50 bg-gradient-to-r from-background/80 to-background">
          <Link
            to="/contact"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 rounded-xl px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white justify-center font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 group"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            <span>Get In Touch</span>
          </Link>
        </div>
      </aside>

      {/* Add global styles for smooth scrolling */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar for sidebar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 2px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </>
  );
};

export default Navigation;