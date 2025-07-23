import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Smartphone, CheckCircle, Clock, AlertCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MpesaPaymentProps {
  amount: number;
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

type PaymentStatus = 'pending' | 'processing' | 'success' | 'failed';

const MpesaPayment: React.FC<MpesaPaymentProps> = ({ amount, onPaymentSuccess, onCancel }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const { toast } = useToast();

  const mpesaNumber = '0704137949';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.match(/^(?:\+254|254|0)([17]\d{8})$/)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid Kenyan phone number",
        variant: "destructive"
      });
      return;
    }

    setPaymentStatus('processing');
    
    // Simulate M-Pesa payment process with realistic prompts
    setPaymentStatus('processing');
    
    // First show "Check your phone" message
    toast({
      title: "M-Pesa Prompt Sent",
      description: "Please check your phone for M-Pesa STK push notification",
    });
    
    // After 3 seconds, show PIN entry simulation
    setTimeout(() => {
      toast({
        title: "Enter Your M-Pesa PIN",
        description: "A prompt has appeared on your phone. Enter your 4-digit M-Pesa PIN to complete the transaction.",
      });
    }, 2000);
    
    // After 6 seconds, show completion
    setTimeout(() => {
      setPaymentStatus('success');
      toast({
        title: "Payment Successful!",
        description: `KSh ${amount.toLocaleString()} has been paid successfully via M-Pesa`,
      });
      
      setTimeout(() => {
        onPaymentSuccess();
      }, 2000);
    }, 6000);
  };

  const formatPhoneNumber = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as 0XXX XXX XXX
    if (digits.length <= 10) {
      return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3').trim();
    }
    return digits.slice(0, 10).replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  };

  if (paymentStatus === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-mpesa mx-auto mb-4 animate-scale-in" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600">
              Your payment of <span className="font-bold text-mpesa">KSh {amount.toLocaleString()}</span> has been processed successfully.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Transaction ID:</strong> MP{Date.now().toString().slice(-8)}
            </p>
            <p className="text-sm text-green-800">
              <strong>Paid to:</strong> ElectroShop Kenya
            </p>
          </div>

          <p className="text-sm text-gray-500">
            You will receive an SMS confirmation shortly. Thank you for shopping with us!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="bg-mpesa/10 p-3 rounded-full">
            <Smartphone className="w-8 h-8 text-mpesa" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold">Pay with M-Pesa</CardTitle>
        <p className="text-gray-600">Secure mobile money payment</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Payment Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Payment Instructions:</h3>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Enter your M-Pesa phone number below</li>
            <li>2. Click "Pay Now" to initiate payment</li>
            <li>3. You'll receive an M-Pesa prompt on your phone</li>
            <li>4. Enter your M-Pesa PIN to complete payment</li>
          </ol>
        </div>

        {/* Amount Display */}
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Amount to Pay</p>
          <p className="text-2xl font-bold text-primary">KSh {amount.toLocaleString()}</p>
        </div>

        {/* Business Number */}
        <div className="text-center py-3 border border-mpesa/20 rounded-lg bg-mpesa/5">
          <p className="text-sm text-gray-600">Pay to Business Number</p>
          <p className="text-lg font-bold text-mpesa">{mpesaNumber}</p>
          <p className="text-xs text-gray-500">ElectroShop Kenya</p>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="phone">Your M-Pesa Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0XXX XXX XXX"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              required
              disabled={paymentStatus === 'processing'}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the phone number registered with M-Pesa
            </p>
          </div>

          {paymentStatus === 'processing' && (
            <div className="space-y-3 py-4">
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-5 h-5 text-orange-500 animate-bounce-gentle" />
                <span className="text-orange-600 font-medium">
                  Processing M-Pesa payment...
                </span>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800 text-center">
                  <strong>Step 1:</strong> Check your phone for STK push notification<br/>
                  <strong>Step 2:</strong> Enter your 4-digit M-Pesa PIN<br/>
                  <strong>Step 3:</strong> Confirm the transaction
                </p>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={paymentStatus === 'processing'}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={paymentStatus === 'processing'}
              className="flex-1 bg-mpesa hover:bg-mpesa/90 text-mpesa-foreground"
            >
              {paymentStatus === 'processing' ? 'Processing...' : 'Pay Now'}
            </Button>
          </div>
        </form>

        {/* Trust indicators */}
        <div className="text-center pt-4 border-t">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield className="w-3 h-3" />
            <span>Secured by M-Pesa • Trusted by millions worldwide</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MpesaPayment;