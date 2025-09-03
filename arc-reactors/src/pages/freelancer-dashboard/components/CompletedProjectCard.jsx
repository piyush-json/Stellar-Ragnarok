import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CompletedProjectCard = ({ project, onAddToPortfolio, onViewDetails }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${
          index < rating ? 'text-warning fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:elevation-1 transition-all duration-200">
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
              <span>Completed {new Date(project.completedDate)?.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-lg font-bold text-success">{project?.earned} XLM</div>
            <div className="text-sm text-muted-foreground">≈ ${project?.earnedUsd}</div>
          </div>
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
        <p className="text-sm text-muted-foreground line-clamp-2">{project?.description}</p>
      </div>
      {project?.review && (
        <div className="mb-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-1">
              {renderStars(project?.rating)}
            </div>
            <span className="text-sm font-medium text-foreground">{project?.rating}/5</span>
          </div>
          <p className="text-sm text-muted-foreground italic">"{project?.review}"</p>
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {project?.skills?.slice(0, 3)?.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
          >
            {skill}
          </span>
        ))}
        {project?.skills?.length > 3 && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
            +{project?.skills?.length - 3} more
          </span>
        )}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{project?.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>100% Complete</span>
          </div>
        </div>
        {project?.inPortfolio && (
          <div className="flex items-center space-x-1 text-sm text-accent">
            <Icon name="Bookmark" size={16} />
            <span>In Portfolio</span>
          </div>
        )}
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
        {!project?.inPortfolio && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddToPortfolio(project?.id)}
            iconName="Plus"
            iconPosition="left"
          >
            Add to Portfolio
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompletedProjectCard;