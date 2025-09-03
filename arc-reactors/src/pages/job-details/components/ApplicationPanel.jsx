import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ApplicationPanel = ({ job, user, onApply, onSave, onShare, onEdit, onViewApplications, onCancel }) => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    portfolioLinks: '',
    proposedTimeline: '',
    proposedBudget: job?.budget
  });
  const [isSaved, setIsSaved] = useState(false);

  const isJobOwner = user && user?.id === job?.clientId;
  const hasApplied = user && job?.applicants && job?.applicants?.some(app => app?.freelancerId === user?.id);

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyClick = () => {
    if (user) {
      setShowApplicationForm(true);
    } else {
      // Redirect to login
      window.location.href = '/login';
    }
  };

  const handleSubmitApplication = () => {
    onApply(applicationData);
    setShowApplicationForm(false);
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    onSave(job?.id, !isSaved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job opportunity: ${job?.title}`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      onShare();
    }
  };

  if (isJobOwner) {
    return (
      <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
        <h3 className="text-lg font-semibold text-foreground mb-4">Manage Job</h3>
        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            iconName="Users"
            iconPosition="left"
            onClick={() => onViewApplications(job?.id)}
          >
            View Applications ({job?.applicationCount || 0})
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Edit"
            iconPosition="left"
            onClick={() => onEdit(job?.id)}
          >
            Edit Job
          </Button>
          
          <Button
            variant="destructive"
            fullWidth
            iconName="X"
            iconPosition="left"
            onClick={() => onCancel(job?.id)}
          >
            Cancel Job
          </Button>
        </div>
        {/* Job Stats */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{job?.viewCount || 0}</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{job?.applicationCount || 0}</div>
              <div className="text-sm text-muted-foreground">Applications</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
      <div className="mb-6">
        <div className="text-3xl font-bold text-foreground mb-1">
          {job?.budget?.toLocaleString()} XLM
        </div>
        <div className="text-muted-foreground">
          ~${(job?.budget * 0.12)?.toLocaleString()} USD
        </div>
      </div>
      {!showApplicationForm ? (
        <div className="space-y-3">
          {hasApplied ? (
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="CheckCircle" size={20} />
                <span className="font-medium">Application Submitted</span>
              </div>
              <p className="text-sm text-success/80 mt-1">
                Your application is under review
              </p>
            </div>
          ) : (
            <Button
              variant="default"
              fullWidth
              iconName="Send"
              iconPosition="left"
              onClick={handleApplyClick}
              disabled={job?.status !== 'open'}
            >
              {job?.status === 'open' ? 'Apply Now' : 'Applications Closed'}
            </Button>
          )}
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              fullWidth
              iconName={isSaved ? "BookmarkCheck" : "Bookmark"}
              iconPosition="left"
              onClick={handleSaveJob}
            >
              {isSaved ? 'Saved' : 'Save Job'}
            </Button>
            
            <Button
              variant="outline"
              iconName="Share"
              onClick={handleShare}
            >
              Share
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Apply for this Job</h3>
          
          <Input
            label="Cover Letter"
            type="text"
            placeholder="Tell the client why you're the perfect fit..."
            value={applicationData?.coverLetter}
            onChange={(e) => handleInputChange('coverLetter', e?.target?.value)}
            required
          />
          
          <Input
            label="Portfolio Links"
            type="text"
            placeholder="Share relevant work samples (optional)"
            value={applicationData?.portfolioLinks}
            onChange={(e) => handleInputChange('portfolioLinks', e?.target?.value)}
          />
          
          <Input
            label="Proposed Timeline"
            type="text"
            placeholder="How long will this project take?"
            value={applicationData?.proposedTimeline}
            onChange={(e) => handleInputChange('proposedTimeline', e?.target?.value)}
            required
          />
          
          <Input
            label="Your Bid (XLM)"
            type="number"
            placeholder="Enter your proposed budget"
            value={applicationData?.proposedBudget}
            onChange={(e) => handleInputChange('proposedBudget', parseFloat(e?.target?.value))}
            required
          />
          
          <div className="flex space-x-2 pt-4">
            <Button
              variant="default"
              fullWidth
              onClick={handleSubmitApplication}
              disabled={!applicationData?.coverLetter || !applicationData?.proposedTimeline}
            >
              Submit Application
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowApplicationForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Application Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Applications</span>
          <span className="text-foreground font-medium">{job?.applicationCount || 0}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">Avg. Bid</span>
          <span className="text-foreground font-medium">
            {job?.averageBid ? `${job?.averageBid?.toLocaleString()} XLM` : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPanel;