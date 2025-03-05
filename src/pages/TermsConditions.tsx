
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-3">Last Updated: June 1, 2025</p>
          <p className="text-muted-foreground mb-10">
            Please read these Terms and Conditions carefully before using the BookHaven website. 
            Your access to and use of the service is conditioned on your acceptance of and compliance with these terms.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part 
                of the terms, then you may not access the service. These Terms apply to all visitors, users, and others 
                who access or use the service.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current 
                at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination 
                of your account on our service.
              </p>
              <p className="text-muted-foreground">
                You are responsible for safeguarding the password that you use to access the service and for any activities 
                or actions under your password. You agree not to disclose your password to any third party. You must notify 
                us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Orders and Purchases</h2>
              <p className="text-muted-foreground mb-4">
                All orders are subject to acceptance and availability. We reserve the right to refuse any order you place 
                with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, 
                or per order.
              </p>
              <p className="text-muted-foreground mb-4">
                Prices for products are subject to change without notice. We reserve the right to modify or discontinue 
                the service (or any part or content thereof) without notice at any time. We shall not be liable to you or 
                to any third party for any modification, price change, suspension, or discontinuance of the service.
              </p>
              <p className="text-muted-foreground">
                You agree to provide current, complete, and accurate purchase and account information for all purchases 
                made at our store. You agree to promptly update your account and other information, including your email 
                address and credit card numbers and expiration dates, so that we can complete your transactions and contact 
                you as needed.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Book Rentals</h2>
              <p className="text-muted-foreground mb-4">
                When renting books from BookHaven, you agree to return the books in substantially the same condition as when 
                received on or before the due date. Normal wear and tear is expected and acceptable.
              </p>
              <p className="text-muted-foreground mb-4">
                You will be charged a late fee for books returned after the due date. If a book is not returned within 30 days 
                after the due date, it will be considered lost, and you will be charged the full replacement value of the book.
              </p>
              <p className="text-muted-foreground">
                For books returned with excessive damage (beyond normal wear and tear), you may be charged a damage fee up to 
                the full replacement value of the book. Damage includes but is not limited to: water damage, torn or missing pages, 
                broken bindings, excessive highlighting or writing, or any other damage that renders the book unusable for future renters.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                The service and its original content, features, and functionality are and will remain the exclusive property of 
                BookHaven and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and 
                trade dress may not be used in connection with any product or service without the prior written consent of BookHaven.
              </p>
              <p className="text-muted-foreground">
                The contents of our books are protected by copyright laws and are the property of their respective publishers and authors. 
                Unauthorized reproduction, distribution, or digitization of our books is strictly prohibited.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall BookHaven, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for 
                any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access 
                or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from 
                the service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, 
                contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility 
                of such damage.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its 
                conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver 
                of those rights.
              </p>
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
                we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will 
                be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, 
                you agree to be bound by the revised terms.
              </p>
            </section>
          </div>
          
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>By email: legal@bookhaven.com</li>
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

export default TermsConditions;
