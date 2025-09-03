import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusBadge from './StatusBadge';

const JobsTable = ({ jobs, onEdit, onCancel, onView }) => {
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
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-card-foreground">Job Title</th>
              <th className="text-left py-4 px-6 font-semibold text-card-foreground">Applications</th>
              <th className="text-left py-4 px-6 font-semibold text-card-foreground">Budget</th>
              <th className="text-left py-4 px-6 font-semibold text-card-foreground">Posted</th>
              <th className="text-left py-4 px-6 font-semibold text-card-foreground">Status</th>
              <th className="text-right py-4 px-6 font-semibold text-card-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job) => (
              <tr key={job?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="py-4 px-6">
                  <div className="space-y-1">
                    <h3 className="font-medium text-card-foreground hover:text-primary cursor-pointer">
                      <Link to="/job-details">{job?.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{job?.description}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span className="font-medium text-card-foreground">{job?.applications}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-semibold text-card-foreground">{formatBudget(job?.budget)}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-muted-foreground">{formatDate(job?.postedDate)}</span>
                </td>
                <td className="py-4 px-6">
                  <StatusBadge status={job?.status} />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onView(job?.id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEdit(job?.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      onClick={() => onCancel(job?.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      Cancel
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {jobs?.map((job) => (
          <div key={job?.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-card-foreground hover:text-primary cursor-pointer">
                  <Link to="/job-details">{job?.title}</Link>
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{job?.description}</p>
              </div>
              <StatusBadge status={job?.status} size="sm" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Applications:</span>
                <span className="font-medium text-card-foreground">{job?.applications}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                <span className="font-semibold text-card-foreground">{formatBudget(job?.budget)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">Posted {formatDate(job?.postedDate)}</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onView(job?.id)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onEdit(job?.id)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => onCancel(job?.id)}
                  className="text-destructive hover:text-destructive"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsTable;