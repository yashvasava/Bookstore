
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { books, cart, calculateCartTotal, clearCart } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Landmark, Smartphone } from 'lucide-react';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(cart);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
  });

  useEffect(() => {
    setIsPageLoaded(true);
    
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
    
    const subTotal = calculateCartTotal();
    const taxAmount = subTotal * 0.1;
    
    setSubtotal(subTotal);
    setTax(taxAmount);
    setTotal(subTotal + taxAmount);
  }, [navigate]);

  useEffect(() => {
    setCartItems([...cart]);
  }, [cart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate payment based on method
    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv)) {
      toast({
        title: "Error",
        description: "Please enter all card details.",
        variant: "destructive",
      });
      return;
    } else if (paymentMethod === 'upi' && !formData.upiId) {
      toast({
        title: "Error",
        description: "Please enter your UPI ID.",
        variant: "destructive",
      });
      return;
    }
    
    // Process the order
    // In a real app, this would send data to a backend
    clearCart();
    
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been placed and will be processed shortly.",
    });
    
    navigate('/');
  };

  const getBookDetails = (bookId: string) => {
    return books.find(book => book.id === bookId);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email *
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Address *
                    </label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City *
                      </label>
                      <Input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State *
                      </label>
                      <Input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                        ZIP Code *
                      </label>
                      <Input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">
                        <CreditCard className="h-4 w-4 mr-2" /> Credit Card
                      </TabsTrigger>
                      <TabsTrigger value="upi">
                        <Smartphone className="h-4 w-4 mr-2" /> UPI
                      </TabsTrigger>
                      <TabsTrigger value="cod">
                        <Landmark className="h-4 w-4 mr-2" /> Cash on Delivery
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                            Card Number *
                          </label>
                          <Input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium mb-1">
                            Expiry Date *
                          </label>
                          <Input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardCvv" className="block text-sm font-medium mb-1">
                            CVV *
                          </label>
                          <Input
                            type="text"
                            id="cardCvv"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="upi" className="mt-4">
                      <div>
                        <label htmlFor="upiId" className="block text-sm font-medium mb-1">
                          UPI ID *
                        </label>
                        <Input
                          type="text"
                          id="upiId"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          placeholder="yourname@upi"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          You'll receive a payment request on your UPI app.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="cod" className="mt-4">
                      <p className="text-muted-foreground">
                        Pay with cash upon delivery. Please note that our delivery person may 
                        contact you before arrival.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Submit button for mobile view */}
                <div className="lg:hidden">
                  <Button type="submit" className="w-full" size="lg">
                    Place Order
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="max-h-60 overflow-y-auto mb-4 pr-2">
                  {cartItems.map((item) => {
                    const book = getBookDetails(item.bookId);
                    if (!book) return null;
                    
                    const price = item.isRental 
                      ? (book.rentPrice || 0) * (item.rentalDays || 7) / 7
                      : book.price;
                    
                    return (
                      <div key={`${item.bookId}-${item.isRental}`} className="flex gap-3 py-2">
                        <div className="flex-shrink-0 w-12">
                          <img 
                            src={book.coverImage} 
                            alt={book.title} 
                            className="w-full h-auto object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{book.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.isRental ? `Rental: ${item.rentalDays} days` : 'Purchase'}
                          </p>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs">Qty: {item.quantity}</span>
                            <span className="text-sm font-medium">${(price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                {/* Submit button for desktop view */}
                <div className="hidden lg:block">
                  <Button type="submit" className="w-full" size="lg" onClick={handleSubmit}>
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
