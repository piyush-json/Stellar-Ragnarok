import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import StatusBadge from './StatusBadge';

const ProjectCard = ({ project, onReleaseFunds, onMessage, onViewDetails }) => {
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

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-accent';
    if (progress >= 25) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-card-foreground hover:text-primary cursor-pointer mb-1">
            <Link to="/job-details">{project?.title}</Link>
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {project?.description}
          </p>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                <Image
                  src={project?.freelancer?.avatar}
                  alt={project?.freelancer?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">
                  {project?.freelancer?.name}
                </p>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                  <span className="text-xs text-muted-foreground">
                    {project?.freelancer?.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <StatusBadge status={project?.status} size="sm" />
          <div className="text-lg font-bold text-card-foreground mt-2">
            {formatBudget(project?.budget)}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">{project?.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project?.progress)}`}
            style={{ width: `${project?.progress}%` }}
          />
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-card-foreground mb-2">Milestones</h4>
        <div className="space-y-2">
          {project?.milestones?.slice(0, 2)?.map((milestone, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon
                  name={milestone?.completed ? "CheckCircle" : "Circle"}
                  size={16}
                  className={milestone?.completed ? "text-success" : "text-muted-foreground"}
                />
                <span className={milestone?.completed ? "text-card-foreground" : "text-muted-foreground"}>
                  {milestone?.title}
                </span>
              </div>
              <span className="text-muted-foreground">
                {formatBudget(milestone?.amount)}
              </span>
            </div>
          ))}
          {project?.milestones?.length > 2 && (
            <div className="text-xs text-muted-foreground">
              +{project?.milestones?.length - 2} more milestones
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} />
            <span>Due {formatDate(project?.deadline)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{project?.timeRemaining}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="MessageSquare"
            onClick={() => onMessage(project?.id)}
          >
            Message
          </Button>
          {project?.status === 'in-progress' && project?.canReleaseFunds && (
            <Button
              variant="default"
              size="sm"
              iconName="DollarSign"
              onClick={() => onReleaseFunds(project?.id)}
            >
              Release Funds
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={() => onViewDetails(project?.id)}
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;