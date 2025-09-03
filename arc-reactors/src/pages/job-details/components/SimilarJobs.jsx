import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SimilarJobs = ({ jobs }) => {
  const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Similar Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <Link
            key={job?.id}
            to={`/job-details?id=${job?.id}`}
            className="group block p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {job?.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 capitalize">
                  {job?.category}
                </p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                job?.status === 'open' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }`}>
                {job?.status === 'open' ? 'Open' : 'Closed'}
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="DollarSign" size={14} />
                <span className="font-medium text-foreground">
                  {job?.budget?.toLocaleString()} XLM
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} />
                <span>{job?.applicationCount || 0} bids</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={job?.client?.avatar}
                  alt={job?.client?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-muted-foreground truncate">
                {job?.client?.name}
              </span>
              {job?.client?.verified && (
                <Icon name="BadgeCheck" size={14} className="text-primary flex-shrink-0" />
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatDate(job?.postedDate)}</span>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={12} />
                <span>{job?.client?.location}</span>
              </div>
            </div>

            {/* Skills Preview */}
            <div className="flex flex-wrap gap-1 mt-3">
              {job?.skills?.slice(0, 3)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                >
                  {skill?.name}
                </span>
              ))}
              {job?.skills?.length > 3 && (
                <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                  +{job?.skills?.length - 3} more
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          to="/job-marketplace"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          <span>View All Jobs</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
    </div>
  );
};

export default SimilarJobs;