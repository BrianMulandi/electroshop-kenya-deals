import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import MpesaPayment from './MpesaPayment';
import { CreditCard, Smartphone, Globe, Shield, Zap } from 'lucide-react';

interface PaymentOptionsProps {
  amount: number;
  discountedAmount?: number;
  onPaymentSuccess: () => void;
  onCancel: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ 
  amount, 
  discountedAmount,
  onPaymentSuccess, 
  onCancel, 
  open, 
  onOpenChange 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'stripe' | 'paypal'>('mpesa');
  const [showMpesa, setShowMpesa] = useState(false);
  
  const finalAmount = discountedAmount || amount;
  const hasDiscount = discountedAmount && discountedAmount < amount;

  const handlePaymentMethodSelect = (method: 'mpesa' | 'stripe' | 'paypal') => {
    setPaymentMethod(method);
    if (method === 'mpesa') {
      setShowMpesa(true);
    } else {
      // For demo purposes - simulate other payment methods
      setTimeout(() => {
        onPaymentSuccess();
      }, 2000);
    }
  };

  if (showMpesa) {
    return (
      <MpesaPayment 
        amount={finalAmount}
        onPaymentSuccess={onPaymentSuccess}
        onCancel={() => setShowMpesa(false)}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Choose Payment Method
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Summary */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount:</span>
                <div className="text-right">
                  {hasDiscount && (
                    <div className="text-sm text-muted-foreground line-through">
                      KSh {amount.toLocaleString()}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-primary">
                    KSh {finalAmount.toLocaleString()}
                  </div>
                  {hasDiscount && (
                    <Badge variant="secondary" className="mt-1">
                      <Zap className="w-3 h-3 mr-1" />
                      5% Early Bird Discount
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mpesa" className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                M-Pesa
              </TabsTrigger>
              <TabsTrigger value="stripe" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Card
              </TabsTrigger>
              <TabsTrigger value="paypal" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                PayPal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mpesa" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Smartphone className="w-5 h-5 text-mpesa" />
                    M-Pesa Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Pay securely with M-Pesa. Most popular payment method in Kenya.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">Instant</Badge>
                    <Badge variant="outline">Secure</Badge>
                    <Badge variant="outline">No fees</Badge>
                  </div>
                  <Button 
                    onClick={() => handlePaymentMethodSelect('mpesa')}
                    className="w-full bg-mpesa hover:bg-mpesa/90 text-mpesa-foreground"
                  >
                    Pay with M-Pesa
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stripe" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Credit/Debit Card
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Pay with Visa, Mastercard, or American Express. Accepted worldwide.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">Global</Badge>
                    <Badge variant="outline">SSL Secured</Badge>
                    <Badge variant="outline">3D Secure</Badge>
                  </div>
                  <Button 
                    onClick={() => handlePaymentMethodSelect('stripe')}
                    className="w-full"
                  >
                    Pay with Card
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="paypal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="w-5 h-5 text-blue-600" />
                    PayPal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Pay with your PayPal account or credit card through PayPal.
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">Buyer Protection</Badge>
                    <Badge variant="outline">International</Badge>
                    <Badge variant="outline">Fast</Badge>
                  </div>
                  <Button 
                    onClick={() => handlePaymentMethodSelect('paypal')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Pay with PayPal
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Your payment is secured with industry-standard encryption</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentOptions;