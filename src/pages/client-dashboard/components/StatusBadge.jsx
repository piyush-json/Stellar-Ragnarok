import React from 'react';

const StatusBadge = ({ status, size = 'default' }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const statusClasses = {
    active: 'bg-success/10 text-success border-success/20',
    pending: 'bg-warning/10 text-warning border-warning/20',
    'in-progress': 'bg-accent/10 text-accent border-accent/20',
    completed: 'bg-primary/10 text-primary border-primary/20',
    cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
    draft: 'bg-muted text-muted-foreground border-border'
  };

  const statusLabels = {
    active: 'Active',
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    draft: 'Draft'
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full border
      ${sizeClasses?.[size]} 
      ${statusClasses?.[status] || statusClasses?.draft}
    `}>
      {statusLabels?.[status] || status}
    </span>
  );
};

export default StatusBadge;