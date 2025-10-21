import { useEffect, useRef } from "react";

const techStack = [
  { name: "React", color: "text-[#61DAFB]" },
  { name: "Node.js", color: "text-[#339933]" },
  { name: "Next.js", color: "text-foreground" },
  { name: "TypeScript", color: "text-[#3178C6]" },
  { name: "Tailwind", color: "text-[#06B6D4]" },
  { name: "Git", color: "text-[#F05032]" },
  { name: "GitHub", color: "text-foreground" },
  { name: "Vite", color: "text-[#646CFF]" },
];

const TechStackSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
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
    <section className="py-16 bg-background/50 backdrop-blur-sm border-y border-[hsl(var(--glass-border))]">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
          Built With Modern Technology
        </h2>
        
        <div 
          ref={scrollRef}
          className="overflow-hidden relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-12 w-max">
            {/* Duplicate items for infinite scroll */}
            {[...techStack, ...techStack, ...techStack].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex flex-col items-center justify-center min-w-[120px] group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                  <span className={`text-3xl font-bold ${tech.color}`}>
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
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
