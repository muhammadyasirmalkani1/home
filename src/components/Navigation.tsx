import { useEffect, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";
import type { ComponentType, FC, SVGProps } from "react";

type NavItem = {
  name: string;
  path: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
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

const Navigation: FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape and lock body scroll when open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSidebarOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    if (sidebarOpen) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [sidebarOpen]);

  // close when clicking outside sidebar
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!sidebarOpen) return;
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [sidebarOpen]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center animate-glow">
            <Home className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            LuxeHome
          </span>
        </div>
      </div>

      <nav className="px-2 py-4 space-y-1 overflow-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-foreground hover:bg-accent/10 hover:text-primary transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="mt-auto px-4 py-4 border-t border-[hsl(var(--glass-border))]">
        <div className="flex items-center justify-between space-x-3">
          <ThemeSwitcher />
          <Button
            variant="default"
            className="bg-gradient-gold hover:shadow-glow transition-all"
            asChild
          >
            <a href="/contact">Contact</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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

  return (
    <>
      {/* Top bar for mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-[hsl(var(--glass-border))]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen(true)}
              className="p-2 rounded-md hover:bg-accent/10 transition"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center animate-glow">
                <Home className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold bg-gradient-gold bg-clip-text text-transparent">
                LuxeHome
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Button
              variant="default"
              className="bg-gradient-gold hover:shadow-glow transition-all"
              asChild
            >
              <a href="/contact">Contact</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar for md+ (persistent) */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:w-64 md:z-40 md:flex md:flex-col md:backdrop-blur-md md:border-r md:border-[hsl(var(--glass-border))] bg-transparent">
        <div className="h-full overflow-hidden bg-transparent">
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
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel */}
          <div
            id="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            className="absolute left-0 top-0 bottom-0 w-80 max-w-full bg-background shadow-2xl animate-slide-in"
          >
            <div className="px-4 py-4 flex items-center justify-between border-b border-[hsl(var(--glass-border))]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center animate-glow">
                  <Home className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold bg-gradient-gold bg-clip-text text-transparent">
                  LuxeHome
                </span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-md hover:bg-accent/10 transition"
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

      {/* spacer for topbar on mobile so page content doesn't hide under fixed header */}
      <div className="md:hidden h-16" />

      {/* For md+ screens, add left padding so content isn't under the sidebar.
          Depending on your layout you may want to move this style to a parent layout component.
      */}
      <style>{`
        @media (min-width: 768px) {
          :root {
            --sidebar-width: 16rem; /* 64 */
          }
          /* Add padding to the main content (assumes a .container or main lives after this navigation) */
          main, .page-content {
            padding-left: var(--sidebar-width);
          }
        }

        /* small slide-in animation */
        @keyframes slideIn {
          from { transform: translateX(-12px); opacity: 0 }
          to { transform: translateX(0); opacity: 1 }
        }
        .animate-slide-in {
          animation: slideIn 180ms cubic-bezier(.2,.9,.3,1);
        }
      `}</style>
    </>
  );
};

export default Navigation;
