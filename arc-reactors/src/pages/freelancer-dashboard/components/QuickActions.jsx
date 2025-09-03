import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onBrowseJobs, onUpdateProfile, onWithdrawEarnings, walletBalance }) => {
  const quickActionItems = [
    {
      title: 'Browse Jobs',
      description: 'Find new opportunities',
      icon: 'Search',
      action: onBrowseJobs,
      variant: 'default'
    },
    {
      title: 'Update Profile',
      description: 'Enhance your visibility',
      icon: 'User',
      action: onUpdateProfile,
      variant: 'outline'
    },
    {
      title: 'Withdraw Earnings',
      description: `${walletBalance} XLM available`,
      icon: 'Wallet',
      action: onWithdrawEarnings,
      variant: 'success',
      disabled: walletBalance <= 0
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      <div className="space-y-3">
        {quickActionItems?.map((item, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 hover:elevation-1 transition-all duration-200"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={item?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-card-foreground">{item?.title}</h4>
                <p className="text-sm text-muted-foreground">{item?.description}</p>
              </div>
            </div>
            
            <Button
              variant={item?.variant}
              size="sm"
              onClick={item?.action}
              disabled={item?.disabled}
              fullWidth
              iconName="ArrowRight"
              iconPosition="right"
            >
              {item?.title}
            </Button>
          </div>
        ))}
      </div>
      {/* Blockchain Status */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-success" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-card-foreground">Blockchain Status</h4>
            <p className="text-sm text-muted-foreground">Stellar Network Connected</p>
          </div>
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Network</span>
            <span className="text-foreground font-medium">Stellar Mainnet</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Smart Contracts</span>
            <span className="text-success font-medium">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Last Sync</span>
            <span className="text-foreground font-medium">2 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;