
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Product } from './ProductCard';

export interface CartItem extends Product {
  quantity: number;
}

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemComponent = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-blue-600 font-bold">KSh {item.price.toLocaleString()}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                disabled={item.quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              
              <span className="font-semibold min-w-[2rem] text-center">
                {item.quantity}
              </span>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus size={16} />
              </Button>
            </div>
            
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
        
        <div className="mt-3 text-right">
          <p className="text-lg font-bold text-gray-900">
            Subtotal: KSh {(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemComponent;
