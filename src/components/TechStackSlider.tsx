import { useEffect, useRef } from "react";
import reactLogo from "@/assets/react-logo.png";
import nodejsLogo from "@/assets/nodejs-logo.png";
import nextjsLogo from "@/assets/nextjs-logo.png";
import typescriptLogo from "@/assets/typescript-logo.png";
import tailwindLogo from "@/assets/tailwind-logo.png";
import gitLogo from "@/assets/git-logo.png";
import githubLogo from "@/assets/github-logo.png";
import viteLogo from "@/assets/vite-logo.png";

const techStack = [
  { name: "React", logo: reactLogo },
  { name: "Node.js", logo: nodejsLogo },
  { name: "Next.js", logo: nextjsLogo },
  { name: "TypeScript", logo: typescriptLogo },
  { name: "Tailwind", logo: tailwindLogo },
  { name: "Git", logo: gitLogo },
  { name: "GitHub", logo: githubLogo },
  { name: "Vite", logo: viteLogo },
];

const TechStackSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 1.5; // Faster speed
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-20 bg-background/100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-gold bg-clip-text text-transparent">
          Powered By CEO Yasir M.
        </h2>
        
        <div 
          ref={scrollRef}
          className="overflow-hidden relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-16 w-max py-4">
            {/* Duplicate items for infinite scroll */}
            {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center justify-center min-w-[140px] group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center mb-4 p-4 group-hover:scale-110 group-hover:shadow-glow group-hover:border-primary/50 transition-all duration-300">
                  <img 
                    src={tech.logo} 
                    alt={tech.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSlider;
