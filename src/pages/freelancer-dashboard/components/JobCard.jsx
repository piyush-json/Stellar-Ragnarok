import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onViewDetails, onQuickApply }) => {
  const getTimeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just posted';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-card-foreground">{job?.title}</h3>
            {job?.featured && (
              <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                Featured
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Building" size={16} />
              <span>{job?.client}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>{job?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{getTimeAgo(job?.postedDate)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-lg font-bold text-foreground">{job?.budget} XLM</div>
            <div className="text-sm text-muted-foreground">≈ ${job?.budgetUsd}</div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {job?.skills?.slice(0, 4)?.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
        {job?.skills?.length > 4 && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
            +{job?.skills?.length - 4} more
          </span>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} />
            <span>{job?.proposals} proposals</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={16} />
            <span>{job?.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BarChart" size={16} />
            <span>{job?.experienceLevel}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <Icon name="Star" size={16} className="text-warning fill-current" />
          <span className="font-medium text-foreground">{job?.clientRating}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(job?.id)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onQuickApply(job?.id)}
          iconName="Send"
          iconPosition="left"
        >
          Quick Apply
        </Button>
      </div>
    </div>
  );
};

export default JobCard;