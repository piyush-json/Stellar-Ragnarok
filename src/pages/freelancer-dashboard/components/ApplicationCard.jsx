import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationCard = ({ application, onViewJob, onWithdrawApplication }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'under review': return 'text-warning bg-warning/10';
      case 'accepted': return 'text-success bg-success/10';
      case 'declined': return 'text-error bg-error/10';
      case 'withdrawn': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'under review': return 'Clock';
      case 'accepted': return 'CheckCircle';
      case 'declined': return 'XCircle';
      case 'withdrawn': return 'MinusCircle';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:elevation-1 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">{application?.jobTitle}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Building" size={16} />
              <span>{application?.client}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>Applied {new Date(application.appliedDate)?.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application?.status)}`}>
            <Icon name={getStatusIcon(application?.status)} size={14} />
            <span>{application?.status}</span>
          </span>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{application?.proposal}</p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="font-semibold text-foreground">{application?.proposedBudget} XLM</span>
            <span className="text-muted-foreground">≈ ${application?.proposedBudgetUsd}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>{application?.proposedDuration}</span>
          </div>
        </div>
        {application?.responseDate && (
          <div className="text-sm text-muted-foreground">
            Response: {new Date(application.responseDate)?.toLocaleDateString()}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewJob(application?.jobId)}
          iconName="ExternalLink"
          iconPosition="left"
          className="flex-1"
        >
          View Job
        </Button>
        {application?.status === 'Under Review' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onWithdrawApplication(application?.id)}
            iconName="X"
            iconPosition="left"
          >
            Withdraw
          </Button>
        )}
        {application?.status === 'Accepted' && (
          <Button
            variant="default"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Start Project
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;