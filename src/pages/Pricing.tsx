import Navigation from "@/components/Navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$99",
      period: "month",
      features: ["5 Projects", "Basic Support", "1GB Storage", "Email Support"],
      highlighted: false
    },
    {
      name: "Pro",
      price: "$199",
      period: "month",
      features: ["Unlimited Projects", "Priority Support", "10GB Storage", "24/7 Support", "Custom Domain"],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "$499",
      period: "month",
      features: ["Unlimited Everything", "Dedicated Support", "100GB Storage", "Phone Support", "Custom Solutions", "API Access"],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Pricing Plans</h1>
            <p className="text-lg text-muted-foreground">Choose the perfect plan for your needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`bg-card border rounded-lg p-8 hover:shadow-glow transition-all ${
                plan.highlighted ? 'border-primary shadow-lg scale-105' : 'border-border'
              }`}>
                {plan.highlighted && (
                  <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Most Popular
                  </div>
                )}
                <h2 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h2>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.highlighted ? 'bg-primary' : ''}`}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
