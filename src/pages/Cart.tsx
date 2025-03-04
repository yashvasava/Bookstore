
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { books, cart, removeFromCart, updateCartItemQuantity, calculateCartTotal, clearCart } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(cart);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsPageLoaded(true);
    setTotal(calculateCartTotal());
  }, []);

  useEffect(() => {
    setCartItems([...cart]);
    setTotal(calculateCartTotal());
  }, [cart]);

  const handleQuantityChange = (bookId: string, isRental: boolean, quantity: number) => {
    updateCartItemQuantity(bookId, isRental, quantity);
    setCartItems([...cart]);
    setTotal(calculateCartTotal());
  };

  const handleRemoveItem = (bookId: string, isRental: boolean) => {
    removeFromCart(bookId, isRental);
    setCartItems([...cart]);
    setTotal(calculateCartTotal());
    
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([...cart]);
    setTotal(calculateCartTotal());
    
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getBookDetails = (bookId: string) => {
    return books.find(book => book.id === bookId);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any books to your cart yet.
              </p>
              <Button onClick={() => navigate('/books')}>
                Browse Books
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm divide-y">
                  {cartItems.map((item) => {
                    const book = getBookDetails(item.bookId);
                    if (!book) return null;
                    
                    const price = item.isRental 
                      ? (book.rentPrice || 0) * (item.rentalDays || 7) / 7
                      : book.price;
                    
                    return (
                      <div key={`${item.bookId}-${item.isRental}`} className="p-4 flex flex-col sm:flex-row gap-4">
                        <div className="flex-shrink-0">
                          <Link to={`/books/${book.id}`}>
                            <img 
                              src={book.coverImage} 
                              alt={book.title} 
                              className="w-24 h-36 object-cover rounded"
                            />
                          </Link>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <Link to={`/books/${book.id}`} className="font-medium hover:underline">
                                {book.title}
                              </Link>
                              <p className="text-sm text-muted-foreground">by {book.author}</p>
                              
                              {item.isRental && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  Rental: {item.rentalDays} days
                                </p>
                              )}
                            </div>
                            
                            <div className="text-right">
                              <p className="font-medium">${price.toFixed(2)}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.isRental ? 'Rental' : 'Purchase'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleQuantityChange(item.bookId, item.isRental, Math.max(1, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="mx-3">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleQuantityChange(item.bookId, item.isRental, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.bookId, item.isRental)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Clear Cart
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${(total * 0.1).toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${(total + total * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
