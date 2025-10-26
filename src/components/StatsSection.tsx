import { useEffect, useRef } from "react";
import { Award, Users, Home, TrendingUp } from "lucide-react";

type Stat = {
  icon: any;
  value: string;
  label: string;
  description?: string;
};

const stats: Stat[] = [
  {
    icon: Home,
    value: "500+",
    label: "Premium Properties",
    description: "Carefully curated luxury homes",
  },
  {
    icon: Users,
    value: "10K+",
    label: "Happy Clients",
    description: "Satisfied homeowners worldwide",
  },
  {
    icon: Award,
    value: "25+",
    label: "Awards Won",
    description: "Industry recognition & excellence",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Success Rate",
    description: "Client satisfaction guaranteed",
  },
];

const StatsSection: React.FC = () => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const counterRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Gentle numeric/count animation for accessible, reduced-motion aware experience
  useEffect(() => {
    if (prefersReducedMotion) return;

    const observers: IntersectionObserver[] = [];
    counterRefs.current.forEach((el, idx) => {
      if (!el) return;

      const targetText = stats[idx].value;
      // try to parse numeric prefix for a simple count animation (e.g. "10K+" -> 10000)
      const numericMatch = targetText.match(/[\d,.]+/);
      const targetNumber = numericMatch
        ? Number(numericMatch[0].replace(/,/g, ""))
        : NaN;

      // Only animate numeric values
      if (Number.isNaN(targetNumber)) return;

      const update = () => {
        const duration = 1000; // ms
        const start = performance.now();
        const initial = 0;

        const step = (time: number) => {
          const elapsed = Math.min(time - start, duration);
          const progress = elapsed / duration;
          const current = Math.round(initial + (targetNumber - initial) * progress);
          // preserve suffix like "+" or "%" if present
          const suffix = targetText.replace(numericMatch![0], "");
          el.textContent = `${current.toLocaleString()}${suffix}`;
          if (elapsed < duration) {
            requestAnimationFrame(step);
          } else {
            el.textContent = targetText; // ensure exact final text
          }
        };

        requestAnimationFrame(step);
      };

      const io = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              update();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [prefersReducedMotion]);

  return (
    <section
      aria-labelledby="stats-heading"
      className="py-20 px-6 bg-background/0"
    >
      <div className="container mx-auto">
        <h2
          id="stats-heading"
          className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent"
        >
          Trusted by the best — numbers that speak
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <article
                key={idx}
                className="group relative rounded-2xl p-6 bg-card/10 border border-border/20 hover:shadow-lg transition-shadow duration-200 focus-within:shadow-lg"
                aria-labelledby={`stat-${idx}-label`}
                role="region"
                tabIndex={0}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-border/10
                      group-hover:from-amber-500 group-hover:to-rose-400 transition-colors duration-300"
                    aria-hidden
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <div
                    className="text-3xl md:text-4xl font-extrabold leading-none"
                    // numeric value element (animated)
                    ref={(el) => (counterRefs.current[idx] = el)}
                    aria-live="polite"
                    aria-atomic="true"
                    role="status"
                  >
                    {stat.value}
                  </div>

                  <h3
                    id={`stat-${idx}-label`}
                    className="text-lg font-semibold text-foreground"
                  >
                    {stat.label}
                  </h3>

                  {stat.description && (
                    <p className="text-sm text-muted-foreground max-w-[18rem]">
                      {stat.description}
                    </p>
                  )}
                </div>

                {/* subtle decorative accent */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(255, 215, 64, 0.06), rgba(99,102,241,0.04))",
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;