
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { addToCart } from '@/lib/data';
import { toast } from 'sonner';

interface BookCardProps {
  book: Book;
  featured?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      bookId: book.id,
      quantity: 1,
      isRental: false
    });
    
    toast.success(`${book.title} added to cart`, {
      description: 'Go to cart to complete your purchase',
    });
  };

  return (
    <div 
      className={`group relative ${featured ? 'md:col-span-2 md:row-span-2' : ''} hover-lift`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/book/${book.id}`}
        className="block h-full"
      >
        <div className={`bg-white rounded-lg overflow-hidden shadow-sm transition-shadow relative ${
          isHovered ? 'shadow-md' : ''
        } h-full flex flex-col`}>
          {/* Image container */}
          <div className={`overflow-hidden relative ${featured ? 'aspect-[3/2] md:aspect-[2/1]' : 'aspect-[2/3]'}`}>
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse"></div>
            )}
            <img
              src={book.coverImage}
              alt={book.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                isHovered ? 'scale-105' : 'scale-100'
              } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
            />
            
            {/* Overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : ''
              }`}
            ></div>
            
            {/* Quick actions */}
            <div 
              className={`absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-white text-primary hover:bg-white/90 transition-colors w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
          
          {/* Book info */}
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="font-medium text-lg line-clamp-1">{book.title}</h3>
              <p className="text-muted-foreground text-sm">{book.author}</p>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col">
                <span className="font-medium">${book.price.toFixed(2)}</span>
                {book.rentPrice && (
                  <span className="text-xs text-muted-foreground">
                    Rent: ${book.rentPrice.toFixed(2)}/week
                  </span>
                )}
              </div>
              
              <div className="flex items-center text-sm">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{book.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
