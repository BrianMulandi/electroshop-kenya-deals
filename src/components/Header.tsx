
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            ElectroShop Kenya
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium hover:text-blue-200 transition-colors ${
                isActive('/') ? 'text-blue-200' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium hover:text-blue-200 transition-colors ${
                isActive('/products') ? 'text-blue-200' : ''
              }`}
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className={`flex items-center gap-2 font-medium hover:text-blue-200 transition-colors ${
                isActive('/cart') ? 'text-blue-200' : ''
              }`}
            >
              <ShoppingCart size={20} />
              Cart ({cartCount})
            </Link>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="flex items-center gap-1 hover:text-blue-200 transition-colors">
              <ShoppingCart size={20} />
              <span className="text-sm">({cartCount})</span>
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden mt-4 flex space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium hover:text-blue-200 transition-colors ${
              isActive('/') ? 'text-blue-200' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`text-sm font-medium hover:text-blue-200 transition-colors ${
              isActive('/products') ? 'text-blue-200' : ''
            }`}
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
