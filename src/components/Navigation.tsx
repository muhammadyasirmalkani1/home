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
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                Portfolio
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-4 py-2 rounded-lg transition-smooth flex items-center gap-2",
                      isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                    )}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{item.name}</span>
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
                className="p-2 rounded-md hover:bg-secondary transition-colors"
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-200",
          sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!sidebarOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-200",
            sidebarOpen ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      {/* Sidebar panel */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-72 max-w-full bg-background/95 backdrop-blur-md border-r border-border transform transition-transform duration-200 shadow-lg",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 id="sidebar-title" className="text-lg font-semibold">
            Menu
          </h2>
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-md px-3 py-1 bg-gradient-to-r from-primary to-accent text-white"
            >
              <Mail className="w-4 h-4" />
              Contact
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="px-2 py-4 overflow-y-auto" aria-label="Sidebar">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                      isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto px-4 py-4 border-t border-border">
          <Link
            to="/contact"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2 rounded-md px-3 py-2 bg-gradient-to-r from-primary to-accent text-white justify-center"
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navigation;