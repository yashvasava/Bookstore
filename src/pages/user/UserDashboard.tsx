
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { currentUser } from '@/lib/data';
import { Book, Clock, Heart, Settings } from 'lucide-react';

const UserDashboard = () => {
  // Check if user is logged in
  if (!currentUser) {
    return <Navigate to="/account" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">My Books</h3>
                <Book className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Purchased books</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Active Rentals</h3>
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">2</p>
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
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Rented "The Design of Everyday Things"</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Purchased "Zero to One"</p>
                    <p className="text-sm text-muted-foreground">5 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
