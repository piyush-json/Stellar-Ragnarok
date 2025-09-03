import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ApplicationCard = ({ application, onAccept, onDecline, onMessage }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatBudget = (amount) => {
    return `${amount?.toLocaleString()} XLM`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={application?.freelancer?.avatar}
            alt={application?.freelancer?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-card-foreground hover:text-primary cursor-pointer">
                {application?.freelancer?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{application?.freelancer?.title}</p>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm font-medium text-card-foreground">
                    {application?.freelancer?.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({application?.freelancer?.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {application?.freelancer?.location}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-card-foreground">
                {formatBudget(application?.proposedRate)}
              </div>
              <div className="text-sm text-muted-foreground">
                Proposed Rate
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-card-foreground mb-2">Cover Letter</h4>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {application?.coverLetter}
            </p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-card-foreground mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {application?.freelancer?.skills?.slice(0, 4)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {application?.freelancer?.skills?.length > 4 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  +{application?.freelancer?.skills?.length - 4} more
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Applied {formatDate(application?.appliedDate)}</span>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{application?.estimatedDelivery}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="MessageSquare"
                onClick={() => onMessage(application?.id)}
              >
                Message
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                onClick={() => onDecline(application?.id)}
                className="text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                Decline
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Check"
                onClick={() => onAccept(application?.id)}
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;