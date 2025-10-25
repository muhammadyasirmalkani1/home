import { useState, useEffect } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { name: "Dark", value: "dark", color: "bg-slate-800", ring: "ring-slate-600" },
  { name: "Light", value: "light", color: "bg-slate-100", ring: "ring-slate-300" },
  { name: "Blue", value: "blue", color: "bg-blue-500", ring: "ring-blue-400" },
  { name: "Red", value: "red", color: "bg-red-500", ring: "ring-red-400" },
  { name: "Green", value: "green", color: "bg-emerald-500", ring: "ring-emerald-400" },
  { name: "Yellow", value: "yellow", color: "bg-yellow-400", ring: "ring-yellow-300" },
];

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative overflow-hidden group border-border hover:border-primary transition-all hover:shadow-glow"
        >
          <Palette className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-52 bg-card border-border shadow-xl"
      >
        <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border/50">
          Choose Theme
        </div>
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => changeTheme(theme.value)}
            className={`flex items-center gap-3 cursor-pointer my-1 px-3 py-2.5 ${
              currentTheme === theme.value ? 'bg-primary/10' : ''
            }`}
          >
            <div className={`w-6 h-6 rounded-lg ${theme.color} ${
              currentTheme === theme.value ? `${theme.ring} ring-2` : 'border-2 border-border'
            } shadow-sm transition-all`} />
            <span className={`font-medium ${
              currentTheme === theme.value ? 'text-primary' : 'text-foreground'
            }`}>
              {theme.name}
            </span>
            {currentTheme === theme.value && (
              <span className="ml-auto text-primary text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
