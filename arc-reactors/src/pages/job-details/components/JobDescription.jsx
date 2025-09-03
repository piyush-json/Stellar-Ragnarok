import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const JobDescription = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Project Description</h2>
      <div className={`prose prose-sm max-w-none ${!isExpanded ? 'line-clamp-6' : ''}`}>
        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {job?.description}
        </div>
      </div>
      {job?.description?.length > 500 && (
        <button
          onClick={toggleExpanded}
          className="mt-4 flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
        >
          <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
          <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
        </button>
      )}
      {/* Project Requirements */}
      {job?.requirements && job?.requirements?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-foreground mb-3">Requirements</h3>
          <ul className="space-y-2">
            {job?.requirements?.map((requirement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Deliverables */}
      {job?.deliverables && job?.deliverables?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-lg font-medium text-foreground mb-3">Deliverables</h3>
          <ul className="space-y-2">
            {job?.deliverables?.map((deliverable, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Package" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{deliverable}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDescription;