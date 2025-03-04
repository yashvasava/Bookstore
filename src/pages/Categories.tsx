
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categories, books } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const Categories: React.FC = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [categoryData, setCategoryData] = useState<{[key: string]: number}>({});

  useEffect(() => {
    setIsPageLoaded(true);
    
    // Count books per category
    const counts: {[key: string]: number} = {};
    categories.forEach(category => {
      counts[category] = books.filter(book => book.category.includes(category)).length;
    });
    setCategoryData(counts);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Browse by Category</h1>
          <p className="text-muted-foreground mb-10 max-w-3xl">
            Explore our extensive collection of books across various genres and categories. 
            Find your next favorite read by browsing through our curated categories.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category}
                to={`/books?category=${category}`}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{category}</h2>
                </div>
                <p className="text-muted-foreground mb-4">{categoryData[category] || 0} books</p>
                <Button variant="outline" size="sm" className="w-full">
                  Browse {category}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
