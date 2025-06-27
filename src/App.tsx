
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
    <div className="min-h-screen bg-gray-50">
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

      <footer className="bg-blue-600 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">ElectroShop Kenya</p>
          <p className="text-blue-200">Your trusted electronics partner since 2020</p>
          <div className="mt-4 text-sm text-blue-200">
            <p>Email: support@electroshop.co.ke | Phone: +254 712 345 678</p>
            <p className="mt-2">&copy; 2025 ElectroShop Kenya. All rights reserved.</p>
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
