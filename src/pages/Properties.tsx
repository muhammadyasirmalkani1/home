import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart,
  Search,
  Filter
} from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Modern Downtown Loft",
    location: "New York, NY",
    price: "$850,000",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    type: "Apartment",
    featured: true,
  },
  {
    id: 2,
    title: "Luxury Beach House",
    location: "Miami, FL",
    price: "$2,500,000",
    beds: 4,
    baths: 3,
    sqft: "3,500",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    type: "House",
    featured: true,
  },
  {
    id: 3,
    title: "Cozy Suburban Home",
    location: "Austin, TX",
    price: "$425,000",
    beds: 3,
    baths: 2,
    sqft: "2,100",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    type: "House",
    featured: false,
  },
  {
    id: 4,
    title: "Penthouse Suite",
    location: "Los Angeles, CA",
    price: "$3,200,000",
    beds: 3,
    baths: 3,
    sqft: "2,800",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    type: "Penthouse",
    featured: true,
  },
  {
    id: 5,
    title: "Mountain View Cabin",
    location: "Denver, CO",
    price: "$680,000",
    beds: 3,
    baths: 2,
    sqft: "1,800",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
    type: "Cabin",
    featured: false,
  },
  {
    id: 6,
    title: "Urban Studio",
    location: "Seattle, WA",
    price: "$320,000",
    beds: 1,
    baths: 1,
    sqft: "650",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    type: "Studio",
    featured: false,
  },
  {
    id: 7,
    title: "Historic Townhouse",
    location: "Boston, MA",
    price: "$1,150,000",
    beds: 4,
    baths: 3,
    sqft: "2,600",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    type: "Townhouse",
    featured: false,
  },
  {
    id: 8,
    title: "Desert Villa",
    location: "Phoenix, AZ",
    price: "$925,000",
    beds: 4,
    baths: 3,
    sqft: "3,200",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    type: "Villa",
    featured: true,
  },
];

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              Browse Properties
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover your dream home from our curated selection of premium properties
          </p>

          {/* Search Bar */}
          <div className="flex gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by location, type, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button size="lg" variant="outline" className="gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </Button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredProperties.map((property, index) => (
            <Card 
              key={property.id} 
              className="overflow-hidden group hover:shadow-glow transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {property.featured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-gold">
                    Featured
                  </Badge>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">
                      {property.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{property.type}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.beds}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.baths}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {property.price}
                  </span>
                  <Button size="sm" className="bg-gradient-gold">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No properties found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;