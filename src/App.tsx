
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import NotFound from "./pages/NotFound";
import { MapPin, ShoppingBag, CreditCard, Truck, Star, Mail, Phone, Smartphone, Building } from "lucide-react";

const queryClient = new QueryClient();

const AppContent = () => {
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartCount,
  } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={getCartCount()} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={
            <Products onAddToCart={addToCart} />
          } />
          <Route path="/cart" element={
            <Cart 
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              cartTotal={getCartTotal()}
            />
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-accent text-accent-foreground py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                ElectroShop Kenya
              </h3>
              <p className="text-accent-foreground/80">
                Your trusted electronics partner since 2020. 
                Serving customers across all 47 counties of Kenya.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-accent-foreground/80">
                <p className="flex items-center gap-2"><ShoppingBag className="w-4 h-4" /> Shop Electronics</p>
                <p className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> Multiple Payment Options</p>
                <p className="flex items-center gap-2"><Truck className="w-4 h-4" /> Delivery Info</p>
                <p className="flex items-center gap-2"><Star className="w-4 h-4" /> Customer Reviews</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-accent-foreground/80">
                <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@electroshop.co.ke</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +254 712 345 678</p>
                <p className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> M-Pesa: 0704137949</p>
                <p className="flex items-center gap-2"><Building className="w-4 h-4" /> Nairobi, Kenya</p>
              </div>
            </div>
          </div>
          <div className="border-t border-accent-foreground/20 mt-8 pt-8 text-center text-accent-foreground/60">
            <p>&copy; 2025 ElectroShop Kenya. All rights reserved. Crafted with excellence for Kenya and the world.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
