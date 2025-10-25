import Navigation from "@/components/Navigation";
import { GraduationCap } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Master of Computer Science",
      institution: "Tech University",
      year: "2020",
      description: "Specialized in software engineering and web technologies."
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "State University",
      year: "2018",
      description: "Foundation in computer science principles and programming."
    }
  ];

  const certifications = [
    "AWS Certified Developer",
    "Google Cloud Professional",
    "React Advanced Certification",
    "TypeScript Expert"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Education</h1>
          </div>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Degrees</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-glow transition-all">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{edu.degree}</h3>
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <span className="font-medium">{edu.institution}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{edu.year}</span>
                    </div>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Certifications</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {certifications.map((cert) => (
                  <div key={cert} className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-glow transition-all">
                    <span className="text-foreground font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Education;
