import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Modern Villa Residence",
    location: "Beverly Hills, CA",
    price: "$4,500,000",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Luxury Penthouse Suite",
    location: "Manhattan, NY",
    price: "$8,200,000",
    beds: 4,
    baths: 3,
    sqft: "3,800",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    featured: true
  },
  {
    id: 3,
    title: "Coastal Paradise Estate",
    location: "Malibu, CA",
    price: "$6,750,000",
    beds: 6,
    baths: 5,
    sqft: "5,500",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    featured: false
  }
];

const FeaturedProperties = () => {
  return (
    <section className="py-24 px-6" id="featured">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-5xl font-bold">
            <span className="text-foreground">Featured </span>
            <span className="bg-gradient-gold bg-clip-text text-transparent">Properties</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked exclusive properties from our premium collection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <Card 
              key={property.id} 
              className="group overflow-hidden bg-card/10 backdrop-blur-sm border-border hover:border-primary transition-all duration-500 hover:shadow-card hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {property.featured && (
                  <Badge className="absolute top-4 right-4 bg-gradient-gold border-0">
                    Featured
                  </Badge>
                )}
                <div className="absolute bottom-4 left-4">
                  <div className="text-3xl font-bold text-white drop-shadow-lg">
                    {property.price}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  {property.location}
                </div>

                <div className="flex justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-1">
                    <Bed className="w-4 h-4 text-primary" />
                    <span className="text-sm">{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-4 h-4 text-primary" />
                    <span className="text-sm">{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Square className="w-4 h-4 text-primary" />
                    <span className="text-sm">{property.sqft} sqft</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
