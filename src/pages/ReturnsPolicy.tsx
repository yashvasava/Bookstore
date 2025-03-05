
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ReturnsPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Returns & Refunds</h1>
          <p className="text-muted-foreground mb-10">
            We want you to be completely satisfied with your purchase. If you're not entirely happy, 
            we're here to help. This policy outlines our returns, refunds, and exchanges procedures.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Policy Overview</h2>
              <Alert className="mb-6">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>30-Day Return Period</AlertTitle>
                <AlertDescription>
                  Most items can be returned within 30 days of delivery, provided they are in their original condition.
                </AlertDescription>
              </Alert>
              <p className="text-muted-foreground">
                We understand that sometimes a purchase just isn't right. That's why we offer a generous 
                return period for most items. To be eligible for a return, your item must be in the same 
                condition that you received it, unworn or unused, with tags, and in its original packaging.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Return an Item</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Online Purchases</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Log in to your account and visit your order history</li>
                    <li>Select the order containing the item(s) you wish to return</li>
                    <li>Follow the return instructions and print your return label</li>
                    <li>Package your item securely with the return form</li>
                    <li>Drop off the package at any authorized shipping location</li>
                  </ol>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">In-Store Purchases</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Visit any of our store locations with your item(s)</li>
                    <li>Bring your receipt or proof of purchase</li>
                    <li>Our staff will assist you with your return or exchange</li>
                    <li>Refunds will be processed to your original payment method</li>
                  </ol>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Refunds Process</h2>
              <p className="text-muted-foreground mb-4">
                Once we receive your returned item, we'll inspect it to ensure it meets our return policy 
                requirements. The inspection process typically takes 1-2 business days.
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="border p-4 rounded-lg text-center">
                  <h3 className="text-lg font-medium mb-2">Credit Card Refunds</h3>
                  <p className="text-muted-foreground">Processed within 3-5 business days after inspection</p>
                </div>
                <div className="border p-4 rounded-lg text-center">
                  <h3 className="text-lg font-medium mb-2">Store Credit</h3>
                  <p className="text-muted-foreground">Issued immediately after inspection is complete</p>
                </div>
                <div className="border p-4 rounded-lg text-center">
                  <h3 className="text-lg font-medium mb-2">Other Payment Methods</h3>
                  <p className="text-muted-foreground">Processing time varies based on payment provider</p>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Damaged or Defective Items</h2>
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Report Damaged Items Promptly</AlertTitle>
                <AlertDescription>
                  Please report any damaged or defective items within 7 days of receiving your order.
                </AlertDescription>
              </Alert>
              <p className="text-muted-foreground">
                If you receive a damaged or defective item, please contact our customer service 
                team immediately. We'll provide instructions for returning the item and will send 
                a replacement or issue a full refund including any shipping charges.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
              <p className="text-muted-foreground mb-4">
                Certain items cannot be returned due to health, safety, or other reasons. These include:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                <li>Digital downloads, e-books, or digital content</li>
                <li>Gift cards or store credit</li>
                <li>Items marked as final sale or clearance</li>
                <li>Personal items (for hygiene reasons)</li>
                <li>Books with obvious signs of use or damage caused after delivery</li>
              </ul>
              <Alert>
                <HelpCircle className="h-4 w-4" />
                <AlertTitle>Not Sure?</AlertTitle>
                <AlertDescription>
                  If you're unsure whether an item can be returned, please contact our customer service team for assistance.
                </AlertDescription>
              </Alert>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Book Rental Returns</h2>
              <p className="text-muted-foreground mb-4">
                Rental books must be returned by their due date to avoid additional fees. Please use the pre-paid 
                return label provided with your rental shipment. Rental books should be returned in similar condition 
                as received, with minimal highlighting or note-taking.
              </p>
              <p className="text-muted-foreground">
                Late returns may incur additional rental charges. Books damaged beyond normal wear and tear 
                may result in partial or complete loss of your deposit.
              </p>
            </section>
          </div>
          
          <div className="mt-12 p-6 bg-muted rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-3">Have Questions?</h2>
            <p className="text-muted-foreground mb-4">
              Our customer service team is available to assist you with any questions or concerns 
              regarding returns, refunds, or exchanges.
            </p>
            <a href="/contact" className="text-primary hover:underline">Contact Us</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReturnsPolicy;
