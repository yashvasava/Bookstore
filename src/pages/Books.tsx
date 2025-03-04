
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import { books, categories } from '@/lib/data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Books: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    let results = books;
    
    // Filter by category if not "all"
    if (selectedCategory !== 'all') {
      results = results.filter(book => 
        book.category.includes(selectedCategory)
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
      );
    }
    
    setFilteredBooks(results);
  }, [searchQuery, selectedCategory]);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Browse Books</h1>
          
          {/* Search and filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search by title or author"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="whitespace-nowrap"
            >
              Clear Filters
            </Button>
          </div>
          
          {/* Category tabs */}
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="overflow-auto pb-1 mb-2 flex flex-nowrap max-w-full w-full justify-start">
              <TabsTrigger value="all">All Books</TabsTrigger>
              {categories.slice(0, 10).map(category => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
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
            </TabsContent>
            
            {categories.slice(0, 10).map(category => (
              <TabsContent key={category} value={category} className="mt-6">
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
