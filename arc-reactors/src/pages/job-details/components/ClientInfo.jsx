import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ClientInfo = ({ client }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">About the Client</h2>
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={client?.avatar}
            alt={client?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-medium text-foreground">{client?.name}</h3>
            {client?.verified && (
              <Icon name="BadgeCheck" size={18} className="text-primary" />
            )}
          </div>
          
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(client?.rating)}
            <span className="text-sm text-muted-foreground ml-2">
              {client?.rating} ({client?.reviewCount} reviews)
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {client?.bio}
          </p>
        </div>
      </div>
      {/* Client Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{client?.totalJobs}</div>
          <div className="text-sm text-muted-foreground">Jobs Posted</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{client?.hireRate}%</div>
          <div className="text-sm text-muted-foreground">Hire Rate</div>
        </div>
      </div>
      {/* Member Since */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Member since</span>
          <span className="text-foreground font-medium">
            {new Date(client.memberSince)?.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">Last active</span>
          <span className="text-foreground font-medium">{client?.lastActive}</span>
        </div>
      </div>
      {/* Blockchain Verification */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">Stellar Wallet Verified</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1 font-mono">
          {client?.walletAddress}
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;