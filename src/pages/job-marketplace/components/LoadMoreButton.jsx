import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoadMoreButton = ({ onLoadMore, loading, hasMore }) => {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-2 text-muted-foreground">
          <Icon name="CheckCircle" size={20} />
          <span>You've seen all available jobs</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <Button
        onClick={onLoadMore}
        loading={loading}
        variant="outline"
        size="lg"
        iconName="ChevronDown"
        iconPosition="right"
      >
        {loading ? 'Loading more jobs...' : 'Load More Jobs'}
      </Button>
    </div>
  );
};

export default LoadMoreButton;