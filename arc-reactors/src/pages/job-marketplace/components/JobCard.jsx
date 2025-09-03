import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const JobCard = ({ job, viewMode = 'grid' }) => {
  const [isSaved, setIsSaved] = useState(job?.isSaved || false);

  const handleSaveToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsSaved(!isSaved);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return posted?.toLocaleDateString();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={`${
          i < Math.floor(rating) 
            ? 'text-warning fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  if (viewMode === 'list') {
    return (
      <Link to="/job-details" className="block">
        <div className="bg-card border border-border rounded-lg p-6 hover:elevation-2 transition-all duration-200 hover:border-primary/20">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-1">
                    {job?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {job?.description}
                  </p>
                </div>
                <button
                  onClick={handleSaveToggle}
                  className="ml-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Icon
                    name="Heart"
                    size={20}
                    className={`${
                      isSaved ? 'text-destructive fill-current' : 'text-muted-foreground'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Icon name="DollarSign" size={16} className="text-primary" />
                  <span className="font-semibold text-primary">
                    {job?.budget?.toLocaleString()} XLM
                  </span>
                  <span className="text-sm text-muted-foreground">
                    (${(job?.budget * 0.12)?.toFixed(2)})
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{job?.duration}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{job?.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job?.skills?.slice(0, 6)?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {job?.skills?.length > 6 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    +{job?.skills?.length - 6} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                      <Image
                        src={job?.client?.avatar}
                        alt={job?.client?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-card-foreground">
                        {job?.client?.name}
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(job?.client?.rating)}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({job?.client?.reviewCount})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">
                    {formatTimeAgo(job?.postedAt)}
                  </span>
                  <Button size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view (default)
  return (
    <Link to="/job-details" className="block">
      <div className="bg-card border border-border rounded-lg p-6 hover:elevation-2 transition-all duration-200 hover:border-primary/20 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 flex-1 pr-2">
            {job?.title}
          </h3>
          <button
            onClick={handleSaveToggle}
            className="p-1 rounded hover:bg-muted/50 transition-colors flex-shrink-0"
          >
            <Icon
              name="Heart"
              size={18}
              className={`${
                isSaved ? 'text-destructive fill-current' : 'text-muted-foreground'
              }`}
            />
          </button>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
          {job?.description}
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={16} className="text-primary" />
              <span className="font-semibold text-primary">
                {job?.budget?.toLocaleString()} XLM
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              ${(job?.budget * 0.12)?.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{job?.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{job?.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {job?.skills?.slice(0, 3)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {job?.skills?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{job?.skills?.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
                <Image
                  src={job?.client?.avatar}
                  alt={job?.client?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(job?.client?.rating)}
                <span className="text-xs text-muted-foreground ml-1">
                  ({job?.client?.reviewCount})
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(job?.postedAt)}
            </span>
          </div>

          <Button fullWidth size="sm">
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;