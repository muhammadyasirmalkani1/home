import { Award, Users, Home, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Home,
    value: "500+",
    label: "Premium Properties",
    description: "Carefully curated luxury homes"
  },
  {
    icon: Users,
    value: "10K+",
    label: "Happy Clients",
    description: "Satisfied homeowners worldwide"
  },
  {
    icon: Award,
    value: "25+",
    label: "Awards Won",
    description: "Industry recognition & excellence"
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Success Rate",
    description: "Client satisfaction guaranteed"
  }
];

const StatsSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-card/60 backdrop-blur-sm border border-border hover:border-primary transition-all duration-500 hover:shadow-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-gradient-gold group-hover:shadow-glow transition-all duration-500">
                  <stat.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-semibold text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
