
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CartItemComponent, { CartItem } from '@/components/CartItem';
import MpesaPayment from '@/components/MpesaPayment';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
  cartTotal: number;
}

const Cart = ({ cartItems, onUpdateQuantity, onRemoveFromCart, cartTotal }: CartProps) => {
  const [showMpesaPayment, setShowMpesaPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setShowMpesaPayment(false);
    // Clear cart after successful payment
    cartItems.forEach(item => onRemoveFromCart(item.id));
  };
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link to="/products">
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/products">
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Shopping Cart</h1>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItemComponent
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveFromCart}
              />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span>KSh {cartTotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>KSh {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                className="w-full mt-6 bg-mpesa hover:bg-mpesa/90 text-mpesa-foreground" 
                size="lg"
                onClick={() => setShowMpesaPayment(true)}
              >
                Pay with M-Pesa
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout powered by M-Pesa
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* M-Pesa Payment Dialog */}
      <Dialog open={showMpesaPayment} onOpenChange={setShowMpesaPayment}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">M-Pesa Payment</DialogTitle>
          </DialogHeader>
          <MpesaPayment 
            amount={cartTotal}
            onPaymentSuccess={handlePaymentSuccess}
            onCancel={() => setShowMpesaPayment(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Payment Success Message */}
      {paymentSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 animate-scale-in">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed! 🎉</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                </p>
                <Button 
                  onClick={() => setPaymentSuccess(false)}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Cart;
