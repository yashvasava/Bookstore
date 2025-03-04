
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-secondary/20 to-white z-0"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          <div className={`max-w-xl transition-all duration-1000 delay-100 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="space-y-2 mb-6">
              <div className="inline-block bg-primary/5 rounded-full px-3 py-1 text-xs font-medium text-primary/80">
                Find your next favorite book
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tighter">
                Discover a World of <span className="text-primary">Knowledge</span> and Adventure
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl md:leading-relaxed mt-4">
                Buy or rent from our vast collection of books. From bestsellers to rare finds, we have something for every reader.
              </p>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-1000 delay-300 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>
              <Link to="/books">
                <Button size="lg" className="rounded-full px-6">
                  Browse Collection
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="rounded-full px-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right side - Book showcase */}
          <div className={`relative transition-all duration-1000 delay-500 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative h-[400px] md:h-[500px] w-full perspective-1000">
              <div className="absolute top-0 right-0 w-[70%] h-[70%] z-20 transform rotate-6 translate-y-12 hover:rotate-2 hover:translate-y-8 transition-all duration-500">
                <div className="h-full w-full shadow-xl rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" 
                    alt="Featured Book" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-[70%] h-[70%] z-10 transform -rotate-6 translate-y-12 hover:rotate-2 hover:translate-y-8 transition-all duration-500">
                <div className="h-full w-full shadow-xl rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1495640388908-05fa85288e61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" 
                    alt="Featured Book" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] z-30 hover:scale-105 transition-all duration-500">
                <div className="h-full w-full shadow-2xl rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" 
                    alt="Featured Book" 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
