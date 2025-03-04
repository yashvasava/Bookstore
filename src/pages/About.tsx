
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BookOpen, Map, Clock, ShieldCheck, Mail } from 'lucide-react';

const About: React.FC = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero section */}
        <section className="bg-secondary/30 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About BookHaven</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your trusted destination for books since 2010. We're passionate about connecting readers 
              with their next favorite book through our bookstore and rental services.
            </p>
          </div>
        </section>
        
        {/* Our story section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  BookHaven was founded in 2010 with a simple mission: to make quality books accessible to everyone. 
                  What started as a small corner bookshop has grown into a beloved community hub for book lovers.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our founder, Jane Smith, a lifelong bibliophile, believed that books should be shared and enjoyed by all. 
                  This belief led to our innovative book rental program, which allows customers to experience more books 
                  without the commitment of purchasing every title.
                </p>
                <p className="text-muted-foreground">
                  Today, we continue to grow and evolve, but our core values remain the same: 
                  a love of literature, commitment to community, and dedication to customer satisfaction.
                </p>
              </div>
              <div className="bg-secondary/30 h-[400px] rounded-lg flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-primary/50" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Core values section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-secondary/10 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Love of Literature</h3>
                <p className="text-muted-foreground">
                  We believe in the transformative power of books and promote reading as a lifelong pursuit.
                </p>
              </div>
              
              <div className="bg-secondary/10 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                  <Map className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Focus</h3>
                <p className="text-muted-foreground">
                  We're committed to serving our community and creating a welcoming space for readers.
                </p>
              </div>
              
              <div className="bg-secondary/10 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  Our rental program promotes resource sharing and reduces waste in the book industry.
                </p>
              </div>
              
              <div className="bg-secondary/10 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Service</h3>
                <p className="text-muted-foreground">
                  We prioritize customer satisfaction and strive to exceed expectations in everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ and Contact section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">FAQ & Contact</h2>
            
            <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
              </TabsList>
              
              <TabsContent value="faq" className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">How does the book rental system work?</h3>
                    <p className="text-muted-foreground">
                      Our rental system allows you to borrow books for a period of 7, 14, 30, or 60 days. 
                      Simply select "Rent" instead of "Purchase" when adding books to your cart, choose 
                      your rental period, and return the books by the due date to avoid late fees.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What happens if I return a book late?</h3>
                    <p className="text-muted-foreground">
                      Late returns incur a fee of $1 per day until the book is returned. If a book is 
                      more than 30 days late, you'll be charged the full purchase price of the book.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Do you ship internationally?</h3>
                    <p className="text-muted-foreground">
                      Yes, we ship to most countries worldwide. International shipping rates vary by location 
                      and will be calculated at checkout.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Can I return or exchange a purchased book?</h3>
                    <p className="text-muted-foreground">
                      We accept returns of purchased books within 30 days of delivery. Books must be in original 
                      condition with no damage or markings.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">How can I track my order?</h3>
                    <p className="text-muted-foreground">
                      Once your order ships, you'll receive a confirmation email with tracking information. 
                      You can also view your order status in your account dashboard.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
                  <p className="text-muted-foreground mb-4">
                    Have questions or need assistance? We're here to help! Use the form below or 
                    contact us directly using the information provided.
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <Mail className="h-5 w-5 text-primary mr-2" />
                    <span>support@bookhaven.com</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Map className="h-5 w-5 text-primary mr-2" />
                    <span>123 Book Street, Reading, RG1 2BK</span>
                  </div>
                </div>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full">Send Message</Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
