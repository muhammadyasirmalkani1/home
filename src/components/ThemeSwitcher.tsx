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
  { name: "Dark", value: "dark", color: "bg-slate-900" },
  { name: "Light", value: "light", color: "bg-white" },
  { name: "Blue", value: "blue", color: "bg-blue-600" },
  { name: "Red", value: "red", color: "bg-red-600" },
  { name: "Green", value: "green", color: "bg-emerald-600" },
  { name: "Yellow", value: "yellow", color: "bg-yellow-500" },
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
          className="relative overflow-hidden group border-border/50 hover:border-primary/50 transition-all"
        >
          <Palette className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-md border-border/50">
        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
          Select Theme
        </div>
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => changeTheme(theme.value)}
            className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <div className={`w-5 h-5 rounded-full ${theme.color} border-2 ${
              currentTheme === theme.value ? 'border-primary ring-2 ring-primary/30' : 'border-border'
            } transition-all`} />
            <span className={currentTheme === theme.value ? 'text-primary font-semibold' : 'text-foreground'}>
              {theme.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
