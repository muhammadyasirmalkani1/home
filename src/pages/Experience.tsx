import Navigation from "@/components/Navigation";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Senior Developer",
      company: "Tech Company",
      period: "2022 - Present",
      description: "Leading frontend development and mentoring junior developers."
    },
    {
      title: "Full Stack Developer",
      company: "Digital Agency",
      period: "2020 - 2022",
      description: "Built responsive web applications using modern technologies."
    },
    {
      title: "Junior Developer",
      company: "Startup Inc",
      period: "2018 - 2020",
      description: "Developed features and fixed bugs for various client projects."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Experience</h1>
          </div>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-glow transition-all">
                <h2 className="text-2xl font-semibold text-foreground mb-2">{exp.title}</h2>
                <div className="flex items-center gap-2 text-primary mb-3">
                  <span className="font-medium">{exp.company}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Experience;
