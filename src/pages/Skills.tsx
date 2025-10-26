import Navbar from "@/components/Navbar";
import { Code2, Palette, Database, Rocket } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
    },
    {
      icon: Database,
      title: "Backend Development",
      skills: ["Node.js", "PostgreSQL", "Supabase", "REST APIs"]
    },
    {
      icon: Palette,
      title: "Design",
      skills: ["UI/UX", "Figma", "Responsive Design", "Animations"]
    },
    {
      icon: Rocket,
      title: "Tools & DevOps",
      skills: ["Git", "Docker", "CI/CD", "Vercel"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-12">Skills & Expertise</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title} className="bg-card border border-border rounded-lg p-6 hover:shadow-glow transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;
