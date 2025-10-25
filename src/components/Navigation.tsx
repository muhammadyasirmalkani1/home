// components/navigation.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  Code2, 
  User, 
  Briefcase, 
  Mail,
  ChevronDown,
  Globe,
  Server,
  Database,
  Smartphone,
  Palette,
  GitBranch
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: User
    },
    {
      name: "Skills",
      href: "/skills",
      icon: Code2,
      dropdown: true,
      items: [
        {
          name: "All Skills",
          href: "/skills",
          description: "Comprehensive skills overview",
          icon: Globe
        },
        {
          name: "5+ Years Experience",
          href: "/skills/5-years-experience",
          description: "Professional journey and growth",
          icon: User
        },
        {
          name: "Quick Learner",
          href: "/skills/quick-learner",
          description: "Rapid skill acquisition",
          icon: GitBranch
        },
        {
          name: "Full-Stack Expertise",
          href: "/skills/full-stack-expertise",
          description: "End-to-end development",
          icon: Server
        }
      ]
    },
    {
      name: "Projects",
      href: "/projects",
      icon: Briefcase
    },
    {
      name: "Contact",
      href: "/contact",
      icon: Mail
    }
  ];

  const technologyCategories = [
    {
      name: "Frontend",
      technologies: [
        { name: "React/Next.js", href: "/skills/graphql" },
        { name: "TypeScript", href: "/skills/typescript" },
        { name: "Vite", href: "/skills/vite" },
        { name: "Webpack", href: "/skills/webpack" }
      ]
    },
    {
      name: "Backend",
      technologies: [
        { name: "Node.js", href: "/skills/nodejs" },
        { name: "GraphQL", href: "/skills/graphql" },
        { name: "Socket.io", href: "/skills/socket-io" },
        { name: "Stripe API", href: "/skills/stripe-api" }
      ]
    },
    {
      name: "Database",
      technologies: [
        { name: "PostgreSQL", href: "/skills/postgresql" },
        { name: "MongoDB", href: "/skills/mongodb" },
        { name: "Firebase", href: "/skills/firebase" },
        { name: "Supabase", href: "/skills/supabase" },
        { name: "Prisma", href: "/skills/prisma" },
        { name: "ElasticSearch", href: "/skills/elasticsearch" }
      ]
    },
    {
      name: "DevOps",
      technologies: [
        { name: "Docker", href: "/skills/docker" },
        { name: "Kubernetes", href: "/skills/kubernetes" },
        { name: "Terraform", href: "/skills/terraform" },
        { name: "Jenkins", href: "/skills/jenkins" },
        { name: "Nginx", href: "/skills/nginx" }
      ]
    },
    {
      name: "Testing",
      technologies: [
        { name: "Jest", href: "/skills/jest" },
        { name: "Cypress", href: "/skills/cypress" }
      ]
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
              className={`flex items-center space-x-2 ${
                isActive(item.href) 
                  ? "text-primary font-semibold" 
                  : "text-foreground/80 hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-80 p-4 glass-card border-white/10"
          >
            <div className="space-y-4">
              {/* Main Skills Items */}
              <div className="space-y-2">
                {item.items.map((dropdownItem: any, index: number) => {
                  const Icon = dropdownItem.icon;
                  return (
                    <DropdownMenuItem key={index} asChild>
                      <Link
                        to={dropdownItem.href}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground">
                            {dropdownItem.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {dropdownItem.description}
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </div>

              {/* Technology Categories */}
              <div className="border-t border-white/10 pt-4">
                <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
                <div className="grid grid-cols-2 gap-4">
                  {technologyCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {category.name}
                      </h5>
                      <div className="space-y-1">
                        {category.technologies.map((tech, techIndex) => (
                          <Link
                            key={techIndex}
                            to={tech.href}
                            className="block text-xs text-foreground/80 hover:text-primary transition-colors py-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {tech.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link
        to={item.href}
        className={`flex items-center space-x-2 transition-colors ${
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
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold gradient-text"
            onClick={() => setIsOpen(false)}
          >
            <Code2 className="w-6 h-6" />
            <span>DevPortfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item, index) => (
              <NavLink key={index} item={item} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-card border-l-white/10 w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2 text-xl font-bold gradient-text"
                    onClick={() => setIsOpen(false)}
                  >
                    <Code2 className="w-6 h-6" />
                    <span>DevPortfolio</span>
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
                <div className="flex-1 p-6 space-y-2">
                  {navigation.map((item, index) => (
                    <div key={index}>
                      <NavLink item={item} mobile />
                      
                      {/* Mobile Dropdown Items */}
                      {item.dropdown && item.items && (
                        <div className="ml-8 mt-2 space-y-1 border-l-2 border-white/10 pl-4">
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
                              </Link>
                            );
                          })}
                          
                          {/* Technology Links */}
                          <div className="pt-4">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-4">
                              Technologies
                            </h4>
                            <div className="space-y-1">
                              {technologyCategories.flatMap(category => 
                                category.technologies
                              ).map((tech, index) => (
                                <Link
                                  key={index}
                                  to={tech.href}
                                  className="flex items-center px-4 py-2 rounded-lg text-sm text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {tech.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10">
                  <div className="text-center text-sm text-muted-foreground">
                    © 2024 DevPortfolio. All rights reserved.
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;