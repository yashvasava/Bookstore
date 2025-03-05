
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-3">Last Updated: June 1, 2025</p>
          <p className="text-muted-foreground mb-10">
            At BookHaven, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                  <p className="text-muted-foreground">
                    We may collect personal information that you voluntarily provide to us when you register 
                    on our website, place an order, subscribe to our newsletter, respond to a survey, fill out 
                    a form, or contact us. This information may include:
                  </p>
                  <ul className="list-disc list-inside mt-2 ml-4 text-muted-foreground">
                    <li>Name, email address, mailing address, and phone number</li>
                    <li>Billing information and payment details</li>
                    <li>Account preferences and settings</li>
                    <li>Order history and transaction information</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Automatically Collected Information</h3>
                  <p className="text-muted-foreground">
                    When you visit our website, our servers may automatically log standard data provided by your web browser. 
                    This may include:
                  </p>
                  <ul className="list-disc list-inside mt-2 ml-4 text-muted-foreground">
                    <li>Your device's IP address</li>
                    <li>Browser type and version</li>
                    <li>Pages you visit and time spent on those pages</li>
                    <li>Referring website addresses</li>
                    <li>Geographic location</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Cookies and Similar Technologies</h3>
                  <p className="text-muted-foreground">
                    We use cookies and similar tracking technologies to track activity on our website and 
                    store certain information. Cookies are files with a small amount of data that may include 
                    an anonymous unique identifier. You can instruct your browser to refuse all cookies or to 
                    indicate when a cookie is being sent.
                  </p>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                <li>To provide and maintain our services</li>
                <li>To process transactions and manage your account</li>
                <li>To send you order confirmations and updates</li>
                <li>To respond to your comments, questions, and customer service requests</li>
                <li>To send you marketing and promotional communications (if you have opted in)</li>
                <li>To personalize your experience and deliver content and product offerings relevant to your interests</li>
                <li>To improve our website, products, services, marketing, and customer relationships</li>
                <li>To protect our rights, property, or safety, and that of our customers or others</li>
                <li>To comply with applicable laws and regulations</li>
              </ul>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Disclosure of Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We may share your information in the following situations:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Service Providers</h3>
                  <p className="text-muted-foreground">
                    We may share your information with third-party vendors, service providers, contractors, 
                    or agents who perform services for us or on our behalf.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Business Transfers</h3>
                  <p className="text-muted-foreground">
                    If we are involved in a merger, acquisition, or sale of all or a portion of our assets, 
                    your information may be transferred as part of that transaction.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Legal Requirements</h3>
                  <p className="text-muted-foreground">
                    We may disclose your information if required to do so by law or in response to valid 
                    requests by public authorities (e.g., a court or government agency).
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Protection of Rights</h3>
                  <p className="text-muted-foreground">
                    We may disclose your information to protect our rights, privacy, safety, or property, 
                    or that of our customers or others.
                  </p>
                </div>
              </div>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to restrict or object to our processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We have implemented appropriate technical and organizational security measures designed to 
                protect the security of any personal information we process. However, please also remember 
                that we cannot guarantee that the internet itself is 100% secure. Although we will do our best 
                to protect your personal information, transmission of personal information to and from our website 
                is at your own risk.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by 
                posting the new Privacy Policy on this page and updating the "Last Updated" date. You are 
                advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>
          </div>
          
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>By email: privacy@bookhaven.com</li>
              <li>By phone: +1 (555) 123-4567</li>
              <li>By mail: 123 Book Street, Library District, Reading City, 90210</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
