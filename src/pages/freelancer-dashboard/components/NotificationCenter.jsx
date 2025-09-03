import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications = [], onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'project_update': return 'Briefcase';
      case 'payment': return 'DollarSign';
      case 'message': return 'MessageSquare';
      case 'job_match': return 'Target';
      case 'review': return 'Star';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'project_update': return 'text-accent bg-accent/10';
      case 'payment': return 'text-success bg-success/10';
      case 'message': return 'text-primary bg-primary/10';
      case 'job_match': return 'text-warning bg-warning/10';
      case 'review': return 'text-purple-500 bg-purple-500/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffTime = Math.abs(now - notificationDate);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMinutes > 0) return `${diffMinutes}m ago`;
    return 'Just now';
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'unread') return !notification?.read;
    if (filter === 'read') return notification?.read;
    return true;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-destructive text-destructive-foreground text-xs rounded-full">
              {unreadCount}
            </span>
          )}
        </h3>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            className="text-xs"
          >
            Mark all read
          </Button>
        )}
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-muted/30 rounded-lg p-1">
        {['all', 'unread', 'read']?.map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
              filter === filterType
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {filter === 'unread' ? 'No unread notifications' : 
               filter === 'read' ? 'No read notifications' : 
               'No notifications yet'}
            </p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`bg-card border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:elevation-1 ${
                !notification?.read ? 'border-primary/20 bg-primary/5' : 'border-border'
              }`}
              onClick={() => onMarkAsRead(notification?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getNotificationColor(notification?.type)}`}>
                  <Icon name={getNotificationIcon(notification?.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-medium ${!notification?.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification?.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(notification?.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification?.message}
                  </p>
                  {!notification?.read && (
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;