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
      <div className="px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              PORTFOLIO
            </span>
            <span className="text-xs text-foreground/60 -mt-1">
              Developer
            </span>
          </div>
        </div>
      </div>

      <nav className="px-2 py-4 space-y-1 overflow-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                active
                  ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25"
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

      <div className="mt-auto px-4 py-4 border-t border-border/50">
        <div className="flex items-center justify-between space-x-3">
          <ThemeSwitcher />
          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group relative overflow-hidden"
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
      document.body