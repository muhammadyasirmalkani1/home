import Navigation from "@/components/Navigation";
import { User } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">About Me</h1>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Welcome to my portfolio. I'm a passionate developer dedicated to creating 
              exceptional digital experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With years of experience in web development, I specialize in building 
              modern, responsive applications that solve real-world problems.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
