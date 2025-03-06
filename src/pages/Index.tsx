
import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedBooks from '@/components/FeaturedBooks';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BookOpen, TrendingUp, RefreshCcw, BookOpenCheck } from 'lucide-react';
import AuthModal from '@/components/AuthModal';

const Index: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Add a small delay before showing content to ensure everything is ready
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: 'Vast Collection',
      description: 'Access thousands of books across various genres and categories.',
      icon: <BookOpen className="h-10 w-10" />,
    },
    {
      title: 'Best Sellers',
      description: 'Stay updated with the latest and most popular books in the market.',
      icon: <TrendingUp className="h-10 w-10" />,
    },
    {
      title: 'Flexible Rentals',
      description: 'Rent books for your preferred duration with hassle-free returns.',
      icon: <RefreshCcw className="h-10 w-10" />,
    },
    {
      title: 'Premium Quality',
      description: 'All our books are carefully curated to ensure excellent condition.',
      icon: <BookOpenCheck className="h-10 w-10" />,
    },
  ];

  if (!isPageLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Why Choose BookHaven?
              </h2>
              <p className="text-muted-foreground">
                We offer a premium book buying and renting experience with features designed to make your literary journey enjoyable.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
                >
                  <div className="inline-flex items-center justify-center p-2 bg-primary/5 rounded-full mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedBooks />
        
        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Join Our Community of Book Lovers
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                Create an account to start purchasing or renting books, track your orders, and get personalized recommendations.
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="rounded-full px-8"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Sign Up Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
