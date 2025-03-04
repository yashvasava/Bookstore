
import React, { useState } from 'react';
import { Book, CartItem as CartItemType, removeFromCart, updateCartItemQuantity } from '@/lib/data';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemType;
  book: Book;
  onUpdate: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, book, onUpdate }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.bookId, item.isRental);
      onUpdate();
      toast.success(`${book.title} removed from cart`);
    }, 300);
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = Math.max(1, item.quantity + amount);
    updateCartItemQuantity(item.bookId, item.isRental, newQuantity);
    onUpdate();
  };

  const price = item.isRental
    ? ((book.rentPrice || 0) * (item.rentalDays || 7) / 7) * item.quantity
    : book.price * item.quantity;

  return (
    <div className={`flex border-b py-6 transition-opacity duration-300 ${isRemoving ? 'opacity-0' : 'opacity-100'}`}>
      <div className="relative h-24 w-16 overflow-hidden rounded-md bg-muted flex-shrink-0">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse"></div>
        )}
        <img
          src={book.coverImage}
          alt={book.title}
          className={`h-full w-full object-cover ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium">{book.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
          </div>
          <p className="text-base font-medium">${price.toFixed(2)}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="mx-3 text-sm">{item.quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={() => handleQuantityChange(1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center">
            {item.isRental && (
              <span className="mr-4 text-xs text-muted-foreground">
                {item.rentalDays} day rental
              </span>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
