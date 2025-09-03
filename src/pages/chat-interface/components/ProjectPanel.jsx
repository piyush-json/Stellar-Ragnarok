import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectPanel = ({ conversation, onClose, isMobile, className = '' }) => {
  if (!conversation) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  const mockProjectData = {
    budget: 2500,
    currency: 'XLM',
    usdEquivalent: 312.50,
    deadline: '2025-01-15',
    progress: 65,
    milestones: [
      { id: 1, title: 'Project Setup & Planning', status: 'completed', amount: 500 },
      { id: 2, title: 'Design & Development', status: 'in-progress', amount: 1200 },
      { id: 3, title: 'Testing & Deployment', status: 'pending', amount: 800 }
    ],
    escrowStatus: 'active',
    escrowAmount: 1700,
    releasedAmount: 500
  };

  return (
    <div className={`bg-card border-l border-border flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Project Details</h3>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Project Info */}
        <div>
          <h4 className="text-sm font-semibold text-card-foreground mb-3">Project Information</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation?.projectStatus)}`}>
                {getStatusText(conversation?.projectStatus)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Budget</span>
              <div className="text-right">
                <div className="text-sm font-medium text-card-foreground">
                  {mockProjectData?.budget?.toLocaleString()} {mockProjectData?.currency}
                </div>
                <div className="text-xs text-muted-foreground">
                  ≈ ${mockProjectData?.usdEquivalent?.toFixed(2)} USD
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Deadline</span>
              <span className="text-sm font-medium text-card-foreground">
                {new Date(mockProjectData.deadline)?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium text-card-foreground">
                  {mockProjectData?.progress}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${mockProjectData?.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Escrow Status */}
        <div>
          <h4 className="text-sm font-semibold text-card-foreground mb-3">Escrow Status</h4>
          <div className="bg-muted/50 rounded-lg p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total in Escrow</span>
              <span className="text-sm font-medium text-card-foreground">
                {mockProjectData?.escrowAmount?.toLocaleString()} XLM
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Released</span>
              <span className="text-sm font-medium text-success">
                {mockProjectData?.releasedAmount?.toLocaleString()} XLM
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Remaining</span>
              <span className="text-sm font-medium text-warning">
                {(mockProjectData?.escrowAmount - mockProjectData?.releasedAmount)?.toLocaleString()} XLM
              </span>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h4 className="text-sm font-semibold text-card-foreground mb-3">Milestones</h4>
          <div className="space-y-3">
            {mockProjectData?.milestones?.map((milestone) => (
              <div key={milestone?.id} className="border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-sm font-medium text-card-foreground flex-1">
                    {milestone?.title}
                  </h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusColor(milestone?.status)}`}>
                    {getStatusText(milestone?.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Amount</span>
                  <span className="text-sm font-medium text-card-foreground">
                    {milestone?.amount?.toLocaleString()} XLM
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-sm font-semibold text-card-foreground mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Icon name="DollarSign" size={16} className="mr-2" />
              Release Funds
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Calendar" size={16} className="mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="FileText" size={16} className="mr-2" />
              View Contract
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="AlertTriangle" size={16} className="mr-2" />
              Report Issue
            </Button>
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h4 className="text-sm font-semibold text-card-foreground mb-3">Recent Transactions</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="ArrowUpRight" size={14} className="text-success" />
                <span className="text-xs text-card-foreground">Milestone 1 Released</span>
              </div>
              <span className="text-xs text-success font-medium">+500 XLM</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="ArrowDownLeft" size={14} className="text-warning" />
                <span className="text-xs text-card-foreground">Escrow Deposit</span>
              </div>
              <span className="text-xs text-warning font-medium">-1700 XLM</span>
            </div>
          </div>
          
          <Button variant="link" size="sm" className="w-full mt-2 text-primary">
            <Icon name="ExternalLink" size={14} className="mr-1" />
            View All Transactions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectPanel;