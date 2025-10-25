import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Code, Briefcase, GraduationCap, Video, DollarSign, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentType, FC, SVGProps } from "react";

type NavItem = {
  name: string;
  path: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const Navigation: FC = () => {
  const location = useLocation();

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Portfolio
          </Link>

          <div className="hidden md:flex items-center gap-1">
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

          {/* Mobile menu - simplified */}
          <div className="md:hidden flex gap-2 overflow-x-auto">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "p-2 rounded-lg transition-smooth",
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;