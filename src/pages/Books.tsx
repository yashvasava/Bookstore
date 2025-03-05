
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { categories } from '@/lib/data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { booksApi } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const Books: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Get search query from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const data = await booksApi.getBooks();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast({
          title: "Error Loading Books",
          description: "There was an issue loading the books. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBooks();
  }, []);

  // Filter books when search or category changes
  useEffect(() => {
    const filterBooks = async () => {
      setIsSearching(true);
      
      try {
        let results;
        
        if (searchQuery) {
          // Search by query
          results = await booksApi.searchBooks(searchQuery);
          
          // Then filter by category if needed
          if (selectedCategory !== 'all') {
            results = results.filter(book => 
              book.category.includes(selectedCategory)
            );
          }
        } else if (selectedCategory !== 'all') {
          // Filter by category only
          results = await booksApi.getBooksByCategory(selectedCategory);
        } else {
          // No filters
          results = books;
        }
        
        setFilteredBooks(results);
      } catch (error) {
        console.error('Error filtering books:', error);
        toast({
          title: "Error Filtering Books",
          description: "There was an issue filtering the books. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsSearching(false);
      }
    };
    
    if (books.length > 0) {
      filterBooks();
    }
  }, [searchQuery, selectedCategory, books]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search query
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/books');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Browse Books</h1>
          
          {/* Search and filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by title or author"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Button 
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {isSearching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </form>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                navigate('/books');
              }}
              className="whitespace-nowrap"
            >
              Clear Filters
            </Button>
          </div>
          
          {/* Category tabs */}
          <Tabs 
            defaultValue="all" 
            value={selectedCategory} 
            onValueChange={setSelectedCategory} 
            className="mb-8"
          >
            <TabsList className="overflow-auto pb-1 mb-2 flex flex-nowrap max-w-full w-full justify-start">
              <TabsTrigger value="all">All Books</TabsTrigger>
              {categories.slice(0, 10).map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredBooks.map(book => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                  {filteredBooks.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No books found matching your criteria.</p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            
            {categories.slice(0, 10).map(category => (
              <TabsContent key={category} value={category} className="mt-6">
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {filteredBooks.map(book => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                    {filteredBooks.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No books found in this category.</p>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
