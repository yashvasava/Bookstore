
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { books, categories, Book } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { SlidersHorizontal, X, ArrowDownAZ, ArrowUpZA, BarChart2 } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

const Books: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [location.search]);

  // Apply filters
  useEffect(() => {
    let results = [...books];
    
    // Search filter
    if (searchTerm) {
      results = results.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter(book => 
        book.category.some(cat => selectedCategories.includes(cat))
      );
    }
    
    // Price filter
    results = results.filter(book => 
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );
    
    // Sorting
    switch (sortBy) {
      case 'price_low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'title_asc':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_desc':
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default sorting (relevance) - no change
        break;
    }
    
    setFilteredBooks(results);
  }, [searchTerm, selectedCategories, priceRange, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange([0, 50]);
    setSortBy('relevance');
    navigate('/books');
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">All Books</h1>
            <p className="text-muted-foreground">
              Browse our collection of {books.length} books
            </p>
          </div>
          
          <div className="md:grid md:grid-cols-12 gap-8">
            {/* Mobile filter toggle */}
            <div className="mb-4 md:hidden">
              <Button 
                variant="outline" 
                onClick={toggleFilter}
                className="w-full flex items-center justify-between"
              >
                <span className="flex items-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filter & Sort
                </span>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {filteredBooks.length} results
                </span>
              </Button>
            </div>
            
            {/* Sidebar filters - Desktop */}
            <div className={`md:col-span-3 lg:col-span-2 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white p-5 rounded-lg shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="h-8 text-xs"
                  >
                    Clear All
                  </Button>
                  
                  {/* Close button for mobile only */}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden"
                    onClick={toggleFilter}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {/* Search box */}
                  <div>
                    <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                      Search
                    </Label>
                    <Input
                      id="search"
                      placeholder="Search by title or author"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <Label className="text-sm font-medium mb-4 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </Label>
                    <Slider
                      defaultValue={[0, 50]}
                      max={50}
                      step={1}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceChange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>$0</span>
                      <span>$50</span>
                    </div>
                  </div>
                  
                  {/* Categories */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      Categories
                    </Label>
                    <ScrollArea className="h-[200px] pr-4">
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => handleCategoryChange(category)}
                            />
                            <label
                              htmlFor={`category-${category}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Books grid */}
            <div className="md:col-span-9 lg:col-span-10">
              {/* Sorting and results count */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
                  Showing {filteredBooks.length} of {books.length} books
                </p>
                
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">
                      <div className="flex items-center">
                        Relevance
                      </div>
                    </SelectItem>
                    <SelectItem value="price_low">
                      <div className="flex items-center">
                        <ArrowDownAZ className="mr-2 h-4 w-4" />
                        Price: Low to High
                      </div>
                    </SelectItem>
                    <SelectItem value="price_high">
                      <div className="flex items-center">
                        <ArrowUpZA className="mr-2 h-4 w-4" />
                        Price: High to Low
                      </div>
                    </SelectItem>
                    <SelectItem value="title_asc">
                      <div className="flex items-center">
                        <ArrowDownAZ className="mr-2 h-4 w-4" />
                        Title: A to Z
                      </div>
                    </SelectItem>
                    <SelectItem value="title_desc">
                      <div className="flex items-center">
                        <ArrowUpZA className="mr-2 h-4 w-4" />
                        Title: Z to A
                      </div>
                    </SelectItem>
                    <SelectItem value="rating">
                      <div className="flex items-center">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Highest Rated
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {isLoading ? (
                // Loading skeleton
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-muted rounded-lg h-64 mb-3"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : filteredBooks.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">No books found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
