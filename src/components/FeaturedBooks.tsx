
import React, { useState, useEffect } from 'react';
import { books } from '@/lib/data';
import BookCard from './BookCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedBooks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const featuredBooks = books.filter(book => book.featured).slice(0, 5);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('featured-books');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="featured-books" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Books</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Discover our handpicked selection of must-read books that have captivated readers worldwide.
              </p>
            </div>
            <Link to="/books" className="mt-4 md:mt-0">
              <Button variant="ghost" className="group">
                View all books
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book, index) => (
              <div
                key={book.id}
                className={`transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <BookCard book={book} featured={index === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
