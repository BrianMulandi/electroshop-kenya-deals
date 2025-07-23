
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone, Laptop, Tv, Headphones, ShoppingBag, Truck } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-primary" />,
      title: "Wide Selection",
      description: "Choose from thousands of electronics and gadgets from trusted brands"
    },
    {
      icon: <Truck className="w-8 h-8 text-secondary" />,
      title: "Fast Delivery",
      description: "Quick delivery across Kenya - Nairobi same day, countrywide 2-3 days"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-accent" />,
      title: "Latest Tech",
      description: "Always up-to-date with the newest technology and competitive prices"
    }
  ];

  const categories = [
    { icon: <Smartphone size={40} />, name: "Smartphones", count: "50+ models" },
    { icon: <Laptop size={40} />, name: "Laptops", count: "30+ models" },
    { icon: <Tv size={40} />, name: "Smart TVs", count: "20+ models" },
    { icon: <Headphones size={40} />, name: "Audio", count: "40+ products" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-kenyan text-white py-20 relative overflow-hidden">
        {/* Kenya flag pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-black"></div>
          <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white"></div>
          <div className="absolute top-2/3 left-0 w-full h-1/3 bg-green-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-24 border-4 border-white rounded-lg"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            🇰🇪 Kenya's Premier
            <span className="block text-yellow-300">Electronics Store</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Karibu! Discover amazing deals on smartphones, laptops, TVs, and more. 
            Quality electronics at unbeatable prices, delivered across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 animate-scale-in shadow-lg"
            >
              <Link to="/products">
                🛒 Start Shopping Now
              </Link>
            </Button>
            <div className="text-white/80 text-sm">
              💳 Pay with M-Pesa • 🚚 Free delivery in Nairobi
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose ElectroShop?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to="/products"
                className="group"
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4 text-primary group-hover:text-primary/80 transition-colors">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.count}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-success text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Upgrade Your Tech? 🚀
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of satisfied customers across Kenya who trust ElectroShop for their electronics needs.
            Pay securely with M-Pesa and enjoy fast delivery!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-secondary hover:bg-white/90 text-lg px-8 py-6 shadow-lg"
            >
              <Link to="/products">
                🛍️ Browse Products
              </Link>
            </Button>
            <div className="flex items-center space-x-4 text-white/80">
              <span className="text-sm">💳 M-Pesa Ready</span>
              <span className="text-sm">🇰🇪 Made for Kenya</span>
              <span className="text-sm">⭐ 5-Star Reviews</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
