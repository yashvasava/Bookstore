
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { booksApi, cartApi, orderApi, paymentService } from '@/services/api';
import { db } from '@/services/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, Landmark, Smartphone } from 'lucide-react';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [books, setBooks] = useState<any[]>([]);
  
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
    country: 'India', // Default to India
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
  });

  // Load cart items and calculate totals
  useEffect(() => {
    const loadCartAndBooks = async () => {
      try {
        // Fetch books data
        const booksData = await booksApi.getBooks();
        setBooks(booksData);
        
        // Fetch cart items
        const items = await cartApi.getCart();
        
        if (items.length === 0) {
          navigate('/cart');
          return;
        }
        
        setCartItems(items);
        
        // Calculate totals
        let subTotal = 0;
        
        items.forEach(item => {
          const book = booksData.find(b => b.id === item.bookId);
          if (book) {
            const price = item.isRental 
              ? (book.rentPrice || 0) * (item.rentalDays || 7) / 7
              : book.price;
            
            subTotal += price * item.quantity;
          }
        });
        
        // Convert to rupees (multiplying by 83 as an example conversion rate)
        // In a real app, you would use a proper currency conversion API
        subTotal = subTotal * 83;
        
        const taxAmount = subTotal * 0.18; // 18% GST in India
        
        setSubtotal(subTotal);
        setTax(taxAmount);
        setTotal(subTotal + taxAmount);
        
        // If user is logged in, pre-fill email
        if (user) {
          setFormData(prev => ({
            ...prev,
            email: user.email,
            firstName: user.name.split(' ')[0] || '',
            lastName: user.name.split(' ').slice(1).join(' ') || ''
          }));
        }
        
        setIsPageLoaded(true);
      } catch (error) {
        console.error('Error loading cart data:', error);
        toast({
          title: "Error",
          description: "Failed to load cart data. Please try again.",
          variant: "destructive",
        });
        navigate('/cart');
      }
    };
    
    loadCartAndBooks();
  }, [navigate, user, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      toast({
        title: "Please Sign In",
        description: "You need to be signed in to complete your purchase.",
        variant: "destructive",
      });
      return;
    }
    
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
    
    setIsLoading(true);
    
    try {
      // Process payment first
      const paymentResult = await paymentService.processPayment(
        total, 
        paymentMethod,
        paymentMethod === 'card' ? {
          cardNumber: formData.cardNumber,
          cardExpiry: formData.cardExpiry,
          cardCvv: formData.cardCvv
        } : null
      );
      
      if (!paymentResult.success) {
        toast({
          title: "Payment Failed",
          description: paymentResult.error || "There was an issue processing your payment. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Create shipping address object
      const shippingAddress = {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      };
      
      // Create order
      const order = await orderApi.createOrder(
        user.id,
        cartItems,
        shippingAddress,
        paymentMethod
      );
      
      // Store payment record in database
      await db.query('payments', 'INSERT', {
        order_id: order.id,
        amount: total,
        payment_method: paymentMethod,
        transaction_id: paymentResult.transactionId || 'unknown',
        status: 'completed'
      });
      
      // Store order in database
      await db.query('orders', 'INSERT', {
        id: order.id,
        user_id: user.id,
        total_amount: total,
        status: order.status,
        shipping_street: shippingAddress.street,
        shipping_city: shippingAddress.city,
        shipping_state: shippingAddress.state,
        shipping_zip: shippingAddress.zipCode,
        shipping_country: shippingAddress.country,
        payment_method: paymentMethod,
        email_sent: order.emailSent || false
      });
      
      // Store order items in database
      for (const item of order.items) {
        await db.query('order_items', 'INSERT', {
          order_id: order.id,
          book_id: item.bookId,
          title: item.title,
          quantity: item.quantity,
          price: item.price * 83, // Convert to rupees
          is_rental: item.isRental,
          rental_days: item.rentalDays
        });
        
        // Update book stock
        const book = books.find(b => b.id === item.bookId);
        if (book) {
          await db.query('books', 'UPDATE', 
            { in_stock: Math.max(0, book.inStock - item.quantity) },
            bookRecord => bookRecord.id === item.bookId
          );
        }
      }
      
      // Clear cart
      await cartApi.clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed and will be processed shortly. A confirmation email has been sent.",
      });
      
      // Redirect to thank you page or home
      navigate('/');
    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        title: "Order Processing Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBookDetails = (bookId: string) => {
    return books.find(book => book.id === bookId);
  };

  // Function to format currency in rupees
  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
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
                        PIN Code *
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
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Place Order'}
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
                    
                    // Convert to rupees
                    const priceInRupees = price * 83;
                    
                    return (
                      <div key={`${item.bookId}-${item.isRental}`} className="flex gap-3 py-2">
                        <div className="flex-shrink-0 w-12">
                          <img 
                            src={book.coverImage || book.imageUrl} 
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
                            <span className="text-sm font-medium">
                              {formatRupees(priceInRupees * item.quantity)}
                            </span>
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
                    <span>{formatRupees(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>{formatRupees(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>{formatRupees(total)}</span>
                </div>
                
                {/* Submit button for desktop view */}
                <div className="hidden lg:block">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Place Order'}
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
