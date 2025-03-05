import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isMobile = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearchQuery(query);
      if (!isMobile) setIsExpanded(true);
    }
  }, [location.search, isMobile]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      if (!isMobile) {
        setTimeout(() => setIsExpanded(false), 1000);
      }
    }
  };

  const toggleExpand = () => {
    if (!isMobile) {
      setIsExpanded(!isExpanded);
      if (!isExpanded) {
        setTimeout(() => {
          const input = document.querySelector('.search-input') as HTMLInputElement;
          if (input) input.focus();
        }, 100);
      }
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative flex items-center ${isMobile ? 'w-full' : ''}`}
    >
      {isMobile ? (
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-10 bg-secondary/50 border-0 focus-visible:ring-1 search-input"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          {isExpanded ? (
            <div className="relative animate-fade-in">
              <Input
                type="text"
                placeholder="Search for books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px] pl-10 pr-4 h-9 bg-secondary/50 border-0 focus-visible:ring-1 search-input"
                autoFocus
                onBlur={() => {
                  if (!searchQuery) {
                    setTimeout(() => setIsExpanded(false), 200);
                  }
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              >
                <Search className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={toggleExpand}
              className="hover:bg-secondary/80 transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
        </>
      )}
    </form>
  );
};

export default SearchBar;
