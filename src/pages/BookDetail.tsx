
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { books, addToCart } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Clock, BookOpen, Calendar, PenSquare, BookCopy } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [book, setBook] = useState(books.find(b => b.id === id));
  const [isRental, setIsRental] = useState(false);
  const [rentalDays, setRentalDays] = useState(7);
  const [quantity, setQuantity] = useState(1);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setBook(books.find(b => b.id === id));
  }, [id]);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
            <p className="text-muted-foreground mb-6">Sorry, we couldn't find the book you're looking for.</p>
            <Button onClick={() => navigate('/books')}>Browse Books</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const price = isRental ? book.rentPrice : book.price;
    if (isRental && !book.rentPrice) {
      toast({
        title: "Error",
        description: "This book is not available for rent.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      bookId: book.id,
      quantity,
      isRental,
      rentalDays: isRental ? rentalDays : undefined,
    });

    toast({
      title: "Added to Cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Book cover image */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-auto object-cover aspect-[2/3]"
                />
              </div>
            </div>
            
            {/* Book details */}
            <div className="md:w-2/3 lg:w-3/4">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {book.category.map((cat, index) => (
                  <span 
                    key={index} 
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(book.rating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-muted-foreground">
                  {book.rating} • {book.available ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <Tabs defaultValue="purchase" className="mb-6">
                <TabsList>
                  <TabsTrigger 
                    value="purchase" 
                    onClick={() => setIsRental(false)}
                    disabled={!book.available}
                  >
                    Purchase
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rent" 
                    onClick={() => setIsRental(true)}
                    disabled={!book.available || !book.rentPrice}
                  >
                    Rent
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="purchase" className="pt-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${book.price.toFixed(2)}</span>
                  </div>
                </TabsContent>
                
                <TabsContent value="rent" className="pt-4">
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold">${book.rentPrice?.toFixed(2)}</span>
                    <span className="text-muted-foreground ml-2">per week</span>
                  </div>
                  
                  <div className="mb-4">
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Rental period:
                    </label>
                    <div className="flex gap-2">
                      {[7, 14, 30, 60].map(days => (
                        <Button
                          key={days}
                          variant={rentalDays === days ? "default" : "outline"}
                          size="sm"
                          onClick={() => setRentalDays(days)}
                        >
                          {days} days
                        </Button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-4">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                
                <Button 
                  size="lg" 
                  className="flex-1 md:flex-none md:min-w-[200px]"
                  onClick={handleAddToCart}
                  disabled={!book.available}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-10" />
          
          {/* Book information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">About this book</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {book.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Pages</span>
                  </div>
                  <p>{book.pages}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Published</span>
                  </div>
                  <p>{new Date(book.releaseDate).getFullYear()}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <PenSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Publisher</span>
                  </div>
                  <p>{book.publisher}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookCopy className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">ISBN</span>
                  </div>
                  <p>{book.isbn}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Book Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span>Hardcover</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language</span>
                  <span>{book.language}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Release Date</span>
                  <span>{new Date(book.releaseDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;
