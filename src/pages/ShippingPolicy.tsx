
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Shipping Policy</h1>
          <p className="text-muted-foreground mb-10">
            At BookHaven, we strive to provide fast, reliable shipping services to all our customers. 
            This policy outlines our shipping practices, delivery timeframes, and related information.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Options</h2>
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Shipping Method</TableHead>
                        <TableHead>Estimated Delivery Time</TableHead>
                        <TableHead>Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Standard Shipping</TableCell>
                        <TableCell>3-5 business days</TableCell>
                        <TableCell>$4.99 (Free on orders over $50)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Express Shipping</TableCell>
                        <TableCell>1-2 business days</TableCell>
                        <TableCell>$9.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Same-Day Delivery</TableCell>
                        <TableCell>Same day (order before 11am)</TableCell>
                        <TableCell>$14.99 (Select areas only)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">International Shipping</TableCell>
                        <TableCell>7-14 business days</TableCell>
                        <TableCell>Varies by location (Starting at $12.99)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Order Processing</h2>
              <p className="text-muted-foreground mb-4">
                Orders are processed within 1-2 business days after payment confirmation. Once your order ships, 
                you'll receive a confirmation email with tracking information. 
              </p>
              <p className="text-muted-foreground">
                Please note that during peak seasons (holidays, special promotions) or unforeseen circumstances, 
                processing times may be slightly longer.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
              <p className="text-muted-foreground mb-4">
                We ship to most countries worldwide. However, some restrictions may apply based on customs regulations 
                or other limitations. If we're unable to ship to your location, you'll be notified during checkout.
              </p>
              <p className="text-muted-foreground">
                For international orders, please be aware that customers are responsible for any customs duties, 
                import taxes, or fees that may apply when receiving shipments in their country.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Tracking Your Order</h2>
              <p className="text-muted-foreground mb-4">
                All shipped orders include tracking information sent via email. You can also track your order 
                by logging into your account and viewing your order history.
              </p>
              <p className="text-muted-foreground">
                If you have not received tracking information within 3 business days of your order, 
                please contact our customer service team.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Delivery Issues</h2>
              <p className="text-muted-foreground mb-4">
                If you encounter any issues with your delivery (damaged package, missing items, incorrect items), 
                please contact our customer service team within 7 days of receiving your order.
              </p>
              <p className="text-muted-foreground">
                For packages marked as delivered but not received, please check with neighbors and your local 
                delivery office before contacting us. If the issue persists, we'll work with the carrier to 
                locate your package or process a replacement.
              </p>
            </section>
          </div>
          
          <div className="mt-12 p-6 bg-muted rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-3">Need Further Assistance?</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about our shipping policy or need help with a specific order,
              our customer service team is ready to assist you.
            </p>
            <a href="/contact" className="text-primary hover:underline">Contact Customer Service</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
