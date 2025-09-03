import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickFilters = ({ activeFilters, onFilterToggle, jobCount }) => {
  const quickFilterOptions = [
    { id: 'remote', label: 'Remote', icon: 'Home' },
    { id: 'fixed-price', label: 'Fixed Price', icon: 'DollarSign' },
    { id: 'hourly', label: 'Hourly', icon: 'Clock' },
    { id: 'urgent', label: 'Urgent', icon: 'Zap' },
    { id: 'entry-level', label: 'Entry Level', icon: 'User' },
    { id: 'expert', label: 'Expert', icon: 'Award' }
  ];

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {quickFilterOptions?.map((filter) => (
              <Button
                key={filter?.id}
                variant={activeFilters?.includes(filter?.id) ? 'default' : 'outline'}
                size="sm"
                onClick={() => onFilterToggle(filter?.id)}
                iconName={filter?.icon}
                iconPosition="left"
                iconSize={16}
                className="text-sm"
              >
                {filter?.label}
              </Button>
            ))}
          </div>

          {/* Job Count */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Briefcase" size={16} />
            <span>
              {jobCount?.toLocaleString()} job{jobCount !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-sm font-medium text-foreground">Active filters:</span>
            {activeFilters?.map((filterId) => {
              const filter = quickFilterOptions?.find(f => f?.id === filterId);
              return (
                <div
                  key={filterId}
                  className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  <Icon name={filter?.icon || 'Filter'} size={14} />
                  <span>{filter?.label || filterId}</span>
                  <button
                    onClick={() => onFilterToggle(filterId)}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => activeFilters?.forEach(onFilterToggle)}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickFilters;