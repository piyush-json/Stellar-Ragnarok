import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ProjectCard = ({ project, onViewDetails, onSubmitDeliverable, onMessageClient }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'in progress': return 'text-warning bg-warning/10';
      case 'review': return 'text-accent bg-accent/10';
      case 'completed': return 'text-success bg-success/10';
      case 'overdue': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(project?.deadline);

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:elevation-2 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">{project?.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="User" size={16} />
              <span>{project?.client?.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>Due {new Date(project.deadline)?.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
            {project?.status}
          </span>
          {project?.client?.avatar && (
            <Image
              src={project?.client?.avatar}
              alt={project?.client?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{project?.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${project?.progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="font-semibold text-foreground">{project?.budget} XLM</span>
            <span className="text-muted-foreground">≈ ${project?.budgetUsd}</span>
          </div>
        </div>
        <div className={`text-sm font-medium ${
          daysRemaining < 0 ? 'text-error' : daysRemaining <= 2 ? 'text-warning' : 'text-muted-foreground'
        }`}>
          {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` : 
           daysRemaining === 0 ? 'Due today' : 
           `${daysRemaining} days left`}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(project?.id)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onMessageClient(project?.client?.id)}
          iconName="MessageSquare"
          iconPosition="left"
        >
          Message
        </Button>
        {project?.status === 'In Progress' && (
          <Button
            variant="default"
            size="sm"
            onClick={() => onSubmitDeliverable(project?.id)}
            iconName="Upload"
            iconPosition="left"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;