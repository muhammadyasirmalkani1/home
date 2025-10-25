import { NavLink } from "react-router-dom";
import React, { useState } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentType, FC, SVGProps } from "react";

type NavItem = {
  name: string;
  path: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/gallery", label: "Gallery" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

const Sidebar = () => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-30 flex flex-col bg-background/90 backdrop-blur-md border-r border-border transition-all",
        collapsed ? "w-16" : "w-64",
        "overflow-y-auto"
      )}
      aria-label="Sidebar navigation"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-3 text-lg font-bold",
            collapsed ? "justify-center w-full" : ""
          )}
        >
          <div
            className={cn(
              "w-9 h-9 rounded-md flex items-center justify-center",
              "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            )}
            aria-hidden
          >
            P
          </div>
          {!collapsed && <span className="text-2xl">Portfolio</span>}
        </Link>

        <button
          onClick={() => setCollapsed((s) => !s)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-2 rounded-md hover:bg-secondary transition-colors"
        >
          {/* simple chevron icon using css rotation instead of importing another icon */}
          <svg
            className={cn("w-4 h-4 transform transition-transform", collapsed ? "rotate-180" : "rotate-0")}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      <nav className="mt-2 px-2" aria-label="Main">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className={cn("w-5 h-5 flex-shrink-0")} aria-hidden="true" />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={cn("mt-auto px-3 py-4", collapsed ? "text-center" : "")}>
        <Link
          to="/contact"
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 transition-all",
            "bg-gradient-to-r from-primary to-accent text-white",
            collapsed ? "justify-center" : ""
          )}
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          {!collapsed && <span>Contact</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;