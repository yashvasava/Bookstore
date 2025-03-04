
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ isMobile = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsExpanded(false);
    }
  };

  // For desktop, toggle expanded state on click
  const toggleExpand = () => {
    if (!isMobile) {
      setIsExpanded(!isExpanded);
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
            className="w-full pl-10 pr-4 h-10 bg-secondary/50 border-0 focus-visible:ring-1"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                className="w-[200px] pl-10 pr-4 h-9 bg-secondary/50 border-0 focus-visible:ring-1"
                autoFocus
                onBlur={() => {
                  if (!searchQuery) {
                    setTimeout(() => setIsExpanded(false), 200);
                  }
                }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
