
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  department: z.string().min(1, { message: 'Please select a department.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      department: '',
      message: '',
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      form.reset();
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
    }, 1500);
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-muted-foreground mb-10 max-w-3xl">
            Have a question, comment, or need assistance? We're here to help. Fill out the form below or use 
            the contact information provided, and we'll get back to you as soon as possible.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    We aim to respond to all inquiries within 24 hours during business days.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Subject of your message" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="customer-service">Customer Service</SelectItem>
                                  <SelectItem value="orders">Orders & Shipping</SelectItem>
                                  <SelectItem value="returns">Returns & Refunds</SelectItem>
                                  <SelectItem value="technical">Technical Support</SelectItem>
                                  <SelectItem value="partnerships">Business & Partnerships</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide details about your inquiry" 
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Sending Message <Send className="ml-2 h-4 w-4 animate-pulse" /></>
                        ) : (
                          <>Send Message <Send className="ml-2 h-4 w-4" /></>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        123 Book Street<br />
                        Library District<br />
                        Reading City, 90210
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        +1 (555) 123-4567<br />
                        Toll-free: 1-800-BOOKS-99
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        contact@bookhaven.com<br />
                        support@bookhaven.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Hours of Operation</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Monday - Friday: 9am - 6pm<br />
                        Saturday: 10am - 4pm<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Customer Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our customer service team is available during business hours to assist you with any questions 
                    or concerns.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Response Time:</span> Within 24 hours</p>
                    <p><span className="font-medium">Phone Hours:</span> 9am - 5pm (M-F)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
