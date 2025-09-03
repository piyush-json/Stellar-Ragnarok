import React from 'react';
import Icon from '../../../components/AppIcon';

const JobHeader = ({ job, onBack }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(job?.deadline);

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <button 
            onClick={onBack}
            className="flex items-center space-x-1 hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>Jobs</span>
          </button>
          <Icon name="ChevronRight" size={16} />
          <span className="capitalize">{job?.category}</span>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground font-medium truncate">{job?.title}</span>
        </nav>

        {/* Job Header Info */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {job?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} className="text-primary" />
                <span className="font-semibold text-foreground">
                  {job?.budget?.toLocaleString()} XLM
                </span>
                <span className="text-muted-foreground">
                  (~${(job?.budget * 0.12)?.toLocaleString()})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span>Posted {formatDate(job?.postedDate)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className={daysRemaining <= 3 ? "text-destructive" : "text-muted-foreground"} />
                <span className={daysRemaining <= 3 ? "text-destructive font-medium" : ""}>
                  {daysRemaining > 0 ? `${daysRemaining} days left` : 'Deadline passed'}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              job?.status === 'open' ?'bg-success/10 text-success border border-success/20'
                : job?.status === 'in-progress' ?'bg-warning/10 text-warning border border-warning/20' :'bg-muted text-muted-foreground border border-border'
            }`}>
              {job?.status === 'open' ? 'Open for Applications' : 
               job?.status === 'in-progress' ? 'In Progress' : 'Completed'}
            </div>
            {job?.featured && (
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                Featured
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;