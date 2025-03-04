
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table } from '@/components/ui/table';
import { books, currentUser } from '@/lib/data';
import { BookOpen, Users, Package, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('books');
  
  // Check if user is admin
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/account" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-1/2">
              <TabsTrigger value="books">
                <BookOpen className="mr-2 h-4 w-4" />
                Books
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="mr-2 h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="orders">
                <Package className="mr-2 h-4 w-4" />
                Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="books" className="space-y-4">
              <div className="flex justify-between mb-4">
                <Input
                  placeholder="Search books..."
                  className="max-w-sm"
                />
                <Button>
                  Add New Book
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>${book.price}</td>
                        <td>{book.available ? 'In Stock' : 'Out of Stock'}</td>
                        <td>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Input
                placeholder="Search users..."
                className="max-w-sm mb-4"
              />

              <div className="rounded-md border">
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td>john@example.com</td>
                      <td>User</td>
                      <td>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <Input
                placeholder="Search orders..."
                className="max-w-sm mb-4"
              />

              <div className="rounded-md border">
                <Table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ORD-001</td>
                      <td>John Doe</td>
                      <td>2024-03-04</td>
                      <td>Completed</td>
                      <td>$49.99</td>
                      <td>
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
