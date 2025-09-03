import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onPostJob, onReleaseFunds, onDownloadReports }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          onClick={onPostJob}
          className="justify-start"
        >
          Post New Job
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="DollarSign"
          iconPosition="left"
          onClick={onReleaseFunds}
          className="justify-start"
        >
          Release Funds
        </Button>
        
        <Button
          variant="ghost"
          fullWidth
          iconName="Download"
          iconPosition="left"
          onClick={onDownloadReports}
          className="justify-start"
        >
          Download Reports
        </Button>
        
        <div className="pt-3 border-t border-border">
          <Button
            variant="ghost"
            fullWidth
            iconName="HelpCircle"
            iconPosition="left"
            asChild
            className="justify-start"
          >
            <Link to="/help">Help & Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;