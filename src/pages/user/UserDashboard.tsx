import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Book, Clock, Heart, Settings, ShoppingBag, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { rentalApi, orderApi, Rental, Order } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const UserDashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || !user) return;
      
      setIsLoadingData(true);
      try {
        // Fetch rentals
        const userRentals = await rentalApi.getUserRentals(user.id);
        setRentals(userRentals);
        
        // Fetch orders
        const userOrders = await orderApi.getOrders(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "There was an error loading your data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoadingData(false);
      }
    };
    
    if (!isLoading && isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, isLoading, user]);

  // Handle rental return
  const handleReturnBook = async (rentalId: string) => {
    try {
      const updatedRental = await rentalApi.returnRental(rentalId);
      if (updatedRental) {
        setRentals(prev => 
          prev.map(rental => 
            rental.id === rentalId ? updatedRental : rental
          )
        );
        
        toast({
          title: "Book Returned",
          description: `Your book has been returned successfully. Refund amount: $${updatedRental.refundAmount?.toFixed(2)}`,
        });
      }
    } catch (error) {
      console.error('Error returning book:', error);
      toast({
        title: "Error",
        description: "There was an error processing your return. Please try again.",
        variant: "destructive"
      });
    }
  };

  // If user is not authenticated, redirect to login
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Function to get the date string safely
  const getDateString = (item: Order | Rental): string => {
    if ('createdAt' in item) {
      return item.createdAt;
    } else if ('startDate' in item) {
      return item.startDate;
    }
    return new Date().toISOString(); // Fallback
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <Button variant="outline" onClick={() => navigate('/account')}>
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-5 h-auto">
              <TabsTrigger value="overview" className="py-3">Overview</TabsTrigger>
              <TabsTrigger value="orders" className="py-3">Orders</TabsTrigger>
              <TabsTrigger value="rentals" className="py-3">Rentals</TabsTrigger>
              <TabsTrigger value="reading" className="py-3">Reading Progress</TabsTrigger>
              <TabsTrigger value="wishlist" className="py-3">Wishlist</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">My Books</h3>
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{orders.length}</p>
                <p className="text-sm text-muted-foreground">Purchased books</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Active Rentals</h3>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">
                  {rentals.filter(rental => !rental.returned).length}
                </p>
                <p className="text-sm text-muted-foreground">Books due soon</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Wishlist</h3>
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Saved for later</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Reading Time</h3>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">24h</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                {isLoadingData ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[...rentals, ...orders]
                      .sort((a, b) => new Date(getDateString(b)).getTime() - new Date(getDateString(a)).getTime())
                      .slice(0, 3)
                      .map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium">
                              {'status' in item 
                                ? `Ordered "${item.items[0].title}${item.items.length > 1 ? ` +${item.items.length - 1} more` : ''}"`
                                : `Rented "${item.bookTitle}"`
                              }
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(getDateString(item)).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      ))
                    }
                    {rentals.length === 0 && orders.length === 0 && (
                      <p className="text-center text-muted-foreground py-4">No recent activity</p>
                    )}
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Reading List</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Atomic Habits</p>
                      <p className="text-sm text-muted-foreground">Page 124 of 320</p>
                    </div>
                    <Button>Continue Reading</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">The Code Breaker</p>
                      <p className="text-sm text-muted-foreground">Page 45 of 560</p>
                    </div>
                    <Button>Continue Reading</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">My Orders</h2>
              
              {isLoadingData ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-lg">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't placed any orders yet.
                  </p>
                  <Button onClick={() => navigate('/books')}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-wrap justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">Items</h4>
                        <ul className="space-y-2">
                          {order.items.map((item, i) => (
                            <li key={i} className="text-sm">
                              {item.quantity} x {item.title} - ${item.price.toFixed(2)}
                              {item.isRental && item.rentalDays && ` (Rental: ${item.rentalDays} days)`}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Rentals Tab */}
          <TabsContent value="rentals">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">My Rentals</h2>
              
              {isLoadingData ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
              ) : rentals.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-lg">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No rentals yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't rented any books yet.
                  </p>
                  <Button onClick={() => navigate('/books')}>
                    Browse Books to Rent
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {rentals.map((rental) => (
                    <div key={rental.id} className="border rounded-lg p-4">
                      <div className="flex flex-wrap justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{rental.bookTitle}</h3>
                          <p className="text-sm text-muted-foreground">
                            Rental ID: {rental.id}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">Deposit: ${rental.depositAmount.toFixed(2)}</p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            rental.returned 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {rental.returned ? 'Returned' : 'Active'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-3">
                        <div>
                          <p className="text-muted-foreground">Rented on: {new Date(rental.startDate).toLocaleDateString()}</p>
                          <p className="text-muted-foreground">Due date: {new Date(rental.endDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          {rental.returned ? (
                            <div>
                              <p className="text-muted-foreground">Returned on: {new Date(rental.returnDate!).toLocaleDateString()}</p>
                              <p className="text-muted-foreground">Refund: ${rental.refundAmount?.toFixed(2)}</p>
                            </div>
                          ) : (
                            <p className="text-muted-foreground">
                              Days remaining: {Math.ceil((new Date(rental.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {!rental.returned && (
                        <div className="mt-4 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReturnBook(rental.id)}
                          >
                            Return Book
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Reading Progress Tab */}
          <TabsContent value="reading">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Reading Progress</h2>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Atomic Habits</h3>
                    <span className="text-sm text-muted-foreground">39% complete</span>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '39%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>Page 124</span>
                    <span>320 pages</span>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Continue Reading</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">The Code Breaker</h3>
                    <span className="text-sm text-muted-foreground">8% complete</span>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-2.5 mb-4">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>Page 45</span>
                    <span>560 pages</span>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Continue Reading</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 flex">
                  <img 
                    src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" 
                    alt="Zero to One" 
                    className="w-16 h-24 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-1">Zero to One</h3>
                    <p className="text-sm text-muted-foreground mb-2">Peter Thiel</p>
                    <p className="font-semibold mb-3">$26.99</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Add to Cart
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex">
                  <img 
                    src="https://images.unsplash.com/photo-1495640388908-05fa85288e61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" 
                    alt="Dune" 
                    className="w-16 h-24 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-1">Dune</h3>
                    <p className="text-sm text-muted-foreground mb-2">Frank Herbert</p>
                    <p className="font-semibold mb-3">$19.99</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Add to Cart
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex">
                  <img 
                    src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" 
                    alt="Sapiens" 
                    className="w-16 h-24 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-1">Sapiens: A Brief History of Humankind</h3>
                    <p className="text-sm text-muted-foreground mb-2">Yuval Noah Harari</p>
                    <p className="font-semibold mb-3">$24.99</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Add to Cart
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
