
import React, { useState } from 'react';
import { Book, addToCart } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Bookmark, ArrowLeft, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'buy' | 'rent'>('buy');
  const [rentalDays, setRentalDays] = useState(7);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddToCart = () => {
    addToCart({
      bookId: book.id,
      quantity,
      isRental: purchaseType === 'rent',
      rentalDays: purchaseType === 'rent' ? rentalDays : undefined,
    });

    toast.success(`${book.title} added to cart`, {
      description: `${quantity} ${quantity === 1 ? 'copy' : 'copies'} added to your cart.`,
      action: {
        label: 'View Cart',
        onClick: () => navigate('/cart'),
      },
    });
  };

  const totalPrice = purchaseType === 'buy' 
    ? book.price * quantity 
    : ((book.rentPrice || 0) * rentalDays / 7) * quantity;

  return (
    <div className="container mx-auto px-4 py-12">
      <Button
        variant="ghost"
        size="sm"
        className="mb-8"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Book Image */}
        <div className="relative">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse rounded-lg"></div>
          )}
          <div className="aspect-[2/3] bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={book.coverImage}
              alt={book.title}
              className={`w-full h-full object-cover ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div>
            <div className="flex gap-2 mb-3">
              {book.category.slice(0, 2).map((category, index) => (
                <span 
                  key={index}
                  className="inline-block bg-secondary text-secondary-foreground text-xs font-medium rounded-full px-2.5 py-1"
                >
                  {category}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{book.title}</h1>
            <p className="text-xl text-muted-foreground mt-2">by {book.author}</p>
            
            <div className="flex items-center mt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {book.rating.toFixed(1)} rating
              </span>
            </div>
            
            <p className="mt-6 text-lg leading-relaxed">{book.description}</p>
          </div>

          <div className="border-t border-b py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Publisher</p>
              <p className="font-medium">{book.publisher}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Language</p>
              <p className="font-medium">{book.language}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pages</p>
              <p className="font-medium">{book.pages}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Release Date</p>
              <p className="font-medium">{new Date(book.releaseDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-6">
            <RadioGroup
              value={purchaseType}
              onValueChange={(value: 'buy' | 'rent') => setPurchaseType(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="buy" id="buy" />
                <Label htmlFor="buy" className="font-medium">
                  Buy
                  <span className="block text-muted-foreground text-sm">${book.price.toFixed(2)}</span>
                </Label>
              </div>
              
              {book.rentPrice && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rent" id="rent" />
                  <Label htmlFor="rent" className="font-medium">
                    Rent
                    <span className="block text-muted-foreground text-sm">${book.rentPrice.toFixed(2)}/week</span>
                  </Label>
                </div>
              )}
            </RadioGroup>

            {purchaseType === 'rent' && (
              <div className="space-y-3">
                <Label htmlFor="rentalDays">Rental Period (days)</Label>
                <div className="flex gap-2">
                  {[7, 14, 30, 60].map((days) => (
                    <Button
                      key={days}
                      type="button"
                      variant={rentalDays === days ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRentalDays(days)}
                    >
                      {days}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="w-24">
                <Label htmlFor="quantity" className="text-sm">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-2xl font-semibold">${totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleAddToCart} className="sm:flex-1" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="lg" className="sm:flex-1">
                <Bookmark className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Book Tabs - Details, Reviews, etc. */}
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-8">
            <TabsTrigger value="details">Book Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <h3 className="text-xl font-semibold">Product Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-2">Specifications</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between pb-2 border-b">
                    <span>ISBN</span>
                    <span className="font-medium text-foreground">{book.isbn}</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b">
                    <span>Format</span>
                    <span className="font-medium text-foreground">Hardcover</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b">
                    <span>Dimensions</span>
                    <span className="font-medium text-foreground">6 × 9 inches</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b">
                    <span>Publication Date</span>
                    <span className="font-medium text-foreground">{new Date(book.releaseDate).toLocaleDateString()}</span>
                  </li>
                  <li className="flex justify-between pb-2">
                    <span>Publisher</span>
                    <span className="font-medium text-foreground">{book.publisher}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">About the Author</h4>
                <p className="text-muted-foreground">
                  {book.author} is a renowned author with multiple bestselling titles. 
                  Their work has been translated into over 20 languages and has received 
                  critical acclaim worldwide.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
              <p className="text-muted-foreground mb-6">Be the first to review this book</p>
              <Button>Write a Review</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Shipping Information</h3>
                <p className="text-muted-foreground">
                  We offer free standard shipping on all orders over $35. 
                  Orders typically arrive within 3-5 business days. 
                  Expedited shipping options are available at checkout.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Return Policy</h3>
                <p className="text-muted-foreground">
                  If you're not satisfied with your purchase, you can return it 
                  within 30 days for a full refund. Books must be in original 
                  condition. For rental returns, please ensure books are returned 
                  by the due date to avoid late fees.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookDetail;
