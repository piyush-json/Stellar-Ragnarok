import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  viewMode, 
  onViewModeChange, 
  sortBy, 
  onSortChange,
  onFilterToggle 
}) => {
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'budget-high', label: 'Highest Budget' },
    { value: 'budget-low', label: 'Lowest Budget' },
    { value: 'relevance', label: 'Most Relevant' }
  ];

  const suggestions = [
    "React Developer", "UI/UX Designer", "Blockchain Developer", 
    "Content Writer", "Mobile App", "Web Development", "Smart Contracts"
  ];

  const handleSearchFocus = () => {
    if (searchQuery?.length > 0) {
      const filtered = suggestions?.filter(s => 
        s?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="bg-white border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-2xl">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder="Search for jobs, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="pl-10 pr-4"
              />
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions?.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-lg elevation-2 z-50">
                {searchSuggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name="Search" size={16} className="text-muted-foreground" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onFilterToggle}
              className="lg:hidden"
              iconName="Filter"
              iconPosition="left"
            >
              Filters
            </Button>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                iconName="Grid3X3"
              />
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                iconName="List"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="min-w-[160px]">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={onSortChange}
                placeholder="Sort by"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;