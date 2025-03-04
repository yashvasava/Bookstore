import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { User, Package, Heart, Settings, LogOut, Clock } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import { Link } from 'react-router-dom';

const Account: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Book Street',
    city: 'Reading',
    state: 'Bookshire',
    zipCode: '12345',
  });

  // Mock rentals data
  const rentals = [
    {
      id: 'RNT-1001',
      bookTitle: 'The Great Gatsby',
      rentDate: '2025-02-01',
      dueDate: '2025-02-15',
      returned: true,
      returnDate: '2025-02-12',
      depositAmount: 15.00,
      refundAmount: 15.00,
    },
    {
      id: 'RNT-1002',
      bookTitle: 'To Kill a Mockingbird',
      rentDate: '2025-02-20',
      dueDate: '2025-03-06',
      returned: false,
      depositAmount: 12.50,
    }
  ];

  useEffect(() => {
    setIsPageLoaded(true);
    
    // Check URL parameters for authentication success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome back to BookHaven!",
      });
      // Clean up URL
      window.history.replaceState({}, document.title, "/account");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    });
  };

  // Mock order data
  const orders = [
    {
      id: 'ORD-12345',
      date: '2025-02-15',
      total: 42.97,
      status: 'Delivered',
      items: [
        { id: '1', title: 'The Design of Everyday Things', quantity: 1 },
      ]
    },
    {
      id: 'ORD-12346',
      date: '2025-01-30',
      total: 65.98,
      status: 'Processing',
      items: [
        { id: '2', title: 'Thinking, Fast and Slow', quantity: 1 },
        { id: '6', title: 'Atomic Habits', quantity: 1 },
      ]
    },
  ];

  // Mock wishlist data
  const wishlist = [
    { id: '3', title: 'Zero to One', author: 'Peter Thiel', price: 26.99, coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' },
    { id: '4', title: 'Dune', author: 'Frank Herbert', price: 19.99, coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' },
    { id: '7', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', price: 24.99, coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' },
  ];

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto p-6 text-center">
            <User className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">Account Access</h1>
            <p className="text-muted-foreground mb-8">
              Please sign in or create an account to view your profile, orders, and wishlist.
            </p>
            <Button 
              size="lg" 
              className="w-full mb-4"
              onClick={() => setIsAuthModalOpen(true)}
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => {
                setIsAuthModalOpen(true);
              }}
            >
              Create Account
            </Button>
          </div>
        </main>
        
        <Footer />
        
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => setIsLoggedIn(true)}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar navigation */}
            <aside className="md:w-1/4 lg:w-1/5">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="h-20 w-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="mt-4 font-semibold text-lg">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">{userData.email}</p>
                </div>
                
                <Separator className="my-4" />
                
                <nav className="space-y-1">
                  <Button
                    variant={activeTab === 'profile' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Button>
                  <Button
                    variant={activeTab === 'orders' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package className="mr-2 h-4 w-4" /> Orders
                  </Button>
                  <Button
                    variant={activeTab === 'rentals' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('rentals')}
                  >
                    <Clock className="mr-2 h-4 w-4" /> Rentals
                  </Button>
                  <Button
                    variant={activeTab === 'wishlist' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart className="mr-2 h-4 w-4" /> Wishlist
                  </Button>
                  <Button
                    variant={activeTab === 'settings' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Button>
                  
                  <Separator className="my-4" />
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      setIsLoggedIn(false);
                      toast({
                        title: "Logged Out",
                        description: "You have been logged out successfully.",
                      });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </nav>
              </div>
            </aside>
            
            {/* Main content area */}
            <div className="md:w-3/4 lg:w-4/5">
              {/* Profile tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">My Profile</h2>
                  
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Full Name
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Address
                      </label>
                      <Input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-1">
                          City
                        </label>
                        <Input
                          type="text"
                          id="city"
                          name="city"
                          value={userData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium mb-1">
                          State
                        </label>
                        <Input
                          type="text"
                          id="state"
                          name="state"
                          value={userData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                          ZIP Code
                        </label>
                        <Input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={userData.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Orders tab */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">My Orders</h2>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12 border border-dashed rounded-lg">
                      <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't placed any orders yet.
                      </p>
                      <Button onClick={() => window.location.href = '/books'}>
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
                                Placed on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${order.total.toFixed(2)}</p>
                              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                order.status === 'Delivered' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium mb-2">Items</h4>
                            <ul className="space-y-2">
                              {order.items.map((item) => (
                                <li key={item.id} className="text-sm">
                                  {item.quantity} x {item.title}
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
                </div>
              )}
              
              {/* Rentals tab */}
              {activeTab === 'rentals' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">My Rentals</h2>
                  
                  {rentals.length === 0 ? (
                    <div className="text-center py-12 border border-dashed rounded-lg">
                      <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No rentals yet</h3>
                      <p className="text-muted-foreground mb-6">
                        You haven't rented any books yet.
                      </p>
                      <Button onClick={() => window.location.href = '/books'}>
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
                              <p className="text-muted-foreground">Rented on: {new Date(rental.rentDate).toLocaleDateString()}</p>
                              <p className="text-muted-foreground">Due date: {new Date(rental.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              {rental.returned ? (
                                <div>
                                  <p className="text-muted-foreground">Returned on: {new Date(rental.returnDate!).toLocaleDateString()}</p>
                                  <p className="text-muted-foreground">Refund: ${rental.refundAmount?.toFixed(2)}</p>
                                </div>
                              ) : (
                                <p className="text-muted-foreground">
                                  Days remaining: {Math.ceil((new Date(rental.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {!rental.returned && (
                            <div className="mt-4 flex justify-end">
                              <Button variant="outline" size="sm">
                                Return Book
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Wishlist tab */}
              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                  
                  {wishlist.length === 0 ? (
                    <div className="text-center py-12 border border-dashed rounded-lg">
                      <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                      <p className="text-muted-foreground mb-6">
                        Save items you like to your wishlist.
                      </p>
                      <Button onClick={() => window.location.href = '/books'}>
                        Browse Books
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlist.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 flex">
                          <img 
                            src={item.coverImage} 
                            alt={item.title} 
                            className="w-16 h-24 object-cover rounded mr-4"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium line-clamp-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{item.author}</p>
                            <p className="font-semibold mb-3">${item.price.toFixed(2)}</p>
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
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Settings tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                  
                  <Tabs defaultValue="password" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="password">Change Password</TabsTrigger>
                      <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="password" className="pt-6">
                      <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                            Current Password
                          </label>
                          <Input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                            New Password
                          </label>
                          <Input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                            Confirm New Password
                          </label>
                          <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                          />
                        </div>
                        <div className="pt-2">
                          <Button type="submit">
                            Change Password
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="preferences" className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label htmlFor="orderUpdates" className="text-sm">
                                Order Updates
                              </label>
                              <input
                                type="checkbox"
                                id="orderUpdates"
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                defaultChecked
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <label htmlFor="promotions" className="text-sm">
                                Promotions and Discounts
                              </label>
                              <input
                                type="checkbox"
                                id="promotions"
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                defaultChecked
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <label htmlFor="newReleases" className="text-sm">
                                New Releases and Recommendations
                              </label>
                              <input
                                type="checkbox"
                                id="newReleases"
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                defaultChecked
                              />
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label htmlFor="shareData" className="text-sm">
                                Share my reading preferences for recommendations
                              </label>
                              <input
                                type="checkbox"
                                id="shareData"
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                defaultChecked
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <Button type="button">
                            Save Preferences
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
