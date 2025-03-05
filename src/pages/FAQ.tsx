
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-10">
            Find answers to common questions about BookHaven's services, policies, and more.
          </p>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-4">How do I place an order?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                To place an order, browse our collection of books, add your selected items to your cart, and proceed to checkout. You'll be asked to provide shipping information and payment details. Once your order is confirmed, you'll receive an order confirmation email.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-4">How does book rental work?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                Our rental service allows you to borrow books for a specific period. During checkout, select the "Rent" option and choose your rental duration. You'll pay the rental fee plus a refundable deposit. When the rental period ends, return the book to receive your deposit back (minus any applicable late fees).
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-4">What are your shipping options?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery in select areas. Shipping costs vary based on your location and chosen method. Orders over $50 qualify for free standard shipping.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-4">Can I return or exchange books?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                Yes, we accept returns within 30 days of purchase for books in their original condition. For exchanges, please contact our customer service team. Rental books should be returned by the due date to avoid additional fees. Please note that certain items like digital downloads may not be eligible for returns.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-4">Do you ship internationally?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                Yes, we ship to most countries worldwide. International shipping rates and delivery times vary based on destination. Please note that customers are responsible for any customs duties or import taxes that may apply.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-4">How do I track my order?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                Once your order ships, you'll receive a confirmation email with tracking information. You can also view order status and tracking details in your account dashboard under "Order History".
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-4">What payment methods do you accept?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and store credit. For certain promotions, we may also accept gift cards or other payment methods as specified.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8" className="border rounded-lg p-2">
              <AccordionTrigger className="text-lg font-medium px-4">Do you offer gift wrapping?</AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                Yes, we offer gift wrapping services for an additional $3.99 per item. During checkout, select the gift wrap option and you'll be able to add a personalized message to your gift.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Didn't find what you're looking for?</h2>
            <p className="text-muted-foreground mb-6">Our customer service team is here to help you with any other questions you might have.</p>
            <a href="/contact" className="text-primary hover:underline">Contact Us</a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
